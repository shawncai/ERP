import request from '@/utils/request'

// 新建质检申请
export function addqualitycheck(query, query2, query3) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('qualityCheckJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('qualityCheckDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/qualitycheck/addqualitycheck',
    method: 'post',
    data: params
  })
}

// 质检申请列表
export function qualitychecklist(query) {
  var params = new URLSearchParams()
  if (query.checkNumber !== '' && query.checkNumber !== null && query.checkNumber !== undefined) {
    params.append('checkNumber', query.checkNumber) // 你要传给后台的参数值 key/value
  }
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.reportPersonId !== '' && query.reportPersonId !== null && query.reportPersonId !== undefined) {
    params.append('reportPersonId', query.reportPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.reportDeptId !== '' && query.reportDeptId !== null && query.reportDeptId !== undefined) {
    params.append('reportDeptId', query.reportDeptId) // 你要传给后台的参数值 key/value
  }
  if (query.checkType !== '' && query.checkType !== null && query.checkType !== undefined) {
    params.append('checkType', query.checkType) // 你要传给后台的参数值 key/value
  }
  if (query.sourceType !== '' && query.sourceType !== null && query.sourceType !== undefined) {
    params.append('sourceType', query.sourceType) // 你要传给后台的参数值 key/value
  }
  if (query.checkMode !== '' && query.checkMode !== null && query.checkMode !== undefined) {
    params.append('checkMode', query.checkMode) // 你要传给后台的参数值 key/value
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
  if (query.isActive !== '' && query.isActive !== null && query.isActive !== undefined) {
    params.append('isActive', query.isActive) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/qualitycheck/qualitychecklist',
    method: 'post',
    data: params
  })
}

//  修改质检申请
export function updatequalitycheck(query, query2) {
  var params = new URLSearchParams()
  params.append('qualityCheckJson', query) // 你要传给后台的参数值 key/value
  params.append('qualityCheckDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/qualitycheck/updatequalitycheck',
    method: 'post',
    data: params
  })
}

// 删除质检申请
export function deletequalitycheck(query, query2) {
  var params = new URLSearchParams()
  params.append('checkIds', query) // 你要传给后台的参数值 key/value
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/qualitycheck/deletequalitycheck',
    method: 'post',
    data: params
  })
}

//  审核质检申请
export function updatequalitycheck2(query) {
  var params = new URLSearchParams()
  params.append('qualityCheckJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/qualitycheck/updatequalitycheck',
    method: 'post',
    data: params
  })
}
