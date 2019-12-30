import request from '@/utils/request'

// 添加销售合同
export function addMemory(query) {
  var params = new URLSearchParams()
  if (query.employeeId !== '' && query.employeeId !== null && query.employeeId !== undefined) {
    params.append('employeeId', query.employeeId) // 你要传给后台的参数值 key/value
  }
  if (query.actionTime !== '' && query.actionTime !== null && query.actionTime !== undefined) {
    params.append('actionTime', query.actionTime) // 你要传给后台的参数值 key/value
  }
  if (query.content !== '' && query.content !== null && query.content !== undefined) {
    params.append('content', query.content) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/memoryBook/addMemory',
    method: 'post',
    data: params
  })
}

// 查询销售合同
export function memoryList(query) {
  var params = new URLSearchParams()
  if (query.stat !== '' && query.stat !== null && query.stat !== undefined) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  if (query.employeeId !== '' && query.employeeId !== null && query.employeeId !== undefined) {
    params.append('employeeId', query.employeeId) // 你要传给后台的参数值 key/value
  }
  if (query.actionTime !== '' && query.actionTime !== null && query.actionTime !== undefined) {
    params.append('actionTime', query.actionTime) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/memoryBook/memoryList',
    method: 'post',
    data: params
  })
}

//  修改销售合同
export function updateMemory(query) {
  var params = new URLSearchParams()
  if (query.memoryId !== '' && query.memoryId !== null && query.memoryId !== undefined) {
    params.append('memoryId', query.memoryId) // 你要传给后台的参数值 key/value
  }
  if (query.actionTime !== '' && query.actionTime !== null && query.actionTime !== undefined) {
    params.append('actionTime', query.actionTime) // 你要传给后台的参数值 key/value
  }
  if (query.content !== '' && query.content !== null && query.content !== undefined) {
    params.append('content', query.content) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/memoryBook/updateMemory',
    method: 'post',
    data: params
  })
}

//  归还维修零部件
export function deleteMemory(query) {
  var params = new URLSearchParams()
  params.append('memoryIds', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/memoryBook/deleteMemory',
    method: 'post',
    data: params
  })
}

