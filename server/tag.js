/* eslint-disable no-undef */
const { responseModel, dateFormat } = require('./utils')

/** 新增标签 start **/
exports.addTag = function (req, res) {
  let temObj = req.body
  temObj.authorId = userInfo.id
  let insertUser = `insert into ${tablePre + 'tags'} (${Object.keys(temObj).join(', ')}, createTime) values ('${Object.values(temObj).join("', '")}', CURRENT_TIMESTAMP());`

  return db.query(insertUser, (error, results) => {
    if (error) { return responseModel(null, '服务器报错', error.errno, 'fail') }
    if (results && results.affectedRows) {
      return res.send(responseModel({insertId: results.insertId}))
    } else {
      return res.send(responseModel(null))
    }
  })
}
/** 新增标签 end **/

/** 删除标签 start **/
exports.delTag = function (req, res) {
  let deleteUser = `delete from ${tablePre + 'tags'} where id=${req.query.id}`

  db.query(deleteUser, (error, results) => {
    if (error) { return responseModel(null, '服务器报错', error.errno, 'fail') }

    if (results && results.affectedRows) {
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
exports.updateTag = function (req, res) {
  let editTag = `update ${tablePre + 'tags'} set name='${req.body.params.tag.name}', updateTime=CURRENT_TIMESTAMP() where id=${req.body.params.tag.id};`
  db.query(editTag, (error, results) => {
    if (error) { return responseModel(null, '服务器报错', error.errno, 'fail') }
    if (results && results.affectedRows) {
      return res.send(responseModel({
        id: req.body.params.tag.id
      },
      200,
      'success',
      '修改标签成功!'
      ))
    } else {
      return res.send(responseModel({
        id: req.body.params.tag.id
      },
      200,
      'success',
      '修改标签失败!'
      ))
    }
  })
}
/** 更新标签 end **/

/** 获取标签列表 start **/
exports.getTagList = function (req, res) {
  let startPoint = (req.query.page - 1) * req.query.limit
  let endPoint = req.query.limit
  const FIELDS = ['t.id', 't.name', 't.createTime', 't.updateTime', 't.status', 'u.name as authorName']
  let selectAll = ''

  if (req.query.name) {
    selectAll = `select ${FIELDS.join(',')} from ${tablePre + 'tags'} as t,
    ${tablePre + 'users'} as u where t.authorId=u.id
    order by t.createTime desc
    where name='%${req.query.name}%'
    limit ${startPoint + ',' + endPoint};`
  } else {
    selectAll = `select ${FIELDS.join(',')} from ${tablePre + 'tags'} as t,
    ${tablePre + 'users'} as u where t.authorId=u.id
    order by t.createTime desc
    limit ${startPoint + ',' + endPoint};`
  }

  let selectTotal = `select count(*) as total from ${tablePre + 'tags'};`
  return db.query(selectAll, (error, results) => {
    if (error) { return responseModel(null, '服务器报错', error.errno, 'fail') }

    results.forEach((val) => {
      if (val.createTime) {
        val.createTime = dateFormat(val.createTime)
      }

      if (val.updateTime) {
        val.updateTime = dateFormat(val.updateTime)
      }
    })

    if (results) {
      db.query(selectTotal, (error2, res2) => {
        if (error2) { return responseModel(null, '服务器报错', error2.errno, 'fail') }
        return res.send(responseModel({
          tagList: results,
          total: res2[0].total
        }))
      })
    } else {
      return res.send(responseModel(null))
    }
  })
}
/** 获取标签列表 start **/

/** 是否冻结标签 start **/
exports.isLockTag = function (req, res) {
  if (req.body.params.lock) {
    let editTag = `update ${tablePre + 'tags'} set status=0, updateTime=CURRENT_TIMESTAMP() where id=${req.body.params.id};`
    db.query(editTag, (error, results) => {
      if (error) { return responseModel(null, '服务器报错', error.errno, 'fail') }
      if (results && results.affectedRows) {
        return res.send(responseModel({
          id: req.body.params.id
        },
        200,
        'success',
        '冻结标签成功!'
        ))
      } else {
        return res.send(responseModel({
          id: req.body.params.tag.id
        },
        200,
        'success',
        '冻结标签失败!'
        ))
      }
    })
  } else {
    let editTag = `update ${tablePre + 'tags'} set status=1, updateTime=CURRENT_TIMESTAMP() where id=${req.body.params.id};`
    db.query(editTag, (error, results) => {
      if (error) { return responseModel(null, '服务器报错', error.errno, 'fail') }
      if (results && results.affectedRows) {
        return res.send(responseModel({
          id: req.body.params.id
        },
        200,
        'success',
        '冻结标签成功!'
        ))
      } else {
        return res.send(responseModel({
          id: req.body.params.tag.id
        },
        200,
        'success',
        '冻结标签失败!'
        ))
      }
    })
  }
}
/** 是否冻结标签 start **/

/** 按条件查找标签 start **/
exports.findWhereTag = function (req, res) {
  const FIELDS = ['id', 'name', 'authorId', 'status', 'createTime', 'updateTime']
  let findOneTag = ''
  if (req.query.id) {
    findOneTag = `select ${FIELDS.join(',')} from ${tablePre + 'tags'} where id=${req.query.id}`
    db.query(findOneTag, (error, results) => {
      if (error) { return responseModel(null, '服务器报错', error.errno, 'fail') }

      if (results) {
        return res.send(responseModel({
          tagInfo: results[0]
        },
        200,
        'success',
        '查询单个标签成功!'
        ))
      } else {
        // temObj = APIWrap(null, '查询用户列表信息失败!', 404, 'fail')
        return res.send(responseModel({
          id: req.query.id
        },
        200,
        'success',
        '查询单个标签失败!'
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
      selectAll = `select ${FIELDS.join(',')} from ${tablePre + 'tags'} as t,
      ${tablePre + 'users'} as u
      where t.authorId=u.id and t.name like '%${req.query.name}%'
      order by t.createTime desc
      limit ${startPoint + ',' + endPoint};`
    }

    let selectTotal = `select count(*) as total from ${tablePre + 'tags'} where name like '%${req.query.name}%';`
    db.query(selectAll, (error, results) => {
      if (error) { return responseModel(null, '服务器报错', error.errno, 'fail') }

      if (results) {
        db.query(selectTotal, (error2, res2) => {
          if (error2) { return responseModel(null, '服务器报错', error2.errno, 'fail') }
          return res.send(responseModel({
            tagList: results,
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
