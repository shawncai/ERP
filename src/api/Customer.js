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
    url: '/customer/searchCusCategory',
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
  if (query.isActive !== '' && query.isActive !== null && query.isActive !== undefined) {
    params.append('isActive', query.isActive) // 你要传给后台的参数值 key/value
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
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/customer/customerlist',
    method: 'post',
    data: params
  })
}

// 销售出库单用到客户详情
export function customerlist2(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('customerId', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/customer/customerInfo',
    method: 'post',
    data: params
  })
}

// 客户详情
export function customerDetail(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('customerId', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/customer/customerDetail',
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
  if (query.phone2 !== '' && query.phone2 !== null && query.phone2 !== undefined) {
    params.append('phone2', query.phone2) // 你要传给后台的参数值 key/value
  }
  if (query.phone3 !== '' && query.phone3 !== null && query.phone3 !== undefined) {
    params.append('phone3', query.phone3) // 你要传给后台的参数值 key/value
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
  if (query.landline !== '' && query.landline !== null && query.landline !== undefined) {
    params.append('landline', query.landline) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/customer/addCustomer',
    method: 'post',
    data: params
  })
}

// 修改客户
export function updateCustomer(query) {
  var params = new URLSearchParams()
  if (query.landline !== '' && query.landline !== null && query.landline !== undefined) {
    params.append('landline', query.landline) // 你要传给后台的参数值 key/value
  }
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
  if (query.phone !== '' && query.phone !== null && query.phone !== undefined) {
    params.append('phone', query.phone) // 你要传给后台的参数值 key/value
  }
  if (query.phone2 !== '' && query.phone2 !== null && query.phone2 !== undefined) {
    params.append('phone2', query.phone2) // 你要传给后台的参数值 key/value
  }
  if (query.phone3 !== '' && query.phone3 !== null && query.phone3 !== undefined) {
    params.append('phone3', query.phone3) // 你要传给后台的参数值 key/value
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
  if (query.level !== '' && query.level !== null && query.level !== undefined) {
    params.append('level', query.level) // 你要传给后台的参数值 key/value
  }
  if (query.address !== '' && query.address !== null && query.address !== undefined) {
    params.append('address', query.address) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryid', query.repositoryId) // 你要传给后台的参数值 key/value
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
    url: '/customer/updateCustomer',
    method: 'post',
    data: params
  })
}

// 删除客户信息
export function deletecustomer(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null) {
    params.append('customerids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/customer/deletecustomer',
    method: 'post',
    data: params
  })
}

