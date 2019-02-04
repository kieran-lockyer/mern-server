const Photos = require('../../models/PhotoModel')

module.exports = (req, res) => {
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
        photos => res.json(photos)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
}