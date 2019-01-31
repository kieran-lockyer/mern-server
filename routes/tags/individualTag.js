const Tags = require("../../models/TagModel")

module.exports = (req, res) => {
    Tags.find({ _id: req.params._id })
        .then(tag => res.json(tag))
        .catch(error =>
            res.status(500).json({
                error: error.message
            })
        )
}