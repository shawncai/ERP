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
      }
    ]
  },
  {
    path: '/commodity',
    component: Layout,
    redirect: 'noredirect',
    name: 'Commodity',
    alwaysShow: true,
    meta: {
      title: 'commodity',
      icon: 'shopping',
      roles: [34, 71],
      type: 2
    },
    children: [
      {
        path: 'sample',
        component: () => import('@/views/commodity/sample'),
        name: 'ProductList',
        meta: { title: 'ProductList', noCache: true, roles: [34] }
      },
      {
        path: 'Categories',
        component: () => import('@/views/commodity/Categories'),
        name: 'Categories',
        meta: { title: 'Categories', noCache: true, roles: [71] }
      }
    ]
  },
  {
    path: '/Repair',
    component: Layout,
    redirect: 'noredirect',
    name: 'Repair',
    alwaysShow: true,
    meta: {
      title: 'Repair',
      icon: 'repair',
      roles: [3, 7, 87, 90, 10, 67],
      tixing: true,
      type: 3
    },
    children: [
      {
        path: 'RepairList',
        component: () => import('@/views/Repair/RepairList'),
        name: 'RepairList',
        meta: { title: 'RepairList', roles: [3], tixing: true }
      },
      {
        path: 'offlineTask',
        component: () => import('@/views/Repair/offlineTask'),
        name: 'Offline-task',
        meta: { title: 'Offline-task', roles: [87] }
      },
      {
        path: 'DelaySummary',
        component: () => import('@/views/Repair/DelaySummary'),
        name: 'DelaySummary',
        meta: { title: 'DelaySummary', roles: [90] }
      },
      {
        path: 'problemPart',
        component: () => import('@/views/Repair/problemPart'),
        name: 'problemPart',
        meta: { title: 'problemPart', roles: [7] }
      },
      {
        path: 'RepairProject',
        component: () => import('@/views/Repair/RepairProject'),
        name: 'repairProject',
        meta: { title: 'repairProject', roles: [10] }
      },
      {
        path: 'selfCheck',
        component: () => import('@/views/Repair/selfCheck'),
        name: 'selfCheck',
        meta: { title: 'selfCheck', roles: [67] }
      },
      {
        path: 'servicestatistics',
        component: () => import('@/views/Repair/servicestatistics'),
        name: 'servicestatistics',
        meta: { title: 'servicestatistics' }
      }

    ]
  },
  {
    path: '/lostUnits',
    component: Layout,
    redirect: 'noredirect',
    name: 'lostUnits',
    alwaysShow: true,
    meta: {
      title: 'lostUnits',
      icon: 'lost',
      roles: [41, 85],
      type: 4
    },
    children: [
      {
        path: 'blackList',
        component: () => import('@/views/lostUnits/blackList'),
        name: 'blackList',
        meta: { title: 'blackList', noCache: true, roles: [41] }
      },
      {
        path: 'Categories',
        component: () => import('@/views/lostUnits/lost'),
        name: 'categories',
        meta: { title: 'categories', noCache: true, roles: [85] }
      }
    ]
  },
  {
    path: '/client',
    component: Layout,
    redirect: 'noredirect',
    name: 'client',
    alwaysShow: true,
    meta: {
      title: 'client',
      icon: 'kehu',
      roles: [55],
      type: 4
    },
    children: [
      {
        path: 'CustomerManagement',
        component: () => import('@/views/client/CustomerManagement'),
        name: 'Customermanagement',
        meta: { title: 'Customermanagement', noCache: true, roles: [55] }
      },
      {
        path: 'PromotionStatistics',
        component: () => import('@/views/client/PromotionStatistics'),
        name: 'Promotionstatistics',
        meta: { title: 'Promotionstatistics', noCache: true, roles: [55] }
      }
    ]
  },
  {
    path: '/Employee',
    component: Layout,
    redirect: 'noredirect',
    name: 'Employee ',
    alwaysShow: true,
    meta: {
      title: 'Employee',
      icon: 'yuangong',
      roles: [44, 48, 51],
      type: 3
    },
    children: [
      {
        path: 'EmployeeList',
        component: () => import('@/views/Employee/EmployeeList'),
        name: 'EmployeeList',
        meta: { title: 'EmployeeList', noCache: true, roles: [44] }
      },
      {
        path: 'EmployeePerformance',
        component: () => import('@/views/Employee/EmployeePerformance'),
        name: 'EmployeePerformance',
        meta: { title: 'EmployeePerformance', noCache: true, roles: [48] }
      },
      {
        path: 'Performancerule',
        component: () => import('@/views/Employee/Performancerule'),
        name: 'Performancerule',
        meta: { title: 'Performancerule', noCache: true, roles: [51] }
      }
    ]
  },
  {
    path: '/area',
    component: Layout,
    redirect: 'noredirect',
    name: 'area ',
    alwaysShow: true,
    meta: {
      title: 'area',
      icon: 'diqu',
      roles: [75],
      type: 4
    },
    children: [
      {
        path: 'Regional',
        component: () => import('@/views/area/Regional'),
        name: 'regional',
        meta: { title: 'regional', noCache: true, roles: [75] }
      }
    ]
  },
  {
    path: '/SystemManagement',
    component: Layout,
    redirect: 'noredirect',
    name: 'SystemManagement ',
    alwaysShow: true,
    meta: {
      title: 'SystemManagement',
      icon: 'xitong',
      roles: [59],
      type: 3
    },
    children: [
      {
        path: 'rolesManagement',
        component: () => import('@/views/SystemManagement/rolesManagement'),
        name: 'rolesManagement',
        meta: { title: 'rolesManagement', noCache: true, roles: [59] }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
