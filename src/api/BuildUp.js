import request from '@/utils/request'

// 新建组装单
export function addbuildup(query, query2, query3, query4) {
  var params = new URLSearchParams()
  params.append('buildupJson', query) // 你要传给后台的参数值 key/value
  params.append('buildBeforeDetailJson', query2) // 你要传给后台的参数值 key/value
  params.append('buildAfterDetailJson', query3) // 你要传给后台的参数值 key/value
  if (query4.repositoryId !== '' && query4.repositoryId !== null && query4.repositoryId !== undefined) {
    params.append('repositoryId', query4.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query4.regionId !== '' && query4.regionId !== null && query4.regionId !== undefined) {
    params.append('regionId', query4.regionId) // 你要传给后台的参数值 key/value
  }
  if (query4.type !== '' && query4.type !== null && query4.type !== undefined) {
    params.append('type', query4.type) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/buildup/addbuildup',
    method: 'post',
    data: params
  })
}

// 组装单列表
export function buildlist(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.buildupNumber !== '' && query.buildupNumber !== null && query.buildupNumber !== undefined) {
    params.append('buildupNumber', query.buildupNumber) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.buildupDeptId !== '' && query.buildupDeptId !== null && query.buildupDeptId !== undefined) {
    params.append('buildupDeptId', query.buildupDeptId) // 你要传给后台的参数值 key/value
  }
  if (query.buildupRepositoryId !== '' && query.buildupRepositoryId !== null && query.buildupRepositoryId !== undefined) {
    params.append('buildupRepositoryId', query.buildupRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.receiptStat !== '' && query.receiptStat !== null && query.receiptStat !== undefined) {
    params.append('receiptStat', query.receiptStat) // 你要传给后台的参数值 key/value
  }
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId', query.createPersonId) // 你要传给后台的参数值 key/value
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
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/buildup/buildlist',
    method: 'post',
    data: params
  })
}

// 删除组装单
export function deletebuildup(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('buildupIds', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/buildup/deletebuildup',
    method: 'post',
    data: params
  })
}

// 更新组装单
export function updatebuildup(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('buildupJson', query) // 你要传给后台的参数值 key/value
  params.append('buildBeforeDetailJson', query2) // 你要传给后台的参数值 key/value
  params.append('buildAfterDetailJson', query3) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/buildup/updatebuildup',
    method: 'post',
    data: params
  })
}

// 审核组装单
export function updatebuildup2(query) {
  var params = new URLSearchParams()
  params.append('buildupJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/buildup/updatebuildup',
    method: 'post',
    data: params
  })
}
