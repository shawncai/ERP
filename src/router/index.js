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
      },
      {
        path: 'Manyinsert',
        component: () => import('@/views/Repository/Manyinsert'),
        name: 'Manyinsert',
        meta: { title: 'Manyinsert', noCache: true }
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
        path: 'ManyCustomer',
        component: () => import('@/views/Customer/ManyCustomer'),
        name: 'ManyCustomer',
        meta: { title: 'ManyCustomer', noCache: true }
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
      },
      {
        path: 'CustomerCategory',
        component: () => import('@/views/Customer/CustomerCategory'),
        name: 'CustomerCategory',
        meta: { title: 'CustomerCategory', noCache: true }
      }
    ]
  },
  {
    path: '/Supplier',
    component: Layout,
    redirect: 'noredirect',
    name: 'Supplier',
    alwaysShow: true,
    meta: {
      title: 'Supplier',
      icon: 'gongyinshang',
      type: 1
    },
    children: [
      {
        path: 'NewSupplier',
        component: () => import('@/views/Supplier/NewSupplier'),
        name: 'NewSupplier',
        meta: { title: 'NewSupplier', noCache: false }
      },
      {
        path: 'SupplierList',
        component: () => import('@/views/Supplier/SupplierList'),
        name: 'SupplierList',
        meta: { title: 'SupplierList', noCache: true }
      },
      {
        path: 'SupplierCategory',
        component: () => import('@/views/Supplier/SupplierCategory'),
        name: 'SupplierCategory',
        meta: { title: 'SupplierCategory', noCache: true }
      },
      {
        path: 'ManySupplier',
        component: () => import('@/views/Supplier/ManySupplier'),
        name: 'ManySupplier',
        meta: { title: 'ManySupplier', noCache: true }
      }
    ]
  },
  {
    path: '/Product',
    component: Layout,
    redirect: 'noredirect',
    name: 'Product',
    alwaysShow: true,
    meta: {
      title: 'Product',
      icon: 'wupin',
      type: 1
    },
    children: [
      {
        path: 'NewProduct',
        component: () => import('@/views/Product/NewProduct'),
        name: 'NewProduct',
        meta: { title: 'NewProduct', noCache: false }
      },
      {
        path: 'ProductList',
        component: () => import('@/views/Product/ProductList'),
        name: 'ProductList',
        meta: { title: 'ProductList', noCache: true }
      },
      {
        path: 'Newadjustprice',
        component: () => import('@/views/Product/Newadjustprice'),
        name: 'Newadjustprice',
        meta: { title: 'Newadjustprice', noCache: false }
      },
      {
        path: 'AdjustpriceList',
        component: () => import('@/views/Product/AdjustpriceList'),
        name: 'AdjustpriceList',
        meta: { title: 'AdjustpriceList', noCache: true }
      },
      {
        path: 'ProductCategory',
        component: () => import('@/views/Product/ProductCategory'),
        name: 'ProductCategory',
        meta: { title: 'ProductCategory', noCache: true }
      },
      {
        path: 'ManyProduct',
        component: () => import('@/views/Product/ManyProduct'),
        name: 'ManyProduct',
        meta: { title: 'ManyProduct', noCache: true }
      },
      {
        path: 'detaillist',
        component: () => import('@/views/Product/detaillist'),
        name: 'detaillist',
        meta: { title: 'detaillist', noCache: true }
      }
    ]
  },
  {
    path: '/LogisticsCar',
    component: Layout,
    redirect: 'noredirect',
    name: 'LogisticsCar',
    alwaysShow: true,
    meta: {
      title: 'LogisticsCar',
      icon: 'wuliu',
      type: 1
    },
    children: [
      {
        path: 'AddLogisticsCar',
        component: () => import('@/views/LogisticsCar/AddLogisticsCar'),
        name: 'AddLogisticsCar',
        meta: { title: 'AddLogisticsCar', noCache: false }
      },
      {
        path: 'LogisticsCarlist',
        component: () => import('@/views/LogisticsCar/LogisticsCarlist'),
        name: 'LogisticsCarlist',
        meta: { title: 'LogisticsCarlist', noCache: true }
      },
      {
        path: 'Addsendcar',
        component: () => import('@/views/LogisticsCar/Addsendcar'),
        name: 'Addsendcar',
        meta: { title: 'Addsendcar', noCache: false }
      },
      {
        path: 'SendcarList',
        component: () => import('@/views/LogisticsCar/SendcarList'),
        name: 'SendcarList',
        meta: { title: 'SendcarList', noCache: true }
      },
      {
        path: 'Addreturncar',
        component: () => import('@/views/LogisticsCar/Addreturncar'),
        name: 'Addreturncar',
        meta: { title: 'Addreturncar', noCache: false }
      },
      {
        path: 'ReturncarList',
        component: () => import('@/views/LogisticsCar/ReturncarList'),
        name: 'ReturncarList',
        meta: { title: 'ReturncarList', noCache: true }
      }
    ]
  },
  {
    path: '/BasicSettings',
    component: Layout,
    redirect: 'noredirect',
    name: 'BasicSettings',
    alwaysShow: true,
    meta: {
      title: 'BasicSettings',
      icon: 'shezhi',
      type: 1
    },
    children: [
      {
        path: 'Dept',
        component: () => import('@/views/BasicSettings/Dept'),
        name: 'Dept',
        meta: { title: 'Dept', noCache: true }
      },
      {
        path: 'NumberingRules',
        component: () => import('@/views/BasicSettings/NumberingRules'),
        name: 'NumberingRules',
        meta: { title: 'NumberingRules', noCache: true }
      },
      {
        path: 'SMSModelList',
        component: () => import('@/views/BasicSettings/SMSModelList'),
        name: 'SMSModelList',
        meta: { title: 'SMSModelList', noCache: true }
      },
      {
        path: 'Measurement',
        component: () => import('@/views/BasicSettings/Measurement'),
        name: 'Measurement',
        meta: { title: 'Measurement', noCache: true }
      },
      {
        path: 'Commission',
        component: () => import('@/views/BasicSettings/Commission'),
        name: 'Commission',
        meta: { title: 'Commission', noCache: true }
      },
      {
        path: 'Parameter',
        component: () => import('@/views/BasicSettings/Parameter'),
        name: 'Parameter',
        meta: { title: 'Parameter', noCache: true }
      },
      {
        path: 'NewApprovalProcess',
        component: () => import('@/views/BasicSettings/NewApprovalProcess'),
        name: 'NewApprovalProcess',
        meta: { title: 'NewApprovalProcess', noCache: false }
      },
      {
        path: 'ApprovalProcess',
        component: () => import('@/views/BasicSettings/ApprovalProcess'),
        name: 'ApprovalProcess',
        meta: { title: 'ApprovalProcess', noCache: true }
      },
      {
        path: 'BatchRules',
        component: () => import('@/views/BasicSettings/BatchRules'),
        name: 'BatchRules',
        meta: { title: 'BatchRules', noCache: true }
      },
      {
        path: 'Regional',
        component: () => import('@/views/BasicSettings/Regional'),
        name: 'Regional',
        meta: { title: 'Regional', noCache: true }
      }
    ]
  },
  // 库存管理
  {
    path: '/Stockenter',
    component: Layout,
    redirect: 'noredirect',
    name: 'Stockenter',
    alwaysShow: true,
    meta: {
      title: 'Stockenter',
      icon: 'chuku',
      type: 4
    },
    children: [
      {
        path: 'addstockenter',
        component: () => import('@/views/Stockenter/addstockenter'),
        name: 'addstockenter',
        meta: { title: 'addstockenter', noCache: false }
      },
      {
        path: 'Stockenterlist',
        component: () => import('@/views/Stockenter/Stockenterlist'),
        name: 'Stockenterlist',
        meta: { title: 'Stockenterlist', noCache: true }
      },
      {
        path: 'ProduceEnter',
        component: () => import('@/views/Stockenter/ProduceEnter'),
        name: 'ProduceEnter',
        meta: { title: 'ProduceEnter', noCache: false }
      },
      {
        path: 'ProduceEnterList',
        component: () => import('@/views/Stockenter/ProduceEnterList'),
        name: 'ProduceEnterList',
        meta: { title: 'ProduceEnterList', noCache: true }
      },
      {
        path: 'AddOtherenter',
        component: () => import('@/views/Stockenter/AddOtherenter'),
        name: 'AddOtherenter',
        meta: { title: 'AddOtherenter', noCache: false }
      },
      {
        path: 'OtherEnterList',
        component: () => import('@/views/Stockenter/OtherEnterList'),
        name: 'OtherEnterList',
        meta: { title: 'OtherEnterList', noCache: true }
      }
    ]
  },
  {
    path: '/StockOut',
    component: Layout,
    redirect: 'noredirect',
    name: 'StockOut',
    alwaysShow: true,
    meta: {
      title: 'StockOut',
      icon: 'ck',
      type: 4
    },
    children: [
      {
        path: 'AddOtherStockOut',
        component: () => import('@/views/StockOut/AddOtherStockOut'),
        name: 'AddOtherStockOut',
        meta: { title: 'AddOtherStockOut', noCache: false }
      },
      {
        path: 'OtherStockOutList',
        component: () => import('@/views/StockOut/OtherStockOutList'),
        name: 'OtherStockOutList',
        meta: { title: 'OtherStockOutList', noCache: true }
      }
    ]
  },
  {
    path: '/Storagemove',
    component: Layout,
    redirect: 'noredirect',
    name: 'Storagemove',
    alwaysShow: true,
    meta: {
      title: 'Storagemove',
      icon: 'diaobo',
      type: 4
    },
    children: [
      {
        path: 'AddStoragemove',
        component: () => import('@/views/Storagemove/AddStoragemove'),
        name: 'AddStoragemove',
        meta: { title: 'AddStoragemove', noCache: false }
      },
      {
        path: 'StoragemoveList',
        component: () => import('@/views/Storagemove/StoragemoveList'),
        name: 'StoragemoveList',
        meta: { title: 'StoragemoveList', noCache: true }
      }
      // {
      //   path: 'AddMoveApplication',
      //   component: () => import('@/views/Storagemove/AddMoveApplication'),
      //   name: 'AddMoveApplication',
      //   meta: { title: 'AddMoveApplication', noCache: false }
      // },
      // {
      //   path: 'MoveApplicationList',
      //   component: () => import('@/views/Storagemove/MoveApplicationList'),
      //   name: 'MoveApplicationList',
      //   meta: { title: 'MoveApplicationList', noCache: true }
      // }
    ]
  },
  {
    path: '/Inventorydamaged',
    component: Layout,
    redirect: 'noredirect',
    name: 'Inventorydamaged',
    alwaysShow: true,
    meta: {
      title: 'Inventorydamaged',
      icon: 'sunhuai',
      type: 4
    },
    children: [
      {
        path: 'AddInventorydamaged',
        component: () => import('@/views/Inventorydamaged/AddInventorydamaged'),
        name: 'AddInventorydamaged',
        meta: { title: 'AddInventorydamaged', noCache: false }
      },
      {
        path: 'InventorydamagedList',
        component: () => import('@/views/Inventorydamaged/InventorydamagedList'),
        name: 'InventorydamagedList',
        meta: { title: 'InventorydamagedList', noCache: true }
      }
    ]
  },
  {
    path: '/InventoryCount',
    component: Layout,
    redirect: 'noredirect',
    name: 'InventoryCount',
    alwaysShow: true,
    meta: {
      title: 'InventoryCount',
      icon: 'pandian',
      type: 4
    },
    children: [
      {
        path: 'AddInventoryCount',
        component: () => import('@/views/InventoryCount/AddInventoryCount'),
        name: 'AddInventoryCount',
        meta: { title: 'AddInventoryCount', noCache: false }
      },
      {
        path: 'InventoryCountList',
        component: () => import('@/views/InventoryCount/InventoryCountList'),
        name: 'InventoryCountList',
        meta: { title: 'InventoryCountList', noCache: true }
      }
    ]
  },
  {
    path: '/InventoryOverflow',
    component: Layout,
    redirect: 'noredirect',
    name: 'InventoryOverflow',
    alwaysShow: true,
    meta: {
      title: 'InventoryOverflow',
      icon: 'baoyi',
      type: 4
    },
    children: [
      {
        path: 'AddInventoryOverflow',
        component: () => import('@/views/InventoryOverflow/AddInventoryOverflow'),
        name: 'AddInventoryOverflow',
        meta: { title: 'AddInventoryOverflow', noCache: false }
      },
      {
        path: 'OverflowList',
        component: () => import('@/views/InventoryOverflow/OverflowList'),
        name: 'OverflowList',
        meta: { title: 'OverflowList', noCache: true }
      }
    ]
  },
  {
    path: '/AdjustPrice',
    component: Layout,
    redirect: 'noredirect',
    name: 'AdjustPrice',
    alwaysShow: true,
    meta: {
      title: 'AdjustPrice',
      icon: 'tiaojia',
      type: 4
    },
    children: [
      {
        path: 'AddAdjustPrice',
        component: () => import('@/views/AdjustPrice/AddAdjustPrice'),
        name: 'AddAdjustPrice',
        meta: { title: 'AddAdjustPrice', noCache: false }
      },
      {
        path: 'AdjustPriceList',
        component: () => import('@/views/AdjustPrice/AdjustPriceList'),
        name: 'AdjustPriceList',
        meta: { title: 'AdjustPriceList', noCache: true }
      }
    ]
  },
  {
    path: '/StockAlarm',
    component: Layout,
    redirect: 'noredirect',
    name: 'StockAlarm',
    alwaysShow: true,
    meta: {
      title: 'StockAlarm',
      icon: 'yujing',
      type: 4
    },
    children: [
      {
        path: 'StockAlarmList',
        component: () => import('@/views/StockAlarm/StockAlarmList'),
        name: 'StockAlarmList',
        meta: { title: 'StockAlarmList', noCache: true }
      },
      {
        path: 'BatchAlarm',
        component: () => import('@/views/StockAlarm/BatchAlarm'),
        name: 'BatchAlarm',
        meta: { title: 'BatchAlarm', noCache: true }
      },
      {
        path: 'AddStockAlarm',
        component: () => import('@/views/WarehouseAdjust/AddStockAlarm'),
        name: 'AddStockAlarm',
        meta: { title: 'AddStockAlarm', noCache: false }
      },
      {
        path: 'SearchStockAlarmRules',
        component: () => import('@/views/StockAlarm/SearchStockAlarmRules'),
        name: 'SearchStockAlarmRules',
        meta: { title: 'SearchStockAlarmRules', noCache: true }
      }
    ]
  },
  {
    path: '/BuildUp',
    component: Layout,
    redirect: 'noredirect',
    name: 'BuildUp',
    alwaysShow: true,
    meta: {
      title: 'BuildUp',
      icon: 'zuzhuang',
      type: 4
    },
    children: [
      {
        path: 'AddBuildUp',
        component: () => import('@/views/BuildUp/AddBuildUp'),
        name: 'AddBuildUp',
        meta: { title: 'AddBuildUp', noCache: false }
      },
      {
        path: 'BuildUpList',
        component: () => import('@/views/BuildUp/BuildUpList'),
        name: 'BuildUpList',
        meta: { title: 'BuildUpList', noCache: true }
      }
    ]
  },
  {
    path: '/TearDown',
    component: Layout,
    redirect: 'noredirect',
    name: 'TearDown',
    alwaysShow: true,
    meta: {
      title: 'TearDown',
      icon: 'chaizhuan',
      type: 4
    },
    children: [
      {
        path: 'AddTearDown',
        component: () => import('@/views/TearDown/AddTearDown'),
        name: 'AddTearDown',
        meta: { title: 'AddTearDown', noCache: false }
      },
      {
        path: 'TearDownList',
        component: () => import('@/views/TearDown/TearDownList'),
        name: 'TearDownList',
        meta: { title: 'TearDownList', noCache: true }
      }
    ]
  },
  {
    path: '/DailyAdjust',
    component: Layout,
    redirect: 'noredirect',
    name: 'DailyAdjust',
    alwaysShow: true,
    meta: {
      title: 'DailyAdjust',
      icon: 'tiaozheng',
      type: 4
    },
    children: [
      {
        path: 'AddDailyAdjust',
        component: () => import('@/views/DailyAdjust/AddDailyAdjust'),
        name: 'AddDailyAdjust',
        meta: { title: 'AddDailyAdjust', noCache: false }
      },
      {
        path: 'DailyAdjustList',
        component: () => import('@/views/DailyAdjust/DailyAdjustList'),
        name: 'DailyAdjustList',
        meta: { title: 'DailyAdjustList', noCache: true }
      }
    ]
  },
  {
    path: '/WarehouseAdjust',
    component: Layout,
    redirect: 'noredirect',
    name: 'WarehouseAdjust',
    alwaysShow: true,
    meta: {
      title: 'WarehouseAdjust',
      icon: 'kuwei',
      type: 4
    },
    children: [
      {
        path: 'AddLocationAdjust',
        component: () => import('@/views/WarehouseAdjust/AddLocationAdjust'),
        name: 'AddLocationAdjust',
        meta: { title: 'AddLocationAdjust', noCache: false }
      },
      {
        path: 'LocationAdjustList',
        component: () => import('@/views/WarehouseAdjust/LocationAdjustList'),
        name: 'LocationAdjustList',
        meta: { title: 'LocationAdjustList', noCache: true }
      },
      {
        path: 'AddInitialenter',
        component: () => import('@/views/WarehouseAdjust/AddInitialenter'),
        name: 'AddInitialenter',
        meta: { title: 'AddInitialenter', noCache: false }
      },
      {
        path: 'Enterlist',
        component: () => import('@/views/WarehouseAdjust/Enterlist'),
        name: 'Enterlist',
        meta: { title: 'Enterlist', noCache: true }
      },
      {
        path: 'AddLocation',
        component: () => import('@/views/WarehouseAdjust/AddLocation'),
        name: 'AddLocation',
        meta: { title: 'AddLocation', noCache: false }
      },
      {
        path: 'Locationlist',
        component: () => import('@/views/WarehouseAdjust/Locationlist'),
        name: 'Locationlist',
        meta: { title: 'Locationlist', noCache: true }
      },
      {
        path: 'Inventorydetaillist',
        component: () => import('@/views/WarehouseAdjust/Inventorydetaillist'),
        name: 'Inventorydetaillist',
        meta: { title: 'Inventorydetaillist', noCache: true }
      }
    ]
  },
  {
    path: '/MaterialsList',
    component: Layout,
    redirect: 'noredirect',
    name: 'MaterialsList',
    alwaysShow: true,
    meta: {
      title: 'MaterialsList',
      icon: 'wuliao',
      type: 7
    },
    children: [
      {
        path: 'AddMaterialsList',
        component: () => import('@/views/MaterialsList/AddMaterialsList'),
        name: 'AddMaterialsList',
        meta: { title: 'AddMaterialsList', noCache: false }
      },
      {
        path: 'MaterialsListli',
        component: () => import('@/views/MaterialsList/MaterialsListli'),
        name: 'MaterialsListli',
        meta: { title: 'MaterialsListli', noCache: true }
      }
    ]
  },
  {
    path: '/ProducePlan',
    component: Layout,
    redirect: 'noredirect',
    name: 'ProducePlan',
    alwaysShow: true,
    meta: {
      title: 'ProducePlan',
      icon: 'jihua',
      type: 7
    },
    children: [
      {
        path: 'AddProducePlan',
        component: () => import('@/views/ProducePlan/AddProducePlan'),
        name: 'AddProducePlan',
        meta: { title: 'AddProducePlan', noCache: false }
      },
      {
        path: 'ProducePlanList',
        component: () => import('@/views/ProducePlan/ProducePlanList'),
        name: 'ProducePlanList',
        meta: { title: 'ProducePlanList', noCache: true }
      }
    ]
  },
  {
    path: '/RequirePlan',
    component: Layout,
    redirect: 'noredirect',
    name: 'RequirePlan',
    alwaysShow: true,
    meta: {
      title: 'RequirePlan',
      icon: 'xuqiu',
      type: 7
    },
    children: [
      {
        path: 'AddRequirePlan',
        component: () => import('@/views/RequirePlan/AddRequirePlan'),
        name: 'AddRequirePlan',
        meta: { title: 'AddRequirePlan', noCache: false }
      },
      {
        path: 'RequirePlanList',
        component: () => import('@/views/RequirePlan/RequirePlanList'),
        name: 'RequirePlanList',
        meta: { title: 'RequirePlanList', noCache: true }
      }
    ]
  },
  {
    path: '/ProduceTask',
    component: Layout,
    redirect: 'noredirect',
    name: 'ProduceTask',
    alwaysShow: true,
    meta: {
      title: 'ProduceTask',
      icon: 'renwu',
      type: 7
    },
    children: [
      {
        path: 'AddProduceTask',
        component: () => import('@/views/ProduceTask/AddProduceTask'),
        name: 'AddProduceTask',
        meta: { title: 'AddProduceTask', noCache: false }
      },
      {
        path: 'ProduceTaskList',
        component: () => import('@/views/ProduceTask/ProduceTaskList'),
        name: 'ProduceTaskList',
        meta: { title: 'ProduceTaskList', noCache: true }
      },
      {
        path: 'AddProduceReport',
        component: () => import('@/views/ProduceTask/AddProduceReport'),
        name: 'AddProduceReport',
        meta: { title: 'AddProduceReport', noCache: false }
      },
      {
        path: 'ProduceReportList',
        component: () => import('@/views/ProduceTask/ProduceReportList'),
        name: 'ProduceReportList',
        meta: { title: 'ProduceReportList', noCache: true }
      }
    ]
  },
  {
    path: '/AccessMaterials',
    component: Layout,
    redirect: 'noredirect',
    name: 'AccessMaterials',
    alwaysShow: true,
    meta: {
      title: 'AccessMaterials',
      icon: 'lingliao',
      type: 7
    },
    children: [
      {
        path: 'AddAccessMaterials',
        component: () => import('@/views/AccessMaterials/AddAccessMaterials'),
        name: 'AddAccessMaterials',
        meta: { title: 'AddAccessMaterials', noCache: false }
      },
      {
        path: 'AccessMaterialsList',
        component: () => import('@/views/AccessMaterials/AccessMaterialsList'),
        name: 'AccessMaterialsList',
        meta: { title: 'AccessMaterialsList', noCache: true }
      },
      {
        path: 'AddRetreatMaterials',
        component: () => import('@/views/AccessMaterials/AddRetreatMaterials'),
        name: 'AddRetreatMaterials',
        meta: { title: 'AddRetreatMaterials', noCache: false }
      },
      {
        path: 'RetreatMaterialsList',
        component: () => import('@/views/AccessMaterials/RetreatMaterialsList'),
        name: 'RetreatMaterialsList',
        meta: { title: 'RetreatMaterialsList', noCache: true }
      }
    ]
  },
  {
    path: '/ProcessFile',
    component: Layout,
    redirect: 'noredirect',
    name: 'ProcessFile',
    alwaysShow: true,
    meta: {
      title: 'ProcessFile',
      icon: 'dangan',
      type: 7
    },
    children: [
      {
        path: 'AddWorkCenter',
        component: () => import('@/views/ProcessFile/AddWorkCenter'),
        name: 'AddWorkCenter',
        meta: { title: 'AddWorkCenter', noCache: false }
      },
      {
        path: 'WorkCenter',
        component: () => import('@/views/ProcessFile/WorkCenter'),
        name: 'WorkCenter',
        meta: { title: 'WorkCenter', noCache: true }
      },
      {
        path: 'AddProductionFile',
        component: () => import('@/views/ProcessFile/AddProductionFile'),
        name: 'AddProductionFile',
        meta: { title: 'AddProductionFile', noCache: false }
      },
      {
        path: 'ProductionFile',
        component: () => import('@/views/ProcessFile/ProductionFile'),
        name: 'ProductionFile',
        meta: { title: 'ProductionFile', noCache: true }
      },
      {
        path: 'AddStandardProcess',
        component: () => import('@/views/ProcessFile/AddStandardProcess'),
        name: 'AddStandardProcess',
        meta: { title: 'AddStandardProcess', noCache: false }
      },
      {
        path: 'StandardProcess',
        component: () => import('@/views/ProcessFile/StandardProcess'),
        name: 'StandardProcess',
        meta: { title: 'StandardProcess', noCache: true }
      }
    ]
  },
  {
    path: '/OutFactory',
    component: Layout,
    redirect: 'noredirect',
    name: 'OutFactory',
    alwaysShow: true,
    meta: {
      title: 'OutFactory',
      icon: 'waibao',
      type: 7
    },
    children: [
      {
        path: 'AddOutFactory',
        component: () => import('@/views/OutFactory/AddOutFactory'),
        name: 'AddOutFactory',
        meta: { title: 'AddOutFactory', noCache: false }
      },
      {
        path: 'OutFactoryList',
        component: () => import('@/views/OutFactory/OutFactoryList'),
        name: 'OutFactoryList',
        meta: { title: 'OutFactoryList', noCache: true }
      }
    ]
  },
  {
    path: '/OutSourcing',
    component: Layout,
    redirect: 'noredirect',
    name: 'OutSourcing',
    alwaysShow: true,
    meta: {
      title: 'OutSourcing',
      icon: 'waibaodan',
      type: 7
    },
    children: [
      {
        path: 'AddOutSourcing',
        component: () => import('@/views/OutSourcing/AddOutSourcing'),
        name: 'AddOutSourcing',
        meta: { title: 'AddOutSourcing', noCache: false }
      },
      {
        path: 'OutSourcingList',
        component: () => import('@/views/OutSourcing/OutSourcingList'),
        name: 'OutSourcingList',
        meta: { title: 'OutSourcingList', noCache: true }
      }
    ]
  },
  {
    path: '/StockApply',
    component: Layout,
    redirect: 'noredirect',
    name: 'StockApply',
    alwaysShow: true,
    meta: {
      title: 'StockApply',
      icon: 'shenqing',
      type: 2
    },
    children: [
      {
        path: 'AddStockApply',
        component: () => import('@/views/StockApply/AddStockApply'),
        name: 'AddStockApply',
        meta: { title: 'AddStockApply', noCache: false }
      },
      {
        path: 'StockApplyList',
        component: () => import('@/views/StockApply/StockApplyList'),
        name: 'StockApplyList',
        meta: { title: 'StockApplyList', noCache: true }
      }
    ]
  },
  {
    path: '/StockRequire',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      icon: 'caigouxuqiu',
      type: 2
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/StockRequire/index'),
        name: 'StockRequire',
        meta: { title: 'StockRequire', noCache: true }
      }
    ]
  },
  {
    path: '/StockPlan',
    component: Layout,
    redirect: 'noredirect',
    name: 'StockPlan',
    alwaysShow: true,
    meta: {
      title: 'StockPlan',
      icon: 'caigoujihua',
      type: 2
    },
    children: [
      {
        path: 'AddStockPlan',
        component: () => import('@/views/StockPlan/AddStockPlan'),
        name: 'AddStockPlan',
        meta: { title: 'AddStockPlan', noCache: false }
      },
      {
        path: 'StockPlanList',
        component: () => import('@/views/StockPlan/StockPlanList'),
        name: 'StockPlanList',
        meta: { title: 'StockPlanList', noCache: true }
      }
    ]
  },
  {
    path: '/StockInquiry',
    component: Layout,
    redirect: 'noredirect',
    name: 'StockInquiry',
    alwaysShow: true,
    meta: {
      title: 'StockInquiry',
      icon: 'xunjia',
      type: 2
    },
    children: [
      {
        path: 'AddStockInquiry',
        component: () => import('@/views/StockInquiry/AddStockInquiry'),
        name: 'AddStockInquiry',
        meta: { title: 'AddStockInquiry', noCache: false }
      },
      {
        path: 'StockInquiryList',
        component: () => import('@/views/StockInquiry/StockInquiryList'),
        name: 'StockInquiryList',
        meta: { title: 'StockInquiryList', noCache: true }
      }
    ]
  },
  {
    path: '/StockContract',
    component: Layout,
    redirect: 'noredirect',
    name: 'StockContract',
    alwaysShow: true,
    meta: {
      title: 'StockContract',
      icon: 'caigouhetong',
      type: 2
    },
    children: [
      {
        path: 'AddStockContract',
        component: () => import('@/views/StockContract/AddStockContract'),
        name: 'AddStockContract',
        meta: { title: 'AddStockContract', noCache: false }
      },
      {
        path: 'StockContractList',
        component: () => import('@/views/StockContract/StockContractList'),
        name: 'StockContractList',
        meta: { title: 'StockContractList', noCache: true }
      }
    ]
  },
  {
    path: '/StockOrder',
    component: Layout,
    redirect: 'noredirect',
    name: 'StockOrder',
    alwaysShow: true,
    meta: {
      title: 'StockOrder',
      icon: 'caigoudingdan',
      type: 2
    },
    children: [
      {
        path: 'AddStockOrder',
        component: () => import('@/views/StockOrder/AddStockOrder'),
        name: 'AddStockOrder',
        meta: { title: 'AddStockOrder', noCache: false }
      },
      {
        path: 'StockOrderList',
        component: () => import('@/views/StockOrder/StockOrderList'),
        name: 'StockOrderList',
        meta: { title: 'StockOrderList', noCache: true }
      }
    ]
  },
  {
    path: '/StockArrival',
    component: Layout,
    redirect: 'noredirect',
    name: 'StockArrival',
    alwaysShow: true,
    meta: {
      title: 'StockArrival',
      icon: 'caigoudaohuo',
      type: 2
    },
    children: [
      {
        path: 'AddStockArrival',
        component: () => import('@/views/StockArrival/AddStockArrival'),
        name: 'AddStockArrival',
        meta: { title: 'AddStockArrival', noCache: false }
      },
      {
        path: 'StockArrivalList',
        component: () => import('@/views/StockArrival/StockArrivalList'),
        name: 'StockArrivalList',
        meta: { title: 'StockArrivalList', noCache: true }
      }
    ]
  },
  {
    path: '/StockRetreat',
    component: Layout,
    redirect: 'noredirect',
    name: 'StockRetreat',
    alwaysShow: true,
    meta: {
      title: 'StockRetreat',
      icon: 'caigoutuihuo',
      type: 2
    },
    children: [
      {
        path: 'AddStockRetreat',
        component: () => import('@/views/StockRetreat/AddStockRetreat'),
        name: 'AddStockRetreat',
        meta: { title: 'AddStockRetreat', noCache: false }
      }
    ]
  },
  {
    path: '/StockCategory',
    component: Layout,
    redirect: 'noredirect',
    name: 'StockCategory',
    alwaysShow: true,
    meta: {
      title: 'StockCategory',
      icon: 'shuxing',
      type: 2
    },
    children: [
      {
        path: 'StockCategoryList',
        component: () => import('@/views/StockCategory/StockCategoryList'),
        name: 'StockCategoryList',
        meta: { title: 'StockCategoryList', noCache: false }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
