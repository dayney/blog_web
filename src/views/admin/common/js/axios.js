import axios from 'axios'
// import Vue from 'vue'

// https://github.com/ljharb/qs
// A querystring parser that supports nesting and arrays, with a depth limit
import qs from 'qs'
/**
 * See more detial: https://github.com/mzabriskie/axios#request-config
 *
 */
// axios.defaults.withCredentials = true

const RequestConfig = {
  /**
   * `baseURL` will be prepended to `url` unless `url` is absolute. It can be convenient to set `baseURL` for an instance of axios pass relative URLs to methods of that instance.
   */
  baseURL: '/',

  /**
   * `transformRequest` allows changes to the request data before it is sent to the server This is only applicable for request methods 'PUT', 'POST', and 'PATCH' The last function in the array must return a string or an instance of Buffer, ArrayBuffer, FormData or Stream
   */
  transformRequest: [function transformRequest (data) {
    // Do whatever you want to transform the data
    return data
  }],

  /**
   * `transformResponse` allows changes to the response data to be made before it is passed to then/catch
   */
  transformResponse: [function transformResponse (data) {
    // Do whatever you want to transform the data
    return data
  }],

  /**
   * `responseType` indicates the type of data that the server will respond with options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
   */
  responseType: 'json'
}

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  Object.assign(RequestConfig, {
    params: {
      debug_token: 'dayney0728'
    }
  })
}

const instance = axios.create(RequestConfig)

/**
 * request interceptort（开始加载）
 */
instance.interceptors.request.use(function loadingStartIntercepter (config) {
  // console.log(config.url)
  return config
})

/**
 * Normal response interceptor(加载成功或者失败)
 */
instance.interceptors.response.use(function loadingEndIntercepter (response) {
  // console.log(response.data)
  return response.data
}, function iviewLoadingBarErrorIntercepter (error) {
  return Promise.reject(error)
})

/**
 * format params
 */
const format = qs.stringify

export { instance, format }
