import request from '@/utils/request'

// 新建调价单
export function addadjustprice(query, query2, query3) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('repoAdjustPriceJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('repoAdjustPriceDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
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
    url: '/erp/repoadjustprice/addadjustprice',
    method: 'post',
    data: params
  })
}

// 调价单列表
export function adjustlist(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.adjustNumber !== '' && query.adjustNumber !== null && query.adjustNumber !== undefined) {
    params.append('adjustNumber', query.adjustNumber) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.adjustDeptId !== '' && query.adjustDeptId !== null && query.adjustDeptId !== undefined) {
    params.append('adjustDeptId', query.adjustDeptId) // 你要传给后台的参数值 key/value
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
    url: '/erp/repoadjustprice/adjustlist',
    method: 'post',
    data: params
  })
}

// 删除调价单
export function deleteadjustprice(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('adjustIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/repoadjustprice/deleteadjustprice',
    method: 'post',
    data: params
  })
}

// 更新调价单
export function updatrepoadjustprice(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('repoAdjustPriceJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('repoAdjustPriceDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/repoadjustprice/updatrepoadjustprice',
    method: 'post',
    data: params
  })
}

// 审核调价单
export function updatrepoadjustprice2(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('repoAdjustPriceJson', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/repoadjustprice/updatrepoadjustprice',
    method: 'post',
    data: params
  })
}
