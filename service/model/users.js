const db = require('./db')
const { dbConf } = require('../conf/defaultConf')

module.exports = {
  // 获取表填列表
  async getUserList (start, end) {
    return new Promise((resolve, reject) => {
      let querySql = `select count(*) as total,
                  id, name, sex, age, phone, address, ip, registerTime, lastLoginTime, status
                  from ${dbConf.tablePre + 'users'}
                  limit ${start + ',' + end};`
      console.log('querySql >>>>>>>>>>')
      console.log(querySql)
      console.log('querySql >>>>>>>>>>')
      db.query(querySql, (error, result) => {
        error && reject(error)
        result && resolve(JSON.parse(JSON.stringify(result)))
      })
    })
  },
  async getOneUser (id) {
    return new Promise((resolve, reject) => {
      let querySql = `select
      id, name, sex, age, phone, address, ip, registerTime, lastLoginTime, status
      from ${dbConf.tablePre + 'users'}
      where
      id=${id};`

      db.query(querySql, (error, result) => {
        error && reject(error)
        result && resolve(JSON.parse(JSON.stringify(result)))
      })
    })
  }
}
