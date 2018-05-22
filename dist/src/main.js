// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import css from './assets/css/base.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.prototype.axios = axios

import global_ from './Global.vue'
Vue.prototype.GLOBAL = global_;
axios.defaults.baseURL = global_.BASE_URL;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})