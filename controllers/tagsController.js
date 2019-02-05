module.exports = (Tags) => {
    //get
    const individualTag = (req, res) => {
        Tags.find({ _id: req.params._id })
            .then(tag => {
                res.status(200)
                res.json(tag)
            })
            .catch(error =>
                res.status(500).json({
                    error: error.message
                })
            )
    }

    const relatedImages = (req, res) => {
        Tags.find({ "label": req.params.tag })
            .then(photos => {
                res.status(200)
                res.json(photos)
            })
            .catch(error =>
                res.status(500).json({
                    error: error.message
                })
            )
    }

    const imageFromTag = (req, res) => {
        Tags.find({ "_id": req.params._id })
            .then(photos => {
                res.status(200)
                res.json(photos)
            })
            .catch(error =>
                res.status(500).json({
                    error: error.message
                })
            )
    }

    const paginatedFilter = (req, res) => {
        const { pageNo, limit, field, order, label } = req.query
        const options = {
            page: pageNo,
            limit: parseInt(limit),
            sort: {}
        }
        options.sort[field] = order
        let filter
        if (label) {
            filter = { label: { $regex: `.*${label}.*` } }
        }
        Tags.paginate(filter, options).then(
            photos => {
                res.status(200)
                res.json(photos)
            })
            .catch(
                error => res.status(500).json({
                    error: error.message
                })
            )
    }

    //delete
    const deleteTag = (req, res) => {
        Tags.findByIdAndRemove(req.params._id)
            .then(() => res.status(204))
            .catch(error =>
                res.status(500).json({
                    error: error.message
                })
            )
    }

    return {
        individualTag,
        relatedImages,
        imageFromTag,
        paginatedFilter,
        deleteTag
    }
}