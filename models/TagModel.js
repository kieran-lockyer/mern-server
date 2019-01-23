const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const tagSchema = mongoose.Schema({
    tag: String,
    confidence: Number,
    images: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
    dateAdded: Date
})

tagSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Tag', tagSchema)