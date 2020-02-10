import request from '@/utils/request'

// 新增账户
export function addAccount(query) {
  var params = new URLSearchParams()
  if (query.accountNumber !== '' && query.accountNumber !== null && query.accountNumber !== undefined) {
    params.append('accountNumber', query.accountNumber) // 你要传给后台的参数值 key/value
  }
  if (query.bank !== '' && query.bank !== null && query.bank !== undefined) {
    params.append('bank', query.bank) // 你要传给后台的参数值 key/value
  }
  if (query.createId !== '' && query.createId !== null && query.createId !== undefined) {
    params.append('createId', query.createId) // 你要传给后台的参数值 key/value
  }
  if (query.isEffective !== '' && query.isEffective !== null && query.isEffective !== undefined) {
    params.append('isEffective', query.isEffective) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/accoountManagement/addAccount',
    method: 'post',
    data: params
  })
}

// 账户列表
export function searchAccount(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.accountNumber !== '' && query.accountNumber !== null && query.accountNumber !== undefined) {
    params.append('accountNumber', query.accountNumber) // 你要传给后台的参数值 key/value
  }
  if (query.isEffective !== '' && query.isEffective !== null && query.isEffective !== undefined) {
    params.append('isEffective', query.isEffective) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/accoountManagement/searchAccount',
    method: 'post',
    data: params
  })
}

// 账户删除
export function delateAccount(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('ids', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/accoountManagement/delateAccount',
    method: 'post',
    data: params
  })
}

// 账户修改
export function updateAccount(query) {
  var params = new URLSearchParams()
  if (query.accountNumber !== '' && query.accountNumber !== null && query.accountNumber !== undefined) {
    params.append('accountNumber', query.accountNumber) // 你要传给后台的参数值 key/value
  }
  if (query.bank !== '' && query.bank !== null && query.bank !== undefined) {
    params.append('bank', query.bank) // 你要传给后台的参数值 key/value
  }
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.isEffective !== '' && query.isEffective !== null && query.isEffective !== undefined) {
    params.append('isEffective', query.isEffective) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/accoountManagement/updateAccount',
    method: 'post',
    data: params
  })
}
