const express = require('express');
const router = express.Router();
const Photos = require('../models/PhotoModel')


router.get('/', (req, res) => {
    const options = {
        page: req.query.pageNo,
        limit: 10
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