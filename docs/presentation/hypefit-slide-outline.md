# POWERPOINT CONTENT - HYPEFIT AI FITNESS

## Slide 1 - Cover

**HYPEFIT AI FITNESS**  
Smart Fitness Hub Berbasis Artificial Intelligence

Disusun oleh:  
**Ahmad Daffa**  

Course: Capstone Project / Pengembangan Web  
Institusi: [Nama Institusi]  
Email: ahmmdaffa280904@gmail.com  
Tanggal: Juni 2026

**Catatan visual:**  
Gunakan screenshot landing page HYPEFIT AI sebagai background gelap. Tambahkan judul besar dengan warna putih dan aksen merah #BA0B0B.

---

## Slide 2 - Latar Belakang

Perkembangan teknologi digital membuat kebutuhan aplikasi fitness semakin meningkat, terutama bagi pengguna yang ingin latihan dengan lebih terarah, fleksibel, dan mudah dipantau. Banyak orang ingin mulai berolahraga, tetapi sering mengalami kesulitan dalam menentukan jenis latihan, jadwal, target nutrisi, dan cara mengevaluasi progres secara konsisten.

Di sisi lain, aplikasi fitness biasa sering hanya menampilkan program latihan statis. Pengguna tetap harus menyesuaikan sendiri program tersebut dengan kondisi, tujuan, dan preferensi masing-masing. Hal ini dapat membuat pengalaman pengguna terasa kurang personal.

Melalui project ini, dibuat sebuah web fitness modern bernama **HYPEFIT AI FITNESS** yang menggabungkan tampilan premium bertema dark futuristic dengan fitur AI assistant. AI digunakan untuk membantu pengguna mendapatkan rekomendasi latihan, nutrisi, recovery, dan tracking progres secara lebih interaktif.

---

## Slide 3 - Problem Statement

Masalah utama yang ingin diselesaikan dalam project ini adalah kurangnya sistem fitness berbasis web yang mampu memberikan panduan personal secara cepat dan mudah dipahami.

Beberapa permasalahan yang ditemukan:

- Pengguna pemula sering bingung menentukan program latihan sesuai tujuan.
- Informasi workout dan nutrisi tersebar di banyak tempat sehingga kurang praktis.
- Aplikasi fitness statis tidak selalu mampu menjawab kebutuhan pengguna secara spesifik.
- Pengguna membutuhkan pengalaman yang lebih interaktif, bukan hanya membaca daftar latihan.
- Tidak semua pengguna memahami cara memantau progres seperti BMI, berat badan, atau target kalori.

Solusi yang dibuat adalah aplikasi web fitness dengan bantuan Gen AI melalui FitBot, yaitu AI personal fitness assistant yang dapat menjawab pertanyaan pengguna secara langsung.

---

## Slide 4 - Tujuan Project

Tujuan utama project ini adalah membangun aplikasi web fitness modern yang dapat membantu pengguna menjalankan program kebugaran secara lebih terarah dengan dukungan Artificial Intelligence.

Tujuan detail:

- Membuat website fitness dengan desain premium, gelap, futuristik, dan konsisten.
- Mengintegrasikan AI chatbot sebagai personal fitness assistant.
- Menyediakan fitur rekomendasi workout, nutrisi, recovery, dan progress tracking.
- Menambahkan dashboard pengguna untuk melihat ringkasan performa fitness.
- Membuat modul BMI agar pengguna dapat menghitung kategori berat badan.
- Membuat fitur diet plan generator untuk membantu pengguna menyusun rencana makan harian.
- Menyediakan alur login, dashboard, pricing plan, athlete enrollment, dan success page.
- Menjaga keamanan API key dengan backend proxy agar tidak langsung ditulis di frontend.

---

## Slide 5 - Overview Solusi

**HYPEFIT AI FITNESS** adalah aplikasi web fitness berbasis React yang dirancang sebagai smart fitness hub. Aplikasi ini menyediakan beberapa halaman utama, seperti landing page, login page, dashboard, training, nutrition, settings, pricing, athlete enrollment, dan AI chatbot.

Fitur utama yang dikembangkan:

