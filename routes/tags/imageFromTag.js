const Tags = require("../../models/TagModel")

module.exports = (req, res) => {
    Tags.find({ "label": req.params.tag })
        .then(photos => res.json(photos))
        .catch(error =>
            res.status(500).json({
                error: error.message
            })
        )
}