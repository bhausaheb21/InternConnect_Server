const http = require('http')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
//Routes
const authRouter = require('./Routes/auth')
// const Internship = require('./Model/Internship')
const InternShipRouter = require('./Routes/Internship')

const app = express()


app.get('/', (req, res, next) => {
    return res.send("Hello from IntenConnect")
})
app.use(express.json())
app.use(cors())
app.use('/auth', authRouter)
app.use('/internships', InternShipRouter)


app.use((err, req, res, next) => {
    let code = 500;
    if (err.code)
        code = err.code;
    return res.status(code).json({

        msg: err.message,
    })
})
// const server = http.createServer()
mongoose.connect(process.env.DATABASE)
    .then(result => {
        app.listen(5001, () => {
            console.log("Connected to DB")
            console.log("Listening to Port 5001");
        })
    })
    .catch(err => {
        console.log(err);
    })

