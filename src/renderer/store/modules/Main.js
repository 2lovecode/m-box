export default {
  state: {
    mode: 0
  },
  mutations: {
    CHANGE_MODE (state, mode) {
      state.mode = mode
    }
  },
  actions: {
    changeMode (context, mode) {
      context.commit('CHANGE_MODE', mode)
    }
  },
  getters: {
    getMode (state, getter, rootState) {
      return state.mode
    }
  }
}
