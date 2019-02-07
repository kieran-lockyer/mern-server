const express = require('express')
const router = express.Router()

module.exports = (Tags, Photos) => {
    const photosContoller = require('../controllers/photosController')(Tags, Photos)

    // Returns a paginated llist of all the photos. 
    router.get("/", photosContoller.paginatedFilter)

    // Retrieves a single Photo Object from MLAB
    router.get("/:_id", photosContoller.individualPhoto)

    // sends the photo file from the /db/images folder
    router.get("/image/:_id", (req, res) => {
        res.status(200).sendFile(process.cwd() + `/db/images/${req.params._id}`)
    })

    // Deletes the Photo and all it's associated Tags
    router.delete('/:_id', photosContoller.deletePhoto)

    return router
}