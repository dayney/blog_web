export default {
  /** 家庭保障方案制作排行 */
  addCategory: {
    url: '/api/category',
    method: 'post'
  },
  getCategoryList: {
    url: '/api/getCategoryList',
    method: 'get'
  },
  delCategory: {
    url: '/api/delCategory',
    method: 'delete'
  },
  findOneCategory: {
    url: '/api/findWhereCategory',
    method: 'get'
  },
  updateCategory: {
    url: '/api/updateCategory',
    method: 'patch'
  },
  isLockCategory: {
    url: '/api/isLockCategory',
    method: 'patch'
  }
}
