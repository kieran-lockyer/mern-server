const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const tagSchema = new Schema({
    label: String,
    confidence: Number,
    imageId: { type: Schema.Types.ObjectId, ref: 'Photo' },
    source: Object,
    dateAdded: Date
})

tagSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Tag', tagSchema)