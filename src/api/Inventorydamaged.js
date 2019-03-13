import request from '@/utils/request'

// 删除盘点单
export function deletedamaged(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('damagedIds', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/inventorydamaged/deletedamaged',
    method: 'post',
    data: params
  })
}