- Landing page dengan visual hero bertema AI-powered performance.
- Login demo untuk masuk ke dashboard pengguna.
- Dashboard dengan ringkasan status latihan dan modul BMI.
- Training page untuk melihat program latihan dan jadwal.
- Nutrition page untuk kebutuhan nutrisi dan diet plan generator.
- Pricing section untuk memilih paket Lite, Pro, dan Elite.
- Athlete enrollment form untuk pendaftaran paket.
- FitBot AI Coach yang terhubung ke Gemini API.

Dengan solusi ini, pengguna tidak hanya melihat informasi fitness, tetapi juga dapat berinteraksi dengan AI untuk mendapatkan saran yang lebih personal.

---

## Slide 6 - Target Pengguna

Target pengguna dari HYPEFIT AI FITNESS adalah orang-orang yang ingin mengatur aktivitas fitness secara lebih praktis dan modern.

Target pengguna:

- Pemula yang baru mulai latihan dan membutuhkan panduan dasar.
- Pengguna yang ingin menurunkan berat badan atau meningkatkan massa otot.
- Pengguna yang membutuhkan ide jadwal latihan mingguan.
- Pengguna yang ingin mendapatkan rekomendasi nutrisi harian.
- Pengguna yang ingin memantau progres seperti BMI dan target kebugaran.
- Pengguna yang menyukai pengalaman aplikasi fitness dengan tampilan premium dan AI assistant.

Kebutuhan pengguna:

- Panduan latihan yang mudah dipahami.
- Rencana nutrisi yang sesuai target.
- Chatbot yang bisa menjawab pertanyaan dengan cepat.
- Tampilan dashboard yang rapi dan informatif.
- Alur penggunaan yang sederhana dari landing page sampai dashboard.

---

## Slide 7 - User Flow Aplikasi

Alur penggunaan aplikasi dibuat sederhana agar pengguna dapat memahami proses dari awal sampai fitur utama.

User flow:

1. Pengguna membuka landing page HYPEFIT AI FITNESS.
2. Pengguna melihat informasi utama, fitur AI Coach, training, schedule, dan pricing.
3. Pengguna dapat memilih tombol login untuk masuk ke sistem.
4. Setelah login berhasil, pengguna diarahkan ke dashboard.
5. Pada dashboard, pengguna dapat melihat ringkasan performa dan menggunakan BMI module.
6. Pengguna dapat membuka menu Training untuk melihat rekomendasi latihan.
7. Pengguna dapat membuka menu Nutrition untuk melihat informasi nutrisi dan membuat diet plan.
8. Pengguna dapat membuka FitBot untuk bertanya langsung ke AI assistant.
9. Pengguna dapat memilih pricing plan dan mengisi athlete enrollment.
10. Setelah submit enrollment berhasil, sistem menampilkan halaman enrollment successful.

**Catatan visual:**  
Gunakan diagram panah sederhana: Landing Page -> Login -> Dashboard -> Training/Nutrition/FitBot -> Enrollment -> Success.

---

## Slide 8 - Fitur Utama Website

HYPEFIT AI FITNESS memiliki beberapa fitur utama yang saling terhubung dalam satu pengalaman aplikasi.

Fitur website:

- **Landing Page**  
  Menampilkan identitas aplikasi, hero section, navigasi, dan call-to-action.

- **Login Page**  
  Digunakan sebagai akses demo menuju dashboard.

- **Dashboard**  
  Menampilkan ringkasan performa, status latihan, dan BMI calculation module.

- **Training Page**  
  Berisi rekomendasi latihan, program latihan, dan struktur training.

- **Nutrition Page**  
  Berisi informasi nutrisi, target kalori, macro distribution, dan diet plan generator.

- **FitBot AI Coach**  
  Chatbot fitness assistant yang menjawab pertanyaan pengguna.

- **Pricing & Enrollment**  
  Memungkinkan pengguna memilih paket Lite, Pro, atau Elite, lalu mengisi form enrollment.

---

## Slide 9 - Implementasi Gen AI: FitBot

Fitur Gen AI utama dalam aplikasi ini adalah **FitBot**, yaitu AI personal fitness assistant yang dibuat untuk membantu pengguna bertanya seputar kebugaran.

Kemampuan FitBot:

- Memberikan rekomendasi workout berdasarkan goal pengguna.
- Membantu menyusun jadwal latihan.
- Memberikan tips nutrisi harian.
- Memberikan saran recovery setelah latihan.
- Membantu pengguna memahami progres fitness secara aman.
- Menjawab pertanyaan dengan bahasa Indonesia yang jelas, ramah, dan profesional.

