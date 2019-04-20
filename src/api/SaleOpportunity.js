import request from '@/utils/request'

// 新建销售机会
export function addsaleopportunity(query, query2) {
  var params = new URLSearchParams()
  params.append('saleOpportunityJson', query) // 你要传给后台的参数值 key/value
  params.append('saleOpportunityDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/saleopportunity/addsaleopportunity',
    method: 'post',
    data: params
  })
}
