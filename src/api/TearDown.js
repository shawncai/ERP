import request from '@/utils/request'

// 新建拆装单
export function addteardown(query, query2, query3, query4) {
  var params = new URLSearchParams()
  params.append('teardownJson', query) // 你要传给后台的参数值 key/value
  params.append('teardownBeforeDetailJson', query2) // 你要传给后台的参数值 key/value
  params.append('teardownAfterDetailJson', query3) // 你要传给后台的参数值 key/value
  if (query4.repositoryId !== '' && query4.repositoryId !== null && query4.repositoryId !== undefined) {
    params.append('repositoryId', query4.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query4.regionId !== '' && query4.regionId !== null && query4.regionId !== undefined) {
    params.append('regionId', query4.regionId) // 你要传给后台的参数值 key/value
  }
  if (query4.type !== '' && query4.type !== null && query4.type !== undefined) {
    params.append('type', query4.type) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/teardown/addteardown',
    method: 'post',
    data: params
  })
}

// 拆装单列表
export function teardownlist(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.teardownNumber !== '' && query.teardownNumber !== null && query.teardownNumber !== undefined) {
    params.append('teardownNumber', query.teardownNumber) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.teardownDeptId !== '' && query.teardownDeptId !== null && query.teardownDeptId !== undefined) {
    params.append('teardownDeptId', query.teardownDeptId) // 你要传给后台的参数值 key/value
  }
  if (query.teardownRepositoryId !== '' && query.teardownRepositoryId !== null && query.teardownRepositoryId !== undefined) {
    params.append('teardownRepositoryId', query.teardownRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.receiptStat !== '' && query.receiptStat !== null && query.receiptStat !== undefined) {
    params.append('receiptStat', query.receiptStat) // 你要传给后台的参数值 key/value
  }
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId', query.createPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/teardown/teardownlist',
    method: 'post',
    data: params
  })
}

// 删除拆装单
export function deleteteardown(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('teardownIds', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/teardown/deleteteardown',
    method: 'post',
    data: params
  })
}

// 更新拆装单
export function updateteardown(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('teardownJson', query) // 你要传给后台的参数值 key/value
  params.append('teardownBeforeDetailJson', query2) // 你要传给后台的参数值 key/value
  params.append('teardownAfterDetailJson', query3) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/teardown/updateteardown',
    method: 'post',
    data: params
  })
}
