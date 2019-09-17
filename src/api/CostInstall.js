import request from '@/utils/request'

//   添加采购退货
export function addCostInstall(query) {
  var params = new URLSearchParams()
  if (query.costCode !== '' && query.costCode !== null && query.costCode !== undefined) {
    params.append('costCode', query.costCode) // 你要传给后台的参数值 key/value
  }
  if (query.costCategory !== '' && query.costCategory !== null && query.costCategory !== undefined) {
    params.append('costCategory', query.costCategory) // 你要传给后台的参数值 key/value
  }
  if (query.costName !== '' && query.costName !== null && query.costName !== undefined) {
    params.append('costName', query.costName) // 你要传给后台的参数值 key/value
  }
  if (query.subjectId !== '' && query.subjectId !== null && query.subjectId !== undefined) {
    params.append('subjectId', query.subjectId) // 你要传给后台的参数值 key/value
  }
  if (query.isEffective !== '' && query.isEffective !== null && query.isEffective !== undefined) {
    params.append('iseffective', query.isEffective) // 你要传给后台的参数值 key/value
  }
  if (query.createId !== '' && query.createId !== null && query.createId !== undefined) {
    params.append('createId', query.createId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/costInstall/addCostInstall',
    method: 'post',
    data: params
  })
}

// 查询采购退货
export function searchCostInstall(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.costCode !== '' && query.costCode !== null && query.costCode !== undefined) {
    params.append('costCode', query.costCode) // 你要传给后台的参数值 key/value
  }
  if (query.costName !== '' && query.costName !== null && query.costName !== undefined) {
    params.append('costName', query.costName) // 你要传给后台的参数值 key/value
  }
  if (query.costCategory !== '' && query.costCategory !== null && query.costCategory !== undefined) {
    params.append('costCategory', query.costCategory) // 你要传给后台的参数值 key/value
  }
  if (query.isEffective !== '' && query.isEffective !== null && query.isEffective !== undefined) {
    params.append('isEffective', query.isEffective) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/costInstall/searchCostInstall',
    method: 'post',
    data: params
  })
}

// 删除采购退货
export function delateCostInstall(query, query2) {
  var params = new URLSearchParams()
  params.append('ids', query) // 你要传给后台的参数值 key/value
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/costInstall/delateCostInstall',
    method: 'post',
    data: params
  })
}

//  修改采购退货
export function updateCostInstall(query, query2) {
  var params = new URLSearchParams()
  if (query.costCode !== '' && query.costCode !== null && query.costCode !== undefined) {
    params.append('costCode', query.costCode) // 你要传给后台的参数值 key/value
  }
  if (query.costCategory !== '' && query.costCategory !== null && query.costCategory !== undefined) {
    params.append('costCategory', query.costCategory) // 你要传给后台的参数值 key/value
  }
  if (query.costName !== '' && query.costName !== null && query.costName !== undefined) {
    params.append('costName', query.costName) // 你要传给后台的参数值 key/value
  }
  if (query.subjectId !== '' && query.subjectId !== null && query.subjectId !== undefined) {
    params.append('subjectId', query.subjectId) // 你要传给后台的参数值 key/value
  }
  if (query.isEffective !== '' && query.isEffective !== null && query.isEffective !== undefined) {
    params.append('iseffective', query.isEffective) // 你要传给后台的参数值 key/value
  }
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/costInstall/updateCostInstall',
    method: 'post',
    data: params
  })
}

