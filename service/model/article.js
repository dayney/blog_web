const db = require('./db')
const { dbConf } = require('../conf/defaultConf')

module.exports = {
  // 获取表填列表
  async getArticleList (start, end) {
    return new Promise((resolve, reject) => {
      let selectLimit = `select
                  a.id, a.title, a.content, a.createTime, a.category, a.like, a.releaseDate, a.tags, u.name
                  from ${dbConf.tablePre + 'articles'} as a, ${dbConf.tablePre + 'users'} as u
                  where
                  a.status='publish' and a.authorId=u.id
                  order by a.createTime desc
                  limit ${start + ',' + end};`
      let selectTotal = `select count(*) as total from ${dbConf.tablePre + 'articles'} where status='publish';`
      db.query(selectLimit, (error, articleList) => {
        if (error) {
          reject(error)
        }

        db.query(selectTotal, (error2, total) => {
          if (error2) {
            reject(error)
          }

          if (articleList && total) {
            articleList.forEach((val) => {
              val.content = unescape(val.content)
            })

            resolve(JSON.parse(JSON.stringify({
              articleList,
              total: total[0].total
            })))
          }
        })
      })
    })
  },
  async getOneArticle (id) {
    return new Promise((resolve, reject) => {
      let querySql = `select
      a.id, a.title, a.content, a.createTime, a.category, a.like, a.releaseDate, a.tags, u.name
      from ${dbConf.tablePre + 'articles'} as a, ${dbConf.tablePre + 'users'} as u
      where
      a.status='publish' and a.authorId=u.id and a.id=${id};`

      db.query(querySql, (error, result) => {
        if (error) {
          reject(error)
        }
        if (result) {
          resolve(JSON.parse(JSON.stringify(result)))
        }
      })
    })
  }
}
