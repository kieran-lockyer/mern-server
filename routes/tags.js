const express = require("express")
const router = express.Router()

module.exports = (Tags) => {
  const tagsController = require('../controllers/tagsController')(Tags)

  router.get("/", tagsController.paginatedFilter)

  router.get("/:_id", tagsController.individualTag)

  router.get("/image/:_id", tagsController.imageFromTag)

  router.get("/related/:tag", tagsController.relatedImages)

  router.delete("/:_id", tagsController.deleteTag)

  return router
}