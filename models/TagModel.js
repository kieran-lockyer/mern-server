const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const tagSchema = mongoose.Schema({
    label: String,
    confidence: Number,
    imageId: String,
    source: Object,
    dateAdded: Date
})

tagSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Tag', tagSchema)