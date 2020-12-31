import request from '@/utils/request'

// 采购核算
export function purchaseAccounting(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('beginTime', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('endTime', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/accounting/purchaseAccounting',
    method: 'post',
    data: params
  })
}

// 生产核算
export function outSourceAccounting(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('beginTime', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('endTime', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/accounting/outSourceAccounting',
    method: 'post',
    data: params
  })
}
