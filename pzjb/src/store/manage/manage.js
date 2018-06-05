import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


// initial state
const state = {
    token: null,
    name: '',
    phone: ''
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
        localStorage.setItem('token', data);
        state.token = data;
    },
    logoutFn: (state) => {
        localStorage.removeItem('token');
        state.token = null
    },
    setName: (state, data) => {
        localStorage.setItem('name', data);
        state.name = data;
    },
    setPhone: (state, data) => {
        localStorage.setItem('phone', data);
        state.phone = data;
    },
    footerShow: (state) => {
        console.log('store footerShow');
    },
    footerHide: (state) => {
        console.log('store footerHide');
    }
}

export default new Vuex.Store({
    state,
    getter,
    action,
    mutations: mutations
})