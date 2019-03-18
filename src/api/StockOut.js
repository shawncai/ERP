import request from '@/utils/request'

// 查询出库单
export function searchOutlist(query) {
  var params = new URLSearchParams()
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.sourceType !== '' && query.sourceType !== null && query.sourceType !== undefined) {
    params.append('sourceType', query.sourceType) // 你要传给后台的参数值 key/value
  }
  if (query.outPersonId !== '' && query.outPersonId !== null && query.outPersonId !== undefined) {
    params.append('outPersonId', query.outPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.begintime !== '' && query.begintime !== null && query.begintime !== undefined) {
    params.append('begintime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endtime !== '' && query.endtime !== null && query.endtime !== undefined) {
    params.append('endtime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.outReasonId !== '' && query.outReasonId !== null && query.outReasonId !== undefined) {
    params.append('outReasonId', query.outReasonId) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '' && query.stat !== null && query.stat !== undefined) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/otherout/search',
    method: 'post',
    data: params
  })
}

// 删除出库单
export function deleteStock(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/otherout/delete',
    method: 'post',
    data: params
  })
}
