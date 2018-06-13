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
        console.log('axios.interceptors.request.use config，获取的token值为: ')
        console.log(store.state.token)
        if (store.state.token) {
            config.headers.Authorization = `${store.state.token}`;
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
        console.log('http response 拦截器,正常返回的response是：');
        console.log(response.data);
        switch (response.data.code) {
            case 602:
                console.log('参数错误，返回602');
                alert('请求失败，请稍后重试（错误代码602）');
                break;
            case 603:
                console.log('token错误，返回603');
                store.commit('setTokenFail', true);
                store.commit('logoutFn');
                alert('请求失败，请稍后重试（错误代码603）');
                break;
            case 604:
                console.log('token过期，返回604');
                store.commit('setTokenFail', true);
                store.commit('logoutFn');
                alert('请求失败，请稍后重试（错误代码604）');
                break;
            case 605:
                console.log('参数错误，返回605');
                alert('请求失败，请稍后重试（错误代码605）');
                break;
            case 606:
                console.log('参数错误，返回606');
                alert('请求失败，请稍后重试（错误代码606）');
                break;
        }
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit('logoutFn');
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