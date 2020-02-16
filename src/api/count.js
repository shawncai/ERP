import request from '@/utils/request'

// 销售明细表
export function saleDetailCount2(query) {
  var params = new URLSearchParams()
  if (query.judgeStat !== '' && query.judgeStat !== null && query.judgeStat !== undefined) {
    params.append('judgeStat ', query.judgeStat) // 你要传给后台的参数值 key/value
  }
  if (query.receiptStat !== '' && query.receiptStat !== null && query.receiptStat !== undefined) {
    params.append('receiptStat', query.receiptStat) // 你要传给后台的参数值 key/value
  }
  if (query.saleType !== '' && query.saleType !== null && query.saleType !== undefined) {
    params.append('saleType ', query.saleType) // 你要传给后台的参数值 key/value
  }
  if (query.productCategory !== '' && query.productCategory !== null && query.productCategory !== undefined) {
    params.append('productCategory ', query.productCategory) // 你要传给后台的参数值 key/value
  }
  if (query.outNumber !== '' && query.outNumber !== null && query.outNumber !== undefined) {
    params.append('outNumber ', query.outNumber) // 你要传给后台的参数值 key/value
  }
  if (query.customerName !== '' && query.customerName !== null && query.customerName !== undefined) {
    params.append('customerName ', query.customerName) // 你要传给后台的参数值 key/value
  }
  if (query.quantity !== '' && query.quantity !== null && query.quantity !== undefined) {
    params.append('quantity ', query.quantity) // 你要传给后台的参数值 key/value
  }
  if (query.quantityType !== '' && query.quantityType !== null && query.quantityType !== undefined) {
    params.append('quantityType ', query.quantityType) // 你要传给后台的参数值 key/value
  }
  if (query.thisMoney !== '' && query.thisMoney !== null && query.thisMoney !== undefined) {
    params.append('thisMoney ', query.thisMoney) // 你要传给后台的参数值 key/value
  }
  if (query.thisType !== '' && query.thisType !== null && query.thisType !== undefined) {
    params.append('thisType ', query.thisType) // 你要传给后台的参数值 key/value
  }
  if (query.firstMoney !== '' && query.firstMoney !== null && query.firstMoney !== undefined) {
    params.append('firstMoney ', query.firstMoney) // 你要传给后台的参数值 key/value
  }
  if (query.firstType !== '' && query.firstType !== null && query.firstType !== undefined) {
    params.append('firstType ', query.firstType) // 你要传给后台的参数值 key/value
  }
  if (query.paidMoney !== '' && query.paidMoney !== null && query.paidMoney !== undefined) {
    params.append('paidMoney ', query.paidMoney) // 你要传给后台的参数值 key/value
  }
  if (query.paidType !== '' && query.paidType !== null && query.paidType !== undefined) {
    params.append('paidType ', query.paidType) // 你要传给后台的参数值 key/value
  }
  if (query.unPaidMoney !== '' && query.unPaidMoney !== null && query.unPaidMoney !== undefined) {
    params.append('unPaidMoney ', query.unPaidMoney) // 你要传给后台的参数值 key/value
  }
  if (query.unPaidType !== '' && query.unPaidType !== null && query.unPaidType !== undefined) {
    params.append('unPaidType ', query.unPaidType) // 你要传给后台的参数值 key/value
  }
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId ', query.createPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.saleRepositoryId !== '' && query.saleRepositoryId !== null && query.saleRepositoryId !== undefined) {
    params.append('saleRepositoryId ', query.saleRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.invoiceNumber !== '' && query.invoiceNumber !== null && query.invoiceNumber !== undefined) {
    params.append('invoiceNumber ', query.invoiceNumber) // 你要传给后台的参数值 key/value
  }
  if (query.summary !== '' && query.summary !== null && query.summary !== undefined) {
    params.append('summary ', query.summary) // 你要传给后台的参数值 key/value
  }
  if (query.carCode !== '' && query.carCode !== null && query.carCode !== undefined) {
    params.append('carCode ', query.carCode) // 你要传给后台的参数值 key/value
  }
  if (query.motorCode !== '' && query.motorCode !== null && query.motorCode !== undefined) {
    params.append('motorCode ', query.motorCode) // 你要传给后台的参数值 key/value
  }
  if (query.batteryCode !== '' && query.batteryCode !== null && query.batteryCode !== undefined) {
    params.append('batteryCode ', query.batteryCode) // 你要传给后台的参数值 key/value
  }
  if (query.shouldMoney !== '' && query.shouldMoney !== null && query.shouldMoney !== undefined) {
    params.append('shouldMoney ', query.shouldMoney) // 你要传给后台的参数值 key/value
  }
  if (query.shouldType !== '' && query.shouldType !== null && query.shouldType !== undefined) {
    params.append('shouldType ', query.shouldType) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime ', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime ', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId ', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds ', query.regionIds) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/SaleReport/saleDetailCount',
    method: 'post',
    data: params
  })
}

