import apiUtil from './apiUtil'
import user from './user'
import tag from './tag'
import category from './category'
import article from './article'

let apiList = Array.concat(user, tag, category, article)

export default {
  ...apiUtil.generateApiMap(apiList)
}
