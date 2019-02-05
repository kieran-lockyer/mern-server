const sinon = require('sinon')

describe("Photos Controller Tests", () => {
    let req = {}
    let res = {}
    let Photos = {}
    let photosContoller

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

        Photos = {
            find: promFunc,
            paginate: promFunc,
            aggregate: promFunc,
            findByIdAndRemove: promFunc
        }

        photosContoller = require('../controllers/photosController')(Photos)
    })

    it('Individual Photo', async () => {

        await photosContoller.individualPhoto(req, res)

        sinon.assert.calledWith(res.status, 200)
        sinon.assert.calledWith(res.json, "Promise Resolved")
    })

    it('Photo Pagination', async () => {

        await photosContoller.paginatedFilter(req, res)

        sinon.assert.calledWith(res.status, 200)
        sinon.assert.calledWith(res.json, "Promise Resolved")
    })

    it('Delete Photo', async () => {

        await photosContoller.deletePhoto(req, res)

        sinon.assert.calledWith(res.status, 204)
    })
})