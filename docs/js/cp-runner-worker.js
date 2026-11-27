/**
 * CPToj runner worker — chạy C++ (Clang/WASM) và Python 3 (Pyodide/WASM)
 * hoàn toàn trong trình duyệt, không gửi code lên server nào.
 *
 * Worker này được cp-compiler.js khởi tạo. Giao thức:
 *   vào : { id, type: 'run'|'warm', language, code, input, std, compileArgs,
 *           cpp: { runtimeUrl, assetsUrl }, python: { indexUrl } }
 *   ra  : { id, type: 'status', phase: 'load'|'compile'|'run', progress, text }
 *         { id, type: 'result', result: {...} }
 *         { id, type: 'failure', message }
 *
 * Chạy trong worker để việc biên dịch (có thể vài giây) không treo giao diện.
 * Cả hai runtime đều được nạp lười (lazy) ở lần chạy đầu tiên.
 */
'use strict';

/* @wasm-idle/llvm-core đọc SharedArrayBuffer vô điều kiện khi khởi tạo. Trên
   origin không bật COOP/COEP thì biến này không tồn tại, nên tạo stub rỗng:
   đường chạy bình thường không bao giờ cấp phát thật. */
if (typeof self.SharedArrayBuffer === 'undefined') {
  self.SharedArrayBuffer = function SharedArrayBuffer() {};
}

var state = {
  cpp: Object.create(null), // key -> Promise<compiler>
  python: null,
  pythonIndexUrl: null,
  queue: Promise.resolve(),
};

self.onmessage = function (ev) {
  var job = ev.data;
  if (!job || (job.type !== 'run' && job.type !== 'warm')) return;
  // Runtime WASM không chạy song song được: xếp hàng từng job một.
  state.queue = state.queue.then(function () {
    return handle(job);
  });
};

function post(msg) {
  self.postMessage(msg);
}

function postStatus(job, phase, progress, text) {
  post({ id: job.id, type: 'status', phase: phase, progress: progress, text: text });
}

function now() {
  return typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now();
}

/** importScripts với nguồn dự phòng (importScripts là đồng bộ nên bắt lỗi được). */
function importWithFallback(url, fallbackUrl) {
  try {
    importScripts(url);
    return;
  } catch (err) {
    if (!fallbackUrl || fallbackUrl === url) throw err;
    importScripts(fallbackUrl);
  }
}

function messageOf(err) {
  if (!err) return 'Lỗi không xác định';
  var msg = err.message || String(err);
  if (err.cause && err.cause.message) msg += ' — ' + err.cause.message;
  return msg;
}

/**
 * Tài nguyên tự host nằm cạnh worker: worker ở `<root>/js/`, clang ở `<root>/clang/`,
 * pyodide ở `<root>/pyodide/`. Cấu hình `null` nghĩa là "dùng bản cùng origin",
 * nhờ vậy site chạy được cả khi deploy dưới sub-path.
 */
function sameOrigin(relative) {
  try {
    return new URL(relative, self.location.href).href;
  } catch (e) {
    return relative;
  }
}

function handle(job) {
  if (job.type === 'warm') {
    return (job.language === 'python' ? loadPython(job) : loadCpp(job)).then(function () {
      post({ id: job.id, type: 'result', result: { success: true, warmed: true, language: job.language } });
    }).catch(function (err) {
      post({ id: job.id, type: 'failure', message: messageOf(err) });
    });
  }

  var work = job.language === 'python' ? runPython(job) : runCpp(job);
  return work.then(function (result) {
    post({ id: job.id, type: 'result', result: result });
  }).catch(function (err) {
    post({ id: job.id, type: 'failure', message: messageOf(err) });
  });
}

// ============================================================
// C++ — Clang 22 biên dịch sang WebAssembly (GNU-compatible + bits/stdc++.h)
// ============================================================

