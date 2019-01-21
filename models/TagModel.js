const mongoose = require('mongoose')

const tagSchema = mongoose.Schema({
    name: String,
    photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
    datetime: Date,
})

module.exports = mongoose.model('Tag', tagSchema)