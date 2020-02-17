export const fontEnd = {
  namespaced: true,
  state: {
    currentModule: 'home' // 菜单的切换
  },
  mutations: {
    setCurrentModule (state, value) {
      console.log('value value value value ...')
      console.log(value)
      console.log('value value value value ...')
      state.currentModule = value
    }
  }
}
