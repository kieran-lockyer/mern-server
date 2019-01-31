const express = require('express')
const router = express.Router()
const paginatedFilter = require('./photos/paginatedFilter')
const individualPhoto = require('./photos/individualPhoto')
const deletePhoto = require('./photos/deletePhoto')
const graphStats = require('./photos/graphStats')
const avgPhotos = require('./photos/avgPhotos')

router.get("/", (req, res) => {
    paginatedFilter(req, res)
})

router.get("/:_id", (req, res) => {
    individualPhoto(req, res)
})

router.get("/image/:_id", (req, res) => {
    res.sendFile(process.cwd() + `/db/images/${req.params._id}`)
})

router.delete('/:id', (req, res) => {
    deletePhoto(req, res)
})

router.get("/stats/:n", async (req, res) => {
    graphStats(req, res)
})

router.get("/stats/get/avgphotos", (req, res) => {
    avgPhotos(req, res)
})

module.exports = router