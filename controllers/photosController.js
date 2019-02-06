module.exports = (Tags, Photos) => {
    const individualPhoto = (req, res) => {
        Photos.find({ _id: req.params._id })
            .then(photo => {
                res.status(200)
                res.json(photo)
            })
            .catch(error => {
                res.status(500).json({
                    error: error.message
                })
            })
    }

    const paginatedFilter = (req, res) => {
        const { pageNo, limit, field, order } = req.query
        const options = {
            page: pageNo,
            limit: parseInt(limit)
        }
        options['sort'] = {}
        options.sort[field] = order
        let filter
        if (req.query.tags) {
            let tags = req.query.tags.split(',').map(tag => {
                return { tags: { $elemMatch: { label: { $regex: `.*${tag}.*` } } } }
            })
            filter = { $and: tags }
        }
        Photos.paginate(filter, options).then(
            photos => {
                res.status(200)
                res.json(photos)
            }
        ).catch(
            error => res.status(500).json({
                error: error.message
            })
        )
    }

    const deletePhoto = (req, res) => {
        Photos.findByIdAndRemove(req.params._id).then(
            () => res.status(204)
        ).catch(
            error => res.status(500).json({
                error: error.message
            })
        )
    }

    return {
        individualPhoto,
        paginatedFilter,
        deletePhoto
    }
}