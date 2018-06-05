// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import css from './assets/css/base.css'
import './assets/css/iview.css'
import Vue from 'vue'
import store from './store/index/index'
import Manage from './Manage.vue'
import router from './router/manage.js'

import axios from './http/index'

import echarts from 'echarts'

Vue.use(iView);

Vue.prototype.$echarts = echarts

Vue.prototype.axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#manage',
    router,
    store,
    components: { Manage },
    template: '<Manage/>'
})