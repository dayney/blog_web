import axios from 'axios'
import qs from 'qs'
import store from '../store/index'
import { cusConfirm } from '@/lib/msgUtil'
// import { cusLoading, cusConfirm } from '@/lib/msgUtil'

let createApiInstance = (config = {}) => {
  // eslint-disable-next-line no-unused-vars
  let _config = {
    // `url是用于请求服务器的url`
    // url: '/usre',
    // 默认是get
    // method: get,
    // `transformRequest`允许在向服务器发送前，修改请求数据
    // 只能用在'PUT','POST',和'PATCH'这几个请求
    // transformRequest: [function (data) {
    //   // 对data进行任意转换处理
    //   return data
    // }],
    // 'transformResponse'在传递给then/catch前，允许修改响应数据
    // tansfromResponse: [function (data) {
    //   return data
    // }],
    // 'headers'是即将被发送的自定义请求头
    headers: {
      'X-Requested-With': 'XMLHttpRquest',
      'Access-Control-Allow-Origin': '*',
      'token': 'ffd30b560da6fd0afdebd8b5b11f6c07' // 北京 吴杰 13011295088
    },
    // 'params'是即将与请求一起送的URL参数
    // 必须是一个无格式对象（plain object）或URLSearchParams对象
    // params: {
    //   ID: 12345
    // },
    // `paramsSerializer` 是一个负责 `params` 序列化的函数
    // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'brackets' })
    },
    // 'data'是作为请求主体被发送的数据
    // 只适用于这些请求方法‘put’， ‘POST’， ‘PATCH’
    // 在没有设置‘transformRequest’时，必须是以下类型之一
    // -浏览器专属： FormData，File，Blob
    // Node专属 Stream
    // data: {
    //   firstName: 'Fred'
    // },
    // 'titmeout' 指定请求超时的毫秒数（0 表示无超时时间）
    // 如果请求时长超过设定的值，请求将被中断
    // timeout: 15000,
    // ‘withCredentials’表示跨域请求Ⅹ是否需要使用凭证
    withCredentials: false, // 默认
    // ‘adapter’允许自定义处理请求，以使测试更轻松
    // 返回一个promise并应用一个有效的响应（查阅【response docs】(#response-api)）
    // adapter: function (config) {
    //   /* ... */
    // },
    // 'auth'表示应该使用HTTP基础验证，并提供证据
    // 这将设置一个‘Authorization’头，覆些写掉现有的任意使用‘headers’设置的自定义‘authorization’头
    auth: {
      username: 'krui',
      password: 'dayney'
    },
    // ‘responseType’表示服务器响应的数据，可以是‘arraybuffer’, 'blob', 'document', 'json', 'text', 'stream'
    // responseType: 'json', // 默认的
    // 'xsrfCookieName'是用作xsrf token的值的cookie的名称
    // xsrfCookieName: 'XSRF-TOKEN', // default
    // ‘xsrfCookieName’是承载xsrf token 的值的HTTP头的名称
    // xsrHeaderName: 'X-XSRF-TOKEN', // 默认的
    // ‘onUploadProgress’允许为上传处理进度事件
    // onUploadProgress: function (progressEvent) {
    //   // 对原生进度事件的处理
    // },
    // ‘onDownloadprogress’允许为上传处理进度事件
    // onDownloadprogress: function (progressEvent) {
    //   // 对原生进度事件的处理
    // },
    maxContentLength: 2000, // 定义允许的响应内容的最大尺寸
    // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
    // validateStatus: function (status) {
    //   return status >= 200 && status < 300 // 默认的
    // },
    // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
    // 如果设置为0，将不会 follow 任何重定向
    maxRedirects: 5 // 默认的
    // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
    // `keepAlive` 默认没有启用
    // httpAgent: new http.Agent({ keepAlive: true }),
    // httpsAgent: new https.Agent({ keepAlive: true }),
    // 'proxy' 定义代理服务器的主机名称和端口
    // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
    // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
    // proxy: {
    //   host: '127.0.0.1',
    //   port: 9000,
    //   auth: {
    //     username: 'mikeymike',
    //     password: 'rapunz3l'
    //   }
    // },

    // `cancelToken` 指定用于取消请求的 cancel token
    // （查看后面的 Cancellation 这节了解更多）
    // cancelToken: new CancelToken(function (cancel) {
    // })
  }

  return axios.create(Object.assign(_config, config)) // 使用axios来创建
  // return axios(temObj) // 使用axios来创建
}

