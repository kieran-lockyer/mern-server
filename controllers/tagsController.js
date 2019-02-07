module.exports = (Tags, Photos) => {
    // Retrieves and individual tag.
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

    // Retrieves a list of all the tags with that label name
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

    // Returns a paginated llist of all the photos. 
    // Field is the data which the list will be sorted by either dateAdded, confidence or tags. 
    // Order is the direction in which its sorted.
    // Label is the name of the tag you want to filter for.

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
            filter = { label: { $regex: `.*${label}.*`, $options: 'i' } }
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

    // Deletes a tag from MLAB and removes it's reference from the Photos.tags array.
    const deleteTag = async (req, res) => {
        await Photos.updateOne({
            tags: {
                $elemMatch: {
                    tagId: req.params._id
                }
            }
        }, {
                $pull: {
                    tags: {
                        tagId: req.params._id
                    }
                }
            })
            .catch(error =>
                res.status(500).json({
                    error: error.message
                })
            )

        await Tags.findByIdAndRemove(req.params._id)
            .catch(error =>
                res.status(500).json({
                    error: error.message
                })
            )

        res.send(204)
    }


    return {
        individualTag,
        relatedImages,
        paginatedFilter,
        deleteTag
    }
}