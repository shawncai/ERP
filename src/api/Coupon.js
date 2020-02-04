import request from '@/utils/request'

// 添加领料单
export function provide(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('detailJson', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/coupon/provide',
    method: 'post',
    data: params
  })
}

// 添加领料单
export function createCoupon(query) {
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
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  if (query.money !== '' && query.money !== null && query.money !== undefined) {
    params.append('money', query.money) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/coupon/search',
    method: 'post',
    data: params
  })
}

// 领料单列表
export function searchProvide(query) {
  var params = new URLSearchParams()
  if (query.couponName !== '' && query.couponName !== null && query.couponName !== undefined) {
    params.append('couponName', query.couponName) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryName !== '' && query.repositoryName !== null && query.repositoryName !== undefined) {
    params.append('repositoryName', query.repositoryName) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/coupon/searchProvide',
    method: 'post',
    data: params
  })
}

// 领料单列表
export function searchUse(query) {
  var params = new URLSearchParams()
  if (query.couponName !== '' && query.couponName !== null && query.couponName !== undefined) {
    params.append('couponName', query.couponName) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryName !== '' && query.repositoryName !== null && query.repositoryName !== undefined) {
    params.append('repositoryName', query.repositoryName) // 你要传给后台的参数值 key/value
  }
  if (query.customerName !== '' && query.customerName !== null && query.customerName !== undefined) {
    params.append('customerName', query.customerName) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.couponId !== '' && query.couponId !== null && query.couponId !== undefined) {
    params.append('couponId', query.couponId) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/coupon/searchUse',
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
