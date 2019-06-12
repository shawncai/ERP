import request from '@/utils/request'
// 获取抬头数据1
export function workDesk1(query) {
  var params = new URLSearchParams()
  params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/repoData/countData',
    method: 'post',
    data: params
  })
}

// 获取抬头数据2
export function workDesk2(query) {
  var params = new URLSearchParams()
  params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/repoData/workbench',
    method: 'post',
    data: params
  })
}
