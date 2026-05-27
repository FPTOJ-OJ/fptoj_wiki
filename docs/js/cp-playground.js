/**
 * CPPlayground v2 - Compact, lazy-loaded code editor with CodeMirror 5
 * UI/UX Enhanced & Double-Scrollbar Bug Fixed
 */
(function() {
  'use strict';

  // Chuyển CSS sang dạng chuỗi nối để dễ đọc và bảo trì hơn
  var CSS = 
    '.cp-pg { border: 1px solid var(--md-default-fg-color--lightest, #ddd); border-radius: 8px; margin: 1.5em 0; overflow: hidden; font-family: var(--md-code-font, monospace); background: var(--md-default-bg-color, #fff); box-shadow: 0 4px 6px rgba(0,0,0,0.02); transition: box-shadow 0.2s; }\n' +
    '.cp-pg:hover { box-shadow: 0 6px 12px rgba(0,0,0,0.05); }\n' +
    '.cp-pg-bar { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: var(--md-code-bg-color, #f8f9fa); border-bottom: 1px solid var(--md-default-fg-color--lightest, #ddd); flex-wrap: wrap; }\n' +
    '.cp-pg-bar select { font-size: 13px; padding: 4px 8px; border-radius: 4px; border: 1px solid var(--md-default-fg-color--lightest, #ccc); background: var(--md-default-bg-color, #fff); color: inherit; outline: none; cursor: pointer; }\n' +
    '.cp-pg-bar .cp-run { padding: 5px 16px; border: none; border-radius: 4px; font-size: 13px; font-weight: 600; cursor: pointer; background: #2196f3; color: #fff; transition: 0.2s; box-shadow: 0 2px 4px rgba(33, 150, 243, 0.2); }\n' +
    '.cp-pg-bar .cp-run:hover { background: #1976d2; box-shadow: 0 2px 6px rgba(25, 118, 210, 0.4); }\n' +
    '.cp-pg-bar .cp-run:disabled { background: #90caf9; cursor: wait; box-shadow: none; }\n' +
    '.cp-pg-bar .cp-reset { padding: 5px 12px; border: 1px solid var(--md-default-fg-color--lightest, #ccc); border-radius: 4px; font-size: 13px; background: transparent; color: var(--md-default-fg-color--light, #666); cursor: pointer; transition: 0.2s; }\n' +
    '.cp-pg-bar .cp-reset:hover { background: var(--md-default-fg-color--lightest, #eee); color: var(--md-default-fg-color, #333); }\n' +
    '.cp-pg-bar .cp-info { margin-left: auto; font-size: 11px; color: var(--md-default-fg-color--light, #999); display: flex; align-items: center; gap: 4px; }\n' +
    
    /* FIX DOUBLE SCROLLBAR: Không dùng overflow: auto ở .CodeMirror, quản lý max-height ở .CodeMirror-scroll */
    '.cp-pg .CodeMirror { height: auto; font-size: 14px; line-height: 1.5; border: none; }\n' +
    '.cp-pg .CodeMirror-scroll { min-height: 120px; max-height: 450px; }\n' +
    
    /* Responsive I/O Grid */
    '.cp-pg-io { display: grid; grid-template-columns: 1fr; border-top: 1px solid var(--md-default-fg-color--lightest, #ddd); }\n' +
    '@media (min-width: 600px) { .cp-pg-io { grid-template-columns: 1fr 1fr; } .cp-pg-io > div:first-child { border-right: 1px solid var(--md-default-fg-color--lightest, #ddd); } }\n' +
    
    '.cp-pg-io > div { display: flex; flex-direction: column; }\n' +
    '.cp-pg-io small { display: block; padding: 6px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--md-default-fg-color--light, #888); background: var(--md-code-bg-color, #f8f9fa); border-bottom: 1px solid var(--md-default-fg-color--lightest, #ddd); }\n' +
    '.cp-pg-io textarea { flex-grow: 1; width: 100%; min-height: 60px; padding: 8px 10px; border: none; resize: vertical; font-family: var(--md-code-font, monospace); font-size: 13px; line-height: 1.5; background: var(--md-default-bg-color, #fff); color: inherit; outline: none; box-sizing: border-box; transition: background 0.2s; }\n' +
    '.cp-pg-io textarea:focus { background: var(--md-code-bg-color, #fafafa); }\n' +
    '.cp-pg-res { border-top: 1px solid var(--md-default-fg-color--lightest, #ddd); padding: 0; }\n' +
    '.cp-pg-res-bar { display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: var(--md-code-bg-color, #f8f9fa); border-bottom: 1px solid var(--md-default-fg-color--lightest, #ddd); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--md-default-fg-color--light, #888); }\n' +
    '.cp-pg-res-bar .cp-badge { padding: 2px 8px; border-radius: 12px; font-size: 10px; font-weight: 700; letter-spacing: 0.5px; }\n' +
    '.cp-pg-res-bar .cp-bp { background: #4caf50; color: #fff; box-shadow: 0 2px 4px rgba(76, 175, 80, 0.2); }\n' +
    '.cp-pg-res-bar .cp-bf { background: #f44336; color: #fff; box-shadow: 0 2px 4px rgba(244, 67, 54, 0.2); }\n' +
    '.cp-pg-res-bar .cp-be { background: #ff9800; color: #fff; box-shadow: 0 2px 4px rgba(255, 152, 0, 0.2); }\n' +
    '.cp-pg-res-bar .cp-br { background: #2196f3; color: #fff; animation: cp-p 1s infinite; }\n' +
    '.cp-pg-res pre { margin: 0; padding: 10px; font-size: 13px; line-height: 1.5; white-space: pre-wrap; word-break: break-all; max-height: 200px; overflow-y: auto; background: var(--md-default-bg-color, #fff); }\n' +
    '.cp-pg-res pre.err { color: #d32f2f; background: #fff5f5; }\n' +
    '.cp-pg-res pre.ok { color: #2e7d32; background: #f1f8e9; }\n' +
    
    /* Toggles (Expect & Hint) */
    '.cp-pg-expect, .cp-pg-hint { border-top: 1px solid var(--md-default-fg-color--lightest, #ddd); }\n' +
    '.cp-pg-expect-btn, .cp-pg-hint-btn { display: block; width: 100%; padding: 8px 12px; border: none; background: var(--md-code-bg-color, #f8f9fa); color: var(--md-default-fg-color--light, #666); font-size: 12px; font-weight: 600; cursor: pointer; text-align: left; transition: 0.2s; outline: none; }\n' +
    '.cp-pg-expect-btn:hover, .cp-pg-hint-btn:hover { background: var(--md-default-fg-color--lightest, #eee); color: var(--md-default-fg-color, #333); }\n' +
    '.cp-pg-expect-btn::before, .cp-pg-hint-btn::before { content: "▸ "; display: inline-block; width: 14px; transition: transform 0.2s; }\n' +
    '.cp-pg-expect-btn.open::before, .cp-pg-hint-btn.open::before { transform: rotate(90deg); }\n' +
    '.cp-pg-expect-body, .cp-pg-hint-body { display: none; padding: 10px 12px; font-size: 13px; line-height: 1.5; background: var(--md-default-bg-color, #fff); border-top: 1px solid var(--md-default-fg-color--lightest, #eee); }\n' +
    '.cp-pg-expect-body { white-space: pre-wrap; word-break: break-all; font-family: var(--md-code-font, monospace); max-height: 150px; overflow-y: auto; color: #555; }\n' +
    '.cp-pg-expect-body.show, .cp-pg-hint-body.show { display: block; }\n' +
    '.cp-pg-time { padding: 4px 12px; font-size: 11px; font-style: italic; color: var(--md-default-fg-color--lighter, #aaa); text-align: right; background: var(--md-code-bg-color, #f8f9fa); border-top: 1px solid var(--md-default-fg-color--lightest, #ddd); }\n' +
    '.cp-pg-placeholder { padding: 40px 20px; text-align: center; color: var(--md-default-fg-color--lighter, #bbb); font-size: 13px; min-height: 200px; display: flex; align-items: center; justify-content: center; background: var(--md-code-bg-color, #f8f9fa); }\n' +
    
    /* Scrollbar styling cho UI mượt hơn */
    '.cp-pg *::-webkit-scrollbar { width: 6px; height: 6px; }\n' +
    '.cp-pg *::-webkit-scrollbar-track { background: transparent; }\n' +
    '.cp-pg *::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }\n' +
    '.cp-pg *::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.3); }\n' +
    
    '@keyframes cp-p { 0%, 100% { opacity: 1 } 50% { opacity: 0.5 } }\n' +
    
    /* DARK MODE (Slate) Variables Overrides */
    '[data-md-color-scheme=slate] .cp-pg { border-color: #3f3f4e; background: #1e1e2e; box-shadow: 0 4px 6px rgba(0,0,0,0.2); }\n' +
    '[data-md-color-scheme=slate] .cp-pg-bar { background: #181825; border-color: #3f3f4e; }\n' +
    '[data-md-color-scheme=slate] .cp-pg-bar select { background: #28283d; color: #cdd6f4; border-color: #444; }\n' +
    '[data-md-color-scheme=slate] .cp-pg .CodeMirror { background: #1e1e2e; color: #cdd6f4; }\n' +
    '[data-md-color-scheme=slate] .cp-pg .CodeMirror-gutters { background: #181825; border-right: 1px solid #3f3f4e; }\n' +
    '[data-md-color-scheme=slate] .cp-pg .CodeMirror-cursor { border-left-color: #cdd6f4; }\n' +
    '[data-md-color-scheme=slate] .cp-pg .CodeMirror-activeline-background { background: rgba(255,255,255,0.05); }\n' +
    '[data-md-color-scheme=slate] .cp-pg .CodeMirror-selected { background: #45475a; }\n' +
    '[data-md-color-scheme=slate] .cp-pg-io { border-color: #3f3f4e; }\n' +
    '[data-md-color-scheme=slate] .cp-pg-io small { background: #181825; border-color: #3f3f4e; color: #a6adc8; }\n' +
    '[data-md-color-scheme=slate] .cp-pg-io textarea { background: #1e1e2e; color: #cdd6f4; }\n' +
    '[data-md-color-scheme=slate] .cp-pg-io textarea:focus { background: #222234; }\n' +
    '@media (min-width: 600px) { [data-md-color-scheme=slate] .cp-pg-io > div:first-child { border-color: #3f3f4e; } }\n' +
    '[data-md-color-scheme=slate] .cp-pg-res { border-color: #3f3f4e; }\n' +
    '[data-md-color-scheme=slate] .cp-pg-res-bar { background: #181825; border-color: #3f3f4e; color: #a6adc8; }\n' +
    '[data-md-color-scheme=slate] .cp-pg-res pre { background: #1e1e2e; color: #cdd6f4; }\n' +
    '[data-md-color-scheme=slate] .cp-pg-res pre.err { background: rgba(244, 67, 54, 0.1); color: #ff5252; }\n' +
    '[data-md-color-scheme=slate] .cp-pg-res pre.ok { background: rgba(76, 175, 80, 0.1); color: #69f0ae; }\n' +
    '[data-md-color-scheme=slate] .cp-pg-expect, [data-md-color-scheme=slate] .cp-pg-hint { border-color: #3f3f4e; }\n' +
    '[data-md-color-scheme=slate] .cp-pg-expect-btn, [data-md-color-scheme=slate] .cp-pg-hint-btn { background: #181825; color: #a6adc8; }\n' +
    '[data-md-color-scheme=slate] .cp-pg-expect-btn:hover, [data-md-color-scheme=slate] .cp-pg-hint-btn:hover { background: #28283d; color: #cdd6f4; }\n' +
    '[data-md-color-scheme=slate] .cp-pg-expect-body, [data-md-color-scheme=slate] .cp-pg-hint-body { background: #1e1e2e; color: #cdd6f4; border-color: #3f3f4e; }\n' +
    '[data-md-color-scheme=slate] .cp-pg-time { border-color: #3f3f4e; background: #181825; color: #6c7086; }\n' +
    '[data-md-color-scheme=slate] .cp-pg-placeholder { background: #181825; color: #6c7086; }\n' +
    '[data-md-color-scheme=slate] .cp-pg *::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); }\n' +
    '[data-md-color-scheme=slate] .cp-pg *::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }';

  function injectCSS() {
    if (document.getElementById('cp-pg-css')) return;
    var s = document.createElement('style');
    s.id = 'cp-pg-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function esc(s) {
    var d = document.createElement('div');
    d.appendChild(document.createTextNode(s));
    return d.innerHTML;
  }

  function unesc(s) {
    var t = document.createElement('textarea');
    t.innerHTML = s;
    return t.value.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
  }

  var KW_CPP = 'auto bool break case catch char class const continue default delete do double else enum explicit extern false float for friend goto if inline int long namespace new nullptr operator private protected public return short signed sizeof static struct switch template this throw true try typedef typename union unsigned using virtual void volatile while vector map set pair queue stack deque priority_queue bitset string array unordered_map unordered_set push_back pop_back push pop front back begin end size empty clear insert erase find sort reverse unique lower_bound upper_bound min max swap abs gcd lcm cin cout endl scanf printf to_string accumulate fill copy count next_permutation #include #define bits/stdc++.h iostream algorithm cstdio cstring cmath climits cassert'.split(' ');
  var KW_PY = 'and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield True False None print input int float str list dict set tuple bool len range enumerate zip map filter sorted reversed min max sum abs round pow divmod append extend insert remove pop clear index count sort reverse keys values items get update copy split join strip replace startswith endswith find upper lower isdigit isalpha defaultdict Counter deque heapq bisect itertools collections math sys os functools operator'.split(' ');

  function hintFn(kwList, cm) {
    var cur = cm.getCursor(), tok = cm.getTokenAt(cur);
    if (tok.string.length < 2) return null;
    var w = tok.string.toLowerCase();
    var list = kwList.filter(function(k) { return k.toLowerCase().indexOf(w) === 0 && k !== tok.string; });
    var val = cm.getValue().split(/[\s\(\)\{\}\[\];,.<>:=+\-*/!&|]+/);
    val.forEach(function(k) {
      if (k.length > 2 && k.toLowerCase().indexOf(w) === 0 && k !== tok.string && list.indexOf(k) === -1) list.push(k);
    });
    return { list: list.slice(0, 15), from: CodeMirror.Pos(cur.line, tok.start), to: CodeMirror.Pos(cur.line, cur.ch) };
  }

  function getTheme() {
    var el = document.querySelector('[data-md-color-scheme]');
    if (el) return el.getAttribute('data-md-color-scheme');
    var body = document.body;
    if (body) return body.getAttribute('data-md-color-scheme') || '';
    return '';
  }

  function isDark() {
    return getTheme() === 'slate';
  }

  function buildUI(c) {
    var lang = c.getAttribute('data-language') || 'cpp';
    var starter = unesc(c.getAttribute('data-starter') || '');
    var inp = unesc(c.getAttribute('data-input') || '');
    var exp = unesc(c.getAttribute('data-expected') || '');
    var hint = c.getAttribute('data-hint') || '';
    var h = parseInt(c.getAttribute('data-height') || '120', 10);

    var html = '<div class="cp-pg-bar">' +
      '<select class="cp-lang"><option value="text/x-c++src"' + (lang === 'cpp' ? ' selected' : '') + '>C++</option><option value="python"' + (lang === 'python' ? ' selected' : '') + '>Python</option></select>' +
      '<button class="cp-run">▶ Chạy</button>' +
      '<button class="cp-reset" title="Khôi phục mã ban đầu">↺</button>' +
      '<span class="cp-info">Ctrl+Enter</span></div>' +
      '<div class="cp-pg-editor"><textarea class="cp-code"></textarea></div>' +
      '<div class="cp-pg-io"><div><small>Input</small><textarea class="cp-inp" placeholder="Nhập stdin...">' + esc(inp) + '</textarea></div>' +
      '<div><small>Output</small><textarea class="cp-out" readonly placeholder="Kết quả hiển thị tại đây..."></textarea></div></div>' +
      '<div class="cp-pg-res"><div class="cp-pg-res-bar"><span class="cp-rmsg"></span><span class="cp-badge cp-bp" style="display:none">PASS</span><span class="cp-badge cp-bf" style="display:none">FAIL</span><span class="cp-badge cp-be" style="display:none">ERROR</span><span class="cp-badge cp-br" style="display:none">...</span></div><pre class="cp-rpre"></pre></div>';

    if (exp) {
      html += '<div class="cp-pg-expect"><button class="cp-pg-expect-btn">Xem kết quả mong đợi</button><div class="cp-pg-expect-body">' + esc(exp) + '</div></div>';
    }
    if (hint) {
      html += '<div class="cp-pg-hint"><button class="cp-pg-hint-btn">💡 Gợi ý</button><div class="cp-pg-hint-body">' + hint + '</div></div>';
    }

    html += '<div class="cp-pg-time cp-time"></div>';
    c.innerHTML = html;

    var ebtn = c.querySelector('.cp-pg-expect-btn');
    var ebody = c.querySelector('.cp-pg-expect-body');
    if (ebtn && ebody) {
      ebtn.addEventListener('click', function() {
        ebody.classList.toggle('show');
        ebtn.classList.toggle('open');
      });
    }
    var hbtn = c.querySelector('.cp-pg-hint-btn');
    var hbody = c.querySelector('.cp-pg-hint-body');
    if (hbtn && hbody) {
      hbtn.addEventListener('click', function() {
        hbody.classList.toggle('show');
        hbtn.classList.toggle('open');
      });
    }

    var codeTA = c.querySelector('.cp-code');
    codeTA.value = starter;
    var cmMode = lang === 'python' ? 'python' : 'text/x-c++src';
    var kwList = lang === 'python' ? KW_PY : KW_CPP;

    var ed = CodeMirror.fromTextArea(codeTA, {
      mode: cmMode,
      lineNumbers: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      styleActiveLine: true,
      indentUnit: 4, tabSize: 4, indentWithTabs: false, lineWrapping: true,
      theme: isDark() ? 'monokai' : 'default',
      viewportMargin: Infinity, /* Giúp loại bỏ scrollbar lồng nhau */
      extraKeys: {
        'Ctrl-Enter': function() { c.querySelector('.cp-run').click(); },
        'Cmd-Enter': function() { c.querySelector('.cp-run').click(); },
        'Tab': function(cm) { cm.somethingSelected() ? cm.indentSelection('add') : cm.replaceSelection('    ', 'end'); },
        'Ctrl-Space': function(cm) { cm.showHint({ hint: function(cm2) { return hintFn(kwList, cm2); }, completeSingle: false }); },
      },
    });
    
    // SetSize được điều chỉnh để không fix cứng height gây ra thanh cuộn kép. Chiều cao tối đa sẽ do CSS quản lý.
    ed.setSize(null, 'auto');

    ed.on('inputRead', function(cm, ch) {
      if (ch.origin === '+input' || ch.origin === 'paste') {
        var t = ch.text[0];
        if (t && /[a-zA-Z_.#]/.test(t)) cm.showHint({ hint: function(cm2) { return hintFn(kwList, cm2); }, completeSingle: false });
      }
    });

    function syncTheme() {
      ed.setOption('theme', isDark() ? 'monokai' : 'default');
    }
    var obs1 = new MutationObserver(syncTheme);
    obs1.observe(document.documentElement, { attributes: true, attributeFilter: ['data-md-color-scheme', 'data-user-color-scheme'] });
    if (document.body) {
      var obs2 = new MutationObserver(syncTheme);
      obs2.observe(document.body, { attributes: true, attributeFilter: ['data-md-color-scheme', 'data-user-color-scheme'] });
    }
    var themeEls = document.querySelectorAll('[data-md-color-scheme]');
    for (var ti = 0; ti < themeEls.length; ti++) {
      if (themeEls[ti] !== document.documentElement && themeEls[ti] !== document.body) {
        new MutationObserver(syncTheme).observe(themeEls[ti], { attributes: true, attributeFilter: ['data-md-color-scheme'] });
      }
    }
    var themeCheckCount = 0;
    var themeCheckInterval = setInterval(function() {
      syncTheme();
      themeCheckCount++;
      if (themeCheckCount > 10) clearInterval(themeCheckInterval);
    }, 500);

    var langSel = c.querySelector('.cp-lang');
    langSel.addEventListener('change', function() {
      ed.setOption('mode', this.value);
      kwList = this.value === 'python' ? KW_PY : KW_CPP;
    });

    var runBtn = c.querySelector('.cp-run');
    var resetBtn = c.querySelector('.cp-reset');
    var inpEl = c.querySelector('.cp-inp');
    var outEl = c.querySelector('.cp-out');
    var rpre = c.querySelector('.cp-rpre');
    var rmsg = c.querySelector('.cp-rmsg');
    var bp = c.querySelector('.cp-bp'), bf = c.querySelector('.cp-bf'), be = c.querySelector('.cp-be'), br = c.querySelector('.cp-br');
    var timeEl = c.querySelector('.cp-time');
    var origCode = starter, origInp = inp;

    function hideB() { [bp,bf,be,br].forEach(function(b){if(b) b.style.display='none';}); }

    resetBtn.addEventListener('click', function() {
      ed.setValue(origCode); inpEl.value = origInp; outEl.value = '';
      rpre.textContent = ''; rpre.className = 'cp-rpre'; rmsg.textContent = ''; timeEl.textContent = ''; hideB();
    });

    runBtn.addEventListener('click', function() {
      var code = ed.getValue().trim();
      if (!code) { rpre.textContent = 'Vui lòng nhập code trước khi chạy!'; rpre.className = 'cp-rpre err'; return; }
      var lang = langSel.value === 'python' ? 'python' : 'cpp';

      runBtn.disabled = true; runBtn.textContent = '⏳'; rmsg.textContent = 'Đang xử lý...'; hideB();
      if (br) br.style.display = 'inline-block';
      rpre.textContent = ''; rpre.className = 'cp-rpre'; timeEl.textContent = '';

      CPCompiler.compileAndRun({ code: code, language: lang, input: inpEl.value, std: 'c++17', optimize: 'O2' }).then(function(r) {
        runBtn.disabled = false; runBtn.textContent = '▶ Chạy'; rmsg.textContent = '';
        if (br) br.style.display = 'none';

        if (r.success) {
          var out = (r.output || '').replace(/\r\n/g, '\n').trimEnd();
          outEl.value = out;
          if (exp) {
            var expT = exp.replace(/\r\n/g, '\n').trimEnd();
            if (out === expT) {
              if (bp) bp.style.display = 'inline-block';
              rpre.className = 'cp-rpre ok';
              rpre.textContent = '✅ Chính xác!';
            } else {
              if (bf) bf.style.display = 'inline-block';
              rpre.className = 'cp-rpre err';
              rpre.textContent = '❌ Sai rồi! Bạn kiểm tra lại logic nhé.';
            }
          } else {
            rpre.className = 'cp-rpre ok';
            rpre.textContent = '✅ Chạy thành công!';
          }
        } else {
          outEl.value = '';
          if (be) be.style.display = 'inline-block';
          rpre.className = 'cp-rpre err';
          rpre.textContent = '❌ ' + (r.compilerOutput && r.compilerOutput.trim() ? r.compilerOutput.trim() : r.error || 'Unknown error');
        }
        if (r.timing) timeEl.textContent = r.timing.summary;
      }).catch(function(e) {
        runBtn.disabled = false; runBtn.textContent = '▶ Chạy'; rmsg.textContent = ''; hideB();
        if (be) be.style.display = 'inline-block';
        rpre.className = 'cp-rpre err';
        rpre.textContent = '❌ Lỗi mạng: ' + e.message;
      });
    });

    inpEl.addEventListener('keydown', function(e) { if ((e.ctrlKey||e.metaKey) && e.key==='Enter') { e.preventDefault(); runBtn.click(); } });
  }

  function lazyInit() {
    injectCSS();
    var els = document.querySelectorAll('.cp-pg:not([data-cp-init])');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < els.length; i++) { els[i].setAttribute('data-cp-init','1'); buildUI(els[i]); }
      return;
    }

    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        var el = entry.target;
        if (entry.isIntersecting) {
          if (!el.getAttribute('data-cp-init')) {
            el.setAttribute('data-cp-init', '1');
            buildUI(el);
          }
          io.unobserve(el);
        }
      });
    }, { rootMargin: '100px', threshold: 0 });

    for (var j = 0; j < els.length; j++) {
      if (!els[j].querySelector('.cp-pg-bar')) {
        els[j].innerHTML = '<div class="cp-pg-placeholder">Đang tải trình soạn thảo...</div>';
      }
      io.observe(els[j]);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', lazyInit);
  else lazyInit();

  if (typeof document$ !== 'undefined') document$.subscribe(lazyInit);

  window.CPPlayground = { init: lazyInit };
})();