function loadCpp(job) {
  var cfg = job.cpp || {};
  var args = job.compileArgs || [];
  var runtimeUrl = cfg.runtimeUrl || sameOrigin('clang-wasm.global.js');
  var assetsUrl = cfg.assetsUrl || sameOrigin('../clang/');
  var key = [runtimeUrl, assetsUrl, job.std, args.join(' ')].join('|');
  if (state.cpp[key]) return state.cpp[key];

  var promise = Promise.resolve().then(function () {
    if (typeof self.clangWasm === 'undefined' && typeof clangWasm === 'undefined') {
      postStatus(job, 'load', 0, 'Đang tải trình biên dịch C++ (≈29 MB, chỉ lần đầu)…');
      importWithFallback(runtimeUrl, cfg.runtimeFallbackUrl);
    }
    var lib = self.clangWasm || (typeof clangWasm !== 'undefined' ? clangWasm : null);
    if (!lib || typeof lib.createCompiler !== 'function') {
      throw new Error('Không nạp được bộ công cụ C++ (WASM). Kiểm tra kết nối mạng rồi thử lại.');
    }
    postStatus(job, 'load', 0.02, 'Đang khởi động Clang…');

    function create(baseUrl) {
      return lib.createCompiler('cpp', {
        baseUrl: baseUrl,
        std: job.std,
        compileArgs: args,
        onProgress: function (value) {
          var pct = Math.max(0, Math.min(100, Math.round((value || 0) * 100)));
          postStatus(job, 'load', 0.02 + 0.9 * (value || 0),
            'Đang tải trình biên dịch C++ (≈29 MB, chỉ lần đầu)… ' + pct + '%');
        },
      });
    }

    return create(assetsUrl).catch(function (err) {
      if (!cfg.assetsFallbackUrl || cfg.assetsFallbackUrl === assetsUrl) throw err;
      postStatus(job, 'load', 0.02, 'Nguồn tải chính bị lỗi, đang thử nguồn dự phòng…');
      return create(cfg.assetsFallbackUrl);
    });
  });

  state.cpp[key] = promise;
  promise.catch(function () {
    delete state.cpp[key];
  });
  return promise;
}

function runCpp(job) {
  return loadCpp(job).then(function (compiler) {
    postStatus(job, 'compile', 1, 'Đang biên dịch…');
    var started = now();
    return compiler.run(job.code, job.input || '').then(function (res) {
      return mapCppResult(res, now() - started);
    }, function (err) {
      var msg = messageOf(err);
      if (/unreachable|RuntimeError|cannot access memory|memory access out of bounds|memory allocation/i.test(msg)) {
        return {
          success: false,
          language: 'cpp',
          crashed: true,
          output: '',
          error: 'Chương trình bị lỗi bộ nhớ (truy cập ngoài vùng nhớ cho phép).',
          exitCode: 139,
          compileMs: null,
          runMs: null,
          // Chương trình đã biên dịch xong rồi mới sập khi chạy.
          compiled: true,
        };
      }
      throw err;
    });
  });
}

function mapCppResult(res, wallMs) {
  var errors = res.errors || [];
  var result = {
    language: 'cpp',
    compileMs: typeof res.compileMs === 'number' ? res.compileMs : null,
    runMs: typeof res.runMs === 'number' ? res.runMs : null,
    wallMs: Math.round(wallMs),
    exitCode: res.exitCode === undefined ? null : res.exitCode,
    // Đã qua bước biên dịch/liên kết hay chưa — compileCpp() dựa vào cờ này,
    // không đoán qua nội dung log (log có thể chứa chữ "error" của runtime).
    compiled: true,
  };

  if (errors.length) {
    result.success = false;
    result.compiled = false;
    result.compileError = true;
    result.output = '';
    result.error = errors.join('\n');
    result.compilerOutput = result.error;
    return result;
  }

  if (result.exitCode === null) {
    // Không có chẩn đoán nhưng cũng không chạy được: lỗi link/hạ tầng.
    result.success = false;
    result.output = res.stdout || '';
    result.error = (res.stderr || '').trim() || 'Không chạy được chương trình (lỗi liên kết).';
    return result;
  }

  if (result.exitCode !== 0) {
    result.success = false;
    result.output = res.stdout || '';
    result.error = (res.stderr || '').trim() || ('Chương trình kết thúc với mã ' + result.exitCode + '.');
    return result;
  }

  result.success = true;
  result.output = res.stdout || '';
  result.stderr = res.stderr || '';
  return result;
}

// ============================================================
// Python 3 — CPython biên dịch sang WebAssembly (Pyodide)
// ============================================================

