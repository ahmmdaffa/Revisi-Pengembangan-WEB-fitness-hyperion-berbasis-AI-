# HYPEFIT Web App

Folder ini berisi aplikasi utama HYPEFIT: frontend React/Vite dan backend Express untuk proxy Gemini API.

## Menjalankan Aplikasi

Install dependency:

```bash
npm install
```

Buat `.env` dari `.env.example`:

```env
GEMINI_API_KEY=isi_api_key_gemini_anda
GEMINI_MODEL=gemini-2.5-flash
PORT=3001
```

Jalankan mode development:

```bash
npm run dev
```

Frontend:

```text
http://127.0.0.1:5173/
```

Backend:

```text
http://127.0.0.1:3001
```

## Struktur Utama

```text
.
|-- public/
|   `-- hypefit-logo.svg
|-- server/
|   `-- index.js
|-- src/
|   |-- data/
|   |   `-- hypefit-content.json
|   |-- App.jsx
|   |-- main.jsx
|   |-- styles.css
|   `-- chatbot-scroll.css
|-- package.json
`-- vite.config.js
```

## Konten Website

Konten utama disimpan di:

```text
src/data/hypefit-content.json
```

Backend menyajikan data tersebut lewat:

```text
GET /api/content
```

Bagian yang bisa diubah dari JSON:

- Landing page
- AI Coach feature cards
- Schedule cards
- Pricing plan
- Login demo
- Dashboard cards
- Training library
- Nutrition data
- Enrollment copy
- Settings data

## Endpoint

```text
GET  /api/health
GET  /api/content
POST /api/chat
POST /api/diet-plan
```

## Build

```bash
npm run build
npm start
```

Setelah build, Express akan melayani file dari folder `dist`.
