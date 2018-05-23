import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index/index'
import idCard from '@/views/index/idCard'
import customizedOCR from '@/views/index/customizedOCR'
import crowdsourcing from '@/views/index/crowdsourcing'
import techExperience from '@/views/index/techExperience'

Vue.use(Router)

export default new Router({
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
        }
    ]
})