import request from '@/utils/request'
// 特殊分类属性列表
export function searchEmpCategory2(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null) {
    params.append('type', query) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', 1) // 你要传给后台的参数值 key/value
  params.append('pagesize', 99999) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/product/searchProCategory',
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
    url: '/erp/product/searchProCategory',
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
  if (query.code !== '' && query.code !== null) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/product/addProCategory',
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
    url: '/erp/product/updateProCategory',
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
    url: '/erp/product/delateProCategory',
    method: 'post',
    data: params
  })
}

// 新增商品
export function createnewproduct(query) {
  var params = new URLSearchParams()
  if (query.caigoumeasurement !== '' && query.caigoumeasurement !== null && query.caigoumeasurement !== undefined) {
    params.append('caigoumeasurement', query.caigoumeasurement) // 你要传给后台的参数值 key/value
  }
  if (query.unitGroupId !== '' && query.unitGroupId !== null && query.unitGroupId !== undefined) {
    params.append('unitGroupId', query.unitGroupId) // 你要传给后台的参数值 key/value
  }
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.effectiveDay !== '' && query.effectiveDay !== null && query.effectiveDay !== undefined) {
    params.append('effectiveDay', query.effectiveDay) // 你要传给后台的参数值 key/value
  }
  if (query.barcode !== '' && query.barcode !== null && query.barcode !== undefined) {
    params.append('barcode', query.barcode) // 你要传给后台的参数值 key/value
  }
  if (query.productname !== '' && query.productname !== null && query.productname !== undefined) {
    params.append('productname', query.productname) // 你要传给后台的参数值 key/value
  }
  if (query.typeid !== '' && query.typeid !== null && query.typeid !== undefined) {
    params.append('typeid', query.typeid) // 你要传给后台的参数值 key/value
  }
  if (query.categoryid !== '' && query.categoryid !== null && query.categoryid !== undefined) {
    params.append('categoryid', query.categoryid) // 你要传给后台的参数值 key/value
  }
  if (query.colorId !== '' && query.colorId !== null && query.colorId !== undefined) {
    params.append('colorId', query.colorId) // 你要传给后台的参数值 key/value
  }
  if (query.brand !== '' && query.brand !== null && query.brand !== undefined) {
    params.append('brand', query.brand) // 你要传给后台的参数值 key/value
  }
  if (query.kpigrade !== '' && query.kpigrade !== null && query.kpigrade !== undefined) {
    params.append('kpigrade', query.kpigrade) // 你要传给后台的参数值 key/value
  }
  if (query.point !== '' && query.point !== null && query.point !== undefined) {
    params.append('point', query.point) // 你要传给后台的参数值 key/value
  }
  if (query.zhibaoqi !== '' && query.zhibaoqi !== null && query.zhibaoqi !== undefined) {
    params.append('zhibaoqi', query.zhibaoqi) // 你要传给后台的参数值 key/value
  }
  if (query.weight !== '' && query.weight !== null && query.weight !== undefined) {
    params.append('weight', query.weight) // 你要传给后台的参数值 key/value
  }
  if (query.volume !== '' && query.volume !== null && query.volume !== undefined) {
    params.append('volume', query.volume) // 你要传给后台的参数值 key/value
  }
  if (query.costprice !== '' && query.costprice !== null && query.costprice !== undefined) {
    params.append('costprice', query.costprice) // 你要传给后台的参数值 key/value
  }
  if (query.tradeprice !== '' && query.tradeprice !== null && query.tradeprice !== undefined) {
    params.append('tradeprice', query.tradeprice) // 你要传给后台的参数值 key/value
  }
  if (query.saleprice !== '' && query.saleprice !== null && query.saleprice !== undefined) {
    params.append('saleprice', query.saleprice) // 你要传给后台的参数值 key/value
  }
  if (query.purchaseprice !== '' && query.purchaseprice !== null && query.purchaseprice !== undefined) {
    params.append('purchaseprice', query.purchaseprice) // 你要传给后台的参数值 key/value
  }
  if (query.lowerprice !== '' && query.lowerprice !== null && query.lowerprice !== undefined) {
    params.append('lowerprice', query.lowerprice) // 你要传给后台的参数值 key/value
  }
  if (query.supplierid !== '' && query.supplierid !== null && query.supplierid !== undefined) {
    params.append('supplierid', query.supplierid) // 你要传给后台的参数值 key/value
  }
  if (query.createid !== '' && query.createid !== null && query.createid !== undefined) {
    params.append('createid', query.createid) // 你要传给后台的参数值 key/value
  }
  if (query.createid !== '' && query.createid !== null && query.createid !== undefined) {
    params.append('createid', query.createid) // 你要传给后台的参数值 key/value
  }
  if (query.level !== '' && query.level !== null && query.level !== undefined) {
    params.append('level', query.level) // 你要传给后台的参数值 key/value
  }
  if (query.purchasemeasurement !== '' && query.purchasemeasurement !== null && query.purchasemeasurement !== undefined) {
    params.append('purchasemeasurement', query.purchasemeasurement) // 你要传给后台的参数值 key/value
  }
  if (query.salemeasurement !== '' && query.salemeasurement !== null && query.salemeasurement !== undefined) {
    params.append('salemeasurement', query.salemeasurement) // 你要传给后台的参数值 key/value
  }
  if (query.stockmeasurement !== '' && query.stockmeasurement !== null && query.stockmeasurement !== undefined) {
    params.append('stockmeasurement', query.stockmeasurement) // 你要传给后台的参数值 key/value
  }
  if (query.producemeasurement !== '' && query.producemeasurement !== null && query.producemeasurement !== undefined) {
    params.append('producemeasurement', query.producemeasurement) // 你要传给后台的参数值 key/value
  }
  if (query.source !== '' && query.source !== null && query.source !== undefined) {
    params.append('source', query.source) // 你要传给后台的参数值 key/value
  }
  if (query.valuation !== '' && query.valuation !== null && query.valuation !== undefined) {
    params.append('valuation', query.valuation) // 你要传给后台的参数值 key/value
  }
  if (query.isactive !== '' && query.isactive !== null && query.isactive !== undefined) {
    params.append('isactive', query.isactive) // 你要传给后台的参数值 key/value
  }
  if (query.picids !== '' && query.picids !== null && query.picids !== undefined) {
    params.append('picids', query.picids) // 你要传给后台的参数值 key/value
  }
  if (query.detailpicid !== '' && query.detailpicid !== null && query.detailpicid !== undefined) {
    params.append('detailpicid', query.detailpicid) // 你要传给后台的参数值 key/value
  }
  if (query.memberprice !== '' && query.memberprice !== null && query.memberprice !== undefined) {
    params.append('memberprice', query.memberprice) // 你要传给后台的参数值 key/value
  }
  if (query.isBatch !== '' && query.isBatch !== null && query.isBatch !== undefined) {
    params.append('isBatch', query.isBatch) // 你要传给后台的参数值 key/value
  }
  if (query.versionId !== '' && query.versionId !== null && query.versionId !== undefined) {
    params.append('versionId', query.versionId) // 你要传给后台的参数值 key/value
  }
  if (query.diameterId !== '' && query.diameterId !== null && query.diameterId !== undefined) {
    params.append('diameterId', query.diameterId) // 你要传给后台的参数值 key/value
  }
  if (query.lengthLevelId !== '' && query.lengthLevelId !== null && query.lengthLevelId !== undefined) {
    params.append('lengthLevelId', query.lengthLevelId) // 你要传给后台的参数值 key/value
  }
  if (query.faceId !== '' && query.faceId !== null && query.faceId !== undefined) {
    params.append('faceId', query.faceId) // 你要传给后台的参数值 key/value
  }
  if (query.performanceLevelId !== '' && query.performanceLevelId !== null && query.performanceLevelId !== undefined) {
    params.append('performanceLevelId', query.performanceLevelId) // 你要传给后台的参数值 key/value
  }
  if (query.disposeId !== '' && query.disposeId !== null && query.disposeId !== undefined) {
    params.append('disposeId', query.disposeId) // 你要传给后台的参数值 key/value
  }
  if (query.categoryCode !== '' && query.categoryCode !== null && query.categoryCode !== undefined) {
    params.append('categoryCode', query.categoryCode) // 你要传给后台的参数值 key/value
  }
  if (query.typeCode !== '' && query.typeCode !== null && query.typeCode !== undefined) {
    params.append('typeCode', query.typeCode) // 你要传给后台的参数值 key/value
  }
  if (query.colorCode !== '' && query.colorCode !== null && query.colorCode !== undefined) {
    params.append('colorCode', query.colorCode) // 你要传给后台的参数值 key/value
  }
  if (query.versionCode !== '' && query.versionCode !== null && query.versionCode !== undefined) {
    params.append('versionCode', query.versionCode) // 你要传给后台的参数值 key/value
  }
  if (query.diameterCode !== '' && query.diameterCode !== null && query.diameterCode !== undefined) {
    params.append('diameterCode', query.diameterCode) // 你要传给后台的参数值 key/value
  }
  if (query.lengthCode !== '' && query.lengthCode !== null && query.lengthCode !== undefined) {
    params.append('lengthCode', query.lengthCode) // 你要传给后台的参数值 key/value
  }
  if (query.faceCode !== '' && query.faceCode !== null && query.faceCode !== undefined) {
    params.append('faceCode', query.faceCode) // 你要传给后台的参数值 key/value
  }
  if (query.performanceLevelCode !== '' && query.performanceLevelCode !== null && query.performanceLevelCode !== undefined) {
    params.append('performanceLevelCode', query.performanceLevelCode) // 你要传给后台的参数值 key/value
  }
  if (query.disposeCode !== '' && query.disposeCode !== null && query.disposeCode !== undefined) {
    params.append('disposeCode', query.disposeCode) // 你要传给后台的参数值 key/value
  }
  if (query.stockCircle !== '' && query.stockCircle !== null && query.stockCircle !== undefined) {
    params.append('stockCircle', query.stockCircle) // 你要传给后台的参数值 key/value
  }
  if (query.produceAbility !== '' && query.produceAbility !== null && query.produceAbility !== undefined) {
    params.append('produceAbility', query.produceAbility) // 你要传给后台的参数值 key/value
  }
  if (query.workCenterId !== '' && query.workCenterId !== null && query.workCenterId !== undefined) {
    params.append('workCenterId', query.workCenterId) // 你要传给后台的参数值 key/value
  }
  if (query.careCircle !== '' && query.careCircle !== null && query.careCircle !== undefined) {
    params.append('careCircle', query.careCircle) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/product/createnewproduct',
    method: 'post',
    data: params
  })
}

