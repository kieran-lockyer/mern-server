const sinon = require('sinon')

describe("Tags Controller Tests", () => {
    let req = {}
    let res = {}
    let Tags = {}
    let tagsContoller

    beforeEach('Set up Photos', () => {
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

        Tags = {
            find: promFunc,
            paginate: promFunc,
            aggregate: promFunc,
            findByIdAndRemove: promFunc
        }

        tagsContoller = require('../controllers/tagsController')(Tags)
    })

    it('Individual Tag', async () => {

        await tagsContoller.individualTag(req, res)

        sinon.assert.calledWith(res.status, 200)
        sinon.assert.calledWith(res.json, "Promise Resolved")
    })

    it('Related Images', async () => {

        await tagsContoller.relatedImages(req, res)

        sinon.assert.calledWith(res.status, 200)
        sinon.assert.calledWith(res.json, "Promise Resolved")
    })

    it('Image From Tag', async () => {

        await tagsContoller.imageFromTag(req, res)

        sinon.assert.calledWith(res.status, 200)
        sinon.assert.calledWith(res.json, "Promise Resolved")
    })

    it('Tag Pagination', async () => {

        await tagsContoller.paginatedFilter(req, res)

        sinon.assert.calledWith(res.status, 200)
        sinon.assert.calledWith(res.json, "Promise Resolved")
    })

    it('Delete Tag', async () => {

        await tagsContoller.deleteTag(req, res)

        sinon.assert.calledWith(res.status, 204)
    })
})