import request from '@/utils/request'

// 角色列表
export function repairList() {
  return request({
    url: '/role/getrolelist',
    method: 'post'
  })
}

// 角色列表
export function getauthoritydetaillist() {
  return request({
    url: '/role/getauthoritydetaillist',
    method: 'post'
  })
}

// 添加角色
export function addrole(query) {
  var params = new URLSearchParams()
  if (query.rolename !== '' && query.rolename !== null && query.rolename !== undefined) {
    params.append('rolename', query.rolename) // 你要传给后台的参数值 key/value
  }
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId', query.createPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.isConfirm !== '' && query.isConfirm !== null && query.isConfirm !== undefined) {
    params.append('isConfirm', query.isConfirm) // 你要传给后台的参数值 key/value
  }

  return request({
    url: '/role/addrole',
    method: 'post',
    data: params
  })
}

// 修改角色权限
export function updaterole(roleid, authority, roleName, isConfirm) {
  var params = new URLSearchParams()
  params.append('roleid', roleid) // 你要传给后台的参数值 key/value
  params.append('roleName', roleName) // 你要传给后台的参数值 key/value
  params.append('authority', authority) // 你要传给后台的参数值 key/value
  params.append('isConfirm', isConfirm) // 你要传给后台的参数值 key/value
  return request({
    url: '/role/updaterole',
    method: 'post',
    data: params
  })
}
