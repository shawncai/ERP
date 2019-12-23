import request from '@/utils/request'

// 添加销售合同
export function addAccessComponent(query, query2, query4) {
  var params = new URLSearchParams()
  params.append('accessServiceComponentJson', query) // 你要传给后台的参数值 key/value
  params.append('accessServiceComponentDetailJson', query2) // 你要传给后台的参数值 key/value
  if (query4.repositoryId !== '' && query4.repositoryId !== null && query4.repositoryId !== undefined) {
    params.append('repositoryId', query4.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query4.regionId !== '' && query4.regionId !== null && query4.regionId !== undefined) {
    params.append('regionId', query4.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/accessComponent/addAccessComponent',
    method: 'post',
    data: params
  })
}

// 查询销售合同
export function accesslist(query) {
  var params = new URLSearchParams()
  if (query.accessId !== '' && query.accessId !== null && query.accessId !== undefined) {
    params.append('accessId', query.accessId) // 你要传给后台的参数值 key/value
  }
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.number !== '' && query.number !== null && query.number !== undefined) {
    params.append('number', query.number) // 你要传给后台的参数值 key/value
  }
  if (query.handleRepositoryId !== '' && query.handleRepositoryId !== null && query.handleRepositoryId !== undefined) {
    params.append('handleRepositoryId', query.handleRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.returnStat !== '' && query.returnStat !== null && query.returnStat !== undefined) {
    params.append('returnStat', query.returnStat) // 你要传给后台的参数值 key/value
  }
  if (query.accessPersonId !== '' && query.accessPersonId !== null && query.accessPersonId !== undefined) {
    params.append('accessPersonId', query.accessPersonId) // 你要传给后台的参数值 key/value
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
    url: '/accessComponent/accesslist',
    method: 'post',
    data: params
  })
}

//  修改销售合同
export function updateAccessComponent(query, query2) {
  var params = new URLSearchParams()
  params.append('accessServiceComponentJson', query) // 你要传给后台的参数值 key/value
  params.append('accessServiceComponentDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/accessComponent/updateAccessComponent',
    method: 'post',
    data: params
  })
}

//  归还维修零部件
export function updateReturnComponent(query, query2) {
  var params = new URLSearchParams()
  params.append('accessId', query) // 你要传给后台的参数值 key/value
  params.append('accessServiceComponentDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/accessComponent/updateReturnComponent',
    method: 'post',
    data: params
  })
}

// 删除销售合同
export function deleteAccessComponent(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('accessIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/accessComponent/deleteAccessComponent',
    method: 'post',
    data: params
  })
}

// 审核销售合同
export function updateAccessComponent2(query) {
  var params = new URLSearchParams()
  params.append('accessServiceComponentJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/accessComponent/updateAccessComponent',
    method: 'post',
    data: params
  })
}
