import request from '@/utils/request'

// 查询分类属性
export function searchCusCategory(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null) {
    params.append('type', query) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', 1) // 你要传给后台的参数值 key/value
  params.append('pagesize', 9999) // 你要传给后台的参数值 key/value
  return request({
    url: 'http://192.168.1.45:8080/erp/customer/searchCusCategory',
    method: 'post',
    data: params
  })
}
// 查询客户列表
export function customerlist(query) {
  var params = new URLSearchParams()
  if (query.customername !== '' && query.customername !== null && query.customername !== undefined) {
    params.append('customername', query.customername) // 你要传给后台的参数值 key/value
  }
  if (query.level !== '' && query.level !== null && query.level !== undefined) {
    params.append('level', query.level) // 你要传给后台的参数值 key/value
  }
  if (query.createtime !== '' && query.createtime !== null && query.createtime !== undefined) {
    params.append('createtime', query.createtime) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryid !== '' && query.repositoryid !== null && query.repositoryid !== undefined) {
    params.append('repositoryid', query.repositoryid) // 你要传给后台的参数值 key/value
  }
  if (query.source !== '' && query.source !== null && query.source !== undefined) {
    params.append('source', query.source) // 你要传给后台的参数值 key/value
  }
  if (query.customerphone !== '' && query.customerphone !== null && query.customerphone !== undefined) {
    params.append('customerphone', query.customerphone) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: 'http://192.168.1.45:8080/erp/customer/customerlist',
    method: 'post',
    data: params
  })
}

// 新建客户
export function addCustomer(query) {
  var params = new URLSearchParams()
  if (query.firstname !== '' && query.firstname !== null && query.firstname !== undefined) {
    params.append('firstname', query.firstname) // 你要传给后台的参数值 key/value
  }
  if (query.middlename !== '' && query.middlename !== null && query.middlename !== undefined) {
    params.append('middlename', query.middlename) // 你要传给后台的参数值 key/value
  }
  if (query.lastname !== '' && query.lastname !== null && query.lastname !== undefined) {
    params.append('lastname', query.lastname) // 你要传给后台的参数值 key/value
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
  if (query.countryid !== '' && query.countryid !== null && query.countryid !== undefined) {
    params.append('countryid', query.countryid) // 你要传给后台的参数值 key/value
  }
  if (query.provinceid !== '' && query.provinceid !== null && query.provinceid !== undefined) {
    params.append('provinceid', query.provinceid) // 你要传给后台的参数值 key/value
  }
  if (query.cityid !== '' && query.cityid !== null && query.cityid !== undefined) {
    params.append('cityid', query.cityid) // 你要传给后台的参数值 key/value
  }
  if (query.level !== '' && query.level !== null && query.level !== undefined) {
    params.append('level', query.level) // 你要传给后台的参数值 key/value
  }
  if (query.address !== '' && query.address !== null && query.address !== undefined) {
    params.append('address', query.address) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryid !== '' && query.repositoryid !== null && query.repositoryid !== undefined) {
    params.append('repositoryid', query.repositoryid) // 你要传给后台的参数值 key/value
  }
  if (query.birthday !== '' && query.birthday !== null && query.birthday !== undefined) {
    params.append('birthday', query.birthday) // 你要传给后台的参数值 key/value
  }
  if (query.source !== '' && query.source !== null && query.source !== undefined) {
    params.append('source', query.source) // 你要传给后台的参数值 key/value
  }
  if (query.newold !== '' && query.newold !== null && query.newold !== undefined) {
    params.append('newold', query.newold) // 你要传给后台的参数值 key/value
  }
  if (query.customertype !== '' && query.customertype !== null && query.customertype !== undefined) {
    params.append('customertype', query.customertype) // 你要传给后台的参数值 key/value
  }
  return request({
    url: 'http://192.168.1.45:8080/erp/customer/addCustomer',
    method: 'post',
    data: params
  })
}

// 修改客户
export function updateCustomer(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('customerid', query.id) // 你要传给后台的参数值 key/value
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
  if (query.phoneNumber !== '' && query.phoneNumber !== null && query.phoneNumber !== undefined) {
    params.append('phone', query.phoneNumber) // 你要传给后台的参数值 key/value
  }
  if (query.gender !== '' && query.gender !== null && query.gender !== undefined) {
    params.append('gender', query.gender) // 你要传给后台的参数值 key/value
  }
  if (query.countryid !== '' && query.countryid !== null && query.countryid !== undefined) {
    params.append('countryid', query.countryid) // 你要传给后台的参数值 key/value
  }
  if (query.provinceid !== '' && query.provinceid !== null && query.provinceid !== undefined) {
    params.append('provinceid', query.provinceid) // 你要传给后台的参数值 key/value
  }
  if (query.cityid !== '' && query.cityid !== null && query.cityid !== undefined) {
    params.append('cityid', query.cityid) // 你要传给后台的参数值 key/value
  }
  if (query.level !== '' && query.level !== null && query.level !== undefined) {
    params.append('level', query.level) // 你要传给后台的参数值 key/value
  }
  if (query.address !== '' && query.address !== null && query.address !== undefined) {
    params.append('address', query.address) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryid !== '' && query.repositoryid !== null && query.repositoryid !== undefined) {
    params.append('repositoryid', query.repositoryid) // 你要传给后台的参数值 key/value
  }
  if (query.birthday !== '' && query.birthday !== null && query.birthday !== undefined) {
    params.append('birthday', query.birthday) // 你要传给后台的参数值 key/value
  }
  if (query.source !== '' && query.source !== null && query.source !== undefined) {
    params.append('source', query.source) // 你要传给后台的参数值 key/value
  }
  if (query.newOrOld !== '' && query.newOrOld !== null && query.newOrOld !== undefined) {
    params.append('newold', query.newOrOld) // 你要传给后台的参数值 key/value
  }
  if (query.customerType !== '' && query.customerType !== null && query.customerType !== undefined) {
    params.append('customertype', query.customerType) // 你要传给后台的参数值 key/value
  }
  return request({
    url: 'http://192.168.1.45:8080/erp/customer/updateCustomer',
    method: 'post',
    data: params
  })
}

// 删除分类属性
export function deletecustomer(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null) {
    params.append('customerids', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: 'http://192.168.1.45:8080/erp/customer/deletecustomer',
    method: 'post',
    data: params
  })
}
