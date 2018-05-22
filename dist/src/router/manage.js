import Vue from 'vue'
import Router from 'vue-router'

import manageIndex from '@/views/manage/manage'
import manageIndex2 from '@/components/manageIndex2'
import manageMail from '@/components/manageMail'
import manageAccount from '@/components/manageAccount'
import manageIssue from '@/components/manageIssue'
import orderPay from '@/components/orderPay'
import standardModel from '@/components/standardModel'
import OCRmodel from '@/components/OCRmodel'
import approvaling from '@/components/approvaling'
import approvaled from '@/components/approvaled'
import developed from '@/components/developed'
import manageIdCardIndex from '@/components/manageIdCardIndex'
import manageIdCardFinish from '@/components/manageIdCardFinish'
import manageZBmodelIndex from '@/components/manageZBmodelIndex'
import rechargePage from '@/components/rechargePage'
import manageBankCardFinish from '@/components/manageBankCardFinish'
import manageVehicleCardFinish from '@/components/manageVehicleCardFinish'
import manageDrivingCardFinish from '@/components/manageDrivingCardFinish'
import manageCustomDevFinish from '@/components/manageCustomDevFinish'
import manageZBmodelFinish from '@/components/manageZBmodelFinish'
import ZBmodel from '@/components/ZBmodel'
import ZBmodelApprovaling from '@/components/ZBmodelApprovaling'
import manageCustomModelIndex from '@/components/manageCustomModelIndex'
import manageCustomDevIndex from '@/components/manageCustomDevIndex'
import manageCustomDevApprovaling from '@/components/manageCustomDevApprovaling'
import customCanvas from '@/components/customCanvas'
import customSubmit from '@/components/customSubmit'
import zhongbaoSubmit from '@/components/zhongbaoSubmit'

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
            path: '/customCanvas',
            name: 'customCanvas',
            component: customCanvas
        },
        {
            path: '/manageIndex2',
            name: 'manageIndex2',
            component: manageIndex2
        },
        {
            path: '/manageMail',
            name: 'manageMail',
            component: manageMail
        },
        {
            path: '/manageIssue',
            name: 'manageIssue',
            component: manageIssue
        },
        {
            path: '/manageAccount',
            name: 'manageAccount',
            component: manageAccount
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
            path: '/standardModel',
            name: 'standardModel',
            component: standardModel
        },
        {
            path: '/OCRmodel',
            name: 'OCRmodel',
            component: OCRmodel
        },
        {
            path: '/approvaling',
            name: 'approvaling',
            component: approvaling
        },
        {
            path: '/approvaled',
            name: 'approvaled',
            component: approvaled
        },
        {
            path: '/developed',
            name: 'developed',
            component: developed
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
            path: '/manageBankCardFinish',
            name: 'manageBankCardFinish',
            component: manageBankCardFinish
        },
        {
            path: '/manageVehicleCardFinish',
            name: 'manageVehicleCardFinish',
            component: manageVehicleCardFinish
        },
        {
            path: '/manageDrivingCardFinish',
            name: 'manageDrivingCardFinish',
            component: manageDrivingCardFinish
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
            path: '/manageCustomDevIndex',
            name: 'manageCustomDevIndex',
            component: manageCustomDevIndex
        },
        {
            path: '/manageCustomModelIndex',
            name: 'manageCustomModelIndex',
            component: manageCustomModelIndex
        },
        {
            path: '/ZBmodel',
            name: 'ZBmodel',
            component: ZBmodel
        }


    ]
})