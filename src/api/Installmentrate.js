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
    url: '/installmentrate/ratelist',
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
    url: '/installmentrate/addinstallmentrate',
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
    url: '/installmentrate/updateinstallmentrate',
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
    url: '/installmentrate/deleterate',
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
    url: '/overdueFineRules/rulelist',
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
    url: '/overdueFineRules/addOverdueFineRules',
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
    url: '/overdueFineRules/updateOverdueFineRules',
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
    url: '/overdueFineRules/deleteOverdueFineRules',
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
    url: '/rewardRules/rulelist',
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
    url: '/rewardRules/addRewardRules',
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
    url: '/rewardRules/updateRewardRules',
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
    url: '/rewardRules/deleteRewardRules',
    method: 'post',
    data: params
  })
}

// 新建分期首付设置
export function addInstallmentFirst(query) {
  var params = new URLSearchParams()
  if (query.repositoryIds) {
    params.append('repositoryIds', query.repositoryIds) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryNames) {
    params.append('repositoryNames', query.repositoryNames) // 你要传给后台的参数值 key/value
  }
  if (query.typeId !== null && query.typeId !== '' && query.typeId !== undefined) {
    params.append('typeId', query.typeId) // 你要传给后台的参数值 key/value
  }
  if (query.lowerMoney !== null && query.lowerMoney !== '' && query.lowerMoney !== undefined) {
    params.append('lowerMoney', query.lowerMoney) // 你要传给后台的参数值 key/value
  }
  if (query.createId !== null && query.createId !== '' && query.createId !== undefined) {
    params.append('createId', query.createId) // 你要传给后台的参数值 key/value
  }

  return request({
    url: '/installmentrate/addInstallmentFirst',
    method: 'post',
    data: params
  })
}

// 修改分期首付设置
export function updateInstallmentFirst(query) {
  var params = new URLSearchParams()
  if (query.id) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryIds) {
    params.append('repositoryIds', query.repositoryIds) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryNames) {
    params.append('repositoryNames', query.repositoryNames) // 你要传给后台的参数值 key/value
  }
  if (query.typeId !== null && query.typeId !== '' && query.typeId !== undefined) {
    params.append('typeId', query.typeId) // 你要传给后台的参数值 key/value
  }
  if (query.lowerMoney !== null && query.lowerMoney !== '' && query.lowerMoney !== undefined) {
    params.append('lowerMoney', query.lowerMoney) // 你要传给后台的参数值 key/value
  }
  if (query.createId !== null && query.createId !== '' && query.createId !== undefined) {
    params.append('createId', query.createId) // 你要传给后台的参数值 key/value
  }

  return request({
    url: '/installmentrate/updateInstallmentFirst',
    method: 'post',
    data: params
  })
}

// 分期首付设置列表
export function installmentFirstList(query) {
  var params = new URLSearchParams()
  if (query.id) {
    params.append('firstId', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.typeId) {
    params.append('typeId', query.typeId) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value

  return request({
    url: '/installmentrate/installmentFirstList',
    method: 'post',
    data: params
  })
}

// 删除分期首付设置
export function deleteInstallmentFirst(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null) {
    params.append('firstId', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/installmentrate/deleteInstallmentFirst',
    method: 'post',
    data: params
  })
}
