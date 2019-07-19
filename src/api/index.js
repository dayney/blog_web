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
let apiList = Array.concat(user, user1)
console.log('1111')

// let apiList = [
//   {
//     getUserList: {
//       url: '/api/getUserList',
//       method: 'get',
//       params: {
//         page: 1,
//         limit: 10
//       }
//     }
//   },
//   {
//     searchUser: {
//       url: `/api/searchUser/${'王五'}`,
//       method: 'get'
//     }
//   }
// ]

export default {
  ...apiUtil.generateApiMap(apiList)
}
