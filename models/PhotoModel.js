const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')


const photoSchema = new Schema({
    url: String,
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    datetime: Date,
    metadata: Array
})

photoSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Photo', photoSchema)