const Tags = require("../../models/TagModel")

module.exports = (req, res) => {
    console.log('fetching')
    Tags.find({ dateAdded: { $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000))) } })
        .then(tags => {
            result = (tags.length / 7).toFixed(1)
            res.json(result)
        })
}