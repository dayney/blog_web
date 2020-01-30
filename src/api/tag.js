export default {
  /** 家庭保障方案制作排行 */
  addTag: {
    url: '/api/tag',
    method: 'post'
  },
  getTagList: {
    url: '/api/getTagList',
    method: 'get'
  },
  delTag: {
    url: '/api/delTag',
    method: 'delete'
  },
  findOneTag: {
    url: '/api/findWhereTag',
    method: 'get'
  },
  updateTag: {
    url: '/api/updateTag',
    method: 'patch'
  },
  isLockTag: {
    url: '/api/isLockTag',
    method: 'patch'
  }
}
