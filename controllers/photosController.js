module.exports = (Tags, Photos) => {
    // Retrieves a single Photo Object from MLAB
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

    // Returns a paginated llist of all the photos. 
    // Field is the data which the list will be sorted by either dateAdded, confidence or tags. 
    // Order is the direction in which its sorted.
    // Tags is a comma seperated string of tags to filter the data by.

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
                return { tags: { $elemMatch: { label: { $regex: `.*${tag}.*`, $options: 'i' } } } }
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

    // Deletes the Photo and all it's associated Tags
    const deletePhoto = async (req, res) => {
        await Photos.find({ _id: req.params._id })
            .then(async (photos) => {
                for (let tag of photos[0].tags) {
                    await Tags.findByIdAndRemove(tag.tagId)
                        .catch(error =>
                            res.status(500).json({
                                error: error.message
                            })
                        )
                }
            })
            .catch(error =>
                res.status(500).json({
                    error: error.message
                })
            )

        await Photos.findByIdAndRemove(req.params._id)
            .catch(error =>
                res.status(500).json({
                    error: error.message
                })
            )

        res.send(204)
    }

    return {
        individualPhoto,
        paginatedFilter,
        deletePhoto
    }
}