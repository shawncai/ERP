import request from '@/utils/request'

// 添加销售订单
export function creatUnitGroup(query, query2) {
  var params = new URLSearchParams()
  params.append('unitGroupJson', query) // 你要传给后台的参数值 key/value
  params.append('unitGroupDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/unitGroup/addUnitGroup',
    method: 'post',
    data: params
  })
}

// 销售订单列表
export function searchUnitGroup(query) {
  var params = new URLSearchParams()
  if (query.groupId !== '' && query.groupId !== null && query.groupId !== undefined) {
    params.append('groupId', query.groupId) // 你要传给后台的参数值 key/value
  }
  if (query.number !== '' && query.number !== null && query.number !== undefined) {
    params.append('number', query.number) // 你要传给后台的参数值 key/value
  }
  if (query.groupName !== '' && query.groupName !== null && query.groupName !== undefined) {
    params.append('groupName', query.groupName) // 你要传给后台的参数值 key/value
  }
  if (query.basicUnitId !== '' && query.basicUnitId !== null && query.basicUnitId !== undefined) {
    params.append('basicUnitId', query.basicUnitId) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/unitGroup/unitGroupList',
    method: 'post',
    data: params
  })
}

// 修改销售订单
export function updateUnitGroup(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('unitGroupJson', query) // 你要传给后台的参数值 key/value
  params.append('unitGroupDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/unitGroup/updateUnitGroup',
    method: 'post',
    data: params
  })
}

// 删除销售订单
export function deleteUnitGroup(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('groupIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/unitGroup/deleteUnitGroup',
    method: 'post',
    data: params
  })
}
