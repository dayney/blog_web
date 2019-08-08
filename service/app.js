
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({limit: '50mb'})) // parse form data client

var routers = require('./controllers/index')

Object.keys(routers).forEach((val) => {
  app.use(`/${val}`, routers[val])
})

module.exports = app
