const express = require('express');
const router = express.Router();
const Photos = require('../models/PhotoModel')


router.get('/', (req, res) => {
    const options = {
        page: req.query.pageNo,
        limit: req.query.noOfImages
    }
    Photos.paginate({}, options).then(
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
        );
});

router.get("/tag/:label", (req, res) => {
    console.log(req.params.label)
    let tags = req.params.label.split(',')
    console.log(tags)
    tags = tags.map(tag => {
        return { tags: { $elemMatch: { label: { $regex: `.*${tag}.*` } } } }
    })
    console.log(tags)
    Photos.find({
        $and: tags
    })
        .then(photos => {
            console.log(photos)
            res.json(photos)
        })
        .catch(err => console.log(err))
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

module.exports = router