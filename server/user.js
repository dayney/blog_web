/* eslint-disable no-undef */
const nodeExcel = require('excel-export')
const { responseModel, dateFormat } = require('./utils')

exports.getUserList = (req, res) => {
  const FIELDS = ['id', 'name', 'sex', 'age', 'phone', 'address', 'ip', 'registerTime', 'lastLoginTime', 'password', 'status', 'updateTime']

  let startPoint = (req.query.page - 1) * req.query.limit
  let endPoint = req.query.limit

  let selectLimit = `select ${FIELDS.join(',')} from ${tablePre + 'users'} where status=1 or status=0 limit ${startPoint + ',' + endPoint};`
  let selectTotal = `select count(*) as total from ${tablePre + 'users'} where status=1 or status=0;`

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
          if (val.updateTime) {
            val.updateTime = dateFormat(val.updateTime)
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

// 查找指定的用户 start
exports.findOneUser = (req, res) => {
  const FIELDS = ['id', 'name', 'sex', 'age', 'phone', 'address', 'password']
  let findOneUser = `select ${FIELDS.join(',')} from ${tablePre + 'users'} where id=${req.query.id}`

  db.query(findOneUser, (error, result) => {
    if (error) { return res.send(responseModel(null, error.errno, 'fail', '服务器报错!')) }

    if (result) {
      return res.send(responseModel({
        userInfo: result[0]
      }, 200, 'success', '查找用户成功!'))
    } else {
      return res.send(responseModel({
        id: req.query.id
      }, 404, 'fail', '查找用户失败!'))
    }
  })
}

exports.updateUser = (req, res) => {
  let temObj = req.body
  let currentId = temObj.id
  delete temObj.id
  let temStr = ''
  for (let k in temObj) {
    temStr += `${k}='${temObj[k]}',`
  }
  temStr.slice(0, temStr.length - 1)
  temStr += `updateTime=CURRENT_TIMESTAMP()`
  let findOneUser = `update ${tablePre + 'users'} set ${temStr} where id=${currentId}`

  db.query(findOneUser, (error, result) => {
    if (error) { return res.send(responseModel(null, error.errno, 'fail', '服务器报错!')) }

    if (result && result.affectedRows) {
      return res.send(responseModel({
        id: currentId
      }, 202, 'success', '更新用户成功!'))
    } else {
      return res.send(responseModel({
        id: currentId
      }, 404, 'fail', '更新用户失败!'))
    }
  })
}

exports.isLockUser = (req, res) => {
  if (req.body.params.lock) {
    let lockUser = `update ${tablePre + 'users'} set status=0, updateTime=CURRENT_TIMESTAMP() where id=${req.body.params.id}`
    db.query(lockUser, (error, result) => {
      if (error) { return res.send(responseModel(null, error.errno, 'fail', '服务器报错!')) }
      if (result && result.affectedRows) {
        return res.send(responseModel({
          userId: result.insertId
        }, 200, 'success', '冻结用户成功!'))
      } else {
        return res.send(responseModel({
          userId: result.insertId
        }, 404, 'fail', '冻结用户失败!'))
      }
    })
  } else {
    let lockUser = `update ${tablePre + 'users'} set status=1, updateTime=CURRENT_TIMESTAMP() where id=${req.body.params.id}`
    db.query(lockUser, (error, result) => {
      if (error) { return res.send(responseModel(null, error.errno, 'fail', '服务器报错!')) }
      if (result && result.affectedRows) {
        return res.send(responseModel({
          userId: result.insertId
        }, 200, 'success', '解冻用户成功!'))
      } else {
        return res.send(responseModel({
          userId: result.insertId
        }, 404, 'fail', '解冻用户失败!'))
      }
    })
  }
}

exports.exportExcell = (req, res) => {
  const FIELDS = ['id', 'name', 'sex', 'age', 'phone', 'address', 'ip', 'registerTime', 'lastLoginTime', 'password', 'status', 'updateTime']
  let selectAll = `select ${FIELDS.join(',')} from ${tablePre + 'users'}`
  db.query(selectAll, (error, result) => {
    if (error) { return res.send(responseModel(null, error.errno, 'fail', '服务器报错!')) }

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
        },
        {
          caption: 'updateTime', // 更新时间
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
        }
      ],
      rows: rowsData
    }

    var nodeExcelResult = nodeExcel.execute(conf)

    res.setHeader('Content-Type', 'application/vnd.openxmlformats; charset=utf-8')
    res.setHeader('Content-Disposition', 'attachment; filename=' + `${Buffer.from(fileName).toString('binary')}.xlsx`)
    res.end(nodeExcelResult, 'binary')
  })
}

exports.searchUser = (req, res) => {
  const FIELDS = ['id', 'name', 'sex', 'age', 'phone', 'address', 'ip', 'registerTime', 'lastLoginTime', 'password', 'status', 'updateTime']

  let startPoint = (req.query.page - 1) * req.query.limit
  let endPoint = req.query.limit

  let selectLimit = `select ${FIELDS.join(',')} from ${tablePre + 'users'} where (status=1 or status=0) and name like '%${req.query.name}%' limit ${startPoint + ',' + endPoint};`
  let selectTotal = `select count(*) as total from ${tablePre + 'users'} where (status=1 or status=0) and name like '%${req.query.name}%' ;`

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
          if (val.updateTime) {
            val.updateTime = dateFormat(val.updateTime)
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
