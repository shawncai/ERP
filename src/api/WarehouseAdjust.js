import request from '@/utils/request'

// 删除编码规则
export function addinitialenter(query, detail, repositoryId, regionId) {
  var params = new URLSearchParams()
  params.append('initialEnterJson', query) // 你要传给后台的参数值 key/value
  params.append('initialEnterDetailJson', detail) // 你要传给后台的参数值 key/value
  params.append('repositoryId', repositoryId) // 你要传给后台的参数值 key/value
  params.append('regionId', regionId) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/initialenter/addinitialenter',
    method: 'post',
    data: params
  })
}

// 添加货位
export function addlocation(query) {
  var params = new URLSearchParams()
  params.append('locationJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/location/addlocation',
    method: 'post',
    data: params
  })
}

// 货位列表
export function locationlist(query) {
  var params = new URLSearchParams()
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.locationCode !== '' && query.locationCode !== null && query.locationCode !== undefined) {
    params.append('locationCode', query.locationCode) // 你要传给后台的参数值 key/value
  }
  if (query.locationName !== '' && query.locationName !== null && query.locationName !== undefined) {
    params.append('locationName', query.locationName) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/location/locationlist',
    method: 'post',
    data: params
  })
}

// 删除货位
export function deletelocation(query) {
  var params = new URLSearchParams()
  params.append('locationIds', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/location/deletelocation',
    method: 'post',
    data: params
  })
}
