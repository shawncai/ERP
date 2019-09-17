import request from '@/utils/request'

// 库存查询
export function countlist(query) {
  var params = new URLSearchParams()
  if (query.searchRepositoryId !== '' && query.searchRepositoryId !== null && query.searchRepositoryId !== undefined) {
    params.append('searchRepositoryId', query.searchRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productName', query.productName) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  return request({
    url: '/allinventory/countlist',
    method: 'post',
    data: params
  })
}

// 预警列表
export function searchalarm(query) {
  var params = new URLSearchParams()
  if (query.searchRepositoryId !== '' && query.searchRepositoryId !== null && query.searchRepositoryId !== undefined) {
    params.append('searchRepositoryId', query.searchRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productName', query.productName) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  return request({
    url: '/stockAlarm/searchalarm',
    method: 'post',
    data: params
  })
}

// 预警规则列表
export function searchalarmrules(query) {
  var params = new URLSearchParams()
  if (query.searchRepositoryId !== '' && query.searchRepositoryId !== null && query.searchRepositoryId !== undefined) {
    params.append('repositoryId', query.searchRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.productId !== '' && query.productId !== null && query.productId !== undefined) {
    params.append('productId', query.productId) // 你要传给后台的参数值 key/value
  }
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productName', query.productName) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pageSize) // 你要传给后台的参数值 key/value
  params.append('repositoryId2', query.repositoryId2) // 你要传给后台的参数值 key/value
  params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  return request({
    url: '/stockAlarm/search',
    method: 'post',
    data: params
  })
}

// 删除预警规则
export function deletealarmrules(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/stockAlarm/delete',
    method: 'post',
    data: params
  })
}

// 修改库存预警规则
export function updatealarmrules(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/stockAlarm/update',
    method: 'post',
    data: params
  })
}

// 批次预警列表
export function searchBatchAlarm(query) {
  var params = new URLSearchParams()
  if (query.searchRepositoryId !== '' && query.searchRepositoryId !== null && query.searchRepositoryId !== undefined) {
    params.append('repositoryId', query.searchRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productName', query.productName) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pageSize) // 你要传给后台的参数值 key/value
  params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  return request({
    url: '/stockAlarm/searchBatchAlarm',
    method: 'post',
    data: params
  })
}
