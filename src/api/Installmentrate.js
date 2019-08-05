import request from '@/utils/request'

// 分期利息规则列表
export function ratelist(query) {
  var params = new URLSearchParams()
  if (query.count !== '' && query.count !== null && query.count !== undefined) {
    params.append('count', query.count) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '' && query.stat !== null && query.stat !== undefined) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/installmentrate/ratelist',
    method: 'post',
    data: params
  })
}

// 新增分期利息规则
export function addinstallmentrate(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('installmentRateJson', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/installmentrate/addinstallmentrate',
    method: 'post',
    data: params
  })
}

// 修改分期利息规则
export function updateinstallmentrate(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('installmentRateJson', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/installmentrate/updateinstallmentrate',
    method: 'post',
    data: params
  })
}

// 删除分期利息规则
export function deleterate(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null) {
    params.append('rateIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/installmentrate/deleterate',
    method: 'post',
    data: params
  })
}

// 滞纳金规则列表
export function rulelist(query) {
  var params = new URLSearchParams()
  if (query.stat !== '' && query.stat !== null && query.stat !== undefined) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/overdueFineRules/rulelist',
    method: 'post',
    data: params
  })
}

// 新增滞纳金规则列表
export function addOverdueFineRules(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('overdueFineRulesJson', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/overdueFineRules/addOverdueFineRules',
    method: 'post',
    data: params
  })
}

// 修改滞纳金规则
export function updateOverdueFineRules(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('overdueFineRulesJson', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/overdueFineRules/updateOverdueFineRules',
    method: 'post',
    data: params
  })
}

// 删除滞纳金规则
export function deleteOverdueFineRules(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null) {
    params.append('rateIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/overdueFineRules/deleteOverdueFineRules',
    method: 'post',
    data: params
  })
}

// 奖励规则列表
export function rulelist2(query) {
  var params = new URLSearchParams()
  if (query.stat !== '' && query.stat !== null && query.stat !== undefined) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/erp/rewardRules/rulelist',
    method: 'post',
    data: params
  })
}

// 新建奖励规则
export function addRewardRules(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('rewardRulesJson', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/rewardRules/addRewardRules',
    method: 'post',
    data: params
  })
}

// 修改奖励规则
export function updateRewardRules(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('rewardRulesJson', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/rewardRules/updateRewardRules',
    method: 'post',
    data: params
  })
}

// 删除奖励规则
export function deleteRewardRules(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null) {
    params.append('rulesIds', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/rewardRules/deleteRewardRules',
    method: 'post',
    data: params
  })
}
