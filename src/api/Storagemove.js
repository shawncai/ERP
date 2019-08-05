import request from '@/utils/request'

// 添加调拨单
export function createstoragemove(query, query2, query3) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  }
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  if (query3.createPersonId !== '' && query3.createPersonId !== null && query3.createPersonId !== undefined) {
    params.append('createPersonId', query3.createPersonId) // 你要传给后台的参数值 key/value
  }
  if (query3.countryId !== '' && query3.countryId !== null && query3.countryId !== undefined) {
    params.append('countryId', query3.countryId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/storagemove/create',
    method: 'post',
    data: params
  })
}

// 查询调拨单
export function searchlist(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.moveNumber !== '' && query.moveNumber !== null && query.moveNumber !== undefined) {
    params.append('moveNumber', query.moveNumber) // 你要传给后台的参数值 key/value
  }
  if (query.requestDeptId !== '' && query.requestDeptId !== null && query.requestDeptId !== undefined) {
    params.append('requestDeptId', query.requestDeptId) // 你要传给后台的参数值 key/value
  }
  if (query.moveInRepository !== '' && query.moveInRepository !== null && query.moveInRepository !== undefined) {
    params.append('moveInRepository', query.moveInRepository) // 你要传给后台的参数值 key/value
  }
  if (query.departmentId !== '' && query.departmentId !== null && query.departmentId !== undefined) {
    params.append('departmentId', query.departmentId) // 你要传给后台的参数值 key/value
  }
  if (query.moveOutRepository !== '' && query.moveOutRepository !== null && query.moveOutRepository !== undefined) {
    params.append('moveOutRepository', query.moveOutRepository) // 你要传给后台的参数值 key/value
  }
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId', query.createPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('ArrivalBeginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('ArrivalEndTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  if (query.businessStat !== '' && query.businessStat !== null && query.businessStat !== undefined) {
    params.append('businessStat', query.businessStat) // 你要传给后台的参数值 key/value
  }
  if (query.receiptStat !== '' && query.receiptStat !== null && query.receiptStat !== undefined) {
    params.append('receiptStat', query.receiptStat) // 你要传给后台的参数值 key/value
  }
  if (query.judgeStat !== '' && query.judgeStat !== null && query.judgeStat !== undefined) {
    params.append('judgeStat', query.judgeStat) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/storagemove/search',
    method: 'post',
    data: params
  })
}

// 修改调拨单
export function updateStoragemove(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/storagemove/update',
    method: 'post',
    data: params
  })
}

export function updateStoragemove3(query, query2, query3) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  }
  if (query3 !== '' && query3 !== null && query3 !== undefined) {
    params.append('detailConfirmJson', query3) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/storagemove/update',
    method: 'post',
    data: params
  })
}

// 审核调拨单
export function updateStoragemove2(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/storagemove/update',
    method: 'post',
    data: params
  })
}

// 删除调拨单
export function deletestoragemove(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/storagemove/delete',
    method: 'post',
    data: params
  })
}

// 添加调拨申请单
export function createmoveapplication(query, query2, query3) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  }
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  if (query3.createPersonId !== '' && query3.createPersonId !== null && query3.createPersonId !== undefined) {
    params.append('createPersonId', query3.createPersonId) // 你要传给后台的参数值 key/value
  }
  if (query3.countryId !== '' && query3.countryId !== null && query3.countryId !== undefined) {
    params.append('countryId', query3.countryId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/moveapplication/create',
    method: 'post',
    data: params
  })
}

// 查询调拨申请单
export function searchapplication(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.moveNumber !== '' && query.moveNumber !== null && query.moveNumber !== undefined) {
    params.append('moveNumber', query.moveNumber) // 你要传给后台的参数值 key/value
  }
  if (query.requestDeptId !== '' && query.requestDeptId !== null && query.requestDeptId !== undefined) {
    params.append('requestDeptId', query.requestDeptId) // 你要传给后台的参数值 key/value
  }
  if (query.moveInRepository !== '' && query.moveInRepository !== null && query.moveInRepository !== undefined) {
    params.append('moveInRepository', query.moveInRepository) // 你要传给后台的参数值 key/value
  }
  if (query.departmentId !== '' && query.departmentId !== null && query.departmentId !== undefined) {
    params.append('departmentId', query.departmentId) // 你要传给后台的参数值 key/value
  }
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId', query.createPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('ArrivalBeginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('ArrivalEndTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  if (query.businessStat !== '' && query.businessStat !== null && query.businessStat !== undefined) {
    params.append('businessStat', query.businessStat) // 你要传给后台的参数值 key/value
  }
  if (query.receiptStat !== '' && query.receiptStat !== null && query.receiptStat !== undefined) {
    params.append('receiptStat', query.receiptStat) // 你要传给后台的参数值 key/value
  }
  if (query.judgeStat !== '' && query.judgeStat !== null && query.judgeStat !== undefined) {
    params.append('judgeStat', query.judgeStat) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/moveapplication/search',
    method: 'post',
    data: params
  })
}

// 删除出库申请单
export function deleteapplication(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/moveapplication/delete',
    method: 'post',
    data: params
  })
}

// 修改出库申请单
export function updatemoveapplication(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/moveapplication/update',
    method: 'post',
    data: params
  })
}