FitBot tidak digunakan untuk diagnosis medis. Jika pengguna memiliki kondisi kesehatan serius, sistem diarahkan untuk menyarankan konsultasi kepada dokter, ahli gizi, atau tenaga profesional.

**Catatan visual:**  
Gunakan screenshot `../functional-prototype/screenshots/fp_11_fitbot_chatbot.png`.

---

## Slide 10 - Prompt Design FitBot

Prompt system digunakan untuk menjaga karakter dan batasan jawaban AI. FitBot diarahkan agar menjawab sebagai assistant fitness yang ramah, profesional, dan aman.

System prompt inti:

“Kamu adalah FitBot, AI personal fitness assistant di aplikasi HYPERION AI FITNESS. Jawab dengan bahasa Indonesia yang jelas, ramah, dan profesional. Berikan saran latihan, nutrisi, recovery, dan progress tracking secara aman. Jangan memberikan diagnosis medis. Jika user memiliki kondisi kesehatan serius, sarankan konsultasi dengan dokter atau ahli gizi.”

Strategi prompt:

- Menetapkan peran AI sebagai personal fitness assistant.
- Membatasi jawaban agar tidak memberi diagnosis medis.
- Mengarahkan AI untuk menggunakan bahasa Indonesia.
- Menjaga tone jawaban tetap ramah dan profesional.
- Menyesuaikan respons dengan konteks fitness, nutrisi, recovery, dan progress.

Dengan prompt ini, jawaban AI menjadi lebih konsisten dan sesuai kebutuhan aplikasi.

---

## Slide 11 - Integrasi Gemini API

AI chatbot pada HYPEFIT AI FITNESS menggunakan Gemini API melalui backend proxy Node.js + Express.

Alasan menggunakan backend proxy:

- API key tidak ditulis langsung di frontend.
- Request dari frontend dikirim ke endpoint lokal terlebih dahulu.
- Backend bertugas meneruskan prompt ke Gemini API.
- Response dari Gemini dikembalikan ke frontend dalam bentuk jawaban FitBot.
- Lebih aman dan mudah dikembangkan untuk fitur AI berikutnya.

Endpoint utama:

- `POST /api/chat`  
  Digunakan untuk mengirim pesan user ke Gemini API.

- `POST /api/diet-plan`  
  Digunakan untuk membuat rencana makan berdasarkan goal dan preferensi pengguna.

Model yang digunakan:

- Provider: Google Gemini
- Model: `gemini-2.5-flash`
- Konfigurasi API key disimpan melalui `.env`

---

## Slide 12 - Arsitektur Sistem

Arsitektur aplikasi dibuat dengan pemisahan antara frontend dan backend agar lebih aman serta mudah dikelola.

Alur kerja sistem:

1. User mengetik pesan pada komponen FitBot di frontend.
2. Frontend mengirim request ke backend Express melalui endpoint `/api/chat`.
3. Backend membaca API key dari file `.env`.
4. Backend menyusun prompt dan mengirim request ke Gemini API.
5. Gemini API menghasilkan jawaban.
6. Backend mengirim jawaban tersebut kembali ke frontend.
7. Frontend menampilkan jawaban pada bubble chat AI.

Keuntungan arsitektur ini:

- API key lebih aman karena tidak terekspos di browser.
- Frontend tetap fokus pada tampilan dan interaksi pengguna.
- Backend menjadi pusat komunikasi dengan layanan AI.
- Error handling dapat dikelola secara lebih rapi.

**Catatan visual:**  
Buat diagram sederhana: User -> React Frontend -> Express Backend -> Gemini API -> Backend -> Frontend.

---

## Slide 13 - Landing Page

Landing page menjadi halaman pertama yang dilihat pengguna. Desain dibuat menggunakan style dark futuristic premium fitness dengan aksen merah sebagai warna utama.

Elemen penting landing page:

- Navbar dengan logo HYPEFIT.
- Menu Training, Schedule, Pricing, dan AI Coach.
- Tombol Login dengan desain rounded dan aksen merah.
- Hero section dengan visual atlet dan pencahayaan merah.
- Headline besar: “Evolusi Kebugaran Anda Mulai di Sini”.
- Call-to-action untuk mulai menggunakan FitBot atau melihat AI Coach.

