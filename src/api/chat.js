import request from '@/utils/request'

// 添加销售订单
export function customerInfo(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('customerId', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/customer/customerInfo',
    method: 'post',
    data: params
  })
}