// 商品详情
export function productDetail(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('productId', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/product/productDetail',
    method: 'post',
    data: params
  })
}

// 库存详情
export function productInventory(query) {
  var params = new URLSearchParams()
  if (query.productId !== '' && query.productId !== null && query.productId !== undefined) {
    params.append('productId', query.productId) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/product/productInventory',
    method: 'post',
    data: params
  })
}

// 采购退货详情
export function productStockRetreat(query) {
  var params = new URLSearchParams()
  if (query.productId !== '' && query.productId !== null && query.productId !== undefined) {
    params.append('productId', query.productId) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
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
  params.append('pageNum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/product/productStockRetreat',
    method: 'post',
    data: params
  })
}

// 销售退货详情
export function productSaleReturn(query) {
  var params = new URLSearchParams()
  if (query.productId !== '' && query.productId !== null && query.productId !== undefined) {
    params.append('productId', query.productId) // 你要传给后台的参数值 key/value
  }
  if (query.customerId !== '' && query.customerId !== null && query.customerId !== undefined) {
    params.append('customerId', query.customerId) // 你要传给后台的参数值 key/value
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
  params.append('pageNum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/product/productSaleReturn',
    method: 'post',
    data: params
  })
}

// 采购信息详情
export function productStockInfo(query) {
  var params = new URLSearchParams()
  if (query.productId !== '' && query.productId !== null && query.productId !== undefined) {
    params.append('productId', query.productId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/product/productStockInfo',
    method: 'post',
    data: params
  })
}

