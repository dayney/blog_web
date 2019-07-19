export default {
  // 获取用户列表
  getUserList: {
    url: '/api/getUserList',
    method: 'get'
  },
  // 删除单个用户
  delUser: {
    url: '/api/delUser',
    method: 'delete'
  },
  // 批量删除用户
  multipleDelUser: {
    url: '/api/multipleDelUser',
    method: 'delete'
  },
  // 根据用户名查找用户记录
  searchUser: {
    url: '/api/searchUser',
    method: 'get'
  },
  // 根据用户id查找单独的id
  userOne: {
    url: '/api/userOne',
    method: 'get'
  }
}
