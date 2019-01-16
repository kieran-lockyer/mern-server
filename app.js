const express = require('express')
const app = express()

app.get('/' , (req, res) => {
    res.send("Hey there good lookin'")
})

app.listen(3000, () => console.log('App listening on port 3000!'))