// 支出汇总接口
export function expensesInfo(query) {
  var params = new URLSearchParams()
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId ', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/balance/expensesInfo',
    method: 'post',
    data: params
  })
}

export function collectAndPay(query) {
  var params = new URLSearchParams()
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId ', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/financecount/collectAndPay',
    method: 'post',
    data: params
  })
}

export function collectAndPayDetail(query) {
  var params = new URLSearchParams()
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId', query.createPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.judgePersonId !== '' && query.judgePersonId !== null && query.judgePersonId !== undefined) {
    params.append('judgePersonId', query.judgePersonId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/financecount/collectAndPayDetail',
    method: 'post',
    data: params
  })
}

export function stockOrderCount(query) {
  var params = new URLSearchParams()
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/stockcount/stockOrderCount',
    method: 'post',
    data: params
  })
}

export function stockDetailCount(query) {
  var params = new URLSearchParams()
  if (query.supplierId !== '' && query.supplierId !== null && query.supplierId !== undefined) {
    params.append('supplierId', query.supplierId) // 你要传给后台的参数值 key/value
  }
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productName', query.productName) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/stockcount/stockDetailCount',
    method: 'post',
    data: params
  })
}

export function stockBillCount(query) {
  var params = new URLSearchParams()
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/stockcount/stockBillCount',
    method: 'post',
    data: params
  })
}

export function stockBillList(query) {
  var params = new URLSearchParams()
  if (query.categoryId !== '' && query.categoryId !== null && query.categoryId !== undefined) {
    params.append('categoryId', query.categoryId) // 你要传给后台的参数值 key/value
  }
  if (query.brandId !== '' && query.brandId !== null && query.brandId !== undefined) {
    params.append('brandId', query.brandId) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/stockcount/stockBillList',
    method: 'post',
    data: params
  })
}

export function stockTrackList(query) {
  var params = new URLSearchParams()
  if (query.supplierId !== '' && query.supplierId !== null && query.supplierId !== undefined) {
    params.append('supplierId', query.supplierId) // 你要传给后台的参数值 key/value
  }
  if (query.stockPersonId !== '' && query.stockPersonId !== null && query.stockPersonId !== undefined) {
    params.append('stockPersonId', query.stockPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productName', query.productName) // 你要传给后台的参数值 key/value
  }
  if (query.orderNumber !== '' && query.orderNumber !== null && query.orderNumber !== undefined) {
    params.append('orderNumber', query.orderNumber) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/stockcount/stockTrackList',
    method: 'post',
    data: params
  })
}

export function supplierPunishmentCount(query) {
  var params = new URLSearchParams()
  if (query.supplierName !== '' && query.supplierName !== null && query.supplierName !== undefined) {
    params.append('supplierName', query.supplierName) // 你要传给后台的参数值 key/value
  }
  if (query.contactName !== '' && query.contactName !== null && query.contactName !== undefined) {
    params.append('contactName', query.contactName) // 你要传给后台的参数值 key/value
  }
  if (query.contactPhone !== '' && query.contactPhone !== null && query.contactPhone !== undefined) {
    params.append('contactPhone', query.contactPhone) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/stockcount/supplierPunishmentCount',
    method: 'post',
    data: params
  })
}

