import request from '@/utils/request'

// 角色列表
export function repairList(query) {
  var params = new URLSearchParams()
  params.append('deptid', query.deptid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/role/getrolelist',
    method: 'post',
    data: params
  })
}

// 权限列表
export function getauthoritydetaillist(query) {
  return request({
    url: '/pss/role/getauthoritydetaillist',
    method: 'post',
    params: query
  })
}

// 添加角色
export function addrole(rolename, authority, description) {
  var params = new URLSearchParams()
  params.append('rolename', rolename) // 你要传给后台的参数值 key/value
  params.append('authority', authority) // 你要传给后台的参数值 key/value
  params.append('description', description) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/role/addrole',
    method: 'post',
    data: params
  })
}

// 修改角色
export function updaterole(roleid, authority) {
  var params = new URLSearchParams()
  params.append('roleid', roleid) // 你要传给后台的参数值 key/value
  params.append('authority', authority) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/role/updaterole',
    method: 'post',
    data: params
  })
}

// 删除角色
export function deleterole(roleid, query2) {
  var params = new URLSearchParams()
  params.append('roleid', roleid) // 你要传给后台的参数值 key/value
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/pss/role/deleterole',
    method: 'post',
    data: params
  })
}
