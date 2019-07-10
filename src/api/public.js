import request from '@/utils/request'

// 国家列表
export function getcountrylist(query) {
  return request({
    url: '/erp/country/getcountrylist',
    method: 'post',
    params: query
  })
}

// 全部区域
export function regionlist(query) {
  return request({
    url: '/erp/region/detaillist',
    method: 'post',
    params: query
  })
}

// 查询下一级区域
export function listbyparentid(query) {
  var params = new URLSearchParams()
  if (query.region !== '' && query.region !== null && query.region !== undefined) {
    params.append('parentid', query.region) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/region/listbyparentid',
    method: 'post',
    data: params
  })
}

// 查询区域名称
export function searchregionName(query) {
  var params = new URLSearchParams()
  if (query.regionid !== '' && query.regionid !== null && query.regionid !== undefined) {
    params.append('regionid', query.regionid) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/region/list',
    method: 'post',
    data: params
  })
}

// 根据区域查门店
export function searchRepository(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('regionId', query) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', 1) // 你要传给后台的参数值 key/value
  params.append('pagesize', 99999) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/repository/searchRepository',
    method: 'post',
    data: params
  })
}

// 省列表
export function getprovincelist(query) {
  var params = new URLSearchParams()
  params.append('countryid', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/country/getprovincelist',
    method: 'post',
    data: params
  })
}

// 市列表
export function getcitylist(query) {
  var params = new URLSearchParams()
  params.append('provinceid', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/country/getcitylist',
    method: 'post',
    data: params
  })
}

// 批次查询
export function batchlist(query, query3) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('repositoryId', query) // 你要传给后台的参数值 key/value
  }
  if (query3 !== '' && query3 !== null && query3 !== undefined) {
    params.append('productCode', query3) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/location/batchlist',
    method: 'post',
    data: params
  })
}

// 库存余量查询
export function getQuantity(query, query2, query3, query4) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('repositoryId', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('locationId', query2) // 你要传给后台的参数值 key/value
  }
  if (query3 !== '' && query3 !== null && query3 !== undefined) {
    params.append('productCode', query3) // 你要传给后台的参数值 key/value
  }
  if (query4 !== '' && query4 !== null && query4 !== undefined) {
    params.append('batch', query4) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/location/getQuantity',
    method: 'post',
    data: params
  })
}

// 单一货位列表
export function getlocation(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('repositoryId', query) // 你要传给后台的参数值 key/value
  }
  if (query2.productCode !== '' && query2.productCode !== null && query2.productCode !== undefined) {
    params.append('productCode', query2.productCode) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/location/getlocation',
    method: 'post',
    data: params
  })
}

// 单一货位列表
export function getlocation6(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('repositoryId', query) // 你要传给后台的参数值 key/value
  }
  if (query2.toolsCode !== '' && query2.toolsCode !== null && query2.toolsCode !== undefined) {
    params.append('productCode', query2.toolsCode) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/location/getlocation',
    method: 'post',
    data: params
  })
}

// 货位列表
export function locationlist(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('searchRepositoryId', query) // 你要传给后台的参数值 key/value
  }
  // params.append('repositoryId', this.$store.getters.repositoryId) // 你要传给后台的参数值 key/value
  // params.append('regionIds', this.$store.getters.regionId) // 你要传给后台的参数值 key/value
  params.append('pageNum', 1) // 你要传给后台的参数值 key/value
  params.append('pageSize', 99999) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/location/locationlist',
    method: 'post',
    data: params
  })
}

// 计算计划数量
export function calPlanQuantity(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('repositoryId', query) // 你要传给后台的参数值 key/value
  }
  if (query2.id !== '' && query2.id !== null && query2.id !== undefined) {
    params.append('productId', query2.id) // 你要传给后台的参数值 key/value
  }
  if (query2.requireQuantity !== '' && query2.requireQuantity !== null && query2.requireQuantity !== undefined) {
    params.append('requireQuantity', query2.requireQuantity) // 你要传给后台的参数值 key/value
  }
  if (query2.productCode !== '' && query2.productCode !== null && query2.productCode !== undefined) {
    params.append('productCode', query2.productCode) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/requireplan/calPlanQuantity',
    method: 'post',
    data: params
  })
}

// Bom编码列表
export function materialslist() {
  var params = new URLSearchParams()
  params.append('pageNum', 1) // 你要传给后台的参数值 key/value
  params.append('pageSize', 9999) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/materialslist/materialslist',
    method: 'post',
    data: params
  })
}

// 工艺中心列表
export function searchprocessFile() {
  var params = new URLSearchParams()
  params.append('stat', 1) // 你要传给后台的参数值 key/value
  params.append('pageNum', 1) // 你要传给后台的参数值 key/value
  params.append('pageSize', 9999) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/processFile/search',
    method: 'post',
    data: params
  })
}

// 工作中心列表
export function searchworkCenter(query) {
  var params = new URLSearchParams()
  params.append('deptId', query)
  params.append('stat', 1) // 你要传给后台的参数值 key/value
  params.append('pageNum', 1) // 你要传给后台的参数值 key/value
  params.append('pageSize', 99999) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/workCenter/search',
    method: 'post',
    data: params
  })
}

