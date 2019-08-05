import request from '@/utils/request'

// 新建质检报告
export function addProduceCost(query, query2, query3) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('productCostJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('productCostDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/productCost/addProductCost',
    method: 'post',
    data: params
  })
}

// 质检报告单列表
export function produceCostlist(query) {
  var params = new URLSearchParams()
  if (query.accountTime !== '' && query.accountTime !== null && query.accountTime !== undefined) {
    params.append('accountTime', query.accountTime) // 你要传给后台的参数值 key/value
  }
  if (query.accountType !== '' && query.accountType !== null && query.accountType !== undefined) {
    params.append('accountType', query.accountType) // 你要传给后台的参数值 key/value
  }
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productName', query.productName) // 你要传给后台的参数值 key/value
  }
  if (query.inspectionDeptId !== '' && query.inspectionDeptId !== null && query.inspectionDeptId !== undefined) {
    params.append('inspectionDeptId', query.inspectionDeptId) // 你要传给后台的参数值 key/value
  }
  if (query.checkType !== '' && query.checkType !== null && query.checkType !== undefined) {
    params.append('checkType', query.checkType) // 你要传给后台的参数值 key/value
  }
  if (query.sourceType !== '' && query.sourceType !== null && query.sourceType !== undefined) {
    params.append('sourceType', query.sourceType) // 你要传给后台的参数值 key/value
  }
  if (query.sourceNumber !== '' && query.sourceNumber !== null && query.sourceNumber !== undefined) {
    params.append('sourceNumber', query.sourceNumber) // 你要传给后台的参数值 key/value
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
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/productCost/productcostlist',
    method: 'post',
    data: params
  })
}

//  修改质检报告
export function updatecheckreport(query, query2) {
  var params = new URLSearchParams()
  params.append('checkReportJson', query) // 你要传给后台的参数值 key/value
  params.append('checkReportDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/checkreport/updatecheckreport',
    method: 'post',
    data: params
  })
}

//  审批质检报告
export function updateproduceCost(query) {
  var params = new URLSearchParams()
  params.append('productCostJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/productCost/updateProductCost',
    method: 'post',
    data: params
  })
}

// 删除质检报告
export function deleteproduceCost(query, query2) {
  var params = new URLSearchParams()
  params.append('costIds', query) // 你要传给后台的参数值 key/value
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/productCost/deleteProductCost',
    method: 'post',
    data: params
  })
}
