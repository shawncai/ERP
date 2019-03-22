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
export function batchlist(query, query2, query3) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('repositoryId', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('locationId', query2) // 你要传给后台的参数值 key/value
  }
  if (query3 !== '' && query3 !== null && query3 !== undefined) {
    params.append('productCode', query3) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/location/batchlist',
    method: 'post',
    data: params
  })
}

// 库存余量查询
export function getQuantity(query, query2, query3, query4) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('repositoryId', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('locationId', query2) // 你要传给后台的参数值 key/value
  }
  if (query3 !== '' && query3 !== null && query3 !== undefined) {
    params.append('productCode', query3) // 你要传给后台的参数值 key/value
  }
  if (query4 !== '' && query4 !== null && query4 !== undefined) {
    params.append('batch', query4) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/location/getQuantity',
    method: 'post',
    data: params
  })
}
