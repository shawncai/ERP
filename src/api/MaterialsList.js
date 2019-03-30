import request from '@/utils/request'

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
    url: '/erp/materialslist/addmaterials',
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
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/materialslist/materialslist',
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
    url: '/erp/materialslist/updatematerials',
    method: 'post',
    data: params
  })
}

// 审核物料清单
export function updatematerials2(query) {
  var params = new URLSearchParams()
  params.append('materialsListJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/materialslist/updatematerials',
    method: 'post',
    data: params
  })
}

//  删除物料清单
export function deletematerials(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('materialsIds', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/materialslist/deletematerials',
    method: 'post',
    data: params
  })
}