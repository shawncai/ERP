import request from '@/utils/request'

// 查询分类属性
export function searchCategory(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('type', query) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', 1) // 你要传给后台的参数值 key/value
  params.append('pagesize', 9999) // 你要传给后台的参数值 key/value
  return request({
    url: '/supplierCategory/searchCategory',
    method: 'post',
    data: params
  })
}

// 新建供应商
export function create(query, query2) {
  var params = new URLSearchParams()
  if (query.supplierName !== '' && query.supplierName !== null && query.supplierName !== undefined) {
    params.append('supplierName', query.supplierName) // 你要传给后台的参数值 key/value
  }
  if (query.createId !== '' && query.createId !== null && query.createId !== undefined) {
    params.append('createId', query.createId) // 你要传给后台的参数值 key/value
  }
  if (query.payMode !== '' && query.payMode !== null && query.payMode !== undefined) {
    params.append('payMode', query.payMode) // 你要传给后台的参数值 key/value
  }
  if (query.typeId !== '' && query.typeId !== null && query.typeId !== undefined) {
    params.append('typeId', query.typeId) // 你要传给后台的参数值 key/value
  }
  if (query.deliveryMode !== '' && query.deliveryMode !== null && query.deliveryMode !== undefined) {
    params.append('deliveryMode', query.deliveryMode) // 你要传给后台的参数值 key/value
  }
  if (query.supplierShortName !== '' && query.supplierShortName !== null && query.supplierShortName !== undefined) {
    params.append('supplierShortName', query.supplierShortName) // 你要传给后台的参数值 key/value
  }
  if (query.supplierIntroduction !== '' && query.supplierIntroduction !== null && query.supplierIntroduction !== undefined) {
    params.append('supplierIntroduction', query.supplierIntroduction) // 你要传给后台的参数值 key/value
  }
  if (query.countryId !== '' && query.countryId !== null && query.countryId !== undefined) {
    params.append('countryId', query.countryId) // 你要传给后台的参数值 key/value
  }
  if (query.provinceId !== '' && query.provinceId !== null && query.provinceId !== undefined) {
    params.append('provinceId', query.provinceId) // 你要传给后台的参数值 key/value
  }
  if (query.cityId !== '' && query.cityId !== null && query.cityId !== undefined) {
    params.append('cityId', query.cityId) // 你要传给后台的参数值 key/value
  }
  if (query.detailAddress !== '' && query.detailAddress !== null && query.detailAddress !== undefined) {
    params.append('detailAddress', query.detailAddress) // 你要传给后台的参数值 key/value
  }
  if (query.groupId !== '' && query.groupId !== null && query.groupId !== undefined) {
    params.append('groupId', query.groupId) // 你要传给后台的参数值 key/value
  }
  if (query.zipCode !== '' && query.zipCode !== null && query.zipCode !== undefined) {
    params.append('zipCode', query.zipCode) // 你要传给后台的参数值 key/value
  }
  if (query.contactPersonName !== '' && query.contactPersonName !== null && query.contactPersonName !== undefined) {
    params.append('contactPersonName', query.contactPersonName) // 你要传给后台的参数值 key/value
  }
  if (query.contactPersonPhone !== '' && query.contactPersonPhone !== null && query.contactPersonPhone !== undefined) {
    params.append('contactPersonPhone', query.contactPersonPhone) // 你要传给后台的参数值 key/value
  }
  if (query.regionId !== '' && query.regionId !== null && query.regionId !== undefined) {
    params.append('regionId', query.regionId) // 你要传给后台的参数值 key/value
  }
  if (query.giveId !== '' && query.giveId !== null && query.giveId !== undefined) {
    params.append('giveId', query.giveId) // 你要传给后台的参数值 key/value
  }
  if (query.transportId !== '' && query.transportId !== null && query.transportId !== undefined) {
    params.append('transportId', query.transportId) // 你要传给后台的参数值 key/value
  }
  if (query.levelId !== '' && query.levelId !== null && query.levelId !== undefined) {
    params.append('levelId', query.levelId) // 你要传给后台的参数值 key/value
  }
  if (query.isHot !== '' && query.isHot !== null && query.isHot !== undefined) {
    params.append('isHot', query.isHot) // 你要传给后台的参数值 key/value
  }
  if (query.isEffective !== '' && query.isEffective !== null && query.isEffective !== undefined) {
    params.append('isEffective', query.isEffective) // 你要传给后台的参数值 key/value
  }
  if (query.buyerId !== '' && query.buyerId !== null && query.buyerId !== undefined) {
    params.append('buyerId', query.buyerId) // 你要传给后台的参数值 key/value
  }
  if (query.businessScopeIntroduction !== '' && query.businessScopeIntroduction !== null && query.businessScopeIntroduction !== undefined) {
    params.append('businessScopeIntroduction', query.businessScopeIntroduction) // 你要传给后台的参数值 key/value
  }
  if (query.paymentId !== '' && query.paymentId !== null && query.paymentId !== undefined) {
    params.append('paymentId', query.paymentId) // 你要传给后台的参数值 key/value
  }
  if (query.moneyId !== '' && query.moneyId !== null && query.moneyId !== undefined) {
    params.append('moneyId', query.moneyId) // 你要传给后台的参数值 key/value
  }
  if (query.bankName !== '' && query.bankName !== null && query.bankName !== undefined) {
    params.append('bankName', query.bankName) // 你要传给后台的参数值 key/value
  }
  if (query.accountName !== '' && query.accountName !== null && query.accountName !== undefined) {
    params.append('accountName', query.accountName) // 你要传给后台的参数值 key/value
  }
  if (query.account !== '' && query.account !== null && query.account !== undefined) {
    params.append('account', query.account) // 你要传给后台的参数值 key/value
  }
  if (query.establishDate !== '' && query.establishDate !== null && query.establishDate !== undefined) {
    params.append('establishDate', query.establishDate) // 你要传给后台的参数值 key/value
  }
  if (query.legalPerson !== '' && query.legalPerson !== null && query.legalPerson !== undefined) {
    params.append('legalPerson', query.legalPerson) // 你要传给后台的参数值 key/value
  }
  if (query.taxNumber !== '' && query.taxNumber !== null && query.taxNumber !== undefined) {
    params.append('taxNumber', query.taxNumber) // 你要传给后台的参数值 key/value
  }
  if (query.businessLicense !== '' && query.businessLicense !== null && query.businessLicense !== undefined) {
    params.append('businessLicense', query.businessLicense) // 你要传给后台的参数值 key/value
  }
  if (query.companyTypeId !== '' && query.companyTypeId !== null && query.companyTypeId !== undefined) {
    params.append('companyTypeId', query.companyTypeId) // 你要传给后台的参数值 key/value
  }
  if (query.settleMode !== '' && query.settleMode !== null && query.settleMode !== undefined) {
    params.append('settleMode', query.settleMode) // 你要传给后台的参数值 key/value
  }
  params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/supplier/create',
    method: 'post',
    data: params
  })
}