// 新建经销商
export function addagent(query) {
  var params = new URLSearchParams()
  if (query.agentname !== '' && query.agentname !== null && query.agentname !== undefined) {
    params.append('agentname', query.agentname) // 你要传给后台的参数值 key/value
  }
  if (query.phone !== '' && query.phone !== null && query.phone !== undefined) {
    params.append('phone', query.phone) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  if (query.pinyin !== '' && query.pinyin !== null && query.pinyin !== undefined) {
    params.append('pinyin', query.pinyin) // 你要传给后台的参数值 key/value
  }
  if (query.level !== '' && query.level !== null && query.level !== undefined) {
    params.append('level', query.level) // 你要传给后台的参数值 key/value
  }
  if (query.source !== '' && query.source !== null && query.source !== undefined) {
    params.append('source', query.source) // 你要传给后台的参数值 key/value
  }
  if (query.discount !== '' && query.discount !== null && query.discount !== undefined) {
    params.append('discount', query.discount) // 你要传给后台的参数值 key/value
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
  if (query.introduce !== '' && query.introduce !== null && query.introduce !== undefined) {
    params.append('introduce', query.introduce) // 你要传给后台的参数值 key/value
  }
  if (query.address !== '' && query.address !== null && query.address !== undefined) {
    params.append('address', query.address) // 你要传给后台的参数值 key/value
  }
  if (query.contactname !== '' && query.contactname !== null && query.contactname !== undefined) {
    params.append('contactname', query.contactname) // 你要传给后台的参数值 key/value
  }
  if (query.traderid !== '' && query.traderid !== null && query.traderid !== undefined) {
    params.append('traderid', query.traderid) // 你要传给后台的参数值 key/value
  }
  if (query.transmode !== '' && query.transmode !== null && query.transmode !== undefined) {
    params.append('transmode', query.transmode) // 你要传给后台的参数值 key/value
  }
  if (query.deliverymode !== '' && query.deliverymode !== null && query.deliverymode !== undefined) {
    params.append('deliverymode', query.deliverymode) // 你要传给后台的参数值 key/value
  }
  if (query.createid !== '' && query.createid !== null && query.createid !== undefined) {
    params.append('createid', query.createid) // 你要传给后台的参数值 key/value
  }
  if (query.newold !== '' && query.newold !== null && query.newold !== undefined) {
    params.append('newold', query.newold) // 你要传给后台的参数值 key/value
  }
  if (query.accountsDays !== '' && query.accountsDays !== null && query.accountsDays !== undefined) {
    params.append('accountsdays', query.accountsDays) // 你要传给后台的参数值 key/value
  }
  if (query.settleMode !== '' && query.settleMode !== null && query.settleMode !== undefined) {
    params.append('settlemode', query.settleMode) // 你要传给后台的参数值 key/value
  }
  if (query.payMode !== '' && query.payMode !== null && query.payMode !== undefined) {
    params.append('paymode', query.payMode) // 你要传给后台的参数值 key/value
  }
  if (query.currency !== '' && query.currency !== null && query.currency !== undefined) {
    params.append('currency', query.currency) // 你要传给后台的参数值 key/value
  }
  if (query.invoiceType !== '' && query.invoiceType !== null && query.invoiceType !== undefined) {
    params.append('invoicetype', query.invoiceType) // 你要传给后台的参数值 key/value
  }
  if (query.openingbank !== '' && query.openingbank !== null && query.openingbank !== undefined) {
    params.append('openingbank', query.openingbank) // 你要传给后台的参数值 key/value
  }
  if (query.accountname !== '' && query.accountname !== null && query.accountname !== undefined) {
    params.append('accountname', query.accountname) // 你要传给后台的参数值 key/value
  }
  if (query.account !== '' && query.account !== null && query.account !== undefined) {
    params.append('account', query.account) // 你要传给后台的参数值 key/value
  }
  if (query.establishmenttime !== '' && query.establishmenttime !== null && query.establishmenttime !== undefined) {
    params.append('establishmenttime', query.establishmenttime) // 你要传给后台的参数值 key/value
  }
  if (query.totalnumber !== '' && query.totalnumber !== null && query.totalnumber !== undefined) {
    params.append('totalnumber', query.totalnumber) // 你要传给后台的参数值 key/value
  }
  if (query.corporaterepresentative !== '' && query.corporaterepresentative !== null && query.corporaterepresentative !== undefined) {
    params.append('corporaterepresentative', query.corporaterepresentative) // 你要传给后台的参数值 key/value
  }
  if (query.businesslicense !== '' && query.businesslicense !== null && query.businesslicense !== undefined) {
    params.append('businesslicense', query.businesslicense) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/agent/addagent',
    method: 'post',
    data: params
  })
}

// 查询经销商列表
export function agentlist(query) {
  var params = new URLSearchParams()
  if (query.agentname !== '' && query.agentname !== null && query.agentname !== undefined) {
    params.append('agentname', query.agentname) // 你要传给后台的参数值 key/value
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
  if (query.phone !== '' && query.phone !== null && query.phone !== undefined) {
    params.append('phone', query.phone) // 你要传给后台的参数值 key/value
  }
  if (query.source !== '' && query.source !== null && query.source !== undefined) {
    params.append('source', query.source) // 你要传给后台的参数值 key/value
  }
  if (query.pinyin !== '' && query.pinyin !== null && query.pinyin !== undefined) {
    params.append('pinyin', query.pinyin) // 你要传给后台的参数值 key/value
  }
  if (query.contactname !== '' && query.contactname !== null && query.contactname !== undefined) {
    params.append('contactname', query.contactname) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/agent/agentlist',
    method: 'post',
    data: params
  })
}

// 更新经销商
export function updateagent(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('agentid', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.agentName !== '' && query.agentName !== null && query.agentName !== undefined) {
    params.append('agentname', query.agentName) // 你要传给后台的参数值 key/value
  }
  if (query.phone !== '' && query.phone !== null && query.phone !== undefined) {
    params.append('phone', query.phone) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  if (query.pinyin !== '' && query.pinyin !== null && query.pinyin !== undefined) {
    params.append('pinyin', query.pinyin) // 你要传给后台的参数值 key/value
  }
  if (query.level !== '' && query.level !== null && query.level !== undefined) {
    params.append('level', query.level) // 你要传给后台的参数值 key/value
  }
  if (query.source !== '' && query.source !== null && query.source !== undefined) {
    params.append('source', query.source) // 你要传给后台的参数值 key/value
  }
  if (query.discount !== '' && query.discount !== null && query.discount !== undefined) {
    params.append('discount', query.discount) // 你要传给后台的参数值 key/value
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
  if (query.introduce !== '' && query.introduce !== null && query.introduce !== undefined) {
    params.append('introduce', query.introduce) // 你要传给后台的参数值 key/value
  }
  if (query.address !== '' && query.address !== null && query.address !== undefined) {
    params.append('address', query.address) // 你要传给后台的参数值 key/value
  }
  if (query.contactName !== '' && query.contactName !== null && query.contactName !== undefined) {
    params.append('contactname', query.contactName) // 你要传给后台的参数值 key/value
  }
  if (query.traderid !== '' && query.traderid !== null && query.traderid !== undefined) {
    params.append('traderid', query.traderid) // 你要传给后台的参数值 key/value
  }
  if (query.transMode !== '' && query.transMode !== null && query.transMode !== undefined) {
    params.append('transmode', query.transMode) // 你要传给后台的参数值 key/value
  }
  if (query.deliveryMode !== '' && query.deliveryMode !== null && query.deliveryMode !== undefined) {
    params.append('deliverymode', query.deliveryMode) // 你要传给后台的参数值 key/value
  }
  if (query.deliveryMode !== '' && query.deliveryMode !== null && query.deliveryMode !== undefined) {
    params.append('deliverymode', query.deliveryMode) // 你要传给后台的参数值 key/value
  }
  if (query.accountsDays !== '' && query.accountsDays !== null && query.accountsDays !== undefined) {
    params.append('accountsdays', query.accountsDays) // 你要传给后台的参数值 key/value
  }
  if (query.settleMode !== '' && query.settleMode !== null && query.settleMode !== undefined) {
    params.append('settlemode', query.settleMode) // 你要传给后台的参数值 key/value
  }
  if (query.payMode !== '' && query.payMode !== null && query.payMode !== undefined) {
    params.append('paymode', query.payMode) // 你要传给后台的参数值 key/value
  }
  if (query.currency !== '' && query.currency !== null && query.currency !== undefined) {
    params.append('currency', query.currency) // 你要传给后台的参数值 key/value
  }
  if (query.invoiceType !== '' && query.invoiceType !== null && query.invoiceType !== undefined) {
    params.append('invoicetype', query.invoiceType) // 你要传给后台的参数值 key/value
  }
  if (query.openingBank !== '' && query.openingBank !== null && query.openingBank !== undefined) {
    params.append('openingbank', query.openingBank) // 你要传给后台的参数值 key/value
  }
  if (query.accountName !== '' && query.accountName !== null && query.accountName !== undefined) {
    params.append('accountname', query.accountName) // 你要传给后台的参数值 key/value
  }
  if (query.account !== '' && query.account !== null && query.account !== undefined) {
    params.append('account', query.account) // 你要传给后台的参数值 key/value
  }
  if (query.establishmenttime !== '' && query.establishmenttime !== null && query.establishmenttime !== undefined) {
    params.append('establishmenttime', query.establishmenttime) // 你要传给后台的参数值 key/value
  }
  if (query.totalNumber !== '' && query.totalNumber !== null && query.totalNumber !== undefined) {
    params.append('totalnumber', query.totalNumber) // 你要传给后台的参数值 key/value
  }
  if (query.corporaterepresentative !== '' && query.corporaterepresentative !== null && query.corporaterepresentative !== undefined) {
    params.append('corporaterepresentative', query.corporaterepresentative) // 你要传给后台的参数值 key/value
  }
  if (query.businessLicense !== '' && query.businessLicense !== null && query.businessLicense !== undefined) {
    params.append('businesslicense', query.businessLicense) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/agent/updateagent',
    method: 'post',
    data: params
  })
}

// 删除经销商信息
export function deleteagent(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null) {
    params.append('ids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/agent/deleteagent',
    method: 'post',
    data: params
  })
}

// 分类属性列表
export function searchEmpCategory(query) {
  var params = new URLSearchParams()
  if (query.categoryname !== '' && query.categoryname !== null) {
    params.append('categoryname', query.categoryname) // 你要传给后台的参数值 key/value
  }
  if (query.iseffective !== '' && query.iseffective !== null) {
    params.append('iseffective', query.iseffective) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/customer/searchCusCategory',
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

  params.append('category', undefined) // 你要传给后台的参数值 key/value

  if (query.iseffective !== '' && query.iseffective !== null) {
    params.append('iseffective', query.iseffective) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/customer/addCusCategory',
    method: 'post',
    data: params
  })
}

// 修改分类属性
export function updateEmpCategory(query) {
  var params = new URLSearchParams()
  if (query.categoryName !== '' && query.categoryName !== null && query.categoryName !== undefined) {
    params.append('categoryname', query.categoryName) // 你要传给后台的参数值 key/value
  }
  if (query.isEffective !== '' && query.isEffective !== null) {
    params.append('iseffective', query.isEffective) // 你要传给后台的参数值 key/value
  }
  if (query.id !== '' && query.id !== null) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/customer/updateCusCategory',
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
    url: '/customer/delateCusCategory',
    method: 'post',
    data: params
  })
}

