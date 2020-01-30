exports.responseModel = (data, code = 200, status = 'success', msg = '操作成功!') => {
  return JSON.stringify({
    data: {
      status,
      data
    },
    msg,
    code,
    status: 'success'
  })
}
