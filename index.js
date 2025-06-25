const express = require('express')
require('dotenv').config()
const app = express()
app.use(express.json())
const db = require('./config/db')
const authRoutes = require('./routes/auth.routes')
const PORT = process.env.PORT || 3000
app.get('/', (req, res) => {
    res.send("Welcome you on Bus App")
})

app.use('/api/auth', authRoutes)

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Server is running on 3000");
})