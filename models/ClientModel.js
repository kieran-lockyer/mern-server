const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = mongoose.Schema({
    name: String,
    industry: String,
    photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }]
})

module.exports = mongoose.model('Client', clientSchema)