Tujuan landing page:

- Memberikan kesan aplikasi fitness modern dan premium.
- Menjelaskan bahwa aplikasi menggunakan AI untuk membantu performa pengguna.
- Mengarahkan pengguna menuju login, pricing, atau fitur AI Coach.

**Screenshot yang disarankan:**  
`../functional-prototype/screenshots/fp_01_landing_page.png`

---

## Slide 14 - Login Page

Login page digunakan sebagai akses masuk ke dashboard aplikasi. Pada versi prototype, login dibuat sebagai demo login agar proses presentasi dan pengujian bisa dilakukan dengan mudah.

Fungsi login page:

- Mengautentikasi pengguna demo.
- Menjaga alur aplikasi agar pengguna masuk ke dashboard terlebih dahulu.
- Menampilkan form email dan password.
- Memberikan error handling jika data login salah.
- Mengarahkan pengguna ke dashboard setelah login berhasil.

Credential demo:

- Email: `ahmmdaffa280904@gmail.com`
- Password: `12345678`

Halaman login tetap mengikuti desain utama aplikasi, yaitu dark mode, aksen merah, font tebal, dan tampilan futuristik.

**Screenshot yang disarankan:**  
`../functional-prototype/screenshots/fp_04_login_page.png`

---

## Slide 15 - Dashboard

Dashboard adalah halaman utama setelah pengguna berhasil login. Halaman ini menjadi pusat informasi awal terkait aktivitas fitness pengguna.

Isi dashboard:

- Ringkasan performa pengguna.
- Informasi progress dan status latihan.
- Navigasi sidebar menuju Training, Nutrition, dan Settings.
- BMI Calculation Module.
- Tampilan dark futuristic yang tetap konsisten dengan landing page.

Tujuan dashboard:

- Memberikan overview cepat kepada pengguna.
- Menjadi pusat navigasi fitur utama.
- Membantu pengguna memahami kondisi awal sebelum menyusun latihan atau nutrisi.

Dashboard dirancang agar tidak terlalu ramai, tetapi tetap informatif dan mudah dipahami.

**Screenshot yang disarankan:**  
`../functional-prototype/screenshots/fp_05_dashboard_overview.png`

---

## Slide 16 - BMI Calculation Module

BMI Calculation Module adalah fitur yang digunakan untuk menghitung Body Mass Index berdasarkan tinggi dan berat badan pengguna.

Input yang digunakan:

- Height dalam satuan centimeter.
- Weight dalam satuan kilogram.

Output yang ditampilkan:

- Nilai BMI.
- Kategori BMI seperti Underweight, Normal, atau Overweight.
- Penjelasan singkat agar pengguna memahami hasil perhitungan.

Manfaat fitur:

- Membantu pengguna mengetahui gambaran awal kondisi berat badan.
- Menjadi referensi sebelum memilih program latihan atau nutrisi.
- Mendukung fitur dashboard agar lebih fungsional.

Catatan keamanan:

Hasil BMI hanya digunakan sebagai informasi umum, bukan diagnosis medis. Untuk kondisi kesehatan tertentu, pengguna tetap disarankan berkonsultasi dengan tenaga profesional.

**Screenshot yang disarankan:**  
`../functional-prototype/screenshots/fp_06_bmi_module.png`

---

## Slide 17 - Training Page

Training page berisi rekomendasi latihan yang dapat digunakan pengguna sebagai panduan workout.

Isi Training Page:

- Program latihan berdasarkan kategori atau target.
- Informasi jenis latihan yang bisa dilakukan.
- Rekomendasi struktur latihan.
- Tampilan card atau panel yang rapi dan mudah dibaca.

Contoh fokus training:

- Strength training untuk membangun massa otot.
- Fat loss training untuk membantu pembakaran kalori.
- Conditioning untuk meningkatkan stamina.
- Mobility atau stretching sebagai pendukung recovery.

Manfaat Training Page:

- Pengguna memiliki referensi latihan tanpa harus mencari dari banyak sumber.
- Latihan lebih terarah berdasarkan goal.
- Tampilan program dibuat lebih mudah dipahami oleh pengguna pemula.

