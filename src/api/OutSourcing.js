import request from '@/utils/request'

// 添加外包单
export function createoutFactory(query, query2, query3, query4) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  params.append('enterDetailJson', query3) // 你要传给后台的参数值 key/value
  params.append('repositoryId', query4.repositoryId) // 你要传给后台的参数值 key/value
  params.append('regionId', query4.regionId) // 你要传给后台的参数值 key/value
  return request({
    url: '/outsourcing/create',
    method: 'post',
    data: params
  })
}

// 查询外包单
export function searchoutsourcing(query) {
  var params = new URLSearchParams()
  if (query.numisActiveber !== '' && query.isActive !== null && query.isActive !== undefined) {
    params.append('isActive', query.isActive) // 你要传给后台的参数值 key/value
  }
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
    url: '/outsourcing/search',
    method: 'post',
    data: params
  })
}

// 修改外包单
export function updateoutsourcing(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  params.append('enterDetailJson', query3) // 你要传给后台的参数值 key/value
  return request({
    url: '/outsourcing/update',
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
    url: '/outsourcing/delete',
    method: 'post',
    data: params
  })
}

// 审核外包单
export function updateoutsourcing2(query) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/outsourcing/update',
    method: 'post',
    data: params
  })
}

//  新建外包工厂调价单
export function addFactoryAdjust(query, query2, query3) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('outsourceAdjustJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('outsourceAdjustDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/outsourceadjust/addFactoryAdjust',
    method: 'post',
    data: params
  })
}

// 查询外包工厂调价单
export function factoryAdjustList(query) {
  var params = new URLSearchParams()
  if (query.number !== '' && query.number !== null && query.number !== undefined) {
    params.append('number', query.number) // 你要传给后台的参数值 key/value
  }
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.factoryId !== '' && query.factoryId !== null && query.factoryId !== undefined) {
    params.append('factoryId', query.factoryId) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.adjustId !== '' && query.adjustId !== null && query.adjustId !== undefined) {
    params.append('adjustId', query.adjustId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/outsourceadjust/factoryAdjustList',
    method: 'post',
    data: params
  })
}

//  修改/审核/反审核外包工厂调价单
export function updateFactoryAdjust(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('outsourceAdjustJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('outsourceAdjustDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/outsourceadjust/updateFactoryAdjust',
    method: 'post',
    data: params
  })
}

//  删除外包调价单
export function deleteFactoryAdjust(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('adjustIds', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/outsourceadjust/deleteFactoryAdjust',
    method: 'post',
    data: params
  })
}

//  查询价格
export function getProductOut(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('productCode', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/outsourcing/getProductOut',
    method: 'post',
    data: params
  })
}
