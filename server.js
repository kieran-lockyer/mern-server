const app = require('express')()

// Allows for cross origin requests from our React Client
const cors = require('cors')
app.use(cors())

// Connects to our MLAB Database
const mongoose = require('mongoose')
const database = require('./db')
mongoose.connect(database, (err) => {
    if (err) {
        console.log('Error connecting to database', err)
    } else {
        console.log('Connected to database!')
    }
})

// MODELS
const Tags = require('./models/TagModel')
const Photos = require('./models/PhotoModel')

// Routes with models passed through
app.use('/photos', require('./routes/photosRoutes')(Tags, Photos))
app.use('/tags', require('./routes/tagsRoutes')(Tags, Photos))
app.use('/stats', require('./routes/statsRoutes')(Tags, Photos))
app.get('/', (req, res) => {
    res.status(200).send("Sortal Dashboard")
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log('App listening on port 3001!'))