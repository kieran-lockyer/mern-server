const express = require('express')
const router = express.Router()
const Photos = require('../models/PhotoModel')


router.get("/", (req, res) => {
    const options = {
        page: req.query.pageNo,
        limit: parseInt(req.query.limit)
    }
    options['sort'] = {}
    options.sort[req.query.field] = req.query.order
    let filter
    if (req.query.tags) {
        let tags = req.query.tags.split(',')
        tags = tags.map(tag => {
            return { tags: { $elemMatch: { label: { $regex: `.*${tag}.*` } } } }
        })
        filter = { $and: tags }
    }
    Photos.paginate(filter, options).then(
        photos => res.json(photos)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

router.get("/:_id", (req, res) => {
    Photos.find({ _id: req.params._id })
        .then(photo => res.json(photo))
        .catch(error =>
            res.status(500).json({
                error: error.message
            })
        )
})

router.get("/image/:_id", (req, res) => {
    res.sendFile(process.cwd() + `/db/images/${req.params._id}`)
})

router.delete('/:id', (req, res) => {
    Photos.findByIdAndRemove(req.params.id).then(
        () => res.send(204)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

router.get("/stats/:n", async (req, res) => {
    const result = []
    for (let n = req.params.n; n >= 0; n--) {
        console.log(n)
        await Photos.find(
            {
                $and: [
                    {
                        dateAdded:
                        {
                            $lte:
                                new Date((new Date().getTime() - (n * 24 * 60 * 60 * 1000)))
                        }
                    },
                    {
                        dateAdded:
                        {
                            $gte:
                                new Date((new Date().getTime() - ((n + 1) * 24 * 60 * 60 * 1000)))
                        }
                    }]
            }).then(res => {
                console.log(res)
                result.push(res.length)
            }).catch(err => console.log('NOPE', err))
    }
    res.send(result)
})

router.get("/stats/get/avgtags", (req, res) => {
    console.log('fetching')
    Photos.find({ dateAdded: { $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000))) } })
        .then(photos => {
            result = (photos.length / 7).toFixed(1)
            res.json(result)
        })
})

module.exports = router