const express = require('express')
const app = express()
const dbConn = require('./db')
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())

mongoose.connect(dbConn, (err) => {
    if (err) {
        console.log('Error connecting to database', err)
    } else {
        console.log('Connected to database!')
    }
})

app.use('/photos', require('./routes/photos'))
app.use('/tags', require('./routes/tags'))
app.use('/clients', require('./routes/clients'))

app.get('/', (req, res) => {
    res.status(200).send("Sortal Dashboard")
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log('App listening on port 3001!'))