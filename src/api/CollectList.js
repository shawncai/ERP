import request from '@/utils/request'

// 收款列表
export function collectlist(query) {
  var params = new URLSearchParams()
  if (query.count !== '' && query.count !== null && query.count !== undefined) {
    params.append('count', query.count) // 你要传给后台的参数值 key/value
  }
  if (query.customerName !== '' && query.customerName !== null && query.customerName !== undefined) {
    params.append('customerName', query.customerName) // 你要传给后台的参数值 key/value
  }
  if (query.carCode !== '' && query.carCode !== null && query.carCode !== undefined) {
    params.append('carCode', query.carCode) // 你要传给后台的参数值 key/value
  }
  if (query.motorCode !== '' && query.motorCode !== null && query.motorCode !== undefined) {
    params.append('motorCode', query.motorCode) // 你要传给后台的参数值 key/value
  }
  if (query.batteryCode !== '' && query.batteryCode !== null && query.batteryCode !== undefined) {
    params.append('batteryCode', query.batteryCode) // 你要传给后台的参数值 key/value
  }
  if (query.time !== '' && query.time !== null && query.time !== undefined) {
    params.append('time', query.time) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/installmentorder/collectlist',
    method: 'post',
    data: params
  })
}
