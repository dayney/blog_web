import _ from 'lodash'
import userApi from './user.js'

let mergeRoutersApi = _.merge(userApi)

export default {
  ...mergeRoutersApi // 取出所有可遍历属性赋值在新的对象上
}
