/**
 * CPCompiler - A lightweight JavaScript library for compiling and running C++ & Python code
 * Uses Wandbox (https://wandbox.org) API as the primary backend.
 * 
 * Features:
 * - Real GCC/Clang compilation for C++ (not emulated)
 * - Python support (CPython, PyPy)
 * - Full support for bits/stdc++.h and competitive programming headers
 * - Support for C++11, C++14, C++17, C++20
 * - Precise execution timing with network latency estimation & error margin
 * - stdin/stdout support
 * - Configurable compiler, optimization level, and extra flags
 * - No dependencies, no WebAssembly, no CORS issues
 * - Works on any website without special headers
 * 
 * @version 3.0.0
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
  // Default Configuration
  // ============================================================
  var DEFAULT_CONFIG = {
    apiUrl: 'https://wandbox.org/api/compile.json',
    listUrl: 'https://wandbox.org/api/list.json',

    // Default language
    language: 'cpp',

    // Default C++ compiler
    compiler: 'gcc-13.2.0',

    // Default Python compiler
    pythonCompiler: 'cpython-3.12.7',

    // Default C++ standard
    std: 'c++17',

    // Default optimization level (C++ only)
    optimize: 'O2',

    // Request timeout in milliseconds
    timeout: 30000,

    // Enable verbose logging
    verbose: false,

    // CORS proxy URL
    corsProxy: null,

    // Number of calibration pings for latency estimation
    calibrationPings: 3,
  };

  // ============================================================
  // Known Compilers (fallback if API is unreachable)
  // ============================================================
  var KNOWN_COMPILERS = {
    'C++': [
      { name: 'gcc-head', display: 'GCC HEAD (latest)', version: 'HEAD', language: 'C++' },
      { name: 'gcc-13.2.0', display: 'GCC 13.2.0', version: '13.2.0', language: 'C++' },
      { name: 'gcc-12.3.0', display: 'GCC 12.3.0', version: '12.3.0', language: 'C++' },
      { name: 'gcc-11.4.0', display: 'GCC 11.4.0', version: '11.4.0', language: 'C++' },
      { name: 'gcc-10.5.0', display: 'GCC 10.5.0', version: '10.5.0', language: 'C++' },
      { name: 'gcc-9.3.0', display: 'GCC 9.3.0', version: '9.3.0', language: 'C++' },
      { name: 'clang-head', display: 'Clang HEAD', version: 'HEAD', language: 'C++' },
      { name: 'clang-17.0.1', display: 'Clang 17.0.1', version: '17.0.1', language: 'C++' },
      { name: 'clang-16.0.4', display: 'Clang 16.0.4', version: '16.0.4', language: 'C++' },
      { name: 'clang-15.0.7', display: 'Clang 15.0.7', version: '15.0.7', language: 'C++' },
    ],
    'Python': [
      { name: 'cpython-3.12.7', display: 'CPython 3.12.7', version: '3.12.7', language: 'Python' },
      { name: 'cpython-3.11.10', display: 'CPython 3.11.10', version: '3.11.10', language: 'Python' },
      { name: 'cpython-3.10.15', display: 'CPython 3.10.15', version: '3.10.15', language: 'Python' },
      { name: 'cpython-3.9.20', display: 'CPython 3.9.20', version: '3.9.20', language: 'Python' },
      { name: 'cpython-3.8.20', display: 'CPython 3.8.20', version: '3.8.20', language: 'Python' },
      { name: 'cpython-3.14.0', display: 'CPython 3.14.0', version: '3.14.0', language: 'Python' },
      { name: 'cpython-head', display: 'CPython HEAD', version: 'HEAD', language: 'Python' },
      { name: 'pypy-3.10-v7.3.17', display: 'PyPy 3.10', version: '7.3.17', language: 'Python' },
      { name: 'pypy-3.9-v7.3.16', display: 'PyPy 3.9', version: '7.3.16', language: 'Python' },
    ],
  };

  // C++ standard options
  var STD_OPTIONS = {
    'c++11': 'c++11', 'c++14': 'c++14', 'c++17': 'c++17', 'c++20': 'c++2a',
    'gnu++11': 'gnu++11', 'gnu++14': 'gnu++14', 'gnu++17': 'gnu++17', 'gnu++20': 'gnu++2a',
  };

  // ============================================================
  // Precision Timer
  // ============================================================
  var Timer = {
    /**
     * Get a high-resolution timestamp (ms, fractional).
     * Uses performance.now() in browsers (microsecond precision),
     * falls back to Date.now() in Node.js (millisecond precision).
     */
    now: function() {
      if (typeof performance !== 'undefined' && performance.now) {
        return performance.now();
      }
      return Date.now();
    },

    /**
     * Get the resolution (smallest measurable interval) of the timer.
     * @returns {number} Resolution in milliseconds
     */
    resolution: function() {
      if (typeof performance !== 'undefined' && performance.now) {
        // performance.now() has ~5μs resolution in most browsers
        // but is typically rounded to 100μs for security (Spectre mitigation)
        return 0.1; // 100 microseconds
      }
      return 1; // Date.now() has 1ms resolution
    },

    /**
     * Estimate network round-trip latency to the API server.
     * Sends small calibration requests and computes statistics.
     * 
     * @param {string} url - API URL to ping
     * @param {number} [count=3] - Number of pings
     * @returns {Promise<Object>} Latency statistics
     */
    calibrateLatency: function(url, count) {
      count = count || 3;
      var samples = [];

      function ping(i) {
        if (i >= count) {
          return Promise.resolve(samples);
        }
        var t0 = Timer.now();
        // Use a lightweight GET to the list endpoint (small response)
        return fetch(url, { method: 'HEAD', mode: 'no-cors' })
          .catch(function() {
            // no-cors might fail, try a simple GET
            return fetch(url.replace('/compile.json', '/list.json'), {
              method: 'GET',
              signal: AbortController ? new AbortController().signal : undefined,
            }).catch(function() { return null; });
          })
          .then(function() {
            var rtt = Timer.now() - t0;
            samples.push(rtt);
            return ping(i + 1);
          });
      }

      return ping(0).then(function(samples) {
        if (samples.length === 0) {
          return { mean: 0, median: 0, min: 0, max: 0, stdev: 0, samples: [] };
        }
        samples.sort(function(a, b) { return a - b; });
        var sum = samples.reduce(function(a, b) { return a + b; }, 0);
        var mean = sum / samples.length;
        var median = samples[Math.floor(samples.length / 2)];
        var min = samples[0];
        var max = samples[samples.length - 1];
        var variance = samples.reduce(function(acc, s) {
          return acc + (s - mean) * (s - mean);
        }, 0) / samples.length;
        var stdev = Math.sqrt(variance);
        return { mean: mean, median: median, min: min, max: max, stdev: stdev, samples: samples };
      });
    },

    /**
     * Create a timing context that tracks wall clock time
     * and computes estimated execution time after network latency subtraction.
     */
    createContext: function() {
      var startTime = Timer.now();
      var resolution = Timer.resolution();
      return {
        startTime: startTime,
        /**
         * Stop the timer and compute results.
         * @param {Object} [latencyStats] - Pre-calibrated latency stats
         * @returns {Object} Timing results
         */
        stop: function(latencyStats) {
          var endTime = Timer.now();
          var wallTimeMs = endTime - startTime;

          // Estimate server-side execution time by subtracting network RTT
          var networkLatencyMs = 0;
          var latencyUncertaintyMs = 0;
          if (latencyStats && latencyStats.median > 0) {
            // Use median RTT as estimate (more robust than mean)
            networkLatencyMs = latencyStats.median;
            // Uncertainty = 1 standard deviation of latency samples
            latencyUncertaintyMs = latencyStats.stdev || 0;
          }

          var estimatedExecMs = Math.max(0, wallTimeMs - networkLatencyMs);
          // Total error margin = timer resolution + latency uncertainty
          var errorMarginMs = resolution + latencyUncertaintyMs;

          return {
            // Total wall-clock time (what the user actually waited)
            wallTimeMs: round(wallTimeMs, 2),
            // Estimated server-side execution time (wall - network)
            executionTimeMs: round(estimatedExecMs, 2),
            // Network round-trip time estimate
            networkLatencyMs: round(networkLatencyMs, 2),
            // Error margin (±) on the execution time
            errorMarginMs: round(errorMarginMs, 2),
            // Timer resolution
            timerResolutionMs: resolution,
            // Human-readable summary
            summary: formatTiming(wallTimeMs, estimatedExecMs, errorMarginMs),
          };
        },
      };
    },
  };

  function round(n, decimals) {
    var f = Math.pow(10, decimals);
    return Math.round(n * f) / f;
  }

  function formatTiming(wallMs, execMs, errorMs) {
    function fmt(ms) {
      if (ms >= 1000) return round(ms / 1000, 2) + 's';
      return round(ms, 1) + 'ms';
    }
    var s = 'Wall: ' + fmt(wallMs);
    s += '  |  Exec: ~' + fmt(execMs);
    if (errorMs > 0) {
      s += ' (±' + fmt(errorMs) + ')';
    }
    return s;
  }

  // ============================================================
  // Internal State
  // ============================================================
  var _config = assign({}, DEFAULT_CONFIG);
  var _cachedCompilerList = null;
  var _listeners = {};
  var _latencyStats = null; // Cached latency calibration

  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var src = arguments[i];
      if (src) {
        for (var key in src) {
          if (src.hasOwnProperty(key)) target[key] = src[key];
        }
      }
    }
    return target;
  }

  // ============================================================
  // Utility Functions
  // ============================================================

  function log(level) {
    if (_config.verbose || level === 'error') {
      var prefix = '[CPCompiler ' + level.toUpperCase() + ']';
      var args = [prefix];
      for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
      if (level === 'error') console.error.apply(console, args);
      else if (level === 'warn') console.warn.apply(console, args);
      else console.log.apply(console, args);
    }
  }

  function emit(event, data) {
    if (_listeners[event]) {
      _listeners[event].forEach(function(fn) {
        try { fn(data); } catch(e) { log('error', 'Event listener error:', e); }
      });
    }
  }

  /**
   * Detect language from compiler name
   */
  function detectLanguage(compilerName) {
    if (!compilerName) return 'cpp';
    if (compilerName.indexOf('cpython') === 0 || compilerName.indexOf('pypy') === 0) {
      return 'python';
    }
    return 'cpp';
  }

  /**
   * Make an HTTP request with timeout support
   */
  function request(url, options) {
    options = options || {};
    var timeout = options.timeout || _config.timeout;

    if (_config.corsProxy && url.indexOf(_config.corsProxy) !== 0) {
      url = _config.corsProxy + url;
    }

    return new Promise(function(resolve, reject) {
      var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      var timeoutId = null;

      if (timeout > 0) {
        timeoutId = setTimeout(function() {
          if (controller) controller.abort();
          reject(new Error('Request timed out after ' + timeout + 'ms'));
        }, timeout);
      }

      var fetchOptions = {
        method: options.method || 'GET',
        headers: options.headers || {},
        body: options.body || undefined,
      };
      if (controller) fetchOptions.signal = controller.signal;

      fetch(url, fetchOptions)
        .then(function(response) {
          clearTimeout(timeoutId);
          if (!response.ok) {
            throw new Error('HTTP ' + response.status + ': ' + response.statusText);
          }
          return response.json();
        })
        .then(resolve)
        .catch(function(err) {
          clearTimeout(timeoutId);
          if (err.name === 'AbortError') {
            reject(new Error('Request was aborted (timeout or cancel)'));
          } else {
            reject(err);
          }
        });
    });
  }

  // ============================================================
  // Public API
  // ============================================================

  var CPCompiler = {};

  /**
   * Configure the compiler library.
   * 
   * @param {Object} opts
   * @param {string} [opts.language='cpp'] - Default language: 'cpp' or 'python'
   * @param {string} [opts.compiler='gcc-13.2.0'] - Default C++ compiler
   * @param {string} [opts.pythonCompiler='cpython-3.12.7'] - Default Python compiler
   * @param {string} [opts.std='c++17'] - Default C++ standard
   * @param {string} [opts.optimize='O2'] - Default optimization (C++ only)
   * @param {number} [opts.timeout=30000] - Request timeout ms
   * @param {boolean} [opts.verbose=false] - Verbose logging
   * @param {string} [opts.corsProxy=null] - CORS proxy URL
   * @param {number} [opts.calibrationPings=3] - Number of latency calibration pings
   * @returns {Object} Current config
   */
  CPCompiler.configure = function(opts) {
    if (opts) assign(_config, opts);
    log('info', 'Configuration updated:', _config);
    return assign({}, _config);
  };

  CPCompiler.getConfig = function() { return assign({}, _config); };

  CPCompiler.resetConfig = function() {
    _config = assign({}, DEFAULT_CONFIG);
    _latencyStats = null;
    return assign({}, _config);
  };

  /**
   * Register an event listener.
   * Events: compile:start, compile:success, compile:error,
   *         run:start, run:success, run:error, timing
   */
  CPCompiler.on = function(event, callback) {
    if (!_listeners[event]) _listeners[event] = [];
    _listeners[event].push(callback);
    return function() {
      _listeners[event] = _listeners[event].filter(function(fn) { return fn !== callback; });
    };
  };

  CPCompiler.off = function(event) {
    if (event) delete _listeners[event];
    else _listeners = {};
  };

  /**
   * Get available compilers, optionally filtered by language.
   * 
   * @param {Object} [opts]
   * @param {string} [opts.language] - Filter: 'C++', 'Python', or null for all
   * @param {boolean} [opts.forceRefresh=false] - Force API fetch
   * @returns {Promise<Array>}
   */
  CPCompiler.getCompilers = function(opts) {
    opts = opts || {};
    var langFilter = opts.language || null;
    var forceRefresh = opts.forceRefresh || false;

    if (_cachedCompilerList && !forceRefresh) {
      var list = _cachedCompilerList;
      if (langFilter) list = list.filter(function(c) { return c.language === langFilter; });
      return Promise.resolve(list);
    }

    return request(_config.listUrl, { timeout: 15000 })
      .then(function(data) {
        _cachedCompilerList = data
          .filter(function(c) { return c.language === 'C++' || c.language === 'Python'; })
          .map(function(c) {
            return {
              name: c.name,
              display: c['display-name'] + ' ' + c.version,
              version: c.version,
              language: c.language,
            };
          });
        log('info', 'Fetched ' + _cachedCompilerList.length + ' compilers (C++ & Python)');
        var list = _cachedCompilerList;
        if (langFilter) list = list.filter(function(c) { return c.language === langFilter; });
        return list;
      })
      .catch(function(err) {
        log('warn', 'Failed to fetch compiler list, using built-in:', err.message);
        var all = KNOWN_COMPILERS['C++'].concat(KNOWN_COMPILERS['Python']);
        if (langFilter) return all.filter(function(c) { return c.language === langFilter; });
        return all;
      });
  };

  /**
   * Get supported C++ standards.
   */
  CPCompiler.getStandards = function() { return Object.keys(STD_OPTIONS); };

  /**
   * Get supported languages.
   */
  CPCompiler.getLanguages = function() { return ['cpp', 'python']; };

  CPCompiler.isSupported = function() { return typeof fetch !== 'undefined'; };

  CPCompiler.init = function() {
    log('info', 'CPCompiler v3.0.0 initialized (Wandbox API backend, C++ & Python)');
    return Promise.resolve();
  };

  /**
   * Calibrate network latency for accurate timing.
   * Call this once before running multiple compilations for best accuracy.
   * Results are cached and reused automatically.
   * 
   * @param {number} [pingCount] - Number of pings (default from config)
   * @returns {Promise<Object>} Latency statistics
   */
  CPCompiler.calibrateLatency = function(pingCount) {
    pingCount = pingCount || _config.calibrationPings;
    log('info', 'Calibrating network latency with ' + pingCount + ' pings...');
    return Timer.calibrateLatency(_config.apiUrl, pingCount).then(function(stats) {
      _latencyStats = stats;
      log('info', 'Latency calibrated: median=' + round(stats.median, 1) + 'ms, stdev=' + round(stats.stdev, 1) + 'ms');
      emit('calibration', stats);
      return stats;
    });
  };

  /**
   * Get the current latency stats (or null if not calibrated).
   */
  CPCompiler.getLatencyStats = function() {
    return _latencyStats ? assign({}, _latencyStats) : null;
  };

  /**
   * Expose the Timer for advanced users.
   */
  CPCompiler.Timer = Timer;

  /**
   * Compile AND run code in one step (C++ or Python).
   * 
   * @param {Object} options
   * @param {string} options.code - Source code
   * @param {string} [options.language='cpp'] - 'cpp' or 'python'
   * @param {string} [options.input=''] - stdin input
   * @param {string} [options.std='c++17'] - C++ standard (ignored for Python)
   * @param {string} [options.compiler] - Compiler name (auto-detected if omitted)
   * @param {string} [options.optimize] - Optimization level (C++ only)
   * @param {string[]} [options.flags=[]] - Extra compiler flags
   * @param {number} [options.timeout] - Timeout ms
   * @param {boolean} [options.measureLatency=false] - Auto-calibrate before running
   * @returns {Promise<Object>} Result with timing info
   */
  CPCompiler.compileAndRun = function(options) {
    if (!options || !options.code) {
      return Promise.reject(new Error('options.code is required'));
    }

    // Determine language
    var lang = options.language || _config.language || 'cpp';
    if (options.compiler) {
      lang = detectLanguage(options.compiler);
    }
    var isPython = (lang === 'python');

    // Pick compiler
    var compiler;
    if (options.compiler) {
      compiler = options.compiler;
    } else if (isPython) {
      compiler = _config.pythonCompiler;
    } else {
      compiler = _config.compiler;
    }

    var std = (!isPython && (options.std || _config.std)) || '';
    var optimize = (!isPython && (options.optimize || _config.optimize)) || '';
    var flags = options.flags || [];
    var timeout = options.timeout || _config.timeout;
    var measureLatency = options.measureLatency || false;

    log('info', 'Running [' + lang + '] with:', compiler, isPython ? '' : 'std=' + std);

    emit('compile:start', { language: lang, compiler: compiler, std: std });
    emit('run:start', { language: lang, compiler: compiler });

    // Optionally calibrate latency first
    var calibrationPromise;
    if (measureLatency && !_latencyStats) {
      calibrationPromise = CPCompiler.calibrateLatency();
    } else {
      calibrationPromise = Promise.resolve(_latencyStats);
    }

    return calibrationPromise.then(function(latencyStats) {
      // Start precise timer
      var timer = Timer.createContext();

      // Build request body
      var requestBody = {
        compiler: compiler,
        code: options.code,
        stdin: options.input || '',
      };

      if (!isPython) {
        // C++ specific options
        if (std) requestBody.options = std;
        var compilerOptionParts = [];
        if (optimize) compilerOptionParts.push('-' + optimize);
        if (flags.length > 0) compilerOptionParts.push(flags.join('\n'));
        requestBody['compiler-option-raw'] = compilerOptionParts.join('\n');
        requestBody['runtime-option-raw'] = '';
      } else {
        // Python specific
        if (flags.length > 0) {
          requestBody['runtime-option-raw'] = flags.join('\n');
        }
      }

      return request(_config.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        timeout: timeout,
      })
      .then(function(data) {
        // Stop timer and compute timing
        var timing = timer.stop(latencyStats);
        log('info', 'Timing:', timing.summary);
        emit('timing', timing);

        log('info', 'API response:', data);

        var exitCode = parseInt(data.status, 10) || 0;
        var programOutput = data.program_output || '';
        var programError = data.program_error || '';
        var compilerOutput = data.compiler_output || '';
        var compilerError = data.compiler_error || '';
        var signal = data.signal || '';

        // Error classification
        var isCompileError = (exitCode !== 0 && !programOutput && (compilerError || (!isPython && !programError)));
        var isRuntimeError = (exitCode !== 0 && !isCompileError);

        // For Python, runtime errors show in program_error
        if (isPython && exitCode !== 0 && programError) {
          isCompileError = false;
          isRuntimeError = true;
        }

        if (isCompileError) {
          var errorMsg = compilerError || compilerOutput || 'Compilation failed';
          emit('compile:error', { error: errorMsg });
          return {
            success: false,
            language: lang,
            error: errorMsg,
            compilerOutput: compilerOutput,
            exitCode: exitCode,
            signal: signal,
            timing: timing,
          };
        }

        if (isRuntimeError) {
          var runtimeErr = programError || signal || ('Exit code: ' + exitCode);
          emit('run:error', { error: runtimeErr, output: programOutput });
          return {
            success: false,
            language: lang,
            output: programOutput,
            error: runtimeErr,
            compilerOutput: compilerOutput + (compilerError ? '\n' + compilerError : ''),
            exitCode: exitCode,
            signal: signal,
            timing: timing,
          };
        }

        // Success
        emit('compile:success', { compilerOutput: compilerOutput });
        emit('run:success', { output: programOutput });
        return {
          success: true,
          language: lang,
          output: programOutput,
          compilerOutput: compilerOutput + (compilerError ? '\n' + compilerError : ''),
          exitCode: exitCode,
          signal: signal,
          timing: timing,
        };
      })
      .catch(function(err) {
        var timing = timer.stop(latencyStats);
        log('error', 'compileAndRun error:', err);
        emit('compile:error', { error: err.message });
        return {
          success: false,
          language: lang,
          error: err.message || String(err),
          timing: timing,
        };
      });
    });
  };

  /** Backward-compat alias */
  CPCompiler.compileAndRunCpp = CPCompiler.compileAndRun;

  /**
   * Compile C++ code only (syntax check).
   */
  CPCompiler.compileCpp = function(options) {
    if (!options || !options.code) {
      return Promise.reject(new Error('options.code is required'));
    }
    var compileOnlyFlags = (options.flags || []).slice();
    compileOnlyFlags.push('-fsyntax-only');
    return CPCompiler.compileAndRun({
      code: options.code,
      language: 'cpp',
      std: options.std,
      compiler: options.compiler,
      optimize: options.optimize,
      flags: compileOnlyFlags,
      input: '',
      timeout: options.timeout,
    }).then(function(result) {
      if (result.success || (!result.error && result.exitCode === 0)) {
        return { success: true, compilerOutput: result.compilerOutput || 'Compilation successful.', timing: result.timing };
      }
      return { success: false, error: result.error, compilerOutput: result.compilerOutput, timing: result.timing };
    });
  };

  /**
   * Quick-run: compile and run with minimal config.
   * @param {string} code - Source code
   * @param {string} [input] - stdin input
   * @param {string} [language] - 'cpp' or 'python'
   * @returns {Promise<Object>}
   */
  CPCompiler.run = function(code, input, language) {
    return CPCompiler.compileAndRun({
      code: code,
      input: input || '',
      language: language || _config.language,
    });
  };

  /**
   * Quick-run Python code.
   * @param {string} code - Python source code
   * @param {string} [input] - stdin input
   * @returns {Promise<Object>}
   */
  CPCompiler.runPython = function(code, input) {
    return CPCompiler.compileAndRun({
      code: code,
      input: input || '',
      language: 'python',
    });
  };

  /**
   * Backward compatibility.
   */
  CPCompiler.runWasm = function(options) {
    return CPCompiler.compileAndRun(options);
  };

  /**
   * Get assembly output (C++ only).
   */
  CPCompiler.getAssembly = function(options) {
    if (!options || !options.code) return Promise.reject(new Error('options.code is required'));
    var asmFlags = (options.flags || []).slice();
    asmFlags.push('-S');
    asmFlags.push('-masm=intel');
    return CPCompiler.compileAndRun({
      code: options.code, language: 'cpp', std: options.std,
      compiler: options.compiler, optimize: options.optimize,
      flags: asmFlags, input: '', timeout: options.timeout,
    });
  };

  /**
   * Health check.
   */
  CPCompiler.healthCheck = function() {
    var startTime = Timer.now();
    return CPCompiler.run('#include<iostream>\nint main(){std::cout<<"ok";}', '', 'cpp')
      .then(function(result) {
        return {
          healthy: result.success && result.output && result.output.trim() === 'ok',
          latencyMs: round(Timer.now() - startTime, 1),
          compiler: _config.compiler,
          result: result,
        };
      })
      .catch(function(err) {
        return { healthy: false, error: err.message, latencyMs: round(Timer.now() - startTime, 1) };
      });
  };

  CPCompiler.version = '3.0.0';

  return CPCompiler;
}));
