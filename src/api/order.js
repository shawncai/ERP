import request from '@/utils/request'

// 订单列表
export function orderlist(query) {
  return request({
    url: '/pss/order/adminorderlist',
    method: 'post',
    params: query
  })
}

// 订单列表搜索
export function searchorders(query) {
  var params = new URLSearchParams()
  params.append('keyword', query.keyword) // 你要传给后台的参数值 key/value
  params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/order/adminorderlist',
    method: 'post',
    data: params
  })
}

// 订单详情
export function orderdetail(query) {
  var params = new URLSearchParams()
  params.append('orderid', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/order/orderdetail',
    method: 'post',
    data: params
  })
}

// 分期订单搜索
export function installsearch(query) {
  var params = new URLSearchParams()
  params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  params.append('applicantname', query.applicantname) // 你要传给后台的参数值 key/value
  params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  params.append('code', query.code) // 你要传给后台的参数值 key/value

  return request({
    url: '/pss/installmentorder/geteachinstallmentlist',
    method: 'post',
    data: params
  })
}

// 分期订单列表
export function installlist(query) {
  return request({
    url: '/pss/installmentorder/geteachinstallmentlist',
    method: 'post',
    params: query
  })
}

// 分期订单详情
export function installdetail(query) {
  var params = new URLSearchParams()
  params.append('orderid', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/order/orderdetail',
    method: 'post',
    data: params
  })
}

// 所有员工列表
export function stafflist() {
  return request({
    url: '/pss/repository/getremplist',
    method: 'post'
  })
}

// 分期订单分派
export function dispatchorder(eachinstallmentid, handlerid) {
  var params = new URLSearchParams()
  params.append('eachinstallmentid', eachinstallmentid) // 你要传给后台的参数值 key/value
  params.append('handlerid', handlerid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/service/installmenttoemp',
    method: 'post',
    data: params
  })
}

// 所有门店信息
export function getrepositorylists() {
  return request({
    url: '/pss/repository/getrepositorylist',
    method: 'post'
  })
}

// 上门收款列表
export function getgather(query) {
  return request({
    url: '/pss/gathering/getgatheringbyrepositoryid',
    method: 'post',
    params: query
  })
}

// 上门收款订单搜索
export function receiptseach(query) {
  var params = new URLSearchParams()
  params.append('repositoryid', query.repositoryid) // 你要传给后台的参数值 key/value
  params.append('ordercode', query.ordercode) // 你要传给后台的参数值 key/value

  return request({
    url: '/pss/gathering/getgatheringbyrepositoryid',
    method: 'post',
    data: params
  })
}

// 分期申请列表
export function getjudgeinfolist(query) {
  return request({
    url: '/pss/installmentorder/getjudgeinfolist',
    method: 'post',
    params: query
  })
}

// 分期申请订单搜索
export function applicationseach(query) {
  var params = new URLSearchParams()
  params.append('applicantname', query.applicantname) // 你要传给后台的参数值 key/value
  params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/installmentorder/getjudgeinfolist',
    method: 'post',
    data: params
  })
}

// 分期申请订单审核
export function installmentjudge(stat, employeeid, installmentjudgeid) {
  var params = new URLSearchParams()
  params.append('stat', stat) // 你要传给后台的参数值 key/value
  params.append('employeeid', employeeid) // 你要传给后台的参数值 key/value
  params.append('installmentjudgeid', installmentjudgeid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/installmentorder/installmentjudge',
    method: 'post',
    data: params
  })
}
