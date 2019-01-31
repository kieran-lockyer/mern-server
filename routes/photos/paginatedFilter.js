const Photos = require('../../models/PhotoModel')

module.exports = (req, res) => {
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
}