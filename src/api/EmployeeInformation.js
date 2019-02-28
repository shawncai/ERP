import request from '@/utils/request'

// 部门列表
export function getdeptlist(query) {
  return request({
    url: 'http://192.168.1.45:8080/erp/country/getdeptlist',
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
    url: 'http://192.168.1.45:8080/erp/employee/startorendemp',
    method: 'post',
    data: params
  })
}

// 删除员工
export function deleteemp(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null) {
    params.append('empids', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: 'http://192.168.1.45:8080/erp/employee/deleteemp',
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
    url: 'http://192.168.1.45:8080/erp/employee/register',
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
    url: 'http://192.168.1.45:8080/erp/employee/getemplist',
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
    url: 'http://192.168.1.45:8080/erp/contract/addcontract',
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
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: 'http://192.168.1.45:8080/erp/contract/contractlist',
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
    url: 'http://192.168.1.45:8080/erp/contract/updatecontract',
    method: 'post',
    data: params
  })
}

// 删除合同
export function deleteempcontract(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null) {
    params.append('empcontractids', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: 'http://192.168.1.45:8080/erp/contract/deleteempcontract',
    method: 'post',
    data: params
  })
}
