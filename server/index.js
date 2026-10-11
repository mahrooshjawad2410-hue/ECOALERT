import 'dotenv/config';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Readable } from 'node:stream';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT || (isProduction ? 3000 : 3001));

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(express.json({ limit: '12mb' }));

// Serve the exact ONNX Runtime files installed with this project from an API URL.
// Do not import .mjs files from Vite's /public directory: Vite intentionally blocks
// that pattern during development. Routing through Express works in dev and prod.
function firstExistingDir(candidates) {
  return candidates.find((candidate) => {
    try { return requireDirectoryExists(candidate); } catch { return false; }
  }) || null;
}
function requireDirectoryExists(candidate) {
  return fs.existsSync(candidate) && fs.statSync(candidate).isDirectory();
}

const directRuntimeDir = firstExistingDir([
  path.join(rootDir, 'node_modules', 'onnxruntime-web', 'dist'),
]);
const transformersRuntimeDir = firstExistingDir([
  path.join(rootDir, 'node_modules', '@huggingface', 'transformers', 'node_modules', 'onnxruntime-web', 'dist'),
  path.join(rootDir, 'node_modules', '@huggingface', 'transformers', 'dist', 'node_modules', 'onnxruntime-web', 'dist'),
  path.join(rootDir, 'node_modules', 'onnxruntime-web', 'dist'),
]);
const RUNTIME_DIRS = { direct: directRuntimeDir, transformers: transformersRuntimeDir };
app.get('/api/onnxruntime/:runtime/:asset', (req, res) => {
  const runtimeDir = RUNTIME_DIRS[req.params.runtime];
  const asset = req.params.asset;
  if (!runtimeDir || !/^ort-wasm-[A-Za-z0-9.-]+\.(?:mjs|js|wasm)$/.test(asset)) {
    return res.status(404).json({ error: 'ONNX Runtime asset not found.' });
  }
  const assetPath = path.resolve(runtimeDir, asset);
  if (!assetPath.startsWith(path.resolve(runtimeDir) + path.sep) || !fs.existsSync(assetPath) || !fs.statSync(assetPath).isFile()) {
    return res.status(404).json({ error: `ONNX Runtime asset ${asset} is missing. Run npm.cmd install and restart the app.` });
  }
  if (asset.endsWith('.mjs') || asset.endsWith('.js')) res.type('application/javascript');
  else if (asset.endsWith('.wasm')) res.type('application/wasm');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  return res.sendFile(assetPath);
});

// A lightweight in-memory limit to help protect paid AI usage on the MVP.
const rateBuckets = new Map();
app.use('/api/', (req, res, next) => {
  // Model files may require several parallel asset requests; don't count these
  // static GETs against the API-use limiter intended for application actions.
  if (req.path.startsWith('/models/') || req.path.startsWith('/onnxruntime/')) return next();
  const key = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const bucket = rateBuckets.get(key);
  if (!bucket || now - bucket.startedAt > 10 * 60 * 1000) {
    rateBuckets.set(key, { startedAt: now, count: 1 });
    return next();
  }
  bucket.count += 1;
  if (bucket.count > 30) return res.status(429).json({ error: 'Too many requests. Please wait a few minutes and try again.' });
  return next();
});

