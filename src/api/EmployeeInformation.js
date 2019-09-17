import request from '@/utils/request'

// 部门列表
export function getdeptlist(query) {
  return request({
    url: '/country/getdeptlist',
    method: 'post',
    params: query
  })
}

// 员工停用和启用
export function startorendemp(query, stat) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null) {
    params.append('empids', query) // 你要传给后台的参数值 key/value
  }
  if (stat !== '' && stat !== null) {
    params.append('stat', stat) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/employee/startorendemp',
    method: 'post',
    data: params
  })
}

// 删除员工
export function deleteemp(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null) {
    params.append('empids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/employee/deleteemp',
    method: 'post',
    data: params
  })
}

// 展示修改界面员工资料
export function getempinfo(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null) {
    params.append('id', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/employee/getempinfo',
    method: 'post',
    data: params
  })
}

// 展示详情页面采购信息
export function getEmpStockInfo(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/employee/getEmpStockInfo',
    method: 'post',
    data: params
  })
}

// 展示详情页面收款信息
export function getEmpCollect(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/employee/getEmpCollect',
    method: 'post',
    data: params
  })
}

// 展示详情页面回访信息
export function getEmpVisitInfo(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.customerName !== '' && query.customerName !== null && query.customerName !== undefined) {
    params.append('customerName', query.customerName) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/employee/getEmpVisitInfo',
    method: 'post',
    data: params
  })
}

// 提交修改
export function updateemp(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('employeeid', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.firstName !== '' && query.firstName !== null && query.firstName !== undefined) {
    params.append('firstname', query.firstName) // 你要传给后台的参数值 key/value
  }
  if (query.middleName !== '' && query.middleName !== null && query.middleName !== undefined) {
    params.append('middlename', query.middleName) // 你要传给后台的参数值 key/value
  }
  if (query.lastName !== '' && query.lastName !== null && query.lastName !== undefined) {
    params.append('lastname', query.lastName) // 你要传给后台的参数值 key/value
  }
  if (query.password !== '' && query.password !== null && query.password !== undefined) {
    params.append('passwd', query.password) // 你要传给后台的参数值 key/value
  }
  if (query.email !== '' && query.email !== null && query.email !== undefined) {
    params.append('email', query.email) // 你要传给后台的参数值 key/value
  }
  if (query.phone !== '' && query.phone !== null && query.phone !== undefined) {
    params.append('phone', query.phone) // 你要传给后台的参数值 key/value
  }
  if (query.gender !== '' && query.gender !== null && query.gender !== undefined) {
    params.append('gender', query.gender) // 你要传给后台的参数值 key/value
  }
  if (query.countryId !== '' && query.countryId !== null && query.countryId !== undefined) {
    params.append('countryid', query.countryId) // 你要传给后台的参数值 key/value
  }
  if (query.provinceId !== '' && query.provinceId !== null && query.provinceId !== undefined) {
    params.append('provinceid', query.provinceId) // 你要传给后台的参数值 key/value
  }
  if (query.cityId !== '' && query.cityId !== null && query.cityId !== undefined) {
    params.append('cityid', query.cityId) // 你要传给后台的参数值 key/value
  }
  if (query.address !== '' && query.address !== null && query.address !== undefined) {
    params.append('address', query.address) // 你要传给后台的参数值 key/value
  }
  if (query.birthday !== '' && query.birthday !== null && query.birthday !== undefined) {
    params.append('birthday', query.birthday) // 你要传给后台的参数值 key/value
  }
  if (query.deptId !== '' && query.deptId !== null && query.deptId !== undefined) {
    params.append('deptid', query.deptId) // 你要传给后台的参数值 key/value
  }
  if (query.postId !== '' && query.postId !== null && query.postId !== undefined) {
    params.append('postid', query.postId) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryid', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.roleId !== '' && query.roleId !== null && query.roleId !== undefined) {
    params.append('roleid', query.roleId) // 你要传给后台的参数值 key/value
  }
  if (query.regionId !== '' && query.regionId !== null && query.regionId !== undefined) {
    params.append('regionid', query.regionId) // 你要传给后台的参数值 key/value
  }
  if (query.certificateType !== '' && query.certificateType !== null && query.certificateType !== undefined) {
    params.append('certificatetype', query.certificateType) // 你要传给后台的参数值 key/value
  }
  if (query.certificateNumber !== '' && query.certificateNumber !== null && query.certificateNumber !== undefined) {
    params.append('certificatenumber', query.certificateNumber) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/employee/updateemp',
    method: 'post',
    data: params
  })
}