// 供应商列表
export function search(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.settleMode !== '' && query.settleMode !== null && query.settleMode !== undefined) {
    params.append('settleMode', query.settleMode) // 你要传给后台的参数值 key/value
  }
  if (query.deliveryMode !== '' && query.deliveryMode !== null && query.deliveryMode !== undefined) {
    params.append('deliveryMode', query.deliveryMode) // 你要传给后台的参数值 key/value
  }
  if (query.supplierName !== '' && query.supplierName !== null && query.supplierName !== undefined) {
    params.append('supplierName', query.supplierName) // 你要传给后台的参数值 key/value
  }
  if (query.payMode !== '' && query.payMode !== null && query.payMode !== undefined) {
    params.append('payMode', query.payMode) // 你要传给后台的参数值 key/value
  }
  if (query.productCode !== '' && query.productCode !== null && query.productCode !== undefined) {
    params.append('productCode', query.productCode) // 你要传给后台的参数值 key/value
  }
  if (query.typeId !== '' && query.typeId !== null && query.typeId !== undefined) {
    params.append('typeId', query.typeId) // 你要传给后台的参数值 key/value
  }
  if (query.groupId !== '' && query.groupId !== null && query.groupId !== undefined) {
    params.append('groupId', query.groupId) // 你要传给后台的参数值 key/value
  }
  if (query.regionId !== '' && query.regionId !== null && query.regionId !== undefined) {
    params.append('regionId', query.regionId) // 你要传给后台的参数值 key/value
  }
  if (query.levelId !== '' && query.levelId !== null && query.levelId !== undefined) {
    params.append('levelId', query.levelId) // 你要传给后台的参数值 key/value
  }
  if (query.pagenum !== '' && query.pagenum !== null && query.pagenum !== undefined) {
    params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  }
  if (query.pagesize !== '' && query.pagesize !== null && query.pagesize !== undefined) {
    params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/supplier/search',
    method: 'post',
    data: params
  })
}

