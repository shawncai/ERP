import request from '@/utils/request'

// 新建日常调整单
export function createdailyAdjust(query, query2, query3) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  }
  if (query3.repositoryId2 !== '' && query3.repositoryId2 !== null && query3.repositoryId2 !== undefined) {
    params.append('repositoryId', query3.repositoryId2) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  if (query3.createPersonId !== '' && query3.createPersonId !== null && query3.createPersonId !== undefined) {
    params.append('createPersonId', query3.createPersonId) // 你要传给后台的参数值 key/value
  }
  if (query3.countryId !== '' && query3.countryId !== null && query3.countryId !== undefined) {
    params.append('countryId', query3.countryId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/dailyAdjust/create',
    method: 'post',
    data: params
  })
}

// 日常调整单列表
export function dailyAdjustlist(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.number !== '' && query.number !== null && query.number !== undefined) {
    params.append('number', query.number) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.deptId !== '' && query.deptId !== null && query.deptId !== undefined) {
    params.append('deptId', query.deptId) // 你要传给后台的参数值 key/value
  }
  if (query.personId !== '' && query.personId !== null && query.personId !== undefined) {
    params.append('personId', query.personId) // 你要传给后台的参数值 key/value
  }
  if (query.adjustRepositoryId !== '' && query.adjustRepositoryId !== null && query.adjustRepositoryId !== undefined) {
    params.append('adjustRepositoryId', query.adjustRepositoryId) // 你要传给后台的参数值 key/value
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
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/dailyAdjust/search',
    method: 'post',
    data: params
  })
}

// 更新日常调整单列表
export function updatedailyAdjust(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/dailyAdjust/update',
    method: 'post',
    data: params
  })
}

// 删除日常调整单
export function deletedailyAdjust(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/dailyAdjust/delete',
    method: 'post',
    data: params
  })
}

// 审核日常调整单列表
export function updatedailyAdjust2(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/dailyAdjust/update',
    method: 'post',
    data: params
  })
}
