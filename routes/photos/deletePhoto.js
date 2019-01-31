const Photos = require('../../models/PhotoModel')

module.exports = (req, res) => {
    Photos.findByIdAndRemove(req.params.id).then(
        () => res.send(204)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
}