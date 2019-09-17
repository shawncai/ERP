import request from '@/utils/request'

// 区域列表
export function newdetailList(query) {
  return request({
    url: '/region/newdetailList',
    method: 'post',
    params: query
  })
}

// 增加区域
export function createarea(query) {
  var params = new URLSearchParams()
  params.append('name', query.name) // 你要传给后台的参数值 key/value
  params.append('levle', query.levle) // 你要传给后台的参数值 key/value
  params.append('parentid', query.parentid) // 你要传给后台的参数值 key/value
  params.append('firstlevelid', query.firstlevelid) // 你要传给后台的参数值 key/value
  params.append('createid', query.createid) // 你要传给后台的参数值 key/value
  return request({
    url: '/region/create',
    method: 'post',
    data: params
  })
}

// 查询所有一级区域
export function listbyparentid(query) {
  return request({
    url: '/region/listbyparentid',
    method: 'post',
    params: query
  })
}

// 经理选择人
export function regionmanagercandidate(regionid) {
  var params = new URLSearchParams()
  params.append('regionid', regionid) // 你要传给后台的参数值 key/value
  return request({
    url: '/region/regionmanagercandidate',
    method: 'post',
    data: params
  })
}

// 增加二级区域
export function createarea2(name, levle, parentid, createid, regionmanagerid) {
  var params = new URLSearchParams()
  params.append('name', name) // 你要传给后台的参数值 key/value
  params.append('levle', levle) // 你要传给后台的参数值 key/value
  params.append('parentid', parentid) // 你要传给后台的参数值 key/value
  params.append('createid', createid) // 你要传给后台的参数值 key/value
  params.append('regionmanagerid', regionmanagerid) // 你要传给后台的参数值 key/value
  return request({
    url: '/region/create',
    method: 'post',
    data: params
  })
}

// 删除区域
export function deleteregion(regionid, query2) {
  var params = new URLSearchParams()
  params.append('regionid', regionid) // 你要传给后台的参数值 key/value
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/region/deleteregion',
    method: 'post',
    data: params
  })
}

// 根据级别查询上一级区域
export function getregionbylevel(level) {
  var params = new URLSearchParams()
  params.append('level', level) // 你要传给后台的参数值 key/value
  return request({
    url: '/region/getregionbylevel',
    method: 'post',
    data: params
  })
}

// 修改区域
export function updateregion(regionid, name, regionmanagerid, parentid) {
  var params = new URLSearchParams()
  params.append('regionid', regionid) // 你要传给后台的参数值 key/value
  params.append('name', name) // 你要传给后台的参数值 key/value
  params.append('regionmanagerid', regionmanagerid) // 你要传给后台的参数值 key/value
  params.append('parentid', parentid) // 你要传给后台的参数值 key/value
  return request({
    url: '/region/updateregion',
    method: 'post',
    data: params
  })
}
