import request from '@/utils/request'

//  新建采购订单
export function addstockorder(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('stockOrderJson', query) // 你要传给后台的参数值 key/value
  params.append('stockOrderDetailJson', query2) // 你要传给后台的参数值 key/value
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/stockorder/addstockorder',
    method: 'post',
    data: params
  })
}

// 采购订单列表
export function stockorderlist(query) {
  var params = new URLSearchParams()
  if (query.orderNumber !== '' && query.orderNumber !== null && query.orderNumber !== undefined) {
    params.append('orderNumber', query.orderNumber) // 你要传给后台的参数值 key/value
  }
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productName', query.productName) // 你要传给后台的参数值 key/value
  }
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.supplierId !== '' && query.supplierId !== null && query.supplierId !== undefined) {
    params.append('supplierId', query.supplierId) // 你要传给后台的参数值 key/value
  }
  if (query.deptId !== '' && query.deptId !== null && query.deptId !== undefined) {
    params.append('deptId', query.deptId) // 你要传给后台的参数值 key/value
  }
  if (query.stockType !== '' && query.stockType !== null && query.stockType !== undefined) {
    params.append('stockType', query.stockType) // 你要传给后台的参数值 key/value
  }
  if (query.stockPersonId !== '' && query.stockPersonId !== null && query.stockPersonId !== undefined) {
    params.append('stockPersonId', query.stockPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.sourceType !== '' && query.sourceType !== null && query.sourceType !== undefined) {
    params.append('sourceType', query.sourceType) // 你要传给后台的参数值 key/value
  }
  if (query.judgeStat !== '' && query.judgeStat !== null && query.judgeStat !== undefined) {
    params.append('judgeStat', query.judgeStat) // 你要传给后台的参数值 key/value
  }
  if (query.receiptStat !== '' && query.receiptStat !== null && query.receiptStat !== undefined) {
    params.append('receiptStat', query.receiptStat) // 你要传给后台的参数值 key/value
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
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId', query.createPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  if (query.isActive !== '' && query.isActive !== null && query.isActive !== undefined) {
    params.append('isActive', query.isActive) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/stockorder/stockorderlist',
    method: 'post',
    data: params
  })
}
// 查询是否被调用
export function stockorderlist2(query) {
  var params = new URLSearchParams()
  params.append('repositoryId', 0) // 你要传给后台的参数值 key/value
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  if (query.sourceNumber !== '' && query.sourceNumber !== null && query.sourceNumber !== undefined) {
    params.append('sourceNumber', query.sourceNumber) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/stockorder/stockorderlist',
    method: 'post',
    data: params
  })
}

//  更新采购订单
export function updatestockorder(query, query2) {
  var params = new URLSearchParams()
  params.append('stockOrderJson', query) // 你要传给后台的参数值 key/value
  params.append('stockOrderDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/stockorder/updatestockorder',
    method: 'post',
    data: params
  })
}

// 删除采购订单
export function deletestockorder(query, query2) {
  var params = new URLSearchParams()
  params.append('orderIds', query) // 你要传给后台的参数值 key/value
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/stockorder/deletestockorder',
    method: 'post',
    data: params
  })
}

//  审核采购订单
export function updatestockorder2(query) {
  var params = new URLSearchParams()
  params.append('stockOrderJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/stockorder/updatestockorder',
    method: 'post',
    data: params
  })
}