// Same-origin, allow-listed Hugging Face model proxy. Browsers sometimes fail on
// direct Xet/CDN redirects or cross-origin WASM/model fetches; forwarding through
// the existing server avoids browser CORS and keeps the uploaded photo on-device.
const ALLOWED_MODEL_REPOS = new Set([
  'nihal4/rice-disease-model',
  'onnx-community/mobilenet_v2_1.0_224-plant-disease-identification-ONNX',
]);
app.get('/api/models/:owner/:repo/resolve/:revision/*', async (req, res) => {
  const repoId = `${req.params.owner}/${req.params.repo}`;
  const filePath = String(req.params[0] || '').replace(/^\/+/, '');
  if (!ALLOWED_MODEL_REPOS.has(repoId)) {
    return res.status(404).json({ error: 'This model repository is not allowed.' });
  }
  if (!filePath || !/^[A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.-]+)*$/.test(filePath) || filePath.split('/').some((part) => part === '.' || part === '..')) {
    return res.status(400).json({ error: 'Invalid model asset path.' });
  }
  const upstreamUrl = `https://huggingface.co/${repoId}/resolve/${encodeURIComponent(req.params.revision)}/${filePath}`;
  try {
    const upstream = await fetch(upstreamUrl, {
      headers: { 'User-Agent': 'EcoAlert-AgriSense/1.0 model-asset-proxy' },
      signal: AbortSignal.timeout(180_000),
      redirect: 'follow',
    });
    if (!upstream.ok || !upstream.body) {
      const detail = (await upstream.text().catch(() => '')).slice(0, 300);
      console.error(`Crop model asset fetch failed (${repoId}/${filePath}): HTTP ${upstream.status} ${detail}`);
      return res.status(upstream.status === 404 ? 404 : 502).json({
        error: `Could not fetch model asset (${repoId}/${filePath}); source returned HTTP ${upstream.status}.`,
      });
    }
    res.status(upstream.status);
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/octet-stream');
    const contentLength = upstream.headers.get('content-length');
    if (contentLength) res.setHeader('Content-Length', contentLength);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    const etag = upstream.headers.get('etag');
    if (etag) res.setHeader('ETag', etag);
    Readable.fromWeb(upstream.body).on('error', (error) => {
      console.error(`Crop model asset stream failed (${repoId}/${filePath}):`, error?.message || error);
      if (!res.headersSent) res.status(502);
      res.destroy(error);
    }).pipe(res);
  } catch (error) {
    console.error(`Crop model proxy failed (${repoId}/${filePath}):`, error?.message || error);
    if (!res.headersSent) res.status(502).json({
      error: "The server could not reach Hugging Face to retrieve the free model files. Check this computer's internet connection or firewall and retry.",
    });
  }
});

app.get('/api/models/health', async (_req, res) => {
  const checks = await Promise.all([
    ['rice', 'https://huggingface.co/nihal4/rice-disease-model/resolve/main/model.onnx'],
    ['plant', 'https://huggingface.co/onnx-community/mobilenet_v2_1.0_224-plant-disease-identification-ONNX/resolve/main/config.json'],
  ].map(async ([name, url]) => {
    try {
      const response = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(20_000), redirect: 'follow' });
      return { name, ok: response.ok, status: response.status };
    } catch (error) {
      return { name, ok: false, error: error?.message || 'Network error' };
    }
  }));
  const ok = checks.every((item) => item.ok);
  res.status(ok ? 200 : 502).json({ ok, checks, note: 'This checks model-host reachability only; it does not run image inference.' });
});

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    weather: { provider: 'Open-Meteo', configured: true },
    imageDiagnosis: { provider: 'Optional OpenAI Responses API (not required for local browser diagnosis)', configured: Boolean(process.env.OPENAI_API_KEY) },
  });
});

