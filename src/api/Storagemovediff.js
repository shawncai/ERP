import request from '@/utils/request'

// 新增调拨差异报告
export function createstoragemovediff(query, query2, query3) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('moveDiffReportJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('moveDiffReportDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  //   if (query3.createPersonId !== '' && query3.createPersonId !== null && query3.createPersonId !== undefined) {
  //     params.append('createPersonId', query3.createPersonId) // 你要传给后台的参数值 key/value
  //   }
  //   if (query3.countryId !== '' && query3.countryId !== null && query3.countryId !== undefined) {
  //     params.append('countryId', query3.countryId) // 你要传给后台的参数值 key/value
  //   }
  return request({
    url: '/moveDiff/addMoveDiffReport',
    method: 'post',
    data: params
  })
}

// 删除差异报告
export function deletestoragemovediff(query) {
  var params = new URLSearchParams()
  params.append('reportIds', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/moveDiff/deleteMoveDiff',
    method: 'post',
    data: params
  })
}

// 查询差异报告
export function searchstoragemovediff(query) {
  var params = new URLSearchParams()
  if (query.reportId !== '' && query.reportId !== null && query.reportId !== undefined) {
    params.append('reportId', query.reportId) // 你要传给后台的参数值 key/value
  }
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.receiptStat !== '' && query.receiptStat !== null && query.receiptStat !== undefined) {
    params.append('receiptStat', query.receiptStat) // 你要传给后台的参数值 key/value
  }
  if (query.judgeStat !== '' && query.judgeStat !== null && query.judgeStat !== undefined) {
    params.append('judgeStat', query.judgeStat) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId', query.createPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.moveNumber !== '' && query.moveNumber !== null && query.moveNumber !== undefined) {
    params.append('moveNumber', query.moveNumber) // 你要传给后台的参数值 key/value
  }
  if (query.acceptPersonId !== '' && query.acceptPersonId !== null && query.acceptPersonId !== undefined) {
    params.append('acceptPersonId', query.acceptPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.reportNumber !== '' && query.reportNumber !== null && query.reportNumber !== undefined) {
    params.append('reportNumber', query.reportNumber) // 你要传给后台的参数值 key/value
  }
  if (query.outRepositoryId !== '' && query.outRepositoryId !== null && query.outRepositoryId !== undefined) {
    params.append('outRepositoryId', query.outRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.inRepositoryId !== '' && query.inRepositoryId !== null && query.inRepositoryId !== undefined) {
    params.append('inRepositoryId', query.inRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/moveDiff/reportList',
    method: 'post',
    data: params
  })
}