// 商品列表
export function productlist(query) {
  var params = new URLSearchParams()
  if (query.productid !== '' && query.productid !== null && query.productid !== undefined) {
    params.append('productid', query.productid) // 你要传给后台的参数值 key/value
  }
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.productname !== '' && query.productname !== null && query.productname !== undefined) {
    params.append('productname', query.productname) // 你要传给后台的参数值 key/value
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
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/product/productlist',
    method: 'post',
    data: params
  })
}

// 删除商品
export function deleteproduct(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('productids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/product/deleteproduct',
    method: 'post',
    data: params
  })
}

// 修改商品
export function editproduct(query) {
  var params = new URLSearchParams()
  if (query.caigoumeasurement !== '' && query.caigoumeasurement !== null && query.caigoumeasurement !== undefined) {
    params.append('caigoumeasurement', query.caigoumeasurement) // 你要传给后台的参数值 key/value
  }
  if (query.unitGroupId !== '' && query.unitGroupId !== null && query.unitGroupId !== undefined) {
    params.append('unitGroupId', query.unitGroupId) // 你要传给后台的参数值 key/value
  }
  if (query.productid !== '' && query.productid !== null && query.productid !== undefined) {
    params.append('productid', query.productid) // 你要传给后台的参数值 key/value
  }
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productname', query.productName) // 你要传给后台的参数值 key/value
  }
  if (query.isBatch !== '' && query.isBatch !== null && query.isBatch !== undefined) {
    params.append('isBatch', query.isBatch) // 你要传给后台的参数值 key/value
  }
  if (query.effectiveDay !== '' && query.effectiveDay !== null && query.effectiveDay !== undefined) {
    params.append('effectiveDay', query.effectiveDay) // 你要传给后台的参数值 key/value
  }
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('productid', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.kpiGrade !== '' && query.kpiGrade !== null && query.kpiGrade !== undefined) {
    params.append('kpigrade', query.kpiGrade) // 你要传给后台的参数值 key/value
  }
  if (query.point !== '' && query.point !== null && query.point !== undefined) {
    params.append('point', query.point) // 你要传给后台的参数值 key/value
  }
  if (query.zhiBaoQi !== '' && query.zhiBaoQi !== null && query.zhiBaoQi !== undefined) {
    params.append('zhibaoqi', query.zhiBaoQi) // 你要传给后台的参数值 key/value
  }
  if (query.weight !== '' && query.weight !== null && query.weight !== undefined) {
    params.append('weight', query.weight) // 你要传给后台的参数值 key/value
  }
  if (query.volume !== '' && query.volume !== null && query.volume !== undefined) {
    params.append('volume', query.volume) // 你要传给后台的参数值 key/value
  }
  if (query.costPrice !== '' && query.costPrice !== null && query.costPrice !== undefined) {
    params.append('costprice', query.costPrice) // 你要传给后台的参数值 key/value
  }
  if (query.tradePrice !== '' && query.tradePrice !== null && query.tradePrice !== undefined) {
    params.append('tradeprice', query.tradePrice) // 你要传给后台的参数值 key/value
  }
  if (query.salePrice !== '' && query.salePrice !== null && query.salePrice !== undefined) {
    params.append('saleprice', query.salePrice) // 你要传给后台的参数值 key/value
  }
  if (query.purchasePrice !== '' && query.purchasePrice !== null && query.purchasePrice !== undefined) {
    params.append('purchaseprice', query.purchasePrice) // 你要传给后台的参数值 key/value
  }
  if (query.lowerPrice !== '' && query.lowerPrice !== null && query.lowerPrice !== undefined) {
    params.append('lowerprice', query.lowerPrice) // 你要传给后台的参数值 key/value
  }
  if (query.supplierid !== '' && query.supplierid !== null && query.supplierid !== undefined) {
    params.append('supplierid', query.supplierid) // 你要传给后台的参数值 key/value
  }
  if (query.level !== '' && query.level !== null && query.level !== undefined) {
    params.append('level', query.level) // 你要传给后台的参数值 key/value
  }
  if (query.purchaseMeasurement !== '' && query.purchaseMeasurement !== null && query.purchaseMeasurement !== undefined) {
    params.append('purchasemeasurement', query.purchaseMeasurement) // 你要传给后台的参数值 key/value
  }
  if (query.salemeasurement !== '' && query.salemeasurement !== null && query.salemeasurement !== undefined) {
    params.append('salemeasurement', query.salemeasurement) // 你要传给后台的参数值 key/value
  }
  if (query.stockmeasurement !== '' && query.stockmeasurement !== null && query.stockmeasurement !== undefined) {
    params.append('stockmeasurement', query.stockmeasurement) // 你要传给后台的参数值 key/value
  }
  if (query.producemeasurement !== '' && query.producemeasurement !== null && query.producemeasurement !== undefined) {
    params.append('producemeasurement', query.producemeasurement) // 你要传给后台的参数值 key/value
  }
  if (query.source !== '' && query.source !== null && query.source !== undefined) {
    params.append('source', query.source) // 你要传给后台的参数值 key/value
  }
  if (query.valuation !== '' && query.valuation !== null && query.valuation !== undefined) {
    params.append('valuation', query.valuation) // 你要传给后台的参数值 key/value
  }
  if (query.isActive !== '' && query.isActive !== null && query.isActive !== undefined) {
    params.append('isactive', query.isActive) // 你要传给后台的参数值 key/value
  }
  if (query.picids !== '' && query.picids !== null && query.picids !== undefined) {
    params.append('picids', query.picids) // 你要传给后台的参数值 key/value
  }
  if (query.detailpicid !== '' && query.detailpicid !== null && query.detailpicid !== undefined) {
    params.append('detailpicid', query.detailpicid) // 你要传给后台的参数值 key/value
  }
  if (query.memberPrice !== '' && query.memberPrice !== null && query.memberPrice !== undefined) {
    params.append('memberprice', query.memberPrice) // 你要传给后台的参数值 key/value
  }
  if (query.effectiveDay !== '' && query.effectiveDay !== null && query.effectiveDay !== undefined) {
    params.append('effectiveDay', query.effectiveDay) // 你要传给后台的参数值 key/value
  }
  if (query.stockCircle !== '' && query.stockCircle !== null && query.stockCircle !== undefined) {
    params.append('stockCircle', query.stockCircle) // 你要传给后台的参数值 key/value
  }
  if (query.produceAbility !== '' && query.produceAbility !== null && query.produceAbility !== undefined) {
    params.append('produceAbility', query.produceAbility) // 你要传给后台的参数值 key/value
  }
  if (query.workCenterId !== '' && query.workCenterId !== null && query.workCenterId !== undefined) {
    params.append('workCenterId', query.workCenterId) // 你要传给后台的参数值 key/value
  }
  if (query.careCircle !== '' && query.careCircle !== null && query.careCircle !== undefined) {
    params.append('careCircle', query.careCircle) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/product/editproduct',
    method: 'post',
    data: params
  })
}

