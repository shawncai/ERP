import request from '@/utils/request'

// 客户列表
export function userlist(query) {
  var params = new URLSearchParams()
  params.append('phone', query.phone) // 你要传给后台的参数值 key/value
  params.append('userName', query.userName) // 你要传给后台的参数值 key/value
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/user/usersearch',
    method: 'post',
    data: params
  })
}

// 客户详情
export function userdetailbyid(query) {
  var params = new URLSearchParams()
  params.append('userid', query.id) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/user/userdetailbyid',
    method: 'post',
    data: params
  })
}

// 加入黑名单
export function addblacklist(employeeid, userid, description) {
  var params = new URLSearchParams()
  params.append('employeeid', employeeid) // 你要传给后台的参数值 key/value
  params.append('userid', userid) // 你要传给后台的参数值 key/value
  params.append('description', description) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/blacklist/add',
    method: 'post',
    data: params
  })
}

// 推广统计列表
export function getuserextension(query) {
  return request({
    url: '/pss/repository/getuserextension',
    method: 'post',
    params: query
  })
}

// 推广统计列表搜索
export function seachuserextension(repositoryname, date) {
  var params = new URLSearchParams()
  params.append('repositoryname', repositoryname) // 你要传给后台的参数值 key/value
  params.append('date', date) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/repository/getuserextension',
    method: 'post',
    data: params
  })
}
