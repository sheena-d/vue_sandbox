import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.prototype.$apiVersion = 'v1'
Vue.prototype.$apiAuth = apiAuth;
Vue.use(VueRouter)
import App from './views/App'
// import Services from './views/Services'
import Hello from './views/Hello'
import Dashboard from './views/Dashboard'
import CLCBalanceImport from './views/CLCBalanceImport'
import CLCBalanceImportHistory from './views/CLCBalanceImportHistory'
import CLCBalanceReport from './views/CLCBalanceReport'
import AdminJobQueue from './views/AdminJobQueue'
import AdminUsers from './views/AdminUsers'
import EncryptTransferUpload from './views/EncryptTransferUpload'
//import APIDocumentation from './views/APIDocumentation'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {   path: '/app', redirect: '/app/dashboard'},
        {
            path: '/app/dashboard',
            name: 'dashboard',
            component: Dashboard,
        },
        {
            path: '/app/reports',
            name: 'reports',
            redirect: '/app/dashboard',
        },
        {
            path: '/app/reports/clc_balance_import',
            name: 'clc_balance_import',
            component: CLCBalanceImport
        },
        {
            path: '/app/reports/clc_balance_import/list',
            name: 'clc_balance_import_list',
            component: CLCBalanceImportHistory
        },
        {
            path: '/app/reports/clc_balance',
            name: 'clc_balance',
            component: CLCBalanceReport
        },
        {
            path: '/app/admin/queue',
            name: 'admin_job_queue',
            component: AdminJobQueue
        },
        {
            path: '/app/admin/users',
            name: 'admin_users',
            component: AdminUsers
        },
        {
            path: '/app/transfer/service_source',
            name: 'transfer_ss',
            component: EncryptTransferUpload
        },


    ],
});

const app = new Vue({
    el: '#app',
    components: { App },
    router,
});
