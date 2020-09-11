import request from '@/utils/request'

// 新建组合商品
export function addPackage(query, query2) {
  var params = new URLSearchParams()
  params.append('packageMainJson', query) // 你要传给后台的参数值 key/value
  params.append('packageSubJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/package/addPackage',
    method: 'post',
    data: params
  })
}

//  组合商品列表
export function packageList(query) {
  var params = new URLSearchParams()
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productName', query.productName) // 你要传给后台的参数值 key/value
  }
  if (query.productCode !== '' && query.productCode !== null && query.productCode !== undefined) {
    params.append('productCode', query.productCode) // 你要传给后台的参数值 key/value
  }
  if (query.typeId !== '' && query.typeId !== null && query.typeId !== undefined) {
    params.append('typeId', query.typeId) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/package/packageList',
    method: 'post',
    data: params
  })
}

export function getPackage(query) {
  var params = new URLSearchParams()
  if (query.productCode !== '' && query.productCode !== null && query.productCode !== undefined) {
    params.append('productCode', query.productCode) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/package/getPackage',
    method: 'post',
    data: params
  })
}

// 修改组合商品
export function updatePackage(query, query2) {
  var params = new URLSearchParams()
  params.append('packageMainJson', query) // 你要传给后台的参数值 key/value
  params.append('packageSubJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/package/updatePackage',
    method: 'post',
    data: params
  })
}

// 删除组合商品
export function deletePackage(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('mainIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/package/deletePackage',
    method: 'post',
    data: params
  })
}

//  判断是否是特殊分期
export function getEachMoney(query) {
  var params = new URLSearchParams()
  if (query.count !== '' && query.count !== null && query.count !== undefined) {
    params.append('count', query.count) // 你要传给后台的参数值 key/value
  }
  if (query.typeId !== '' && query.typeId !== null && query.typeId !== undefined) {
    params.append('typeId', query.typeId) // 你要传给后台的参数值 key/value
  }
  if (query.first !== '' && query.first !== null && query.first !== undefined) {
    params.append('first', query.first) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/special/getEachMoney',
    method: 'post',
    data: params
  })
}
