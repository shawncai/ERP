import request from '@/utils/request'

// 删除编码规则
export function addinitialenter(query, detail, repositoryId, regionId) {
  var params = new URLSearchParams()
  params.append('initialEnterJson', query) // 你要传给后台的参数值 key/value
  params.append('initialEnterDetailJson', detail) // 你要传给后台的参数值 key/value
  params.append('repositoryId', repositoryId) // 你要传给后台的参数值 key/value
  params.append('regionId', regionId) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/initialenter/addinitialenter',
    method: 'post',
    data: params
  })
}

// 添加货位
export function addlocation(query) {
  var params = new URLSearchParams()
  params.append('locationJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/location/addlocation',
    method: 'post',
    data: params
  })
}

// 货位列表
export function locationlist(query) {
  var params = new URLSearchParams()
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.locationCode !== '' && query.locationCode !== null && query.locationCode !== undefined) {
    params.append('locationCode', query.locationCode) // 你要传给后台的参数值 key/value
  }
  if (query.locationName !== '' && query.locationName !== null && query.locationName !== undefined) {
    params.append('locationName', query.locationName) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/location/locationlist',
    method: 'post',
    data: params
  })
}

// 删除货位
export function deletelocation(query) {
  var params = new URLSearchParams()
  params.append('locationIds', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/location/deletelocation',
    method: 'post',
    data: params
  })
}

// 期初库存列表
export function enterlist(query) {
  var params = new URLSearchParams()
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.sourceNumber !== '' && query.sourceNumber !== null && query.sourceNumber !== undefined) {
    params.append('sourceNumber', query.sourceNumber) // 你要传给后台的参数值 key/value
  }
  if (query.enterNumber !== '' && query.enterNumber !== null && query.enterNumber !== undefined) {
    params.append('enterNumber', query.enterNumber) // 你要传给后台的参数值 key/value
  }
  if (query.enterPersonId !== '' && query.enterPersonId !== null && query.enterPersonId !== undefined) {
    params.append('enterPersonId', query.enterPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.enterDeptId !== '' && query.enterDeptId !== null && query.enterDeptId !== undefined) {
    params.append('enterDeptId', query.enterDeptId) // 你要传给后台的参数值 key/value
  }
  if (query.enterRepositoryId !== '' && query.enterRepositoryId !== null && query.enterRepositoryId !== undefined) {
    params.append('enterRepositoryId', query.enterRepositoryId) // 你要传给后台的参数值 key/value
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
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/initialenter/enterlist',
    method: 'post',
    data: params
  })
}

// 删除期初录入单
export function deleteenter(query) {
  var params = new URLSearchParams()
  params.append('enterIds', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/initialenter/deleteenter',
    method: 'post',
    data: params
  })
}

// 修改期初库存单
export function updateenter(query, query2) {
  var params = new URLSearchParams()
  params.append('initialEnterJson', query) // 你要传给后台的参数值 key/value
  params.append('initialEnterDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/initialenter/updateenter',
    method: 'post',
    data: params
  })
}

// 修改货位
export function updatelocation(query) {
  var params = new URLSearchParams()
  params.append('locationJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/location/updatelocation',
    method: 'post',
    data: params
  })
}

// 添加库存预警
export function createstockalarm(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/stockAlarm/create',
    method: 'post',
    data: params
  })
}
