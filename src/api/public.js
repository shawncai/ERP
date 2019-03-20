import request from '@/utils/request'

// 国家列表
export function getcountrylist(query) {
  return request({
    url: '/erp/country/getcountrylist',
    method: 'post',
    params: query
  })
}

// 全部区域
export function regionlist(query) {
  return request({
    url: '/erp/region/detaillist',
    method: 'post',
    params: query
  })
}

// 根据区域查门店
export function searchRepository(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('regionId', query) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', 1) // 你要传给后台的参数值 key/value
  params.append('pagesize', 99999) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/repository/searchRepository',
    method: 'post',
    data: params
  })
}

// 省列表
export function getprovincelist(query) {
  var params = new URLSearchParams()
  params.append('countryid', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/country/getprovincelist',
    method: 'post',
    data: params
  })
}

// 市列表
export function getcitylist(query) {
  var params = new URLSearchParams()
  params.append('provinceid', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/country/getcitylist',
    method: 'post',
    data: params
  })
}

// 批次查询
export function batchlist(query) {
  var params = new URLSearchParams()
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.locationId !== '' && query.locationId !== null && query.locationId !== undefined) {
    params.append('locationId', query.locationId) // 你要传给后台的参数值 key/value
  }
  if (query.productCode !== '' && query.productCode !== null && query.productCode !== undefined) {
    params.append('productCode', query.productCode) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/location/batchlist',
    method: 'post',
    data: params
  })
}

// 库存余量查询
export function getQuantity(query) {
  var params = new URLSearchParams()
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.locationId !== '' && query.locationId !== null && query.locationId !== undefined) {
    params.append('locationId', query.locationId) // 你要传给后台的参数值 key/value
  }
  if (query.productCode !== '' && query.productCode !== null && query.productCode !== undefined) {
    params.append('productCode', query.productCode) // 你要传给后台的参数值 key/value
  }
  if (query.batch !== '' && query.batch !== null && query.batch !== undefined) {
    params.append('batch', query.batch) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/location/getQuantity',
    method: 'post',
    data: params
  })
}
