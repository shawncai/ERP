import request from '@/utils/request'

// 新建销售机会
export function addsaleopportunity(query, query2) {
  var params = new URLSearchParams()
  params.append('saleOpportunityJson', query) // 你要传给后台的参数值 key/value
  params.append('saleOpportunityDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/saleopportunity/addsaleopportunity',
    method: 'post',
    data: params
  })
}

// 销售机会列表
export function saleopportunitylist(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.opportunityNumber !== '' && query.opportunityNumber !== null && query.opportunityNumber !== undefined) {
    params.append('opportunityNumber', query.opportunityNumber) // 你要传给后台的参数值 key/value
  }
  if (query.opportunityType !== '' && query.opportunityType !== null && query.opportunityType !== undefined) {
    params.append('opportunityType', query.opportunityType) // 你要传给后台的参数值 key/value
  }
  if (query.opportunitySource !== '' && query.opportunitySource !== null && query.opportunitySource !== undefined) {
    params.append('opportunitySource', query.opportunitySource) // 你要传给后台的参数值 key/value
  }
  if (query.customerType !== '' && query.customerType !== null && query.customerType !== undefined) {
    params.append('customerType', query.customerType) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId', query.createPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  if (query.isUse !== '' && query.isUse !== null && query.isUse !== undefined) {
    params.append('isUse', query.isUse) // 你要传给后台的参数值 key/value
  }
  if (query.isActive !== '' && query.isActive !== null && query.isActive !== undefined) {
    params.append('isActive', query.isActive) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/saleopportunity/saleopportunitylist',
    method: 'post',
    data: params
  })
}

// 修改销售机会
export function updatesaleopportunity(query, query2) {
  var params = new URLSearchParams()
  params.append('saleOpportunityJson', query) // 你要传给后台的参数值 key/value
  params.append('saleOpportunityDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/saleopportunity/updatesaleopportunity',
    method: 'post',
    data: params
  })
}

// 删除销售机会
export function deletesaleopportunity(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('opportunityIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/saleopportunity/deletesaleopportunity',
    method: 'post',
    data: params
  })
}
