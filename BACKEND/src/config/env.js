const dotenv = require("dotenv")

dotenv.config()

const required = [
  "JWT_SECRET",
  "CLOUDINARY_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
]

const missing = required.filter((key) => !process.env[key])
if (missing.length) {
  throw new Error(`Missing required environment variables: ${missing.join(", ")}`)
}

function parseDatabaseConfig(dbUrl) {
  if (dbUrl && (dbUrl.startsWith("mysql://") || dbUrl.startsWith("mysql2://"))) {
    try {
      const parsed = new URL(dbUrl)
      return {
        host: parsed.hostname || "localhost",
        port: Number(parsed.port) || 3306,
        user: decodeURIComponent(parsed.username || "root"),
        password: decodeURIComponent(parsed.password || ""),
        database: parsed.pathname ? parsed.pathname.replace(/^\//, "") : "framespace",
      }
    } catch {
      // Fallback below
    }
  }
  return {
    host: process.env.MYSQL_HOST || "localhost",
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "framespace",
  }
}

const toBoolean = (value) => String(value).toLowerCase() === "true"

module.exports = {
  port: Number(process.env.PORT) || 5200,
  databaseUrl: process.env.DB_URL,
  mysql: parseDatabaseConfig(process.env.DB_URL),
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES || "1h",
  cookieSecure: toBoolean(process.env.COOKIE_SECURE),
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5174",
  cloudinary: {
    cloudName: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
}
