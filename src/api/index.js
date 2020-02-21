import apiUtil from './apiUtil'
import user from './user'
import tag from './tag'
import category from './category'
import article from './article'
import uploads from './uploads'
import system from './system'

let apiList = Array.concat(user, tag, category, article, uploads, system)

export default {
  ...apiUtil.generateApiMap(apiList)
}
