import request from '@/utils/request'

// 添加外包工厂
export function createoutFactory(query) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/outFactory/create',
    method: 'post',
    data: params
  })
}

// 查询外包工厂
export function searchoutFactory(query) {
  var params = new URLSearchParams()
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.factoryName !== '' && query.factoryName !== null && query.factoryName !== undefined) {
    params.append('factoryName', query.factoryName) // 你要传给后台的参数值 key/value
  }
  if (query.factoryContactName !== '' && query.factoryContactName !== null && query.factoryContactName !== undefined) {
    params.append('factoryContactName', query.factoryContactName) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '' && query.stat !== null && query.stat !== undefined) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/outFactory/search',
    method: 'post',
    data: params
  })
}

//  删除外包工厂
export function deleteoutFactory(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/outFactory/delete',
    method: 'post',
    data: params
  })
}

// 修改外包工厂
export function updateoutFactory(query) {
  var params = new URLSearchParams()
  params.append('Json', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/outFactory/update',
    method: 'post',
    data: params
  })
}
