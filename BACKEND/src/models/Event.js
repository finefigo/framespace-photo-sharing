const { createGalleryModel } = require("./createGalleryModel")

const Event = createGalleryModel({
  tableName: "event",
  nameField: "eventName",
  isEvent: true,
})

module.exports = Event
