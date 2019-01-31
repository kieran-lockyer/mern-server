const Tags = require("../../models/TagModel")

module.exports = (req, res) => {
    console.log('fetching')
    Tags.aggregate([
        {
            $match: {
                dateAdded:
                {
                    $gte:
                        new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))
                }
            }
        }, {
            $sortByCount: "$label"
        }])
        .then(popTags => {
            popTags = popTags.slice(0, 5)
            res.json(popTags)
        })
}