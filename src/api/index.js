import apiUtil from './apiUtil'
import user from './user'
import user1 from './user1'

console.log('user')
console.log(user)
console.log('user')
console.log('user1')
console.log(user1)
console.log('user1')

console.log('1111')
console.log(Array.concat(user, user1))
// let apiList = Array.concat(user, user1)
let apiList = Array.concat(user)

export default {
  ...apiUtil.generateApiMap(apiList)
}
