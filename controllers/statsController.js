const collateStats = require('../services/collateStats')
const graphQuery = require('../services/graphQuery')

module.exports = (Tags, Photos) => {
    // returns a number of the average tags added per day over the last 7 days
    const avgTags = (req, res) => {
        Tags.find({ dateAdded: { $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000))) } })
            .then(tags => {
                result = (tags.length / 7).toFixed(1)
                res.status(200)
                res.json(result)
            }).catch(
                error => res.status(500).json({
                    error: error.message
                })
            )
    }

    // returns a number of the average photos added per day over the last 7 days
    const avgPhotos = (req, res) => {
        Photos.find({ dateAdded: { $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000))) } })
            .then(photos => {
                result = (photos.length / 7).toFixed(1)
                res.status(200)
                res.json(result)
            }).catch(
                error => res.status(500).json({
                    error: error.message
                })
            )
    }

    // returns a list of the top 5 most common tags in the database
    const popularTags = (req, res) => {
        Tags.aggregate([{ $unwind: "$label" }, { $sortByCount: "$label" }])
            .then(popTags => {
                popTags = popTags.slice(0, 5)
                res.status(200)
                res.json(popTags)
            }).catch(
                error => res.status(500).json({
                    error: error.message
                })
            )
    }

    // returns a list of the top 5 most common tags over the last 7 days
    const trendingTags = (req, res) => {
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
                res.status(200)
                res.json(popTags)
            }).catch(
                error => res.status(500).json({
                    error: error.message
                })
            )
    }

    // checks the query for model tags or photos and retrieves the data for that model
    const graphStats = async (req, res) => {
        if (req.query.model === 'tags') {
            // graphQuery runs the mongoose query, moved it to a seperate file as it's large to keep code dry.
            await Tags.aggregate(graphQuery(req.query.days)).then(dates => {
                result = collateStats(dates, req.query.days)
                res.status(200)
                res.json(result)
            })
        } else if (req.query.model === 'photos') {
            await Photos.aggregate(graphQuery(req.query.days)).then(dates => {
                result = collateStats(dates, req.query.days) //collateStates puts them into a formated array
                res.status(200)
                res.json(result)
            })
        } else {
            res.status(400)
        }
    }

    return {
        avgTags,
        avgPhotos,
        popularTags,
        trendingTags,
        graphStats
    }
}