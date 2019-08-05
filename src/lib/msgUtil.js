import { Loading, MessageBox } from 'element-ui'

// loading效果，页面切换和http请求
export const cusLoading = (options) => {
  options = Object.assign({}, options)
  // let loadingInstance = Loading.service({ fullscreen: true, text: '正在努力加载中' }) // loading效果
  options.text = options.text || '努力加载中...'
  Loading.service(options) // loading效果
}

// http请求结果
export const cusConfirm = (msg, title, callback) => {
  // MessageBox.confirm(`${obj.msg} <br />错误code:${obj.code}`, title, {
  MessageBox.confirm(msg, title, {
    confirmButtonText: '确定',
    type: 'error',
    center: true,
    dangerouslyUseHTMLString: true,
    showClose: false,
    showCancelButton: false
  }).then(() => {
    console.log('点击确认event')
    callback && callback()
  })
}
