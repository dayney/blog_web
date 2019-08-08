const express = require('express')
const router = express.Router()
const { successData, failData } = require('../model/result')
const { getUserList, getOneUser } = require('../model/users')
/* list users */
router.get('/', function (req, res) {
  console.log('list users called')
  // userDAO.list(function (users) {
  console.log('getUserList  >>>>>>>>>>')
  let start = (req.query.page - 1) * req.query.limit
  let end = req.query.limit
  getUserList(start, end).then((result) => {
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

/* get user */
router.get('/:id', function (req, res) {
  getOneUser(req.params.id).then((result) => {
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
  // let temObj = {
  //   code: 200,
  //   status: 'success',
  //   msg: '请求成功',
  //   data: {
  //     name: 'krui',
  //     age: 29,
  //     sex: 'm',
  //     id
  //   }
  // }
  // res.json(temObj)
})

module.exports = router
