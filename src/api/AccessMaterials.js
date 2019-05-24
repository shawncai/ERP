import request from '@/utils/request'

// 根据任务单编号获取领料明细
export function getDetailByTaskNumber(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('taskNumber', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('repositoryId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/accessmaterials/getDetailByTaskNumber',
    method: 'post',
    data: params
  })
}

// 添加领料单
export function addaccessmaterials(query, query2, query3) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('accessMaterialsJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('accessMaterialsDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/accessmaterials/addaccessmaterials',
    method: 'post',
    data: params
  })
}

// 领料单列表
export function accesslist(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.accessNumber !== '' && query.accessNumber !== null && query.accessNumber !== undefined) {
    params.append('accessNumber', query.accessNumber) // 你要传给后台的参数值 key/value
  }
  if (query.sourcetype !== '' && query.sourcetype !== null && query.sourcetype !== undefined) {
    params.append('sourcetype', query.sourcetype) // 你要传给后台的参数值 key/value
  }
  if (query.taskNumber !== '' && query.taskNumber !== null && query.taskNumber !== undefined) {
    params.append('taskNumber', query.taskNumber) // 你要传给后台的参数值 key/value
  }
  if (query.workCenterId !== '' && query.workCenterId !== null && query.workCenterId !== undefined) {
    params.append('workCenterId', query.workCenterId) // 你要传给后台的参数值 key/value
  }
  if (query.processType !== '' && query.processType !== null && query.processType !== undefined) {
    params.append('processType', query.processType) // 你要传给后台的参数值 key/value
  }
  if (query.accessPersonId !== '' && query.accessPersonId !== null && query.accessPersonId !== undefined) {
    params.append('accessPersonId', query.accessPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.accessTime !== '' && query.accessTime !== null && query.accessTime !== undefined) {
    params.append('accessTime', query.accessTime) // 你要传给后台的参数值 key/value
  }
  if (query.providePersonId !== '' && query.providePersonId !== null && query.providePersonId !== undefined) {
    params.append('providePersonId', query.providePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.judgeStat !== '' && query.judgeStat !== null && query.judgeStat !== undefined) {
    params.append('judgeStat', query.judgeStat) // 你要传给后台的参数值 key/value
  }
  if (query.receiptStat !== '' && query.receiptStat !== null && query.receiptStat !== undefined) {
    params.append('receiptStat', query.receiptStat) // 你要传给后台的参数值 key/value
  }
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId', query.createPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  if (query.isActive !== '' && query.isActive !== null && query.isActive !== undefined) {
    params.append('isActive', query.isActive) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/accessmaterials/accesslist',
    method: 'post',
    data: params
  })
}

// 删除领料单
export function deleteaccess(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('accessIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/accessmaterials/deleteaccess',
    method: 'post',
    data: params
  })
}

// 修改领料单
export function updateaccess(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('accessMaterialsJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('accessMaterialsDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/accessmaterials/updateaccess',
    method: 'post',
    data: params
  })
}

// 审核领料单
export function updateaccess2(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('accessMaterialsJson', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/accessmaterials/updateaccess',
    method: 'post',
    data: params
  })
}

// 添加退料单
export function createretreatMaterials(query, query2, query3) {
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
  return request({
    url: '/erp/retreatMaterials/create',
    method: 'post',
    data: params
  })
}

// 查询退料单
export function searchretreatMaterials(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.number !== '' && query.number !== null && query.number !== undefined) {
    params.append('number', query.number) // 你要传给后台的参数值 key/value
  }
  if (query.sourceType !== '' && query.sourceType !== null && query.sourceType !== undefined) {
    params.append('sourceType', query.sourceType) // 你要传给后台的参数值 key/value
  }
  if (query.accessMaterialsId !== '' && query.accessMaterialsId !== null && query.accessMaterialsId !== undefined) {
    params.append('accessMaterialsId', query.accessMaterialsId) // 你要传给后台的参数值 key/value
  }
  if (query.workCenterId !== '' && query.workCenterId !== null && query.workCenterId !== undefined) {
    params.append('workCenterId', query.workCenterId) // 你要传给后台的参数值 key/value
  }
  if (query.processType !== '' && query.processType !== null && query.processType !== undefined) {
    params.append('processType', query.processType) // 你要传给后台的参数值 key/value
  }
  if (query.retreatPersonId !== '' && query.retreatPersonId !== null && query.retreatPersonId !== undefined) {
    params.append('retreatPersonId', query.retreatPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.receiveDate !== '' && query.receiveDate !== null && query.receiveDate !== undefined) {
    params.append('receiveDate', query.receiveDate) // 你要传给后台的参数值 key/value
  }
  if (query.receivePersonId !== '' && query.receivePersonId !== null && query.receivePersonId !== undefined) {
    params.append('receivePersonId', query.receivePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.judgeStat !== '' && query.judgeStat !== null && query.judgeStat !== undefined) {
    params.append('judgeStat', query.judgeStat) // 你要传给后台的参数值 key/value
  }
  if (query.receiptStat !== '' && query.receiptStat !== null && query.receiptStat !== undefined) {
    params.append('receiptStat', query.receiptStat) // 你要传给后台的参数值 key/value
  }
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId', query.createPersonId) // 你要传给后台的参数值 key/value
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
    url: '/erp/retreatMaterials/search',
    method: 'post',
    data: params
  })
}

// 修改退料单
export function updatereatMaterials(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/retreatMaterials/update',
    method: 'post',
    data: params
  })
}

// 审核退料单
export function updateretreatMaterials2(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/retreatMaterials/update',
    method: 'post',
    data: params
  })
}

// 删除退料单
export function deleteretreatMaterials(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/retreatMaterials/delete',
    method: 'post',
    data: params
  })
}
