import request from '@/utils/request'

// 投诉列表
export function listcomplaints(username, phone, stat, pagenum, pagesize) {
  var params = new URLSearchParams()
  params.append('username', username) // 你要传给后台的参数值 key/value
  params.append('phone', phone) // 你要传给后台的参数值 key/value
  params.append('stat', stat) // 你要传给后台的参数值 key/value
  params.append('pagenum', pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/complaint/listcomplaints',
    method: 'post',
    data: params
  })
}

// 根据门点id获取员工
export function getremplist(repositoryid) {
  var params = new URLSearchParams()
  params.append('repositoryid', repositoryid) // 你要传给后台的参数值 key/value
  params.append('stat', 1) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/repository/getremplist',
    method: 'post',
    data: params
  })
}

// 根据区域id获取员工
export function getremplist2(regionid) {
  var params = new URLSearchParams()
  params.append('regionid2', regionid) // 你要传给后台的参数值 key/value
  params.append('stat', 1) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/repository/getremplist',
    method: 'post',
    data: params
  })
}

// 投诉订单分派给员工
export function complainttoemp(complaintid, handlerid) {
  var params = new URLSearchParams()
  params.append('complaintid', complaintid) // 你要传给后台的参数值 key/value
  params.append('handlerid', handlerid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/complaint/complainttoemp',
    method: 'post',
    data: params
  })
}

// 用户搜索
export function usersearch() {
  var params = new URLSearchParams()
  params.append('pagenum', 1) // 你要传给后台的参数值 key/value
  params.append('pagesize', 1000) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/user/usersearch',
    method: 'post',
    data: params
  })
}

// 创建投诉
export function createcomplaint(query) {
  var params = new URLSearchParams()
  params.append('userid', query.userid) // 你要传给后台的参数值 key/value
  params.append('subject', query.subject) // 你要传给后台的参数值 key/value
  params.append('content', query.content) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/complaint/createcomplaint',
    method: 'post',
    data: params
  })
}

// 投诉详情
export function complaintdetailemp(query) {
  var params = new URLSearchParams()
  params.append('complaintid', query.id) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/complaint/complaintdetailemp',
    method: 'post',
    data: params
  })
}

// 投诉详情
export function deletecomplaint(query) {
  var params = new URLSearchParams()
  params.append('complaintid', query.id) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/complaint/deletecomplaint',
    method: 'post',
    data: params
  })
}