// 客户批量导入
export function manyinsert(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('customerJson', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/customer/manyinsert',
    method: 'post',
    data: params
  })
}

// 分期客户列表
export function customerlistapply(query) {
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
  // if (query.repositoryid !== '' && query.repositoryid !== null && query.repositoryid !== undefined) {
  //   params.append('repositoryid', query.repositoryid) // 你要传给后台的参数值 key/value
  // }
  if (query.source !== '' && query.source !== null && query.source !== undefined) {
    params.append('source', query.source) // 你要传给后台的参数值 key/value
  }
  if (query.customerphone !== '' && query.customerphone !== null && query.customerphone !== undefined) {
    params.append('customerphone', query.customerphone) // 你要传给后台的参数值 key/value
  }
  // if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
  //   params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  // }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/customer/customerlist2',
    method: 'post',
    data: params
  })
}

// 新建客户组
export function addCustomerProduct(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('customerProductGroupJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('customerProductGroupDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/customerProduct/addCustomerProduct',
    method: 'post',
    data: params
  })
}

// 客户组列表
export function customerProductList(query) {
  var params = new URLSearchParams()
  if (query.groupId !== '' && query.groupId !== null && query.groupId !== undefined) {
    params.append('groupId', query.groupId) // 你要传给后台的参数值 key/value
  }
  if (query.productCode !== '' && query.productCode !== null && query.productCode !== undefined) {
    params.append('productCode', query.productCode) // 你要传给后台的参数值 key/value
  }
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productName', query.productName) // 你要传给后台的参数值 key/value
  }
  if (query.customerId !== '' && query.customerId !== null && query.customerId !== undefined) {
    params.append('customerId', query.customerId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.levelId !== '' && query.levelId !== null && query.levelId !== undefined) {
    params.append('levelId', query.levelId) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/customerProduct/customerProductList',
    method: 'post',
    data: params
  })
}

