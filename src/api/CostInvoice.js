import request from '@/utils/request'

// 查询采购退货
export function handleEnd(query) {
  var params = new URLSearchParams()
  if (query.month !== '' && query.month !== null && query.month !== undefined) {
    params.append('month', query.month) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/endReceipt/handleEnd',
    method: 'post',
    data: params
  })
}

export function handleReturnEnd(query) {
  var params = new URLSearchParams()
  if (query.month !== '' && query.month !== null && query.month !== undefined) {
    params.append('month', query.month) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/endReceipt/handleReturnEnd',
    method: 'post',
    data: params
  })
}

//   添加采购退货
export function addCostInvoice(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('costInvoiceJson', query) // 你要传给后台的参数值 key/value
  params.append('costInvoiceDetailJson', query2) // 你要传给后台的参数值 key/value
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/costInvoice/addCostInvoice',
    method: 'post',
    data: params
  })
}

// 查询采购退货
export function costInvoiceList(query) {
  var params = new URLSearchParams()
  if (query.invoiceId !== '' && query.invoiceId !== null && query.invoiceId !== undefined) {
    params.append('invoiceId', query.invoiceId) // 你要传给后台的参数值 key/value
  }
  if (query.invoiceNumber !== '' && query.invoiceNumber !== null && query.invoiceNumber !== undefined) {
    params.append('invoiceNumber', query.invoiceNumber) // 你要传给后台的参数值 key/value
  }
  if (query.supplierId !== '' && query.supplierId !== null && query.supplierId !== undefined) {
    params.append('supplierId', query.supplierId) // 你要传给后台的参数值 key/value
  }
  if (query.isRed !== '' && query.isRed !== null && query.isRed !== undefined) {
    params.append('isRed', query.isRed) // 你要传给后台的参数值 key/value
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
  if (query.isInclude !== '' && query.isInclude !== null && query.isInclude !== undefined) {
    params.append('isInclude', query.isInclude) // 你要传给后台的参数值 key/value
  }
  if (query.month !== '' && query.month !== null && query.month !== undefined) {
    params.append('month', query.month) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/costInvoice/costInvoiceList',
    method: 'post',
    data: params
  })
}

// 查询采购退货
export function costInvoiceGetList(query) {
  var params = new URLSearchParams()
  if (query.invoiceId !== '' && query.invoiceId !== null && query.invoiceId !== undefined) {
    params.append('invoiceId', query.invoiceId) // 你要传给后台的参数值 key/value
  }
  if (query.invoiceNumber !== '' && query.invoiceNumber !== null && query.invoiceNumber !== undefined) {
    params.append('invoiceNumber', query.invoiceNumber) // 你要传给后台的参数值 key/value
  }
  if (query.supplierId !== '' && query.supplierId !== null && query.supplierId !== undefined) {
    params.append('supplierId', query.supplierId) // 你要传给后台的参数值 key/value
  }
  if (query.isRed !== '' && query.isRed !== null && query.isRed !== undefined) {
    params.append('isRed', query.isRed) // 你要传给后台的参数值 key/value
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
  if (query.isInclude !== '' && query.isInclude !== null && query.isInclude !== undefined) {
    params.append('isInclude', query.isInclude) // 你要传给后台的参数值 key/value
  }
  if (query.month !== '' && query.month !== null && query.month !== undefined) {
    params.append('month', query.month) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/costInvoice/getList',
    method: 'post',
    data: params
  })
}

// 删除采购退货
export function deletecostinvoice(query, query2) {
  var params = new URLSearchParams()
  params.append('invoiceIds', query) // 你要传给后台的参数值 key/value
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/costInvoice/deletecostinvoice',
    method: 'post',
    data: params
  })
}

//  修改采购退货
export function updatecostinvoice(query, query2) {
  var params = new URLSearchParams()
  params.append('costInvoiceJson', query) // 你要传给后台的参数值 key/value
  params.append('costInvoiceDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/costInvoice/updatecostinvoice',
    method: 'post',
    data: params
  })
}

//  审核采购退货
export function updatecostinvoice2(query) {
  var params = new URLSearchParams()
  params.append('costInvoiceJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/costInvoice/updatecostinvoice',
    method: 'post',
    data: params
  })
}
