const express = require('express')
const router = express.Router()

module.exports = (Tags, Photos) => {
    const photosContoller = require('../controllers/photosController')(Tags, Photos)

    router.get("/", photosContoller.paginatedFilter)

    router.get("/:_id", photosContoller.individualPhoto)

    router.get("/image/:_id", (req, res) => {
        res.status(200).sendFile(process.cwd() + `/db/images/${req.params._id}`)
    })

    router.delete('/:_id', photosContoller.deletePhoto)

    return router
}