const crypto = require("crypto")
const { query } = require("../config/database")

function wrapSection(row) {
  if (!row) return null
  const section = {
    ...row,
    id: row.id,
    _id: row.id,
    order: row.order ?? 0,
  }

  section.save = async function () {
    await query(
      "UPDATE about_section SET eyebrow = ?, title = ?, content = ?, `order` = ?, updatedAt = NOW() WHERE id = ?",
      [
        section.eyebrow !== undefined ? section.eyebrow : row.eyebrow,
        section.title !== undefined ? section.title : row.title,
        section.content !== undefined ? section.content : row.content,
        section.order !== undefined ? section.order : (row.order ?? 0),
        section.id,
      ]
    )
    return wrapSection({
      ...row,
      eyebrow: section.eyebrow,
      title: section.title,
      content: section.content,
      order: section.order,
      updatedAt: new Date(),
    })
  }

  return section
}

const AboutSection = {
  find() {
    let orderDirection = "ASC"
    const exec = async () => {
      const rows = await query(`SELECT * FROM about_section ORDER BY \`order\` ${orderDirection}, createdAt ASC`)
      return rows.map(wrapSection)
    }

    const promise = exec()
    promise.sort = function (criteria = {}) {
      if (criteria.order === -1 || criteria.order === "desc") {
        orderDirection = "DESC"
      } else {
        orderDirection = "ASC"
      }
      return exec()
    }
    return promise
  },

  findOne() {
    let orderDirection = "ASC"
    const exec = async () => {
      const rows = await query(`SELECT * FROM about_section ORDER BY \`order\` ${orderDirection} LIMIT 1`)
      return rows[0] ? wrapSection(rows[0]) : null
    }

    const promise = exec()
    promise.sort = function (criteria = {}) {
      if (criteria.order === -1 || criteria.order === "desc") {
        orderDirection = "DESC"
      } else {
        orderDirection = "ASC"
      }
      return exec()
    }
    return promise
  },

  async findById(id) {
    if (!id) return null
    const rows = await query("SELECT * FROM about_section WHERE id = ? LIMIT 1", [id])
    return rows[0] ? wrapSection(rows[0]) : null
  },

  async create(details) {
    const id = crypto.randomUUID()
    const eyebrow = details.eyebrow ? details.eyebrow.trim() : null
    const title = details.title.trim()
    const content = details.content.trim()
    const order = Number.isFinite(Number(details.order)) ? Number(details.order) : 0

    await query(
      "INSERT INTO about_section (id, eyebrow, title, content, `order`, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
      [id, eyebrow, title, content, order]
    )

    return wrapSection({
      id,
      eyebrow,
      title,
      content,
      order,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  },

  async findByIdAndDelete(id) {
    const existing = await this.findById(id)
    if (!existing) return null
    await query("DELETE FROM about_section WHERE id = ?", [id])
    return existing
  },
}

module.exports = AboutSection
