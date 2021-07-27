import request from '@/utils/request'

// 添加销售出库单
export function createsaleOut(query, query2, query3, query4, query5, query6, query7) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  if (query3) {
    params.append('giftJson', query3) // 你要传给后台的参数值 key/value
  }
  if (query4.repositoryId !== '' && query4.repositoryId !== null && query4.repositoryId !== undefined) {
    params.append('repositoryId', query4.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query4.regionId !== '' && query4.regionId !== null && query4.regionId !== undefined) {
    params.append('regionId', query4.regionId) // 你要传给后台的参数值 key/value
  }
  params.append('receivableMoney2', query5) // 你要传给后台的参数值 key/value
  if (query6) {
    params.append('retreatJson', query6) // 你要传给后台的参数值 key/value
  }
  if (query7) {
    params.append('serviceJson', query7) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/saleOut/create',
    method: 'post',
    data: params
  })
}

//  查询销售出库单极速版
export function saleOutGetList(query) {
  var params = new URLSearchParams()
  if (query.isReturn !== '' && query.isReturn !== null && query.isReturn !== undefined) {
    params.append('isReturn', query.isReturn) // 你要传给后台的参数值 key/value
  }
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.number !== '' && query.number !== null && query.number !== undefined) {
    params.append('number', query.number) // 你要传给后台的参数值 key/value
  }
  if (query.isFree !== '' && query.isFree !== null && query.isFree !== undefined) {
    params.append('isFree', query.isFree) // 你要传给后台的参数值 key/value
  }
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productName', query.productName) // 你要传给后台的参数值 key/value
  }
  if (query.outPersonId !== '' && query.outPersonId !== null && query.outPersonId !== undefined) {
    params.append('outPersonId', query.outPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.sourceNumber !== '' && query.sourceNumber !== null && query.sourceNumber !== undefined) {
    params.append('sourceNumber', query.sourceNumber) // 你要传给后台的参数值 key/value
  }
  if (query.saleRepositoryId !== '' && query.saleRepositoryId !== null && query.saleRepositoryId !== undefined) {
    params.append('saleRepositoryId', query.saleRepositoryId) // 你要传给后台的参数值 key/value
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
  if (query.customerType !== '' && query.customerType !== null && query.customerType !== undefined) {
    params.append('customerType', query.customerType) // 你要传给后台的参数值 key/value
  }
  if (query.customerName !== '' && query.customerName !== null && query.customerName !== undefined) {
    params.append('customerName', query.customerName) // 你要传给后台的参数值 key/value
  }
  if (query.carCode !== '' && query.carCode !== null && query.carCode !== undefined) {
    params.append('carCode', query.carCode) // 你要传给后台的参数值 key/value
  }
  if (query.motorCode !== '' && query.motorCode !== null && query.motorCode !== undefined) {
    params.append('motorCode', query.motorCode) // 你要传给后台的参数值 key/value
  }
  if (query.batteryCode !== '' && query.batteryCode !== null && query.batteryCode !== undefined) {
    params.append('batteryCode', query.batteryCode) // 你要传给后台的参数值 key/value
  }
  if (query.customerId !== '' && query.customerId !== null && query.customerId !== undefined) {
    params.append('customerId', query.customerId) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/saleOut/getList',
    method: 'post',
    data: params
  })
}

//  查询销售出库单
export function searchsaleOut(query) {
  var params = new URLSearchParams()
  if (query.isReturn !== '' && query.isReturn !== null && query.isReturn !== undefined) {
    params.append('isReturn', query.isReturn) // 你要传给后台的参数值 key/value
  }
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.number !== '' && query.number !== null && query.number !== undefined) {
    params.append('number', query.number) // 你要传给后台的参数值 key/value
  }
  if (query.isFree !== '' && query.isFree !== null && query.isFree !== undefined) {
    params.append('isFree', query.isFree) // 你要传给后台的参数值 key/value
  }
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productName', query.productName) // 你要传给后台的参数值 key/value
  }
  if (query.outPersonId !== '' && query.outPersonId !== null && query.outPersonId !== undefined) {
    params.append('outPersonId', query.outPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.sourceNumber !== '' && query.sourceNumber !== null && query.sourceNumber !== undefined) {
    params.append('sourceNumber', query.sourceNumber) // 你要传给后台的参数值 key/value
  }
  if (query.saleRepositoryId !== '' && query.saleRepositoryId !== null && query.saleRepositoryId !== undefined) {
    params.append('saleRepositoryId', query.saleRepositoryId) // 你要传给后台的参数值 key/value
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
  if (query.customerType !== '' && query.customerType !== null && query.customerType !== undefined) {
    params.append('customerType', query.customerType) // 你要传给后台的参数值 key/value
  }
  if (query.customerName !== '' && query.customerName !== null && query.customerName !== undefined) {
    params.append('customerName', query.customerName) // 你要传给后台的参数值 key/value
  }
  if (query.carCode !== '' && query.carCode !== null && query.carCode !== undefined) {
    params.append('carCode', query.carCode) // 你要传给后台的参数值 key/value
  }
  if (query.motorCode !== '' && query.motorCode !== null && query.motorCode !== undefined) {
    params.append('motorCode', query.motorCode) // 你要传给后台的参数值 key/value
  }
  if (query.batteryCode !== '' && query.batteryCode !== null && query.batteryCode !== undefined) {
    params.append('batteryCode', query.batteryCode) // 你要传给后台的参数值 key/value
  }
  if (query.customerId !== '' && query.customerId !== null && query.customerId !== undefined) {
    params.append('customerId', query.customerId) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/saleOut/search',
    method: 'post',
    data: params
  })
}

// 修改销售出库单
export function updatesaleOut(query, query2, query3, query4, query5, query6) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  if (query3) {
    params.append('giftJson', query3) // 你要传给后台的参数值 key/value
  }
  params.append('receivableMoney2', query4) // 你要传给后台的参数值 key/value
  if (query5) {
    params.append('retreatJson', query5) // 你要传给后台的参数值 key/value
  }
  if (query6) {
    params.append('serviceJson', query6) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/saleOut/update',
    method: 'post',
    data: params
  })
}

// 删除销售出库单
export function deletesaleOut(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/saleOut/delete',
    method: 'post',
    data: params
  })
}

// 审核销售订单
export function updatesaleOut2(query) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/saleOut/update',
    method: 'post',
    data: params
  })
}

// 检查客户是否当天购买商品
export function getCustomerOutCount(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('customerId', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/saleOut/getCustomerOutCount',
    method: 'post',
    data: params
  })
}

// 检查发票是否重复同一门店
export function checkInvoiceExist(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('invoiceNumber', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('repositoryId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/saleOut/checkInvoiceExist',
    method: 'post',
    data: params
  })
}

