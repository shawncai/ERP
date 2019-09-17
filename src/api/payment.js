import request from '@/utils/request'

//  新建付款单
export function addpayment(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('paymentJson', query) // 你要传给后台的参数值 key/value
  params.append('paymentDetailJson', query2) // 你要传给后台的参数值 key/value
  if (query3.picids !== '' && query3.picids !== null && query3.picids !== undefined) {
    params.append('picids', query3.picids) // 你要传给后台的参数值 key/value
  }
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/payment/addpayment',
    method: 'post',
    data: params
  })
}

// 付款单列表
export function paymentlist(query) {
  var params = new URLSearchParams()
  if (query.paymentNumber !== '' && query.paymentNumber !== null && query.paymentNumber !== undefined) {
    params.append('paymentNumber', query.paymentNumber) // 你要传给后台的参数值 key/value
  }
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.supplierId !== '' && query.supplierId !== null && query.supplierId !== undefined) {
    params.append('supplierId', query.supplierId) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
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
    url: '/payment/paymentlist',
    method: 'post',
    data: params
  })
}

//  更新付款单
export function updatepayment(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('paymentJson', query) // 你要传给后台的参数值 key/value
  params.append('paymentDetailJson', query2) // 你要传给后台的参数值 key/value
  if (query3.picids !== '' && query3.picids !== null && query3.picids !== undefined) {
    params.append('picids', query3.picids) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/payment/updatepayment',
    method: 'post',
    data: params
  })
}

//  审批付款单
export function updatepayment2(query) {
  var params = new URLSearchParams()
  params.append('paymentJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/payment/updatepayment',
    method: 'post',
    data: params
  })
}

// 删除付款单
export function deletepayment(query, query2) {
  var params = new URLSearchParams()
  params.append('paymentIds', query) // 你要传给后台的参数值 key/value
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/payment/deletepayment',
    method: 'post',
    data: params
  })
}
