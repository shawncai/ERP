import request from '@/utils/request'

// 盘点单列表
export function countlist(query) {
  var params = new URLSearchParams()
  if (query.countId !== '' && query.countId !== null && query.countId !== undefined) {
    params.append('countId', query.countId) // 你要传给后台的参数值 key/value
  }
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.sourceNumber !== '' && query.sourceNumber !== null && query.sourceNumber !== undefined) {
    params.append('sourceNumber', query.sourceNumber) // 你要传给后台的参数值 key/value
  }
  if (query.countNumber !== '' && query.countNumber !== null && query.countNumber !== undefined) {
    params.append('countNumber', query.countNumber) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.countDeptId !== '' && query.countDeptId !== null && query.countDeptId !== undefined) {
    params.append('countDeptId', query.countDeptId) // 你要传给后台的参数值 key/value
  }
  if (query.countRepositoryId !== '' && query.countRepositoryId !== null && query.countRepositoryId !== undefined) {
    params.append('countRepositoryId', query.countRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.receiptStat !== '' && query.receiptStat !== null && query.receiptStat !== undefined) {
    params.append('receiptStat', query.receiptStat) // 你要传给后台的参数值 key/value
  }
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId', query.createPersonId) // 你要传给后台的参数值 key/value
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
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/inventorycount/countlist',
    method: 'post',
    data: params
  })
}

// 删除盘点单
export function deletecount(query) {
  var params = new URLSearchParams()
  if (query.countIds !== '' && query.countIds !== null && query.countIds !== undefined) {
    params.append('countIds', query.countIds) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/inventorycount/deletecount',
    method: 'post',
    data: params
  })
}
