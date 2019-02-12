import request from '@/utils/request'

// 商品分类
export function categories(query) {
  var params = new URLSearchParams()
  params.append('keyword', query.keyword2) // 你要传给后台的参数值 key/value
  params.append('pagenum', query.pagenum)
  params.append('pagesize', query.pagesize)
  return request({
    url: '/pss/category/listproductcategory',
    method: 'post',
    data: params
  })
}

// 获取商品分类
export function categories2() {
  return request({
    url: '/pss/category/listproductcategory',
    method: 'post'
  })
}

// 商品分类搜索
export function searchcategories(query) {
  var params = new URLSearchParams()
  params.append('keyword', query.keyword2) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/category/listproductcategory',
    method: 'post',
    data: params
  })
}

// 商品分类添加
export function addcategories(res) {
  var params = new URLSearchParams()
  params.append('ccode', res.categoryCode) // 你要传给后台的参数值 key/value
  params.append('cname', res.categoryName)
  params.append('createrid', res.createrId)
  return request({
    url: '/pss/category/newproductcategory',
    method: 'post',
    data: params
  })
}

// 商品分类删除
export function deletecategories(res) {
  var params = new URLSearchParams()
  params.append('id', res.id) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/category/deleteproductcategory',
    method: 'post',
    data: params
  })
}

// 商品分类修改
export function editcategories(res) {
  var params = new URLSearchParams()
  params.append('cid', res.id) // 你要传给后台的参数值 key/value
  params.append('ccode', res.categoryCode) // 你要传给后台的参数值 key/value
  params.append('cname', res.categoryName) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/category/editproductcategory',
    method: 'post',
    data: params
  })
}

// 商品列表

// 商品列表
export function fetchList2(query) {
  var params = new URLSearchParams()
  params.append('code', query.code) // 你要传给后台的参数值 key/value
  params.append('isactive', query.isActive)
  params.append('maintitle', query.mainTitle)
  params.append('pagenum', query.pagenum)
  params.append('pagesize', query.pagesize)
  params.append('type', query.type)
  return request({
    url: '/pss/product/adminsearch',
    method: 'post',
    data: params
  })
}

// 商品列表搜索
export function searchList(code, isactive, maintitle) {
  var params = new URLSearchParams()
  params.append('code', code) // 你要传给后台的参数值 key/value
  params.append('isactive', isactive)
  params.append('maintitle', maintitle)
  return request({
    url: '/pss/product/adminsearch',
    method: 'post',
    data: params
  })
}

// 商品列表上下架修改
export function productisactivechange(productid, isactive) {
  var params = new URLSearchParams()
  params.append('productid', productid) // 你要传给后台的参数值 key/value
  params.append('isactive', isactive)
  return request({
    url: '/pss/product/productisactivechange',
    method: 'post',
    data: params
  })
}

// 商品列表修改
export function editproduct(res) {
  var params = new URLSearchParams()
  params.append('brand', res.brand) // 你要传给后台的参数值 key/value
  params.append('type', res.type)
  params.append('color', res.color)
  params.append('costPrice', res.costPrice)
  params.append('mainTitle', res.mainTitle)
  params.append('salePrice', res.salePrice)
  params.append('productCategoryId', res.productCategoryId)
  params.append('code', res.code)
  params.append('createrId', res.createrId)
  params.append('quantity', res.quantity)
  params.append('subTitle', res.subTitle)
  params.append('productDetail', res.productDetail)
  params.append('picids', res.picids)
  params.append('isActive', res.isActive)
  params.append('kpiGrade', res.kpiGrade)
  params.append('barcode', res.barcode)
  params.append('detailpicid', res.detailpicid)
  params.append('id', res.id)
  return request({
    url: '/pss/product/editproduct',
    method: 'post',
    data: params
  })
}

// 商品列表添加
export function addproduct(res) {
  var params = new URLSearchParams()
  params.append('brand', res.brand) // 你要传给后台的参数值 key/value
  params.append('type', res.type)
  params.append('color', res.color)
  params.append('costPrice', res.costPrice)
  params.append('mainTitle', res.mainTitle)
  params.append('salePrice', res.salePrice)
  params.append('productCategoryId', res.productCategoryId)
  params.append('code', res.code)
  params.append('createrId', res.createrId)
  params.append('quantity', res.quantity)
  params.append('picids', res.picids)
  params.append('isActive', res.isActive)
  params.append('kpiGrade', res.kpiGrade)
  params.append('barcode', res.barcode)
  params.append('detailpicid', res.detailpicid)
  return request({
    url: '/pss/product/createnewproduct',
    method: 'post',
    data: params
  })
}

// 获取商品分类
export function getproducttype() {
  return request({
    url: '/pss/product/getproducttype',
    method: 'post'
  })
}

// 商品列表详情
export function detail(productid) {
  var params = new URLSearchParams()
  params.append('productid', productid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/product/detailinfo',
    method: 'post',
    data: params
  })
}

// 商品列表详情页图表
export function tu(productid) {
  var params = new URLSearchParams()
  params.append('productid', productid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/product/newrepairsbytype',
    method: 'post',
    data: params
  })
}
