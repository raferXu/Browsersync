import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import idCard from '@/views/idCard'
import bankCard from '@/components/bankCard'
import drivingCard from '@/components/drivingCard'
import vehicleCard from '@/components/vehicleCard'
import hospitalBill from '@/components/hospitalBill'
import customizedOCR from '@/views/customizedOCR'
import crowdsourcing from '@/views/crowdsourcing'
import crowdsourcing2 from '@/components/crowdsourcing'
import techExperience from '@/views/techExperience'
import zbPro from '@/components/zbPro'
import ocrPro from '@/components/ocrPro'

import manageIndex from '@/components/manageIndex'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    linkActiveClass: 'active',
    routes: [{
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/ocrPro',
            name: 'ocrPro',
            component: ocrPro
        },
        {
            path: '/techExperience',
            name: 'techExperience',
            component: techExperience,
            children: [{
                name: 'test',
                path: '/test'
            }]
        },
        {
            path: '/zbPro',
            name: 'zbPro',
            component: zbPro
        },
        {
            path: '/idCard',
            name: 'idCard',
            component: idCard
        },
        {
            path: '/bankCard',
            name: 'bankCard',
            component: bankCard
        },
        {
            path: '/drivingCard',
            name: 'drivingCard',
            component: drivingCard
        },
        {
            path: '/vehicleCard',
            name: 'vehicleCard',
            component: vehicleCard
        },
        {
            path: '/hospitalBill',
            name: 'hospitalBill',
            component: hospitalBill
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
        },
        {
            path: '/crowdsourcing2',
            name: 'crowdsourcing2',
            component: crowdsourcing2
        },
        {
            path: '/manageIndex',
            name: 'manageIndex',
            component: manageIndex
        }
    ]
})