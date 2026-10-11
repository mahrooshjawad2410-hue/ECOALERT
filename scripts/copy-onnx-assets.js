import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const modules = path.join(root, 'node_modules');
const direct = path.join(modules, 'onnxruntime-web', 'dist');
const transformerCandidates = [
  path.join(modules, '@huggingface', 'transformers', 'node_modules', 'onnxruntime-web', 'dist'),
  path.join(modules, '@huggingface', 'transformers', 'dist', 'node_modules', 'onnxruntime-web', 'dist'),
  direct,
];
const transformer = transformerCandidates.find((candidate) => fs.existsSync(candidate)) || null;
if (!fs.existsSync(direct) || !transformer) {
  console.error('ONNX Runtime files were not found. Run npm.cmd install, then retry.');
  process.exitCode = 1;
} else {
  // Assets are served through /api/onnxruntime by Express. Do not copy .mjs files
  // to /public: Vite blocks importing JavaScript modules from that directory.
  console.log('ONNX Runtime files will be served through the local Express API.');
}
