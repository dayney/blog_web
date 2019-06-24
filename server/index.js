const express = require('express')
// const fileUpload = require('express-fileupload')
// const bodyParser = require('body-parser')
const mysql = require('mysql')
const path = require('path')
const app = express()
const chalk = require('chalk')
const tablePre = 'k_'
// const _ = require('lodash')

// const {getHomePage} = require('./routes/index');
// const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const port = 5000

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'socka'
})

// connect to database
db.connect((err) => {
  if (err) {
    throw err
  }
  console.log('Connected to database')
})
global.db = db

// configure middleware
app.set('port', process.env.port || port) // set express to use this port
// eslint-disable-next-line no-path-concat
// app.set('views', __dirname + '/views') // set express to look in this folder to render our view
// app.set('view engine', 'ejs') // configure template engine
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json()) // parse form data client
app.use(express.static(path.join(__dirname, 'public'))) // configure express to use public folder
// app.use(fileUpload()) // configure fileupload

// routes for the app
/*
app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);
*/
app.post('/user', function (req, res) {
  console.log('req')
  console.log(req)
  console.log('req')
  res.send('Hello World-----!')
})

function APIWrap (data, msg = '执行成功!', code = 200, status = 'success') {
  return {
    data,
    code,
    status,
    msg
  }
}

const getUserList = `select * from ${tablePre}users`

app.get('/getUsers', function (req, res) {
  db.query(getUserList, (error, results, fields) => {
    if (error) throw error
    res.send(JSON.stringify(APIWrap({userList: results})))
  })
})

// set the app to listen on the port
app.listen(port, () => {
  console.log(chalk.green(`Server running on port: ${port}`))
})