// 修改供应商
export function update(query, query2) {
  var params = new URLSearchParams()
  if (query.supplierName !== '' && query.supplierName !== null && query.supplierName !== undefined) {
    params.append('supplierName', query.supplierName) // 你要传给后台的参数值 key/value
  }
  if (query.deliveryMode !== '' && query.deliveryMode !== null && query.deliveryMode !== undefined) {
    params.append('deliveryMode', query.deliveryMode) // 你要传给后台的参数值 key/value
  }
  if (query.settleMode !== '' && query.settleMode !== null && query.settleMode !== undefined) {
    params.append('settleMode', query.settleMode) // 你要传给后台的参数值 key/value
  }
  if (query.typeId !== '' && query.typeId !== null && query.typeId !== undefined) {
    params.append('typeId', query.typeId) // 你要传给后台的参数值 key/value
  }
  if (query.payMode !== '' && query.payMode !== null && query.payMode !== undefined) {
    params.append('payMode', query.payMode) // 你要传给后台的参数值 key/value
  }
  if (query.supplierShortName !== '' && query.supplierShortName !== null && query.supplierShortName !== undefined) {
    params.append('supplierShortName', query.supplierShortName) // 你要传给后台的参数值 key/value
  }
  if (query.supplierIntroduction !== '' && query.supplierIntroduction !== null && query.supplierIntroduction !== undefined) {
    params.append('supplierIntroduction', query.supplierIntroduction) // 你要传给后台的参数值 key/value
  }
  if (query.countryid !== '' && query.countryid !== null && query.countryid !== undefined) {
    params.append('countryId', query.countryid) // 你要传给后台的参数值 key/value
  }
  if (query.provinceid !== '' && query.provinceid !== null && query.provinceid !== undefined) {
    params.append('provinceId', query.provinceid) // 你要传给后台的参数值 key/value
  }
  if (query.cityid !== '' && query.cityid !== null && query.cityid !== undefined) {
    params.append('cityId', query.cityid) // 你要传给后台的参数值 key/value
  }
  if (query.detailAddress !== '' && query.detailAddress !== null && query.detailAddress !== undefined) {
    params.append('detailAddress', query.detailAddress) // 你要传给后台的参数值 key/value
  }
  if (query.groupId !== '' && query.groupId !== null && query.groupId !== undefined) {
    params.append('groupId', query.groupId) // 你要传给后台的参数值 key/value
  }
  if (query.groupId !== '' && query.groupId !== null && query.groupId !== undefined) {
    params.append('groupId', query.groupId) // 你要传给后台的参数值 key/value
  }
  if (query.zipCode !== '' && query.zipCode !== null && query.zipCode !== undefined) {
    params.append('zipCode', query.zipCode) // 你要传给后台的参数值 key/value
  }
  if (query.contactPersonName !== '' && query.contactPersonName !== null && query.contactPersonName !== undefined) {
    params.append('contactPersonName', query.contactPersonName) // 你要传给后台的参数值 key/value
  }
  if (query.contactPersonPhone !== '' && query.contactPersonPhone !== null && query.contactPersonPhone !== undefined) {
    params.append('contactPersonPhone', query.contactPersonPhone) // 你要传给后台的参数值 key/value
  }
  if (query.regionId !== '' && query.regionId !== null && query.regionId !== undefined) {
    params.append('regionId', query.regionId) // 你要传给后台的参数值 key/value
  }
  if (query.giveId !== '' && query.giveId !== null && query.giveId !== undefined) {
    params.append('giveId', query.giveId) // 你要传给后台的参数值 key/value
  }
  if (query.transportId !== '' && query.transportId !== null && query.transportId !== undefined) {
    params.append('transportId', query.transportId) // 你要传给后台的参数值 key/value
  }
  if (query.levelId !== '' && query.levelId !== null && query.levelId !== undefined) {
    params.append('levelId', query.levelId) // 你要传给后台的参数值 key/value
  }
  if (query.isHot !== '' && query.isHot !== null && query.isHot !== undefined) {
    params.append('isHot', query.isHot) // 你要传给后台的参数值 key/value
  }
  if (query.isEffective !== '' && query.isEffective !== null && query.isEffective !== undefined) {
    params.append('isEffective', query.isEffective) // 你要传给后台的参数值 key/value
  }
  if (query.buyerId !== '' && query.buyerId !== null && query.buyerId !== undefined) {
    params.append('buyerId', query.buyerId) // 你要传给后台的参数值 key/value
  }
  if (query.businessScopeIntroduction !== '' && query.businessScopeIntroduction !== null && query.businessScopeIntroduction !== undefined) {
    params.append('businessScopeIntroduction', query.businessScopeIntroduction) // 你要传给后台的参数值 key/value
  }
  if (query.paymentId !== '' && query.paymentId !== null && query.paymentId !== undefined) {
    params.append('paymentId', query.paymentId) // 你要传给后台的参数值 key/value
  }
  if (query.moneyId !== '' && query.moneyId !== null && query.moneyId !== undefined) {
    params.append('moneyId', query.moneyId) // 你要传给后台的参数值 key/value
  }
  if (query.bankName !== '' && query.bankName !== null && query.bankName !== undefined) {
    params.append('bankName', query.bankName) // 你要传给后台的参数值 key/value
  }
  if (query.accountName !== '' && query.accountName !== null && query.accountName !== undefined) {
    params.append('accountName', query.accountName) // 你要传给后台的参数值 key/value
  }
  if (query.account !== '' && query.account !== null && query.account !== undefined) {
    params.append('account', query.account) // 你要传给后台的参数值 key/value
  }
  if (query.establishDate !== '' && query.establishDate !== null && query.establishDate !== undefined) {
    params.append('establishDate', query.establishDate) // 你要传给后台的参数值 key/value
  }
  if (query.legalPerson !== '' && query.legalPerson !== null && query.legalPerson !== undefined) {
    params.append('legalPerson', query.legalPerson) // 你要传给后台的参数值 key/value
  }
  if (query.taxNumber !== '' && query.taxNumber !== null && query.taxNumber !== undefined) {
    params.append('taxNumber', query.taxNumber) // 你要传给后台的参数值 key/value
  }
  if (query.businessLicense !== '' && query.businessLicense !== null && query.businessLicense !== undefined) {
    params.append('businessLicense', query.businessLicense) // 你要传给后台的参数值 key/value
  }
  if (query.companyTypeId !== '' && query.companyTypeId !== null && query.companyTypeId !== undefined) {
    params.append('companyTypeId', query.companyTypeId) // 你要传给后台的参数值 key/value
  }
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  params.append('detailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/supplier/update',
    method: 'post',
    data: params
  })
}

// 删除供应商
export function delete2(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/supplier/delete',
    method: 'post',
    data: params
  })
}

// 查询供应商分组
export function searchGroup() {
  return request({
    url: '/supplierGroup/search',
    method: 'post'
  })
}

// 新增供应商分组
export function createGroup(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('groupName', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/supplierGroup/create',
    method: 'post',
    data: params
  })
}

// 删除供应商分组
export function deleteGroup(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('id', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/supplierGroup/delete',
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
    url: '/supplierCategory/searchCategory',
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
    url: '/supplierCategory/addCategory',
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
    url: '/supplierCategory/updateCategory',
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
    url: '/supplierCategory/delateCategory',
    method: 'post',
    data: params
  })
}

// 经销商批量导入
export function manyinsert(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('supplierJson', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/supplierRecommendation/manyinsert',
    method: 'post',
    data: params
  })
}

// 添加供应商惩罚
export function createPunishment(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('Json', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/supplier/createPunishment',
    method: 'post',
    data: params
  })
}
