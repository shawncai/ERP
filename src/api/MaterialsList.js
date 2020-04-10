import request from '@/utils/request'

// 添加物料清单
export function getMaterialsByApply(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('productCode', query) // 你要传给后台的参数值 key/value
  if (query2.length !== 2 && query2 !== null && query2 !== undefined) {
    params.append('repositoryId', query2) // 你要传给后台的参数值 key/value
  }
  if (query3 !== '' && query3 !== null && query3 !== undefined) {
    params.append('requireQuantity', query3) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/requireplan/getMaterialsByApply',
    method: 'post',
    data: params
  })
}

// 添加物料清单
export function addmaterials(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('materialsListJson', query) // 你要传给后台的参数值 key/value
  if (query2.length !== 2 && query2 !== null && query2 !== undefined) {
    params.append('materialsListDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/materialslist/addmaterials',
    method: 'post',
    data: params
  })
}

// 物料清单列表
export function materialslist(query) {
  var params = new URLSearchParams()
  if (query.materialsId !== '' && query.materialsId !== null && query.materialsId !== undefined) {
    params.append('materialsId', query.materialsId) // 你要传给后台的参数值 key/value
  }
  if (query.bomNumber !== '' && query.bomNumber !== null && query.bomNumber !== undefined) {
    params.append('bomNumber', query.bomNumber) // 你要传给后台的参数值 key/value
  }
  if (query.bomTypeId !== '' && query.bomTypeId !== null && query.bomTypeId !== undefined) {
    params.append('bomTypeId', query.bomTypeId) // 你要传给后台的参数值 key/value
  }
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productName', query.productName) // 你要传给后台的参数值 key/value
  }
  if (query.judgeStat !== '' && query.judgeStat !== null && query.judgeStat !== undefined) {
    params.append('judgeStat', query.judgeStat) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/materialslist/materialslist',
    method: 'post',
    data: params
  })
}

// 物料清单列表
export function materialslist2(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('productCode', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/materialslist/materialslist',
    method: 'post',
    data: params
  })
}

// 修改物料清单
export function updatematerials(query, query2) {
  var params = new URLSearchParams()
  params.append('materialsListJson', query) // 你要传给后台的参数值 key/value
  params.append('materialsListDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/materialslist/updatematerials',
    method: 'post',
    data: params
  })
}

// 审核物料清单
export function updatematerials2(query) {
  var params = new URLSearchParams()
  params.append('materialsListJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/materialslist/updatematerials',
    method: 'post',
    data: params
  })
}

//  删除物料清单
export function deletematerials(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('materialsIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/materialslist/deletematerials',
    method: 'post',
    data: params
  })
}

// 判断重复
export function isExist(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('productCode', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('bomType', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/materialslist/isExist',
    method: 'post',
    data: params
  })
}