// 删除客户组
export function deleteCustomerProduct(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('groupId', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operateId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/customerProduct/deleteCustomerProduct',
    method: 'post',
    data: params
  })
}

// 修改客户组
export function updateCustomerProduct(query, query2, query3) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('customerProductGroupJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('customerProductGroupDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  if (query3 !== '' && query3 !== null && query3 !== undefined) {
    params.append('operateId', query3) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/customerProduct/updateCustomerProduct',
    method: 'post',
    data: params
  })
}

// 新建客户组调价单
export function addCustomerProductAdjust(query, query2, query3) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('customerProductAdjustJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('customerProductAdjustDetailJson', query2) // 你要传给后台的参数值 key/value
  }

  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }

  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/customerAdjust/addCustomerProductAdjust',
    method: 'post',
    data: params
  })
}

// 客户组调价单列表
export function supplierAdjustList(query) {
  var params = new URLSearchParams()
  if (query.number !== '' && query.number !== null && query.number !== undefined) {
    params.append('number', query.number) // 你要传给后台的参数值 key/value
  }
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.customerId !== '' && query.customerId !== null && query.customerId !== undefined) {
    params.append('customerId', query.customerId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.judgeStat !== '' && query.judgeStat !== null && query.judgeStat !== undefined) {
    params.append('judgeStat', query.judgeStat) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/customerAdjust/supplierAdjustList',
    method: 'post',
    data: params
  })
}

