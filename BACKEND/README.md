# ⚙️ Campus Chronicles · Backend API
### *REST API & Persistence Engine for JIS College Of Engineering Visual Archive*

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20CDN-3448C5?style=flat-square&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

---

## 📖 Architecture & Features

The FrameSpace Backend is built using Node.js, Express, MySQL, and Cloudinary. It powers:
- **Public endpoints** for retrieving categorized campus photo collections and history.
- **Admin authentication** using encrypted passwords (`bcrypt`) and signed JSON Web Tokens (JWT) stored in HTTP-only cookies.
- **Role-based middleware** enforcing administrator authorizations.
- **Multipart file streaming** with Multer and Cloudinary CDN storage.
- **MySQL Connection Pooling** via `mysql2/promise` with automatic schema generation.

---

## 📁 Directory Structure

```text
src/
├── config/
│   ├── cloudinary.js   # Cloudinary SDK credentials & uploader
│   ├── database.js     # MySQL connection pool & automatic table schema initialization
│   └── env.js          # Environment variable parser with MySQL URL support
├── middleware/
│   ├── auth.js         # JWT cookie verifier (requireAuth) & role guard (requireAdmin)
│   ├── errorHandler.js # Centralized error handler with MySQL ER_DUP_ENTRY handling
│   └── upload.js       # Multer multipart form-data image upload handler
├── models/
│   ├── Admin.js        # Admin credentials, registration & bcrypt password hashing
│   ├── AboutSection.js # Milestones & history model
│   ├── Campus.js       # Campus landmarks gallery collection model
│   ├── Department.js   # Academic departments gallery collection model
│   ├── Event.js        # Annual events gallery collection model (grouped by year)
│   ├── createGalleryModel.js # Unified MySQL query abstraction & JSON image serializer
│   └── imageFields.js  # Image normalization & validation helpers
├── modules/
│   ├── about/          # About section CRUD operations
│   ├── admin/          # Administrator registration & profile
│   ├── auth/           # Login authentication, token generation & logout
│   └── gallery/        # Media uploads, renaming, and asset lifecycle deletions
├── routes/
│   └── index.js        # Top-level API router composition
├── utils/
│   ├── AppError.js     # Custom application error class with HTTP status codes
│   ├── asyncHandler.js # Async wrapper to forward unhandled rejections to error handler
│   └── response.js     # Standardized JSON response envelope
├── app.js              # Express app, CORS configuration, security headers
└── index.js            # Database connection check and HTTP server bootstrap
```

---

## 🛠️ Environment Configuration

Create a `.env` file in this directory based on `.env.example`:

```env
PORT=5200

# MySQL Connection (Connection URL or individual parameters)
DB_URL=mysql://root:password@localhost:3306/framespace

# Cloudinary Storage
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Security & Sessions
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES=1h
COOKIE_SECURE=false

# Client Integration
FRONTEND_URL=http://localhost:5174
```

---

## 🚀 Available Scripts

```bash
# Start development server with nodemon auto-restart
npm run dev

# Start production server
npm start

# Run syntax and static check
npm run check
```

---

## 🗄️ Database Schemas (MySQL)

On startup, `src/config/database.js` automatically creates the required tables if they do not exist:
- **`admin`**: Stores administrator accounts (`id`, `firstName`, `lastName`, `email`, `regNo`, `password`, `role`).
- **`about_section`**: Stores institutional story and milestone sections (`id`, `title`, `content`, `order`).
- **`campus`**: Stores campus place collections (`id`, `placeName`, `image` JSON).
- **`department`**: Stores department albums (`id`, `departmentName`, `image` JSON).
- **`event`**: Stores annual festival albums with unique `(eventNameKey, year)` indexes (`id`, `eventName`, `eventNameKey`, `year`, `image` JSON).
