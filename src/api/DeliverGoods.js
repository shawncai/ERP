import request from '@/utils/request'

// 新建配送单
export function addDeliverGoods(query, query2, query4) {
  var params = new URLSearchParams()
  params.append('deliverGoodsJson', query) // 你要传给后台的参数值 key/value
  params.append('deliverGoodsDetailJson', query2) // 你要传给后台的参数值 key/value
  if (query4.repositoryId !== '' && query4.repositoryId !== null && query4.repositoryId !== undefined) {
    params.append('repositoryId', query4.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query4.regionId !== '' && query4.regionId !== null && query4.regionId !== undefined) {
    params.append('regionId', query4.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/deliverGoods/addDeliverGoods',
    method: 'post',
    data: params
  })
}

// 配送单列表
export function deliverGoodsList(query) {
  var params = new URLSearchParams()
  if (query.title !== '' && query.title !== null && query.title !== undefined) {
    params.append('title', query.title) // 你要传给后台的参数值 key/value
  }
  if (query.deliverNumber !== '' && query.deliverNumber !== null && query.deliverNumber !== undefined) {
    params.append('deliverNumber', query.deliverNumber) // 你要传给后台的参数值 key/value
  }
  if (query.sourceNumber !== '' && query.sourceNumber !== null && query.sourceNumber !== undefined) {
    params.append('sourceNumber', query.sourceNumber) // 你要传给后台的参数值 key/value
  }
  if (query.sourceType !== '' && query.sourceType !== null && query.sourceType !== undefined) {
    params.append('sourceType', query.sourceType) // 你要传给后台的参数值 key/value
  }
  if (query.deliverPersonId !== '' && query.deliverPersonId !== null && query.deliverPersonId !== undefined) {
    params.append('deliverPersonId', query.deliverPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.judgeStat !== '' && query.judgeStat !== null && query.judgeStat !== undefined) {
    params.append('judgeStat', query.judgeStat) // 你要传给后台的参数值 key/value
  }
  if (query.receiptStat !== '' && query.receiptStat !== null && query.receiptStat !== undefined) {
    params.append('receiptStat', query.receiptStat) // 你要传给后台的参数值 key/value
  }
  if (query.beginTime !== '' && query.beginTime !== null && query.beginTime !== undefined) {
    params.append('beginTime', query.beginTime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId', query.createPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/deliverGoods/deliverGoodsList',
    method: 'post',
    data: params
  })
}

// 修改配送单
export function updateDeliverGoods(query, query2) {
  var params = new URLSearchParams()
  params.append('deliverGoodsJson', query) // 你要传给后台的参数值 key/value
  params.append('deliverGoodsDetailJson', query2) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/deliverGoods/updateDeliverGoods',
    method: 'post',
    data: params
  })
}

// 删除配送单
export function deleteDeliverGoods(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('deliverIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/deliverGoods/deleteDeliverGoods',
    method: 'post',
    data: params
  })
}

// 审核配送单
export function updateDeliverGoods2(query) {
  var params = new URLSearchParams()
  params.append('deliverGoodsJson', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/deliverGoods/updateDeliverGoods',
    method: 'post',
    data: params
  })
}
