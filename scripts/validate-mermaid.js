#!/usr/bin/env node
/**
 * Validate mermaid syntax via Node.js mermaid.parse().
 * Usage:
 *   node validate-mermaid.js <file.mmd>      # read from file
 *   node validate-mermaid.js --stdin          # read from stdin (pipe mode)
 *   node validate-mermaid.js --batch          # batch: read JSON array of codes from stdin
 * Exit 0 = all valid, 1 = syntax error, 2 = internal error.
 * Output: JSON single result or JSON array of results.
 */
const fs = require('fs');

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

function setupDOM() {
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    pretendToBeVisual: true,
  });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.navigator = dom.window.navigator;
  globalThis.DOMParser = dom.window.DOMParser;
  globalThis.XMLSerializer = dom.window.XMLSerializer;
}

async function parseOne(code, label) {
  const trimmed = code.trim();
  if (!trimmed) {
    return { ok: false, error: 'Empty mermaid block' + (label ? ' (' + label + ')' : '') };
  }
  try {
    const mermaid = await import('mermaid');
    mermaid.default.initialize({ startOnLoad: false, theme: 'default' });
    const result = await mermaid.default.parse(trimmed);
    const diagramType = result.diagramType || 'unknown';
    return { ok: true, diagramType };
  } catch (e) {
    let msg = e.message || String(e);
    // Extract line/col from mermaid error messages
    const lineMatch = msg.match(/line\s+(\d+)/i);
    const colMatch = msg.match(/col(?:umn)?\s+(\d+)/i);
    const firstLine = msg.split('\n')[0].trim();
    let detail = firstLine;
    if (lineMatch) {
      const lineNum = parseInt(lineMatch[1], 10);
      const lines = trimmed.split('\n');
      const ctxStart = Math.max(0, lineNum - 2);
      const ctxEnd = Math.min(lines.length, lineNum + 1);
      const context = lines.slice(ctxStart, ctxEnd)
        .map((l, i) => (ctxStart + i + 1) + ': ' + l)
        .join('\n');
      detail = firstLine + '\n  Context:\n' + context.replace(/^/gm, '    ');
    }
    return {
      ok: false,
      error: firstLine,
      detail: detail,
      line: lineMatch ? parseInt(lineMatch[1], 10) : null,
      col: colMatch ? parseInt(colMatch[1], 10) : null,
      label: label || null,
    };
  }
}

async function main() {
  const arg = process.argv[2];

  setupDOM();

  // --batch mode: read JSON array of code strings from stdin
  if (arg === '--batch') {
    const input = await readStdin();
    let codes;
    try {
      codes = JSON.parse(input);
    } catch (_) {
      console.log(JSON.stringify([{ ok: false, error: 'Invalid JSON input for batch mode' }]));
      process.exit(2);
    }
    if (!Array.isArray(codes)) {
      console.log(JSON.stringify([{ ok: false, error: 'Expected JSON array for batch mode' }]));
      process.exit(2);
    }
    const results = [];
    let hasError = false;
    for (let i = 0; i < codes.length; i++) {
      const result = await parseOne(codes[i], 'block ' + i);
      results.push(result);
      if (!result.ok) hasError = true;
    }
    console.log(JSON.stringify(results));
    process.exit(hasError ? 1 : 0);
  }

  // --stdin mode
  if (arg === '--stdin') {
    const input = await readStdin();
    const result = await parseOne(input, 'stdin');
    console.log(JSON.stringify(result));
    process.exit(result.ok ? 0 : 1);
  }

  // File mode (default)
  const file = arg;
  if (!file) {
    console.log(JSON.stringify({ ok: false, error: 'No file argument. Usage: node validate-mermaid.js <file> [--stdin | --batch]' }));
    process.exit(1);
  }

  const code = fs.readFileSync(file, 'utf8').trim();
  if (!code) {
    console.log(JSON.stringify({ ok: false, error: 'Empty mermaid block' }));
    process.exit(1);
  }

  const result = await parseOne(code, file);
  console.log(JSON.stringify(result));
  process.exit(result.ok ? 0 : 1);
}

main().catch((e) => {
  console.log(JSON.stringify({ ok: false, error: e.message || String(e) }));
  process.exit(2);
});