const express = require('express')
const router = express.Router()

module.exports = (Photos) => {
    const photosContoller = require('../controllers/photosController')(Photos)

    router.get("/", photosContoller.paginatedFilter)

    router.get("/:_id", photosContoller.individualPhoto)

    router.get("/image/:_id", (req, res) => {
        res.sendFile(process.cwd() + `/db/images/${req.params._id}`)
    })

    router.delete('/:_id', photosContoller.deletePhoto)

    return router
}