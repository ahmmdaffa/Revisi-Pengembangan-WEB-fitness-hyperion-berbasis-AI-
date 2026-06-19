# HYPEFIT AI Fitness

HYPEFIT adalah prototype aplikasi web fitness untuk kebutuhan capstone. Aplikasi ini menggabungkan landing page, dashboard member, modul BMI, nutrition planner, enrollment flow, dan FitBot sebagai asisten fitness berbasis Gemini API.

Fokus project ini adalah membuat pengalaman fitness yang rapi, modern, dan mudah didemokan secara lokal tanpa mengekspos API key di frontend.

## Fitur

- Landing page bertema dark futuristic fitness.
- Login demo untuk masuk ke dashboard.
- Dashboard member dengan ringkasan performa dan BMI calculator.
- Halaman Training, Nutrition, dan Settings.
- Diet Plan Generator pada halaman Nutrition.
- FitBot chat assistant melalui backend proxy.
- Pricing plan Lite, Pro, dan Elite.
- Athlete Enrollment dan Enrollment Success page.
- Konten UI dipisahkan ke JSON dan disajikan lewat endpoint `GET /api/content`.

## Tech Stack

- React + Vite
- Tailwind CSS
- Node.js + Express
- Gemini API
- npm

## Struktur Repo

```text
.
|-- Hypefit Ai  Fitness/
|   |-- public/
|   |-- server/
|   |   `-- index.js
|   |-- src/
|   |   |-- data/
|   |   |   `-- hypefit-content.json
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |   `-- styles.css
|   |-- .env.example
|   |-- package.json
|   `-- vite.config.js
|-- docs/
|   |-- functional-prototype/
|   `-- presentation/
|-- .gitignore
|-- package.json
`-- README.md
```

## Konten Dinamis

Konten utama website berada di:

```text
Hypefit Ai  Fitness/src/data/hypefit-content.json
```

File ini berisi data untuk landing page, fitur AI Coach, pricing plan, dashboard cards, training library, nutrition macro, meal list, enrollment, settings, dan credential login demo. Backend membaca file tersebut dan mengirimkannya ke frontend melalui:

```text
GET /api/content
```

Dengan struktur ini, konten bisa diubah tanpa menyentuh layout React atau styling.

## Setup Lokal

Install dependency aplikasi:

```bash
npm.cmd run install:app
```

Buat file `.env` di dalam folder `Hypefit Ai  Fitness`:

```env
GEMINI_API_KEY=isi_api_key_gemini_anda
GEMINI_MODEL=gemini-2.5-flash
PORT=3001
```

Jalankan frontend dan backend:

```bash
npm.cmd run dev
```

Aplikasi berjalan di:

```text
http://127.0.0.1:5173/
```

Backend berjalan di:

```text
http://127.0.0.1:3001
```

## Login Demo

Credential demo bisa diubah dari `hypefit-content.json`.

```json
{
  "email": "ahmmdaffa280904@gmail.com",
  "password": "12345678"
}
```

## Endpoint Backend

```text
GET  /api/health
GET  /api/content
POST /api/chat
POST /api/diet-plan
```

## Build

```bash
npm.cmd run build
npm.cmd run start
```

## Catatan

File `.env`, `node_modules`, dan `dist` tidak ikut disimpan di repository. API key Gemini hanya dibaca oleh backend dari file `.env`.
