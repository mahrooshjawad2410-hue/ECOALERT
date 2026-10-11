# EcoAlert & AgriSense — ONNX Runtime Vite fix

This patch fixes Vite's `Failed to load url /onnxruntime-web/ort-wasm-simd-threaded.jsep.mjs` error.

## Install the patch
1. Stop the running app (`Ctrl+C` in PowerShell).
2. Extract this ZIP into the **project root** (the folder containing `package.json`), for example `D:\New folder` if that is where your complete project lives. Allow files to be overwritten.
3. Run:
   ```powershell
   npm.cmd install
   npm.cmd run dev
   ```
4. Open `http://localhost:5173/api/health` and confirm the JSON response has `"ok": true`.
5. Then test a crop image. Runtime `.mjs` and `.wasm` assets are now served by Express at `/api/onnxruntime/...` and no longer imported from Vite's `/public` directory.

If the project folder is incomplete or `scripts/dev.js` is missing, do not apply the patch to a new empty folder. Extract the complete project ZIP first, then apply this patch.
