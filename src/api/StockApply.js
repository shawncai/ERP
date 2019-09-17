import request from '@/utils/request'

// 采购申请列表
export function stocapplylist(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.applyNumber !== '' && query.applyNumber !== null && query.applyNumber !== undefined) {
    params.append('applyNumber', query.applyNumber) // 你要传给后台的参数值 key/value
  }
  if (query.applyPersonId !== '' && query.applyPersonId !== null && query.applyPersonId !== undefined) {
    params.append('applyPersonId', query.applyPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.applyDeptId !== '' && query.applyDeptId !== null && query.applyDeptId !== undefined) {
    params.append('applyDeptId', query.applyDeptId) // 你要传给后台的参数值 key/value
  }
  if (query.stockType !== '' && query.stockType !== null && query.stockType !== undefined) {
    params.append('stockType', query.stockType) // 你要传给后台的参数值 key/value
  }
  if (query.sourceType !== '' && query.sourceType !== null && query.sourceType !== undefined) {
    params.append('sourceType', query.sourceType) // 你要传给后台的参数值 key/value
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
    url: '/stockapply/stocapplylist',
    method: 'post',
    data: params
  })
}

// 新建采购申请
export function addstockapply(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('stockApplyJson', query) // 你要传给后台的参数值 key/value
  params.append('stockApplyDetailJson', query2) // 你要传给后台的参数值 key/value
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/stockapply/addstockapply',
    method: 'post',
    data: params
  })
}

// 修改采购申请
export function updatestockapply(query, query2) {
  var params = new URLSearchParams()
  params.append('stockApplyJson', query) // 你要传给后台的参数值 key/value
  params.append('stockApplyDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/stockapply/updatestockapply',
    method: 'post',
    data: params
  })
}

// 删除采购申请
export function deletestockapply(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('applyIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/stockapply/deletestockapply',
    method: 'post',
    data: params
  })
}

// 审核采购申请
export function updatestockapply2(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('stockApplyJson', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/stockapply/updatestockapply',
    method: 'post',
    data: params
  })
}

// 采购申请列表
export function applyList(query) {
  var params = new URLSearchParams()
  if (query.employeeId !== '' && query.employeeId !== null && query.employeeId !== undefined) {
    params.append('employeeId', query.employeeId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/myApply/applyList',
    method: 'post',
    data: params
  })
}
