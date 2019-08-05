import request from '@/utils/request'

// 新建生产任务
export function addproduceplan(query, query2, query3) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('producePlanJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('producePlanDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/produceplan/addproduceplan',
    method: 'post',
    data: params
  })
}

// 生产任务单列表
export function produceplanlist(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.planNumber !== '' && query.planNumber !== null && query.planNumber !== undefined) {
    params.append('planNumber', query.planNumber) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.workCenterId !== '' && query.workCenterId !== null && query.workCenterId !== undefined) {
    params.append('workCenterId', query.workCenterId) // 你要传给后台的参数值 key/value
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
  if (query.isUse !== '' && query.isUse !== null && query.isUse !== undefined) {
    params.append('isUse', query.isUse) // 你要传给后台的参数值 key/value
  }
  if (query.isActive !== '' && query.isActive !== null && query.isActive !== undefined) {
    params.append('isActive', query.isActive) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/produceplan/produceplanlist',
    method: 'post',
    data: params
  })
}

// 删除生产任务
export function deleteproduceplan(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('planIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/produceplan/deleteproduceplan',
    method: 'post',
    data: params
  })
}

// 修改生产任务
export function updateproduceplan(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('producePlanJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('producePlanDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/produceplan/updateproduceplan',
    method: 'post',
    data: params
  })
}

// 审核生产任务
export function updateproduceplan2(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('producePlanJson', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/produceplan/updateproduceplan',
    method: 'post',
    data: params
  })
}
