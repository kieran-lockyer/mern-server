require('dotenv').config()

const dbConn = `mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASS}@ds257564.mlab.com:57564/mern-db`

module.exports = dbConn