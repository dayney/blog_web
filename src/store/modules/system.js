export const system = {
  state: {
    token: '',
    isShowModel: '',
    requestNumber: 1, // 请求数量，默认是1
    requestedNumber: 0 // 已经请求数量，默认是1
  },
  mutations: {
    setToken (state, val) {
      state.token = val
    },
    clearToken (state, val) {
      state.token = ''
    },
    openLoading (state, val) {
      state.isShowModel = true
    },
    closeLoading (state, val) {
      state.isShowModel = false
    },
    setRequestNumber (state, val) {
      // console.log('设置请求的总的HTTP请求数量::' + val)
      state.requestNumber = val
    },
    addRequestNumber (state) {
      state.requestedNumber = state.requestedNumber + 1
    },
    setRequestedNumber (state, val) {
      state.requestedNumber = val
    },
    initRequestedNumber (state) {
      state.requestedNumber = 0
    }
  }
}
