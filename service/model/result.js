module.exports = {
  successData (res) {
    return {
      code: res.code || 200,
      status: 'success',
      msg: res.msg || '请求成功',
      data: res.data
    }
  },
  failData (res) {
    return {
      code: res.code || 404,
      status: 'fails',
      msg: res.msg || '请求失败',
      data: res.data
    }
  }
}
