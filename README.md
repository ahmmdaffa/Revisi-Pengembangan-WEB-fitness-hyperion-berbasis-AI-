# HYPEFIT - Hyperion AI Fitness

HYPEFIT adalah aplikasi web AI Fitness / Smart Fitness Hub dengan visual dark futuristic premium fitness. Project ini memakai React + Vite untuk frontend dan Node.js + Express sebagai backend proxy agar Gemini API key tidak hardcode di frontend.

## Fitur Utama

- Landing page premium HYPERION/HYPEFIT.
- FitBot AI Chatbot memakai Gemini API melalui backend proxy.
- Login demo lokal.
- Dashboard member setelah login.
- Page aktif: Dashboard, Training, Nutrition, Settings.
- Pricing plan: Lite, Pro, Elite.
- Flow enrollment: pilih paket -> Athlete Enrollment -> Enrollment Successful.
- Logo dan favicon HYPEFIT custom.

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
|-- README.md
|-- package.json
|-- .gitignore
`-- Hypefit Ai  Fitness/
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
    `-- src/
        |-- App.jsx
        |-- main.jsx
        |-- styles.css
        `-- chatbot-scroll.css
```

## Setup Project

Install dependency dari folder root repository:

```bash
npm.cmd run install:app
```

Buat file `.env` di dalam folder `Hypefit Ai  Fitness`:

```env
GEMINI_API_KEY=isi_api_key_gemini_anda
GEMINI_MODEL=gemini-2.5-flash
PORT=3001
```

## Menjalankan Project

Dari folder root repository:

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

## Login Demo

Credential login demo ada di:

```text
Hypefit Ai  Fitness/src/App.jsx
```

Cari bagian:

```jsx
const demoCredentials = {
  email: "...",
  password: "..."
};
```

## Build Production

```bash
npm.cmd run build
npm.cmd run start
```

## Catatan Keamanan

File `.env`, `node_modules`, dan `dist` tidak ikut dipush ke GitHub. API key Gemini tetap disimpan lokal di `.env`.
