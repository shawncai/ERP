import request from '@/utils/request'

// 分期列表
export function installmentlist(query) {
  var params = new URLSearchParams()
  if (query.suretyName !== '' && query.suretyName !== null && query.suretyName !== undefined) {
    params.append('suretyName', query.suretyName) // 你要传给后台的参数值 key/value
  }
  if (query.installmentId !== '' && query.installmentId !== null && query.installmentId !== undefined) {
    params.append('installmentId', query.installmentId) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '' && query.stat !== null && query.stat !== undefined) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  if (query.orderNumber !== '' && query.orderNumber !== null && query.orderNumber !== undefined) {
    params.append('orderNumber', query.orderNumber) // 你要传给后台的参数值 key/value
  }
  if (query.applyNumber !== '' && query.applyNumber !== null && query.applyNumber !== undefined) {
    params.append('applyNumber', query.applyNumber) // 你要传给后台的参数值 key/value
  }
  if (query.customerId !== '' && query.customerId !== null && query.customerId !== undefined) {
    params.append('customerId', query.customerId) // 你要传给后台的参数值 key/value
  }
  if (query.customerName !== '' && query.customerName !== null && query.customerName !== undefined) {
    params.append('customerName', query.customerName) // 你要传给后台的参数值 key/value
  }
  if (query.customerPhone !== '' && query.customerPhone !== null && query.customerPhone !== undefined) {
    params.append('customerPhone', query.customerPhone) // 你要传给后台的参数值 key/value
  }
  if (query.saleRepositoryId !== '' && query.saleRepositoryId !== null && query.saleRepositoryId !== undefined) {
    params.append('saleRepositoryId', query.saleRepositoryId) // 你要传给后台的参数值 key/value
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
  if (query.address !== '' && query.address !== null && query.address !== undefined) {
    params.append('address', query.address) // 你要传给后台的参数值 key/value
  }
  if (query.overdueMonth !== '' && query.overdueMonth !== null && query.overdueMonth !== undefined) {
    params.append('overdueMonth', query.overdueMonth) // 你要传给后台的参数值 key/value
  }
  if (query.dayu !== '' && query.dayu !== null && query.dayu !== undefined) {
    params.append('dayu', query.dayu) // 你要传给后台的参数值 key/value
  }
  if (query.xiaoyu !== '' && query.xiaoyu !== null && query.xiaoyu !== undefined) {
    params.append('xiaoyu', query.xiaoyu) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/installmentorder/installmentlist',
    method: 'post',
    data: params
  })
}
