/* eslint-disable no-undef */
const { responseModel, dateFormat } = require('./utils')

/** 新增标签 start **/
exports.addCategory = function (req, res) {
  let temObj = req.body
  temObj.authorId = userInfo.id
  let insertUser = `insert into ${tablePre + 'categorys'} (${Object.keys(temObj).join(', ')}, createTime) values ('${Object.values(temObj).join("', '")}', CURRENT_TIMESTAMP());`

  return db.query(insertUser, (error, result) => {
    if (error) { return responseModel(null, '服务器报错', error.errno, 'fail') }
    if (result && result.affectedRows) {
      return res.send(responseModel({insertId: result.insertId}))
    } else {
      return res.send(responseModel(null))
    }
  })
}
/** 新增标签 end **/

/** 删除标签 start **/
exports.delCategory = function (req, res) {
  let deleteUser = `delete from ${tablePre + 'categorys'} where id=${req.query.id}`

  db.query(deleteUser, (error, result) => {
    if (error) { return responseModel(null, '服务器报错', error.errno, 'fail') }

    if (result && result.affectedRows) {
      return res.send(responseModel({
        tagId: req.query.id
      }, 200,
      'success',
      '删除数据成功!'))
    } else {
      return res.send(responseModel(null, 200, 'success', '操作数据失败'))
    }
  })
}
/** 删除标签 end **/

/** 更新标签 start **/
exports.updateCategory = function (req, res) {
  let editTag = `update ${tablePre + 'categorys'} set name='${req.body.params.tag.name}', updateTime=CURRENT_TIMESTAMP() where id=${req.body.params.tag.id};`
  db.query(editTag, (error, result) => {
    if (error) { return responseModel(null, '服务器报错', error.errno, 'fail') }
    if (result && result.affectedRows) {
      return res.send(responseModel({
        id: req.body.params.tag.id
      },
      200,
      'success',
      '修改分类标签成功!'
      ))
    } else {
      return res.send(responseModel({
        id: req.body.params.tag.id
      },
      200,
      'success',
      '修改分类标签失败!'
      ))
    }
  })
}
/** 更新标签 end **/

/** 获取标签列表 start **/
exports.getCategoryList = function (req, res) {
  // let startPoint = (req.query.page - 1) * req.query.limit
  // let endPoint = req.query.limit
  // const FIELDS = ['t.id', 't.name', 't.createTime', 't.updateTime', 't.status', 'u.name as authorName']
  // let selectAll = ''

  // if (req.query.name) {
  //   selectAll = `select ${FIELDS.join(',')} from ${tablePre + 'categorys'} as t,
  //   ${tablePre + 'users'} as u where t.authorId=u.id
  //   order by t.createTime desc
  //   where name='%${req.query.name}%'
  //   limit ${startPoint + ',' + endPoint};`
  // } else {
  //   selectAll = `select ${FIELDS.join(',')} from ${tablePre + 'categorys'} as t,
  //   ${tablePre + 'users'} as u where t.authorId=u.id
  //   order by t.createTime desc
  //   limit ${startPoint + ',' + endPoint};`
  // }

  // let selectTotal = `select count(*) as total from ${tablePre + 'categorys'};`

  const FIELDS = ['id', 'name']

  let selectAll = `select ${FIELDS.join(',')} from ${tablePre + 'categorys'} where status=1`

  return db.query(selectAll, (error, result) => {
    if (error) { return responseModel(null, '服务器报错', error.errno, 'fail') }
    if (result) {
      return res.send(responseModel({
        categoryList: result
      }))
    } else {
      return res.send(responseModel(null))
    }
    // result.forEach((val) => {
    //   if (val.createTime) {
    //     val.createTime = dateFormat(val.createTime)
    //   }

    //   if (val.updateTime) {
    //     val.updateTime = dateFormat(val.updateTime)
    //   }
    // })

    // if (result) {
    //   db.query(selectTotal, (error2, res2) => {
    //     if (error2) { return responseModel(null, '服务器报错', error2.errno, 'fail') }
    //     return res.send(responseModel({
    //       categoryList: result,
    //       total: res2[0].total
    //     }))
    //   })
    // } else {
    //   return res.send(responseModel(null))
    // }
  })
}
/** 获取标签列表 start **/

