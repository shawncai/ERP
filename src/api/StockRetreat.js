import request from '@/utils/request'

//   添加采购退货
export function createstockArrival(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/stockRetreat/create',
    method: 'post',
    data: params
  })
}
