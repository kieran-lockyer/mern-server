const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
    name: String,
    photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }]
})

module.exports = mongoose.model('Client', clientSchema)