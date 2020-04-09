import request from '@/utils/request'

// 应付款列表
export function shouldPayList(query) {
  var params = new URLSearchParams()
  if (query.sourceNumber !== '' && query.sourceNumber !== null && query.sourceNumber !== undefined) {
    params.append('sourceNumber', query.sourceNumber) // 你要传给后台的参数值 key/value
  }
  if (query.supplierId !== '' && query.supplierId !== null && query.supplierId !== undefined) {
    params.append('supplierId', query.supplierId) // 你要传给后台的参数值 key/value
  }
  if (query.payDate !== '' && query.payDate !== null && query.payDate !== undefined) {
    params.append('payDate', query.payDate) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/payment/shouldPayList',
    method: 'post',
    data: params
  })
}
