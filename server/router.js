const multipart = require('connect-multiparty') //在处理模块中引入第三方解析模块c
const multipartMiddleware = multipart()
// const multer = require('multer')
const { getTagList, addTag, delTag, isLockTag, updateTag, findWhereTag, findCategoryTag } = require('./tag')
const { getCategoryList, addCategory, delCategory, isLockCategory, updateCategory, findWhereCategory } = require('./category')
const { addUser, delUser, getUserList, findOneUser, updateUser, isLockUser, exportExcell, searchUser } = require('./user')
const { addArticle } = require('./article')
const { uploadsImg, setAdminInfo } = require('./uploadsImg')

exports.router = (app) => {
  /** category Operation start **/
  app.post('/api/category', addCategory)
  app.delete('/api/delCategory', delCategory)
  app.get('/api/getCategoryList', getCategoryList)
  app.patch('/api/isLockCategory', isLockCategory)
  app.patch('/api/updateCategory', updateCategory)
  app.get('/api/findWhereCategory', findWhereCategory)
  app.get('/api/findCategoryTag', findCategoryTag)
  /** category Operation start **/

  /** tag Operation start **/
  app.post('/api/tag', addTag)
  app.delete('/api/delTag', delTag)
  app.get('/api/getTagList', getTagList)
  app.patch('/api/isLockTag', isLockTag)
  app.patch('/api/updateTag', updateTag)
  app.get('/api/findWhereTag', findWhereTag)
  /** tag Operation start **/

  /** user Operation start **/
  app.get('/api/getUserList', getUserList)
  app.post('/api/user', addUser)
  app.delete('/api/delUser', delUser)
  app.get('/api/findOneUser', findOneUser)
  app.post('/api/updateUser', updateUser)
  app.patch('/api/lockUser', isLockUser)
  app.get('/api/excel/:fileName', exportExcell)
  app.get('/api/searchUser', searchUser)
  /** user Operation end **/

  /** article Operation start **/
  app.post('/api/article', addArticle)
  /** article Operation end **/

  /** upload file Operation start **/
  // app.post('/api/uploadsImg', multer({dest: 'uploads/binary/'}).single('pho'), uploadsImg)
  app.post('/api/uploadsImg', multipartMiddleware, uploadsImg)
  app.post('/api/setAdminInfo', setAdminInfo)
  // app.post('/api/uploadsImg', uploadsImg)
  /** upload file Operation end **/
}
