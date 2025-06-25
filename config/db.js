const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URL
mongoose.connect(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('connected', () => {
    console.log("Connected to MongoDb Server");
})

db.on('error', (err) => {
    console.error('MongoDb Connected Error: ', err)
})

db.on('disconnected', () => {
    console.log('MongoDb Disconnected');
})

module.exports = db;