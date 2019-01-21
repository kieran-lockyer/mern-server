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

app.get('/', (req, res) => {
    res.send("Hey there good lookin'")
})


app.listen(3000, () => console.log('App listening on port 3000!'))