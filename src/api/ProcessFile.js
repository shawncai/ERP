import request from '@/utils/request'

// 添加工作中心
export function createworkCenter(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/workCenter/create',
    method: 'post',
    data: params
  })
}

// 工作中心列表
export function searchworkCenter(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.workCenterName !== '' && query.workCenterName !== null && query.workCenterName !== undefined) {
    params.append('workCenterName', query.workCenterName) // 你要传给后台的参数值 key/value
  }
  if (query.isKey !== '' && query.isKey !== null && query.isKey !== undefined) {
    params.append('isKey', query.isKey) // 你要传给后台的参数值 key/value
  }
  if (query.deptId !== '' && query.deptId !== null && query.deptId !== undefined) {
    params.append('deptId', query.deptId) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '' && query.stat !== null && query.stat !== undefined) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/workCenter/search',
    method: 'post',
    data: params
  })
}

// 修改工作中心
export function updateworkCenter(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/workCenter/update',
    method: 'post',
    data: params
  })
}

// 删除工作中心
export function deleteworkCenter(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/workCenter/delete',
    method: 'post',
    data: params
  })
}

// 添加工艺档案
export function createprocessFile(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/processFile/create',
    method: 'post',
    data: params
  })
}

// 查询工艺档案
export function searchprocessFile(query) {
  var params = new URLSearchParams()
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.processName !== '' && query.processName !== null && query.processName !== undefined) {
    params.append('processName', query.processName) // 你要传给后台的参数值 key/value
  }
  if (query.shortName !== '' && query.shortName !== null && query.shortName !== undefined) {
    params.append('shortName', query.shortName) // 你要传给后台的参数值 key/value
  }
  if (query.description !== '' && query.description !== null && query.description !== undefined) {
    params.append('description', query.description) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '' && query.stat !== null && query.stat !== undefined) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/processFile/search',
    method: 'post',
    data: params
  })
}

// 修改工艺档案
export function updateprocessFile(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/processFile/update',
    method: 'post',
    data: params
  })
}

// 添加标准工序
export function createstandardProcess(query, query2) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/standardProcess/create',
    method: 'post',
    data: params
  })
}

// 查询标准工序
export function searchprocess(query) {
  var params = new URLSearchParams()
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.shortName !== '' && query.shortName !== null && query.shortName !== undefined) {
    params.append('shortName', query.shortName) // 你要传给后台的参数值 key/value
  }
  if (query.workCenterId !== '' && query.workCenterId !== null && query.workCenterId !== undefined) {
    params.append('workCenterId', query.workCenterId) // 你要传给后台的参数值 key/value
  }
  if (query.testMethod !== '' && query.testMethod !== null && query.testMethod !== undefined) {
    params.append('testMethod', query.testMethod) // 你要传给后台的参数值 key/value
  }
  if (query.isCost !== '' && query.isCost !== null && query.isCost !== undefined) {
    params.append('isCost', query.isCost) // 你要传给后台的参数值 key/value
  }
  if (query.isHelp !== '' && query.isHelp !== null && query.isHelp !== undefined) {
    params.append('isHelp', query.isHelp) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '' && query.stat !== null && query.stat !== undefined) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/standardProcess/search',
    method: 'post',
    data: params
  })
}

// 删除标准工序
export function deletestandardProcess(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/standardProcess/delete',
    method: 'post',
    data: params
  })
}

// 修改标准工序
export function updatestandardProcess(query, query2) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/standardProcess/update',
    method: 'post',
    data: params
  })
}
