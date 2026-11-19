const crypto = require("crypto")
const { query } = require("../config/database")

function normalizeEventName(value = "") {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("en-US")
}

function parseImages(raw) {
  let list = raw
  if (typeof raw === "string") {
    try {
      list = JSON.parse(raw)
    } catch {
      list = []
    }
  }
  if (!Array.isArray(list)) list = []
  return list.map((img) => ({
    _id: img._id || img.id || crypto.randomUUID(),
    imageURL: img.imageURL,
    description: img.description,
  }))
}

function attachImageMethods(images) {
  images.id = function (id) {
    const found = this.find((img) => img._id === id || img.id === id)
    if (found) {
      found.deleteOne = () => {
        const index = this.indexOf(found)
        if (index !== -1) {
          this.splice(index, 1)
        }
      }
    }
    return found
  }
  return images
}

function wrapCollection(row, tableName, nameField, isEvent) {
  if (!row) return null

  const images = attachImageMethods(parseImages(row.image))

  const doc = {
    ...row,
    id: row.id,
    _id: row.id,
    image: images,
  }

  doc.save = async function () {
    const serializedImages = JSON.stringify(
      doc.image.map((img) => ({
        _id: img._id || img.id || crypto.randomUUID(),
        imageURL: img.imageURL,
        description: img.description,
      }))
    )

    if (isEvent) {
      const cleanEventName = doc.eventName?.trim().replace(/\s+/g, " ")
      const cleanKey = normalizeEventName(cleanEventName)
      await query(
        `UPDATE \`${tableName}\` SET eventName = ?, eventNameKey = ?, year = ?, image = ?, updatedAt = NOW() WHERE id = ?`,
        [cleanEventName, cleanKey, doc.year ?? null, serializedImages, doc.id]
      )
      doc.eventName = cleanEventName
      doc.eventNameKey = cleanKey
    } else {
      await query(
        `UPDATE \`${tableName}\` SET \`${nameField}\` = ?, image = ?, updatedAt = NOW() WHERE id = ?`,
        [doc[nameField]?.trim(), serializedImages, doc.id]
      )
    }

    doc.updatedAt = new Date()
    return doc
  }

  return doc
}

function createGalleryModel({ tableName, nameField, isEvent = false }) {
  const model = {
    find() {
      const exec = async () => {
        const rows = await query(`SELECT * FROM \`${tableName}\` ORDER BY updatedAt DESC`)
        return rows.map((row) => wrapCollection(row, tableName, nameField, isEvent))
      }

      const promise = exec()
      promise.sort = function () {
        return exec()
      }
      return promise
    },

    async findOne(filter = {}) {
      if (isEvent) {
        if (filter.eventNameKey !== undefined) {
          const hasYear = filter.year !== undefined && filter.year !== null && filter.year !== ""
          const sql = hasYear
            ? `SELECT * FROM \`${tableName}\` WHERE eventNameKey = ? AND year = ? LIMIT 1`
            : `SELECT * FROM \`${tableName}\` WHERE eventNameKey = ? AND year IS NULL LIMIT 1`
          const params = hasYear ? [filter.eventNameKey, Number(filter.year)] : [filter.eventNameKey]
          const rows = await query(sql, params)
          return rows[0] ? wrapCollection(rows[0], tableName, nameField, isEvent) : null
        }
      }

      if (filter[nameField] !== undefined) {
        const rows = await query(
          `SELECT * FROM \`${tableName}\` WHERE \`${nameField}\` = ? LIMIT 1`,
          [filter[nameField]?.trim()]
        )
        return rows[0] ? wrapCollection(rows[0], tableName, nameField, isEvent) : null
      }

      if (filter.id || filter._id) {
        return model.findById(filter.id || filter._id)
      }

      return null
    },

    async findById(id) {
      if (!id) return null
      const rows = await query(`SELECT * FROM \`${tableName}\` WHERE id = ? LIMIT 1`, [id])
      return rows[0] ? wrapCollection(rows[0], tableName, nameField, isEvent) : null
    },

    async create(details) {
      const id = crypto.randomUUID()
      const rawImages = details.image || []
      const initialImages = Array.isArray(rawImages) ? rawImages : []
      const serializedImages = JSON.stringify(
        initialImages.map((img) => ({
          _id: img._id || img.id || crypto.randomUUID(),
          imageURL: img.imageURL,
          description: img.description,
        }))
      )

      if (isEvent) {
        const cleanEventName = details.eventName?.trim().replace(/\s+/g, " ")
        const cleanKey = normalizeEventName(cleanEventName)
        const year = details.year !== undefined && details.year !== null && details.year !== ""
          ? Number(details.year)
          : null
        await query(
          `INSERT INTO \`${tableName}\` (id, eventName, eventNameKey, year, image, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
          [id, cleanEventName, cleanKey, year, serializedImages]
        )
        return model.findById(id)
      }

      const nameVal = details[nameField]?.trim()
      await query(
        `INSERT INTO \`${tableName}\` (id, \`${nameField}\`, image, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())`,
        [id, nameVal, serializedImages]
      )
      return model.findById(id)
    },

    async findByIdAndDelete(id) {
      const doc = await model.findById(id)
      if (!doc) return null
      await query(`DELETE FROM \`${tableName}\` WHERE id = ?`, [id])
      return doc
    },
  }

  if (isEvent) {
    model.normalizeName = normalizeEventName
  }

  return model
}

module.exports = { createGalleryModel, normalizeEventName }
