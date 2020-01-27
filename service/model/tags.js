const db = require('./db')
const { dbConf } = require('../conf/defaultConf')

module.exports = {
  // 获取表填列表
  async getTagList () {
    return new Promise((resolve, reject) => {
      let querySql = `select id, name from ${dbConf.tablePre + 'tags'} where status=1;`
      // console.log('querySql +++++++++++++++')
      // console.log(querySql)
      // console.log('querySql +++++++++++++++')
      db.query(querySql, (error, results) => {
        if (error) {
          console.log('mysql查询报错')
          reject(error)
        }

        if (results) {
          resolve(JSON.parse(JSON.stringify(results)))
        }
      })
    })
  },
  async getTagsCollect (ids) {
    return new Promise((resolve, reject) => {
      let querySql = `select id, name from ${dbConf.tablePre + 'tags'} where id in(${ids});`
      db.query(querySql, (error, results) => {
        if (error) {
          console.log('mysql查询报错')
          reject(error)
        }

        if (results) {
          resolve(JSON.parse(JSON.stringify(results)))
        }
      })
    })
  }
}
