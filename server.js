const express = require('express')
const app = express()
const dbConn = require('./db')
const mongoose = require('mongoose')

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
    res.status(200).send("Hey there good lookin'")
})

app.listen(3001, () => console.log('App listening on port 3001!'))