// 添加员工
export function register(query) {
  var params = new URLSearchParams()
  params.append('firstname', query.firstname) // 你要传给后台的参数值 key/value
  params.append('middlename', query.middlename) // 你要传给后台的参数值 key/value
  params.append('lastname', query.lastname) // 你要传给后台的参数值 key/value
  params.append('passwd', query.passwd) // 你要传给后台的参数值 key/value
  params.append('email', query.email) // 你要传给后台的参数值 key/value
  params.append('phone', query.phone) // 你要传给后台的参数值 key/value
  params.append('gender', query.gender) // 你要传给后台的参数值 key/value
  params.append('countryid', query.country) // 你要传给后台的参数值 key/value
  params.append('provinceid', query.provinceid) // 你要传给后台的参数值 key/value
  params.append('cityid', query.cityid) // 你要传给后台的参数值 key/value
  params.append('address', query.address) // 你要传给后台的参数值 key/value
  if (query.birthday !== '' || query.birthday !== null) {
    params.append('birthday', query.birthday) // 你要传给后台的参数值 key/value
  }
  params.append('account', query.account) // 你要传给后台的参数值 key/value
  params.append('jobnumber', query.jobnumber) // 你要传给后台的参数值 key/value
  params.append('deptid', query.deptid) // 你要传给后台的参数值 key/value
  params.append('roleid', query.roleid) // 你要传给后台的参数值 key/value
  params.append('postid', query.postid) // 你要传给后台的参数值 key/value
  params.append('repositoryid', query.repositoryid) // 你要传给后台的参数值 key/value
  params.append('regionid', query.regionid1) // 你要传给后台的参数值 key/value
  params.append('certificatetype', query.certificatetype) // 你要传给后台的参数值 key/value
  params.append('certificatenumber', query.certificatenumber) // 你要传给后台的参数值 key/value
  return request({
    url: '/employee/register',
    method: 'post',
    data: params
  })
}

// 员工列表展示加查询
export function getemplist(query) {
  var params = new URLSearchParams()
  if (query.repositoryid !== '') {
    params.append('repositoryid', query.repositoryid) // 你要传给后台的参数值 key/value
  }
  if (query.regionid !== '' && query.regionid !== undefined) {
    params.append('regionid', query.regionid) // 你要传给后台的参数值 key/value
  }
  if (query.loginRepositoryId !== '' && query.loginRepositoryId !== undefined && query.loginRepositoryId !== null) {
    params.append('loginRepositoryId', query.loginRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== undefined && query.regionIds !== null) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  if (query.postid !== '') {
    params.append('postid', query.postid) // 你要传给后台的参数值 key/value
  }
  if (query.deptid !== '') {
    params.append('deptid', query.deptid) // 你要传给后台的参数值 key/value
  }
  if (query.employeename !== '') {
    params.append('employeename', query.employeename) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '') {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  if (query.time !== '' && query.time !== null) {
    params.append('time', query.time) // 你要传给后台的参数值 key/value
  }
  if (query.jobnumber !== '') {
    params.append('jobnumber', query.jobnumber) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/employee/getemplist',
    method: 'post',
    data: params
  })
}

// 新建员工劳动合同
export function addcontract(query) {
  var params = new URLSearchParams()
  if (query.employeeid !== '') {
    params.append('employeeid', query.employeeid) // 你要传给后台的参数值 key/value
  }
  if (query.contractname !== '') {
    params.append('contractname', query.contractname) // 你要传给后台的参数值 key/value
  }
  if (query.signtime !== '' && query.signtime !== null) {
    params.append('signtime', query.signtime) // 你要传给后台的参数值 key/value
  }
  if (query.expiredtime !== '' && query.expiredtime !== null) {
    params.append('expiredtime', query.expiredtime) // 你要传给后台的参数值 key/value
  }
  if (query.effectivetime !== '' && query.effectivetime !== null) {
    params.append('effectivetime', query.effectivetime) // 你要传给后台的参数值 key/value
  }
  if (query.typeid !== '') {
    params.append('typeid', query.typeid) // 你要传给后台的参数值 key/value
  }
  if (query.attribute !== '') {
    params.append('attribute', query.attribute) // 你要传给后台的参数值 key/value
  }
  if (query.period !== '') {
    params.append('period', query.period) // 你要传给后台的参数值 key/value
  }
  if (query.iscorrection !== '') {
    params.append('iscorrection', query.iscorrection) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '') {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  if (query.advanceday !== '') {
    params.append('advanceday', query.advanceday) // 你要传给后台的参数值 key/value
  }
  if (query.trialsalary !== '') {
    params.append('trialsalary', query.trialsalary) // 你要传给后台的参数值 key/value
  }
  if (query.correctionsalary !== '') {
    params.append('correctionsalary', query.correctionsalary) // 你要传给后台的参数值 key/value
  }
  if (query.remindpersonid !== '') {
    params.append('remindpersonid', query.remindpersonid) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/contract/addcontract',
    method: 'post',
    data: params
  })
}

// 合同列表展示加查询
export function contractlist(query) {
  var params = new URLSearchParams()
  if (query.contractname !== '') {
    params.append('contractname', query.contractname) // 你要传给后台的参数值 key/value
  }
  if (query.contractnumber !== '') {
    params.append('contractnumber', query.contractnumber) // 你要传给后台的参数值 key/value
  }
  if (query.empnumber !== '') {
    params.append('empnumber', query.empnumber) // 你要传给后台的参数值 key/value
  }
  if (query.empname !== '') {
    params.append('empname', query.empname) // 你要传给后台的参数值 key/value
  }
  if (query.isEnd !== '') {
    params.append('isEnd', query.isEnd) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/contract/contractlist',
    method: 'post',
    data: params
  })
}

