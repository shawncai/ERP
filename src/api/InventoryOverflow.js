import request from '@/utils/request'

// 添加库存报溢
export function addinventoryoverflow(query, query2, query3) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('inventoryOverflowJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('inventoryOverflowDetailJson', query2) // 你要传给后台的参数值 key/value
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
    url: '/erp/inventoryoverflow/addinventoryoverflow',
    method: 'post',
    data: params
  })
}

// 报溢单列表
export function overflowlist(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.sourceNumber !== '' && query.sourceNumber !== null && query.sourceNumber !== undefined) {
    params.append('sourceNumber', query.sourceNumber) // 你要传给后台的参数值 key/value
  }
  if (query.overflowNumber !== '' && query.overflowNumber !== null && query.overflowNumber !== undefined) {
    params.append('overflowNumber', query.overflowNumber) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.overflowDeptId !== '' && query.overflowDeptId !== null && query.overflowDeptId !== undefined) {
    params.append('overflowDeptId', query.overflowDeptId) // 你要传给后台的参数值 key/value
  }
  if (query.overflowRepositoryId !== '' && query.overflowRepositoryId !== null && query.overflowRepositoryId !== undefined) {
    params.append('overflowRepositoryId', query.overflowRepositoryId) // 你要传给后台的参数值 key/value
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
  return request({
    url: '/erp/inventoryoverflow/overflowlist',
    method: 'post',
    data: params
  })
}

// 删除报溢单
export function deleteoverflow(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('overflowIds', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/inventoryoverflow/deleteoverflow',
    method: 'post',
    data: params
  })
}

// 更新报溢单
export function updateoverflow(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('inventoryOverflowJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('inventoryOverflowDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/inventoryoverflow/updateoverflow',
    method: 'post',
    data: params
  })
}

// 审核报溢单
export function updateoverflow2(query) {
  var params = new URLSearchParams()
  params.append('inventoryOverflowJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/inventoryoverflow/updateoverflow',
    method: 'post',
    data: params
  })
}