// 商品批量导入
export function manyinsert(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('productJson', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/product/manyinsert',
    method: 'post',
    data: params
  })
}

// 商品批量导入
export function addadjustprice(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.productname !== '' && query.productname !== null && query.productname !== undefined) {
    params.append('productname', query.productname) // 你要传给后台的参数值 key/value
  }
  if (query.productcode !== '' && query.productcode !== null && query.productcode !== undefined) {
    params.append('productcode', query.productcode) // 你要传给后台的参数值 key/value
  }
  if (query.costprice !== '' && query.costprice !== null && query.costprice !== undefined) {
    params.append('costprice', query.costprice) // 你要传给后台的参数值 key/value
  }
  if (query.tradeprice !== '' && query.tradeprice !== null && query.tradeprice !== undefined) {
    params.append('tradeprice', query.tradeprice) // 你要传给后台的参数值 key/value
  }
  if (query.saleprice !== '' && query.saleprice !== null && query.saleprice !== undefined) {
    params.append('saleprice', query.saleprice) // 你要传给后台的参数值 key/value
  }
  if (query.memberprice !== '' && query.memberprice !== null && query.memberprice !== undefined) {
    params.append('memberprice', query.memberprice) // 你要传给后台的参数值 key/value
  }
  if (query.lowerprice !== '' && query.lowerprice !== null && query.lowerprice !== undefined) {
    params.append('lowerprice', query.lowerprice) // 你要传给后台的参数值 key/value
  }
  if (query.adjustcostprice !== '' && query.adjustcostprice !== null && query.adjustcostprice !== undefined) {
    params.append('adjustcostprice', query.adjustcostprice) // 你要传给后台的参数值 key/value
  }
  if (query.adjusttradeprice !== '' && query.adjusttradeprice !== null && query.adjusttradeprice !== undefined) {
    params.append('adjusttradeprice', query.adjusttradeprice) // 你要传给后台的参数值 key/value
  }
  if (query.adjustsaleprice !== '' && query.adjustsaleprice !== null && query.adjustsaleprice !== undefined) {
    params.append('adjustsaleprice', query.adjustsaleprice) // 你要传给后台的参数值 key/value
  }
  if (query.adjustmemberprice !== '' && query.adjustmemberprice !== null && query.adjustmemberprice !== undefined) {
    params.append('adjustmemberprice', query.adjustmemberprice) // 你要传给后台的参数值 key/value
  }
  if (query.adjustlowerprice !== '' && query.adjustlowerprice !== null && query.adjustlowerprice !== undefined) {
    params.append('adjustlowerprice', query.adjustlowerprice) // 你要传给后台的参数值 key/value
  }
  if (query.adjustpersonid !== '' && query.adjustpersonid !== null && query.adjustpersonid !== undefined) {
    params.append('adjustpersonid', query.adjustpersonid) // 你要传给后台的参数值 key/value
  }
  if (query.adjustreason !== '' && query.adjustreason !== null && query.adjustreason !== undefined) {
    params.append('adjustreason', query.adjustreason) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/adjustprice/addadjustprice',
    method: 'post',
    data: params
  })
}

