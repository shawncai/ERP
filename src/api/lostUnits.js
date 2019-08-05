import request from '@/utils/request'

// 黑名单列表
export function blacklist(query) {
  return request({
    url: '/erp/blacklist/list',
    method: 'post',
    params: query
  })
}

// 黑名单搜索
export function searcblacklist(query) {
  var params = new URLSearchParams()
  params.append('personname', query.personname) // 你要传给后台的参数值 key/value
  params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  params.append('productsn', query.productsn) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/blacklist/list',
    method: 'post',
    data: params
  })
}

// 修改黑名单
export function judgeblacklist(query) {
  var params = new URLSearchParams()
  params.append('blacklistid', query.id) // 你要传给后台的参数值 key/value
  params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/blacklist/judgeblacklist',
    method: 'post',
    data: params
  })
}

// 车辆丢失列表
export function loselist(query) {
  return request({
    url: '/erp/blacklist/loselist',
    method: 'post',
    params: query
  })
}

// 车辆丢失搜索
export function searchloselist(query) {
  var params = new URLSearchParams()
  params.append('personname', query.personname) // 你要传给后台的参数值 key/value
  params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  params.append('productsn', query.productsn) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/blacklist/loselist',
    method: 'post',
    data: params
  })
}
