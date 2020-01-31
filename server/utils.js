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

function addZero (v) {
  return v < 10 ? '0' + v : v
}

exports.dateFormat = (val) => {
  let temStr = ''
  const dateTime = new Date(val)
  const year = dateTime.getFullYear()
  temStr += year + '-'
  const month = dateTime.getMonth() + 1
  temStr += addZero(month) + '-'
  const date = dateTime.getDate()
  temStr += addZero(date) + ' '
  const hour = dateTime.getHours()
  temStr += addZero(hour) + ':'
  const minute = dateTime.getMinutes()
  temStr += addZero(minute) + ':'
  const second = dateTime.getSeconds()
  temStr += addZero(second)
  return temStr
}
