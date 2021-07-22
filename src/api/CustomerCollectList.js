import request from '@/utils/request'

// 查询分类属性
export function customerCollectList(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.outNumber !== '' && query.outNumber !== null && query.outNumber !== undefined) {
    params.append('outNumber', query.outNumber) // 你要传给后台的参数值 key/value
  }
  if (query.customerName !== '' && query.customerName !== null && query.customerName !== undefined) {
    params.append('customerName', query.customerName) // 你要传给后台的参数值 key/value
  }
  if (query.customerId !== '' && query.customerId !== null && query.customerId !== undefined) {
    params.append('customerId', query.customerId) // 你要传给后台的参数值 key/value
  }
  if (query.searchRepositoryId !== '' && query.searchRepositoryId !== null && query.searchRepositoryId !== undefined) {
    params.append('searchRepositoryId', query.searchRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/customerCollect/customerCollectList',
    method: 'post',
    data: params
  })
}
