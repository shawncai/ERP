import request from '@/utils/request'

//  新建发票
export function addinvoice(query, query3) {
  var params = new URLSearchParams()
  params.append('invoiceJson', query) // 你要传给后台的参数值 key/value
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/invoice/addinvoice',
    method: 'post',
    data: params
  })
}

// 发票列表
export function invoicelist(query) {
  var params = new URLSearchParams()
  if (query.invoiceNumber !== '' && query.invoiceNumber !== null && query.invoiceNumber !== undefined) {
    params.append('invoiceNumber', query.invoiceNumber) // 你要传给后台的参数值 key/value
  }
  if (query.sourceType !== '' && query.sourceType !== null && query.sourceType !== undefined) {
    params.append('sourceType', query.sourceType) // 你要传给后台的参数值 key/value
  }
  if (query.sourceNumber !== '' && query.sourceNumber !== null && query.sourceNumber !== undefined) {
    params.append('sourceNumber', query.sourceNumber) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.handleDeptId !== '' && query.handleDeptId !== null && query.handleDeptId !== undefined) {
    params.append('handleDeptId', query.handleDeptId) // 你要传给后台的参数值 key/value
  }
  if (query.supplierId !== '' && query.supplierId !== null && query.supplierId !== undefined) {
    params.append('supplierId', query.supplierId) // 你要传给后台的参数值 key/value
  }
  if (query.isCheckin !== '' && query.isCheckin !== null && query.isCheckin !== undefined) {
    params.append('isCheckin', query.isCheckin) // 你要传给后台的参数值 key/value
  }
  if (query.settleStat !== '' && query.settleStat !== null && query.settleStat !== undefined) {
    params.append('settleStat', query.settleStat) // 你要传给后台的参数值 key/value
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
    url: '/erp/invoice/invoicelist',
    method: 'post',
    data: params
  })
}

//  修改发票
export function updateinvoice(query) {
  var params = new URLSearchParams()
  params.append('invoiceJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/invoice/updateinvoice',
    method: 'post',
    data: params
  })
}

//  审批发票
export function updateinvoice2(query) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/invoice/updateinvoice',
    method: 'post',
    data: params
  })
}

// 删除发票
export function deleteinvoice(query) {
  var params = new URLSearchParams()
  params.append('invoiceIds', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/invoice/deleteinvoice',
    method: 'post',
    data: params
  })
}
