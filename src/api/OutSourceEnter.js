import request from '@/utils/request'

// 添加委外入库
export function addOutsourceEnter(query, query2, query3, query4) {
  var params = new URLSearchParams()
  params.append('outsourceEnterJson', query) // 你要传给后台的参数值 key/value
  params.append('outsourceEnterDetailJson', query2) // 你要传给后台的参数值 key/value
  if (query4.repositoryId !== '' && query4.repositoryId !== null && query4.repositoryId !== undefined) {
    params.append('repositoryId', query4.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query4.regionId !== '' && query4.regionId !== null && query4.regionId !== undefined) {
    params.append('regionId', query4.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/outsourceEnter/addOutsourceEnter',
    method: 'post',
    data: params
  })
}

//  查询委外入库
export function outsourceEnterlist(query) {
  var params = new URLSearchParams()
  if (query.enterId !== '' && query.enterId !== null && query.enterId !== undefined) {
    params.append('enterId', query.enterId) // 你要传给后台的参数值 key/value
  }
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.sourceNumber !== '' && query.sourceNumber !== null && query.sourceNumber !== undefined) {
    params.append('sourceNumber', query.sourceNumber) // 你要传给后台的参数值 key/value
  }
  if (query.enterNumber !== '' && query.enterNumber !== null && query.enterNumber !== undefined) {
    params.append('enterNumber', query.enterNumber) // 你要传给后台的参数值 key/value
  }
  if (query.enterPersonId !== '' && query.enterPersonId !== null && query.enterPersonId !== undefined) {
    params.append('enterPersonId', query.enterPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.enterDeptId !== '' && query.enterDeptId !== null && query.enterDeptId !== undefined) {
    params.append('enterDeptId', query.enterDeptId) // 你要传给后台的参数值 key/value
  }
  if (query.enterRepositoryId !== '' && query.enterRepositoryId !== null && query.enterRepositoryId !== undefined) {
    params.append('enterRepositoryId', query.enterRepositoryId) // 你要传给后台的参数值 key/value
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
    url: '/outsourceEnter/outsourceEnterlist',
    method: 'post',
    data: params
  })
}

// 修改委外入库
export function updateOutsourceEnter(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('outsourceEnterJson', query) // 你要传给后台的参数值 key/value
  params.append('outsourceEnterDetailJson', query2) // 你要传给后台的参数值 key/value
  params.append('outNumber', query3) // 你要传给后台的参数值 key/value
  return request({
    url: '/outsourceEnter/updateOutsourceEnter',
    method: 'post',
    data: params
  })
}

// 删除委外入库
export function deleteOutsourceEnter(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('enterIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/outsourceEnter/deleteOutsourceEnter',
    method: 'post',
    data: params
  })
}

// 审核销售订单
export function updateOutsourceEnter2(query) {
  var params = new URLSearchParams()
  params.append('outsourceEnterJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/outsourceEnter/updateOutsourceEnter',
    method: 'post',
    data: params
  })
}
