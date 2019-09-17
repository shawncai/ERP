import request from '@/utils/request'

export function addCheckSetMany(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('checkSetJson', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/checkset/addCheckSetMany',
    method: 'post',
    data: params
  })
}

// 分类属性列表
export function addCheckSet(query) {
  var params = new URLSearchParams()
  if (query.productCode !== '' && query.productCode !== null && query.productCode !== undefined) {
    params.append('productCode', query.productCode) // 你要传给后台的参数值 key/value
  }
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productName', query.productName) // 你要传给后台的参数值 key/value
  }
  if (query.itemId !== '' && query.itemId !== null && query.itemId !== undefined) {
    params.append('itemId', query.itemId) // 你要传给后台的参数值 key/value
  }
  if (query.checkTools !== '' && query.checkTools !== null && query.checkTools !== undefined) {
    params.append('checkTools', query.checkTools) // 你要传给后台的参数值 key/value
  }
  if (query.checkContent !== '' && query.checkContent !== null && query.checkContent !== undefined) {
    params.append('checkContent', query.checkContent) // 你要传给后台的参数值 key/value
  }
  if (query.createId !== '' && query.createId !== null && query.createId !== undefined) {
    params.append('createId', query.createId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/checkset/addCheckSet',
    method: 'post',
    data: params
  })
}

// 新增分类属性
export function searchCheckSet(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.productCode !== '' && query.productCode !== null && query.productCode !== undefined) {
    params.append('productCode', query.productCode) // 你要传给后台的参数值 key/value
  }
  if (query.itemId !== '' && query.itemId !== null && query.itemId !== undefined) {
    params.append('itemId', query.itemId) // 你要传给后台的参数值 key/value
  }
  if (query.createId !== '' && query.createId !== null && query.createId !== undefined) {
    params.append('createId', query.createId) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/checkset/searchCheckSet',
    method: 'post',
    data: params
  })
}

// 修改分类属性
export function updateCheckSet(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.itemId !== '' && query.itemId !== null) {
    params.append('itemId', query.itemId) // 你要传给后台的参数值 key/value
  }
  if (query.checkTools !== '' && query.checkTools !== null) {
    params.append('checkTools', query.checkTools) // 你要传给后台的参数值 key/value
  }
  if (query.checkContent !== '' && query.checkContent !== null) {
    params.append('checkContent', query.checkContent) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/checkset/updateCheckSet',
    method: 'post',
    data: params
  })
}

// 删除分类属性
export function delateCheckSet(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null) {
    params.append('ids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/checkset/delateCheckSet',
    method: 'post',
    data: params
  })
}
