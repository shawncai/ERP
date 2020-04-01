import request from '@/utils/request'

//  添加采购到货
export function createstockArrival(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/stockArrival/create',
    method: 'post',
    data: params
  })
}

// 查询采购到货
export function searchstockArrival(query) {
  var params = new URLSearchParams()
  if (query.number !== '' && query.number !== null && query.number !== undefined) {
    params.append('number', query.number) // 你要传给后台的参数值 key/value
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
  if (query.stockPersonId !== '' && query.stockPersonId !== null && query.stockPersonId !== undefined) {
    params.append('stockPersonId', query.stockPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.sourceType !== '' && query.sourceType !== null && query.sourceType !== undefined) {
    params.append('sourceType', query.sourceType) // 你要传给后台的参数值 key/value
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
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', 0) // 你要传给后台的参数值 key/value
  }
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId', query.createPersonId) // 你要传给后台的参数值 key/value
  }
  // if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
  //   params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  // }
  if (query.isActive !== '' && query.isActive !== null && query.isActive !== undefined) {
    params.append('isActive', query.isActive) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/stockArrival/search',
    method: 'post',
    data: params
  })
}

//  修改采购到货
export function updatestockArrival(query, query2) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/stockArrival/update',
    method: 'post',
    data: params
  })
}

//  审批采购到货
export function updatestockArrival2(query) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/stockArrival/update',
    method: 'post',
    data: params
  })
}

// 删除采购到货
export function deletestockArrival(query, query2) {
  var params = new URLSearchParams()
  params.append('modelids', query) // 你要传给后台的参数值 key/value
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/stockArrival/delete',
    method: 'post',
    data: params
  })
}

// 查询采购到货进程
export function queryArrivalProcess(query) {
  var params = new URLSearchParams()
  params.append('arrivalNumber', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/receiptStat/checkReceiptArrival',
    method: 'post',
    data: params
  })
}
