import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

// /* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'home',
    meta: {
      type: 0
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'dashboard',
        meta: { title: 'nwow', icon: 'shouye', noCache: true, affix: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/EmployeeInformation',
    component: Layout,
    redirect: 'noredirect',
    name: 'EmployeeInformation',
    alwaysShow: true,
    meta: {
      title: 'EmployeeInformation',
      icon: 'ziliao',
      type: 1
    },
    children: [
      {
        path: 'NewEmployeeInformation',
        component: () => import('@/views/EmployeeInformation/NewEmployeeInformation'),
        name: 'NewEmployeeInformation',
        meta: { title: 'NewEmployeeInformation', noCache: false }
      },
      {
        path: 'EmployeeInformationList',
        component: () => import('@/views/EmployeeInformation/EmployeeInformationList'),
        name: 'EmployeeInformationList',
        meta: { title: 'EmployeeInformationList', noCache: true }
      },
      {
        path: 'EmployeeContract',
        component: () => import('@/views/EmployeeInformation/EmployeeContract'),
        name: 'EmployeeContract',
        meta: { title: 'EmployeeContract', noCache: true }
      },
      {
        path: 'NewEmployeeContract',
        component: () => import('@/views/EmployeeInformation/NewEmployeeContract'),
        name: 'NewEmployeeContract',
        meta: { title: 'NewEmployeeContract', noCache: true }
      },
      {
        path: 'EmpCategory',
        component: () => import('@/views/EmployeeInformation/EmpCategory'),
        name: 'EmpCategory',
        meta: { title: 'EmpCategory', noCache: true }
      }
    ]
  },
  {
    path: '/Repository',
    component: Layout,
    redirect: 'noredirect',
    name: 'Repository',
    alwaysShow: true,
    meta: {
      title: 'Repository',
      icon: 'cangku',
      type: 1
    },
    children: [
      {
        path: 'NewRepository',
        component: () => import('@/views/Repository/NewRepository'),
        name: 'NewRepository',
        meta: { title: 'NewRepository', noCache: false }
      },
      {
        path: 'RepositoryList',
        component: () => import('@/views/Repository/RepositoryList'),
        name: 'RepositoryList',
        meta: { title: 'RepositoryList', noCache: true }
      },
      {
        path: 'RepCategory',
        component: () => import('@/views/Repository/RepCategory'),
        name: 'RepCategory',
        meta: { title: 'RepCategory', noCache: true }
      }
    ]
  },
  {
    path: '/Customer',
    component: Layout,
    redirect: 'noredirect',
    name: 'Customer',
    alwaysShow: true,
    meta: {
      title: 'Customer',
      icon: 'kehu',
      type: 1
    },
    children: [
      {
        path: 'NewCustomer',
        component: () => import('@/views/Customer/NewCustomer'),
        name: 'NewCustomer',
        meta: { title: 'NewCustomer', noCache: false }
      },
      {
        path: 'CustomerList',
        component: () => import('@/views/Customer/CustomerList'),
        name: 'CustomerList',
        meta: { title: 'CustomerList', noCache: true }
      },
      {
        path: 'NewAgent',
        component: () => import('@/views/Customer/NewAgent'),
        name: 'NewAgent',
        meta: { title: 'NewAgent', noCache: false }
      },
      {
        path: 'AgentList',
        component: () => import('@/views/Customer/AgentList'),
        name: 'AgentList',
        meta: { title: 'AgentList', noCache: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
