import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { JSDOM } from 'jsdom';

const { window } = new JSDOM('');
globalThis.window = window;
globalThis.document = window.document;
const { default: mermaid } = await import('mermaid');
mermaid.initialize({ startOnLoad: false });
const files = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], { encoding: 'utf8' });
let diagrams = 0;
for (const file of new Set(files.split('\0').filter(file => file.endsWith('.md') && existsSync(file)))) {
  const text = readFileSync(file, 'utf8');
  for (const [, diagram] of text.matchAll(/^```mermaid\s*\n([\s\S]*?)^```/gm)) {
    try {
      await mermaid.parse(diagram);
      diagrams++;
    } catch (error) {
      throw new Error(`${file}: invalid Mermaid diagram`, { cause: error });
    }
  }
  for (const [, link] of text.matchAll(/\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
    if (/^(?:[a-z]+:|#|\/)/i.test(link)) continue;
    const target = decodeURIComponent(link.split('#')[0]);
    if (!existsSync(resolve(dirname(file), target))) throw new Error(`${file}: broken link ${link}`);
  }
}
if (!diagrams) throw new Error('No Mermaid diagrams found');
console.log(`Validated ${diagrams} Mermaid diagrams and relative Markdown paths.`);
