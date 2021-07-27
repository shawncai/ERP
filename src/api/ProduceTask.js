import request from '@/utils/request'

// 新建生产任务
export function addproducetask(query, query2, query3) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('produceTaskJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('produceTaskDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/producetask/addproducetask',
    method: 'post',
    data: params
  })
}

// 生产任务列表
export function producetasklist(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('taskId', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.taskNumber !== '' && query.taskNumber !== null && query.taskNumber !== undefined) {
    params.append('taskNumber', query.taskNumber) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.produceDeptId !== '' && query.produceDeptId !== null && query.produceDeptId !== undefined) {
    params.append('produceDeptId', query.produceDeptId) // 你要传给后台的参数值 key/value
  }
  if (query.processTypeId !== '' && query.processTypeId !== null && query.processTypeId !== undefined) {
    params.append('processTypeId', query.processTypeId) // 你要传给后台的参数值 key/value
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
    url: '/producetask/producetasklist',
    method: 'post',
    data: params
  })
}

// 极速生产任务列表
export function producetaskGetList(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.taskNumber !== '' && query.taskNumber !== null && query.taskNumber !== undefined) {
    params.append('taskNumber', query.taskNumber) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.produceDeptId !== '' && query.produceDeptId !== null && query.produceDeptId !== undefined) {
    params.append('produceDeptId', query.produceDeptId) // 你要传给后台的参数值 key/value
  }
  if (query.processTypeId !== '' && query.processTypeId !== null && query.processTypeId !== undefined) {
    params.append('processTypeId', query.processTypeId) // 你要传给后台的参数值 key/value
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
    url: '/producetask/getList',
    method: 'post',
    data: params
  })
}

// 删除生产任务
export function deleteproducetask(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('taskIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/producetask/deleteproducetask',
    method: 'post',
    data: params
  })
}

// 修改生产任务
export function updateproducetask(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('produceTaskJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('produceTaskDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/producetask/updateproducetask',
    method: 'post',
    data: params
  })
}

// 审核生产任务
export function updateproducetask2(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('produceTaskJson', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/producetask/updateproducetask',
    method: 'post',
    data: params
  })
}

// 新建报告
export function addproducereport(query, query2, query3, query4, query5, query6) {
  var params = new URLSearchParams()
  params.append('produceReportJson', query) // 你要传给后台的参数值 key/value
  params.append('produceReportDetailJson', query2) // 你要传给后台的参数值 key/value
  params.append('produceReportPeopleDetailJson', query3) // 你要传给后台的参数值 key/value
  params.append('produceReportEquipmentDetailJson', query4) // 你要传给后台的参数值 key/value
  params.append('produceReportMaterialsDetailJson', query5) // 你要传给后台的参数值 key/value
  params.append('repositoryId', query6.repositoryId) // 你要传给后台的参数值 key/value
  params.append('regionId', query6.regionId) // 你要传给后台的参数值 key/value
  return request({
    url: '/producereport/addproducereport',
    method: 'post',
    data: params
  })
}

// 报告列表
export function producereportlist(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.reportNumber !== '' && query.reportNumber !== null && query.reportNumber !== undefined) {
    params.append('reportNumber', query.reportNumber) // 你要传给后台的参数值 key/value
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
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/producereport/producereportlist',
    method: 'post',
    data: params
  })
}

// 删除报告
export function deleteproducereport(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('reportIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/producereport/deleteproducereport',
    method: 'post',
    data: params
  })
}

// 修改报告
export function updateproducereport(query, query2, query3, query4, query5) {
  var params = new URLSearchParams()
  params.append('produceReportJson', query) // 你要传给后台的参数值 key/value
  params.append('produceReportDetailJson', query2) // 你要传给后台的参数值 key/value
  params.append('produceReportPeopleDetailJson', query3) // 你要传给后台的参数值 key/value
  params.append('produceReportEquipmentDetailJson', query4) // 你要传给后台的参数值 key/value
  params.append('produceReportMaterialsDetailJson', query5) // 你要传给后台的参数值 key/value
  return request({
    url: '/producereport/updateproducereport',
    method: 'post',
    data: params
  })
}

// 审核报告
export function updateproducereport2(query) {
  var params = new URLSearchParams()
  params.append('produceReportJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/producereport/updateproducereport',
    method: 'post',
    data: params
  })
}

// 成本费用录入
export function addProduceMonthExpenses(query) {
  var params = new URLSearchParams()
  if (query.personExpenses !== undefined && query.personExpenses !== null && query.personExpenses !== '') {
    params.append('personExpenses', query.personExpenses) // 你要传给后台的参数值 key/value
  }
  if (query.otherExpenses !== undefined && query.otherExpenses !== null && query.otherExpenses !== '') {
    params.append('otherExpenses', query.otherExpenses) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/produceMonthExpenses/addProduceMonthExpenses',
    method: 'post',
    data: params
  })
}

// 查询成本费用录入
export function queryProduceMonthExpenses(query) {
  var params = new URLSearchParams()
  if (query !== undefined && query !== null && query !== '') {
    params.append('month', query) // 你要传给后台的参数值 key/value
  }

  return request({
    url: '/produceMonthExpenses/queryProduceMonthExpenses',
    method: 'post',
    data: params
  })
}
