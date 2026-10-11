import { useEffect, useRef, useState } from 'react';
import {
  Sprout, LayoutDashboard, CloudSun, ScanSearch, BellRing, Bot, Tractor,
  Settings, Search, Globe2, ChevronDown, ChevronRight, ArrowUpRight, UserRound, Save,
  ArrowRight, MapPin, Droplets, ThermometerSun, Wind, Sun, CloudRain,
  Leaf, AlertTriangle, CheckCircle2, Clock3, Plus, Menu, X, Wheat,
  Activity, CalendarDays, CircleHelp, ShieldCheck, Layers, CalendarCheck, HeartPulse, Sprout as Seedling, MapPinned, CloudDrizzle, ClipboardCheck, SunMedium, TriangleAlert, Camera, Upload
} from 'lucide-react';

type Lang = 'en' | 'bn';
const copy = {
  en: {
    greeting:'Good evening, farmer', subtitle:'Here’s what’s happening on your farm today.',
    overview:'Dashboard', dashboard:'Dashboard', alerts:'EcoAlert', diagnosis:'Crop disease diagnosis',
    cropPlanner:'Crop planner', cropHealth:'Crop health', soil:'Soil & nutrients', toolsTitle:'Your farm tools', toolsSubtitle:'Simple tools to help you plan, protect and grow.', plannerDesc:'Plan sowing, irrigation and harvest by season.', cropHealthDesc:'Check crop symptoms and keep track of plant health.', soilDesc:'Understand soil moisture, pH and nutrient needs.', openTool:'Open tool',
    assistant:'AI assistant', farm:'My farm', settings:'Settings', search:'Search anything...',
    today:'Saturday, 10 October 2026', location:'Chattogram, Bangladesh', weather:'Weather today',
    feels:'Feels like 34°', humidity:'Humidity', wind:'Wind', rain:'Rain chance',
    farmHealth:'Farm health', healthy:'Looking healthy', healthText:'Your farm is doing well this week.',
    activeAlerts:'Active alerts', alertsText:'2 items need your attention',
    crops:'Registered crops', cropsText:'Across your farm plots', tasks:'Tasks completed',
    tasksText:'of 8 planned this week', quick:'Quick actions', quickText:'What would you like to do?',
    diagnose:'Diagnose a crop', diagnoseText:'Upload a leaf photo for AI guidance',
    checkWeather:'Check weather', weatherText:'Plan around local conditions',
    addTask:'Add farm task', taskText:'Keep your farm plan on track',
    latest:'Latest alerts', viewAll:'View all alerts', high:'High priority',
    medium:'Medium priority', pest:'Possible rice leaf blast risk',
    pestDesc:'Conditions may favor fungal disease in rice fields near your area.',
    flood:'Heavy rainfall watch', floodDesc:'Rainfall is expected later today. Check field drainage.',
    ago:'25 min ago', hours:'2 hours ago', recommendations:'Recommended for you',
    recTitle:'Check rice leaves after rainfall', recDesc:'Look for diamond-shaped lesions and yellowing. Early detection helps limit spread.',
    readGuide:'Read field guide', activity:'Farm activity', seeActivity:'See activity',
    activity1:'Soil moisture record added', activity2:'Irrigation task completed',
    activity3:'Weather advisory updated', yesterday:'Yesterday', todayLabel:'Today',
    viewFarm:'View my farm', language:'English', welcome:'Your smarter, greener farm starts here',
    searchResults:'Search results', noResults:'No matches found', dismiss:'Dismiss', markDone:'Mark as done',
    alertTitle:'Stay ahead of changing conditions', alertSub:'Timely local alerts for weather, crop health and environmental risks.',
    empty:'You’re all caught up!', allGood:'No new urgent items right now.',
  },
  bn: {
    greeting:'শুভ সন্ধ্যা, কৃষক', subtitle:'আজ আপনার খামারে কী ঘটছে দেখে নিন।',
    overview:'ড্যাশবোর্ড', dashboard:'ড্যাশবোর্ড', alerts:'ইকোঅ্যালার্ট', diagnosis:'ফসলের রোগ নির্ণয়',
    cropPlanner:'ফসল পরিকল্পনা', cropHealth:'ফসলের স্বাস্থ্য', soil:'মাটি ও পুষ্টি', toolsTitle:'আপনার কৃষি সরঞ্জাম', toolsSubtitle:'পরিকল্পনা, সুরক্ষা ও ভালো ফলনের সহজ উপায়।', plannerDesc:'মৌসুম অনুযায়ী বপন, সেচ ও ফসল কাটার পরিকল্পনা করুন।', cropHealthDesc:'ফসলের লক্ষণ দেখুন এবং গাছের স্বাস্থ্য পর্যবেক্ষণ করুন।', soilDesc:'মাটির আর্দ্রতা, পিএইচ ও পুষ্টির চাহিদা বুঝুন।', openTool:'খুলুন',
    assistant:'এআই সহকারী', farm:'আমার খামার', settings:'সেটিংস', search:'খুঁজুন...',
    today:'শনিবার, ১০ অক্টোবর ২০২৬', location:'চট্টগ্রাম, বাংলাদেশ', weather:'আজকের আবহাওয়া',
    feels:'অনুভূত তাপমাত্রা ৩৪°', humidity:'আর্দ্রতা', wind:'বাতাস', rain:'বৃষ্টির সম্ভাবনা',
    farmHealth:'খামারের অবস্থা', healthy:'ভালো আছে', healthText:'এই সপ্তাহে আপনার খামারের অবস্থা ভালো।',
    activeAlerts:'সক্রিয় সতর্কতা', alertsText:'২টি বিষয়ে নজর দেওয়া দরকার',
    crops:'নিবন্ধিত ফসল', cropsText:'আপনার জমির সব প্লটে', tasks:'সম্পন্ন কাজ',
    tasksText:'এই সপ্তাহে পরিকল্পিত ৮টির মধ্যে', quick:'দ্রুত কাজ', quickText:'আপনি কী করতে চান?',
    diagnose:'ফসল পরীক্ষা করুন', diagnoseText:'এআই পরামর্শের জন্য পাতার ছবি দিন',
    checkWeather:'আবহাওয়া দেখুন', weatherText:'স্থানীয় আবহাওয়া বুঝে পরিকল্পনা করুন',
    addTask:'খামারের কাজ যোগ করুন', taskText:'আপনার কাজের পরিকল্পনা ঠিক রাখুন',
    latest:'সাম্প্রতিক সতর্কতা', viewAll:'সব সতর্কতা দেখুন', high:'উচ্চ অগ্রাধিকার',
    medium:'মাঝারি অগ্রাধিকার', pest:'ধানের ব্লাস্ট রোগের সম্ভাব্য ঝুঁকি',
    pestDesc:'আপনার এলাকার ধানক্ষেতে ছত্রাকজনিত রোগের অনুকূল পরিবেশ থাকতে পারে।',
    flood:'ভারী বৃষ্টির সতর্কতা', floodDesc:'আজ পরে বৃষ্টির সম্ভাবনা আছে। জমির পানি নিষ্কাশন দেখুন।',
    ago:'২৫ মিনিট আগে', hours:'২ ঘণ্টা আগে', recommendations:'আপনার জন্য পরামর্শ',
    recTitle:'বৃষ্টির পর ধানের পাতা পরীক্ষা করুন', recDesc:'পাতায় হীরার মতো দাগ ও হলদে ভাব দেখুন। দ্রুত শনাক্ত করলে রোগ ছড়ানো কমে।',
    readGuide:'ক্ষেতের নির্দেশিকা পড়ুন', activity:'খামারের কার্যক্রম', seeActivity:'কার্যক্রম দেখুন',
    activity1:'মাটির আর্দ্রতার তথ্য যোগ হয়েছে', activity2:'সেচের কাজ সম্পন্ন হয়েছে',
    activity3:'আবহাওয়ার পরামর্শ হালনাগাদ', yesterday:'গতকাল', todayLabel:'আজ',
    viewFarm:'আমার খামার দেখুন', language:'বাংলা', welcome:'আপনার স্মার্ট ও সবুজ খামারের শুরু এখানেই',
    searchResults:'অনুসন্ধানের ফলাফল', noResults:'কোনো ফলাফল পাওয়া যায়নি', dismiss:'বাদ দিন', markDone:'সম্পন্ন হিসেবে চিহ্নিত',
    alertTitle:'পরিবর্তিত পরিস্থিতির জন্য প্রস্তুত থাকুন', alertSub:'আবহাওয়া, ফসলের স্বাস্থ্য ও পরিবেশগত ঝুঁকির সময়োপযোগী স্থানীয় সতর্কতা।',
    empty:'সব আপডেট দেখা হয়েছে!', allGood:'এই মুহূর্তে নতুন জরুরি কিছু নেই।',
  }
};

const navItems = [
  { id:'dashboard', icon:LayoutDashboard, key:'dashboard' },
  { id:'alerts', icon:BellRing, key:'alerts' },
  { id:'diagnosis', icon:ScanSearch, key:'diagnosis' },
  { id:'cropPlanner', icon:CalendarCheck, key:'cropPlanner' },
  { id:'cropHealth', icon:HeartPulse, key:'cropHealth' },
  { id:'soil', icon:Layers, key:'soil' },
  { id:'assistant', icon:Bot, key:'assistant' },
  { id:'farm', icon:Tractor, key:'farm' },
];
const activities = [
  { icon:Droplets, color:'blue', titleKey:'activity2', time:'10:42 AM' },
  { icon:Activity, color:'green', titleKey:'activity1', time:'9:18 AM' },
  { icon:CloudRain, color:'orange', titleKey:'activity3', time:'Yesterday' },
];


function getAssistantAnswer(question: string, isBn: boolean): string {
  const q = question.toLowerCase();
  if (/flood|বন্যা|rain|বৃষ্টি|river|নদী/.test(q)) {
    return isBn
      ? 'বৃষ্টির পরিমাণ, নদীর পানি ও জমির নিষ্কাশন পর্যবেক্ষণ করুন। ঝুঁকি বেশি হলে বীজ ও যন্ত্রপাতি উঁচু স্থানে রাখুন এবং সরকারি সতর্কতা অনুসরণ করুন।'
      : 'Monitor rainfall, river levels and drainage. If risk is elevated, move seeds and equipment to higher ground and follow official warnings.';
  }
  if (/soil|মাটি|ph|fertili|সার|nutrient|পুষ্টি/.test(q)) {
    return isBn
      ? 'মাটির পরীক্ষা অনুযায়ী সার দিন। pH, জৈব পদার্থ এবং N-P-K ফলাফল দেখে স্থানীয় কৃষি কর্মকর্তার পরামর্শ নিন।'
      : 'Base fertilizer decisions on a soil test, pH and N-P-K results; confirm rates with local agricultural extension.';
  }
  if (/rice|ধান|blast|রোগ|leaf|পাতা|pest|পোকা/.test(q)) {
    return isBn
      ? 'পাতার দাগ, হলদে ভাব ও পোকা আছে কি না দেখুন। আক্রান্ত অংশের ছবি তুলুন এবং রোগ নিশ্চিত না করে কীটনাশক ব্যবহার করবেন না।'
      : 'Inspect leaf spots, yellowing and insects. Photograph affected areas and avoid pesticide use until the cause is better identified.';
  }
  if (/weather|আবহাওয়া|forecast|তাপমাত্রা|temperature/.test(q)) {
    return isBn
      ? 'বপন বা স্প্রে করার আগে বাংলাদেশ আবহাওয়া অধিদপ্তরের সর্বশেষ স্থানীয় পূর্বাভাস যাচাই করুন।'
      : 'Check the latest local Bangladesh Meteorological Department forecast before sowing or spraying.';
  }
  return isBn
    ? 'আপনার ফসল, জমির অবস্থা ও লক্ষণ একটু বিস্তারিত লিখুন। আমি মাটি, সেচ, রোগের লক্ষণ ও বন্যা প্রস্তুতি নিয়ে সাধারণ নির্দেশনা দিতে পারি।'
    : 'Please include your crop, field conditions and symptoms. I can provide general guidance on soil, irrigation, crop symptoms and flood preparedness.';
}

type WeatherLocation = { id: string; name: string; latitude: number; longitude: number; source: 'gps' | 'manual' };
type LiveWeather = {
  temperature: number; feels: number; humidity: number; wind: number; rain: number; code: number; isDay: boolean;
  daily: Array<{ date: string; code: number; high: number; low: number; rain: number }>;
};
type DiagnosisReport = {
  likelyIssue: string; confidenceLevel: 'low' | 'moderate' | 'cannot_assess'; visibleSigns: string[];
  possibleAlternatives: string[]; nextSteps: string[]; seekHelp: string; disclaimer: string;
};
const BANGLADESH_LOCATIONS: WeatherLocation[] = [
  { id:'dhaka', name:'Dhaka, Bangladesh', latitude:23.8103, longitude:90.4125, source:'manual' },
  { id:'chattogram', name:'Chattogram, Bangladesh', latitude:22.3569, longitude:91.7832, source:'manual' },
  { id:'sylhet', name:'Sylhet, Bangladesh', latitude:24.8949, longitude:91.8687, source:'manual' },
  { id:'rajshahi', name:'Rajshahi, Bangladesh', latitude:24.3745, longitude:88.6042, source:'manual' },
  { id:'khulna', name:'Khulna, Bangladesh', latitude:22.8456, longitude:89.5403, source:'manual' },
  { id:'barishal', name:'Barishal, Bangladesh', latitude:22.7010, longitude:90.3535, source:'manual' },
  { id:'rangpur', name:'Rangpur, Bangladesh', latitude:25.7439, longitude:89.2752, source:'manual' },
  { id:'mymensingh', name:'Mymensingh, Bangladesh', latitude:24.7471, longitude:90.4203, source:'manual' },
  { id:'cumilla', name:'Cumilla, Bangladesh', latitude:23.4607, longitude:91.1809, source:'manual' },
  { id:'cox-bazar', name:"Cox's Bazar, Bangladesh", latitude:21.4272, longitude:92.0058, source:'manual' },
  { id:'bogura', name:'Bogura, Bangladesh', latitude:24.8465, longitude:89.3770, source:'manual' },
  { id:'jashore', name:'Jashore, Bangladesh', latitude:23.1664, longitude:89.2081, source:'manual' },
  { id:'rangamati', name:'Rangamati, Bangladesh', latitude:22.7324, longitude:92.2985, source:'manual' },
];
const DEFAULT_WEATHER_LOCATION = BANGLADESH_LOCATIONS[1];
function loadSavedWeatherLocation(): WeatherLocation {
  try {
    const saved = JSON.parse(localStorage.getItem('ecoalert-weather-location') || 'null');
    if (saved && typeof saved.latitude === 'number' && typeof saved.longitude === 'number' && typeof saved.name === 'string') return saved;
  } catch { /* ignore malformed local data */ }
  return DEFAULT_WEATHER_LOCATION;
}
function weatherDescription(code: number, isBn: boolean): string {
  const descriptions: Record<number, [string, string]> = {
    0:['Clear sky','পরিষ্কার আকাশ'],1:['Mainly clear','প্রায় পরিষ্কার'],2:['Partly cloudy','আংশিক মেঘলা'],3:['Overcast','মেঘাচ্ছন্ন'],45:['Fog','কুয়াশা'],48:['Depositing rime fog','ঘন কুয়াশা'],
    51:['Light drizzle','হালকা গুঁড়ি গুঁড়ি বৃষ্টি'],53:['Drizzle','গুঁড়ি গুঁড়ি বৃষ্টি'],55:['Heavy drizzle','ঘন গুঁড়ি গুঁড়ি বৃষ্টি'],56:['Freezing drizzle','বরফ জমার মতো গুঁড়ি বৃষ্টি'],57:['Freezing drizzle','বরফ জমার মতো গুঁড়ি বৃষ্টি'],
    61:['Light rain','হালকা বৃষ্টি'],63:['Moderate rain','মাঝারি বৃষ্টি'],65:['Heavy rain','ভারী বৃষ্টি'],66:['Freezing rain','বরফশীতল বৃষ্টি'],67:['Freezing rain','বরফশীতল বৃষ্টি'],71:['Light snow','হালকা তুষার'],73:['Snow','তুষারপাত'],75:['Heavy snow','ভারী তুষারপাত'],77:['Snow grains','তুষারকণা'],
    80:['Rain showers','বৃষ্টির ঝাপটা'],81:['Rain showers','বৃষ্টির ঝাপটা'],82:['Heavy rain showers','ভারী বৃষ্টির ঝাপটা'],85:['Snow showers','তুষারঝাপটা'],86:['Snow showers','তুষারঝাপটা'],95:['Thunderstorm','বজ্রঝড়'],96:['Thunderstorm with hail','শিলাবৃষ্টিসহ বজ্রঝড়'],99:['Thunderstorm with hail','শিলাবৃষ্টিসহ বজ্রঝড়'],
  };
  const item = descriptions[code] || (code >= 95 ? descriptions[95] : ['Weather conditions unavailable','আবহাওয়ার তথ্য পাওয়া যায়নি']);
  return item[isBn ? 1 : 0];
}
function WeatherGlyph({ code, size = 26 }: { code: number; size?: number }) {
  if (code >= 95) return <CloudRain size={size}/>;
  if (code >= 51 || code === 45 || code === 48) return <CloudDrizzle size={size}/>;
  if (code === 0 || code === 1) return <Sun size={size}/>;
  return <CloudSun size={size}/>;
}

