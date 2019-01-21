const mongoose = require('mongoose')

const photoSchema = mongoose.Schema({
    url: String,
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    datetime: Date,
    metadata: [
        {
            tags: String,
            confidence: Number
        }
    ]
})

module.exports = mongoose.model('Photo', photoSchema)