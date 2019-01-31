const Tags = require("../../models/TagModel")

module.exports = (req, res) => {
    const options = {
        page: req.query.pageNo,
        limit: parseInt(req.query.limit)
    }
    options['sort'] = {}
    options.sort[req.query.field] = req.query.order
    let filter
    if (req.query.label) {
        filter = { label: { $regex: `.*${req.query.label}.*` } }
    }
    Tags.paginate(filter, options).then(
        photos => res.json(photos)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
}