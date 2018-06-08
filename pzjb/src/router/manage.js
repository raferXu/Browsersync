import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/manage/manage'

// import manageIndex from '@/views/manage/manage'
// import orderPay from '@/views/manage/orderPay'
// import rechargePage from '@/views/manage/rechargePage'

// import manageIdCardIndex from '@/views/manage/manageIdCardIndex'
// import OCRmodel from '@/views/manage/OCRmodel'
// import manageIdCardFinish from '@/views/manage/manageIdCardFinish'

// import manageZBmodelIndex from '@/views/manage/manageZBmodelIndex'
// import ZBmodel from '@/views/manage/ZBmodel'
// import zhongbaoSubmit from '@/views/manage/zhongbaoSubmit'
// import ZBmodelApprovaling from '@/views/manage/ZBmodelApprovaling'
// import manageZBmodelFinish from '@/views/manage/manageZBmodelFinish'

// import manageCustomModelIndex from '@/views/manage/manageCustomModelIndex'
// import manageCustomDevIndex from '@/views/manage/manageCustomDevIndex'
// import customSubmit from '@/views/manage/customSubmit'
// import manageCustomDevApprovaling from '@/views/manage/manageCustomDevApprovaling'
// import manageCustomDevFinish from '@/views/manage/manageCustomDevFinish'

const manageIndex = resolve => require(['../views/manage/manage.vue'], resolve)
const orderPay = resolve => require(['../views/manage/orderPay.vue'], resolve)
const rechargePage = resolve => require(['../views/manage/rechargePage.vue'], resolve)
const manageIdCardIndex = resolve => require(['../views/manage/manageIdCardIndex.vue'], resolve)
const OCRmodel = resolve => require(['../views/manage/OCRmodel.vue'], resolve)
const manageIdCardFinish = resolve => require(['../views/manage/manageIdCardFinish.vue'], resolve)
const manageZBmodelIndex = resolve => require(['../views/manage/manageZBmodelIndex.vue'], resolve)
const ZBmodel = resolve => require(['../views/manage/ZBmodel.vue'], resolve)
const zhongbaoSubmit = resolve => require(['../views/manage/zhongbaoSubmit.vue'], resolve)
const ZBmodelApprovaling = resolve => require(['../views/manage/ZBmodelApprovaling.vue'], resolve)
const manageZBmodelFinish = resolve => require(['../views/manage/manageZBmodelFinish.vue'], resolve)
const manageCustomModelIndex = resolve => require(['../views/manage/manageCustomModelIndex.vue'], resolve)
const manageCustomDevIndex = resolve => require(['../views/manage/manageCustomDevIndex.vue'], resolve)
const customSubmit = resolve => require(['../views/manage/customSubmit.vue'], resolve)
const manageCustomDevApprovaling = resolve => require(['../views/manage/manageCustomDevApprovaling.vue'], resolve)
const manageCustomDevFinish = resolve => require(['../views/manage/manageCustomDevFinish.vue'], resolve)
const login = resolve => require(['../views/common/login.vue'], resolve)
const register = resolve => require(['../views/common/register.vue'], resolve)


Vue.use(Router)

// 页面刷新时，重新赋值token
store.commit('loginFn', window.localStorage.getItem('token'))

const router = new Router({
    // mode: 'history',
    // linkActiveClass: 'active',
    routes: [{
            path: '/manageIndex',
            name: 'manageIndex',
            meta: {
                requiresAuth: true
            },
            component: manageIndex
        },
        {
            path: '/zhongbaoSubmit',
            name: 'zhongbaoSubmit',
            meta: {
                requiresAuth: true
            },
            component: zhongbaoSubmit
        },
        {
            path: '/customSubmit',
            name: 'customSubmit',
            meta: {
                requiresAuth: true
            },
            component: customSubmit
        },
        {
            path: '/orderPay',
            name: 'orderPay',
            meta: {
                requiresAuth: true
            },
            component: orderPay
        },
        {
            path: '/rechargePage',
            name: 'rechargePage',
            meta: {
                requiresAuth: true
            },
            component: rechargePage
        },
        {
            path: '/OCRmodel',
            name: 'OCRmodel',
            meta: {
                requiresAuth: true
            },
            component: OCRmodel
        },
        {
            path: '/manageIdCardIndex',
            name: 'manageIdCardIndex',
            meta: {
                requiresAuth: true
            },
            component: manageIdCardIndex
        },
        {
            path: '/manageIdCardFinish',
            name: 'manageIdCardFinish',
            meta: {
                requiresAuth: true
            },
            component: manageIdCardFinish
        },
        {
            path: '/manageCustomDevFinish',
            name: 'manageCustomDevFinish',
            meta: {
                requiresAuth: true
            },
            component: manageCustomDevFinish
        },
        {
            path: '/manageCustomDevApprovaling',
            name: 'manageCustomDevApprovaling',
            meta: {
                requiresAuth: true
            },
            component: manageCustomDevApprovaling
        },
        {
            path: '/manageZBmodelIndex',
            name: 'manageZBmodelIndex',
            meta: {
                requiresAuth: true
            },
            component: manageZBmodelIndex
        },
        {
            path: '/manageZBmodelFinish',
            name: 'manageZBmodelFinish',
            meta: {
                requiresAuth: true
            },
            component: manageZBmodelFinish
        },
        {
            path: '/ZBmodelApprovaling',
            name: 'ZBmodelApprovaling',
            meta: {
                requiresAuth: true
            },
            component: ZBmodelApprovaling
        },
        {
            path: '/ZBmodel',
            name: 'ZBmodel',
            meta: {
                requiresAuth: true
            },
            component: ZBmodel
        },
        {
            path: '/manageCustomDevIndex',
            name: 'manageCustomDevIndex',
            meta: {
                requiresAuth: true
            },
            component: manageCustomDevIndex
        },
        {
            path: '/manageCustomModelIndex',
            name: 'manageCustomModelIndex',
            meta: {
                requiresAuth: true
            },
            component: manageCustomModelIndex
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/',
            meta: {
                requiresAuth: true
            },
            redirect: '/manageIndex'
        }
    ]
})

router.beforeEach((to, from, next) => {
    console.log('manage router.beforeEach');
    console.log(to);
    let token = window.localStorage.getItem('token')
    if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null || token === 'null')) {
        // next({
        //     path: '/login',
        //     query: {
        //         redirect: to.fullPath
        //     }
        // })
        console.log('router文件夹的manage.js里的router.beforeEach函数里判断用户没有登录，需要去登录');

    } else {
        next()
    }
})

export default router