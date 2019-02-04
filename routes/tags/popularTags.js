const Tags = require("../../models/TagModel")

module.exports = (req, res) => {
    Tags.aggregate([{ $unwind: "$label" }, { $sortByCount: "$label" }])
        .then(popTags => {
            popTags = popTags.slice(0, 5)
            res.json(popTags)
        })
}