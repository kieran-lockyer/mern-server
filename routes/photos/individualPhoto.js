const Photos = require('../../models/PhotoModel')

module.exports = (req, res) => {
    Photos.find({ _id: req.params._id })
        .then(photo => res.json(photo))
        .catch(error =>
            res.status(500).json({
                error: error.message
            })
        )
}