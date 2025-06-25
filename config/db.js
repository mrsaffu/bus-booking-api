const mongoose = require('mongoose')

const url = "mongodb://localhost:27017/Bus_Db"
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