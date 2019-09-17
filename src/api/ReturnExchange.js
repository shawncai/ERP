import request from '@/utils/request'

// 新建换货单
export function addReturnExchange(query, query2, query3, query4) {
  var params = new URLSearchParams()
  params.append('returnExchangeJson', query) // 你要传给后台的参数值 key/value
  params.append('returnExchangeOutJson', query2) // 你要传给后台的参数值 key/value
  params.append('returnExchangeRetreatJson', query3) // 你要传给后台的参数值 key/value
  if (query4.repositoryId !== '' && query4.repositoryId !== null && query4.repositoryId !== undefined) {
    params.append('repositoryId', query4.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query4.regionId !== '' && query4.regionId !== null && query4.regionId !== undefined) {
    params.append('regionId', query4.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/returnExchange/addReturnExchange',
    method: 'post',
    data: params
  })
}

//  换货单列表
export function exchangelist(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.exchangeNumber !== '' && query.exchangeNumber !== null && query.exchangeNumber !== undefined) {
    params.append('exchangeNumber', query.exchangeNumber) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.saleRepositoryId !== '' && query.saleRepositoryId !== null && query.saleRepositoryId !== undefined) {
    params.append('saleRepositoryId', query.saleRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.customerName !== '' && query.customerName !== null && query.customerName !== undefined) {
    params.append('customerName', query.customerName) // 你要传给后台的参数值 key/value
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
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/returnExchange/exchangelist',
    method: 'post',
    data: params
  })
}

// 修改换货单
export function updateReturnExchange(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('returnExchangeJson', query) // 你要传给后台的参数值 key/value
  params.append('returnExchangeOutJson', query2) // 你要传给后台的参数值 key/value
  params.append('returnExchangeRetreatJson', query3) // 你要传给后台的参数值 key/value
  return request({
    url: '/returnExchange/updateReturnExchange',
    method: 'post',
    data: params
  })
}

// 删除换货单
export function deleteReturnExchange(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('exchangeIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/returnExchange/deleteReturnExchange',
    method: 'post',
    data: params
  })
}

// 审核换货单
export function updateReturnExchange2(query) {
  var params = new URLSearchParams()
  params.append('returnExchangeJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/returnExchange/updateReturnExchange',
    method: 'post',
    data: params
  })
}
