export default {
  state: {
    toolName: ''
  },
  mutations: {
    CHANGE_TOOL_NAME (state, toolName) {
      console.log('this is change')
      state.toolName = toolName
    }
  },
  actions: {
    changeToolName (context, toolName) {
      console.log('change tool name')
      context.commit('CHANGE_TOOL_NAME', toolName)
    }
  },
  getters: {
    getToolName (state, getter, rootState) {
      return state.toolName
    }
  }
}
