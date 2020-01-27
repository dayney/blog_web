export default {
  /** 家庭保障方案制作排行 */
  addArticle: {
    url: '/api/article',
    method: 'post'
  },
  getLatesteArticleTitle: {
    url: '/api/latesteArticleTitle',
    method: 'get'
  },
  getArticleList: {
    url: '/api/articleList',
    method: 'get',
    config: {
      isCheckRes: true
    }
  },
  findOneArticle: {
    url: '/api/findOneArticle',
    method: 'get'
  }
}
