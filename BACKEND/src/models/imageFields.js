function normalizeImage(image = {}) {
  const crypto = require("crypto")
  return {
    _id: image._id || image.id || crypto.randomUUID(),
    imageURL: image.imageURL?.trim() || "",
    description: image.description?.trim() || "",
  }
}

module.exports = { normalizeImage }
