const bcrypt = require("bcrypt")
const crypto = require("crypto")
const { query } = require("../config/database")

function formatAdmin(row, includePassword = false) {
  if (!row) return null
  const admin = {
    ...row,
    id: row.id,
    _id: row.id,
  }
  if (!includePassword) {
    delete admin.password
  }
  return admin
}

async function findByReg(regNo, includePassword = false) {
  if (!regNo) return null
  const rows = await query(
    "SELECT * FROM admin WHERE regNo = ? LIMIT 1",
    [regNo.trim().toUpperCase()]
  )
  return formatAdmin(rows[0], includePassword)
}

async function findById(id, includePassword = false) {
  if (!id) return null
  const rows = await query(
    "SELECT * FROM admin WHERE id = ? LIMIT 1",
    [id]
  )
  return formatAdmin(rows[0], includePassword)
}

const Admin = {
  findOne(filter = {}) {
    let includePassword = false
    const exec = async () => {
      if (filter.regNo) {
        return findByReg(filter.regNo, includePassword)
      }
      if (filter.id || filter._id) {
        return findById(filter.id || filter._id, includePassword)
      }
      return null
    }

    const promise = exec()
    promise.select = function (fields) {
      if (typeof fields === "string" && fields.includes("password")) {
        includePassword = true
      }
      return exec()
    }
    return promise
  },

  async create(details) {
    const id = crypto.randomUUID()
    const firstName = details.firstName?.trim()
    const lastName = details.lastName?.trim()
    const role = details.role || "ADMIN"
    const year = details.year?.trim()
    const mobileNumber = details.mobileNumber?.trim()
    const rollNo = details.rollNo?.trim()
    const regNo = details.regNo?.trim().toUpperCase()
    const email = details.email?.trim().toLowerCase()
    const hashedPassword = await bcrypt.hash(details.password, 12)

    await query(
      `INSERT INTO admin (id, firstName, lastName, role, year, mobileNumber, rollNo, regNo, email, password, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [id, firstName, lastName, role, year, mobileNumber, rollNo, regNo, email, hashedPassword]
    )

    return findById(id, false)
  },

  async findOneAndDelete(filter = {}) {
    const admin = await this.findOne(filter)
    if (!admin) return null
    await query("DELETE FROM admin WHERE id = ?", [admin.id])
    return admin
  },
}

module.exports = Admin
