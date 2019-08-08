var express = require('express')
var router = express.Router()
// var userDAO = require('../dao/userDAO')
var { successData, failData } = require('../model/result')
const { getTagList, getTagsCollect } = require('../model/tags')
/* list users */
router.get('/', function (req, res) {
  console.log('list users called')
  // userDAO.list(function (users) {
  console.log('getUserList  >>>>>>>>>>')

  getTagList().then((result) => {
    console.log('getUserList res ******************')
    console.log(result)
    console.log('getUserList res ******************')

    let temObj = {
      data: result
    }
    return res.json(successData(temObj))
  }).catch((error) => {
    // code: 'ER_BAD_FIELD_ERROR',
    // errno: 1054,
    // sqlMessage: 'Unknown column \'ids\' in \'field list\'',
    // sqlState: '42S22',
    // index: 0,
    // sql: 'select ids, name from k_tags where status=1;' }
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

/* get user */
router.get('/:ids', function (req, res) {
  // var id = req.params.ids
  getTagsCollect(req.params.ids).then((results) => {
    let temObj = {
      data: results
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
