import request from '@/utils/request'

// 新增期初库存录入
export function addinitialenter(query, detail, repositoryId, regionId) {
  var params = new URLSearchParams()
  params.append('initialEnterJson', query) // 你要传给后台的参数值 key/value
  params.append('initialEnterDetailJson', detail) // 你要传给后台的参数值 key/value
  params.append('repositoryId', repositoryId) // 你要传给后台的参数值 key/value
  params.append('regionId', regionId) // 你要传给后台的参数值 key/value
  return request({
    url: '/initialenter/addinitialenter',
    method: 'post',
    data: params
  })
}

// 添加货位
export function addlocation(query) {
  var params = new URLSearchParams()
  params.append('locationJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/location/addlocation',
    method: 'post',
    data: params
  })
}

// 货位列表
export function locationlist(query) {
  var params = new URLSearchParams()
  if (query.searchRepositoryId !== '' && query.searchRepositoryId !== null && query.searchRepositoryId !== undefined) {
    params.append('searchRepositoryId', query.searchRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.locationCode !== '' && query.locationCode !== null && query.locationCode !== undefined) {
    params.append('locationCode', query.locationCode) // 你要传给后台的参数值 key/value
  }
  if (query.locationName !== '' && query.locationName !== null && query.locationName !== undefined) {
    params.append('locationName', query.locationName) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  params.append('isEffective', 1) // 你要传给后台的参数值 key/value
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/location/locationlist',
    method: 'post',
    data: params
  })
}

// 货位列表
export function locationlistByEff(query) {
  var params = new URLSearchParams()
  if (query.searchRepositoryId !== '' && query.searchRepositoryId !== null && query.searchRepositoryId !== undefined) {
    params.append('searchRepositoryId', query.searchRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.locationCode !== '' && query.locationCode !== null && query.locationCode !== undefined) {
    params.append('locationCode', query.locationCode) // 你要传给后台的参数值 key/value
  }
  if (query.locationName !== '' && query.locationName !== null && query.locationName !== undefined) {
    params.append('locationName', query.locationName) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  if (query.isEffective !== '' && query.isEffective !== null && query.isEffective !== undefined) {
    params.append('isEffective', query.isEffective) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/location/locationlist',
    method: 'post',
    data: params
  })
}

// 删除货位
export function deletelocation(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('locationId', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/location/deleteonelocation',
    method: 'post',
    data: params
  })
}

// 期初库存列表
export function enterlist(query) {
  var params = new URLSearchParams()
  if (query.productCode !== '' && query.productCode !== null && query.productCode !== undefined) {
    params.append('productCode', query.productCode) // 你要传给后台的参数值 key/value
  }
  if (query.enterId !== '' && query.enterId !== null && query.enterId !== undefined) {
    params.append('enterId', query.enterId) // 你要传给后台的参数值 key/value
  }
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productName', query.productName) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
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
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/initialenter/enterlist',
    method: 'post',
    data: params
  })
}

// 极速初库存列表
export function entergetList(query) {
  var params = new URLSearchParams()
  if (query.productCode !== '' && query.productCode !== null && query.productCode !== undefined) {
    params.append('productCode', query.productCode) // 你要传给后台的参数值 key/value
  }
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productName', query.productName) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
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
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/initialenter/getList',
    method: 'post',
    data: params
  })
}

// 删除期初录入单
export function deleteenter(query, query2) {
  var params = new URLSearchParams()
  params.append('enterIds', query) // 你要传给后台的参数值 key/value
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/initialenter/deleteenter',
    method: 'post',
    data: params
  })
}

// 修改期初库存单
export function updateenter(query, query2) {
  var params = new URLSearchParams()
  params.append('initialEnterJson', query) // 你要传给后台的参数值 key/value
  params.append('initialEnterDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/initialenter/updateenter',
    method: 'post',
    data: params
  })
}

// 修改货位
export function updatelocation(query) {
  var params = new URLSearchParams()
  params.append('locationJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/location/updatelocation',
    method: 'post',
    data: params
  })
}

// 添加库存预警
export function createstockalarm(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/stockAlarm/create',
    method: 'post',
    data: params
  })
}

// 审核期初库存单
export function updateenter2(query) {
  var params = new URLSearchParams()
  params.append('initialEnterJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/initialenter/updateenter',
    method: 'post',
    data: params
  })
}

// 添加货位调整单
export function addlocationadjust(query, detail, query3) {
  var params = new URLSearchParams()
  params.append('locationAdjustJson', query) // 你要传给后台的参数值 key/value
  params.append('locationAdjustDetailJson', detail) // 你要传给后台的参数值 key/value
  params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  return request({
    url: '/locationadjust/addlocationadjust',
    method: 'post',
    data: params
  })
}

//  货位调整列表
export function adjustlist(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.adjustId !== '' && query.adjustId !== null && query.adjustId !== undefined) {
    params.append('adjustId', query.adjustId) // 你要传给后台的参数值 key/value
  }
  if (query.adjustNumber !== '' && query.adjustNumber !== null && query.adjustNumber !== undefined) {
    params.append('adjustNumber', query.adjustNumber) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.adjustDeptId !== '' && query.adjustDeptId !== null && query.adjustDeptId !== undefined) {
    params.append('adjustDeptId', query.adjustDeptId) // 你要传给后台的参数值 key/value
  }
  if (query.adjustRepositoryId !== '' && query.adjustRepositoryId !== null && query.adjustRepositoryId !== undefined) {
    params.append('adjustRepositoryId', query.adjustRepositoryId) // 你要传给后台的参数值 key/value
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
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/locationadjust/adjustlist',
    method: 'post',
    data: params
  })
}

//  极速货位调整列表
export function adjustgetList(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.adjustNumber !== '' && query.adjustNumber !== null && query.adjustNumber !== undefined) {
    params.append('adjustNumber', query.adjustNumber) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.adjustDeptId !== '' && query.adjustDeptId !== null && query.adjustDeptId !== undefined) {
    params.append('adjustDeptId', query.adjustDeptId) // 你要传给后台的参数值 key/value
  }
  if (query.adjustRepositoryId !== '' && query.adjustRepositoryId !== null && query.adjustRepositoryId !== undefined) {
    params.append('adjustRepositoryId', query.adjustRepositoryId) // 你要传给后台的参数值 key/value
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
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  return request({
    url: '/locationadjust/getList',
    method: 'post',
    data: params
  })
}

// 删除货位调整单
export function deleteadjust(query, query2) {
  var params = new URLSearchParams()
  params.append('adjustIds', query) // 你要传给后台的参数值 key/value
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/locationadjust/deleteadjust',
    method: 'post',
    data: params
  })
}

// 修改货位调整单
export function updateadjust(query, query2) {
  var params = new URLSearchParams()
  params.append('locationAdjustJson', query) // 你要传给后台的参数值 key/value
  params.append('locationAdjustDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/locationadjust/updateadjust',
    method: 'post',
    data: params
  })
}

// 审核货位调整单
export function updateadjust2(query) {
  var params = new URLSearchParams()
  params.append('locationAdjustJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/locationadjust/updateadjust',
    method: 'post',
    data: params
  })
}
