import { Loading, MessageBox } from 'element-ui'

// loading效果，页面切换和http请求
export const cusLoading = (options) => {
  options = Object.assign({}, options)
  // let loadingInstance = Loading.service({ fullscreen: true, text: '正在努力加载中' }) // loading效果
  options.text = options.text || '努力加载中...'
  return Loading.service(options) // loading效果
}

// 网络/数据异常的弹框
export const cusConfirm = (msg, title, options = {}, callback) => {
  let defaultOptions = {
    confirmButtonText: '确定',
    type: 'error',
    center: true,
    dangerouslyUseHTMLString: true,
    showClose: false,
    showCancelButton: false
  }

  MessageBox.confirm(msg, title, Object.assign(defaultOptions, options)).then(() => {
    console.log('点击确认event')
    callback && callback()
  })
}
