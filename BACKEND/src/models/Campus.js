const { createGalleryModel } = require("./createGalleryModel")

const Campus = createGalleryModel({
  tableName: "campus",
  nameField: "placeName",
  isEvent: false,
})

module.exports = Campus