const DIAGNOSIS_SYMPTOMS = [
  { id:'yellow', en:'Yellow leaves', bn:'হলুদ পাতা' },
  { id:'spots', en:'Brown spots on leaves', bn:'পাতায় বাদামি দাগ' },
  { id:'powder', en:'White powdery coating', bn:'পাতায় সাদা গুঁড়ার মতো আবরণ' },
  { id:'wilting', en:'Wilting', bn:'গাছ নেতিয়ে পড়া' },
  { id:'curled', en:'Curled leaves', bn:'পাতা কুঁকড়ে যাওয়া' },
  { id:'rot', en:'Rotting stem base or roots', bn:'কাণ্ডের গোড়া বা শিকড় পচা' },
  { id:'stunted', en:'Stunted growth', bn:'গাছের বৃদ্ধি কম হওয়া' },
  { id:'holes', en:'Holes in leaves', bn:'পাতায় ছিদ্র' },
  { id:'water-soaked', en:'Water-soaked or dark patches', bn:'পানিভেজা বা কালচে দাগ' },
] as const;

type LocalPrediction = { label: string; score: number };
let riceSessionPromise: Promise<any> | null = null;
let plantClassifierPromise: Promise<any> | null = null;
const RICE_MODEL_URL = `${window.location.origin}/api/models/nihal4/rice-disease-model/resolve/main/model.onnx`;
const PLANT_MODEL_ID = 'onnx-community/mobilenet_v2_1.0_224-plant-disease-identification-ONNX';
const RICE_CLASSES = ['Bacterial_Leaf_Blight', 'Brown_Spot', 'Leaf_Blast', 'Tungro'];

async function getRiceModelSession() {
  if (!riceSessionPromise) {
    riceSessionPromise = (async () => {
      const ort = await import('onnxruntime-web');
      // Load the matching ONNX Runtime module and WASM files from Express.
      // Vite cannot import .mjs runtime files directly from /public, so these
      // assets are served by /api/onnxruntime/direct/ instead.
      ort.env.wasm.wasmPaths = '/api/onnxruntime/direct/';
      ort.env.wasm.numThreads = 1;
      return ort.InferenceSession.create(RICE_MODEL_URL, { executionProviders: ['wasm'] });
    })().catch((error) => { riceSessionPromise = null; throw error; });
  }
  return riceSessionPromise;
}

async function classifyRicePhoto(file: File): Promise<LocalPrediction> {
  const ort = await import('onnxruntime-web');
  const session = await getRiceModelSession();
  const bitmap = await createImageBitmap(file);
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 224; canvas.height = 224;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('Your browser could not prepare the photo for analysis.');
    ctx.drawImage(bitmap, 0, 0, 224, 224);
    const pixels = ctx.getImageData(0, 0, 224, 224).data;
    const tensorData = new Float32Array(3 * 224 * 224);
    const means = [0.485, 0.456, 0.406];
    const stds = [0.229, 0.224, 0.225];
    for (let y = 0; y < 224; y++) {
      for (let x = 0; x < 224; x++) {
        const source = (y * 224 + x) * 4;
        const target = y * 224 + x;
        tensorData[target] = ((pixels[source] / 255) - means[0]) / stds[0];
        tensorData[224 * 224 + target] = ((pixels[source + 1] / 255) - means[1]) / stds[1];
        tensorData[2 * 224 * 224 + target] = ((pixels[source + 2] / 255) - means[2]) / stds[2];
      }
    }
    const inputName = session.inputNames?.[0] || 'input';
    const outputName = session.outputNames?.[0];
    const result = await session.run({ [inputName]: new ort.Tensor('float32', tensorData, [1, 3, 224, 224]) });
    const output = outputName ? result[outputName] : Object.values(result)[0] as any;
    const raw = Array.from(output.data as unknown as ArrayLike<number>, Number);
    if (raw.length !== RICE_CLASSES.length || raw.some((v) => !Number.isFinite(v))) {
      throw new Error('The rice model returned an unexpected result.');
    }
    const sum = raw.reduce((a, b) => a + b, 0);
    const scores = raw.every((v) => v >= 0 && v <= 1) && sum > 0.98 && sum < 1.02
      ? raw
      : (() => { const max = Math.max(...raw); const exps = raw.map((v) => Math.exp(v - max)); const total = exps.reduce((a, b) => a + b, 0); return exps.map((v) => v / total); })();
    const ix = scores.indexOf(Math.max(...scores));
    return { label: `Rice___${RICE_CLASSES[ix]}`, score: scores[ix] };
  } finally {
    bitmap.close();
  }
}

async function classifyCommonCropPhoto(imageUrl: string): Promise<LocalPrediction[]> {
  if (!plantClassifierPromise) {
    plantClassifierPromise = (async () => {
      const { pipeline, env } = await import('@huggingface/transformers');
      // Route model file downloads through our own Express server. This avoids
      // browser CORS issues with Hugging Face/Xet redirects and keeps the photo local.
      env.remoteHost = `${window.location.origin}/api/models/`;
      env.remotePathTemplate = '{model}/resolve/{revision}/';
      env.allowRemoteModels = true;
      env.allowLocalModels = false;
      env.useBrowserCache = true;
      // Load this Transformers.js installation's matching runtime files from Express.
      // This also avoids Vite's restriction on importing JavaScript files from /public.
      if (env.backends?.onnx?.wasm) {
        env.backends.onnx.wasm.wasmPaths = '/api/onnxruntime/transformers/';
        // Avoid SharedArrayBuffer/cross-origin-isolation failures in ordinary Vite sites.
        env.backends.onnx.wasm.numThreads = 1;
      }
      return pipeline('image-classification', PLANT_MODEL_ID);
    })().catch((error) => { plantClassifierPromise = null; throw error; });
  }
  const classifier = await plantClassifierPromise;
  const result = await classifier(imageUrl, { top_k: 3 });
  return (Array.isArray(result) ? result : [result])
    .filter((item: any) => item && typeof item.label === 'string' && Number.isFinite(Number(item.score)))
    .map((item: any) => ({ label: item.label, score: Number(item.score) }));
}

function splitModelLabel(label: string) {
  const parts = label.split('___');
  const crop = (parts.length > 1 ? parts[0] : '').replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
  const diseaseRaw = (parts.length > 1 ? parts.slice(1).join('___') : label).trim();
  const disease = diseaseRaw.replace(/_/g, ' ').replace(/\s+/g, ' ').replace(/\s*\([^)]*\)/g, (v) => v).trim();
  return { crop, disease, healthy: /healthy/i.test(diseaseRaw) };
}

function displayDiseaseLabel(label: string, isBn: boolean) {
  const { crop, disease, healthy } = splitModelLabel(label);
  const riceBn: Record<string, string> = {
    Bacterial_Leaf_Blight: 'ব্যাকটেরিয়াল লিফ ব্লাইট', Brown_Spot: 'ধানের বাদামি দাগ',
    Leaf_Blast: 'ধানের ব্লাস্ট রোগ', Tungro: 'ধানের টুংরো রোগ',
  };
  if (label.startsWith('Rice___')) {
    const key = label.split('___')[1];
    return isBn ? (riceBn[key] || disease) : ({
      Bacterial_Leaf_Blight: 'Rice — bacterial leaf blight', Brown_Spot: 'Rice — brown spot',
      Leaf_Blast: 'Rice — leaf blast', Tungro: 'Rice — tungro disease',
    } as Record<string, string>)[key] || `Rice — ${disease}`;
  }
  if (isBn) {
    const cropBn: Record<string, string> = { Tomato:'টমেটো', Potato:'আলু', 'Corn (maize)':'ভুট্টা', Apple:'আপেল', Grape:'আঙুর', 'Pepper, bell':'মরিচ', Peach:'পিচ', Strawberry:'স্ট্রবেরি', Cherry:'চেরি', Orange:'কমলা', Soybean:'সয়াবিন', Blueberry:'ব্লুবেরি', Raspberry:'রাস্পবেরি', Squash:'স্কোয়াশ' };
    const diseaseBn: Record<string, string> = {
      healthy:'মডেলের শ্রেণি অনুযায়ী সুস্থ পাতা', Early_blight:'আর্লি ব্লাইট', Late_blight:'লেট ব্লাইট',
      Bacterial_spot:'ব্যাকটেরিয়াল স্পট', Septoria_leaf_spot:'সেপ্টোরিয়া পাতার দাগ',
      Leaf_Mold:'পাতার ছাঁচজনিত রোগ', Tomato_Yellow_Leaf_Curl_Virus:'টমেটোর হলুদ পাতা কুঁকড়ানো ভাইরাস',
      Tomato_mosaic_virus:'টমেটো মোজাইক ভাইরাস', Spider_mites_Two_spotted_spider_mite:'স্পাইডার মাইটের ক্ষতি',
      Powdery_mildew:'পাউডারি মিলডিউ', Apple_scab:'অ্যাপল স্ক্যাব', Black_rot:'ব্ল্যাক রট',
      Cedar_apple_rust:'সিডার-অ্যাপল রাস্ট', Common_rust:'কমন রাস্ট', Northern_Leaf_Blight:'নর্দার্ন লিফ ব্লাইট',
      Cercospora_leaf_spot_Gray_leaf_spot:'সারকোস্পোরা/গ্রে লিফ স্পট', Esca_Black_Measles:'এস্কা/ব্ল্যাক মিজলস',
      Leaf_blight_Isariopsis_Leaf_Spot:'লিফ ব্লাইট', Haunglongbing_Citrus_greening:'সাইট্রাস গ্রিনিং',
      Leaf_scorch:'লিফ স্কর্চ',
    };
    const diseaseKey = label.split('___').slice(1).join('___').replace(/^Tomato___/, '').replace(/^Potato___/, '');
    const diseaseName = healthy ? diseaseBn.healthy : diseaseBn[diseaseKey] || disease;
    return `${cropBn[crop] || crop || 'ফসল'} — ${diseaseName}`;
  }
  return `${crop || 'Plant'} — ${healthy ? 'healthy class' : disease}`;
}

