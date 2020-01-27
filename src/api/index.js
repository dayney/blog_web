import apiUtil from './apiUtil'
import user from './user'
import tag from './tag'
import article from './article'

let apiList = Array.concat(user, tag, article)

export default {
  ...apiUtil.generateApiMap(apiList)
}
