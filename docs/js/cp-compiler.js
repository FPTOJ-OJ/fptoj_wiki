/**
 * CPCompiler v4 — biên dịch & chạy C++ và Python 3 ngay trong trình duyệt.
 *
 * Không còn phụ thuộc API bên thứ ba nào: code của người học không rời khỏi máy.
 *   • C++  : Clang 22 biên dịch sang WebAssembly (@live-codes/clang-wasm),
 *            có sẵn <bits/stdc++.h>, <bits/extc++.h>, pb_ds, ext/rope.
 *   • Python: CPython 3 chạy trên WebAssembly (Pyodide).
 *
 * Cả hai runtime được nạp lười ở lần "Chạy" đầu tiên, chạy trong Web Worker
 * (không treo giao diện) và giữ trong bộ nhớ để các lần sau chạy tức thì.
 *
 * API công khai giữ nguyên như v3 để cp-playground.js không phải đổi cách gọi.
 *
 * @version 4.1.1
 * @license MIT
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CPCompiler = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ============================================================
  // Cấu hình mặc định
  // ============================================================
  var CLANG_WASM_VERSION = '0.3.0';
  var PYODIDE_VERSION = '314.0.8';
  // Đổi số này mỗi khi sửa cp-compiler.js / cp-runner-worker.js / cp-playground.js
  // để trình duyệt bỏ cache cũ (xem webjs.js CP_ASSET_V — giữ 2 số đồng bộ).
  var VERSION = '4.1.1';

  var DEFAULT_CONFIG = {
    // Ngôn ngữ mặc định: 'cpp' | 'python'
    language: 'cpp',

    // Chuẩn C++ (nhận cả 'c++17' lẫn 'gnu++17'; gnu++ là mặc định của GCC/Clang)
    std: 'gnu++17',

    // Mức tối ưu (C++): 'O0' | 'O1' | 'O2' | 'O3'
    optimize: 'O2',

    // Thời gian tối đa cho một lần chạy khi runtime đã sẵn sàng (ms).
    // Bao gồm cả thời gian biên dịch C++ nên cần rộng tay.
    timeout: 45000,

    // Thời gian tối đa cho lần chạy đầu (tải + khởi động WASM) (ms)
    loadTimeout: 240000,

    // Log chi tiết ra console
    verbose: false,

    // Vị trí worker (mặc định lấy theo đường dẫn của cp-compiler.js)
    workerUrl: null,

    // Bộ công cụ C++ (Clang → WASM) — tự host trong repo.
    //   runtimeUrl: null  → js/clang-wasm.global.js cùng origin
    //   assetsUrl : null  → thư mục clang/ cùng origin
    // Fallback chỉ dùng khi bản tự host lỗi (thiếu file, deploy sót...).
    cpp: {
      runtimeUrl: null,
      assetsUrl: null,
      runtimeFallbackUrl: 'https://cdn.jsdelivr.net/npm/@live-codes/clang-wasm@' + CLANG_WASM_VERSION + '/dist/clang-wasm.global.js',
      assetsFallbackUrl: 'https://cdn.jsdelivr.net/npm/@live-codes/clang-wasm@' + CLANG_WASM_VERSION + '/assets/',
    },

    // Python (Pyodide) — tự host trong repo.
    //   indexUrl: null → thư mục pyodide/ cùng origin
    python: {
      indexUrl: null,
      fallbackIndexUrl: 'https://cdn.jsdelivr.net/pyodide/v' + PYODIDE_VERSION + '/full/',
      unpkgIndexUrl: 'https://unpkg.com/pyodide@' + PYODIDE_VERSION + '/',
    },

    // Giữ cho tương thích với v3 (không còn dùng)
    apiUrl: null,
    listUrl: null,
    corsProxy: null,
    calibrationPings: 0,
  };

  var STD_ALIASES = {
    'c++11': 'gnu++11', 'c++14': 'gnu++14', 'c++17': 'gnu++17', 'c++20': 'gnu++20', 'c++23': 'gnu++23',
    'gnu++11': 'gnu++11', 'gnu++14': 'gnu++14', 'gnu++17': 'gnu++17', 'gnu++20': 'gnu++20', 'gnu++23': 'gnu++23',
  };

  // ============================================================
  // Timer
  // ============================================================
  var Timer = {
    now: function () {
      if (typeof performance !== 'undefined' && performance.now) return performance.now();
      return Date.now();
    },
    resolution: function () {
      return (typeof performance !== 'undefined' && performance.now) ? 0.1 : 1;
    },
    /**
     * v4 chạy cục bộ nên không còn độ trễ mạng để hiệu chỉnh.
     * Giữ hàm để code cũ gọi được.
     */
    calibrateLatency: function () {
      return Promise.resolve({ mean: 0, median: 0, min: 0, max: 0, stdev: 0, samples: [] });
    },
    createContext: function () {
      var startTime = Timer.now();
      var resolution = Timer.resolution();
      return {
        startTime: startTime,
        stop: function () {
          var wallTimeMs = Timer.now() - startTime;
          return {
            wallTimeMs: round(wallTimeMs, 2),
            executionTimeMs: round(wallTimeMs, 2),
            networkLatencyMs: 0,
            errorMarginMs: resolution,
            timerResolutionMs: resolution,
            summary: formatDuration(wallTimeMs),
          };
        },
      };
    },
  };

  // ============================================================
  // Tiện ích
  // ============================================================
  var _config = assign({}, DEFAULT_CONFIG);

  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var src = arguments[i];
      if (!src) continue;
      for (var key in src) {
        if (!Object.prototype.hasOwnProperty.call(src, key)) continue;
        var value = src[key];
        var current = target[key];
        if (value && typeof value === 'object' && !Array.isArray(value) &&
            current && typeof current === 'object' && !Array.isArray(current)) {
          target[key] = assign(assign({}, current), value);
        } else {
          target[key] = value;
        }
      }
    }
    return target;
  }

  function round(n, decimals) {
    var f = Math.pow(10, decimals);
    return Math.round(n * f) / f;
  }

  function formatDuration(ms) {
    if (!isFinite(ms)) return '—';
    if (ms >= 1000) return round(ms / 1000, 2) + 's';
    if (ms >= 10) return Math.round(ms) + 'ms';
    return round(ms, 1) + 'ms';
  }

  function log(level) {
    if (_config.verbose || level === 'error') {
      var args = ['[CPCompiler ' + level.toUpperCase() + ']'];
      for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
      if (level === 'error') console.error.apply(console, args);
      else if (level === 'warn') console.warn.apply(console, args);
      else console.log.apply(console, args);
    }
  }

  var _listeners = {};

  function emit(event, data) {
    var list = _listeners[event];
    if (!list) return;
    list.forEach(function (fn) {
      try { fn(data); } catch (e) { log('error', 'Lỗi trong listener:', e); }
    });
  }

  function normalizeStd(std) {
    if (!std) return 'gnu++17';
    var key = String(std).toLowerCase().replace(/\s+/g, '');
    return STD_ALIASES[key] || 'gnu++17';
  }

  function detectLanguage(name) {
    if (!name) return 'cpp';
    var n = String(name).toLowerCase();
    if (n.indexOf('py') === 0 || n.indexOf('cpython') === 0 || n.indexOf('python') !== -1) return 'python';
    return 'cpp';
  }

  // ============================================================
  // Worker & hàng đợi
  // ============================================================
  var SCRIPT_URL = (function () {
    try {
      if (typeof document === 'undefined') return '';
      if (document.currentScript && document.currentScript.src) return document.currentScript.src;
      var scripts = document.getElementsByTagName('script');
      for (var i = scripts.length - 1; i >= 0; i--) {
        if (scripts[i].src && /cp-compiler\.js/.test(scripts[i].src)) return scripts[i].src;
      }
    } catch (e) { /* bỏ qua */ }
    return '';
  }());

  function workerUrl() {
    var base;
    if (_config.workerUrl) base = _config.workerUrl;
    else if (SCRIPT_URL) base = SCRIPT_URL.replace(/[^/]*(\?.*)?$/, 'cp-runner-worker.js');
    else base = '/js/cp-runner-worker.js';
    return base.split('?')[0] + '?v=' + VERSION;
  }

  var _runners = { cpp: null, python: null }; // { worker, warm }
  var _queues = { cpp: Promise.resolve(), python: Promise.resolve() };
  var _pending = Object.create(null);
  var _seq = 0;

  /**
   * Runtime WASM chỉ chạy được một job tại một thời điểm: xếp hàng theo ngôn ngữ
   * để thời gian chờ của job sau không bị tính vào giới hạn chạy của nó.
   */
  function enqueue(language, task) {
    var p = _queues[language].then(task, task);
    _queues[language] = p.then(function () {}, function () {});
    return p;
  }

  function runnerFor(language) {
    var existing = _runners[language];
    if (existing) return existing;

    if (typeof Worker === 'undefined') {
      throw new Error('Trình duyệt không hỗ trợ Web Worker.');
    }

    var url = workerUrl();
    // Python chạy module worker: Pyodide 314 ném lỗi
    // "Classic web workers are not supported" trong classic worker.
    // C++ giữ classic worker (clang-wasm là bundle IIFE, cần importScripts).
    var worker = (language === 'python')
      ? new Worker(url, { type: 'module' })
      : new Worker(url);
    var runner = { worker: worker, warm: false, url: url };

    worker.onmessage = function (ev) {
      var job = _pending[ev.data && ev.data.id];
      if (job) job.onMessage(ev.data);
    };
    worker.onerror = function (ev) {
      var message = (ev && ev.message) || 'Web Worker gặp lỗi không xác định.';
      log('error', 'Worker error:', message, ev && ev.filename, ev && ev.lineno);
      // Lỗi ở mức worker: báo cho các job đang chờ rồi bỏ runner để lần sau tạo mới.
      destroyRunner(language, message);
      if (ev && typeof ev.preventDefault === 'function') ev.preventDefault();
    };

    _runners[language] = runner;
    return runner;
  }

  function destroyRunner(language, reason) {
    var runner = _runners[language];
    if (!runner) return;
    try { runner.worker.terminate(); } catch (e) { /* bỏ qua */ }
    _runners[language] = null;
    Object.keys(_pending).forEach(function (id) {
      var job = _pending[id];
      if (job.language === language) {
        job.fail(reason || 'Bộ chạy WASM đã được khởi động lại. Vui lòng bấm Chạy lại.');
      }
    });
  }

  function dispatch(language, payload, options) {
    options = options || {};
    var onStatus = options.onStatus;
    var timeout = options.timeout || _config.timeout;

    return new Promise(function (resolve, reject) {
      var runner;
      try {
        runner = runnerFor(language);
      } catch (err) {
        reject(err);
        return;
      }

      var id = 'job' + (++_seq);
      var startedAt = Timer.now();
      var wasCold = !runner.warm;
      var loadMs = null;
      var settled = false;
      var timer = null;

      var ctx = { language: language };

      function clearTimer() {
        if (timer) { clearTimeout(timer); timer = null; }
      }

      ctx.fail = function (message, extra) {
        if (settled) return;
        settled = true;
        clearTimer();
        delete _pending[id];
        var err = new Error(message || 'Lỗi không xác định');
        if (extra) { for (var k in extra) err[k] = extra[k]; }
        reject(err);
      };

      ctx.onMessage = function (msg) {
        if (!msg || msg.id !== id) return;

        if (msg.type === 'status') {
          if (wasCold && loadMs === null && (msg.phase === 'compile' || msg.phase === 'run')) {
            loadMs = Timer.now() - startedAt;
          }
          if (onStatus) {
            try {
              onStatus({ phase: msg.phase, progress: msg.progress, text: msg.text, loadMs: loadMs });
            } catch (e) { log('error', 'Lỗi trong onStatus:', e); }
          }
          emit('status', { language: language, phase: msg.phase, progress: msg.progress, text: msg.text });
          return;
        }

        if (msg.type === 'result') {
          runner.warm = true;
          settled = true;
          clearTimer();
          delete _pending[id];
          resolve(withTiming(msg.result, startedAt, loadMs));
          return;
        }

        if (msg.type === 'failure') {
          ctx.fail(msg.message);
        }
      };

      _pending[id] = ctx;

      timer = setTimeout(function () {
        var cold = !runner.warm;
        var limit = cold ? _config.loadTimeout : timeout;
        var message = cold
          ? 'Tải bộ công cụ WASM quá lâu (quá ' + formatDuration(limit) + '). Kiểm tra kết nối mạng rồi thử lại.'
          : 'Chương trình chạy quá lâu (quá ' + formatDuration(limit) + ') nên đã bị dừng.';
        ctx.fail(message, { timeout: true });
        destroyRunner(language, cold
          ? 'Tải bộ công cụ WASM quá lâu. Kiểm tra kết nối mạng rồi thử lại.'
          : 'Chương trình chạy quá lâu nên đã bị dừng.');
      }, wasCold ? _config.loadTimeout : timeout);

      try {
        payload.id = id;
        runner.worker.postMessage(payload);
      } catch (err) {
        ctx.fail(err.message || String(err));
      }
    });
  }

  function withTiming(raw, startedAt, loadMs) {
    var result = assign({}, raw || {});
    var compileMs = typeof result.compileMs === 'number' ? result.compileMs : null;
    var runMs = typeof result.runMs === 'number' ? result.runMs
      : (typeof result.wallMs === 'number' ? result.wallMs : null);

    var parts = [];
    if (loadMs !== null && loadMs !== undefined) parts.push('Nạp WASM ' + formatDuration(loadMs));
    if (compileMs !== null) parts.push('Biên dịch ' + formatDuration(compileMs));
    if (runMs !== null) parts.push('Chạy ' + formatDuration(runMs));

    result.timing = {
      wallTimeMs: round(Timer.now() - startedAt, 2),
      loadTimeMs: loadMs === null ? null : round(loadMs, 2),
      compileTimeMs: compileMs,
      executionTimeMs: runMs,
      runTimeMs: runMs,
      networkLatencyMs: 0,
      errorMarginMs: Timer.resolution(),
      timerResolutionMs: Timer.resolution(),
      local: true,
      summary: parts.length ? parts.join(' · ') : formatDuration(Timer.now() - startedAt),
    };
    return result;
  }

  // ============================================================
  // API công khai
  // ============================================================
  var CPCompiler = {};

  CPCompiler.configure = function (opts) {
    if (opts) assign(_config, opts);
    log('info', 'Cấu hình:', _config);
    return assign({}, _config);
  };

  CPCompiler.getConfig = function () {
    return assign({}, _config);
  };

  CPCompiler.resetConfig = function () {
    _config = assign({}, DEFAULT_CONFIG);
    return assign({}, _config);
  };

  CPCompiler.on = function (event, callback) {
    if (!_listeners[event]) _listeners[event] = [];
    _listeners[event].push(callback);
    return function () {
      _listeners[event] = _listeners[event].filter(function (fn) { return fn !== callback; });
    };
  };

  CPCompiler.off = function (event) {
    if (event) delete _listeners[event];
    else _listeners = {};
  };

  /**
   * Danh sách runtime có sẵn (không còn gọi mạng).
   */
  CPCompiler.getCompilers = function (opts) {
    opts = opts || {};
    var all = [
      { name: 'clang-wasm', display: 'Clang 22 (WASM)', version: '22.1.8', language: 'C++' },
      { name: 'cpython-wasm', display: 'CPython 3 (WASM)', version: PYODIDE_VERSION, language: 'Python' },
    ];
    if (opts.language) return Promise.resolve(all.filter(function (c) { return c.language === opts.language; }));
    return Promise.resolve(all);
  };

  CPCompiler.getStandards = function () {
    return ['c++11', 'c++14', 'c++17', 'c++20', 'c++23'];
  };

  CPCompiler.getLanguages = function () {
    return ['cpp', 'python'];
  };

  CPCompiler.isSupported = function () {
    return typeof Worker !== 'undefined' &&
      typeof WebAssembly !== 'undefined' &&
      typeof Promise !== 'undefined' &&
      (typeof Blob !== 'undefined' || typeof document !== 'undefined');
  };

  CPCompiler.init = function () {
    log('info', 'CPCompiler v' + VERSION + ' — C++ (Clang/WASM) & Python 3 (Pyodide), chạy cục bộ trong trình duyệt');
    return Promise.resolve();
  };

  /**
   * Tải trước runtime để lần "Chạy" đầu không phải chờ.
   * @param {string} [language='cpp']
   * @returns {Promise<Object>}
   */
  CPCompiler.preload = function (language) {
    language = (language === 'python') ? 'python' : 'cpp';
    var startedAt = Timer.now();
    return enqueue(language, function () {
      return dispatch(language, {
        type: 'warm',
        language: language,
        std: normalizeStd(_config.std),
        compileArgs: buildCompileArgs(_config),
        cpp: _config.cpp,
        python: _config.python,
      }, { timeout: _config.loadTimeout }).then(function () {
        return { success: true, language: language, loadTimeMs: round(Timer.now() - startedAt, 1) };
      });
    });
  };

  CPCompiler.calibrateLatency = function () {
    return Timer.calibrateLatency();
  };

  CPCompiler.getLatencyStats = function () {
    return { mean: 0, median: 0, min: 0, max: 0, stdev: 0, samples: [] };
  };

  CPCompiler.Timer = Timer;

  function buildCompileArgs(cfg) {
    var args = [];
    var opt = cfg.optimize;
    if (opt) args.push(opt.indexOf('-') === 0 ? opt : '-' + opt);
    return args;
  }

  /**
   * Biên dịch + chạy code (C++ hoặc Python 3) ngay trong trình duyệt.
   *
   * @param {Object} options
   * @param {string} options.code              - mã nguồn
   * @param {string} [options.language='cpp']  - 'cpp' | 'python'
   * @param {string} [options.input='']        - stdin
   * @param {string} [options.std='gnu++17']   - chuẩn C++ (bỏ qua với Python)
   * @param {string} [options.optimize]        - 'O2' (chỉ C++)
   * @param {string[]} [options.flags=[]]      - cờ biên dịch thêm (chỉ C++)
   * @param {number} [options.timeout]         - giới hạn thời gian chạy (ms)
   * @param {Function} [options.onStatus]      - nhận { phase, progress, text }
   * @returns {Promise<Object>} { success, output, error, compilerOutput, exitCode, timing }
   */
  CPCompiler.compileAndRun = function (options) {
    if (!options || !options.code) {
      return Promise.reject(new Error('options.code là bắt buộc'));
    }

    var lang = options.language || _config.language || 'cpp';
    if (options.compiler) lang = detectLanguage(options.compiler);
    var isPython = (lang === 'python');

    if (!CPCompiler.isSupported()) {
      return Promise.resolve({
        success: false,
        language: isPython ? 'python' : 'cpp',
        error: 'Trình duyệt này không hỗ trợ WebAssembly/Web Worker nên không chạy được code trực tiếp.',
      });
    }

    var timeout = options.timeout || _config.timeout;
    var compileArgs = buildCompileArgs({ optimize: options.optimize || _config.optimize });
    if (!isPython && options.flags && options.flags.length) {
      compileArgs = compileArgs.concat(options.flags);
    }

    emit('compile:start', { language: lang });
    emit('run:start', { language: lang });

    var payload = {
      type: 'run',
      language: isPython ? 'python' : 'cpp',
      code: options.code,
      input: options.input || '',
      std: normalizeStd(options.std || _config.std),
      compileArgs: compileArgs,
      cpp: _config.cpp,
      python: _config.python,
    };

    var langKey = isPython ? 'python' : 'cpp';

    return enqueue(langKey, function () {
      return dispatch(langKey, payload, {
        onStatus: options.onStatus,
        timeout: timeout,
      }).then(function (result) {
        if (result.success) {
          emit('compile:success', { compilerOutput: result.compilerOutput || '' });
          emit('run:success', { output: result.output || '' });
        } else {
          emit('compile:error', { error: result.error });
          if (result.exitCode) emit('run:error', { error: result.error, output: result.output });
        }
        emit('timing', result.timing);
        return result;
      }).catch(function (err) {
        emit('compile:error', { error: err.message });
        return {
          success: false,
          language: langKey,
          error: err.message || String(err),
          timeout: !!err.timeout,
        };
      });
    });
  };

  /** Alias tương thích */
  CPCompiler.compileAndRunCpp = CPCompiler.compileAndRun;

  /**
   * Kiểm tra biên dịch C++.
   *
   * Lưu ý: WASM không có chế độ "chỉ dịch" tách rời, nên hàm này biên dịch
   * **và chạy** với stdin rỗng. Vì vậy `success` chỉ phản ánh bước biên dịch
   * (cờ `compiled` do worker trả về), không phải chương trình chạy có lỗi hay không.
   */
  CPCompiler.compileCpp = function (options) {
    if (!options || !options.code) return Promise.reject(new Error('options.code là bắt buộc'));
    return CPCompiler.compileAndRun({
      code: options.code,
      language: 'cpp',
      input: '',
      std: options.std,
      optimize: options.optimize,
      flags: options.flags,
      timeout: options.timeout,
      onStatus: options.onStatus,
    }).then(function (result) {
      var compiled = typeof result.compiled === 'boolean' ? result.compiled : !result.compilerOutput;
      return {
        success: compiled,
        compiled: compiled,
        error: compiled ? undefined : (result.error || 'Biên dịch thất bại'),
        compilerOutput: result.compilerOutput || (compiled ? 'Biên dịch thành công.' : result.error),
        output: result.output,
        exitCode: result.exitCode,
        timing: result.timing,
      };
    });
  };

  CPCompiler.run = function (code, input, language) {
    return CPCompiler.compileAndRun({
      code: code,
      input: input || '',
      language: language || _config.language,
    });
  };

  CPCompiler.runPython = function (code, input) {
    return CPCompiler.compileAndRun({ code: code, input: input || '', language: 'python' });
  };

  CPCompiler.runCpp = function (code, input) {
    return CPCompiler.compileAndRun({ code: code, input: input || '', language: 'cpp' });
  };

  /** Alias tương thích */
  CPCompiler.runWasm = function (options) {
    return CPCompiler.compileAndRun(options);
  };

  CPCompiler.getAssembly = function () {
    return Promise.reject(new Error('Không hỗ trợ xuất assembly khi biên dịch bằng WASM.'));
  };

  CPCompiler.healthCheck = function () {
    var startedAt = Timer.now();
    return CPCompiler.run('#include<iostream>\nint main(){std::cout<<"ok";}', '', 'cpp')
      .then(function (result) {
        return {
          healthy: !!result.success && String(result.output || '').trim() === 'ok',
          latencyMs: round(Timer.now() - startedAt, 1),
          compiler: 'clang-wasm 22.1.8',
          result: result,
        };
      })
      .catch(function (err) {
        return { healthy: false, error: err.message, latencyMs: round(Timer.now() - startedAt, 1) };
      });
  };

  CPCompiler.version = VERSION;

  return CPCompiler;
}));