// 搜索价格变更单列表
export function adjustpricelist(query) {
  var params = new URLSearchParams()
  if (query.adjustid !== '' && query.adjustid !== null && query.adjustid !== undefined) {
    params.append('adjustid', query.adjustid) // 你要传给后台的参数值 key/value
  }
  if (query.adjustnumber !== '' && query.adjustnumber !== null && query.adjustnumber !== undefined) {
    params.append('adjustnumber', query.adjustnumber) // 你要传给后台的参数值 key/value
  }
  if (query.productcode !== '' && query.productcode !== null && query.productcode !== undefined) {
    params.append('productcode', query.productcode) // 你要传给后台的参数值 key/value
  }
  if (query.productname !== '' && query.productname !== null && query.productname !== undefined) {
    params.append('productname', query.productname) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/adjustprice/adjustpricelist',
    method: 'post',
    data: params
  })
}

// 修改价格变更单
export function updateadjustprice(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.adjustCostPrice !== '' && query.adjustCostPrice !== null && query.adjustCostPrice !== undefined) {
    params.append('adjustcostprice', query.adjustCostPrice) // 你要传给后台的参数值 key/value
  }
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('adjustid', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.adjustTradePrice !== '' && query.adjustTradePrice !== null && query.adjustTradePrice !== undefined) {
    params.append('adjusttradeprice', query.adjustTradePrice) // 你要传给后台的参数值 key/value
  }
  if (query.adjustSalePrice !== '' && query.adjustSalePrice !== null && query.adjustSalePrice !== undefined) {
    params.append('adjustsaleprice', query.adjustSalePrice) // 你要传给后台的参数值 key/value
  }
  if (query.adjustMemberPrice !== '' && query.adjustMemberPrice !== null && query.adjustMemberPrice !== undefined) {
    params.append('adjustmemberprice', query.adjustMemberPrice) // 你要传给后台的参数值 key/value
  }
  if (query.adjustLowerPrice !== '' && query.adjustLowerPrice !== null && query.adjustLowerPrice !== undefined) {
    params.append('adjustlowerprice', query.adjustLowerPrice) // 你要传给后台的参数值 key/value
  }
  if (query.adjustpersonid !== '' && query.adjustpersonid !== null && query.adjustpersonid !== undefined) {
    params.append('adjustpersonid', query.adjustpersonid) // 你要传给后台的参数值 key/value
  }
  if (query.adjustReason !== '' && query.adjustReason !== null && query.adjustReason !== undefined) {
    params.append('adjustreason', query.adjustReason) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '' && query.stat !== null && query.stat !== undefined) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  if (query.judgePersonId !== '' && query.judgePersonId !== null && query.judgePersonId !== undefined) {
    params.append('judgepersonid', query.judgePersonId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/adjustprice/updateadjustprice',
    method: 'post',
    data: params
  })
}

