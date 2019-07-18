const express = require('express')
// const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const mysql = require('mysql')
// const path = require('path')
const nodeExcel = require('excel-export')
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
  console.log('服务器报错了》》》》')
  console.log(err)
  console.log('服务器报错了》》》》')
  return res.send(JSON.stringify({
    data: null,
    msg: '服务器报错!',
    code: err.errno,
    status: 'fail'
  }))
}
/** 用户相关 api start **/
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

// 删除制定的用户 start
app.delete('/api/delUser/:id', function (req, res) {
  let deleteUser = `update ${tablePre + 'users'} set status=2 where id=${req.params.id}`

  db.query(deleteUser, (error, results) => {
    if (error) { return errorFn(error, res) }

    let temObj = {}

    if (results && results.affectedRows) {
      temObj = {
        data: {
          userId: results.insertId
        },
        msg: '删除用户成功!',
        code: 200,
        status: 'success'
      }
    } else {
      // temObj = APIWrap(null, '查询用户列表信息失败!', 404, 'fail')
      temObj = {
        data: null,
        msg: '删除用户失败!',
        code: 404,
        status: 'fail'
      }
    }
    return res.send(JSON.stringify(temObj))
  })
})
// 删除制定的用户 end

// 批量删除制定的用户 start
app.delete('/api/multipleDelUser/:ids', function (req, res) {
  let deleteUser = `update ${tablePre + 'users'} set status=2 where id in(${req.params.ids})`
  console.log('deleteUser ...')
  console.log(deleteUser)
  console.log('deleteUser ...')
  db.query(deleteUser, (error, results) => {
    if (error) { return errorFn(error, res) }

    let temObj = {}

    if (results && results.affectedRows) {
      temObj = {
        data: {
          userId: results.insertId
        },
        msg: '删除用户成功!',
        code: 200,
        status: 'success'
      }
    } else {
      // temObj = APIWrap(null, '查询用户列表信息失败!', 404, 'fail')
      temObj = {
        data: null,
        msg: '删除用户失败!',
        code: 404,
        status: 'fail'
      }
    }
    return res.send(JSON.stringify(temObj))
  })
})
// 批量删除制定的用户 end

// 冻结当前用户的账号 start
app.delete('/api/lockUser/:id', function (req, res) {
  let lockUser = `update ${tablePre + 'users'} set status=0 where id=${req.params.id}`
  db.query(lockUser, (error, results) => {
    if (error) { return errorFn(error, res) }

    let temObj = {}

    console.log('results >>>>>')
    console.log(results)
    console.log('results >>>>>')
    if (results && results.affectedRows) {
      temObj = {
        data: {
          userId: results.insertId
        },
        msg: '冻结用户账号成功!',
        code: 200,
        status: 'success'
      }
    } else {
      // temObj = APIWrap(null, '查询用户列表信息失败!', 404, 'fail')
      temObj = {
        data: null,
        msg: '删除用户账号失败!',
        code: 404,
        status: 'fail'
      }
    }
    return res.send(JSON.stringify(temObj))
  })
})
// 冻结当前用户的账号 end

// 导出excel demo
app.get('/api/excel/:fileName', function (req, res) {
  const FIELDS = ['id', 'name', 'sex', 'age', 'phone', 'address', 'ip', 'registerTime', 'lastLoginTime', 'password', 'status']
  let selectAll = `select ${FIELDS.join(',')} from ${tablePre + 'users'}`
  db.query(selectAll, (error, result) => {
    if (error) { return errorFn(error, res) }

    let rowsData = []
    result.forEach(ele => {
      let temCell = []

      FIELDS.forEach(val => {
        temCell.push(ele[val])
      })
      rowsData.push(temCell)
    })

    // -------------
    let fileName = req.params.fileName || '未定义文件名'

    var conf = {
      // uncomment it for style example
      // stylesXmlFile: "styles.xml",  // 用来复制样式使用
      name: 'allUser',
      cols: [
        {
          caption: 'id', // id
          type: 'number',
          width: 30
        },
        {
          caption: 'name', // name
          type: 'string',
          width: 25
        },
        {
          caption: 'sex', // sex
          type: 'number',
          width: 4
        },
        {
          caption: 'age', // age
          type: 'number',
          width: 25
        },
        {
          caption: 'phone', // phone
          type: 'string',
          width: 25
        },
        {
          caption: 'address', // address
          type: 'string',
          width: 50
        },
        {
          caption: 'ip', // ip
          type: 'string',
          width: 10
        },
        {
          caption: 'registerTime', // registerTime
          type: 'date',
          beforeCellWrite: function (row, cellData) {
            if (!cellData) return ''
            let date = new Date(cellData)
            let seperator1 = '-'
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let strDate = date.getDate()
            if (month >= 1 && month <= 9) {
              month = '0' + month
            }
            if (strDate >= 0 && strDate <= 9) {
              strDate = '0' + strDate
            }

            return year + seperator1 + month + seperator1 + strDate
          },
          width: 15
        },
        {
          caption: 'lastLoginTime', // registerTime
          type: 'date',
          beforeCellWrite: function (row, cellData) {
            if (!cellData) return ''
            let date = new Date(cellData)
            let seperator1 = '-'
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let strDate = date.getDate()
            if (month >= 1 && month <= 9) {
              month = '0' + month
            }
            if (strDate >= 0 && strDate <= 9) {
              strDate = '0' + strDate
            }

            return year + seperator1 + month + seperator1 + strDate
          },
          width: 15
        },
        {
          caption: 'password', // registerTime
          type: 'string',
          width: 15
        },
        {
          caption: 'status', // registerTime
          type: 'number',
          width: 15
        }
      ],
      // rows: [ // 此处是数据
      //   [1, 'krui', 1, 27, '18612341234', 'address', '10.10.10.16', new Date(Date.UTC(2013, 4, 1)), 'password', 1]
      // ]
      rows: rowsData
    }

    var nodeExcelResult = nodeExcel.execute(conf)

    res.setHeader('Content-Type', 'application/vnd.openxmlformats; charset=utf-8')
    res.setHeader('Content-Disposition', 'attachment; filename=' + `${Buffer.from(fileName).toString('binary')}.xlsx`)
    res.end(nodeExcelResult, 'binary')
  })
})
// 导出excel demo

