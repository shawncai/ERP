import request from '@/utils/request'

// 添加外包单
export function createoutFactory(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/outsourcing/create',
    method: 'post',
    data: params
  })
}

// 查询外包单
export function searchoutsourcing(query) {
  var params = new URLSearchParams()
  if (query.number !== '' && query.number !== null && query.number !== undefined) {
    params.append('number', query.number) // 你要传给后台的参数值 key/value
  }
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.outFactoryId !== '' && query.outFactoryId !== null && query.outFactoryId !== undefined) {
    params.append('outFactoryId', query.outFactoryId) // 你要传给后台的参数值 key/value
  }
  if (query.paymentAgreementId !== '' && query.paymentAgreementId !== null && query.paymentAgreementId !== undefined) {
    params.append('paymentAgreementId', query.paymentAgreementId) // 你要传给后台的参数值 key/value
  }
  if (query.billingTypeId !== '' && query.billingTypeId !== null && query.billingTypeId !== undefined) {
    params.append('billingTypeId', query.billingTypeId) // 你要传给后台的参数值 key/value
  }
  if (query.receiptStat !== '' && query.receiptStat !== null && query.receiptStat !== undefined) {
    params.append('receiptStat', query.receiptStat) // 你要传给后台的参数值 key/value
  }
  if (query.judgeStat !== '' && query.judgeStat !== null && query.judgeStat !== undefined) {
    params.append('judgeStat', query.judgeStat) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/outsourcing/search',
    method: 'post',
    data: params
  })
}

// 修改外包单
export function updateoutsourcing(query, query2) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/outsourcing/update',
    method: 'post',
    data: params
  })
}

//  删除外包单
export function deleteoutsourcing(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/outsourcing/delete',
    method: 'post',
    data: params
  })
}

// 审核外包单
export function updateoutsourcing2(query) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/outsourcing/update',
    method: 'post',
    data: params
  })
}
