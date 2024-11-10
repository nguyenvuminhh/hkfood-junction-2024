// @ts-nocheck

// lib import
require('dotenv').config()
require('express-async-errors')
const express = require('express')
const { app } = require('./socket/socket')
const cors = require('cors')
const mongoose = require('mongoose')

// local import
const { MONGOOSE_URL } = require('./util/config')
const batchWeight = require('./controller/batchWeight')
const productWeight = require('./controller/productWeight')

const { errorHandler, requestLogger } = require('./util/middleware')

// mongoose
mongoose.set('strictQuery', false)
mongoose.connect(MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
  });
  
// middleware and routes
app.use(express.json())
app.use(cors())
app.use(requestLogger)
app.get('/ping', (req, res) => {res.send('pong')})
app.use('/api/batchWeight', batchWeight)
app.use('/api/productWeight', productWeight)
app.use(errorHandler)

module.exports = app