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
  params.append('locationJson', query.pagenum) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/location/addlocation',
    method: 'post',
    data: params
  })
}