/** 是否冻结标签 start **/
exports.isLockCategory = function (req, res) {
  if (req.body.params.lock) {
    let editTag = `update ${tablePre + 'categorys'} set status=0, updateTime=CURRENT_TIMESTAMP() where id=${req.body.params.id};`
    db.query(editTag, (error, result) => {
      if (error) { return responseModel(null, '服务器报错', error.errno, 'fail') }
      if (result && result.affectedRows) {
        return res.send(responseModel({
          id: req.body.params.id
        },
        200,
        'success',
        '冻结分类标签成功!'
        ))
      } else {
        return res.send(responseModel({
          id: req.body.params.tag.id
        },
        200,
        'success',
        '冻结分类标签失败!'
        ))
      }
    })
  } else {
    let editTag = `update ${tablePre + 'categorys'} set status=1, updateTime=CURRENT_TIMESTAMP() where id=${req.body.params.id};`
    db.query(editTag, (error, result) => {
      if (error) { return responseModel(null, '服务器报错', error.errno, 'fail') }
      if (result && result.affectedRows) {
        return res.send(responseModel({
          id: req.body.params.id
        },
        200,
        'success',
        '冻结分类标签成功!'
        ))
      } else {
        return res.send(responseModel({
          id: req.body.params.tag.id
        },
        200,
        'success',
        '冻结分类标签失败!'
        ))
      }
    })
  }
}
/** 是否冻结标签 start **/

/** 按条件查找标签 start **/
exports.findWhereCategory = function (req, res) {
  const FIELDS = ['id', 'name', 'authorId', 'status', 'createTime', 'updateTime']
  let findOneTag = ''
  if (req.query.id) {
    findOneTag = `select ${FIELDS.join(',')} from ${tablePre + 'categorys'} where id=${req.query.id}`
    db.query(findOneTag, (error, result) => {
      if (error) { return responseModel(null, '服务器报错', error.errno, 'fail') }

      if (result) {
        result.forEach((val) => {
          if (val.createTime) {
            val.createTime = dateFormat(val.createTime)
          }

          if (val.updateTime) {
            val.updateTime = dateFormat(val.updateTime)
          }
        })

        result.forEach((val) => {
          if (val.createTime) {
            val.createTime = dateFormat(val.createTime)
          }

          if (val.updateTime) {
            val.updateTime = dateFormat(val.updateTime)
          }
        })

        return res.send(responseModel({
          tagInfo: result[0]
        },
        200,
        'success',
        '查询单个分类标签成功!'
        ))
      } else {
        // temObj = APIWrap(null, '查询用户列表信息失败!', 404, 'fail')
        return res.send(responseModel({
          id: req.query.id
        },
        200,
        'success',
        '查询单个分类标签失败!'
        ))
      }
    })
  }

  if (req.query.name) {
    let startPoint = (req.query.page - 1) * req.query.limit
    let endPoint = req.query.limit
    const FIELDS = ['t.id', 't.name', 't.createTime', 't.updateTime', 't.status', 'u.name as authorName']
    let selectAll = ''

    if (req.query.name) {
      selectAll = `select ${FIELDS.join(',')} from ${tablePre + 'categorys'} as t,
      ${tablePre + 'users'} as u
      where t.authorId=u.id and t.name like '%${req.query.name}%'
      order by t.createTime desc
      limit ${startPoint + ',' + endPoint};`
    }

    let selectTotal = `select count(*) as total from ${tablePre + 'categorys'} where name like '%${req.query.name}%';`
    db.query(selectAll, (error, result) => {
      if (error) { return responseModel(null, '服务器报错', error.errno, 'fail') }

      if (result) {
        result.forEach((val) => {
          if (val.createTime) {
            val.createTime = dateFormat(val.createTime)
          }

          if (val.updateTime) {
            val.updateTime = dateFormat(val.updateTime)
          }
        })

        db.query(selectTotal, (error2, res2) => {
          if (error2) { return responseModel(null, '服务器报错', error2.errno, 'fail') }
          return res.send(responseModel({
            tagList: result,
            total: res2[0].total
          }))
        })
      } else {
        return res.send(responseModel(null))
      }
    })
  }
}
/** 按条件查找标签  end **/
