import request from '@/utils/request'

// 添加转账单
export function createtransfer(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  params.append('detailJson', query3) // 你要传给后台的参数值 key/value
  if (query2.repositoryId !== '' && query2.repositoryId !== null && query2.repositoryId !== undefined) {
    params.append('repositoryId', query2.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query2.regionId !== '' && query2.regionId !== null && query2.regionId !== undefined) {
    params.append('regionId', query2.regionId) // 你要传给后台的参数值 key/value
  }
  if (query2.picids !== '' && query2.picids !== null && query2.picids !== undefined) {
    params.append('picids', query2.picids) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/transfer/create',
    method: 'post',
    data: params
  })
}

export function addTransferVoucher(query) {
  var params = new URLSearchParams()
  params.append('transferId', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/voucher/addTransferVoucher',
    method: 'post',
    data: params
  })
}

// 查询转账单
export function searchtransfer(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.searchRepositoryId !== '' && query.searchRepositoryId !== null && query.searchRepositoryId !== undefined) {
    params.append('searchRepositoryId', query.searchRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.number !== '' && query.number !== null && query.number !== undefined) {
    params.append('number', query.number) // 你要传给后台的参数值 key/value
  }
  if (query.closeType !== '' && query.closeType !== null && query.closeType !== undefined) {
    params.append('closeType', query.closeType) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.direction !== '' && query.direction !== null && query.direction !== undefined) {
    params.append('direction', query.direction) // 你要传给后台的参数值 key/value
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
  if (query.subjectCode !== '' && query.subjectCode !== null && query.subjectCode !== undefined) {
    params.append('subjectCode', query.subjectCode) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/transfer/search',
    method: 'post',
    data: params
  })
}

// 修改转账单
export function updatetransfer(query, query2) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/transfer/update',
    method: 'post',
    data: params
  })
}

//  删除转账单
export function deletetransfer(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/transfer/delete',
    method: 'post',
    data: params
  })
}

// 审核转账单
export function updatetransfer2(query) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/transfer/update',
    method: 'post',
    data: params
  })
}
