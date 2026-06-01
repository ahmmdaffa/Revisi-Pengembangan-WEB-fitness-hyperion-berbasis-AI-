import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);
const model = process.env.GEMINI_MODEL || "gemini-3.5-flash";
const apiBaseUrl =
  process.env.GEMINI_API_BASE_URL || "https://generativelanguage.googleapis.com/v1beta";

const FITBOT_SYSTEM_PROMPT =
  "Kamu adalah FitBot, AI personal fitness assistant di aplikasi HYPERION AI FITNESS. Jawab dengan bahasa Indonesia yang jelas, ramah, dan profesional. Berikan saran latihan, nutrisi, recovery, dan progress tracking secara aman. Jangan memberikan diagnosis medis. Jika user memiliki kondisi kesehatan serius, sarankan konsultasi dengan dokter atau ahli gizi.";

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
    const geminiResponse = await fetch(getGeminiEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY.trim()
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: FITBOT_SYSTEM_PROMPT }]
        },
        contents: [
          {
            role: "user",
            parts: [{ text: message }]
          }
        ],
        generationConfig: {
          maxOutputTokens: 700
        }
      }),
      signal: AbortSignal.timeout(30000)
    });

    const payload = await geminiResponse.json().catch(() => ({}));

    if (!geminiResponse.ok) {
      const geminiMessage = payload?.error?.message || `Gemini HTTP ${geminiResponse.status}`;
      console.error("[FitBot] Gemini API error:", geminiMessage);
      return res.status(502).json({
        error: "Gemini API gagal merespons. Periksa API key, model, atau koneksi internet."
      });
    }

    const reply = extractGeminiText(payload);

    if (!reply) {
      console.error("[FitBot] Gemini returned an empty response:", payload);
      return res.status(502).json({
        error: "Gemini tidak mengembalikan jawaban teks. Coba lagi dengan pertanyaan berbeda."
      });
    }

    return res.json({ reply });
  } catch (error) {
    const isTimeout = error?.name === "TimeoutError" || error?.name === "AbortError";
    console.error("[FitBot] Proxy error:", error);
    return res.status(502).json({
      error: isTimeout
        ? "Permintaan ke Gemini timeout. Coba lagi sebentar."
        : "Server gagal menghubungi Gemini API. Coba lagi sebentar."
    });
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "..", "dist");

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`FitBot Gemini proxy running on http://localhost:${port}`);
});
