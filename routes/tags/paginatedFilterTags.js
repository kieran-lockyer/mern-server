const Tags = require("../../models/TagModel")

module.exports = (req, res) => {
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
        photos => res.json(photos)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
}