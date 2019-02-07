const express = require('express')
const router = express.Router()

module.exports = (Tags, Photos) => {
    const statsController = require('../controllers/statsController')(Tags, Photos)

    // checks the query for model tags or photos and retrieves the data for that model
    router.get("/", statsController.graphStats)

    // returns a list of the top 5 most common tags over the last 7 days
    router.get("/trendingtags", statsController.trendingTags)

    // returns a list of the top 5 most common tags in the database
    router.get("/poptags", statsController.popularTags)

    // returns a number of the average tags added per day over the last 7 days
    router.get("/avgtags", statsController.avgTags)

    // returns a number of the average photos added per day over the last 7 days
    router.get("/avgphotos", statsController.avgPhotos)

    return router
}