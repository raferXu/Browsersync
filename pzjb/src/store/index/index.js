import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


// initial state
const state = {
    token: null,
    tokenFail: false,
    name: '',
    phone: '',
    footerFlag: true
}

// getters
const getter = {

}

// actions
const action = {

}

// mutations
const mutations = {
    setTokenFail: (state, data) => {
        localStorage.setItem('tokenFail', data);
        state.tokenFail = data;
    },
    cancelTokenFail: (state, data) => {
        localStorage.setItem('tokenFail', data);
        state.tokenFail = data;
    },
    loginFn: (state, data) => {
        localStorage.setItem('token', data);
        state.token = data;
    },
    logoutFn: (state) => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('phone');
        localStorage.removeItem('tokenFail');
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
        state.footerFlag = true
    },
    footerHide: (state) => {
        console.log('store footerHide');
        state.footerFlag = false
    }
}

export default new Vuex.Store({
    state,
    getter,
    action,
    mutations: mutations
})