// 删除客户组调价单
export function deleteCustomerProductAdjust(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('adjustId', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operateId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/customerAdjust/deleteCustomerProductAdjust',
    method: 'post',
    data: params
  })
}

// 修改客户组调价单
export function updateCustomerAdjust(query, query2, query3) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('customerProductAdjustJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('customerProductAdjustDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  if (query3 !== '' && query3 !== null && query3 !== undefined) {
    params.append('operateId', query3) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/customerAdjust/updateCustomerAdjust',
    method: 'post',
    data: params
  })
}

// 查询给客户组提供的商品
export function chooseCustomerProduct(query) {
  var params = new URLSearchParams()
  if (query.searchRepositoryId !== '' && query.searchRepositoryId !== null && query.searchRepositoryId !== undefined) {
    params.append('searchRepositoryId', query.searchRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.productid !== '' && query.productid !== null && query.productid !== undefined) {
    params.append('productid', query.productid) // 你要传给后台的参数值 key/value
  }
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.productname !== '' && query.productname !== null && query.productname !== undefined) {
    params.append('productName', query.productname) // 你要传给后台的参数值 key/value
  }
  if (query.categoryid !== '' && query.categoryid !== null && query.categoryid !== undefined) {
    params.append('categoryid', query.categoryid) // 你要传给后台的参数值 key/value
  }
  if (query.typeid !== '' && query.typeid !== null && query.typeid !== undefined) {
    params.append('typeid', query.typeid) // 你要传给后台的参数值 key/value
  }
  if (query.isactive !== '' && query.isactive !== null && query.isactive !== undefined) {
    params.append('isactive', query.isactive) // 你要传给后台的参数值 key/value
  }
  if (query.supplierId !== '' && query.supplierId !== null && query.supplierId !== undefined) {
    params.append('supplierid', query.supplierId) // 你要传给后台的参数值 key/value
  }
  // if (query.customerId !== '' && query.customerId !== null && query.customerId !== undefined) {
  //   params.append('customerId', query.customerId) // 你要传给后台的参数值 key/value
  // }
  if (query.levelId !== '' && query.levelId !== null && query.levelId !== undefined) {
    params.append('levelId', query.levelId) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/customerProduct/chooseProduct',
    method: 'post',
    data: params
  })
}
