import request from '@/utils/request'

// 预警列表
export function ruleList(query) {
  var params = new URLSearchParams()
  if (query.productCode !== '' && query.productCode !== null && query.productCode !== undefined) {
    params.append('productCode', query.productCode) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pageSize) // 你要传给后台的参数值 key/value
  params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/inventoryAlarm/ruleList',
    method: 'post',
    data: params
  })
}

// 预警规则列表
export function alarmList(query) {
  var params = new URLSearchParams()
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/inventoryAlarm/alarmList',
    method: 'post',
    data: params
  })
}

// 删除预警规则
export function create(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/inventoryAlarm/create',
    method: 'post',
    data: params
  })
}

// 修改库存预警规则
export function update(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/inventoryAlarm/update',
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
    url: '/erp/stockAlarm/searchBatchAlarm',
    method: 'post',
    data: params
  })
}
