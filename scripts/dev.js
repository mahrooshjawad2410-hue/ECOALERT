import { spawn } from 'node:child_process';
import path from 'node:path';

// Spawn Node scripts directly (shell:false) so Windows paths containing '&' work.
const root = process.cwd();
const node = process.execPath;
const children = [
  spawn(node, [path.join(root, 'server', 'index.js')], { cwd: root, stdio: 'inherit', env: { ...process.env, NODE_ENV: 'development', PORT: process.env.PORT || '3001' }, shell: false }),
  spawn(node, [path.join(root, 'node_modules', 'vite', 'bin', 'vite.js'), '--host', '0.0.0.0'], { cwd: root, stdio: 'inherit', env: { ...process.env, NODE_ENV: 'development' }, shell: false }),
];
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) if (!child.killed) child.kill();
  process.exitCode = code;
}
for (const child of children) {
  child.on('error', (err) => { console.error('Unable to start child process:', err.message); stop(1); });
  child.on('exit', (code) => { if (!stopping) stop(code ?? 1); });
}
process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));
