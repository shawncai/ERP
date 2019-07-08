const publics = {
  state: {
    empcontract: '',
    empcontract2: '',
    empcontract3: ''
  },
  mutations: {
    set_empcontract: (state, empcontract) => {
      state.empcontract = empcontract
    },
    set_empcontract2: (state, empcontract) => {
      state.empcontract2 = empcontract
    },
    set_empcontract3: (state, empcontract) => {
      state.empcontract3 = empcontract
    }
  },
  actions: {
    getempcontract({ commit }, empcontract) {
      commit('set_empcontract', empcontract)
    },
    getempcontract2({ commit }, empcontract) {
      commit('set_empcontract2', empcontract)
    },
    getempcontract3({ commit }, empcontract) {
      commit('set_empcontract3', empcontract)
    }
  }
}

export default publics