// 删除价格变更单
export function deleteadjustprice(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('adjustids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/adjustprice/deleteadjustprice',
    method: 'post',
    data: params
  })
}

// 查询计量单位列表
export function searchMea() {
  var params = new URLSearchParams()
  params.append('pagenum', 1) // 你要传给后台的参数值 key/value
  params.append('pagesize', 9998) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/measurement/search',
    method: 'post',
    data: params
  })
}

// 物品分类列表
export function detaillist() {
  return request({
    url: '/erp/productclassfy/detaillist',
    method: 'post'
  })
}

// 新建物品分类
export function createclassfy(query) {
  var params = new URLSearchParams()
  if (query.name !== '' && query.name !== null && query.name !== undefined) {
    params.append('name', query.name) // 你要传给后台的参数值 key/value
  }
  if (query.levle !== '' && query.levle !== null && query.levle !== undefined) {
    params.append('levle', query.levle) // 你要传给后台的参数值 key/value
  }
  if (query.parentId !== '' && query.parentId !== null && query.parentId !== undefined) {
    params.append('parentId', query.parentId) // 你要传给后台的参数值 key/value
  }
  if (query.code !== '' && query.code !== null) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.createId !== '' && query.createId !== null && query.createId !== undefined) {
    params.append('createId', query.createId) // 你要传给后台的参数值 key/value
  }
  if (query.isActive !== '' && query.isActive !== null && query.isActive !== undefined) {
    params.append('isActive', query.isActive) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/productclassfy/create',
    method: 'post',
    data: params
  })
}

// 修改物品分类
export function updateeclassfy(query) {
  var params = new URLSearchParams()
  if (query.categoryName !== '' && query.categoryName !== null && query.categoryName !== undefined) {
    params.append('name', query.categoryName) // 你要传给后台的参数值 key/value
  }
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.isActive !== '' && query.isActive !== null && query.isActive !== undefined) {
    params.append('isActive', query.isActive) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/productclassfy/update',
    method: 'post',
    data: params
  })
}

// 删除物品分类
export function deleteeclassfy(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('id', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/productclassfy/delete',
    method: 'post',
    data: params
  })
}

