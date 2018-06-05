// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import css from './assets/css/base.css'
import './assets/css/iview.css'
import Vue from 'vue'
import App from './App'
import store from './store/index/index'
import router from './router'
import axios from './http/index'
Vue.prototype.axios = axios

Vue.use(iView);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})