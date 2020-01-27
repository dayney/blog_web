var mysql = require('mysql')
var mysqlConf = require('../conf/mysqlConf')

// connect to database
const db = mysql.createConnection(mysqlConf.mysql)

db.connect((err) => {
  if (err) {
    console.log('数据库链接异常')
    console.log(err)
    console.log('数据库链接异常')
    throw err
  }
  console.log('Connected to database')
})
// TODO  mysql query error

module.exports = db
