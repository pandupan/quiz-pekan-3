# 📝 Quiz Pekan 3 — Interactive Learning App

Aplikasi **kuis interaktif** dan **journaling** sebagai bagian dari program bootcamp pembelajaran. Proyek ini juga mencakup API notes untuk fitur CRUD catatan pribadi.

## ✨ Fitur

- **Hero Section** — Halaman pembuka dengan tema mood
- **Quotes** — Koleksi kutipan motivasi untuk memulai sesi
- **Mood Tracker** — Catat suasana hati harian
- **Journaling** — Tulis jurnal dan refleksi harian
- **Notes API** — REST API untuk CRUD catatan:
  - `GET /api/notes` — Ambil semua catatan
  - `POST /api/notes/add` — Tambah catatan baru
  - `PATCH /api/notes/edit/[id]` — Edit catatan
  - `DELETE /api/notes/delete/[id]` — Hapus catatan
- **Dialog Modal** — UI dialog untuk interaksi pengguna

## 🛠️ Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| **Framework** | Next.js (Pages + App Router hybrid) |
| **Styling** | Tailwind CSS |
| **UI Library** | Chakra UI, shadcn/ui (Radix) |
| **Animation** | Framer Motion |
| **Icons** | Lucide React |
| **Database** | File-based / localStorage |

## 📁 Struktur Proyek

```
├── app/
│   └── globals.css
├── pages/
│   ├── api/
│   │   ├── hello.ts
│   │   └── notes/
│   │       ├── [id].js
│   │       ├── add.js
│   │       ├── delete/[id].js
│   │       └── edit/[id].js
│   ├── _app.tsx
│   └── _document.tsx
├── components/
│   ├── layouts/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── HeroSection.tsx
│   │   ├── MoodSection.tsx
│   │   ├── QuotesSection.tsx
│   │   └── JournalSection.jsx
│   └── ui/
│       └── dialog.tsx
└── hooks/
    ├── useMutation.js
    └── useQueries.js
```

## 🚀 Cara Menjalankan

```bash
npm install
npm run dev
```

## 📄 Lisensi

MIT License — Proyek bootcamp

---

> Oleh [Pandu Pangestu](https://github.com/pandupan)