export function productStockFluid(query) {
  var params = new URLSearchParams()
  if (query.number !== '' && query.number !== null && query.number !== undefined) {
    params.append('number', query.number) // 你要传给后台的参数值 key/value
  }
  if (query.receiptType !== '' && query.receiptType !== null && query.receiptType !== undefined) {
    params.append('receiptType', query.receiptType) // 你要传给后台的参数值 key/value
  }
  if (query.supplierName !== '' && query.supplierName !== null && query.supplierName !== undefined) {
    params.append('supplierName', query.supplierName) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/stockcount/productStockFluid',
    method: 'post',
    data: params
  })
}

export function stockpricelist(query) {
  var params = new URLSearchParams()
  if (query.productCode !== '' && query.productCode !== null && query.productCode !== undefined) {
    params.append('productCode', query.productCode) // 你要传给后台的参数值 key/value
  }
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productName', query.productName) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/stockquery/stockpricelist',
    method: 'post',
    data: params
  })
}

export function stockOrderExecute(query) {
  var params = new URLSearchParams()
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productName', query.productName) // 你要传给后台的参数值 key/value
  }
  if (query.stockType !== '' && query.stockType !== null && query.stockType !== undefined) {
    params.append('stockType', query.stockType) // 你要传给后台的参数值 key/value
  }
  if (query.handlePersonId !== '' && query.handlePersonId !== null && query.handlePersonId !== undefined) {
    params.append('handlePersonId', query.handlePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.supplierId !== '' && query.supplierId !== null && query.supplierId !== undefined) {
    params.append('supplierId', query.supplierId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/stockcount/stockOrderExecute',
    method: 'post',
    data: params
  })
}

export function inventoryCollect(query) {
  var params = new URLSearchParams()
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.categoryId !== '' && query.categoryId !== null && query.categoryId !== undefined) {
    params.append('categoryId', query.categoryId) // 你要传给后台的参数值 key/value
  }
  if (query.typeId !== '' && query.typeId !== null && query.typeId !== undefined) {
    params.append('typeId', query.typeId) // 你要传给后台的参数值 key/value
  }
  if (query.brand !== '' && query.brand !== null && query.brand !== undefined) {
    params.append('brand', query.brand) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/countinven/inventoryCollect',
    method: 'post',
    data: params
  })
}

export function moveDetailList(query) {
  var params = new URLSearchParams()
  if (query.outRepositoryId !== '' && query.outRepositoryId !== null && query.outRepositoryId !== undefined) {
    params.append('outRepositoryId', query.outRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.enterRepositoryId !== '' && query.enterRepositoryId !== null && query.enterRepositoryId !== undefined) {
    params.append('enterRepositoryId', query.enterRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.categoryId !== '' && query.categoryId !== null && query.categoryId !== undefined) {
    params.append('categoryId', query.categoryId) // 你要传给后台的参数值 key/value
  }
  if (query.date !== '' && query.date !== null && query.date !== undefined) {
    params.append('date', query.date) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/countinven/moveDetailList',
    method: 'post',
    data: params
  })
}

export function inventoryFluid(query) {
  var params = new URLSearchParams()
  if (query.receiptType !== '' && query.receiptType !== null && query.receiptType !== undefined) {
    params.append('receiptType', query.receiptType) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.receiptNumber !== '' && query.receiptNumber !== null && query.receiptNumber !== undefined) {
    params.append('receiptNumber', query.receiptNumber) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/countinven/inventoryFluid',
    method: 'post',
    data: params
  })
}

export function productSendAndReceive(query) {
  var params = new URLSearchParams()
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.date !== '' && query.date !== null && query.date !== undefined) {
    params.append('date', query.date) // 你要传给后台的参数值 key/value
  }
  if (query.typeId !== '' && query.typeId !== null && query.typeId !== undefined) {
    params.append('typeId', query.typeId) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/countinven/productSendAndReceive',
    method: 'post',
    data: params
  })
}

