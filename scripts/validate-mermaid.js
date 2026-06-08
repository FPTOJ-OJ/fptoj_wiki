#!/usr/bin/env node
/**
 * Validate mermaid syntax from stdin or file argument.
 * Usage:
 *   node validate-mermaid.js diagram.mmd
 *   echo "graph LR; A-->B" | node validate-mermaid.js
 *
 * Exit code 0 = valid, 1 = syntax error, 2 = runtime error.
 * Output: JSON { ok: bool, error?: string, diagramType?: string }
 */
const fs = require('fs');

async function main() {
  let code;

  if (process.argv[2]) {
    code = fs.readFileSync(process.argv[2], 'utf8');
  } else {
    const chunks = [];
    for await (const chunk of process.stdin) chunks.push(chunk);
    code = Buffer.concat(chunks).toString('utf8');
  }

  code = code.trim();
  if (!code) {
    console.log(JSON.stringify({ ok: false, error: 'Empty mermaid block' }));
    process.exit(1);
  }

  try {
    const mermaid = await import('mermaid');
    mermaid.default.initialize({
      startOnLoad: false,
      theme: 'default',
    });

    // parse() throws on syntax error when suppressErrors is NOT set
    const { diagramType } = await mermaid.default.parse(code);
    console.log(JSON.stringify({ ok: true, diagramType }));
    process.exit(0);
  } catch (e) {
    // mermaid parse errors contain "Parse error" or "Syntax error"
    const msg = e.message || String(e);
    console.log(JSON.stringify({ ok: false, error: msg }));
    process.exit(1);
  }
}

main().catch((e) => {
  console.log(JSON.stringify({ ok: false, error: e.message || String(e) }));
  process.exit(2);
});
