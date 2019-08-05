export const system = {
  state: {
    token: '',
    isShowModel: ''
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
    }
  }
}
