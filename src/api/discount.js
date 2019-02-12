import request from '@/utils/request'

// 折扣列表
export function listdiscount(query) {
  return request({
    url: '/pss/discount/listdiscount',
    method: 'post',
    params: query
  })
}

// 添加折扣
export function adddiscount(query) {
  var params = new URLSearchParams()
  params.append('discountname', query.discountName) // 你要传给后台的参数值 key/value
  params.append('discountrate', query.discountRate) // 你要传给后台的参数值 key/value
  params.append('createid', query.createid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/discount/adddiscount',
    method: 'post',
    data: params
  })
}

// 修改折扣
export function updatediscount(query) {
  var params = new URLSearchParams()
  params.append('discountid', query.id) // 你要传给后台的参数值 key/value
  params.append('discountrate', query.discountRate) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/discount/updatediscount',
    method: 'post',
    data: params
  })
}

// 删除折扣
export function deletediscount(query) {
  var params = new URLSearchParams()
  params.append('discountid', query.id) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/discount/deletediscount',
    method: 'post',
    data: params
  })
}
