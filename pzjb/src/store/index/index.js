import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


// initial state
const state = {
    token: null
}

// getters
const getter = {

}

// actions
const action = {

}

// mutations
const mutations = {
    loginFn: (state, data) => {
        localStorage.token = data;
        state.token = data;
    },
    logoutFn: (state) => {
        localStorage.removeItem('token');
        state.token = null
    }
}

export default new Vuex.Store({
    state,
    getter,
    action,
    mutations: mutations
})