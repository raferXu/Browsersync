// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'iview/dist/styles/iview.css';
import css from './assets/css/base.css'
import './assets/css/iview.css'
import Vue from 'vue'
import Manage from './Manage.vue'
import router from './router/manage.js'
import axios from 'axios'
import global_ from './Global.vue'

Vue.prototype.GLOBAL = global_;
axios.defaults.baseURL = global_.BASE_URL;

import echarts from 'echarts'

import iView from 'iview';

Vue.use(iView);

Vue.prototype.$echarts = echarts

Vue.prototype.axios = axios

Vue.config.productionTip = false

// Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
    el: '#manage',
    router,
    components: { Manage },
    template: '<Manage/>'
})