function loadPython(job) {
  var cfg = job.python || {};
  var indexUrl = cfg.indexUrl || sameOrigin('../pyodide/');
  if (state.python && state.pythonIndexUrl === indexUrl) return Promise.resolve(state.python);

  return Promise.resolve().then(function () {
    function boot(url) {
      postStatus(job, 'load', 0, 'Đang tải Python 3 (≈13 MB, chỉ lần đầu)…');
      if (typeof self.loadPyodide === 'undefined') {
        importWithFallback(url + 'pyodide.js', cfg.fallbackIndexUrl ? cfg.fallbackIndexUrl + 'pyodide.js' : null);
      }
      if (typeof self.loadPyodide !== 'function') {
        throw new Error('Không nạp được Python (Pyodide). Thiếu file trong thư mục pyodide/.');
      }
      return self.loadPyodide({ indexURL: url }).then(function (py) {
        postStatus(job, 'load', 0.9, 'Đang khởi động Python…');
        state.python = py;
        state.pythonIndexUrl = url;
        return py;
      });
    }

    return boot(indexUrl).catch(function (err) {
      var fallback = cfg.fallbackIndexUrl;
      if (!fallback || fallback === indexUrl) throw err;
      postStatus(job, 'load', 0.05, 'Nguồn chính bị lỗi, đang thử nguồn dự phòng…');
      return boot(fallback);
    });
  });
}

function runPython(job) {
  return loadPython(job).then(function (py) {
    postStatus(job, 'run', 1, 'Đang chạy…');
    py.setStdin({ stdin: makeStdin(job.input || ''), autoEOF: true });
    py.globals.set('__cp_code', job.code);
    var started = now();
    py.runPython(PY_WRAPPER);
    var proxy = py.globals.get('__cp_result');
    var data;
    try {
      data = proxy.toJs({ dict_converter: Object.fromEntries });
    } finally {
      if (proxy && typeof proxy.destroy === 'function') proxy.destroy();
    }
    var status = data.status || 0;
    var result = {
      language: 'python',
      success: status === 0,
      output: data.out || '',
      exitCode: status,
      compileMs: null,
      runMs: Math.round(now() - started),
    };
    if (status !== 0) {
      result.error = (data.err || '').trim() || ('Chương trình kết thúc với mã ' + status + '.');
    } else if (data.err) {
      result.stderr = data.err;
    }
    return result;
  });
}

function makeStdin(text) {
  if (!text) return function () { return null; };
  var parts = String(text).replace(/\r\n/g, '\n').split('\n');
  var i = 0;
  return function () {
    if (i >= parts.length) return null;
    var chunk = parts[i];
    i += 1;
    return i < parts.length ? chunk + '\n' : chunk;
  };
}

/**
 * Đoạn Python bọc code của người học:
 *  - tách stdout/stderr để so khớp đáp án chỉ dựa trên stdout (như judge thật),
 *  - bắt SystemExit (exit()/sys.exit()) để lấy mã thoát,
 *  - in traceback gọn, chỉ giữ các dòng thuộc file người dùng.
 * Kết quả nằm ở biến __cp_result.
 */
var PY_WRAPPER = [
  'import sys, io, traceback, linecache',
  '_cp_out = io.StringIO()',
  '_cp_err = io.StringIO()',
  '_cp_old_out, _cp_old_err = sys.stdout, sys.stderr',
  'sys.stdout, sys.stderr = _cp_out, _cp_err',
  'linecache.cache["<bai-lam>"] = (len(__cp_code), None, __cp_code.splitlines(True), "<bai-lam>")',
  '_cp_status = 0',
  'try:',
  '    exec(compile(__cp_code, "<bai-lam>", "exec"), {"__name__": "__main__"})',
  'except SystemExit as _cp_exit:',
  '    _cp_value = _cp_exit.code',
  '    if _cp_value is None:',
  '        _cp_status = 0',
  '    elif isinstance(_cp_value, int):',
  '        _cp_status = _cp_value',
  '    else:',
  '        _cp_err.write(str(_cp_value) + "\\n")',
  '        _cp_status = 1',
  'except BaseException as _cp_exc:',
  '    _cp_status = 1',
  '    _cp_frames = [f for f in traceback.extract_tb(_cp_exc.__traceback__) if f.filename == "<bai-lam>"]',
  '    _cp_lines = []',
  '    if _cp_frames:',
  '        _cp_lines.append("Traceback (most recent call last):\\n")',
  '    for _cp_frame in _cp_frames:',
  '        _cp_lines.append(\'  File "<bai-lam>", line %d, in %s\\n\' % (_cp_frame.lineno, _cp_frame.name))',
  '        if _cp_frame.line:',
  '            _cp_lines.append("    %s\\n" % _cp_frame.line.strip())',
  '    _cp_lines.append("".join(traceback.format_exception_only(type(_cp_exc), _cp_exc)))',
  '    _cp_err.write("".join(_cp_lines))',
  'finally:',
  '    sys.stdout, sys.stderr = _cp_old_out, _cp_old_err',
  '__cp_result = {"out": _cp_out.getvalue(), "err": _cp_err.getvalue(), "status": _cp_status}',
].join('\n');
