const express = require("express")
const router = express.Router()

module.exports = (Tags, Photos) => {
  const tagsController = require('../controllers/tagsController')(Tags, Photos)

  router.get("/", tagsController.paginatedFilter)

  router.get("/:_id", tagsController.individualTag)

  router.get("/related/:tag", tagsController.relatedImages)

  router.delete("/:_id", tagsController.deleteTag)

  return router
}