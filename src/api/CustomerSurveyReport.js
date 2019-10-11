import request from '@/utils/request'

// 新建客户洽谈
export function addCustomerSurveyReport(query) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/customerSurveyReport/create',
    method: 'post',
    data: params
  })
}

// 洽谈列表
export function CustomerSurveyReportList(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.number !== '' && query.number !== null && query.number !== undefined) {
    params.append('number', query.number) // 你要传给后台的参数值 key/value
  }
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.sourceNumber !== '' && query.sourceNumber !== null && query.sourceNumber !== undefined) {
    params.append('sourceNumber', query.sourceNumber) // 你要传给后台的参数值 key/value
  }
  if (query.customerName !== '' && query.customerName !== null && query.customerName !== undefined) {
    params.append('customerName', query.customerName) // 你要传给后台的参数值 key/value
  }
  if (query.surveyPersonId !== '' && query.surveyPersonId !== null && query.surveyPersonId !== undefined) {
    params.append('surveyPersonId', query.surveyPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.receiptStat !== '' && query.receiptStat !== null && query.receiptStat !== undefined) {
    params.append('receiptStat', query.receiptStat) // 你要传给后台的参数值 key/value
  }
  if (query.judgeStat !== '' && query.judgeStat !== null && query.judgeStat !== undefined) {
    params.append('judgeStat', query.judgeStat) // 你要传给后台的参数值 key/value
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
    url: '/customerSurveyReport/search',
    method: 'post',
    data: params
  })
}
// 查询洽谈
export function CustomerSurveyReportList2(query) {
  var params = new URLSearchParams()
  params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  params.append('sourceNumber', query.applyNumber) // 你要传给后台的参数值 key/value
  // params.append('regionIds', '') // 你要传给后台的参数值 key/value
  params.append('repositoryId', 0) // 你要传给后台的参数值 key/value
  return request({
    url: '/customerSurveyReport/search',
    method: 'post',
    data: params
  })
}
// 修改客户洽谈
export function updateCustomerSurveyReport(query) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/customerSurveyReport/update',
    method: 'post',
    data: params
  })
}

//  删除客户洽谈
export function deleteCustomerChat(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('chatIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/customerchat/deleteCustomerChat',
    method: 'post',
    data: params
  })
}