export function inventorydetaillist(query) {
  var params = new URLSearchParams()
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.brand !== '' && query.brand !== null && query.brand !== undefined) {
    params.append('brand', query.brand) // 你要传给后台的参数值 key/value
  }
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productName', query.productName) // 你要传给后台的参数值 key/value
  }
  if (query.categoryId !== '' && query.categoryId !== null && query.categoryId !== undefined) {
    params.append('categoryId', query.categoryId) // 你要传给后台的参数值 key/value
  }
  if (query.typeId !== '' && query.typeId !== null && query.typeId !== undefined) {
    params.append('typeId', query.typeId) // 你要传给后台的参数值 key/value
  }
  if (query.locationId !== '' && query.locationId !== null && query.locationId !== undefined) {
    params.append('locationId', query.locationId) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/countinven/inventorydetaillist',
    method: 'post',
    data: params
  })
}

export function inventorychangelist(query) {
  var params = new URLSearchParams()
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.date !== '' && query.date !== null && query.date !== undefined) {
    params.append('date', query.date) // 你要传给后台的参数值 key/value
  }
  if (query.typeId !== '' && query.typeId !== null && query.typeId !== undefined) {
    params.append('typeId', query.typeId) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/countinven/inventorychangelist',
    method: 'post',
    data: params
  })
}

export function searchSaleOrderReport(query) {
  var params = new URLSearchParams()
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.targerId !== '' && query.targerId !== null && query.targerId !== undefined) {
    params.append('targerId', query.targerId) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  if (query.customerType !== '' && query.customerType !== null && query.customerType !== undefined) {
    params.append('customerType', query.customerType) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/SaleReport/searchSaleOrderReport',
    method: 'post',
    data: params
  })
}

export function searchSaleOrderDetailReport(query) {
  var params = new URLSearchParams()
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.productCategory !== '' && query.productCategory !== null && query.productCategory !== undefined) {
    params.append('productCategory', query.productCategory) // 你要传给后台的参数值 key/value
  }
  if (query.productType !== '' && query.productType !== null && query.productType !== undefined) {
    params.append('productType', query.productType) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/SaleReport/searchSaleOrderDetailReport',
    method: 'post',
    data: params
  })
}

export function searchSaleReport(query) {
  var params = new URLSearchParams()
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.targerId !== '' && query.targerId !== null && query.targerId !== undefined) {
    params.append('targerId', query.targerId) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  if (query.customerType !== '' && query.customerType !== null && query.customerType !== undefined) {
    params.append('customerType', query.customerType) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/SaleReport/searchSaleReport',
    method: 'post',
    data: params
  })
}

export function saleBillListDetail(query) {
  var params = new URLSearchParams()
  if (query.regionId !== '' && query.regionId !== null && query.regionId !== undefined) {
    params.append('regionId', query.regionId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.productCode !== '' && query.productCode !== null && query.productCode !== undefined) {
    params.append('productCode', query.productCode) // 你要传给后台的参数值 key/value
  }
  if (query.saleType !== '' && query.saleType !== null && query.saleType !== undefined) {
    params.append('saleType', query.saleType) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/SaleReport/saleBillListDetail',
    method: 'post',
    data: params
  })
}

