import Vue from 'vue'
import Router from 'vue-router'

import manageIndex from '@/views/manage/manage'
import orderPay from '@/views/manage/orderPay'
import rechargePage from '@/views/manage/rechargePage'

import manageIdCardIndex from '@/views/manage/manageIdCardIndex'
import OCRmodel from '@/views/manage/OCRmodel'
import manageIdCardFinish from '@/views/manage/manageIdCardFinish'

import manageZBmodelIndex from '@/views/manage/manageZBmodelIndex'
import ZBmodel from '@/views/manage/ZBmodel'
import zhongbaoSubmit from '@/views/manage/zhongbaoSubmit'
import ZBmodelApprovaling from '@/views/manage/ZBmodelApprovaling'
import manageZBmodelFinish from '@/views/manage/manageZBmodelFinish'

import manageCustomModelIndex from '@/views/manage/manageCustomModelIndex'
import manageCustomDevIndex from '@/views/manage/manageCustomDevIndex'
import customSubmit from '@/views/manage/customSubmit'
import manageCustomDevApprovaling from '@/views/manage/manageCustomDevApprovaling'
import manageCustomDevFinish from '@/views/manage/manageCustomDevFinish'

Vue.use(Router)
export default new Router({
    // mode: 'history',
    // linkActiveClass: 'active',
    routes: [{
            path: '/',
            name: 'manageIndex',
            component: manageIndex
        },
        {
            path: '/manageIndex',
            name: 'manageIndex',
            component: manageIndex
        },
        {
            path: '/zhongbaoSubmit',
            name: 'zhongbaoSubmit',
            component: zhongbaoSubmit
        },
        {
            path: '/customSubmit',
            name: 'customSubmit',
            component: customSubmit
        },
        {
            path: '/orderPay',
            name: 'orderPay',
            component: orderPay
        },
        {
            path: '/rechargePage',
            name: 'rechargePage',
            component: rechargePage
        },
        {
            path: '/OCRmodel',
            name: 'OCRmodel',
            component: OCRmodel
        },
        {
            path: '/manageIdCardIndex',
            name: 'manageIdCardIndex',
            component: manageIdCardIndex
        },
        {
            path: '/manageIdCardFinish',
            name: 'manageIdCardFinish',
            component: manageIdCardFinish
        },
        {
            path: '/manageCustomDevFinish',
            name: 'manageCustomDevFinish',
            component: manageCustomDevFinish
        },
        {
            path: '/manageCustomDevApprovaling',
            name: 'manageCustomDevApprovaling',
            component: manageCustomDevApprovaling
        },
        {
            path: '/manageZBmodelIndex',
            name: 'manageZBmodelIndex',
            component: manageZBmodelIndex
        },
        {
            path: '/manageZBmodelFinish',
            name: 'manageZBmodelFinish',
            component: manageZBmodelFinish
        },
        {
            path: '/ZBmodelApprovaling',
            name: 'ZBmodelApprovaling',
            component: ZBmodelApprovaling
        },
        {
            path: '/ZBmodel',
            name: 'ZBmodel',
            component: ZBmodel
        },
        {
            path: '/manageCustomDevIndex',
            name: 'manageCustomDevIndex',
            component: manageCustomDevIndex
        },
        {
            path: '/manageCustomModelIndex',
            name: 'manageCustomModelIndex',
            component: manageCustomModelIndex
        }
    ]
})