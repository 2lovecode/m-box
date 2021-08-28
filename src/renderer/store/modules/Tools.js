export default {
  state: {
    toolName: ''
  },
  mutations: {
    CHANGE_TOOL_NAME (state, toolName) {
      state.toolName = toolName
    }
  },
  actions: {
    changeToolName (context, toolName) {
      context.commit('CHANGE_TOOL_NAME', toolName)
    }
  },
  getters: {
    getToolName (state, getter, rootState) {
      return state.toolName
    }
  }
}
