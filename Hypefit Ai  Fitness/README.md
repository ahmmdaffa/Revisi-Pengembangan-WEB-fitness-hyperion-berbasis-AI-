# HYPEFIT - Hyperion AI Fitness

HYPEFIT adalah aplikasi web bertema AI Fitness / Smart Fitness Hub dengan visual dark futuristic premium fitness. Project ini dibuat dari file ZIP static HTML/screen design, lalu dirapikan menjadi aplikasi React + Vite dengan backend Node.js + Express untuk mengamankan Gemini API key.

## Fitur Utama

- Landing page premium HYPERION/HYPEFIT.
- FitBot AI Chatbot memakai Gemini API melalui backend proxy.
- Login demo lokal.
- Dashboard member setelah login.
- Page dashboard aktif: Dashboard, Training, Nutrition, Settings.
- Pricing plan: Lite, Pro, Elite.
- Flow enrollment: pilih paket -> Athlete Enrollment -> Enrollment Successful.
- Favicon/logo HYPEFIT custom.

## Teknologi

- React
- Vite
- Tailwind CSS
- Node.js
- Express
- Gemini API

## Struktur Project

```text
.
|-- index.html
|-- package.json
|-- vite.config.js
|-- tailwind.config.js
|-- postcss.config.js
|-- .env.example
|-- public/
|   `-- hypefit-logo.svg
|-- server/
|   `-- index.js
|-- src/
|   |-- App.jsx
|   |-- main.jsx
|   `-- styles.css
```

## Setup Project

1. Buka folder project:

```bash
cd "c:\Users\csdec\Documents\capstone project\capstone\Hypefit Ai  Fitness"
```

2. Install dependency:

```bash
npm install
```

Jika PowerShell menolak `npm.ps1`, gunakan:

```bash
npm.cmd install
```

3. Buat atau isi file `.env`:

```env
GEMINI_API_KEY=isi_api_key_gemini_anda
GEMINI_MODEL=gemini-2.5-flash
PORT=3001
```

Model bisa diganti sesuai model Gemini yang aktif di akun Anda.

## Menjalankan Project

Jalankan frontend dan backend sekaligus:

```bash
npm run dev
```

Jika PowerShell memblokir `npm.ps1`, gunakan:

```bash
npm.cmd run dev
```

Buka aplikasi:

```text
http://127.0.0.1:5173/
```

Backend Express berjalan di:

```text
http://127.0.0.1:3001
```

Health check backend:

```text
GET http://127.0.0.1:3001/api/health
```

## Login Demo

Credential login demo disimpan di:

```text
src/App.jsx
```

Cari bagian:

```jsx
const demoCredentials = {
  email: "...",
  password: "..."
};
```

Ubah email dan password di bagian tersebut jika ingin mengganti akun login lokal.

## FitBot Gemini API

Endpoint chatbot:

```text
POST /api/chat
```

Body request:

```json
{
  "message": "pesan user"
}
```

API key Gemini hanya dibaca oleh backend dari `.env`, sehingga tidak hardcode di frontend.

Prompt sistem FitBot:

```text
Kamu adalah FitBot, AI personal fitness assistant di aplikasi HYPERION AI FITNESS. Jawab dengan bahasa Indonesia yang jelas, ramah, dan profesional. Berikan saran latihan, nutrisi, recovery, dan progress tracking secara aman. Jangan memberikan diagnosis medis. Jika user memiliki kondisi kesehatan serius, sarankan konsultasi dengan dokter atau ahli gizi.
```

## Flow Aplikasi

Landing page:

```text
Home -> AI Coach -> Schedule -> Training -> Pricing
```

Login:

```text
LOG IN -> Login Page -> Dashboard
```

Dashboard:

```text
Dashboard
Training
Nutrition
Settings
```

Enrollment:

```text
Pricing -> Pilih Lite/Pro/Elite -> Athlete Enrollment -> Submit Data -> Enrollment Successful
```

## Build Production

```bash
npm run build
npm start
```

Atau di PowerShell:

```bash
npm.cmd run build
npm.cmd start
```

Setelah build, Express akan melayani file dari folder `dist` dan endpoint `/api/chat` dari:

```text
http://127.0.0.1:3001
```

## Troubleshooting

Jika chatbot tidak menjawab:

- Pastikan `.env` sudah berisi `GEMINI_API_KEY`.
- Pastikan server sudah direstart setelah mengubah `.env`.
- Cek `GET /api/health`.
- Pastikan `GEMINI_MODEL` sesuai model yang tersedia di akun Gemini Anda.

Jika command `npm` gagal di PowerShell:

```bash
npm.cmd install
npm.cmd run dev
```

Jika favicon/logo belum berubah:

- Lakukan hard refresh browser.
- Tutup tab lalu buka kembali.
- Browser sering menyimpan cache favicon.
