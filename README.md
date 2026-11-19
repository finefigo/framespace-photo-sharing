# 📸 FrameSpace · Campus Chronicles
### *A Visual Archive for JIS College Of Engineering*

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20CDN-3448C5?style=flat-square&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🌟 Overview

**FrameSpace (Campus Chronicles)** is a modern full-stack photo sharing and digital archiving platform built specifically for **JIS College Of Engineering**. It offers a living album celebrating campus architecture, annual cultural & technical festivals, departmental communities, and institutional milestones.

Designed with editorial typography and an intuitive user interface, FrameSpace pairs a public gallery with a secure, role-based administrative curation suite.

---

## ✨ Key Features

### 🏛️ Public Campus Archive
- **Landmarks & Spaces (`/mycampus`)**: High-resolution photo collections capturing campus architecture, labs, libraries, and scenic spots.
- **Festival & Event Albums (`/events`)**: Annual event chronicles organized by year (cultural fests, technical summits, sports meets).
- **Academic Departments (`/departments`)**: Collections highlighting faculty, student initiatives, and department activities.
- **Featured Carousel & Deep Zoom (`/finalImage`, `/onlyImage`)**: Full-screen photo view, caption inspection, and responsive carousel slides.
- **Live Connection Status**: Automatic health checks and real-time connectivity feedback for seamless user experience.

### 🛡️ Administrative Curation Suite
- **Secure Authentication**: JWT-based authentication delivered via secure HTTP-only cookies with automatic session refresh.
- **Domain-Verified Registration**: Administrator registration restricted to official institutional credentials (`@jiscollege.ac.in`).
- **Collection Management**: Create, rename, reorganize, and delete albums across Campus, Event, and Department categories.
- **Cloud Asset Management**: Direct image uploads via Multer to Cloudinary CDN, with automatic asset destruction on image deletion.
- **About Page CMS**: Dynamic management of institute milestones and history sections directly from the admin panel.

---

## 🏗️ Architecture & Tech Stack

```
               +--------------------------------------------+
               |          Browser / Client Device           |
               +--------------------------------------------+
                                     │
                                     ▼
        +──────────────────────────────────────────────────────────+
        |                 Frontend (React 18 + Vite)               |
        |  - Redux Toolkit (Gallery & About Slices)                |
        |  - React Router v6 (Public routes + Admin Guards)        |
        |  - Tailwind CSS + Custom Design System                   |
        +──────────────────────────────────────────────────────────+
                                     │
                                     │ REST APIs (JSON / Multipart)
                                     ▼
        +──────────────────────────────────────────────────────────+
        |               Backend (Node.js + Express)                |
        |  - Modular architecture (Admin, Auth, Gallery, About)    |
        |  - JWT Authentication & Cookie Security                  |
        |  - Multer upload processing & Error Handling             |
        +──────────────────────────────────────────────────────────+
                         │                          │
                         ▼                          ▼
        +─────────────────────────────+    +──────────────────────────+
        |        MySQL Database       |    |      Cloudinary CDN      |
        |  - Connection Pooling       |    |  - Auto compression      |
        |  - Schema Auto-Init         |    |  - Media delivery        |
        |  - JSON image storage       |    |  - Asset lifecycle cleanup|
        +─────────────────────────────+    +──────────────────────────+
```

### Technology Breakdown

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite 5, Redux Toolkit, React Router v6, Tailwind CSS, Axios, React Hot Toast, React Spinners |
| **Backend** | Node.js, Express 4, `mysql2/promise` (Connection Pool), JWT, Bcrypt, Multer, Cloudinary SDK |
| **Database** | MySQL 8.0+ (InnoDB, UTF8mb4 charset, JSON image columns) |
| **Media Hosting** | Cloudinary Image Cloud Storage |

---

## 📁 Repository Structure

