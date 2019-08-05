import request from '@/utils/request'

// 添加销售合同
export function createAccessTools(query, query2, query4) {
  var params = new URLSearchParams()
  params.append('accessRepairToolsJson', query) // 你要传给后台的参数值 key/value
  params.append('accessToolsDetailJson', query2) // 你要传给后台的参数值 key/value
  if (query4.repositoryId !== '' && query4.repositoryId !== null && query4.repositoryId !== undefined) {
    params.append('repositoryId', query4.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query4.regionId !== '' && query4.regionId !== null && query4.regionId !== undefined) {
    params.append('regionId', query4.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/accesstools/addAccessTools',
    method: 'post',
    data: params
  })
}

// 查询销售合同
export function searchAccessTools(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.useType !== '' && query.useType !== null && query.useType !== undefined) {
    params.append('useType', query.useType) // 你要传给后台的参数值 key/value
  }
  if (query.emergencyLevel !== '' && query.emergencyLevel !== null && query.emergencyLevel !== undefined) {
    params.append('emergencyLevel', query.emergencyLevel) // 你要传给后台的参数值 key/value
  }
  if (query.applyPersonId !== '' && query.applyPersonId !== null && query.applyPersonId !== undefined) {
    params.append('applyPersonId', query.applyPersonId) // 你要传给后台的参数值 key/value
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
    url: '/accesstools/accessList',
    method: 'post',
    data: params
  })
}

//  修改销售合同
export function updateAccessTools(query, query2) {
  var params = new URLSearchParams()
  params.append('accessRepairToolsJson', query) // 你要传给后台的参数值 key/value
  params.append('accessToolsDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/accesstools/updateAccessTools',
    method: 'post',
    data: params
  })
}

// 删除销售合同
export function deleteAccessTools(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('accessIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/accesstools/deleteAccessTools',
    method: 'post',
    data: params
  })
}

// 审核销售合同
export function updateAccessTools2(query) {
  var params = new URLSearchParams()
  params.append('accessRepairToolsJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/accesstools/updateAccessTools',
    method: 'post',
    data: params
  })
}
