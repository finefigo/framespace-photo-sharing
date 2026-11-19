const mysql = require("mysql2/promise")
const env = require("./env")

let pool = null

function getPool() {
  if (!pool) {
    if (env.databaseUrl && (env.databaseUrl.startsWith("mysql://") || env.databaseUrl.startsWith("mysql2://"))) {
      pool = mysql.createPool(env.databaseUrl)
    } else {
      pool = mysql.createPool({
        host: env.mysql.host,
        port: env.mysql.port,
        user: env.mysql.user,
        password: env.mysql.password,
        database: env.mysql.database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      })
    }
  }
  return pool
}

async function query(sql, params = []) {
  const [rows] = await getPool().query(sql, params)
  return rows
}

async function initSchema() {
  const p = getPool()

  await p.query(`
    CREATE TABLE IF NOT EXISTS admin (
      id VARCHAR(36) PRIMARY KEY,
      firstName VARCHAR(100) NOT NULL,
      lastName VARCHAR(100) NOT NULL,
      role ENUM('ADMIN', 'USER') DEFAULT 'ADMIN',
      year VARCHAR(50) NOT NULL,
      mobileNumber VARCHAR(20) NOT NULL UNIQUE,
      rollNo VARCHAR(50) NOT NULL,
      regNo VARCHAR(50) NOT NULL UNIQUE,
      email VARCHAR(150) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `)

  await p.query(`
    CREATE TABLE IF NOT EXISTS about_section (
      id VARCHAR(36) PRIMARY KEY,
      eyebrow VARCHAR(100) NULL,
      title VARCHAR(200) NOT NULL,
      content TEXT NOT NULL,
      \`order\` INT DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `)

  await p.query(`
    CREATE TABLE IF NOT EXISTS campus (
      id VARCHAR(36) PRIMARY KEY,
      placeName VARCHAR(255) NOT NULL UNIQUE,
      image JSON NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `)

  await p.query(`
    CREATE TABLE IF NOT EXISTS department (
      id VARCHAR(36) PRIMARY KEY,
      departmentName VARCHAR(255) NOT NULL UNIQUE,
      image JSON NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `)

  await p.query(`
    CREATE TABLE IF NOT EXISTS event (
      id VARCHAR(36) PRIMARY KEY,
      eventName VARCHAR(255) NOT NULL,
      eventNameKey VARCHAR(255) NOT NULL,
      year INT NULL,
      image JSON NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY unique_event_year (eventNameKey, year)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `)
}

async function connectDatabase() {
  const p = getPool()
  const connection = await p.getConnection()
  try {
    await initSchema()
    console.log("Database connected (MySQL)")
  } finally {
    connection.release()
  }
}

connectDatabase.getPool = getPool
connectDatabase.query = query

module.exports = connectDatabase
