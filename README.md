# Keshav Sharma — Developer Portfolio

A modern, minimalist, technology-focused developer portfolio website built with **Next.js App Router**, **React 19**, **TypeScript**, and **Tailwind CSS**. Designed to showcase full-stack engineering work, verified repositories, cybersecurity exploration, and analytical inquiry (mathematics and physics).

---

## 🌟 Highlights & Features

- **Personal Brand & Narrative**: Focused hero section, engineering philosophy, and first-principles mindset.
- **Categorized Technical Skills**: Honest presentation across Web Development, Programming Languages & Core Tech, Mathematics, Physics & Science, and Cybersecurity & Cryptography (no exaggerated progress bars).
- **Verified Projects & Placeholders**: Highlights real verified repositories (`SchoBase`, `Graphic Point`) from [Code-Keshav-1947](https://github.com/Code-Keshav-1947) with clearly labeled customizable placeholders for upcoming work.
- **Interdisciplinary Technical Interests**: Deep-dive section covering linear algebra, calculus, Lagrangian mechanics, quantum states, and post-quantum cryptography.
- **Verified GitHub Integration**: Direct links to public repositories, source code inspection, and profile highlights.
- **Interactive Contact**: One-click copy email button with visual confirmation, structured message form with automatic pre-filled `mailto:` integration, and timezone/availability status.
- **Accessible Dark & Light Mode**: Fluid theme toggle utilizing `useSyncExternalStore` with system preference detection and localStorage persistence.
- **Performance & SEO**: Fully pre-rendered static HTML, OpenGraph metadata, Twitter card tags, semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), and accessible keyboard navigation.
- **Modular Data Architecture**: All portfolio content is managed in a single central configuration file: `src/data/portfolioData.ts`.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (version 20 or higher recommended)
- npm, pnpm, or yarn

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Run Production Build Locally
```bash
npm run start
```

### 5. Check Code Quality & Types
```bash
npm run lint
npx tsc --noEmit
```

---

## 🛠️ How to Customize Your Portfolio

All personal information, projects, skills, and links are kept in a single, strictly typed data file:

👉 **[`src/data/portfolioData.ts`](file:///d:/my_portfolio/src/data/portfolioData.ts)**

### 1. Update Contact & Social Profiles
In `src/data/portfolioData.ts`, edit `portfolioData.personal`:
```typescript
personal: {
  name: "Keshav Sharma",
  handle: "Code-Keshav-1947",
  email: "manudeepaksharma2012@gmail.com",
  linkedinUrl: "https://linkedin.com/in/your-handle", // Replace placeholder
  twitterUrl: "https://x.com/your-handle",           // Replace placeholder
  location: "Baghpat, Uttar Pradesh, India",
  availability: "Available for freelance, full-time roles & technical collaborations",
  // ...
}
```

### 2. Add or Edit Projects
Add an entry to `portfolioData.projects`:
```typescript
{
  id: "my-project-id",
  title: "Project Name",
  tagline: "Short descriptive subtitle",
  description: "Detailed description of the project architecture and purpose.",
  category: "Full-Stack", // or "Backend / API", "Security / Cryptography", "Scientific / Simulation"
  tags: ["Python", "Django", "React", "PostgreSQL"],
  features: [
    "Key architecture point 1",
    "Key architecture point 2"
  ],
  repoUrl: "https://github.com/Code-Keshav-1947/your-repo",
  liveUrl: "https://your-demo-url.com", // Optional
  isVerified: true, // true shows a green "Verified" badge; false marks it as a customizable placeholder
  statusText: "Verified Public Repository"
}
```

### 3. Add or Modify Skills
Update `portfolioData.skills` in `src/data/portfolioData.ts`.

---

## 📦 Deployment Instructions

### Deploy to Vercel (Recommended)
1. Push your repository to GitHub (`git push origin main`).
2. Visit [Vercel](https://vercel.com) and log in with your GitHub account.
3. Click **"Add New Project"** and select `my_portfolio`.
4. Next.js is auto-detected. Click **Deploy**.

### Deploy to Netlify
1. Connect your repository on [Netlify](https://www.netlify.com).
2. Set Build Command to: `npm run build`
3. Set Publish directory to: `.next`

### Deploy to Render / Railway
1. Create a Web Service connected to your GitHub repository.
2. Build Command: `npm run build`
3. Start Command: `npm run start`

---

## 📂 Project Architecture

```
my_portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css          # Theme variables, glassmorphism, tech grid styles
│   │   ├── layout.tsx           # Root metadata, OpenGraph tags, dark mode class
│   │   └── page.tsx             # Main portfolio layout stitching all sections
│   ├── components/
│   │   ├── Navbar.tsx           # Sticky navigation, logo mark, mobile menu
│   │   ├── Hero.tsx             # Headline, CTAs, status badge, pillar pills
│   │   ├── About.tsx            # Approach narrative & core technical principles
│   │   ├── Skills.tsx           # Categorized skills grid with interactive filter tabs
│   │   ├── Projects.tsx         # Verified cards & placeholders with filter
│   │   ├── TechnicalInterests.tsx # Math, physics, cryptography deep-dive cards
│   │   ├── GitHubSection.tsx    # GitHub profile link & public repos showcase
│   │   ├── Contact.tsx          # Direct email copy button & mail thread launcher
│   │   ├── Footer.tsx           # Quick navigation, back-to-top, copyright
│   │   ├── ThemeToggle.tsx      # Accessible Dark / Light mode toggle
│   │   └── icons/
│   │       └── GitHubIcon.tsx   # Crisp, inline SVG GitHub logo mark
│   ├── data/
│   │   └── portfolioData.ts     # Centralized source of truth for all portfolio data
│   └── lib/
│       ├── db.ts                # TypeScript-safe database utility
│       └── utils.ts             # Styling utility helper
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies & scripts
└── tsconfig.json                # Strict TypeScript configuration
```

---

## 🛡️ License
Private project / portfolio repository of Keshav Sharma.
