const express = require('express')
const app = express()
app.use(express.json())
const db = require('./config/db')

app.get('/', (req, res) => {
    res.send("Welcome you on Bus App")
})

app.listen(3000, (err) => {
    if (err) throw err;
    console.log("Server is running on 3000");
})