const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const clientSchema = new Schema({
    name: String,
    industry: String,
    photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }]
})

clientSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Client', clientSchema)