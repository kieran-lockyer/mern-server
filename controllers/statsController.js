const collateStats = require('../services/collateStats')
const graphQuery = require('../services/graphQuery')

module.exports = (Tags, Photos) => {
    const avgTags = (req, res) => {
        Tags.find({ dateAdded: { $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000))) } })
            .then(tags => {
                result = (tags.length / 7).toFixed(1)
                res.json(result)
            }).catch(
                error => res.status(500).json({
                    error: error.message
                })
            )
    }

    const avgPhotos = (req, res) => {
        Photos.find({ dateAdded: { $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000))) } })
            .then(photos => {
                result = (photos.length / 7).toFixed(1)
                res.json(result)
            }).catch(
                error => res.status(500).json({
                    error: error.message
                })
            )
    }

    const popularTags = (req, res) => {
        Tags.aggregate([{ $unwind: "$label" }, { $sortByCount: "$label" }])
            .then(popTags => {
                popTags = popTags.slice(0, 5)
                res.json(popTags)
            }).catch(
                error => res.status(500).json({
                    error: error.message
                })
            )
    }

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
                res.json(popTags)
            }).catch(
                error => res.status(500).json({
                    error: error.message
                })
            )
    }

    const graphStats = async (req, res) => {
        if (req.query.model === 'tags') {
            await Tags.aggregate(graphQuery(req.query.days)).then(dates => {
                result = collateStats(dates, req.query.days)
                res.send(result)
            })
        } else if (req.query.model === 'photos') {
            await Photos.aggregate(graphQuery(req.query.days)).then(dates => {
                result = collateStats(dates, req.query.days)
                res.send(result)
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