const sendApiInstance = (config) => {
  // let loadingInstance = cusLoading({ text: '努力加载中...', fullscreen: true }) // loading效果
  // store.commit('addRequestsNumber')
  if (!config.url) {
    return null
  }
  let instance = null

  let isCheckRes = config.config.isCheckRes
  delete config.config.isCheckRes
  console.log('isCheckRes::' + isCheckRes)
  // if (isCheckRes) {
  //   console.log('当前需要检查数据')
  // }
  instance = createApiInstance(config.config)
  console.log('config.config')
  console.log(config.config)
  console.log('config.config')
  // 添加请求拦截器
  // axios.interceptors.request.use(function (config) {
  // // 在发送请求之前做些什么
  //   return config
  // }, function (error) {
  // // 对请求错误做些什么
  //   return Promise.reject(error)
  // })
  // 检查数据格式是否正确
  // const err_check = (status, msg, data, config) => {
  //   // if (!config.closeLoading) {
  //   // }
  //   // _this.$vux.loading.hide()
  //   // store.commit('hideMaskView')
  //   // if (status == 0) {
  //   //   AlertModule.show({ content: msg ? `${msg}` : `网络出了点问题!` })
  //   // } else if (status == 1) {
  //   //   return true
  //   // } else if (status == 2) {
  //   //   AlertModule.show({ content: `请求超时!` })
  //   // } else if (status == 3) {
  //   //   AlertModule.show({ content: `未登录!` })
  //   // } else {
  //   //   dtEndTimeCountDown('2')
  //   //   AlertModule.show({ content: `网络出了点问题!!` })
  //   // }
  //   return false
  // }
  // 添加响应拦截器
  instance.interceptors.response.use(
    // 对响应数据做点什么
    response => {
      store.commit('addRequestNumber')
      console.log('store.state.system.requestedNumber::' + store.state.system.requestedNumber)
      console.log('store.state.system.requestNumber::' + store.state.system.requestNumber)
      // if (store.state.system.requestedNumber === store.state.system.requestNumber) {
      //   loadingInstance.close()
      // }
      // let { code, status, msg, data = {} } = response.data
      // // 对返回的数据不做任何处理
      // if (!isCheckRes) {
      //   return data
      // }
      // 此处做第一级别【网络的检测】的
      if (response.status === 200) {
        // 此处的网络是正常的
        // 检测数据是否正常
        if (response.data.status === 'success') {
          console.log('数据正常')
          if (isCheckRes) {
            return response.data.data
          } else {
            return response
          }
        }
        if (response.data.status === 'fail') {
          console.log('数据异常')
          let obj = {
            code: response.data.code,
            msg: `数据异常::${response.data.msg}`
          }

          cusConfirm(`${obj.msg} <br />错误code:${obj.code}`, '数据异常', {}, () => {
            console.log('点击确认event')
          })
          return false
        }
      } else {
        // 网络异常，具体的问题是
        // statusText
        let obj = {
          code: response.status,
          msg: `网络异常::${response.statusText}`
        }

        cusConfirm(`${obj.msg} <br />错误code:${obj.code}`, '网络异常', {}, () => {
          console.log('点击确认event')
        })
        return false
      }
      // if (err_check(status, msg, data, config)) {
      //   return data
      // } else {
      //   return false
      // }
      return response
    },
    // 对响应错误做点什么
    error => {
      return Promise.reject(error)
    }
  )

  if (config.method === 'get') {
    console.log('config.method....')
    console.log(config.method)
    console.log('config.method....')
    console.log('config.url....')
    console.log(config.url)
    console.log('config.url....')
    console.log('get....config.params')
    console.log(config.params)
    console.log('get....config.params')
    console.log('get....config.config')
    console.log(config.config)
    console.log('get....config.config')
    return instance[config.method](config.url, {params: config.params}, config.config)
  }
  // 此处还未验证
  if (config.method === 'formdata') {
    let temParams = qs.stringify(
      config.params,
      //  加入JS对象转换配置
      { allowDots: true }
    )
    return instance['post'](config.url, {params: temParams}, config.config)
  }

  if (config.method === 'post') {
    return instance[config.method](config.url, config.params, config.config)
  }

  if (config.method === 'delete') {
    return instance[config.method](config.url, {params: config.params}, config.config)
  }
  // return instance[config.method](config.url, config.params, config.config)
}

// 返回单个的文件检测
const generateApiMap = (map) => {
  let temObj = {}
  map && map.forEach((val) => {
    for (let key in val) {
      let method = val[key].method
      val[key].config = val[key].config || {}
      temObj[key] = (params = {}) => {
        let config = {
          url: val[key].url,
          method,
          params
        }

        // 针对单个的API做个性化的config
        let defaultConfig = {
          isCheckRes: true
        }
        // 增加个性化的设置
        config.config = Object.assign(defaultConfig, val[key].config)

        return sendApiInstance(config)
      }
    }
  })

  return temObj
}

export default {
  generateApiMap
}
