const Photos = require('../../models/PhotoModel')

module.exports = (req, res) => {
    Photos.find({ dateAdded: { $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000))) } })
        .then(photos => {
            result = (photos.length / 7).toFixed(1)
            res.json(result)
        })
}