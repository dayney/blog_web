export const fontEnd = {
  namespaced: true,
  state: {
    currentModule: '' // 菜单的切换
  },
  mutations: {
    setCurrentModule (state, value) {
      state.currentModule = value
    }
  }
}
