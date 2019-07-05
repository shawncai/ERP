const publics = {
  state: {
    empcontract: ''
  },
  mutations: {
    set_empcontract: (state, empcontract) => {
      state.empcontract = empcontract
    }
  },
  actions: {
    getempcontract({ commit }, empcontract) {
      commit('set_empcontract', empcontract)
    }
  }
}

export default publics
