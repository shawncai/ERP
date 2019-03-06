import request from '@/utils/request'

// 查询编码规则
export function search(query) {
  var params = new URLSearchParams()
  if (query.ruleName !== '' && query.ruleName !== null && query.ruleName !== undefined) {
    params.append('ruleName', query.ruleName) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  if (query.iseffective !== '' && query.iseffective !== null && query.iseffective !== undefined) {
    params.append('iseffective', query.iseffective) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: 'http://192.168.1.45:8080/erp/NumberingRules/search',
    method: 'post',
    data: params
  })
}

// 删除编码规则
export function deleteRules(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('ids', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: 'http://192.168.1.45:8080/erp/NumberingRules/delete',
    method: 'post',
    data: params
  })
}

// 新增编码规则
export function createRules(query) {
  var params = new URLSearchParams()
  if (query.ruleName !== '' && query.ruleName !== null && query.ruleName !== undefined) {
    params.append('ruleName', query.ruleName) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  if (query.iseffective !== '' && query.iseffective !== null && query.iseffective !== undefined) {
    params.append('iseffective', query.iseffective) // 你要传给后台的参数值 key/value
  }
  if (query.prefix !== '' && query.prefix !== null && query.prefix !== undefined) {
    params.append('prefix', query.prefix) // 你要传给后台的参数值 key/value
  }
  if (query.dateType !== '' && query.dateType !== null && query.dateType !== undefined) {
    params.append('dateType', query.dateType) // 你要传给后台的参数值 key/value
  }
  if (query.length !== '' && query.length !== null && query.length !== undefined) {
    params.append('length', query.length) // 你要传给后台的参数值 key/value
  }
  return request({
    url: 'http://192.168.1.45:8080/erp/NumberingRules/create',
    method: 'post',
    data: params
  })
}

// 修改编码规则
export function updateRules(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.ruleName !== '' && query.ruleName !== null && query.ruleName !== undefined) {
    params.append('ruleName', query.ruleName) // 你要传给后台的参数值 key/value
  }
  if (query.isEffective !== '' && query.isEffective !== null && query.isEffective !== undefined) {
    params.append('iseffective', query.isEffective) // 你要传给后台的参数值 key/value
  }
  if (query.prefix !== '' && query.prefix !== null && query.prefix !== undefined) {
    params.append('prefix', query.prefix) // 你要传给后台的参数值 key/value
  }
  if (query.dateType !== '' && query.dateType !== null && query.dateType !== undefined) {
    params.append('dateType', query.dateType) // 你要传给后台的参数值 key/value
  }
  if (query.length !== '' && query.length !== null && query.length !== undefined) {
    params.append('length', query.length) // 你要传给后台的参数值 key/value
  }
  return request({
    url: 'http://192.168.1.45:8080/erp/NumberingRules/update',
    method: 'post',
    data: params
  })
}

// 短信模板列表
export function modellist(query) {
  var params = new URLSearchParams()
  if (query.iseffective !== '' && query.iseffective !== null && query.iseffective !== undefined) {
    params.append('iseffective', query.iseffective) // 你要传给后台的参数值 key/value
  }
  if (query.modelname !== '' && query.modelname !== null && query.modelname !== undefined) {
    params.append('modelname', query.modelname) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: 'http://192.168.1.45:8080/erp/messageModel/modellist',
    method: 'post',
    data: params
  })
}

// 新增短信模板
export function addmodel(query) {
  var params = new URLSearchParams()
  if (query.iseffective !== '' && query.iseffective !== null && query.iseffective !== undefined) {
    params.append('iseffective', query.iseffective) // 你要传给后台的参数值 key/value
  }
  if (query.modelname !== '' && query.modelname !== null && query.modelname !== undefined) {
    params.append('modelname', query.modelname) // 你要传给后台的参数值 key/value
  }
  if (query.content !== '' && query.content !== null && query.content !== undefined) {
    params.append('content', query.content) // 你要传给后台的参数值 key/value
  }
  return request({
    url: 'http://192.168.1.45:8080/erp/messageModel/addmodel',
    method: 'post',
    data: params
  })
}

// 修改短信模板
export function updatemodel(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('modelid', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.isEffective !== '' && query.isEffective !== null && query.isEffective !== undefined) {
    params.append('iseffective', query.isEffective) // 你要传给后台的参数值 key/value
  }
  if (query.modelName !== '' && query.modelName !== null && query.modelName !== undefined) {
    params.append('modelname', query.modelName) // 你要传给后台的参数值 key/value
  }
  if (query.content !== '' && query.content !== null && query.content !== undefined) {
    params.append('content', query.content) // 你要传给后台的参数值 key/value
  }
  return request({
    url: 'http://192.168.1.45:8080/erp/messageModel/updatemodel',
    method: 'post',
    data: params
  })
}

// 批量删除短信模板
export function deletemodel(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: 'http://192.168.1.45:8080/erp/messageModel/deletemodel',
    method: 'post',
    data: params
  })
}

// 查询计量单位列表
export function searchMea(query) {
  var params = new URLSearchParams()
  if (query.iseffective !== '' && query.iseffective !== null && query.iseffective !== undefined) {
    params.append('iseffective', query.iseffective) // 你要传给后台的参数值 key/value
  }
  if (query.categoryname !== '' && query.categoryname !== null && query.categoryname !== undefined) {
    params.append('categoryname', query.categoryname) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: 'http://192.168.1.45:8080/erp/measurement/search',
    method: 'post',
    data: params
  })
}

// 新增计量单位
export function createmea(query) {
  var params = new URLSearchParams()
  if (query.category !== '' && query.category !== null && query.category !== undefined) {
    params.append('category', query.category) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  if (query.iseffective !== '' && query.iseffective !== null && query.iseffective !== undefined) {
    params.append('iseffective', query.iseffective) // 你要传给后台的参数值 key/value
  }
  if (query.categoryname !== '' && query.categoryname !== null && query.categoryname !== undefined) {
    params.append('categoryname', query.categoryname) // 你要传给后台的参数值 key/value
  }
  return request({
    url: 'http://192.168.1.45:8080/erp/measurement/create',
    method: 'post',
    data: params
  })
}

// 修改计量单位
export function updatemea(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.isEffective !== '' && query.isEffective !== null && query.isEffective !== undefined) {
    params.append('iseffective', query.isEffective) // 你要传给后台的参数值 key/value
  }
  if (query.categoryName !== '' && query.categoryName !== null && query.categoryName !== undefined) {
    params.append('categoryname', query.categoryName) // 你要传给后台的参数值 key/value
  }
  return request({
    url: 'http://192.168.1.45:8080/erp/measurement/update',
    method: 'post',
    data: params
  })
}

// 批量删除计量单位
export function deletemea(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: 'http://192.168.1.45:8080/erp/measurement/delete',
    method: 'post',
    data: params
  })
}
