const express = require("express")
const router = express.Router()

module.exports = (Tags, Photos) => {
  const tagsController = require('../controllers/tagsController')(Tags, Photos)

  // Returns a paginated llist of all the photos. 
  router.get("/", tagsController.paginatedFilter)

  // Retrieves and individual tag.
  router.get("/:_id", tagsController.individualTag)

  // Retrieves a list of all the tags with that label name
  router.get("/related/:tag", tagsController.relatedImages)

  // Deletes a tag from MLAB and removes it's reference from the Photos.tags array.
  router.delete("/:_id", tagsController.deleteTag)

  return router
}