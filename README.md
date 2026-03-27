<div align="center">

# ✨ Resumind

### AI-Powered ATS Resume Scoring Platform

**Instantly analyze your resume against any job description and get actionable, AI-driven feedback to beat Applicant Tracking Systems.**

[![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=flat-square&logo=reactrouter)](https://reactrouter.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?style=flat-square)](https://gsap.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)

</div>

---

## 📌 What is Resumind?

Resumind is a modern SaaS web application that simulates an enterprise **Applicant Tracking System (ATS)** scan on your resume. It uses AI to parse your resume PDF, compare it against a job description you provide, and return a detailed score with:

- ✅ An overall ATS compatibility score (0–100)
- 📊 Section-by-section breakdown (skills, experience, education, etc.)
- 🔑 Keyword match analysis vs. the job description
- 💡 Tailored suggestions to improve your chances

> **75% of resumes are rejected before a human ever sees them.** Resumind helps you beat the bots.

---

## 🚀 Features

| Feature | Description |
|---|---|
| **PDF Upload** | Drag-and-drop or click to upload your resume as a PDF |
| **Job Description Matching** | Paste any JD to compare keywords and context |
| **AI Scoring Engine** | GPT-powered ATS simulation gives you a real score |
| **ATS Breakdown** | Detailed section scores with specific suggestions |
| **Resume Dashboard** | Track all past analyses and monitor improvement |
| **Glassmorphism UI** | Award-winning Awwwards-inspired premium design |
| **Cloud Storage** | All scans saved to your Puter.com account — no sign-up required |

---

## 🖥️ Pages

- **`/`** — Landing page with hero section, features, and stats
- **`/upload`** — Upload your resume and enter job details for analysis
- **`/dashboard`** — View all your past resume scans with scores and filters
- **`/resume/:id`** — Detailed split-view ATS breakdown for a specific resume
- **`/about`** — Visual explainer of how ATS systems work

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React Router v7** | Full-stack routing + SSR framework |
| **TypeScript** | Type safety throughout |
| **Tailwind CSS v4** | Utility-first styling with custom glassmorphism utilities |
| **GSAP + ScrollTrigger** | Scroll-based and entrance animations |
| **Puter.js** | Serverless AI (GPT-4o), file storage, and key-value DB |
| **react-dropzone** | Drag-and-drop PDF upload |
| **pdf.js** | PDF thumbnail rendering |
| **Lucide React** | Icon library |
| **Zustand** | Global auth/state management |

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### 1. Clone the repo
```bash
git clone https://github.com/your-username/resumind.git
cd resumind
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the dev server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 🔑 Authentication

Resumind uses **[Puter.com](https://puter.com)** as a zero-config backend — no database or API keys required. Users authenticate with their free Puter account (or it auto-creates one). All resume data is stored privately in the user's own Puter cloud storage.

---

## 📁 Project Structure

```
app/
├── components/
│   ├── Navbar.tsx         # Floating glassmorphism navbar
│   ├── FileUploader.tsx   # Drag-and-drop upload area
│   ├── ResumeCard.tsx     # Card component for dashboard grid
│   ├── ScoreCircle.tsx    # Animated SVG score ring
│   ├── Summary.tsx        # ATS summary panel
│   ├── ATS.tsx            # ATS keyword breakdown
│   ├── Details.tsx        # Section-wise feedback with accordion
│   └── Accordion.tsx      # Animated accordion component
├── routes/
│   ├── home.tsx           # Landing page
│   ├── upload.tsx         # Upload + analysis flow
│   ├── dashboard.tsx      # Resume portfolio dashboard
│   ├── resume.tsx         # Resume detail / ATS breakdown
│   └── about.tsx          # How ATS works explainer
├── lib/
│   └── puter.ts           # Puter SDK store (Zustand)
├── app.css                # Global design system + utilities
└── root.tsx               # App shell + grain overlay
```

---

## 📜 License

MIT — free to use and modify.

---

<div align="center">
  Built with ❤️ by <strong>Rohan</strong>
</div>
