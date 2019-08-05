import request from '@/utils/request'

// 库存明细统计表
export function inventorydetaillist(query) {
  var params = new URLSearchParams()
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.brand !== '' && query.brand !== null && query.brand !== undefined) {
    params.append('brand', query.brand) // 你要传给后台的参数值 key/value
  }
  if (query.productName !== '' && query.productName !== null && query.productName !== undefined) {
    params.append('productName', query.productName) // 你要传给后台的参数值 key/value
  }
  if (query.categoryId !== '' && query.categoryId !== null && query.categoryId !== undefined) {
    params.append('categoryId', query.categoryId) // 你要传给后台的参数值 key/value
  }
  if (query.typeId !== '' && query.typeId !== null && query.typeId !== undefined) {
    params.append('typeId', query.typeId) // 你要传给后台的参数值 key/value
  }
  if (query.locationId !== '' && query.locationId !== null && query.locationId !== undefined) {
    params.append('locationId', query.locationId) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/countinven/inventorydetaillist',
    method: 'post',
    data: params
  })
}