app.post('/api/diagnose', async (req, res) => {
  const { imageDataUrl, crop, symptom, language } = req.body || {};
  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({
      error: 'AI image diagnosis is not configured yet. Add OPENAI_API_KEY to the server .env file and restart the server.',
      code: 'AI_NOT_CONFIGURED',
    });
  }
  if (typeof imageDataUrl !== 'string' || !/^data:image\/(jpeg|jpg|png|webp);base64,/i.test(imageDataUrl)) {
    return res.status(400).json({ error: 'Please upload a valid JPEG, PNG, or WebP crop photo.' });
  }
  if (imageDataUrl.length > 10_000_000) {
    return res.status(413).json({ error: 'The processed image is too large. Please choose a smaller photo.' });
  }
  const safeCrop = String(crop || 'Unknown crop').slice(0, 80);
  const safeSymptom = String(symptom || 'Not specified').slice(0, 160);
  const languageName = language === 'bn' ? 'Bangla (Bengali)' : 'English';

  const instructions = `You are a cautious crop-health assistant supporting farmers in Bangladesh. Analyze the supplied crop photo for visible symptoms only. Do not claim certainty from an image alone, and do not invent a species or disease if evidence is weak. Distinguish visible observations from possible causes. Never prescribe a pesticide, product brand, or exact chemical dose. Suggest low-risk inspection and prevention steps; advise the farmer to consult Bangladesh's Department of Agricultural Extension or a qualified local agronomist before treatment. Respond entirely in ${languageName}. Return one valid JSON object only with these keys: likelyIssue (string), confidenceLevel (one of "low", "moderate", "cannot_assess"), visibleSigns (array of strings), possibleAlternatives (array of strings), nextSteps (array of strings), seekHelp (string), disclaimer (string). If the image is not a crop/plant or the quality is insufficient, say that clearly and use confidenceLevel "cannot_assess".`;

  try {
    const upstream = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
        instructions,
        input: [{
          role: 'user',
          content: [
            { type: 'input_text', text: `Crop selected by farmer: ${safeCrop}. Reported symptoms: ${safeSymptom}. Analyze this photo conservatively and return the result as valid JSON only.` },
            { type: 'input_image', image_url: imageDataUrl, detail: 'high' },
          ],
        }],
        text: { format: { type: 'json_object' } },
        max_output_tokens: 900,
      }),
    });

    const apiData = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      const detail = apiData?.error?.message || `AI provider returned HTTP ${upstream.status}`;
      console.error('AI diagnosis provider error:', upstream.status, detail);
      return res.status(502).json({ error: 'The AI diagnosis service could not process this photo. Please retry later.', code: 'AI_PROVIDER_ERROR' });
    }
    const rawText = (apiData.output || [])
      .flatMap((item) => Array.isArray(item.content) ? item.content : [])
      .filter((item) => item.type === 'output_text' && typeof item.text === 'string')
      .map((item) => item.text)
      .join('\n');
    if (!rawText) return res.status(502).json({ error: 'The AI service returned an empty response. Please try another photo.' });

    let diagnosis;
    try { diagnosis = JSON.parse(rawText); }
    catch { return res.status(502).json({ error: 'The AI response could not be interpreted. Please try again.' }); }

    const asText = (value) => typeof value === 'string' ? value.slice(0, 1200) : '';
    const asList = (value) => Array.isArray(value) ? value.filter((item) => typeof item === 'string').slice(0, 6).map((item) => item.slice(0, 350)) : [];
    return res.json({
      diagnosis: {
        likelyIssue: asText(diagnosis.likelyIssue) || 'Unable to identify a likely issue from this image.',
        confidenceLevel: ['low', 'moderate', 'cannot_assess'].includes(diagnosis.confidenceLevel) ? diagnosis.confidenceLevel : 'low',
        visibleSigns: asList(diagnosis.visibleSigns),
        possibleAlternatives: asList(diagnosis.possibleAlternatives),
        nextSteps: asList(diagnosis.nextSteps),
        seekHelp: asText(diagnosis.seekHelp),
        disclaimer: asText(diagnosis.disclaimer) || 'Image-based guidance is not a confirmed diagnosis. Confirm with a qualified local agricultural professional before treatment.',
      },
    });
  } catch (error) {
    console.error('Diagnosis request failed:', error?.message || error);
    return res.status(502).json({ error: 'Could not contact the AI diagnosis service. Check the server connection and try again.' });
  }
});

if (isProduction) {
  const distDir = path.join(rootDir, 'dist');
  app.use(express.static(distDir, { index: false }));
  app.get('*', (_req, res) => res.sendFile(path.join(distDir, 'index.html')));
}

app.listen(port, '0.0.0.0', () => {
  console.log(`EcoAlert API server listening on http://localhost:${port}`);
  console.log(`Optional server-side OpenAI route ${process.env.OPENAI_API_KEY ? 'configured' : 'not configured; local browser diagnosis does not need an API key'}`);
});
