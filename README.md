# EduTrack - Student Management App

A **mobile-first, fully responsive** Student Management Web Application built with vanilla HTML5, CSS3 and JavaScript. No frameworks, no build tools — zero dependencies, pure performance.

## 🔗 Live Demo
Deployed on Vercel: *(URL will appear after first deployment)*

## 📱 Features

| Page | Features |
|------|----------|
| 🔐 **Login** | Student ID / Email sign-in, demo quick-login |
| 📊 **Dashboard** | GPA card, degree progress, stats grid, deadlines |
| 📚 **Courses** | Search, enroll/drop courses, progress bars, syllabus modal |
| 📈 **Results** | Semester grades, GPA calculator/simulator |
| 👤 **Profile** | Edit personal info, dark mode toggle, settings |

## 🚀 Deploy on Vercel

### Method 1: One-Click from GitHub
1. Go to **[vercel.com/new](https://vercel.com/new)**
2. Click **"Import Git Repository"**
3. Select `adebayojimoh681-collab/student-management-app`
4. Click **"Deploy"** — done! No build settings needed.

### Method 2: Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

## 🏃 Run Locally

Simply open `index.html` in any browser — **no server required!**

```bash
# Or serve locally with the included PowerShell server
powershell -ExecutionPolicy Bypass -File server.ps1
# Then open: http://localhost:3000
```

## 📂 Project Structure

```
student-management-app/
├── index.html        # App shell, all views & modals
├── styles.css        # Mobile-first CSS, dark/light theme
├── app.js            # State management, routing, logic
├── vercel.json       # Vercel deployment config
├── package.json      # Project metadata
└── README.md         # This file
```

## 🛠️ Tech Stack
- **HTML5** — Semantic markup, PWA meta tags
- **CSS3** — Custom Properties (CSS Variables), Flexbox, Grid, Animations
- **Vanilla JS** — State machine, LocalStorage persistence, SPA routing

## 📄 License
MIT License — Free to use and modify.
