import request from '@/utils/request'

// 差异价格列表
export function searchDiffPrice(query) {
  var params = new URLSearchParams()
  if (query.categoryId !== '' && query.categoryId !== null && query.categoryId !== undefined) {
    params.append('categoryId', query.categoryId) // 你要传给后台的参数值 key/value
  }
  if (query.useMonth !== '' && query.useMonth !== null && query.useMonth !== undefined) {
    params.append('useMonth', query.useMonth) // 你要传给后台的参数值 key/value
  }
  if (query.useType !== '' && query.useType !== null && query.useType !== undefined) {
    params.append('useType', query.useType) // 你要传给后台的参数值 key/value
  }
  if (query.iseffective !== '' && query.iseffective !== null && query.iseffective !== undefined) {
    params.append('iseffective', query.iseffective) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value

  return request({
    url: '/diffPrice/searchDiffPrice',
    method: 'post',
    data: params
  })
}

// 新增差异价格
export function addDiffPrice(query) {
  var params = new URLSearchParams()
  if (query.categoryId !== '' && query.categoryId !== null && query.categoryId !== undefined) {
    params.append('categoryId', query.categoryId) // 你要传给后台的参数值 key/value
  }
  if (query.useMonth !== '' && query.useMonth !== null && query.useMonth !== undefined) {
    params.append('useMonth', query.useMonth) // 你要传给后台的参数值 key/value
  }
  if (query.iseffective !== '' && query.iseffective !== null && query.iseffective !== undefined) {
    params.append('iseffective', query.iseffective) // 你要传给后台的参数值 key/value
  }
  if (query.useType !== '' && query.useType !== null && query.useType !== undefined) {
    params.append('useType', query.useType) // 你要传给后台的参数值 key/value
  }
  if (query.diffMoney !== '' && query.diffMoney !== null && query.diffMoney !== undefined) {
    params.append('diffMoney', query.diffMoney) // 你要传给后台的参数值 key/value
  }
  if (query.createId !== '' && query.createId !== null && query.createId !== undefined) {
    params.append('createId', query.createId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/diffPrice/addDiffPrice',
    method: 'post',
    data: params
  })
}

// 修改差异价格
export function updateDiffPrice(query) {
  var params = new URLSearchParams()
  if (query.diffMoney !== '' && query.diffMoney !== null && query.diffMoney !== undefined) {
    params.append('diffMoney', query.diffMoney) // 你要传给后台的参数值 key/value
  }
  if (query.categoryId !== '' && query.categoryId !== null && query.categoryId !== undefined) {
    params.append('categoryId', query.categoryId) // 你要传给后台的参数值 key/value
  }
  if (query.useMonth !== '' && query.useMonth !== null && query.useMonth !== undefined) {
    params.append('useMonth', query.useMonth) // 你要传给后台的参数值 key/value
  }
  if (query.useType !== '' && query.useType !== null && query.useType !== undefined) {
    params.append('useType', query.useType) // 你要传给后台的参数值 key/value
  }
  if (query.isEffective !== '' && query.isEffective !== null && query.isEffective !== undefined) {
    params.append('iseffective', query.isEffective) // 你要传给后台的参数值 key/value
  }
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/diffPrice/updateDiffPrice',
    method: 'post',
    data: params
  })
}

// 删除差异价格
export function deleteDiffPrice(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('ids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/diffPrice/deleteDiffPrice',
    method: 'post',
    data: params
  })
}

// 获取电池分类
export function batteryList() {
  var params = new URLSearchParams()
  params.append('parentId', 5) // 你要传给后台的参数值 key/value
  return request({
    url: '/productclassfy/batteryList',
    method: 'post',
    data: params
  })
}

// 获取其他分类
export function batteryList2(query) {
  var params = new URLSearchParams()
  params.append('parentId', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/productclassfy/batteryList',
    method: 'post',
    data: params
  })
}
