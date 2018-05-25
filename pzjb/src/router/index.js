import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index/index'

// import index from '@/views/index/index'
// import idCard from '@/views/index/idCard'
// import customizedOCR from '@/views/index/customizedOCR'
// import crowdsourcing from '@/views/index/crowdsourcing'
// import techExperience from '@/views/index/techExperience'

const index = resolve => require(['../views/index/index.vue'], resolve)
const idCard = resolve => require(['../views/index/idCard.vue'], resolve)
    // const idCard = resolve => {
    //     console.log('idCard router start');
    //     require.ensure(['../views/index/idCard.vue'], () => {
    //         resolve(require('../views/index/idCard.vue'))
    //         console.log('idCard router end');
    //     })
    // }
const customizedOCR = resolve => require(['../views/index/customizedOCR.vue'], resolve)
const crowdsourcing = resolve => require(['../views/index/crowdsourcing.vue'], resolve)
const techExperience = resolve => require(['../views/index/techExperience.vue'], resolve)
const loginPage = resolve => require(['../views/index/login.vue'], resolve)

Vue.use(Router)

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.commit('loginFn', window.localStorage.getItem('token'))
}

const router = new Router({
    // mode: 'history',
    // linkActiveClass: 'active',

    routes: [{
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/techExperience',
            name: 'techExperience',
            meta: {
                requiresAuth: true
            },
            component: techExperience,
            children: [{
                name: 'test',
                path: '/test'
            }]
        },
        {
            path: '/idCard',
            name: 'idCard',
            component: idCard
        },
        {
            path: '/customizedOCR',
            name: 'customizedOCR',
            component: customizedOCR
        },
        {
            path: '/crowdsourcing',
            name: 'crowdsourcing',
            component: crowdsourcing
        }, {
            path: '/login',
            name: 'login',
            component: loginPage
        }
    ]
})

router.beforeEach((to, from, next) => {
    console.log('router.beforeEach');
    let token = window.localStorage.getItem('token')
    if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
        next({
            path: '/login',
            query: {
                redirect: to.fullPath
            }
        })
    } else {
        next()
    }
})

export default router