/* eslint-disable no-undef */
const { responseModel, dateFormat } = require('./utils')

exports.getUserList = (req, res) => {
  let startPoint = (req.query.page - 1) * req.query.limit
  let endPoint = req.query.limit

  let selectLimit = `select * from ${tablePre + 'users'} where status=1 limit ${startPoint + ',' + endPoint};`
  let selectTotal = `select count(*) as total from ${tablePre + 'users'} where status=1;`

  db.query(selectLimit, (error, result) => {
    if (error) { return res.send(responseModel(null, error.errno, 'fail', '服务器报错!')) }

    db.query(selectTotal, (error2, total) => {
      if (error2) { return res.send(responseModel(null, error.errno, 'fail', '服务器报错!')) }
      if (result && total) {
        // registerTime  lastLoginTime
        result.forEach((val) => {
          if (val.registerTime) {
            val.registerTime = dateFormat(val.registerTime)
          }
          if (val.lastLoginTime) {
            val.lastLoginTime = dateFormat(val.lastLoginTime)
          }
        })

        return res.send(responseModel({
          userList: result,
          total: total[0].total
        }, 200, 'success', '获取用户列表成功!'))
      } else {
        return res.send(responseModel(null, 200, 'success', '当前无用户列表信息!'))
      }
    })
  })
}

exports.addUser = (req, res) => {
  let temObj = req.body
  let insertUser = `insert into ${tablePre + 'users'} (${Object.keys(temObj).join(', ')}, registerTime) values ('${Object.values(temObj).join("', '")}', CURRENT_TIMESTAMP())`

  return db.query(insertUser, (error, result) => {
    if (error) { return res.send(responseModel(null, error.errno, 'fail', '服务器报错!')) }
    if (result && result.affectedRows) {
      return res.send(responseModel({
        insertId: result.insertId
      }, 200, 'success', '新增用户成功!'))
    } else {
      return res.send(responseModel({
        insertId: result.insertId
      }, 404, 'fail', '新增用户失败!'))
    }
  })
}

exports.delUser = (req, res) => {
  let deleteUser = `update ${tablePre + 'users'} set status=2 where id=${req.query.id}`

  db.query(deleteUser, (error, result) => {
    if (error) { return res.send(responseModel(null, error.errno, 'fail', '服务器报错!')) }

    if (result && result.affectedRows) {
      return res.send(responseModel({
        userId: req.query.id
      }, 200, 'success', '删除用户成功!'))
    } else {
      return res.send(responseModel({
        userId: req.query.id
      }, 404, 'fail', '删除用户失败!'))
    }
  })
}