export function saleBillList(query) {
  var params = new URLSearchParams()
  if (query.regionId !== '' && query.regionId !== null && query.regionId !== undefined) {
    params.append('regionId', query.regionId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.productCategory !== '' && query.productCategory !== null && query.productCategory !== undefined) {
    params.append('productCategory', query.productCategory) // 你要传给后台的参数值 key/value
  }
  if (query.productType !== '' && query.productType !== null && query.productType !== undefined) {
    params.append('productType', query.productType) // 你要传给后台的参数值 key/value
  }
  if (query.saleType !== '' && query.saleType !== null && query.saleType !== undefined) {
    params.append('saleType', query.saleType) // 你要传给后台的参数值 key/value
  }
  if (query.carCode !== '' && query.carCode !== null && query.carCode !== undefined) {
    params.append('carCode', query.carCode) // 你要传给后台的参数值 key/value
  }
  if (query.motorCode !== '' && query.motorCode !== null && query.motorCode !== undefined) {
    params.append('motorCode', query.motorCode) // 你要传给后台的参数值 key/value
  }
  if (query.batteryCode !== '' && query.batteryCode !== null && query.batteryCode !== undefined) {
    params.append('batteryCode', query.batteryCode) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/SaleReport/saleBillList',
    method: 'post',
    data: params
  })
}

export function saleBillDay(query) {
  var params = new URLSearchParams()
  if (query.createDate !== '' && query.createDate !== null && query.createDate !== undefined) {
    params.append('createDate', query.createDate) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.productCategory !== '' && query.productCategory !== null && query.productCategory !== undefined) {
    params.append('productCategory', query.productCategory) // 你要传给后台的参数值 key/value
  }
  if (query.brand !== '' && query.brand !== null && query.brand !== undefined) {
    params.append('brand', query.brand) // 你要传给后台的参数值 key/value
  }
  if (query.saleType !== '' && query.saleType !== null && query.saleType !== undefined) {
    params.append('saleType', query.saleType) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/SaleReport/saleBillDay',
    method: 'post',
    data: params
  })
}

export function saleReceipt(query) {
  var params = new URLSearchParams()
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.countType !== '' && query.countType !== null && query.countType !== undefined) {
    params.append('countType', query.countType) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.saleType !== '' && query.saleType !== null && query.saleType !== undefined) {
    params.append('saleType', query.saleType) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/SaleReport/saleReceipt',
    method: 'post',
    data: params
  })
}

export function saleFlow(query) {
  var params = new URLSearchParams()
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.productCode !== '' && query.productCode !== null && query.productCode !== undefined) {
    params.append('productCode', query.productCode) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/SaleReport/saleFlow',
    method: 'post',
    data: params
  })
}

export function empCommission(query) {
  var params = new URLSearchParams()
  if (query.empId !== '' && query.empId !== null && query.empId !== undefined) {
    params.append('empId', query.empId) // 你要传给后台的参数值 key/value
  }
  if (query.jobNumber !== '' && query.jobNumber !== null && query.jobNumber !== undefined) {
    params.append('jobNumber', query.jobNumber) // 你要传给后台的参数值 key/value
  }
  if (query.date !== '' && query.date !== null && query.date !== undefined) {
    params.append('date', query.date) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/SaleReport/empCommission',
    method: 'post',
    data: params
  })
}

export function supplierSale(query) {
  var params = new URLSearchParams()
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.productCode !== '' && query.productCode !== null && query.productCode !== undefined) {
    params.append('productCode', query.productCode) // 你要传给后台的参数值 key/value
  }
  if (query.supplierId !== '' && query.supplierId !== null && query.supplierId !== undefined) {
    params.append('supplierId', query.supplierId) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/SaleReport/supplierSale',
    method: 'post',
    data: params
  })
}

export function saleFluid(query) {
  var params = new URLSearchParams()
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/SaleReport/saleFluid',
    method: 'post',
    data: params
  })
}

export function saleGiftList(query) {
  var params = new URLSearchParams()
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/SaleReport/saleGiftList',
    method: 'post',
    data: params
  })
}

export function giftDetailList(query) {
  var params = new URLSearchParams()
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/SaleReport/giftDetailList',
    method: 'post',
    data: params
  })
}

export function shouldPayCount(query) {
  var params = new URLSearchParams()
  if (query.supplierId !== '' && query.supplierId !== null && query.supplierId !== undefined) {
    params.append('supplierId', query.supplierId) // 你要传给后台的参数值 key/value
  }
  if (query.dateList !== '' && query.dateList !== null && query.dateList !== undefined) {
    params.append('dateList', query.dateList) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/financecount/shouldPayCount',
    method: 'post',
    data: params
  })
}

