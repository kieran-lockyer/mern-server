const Tags = require("../../models/TagModel")

module.exports = (req, res) => {
    Tags.find({ "_id": req.params._id })
        .then(photos => res.json(photos))
        .catch(error =>
            res.status(500).json({
                error: error.message
            })
        )
}