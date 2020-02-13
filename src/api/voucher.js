import request from '@/utils/request'

export function endProfit(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('date', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/voucher/endProfit',
    method: 'post',
    data: params
  })
}

export function addProduceVoucher(query) {
  var params = new URLSearchParams()
  return request({
    url: '/voucher/addProduceVoucher',
    method: 'post',
    data: params
  })
}

// 查询科目是否是借方还是贷方
export function getSubjectDetail(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('subjectCode', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/subject/getSubjectDetail',
    method: 'post',
    data: params
  })
}

// 新建凭证
export function addvoucher(query, query2, query3) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('voucherJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('voucherDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/voucher/addvoucher',
    method: 'post',
    data: params
  })
}

// 凭证列表
export function voucherlist(query) {
  var params = new URLSearchParams()
  if (query.voucherId !== '' && query.voucherId !== null && query.voucherId !== undefined) {
    params.append('voucherId', query.voucherId) // 你要传给后台的参数值 key/value
  }
  if (query.voucherNo !== '' && query.voucherNo !== null && query.voucherNo !== undefined) {
    params.append('voucherNo', query.voucherNo) // 你要传给后台的参数值 key/value
  }
  if (query.voucherStat !== '' && query.voucherStat !== null && query.voucherStat !== undefined) {
    params.append('voucherStat', query.voucherStat) // 你要传给后台的参数值 key/value
  }
  if (query.receiptdate !== '' && query.receiptdate !== null && query.receiptdate !== undefined) {
    params.append('receiptdate', query.receiptdate) // 你要传给后台的参数值 key/value
  }
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId', query.createPersonId) // 你要传给后台的参数值 key/value
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
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/voucher/voucherlist',
    method: 'post',
    data: params
  })
}

// 修改凭证
export function updatevoucher(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('voucherJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('voucherDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/voucher/updatevoucher',
    method: 'post',
    data: params
  })
}

// 删除凭证
export function deletevoucher(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('voucherIds', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/voucher/deletevoucher',
    method: 'post',
    data: params
  })
}

// 根据门店id搜索门店名
export function searchRepository(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('id', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/repository/searchRepository',
    method: 'post',
    data: params
  })
}

// 根据区域id搜索区域名
export function regionlist(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('regionid', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/region/list',
    method: 'post',
    data: params
  })
}

// 科目余额表
export function subjectBalanceList(query) {
  var params = new URLSearchParams()
  if (query.receiptdate !== '' && query.receiptdate !== null && query.receiptdate !== undefined) {
    params.append('receiptdate', query.receiptdate) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/balance/subjectBalanceList',
    method: 'post',
    data: params
  })
}
