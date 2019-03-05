import request from '@/utils/request'

// 新增商品
export function createnewproduct(query) {
  var params = new URLSearchParams()
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
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
  if (query.color !== '' && query.color !== null && query.color !== undefined) {
    params.append('color', query.color) // 你要传给后台的参数值 key/value
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
  return request({
    url: 'http://192.168.1.45:8080/erp/product/createnewproduct',
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
  if (query.supplierid !== '' && query.supplierid !== null && query.supplierid !== undefined) {
    params.append('supplierid', query.supplierid) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: 'http://192.168.1.45:8080/erp/product/productlist',
    method: 'post',
    data: params
  })
}
