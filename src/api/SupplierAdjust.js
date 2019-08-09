import request from '@/utils/request'

//  新建采购订单
export function addSupplierAdjust(query, query2, query3) {
  var params = new URLSearchParams()
  params.append('supplierAdjustJson', query) // 你要传给后台的参数值 key/value
  params.append('supplierAdjustDetailJson', query2) // 你要传给后台的参数值 key/value
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/supplieradjust/addSupplierAdjust',
    method: 'post',
    data: params
  })
}

// 采购订单列表
export function SupplierAdjustlist(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.adjustId !== '' && query.adjustId !== null && query.adjustId !== undefined) {
    params.append('adjustId', query.adjustId) // 你要传给后台的参数值 key/value
  }
  if (query.number !== '' && query.number !== null && query.number !== undefined) {
    params.append('number', query.number) // 你要传给后台的参数值 key/value
  }
  if (query.supplierId !== '' && query.supplierId !== null && query.supplierId !== undefined) {
    params.append('supplierId', query.supplierId) // 你要传给后台的参数值 key/value
  }
  if (query.applyPersonId !== '' && query.applyPersonId !== null && query.applyPersonId !== undefined) {
    params.append('applyPersonId', query.applyPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/supplieradjust/supplierAdjustList',
    method: 'post',
    data: params
  })
}

//  更新采购订单
export function updateSupplierAdjust(query, query2) {
  var params = new URLSearchParams()
  params.append('supplierAdjustJson', query) // 你要传给后台的参数值 key/value
  params.append('supplierAdjustDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/supplieradjust/updateSupplierAdjust',
    method: 'post',
    data: params
  })
}

// 删除采购订单
export function deleteSupplierAdjust(query, query2) {
  var params = new URLSearchParams()
  params.append('adjustIds', query) // 你要传给后台的参数值 key/value
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/supplieradjust/deleteSupplierAdjust',
    method: 'post',
    data: params
  })
}

//  审核采购订单
export function updateSupplierAdjust2(query) {
  var params = new URLSearchParams()
  params.append('supplierAdjustJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/supplieradjust/updateSupplierAdjust',
    method: 'post',
    data: params
  })
}
