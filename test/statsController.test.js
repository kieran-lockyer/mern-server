const sinon = require('sinon')
const assert = require('assert')

describe("Stats Controller Tests", () => {
    let req = {}
    let res = {}
    let statsController

    beforeEach('Set up Stats', () => {
        res = {
            status: sinon.spy(),
            json: sinon.spy()
        }

        req = {
            params: {},
            query: {}
        }

        const promFunc = () => {
            return new Promise((resolve, reject) => { resolve("Promise Resolved") })
        }

        const Tags = {
            find: promFunc,
            aggregate: promFunc,
        }

        const Photos = {
            find: promFunc,
            aggregate: promFunc,
        }

        statsController = require('../controllers/statsController')(Tags, Photos)
    })

    it('Average Tags', async () => {

        await statsController.avgTags(req, res)

        sinon.assert.calledWith(res.status, 200)
        sinon.assert.calledOnce(res.json)
    })

    it('Average Photos', async () => {

        await statsController.avgPhotos(req, res)

        sinon.assert.calledWith(res.status, 200)
        sinon.assert.calledOnce(res.json)
    })

    it('Popular Tags', async () => {

        await statsController.popularTags(req, res)

        sinon.assert.calledWith(res.status, 200)
        sinon.assert.calledOnce(res.json)
    })

    it('Trending Tags', async () => {

        await statsController.trendingTags(req, res)

        sinon.assert.calledWith(res.status, 200)
        sinon.assert.calledOnce(res.json)
    })

    context('Graph Stats', () => {
        it("Should return status 400 with no model query passed through", async () => {

            await statsController.graphStats(req, res)

            sinon.assert.calledWith(res.status, 400)
            sinon.assert.notCalled(res.json)
        })

        it("Should return status 200 and json with tags model query passed through", async () => {
            req.query.model = 'tags'

            await statsController.graphStats(req, res)

            sinon.assert.calledWith(res.status, 200)
            sinon.assert.calledOnce(res.json)
        })

        it("Should return status 200 and json with photos model query passed through", async () => {
            req.query.model = 'photos'

            await statsController.graphStats(req, res)

            sinon.assert.calledWith(res.status, 200)
            sinon.assert.calledOnce(res.json)
        })
    })
})