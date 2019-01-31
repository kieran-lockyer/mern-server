const Tags = require("../../models/TagModel")

module.exports = (req, res) => {
    Tags.findByIdAndRemove(req.params._id)
        .then(() => res.send(204))
        .catch(error =>
            res.status(500).json({
                error: error.message
            })
        )
}