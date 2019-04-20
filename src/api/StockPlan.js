import request from '@/utils/request'

//  新建采购计划
export function addstockplan(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('stockPlanJson', query) // 你要传给后台的参数值 key/value
  params.append('stockPlanDetailJson', query2) // 你要传给后台的参数值 key/value
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/stockplan/addstockplan',
    method: 'post',
    data: params
  })
}

// 采购计划列表
export function stockplanlist(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.planNumber !== '' && query.planNumber !== null && query.planNumber !== undefined) {
    params.append('planNumber', query.planNumber) // 你要传给后台的参数值 key/value
  }
  if (query.planPersonId !== '' && query.planPersonId !== null && query.planPersonId !== undefined) {
    params.append('planPersonId', query.planPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.planDeptId !== '' && query.planDeptId !== null && query.planDeptId !== undefined) {
    params.append('planDeptId', query.planDeptId) // 你要传给后台的参数值 key/value
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
  if (query.supplierId !== '' && query.supplierId !== null && query.supplierId !== undefined) {
    params.append('supplierId', query.supplierId) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/stockplan/stockplanlist',
    method: 'post',
    data: params
  })
}

// 删除采购计划
export function deletestockplan(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('planIds', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/stockplan/deletestockplan',
    method: 'post',
    data: params
  })
}

// 修改采购计划
export function updatestockplan(query, query2) {
  var params = new URLSearchParams()
  params.append('stockPlanJson', query) // 你要传给后台的参数值 key/value
  params.append('stockPlanDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/stockplan/updatestockplan',
    method: 'post',
    data: params
  })
}

// 审核采购计划
export function updatestockplan2(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('stockPlanJson', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/stockplan/updatestockplan',
    method: 'post',
    data: params
  })
}
