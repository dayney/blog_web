const express = require('express')
// const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // parse form data client
// app.use(express.static(path.join(__dirname, 'public'))) // configure express to use public folder
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

function errorFn (err, res) {
  return res.send(JSON.stringify({
    data: null,
    msg: '服务器报错!',
    code: err.errno,
    status: 'fail'
  }))
}
app.post('/api/user', function (req, res) {
  let temObj = req.body
  // temObj.registerTime = new Date()
  console.log('req')
  console.log(temObj)
  console.log('req')
  let insertUser = `insert into ${tablePre + 'users'} (${Object.keys(temObj).join(', ')}, registerTime) values ('${Object.values(temObj).join("', '")}', CURRENT_TIMESTAMP())`
  console.log(insertUser)
  return db.query(insertUser, (error, results) => {
    if (error) { return errorFn(error, res) }

    let temObj = {}
    console.log('results>>>>>>>>>>>>>>>>>>')
    console.log(results)
    console.log(typeof results)
    console.log('...............results')
    if (results && results.affectedRows) {
      temObj = {
        data: {
          insertId: results.insertId
        },
        msg: '新增用户成功!',
        code: 200,
        status: 'success'
      }
      return res.send(JSON.stringify(temObj))
    } else {
      // temObj = APIWrap(null, '查询用户列表信息失败!', 404, 'fail')
      temObj = {
        data: null,
        msg: '新增用户失败!',
        code: 404,
        status: 'fail'
      }
      return res.send(JSON.stringify(temObj))
    }
  })
})

app.get('/api/user/:id', function (req, res) {
  console.log('>>>>>')
  console.log(req)
  console.log(req.params)
  console.log('>>>>>')
  // let where = Object.keys(req.params)
  let temArr = Object.keys(req.params)
  let where = ''
  temArr.forEach((item, index) => {
    where += `${item}=${req.params[item]}`
  })

  // let selectOne = `select * from ${tablePre + 'users'} where `
  // console.log(insertUser)
  // return db.query(insertUser, (error, results) => {
  //   if (error) { return errorFn(error, res) }

  //   let temObj = {}
  //   console.log('results>>>>>>>>>>>>>>>>>>')
  //   console.log(results)
  //   console.log(typeof results)
  //   console.log('...............results')
  //   if (results && results.length) {
  //     temObj = {
  //       data: {
  //         insertId: results.insertId
  //       },
  //       msg: '新增用户成功!',
  //       code: 200,
  //       status: 'success'
  //     }
  //     return res.send(JSON.stringify(temObj))
  //   } else {
  //     // temObj = APIWrap(null, '查询用户列表信息失败!', 404, 'fail')
  //     temObj = {
  //       data: null,
  //       msg: '新增用户失败!',
  //       code: 404,
  //       status: 'fail'
  //     }
  //     return res.send(JSON.stringify(temObj))
  //   }
  // })
})

app.get('/api/getUsers', function (req, res) {
  let selectAll = `select * from ${tablePre + 'users'}`
  return db.query(selectAll, (error, results) => {
    if (error) { return errorFn(error, res) }

    let temObj = {}
    if (results && results.length > 0) {
      // temObj = APIWrap({
      //   userList: results
      // })
      temObj = {
        data: {
          userList: results
        },
        msg: '查询用户列表信息成功!',
        code: 200,
        status: 'success'
      }
      return res.send(JSON.stringify(temObj))
    } else {
      // temObj = APIWrap(null, '查询用户列表信息失败!', 404, 'fail')
      temObj = {
        data: null,
        msg: '当前无用户列表信息!',
        code: 200,
        status: 'success'
      }
      return res.send(JSON.stringify(temObj))
    }
  })
})

// set the app to listen on the port
app.listen(port, () => {
  console.log(chalk.green(`Server running on port: ${port}`))
})
