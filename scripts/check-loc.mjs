import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';

const files = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], { encoding: 'utf8' }).split('\0');
for (const [directory, budget] of [['src/', 1700], ['scripts/', 100]]) {
  const lines = [...new Set(files)].filter(file => file.startsWith(directory) && /\.[cm]?[jt]sx?$/.test(file) && existsSync(file))
    .reduce((sum, file) => sum + readFileSync(file, 'utf8').split('\n').filter(line => line.trim()).length, 0);
  console.log(`${directory}: ${lines}/${budget} nonblank code lines`);
  if (lines > budget) throw new Error(`${directory} exceeds its LOC budget; simplify or review the budget explicitly.`);
}
