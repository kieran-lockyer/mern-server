const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const photoSchema = new Schema({
    _id: String,
    tags: Array,
    dateAdded: Date
})

photoSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Photo', photoSchema)