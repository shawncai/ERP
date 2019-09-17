import request from '@/utils/request'

// 查询编码规则分类属性
export function searchcategory() {
  return request({
    url: '/NumberingRules/searchcategory',
    method: 'post'
  })
}

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
    url: '/NumberingRules/search',
    method: 'post',
    data: params
  })
}

// 删除编码规则
export function deleteRules(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('ids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/NumberingRules/delete',
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
    url: '/NumberingRules/create',
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
    url: '/NumberingRules/update',
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
    url: '/messageModel/modellist',
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
    url: '/messageModel/addmodel',
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
    url: '/messageModel/updatemodel',
    method: 'post',
    data: params
  })
}

// 批量删除短信模板
export function deletemodel(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/messageModel/deletemodel',
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
    url: '/measurement/search',
    method: 'post',
    data: params
  })
}

// 查询计量单位列表 分页
export function searchMea2(query) {
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
    url: '/measurement/search2',
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
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId', query.createPersonId) // 你要传给后台的参数值 key/value
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
    url: '/measurement/create',
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
    url: '/measurement/update',
    method: 'post',
    data: params
  })
}

// 批量删除计量单位
export function deletemea(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/measurement/delete',
    method: 'post',
    data: params
  })
}

// 查询参数设置
export function parameter() {
  return request({
    url: '/parameter/search',
    method: 'post'
  })
}

// 开启关闭参数
export function effective(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.isEffective !== '' && query.isEffective !== null && query.isEffective !== undefined) {
    params.append('isEffective', query.isEffective) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/parameter/effective',
    method: 'post',
    data: params
  })
}

// 新增审批流程
export function createapproval(query, detailJson) {
  var params = new URLSearchParams()
  if (query.process_name !== '' && query.process_name !== null && query.process_name !== undefined) {
    params.append('process_name', query.process_name) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  if (query.is_message !== '' && query.is_message !== null && query.is_message !== undefined) {
    params.append('is_message', query.is_message) // 你要传给后台的参数值 key/value
  }
  if (query.is_effective !== '' && query.is_effective !== null && query.is_effective !== undefined) {
    params.append('is_effective', query.is_effective) // 你要传给后台的参数值 key/value
  }
  if (query.effect_region !== '' && query.effect_region !== null && query.effect_region !== undefined) {
    params.append('effect_region', query.effect_region) // 你要传给后台的参数值 key/value
  }
  if (query.effect_repository !== '' && query.effect_repository !== null && query.effect_repository !== undefined) {
    params.append('effect_repository', query.effect_repository) // 你要传给后台的参数值 key/value
  }
  if (query.country_id !== '' && query.country_id !== null && query.country_id !== undefined) {
    params.append('country_id', query.country_id) // 你要传给后台的参数值 key/value
  }
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId', query.createPersonId) // 你要传给后台的参数值 key/value
  }
  if (detailJson !== '' && detailJson !== null && detailJson !== undefined) {
    params.append('detailJson', detailJson) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/approvalProcess/create',
    method: 'post',
    data: params
  })
}

// 新增批次规则
export function createRules2(query) {
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
    url: '/NumberingRules/create',
    method: 'post',
    data: params
  })
}

// 查询审批流程详细信息
export function searchDetail(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('id', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/approvalProcess/searchDetail',
    method: 'post',
    data: params
  })
}

// 删除审批流程详细信息
export function deleteDetail(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('id', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/approvalProcess/deleteDetail',
    method: 'post',
    data: params
  })
}

// 查询审批流程列表
export function searchProcess(query) {
  var params = new URLSearchParams()
  if (query.process_name !== '' && query.process_name !== null && query.process_name !== undefined) {
    params.append('process_name', query.process_name) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  if (query.is_effective !== '' && query.is_effective !== null && query.is_effective !== undefined) {
    params.append('is_effective', query.is_effective) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  return request({
    url: '/approvalProcess/search',
    method: 'post',
    data: params
  })
}

// 删除查询审批流程
export function deleteProcess(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/approvalProcess/delete',
    method: 'post',
    data: params
  })
}

// 修改审批流程
export function updateeapproval(query, detailJson) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.processName !== '' && query.processName !== null && query.processName !== undefined) {
    params.append('process_name', query.processName) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  if (query.isMessage !== '' && query.isMessage !== null && query.isMessage !== undefined) {
    params.append('is_message', query.isMessage) // 你要传给后台的参数值 key/value
  }
  if (query.isEffective !== '' && query.isEffective !== null && query.isEffective !== undefined) {
    params.append('is_effective', query.isEffective) // 你要传给后台的参数值 key/value
  }
  if (query.effect_region !== '' && query.effect_region !== null && query.effect_region !== undefined) {
    params.append('effect_region', query.effect_region) // 你要传给后台的参数值 key/value
  }
  if (query.effect_repository !== '' && query.effect_repository !== null && query.effect_repository !== undefined) {
    params.append('effect_repository', query.effect_repository) // 你要传给后台的参数值 key/value
  }
  if (query.countryId !== '' && query.countryId !== null && query.countryId !== undefined) {
    params.append('country_id', query.countryId) // 你要传给后台的参数值 key/value
  }
  if (detailJson !== '' && detailJson !== null && detailJson !== undefined) {
    params.append('detailJson', detailJson) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/approvalProcess/update',
    method: 'post',
    data: params
  })
}

// 部门列表
export function getdeptlist() {
  return request({
    url: '/country/getdeptlist',
    method: 'post'
  })
}

// 新建部门
export function adddept(query) {
  var params = new URLSearchParams()
  if (query.deptno !== '' && query.deptno !== null && query.deptno !== undefined) {
    params.append('deptno', query.deptno) // 你要传给后台的参数值 key/value
  }
  if (query.deptname !== '' && query.deptname !== null && query.deptname !== undefined) {
    params.append('deptname', query.deptname) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/country/adddept',
    method: 'post',
    data: params
  })
}

// 更新部门
export function updatedept(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('deptid', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.deptNo !== '' && query.deptNo !== null && query.deptNo !== undefined) {
    params.append('deptno', query.deptNo) // 你要传给后台的参数值 key/value
  }
  if (query.deptName !== '' && query.deptName !== null && query.deptName !== undefined) {
    params.append('deptname', query.deptName) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/country/updatedept',
    method: 'post',
    data: params
  })
}

// 删除部门
export function deletedept(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('ids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/country/deletedept',
    method: 'post',
    data: params
  })
}
