import request from '@/utils/request'

// 新建客户洽谈
export function addCustomerChat(query) {
  var params = new URLSearchParams()
  params.append('customerChatJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/customerchat/addCustomerChat',
    method: 'post',
    data: params
  })
}

// 洽谈列表
export function chatList(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.phase !== '' && query.phase !== null && query.phase !== undefined) {
    params.append('phase', query.phase) // 你要传给后台的参数值 key/value
  }
  if (query.buyIntention !== '' && query.buyIntention !== null && query.buyIntention !== undefined) {
    params.append('buyIntention', query.buyIntention) // 你要传给后台的参数值 key/value
  }
  if (query.chatNumber !== '' && query.chatNumber !== null && query.chatNumber !== undefined) {
    params.append('chatNumber', query.chatNumber) // 你要传给后台的参数值 key/value
  }
  if (query.opportunityNumber !== '' && query.opportunityNumber !== null && query.opportunityNumber !== undefined) {
    params.append('opportunityNumber', query.opportunityNumber) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.customerName !== '' && query.customerName !== null && query.customerName !== undefined) {
    params.append('customerName', query.customerName) // 你要传给后台的参数值 key/value
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
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/customerchat/chatList',
    method: 'post',
    data: params
  })
}

// 修改客户洽谈
export function updateCustomerChat(query) {
  var params = new URLSearchParams()
  params.append('customerChatJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/customerchat/updateCustomerChat',
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

// 新建客户回访
export function addCustomerVisit(query) {
  var params = new URLSearchParams()
  params.append('customerVisitJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/customervisit/addCustomerVisit',
    method: 'post',
    data: params
  })
}

// 客户回访列表
export function visitList(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.visitNumber !== '' && query.visitNumber !== null && query.visitNumber !== undefined) {
    params.append('visitNumber', query.visitNumber) // 你要传给后台的参数值 key/value
  }
  if (query.visitMode !== '' && query.visitMode !== null && query.visitMode !== undefined) {
    params.append('visitMode', query.visitMode) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.customerName !== '' && query.customerName !== null && query.customerName !== undefined) {
    params.append('customerName', query.customerName) // 你要传给后台的参数值 key/value
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
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/customervisit/visitList',
    method: 'post',
    data: params
  })
}

// 修改客户回访
export function updateCustomerVisit(query) {
  var params = new URLSearchParams()
  params.append('customerVisitJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/customervisit/updateCustomerVisit',
    method: 'post',
    data: params
  })
}

//  删除客户回访
export function deleteCustomerVisit(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('visitIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/customervisit/deleteCustomerVisit',
    method: 'post',
    data: params
  })
}
