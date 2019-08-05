import request from '@/utils/request'

// 新建分期申请
export function addinstallmentapply(query, query2, query4) {
  var params = new URLSearchParams()
  params.append('installmentApplyJson', query) // 你要传给后台的参数值 key/value
  params.append('installmentApplyDetailJson', query2) // 你要传给后台的参数值 key/value
  if (query4.repositoryId !== '' && query4.repositoryId !== null && query4.repositoryId !== undefined) {
    params.append('repositoryId', query4.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query4.regionId !== '' && query4.regionId !== null && query4.regionId !== undefined) {
    params.append('regionId', query4.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/installmentapply/addinstallmentapply',
    method: 'post',
    data: params
  })
}

// 分期申请列表
export function applylist(query) {
  var params = new URLSearchParams()
  if (query.inquirePersonId !== '' && query.inquirePersonId !== null && query.inquirePersonId !== undefined) {
    params.append('inquirePersonId', query.inquirePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
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
  if (query.salePersonId !== '' && query.salePersonId !== null && query.salePersonId !== undefined) {
    params.append('salePersonId', query.salePersonId) // 你要传给后台的参数值 key/value
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
    url: '/installmentapply/applylist',
    method: 'post',
    data: params
  })
}

// 修改分期申请
export function updateapply(query, query2) {
  var params = new URLSearchParams()
  params.append('installmentApplyJson', query) // 你要传给后台的参数值 key/value
  params.append('installmentApplyDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/installmentapply/updateapply',
    method: 'post',
    data: params
  })
}

// 删除分期申请
export function deleteapply(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('applyIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/installmentapply/deleteapply',
    method: 'post',
    data: params
  })
}

// 审核分期申请
export function updateapply2(query) {
  var params = new URLSearchParams()
  params.append('installmentApplyJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/installmentapply/updateapply',
    method: 'post',
    data: params
  })
}
