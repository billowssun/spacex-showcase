import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const refs = Array.from(html.matchAll(/(?:href|src)="([^"]+)"/g))
  .map(match => match[1])
  .filter(ref => !ref.startsWith('#') && !ref.startsWith('http') && !ref.startsWith('mailto:'));

const missing = refs.filter(ref => {
  const cleanRef = ref.split('#')[0].split('?')[0];
  return cleanRef && !fs.existsSync(path.join(root, cleanRef));
});

if (missing.length > 0) {
  console.error('Missing referenced files:');
  missing.forEach(file => console.error(`- ${file}`));
  process.exit(1);
}

const jsCheck = spawnSync(process.execPath, ['--check', 'src/script.js'], {
  cwd: root,
  stdio: 'inherit'
});

if (jsCheck.status !== 0) {
  process.exit(jsCheck.status ?? 1);
}

console.log('Site check passed.');
