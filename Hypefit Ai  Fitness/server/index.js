import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);
const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const apiBaseUrl =
  process.env.GEMINI_API_BASE_URL || "https://generativelanguage.googleapis.com/v1beta";

const FITBOT_SYSTEM_PROMPT =
  "Kamu adalah FitBot, AI personal fitness assistant di aplikasi HYPERION AI FITNESS. Jawab dengan bahasa Indonesia yang jelas, ramah, dan profesional. Berikan saran latihan, nutrisi, recovery, dan progress tracking secara aman. Jangan memberikan diagnosis medis. Jika user memiliki kondisi kesehatan serius, sarankan konsultasi dengan dokter atau ahli gizi.";

const DIET_PLAN_SYSTEM_PROMPT =
  "Kamu adalah FitBot Nutrition Planner di aplikasi HYPERION AI FITNESS. Buat rencana makan harian dalam bahasa Indonesia yang jelas, praktis, dan aman. Gunakan estimasi kalori sebagai panduan, bukan diagnosis medis. Jangan menyarankan diet ekstrem. Jika user memiliki penyakit, alergi serius, gangguan makan, sedang hamil, atau kondisi kesehatan khusus, sarankan konsultasi dengan dokter atau ahli gizi.";

app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));

app.use((error, _req, res, next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({ error: "JSON body tidak valid." });
  }
  return next(error);
});

function hasValidApiKey() {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  return Boolean(apiKey && apiKey !== "isi_api_key_saya");
}

function getGeminiEndpoint() {
  const normalizedBase = apiBaseUrl.replace(/\/$/, "");
  const normalizedModel = model.startsWith("models/") ? model : `models/${model}`;
  return `${normalizedBase}/${normalizedModel}:generateContent`;
}

function extractGeminiText(payload) {
  const parts = payload?.candidates?.[0]?.content?.parts || [];
  return parts
    .map((part) => part.text)
    .filter(Boolean)
    .join("\n")
    .trim();
}

function normalizeText(value, maxLength = 500) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

async function requestGeminiText({ systemPrompt, prompt, maxOutputTokens = 700 }) {
  const geminiResponse = await fetch(getGeminiEndpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY.trim()
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        maxOutputTokens
      }
    }),
    signal: AbortSignal.timeout(30000)
  });

  const payload = await geminiResponse.json().catch(() => ({}));

  if (!geminiResponse.ok) {
    const geminiMessage = payload?.error?.message || `Gemini HTTP ${geminiResponse.status}`;
    const error = new Error(geminiMessage);
    error.publicMessage = "Gemini API gagal merespons. Periksa API key, model, atau koneksi internet.";
    throw error;
  }

  const reply = extractGeminiText(payload);

  if (!reply) {
    const error = new Error("Gemini returned an empty response.");
    error.publicMessage = "Gemini tidak mengembalikan jawaban teks. Coba lagi dengan input berbeda.";
    throw error;
  }

  return reply;
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "fitbot-gemini-proxy",
    model,
    apiKeyConfigured: hasValidApiKey()
  });
});

app.post("/api/chat", async (req, res) => {
  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";

  if (!message) {
    return res.status(400).json({ error: "Body harus berisi message yang tidak kosong." });
  }

  if (message.length > 2000) {
    return res.status(400).json({ error: "Message terlalu panjang. Maksimal 2000 karakter." });
  }

  if (!hasValidApiKey()) {
    return res.status(503).json({
      error: "GEMINI_API_KEY belum dikonfigurasi. Isi file .env dengan API key Gemini Anda."
    });
  }

  try {
    const reply = await requestGeminiText({
      systemPrompt: FITBOT_SYSTEM_PROMPT,
      prompt: message,
      maxOutputTokens: 700
    });
    return res.json({ reply });
  } catch (error) {
    const isTimeout = error?.name === "TimeoutError" || error?.name === "AbortError";
    console.error("[FitBot] Proxy error:", error);
    return res.status(502).json({
      error: isTimeout
        ? "Permintaan ke Gemini timeout. Coba lagi sebentar."
        : error.publicMessage || "Server gagal menghubungi Gemini API. Coba lagi sebentar."
    });
  }
});

app.post("/api/diet-plan", async (req, res) => {
  const goal = normalizeText(req.body?.goal, 300);
  const preferences = normalizeText(req.body?.preferences, 500);
  const restrictions = normalizeText(req.body?.restrictions, 400) || "Tidak ada batasan khusus.";
  const calorieTarget = Number(req.body?.calorieTarget);
  const mealCount = Number(req.body?.mealCount || 4);

  if (!goal || !preferences) {
    return res.status(400).json({
      error: "Goal dan preferensi diet harus diisi."
    });
  }

  if (!Number.isFinite(calorieTarget) || calorieTarget < 1000 || calorieTarget > 6000) {
    return res.status(400).json({
      error: "Target kalori harus berada di rentang 1000 sampai 6000 kcal."
    });
  }

  if (!Number.isInteger(mealCount) || mealCount < 3 || mealCount > 6) {
    return res.status(400).json({
      error: "Jumlah meal harus berupa angka 3 sampai 6."
    });
  }

  if (!hasValidApiKey()) {
    return res.status(503).json({
      error: "GEMINI_API_KEY belum dikonfigurasi. Isi file .env dengan API key Gemini Anda."
    });
  }

  const prompt = `
Buat daily meal plan untuk user HYPEFIT dengan data berikut:

Goal utama:
${goal}

Preferensi diet dan makanan:
${preferences}

Batasan, alergi, atau makanan yang dihindari:
${restrictions}

Target kalori harian:
${calorieTarget} kcal

Jumlah meal harian:
${mealCount}

Format output wajib:
1. RINGKASAN TARGET
2. MEAL PLAN HARIAN
   - Bagi menjadi ${mealCount} waktu makan.
   - Cantumkan menu, porsi sederhana, estimasi kalori, dan estimasi protein.
3. CALORIE GUIDANCE
   - Jelaskan pembagian kalori harian dan tips menyesuaikan porsi.
4. CATATAN AMAN
   - Ingatkan bahwa ini panduan umum, bukan pengganti ahli gizi.

Gunakan bahasa Indonesia. Hindari markdown tabel. Jangan gunakan format bold dengan tanda bintang.
`.trim();

  try {
    const plan = await requestGeminiText({
      systemPrompt: DIET_PLAN_SYSTEM_PROMPT,
      prompt,
      maxOutputTokens: 1100
    });

    return res.json({ plan });
  } catch (error) {
    const isTimeout = error?.name === "TimeoutError" || error?.name === "AbortError";
    console.error("[DietPlan] Gemini proxy error:", error);
    return res.status(502).json({
      error: isTimeout
        ? "Permintaan diet plan ke Gemini timeout. Coba lagi sebentar."
        : error.publicMessage || "Server gagal membuat diet plan. Coba lagi sebentar."
    });
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "..", "dist");
const contentPath = path.join(__dirname, "..", "src", "data", "hypefit-content.json");

app.get("/api/content", async (_req, res) => {
  try {
    const rawContent = await fs.promises.readFile(contentPath, "utf8");
    return res.json(JSON.parse(rawContent));
  } catch (error) {
    console.error("[Content] Failed to load dynamic content:", error);
    return res.status(500).json({
      error: "Konten website gagal dimuat dari server."
    });
  }
});

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`FitBot Gemini proxy running on http://localhost:${port}`);
});