**Screenshot yang disarankan:**  
`../functional-prototype/screenshots/fp_07_training_page.png`

---

## Slide 18 - Nutrition Page

Nutrition page dibuat untuk membantu pengguna memahami kebutuhan nutrisi dalam mendukung target fitness.

Isi Nutrition Page:

- Ringkasan target nutrisi.
- Informasi kalori harian.
- Macro distribution seperti protein, karbohidrat, dan lemak.
- Diet Plan Generator berbasis AI.

Tujuan Nutrition Page:

- Membantu pengguna menyusun pola makan yang lebih terarah.
- Memberikan pemahaman dasar tentang kebutuhan kalori dan makro.
- Menghubungkan aspek latihan dengan nutrisi agar hasil lebih optimal.

Desain nutrition page tetap mengikuti tema aplikasi dengan panel gelap, aksen merah, typography tegas, dan layout yang mudah discan.

**Screenshot yang disarankan:**  
`../functional-prototype/screenshots/fp_08_nutrition_page.png`

---

## Slide 19 - Diet Plan Generator

Diet Plan Generator adalah fitur tambahan pada sidebar Nutrition yang menggunakan LLM API untuk membantu pengguna membuat rencana makan harian.

Input dari pengguna:

- Goal fitness, seperti fat loss, muscle gain, atau maintenance.
- Preferensi makanan.
- Batasan atau catatan diet tertentu.
- Estimasi kebutuhan kalori.

Output yang dihasilkan:

- Rekomendasi meal plan harian.
- Pembagian menu seperti breakfast, lunch, dinner, dan snack.
- Panduan kalori secara umum.
- Saran nutrisi yang tetap aman dan tidak bersifat diagnosis medis.

Manfaat fitur:

- Membuat nutrition page lebih interaktif.
- Membantu pengguna mendapatkan ide menu tanpa harus menyusun manual.
- Menunjukkan penerapan Gen AI selain chatbot.

**Screenshot yang disarankan:**  
`../functional-prototype/screenshots/fp_09_diet_plan_generator.png`

---

## Slide 20 - Pricing dan Athlete Enrollment

Pricing section menyediakan pilihan paket layanan untuk pengguna. Terdapat tiga paket utama, yaitu Lite, Pro, dan Elite.

Fitur pricing:

- Paket Lite untuk kebutuhan dasar.
- Paket Pro untuk pengguna yang ingin fitur lebih lengkap.
- Paket Elite untuk pengalaman premium.
- Tombol “Pilih Lite”, “Pilih Pro”, dan “Pilih Elite”.

Setelah memilih paket, pengguna diarahkan ke halaman athlete enrollment. Pada halaman ini, pengguna dapat mengisi data seperti nama, email, nomor WhatsApp, usia, berat badan, tinggi badan, dan persetujuan data.

Setelah form berhasil dikirim, pengguna diarahkan ke halaman enrollment successful. Alur ini dibuat untuk mensimulasikan proses pendaftaran layanan fitness premium.

**Screenshot yang disarankan:**  
`../functional-prototype/screenshots/fp_03_pricing_section.png`  
`../functional-prototype/screenshots/fp_12_athlete_enrollment.png`  
`../functional-prototype/screenshots/fp_13_enrollment_success.png`

---

## Slide 21 - Error Handling dan User Feedback

Aplikasi memiliki beberapa bentuk feedback agar pengguna memahami status sistem.

Error handling yang diterapkan:

- Jika login gagal, sistem menampilkan pesan bahwa email atau password salah.
- Jika Gemini API gagal merespons, chatbot menampilkan pesan error yang mudah dipahami.
- Jika input kosong, sistem mencegah request dikirim.
- Pada fitur AI, terdapat loading state saat AI sedang memproses jawaban.
- Pada form enrollment, input penting dibuat wajib agar data tidak kosong.
- Pada diet plan generator, sistem memberi feedback saat proses generate sedang berjalan.

Tujuan error handling:

- Membuat aplikasi lebih nyaman digunakan.
- Mengurangi kebingungan pengguna.
- Memberikan pengalaman yang lebih profesional.
- Membantu proses demo berjalan lebih jelas.

---

## Slide 22 - Tech Stack

Project ini menggunakan teknologi web modern dengan pemisahan frontend dan backend.

Frontend:

- React
- Vite
- JavaScript
- CSS custom
- Font: Anton, Hanken Grotesk, JetBrains Mono
- Lucide React Icons

Backend:

- Node.js
- Express.js
- dotenv
- CORS

AI Integration:

- Google Gemini API
- Model: `gemini-2.5-flash`
- Backend proxy untuk menjaga keamanan API key

Tools:

- Visual Studio Code
- npm
- Git dan GitHub
- Browser untuk testing lokal

Dokumentasi:

- README
- Technical Documentation
- Functional Prototype Report
- Screenshot web untuk dokumentasi dan presentasi

---

## Slide 23 - Struktur Folder Project

Struktur project dibuat agar file aplikasi, backend, dan dokumentasi lebih mudah dipahami.

Struktur utama:

```text
capstone/
|-- Hypefit Ai  Fitness/
|   |-- server/
|   |   `-- index.js
|   |-- src/
|   |   |-- data/
|   |   |   `-- hypefit-content.json
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |   `-- styles.css
|   |-- public/
|   |-- .env.example
|   |-- package.json
|   `-- vite.config.js
|-- docs/
|   |-- functional-prototype/
|   |   |-- Functional_Prototype_HYPEFIT_AI.docx
|   |   `-- screenshots/
|   `-- presentation/
|       `-- hypefit-slide-outline.md
|-- README.md
`-- package.json
```

Penjelasan:

- `src/App.jsx` berisi komponen utama aplikasi React.
- `src/data/hypefit-content.json` berisi konten dinamis website.
- `server/index.js` berisi backend Express dan endpoint API.
- `.env.example` berisi contoh konfigurasi API key.
- `docs/functional-prototype` berisi laporan prototype dan screenshot.
- `README.md` berisi panduan menjalankan aplikasi.
---

## Slide 24 - Setup dan Cara Menjalankan

Project dapat dijalankan secara lokal melalui Visual Studio Code dan terminal.

Langkah menjalankan project:

1. Buka folder project di VS Code.
2. Install dependencies:

```bash
npm install
```

3. Masuk ke folder aplikasi atau gunakan script root.
4. Buat file `.env` berdasarkan `.env.example`.
5. Isi API key Gemini:

```env
GEMINI_API_KEY=isi_api_key_saya
GEMINI_MODEL=gemini-2.5-flash
PORT=3001
```

6. Jalankan project:

```bash
npm run dev
```

7. Buka aplikasi melalui browser pada alamat localhost yang muncul di terminal.

Catatan:

API key tidak boleh dipush ke GitHub. File `.env` digunakan hanya untuk konfigurasi lokal.

---

## Slide 25 - Pengujian Aplikasi

Pengujian dilakukan secara lokal untuk memastikan fitur utama berjalan sesuai kebutuhan.

Jenis pengujian:

- Pengujian navigasi landing page.
- Pengujian login dengan credential demo.
- Pengujian dashboard setelah login berhasil.
- Pengujian sidebar Training, Nutrition, dan Settings.
- Pengujian BMI Calculation Module.
- Pengujian Diet Plan Generator.
- Pengujian FitBot chatbot dengan Gemini API.
- Pengujian pricing plan menuju athlete enrollment.
- Pengujian submit enrollment menuju success page.
- Pengujian refresh halaman agar kembali ke tampilan awal landing page.

Hasil pengujian:

- Aplikasi dapat dijalankan di localhost.
- Navigasi utama berjalan.
- Login berhasil mengarah ke dashboard.
- Chatbot dapat mengirim dan menerima jawaban dari backend.
- BMI module dapat menghitung kategori BMI.
- Diet plan generator dapat menghasilkan rekomendasi meal plan.
- Tampilan tetap konsisten dengan tema dark futuristic.

---

## Slide 26 - Keterbatasan Project

Walaupun fitur utama sudah berjalan, project ini masih memiliki beberapa keterbatasan.

Keterbatasan:

- Login masih berupa demo credential, belum menggunakan database autentikasi.
- Data pengguna belum disimpan secara permanen di database.
- Dashboard masih menggunakan data statis dan simulasi.
- BMI hanya memberikan kategori umum, bukan analisis kesehatan lengkap.
- Rekomendasi AI bergantung pada koneksi API dan ketersediaan Gemini API.
- Aplikasi belum dideploy ke hosting publik.
- Belum ada sistem pembayaran nyata untuk paket pricing.
- Belum ada integrasi wearable device atau data biometrik real-time.

