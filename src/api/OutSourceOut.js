import request from '@/utils/request'

// 添加委外出库
export function addOutsourceOut(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('outsourceOutJson', query) // 你要传给后台的参数值 key/value
  params.append('outsourceOutDetailJson', query2) // 你要传给后台的参数值 key/value
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/outsourceOut/addOutsourceOut',
    method: 'post',
    data: params
  })
}

//  查询委外出库
export function outsourceOutlist(query) {
  var params = new URLSearchParams()
  if (query.outId !== '' && query.outId !== null && query.outId !== undefined) {
    params.append('outId', query.outId) // 你要传给后台的参数值 key/value
  }
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.sourceNumber !== '' && query.sourceNumber !== null && query.sourceNumber !== undefined) {
    params.append('sourceNumber', query.sourceNumber) // 你要传给后台的参数值 key/value
  }
  if (query.outNumber !== '' && query.outNumber !== null && query.outNumber !== undefined) {
    params.append('outNumber', query.outNumber) // 你要传给后台的参数值 key/value
  }
  if (query.outPersonId !== '' && query.outPersonId !== null && query.outPersonId !== undefined) {
    params.append('outPersonId', query.outPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.outDeptId !== '' && query.outDeptId !== null && query.outDeptId !== undefined) {
    params.append('outDeptId', query.outDeptId) // 你要传给后台的参数值 key/value
  }
  if (query.outRepositoryId !== '' && query.outRepositoryId !== null && query.outRepositoryId !== undefined) {
    params.append('outRepositoryId', query.outRepositoryId) // 你要传给后台的参数值 key/value
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
    url: '/outsourceOut/outsourceOutlist',
    method: 'post',
    data: params
  })
}

// 修改委外出库
export function updateOutsourceOut(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('outsourceOutJson', query) // 你要传给后台的参数值 key/value
  params.append('outsourceOutDetailJson', query2) // 你要传给后台的参数值 key/value
  params.append('outNumber', query3) // 你要传给后台的参数值 key/value
  return request({
    url: '/outsourceOut/updateOutsourceOut',
    method: 'post',
    data: params
  })
}

// 删除委外出库
export function deleteOutsourceOut(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('outIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/outsourceOut/deleteOutsourceOut',
    method: 'post',
    data: params
  })
}

// 审核销售订单
export function updateOutsourceOut2(query) {
  var params = new URLSearchParams()
  params.append('outsourceOutJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/outsourceOut/updateOutsourceOut',
    method: 'post',
    data: params
  })
}
