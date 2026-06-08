#!/usr/bin/env node
/**
 * Validate mermaid syntax via Node.js mermaid.parse().
 * Usage: node validate-mermaid.js <file.mmd>
 * Exit 0 = valid, 1 = syntax error.
 * Output: JSON { ok, error?, diagramType? }
 */
const fs = require('fs');

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.log(JSON.stringify({ ok: false, error: 'No file argument' }));
    process.exit(1);
  }

  const code = fs.readFileSync(file, 'utf8').trim();
  if (!code) {
    console.log(JSON.stringify({ ok: false, error: 'Empty mermaid block' }));
    process.exit(1);
  }

  // Provide DOM env for mermaid (needs DOMPurify, document, etc.)
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    pretendToBeVisual: true,
  });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.navigator = dom.window.navigator;
  globalThis.DOMParser = dom.window.DOMParser;
  globalThis.XMLSerializer = dom.window.XMLSerializer;

  try {
    const mermaid = await import('mermaid');
    mermaid.default.initialize({
      startOnLoad: false,
      theme: 'default',
    });
    const { diagramType } = await mermaid.default.parse(code);
    console.log(JSON.stringify({ ok: true, diagramType }));
    process.exit(0);
  } catch (e) {
    const msg = e.message || String(e);
    console.log(JSON.stringify({ ok: false, error: msg }));
    process.exit(1);
  }
}

main().catch((e) => {
  console.log(JSON.stringify({ ok: false, error: e.message || String(e) }));
  process.exit(2);
});