// 物料需求计划列表
export function requireplanlist(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('sourceNumber', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/requireplan/requireplanlist',
    method: 'post',
    data: params
  })
}

// zcc存区域数组数据
export function saveRegion(query, query2) {
  var params = new URLSearchParams()
  params.append('zcc', query) // 你要传给后台的参数值 key/value
  params.append('regionId', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/zcc/saveRegion',
    method: 'post',
    data: params
  })
}

// zcc存区域数组数据
export function getRegion(query) {
  var params = new URLSearchParams()
  params.append('regionId', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/zcc/getRegion',
    method: 'post',
    data: params
  })
}

// 查询商品详情
export function productlist(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('code', query) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', 1) // 你要传给后台的参数值 key/value
  params.append('pagesize', 99999) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/product/productlist',
    method: 'post',
    data: params
  })
}

// 查询计量单位列表
export function searchMea(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('categoryname', query) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', 1) // 你要传给后台的参数值 key/value
  params.append('pagesize', 9999) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/measurement/search',
    method: 'post',
    data: params
  })
}

// 查询供应商
export function searchsupplier(query) {
  var params = new URLSearchParams()
  params.append('supplierName', query) // 你要传给后台的参数值 key/value
  params.append('pagenum', 1) // 你要传给后台的参数值 key/value
  params.append('pagesize', 99999) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/supplier/search',
    method: 'post',
    data: params
  })
}

// 应付款列表
export function shouldPayList(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('supplierId', query) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', 1) // 你要传给后台的参数值 key/value
  params.append('pageSize', 9999) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/payment/shouldPayList',
    method: 'post',
    data: params
  })
}

// 递归值
export function getId() {
  return request({
    url: '/erp/zcc/getId',
    method: 'post'
  })
}

// 判断是否允许申请
export function existList(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('customerPhone', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/installmentapply/existList',
    method: 'post',
    data: params
  })
}

// 经销商应收款
export function agentCollectList(query) {
  var params = new URLSearchParams()
  if (query.collectId !== '' && query.collectId !== null && query.collectId !== undefined) {
    params.append('collectId', query.collectId) // 你要传给后台的参数值 key/value
  }
  if (query.sourceNumber !== '' && query.sourceNumber !== null && query.sourceNumber !== undefined) {
    params.append('sourceNumber', query.sourceNumber) // 你要传给后台的参数值 key/value
  }
  // if (query.agentName !== '' && query.agentName !== null && query.agentName !== undefined) {
  //   params.append('agentName', query.agentName) // 你要传给后台的参数值 key/value
  // }
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('agentId', query.id) // 你要传给后台的参数值 key/value
  }
  // if (query.saleRepositoryId !== '' && query.saleRepositoryId !== null && query.saleRepositoryId !== undefined) {
  //   params.append('saleRepositoryId', query.saleRepositoryId) // 你要传给后台的参数值 key/value
  // }
  params.append('repositoryId', 0) // 你要传给后台的参数值 key/value
  params.append('pageNum', 1) // 你要传给后台的参数值 key/value
  params.append('pageSize', 9999) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/agentCollect/agentCollectList',
    method: 'post',
    data: params
  })
}

// 取角色名称
export function getDetailById(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('detailId', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/role/getDetailById',
    method: 'post',
    data: params
  })
}

// 根据登陆者区域id和门店id获取在其下区域
export function getregionlistbyreid(query) {
  var params = new URLSearchParams()
  if (query.loginRepositoryId !== '' && query.loginRepositoryId !== null && query.loginRepositoryId !== undefined) {
    params.append('repositoryid', query.loginRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionid', query.regionIds) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/region/getregionlistbyreid',
    method: 'post',
    data: params
  })
}

// 查看单据进程
export function checkReceiptApply(query) {
  var params = new URLSearchParams()
  params.append('applyNumber', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/receiptStat/checkReceiptApply',
    method: 'post',
    data: params
  })
}

// 查看单据进程
export function checkReceiptPlan(query) {
  var params = new URLSearchParams()
  params.append('planNumber', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/receiptStat/checkReceiptPlan',
    method: 'post',
    data: params
  })
}

// 查看单据进程
export function checkReceiptOrder(query) {
  var params = new URLSearchParams()
  params.append('orderNumber', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/receiptStat/checkReceiptOrder',
    method: 'post',
    data: params
  })
}

// 查看单据进程
export function checkReceiptOrder2(query) {
  var params = new URLSearchParams()
  params.append('orderNumber', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/saleReceiptStat/checkReceiptOrder',
    method: 'post',
    data: params
  })
}

// 查看单据进程
export function checkReceiptOpportunity(query) {
  var params = new URLSearchParams()
  params.append('opportunityNumber', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/saleReceiptStat/checkReceiptOpportunity',
    method: 'post',
    data: params
  })
}

// 查看单据进程
export function checkReceiptApply2(query) {
  var params = new URLSearchParams()
  params.append('applyNumber', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/installmentReceiptStat/checkReceiptApply',
    method: 'post',
    data: params
  })
}
