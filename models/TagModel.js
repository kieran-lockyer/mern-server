const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = mongoose.Schema({
    tag: String,
    confidence: Number,
    images: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
    dateAdded: Date
})

module.exports = mongoose.model('Tag', tagSchema)