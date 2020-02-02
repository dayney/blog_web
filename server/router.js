const { tablePre } = require('./db_Config')
const { responseModel } = require('./utils')
const { getTagList, addTag, delTag, isLockTag, updateTag, findWhereTag } = require('./tag')
const { addUser, delUser, getUserList, findOneUser, updateUser, isLockUser, exportExcell, searchUser } = require('./user')

exports.router = (app) => {

  /** user Operation start **/

  /** user Operation end **/

  /** tag Operation start **/
  app.post('/api/tag', addTag)
  app.delete('/api/delTag', delTag)
  app.get('/api/getTagList', getTagList)
  app.patch('/api/isLockTag', isLockTag)
  app.patch('/api/updateTag', updateTag)
  app.get('/api/findWhereTag', findWhereTag)
  /** tag Operation start **/

  /** user Operation start **/
  app.get('/api/getUserList', getUserList)
  app.post('/api/user', addUser)
  app.delete('/api/delUser', delUser)
  app.get('/api/findOneUser', findOneUser)
  app.post('/api/updateUser', updateUser)
  app.patch('/api/lockUser', isLockUser)
  app.get('/api/excel/:fileName', exportExcell)
  app.get('/api/searchUser', searchUser)
  /** user Operation end **/

  function errorFn (err, res) {
    console.log('服务器报错了》》》》')
    console.log(err)
    console.log(err.errno)
    console.log('服务器报错了》》》》')
    return res.send(JSON.stringify({
      data: null,
      msg: '服务器报错!',
      code: err.errno,
      status: 'fail'
    }))
  }
  // routes for the app
  /*
  app.get('/', getHomePage);
  app.get('/add', addPlayerPage);
  app.get('/edit/:id', editPlayerPage);
  app.get('/delete/:id', deletePlayer);
  app.post('/add', addPlayer);
  app.post('/edit/:id', editPlayer);
  */

  /** 新增文章 start **/
  app.post('/api/article', function (req, res) {
    let temObj = req.body
    // temObj.registerTime = new Date()
    console.log('req')
    console.log(temObj)
    console.log('req')
    temObj.authorId = userInfo.id

    let insertUser = `insert into ${tablePre + 'articles'} (${Object.keys(temObj).join(', ')}, createTime) values ('${Object.values(temObj).join("', '")}', CURRENT_TIMESTAMP());`
    console.log('insertUser')
    console.log(insertUser)
    console.log('insertUser')

    return db.query(insertUser, (error, results) => {
      console.log('进入到此处')
      console.log(results)
      console.log('进入到此处')
      if (error) { return errorFn(error, res) }

      let temObj = {}
      if (results && results.affectedRows) {
        temObj = {
          data: {
            insertId: results.insertId
          },
          msg: '新增文章成功!',
          code: 200,
          status: 'success'
        }

        return res.send(JSON.stringify(temObj))
      } else {
        // temObj = APIWrap(null, '查询用户列表信息失败!', 404, 'fail')
        temObj = {
          data: null,
          msg: '新增文章失败!',
          code: 404,
          status: 'fail'
        }
        return res.send(JSON.stringify(temObj))
      }
    })
  })
  /** 新增文章 end **/

  /** 获取最新新增的十篇文章的标题 start **/
  app.get('/api/latesteArticleTitle', function (req, res) {
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
  })
  /** 获取最新新增的十篇文章的标题 end **/

  /** 获取文章列表 start **/
  app.get('/api/getArticleList', function (req, res) {
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
  })
  /** 获取文章列表 end **/

  /** 获取文章详情 start **/
  app.get('/api/findOneArticle', (req, res) => {
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
  })
  /** 获取文章详情 end **/

  // const getTagList = () => {
  //   return service.service({
  //     url: '/api/getTags',
  //     method: 'get'
  //   })
  // }]

  const demoFn = () => {
    return new Promise((resolve, reject) => {
      axios.get('http://127.0.0.1:5000/api/latesteArticleTitle?tags=5,3,1').then((res) => {
        console.log('---------------------------- start')
        console.log(res.data)
        console.log('---------------------------- end')

        if (res.data.status === 'success') {
          console.log('res.data.data latesteArticleTitleList')
          console.log(res.data.data)
          console.log('res.data.data latesteArticleTitleList')
          return resolve(res.data.data.latesteArticleTitleList)
        }
      })
    })
  }

  app.get('/api/getTags', function (req, res) {
    console.log('getTags ....')
    console.log(req.query.tags)
    console.log('getTags ....')
    let selectTags = `select name from ${tablePre + 'tags'} where id in(${req.query.tags});`
    console.log('查找tag标签')
    console.log(selectTags)
    console.log('查找tag标签')
    db.query(selectTags, (error, results) => {
      if (error) { return null }

      if (results && results.length) {
        return results
      } else {
        return null
      }
    })
  })

  /** 获取单篇文章的详情 start **/
  app.get('/api/oneArticle', function (req, res) {
    let selectOneArticle = `select * from ${tablePre + 'articles'} where id=${req.query.id};`
    return db.query(selectOneArticle, (error, results) => {
      if (error) { return errorFn(error, res) }
      let temObj = {}
      if (results && results.length) {
        results[0].content = unescape(results[0].content)
        console.log('results[0]')
        // console.log(getTags(results[0].tags))
        console.log('results[0]')
        // 这样是可以行得通得
        demoFn().then((res) => {
          console.log('开启了新的征途')
          console.log(res)
          console.log('开启了新的征途')
        })

        temObj = {
          data: {
            article: results[0]
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
  })
  /** 获取单篇文章的详情 end **/

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
}
