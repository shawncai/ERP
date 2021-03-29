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
    url: '/inventorydamaged/deletedamaged',
    method: 'post',
    data: params
  })
}

// 报损单
export function addinventorydamaged(query, query2, query3, repositoryId, regionId) {
  var params = new URLSearchParams()
  console.log('query3', query3)
  if (query3 !== '' && query3 !== null && query3 !== undefined) {
    params.append('inventoryDamagedInJson', query3) // 你要传给后台的参数值 key/value
  }
  params.append('inventoryDamagedDetailJson', query2) // 你要传给后台的参数值 key/value
  params.append('inventoryDamagedJson', query) // 你要传给后台的参数值 key/value
  if (repositoryId !== '' && repositoryId !== null && repositoryId !== undefined) {
    params.append('repositoryId', repositoryId) // 你要传给后台的参数值 key/value
  }
  if (regionId !== '' && regionId !== null && regionId !== undefined) {
    params.append('regionId', regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/inventorydamaged/addinventorydamaged',
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
  if (query.judgeStat !== '' && query.judgeStat !== null && query.judgeStat !== undefined) {
    params.append('judgeStat', query.judgeStat) // 你要传给后台的参数值 key/value
  }
  if (query.receiptStat !== '' && query.receiptStat !== null && query.receiptStat !== undefined) {
    params.append('receiptStat', query.receiptStat) // 你要传给后台的参数值 key/value
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
    url: '/inventorydamaged/damagedlist',
    method: 'post',
    data: params
  })
}

// 修改报损单
export function updatedamaged(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('inventoryDamagedInJson', query3) // 你要传给后台的参数值 key/value
  params.append('inventoryDamagedJson', query) // 你要传给后台的参数值 key/value
  params.append('inventoryDamagedDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/inventorydamaged/updatedamaged',
    method: 'post',
    data: params
  })
}

// 审核报损单
export function updatedamaged2(query) {
  var params = new URLSearchParams()
  params.append('inventoryDamagedJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/inventorydamaged/updatedamaged',
    method: 'post',
    data: params
  })
}

// 员工赔偿收款单新建
export function addInventoryReceipt(query, query3, query2) {
  var params = new URLSearchParams()
  params.append('inventoryReceiptJson', query) // 你要传给后台的参数值 key/value
  params.append('inventoryReceiptDetailJson', query3) // 你要传给后台的参数值 key/value

  if (query2.repositoryId !== '' && query2.repositoryId !== null && query2.repositoryId !== undefined) {
    params.append('repositoryId', query2.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query2.regionId !== '' && query2.regionId !== null && query2.regionId !== undefined) {
    params.append('regionId', query2.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/inventoryReceipt/addInventoryReceipt',
    method: 'post',
    data: params
  })
}

// 员工赔偿收款单列表
export function inventoryReceiptlist(query) {
  var params = new URLSearchParams()
  if (query.receiptId !== '' && query.receiptId !== null && query.receiptId !== undefined) {
    params.append('receiptId', query.receiptId) // 你要传给后台的参数值 key/value
  }
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.receiptNumber !== '' && query.receiptNumber !== null && query.receiptNumber !== undefined) {
    params.append('receiptNumber', query.receiptNumber) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.judgeStat !== '' && query.judgeStat !== null && query.judgeStat !== undefined) {
    params.append('judgeStat', query.judgeStat) // 你要传给后台的参数值 key/value
  }
  if (query.receiptStat !== '' && query.receiptStat !== null && query.receiptStat !== undefined) {
    params.append('receiptStat', query.receiptStat) // 你要传给后台的参数值 key/value
  }
  if (query.empId !== '' && query.empId !== null && query.empId !== undefined) {
    params.append('empId', query.empId) // 你要传给后台的参数值 key/value
  }
  if (query.handleRepositoryId !== '' && query.handleRepositoryId !== null && query.handleRepositoryId !== undefined) {
    params.append('handleRepositoryId', query.handleRepositoryId) // 你要传给后台的参数值 key/value
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
    url: '/inventoryReceipt/inventoryReceiptlist',
    method: 'post',
    data: params
  })
}

// 删除员工赔偿收款单
export function deleteReceipt(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('receiptIds', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/inventoryReceipt/deleteReceipt',
    method: 'post',
    data: params
  })
}

// 修改审核员工赔偿收款单
export function updateInventoryReceipt(query, query2) {
  var params = new URLSearchParams()
  params.append('inventoryReceiptJson', query) // 你要传给后台的参数值 key/value
  if (query2) {
    params.append('inventoryReceiptDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/inventoryReceipt/updateInventoryReceipt',
    method: 'post',
    data: params
  })
}

// 员工赔偿收款单确认收款
export function confirmReceipt(query, query2) {
  var params = new URLSearchParams()
  params.append('receiptDetailId', query) // 你要传给后台的参数值 key/value
  if (query2) {
    params.append('receiptMoney', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/inventoryReceipt/confirmReceipt',
    method: 'post',
    data: params
  })
}

// 员工收款单新建
export function addEmpReceipt(query, query3, query2) {
  var params = new URLSearchParams()
  params.append('empReceiptJson', query) // 你要传给后台的参数值 key/value
  params.append('empReceiptDetailJson', query3) // 你要传给后台的参数值 key/value

  if (query2.repositoryId !== '' && query2.repositoryId !== null && query2.repositoryId !== undefined) {
    params.append('repositoryId', query2.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query2.regionId !== '' && query2.regionId !== null && query2.regionId !== undefined) {
    params.append('regionId', query2.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/empReceipt/addEmpReceipt',
    method: 'post',
    data: params
  })
}

// 员工赔偿收款单列表
export function empReceiptlist(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.receiptNumber !== '' && query.receiptNumber !== null && query.receiptNumber !== undefined) {
    params.append('receiptNumber', query.receiptNumber) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.judgeStat !== '' && query.judgeStat !== null && query.judgeStat !== undefined) {
    params.append('judgeStat', query.judgeStat) // 你要传给后台的参数值 key/value
  }
  if (query.receiptStat !== '' && query.receiptStat !== null && query.receiptStat !== undefined) {
    params.append('receiptStat', query.receiptStat) // 你要传给后台的参数值 key/value
  }
  if (query.empId !== '' && query.empId !== null && query.empId !== undefined) {
    params.append('empId', query.empId) // 你要传给后台的参数值 key/value
  }
  if (query.handleRepositoryId !== '' && query.handleRepositoryId !== null && query.handleRepositoryId !== undefined) {
    params.append('handleRepositoryId', query.handleRepositoryId) // 你要传给后台的参数值 key/value
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
    url: '/empReceipt/empReceiptlist',
    method: 'post',
    data: params
  })
}

// 删除员工收款单
export function deleteReceipt2(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('receiptIds', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/empReceipt/deleteReceipt',
    method: 'post',
    data: params
  })
}

// 修改审核员工收款单
export function updateEmpReceipt(query, query2) {
  var params = new URLSearchParams()
  params.append('empReceiptJson', query) // 你要传给后台的参数值 key/value
  if (query2) {
    params.append('empReceiptDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/empReceipt/updateEmpReceipt',
    method: 'post',
    data: params
  })
}
