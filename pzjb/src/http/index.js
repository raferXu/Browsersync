import axios from 'axios'
import store from '../store/index/index'
import router from '../router/index'
import global_ from '../Global.vue'

// axios 配置
axios.defaults.timeout = 30000;
axios.defaults.baseURL = global_.BASE_URL;
// http request 拦截器
axios.interceptors.request.use(
    config => {
        console.log('axios.interceptors.request.use config')
        console.log(store.state.token)
        console.log(config)
        console.log(store)
        if (store.state.token) {
            config.headers.Authorization = `token ${store.state.token}`;
        }
        return config;
    },
    err => {
        console.log('axios.interceptors.request.use err')
        return Promise.reject(err);
    });

// http response 拦截器

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit('loginout');
                    // router.replace({
                    //     path: 'login',
                    //     query: {
                    //         redirect: router.currentRoute.fullPath
                    //     }
                    // })
            }
        }
        return Promise.reject(error.response.data)
    });

export default axios;