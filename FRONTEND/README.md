# 💻 Campus Chronicles · Frontend Application
### *User Interface & Digital Archive for JIS College Of Engineering*

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.2-764ABC?style=flat-square&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📖 Overview

The FrameSpace Frontend is a fast, responsive Single Page Application (SPA) built with **React 18**, **Vite**, **Redux Toolkit**, and **Tailwind CSS**. It delivers an immersive, editorial viewing experience for the JIS College Of Engineering visual archives alongside a comprehensive administrative dashboard for managing photo collections.

---

## 🎨 Key Features

- **Public Gallery Pages**:
  - **Home (`/`)**: Hero banner, stats counter, featured image carousel, category quick-links.
  - **Campus (`/mycampus`)**: Landmark and architecture gallery.
  - **Events (`/events`)**: Event cards filterable by calendar year.
  - **Departments (`/departments`)**: Academic community archives.
  - **Detailed View (`/finalImage`, `/onlyImage`)**: Full-screen photo inspection and high-res lightbox.
  - **About (`/aboutUs`)**: Institute history and milestone narrative.
- **Admin Dashboard (`/admin`)**:
  - Secure login (`/admin/login`) and domain-validated registration (`/admin/register`).
  - Route guarding with `AdminGuard` component.
  - Interactive photo upload modal supporting preview and description tags.
  - Album curation, renaming, image removal, and About page content management.
- **Resilient UI States**:
  - Custom spinners, empty states, and error retry handlers.
  - Live backend connection health monitor (`ConnectionStatus`).

---

## 🛠️ Environment Configuration

Create a `.env` file in this directory based on `.env.example`:

```env
VITE_BACKEND_URL=http://localhost:5200
```

---

## 🚀 Available Scripts

```bash
# Start Vite development server with Hot Module Replacement
npm run dev

# Compile production-ready bundle into dist/
npm run build

# Preview production build locally
npm run preview

# Run ESLint validation
npm run lint
```

---

## 🚢 Deploy to Vercel

Use these project settings in your Vercel Dashboard:

- **Root Directory**: `FRONTEND`
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

Add the environment variable:
```env
VITE_BACKEND_URL=https://your-deployed-backend.example.com
```

The included `vercel.json` ensures client-side routes (e.g. `/events`, `/admin/login`) are rewritten to `index.html` so React Router can handle client routing properly.
