import request from '@/utils/request'

// 国家列表
export function getcountrylist(query) {
  return request({
    url: 'http://192.168.1.45:8080/erp/country/getcountrylist',
    method: 'post',
    params: query
  })
}

// 全部区域
export function regionlist(query) {
  return request({
    url: 'http://192.168.1.45:8080/erp/region/detaillist',
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
    url: 'http://192.168.1.45:8080/erp/repository/searchRepository',
    method: 'post',
    data: params
  })
}

// 省列表
export function getprovincelist(query) {
  var params = new URLSearchParams()
  params.append('countryid', query) // 你要传给后台的参数值 key/value
  return request({
    url: 'http://192.168.1.45:8080/erp/country/getprovincelist',
    method: 'post',
    data: params
  })
}

// 市列表
export function getcitylist(query) {
  var params = new URLSearchParams()
  params.append('provinceid', query) // 你要传给后台的参数值 key/value
  return request({
    url: 'http://192.168.1.45:8080/erp/country/getcitylist',
    method: 'post',
    data: params
  })
}
