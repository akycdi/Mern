const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const cors = require('cors')

const userRoutes = require("./Routes/user.routes")
const todoRoutes = require("./Routes/todo.routes")

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
const mongoose = require('mongoose')

app.use('/user', userRoutes)
app.use('/todo', todoRoutes)



// const mongoString = process.env.DATABASE_URL
// mongoose.connect(mongoString);
// const database = mongoose.connection

// database.on('error', (error) => {
//     console.log(error)
// })

// database.once('connected', () => {
//     console.log('Database Connected');
// })


const TODO = [];

app.listen(3000, () => { console.log("listing on port 3000") });