function nextStepsForModel(label: string, isBn: boolean) {
  if (label.includes('Bacterial_Leaf_Blight')) return isBn
    ? ['আক্রান্ত পাতার প্রান্ত ও দাগ আরও কয়েকটি গাছে মিলিয়ে দেখুন।', 'পানি ও সরঞ্জামের মাধ্যমে রোগ ছড়ানোর ঝুঁকি কমান।', 'চিকিৎসার আগে উপসহকারী কৃষি কর্মকর্তা/উপজেলা কৃষি অফিসে নিশ্চিত করুন।']
    : ['Compare leaf-edge symptoms on several plants.', 'Reduce the risk of spreading disease through shared water and tools.', 'Confirm with a local agricultural extension officer before treatment.'];
  if (label.includes('Brown_Spot')) return isBn
    ? ['একাধিক পাতার দাগের আকার ও বিস্তার পরীক্ষা করুন।', 'মাটির অবস্থা ও পুষ্টির ঘাটতির সম্ভাবনাও যাচাই করুন।', 'কোনো ছত্রাকনাশক ব্যবহারের আগে স্থানীয় কৃষি কর্মকর্তার পরামর্শ নিন।']
    : ['Compare lesion shape and spread across several leaves.', 'Also check soil conditions and possible nutrient stress.', 'Ask a local agricultural officer before using any fungicide.'];
  if (label.includes('Leaf_Blast')) return isBn
    ? ['পাতায় লম্বাটে/হীরার মতো দাগ আছে কি না দেখুন।', 'অন্যান্য গাছ ও শীষেও লক্ষণ আছে কি না পরীক্ষা করুন।', 'রোগ নিশ্চিত করতে স্থানীয় কৃষি কর্মকর্তার সঙ্গে যোগাযোগ করুন।']
    : ['Look for elongated or diamond-shaped lesions.', 'Check nearby plants and panicles for similar symptoms.', 'Contact a local agricultural officer to confirm the result.'];
  if (label.includes('Tungro')) return isBn
    ? ['পাতা হলুদ-কমলা হওয়া ও গাছ খাটো হয়ে যাওয়ার লক্ষণ পরীক্ষা করুন।', 'পাতাফড়িং বা বাহক পোকা আছে কি না দেখুন।', 'রোগ নিশ্চিত না করে কীটনাশক প্রয়োগ করবেন না।']
    : ['Check for yellow-orange leaves and stunted growth.', 'Inspect for leafhoppers or other possible vectors.', 'Do not apply pesticides without confirming the cause.'];
  return isBn
    ? ['একাধিক গাছ ও পাতার ছবি তুলে মিলিয়ে দেখুন।', 'ছবি ও লক্ষণ স্থানীয় কৃষি কর্মকর্তাকে দেখিয়ে ফল নিশ্চিত করুন।', 'মডেলের ফল নিশ্চিত রোগ নির্ণয় নয়; অনুমান করে কীটনাশক প্রয়োগ করবেন না।']
    : ['Compare the result with several plants and leaves in the field.', 'Show the photo and symptoms to a local agricultural extension officer.', 'This model result is not a confirmed diagnosis; do not apply pesticide based on a guess.'];
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => localStorage.getItem('ecoalert-language') === 'bn' ? 'bn' : 'en');
  const [season, setSeason] = useState<string>(() => { const saved = localStorage.getItem('ecoalert-season') || 'late-autumn'; if (saved === 'storm') { localStorage.setItem('ecoalert-season', 'autumn'); return 'autumn'; } return saved; });
  const [seasonMode, setSeasonMode] = useState<'manual'|'auto'>(() => (localStorage.getItem('ecoalert-season-mode') as 'manual'|'auto') || 'manual');
  const [weatherLocation, setWeatherLocation] = useState<WeatherLocation>(loadSavedWeatherLocation);
  const [liveWeather, setLiveWeather] = useState<LiveWeather | null>(null);
  const [weatherStatus, setWeatherStatus] = useState<'loading'|'live'|'error'>('loading');
  const [weatherError, setWeatherError] = useState('');
  const [weatherUpdatedAt, setWeatherUpdatedAt] = useState<Date | null>(null);
  const [weatherRefreshToken, setWeatherRefreshToken] = useState(0);
  const [locating, setLocating] = useState(false);
  const seasonOptions = [{id:'late-autumn',en:'Late Autumn',bn:'হেমন্ত',months:[10,11]},{id:'winter',en:'Winter',bn:'শীত',months:[12,1]},{id:'spring',en:'Spring',bn:'বসন্ত',months:[2,3]},{id:'summer',en:'Summer',bn:'গ্রীষ্ম',months:[4,5]},{id:'monsoon',en:'Monsoon',bn:'বর্ষা',months:[6,7]},{id:'autumn',en:'Autumn',bn:'শরৎ',months:[8,9]}];
  const seasonHeroSrc = (seasonId:string) => `/seasons/${seasonId === 'storm' ? 'autumn' : seasonId}-hero.jpg?rev=5`;
  const seasonThumbnailSrc = (seasonId:string) => `/seasons/${seasonId === 'storm' ? 'autumn' : seasonId}.jpg?rev=5`;
  const seasonalWeather: Record<string,{temperature:number;humidity:number;wind:number;rain:number;feels:number}> = {
    'late-autumn':{temperature:28,humidity:78,wind:12,rain:15,feels:30}, winter:{temperature:18,humidity:88,wind:10,rain:5,feels:16},
    spring:{temperature:26,humidity:75,wind:8,rain:10,feels:27}, summer:{temperature:32,humidity:62,wind:14,rain:5,feels:36},
    monsoon:{temperature:24,humidity:92,wind:16,rain:80,feels:26}, autumn:{temperature:30,humidity:78,wind:9,rain:12,feels:32}
  };
  const sampleWeather = seasonalWeather[season] || seasonalWeather['late-autumn'];
  const weatherNow = liveWeather ? { temperature: Math.round(liveWeather.temperature), feels: Math.round(liveWeather.feels), humidity: Math.round(liveWeather.humidity), wind: Math.round(liveWeather.wind), rain: Math.round(liveWeather.rain) } : sampleWeather;
  const setSeasonChoice = (value:string) => {
    const safeSeason = seasonOptions.some(item => item.id === value) ? value : 'late-autumn';
    setSeason(safeSeason);
    localStorage.setItem('ecoalert-season', safeSeason);
    // Leave manual mode selected so the month-based effect cannot override this choice.
    setSeasonMode('manual');
    localStorage.setItem('ecoalert-season-mode', 'manual');
  };
  useEffect(() => {
    if (seasonMode !== 'auto') return;
    const month = new Date().getMonth() + 1;
    const match = seasonOptions.find(item => item.months.includes(month));
    if (match && match.id !== season) { setSeason(match.id); localStorage.setItem('ecoalert-season', match.id); }
  }, [seasonMode]);
  const setModeChoice = (value:'manual'|'auto') => { setSeasonMode(value); localStorage.setItem('ecoalert-season-mode', value); if(value==='auto'){ const m=new Date().getMonth()+1; const match=seasonOptions.find(x=>x.months.includes(m)); if(match){setSeason(match.id);localStorage.setItem('ecoalert-season',match.id);} } };
  const [active, setActive] = useState('dashboard');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState('');
  const [done, setDone] = useState<number[]>([]);
  const [alerts, setAlerts] = useState([true, true]);
  const [toast, setToast] = useState('');
  const [profile, setProfile] = useState(() => {
    const empty = { name:'', phone:'', district:'', upazila:'', farmSize:'', crops:'', soilType:'', irrigation:'' };
    try {
      const candidate = JSON.parse(localStorage.getItem('ecoalert-profile') || 'null');
      const explicitlySaved = localStorage.getItem('ecoalert-profile-saved') === 'true';
      if (explicitlySaved && candidate && typeof candidate.name === 'string' && candidate.name.trim()) return { ...empty, ...candidate };
      localStorage.removeItem('ecoalert-profile-saved');
      localStorage.removeItem('ecoalert-profile');
      return empty;
    } catch { localStorage.removeItem('ecoalert-profile-saved'); localStorage.removeItem('ecoalert-profile'); return empty; }
  });
  const [profileSaved, setProfileSaved] = useState(() => {
    try { const candidate = JSON.parse(localStorage.getItem('ecoalert-profile') || 'null'); return localStorage.getItem('ecoalert-profile-saved') === 'true' && !!candidate && typeof candidate.name === 'string' && !!candidate.name.trim(); } catch { return false; }
  });
  const [soilData, setSoilData] = useState(() => { try { return { moisture:'', ph:'', nitrogen:'', phosphorus:'', potassium:'', notes:'', ...JSON.parse(localStorage.getItem('ecoalert-soil-data') || '{}') }; } catch { return { moisture:'', ph:'', nitrogen:'', phosphorus:'', potassium:'', notes:'' }; } });
  const [soilSaved, setSoilSaved] = useState(() => localStorage.getItem('ecoalert-soil-saved') === 'true');
  const [plannerCrop, setPlannerCrop] = useState('Rice (Boro)');
  const [plannerSoil, setPlannerSoil] = useState('Loamy');
  const [plannerQuality, setPlannerQuality] = useState('Moderate');
  const [plannerDrainage, setPlannerDrainage] = useState('Moderate');
  const [plannerRain, setPlannerRain] = useState('Normal');
  const [plannerLand, setPlannerLand] = useState('Medium');
  const [plannerResult, setPlannerResult] = useState(false);
  const [floodInputs, setFloodInputs] = useState(() => { try { return { rainfall:85, riverRise:18, drainage:'poor', elevation:'low', riverDistance:'near', ...JSON.parse(localStorage.getItem('ecoalert-flood-inputs') || '{}') }; } catch { return { rainfall:85, riverRise:18, drainage:'poor', elevation:'low', riverDistance:'near' }; } });
  const [floodNotices, setFloodNotices] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem('ecoalert-flood-log') || '[]'); } catch { return []; } });
  const [diagnosisImage, setDiagnosisImage] = useState<string>('');
  const [diagnosisName, setDiagnosisName] = useState<string>('');
  const [diagnosisFile, setDiagnosisFile] = useState<File | null>(null);
  const [diagnosisBusy, setDiagnosisBusy] = useState(false);
  const [diagnosisReport, setDiagnosisReport] = useState<DiagnosisReport | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const handleDiagnosisFile = (file?: File) => { if (!file) return; if (!file.type.startsWith('image/')) { notify(isBn ? 'একটি ছবি নির্বাচন করুন' : 'Please choose an image file'); return; } if (diagnosisImage) URL.revokeObjectURL(diagnosisImage); setDiagnosisFile(file); setDiagnosisReport(null); setDiagnosisName(file.name); setDiagnosisImage(URL.createObjectURL(file)); setDiagnosisResult(''); };
  const [diagnosisCrop, setDiagnosisCrop] = useState('Rice');
  const [diagnosisSymptoms, setDiagnosisSymptoms] = useState<string[]>(['spots', 'holes']);
  const [diagnosisResult, setDiagnosisResult] = useState('');
  const [assistantQuestion, setAssistantQuestion] = useState('');
  const [assistantAnswer, setAssistantAnswer] = useState('');
  const [farmPlots, setFarmPlots] = useState(() => {
    try { const saved = localStorage.getItem('ecoalert-farm-plots'); return saved ? JSON.parse(saved) : []; } catch { return []; }
  });
  const [showPlotForm, setShowPlotForm] = useState(false);
  const [newPlot, setNewPlot] = useState({name:'',crop:'Rice',size:''});
  const floodScore = Math.min(100, Math.round(floodInputs.rainfall * 0.42 + floodInputs.riverRise * 1.15 + (floodInputs.drainage === 'poor' ? 18 : floodInputs.drainage === 'average' ? 9 : 0) + (floodInputs.elevation === 'low' ? 16 : floodInputs.elevation === 'medium' ? 7 : 0) + (floodInputs.riverDistance === 'near' ? 12 : floodInputs.riverDistance === 'medium' ? 6 : 0)));
  const floodLevel = floodScore >= 70 ? 'high' : floodScore >= 42 ? 'moderate' : 'low';
  const t = copy[lang];
  useEffect(() => { localStorage.setItem('ecoalert-language', lang); }, [lang]);
  const isBn = lang === 'bn';
  const currentDateLabel = new Intl.DateTimeFormat(isBn ? 'bn-BD' : 'en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' }).format(new Date());
  const localDigits = (value:string|number) => isBn ? String(value).replace(/[0-9]/g, d => '০১২৩৪৫৬৭৮৯'[Number(d)]) : String(value);
  useEffect(() => {
    const controller = new AbortController();
    setWeatherStatus('loading');
    setWeatherError('');
    setLiveWeather(null);
    const params = new URLSearchParams({
      latitude: String(weatherLocation.latitude), longitude: String(weatherLocation.longitude),
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,wind_speed_10m,weather_code',
      hourly: 'precipitation_probability',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum',
      forecast_days: '5', timezone: 'auto',
    });
    fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, { signal: controller.signal })
      .then(async (response) => { if (!response.ok) throw new Error(`Weather service returned HTTP ${response.status}`); return response.json(); })
      .then((data) => {
        if (controller.signal.aborted) return;
        const current = data.current || {};
        const daily = data.daily || {};
        const nextHourIndex = Array.isArray(data.hourly?.time) ? data.hourly.time.findIndex((time: string) => time >= String(current.time || '')) : -1;
        const hourlyRain = nextHourIndex >= 0 ? data.hourly?.precipitation_probability?.[nextHourIndex] : undefined;
        const dailyRain = daily.precipitation_probability_max?.[0];
        const report: LiveWeather = {
          temperature: Number(current.temperature_2m ?? 0), feels: Number(current.apparent_temperature ?? current.temperature_2m ?? 0),
          humidity: Number(current.relative_humidity_2m ?? 0), wind: Number(current.wind_speed_10m ?? 0),
          rain: Number(dailyRain ?? hourlyRain ?? 0), code: Number(current.weather_code ?? 3), isDay: Number(current.is_day ?? 1) === 1,
          daily: (daily.time || []).map((date: string, index: number) => ({ date, code: Number(daily.weather_code?.[index] ?? 3), high: Number(daily.temperature_2m_max?.[index] ?? 0), low: Number(daily.temperature_2m_min?.[index] ?? 0), rain: Number(daily.precipitation_probability_max?.[index] ?? 0) })),
        };
        setLiveWeather(report);
        setWeatherStatus('live');
        setWeatherUpdatedAt(new Date());
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        setLiveWeather(null);
        setWeatherStatus('error');
        setWeatherError(error instanceof Error ? error.message : 'Weather data could not be loaded.')
      });
    return () => controller.abort();
  }, [weatherLocation.latitude, weatherLocation.longitude, weatherRefreshToken]);

  const cropName = (v:string) => isBn ? ({'Rice (Boro)':'বোরো ধান','Mustard':'সরিষা','Potato':'আলু','Lentil':'মসুর ডাল','Maize':'ভুট্টা','Winter vegetables':'শীতকালীন সবজি'} as Record<string,string>)[v] || v : v;
  const soilName = (v:string) => isBn ? ({'Loamy':'দোআঁশ','Clay':'এঁটেল','Sandy':'বেলে','Silty / alluvial':'পলি মাটি','Unknown':'জানা নেই','Good':'ভালো','Moderate':'মাঝারি','Poor':'দুর্বল','Poor / waterlogged':'পানি জমে থাকে','Normal':'স্বাভাবিক','Low / dry':'কম বৃষ্টি / শুষ্ক','Heavy / wet':'ভারী বৃষ্টি / ভেজা','High':'উঁচু','Medium':'মাঝারি','Low / flood-prone':'নিচু / বন্যাপ্রবণ'} as Record<string,string>)[v] || v : v;
  const notify = (message:string) => { setToast(message); window.setTimeout(() => setToast(''), 2600); };
  const chooseWeatherLocation = (location: WeatherLocation) => {
    setWeatherLocation(location);
    localStorage.setItem('ecoalert-weather-location', JSON.stringify(location));
  };
  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setWeatherError(isBn ? 'এই ব্রাউজারে অবস্থান সুবিধা নেই। তালিকা থেকে এলাকা বেছে নিন।' : 'Geolocation is not available in this browser. Choose an area from the list.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const location: WeatherLocation = {
        id: 'gps', name: isBn ? 'আপনার বর্তমান GPS অবস্থান' : 'Your current GPS location',
        latitude: Number(position.coords.latitude.toFixed(5)), longitude: Number(position.coords.longitude.toFixed(5)), source: 'gps',
      };
      chooseWeatherLocation(location);
      setLocating(false);
      notify(isBn ? 'আপনার GPS অবস্থান অনুযায়ী আবহাওয়া দেখানো হচ্ছে' : 'Weather updated for your GPS location');
    }, (error) => {
      setLocating(false);
      const message = error.code === error.PERMISSION_DENIED
        ? (isBn ? 'অবস্থান অনুমতি বন্ধ আছে। ব্রাউজার সেটিংসে অনুমতি দিন অথবা তালিকা থেকে এলাকা বেছে নিন।' : 'Location permission was denied. Allow it in browser settings or choose an area manually.')
        : (isBn ? 'অবস্থান পাওয়া যায়নি। আবার চেষ্টা করুন বা তালিকা থেকে এলাকা বেছে নিন।' : 'Could not get your location. Try again or choose an area manually.');
      setWeatherError(message);
    }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 120000 });
  };
  const runDiagnosis = async () => {
    setDiagnosisReport(null);
    if (!diagnosisSymptoms.length) {
      setDiagnosisResult(isBn ? 'বিশ্লেষণের আগে অন্তত একটি লক্ষণ নির্বাচন করুন।' : 'Select at least one symptom before continuing.');
      return;
    }
    const selectedSymptoms = DIAGNOSIS_SYMPTOMS.filter((item) => diagnosisSymptoms.includes(item.id));
    const selectedLabels = selectedSymptoms.map((item) => isBn ? item.bn : item.en);
    const symptomGuidance: Record<string, [string, string]> = {
      yellow: ['Check soil moisture, drainage and whether yellowing starts on older or newer leaves. Avoid fertilizer until the cause is clearer.', 'মাটির আর্দ্রতা, পানি নিষ্কাশন এবং পুরোনো না নতুন পাতায় হলদে ভাব শুরু হয়েছে তা পরীক্ষা করুন। কারণ পরিষ্কার না হওয়া পর্যন্ত সার দেবেন না।'],
      spots: ['Compare the shape, colour and spread of spots on several leaves. Photograph both sides and check for similar symptoms on nearby plants.', 'একাধিক পাতায় দাগের আকার, রং ও বিস্তার মিলিয়ে দেখুন। পাতার দুই পাশের ছবি তুলুন এবং পাশের গাছেও একই লক্ষণ আছে কি না দেখুন।'],
      powder: ['Check whether the white coating wipes away and whether nearby leaves are affected. Do not apply a fungicide before confirming the cause.', 'সাদা আবরণ মুছে যায় কি না এবং পাশের পাতায় আছে কি না দেখুন। কারণ নিশ্চিত না করে ছত্রাকনাশক ব্যবহার করবেন না।'],
      wilting: ['Check soil moisture and drainage. Wet soil with wilting can indicate root problems; do not automatically add more water.', 'মাটির আর্দ্রতা ও পানি নিষ্কাশন পরীক্ষা করুন। মাটি ভেজা থাকা সত্ত্বেও গাছ নেতিয়ে গেলে শিকড়ের সমস্যা হতে পারে; না দেখে আরও পানি দেবেন না।'],
      curled: ['Inspect the undersides of curled leaves for insects, eggs or sticky residue; also check heat and water stress.', 'কুঁকড়ানো পাতার নিচে পোকা, ডিম বা আঠালো পদার্থ আছে কি না দেখুন; অতিরিক্ত তাপ ও পানির চাপও পরীক্ষা করুন।'],
      rot: ['Check the stem base and roots for soft tissue, dark colour and waterlogging. Seek local advice before treatment.', 'কাণ্ডের গোড়া ও শিকড়ে নরম অংশ, কালচে রং ও পানি জমার লক্ষণ দেখুন। চিকিৎসার আগে স্থানীয় কৃষি কর্মকর্তার পরামর্শ নিন।'],
      stunted: ['Compare affected plants with healthy plants and inspect root health, water conditions and nutrient history.', 'আক্রান্ত গাছের সঙ্গে সুস্থ গাছের তুলনা করুন এবং শিকড়, পানির অবস্থা ও পুষ্টি ব্যবস্থাপনা পরীক্ষা করুন।'],
      holes: ['Inspect leaf undersides and new growth for insects, eggs, caterpillars and fresh feeding marks.', 'পাতার নিচে ও নতুন পাতায় পোকা, ডিম, শুঁয়োপোকা ও নতুন কামড়ের চিহ্ন পরীক্ষা করুন।'],
      'water-soaked': ['Check whether patches spread quickly and whether affected leaves are wet, dark or soft. Avoid handling healthy plants with contaminated tools.', 'দাগ দ্রুত ছড়াচ্ছে কি না এবং পাতা ভেজা, কালচে বা নরম কি না দেখুন। আক্রান্ত গাছের সরঞ্জাম পরিষ্কার না করে সুস্থ গাছে ব্যবহার করবেন না।'],
    };
    if (!diagnosisFile) {
      const guidance = selectedSymptoms.map((item) => `• ${isBn ? item.bn : item.en}: ${symptomGuidance[item.id][isBn ? 1 : 0]}`);
      setDiagnosisResult(`${isBn ? 'প্রাথমিক লক্ষণভিত্তিক নির্দেশনা — ছবি বিশ্লেষণ করা হয়নি' : 'Preliminary symptom guidance — no photo was analyzed'}\n${guidance.join('\n')}\n\n${isBn ? 'এগুলো সম্ভাব্য কারণ খুঁজতে সহায়ক পদক্ষেপ, রোগ নির্ণয় নয়। চিকিৎসা বা কীটনাশক ব্যবহারের আগে স্থানীয় কৃষি কর্মকর্তার পরামর্শ নিন।' : 'These are inspection steps, not a disease diagnosis. Consult a local agricultural extension officer before treatment or pesticide use.'}`);
      notify(isBn ? 'ছবি ছাড়া লক্ষণভিত্তিক নির্দেশনা তৈরি হয়েছে' : 'Symptom guidance generated; no photo was analyzed');
      return;
    }

    setDiagnosisBusy(true);
    setDiagnosisResult(isBn ? 'ছবিটি এই ব্রাউজারেই বিশ্লেষণ করা হচ্ছে। প্রথম ব্যবহারে বিনামূল্যের মডেল ডাউনলোড হতে কিছু সময় লাগতে পারে…' : 'Analyzing the photo in this browser. The free model may take a while to download the first time…');
    try {
      if (diagnosisFile.size > 7 * 1024 * 1024) throw new Error(isBn ? 'ছবিটি ৭ MB-এর চেয়ে বড়। ছোট ছবি ব্যবহার করুন।' : 'Image is larger than 7 MB. Please use a smaller photo.');
      let prediction: LocalPrediction | null = null;
      let alternatives: LocalPrediction[] = [];
      if (diagnosisCrop === 'Rice') {
        prediction = await classifyRicePhoto(diagnosisFile);
      } else if (['Tomato', 'Potato', 'Vegetables'].includes(diagnosisCrop)) {
        const localUrl = diagnosisImage || URL.createObjectURL(diagnosisFile);
        const temporaryUrl = !diagnosisImage;
        try {
          alternatives = await classifyCommonCropPhoto(localUrl);
        } finally {
          if (temporaryUrl) URL.revokeObjectURL(localUrl);
        }
        const first = alternatives[0];
        const firstPlant = first ? splitModelLabel(first.label).crop.toLowerCase() : '';
        const cropMatches = diagnosisCrop === 'Vegetables'
          ? firstPlant === 'tomato' || firstPlant === 'potato'
          : firstPlant === diagnosisCrop.toLowerCase();
        prediction = cropMatches && first && first.score >= 0.45 ? first : null;
      } else {
        setDiagnosisResult(isBn
          ? `এই বিনামূল্যের স্থানীয় মডেলে ${diagnosisCrop} ফসল সমর্থিত নয়। ছবিটি বিশ্লেষণ করা হয়নি। আপাতত ধান, টমেটো বা আলুর জন্য মডেল ব্যবহার করুন; অন্য ফসলের জন্য লক্ষণভিত্তিক নির্দেশনা দেখুন এবং স্থানীয় কৃষি কর্মকর্তার পরামর্শ নিন।`
          : `The free on-device model does not support ${diagnosisCrop} yet. This photo was not analyzed. The current model supports rice, tomato and potato; for other crops, use symptom guidance and consult a local agricultural extension officer.`);
        return;
      }

      if (!prediction) {
        const best = alternatives[0];
        const bestName = best ? displayDiseaseLabel(best.label, isBn) : '';
        setDiagnosisResult(isBn
          ? `এই ছবির জন্য নির্ভরযোগ্য মিল পাওয়া যায়নি। ${bestName ? `মডেলের নিকটতম শ্রেণি: ${bestName}।` : ''}আপনার নির্বাচিত ফসলের সঙ্গে মিল নিশ্চিত করা যায়নি, তাই রোগের নাম দেওয়া হয়নি। পরিষ্কারভাবে পাতার ছবি তুলুন এবং স্থানীয় কৃষি কর্মকর্তার পরামর্শ নিন।`
          : `The model could not find a reliable class for the selected crop. ${bestName ? `Its nearest overall class was ${bestName}. ` : ''}A disease was not assigned because the crop match was uncertain. Try a clear leaf photo and consult a local agricultural extension officer.`);
        return;
      }

      const { crop: predictedCrop, healthy } = splitModelLabel(prediction.label);
      const sameCrop = diagnosisCrop === 'Vegetables'
        ? predictedCrop.toLowerCase() === 'tomato' || predictedCrop.toLowerCase() === 'potato'
        : predictedCrop.toLowerCase() === diagnosisCrop.toLowerCase();
      if (!sameCrop || prediction.score < 0.45) {
        setDiagnosisResult(isBn
          ? `ছবিটি থেকে নির্ভরযোগ্য রোগ নির্ণয় করা যায়নি। মডেলের স্কোর যথেষ্ট নয় অথবা নির্বাচিত ফসলের সঙ্গে মিল নেই। ছবিটি রোগের নাম নির্ধারণের জন্য ব্যবহার করা হয়নি।`
          : `The photo could not be assessed reliably. The model score was too weak or did not match the selected crop, so no disease was assigned.`);
        return;
      }

      const issue = displayDiseaseLabel(prediction.label, isBn);
      const confidence: DiagnosisReport['confidenceLevel'] = prediction.score >= 0.70 ? 'moderate' : 'low';
      const modelScoreLabel = `${Math.round(prediction.score * 100)}%`;
      const steps = nextStepsForModel(prediction.label, isBn);
      const selectedLine = selectedLabels.length ? selectedLabels.join(', ') : '';
      const healthyWarning = healthy
        ? (isBn ? 'মডেলের শ্রেণি অনুযায়ী পাতাটি সুস্থ দেখাচ্ছে; তবু রোগ পুরোপুরি বাদ দেওয়া যায় না।' : 'The model matched a healthy-leaf class; this does not rule out every possible problem.')
        : (isBn ? 'এটি মডেলের সম্ভাব্য মিল, নিশ্চিত রোগ নির্ণয় নয়।' : 'This is the model’s closest match, not a confirmed diagnosis.');
      const scoreLine = isBn
        ? `মডেলের স্কোর: ${modelScoreLabel} (ক্ষেত্র পর্যায়ে যাচাইকৃত আস্থার শতাংশ নয়)`
        : `Model score: ${modelScoreLabel} (not a calibrated field-confidence percentage)`;
      const resultText = [
        `${isBn ? 'মডেলের সম্ভাব্য মিল' : 'Model’s closest match'}: ${issue}`,
        scoreLine,
        selectedLine ? `${isBn ? 'আপনার নির্বাচিত লক্ষণ' : 'Symptoms you selected'}: ${selectedLine}` : '',
        healthyWarning,
        `${isBn ? 'পরবর্তী পদক্ষেপ' : 'Suggested next steps'}:\n${steps.map((x) => `• ${x}`).join('\n')}`,
        isBn ? 'মডেলটি পরিচিত পাতার ছবির ডেটাসেটে প্রশিক্ষিত; বাংলাদেশের মাঠের ছবিতে ভুল হতে পারে। চিকিৎসা বা কীটনাশক ব্যবহারের আগে কৃষি কর্মকর্তার সঙ্গে নিশ্চিত করুন।' : 'This model was trained on known leaf-photo datasets and can be wrong on real field photos in Bangladesh. Confirm with an agricultural extension officer before treatment or pesticide use.',
        isBn ? 'গোপনীয়তা: ছবির বিশ্লেষণ আপনার ব্রাউজারে হয়েছে; মডেল ফাইল প্রথমবার Hugging Face থেকে ডাউনলোড হয়।' : 'Privacy: image inference ran in your browser; model files are downloaded from Hugging Face on first use.',
      ].filter(Boolean);
      setDiagnosisReport({
        likelyIssue: issue,
        confidenceLevel: prediction.score < 0.45 ? 'cannot_assess' : confidence,
        visibleSigns: selectedLabels,
        possibleAlternatives: alternatives.slice(1).map((item) => displayDiseaseLabel(item.label, isBn)),
        nextSteps: steps,
        seekHelp: isBn ? 'উপজেলা কৃষি কর্মকর্তা/স্থানীয় কৃষি সম্প্রসারণ কর্মকর্তার সঙ্গে নিশ্চিত করুন।' : 'Confirm with your Upazila Agriculture Officer or local agricultural extension officer.',
        disclaimer: healthyWarning,
      });
      setDiagnosisResult(resultText.join('\n\n'));
      notify(isBn ? 'স্থানীয় মডেল দিয়ে ছবি বিশ্লেষণ হয়েছে' : 'Photo analyzed by the on-device model');
    } catch (error) {
      const rawMessage = error instanceof Error ? error.message : String(error || 'Unknown error');
      console.error('EcoAlert local crop model failed:', error);
      const message = /fetch|network|download|model|wasm|onnx|upstream|502|404/i.test(rawMessage)
        ? (isBn
            ? `বিনামূল্যের মডেল ডাউনলোড বা চালু করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করুন এবং সার্ভারটি চালু আছে কি না দেখুন। প্রযুক্তিগত তথ্য: ${rawMessage.slice(0, 220)}`
            : `The free model could not download or start. Check the internet connection and ensure both app services are running. Technical detail: ${rawMessage.slice(0, 220)}`)
        : rawMessage.slice(0, 300) || (isBn ? 'ছবি বিশ্লেষণ করা যায়নি।' : 'Image analysis failed.');
      setDiagnosisResult(`${isBn ? 'ছবি বিশ্লেষণ সম্পন্ন হয়নি' : 'Photo analysis did not complete'}\n${message}\n${isBn ? 'ছবি বিশ্লেষণ না হলে কোনো রোগ ধরে নেবেন না। চিকিৎসার আগে স্থানীয় কৃষি কর্মকর্তার পরামর্শ নিন।' : 'The photo was not analyzed. Do not assume a disease when analysis fails. Consult a local agricultural extension officer before treatment.'}`);
    } finally {
      setDiagnosisBusy(false);
    }
  };
  const pageTitle = navItems.find(n=>n.id===active);
  const showDashboard = active === 'dashboard';

  useEffect(() => { localStorage.setItem('ecoalert-profile-saved', String(profileSaved)); }, [profileSaved]);
  useEffect(() => { localStorage.setItem('ecoalert-soil-data', JSON.stringify(soilData)); }, [soilData]);
  useEffect(() => { localStorage.setItem('ecoalert-soil-saved', String(soilSaved)); }, [soilSaved]);
  useEffect(() => { localStorage.setItem('ecoalert-flood-inputs', JSON.stringify(floodInputs)); }, [floodInputs]);
  useEffect(() => { localStorage.setItem('ecoalert-flood-log', JSON.stringify(floodNotices)); }, [floodNotices]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        document.querySelector<HTMLInputElement>('.search-box input')?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const runSearch = (value:string) => {
    const q = value.trim().toLowerCase();
    if (!q) return;
    const routes:[string,string[]][] = [
      ['dashboard',['dashboard','home','ড্যাশবোর্ড','হোম']], ['alerts',['alert','flood','warning','notification','বন্যা','সতর্ক','ইকোঅ্যালার্ট']],
      ['diagnosis',['diagnos','disease','crop disease','leaf','রোগ','পাতা','ফসল পরীক্ষা']], ['assistant',['assistant','help','ai','সহকারী','সাহায্য']],
      ['farm',['farm','plot','land','জমি','খামার']], ['cropPlanner',['planner','plan','sowing','seed','ফসল পরিকল্পনা','বপন']],
      ['cropHealth',['crop health','health','ফসলের স্বাস্থ্য']], ['soil',['soil','nutrient','ph','মাটি','পুষ্টি']], ['settings',['setting','season','ঋতু','সেটিং']], ['profile',['profile','account','প্রোফাইল']]
    ];
    const match = routes.find(([,words]) => words.some(word => q.includes(word)));
    if (match) { setActive(match[0]); setMobileMenu(false); setQuery(''); }
    else notify(isBn ? 'কোনো মিল পাওয়া যায়নি। “মাটি”, “বন্যা”, “ফসল পরিকল্পনা” বা “প্রোফাইল” খুঁজুন।' : 'No matching section. Try soil, flood, crop planner, farm, diagnosis or profile.');
  };

  const SidebarContent = () => <><div className="brand">
    <div className="brand-mark"><Sprout size={25}/></div>
    <div><div className="brand-name">{isBn?<>ইকোঅ্যালার্ট <span>+</span></>:<>EcoAlert <span>&</span></>}</div><div className="brand-name brand-name-secondary">{isBn?'এগ্রিসেন্স':'AgriSense'}</div><div className="brand-sub">{isBn?'স্মার্ট কৃষি · ভালো আগামী':'Smart Farming. Better Tomorrow.'}</div></div>
  </div>
  <div className="workspace-label">{t.dashboard}</div>
  <nav className="nav-list">{navItems.map(item => {
    const Icon = item.icon;
    return <button key={item.id} className={`nav-item ${active===item.id?'selected':''}`} onClick={()=>{setActive(item.id);setMobileMenu(false);}}>
      <Icon size={19}/><span className="nav-label-copy"><strong>{t[item.key as keyof typeof t]}</strong><small>{isBn?({dashboard:'Dashboard',alerts:'EcoAlert',diagnosis:'Crop disease diagnosis',cropPlanner:'Crop planner',cropHealth:'Crop health',soil:'Soil & nutrients',assistant:'AI assistant',farm:'My farm'} as Record<string,string>)[item.id]:({dashboard:'ড্যাশবোর্ড',alerts:'ইকোঅ্যালার্ট',diagnosis:'ফসলের রোগ নির্ণয়',cropPlanner:'ফসল পরিকল্পনা',cropHealth:'ফসলের স্বাস্থ্য',soil:'মাটি ও পুষ্টি',assistant:'এআই সহকারী',farm:'আমার খামার'} as Record<string,string>)[item.id]}</small></span>
      {item.id==='alerts' && <span className="nav-count">{alerts.filter(Boolean).length}</span>}
      {active===item.id && <span className="nav-active-dot"/>}
    </button>;
  })}</nav>
  <div className="sidebar-bottom">
    <div className="help-card"><div className="help-icon"><CircleHelp size={18}/></div><strong>{isBn?'সাহায্য দরকার?':'Need a hand?'}</strong><p>{isBn?'আপনার কৃষি সহায়তা সবসময় কাছে।':'Your farming support is one tap away.'}</p><button onClick={()=>setActive('assistant')}>{isBn?'সহকারীর সাথে কথা বলুন':'Talk to assistant'} <ArrowUpRight size={14}/></button></div>
    <button className={`nav-item ${active==='settings'?'selected':''}`} onClick={()=>setActive('settings')}><Settings size={19}/><span className="nav-label-copy"><strong>{t.settings}</strong><small>{isBn?'Settings':'সেটিংস'}</small></span></button>
    <button className="profile profile-button" onClick={()=>{setActive('profile');setMobileMenu(false)}}><div className="avatar">{profile.name ? profile.name.trim().split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase() : <UserRound size={17}/>}</div><div className="profile-info"><strong>{profileSaved ? profile.name : (isBn?'প্রোফাইল তৈরি করুন':'Create your profile')}</strong><span>{profileSaved ? (profile.district || 'Bangladesh') : (isBn?'সঠিক পরামর্শ পেতে তথ্য দিন':'Personalize your farm advice')}</span></div><ChevronDown size={16}/></button>
  </div></>;

  const doAction = (name:string) => {
    if(name==='diagnosis') setActive('diagnosis');
    else if(name==='weather') setActive('weather');
    else if(name==='task') { setActive('farm'); setShowPlotForm(true); notify(isBn?'নতুন জমি/কাজের তথ্য যোগ করুন':'Add your plot details to start a farm record'); }
  };

  return <div className={`app-shell ${isBn?'bangla':''} season-${season} ${showDashboard?'dashboard-shell':''}`} style={{'--season-bg': `url("${seasonHeroSrc(season)}")`} as React.CSSProperties}>
    {mobileMenu && <div className="mobile-scrim" onClick={()=>setMobileMenu(false)} />}
    <aside className={`sidebar ${mobileMenu?'sidebar-open':''}`}><button className="mobile-close" onClick={()=>setMobileMenu(false)}><X size={20}/></button><SidebarContent/></aside>
    <main className="main-area">
      <header className="topbar">
        <button className="mobile-menu" onClick={()=>setMobileMenu(true)}><Menu size={21}/></button>
        <div className="breadcrumb"><strong>{showDashboard?t.dashboard:(pageTitle?t[pageTitle.key as keyof typeof t]:active==='profile'?(isBn?'আমার প্রোফাইল':'My profile'):active==='weather'?(isBn?'আবহাওয়ার পূর্বাভাস':'Weather forecast'):t.settings)}</strong></div>
        <div className="top-actions">
          <label className="search-box"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')runSearch(query)}} placeholder={t.search} aria-label={t.search}/>{query && <button onClick={()=>setQuery('')}><X size={14}/></button>}<kbd>{isBn?'খুঁজুন':'Ctrl K'}</kbd></label>
          <div className="language-switch" aria-label={isBn?'ভাষা নির্বাচন':'Choose language'}><button type="button" className={lang==='bn'?'active':''} onClick={()=>setLang('bn')} aria-pressed={lang==='bn'}>বাংলা</button><button type="button" className={lang==='en'?'active':''} onClick={()=>setLang('en')} aria-pressed={lang==='en'}>English</button></div>
          <button className="notification-btn" onClick={()=>setActive('alerts')} aria-label="Notifications"><BellRing size={19}/><i/></button>
          <button className="top-avatar top-profile-button" onClick={()=>setActive('profile')} aria-label={isBn?'প্রোফাইল খুলুন':'Open profile'}>{profile.name ? profile.name.trim().split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase() : <UserRound size={17}/>}</button>
        </div>
      </header>

      {showDashboard ? (
        <div className="page-content live-dashboard">
          <section key={`dashboard-hero-${season}`} className="live-dash-hero" data-season={season} aria-label={isBn ? `ড্যাশবোর্ডের ${seasonOptions.find(x=>x.id===season)?.bn || 'হেমন্ত'} দৃশ্য` : `${seasonOptions.find(x=>x.id===season)?.en || 'Late Autumn'} dashboard landscape`}>
            <img key={`dashboard-background-${season}`} className="live-season-background" src={seasonHeroSrc(season)} alt="" aria-hidden="true" draggable={false} />
            <div className="live-season-overlay" aria-hidden="true" />
            <div className="live-hero-location"><span className="live-brand-dot"><Sprout size={18}/></span><span>{currentDateLabel}</span><span className="live-location-sep">•</span><MapPin size={15}/><span>{weatherLocation.name}</span></div>
            <button type="button" className="live-season-pill" onClick={()=>setActive('settings')} title={isBn?'ঋতু পরিবর্তন করুন':'Change season'}>{season==='winter'?<CloudDrizzle size={26}/>:season==='monsoon'?<CloudRain size={26}/>:season==='spring'?<Sprout size={26}/>:season==='autumn'?<Leaf size={26}/>:<Sun size={26}/>}<span><strong>{seasonOptions.find(x=>x.id===season)?.[isBn?'bn':'en'] || (isBn?'হেমন্ত':'Late Autumn')}</strong><small>{isBn?'সেটিংস থেকে ঋতু বদলান':'Change in Settings'}</small></span></button>
            <div className="live-dash-heading"><h1>{isBn?'শুভ সকাল, কৃষক 👋':'Good morning, farmer 👋'}</h1><p>{isBn?'আজ আপনার খামারে কী ঘটছে দেখে নিন।':'Here’s what’s happening on your farm today.'}</p></div>
            <div className="live-hero-cards">
              <button className="live-weather-card" onClick={()=>setActive('weather')} aria-label={isBn?'আবহাওয়া ও পূর্বাভাস':'Weather and forecast'}>
                <strong className="live-card-eyebrow">{isBn?'আজকের আবহাওয়া':'Weather today'}{weatherStatus==='live' ? <small className="weather-live-tag">{isBn?'লাইভ':'LIVE'}</small> : <small className="weather-sample-tag">{isBn?'নমুনা':'SAMPLE'}</small>}</strong><div className="live-weather-main">{liveWeather ? <WeatherGlyph code={liveWeather.code} size={54}/> : season==='winter'?<CloudDrizzle size={54}/>:season==='monsoon'?<CloudRain size={54}/>:season==='spring'?<CloudSun size={54}/>:<Sun size={54}/>}<div className="live-temperature">{localDigits(weatherNow.temperature)}<span>°C</span></div></div><div className="live-weather-foot">{liveWeather ? weatherDescription(liveWeather.code,isBn) : weatherStatus==='loading' ? (isBn?'লাইভ পূর্বাভাস লোড হচ্ছে':'Loading live forecast') : (isBn?'লাইভ তথ্য নেই; নমুনা মান':'Live data unavailable; sample values')} · {isBn?`অনুভূত ${localDigits(weatherNow.feels)}°`:`Feels like ${weatherNow.feels}°`}</div><div className="live-weather-details"><span><Droplets size={18}/><small>{t.humidity}</small><b>{localDigits(weatherNow.humidity)}%</b></span><span><Wind size={18}/><small>{t.wind}</small><b>{isBn?`${localDigits(weatherNow.wind)} কিমি/ঘণ্টা`:`${weatherNow.wind} km/h`}</b></span><span><CloudRain size={18}/><small>{t.rain}</small><b>{localDigits(weatherNow.rain)}%</b></span></div>
              </button>
              <button className="live-metric-card metric-health" onClick={()=>setActive('cropHealth')}><span className="live-metric-icon"><Leaf size={19}/></span><small>{isBn?'খামারের অবস্থা':'Farm health'}</small><strong>{isBn?'ভালো আছে':'Looking healthy'}</strong><p>{isBn?'এই সপ্তাহে আপনার খামারের অবস্থা ভালো।':'Your farm is doing well this week.'}<ArrowRight size={17}/></p></button>
              <button className="live-metric-card metric-alert" onClick={()=>setActive('alerts')}><span className="live-metric-icon"><TriangleAlert size={19}/></span><small>{isBn?'সক্রিয় সতর্কতা':'Active alerts'}</small><strong>{localDigits(alerts.filter(Boolean).length)}{isBn?'টি':' items'}</strong><p>{isBn?'বিষয়গুলোতে নজর দেওয়া দরকার':'Items need your attention'}<ArrowRight size={17}/></p></button>
              <button className="live-metric-card metric-crops" onClick={()=>setActive('farm')}><span className="live-metric-icon"><Sprout size={19}/></span><small>{isBn?'নিবন্ধিত ফসল':'Registered crops'}</small><strong>{localDigits(new Set(farmPlots.map((plot:any)=>plot.crop).filter(Boolean)).size)} {isBn?'প্রকার':'types'}</strong><p>{isBn?'আপনার জমির সব প্লটে':'Across your farm plots'}<ArrowRight size={17}/></p></button>
              <button className="live-metric-card metric-tasks" onClick={()=>setActive('cropPlanner')}><span className="live-metric-icon"><CheckCircle2 size={19}/></span><small>{isBn?'সম্পন্ন কাজ':'Tasks completed'}</small><strong>{localDigits(`${done.length} / 3`)}</strong><p>{isBn?'এই সপ্তাহের কাজ':'Planned this week'}<ArrowRight size={17}/></p></button>
            </div>
          </section>
          <section className="live-quick-section"><div className="live-section-head"><div><h2>{isBn?'দ্রুত কাজ':'Quick actions'}</h2><p>{isBn?'আপনি কী করতে চান?':'What would you like to do?'}</p></div><button onClick={()=>setActive('cropPlanner')}>{isBn?'সব দেখুন':'View all'} <ArrowRight size={15}/></button></div>
            <div className="live-quick-grid">
              <button className="live-quick-card quick-green" onClick={()=>setActive('cropPlanner')}><span><Sprout size={24}/></span><div><strong>{isBn?'ফসল পরিকল্পনা করুন':'Plan your crops'}</strong><small>{isBn?'এআই পরামর্শের জন্য যান':'Get crop-planning guidance'}</small></div><ArrowRight size={16}/></button>
              <button className="live-quick-card quick-blue" onClick={()=>setActive('weather')}><span><CloudSun size={24}/></span><div><strong>{isBn?'আবহাওয়া দেখুন':'Check weather'}</strong><small>{isBn?'স্থানীয় পরিস্থিতি বুঝুন':'Review local conditions'}</small></div><ArrowRight size={16}/></button>
              <button className="live-quick-card quick-orange" onClick={()=>{setActive('farm');setShowPlotForm(true)}}><span><Plus size={24}/></span><div><strong>{isBn?'খামারের কাজ যোগ করুন':'Add a farm task'}</strong><small>{isBn?'পরিকল্পনা হালনাগাদ রাখুন':'Keep your plan on track'}</small></div><ArrowRight size={16}/></button>
              <button className="live-quick-card quick-purple" onClick={()=>setActive('farm')}><span><Tractor size={24}/></span><div><strong>{isBn?'আমার খামার দেখুন':'View my farm'}</strong><small>{isBn?'জমির সামগ্রিক অবস্থা':'Review your plots'}</small></div><ArrowRight size={16}/></button>
            </div>
          </section>
          <section className="live-dashboard-grid">
            <button className="live-panel land-panel" onClick={()=>setActive('farm')}><div className="live-panel-head"><strong>{isBn?'জমির সারসংক্ষেপ':'Farm overview'}</strong><span>{isBn?'জমি দেখুন':'View farm'} <ArrowRight size={14}/></span></div><div className="live-land-content">{farmPlots.length ? <><img src={seasonThumbnailSrc(season)} alt={isBn?'সবুজ কৃষিজমি':'Farm landscape'}/><div className="live-land-legend">{farmPlots.slice(0,3).map((plot:any,i:number)=><span key={plot.name+i}><i className={['dot-green','dot-orange','dot-purple'][i]}/> {plot.name} <b>{plot.size || '—'}</b></span>)}</div></> : <div className="live-empty-plot"><Tractor size={28}/><strong>{isBn?'এখনও কোনো জমি যোগ করা হয়নি':'No farm plots yet'}</strong><small>{isBn?'আপনার প্রথম জমির তথ্য যোগ করুন':'Add your first plot to personalize this dashboard.'}</small><span>{isBn?'জমি যোগ করুন':'Add a plot'} <ArrowRight size={14}/></span></div>}</div></button>
            <button className="live-panel soil-panel" onClick={()=>setActive('soil')}><div className="live-panel-head"><strong>{isBn?'মাটির তথ্য':'Soil insights'}</strong><span>{isBn?'তথ্য দিন':'Add readings'} <ArrowRight size={14}/></span></div><div className="live-soil-rings"><span className="soil-ring moisture-ring"><small>{isBn?'আর্দ্রতা':'Moisture'}</small><b>{soilSaved && soilData.moisture ? `${soilData.moisture}%` : (isBn?'—':'—')}</b><em>{isBn?'আর্দ্রতা':'Moisture'}</em></span><span className="soil-ring ph-ring"><small>pH</small><b>{soilSaved && soilData.ph ? soilData.ph : '—'}</b><em>{isBn?'পিএইচ স্তর':'pH level'}</em></span><span className="soil-ring nutrient-ring"><small>N</small><b>{soilSaved && soilData.nitrogen ? soilData.nitrogen : (isBn?'তথ্য দিন':'Add data')}</b><em>{isBn?'নাইট্রোজেন':'Nitrogen'}</em></span></div></button>
            <div className="live-panel alerts-panel"><div className="live-panel-head"><strong>{isBn?'সাম্প্রতিক সতর্কতা':'Latest alerts'}</strong><button onClick={()=>setActive('alerts')}>{isBn?'সব দেখুন':'View all'} <ArrowRight size={14}/></button></div><button className="live-alert-row alert-warm" onClick={()=>setActive('diagnosis')}><span><Leaf size={18}/></span><div><strong>{isBn?'ধানের রোগের সম্ভাব্য ঝুঁকি':'Possible rice disease risk'}</strong><small>{isBn?'পাতা পরীক্ষা করুন এবং লক্ষণ নিশ্চিত করুন':'Inspect leaves and verify symptoms'}</small></div><ArrowRight size={14}/></button><button className="live-alert-row alert-rain" onClick={()=>setActive('alerts')}><span><CloudRain size={18}/></span><div><strong>{isBn?'ভারী বৃষ্টির সতর্কতা':'Heavy rainfall watch'}</strong><small>{isBn?'জমির পানি নিষ্কাশন পরীক্ষা করুন':'Check field drainage'}</small></div><ArrowRight size={14}/></button></div>
            <button className="live-panel recommendation-panel" onClick={()=>setActive('diagnosis')}><div className="live-panel-head"><strong>{isBn?'আপনার জন্য পরামর্শ':'Recommendations'}</strong><ArrowRight size={14}/></div><div className="live-rec-content"><img src="/seasons/spring.jpg" alt={isBn?'ফসলের পাতা':'Crop leaves'}/><div><strong>{isBn?'বৃষ্টির পর ধানের পাতা পরীক্ষা করুন':'Check rice leaves after rainfall'}</strong><p>{isBn?'পাতায় দাগ ও হলদে ভাব দেখুন। দ্রুত শনাক্ত করলে রোগ ছড়ানো কমে।':'Look for spots and yellowing. Early detection can help limit spread.'}</p><span>{isBn?'নির্দেশিকা পড়ুন':'Read field guide'} <ArrowRight size={14}/></span></div></div></button>
            <div className="live-panel tasks-panel"><div className="live-panel-head"><strong>{isBn?'কাজের তালিকা':'Task list'}</strong><button onClick={()=>setActive('cropPlanner')}>{isBn?'সব দেখুন':'View all'} <ArrowRight size={14}/></button></div>{['Check your crops','Record soil moisture','Review local weather'].map((task,i)=><label className="live-task-row" key={task}><input type="checkbox" checked={done.includes(i)} onChange={e=>setDone(prev=>e.target.checked?[...prev,i]:prev.filter(n=>n!==i))}/><span>{isBn?(['ফসল পরীক্ষা করুন','মাটির আর্দ্রতা লিখুন','স্থানীয় আবহাওয়া দেখুন'][i]):task}<small>{isBn?['আজ, সকাল ১০:৩০','আজ, সকাল ০৯:১৫','আজ, বিকাল ০৮:০০'][i]:['Today, 10:30 AM','Today, 9:15 AM','Today, 8:00 PM'][i]}</small></span></label>)}</div>
            <div className="live-panel activity-panel-live"><div className="live-panel-head"><strong>{isBn?'সাম্প্রতিক কার্যক্রম':'Recent activity'}</strong><button onClick={()=>setActive('farm')}>{isBn?'সব দেখুন':'View all'} <ArrowRight size={14}/></button></div>{activities.map((item,i)=>{const Icon=item.icon;return <button className="live-activity-row" key={item.titleKey} onClick={()=>setActive(i===0?'cropPlanner':i===1?'soil':'alerts')}><span className={`activity-node ${item.color}`}></span><div><strong>{t[item.titleKey as keyof typeof t]}</strong><small>{i===2?t.yesterday:(isBn?'আজ, সকাল ':'Today, ')+item.time}</small></div></button>})}</div>
          </section>
        </div>
      ) : active === 'weather' ? (
        <div className="live-weather-page">
          <section className="weather-page-hero">
            <div className="weather-page-title"><span className="weather-page-icon"><CloudSun size={26}/></span><div><p className="weather-kicker">{isBn?'স্থানীয় আবহাওয়া · কৃষি পূর্বাভাস':'LOCAL WEATHER · FARM FORECAST'}</p><h1>{isBn?'আপনার এলাকার আবহাওয়া':'Weather at your farm location'}</h1><p>{isBn?'GPS অবস্থান বা নিকটবর্তী এলাকা বেছে বর্তমান আবহাওয়া ও ৫ দিনের পূর্বাভাস দেখুন।':'Use GPS for a precise local forecast, or select the nearest area in Bangladesh.'}</p></div></div>
            <div className="weather-location-controls"><label><MapPin size={17}/><span>{isBn?'আবহাওয়ার এলাকা':'Weather location'}</span><select value={weatherLocation.id} onChange={e=>{const selected=BANGLADESH_LOCATIONS.find(item=>item.id===e.target.value);if(selected)chooseWeatherLocation(selected);}}>{weatherLocation.id==='gps'&&<option value="gps">{weatherLocation.name}</option>}{BANGLADESH_LOCATIONS.map(item=><option value={item.id} key={item.id}>{isBn ? ({dhaka:'ঢাকা',chattogram:'চট্টগ্রাম',sylhet:'সিলেট',rajshahi:'রাজশাহী',khulna:'খুলনা',barishal:'বরিশাল',rangpur:'রংপুর',mymensingh:'ময়মনসিংহ',cumilla:'কুমিল্লা','cox-bazar':'কক্সবাজার',bogura:'বগুড়া',jashore:'যশোর',rangamati:'রাঙামাটি'} as Record<string,string>)[item.id] || item.name : item.name}</option>)}</select></label><button className="primary-button" type="button" disabled={locating} onClick={useCurrentLocation}><MapPin size={16}/>{locating?(isBn?'অবস্থান খোঁজা হচ্ছে…':'Locating…'):(isBn?'আমার GPS ব্যবহার করুন':'Use my location')}</button><button className="secondary-button" type="button" onClick={()=>setWeatherRefreshToken(v=>v+1)} disabled={weatherStatus==='loading'}><Activity size={16}/>{isBn?'হালনাগাদ করুন':'Refresh'}</button></div>
            {weatherError && <p className="weather-inline-error" role="status">{weatherError}</p>}
            {weatherLocation.source==='gps'&&<p className="weather-location-coords">{isBn?'GPS স্থানাঙ্ক':'GPS coordinates'}: {weatherLocation.latitude.toFixed(4)}, {weatherLocation.longitude.toFixed(4)} · {isBn?'অনুমতি দেওয়া অবস্থানের ভিত্তিতে':'based on permission granted by you'}</p>}
          </section>
          <section className="weather-current-grid">
            <article className="weather-current-card"><div className="weather-current-top"><span>{isBn?'এখন':'Current conditions'}</span><span className={weatherStatus==='live'?'weather-live-tag':'weather-sample-tag'}>{weatherStatus==='live'?(isBn?'লাইভ':'LIVE'):(weatherStatus==='loading'?(isBn?'লোড হচ্ছে':'LOADING'):(isBn?'তথ্য নেই':'UNAVAILABLE'))}</span></div><div className="weather-current-main">{liveWeather?<WeatherGlyph code={liveWeather.code} size={58}/>:<CloudSun size={58}/>}<strong>{localDigits(weatherNow.temperature)}°<small>C</small></strong><span>{liveWeather?weatherDescription(liveWeather.code,isBn):(isBn?'নমুনা তথ্য':'Sample data only')}</span></div><div className="weather-current-stats"><span><ThermometerSun size={19}/><small>{isBn?'অনুভূত':'Feels like'}</small><b>{localDigits(weatherNow.feels)}°C</b></span><span><Droplets size={19}/><small>{t.humidity}</small><b>{localDigits(weatherNow.humidity)}%</b></span><span><Wind size={19}/><small>{t.wind}</small><b>{localDigits(weatherNow.wind)} km/h</b></span><span><CloudRain size={19}/><small>{isBn?'সর্বোচ্চ বৃষ্টির সম্ভাবনা':'Max rain chance'}</small><b>{localDigits(weatherNow.rain)}%</b></span></div>{weatherStatus==='error'&&<p className="weather-unavailable-note">{isBn?'সংযোগ করা যায়নি। নিচের মানগুলো নমুনা, লাইভ আবহাওয়া নয়।':'Live weather could not load. The values shown here are sample values, not a live report.'}</p>}{weatherUpdatedAt&&<small className="weather-updated-at">{isBn?'সর্বশেষ হালনাগাদ':'Updated'}: {weatherUpdatedAt.toLocaleTimeString(isBn?'bn-BD':'en-GB',{hour:'2-digit',minute:'2-digit'})}</small>}</article>
            <article className="weather-forecast-card"><div className="weather-forecast-heading"><div><h2>{isBn?'আগামী ৫ দিনের পূর্বাভাস':'5-day forecast'}</h2><p>{isBn?'তাপমাত্রা ও বৃষ্টির সম্ভাবনা':'Daily temperatures and rain chance'}</p></div><CloudSun size={24}/></div>{weatherStatus==='live'&&liveWeather?.daily?.length ? <div className="weather-forecast-list">{liveWeather.daily.map((day,index)=><div className="weather-forecast-row" key={day.date}><span className="weather-forecast-day">{index===0?(isBn?'আজ':'Today'):new Intl.DateTimeFormat(isBn?'bn-BD':'en-GB',{weekday:'short'}).format(new Date(`${day.date}T12:00:00`))}</span><WeatherGlyph code={day.code} size={21}/><span className="weather-forecast-description">{weatherDescription(day.code,isBn)}</span><strong>{localDigits(Math.round(day.high))}° <small>/ {localDigits(Math.round(day.low))}°</small></strong><span className="weather-forecast-rain"><Droplets size={14}/>{localDigits(day.rain)}%</span></div>)}</div>:<div className="weather-forecast-empty"><CloudSun size={25}/><p>{weatherStatus==='loading'?(isBn?'প্রকৃত পূর্বাভাস লোড হচ্ছে…':'Loading forecast from the weather provider…'):(isBn?'পূর্বাভাস পাওয়া যায়নি। সংযোগ যাচাই করে আবার চেষ্টা করুন।':'Forecast unavailable. Check the connection and refresh to try again.')}</p></div>}<p className="weather-attribution">{isBn?'আবহাওয়ার তথ্য: Open-Meteo · মডেলভিত্তিক পূর্বাভাস':'Weather data: Open-Meteo · model-based forecast'} · <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">{isBn?'তথ্যসূত্র':'Source'}</a></p></article>
          </section>
          <p className="weather-agri-note"><ShieldCheck size={17}/>{isBn?'আবহাওয়ার পূর্বাভাস পরিবর্তিত হতে পারে। কীটনাশক স্প্রে, সেচ বা বপনের আগে স্থানীয় পরিস্থিতি ও সরকারি পরামর্শ যাচাই করুন।':'Forecasts can change. Before spraying, irrigating or sowing, confirm field conditions and official local advisories.'}</p>
        </div>
      ) : active === 'alerts' ? (
        <div className="flood-alert-page">
          <section className="flood-hero"><div><span className="flood-kicker"><BellRing size={15}/>{isBn?'ইকোঅ্যালার্ট · আগাম বন্যা সতর্কতা':'ECOALERT · EARLY FLOOD WARNING'}</span><h1>{isBn?'বন্যার ঝুঁকি আগে থেকেই জানুন':'Know your flood risk early'}</h1><p>{isBn?'আপনার এলাকার বৃষ্টি, নদীর পানি বৃদ্ধি এবং জমির বৈশিষ্ট্য মিলিয়ে ঝুঁকির প্রাথমিক ধারণা নিন।':'Estimate local flood risk from rainfall, river rise and your field conditions. Update the inputs as new local observations arrive.'}</p><div className="flood-location"><MapPin size={16}/><span>{profile.upazila ? `${profile.upazila}, ` : ''}{profile.district || 'Bangladesh'}</span><button onClick={()=>setActive('profile')}>{isBn?'এলাকা সম্পাদনা':'Edit area'}</button></div></div><div className={'flood-risk-gauge risk-'+floodLevel}><small>{isBn?'বর্তমান আনুমানিক ঝুঁকি':'CURRENT ESTIMATED RISK'}</small><strong>{localDigits(floodScore)}<span>/100</span></strong><b>{floodLevel==='high'?(isBn?'উচ্চ ঝুঁকি':'High risk'):floodLevel==='moderate'?(isBn?'মাঝারি ঝুঁকি':'Moderate risk'):(isBn?'কম ঝুঁকি':'Low risk')}</b><small>{isBn?'ইনপুটভিত্তিক ডেমো অনুমান · সরকারি সতর্কতা নয়':'Input-based demo estimate · not an official warning'}</small></div></section>
          <div className="flood-notice-banner"><AlertTriangle size={22}/><div><strong>{floodLevel==='high'?(isBn?'সতর্ক থাকুন — আগাম প্রস্তুতি নিন':'Precaution advised — prepare now'):floodLevel==='moderate'?(isBn?'সতর্ক নজরদারি চালিয়ে যান':'Keep monitoring local conditions'):(isBn?'নিয়মিত পর্যবেক্ষণ চালিয়ে যান':'Continue routine monitoring')}</strong><p>{floodLevel==='high'?(isBn?'নিচু জমি থেকে যন্ত্রপাতি ও বীজ সরান, নালা পরিষ্কার রাখুন এবং সরকারি বার্তা অনুসরণ করুন।':'Move seed, fertilizer and equipment away from low fields, clear drainage channels, and follow official local advisories.'):floodLevel==='moderate'?(isBn?'নদীর পানি ও বৃষ্টির পরিবর্তন পর্যবেক্ষণ করুন; জরুরি জিনিস উঁচু স্থানে রাখুন।':'Watch river levels and rainfall; keep essential supplies in a raised, accessible place.'):(isBn?'স্থানীয় আবহাওয়া ও নদীর তথ্য নিয়মিত দেখুন।':'Check local weather and river information regularly.')}</p></div></div>
          <div className="flood-content-grid"><section className="flood-panel"><div className="flood-panel-heading"><div><h2>{isBn?'এলাকার অবস্থা হালনাগাদ করুন':'Update local conditions'}</h2><p>{isBn?'স্থানীয় পর্যবেক্ষণ অনুযায়ী মান পরিবর্তন করুন।':'Adjust these values using local observations.'}</p></div><Activity size={21}/></div>
            <label className="flood-range-label"><span>{isBn?'আগামী ২৪ ঘণ্টার বৃষ্টির পূর্বাভাস':'Expected rainfall in next 24 hours'}</span><strong>{localDigits(floodInputs.rainfall)} mm</strong></label><input className="flood-range" type="range" min="0" max="200" step="5" value={floodInputs.rainfall} onChange={e=>setFloodInputs(v=>({...v,rainfall:Number(e.target.value)}))}/><div className="flood-range-ends"><span>0 mm</span><span>200 mm</span></div>
            <label className="flood-range-label"><span>{isBn?'নদীর পানি বৃদ্ধির হার (গত ২৪ ঘণ্টা)':'River level rise (last 24 hours)'}</span><strong>{localDigits(floodInputs.riverRise)} cm</strong></label><input className="flood-range" type="range" min="0" max="60" step="2" value={floodInputs.riverRise} onChange={e=>setFloodInputs(v=>({...v,riverRise:Number(e.target.value)}))}/><div className="flood-range-ends"><span>0 cm</span><span>60 cm</span></div>
            <div className="flood-select-grid"><label>{isBn?'পানি নিষ্কাশন':'Field drainage'}<select value={floodInputs.drainage} onChange={e=>setFloodInputs(v=>({...v,drainage:e.target.value}))}><option value="good">{isBn?'ভালো':'Good'}</option><option value="average">{isBn?'মাঝারি':'Average'}</option><option value="poor">{isBn?'দুর্বল / পানি জমে':'Poor / waterlogged'}</option></select></label><label>{isBn?'জমির উচ্চতা':'Field elevation'}<select value={floodInputs.elevation} onChange={e=>setFloodInputs(v=>({...v,elevation:e.target.value}))}><option value="high">{isBn?'উঁচু':'High'}</option><option value="medium">{isBn?'মাঝারি':'Medium'}</option><option value="low">{isBn?'নিচু':'Low'}</option></select></label><label>{isBn?'নদী থেকে দূরত্ব':'Distance from river'}<select value={floodInputs.riverDistance} onChange={e=>setFloodInputs(v=>({...v,riverDistance:e.target.value}))}><option value="near">{isBn?'কাছাকাছি (৩ কিমির মধ্যে)':'Near (within 3 km)'}</option><option value="medium">{isBn?'মাঝারি (৩–১০ কিমি)':'Medium (3–10 km)'}</option><option value="far">{isBn?'দূরে (১০ কিমির বেশি)':'Far (over 10 km)'}</option></select></label></div><button className="primary-button" onClick={()=>notify(isBn?'ঝুঁকি নতুন ইনপুট অনুযায়ী হিসাব করা হয়েছে':'Risk recalculated from your updated inputs')}><Activity size={17}/>{isBn?'ঝুঁকি হিসাব করুন':'Recalculate risk'}</button>
          </section><section className="flood-panel"><div className="flood-panel-heading"><div><h2>{isBn?'করণীয় প্রস্তুতি তালিকা':'Preparedness checklist'}</h2><p>{isBn?'বন্যার আগে ফসল ও সম্পদ রক্ষা করুন।':'Protect crops and assets before flooding.'}</p></div><ShieldCheck size={21}/></div><div className="flood-checklist">{(isBn?['জমির পানি নিষ্কাশনের নালা পরিষ্কার করুন','বীজ, সার ও কৃষি যন্ত্রপাতি উঁচু স্থানে রাখুন','গবাদিপশুর নিরাপদ আশ্রয় ও শুকনো খাবার প্রস্তুত রাখুন','স্থানীয় দুর্যোগ ব্যবস্থাপনা ও সরকারি সতর্কতা অনুসরণ করুন']:['Clear field drainage channels and culverts','Move seeds, fertilizer and machinery to higher ground','Prepare safe shelter and dry feed for livestock','Follow local disaster-management and official warnings']).map((item,i)=><label key={item}><input type="checkbox"/><span>{item}</span></label>)}</div><button className="secondary-button flood-report-button" onClick={()=>{const msg=`${new Date().toLocaleString()} — ${profile.upazila?profile.upazila+', ':''}${profile.district}: ${floodLevel.toUpperCase()} estimated flood risk (${floodScore}/100)`;setFloodNotices(v=>{const next=[msg,...v].slice(0,50);localStorage.setItem('ecoalert-flood-log',JSON.stringify(next));return next});notify(isBn?'সতর্কতা লগে যোগ হয়েছে':'Risk snapshot added to your local alert log')}}><Plus size={16}/>{isBn?'এই ঝুঁকির রিপোর্ট সংরক্ষণ':'Save risk snapshot'}</button>{floodNotices.length>0&&<div className="flood-log"><h3>{isBn?'সংরক্ষিত ঝুঁকি লগ':'Saved risk log'}</h3>{floodNotices.map((n,i)=><p key={i}><Clock3 size={14}/>{n}</p>)}</div>}</section></div><p className="flood-disclaimer"><ShieldCheck size={15}/>{isBn?'গুরুত্বপূর্ণ: এটি ব্যবহারকারীর দেওয়া মানের ওপর ভিত্তি করা প্রাথমিক ডেমো হিসাব। বাস্তব সতর্কতার জন্য FFWC/BWDB-এর যাচাইকৃত নদীর পানি, BMD বৃষ্টির পূর্বাভাস, অবস্থানভিত্তিক ব্যাকএন্ড এবং SMS/push notification সংযোগ করতে হবে।':'Important: this is a preliminary demo estimate based on user-entered values. Real alerts require verified FFWC/BWDB river data, BMD rainfall forecasts, a location-aware backend and SMS/push notification integration.'}</p>
        </div>
      ) : active === 'cropPlanner' ? (
          <div className="planner-page">
            <section className="planner-hero"><div className="planner-hero-art"><div className="planner-sun"/><div className="planner-hill planner-hill-back"/><div className="planner-hill planner-hill-front"/><div className="planner-crop-stalk"><Wheat size={76}/></div></div><div className="planner-hero-copy"><span className="planner-kicker"><CalendarCheck size={16}/>{isBn?'মৌসুমভিত্তিক পরিকল্পনা':'SEASON-AWARE FARM PLANNING'}</span><h2>{isBn?'পরের মৌসুমে কোন বীজ বুনবেন?':'Choose the right seed for your land'}</h2><p>{isBn?'মাটির ধরন, জমিতে পানি জমার অবস্থা এবং সম্ভাব্য আবহাওয়া মিলিয়ে ফসল বাছাই করুন।':'Match crop choices to your soil, drainage and expected rainfall—then review practical precautions before sowing.'}</p><div className="planner-hero-pills"><span><Sprout size={15}/>{isBn?'বীজ নির্বাচন':'Seed selection'}</span><span><CloudSun size={15}/>{isBn?'আবহাওয়া':'Weather outlook'}</span><span><Layers size={15}/>{isBn?'জমির উপযোগিতা':'Land suitability'}</span></div></div></section>
            <div className="planner-columns"><section className="planner-form-card"><div className="planner-section-title"><span className="planner-section-icon"><ClipboardCheck size={22}/></span><div><h3>{isBn?'আপনার জমির তথ্য দিন':'Tell us about your field'}</h3><p>{isBn?'কয়েকটি তথ্য দিলে প্রাথমিক পরামর্শ তৈরি হবে।':'A few details create a practical first-pass recommendation.'}</p></div></div>
              <div className="planner-form-grid">
                <label>{isBn?'আপনার জেলা':'District'}<div className="planner-input-with-icon"><MapPin size={17}/><input value={profile.district} onChange={e=>setProfile(v=>({...v,district:e.target.value}))} placeholder={isBn?'জেলার নাম':'e.g. Chattogram'}/></div></label>
                <label>{isBn?'কোন ফসল লাগাতে চান?':'Crop you want to plant'}<select value={plannerCrop} onChange={e=>{setPlannerCrop(e.target.value);setPlannerResult(false)}}><option value="Rice (Boro)">{cropName('Rice (Boro)')}</option><option value="Mustard">{cropName('Mustard')}</option><option value="Potato">{cropName('Potato')}</option><option value="Lentil">{cropName('Lentil')}</option><option value="Maize">{cropName('Maize')}</option><option value="Winter vegetables">{cropName('Winter vegetables')}</option></select></label>
                <label>{isBn?'মাটির ধরন':'Soil texture'}<select value={plannerSoil} onChange={e=>{setPlannerSoil(e.target.value);setPlannerResult(false)}}><option value="Loamy">{soilName('Loamy')}</option><option value="Clay">{soilName('Clay')}</option><option value="Sandy">{soilName('Sandy')}</option><option value="Silty / alluvial">{soilName('Silty / alluvial')}</option><option value="Unknown">{soilName('Unknown')}</option></select></label>
                <label>{isBn?'মাটির বর্তমান গুণমান':'Soil quality / fertility'}<select value={plannerQuality} onChange={e=>{setPlannerQuality(e.target.value);setPlannerResult(false)}}><option value="Good">{soilName('Good')}</option><option value="Moderate">{soilName('Moderate')}</option><option value="Poor">{soilName('Poor')}</option><option value="Unknown">{soilName('Unknown')}</option></select></label>
                <label>{isBn?'জমিতে পানি নিষ্কাশন':'Field drainage'}<select value={plannerDrainage} onChange={e=>{setPlannerDrainage(e.target.value);setPlannerResult(false)}}><option value="Good">{soilName('Good')}</option><option value="Moderate">{soilName('Moderate')}</option><option value="Poor / waterlogged">{soilName('Poor / waterlogged')}</option></select></label>
                <label>{isBn?'আগামী দিনের বৃষ্টির ধারণা':'Expected rainfall (your estimate)'}<select value={plannerRain} onChange={e=>{setPlannerRain(e.target.value);setPlannerResult(false)}}><option value="Normal">{soilName('Normal')}</option><option value="Low / dry">{soilName('Low / dry')}</option><option value="Heavy / wet">{soilName('Heavy / wet')}</option></select></label>
                <label>{isBn?'জমির বর্তমান অবস্থা':'Field elevation / flood exposure'}<select value={plannerLand} onChange={e=>{setPlannerLand(e.target.value);setPlannerResult(false)}}><option value="High">{soilName('High')}</option><option value="Medium">{soilName('Medium')}</option><option value="Low / flood-prone">{soilName('Low / flood-prone')}</option></select></label>
              </div>
              <div className="planner-form-note"><ShieldCheck size={18}/><span>{isBn?'এই ফলাফল প্রাথমিক নির্দেশনা। বপনের আগে স্থানীয় কৃষি অফিসের পরামর্শ ও প্রকৃত আবহাওয়ার পূর্বাভাস যাচাই করুন।':'This is an indicative guide, not a live forecast or soil test. Confirm with your local DAE agriculture officer and current weather before sowing.'}</span></div>
              <button className="primary-button planner-submit" onClick={()=>setPlannerResult(true)}><Sprout size={18}/>{isBn?'জমির উপযোগিতা দেখুন':'Check my land & seed suitability'}<ArrowRight size={17}/></button>
            </section>
            <aside className="planner-side"><section className="planner-weather-card"><div className="planner-weather-top"><span className="planner-weather-icon"><CloudSun size={23}/></span><span className="planner-demo-tag">{isBn?'ডেমো':'DEMO'}</span></div><h3>{isBn?'আগাম আবহাওয়ার প্রস্তুতি':'Early weather outlook'}</h3><p>{isBn?'আপনার নির্বাচিত বৃষ্টির অবস্থার ভিত্তিতে প্রস্তুতি নিন।':'Planning outlook based on the rainfall option you selected.'}</p><div className="planner-weather-line"><span><CloudRain size={17}/>{isBn?'বৃষ্টির অবস্থা':'Rain scenario'}</span><strong>{soilName(plannerRain)}</strong></div><div className="planner-weather-line"><span><Droplets size={17}/>{isBn?'জমির পানি':'Water risk'}</span><strong>{plannerRain==='Heavy / wet'||plannerLand==='Low / flood-prone'?(isBn?'বেশি':'Elevated'):plannerRain==='Low / dry'?(isBn?'কম':'Low'):(isBn?'মাঝারি':'Moderate')}</strong></div><div className="planner-weather-disclaimer"><TriangleAlert size={16}/>{isBn?'লাইভ পূর্বাভাস সংযুক্ত নয়':'Live weather is not connected yet'}</div></section><section className="planner-tip-card"><div className="planner-tip-icon"><SunMedium size={22}/></div><h3>{isBn?'বপনের আগে ৩টি কাজ':'Before you sow'}</h3><ul><li>{isBn?'বীজের মান ও মেয়াদ যাচাই করুন':'Check seed quality and expiry'}</li><li>{isBn?'জমিতে পানি বের হওয়ার পথ রাখুন':'Keep drainage channels clear'}</li><li>{isBn?'বপনের আগে স্থানীয় পূর্বাভাস দেখুন':'Check local forecast before sowing'}</li></ul></section></aside></div>
            <section className="planner-suggestions"><div className="planner-suggestions-heading"><span className="planner-section-icon"><Seedling size={22}/></span><div><h3>{isBn?'আপনার জমির জন্য সম্ভাব্য বীজ':'Seed options to consider next'}</h3><p>{isBn?'নির্বাচিত মাটি ও পানি পরিস্থিতির ভিত্তিতে প্রাথমিক বাছাই।':'A first-pass shortlist based on your selected soil and water conditions.'}</p></div></div><div className="planner-suggestion-grid">{(plannerDrainage==='Poor / waterlogged'||plannerRain==='Heavy / wet'||plannerLand==='Low / flood-prone' ? [{name:'Rice (season & variety dependent)',bn:'ধান (মৌসুম ও জাত যাচাই করুন)',desc:'Water-tolerant options may fit some lowland fields; confirm variety and local planting window.',icon:Wheat},{name:'Raised-bed vegetables (if drainage can be improved)',bn:'উঁচু বেডে সবজি (নিষ্কাশন উন্নত হলে)',desc:'Only consider after improving drainage and checking local recommendations.',icon:Sprout}] : plannerSoil==='Loamy'&&plannerDrainage==='Good'&&plannerQuality!=='Poor' ? [{name:'Mustard',bn:'সরিষা',desc:'Can suit well-drained loamy land in the appropriate Rabi window.',icon:Sprout},{name:'Potato',bn:'আলু',desc:'Consider where soil, seed availability and irrigation fit local guidance.',icon:Wheat},{name:'Winter vegetables',bn:'শীতকালীন সবজি',desc:'Choose varieties suited to your district and market.',icon:Leaf}] : [{name:'Rice (locally recommended variety)',bn:'স্থানীয়ভাবে সুপারিশকৃত ধানের জাত',desc:'Check field water regime and the correct seasonal variety before selecting seed.',icon:Wheat},{name:'Pulse crops (e.g. lentil)',bn:'ডালজাতীয় ফসল (যেমন মসুর)',desc:'Potential option for suitable, well-drained land during the recommended window.',icon:Sprout}]).map((option,i)=>{const OptionIcon=option.icon;return <article className="planner-suggestion-card" key={option.name}><span className="suggestion-icon"><OptionIcon size={21}/></span><div><strong>{isBn?option.bn:option.name}</strong><p>{isBn?(i===0?'জমির পানি, মাটির অবস্থা ও মৌসুম মিলিয়ে যাচাই করুন':'স্থানীয় কৃষি পরামর্শ ও বীজের জাত যাচাই করুন'):option.desc}</p></div><span className="suggestion-number">0{i+1}</span></article>})}</div><p className="planner-suggestion-disclaimer"><ShieldCheck size={15}/>{isBn?'এটি স্বয়ংক্রিয় প্রাথমিক বাছাই, নিশ্চিত কৃষি সুপারিশ নয়। স্থানীয় কৃষি অফিস ও বাস্তব আবহাওয়া দিয়ে যাচাই করুন।':'These are preliminary suggestions, not guaranteed agronomic advice. Verify with local agricultural extension and a current forecast.'}</p></section>
            {plannerResult && (()=>{const wet=plannerRain==='Heavy / wet'||plannerLand==='Low / flood-prone';const dry=plannerRain==='Low / dry';const waterSensitive=['Mustard','Potato','Lentil','Maize','Winter vegetables'].includes(plannerCrop);const poor=plannerDrainage==='Poor / waterlogged';const soilGood=plannerQuality!=='Poor'&&plannerQuality!=='Unknown'&&(plannerCrop==='Rice (Boro)'?['Clay','Loamy','Silty / alluvial'].includes(plannerSoil):plannerCrop==='Mustard'||plannerCrop==='Lentil'?['Loamy','Sandy','Silty / alluvial'].includes(plannerSoil):plannerCrop==='Potato'||plannerCrop==='Maize'||plannerCrop==='Winter vegetables'?['Loamy','Sandy'].includes(plannerSoil):['Loamy','Clay','Silty / alluvial'].includes(plannerSoil));const caution=plannerQuality==='Moderate'||plannerQuality==='Unknown'||(waterSensitive&&(wet||poor))||(plannerCrop==='Rice (Boro)'&&dry)||!soilGood;const suitability=!soilGood?(isBn?'মাটির ধরন যাচাই দরকার':'Check soil suitability'):caution?(isBn?'সতর্কতার সঙ্গে উপযোগী':'Suitable with precautions'):(isBn?'প্রাথমিকভাবে উপযোগী':'Promising first-pass match');const precautions=wet||poor?(isBn?'বীজ বোনার আগে নালা পরিষ্কার করুন, পানি জমে থাকলে অপেক্ষা করুন এবং উঁচু বেড বিবেচনা করুন।':'Clear drainage channels; do not sow into waterlogged soil. Consider raised beds where suitable.'):dry?(isBn?'মাটির আর্দ্রতা ধরে রাখুন, সেচের ব্যবস্থা নিশ্চিত করুন এবং বপনের আগে বৃষ্টির আপডেট দেখুন।':'Conserve soil moisture, confirm irrigation access and recheck the forecast before sowing.'): (isBn?'বীজ শোধন, সঠিক দূরত্ব ও সময়মতো সেচ নিশ্চিত করুন।':'Use quality seed, follow recommended spacing and plan irrigation.');return <section className="planner-result"><div className="planner-result-head"><span className="planner-result-icon"><CheckCircle2 size={24}/></span><div><span className="planner-kicker">{isBn?'আপনার প্রাথমিক পরিকল্পনা':'YOUR FIRST-PASS PLAN'}</span><h3>{isBn?`${cropName(plannerCrop)} ফসলের পরামর্শ`:`${plannerCrop} planting guidance`}</h3></div><span className={`suitability-pill ${caution?'caution':''}`}>{suitability}</span></div><div className="planner-result-grid"><div><span className="result-label">{isBn?'জমির মিল':'Soil match'}</span><strong>{soilGood?(isBn?'মোটামুটি ভালো':'Reasonable match'):(isBn?'আরও যাচাই করুন':'Needs verification')}</strong><p>{isBn?`মাটির ধরন: ${soilName(plannerSoil)}`:`Selected soil: ${plannerSoil}`}</p></div><div><span className="result-label">{isBn?'বপনের সময়':'Timing note'}</span><strong>{plannerCrop==='Rice (Boro)'?(isBn?'শীতকালীন বোরো মৌসুম':'Boro season window'):['Mustard','Potato','Lentil','Winter vegetables'].includes(plannerCrop)?(isBn?'রবি মৌসুমের সময় যাচাই করুন':'Check local Rabi sowing window'):(isBn?'স্থানীয় মৌসুম যাচাই করুন':'Confirm local sowing window')}</strong><p>{isBn?'এলাকা ও জাতভেদে সময় বদলায়।':'Timing varies by district and variety.'}</p></div><div><span className="result-label">{isBn?'আবহাওয়ার সতর্কতা':'Weather precaution'}</span><strong>{wet?(isBn?'অতিরিক্ত পানির ঝুঁকি':'Watch for excess water'):dry?(isBn?'শুষ্কতার ঝুঁকি':'Watch for dry soil'):(isBn?'নিয়মিত নজর রাখুন':'Monitor regularly')}</strong><p>{precautions}</p></div></div><div className="planner-result-foot"><AlertTriangle size={17}/><span>{isBn?'চূড়ান্ত সিদ্ধান্তের আগে কৃষি কর্মকর্তার পরামর্শ, বীজের জাত এবং বাস্তব আবহাওয়া মিলিয়ে নিন।':'Before deciding, verify variety suitability, actual forecast and local agricultural extension advice.'}</span></div></section>})()}
          </div>
        ) : active === 'cropHealth' ? (
          <div className="tool-detail-grid"><div className="feature-card"><div className="feature-icon health-feature"><HeartPulse size={27}/></div><h2>{t.cropHealth}</h2><p>{t.cropHealthDesc}</p><div className="health-summary"><span className="health-summary-icon"><Leaf size={22}/></span><div><strong>{isBn ? 'ফসল পর্যবেক্ষণ' : 'Crop monitoring'}</strong><small>{isBn ? 'পাতার রং, দাগ ও বৃদ্ধির পরিবর্তন দেখুন' : 'Watch for leaf colour, spots and growth changes'}</small></div><span className="status-pill"><span/>{t.healthy}</span></div><button className="primary-button" onClick={()=>setActive('diagnosis')}><ScanSearch size={16}/>{isBn ? 'ফসল পরীক্ষা করুন' : 'Check a crop'}</button></div></div>
        ) : active === 'soil' ? (
          <div className="soil-page-grid"><div className="feature-card soil-entry-card"><div className="feature-icon soil-feature"><Layers size={27}/></div><h2>{t.soil}</h2><p>{isBn ? 'আপনার জমির মাটির পরীক্ষার ফল লিখুন। এই তথ্য সংরক্ষণ করে মাটির অবস্থা বুঝতে ও ফসল পরিকল্পনায় ব্যবহার করতে পারবেন।' : 'Enter your field soil-test readings to keep a record and use them when planning suitable crops.'}</p><div className="soil-metrics"><div><Droplets size={19}/><small>{isBn ? 'মাটির আর্দ্রতা' : 'Soil moisture'}</small><strong>{soilSaved && soilData.moisture ? soilData.moisture+(isBn?'%':'%') : (isBn?'তথ্য দিন':'Add reading')}</strong></div><div><Activity size={19}/><small>pH</small><strong>{soilSaved && soilData.ph ? soilData.ph : (isBn?'তথ্য দিন':'Add reading')}</strong></div><div><Sprout size={19}/><small>{isBn ? 'পুষ্টি' : 'Nutrients'}</small><strong>{soilSaved && (soilData.nitrogen||soilData.phosphorus||soilData.potassium) ? (isBn?'সংরক্ষিত':'Recorded') : (isBn?'তথ্য দিন':'Add reading')}</strong></div></div><form className="soil-entry-form" onSubmit={e=>{e.preventDefault();setSoilSaved(true);localStorage.setItem('ecoalert-soil-data',JSON.stringify(soilData));localStorage.setItem('ecoalert-soil-saved','true');notify(isBn?'মাটির তথ্য সংরক্ষণ করা হয়েছে':'Soil readings saved on this device')}}><h3>{isBn?'মাটির পরীক্ষার তথ্য':'Soil test data entry'}</h3><div className="soil-form-grid"><label>{isBn?'মাটির আর্দ্রতা (%)':'Soil moisture (%)'}<input type="number" min="0" max="100" step="0.1" value={soilData.moisture} onChange={e=>setSoilData(v=>({...v,moisture:e.target.value}))} placeholder={isBn?'যেমন ৩৫':'e.g. 35'}/></label><label>{isBn?'মাটির pH':'Soil pH'}<input type="number" min="0" max="14" step="0.1" value={soilData.ph} onChange={e=>setSoilData(v=>({...v,ph:e.target.value}))} placeholder="e.g. 6.5"/></label><label>{isBn?'নাইট্রোজেন (N)':'Nitrogen (N)'}<input value={soilData.nitrogen} onChange={e=>setSoilData(v=>({...v,nitrogen:e.target.value}))} placeholder={isBn?'পরীক্ষার মান':'Test result'}/></label><label>{isBn?'ফসফরাস (P)':'Phosphorus (P)'}<input value={soilData.phosphorus} onChange={e=>setSoilData(v=>({...v,phosphorus:e.target.value}))} placeholder={isBn?'পরীক্ষার মান':'Test result'}/></label><label>{isBn?'পটাশিয়াম (K)':'Potassium (K)'}<input value={soilData.potassium} onChange={e=>setSoilData(v=>({...v,potassium:e.target.value}))} placeholder={isBn?'পরীক্ষার মান':'Test result'}/></label><label>{isBn?'জমি / নমুনার নোট':'Field / sample notes'}<input value={soilData.notes} onChange={e=>setSoilData(v=>({...v,notes:e.target.value}))} placeholder={isBn?'জমির নাম বা পরীক্ষার তারিখ':'Plot name or test date'}/></label></div><div className="soil-form-note"><ShieldCheck size={17}/><span>{isBn?'এককসহ ল্যাবের ফল লিখুন। পুষ্টির মানের একক পরীক্ষাগার অনুযায়ী ভিন্ন হতে পারে।':'Enter lab results with their units. Nutrient units can vary by soil-testing laboratory.'}</span></div><button className="primary-button" type="submit"><Save size={16}/>{isBn?'মাটির তথ্য সংরক্ষণ করুন':'Save soil readings'}</button>{soilSaved && <span className="soil-saved-note"><CheckCircle2 size={15}/>{isBn?'তথ্য এই ডেমো সেশনে সংরক্ষিত':'Readings saved for this demo session'}</span>}</form></div></div>
        ) : active === 'diagnosis' ? (
          <div className="feature-card"><div className="feature-icon"><ScanSearch size={27}/></div><h2>{isBn ? 'ফসলের ছবি দিয়ে পরীক্ষা শুরু করুন' : 'Start with a crop photo'}</h2><p>{isBn ? 'ফসল ও একাধিক লক্ষণ নির্বাচন করুন, তারপর ছবি তুলুন বা আপলোড করে বিশ্লেষণ করুন। সমর্থিত ফসলের ছবি বিনামূল্যের মডেল দিয়ে এই ব্রাউজারেই বিশ্লেষণ হয়; এটি নিশ্চিত রোগ নির্ণয় নয়।' : 'Select a crop and all symptoms you see, then take or upload a photo and analyze it. For supported crops, a free model analyzes the image in this browser. Results are preliminary, not a confirmed diagnosis.'}</p>
            <label>{isBn?'ফসল নির্বাচন':'Crop'}<select value={diagnosisCrop} onChange={e=>setDiagnosisCrop(e.target.value)}><option>Rice</option><option>Tomato</option><option>Potato</option><option>Wheat</option><option>Vegetables</option></select></label>
            <label>{isBn?'যে লক্ষণগুলো দেখছেন':'Symptoms'}</label>
            <div className="diagnosis-symptoms" role="group" aria-label={isBn?'ফসলের লক্ষণ নির্বাচন':'Select crop symptoms'}>
              {DIAGNOSIS_SYMPTOMS.map(item=><label className="diagnosis-symptom-option" key={item.id}><input type="checkbox" checked={diagnosisSymptoms.includes(item.id)} onChange={e=>{setDiagnosisSymptoms(current=>e.target.checked?[...current,item.id]:current.filter(id=>id!==item.id));setDiagnosisResult('')}}/><span>{isBn?item.bn:item.en}</span></label>)}
            </div>
            <input ref={cameraInputRef} className="visually-hidden-file" type="file" accept="image/*" capture="environment" onChange={e=>{handleDiagnosisFile(e.target.files?.[0]);e.target.value=''}}/>
            <input ref={uploadInputRef} className="visually-hidden-file" type="file" accept="image/*" onChange={e=>{handleDiagnosisFile(e.target.files?.[0]);e.target.value=''}}/>
            <div className="diagnosis-photo-actions"><button type="button" className="primary-button" onClick={()=>cameraInputRef.current?.click()}><Camera size={17}/>{isBn?'ক্যামেরা দিয়ে ছবি তুলুন':'Take a photo'}</button><button type="button" className="secondary-button" onClick={()=>uploadInputRef.current?.click()}><Upload size={17}/>{isBn?'ছবি আপলোড করুন':'Upload a photo'}</button></div>
            {diagnosisImage && <div className="diagnosis-image-preview"><img src={diagnosisImage} alt={isBn?'নির্বাচিত ফসলের ছবি':'Selected crop'}/><div><strong>{diagnosisName}</strong><button type="button" className="secondary-button" onClick={()=>{if(diagnosisImage)URL.revokeObjectURL(diagnosisImage);setDiagnosisImage('');setDiagnosisName('');setDiagnosisFile(null);setDiagnosisReport(null);setDiagnosisResult('');if(cameraInputRef.current)cameraInputRef.current.value='';if(uploadInputRef.current)uploadInputRef.current.value=''}}>{isBn?'ছবি সরান':'Remove photo'}</button></div></div>}
            <button className="primary-button" type="button" onClick={runDiagnosis} disabled={diagnosisBusy}>{diagnosisBusy ? <Activity size={16} className="spin"/> : <ScanSearch size={16}/>}{diagnosisBusy ? (isBn?'ছবি বিশ্লেষণ হচ্ছে…':'Analyzing photo…') : diagnosisFile ? (isBn?'ছবি বিশ্লেষণ করুন (বিনামূল্যে)':'Analyze photo (free on this device)') : (isBn?'লক্ষণভিত্তিক নির্দেশনা দেখুন':'Get symptom guidance')}</button>
            {diagnosisResult && <div className="soil-form-note diagnosis-result-note" role="status"><AlertTriangle size={17}/><span>{diagnosisResult}</span></div>}</div>
        ) : active === 'assistant' ? (
          <div className="feature-card"><div className="feature-icon"><Bot size={27}/></div><h2>{isBn ? 'আপনার কৃষি সহকারী' : 'Your farming assistant'}</h2><p>{isBn ? 'ধান, সবজি, মাটি, সার ও আবহাওয়া নিয়ে প্রশ্ন করুন।' : 'Ask questions about rice, vegetables, soil, fertilizer and weather.'}</p><div className="assistant-input"><input value={assistantQuestion} placeholder={isBn ? 'আপনার প্রশ্ন লিখুন...' : 'Ask a farming question...'} onChange={e=>setAssistantQuestion(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') setAssistantAnswer(getAssistantAnswer(assistantQuestion, isBn)); }}/><button onClick={()=>setAssistantAnswer(getAssistantAnswer(assistantQuestion, isBn))}><ArrowRight size={18}/></button></div>{assistantAnswer&&<div className="soil-form-note"><Bot size={17}/><span>{assistantAnswer}</span></div>}</div>
        ) : active === 'profile' ? (
          <div className="profile-page"><div className="profile-page-heading"><span className="profile-large-icon"><UserRound size={27}/></span><div><h2>{isBn?'আপনার কৃষক প্রোফাইল':'Your farmer profile'}</h2><p>{isBn?'আপনার এলাকার উপযোগী বন্যা সতর্কতা, মাটি ও ফসলের পরামর্শ পেতে তথ্য পূরণ করুন।':'Add your farm details to receive more relevant local flood alerts, soil guidance and crop recommendations.'}</p></div></div><form className="profile-form" onSubmit={e=>{e.preventDefault();setProfileSaved(true);localStorage.setItem('ecoalert-profile',JSON.stringify(profile));localStorage.setItem('ecoalert-profile-saved','true');notify(isBn?'প্রোফাইল সংরক্ষণ হয়েছে':'Profile saved on this device')}}><label>{isBn?'আপনার নাম':'Full name'}<input required value={profile.name} onChange={e=>setProfile(v=>({...v,name:e.target.value}))} placeholder={isBn?'নাম লিখুন':'Enter your name'}/></label><label>{isBn?'মোবাইল নম্বর':'Mobile number'}<input value={profile.phone} onChange={e=>setProfile(v=>({...v,phone:e.target.value}))} placeholder="01XXXXXXXXX" inputMode="tel"/></label><label>{isBn?'জেলা':'District'}<input required value={profile.district} onChange={e=>setProfile(v=>({...v,district:e.target.value}))} placeholder={isBn?'জেলার নাম':'Your district'}/></label><label>{isBn?'উপজেলা / এলাকা':'Upazila / area'}<input value={profile.upazila} onChange={e=>setProfile(v=>({...v,upazila:e.target.value}))} placeholder={isBn?'উপজেলা লিখুন':'Your upazila'}/></label><label>{isBn?'জমির পরিমাণ':'Farm size'}<input value={profile.farmSize} onChange={e=>setProfile(v=>({...v,farmSize:e.target.value}))} placeholder={isBn?'যেমন: ২ একর':'e.g. 2 acres'}/></label><label>{isBn?'যে ফসল চাষ করেন':'Main crops'}<input value={profile.crops} onChange={e=>setProfile(v=>({...v,crops:e.target.value}))} placeholder={isBn?'ধান, সবজি...':'Rice, vegetables...'}/></label><label>{isBn?'মাটির ধরন (যদি জানা থাকে)':'Soil type (if known)'}<select value={profile.soilType} onChange={e=>setProfile(v=>({...v,soilType:e.target.value}))}><option value="">{isBn?'মাটির ধরন নির্বাচন করুন':'Select soil type'}</option><option>Clay / এঁটেল</option><option>Loamy / দোআঁশ</option><option>Sandy / বেলে</option><option>Silty / পলি</option><option>Not sure / জানা নেই</option></select></label><label>{isBn?'সেচের ধরন':'Irrigation type'}<select value={profile.irrigation} onChange={e=>setProfile(v=>({...v,irrigation:e.target.value}))}><option>Rain-fed / mixed</option><option>Canal / খাল</option><option>Groundwater / ভূগর্ভস্থ পানি</option><option>River / নদী</option><option>Other / অন্যান্য</option></select></label><div className="profile-form-note"><ShieldCheck size={18}/><span>{isBn?'আপনার তথ্য এই ডেমোতে শুধু এই সেশনের জন্য রাখা হয়। লাইভ সেবার জন্য নিরাপদ ব্যাকএন্ড সংযোগ প্রয়োজন।':'These details personalize this demo session. A secure backend is required to save your profile permanently and power live services.'}</span></div><button className="primary-button" type="submit"><Save size={17}/>{isBn?'প্রোফাইল সংরক্ষণ করুন':'Save profile'}</button></form></div>
        ) : active === 'farm' ? (
          <div className="farm-grid">{farmPlots.map((plot:any,i:number)=><div className="feature-card farm-card" key={plot.name+i}><span className="crop-emoji">{plot.crop==='Rice'?'🌾':plot.crop==='Vegetables'?'🥬':'🌱'}</span><h2>{plot.name}</h2><p>{isBn?'প্লট':'Plot'} {String(i+1).padStart(2,'0')} · {plot.size||'—'}</p><span className="status-pill"><span/>{plot.crop}</span><button className="secondary-button" onClick={()=>{const next=farmPlots.filter((_:any,j:number)=>j!==i);setFarmPlots(next);localStorage.setItem('ecoalert-farm-plots',JSON.stringify(next));notify(isBn?'জমি মুছে ফেলা হয়েছে':'Plot removed')}}>{isBn?'মুছুন':'Remove'}</button></div>)}<button className="add-farm" onClick={()=>setShowPlotForm(v=>!v)}><Plus size={22}/><span>{isBn ? 'নতুন জমি যোগ করুন' : 'Add a plot'}</span></button>{showPlotForm&&<form className="feature-card" onSubmit={e=>{e.preventDefault();if(!newPlot.name.trim())return;const next=[...farmPlots,{...newPlot}];setFarmPlots(next);localStorage.setItem('ecoalert-farm-plots',JSON.stringify(next));setNewPlot({name:'',crop:'Rice',size:''});setShowPlotForm(false);notify(isBn?'নতুন জমি যোগ হয়েছে':'Plot added and saved')}}><h3>{isBn?'জমির তথ্য':'Plot details'}</h3><label>{isBn?'জমির নাম':'Plot name'}<input required value={newPlot.name} onChange={e=>setNewPlot(v=>({...v,name:e.target.value}))}/></label><label>{isBn?'ফসল':'Crop'}<select value={newPlot.crop} onChange={e=>setNewPlot(v=>({...v,crop:e.target.value}))}><option>Rice</option><option>Vegetables</option><option>Wheat</option><option>Maize</option><option>Other</option></select></label><label>{isBn?'জমির পরিমাণ':'Area / size'}<input value={newPlot.size} onChange={e=>setNewPlot(v=>({...v,size:e.target.value}))} placeholder="e.g. 1 acre"/></label><button className="primary-button" type="submit"><Save size={16}/>{isBn?'সংরক্ষণ':'Save plot'}</button></form>}</div>
        ) : (
          <div className="feature-card season-settings"><div className="feature-icon"><Settings size={27}/></div><h2>{isBn ? 'আপনার পছন্দ' : 'Your preferences'}</h2><p>{isBn ? 'ঋতু অনুযায়ী ড্যাশবোর্ডের বাস্তব কৃষি-দৃশ্যের ব্যাকগ্রাউন্ড বেছে নিন।' : 'Choose a real agricultural landscape background for the dashboard.'}</p><div className="season-mode-row"><button className={seasonMode==='manual'?'primary-button':'secondary-button'} onClick={()=>setModeChoice('manual')}>{isBn?'নিজে নির্বাচন':'Manual'}</button><button className={seasonMode==='auto'?'primary-button':'secondary-button'} onClick={()=>setModeChoice('auto')}>{isBn?'স্বয়ংক্রিয়':'Auto by season'}</button></div><div className="season-choice-grid">{seasonOptions.map(item=><button key={item.id} className={'season-choice '+(season===item.id?'chosen':'')} onClick={()=>{setModeChoice('manual');setSeasonChoice(item.id)}}><img src={seasonHeroSrc(item.id)} alt={item.en}/><span>{isBn?item.bn:item.en}</span>{season===item.id&&<CheckCircle2 size={16}/>}</button>)}</div><p className="season-help">{isBn?'স্বয়ংক্রিয় মোডে মাস অনুযায়ী ঋতু পরিবর্তিত হবে।':'Auto mode maps the current month to a Bangladesh season; manual selection is saved on this device.'}</p><button className="primary-button" onClick={() => setLang(isBn ? 'en' : 'bn')}><Globe2 size={16}/>{isBn ? 'Switch to English' : 'বাংলায় দেখুন'}</button></div>
        )}
        <button className="back-dashboard" onClick={()=>setActive('dashboard')}><ArrowRight size={15}/>{t.dashboard}</button>
    </main>
    {toast && <div className="toast"><CheckCircle2 size={17}/>{toast}</div>}
  </div>;
}