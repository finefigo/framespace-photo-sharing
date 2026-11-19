const { createGalleryModel } = require("./createGalleryModel")

const Department = createGalleryModel({
  tableName: "department",
  nameField: "departmentName",
  isEvent: false,
})

module.exports = Department