export function shouldPayDetail(query) {
  var params = new URLSearchParams()
  if (query.supplierId !== '' && query.supplierId !== null && query.supplierId !== undefined) {
    params.append('supplierId', query.supplierId) // 你要传给后台的参数值 key/value
  }
  if (query.dateList !== '' && query.dateList !== null && query.dateList !== undefined) {
    params.append('dateList', query.dateList) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/financecount/shouldPayDetail',
    method: 'post',
    data: params
  })
}

export function accessStatus(query) {
  var params = new URLSearchParams()
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.taskNumber !== '' && query.taskNumber !== null && query.taskNumber !== undefined) {
    params.append('taskNumber', query.taskNumber) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/countProduce/accessStatus',
    method: 'post',
    data: params
  })
}

export function failReasonCount(query) {
  var params = new URLSearchParams()
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/countProduce/failReasonCount',
    method: 'post',
    data: params
  })
}

export function produceFailCount(query) {
  var params = new URLSearchParams()
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.productCode !== '' && query.productCode !== null && query.productCode !== undefined) {
    params.append('productCode', query.productCode) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/countProduce/produceFailCount',
    method: 'post',
    data: params
  })
}

export function installmentComplete(query) {
  var params = new URLSearchParams()
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  if (query.time !== '' && query.time !== null && query.time !== undefined) {
    params.append('time', query.time) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/installmentCount/installmentComplete',
    method: 'post',
    data: params
  })
}

export function recoveryCarDetail(query) {
  var params = new URLSearchParams()
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.receivePersonId !== '' && query.receivePersonId !== null && query.receivePersonId !== undefined) {
    params.append('receivePersonId', query.receivePersonId) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/installmentCount/recoveryCarDetail',
    method: 'post',
    data: params
  })
}

export function installmentPayList(query) {
  var params = new URLSearchParams()
  if (query.carCode !== '' && query.carCode !== null && query.carCode !== undefined) {
    params.append('carCode', query.carCode) // 你要传给后台的参数值 key/value
  }
  if (query.batteryCode !== '' && query.batteryCode !== null && query.batteryCode !== undefined) {
    params.append('batteryCode', query.batteryCode) // 你要传给后台的参数值 key/value
  }
  if (query.motorCode !== '' && query.motorCode !== null && query.motorCode !== undefined) {
    params.append('motorCode', query.motorCode) // 你要传给后台的参数值 key/value
  }
  if (query.typeId !== '' && query.typeId !== null && query.typeId !== undefined) {
    params.append('typeId', query.typeId) // 你要传给后台的参数值 key/value
  }
  if (query.customerId !== '' && query.customerId !== null && query.customerId !== undefined) {
    params.append('customerId', query.customerId) // 你要传给后台的参数值 key/value
  }
  if (query.customerName !== '' && query.customerName !== null && query.customerName !== undefined) {
    params.append('customerName', query.customerName) // 你要传给后台的参数值 key/value
  }
  if (query.customerPhone !== '' && query.customerPhone !== null && query.customerPhone !== undefined) {
    params.append('customerPhone', query.customerPhone) // 你要传给后台的参数值 key/value
  }
  if (query.saleRepositoryId !== '' && query.saleRepositoryId !== null && query.saleRepositoryId !== undefined) {
    params.append('saleRepositoryId', query.saleRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/installmentCount/installmentPayList',
    method: 'post',
    data: params
  })
}

export function installmentAnalyze(query) {
  var params = new URLSearchParams()
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.date !== '' && query.date !== null && query.date !== undefined) {
    params.append('date', query.date) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.pageNum !== '' && query.pageNum !== null && query.pageNum !== undefined) {
    params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  }
  if (query.pageSize !== '' && query.pageSize !== null && query.pageSize !== undefined) {
    params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/installmentCount/installmentAnalyze',
    method: 'post',
    data: params
  })
}
