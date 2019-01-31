const express = require("express")
const router = express.Router()
const paginatedFilter = require('./tags/paginatedFilter')
const individualTag = require('./tags/individualTag')
const graphStats = require('./tags/graphStats')
const trendingTags = require('./tags/trendingTags')
const popularTags = require('./tags/popularTags')
const avgTags = require('./tags/avgTags')
const imageFromTag = require('./tags/imageFromTag')
const deleteTag = require('./tags/deleteTag')
const relatedImages = require('./tags/relatedImages')

router.get("/", (req, res) => {
  paginatedFilter(req, res)
})

router.get("/:_id", (req, res) => {
  individualTag(req, res)
})

router.get("/stats/:n", (req, res) => {
  graphStats(req, res)
})

router.get("/stats/get/trendingtags", (req, res) => {
  trendingTags(req, res)
})

router.get("/stats/get/poptags", (req, res) => {
  popularTags(req, res)
})

router.get("/stats/get/avgtags", (req, res) => {
  avgTags(req, res)
})

router.get("/images/single/:_id", (req, res) => {
  imageFromTag(req, res)
})

router.get("/images/related/:tag", (req, res) => {
  relatedImages(req, res)
})

router.delete("/:_id", (req, res) => {
  deleteTag(req, res)
})

module.exports = router
