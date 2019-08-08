var express = require('express')
var router = express.Router()
var { successData, failData } = require('../model/result')
const { getArticleList, getOneArticle } = require('../model/article')

/* list article */
router.get('/', function (req, res) {
  // console.log('查询文章列表')
  // console.log('res >>>>>>')
  // console.log(res)
  // console.log('res >>>>>>')
  let start = (req.query.page - 1) * req.query.limit
  let end = req.query.limit
  console.log('start::' + start)
  console.log('end::' + end)

  getArticleList(start, end).then((result) => {
    let temObj = {
      data: result
    }
    return res.json(successData(temObj))
  }).catch((error) => {
    let temObj = {
      code: error.errno,
      msg: `code::${error.code},sqlMessage${error.sqlMessage} `,
      status: 'fails',
      data: ''
    }
    console.log(error)
    return res.json(failData(temObj))
  })
})

/* get article collect */
router.get('/:id', function (req, res) {
  getOneArticle(req.params.id).then((result) => {
    let temObj = {
      data: result
    }
    return res.json(successData(temObj))
  }).catch((err) => {
    let temObj = {
      code: err.errno,
      msg: `code::${err.code},sqlMessage${err.sqlMessage} `,
      status: 'fails',
      data: ''
    }
    console.log(err)
    return res.json(failData(temObj))
  })
})

module.exports = router
