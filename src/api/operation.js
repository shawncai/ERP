import request from '@/utils/request'

// 经纬点
export function getOperationLog(query) {
  var params = new URLSearchParams()
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  if (query.module !== '' && query.module !== null && query.module !== undefined) {
    params.append('module', query.module) // 你要传给后台的参数值 key/value
  }
  if (query.operatorId !== '' && query.operatorId !== null && query.operatorId !== undefined) {
    params.append('operatorId', query.operatorId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/zcc/operationList',
    method: 'post',
    data: params
  })
}
