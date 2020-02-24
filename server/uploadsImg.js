/* eslint-disable no-undef */
const fs = require('fs')
const path = require('path')
const { projectConfig } = require('./config')
const { responseModel } = require('./utils')
// const fileUpload = require('express-fileupload')
/** 按标签分类查找标签  start **/
exports.uploadsImg = function (req, res) {
  const UPFILENAME = 'pho' // 上传的文件的名字

  if (req.files && !req.files.hasOwnProperty(UPFILENAME)) {
    return res.send(responseModel(null, 404, 'fail', '上传的文件名不正确!'))
  }

  // 读取文件路径
  fs.readFile(req.files[UPFILENAME].path, (err, data) => {
    // 如果读取失败
    if (err) {
      return res.send(responseModel(null, err.errno, 'fail', '上传失败!'))
    }
    // 如果读取成功
    // 声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let time = Date.now() + parseInt(Math.random() * 999) + parseInt(Math.random() * 2222)
    // 拓展名
    let extname = req.files[UPFILENAME].type.split('/')[1]
    // 拼接成图片名
    let keepname = time + '.' + extname
    // 三个参数
    // 1.图片的绝对路径
    // 2.写入的内容
    // 3.回调函数
    fs.writeFile(path.join(__dirname, '../uploads/tem/' + keepname), data, (error) => {
      if (error) {
        return res.send(responseModel(null, error.errno, 'fail', '上传文件失败!'))
      }

      res.send(responseModel({
        adminUrl: `${projectConfig.host}:${projectConfig.port}/tem/${keepname}`
      }, 200, 'success', '写入成功!'))
    })
  })
}
/** 按标签分类查找标签  start **/
exports.setAdminInfo = function (req, res) {
  let adminUrl = req.body.adminUrl
  let content = escape(req.body.content)
  // "http://127.0.0.1:5000/tem/1582269830122.jpeg"
  let currentImg = adminUrl.substr(adminUrl.lastIndexOf('/'))
  let target = path.join(__dirname, `../uploads/tem/${currentImg}`)
  // 读取文件路径
  fs.readFile(target, (error, data) => {
    // 如果读取失败
    if (error) {
      return res.send(responseModel(null, error.errno, 'fail', '保存用户信息失败0000'))
    }

    // 如果读取成功
    // 声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let time = Date.now() + parseInt(Math.random() * 999) + parseInt(Math.random() * 2222)
    // 拓展名
    let extname = target.split('.')[1]
    // 拼接成图片名
    let keepname = time + '.' + extname
    // 三个参数
    // 1.图片的绝对路径
    // 2.写入的内容
    // 3.回调函数
    fs.writeFile(path.join(__dirname, '../uploads/img/' + keepname), data, (err) => {
      if (err) {
        return res.send(responseModel(null, err.errno, 'fail', '保存用户信息失败!1111111'))
      }
      // 删除临时的文件，
      fs.unlink(target, (err2) => {
        if (err2) {
          return responseModel(null, err2.errno, 'fail', '删除临时文件出错!')
        }
      })

      let temObj = {
        adminUrl: `/img/${keepname}`,
        content
      }

      let insertAbouts = `insert into ${tablePre + 'abouts'} (${Object.keys(temObj).join(', ')}, createTime) values ('${Object.values(temObj).join("', '")}', CURRENT_TIMESTAMP());`

      db.query(insertAbouts, (error, results) => {
        if (error) { return responseModel(null, error.errno, 'fail', '服务器报错!') }

        if (results && results.affectedRows) {
          return res.send(responseModel({
            adminUrl: `${projectConfig.host}:${projectConfig.port}/img/${keepname}`
          }, 200,
          'success',
          '新增关于作者成功!'))
        } else {
          return res.send(responseModel(null, 200, 'success', '新增关于作者失败!'))
        }
      })

      // res.send(responseModel({
      //   adminUrl: `http://127.0.0.1:${projectConfig.port}/img/${keepname}`
      // }, 200, 'success', '保存用户信息成功!'))
    })
  })
}
/** 按标签分类查找标签  end **/

/** 获取作者信息 start **/
exports.getAdminInfo = function (req, res) {
  let fileds = ['content', 'adminUrl']
  let findInfo = `select ${fileds.join(',')} from ${tablePre + 'abouts'};`

  db.query(findInfo, (error, results) => {
    if (error) { return responseModel(null, error.errno, 'fail', '服务器报错!') }

    if (results) {
      return res.send(responseModel({
        adminUrl: `http://${projectConfig.host}:${projectConfig.port}${results[0].adminUrl}`,
        content: unescape(results[0].content)
      }, 200,
      'success',
      '查询关于作者成功!'))
    } else {
      return res.send(responseModel(null, 200, 'success', '查询关于作者失败!'))
    }
  })
}
/** 获取作者信息 start **/
