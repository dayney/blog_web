exports.responseModel = (data, code = 200, status = 'success', msg = '新增标签成功!') => {
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
