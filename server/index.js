const express = require('express')
// const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()
const chalk = require('chalk')
// const _ = require('lodash')
const { dbConfig, tablePre } = require('./db_Config')
const { projectConfig } = require('./config')
const { router } = require('./router') // 路由

const db = mysql.createConnection(dbConfig)
// connect to database
db.connect((err) => {
  if (err) {
    throw err
  }
  console.log('Connected to database')
})

global.db = db
global.userInfo = {
  id: 1,
  name: 'krui'
}
global.tablePre = tablePre

// configure middleware
app.set('port', process.env.port || projectConfig.port) // set express to use this port
// eslint-disable-next-line no-path-concat
// app.set('views', __dirname + '/views') // set express to look in this folder to render our view
// app.set('view engine', 'ejs') // configure template engine
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({limit: '50mb'})) // parse form data client

router(app)

// set the app to listen on the port
app.listen(projectConfig.port, () => {
  console.log(chalk.green(`Server running on port: ${projectConfig.port}`))
  // let res = demoFn()
})
