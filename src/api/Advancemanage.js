import request from '@/utils/request'

// 新建预售商品
export function addadvanceproduct(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('advanceProductJson', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/advanceproduct/addadvanceproduct',
    method: 'post',
    data: params
  })
}

// 预售商品列表
export function advancelist(query) {
  var params = new URLSearchParams()
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productName', query.productName) // 你要传给后台的参数值 key/value
  }
  if (query.productCode !== '' && query.productCode !== null && query.productCode !== undefined) {
    params.append('productCode', query.productCode) // 你要传给后台的参数值 key/value
  }
  if (query.advanceMode !== '' && query.advanceMode !== null && query.advanceMode !== undefined) {
    params.append('advanceMode', query.advanceMode) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '' && query.stat !== null && query.stat !== undefined) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  if (query.productType !== '' && query.productType !== null && query.productType !== undefined) {
    params.append('productType', query.productType) // 你要传给后台的参数值 key/value
  }
  if (query.isUse !== '' && query.isUse !== null && query.isUse !== undefined) {
    params.append('isUse', query.isUse) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/advanceproduct/advancelist',
    method: 'post',
    data: params
  })
}

//  修改预售商品
export function updateadvanceproduct(query) {
  var params = new URLSearchParams()
  params.append('advanceProductJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/advanceproduct/updateadvanceproduct',
    method: 'post',
    data: params
  })
}

// 删除预售商品
export function deleteadvanceproduct(query, query2) {
  var params = new URLSearchParams()
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('advanceId', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/advanceproduct/deleteadvanceproduct',
    method: 'post',
    data: params
  })
}

// 新建预售单
export function addadvanceorder(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('advanceOrderJson', query) // 你要传给后台的参数值 key/value
  params.append('advanceOrderDetailJson', query2) // 你要传给后台的参数值 key/value
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/advanceorder/addadvanceorder',
    method: 'post',
    data: params
  })
}

// 预售单列表
export function advanceorderlist(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.advanceNumber !== '' && query.advanceNumber !== null && query.advanceNumber !== undefined) {
    params.append('advanceNumber', query.advanceNumber) // 你要传给后台的参数值 key/value
  }
  if (query.customerName !== '' && query.customerName !== null && query.customerName !== undefined) {
    params.append('customerName', query.customerName) // 你要传给后台的参数值 key/value
  }
  if (query.salePersonId !== '' && query.salePersonId !== null && query.salePersonId !== undefined) {
    params.append('salePersonId', query.salePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.judgeStat !== '' && query.judgeStat !== null && query.judgeStat !== undefined) {
    params.append('judgeStat', query.judgeStat) // 你要传给后台的参数值 key/value
  }
  if (query.receiptStat !== '' && query.receiptStat !== null && query.receiptStat !== undefined) {
    params.append('receiptStat', query.receiptStat) // 你要传给后台的参数值 key/value
  }
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId', query.createPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/advanceorder/advanceorderlist',
    method: 'post',
    data: params
  })
}

//  修改预售单
export function updateadvanceorder(query, query2) {
  var params = new URLSearchParams()
  params.append('advanceOrderJson', query) // 你要传给后台的参数值 key/value
  params.append('advanceOrderDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/advanceorder/updateadvanceorder',
    method: 'post',
    data: params
  })
}

// 删除预售商品
export function deleteadvanceorder(query, query2) {
  var params = new URLSearchParams()
  params.append('orderIds', query) // 你要传给后台的参数值 key/value
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/advanceorder/deleteadvanceorder',
    method: 'post',
    data: params
  })
}

//  审核预售单
export function updateadvanceorder2(query) {
  var params = new URLSearchParams()
  params.append('advanceOrderJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/advanceorder/updateadvanceorder',
    method: 'post',
    data: params
  })
}

// 新建预售退款单
export function addadvancereturn(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('advanceReturnJson', query) // 你要传给后台的参数值 key/value
  params.append('advanceReturnDetailJson', query2) // 你要传给后台的参数值 key/value
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/advancereturn/addadvancereturn',
    method: 'post',
    data: params
  })
}

// 预售退款单列表
export function advancereturnlist(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.returnNumber !== '' && query.returnNumber !== null && query.returnNumber !== undefined) {
    params.append('returnNumber', query.returnNumber) // 你要传给后台的参数值 key/value
  }
  if (query.customerName !== '' && query.customerName !== null && query.customerName !== undefined) {
    params.append('customerName', query.customerName) // 你要传给后台的参数值 key/value
  }
  if (query.salePersonId !== '' && query.salePersonId !== null && query.salePersonId !== undefined) {
    params.append('salePersonId', query.salePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.sourceNumber !== '' && query.sourceNumber !== null && query.sourceNumber !== undefined) {
    params.append('sourceNumber', query.sourceNumber) // 你要传给后台的参数值 key/value
  }
  if (query.judgeStat !== '' && query.judgeStat !== null && query.judgeStat !== undefined) {
    params.append('judgeStat', query.judgeStat) // 你要传给后台的参数值 key/value
  }
  if (query.receiptStat !== '' && query.receiptStat !== null && query.receiptStat !== undefined) {
    params.append('receiptStat', query.receiptStat) // 你要传给后台的参数值 key/value
  }
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId', query.createPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/advancereturn/advancereturnlist',
    method: 'post',
    data: params
  })
}

//  修改预售退款单
export function updateadvancereturn(query, query2) {
  var params = new URLSearchParams()
  params.append('advanceReturnJson', query) // 你要传给后台的参数值 key/value
  params.append('advanceReturnDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/advancereturn/updateadvancereturn',
    method: 'post',
    data: params
  })
}

// 删除预售退款单
export function deleteadvancereturn(query, query2) {
  var params = new URLSearchParams()
  params.append('returnIds', query) // 你要传给后台的参数值 key/value
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/advancereturn/deleteadvancereturn',
    method: 'post',
    data: params
  })
}

//  审核预售退款单
export function updateadvancereturn2(query) {
  var params = new URLSearchParams()
  params.append('advanceReturnJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/advancereturn/updateadvancereturn',
    method: 'post',
    data: params
  })
}
