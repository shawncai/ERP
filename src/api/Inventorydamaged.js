import request from '@/utils/request'

// 删除盘点单
export function deletedamaged(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('damagedIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/inventorydamaged/deletedamaged',
    method: 'post',
    data: params
  })
}

// 添加采购入库单
export function addinventorydamaged(query, query2, repositoryId, regionId) {
  var params = new URLSearchParams()
  params.append('inventoryDamagedDetailJson', query2) // 你要传给后台的参数值 key/value
  params.append('inventoryDamagedJson', query) // 你要传给后台的参数值 key/value
  if (repositoryId !== '' && repositoryId !== null && repositoryId !== undefined) {
    params.append('repositoryId', repositoryId) // 你要传给后台的参数值 key/value
  }
  if (regionId !== '' && regionId !== null && regionId !== undefined) {
    params.append('regionId', regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/inventorydamaged/addinventorydamaged',
    method: 'post',
    data: params
  })
}

// 报损单列表
export function damagedlist(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.sourceNumber !== '' && query.sourceNumber !== null && query.sourceNumber !== undefined) {
    params.append('sourceNumber', query.sourceNumber) // 你要传给后台的参数值 key/value
  }
  if (query.damagedNumber !== '' && query.damagedNumber !== null && query.damagedNumber !== undefined) {
    params.append('damagedNumber', query.damagedNumber) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.damagedDeptId !== '' && query.damagedDeptId !== null && query.damagedDeptId !== undefined) {
    params.append('damagedDeptId', query.damagedDeptId) // 你要传给后台的参数值 key/value
  }
  if (query.damagedRepositoryId !== '' && query.damagedRepositoryId !== null && query.damagedRepositoryId !== undefined) {
    params.append('damagedRepositoryId', query.damagedRepositoryId) // 你要传给后台的参数值 key/value
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
    url: '/erp/inventorydamaged/damagedlist',
    method: 'post',
    data: params
  })
}

// 修改报损单
export function updatedamaged(query, query2) {
  var params = new URLSearchParams()
  params.append('inventoryDamagedJson', query) // 你要传给后台的参数值 key/value
  params.append('inventoryDamagedDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/inventorydamaged/updatedamaged',
    method: 'post',
    data: params
  })
}

// 审核报损单
export function updatedamaged2(query) {
  var params = new URLSearchParams()
  params.append('inventoryDamagedJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/inventorydamaged/updatedamaged',
    method: 'post',
    data: params
  })
}
