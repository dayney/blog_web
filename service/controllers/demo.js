var express = require('express')
var router = express.Router()
// var userDAO = require('../dao/userDAO')
// var result = require('../model/result')

/* list users */
router.get('/', function (req, res) {
  console.log('list users called')
  // userDAO.list(function (users) {
  let temObj = {
    code: 200,
    status: 'success',
    msg: '请求成功',
    data: {
      name: 'krui',
      age: 29,
      sex: 'm'
    }
  }
  res.json(temObj)
  // })
})

/* get user */
router.get('/:id', function (req, res) {
  var id = req.params.id
  let temObj = {
    code: 200,
    status: 'success',
    msg: '请求成功',
    data: {
      name: 'krui',
      age: 29,
      sex: 'm',
      id
    }
  }
  res.json(temObj)
})

module.exports = router
