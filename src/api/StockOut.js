import request from '@/utils/request'

// 查询出库单
export function searchOutlist(query) {
  var params = new URLSearchParams()
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.sourceType !== '' && query.sourceType !== null && query.sourceType !== undefined) {
    params.append('sourceType', query.sourceType) // 你要传给后台的参数值 key/value
  }
  if (query.outPersonId !== '' && query.outPersonId !== null && query.outPersonId !== undefined) {
    params.append('outPersonId', query.outPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.begintime !== '' && query.begintime !== null && query.begintime !== undefined) {
    params.append('begintime', query.begintime) // 你要传给后台的参数值 key/value
  }
  if (query.endtime !== '' && query.endtime !== null && query.endtime !== undefined) {
    params.append('endtime', query.endtime) // 你要传给后台的参数值 key/value
  }
  if (query.outReasonId !== '' && query.outReasonId !== null && query.outReasonId !== undefined) {
    params.append('outReasonId', query.outReasonId) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '' && query.stat !== null && query.stat !== undefined) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/otherout/search',
    method: 'post',
    data: params
  })
}

// 删除出库单
export function deleteStock(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/otherout/delete',
    method: 'post',
    data: params
  })
}

// 添加出库单
export function createotherout(query, query2) {
  var params = new URLSearchParams()
  params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.sourceNumber !== '' && query.sourceNumber !== null && query.sourceNumber !== undefined) {
    params.append('sourceNumber', query.sourceNumber) // 你要传给后台的参数值 key/value
  }
  if (query.sourceType !== '' && query.sourceType !== null && query.sourceType !== undefined) {
    params.append('sourceType', query.sourceType) // 你要传给后台的参数值 key/value
  }
  if (query.companyId !== '' && query.companyId !== null && query.companyId !== undefined) {
    params.append('companyId', query.companyId) // 你要传给后台的参数值 key/value
  }
  if (query.companyTypeId !== '' && query.companyTypeId !== null && query.companyTypeId !== undefined) {
    params.append('companyTypeId', query.companyTypeId) // 你要传给后台的参数值 key/value
  }
  if (query.sendAddress !== '' && query.sendAddress !== null && query.sendAddress !== undefined) {
    params.append('sendAddress', query.sendAddress) // 你要传给后台的参数值 key/value
  }
  if (query.receiverAddress !== '' && query.receiverAddress !== null && query.receiverAddress !== undefined) {
    params.append('receiverAddress', query.receiverAddress) // 你要传给后台的参数值 key/value
  }
  if (query.outDeptId !== '' && query.outDeptId !== null && query.outDeptId !== undefined) {
    params.append('outDeptId', query.outDeptId) // 你要传给后台的参数值 key/value
  }
  if (query.outPersonId !== '' && query.outPersonId !== null && query.outPersonId !== undefined) {
    params.append('outPersonId', query.outPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.outDate !== '' && query.outDate !== null && query.outDate !== undefined) {
    params.append('outDate', query.outDate) // 你要传给后台的参数值 key/value
  }
  if (query.outReasonId !== '' && query.outReasonId !== null && query.outReasonId !== undefined) {
    params.append('outReasonId', query.outReasonId) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryTypeId !== '' && query.repositoryTypeId !== null && query.repositoryTypeId !== undefined) {
    params.append('repositoryTypeId', query.repositoryTypeId) // 你要传给后台的参数值 key/value
  }
  if (query.outRepositoryId !== '' && query.outRepositoryId !== null && query.outRepositoryId !== undefined) {
    params.append('outRepositoryId', query.outRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId', query.createPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.countryId !== '' && query.countryId !== null && query.countryId !== undefined) {
    params.append('countryId', query.countryId) // 你要传给后台的参数值 key/value
  }
  if (query.summary !== '' && query.summary !== null && query.summary !== undefined) {
    params.append('summary', query.summary) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionId !== '' && query.regionId !== null && query.regionId !== undefined) {
    params.append('regionId', query.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/otherout/create',
    method: 'post',
    data: params
  })
}

// 修改出库单
export function updateotherout(query, query2) {
  var params = new URLSearchParams()
  params.append('otherOutJson', query) // 你要传给后台的参数值 key/value
  params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/otherout/update',
    method: 'post',
    data: params
  })
}

// 审核出库单操作
export function updateotherenter2(query) {
  var params = new URLSearchParams()
  params.append('otherOutJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/otherout/update',
    method: 'post',
    data: params
  })
}
