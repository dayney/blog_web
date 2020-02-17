/* eslint-disable no-undef */
const { responseModel, dateFormat } = require('./utils')

/** 新增文章 start **/
exports.addArticle = function (req, res) {
  let temObj = req.body
  // temObj.registerTime = new Date()
  console.log('req')
  console.log(temObj)
  console.log('req')
  temObj.authorId = userInfo.id

  let insertArticle = `insert into ${tablePre + 'articles'} (${Object.keys(temObj).join(', ')}, createTime) values ('${Object.values(temObj).join("', '")}', CURRENT_TIMESTAMP());`
  console.log('insertArticle')
  console.log(insertArticle)
  console.log('insertArticle')

  return db.query(insertArticle, (error, results) => {
    console.log('进入到此处')
    console.log(results)
    console.log('进入到此处')
    if (error) { return responseModel(null, '服务器报错', error.errno, 'fail') }

    if (results && results.affectedRows) {
      return res.send(responseModel({
        insertId: results.insertId
      }, 200,
      'success',
      '新增文章成功!'))
    } else {
      return res.send(responseModel(null, 200, 'success', '新增文章失败!'))
    }
  })
}
/** 新增文章 end **/

/** 获取最新新增的十篇文章的标题 start **/
exports.getlatesteArticleTitle = function (req, res) {
  let insertUser = `select id, title from ${tablePre + 'articles'} order by createTime asc limit 0,10;`
  console.log('insertUser')
  console.log(insertUser)
  console.log('insertUser')

  return db.query(insertUser, (error, results) => {
    console.log('进入到此处')
    console.log(results)
    console.log('进入到此处')
    if (error) { return errorFn(error, res) }

    let temObj = {}
    if (results) {
      temObj = {
        data: {
          latesteArticleTitleList: results
        },
        msg: '新增标签成功!',
        code: 200,
        status: 'success'
      }
      return res.send(JSON.stringify(temObj))
    } else {
      // temObj = APIWrap(null, '查询用户列表信息失败!', 404, 'fail')
      temObj = {
        data: null,
        msg: '新增标签失败!',
        code: 404,
        status: 'fail'
      }
      return res.send(JSON.stringify(temObj))
    }
  })
}
/** 获取最新新增的十篇文章的标题 end **/

/** 获取文章列表 start **/
exports.getArticleList = function (req, res) {
  let startPoint = (req.query.page - 1) * req.query.limit
  let endPoint = req.query.limit

  let selectLimit = `select
                  a.id, a.title, a.instro, a.createTime, a.category, a.like, a.publishTime, u.name
                  from ${tablePre + 'articles'} as a, ${tablePre + 'users'} as u
                  where
                  a.status='publish' and a.authorId=u.id
                  order by a.createTime desc
                  limit ${startPoint + ',' + endPoint};`
  let selectTotal = `select count(*) as total from ${tablePre + 'articles'} where status='publish';`
  console.log('selectLimit')
  console.log(selectLimit)
  console.log('selectLimit')
  db.query(selectLimit, (error, articleList) => {
    if (error) { return errorFn(error, res) }

    db.query(selectTotal, (error2, total) => {
      if (error2) { return errorFn(error2, res) }

      // TODO --此处可以优化
      // if (articleList) {
      //   let articleListSize = articleList.length

      //   for (let ind = 0; ind < articleListSize; ind++) {
      //     let selectTags = `select t.name from ${tablePre + 'tags'} as t where t.id in(${articleList[ind].tags})`
      //     db.query(selectTags, (error3, result) => {
      //       if (error3) { return errorFn(error3, res) }
      //       console.log('查询到的tags')
      //       console.log(result)
      //       console.log('查询到的tags')
      //       articleList[ind].tags = result
      //       console.log('articleList')
      //       console.log(articleList[ind].tags)
      //       console.log('articleList')
      //     })
      //   }
      // }

      console.log('是否先执行此处。。。')
      let temObj = {}

      if (articleList && total) {
        articleList.forEach((val) => {
          val.instro = unescape(val.instro)
        })
        temObj = {
          data: {
            articleList,
            total: total[0].total
          },
          msg: '获取文章列表成功!',
          code: 200,
          status: 'success'
        }
      } else {
        temObj = {
          data: null,
          msg: '当前无文章列表信息!',
          code: 200,
          status: 'success'
        }
      }

      return res.send(JSON.stringify(temObj))
    })
  })
}
/** 获取文章列表 end **/

/** 获取文章详情 start **/
exports.findOneArticle = function (req, res) {
  // let selectLimit = `select
  // a.id, a.title, a.instro, a.createTime, a.category, a.like, a.publishTime, u.name
  // from ${tablePre + 'articles'} as a, ${tablePre + 'users'} as u
  // where
  // a.status='publish' and a.authorId=u.id
  // order by a.createTime desc
  // limit ${startPoint + ',' + endPoint};`
// const FIELDS = ['id', 'title', 'instro', 'content', 'phone', 'createTime', 'publishTime', 'authorId', 'category', 'like', 'status', 'tags']
// select a.id, a.title, a.instro, a.content, a.createTime, a.authorId, a.status, a.tags, a.category, a.like, a.publishTime, u.name, t.name from k_articles as a, k_users as u, k_tags as t where a.id=1 and a.authorId=u.id and u.id=a.authorId and t.id in(a.tags)
  let findOneArticle = `select
                  a.id, a.title, a.instro, a.content, a.createTime, a.authorId, a.status, a.tags, a.category, a.like, a.publishTime, u.name as userName, t.name as tagNames
                  from ${tablePre + 'articles'} as a, ${tablePre + 'users'} as u, ${tablePre + 'tags'} as t
                  where
                  a.id=${req.query.id} and a.authorId=u.id and u.id=a.authorId and t.id in(a.tags);`

  console.log('selectLimit selectLimit selectLimit')
  console.log(findOneArticle)
  console.log('selectLimit selectLimit selectLimit')
  return db.query(findOneArticle, (error, results) => {
    if (error) { return errorFn(error, res) }
    let temObj = {}
    if (results && results.length) {
      results[0].content = unescape(results[0].content)
      console.log('results[0]')
      // console.log(getTags(results[0].tags))
      console.log('results[0]')
      // 这样是可以行得通得

      temObj = {
        data: { results },
        msg: '查询文章成功!',
        code: 200,
        status: 'success'
      }
      return res.send(JSON.stringify(temObj))
    } else {
      // temObj = APIWrap(null, '查询用户列表信息失败!', 404, 'fail')
      temObj = {
        data: null,
        msg: '查询文章失败!',
        code: 404,
        status: 'fail'
      }
      return res.send(JSON.stringify(temObj))
    }
  })
}
/** 获取文章详情 end **/
