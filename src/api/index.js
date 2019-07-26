import apiUtil from './apiUtil'
import user from './user'
import tag from './tag'
import article from './article'

// console.log('user')
// console.log(user)
// console.log('user')
// console.log('tag')
// console.log(tag)
// console.log('tag')

// console.log('1111')
// console.log(Array.concat(user, tag))
// let apiList = Array.concat(user, user1)
let apiList = Array.concat(user, tag, article)

export default {
  ...apiUtil.generateApiMap(apiList)
}