// 修改合同列表
export function updatecontract(query) {
  var params = new URLSearchParams()
  if (query.id !== '') {
    params.append('contractid', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.contractName !== '') {
    params.append('contractname', query.contractName) // 你要传给后台的参数值 key/value
  }
  if (query.signTime !== '') {
    params.append('signtime', query.signTime) // 你要传给后台的参数值 key/value
  }
  if (query.expiredTime !== '') {
    params.append('expiredtime', query.expiredTime) // 你要传给后台的参数值 key/value
  }
  if (query.effectiveTime !== '') {
    params.append('effectivetime', query.effectiveTime) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '') {
    params.append('typeid', query.type) // 你要传给后台的参数值 key/value
  }
  if (query.contractAttribute !== '') {
    params.append('attribute', query.contractAttribute) // 你要传给后台的参数值 key/value
  }
  if (query.contractAttribute !== '') {
    params.append('period', query.period) // 你要传给后台的参数值 key/value
  }
  if (query.isCorrection !== '') {
    params.append('iscorrection', query.isCorrection) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '') {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  if (query.advanceDay !== '') {
    params.append('advanceday', query.advanceDay) // 你要传给后台的参数值 key/value
  }
  if (query.trialSalary !== '') {
    params.append('trialsalary', query.trialSalary) // 你要传给后台的参数值 key/value
  }
  if (query.correctionSalary !== '') {
    params.append('correctionsalary', query.correctionSalary) // 你要传给后台的参数值 key/value
  }
  if (query.expiredRemindPersonId !== '' && query.expiredRemindPersonId !== null) {
    params.append('remindpersonid', query.expiredRemindPersonId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/contract/updatecontract',
    method: 'post',
    data: params
  })
}

// 删除合同
export function deleteempcontract(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null) {
    params.append('empcontractids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/contract/deleteempcontract',
    method: 'post',
    data: params
  })
}

// 分类属性列表
export function searchEmpCategory(query) {
  var params = new URLSearchParams()
  if (query.categoryname !== '' && query.categoryname !== null && query.categoryname !== undefined) {
    params.append('categoryname', query.categoryname) // 你要传给后台的参数值 key/value
  }
  if (query.iseffective !== '' && query.iseffective !== null && query.iseffective !== undefined) {
    params.append('iseffective', query.iseffective) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/employee/searchEmpCategory',
    method: 'post',
    data: params
  })
}

// 新增分类属性
export function addEmpCategory(query) {
  var params = new URLSearchParams()
  if (query.categoryname !== '' && query.categoryname !== null) {
    params.append('categoryname', query.categoryname) // 你要传给后台的参数值 key/value
  }
  if (query.category !== '' && query.category !== null) {
    params.append('category', query.category) // 你要传给后台的参数值 key/value
  }
  if (query.iseffective !== '' && query.iseffective !== null) {
    params.append('iseffective', query.iseffective) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/employee/addEmpCategory',
    method: 'post',
    data: params
  })
}

// 修改分类属性
export function updateEmpCategory(query) {
  var params = new URLSearchParams()
  if (query.categoryName !== '' && query.categoryName !== null) {
    params.append('categoryname', query.categoryName) // 你要传给后台的参数值 key/value
  }
  if (query.isEffective !== '' && query.isEffective !== null) {
    params.append('iseffective', query.isEffective) // 你要传给后台的参数值 key/value
  }
  if (query.id !== '' && query.id !== null) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/employee/updateEmpCategory',
    method: 'post',
    data: params
  })
}

// 删除分类属性
export function delateEmpCategory(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null) {
    params.append('ids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/employee/delateEmpCategory',
    method: 'post',
    data: params
  })
}
