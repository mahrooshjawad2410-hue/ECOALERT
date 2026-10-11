# EcoAlert + AgriSense — Live-weather & AI-diagnosis MVP

Bilingual (Bangla/English) React + TypeScript + Vite application for farmers in Bangladesh. The approved dashboard design and its six seasonal hero images are retained. This iteration connects a real weather forecast and adds a secure server-side AI image-diagnosis route.

## What is connected

- **Live weather:** Open-Meteo forecast API provides current conditions and a five-day forecast. The app fetches using the selected area's coordinates. Farmers can choose a Bangladesh location or explicitly grant browser location permission for their GPS coordinates. GPS requires HTTPS (or localhost). If the network/provider is unavailable, the UI labels the fallback figures as sample data rather than presenting them as live.
- **Free local crop photo diagnosis:** rice leaf photos use the Apache-2.0 rice-disease ONNX model from Hugging Face; tomato and potato photos use a browser-run PlantVillage classifier through Transformers.js. The photo is processed in the browser and is never uploaded by the model proxy. Model files are fetched by the local Express server from an allow-listed Hugging Face model repository and streamed to the browser, avoiding direct browser CORS/Xet redirect issues. ONNX WebAssembly files are copied locally from installed npm packages before dev/build/start so inference does not depend on a third-party WASM CDN. The browser can cache model files. Only supported crop classes are returned; unsupported crops or failed model loads clearly say the photo was not analyzed.
- **API health:** `GET /api/health` reports whether the AI key is configured.
- **Windows-compatible dev launcher:** `npm run dev` starts Vite and the API directly through Node child processes (`shell:false`), including when the project folder path has spaces or `&`.

## Requirements

- Node.js 20 or newer
- Internet access for the first download of open-source diagnosis model files; no paid AI API key is required for the currently supported local crop classifier

## Local setup (Windows PowerShell)

Extract the ZIP, open PowerShell inside `ecoalert-agrisense-ui`, then run:

```powershell
npm.cmd install
npm.cmd run dev
```

No API key or `.env` file is required for local browser-based crop diagnosis or the Open-Meteo weather page. The `predev`/`prebuild` lifecycle scripts copy ONNX Runtime WebAssembly assets from `node_modules` into `public/`; do not remove `scripts/copy-onnx-assets.js`. If the optional server-side OpenAI route is used later for other crop types, copy `.env.example` to `.env`, add a valid API key with available credits, and keep that secret private. Never place it in `src/`, a `VITE_` variable, source control, or a public chat. The app opens at the Vite URL printed in the terminal, typically `http://localhost:5173`.

The crop diagnosis page supports multi-select symptom checkboxes plus camera or file upload. The local classifier currently supports rice, tomato and potato; wheat and general mixed vegetables are not classified by this model. First-run model downloads require internet access to Hugging Face from the local API server, but the photo itself is processed in the browser. If model loading still fails, open `/api/models/health` on the same site; it reports whether the server can reach both model repositories. The API server also logs exact model download failures in the PowerShell window.

The weather page is opened using the dashboard's **Check weather** tile or the weather card. Press **Use my location** and grant permission for an accurate GPS-based forecast, or choose the nearest listed Bangladesh area. The listed areas use representative coordinates and are less precise than GPS.

If you start only the frontend using `npm run dev:client`, `/api/diagnose` won't be available unless the API server is also started. Use `npm run dev` for both services.

## Production build and server

```powershell
npm.cmd install
npm.cmd run build
$env:NODE_ENV="production"
npm.cmd start
```

The server serves `dist/` plus `/api/*` on the port given by hosting (or port 3000 locally). The OpenAI server route remains optional and is not required for the local browser-based crop classifier. If you choose to use the optional `/api/diagnose` route for additional crops, configure `OPENAI_API_KEY` as a server-side secret.

A `render.yaml` blueprint is included as a starting point for a single web service. Connect the repository to your hosting account, set the secret `OPENAI_API_KEY`, and deploy over HTTPS. Actual public deployment still requires your hosting account/domain and the AI key; this ZIP alone does not publish the website to the internet.

## Important service notes

- Open-Meteo provides model-based forecasts, which can differ from an on-field observation. Attribute the provider as shown in the UI. Before commercial/public production, review the provider's current usage and licensing terms and choose a commercial plan/provider if your usage requires it.
- Photo analysis is preliminary decision support, not a laboratory diagnosis. The rice model was trained for four classes (bacterial leaf blight, brown spot, leaf blast, and tungro); tomato/potato classification uses a PlantVillage-derived model and can perform worse on real Bangladesh field photos than on controlled dataset images. The displayed model score is not a validated field-confidence percentage. Unsupported crops, crop mismatches, poor photos and model failures must not be treated as diagnoses. Confirm with a qualified local agronomist/Department of Agricultural Extension before applying treatments. The optional server-side OpenAI route still requires an API key and available credits.
- The current user profile, plots, soil readings and planner still use browser local storage. This iteration has not yet added shared user accounts, a cloud database, SMS/push notifications, or official BWDB/FFWC flood/river feeds.
- Protect credentials; set a reasonable rate/cost limit for your OpenAI project before inviting public traffic. The starter API includes a simple in-memory request limit, which should be replaced with a durable shared limiter for scaled multi-instance deployment.

## Project commands

- `npm run dev` — frontend + API for development
- `npm run dev:api` — API only
- `npm run build` — production frontend build
- `npm start` — production server (set `NODE_ENV=production`)

## Local diagnosis model attribution

- Rice: `nihal4/rice-disease-model` (Apache-2.0), a four-class ResNet50 exported to ONNX. Source: https://huggingface.co/nihal4/rice-disease-model
- Tomato/potato: `onnx-community/mobilenet_v2_1.0_224-plant-disease-identification-ONNX`, fine-tuned on the PlantVillage-derived dataset. Review the model card and its stated license/limitations: https://huggingface.co/onnx-community/mobilenet_v2_1.0_224-plant-disease-identification-ONNX

The models are downloaded by the browser at runtime; no model weights are embedded in this project ZIP.
