import request from '@/utils/request'

// 添加预收款单
export function createprepReceipt(query, query4) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  if (query4.repositoryId !== '' && query4.repositoryId !== null && query4.repositoryId !== undefined) {
    params.append('repositoryId', query4.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query4.regionId !== '' && query4.regionId !== null && query4.regionId !== undefined) {
    params.append('regionId', query4.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/prepReceipt/create',
    method: 'post',
    data: params
  })
}
