const express = require('express')
const router = express.Router()

module.exports = (Tags, Photos) => {
    const statsController = require('../controllers/statsController')(Tags, Photos)

    router.get("/", statsController.graphStats)

    router.get("/trendingtags", statsController.trendingTags)

    router.get("/poptags", statsController.popularTags)

    router.get("/avgtags", statsController.avgTags)

    router.get("/avgphotos", statsController.avgPhotos)

    return router
}