```text
framespace-photo-sharing/
├── FRONTEND/                       # React 18 Single Page Application
│   ├── src/
│   │   ├── Admin/                  # Admin dashboard, login, upload, guards
│   │   ├── Components/             # Reusable cards, carousel, states, headers
│   │   ├── Layout/                 # Navigation header and footer
│   │   ├── Pages/                  # Home, About, Campus, Events, Departments
│   │   ├── Redux/                  # Store configuration and state slices
│   │   └── App.jsx                 # Route definitions & guards
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json                 # SPA rewrite configuration for Vercel
│
├── BACKEND/                        # Express API with MySQL persistence
│   ├── src/
│   │   ├── config/                 # MySQL pool, Cloudinary, and Env loader
│   │   ├── middleware/             # Auth guard, Multer upload, Error handler
│   │   ├── models/                 # MySQL model adapters & query helpers
│   │   │   ├── Admin.js            # Admin user queries & bcrypt hashing
│   │   │   ├── AboutSection.js     # Institute story CMS model
│   │   │   ├── Campus.js           # Campus gallery model
│   │   │   ├── Department.js       # Department gallery model
│   │   │   ├── Event.js            # Event gallery model (by year)
│   │   │   └── createGalleryModel.js # Unified MySQL gallery abstraction
│   │   ├── modules/
│   │   │   ├── about/              # About CMS controller & service
│   │   │   ├── admin/              # Admin account creation & profile
│   │   │   ├── auth/               # Login, JWT issuing, and logout
│   │   │   └── gallery/            # Image upload, rename, and deletion
│   │   ├── routes/                 # Express route composition
│   │   ├── utils/                  # AppError and standardized response helpers
│   │   ├── app.js                  # Express app setup & CORS policy
│   │   └── index.js                # Database connection & HTTP startup
│   ├── package.json
│   └── .env.example
│
└── README.md                       # Main repository documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure the following tools are installed on your machine:
- **Node.js** `>= 18.x`
- **npm** `>= 9.x`
- **MySQL Server** `>= 8.0` (or compatible cloud MySQL like PlanetScale / AWS RDS / Aiven)
- **Cloudinary Account** (Free tier works great)

---

### 1. Database Setup (MySQL)

Create a MySQL database for the application:

```sql
CREATE DATABASE framespace CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

> **Note:** The backend automatically runs `CREATE TABLE IF NOT EXISTS` for all required tables (`admin`, `about_section`, `campus`, `department`, `event`) upon startup!

---

### 2. Backend Setup

1. Open your terminal and navigate to the backend folder:
   ```bash
   cd BACKEND
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` file from the provided example:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `BACKEND/.env`:
   ```env
   PORT=5200
   
   # MySQL Connection (Connection URL or individual parameters)
   DB_URL=mysql://root:yourpassword@localhost:3306/framespace
   
   # Cloudinary Credentials (from Cloudinary Dashboard)
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Security
   JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters
   JWT_EXPIRES=1h
   COOKIE_SECURE=false
   
   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:5174
   ```

5. Start the backend development server:
   ```bash
   npm run dev
   ```

   The server will verify the database connection, ensure schema readiness, and run at `http://localhost:5200`.

---

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd FRONTEND
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Verify the backend API URL in `FRONTEND/.env`:
   ```env
   VITE_BACKEND_URL=http://localhost:5200
   ```

5. Start the Vite development server:
   ```bash
   npm run dev
   ```

   The application will be accessible at `http://localhost:5174` (or the port specified by Vite).

---

## 📡 API Reference

### Health Check
- `GET /health` — Check server status, service name, and timestamp.

### Public Gallery Endpoints
- `GET /user/campus` — Fetch all campus location collections and images.
- `GET /user/event` — Fetch all event collections (grouped by year).
- `GET /user/department` — Fetch all academic department collections.
- `GET /about` — Retrieve published "About JIS College Of Engineering" sections.

### Authentication Endpoints
- `POST /admin/auth/login` — Sign in with Registration Number & Password (sets HTTP-only cookie).
- `POST /admin/auth/logout` — Clear auth cookie.
- `GET /admin/auth/me` — Verify active administrator session.
- `POST /nit-dgp/admin` — Register an administrator account (`@jiscollege.ac.in` email validation).

### Admin Curatorial Endpoints *(Requires Authentication & ADMIN Role)*
- `POST /admin/:type` — Upload an image to a collection (multipart form with `imageURL` file, name, description, and optional year).
  - Supported `:type` values: `campus`, `events`, `departments`.
- `POST /admin/:type/:oldEventName/:eventName` — Rename a collection.
- `DELETE /admin/:type/:eventName/:objectID` — Remove an image from Cloudinary and database.
- `DELETE /admin/:type/collection/:collectionID` — Delete an entire collection and its Cloudinary assets.
- `POST /about` — Create an About section.
- `PUT /about/:id` — Update an About section.
- `DELETE /about/:id` — Remove an About section.

---

## 🚢 Deployment Guide

### Deploy Frontend (Vercel)
The `FRONTEND/vercel.json` file is pre-configured for Single Page Application routing:
1. Import repository into Vercel.
2. Set **Root Directory** to `FRONTEND`.
3. Set **Framework Preset** to `Vite`.
4. Add environment variable:
   - `VITE_BACKEND_URL=https://your-backend-domain.com`

### Deploy Backend (Render / Railway / VPS)
1. Deploy the `BACKEND` directory as a Node service.
2. Build command: `npm install`
3. Start command: `npm start`
4. Provide environment variables (`DB_URL`, `CLOUDINARY_*`, `JWT_SECRET`, `FRONTEND_URL`, `COOKIE_SECURE=true`).

---

## 🤝 Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes (`git commit -m "Add NewFeature"`).
4. Push to the branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the [ISC License](file:///h:/framespace/framespace-photo-sharing/BACKEND/package.json).

*Maintained for the JIS College Of Engineering Campus Community.*
