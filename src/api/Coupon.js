import request from '@/utils/request'

// 添加领料单
export function createCoupon(query, query2, query3) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/coupon/create',
    method: 'post',
    data: params
  })
}

// 领料单列表
export function couponlist(query) {
  var params = new URLSearchParams()
  if (query.name !== '' && query.name !== null && query.name !== undefined) {
    params.append('name', query.name) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '' && query.stat !== null && query.stat !== undefined) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/coupon/search',
    method: 'post',
    data: params
  })
}

// 删除领料单
export function deletecoupon(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/coupon/delete',
    method: 'post',
    data: params
  })
}

// 修改领料单
export function updatecoupon(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/coupon/update',
    method: 'post',
    data: params
  })
}