// 根据id查找用户信息 --start
app.get('/api/user/:id', function (req, res) {
  let selectOne = `select * from ${tablePre + 'users'} where id=${req.params.id}`
  db.query(selectOne, (error, results) => {
    if (error) { return errorFn(error, res) }

    let temObj = {}
    if (results && results.length) {
      temObj = {
        data: {
          user: results
        },
        msg: '查询用户成功!',
        code: 200,
        status: 'success'
      }
    } else {
      // temObj = APIWrap(null, '查询用户列表信息失败!', 404, 'fail')
      temObj = {
        data: null,
        msg: '查询用户失败!',
        code: 404,
        status: 'fail'
      }
    }

    return res.send(JSON.stringify(temObj))
  })
})
// 根据id查找用户信息 --start

// 根据name查找用户信息 --start
app.get('/api/searchUser/:name', function (req, res) {
  let selectOne = `select * from ${tablePre + 'users'} where name='${req.params.name}'`
  console.log('selectOne')
  console.log(selectOne)
  console.log('selectOne')
  db.query(selectOne, (error, results) => {
    if (error) { return errorFn(error, res) }

    let temObj = {}
    if (results && results.length) {
      temObj = {
        data: {
          userList: results
        },
        msg: '查询用户成功!',
        code: 200,
        status: 'success'
      }
    } else {
      // temObj = APIWrap(null, '查询用户列表信息失败!', 404, 'fail')
      temObj = {
        data: null,
        msg: '查询用户失败!',
        code: 404,
        status: 'fail'
      }
    }

    return res.send(JSON.stringify(temObj))
  })
})
// 根据name查找用户信息 --start

app.get('/api/getUserList', function (req, res) {
  let startPoint = (req.query.page - 1) * req.query.limit
  let endPoint = req.query.limit

  let selectLimit = `select * from ${tablePre + 'users'} where status=1 limit ${startPoint + ',' + endPoint};`
  let selectTotal = `select count(*) as total from ${tablePre + 'users'} where status=1;`

  db.query(selectLimit, (error, userList) => {
    if (error) { return errorFn(error, res) }

    db.query(selectTotal, (error2, total) => {
      if (error2) { return errorFn(error2, res) }

      let temObj = {}

      if (userList && total) {
        temObj = {
          data: {
            userList,
            total: total[0].total
          },
          msg: '获取用户列表成功!',
          code: 200,
          status: 'success'
        }
      } else {
        temObj = {
          data: null,
          msg: '当前无用户列表信息!',
          code: 200,
          status: 'success'
        }
      }

      return res.send(JSON.stringify(temObj))
    })
  })
})

app.post('/api/verifyAccount', function (req, res) {
  console.log('验证用户登陆密码')
  let temObj = req.body
  // temObj.registerTime = new Date()
  console.log('req')
  console.log(typeof temObj)
  console.log(temObj)
  console.log('req')
  if (!req.body) {
    return null
  }

  let where = 'where status=1 and'
  let verifySql = ''

  for (let key in temObj) {
    where += ` ${key}=${temObj[key]} and `
  }
  // pageUrl = pageUrl.replace(/oldplan\?|oldcombInfo\?/g, 'market-rest/api/wechat/getInfo?')
  // where.replace(/\s and$/g)
  console.log('where::' + where)
  if (where.lastIndexOf('and')) {
    where = where.replace(/\sand\s$/g, '')
  }
  verifySql = `select id from ${tablePre + 'users'} ${where}`

  console.log('verifySql::' + verifySql)

  return db.query(verifySql, (error, results) => {
    if (error) { return errorFn(error, res) }
    // console.log('results')
    let temObj = {}
    if (results && results.length > 0) {
      temObj = {
        data: {
          id: results[0].id
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
/** 用户相关 api start **/

// set the app to listen on the port
app.listen(port, () => {
  console.log(chalk.green(`Server running on port: ${port}`))
})
