import axios from 'axios'
import Qs from 'qs'
import store from '../store/index'
import _ from 'lodash'

export default APIInstance = (url) => {

}

import Vue from 'vue'
import { LoadingPlugin } from 'vux'
import { AlertModule } from 'vux'
import { dtEndTimeCountDown } from '@/config/dtApp'
Vue.use(LoadingPlugin)
let _this = new Vue()
const generateApiMap = map => {
	let facade = {}
	_.forEach(map, function(value, key) {
		facade[key] = toMethod(value)
	})
	return facade
}

const toMethod = options => {
	options.method = options.method || 'post'
	return (params = {}, attachedParams) => {
		// params = _.extend(params, attachedParams) _.debounce(calculateLayout, 150)
		let config = {
			closeLoading: false,
			checkRes: true



		}
		config = _.merge(config, options.config, attachedParams)
		return sendApiInstance(options.method, options.url, params, config)
	}
}

// 创建axios实例
const createApiInstance = (config = {}, method) => {
	let _config = {
		withCredentials: false, // 跨域
		baseURL: '',
		timeout: 15000,
		closeLoading: false,
		headers: {
			"Access-Control-Allow-Origin":"*",
			// "User-Agent-System": device,
			// "app_token":"ffd30b560da6fd0afdebd8b5b11f6c07",  // 北京 吴杰 13011295088
			// "app_token":"7e6b8d9d2f9f9d4fe7ef698ca2834096",  // 北京 黄小凤  7 13911657526
			// "app_token":"21486c38f8c823a169f43fd9a6aae6b6" // 重庆  李玉敏 13983263328
			// "app_token":"37b40d8d3493ea4bbdc0097f163a9d58" // 木子
			// "app_token":"f47a554c90a1f6a9da18c00888a01453" // 江苏  刘分妹 13962232459
			// "app_token":"aa5bd0f6bb8d9f0750dedea259927177" // 河南 15136776233
			// "app_token":"a598104a77e5b56cb6aab74fc2279bf7"
			"app_token":"83975d711c4c1ada9141cced0f6a73d9"  // 【张兵涛】大连	13898663192王美娟
			// "app_token":"f7784ba04a7119675a1d61c0f31f2764"  // 木子李
		}
	}
	if (method == 'formate') {
		_config.headers['Content-Type'] =
			'application/x-www-form-urlencoded; charset=UTF-8'
	}
	if (store.state.app_token) {
		_config.headers['app_token'] = store.state.app_token
	}
	if(store.state.trackId){
		_config.headers['trackId'] = store.state.trackId
	}
	if(store.state.shareSource){
		_config.headers['shareSource'] = store.state.shareSource
	}
	if(store.state.wechatShareId){
		_config.headers['wechatShareId'] = store.state.wechatShareId
	}
	config = _.merge(_config, config)
	return axios.create(config)
}

const err_check = (status, msg, data, config) => {
	if (!config.closeLoading) {
	}
	_this.$vux.loading.hide()
	store.commit('hideMaskView')
	if (status == 0) {
		AlertModule.show({ content: msg ? `${msg}` : `网络出了点问题!` })
	} else if (status == 1) {
		return true
	} else if (status == 2) {
		AlertModule.show({ content: `请求超时!` })
	} else if (status == 3) {
		AlertModule.show({ content: `未登录!` })
	} else {
		dtEndTimeCountDown('2')
		AlertModule.show({ content: `网络出了点问题!!` })
	}
	return false
}

const sendApiInstance = (method, url, params, config = {}) => {
	if (!url) {
		return
	}
	if (!config.closeLoading) {
		_this.$vux.loading.show()
		store.commit('showMaskView')
	}
	let instance = null
	if (method == 'formate') {
		instance = createApiInstance(config, method)
	} else {
		instance = createApiInstance(config)
	}
	instance.interceptors.response.use(
		response => {
			_this.$vux.loading.hide()
			store.commit('hideMaskView')

			let { status, msg, data={} } = response.data
			if (!config.checkRes) {
				return data
			}
			if (err_check(status, msg, data, config)) {
				return data
			} else {
				return false
			}
		},
		error => {
			console.log(error)
				_this.$vux.loading.hide()
				store.commit('hideMaskView')
			if(/timeout/g.test(error)){

				AlertModule.show({
					content: `请求超时，请稍后再试!!!`
				})
			}else if (config.checkRes) {
				AlertModule.show({
					content: `网络出了点问题!!!`
				})
			}
			dtEndTimeCountDown('2')
			return null

			// Toast({
			//   message: error.response || error.message,
			//   duration: 3000
			// })
			// return Promise.reject(error).catch(res => {
			//     console.log(res)
			//   })



		}
	)
	if (method === 'get') {
		params = {
			params: params
		}
		return instance[method](url, params, config)
	}
	if (method === 'formdata') {
		params = Qs.stringify(
			params,
			//  加入JS对象转换配置
			{ allowDots: true }
		)
		return instance['post'](url, params, config)
	}
	return instance['post'](url, params, config)
}

export default {
	generateApiMap
}