Keterbatasan ini menjadi dasar pengembangan lanjutan agar aplikasi dapat menjadi produk yang lebih lengkap.

---

## Slide 27 - Rencana Pengembangan Lanjutan

Untuk pengembangan berikutnya, HYPEFIT AI FITNESS dapat ditingkatkan dengan beberapa fitur tambahan.

Rencana pengembangan:

- Menambahkan autentikasi pengguna menggunakan database.
- Menyimpan riwayat chat FitBot.
- Menyimpan data progres latihan pengguna.
- Menambahkan database untuk workout plan dan meal plan.
- Membuat dashboard dengan grafik progres berat badan, kalori, dan latihan.
- Menambahkan role user dan admin.
- Menambahkan fitur upload progress photo.
- Mengembangkan rekomendasi AI berdasarkan histori pengguna.
- Deploy aplikasi ke platform hosting seperti Vercel, Render, atau Railway.
- Menambahkan payment gateway untuk paket Lite, Pro, dan Elite.

Dengan pengembangan ini, aplikasi dapat menjadi smart fitness platform yang lebih personal dan siap digunakan secara lebih luas.

---

## Slide 28 - Kesimpulan

HYPEFIT AI FITNESS berhasil dikembangkan sebagai prototype aplikasi web fitness modern berbasis AI. Aplikasi ini menggabungkan tampilan premium dark futuristic dengan fitur-fitur utama seperti landing page, login, dashboard, training, nutrition, BMI module, diet plan generator, pricing, athlete enrollment, dan FitBot AI Coach.

Integrasi Gemini API membuat aplikasi mampu memberikan pengalaman yang lebih interaktif. Pengguna dapat bertanya langsung tentang workout, jadwal latihan, nutrisi, recovery, dan progress tracking. Backend proxy juga diterapkan agar API key tidak terekspos di frontend.

Secara keseluruhan, project ini menunjukkan bahwa Gen AI dapat diterapkan dalam aplikasi fitness untuk membantu personalisasi pengalaman pengguna. Walaupun masih berbentuk prototype, fitur yang dibangun sudah cukup untuk mendemonstrasikan alur utama smart fitness hub berbasis AI.

---

## Slide 29 - Demo Flow Presentasi

Urutan demo yang disarankan saat presentasi:

1. Buka landing page dan jelaskan konsep HYPEFIT AI FITNESS.
2. Tunjukkan navbar, hero section, dan visual utama.
3. Scroll ke AI Coach section dan jelaskan FitBot.
4. Scroll ke Pricing section dan tunjukkan paket Lite, Pro, dan Elite.
5. Klik Login dan masuk menggunakan credential demo.
6. Tampilkan dashboard dan jelaskan ringkasan performa.
7. Gunakan BMI module dengan contoh tinggi dan berat badan.
8. Buka Training page dan jelaskan isi program latihan.
9. Buka Nutrition page dan jalankan Diet Plan Generator.
10. Buka FitBot chatbot dan kirim pertanyaan fitness.
11. Pilih salah satu pricing plan dan buka athlete enrollment.
12. Submit form dan tunjukkan enrollment successful page.

Contoh pertanyaan demo untuk FitBot:

“Buatkan jadwal latihan 4 hari untuk fat loss.”

Contoh input diet plan:

Goal: Fat loss  
Preferensi: tinggi protein, nasi tetap boleh  
Kalori: 1800 kcal

---

## Slide 30 - Penutup / Q&A

Terima kasih.

Project: **HYPEFIT AI FITNESS**  
Smart Fitness Hub Berbasis Artificial Intelligence

Poin utama yang dapat ditekankan saat penutup:

- Website fitness berhasil dibuat dengan tampilan premium dan modern.
- Fitur AI chatbot berhasil diintegrasikan menggunakan Gemini API.
- API key dibuat lebih aman melalui backend proxy.
- Dashboard memiliki fitur tambahan seperti BMI calculation.
- Nutrition page memiliki diet plan generator berbasis LLM.
- Project sudah memiliki dokumentasi teknis dan functional prototype.

Silakan ajukan pertanyaan.

