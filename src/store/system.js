export const system = {
  state: {
    token: ''
  },
  mutations: {
    setToken (state, val) {
      state.token = val
    },
    clearToken (state, val) {
      state.token = ''
    }
  }
}
