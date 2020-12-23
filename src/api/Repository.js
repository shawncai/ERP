import request from '@/utils/request'

// 部门列表
export function getdeptlist(query) {
  return request({
    url: '/country/getdeptlist',
    method: 'post',
    params: query
  })
}

// 仓库类型
export function searchRepCategory() {
  var params = new URLSearchParams()
  params.append('pagenum', 1) // 你要传给后台的参数值 key/value
  params.append('pagesize', 99999) // 你要传给后台的参数值 key/value
  return request({
    url: '/repository/searchRepCategory',
    method: 'post',
    data: params
  })
}

// 新建仓库
export function create(query) {
  var params = new URLSearchParams()
  if (query.categoryId !== '' && query.categoryId !== null && query.categoryId !== undefined) {
    params.append('categoryId', query.categoryId) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryName !== '' && query.repositoryName !== null) {
    params.append('repositoryName', query.repositoryName) // 你要传给后台的参数值 key/value
  }
  if (query.address !== '' && query.address !== null) {
    params.append('address', query.address) // 你要传给后台的参数值 key/value
  }
  if (query.longitude !== '' && query.longitude !== null) {
    params.append('longitude', query.longitude) // 你要传给后台的参数值 key/value
  }
  if (query.latitude !== '' && query.latitude !== null) {
    params.append('latitude', query.latitude) // 你要传给后台的参数值 key/value
  }
  if (query.managerPeopleId !== '' && query.managerPeopleId !== null) {
    params.append('managerPeopleId', query.managerPeopleId) // 你要传给后台的参数值 key/value
  }
  if (query.createTime !== '' && query.createTime !== null) {
    params.append('createTime', query.createTime) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '' && query.stat !== null) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  if (query.description !== '' && query.description !== null) {
    params.append('description', query.description) // 你要传给后台的参数值 key/value
  }
  if (query.regionId !== '' && query.regionId !== null) {
    params.append('regionId', query.regionId) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  if (query.regionManagerId !== '' && query.regionManagerId !== null) {
    params.append('regionManagerId', query.regionManagerId) // 你要传给后台的参数值 key/value
  }
  if (query.attributes !== '' && query.attributes !== null) {
    params.append('attributes', query.attributes) // 你要传给后台的参数值 key/value
  }
  if (query.countryId !== '' && query.countryId !== null) {
    params.append('countryId', query.countryId) // 你要传给后台的参数值 key/value
  }
  if (query.phone !== '' && query.phone !== null) {
    params.append('phone', query.phone) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/repository/create',
    method: 'post',
    data: params
  })
}

// 列表和查询仓库门店
export function searchRepository2(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryName !== '' && query.repositoryName !== null && query.repositoryName !== undefined) {
    params.append('repositoryName', query.repositoryName) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  if (query.iseffective !== '' && query.iseffective !== null && query.iseffective !== undefined) {
    params.append('iseffective', query.iseffective) // 你要传给后台的参数值 key/value
  }
  if (query.loginRepositoryId !== '' && query.loginRepositoryId !== undefined && query.loginRepositoryId !== null) {
    params.append('loginRepositoryId', query.loginRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== undefined && query.regionIds !== null) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  if (query.regionId !== '' && query.regionId !== null && query.regionId !== undefined) {
    params.append('regionId', query.regionId) // 你要传给后台的参数值 key/value
  }
  if (query.countyrId !== '' && query.countyrId !== null && query.countyrId !== undefined) {
    params.append('countyrId', query.countyrId) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  params.append('iseffective', 1) // 你要传给后台的参数值 key/value
  return request({
    url: '/repository/searchRepository',
    method: 'post',
    data: params
  })
}

// 仓库页面查询全部仓库
export function searchRepository3(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryName !== '' && query.repositoryName !== null && query.repositoryName !== undefined) {
    params.append('repositoryName', query.repositoryName) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  if (query.iseffective !== '' && query.iseffective !== null && query.iseffective !== undefined) {
    params.append('iseffective', query.iseffective) // 你要传给后台的参数值 key/value
  }
  if (query.loginRepositoryId !== '' && query.loginRepositoryId !== undefined && query.loginRepositoryId !== null) {
    params.append('loginRepositoryId', query.loginRepositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== undefined && query.regionIds !== null) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  if (query.regionId !== '' && query.regionId !== null && query.regionId !== undefined) {
    params.append('regionId', query.regionId) // 你要传给后台的参数值 key/value
  }
  if (query.countyrId !== '' && query.countyrId !== null && query.countyrId !== undefined) {
    params.append('countyrId', query.countyrId) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/repository/searchRepository',
    method: 'post',
    data: params
  })
}

// 修改仓库门店
export function update(query) {
  var params = new URLSearchParams()
  if (query.categoryId !== '' && query.categoryId !== null && query.categoryId !== undefined) {
    params.append('categoryId', query.categoryId) // 你要传给后台的参数值 key/value
  }
  if (query.phone !== '' && query.phone !== null) {
    params.append('phone', query.phone) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryName !== '' && query.repositoryName !== null && query.repositoryName !== undefined) {
    params.append('repositoryName', query.repositoryName) // 你要传给后台的参数值 key/value
  }
  if (query.address !== '' && query.address !== null && query.address !== undefined) {
    params.append('address', query.address) // 你要传给后台的参数值 key/value
  }
  if (query.longitude !== '' && query.longitude !== null && query.longitude !== undefined) {
    params.append('longitude', query.longitude) // 你要传给后台的参数值 key/value
  }
  if (query.latitude !== '' && query.latitude !== null && query.latitude !== undefined) {
    params.append('latitude', query.latitude) // 你要传给后台的参数值 key/value
  }
  if (query.createTime !== '' && query.createTime !== null && query.createTime !== undefined) {
    params.append('createTime', query.createTime) // 你要传给后台的参数值 key/value
  }
  if (query.managerPeopleId !== '' && query.managerPeopleId !== null && query.managerPeopleId !== undefined) {
    params.append('managerPeopleId', query.managerPeopleId) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '' && query.stat !== null && query.stat !== undefined) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  if (query.description !== '' && query.description !== null && query.description !== undefined) {
    params.append('description', query.description) // 你要传给后台的参数值 key/value
  }
  if (query.regionId !== '' && query.regionId !== null && query.regionId !== undefined) {
    params.append('regionId', query.regionId) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null && query.type !== undefined) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  if (query.regionManagerId !== '' && query.regionManagerId !== null && query.regionManagerId !== undefined) {
    params.append('regionManagerId', query.regionManagerId) // 你要传给后台的参数值 key/value
  }
  if (query.attributes !== '' && query.attributes !== null && query.attributes !== undefined) {
    params.append('attributes', query.attributes) // 你要传给后台的参数值 key/value
  }
  if (query.countryId !== '' && query.countryId !== null && query.countryId !== undefined) {
    params.append('countryId', query.countryId) // 你要传给后台的参数值 key/value
  }
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/repository/update',
    method: 'post',
    data: params
  })
}

// 查询仓库门店分类属性
export function searchRepCategory2(query) {
  var params = new URLSearchParams()
  if (query.categoryname !== '' && query.categoryname !== null) {
    params.append('categoryname', query.categoryname) // 你要传给后台的参数值 key/value
  }
  if (query.iseffective !== '' && query.iseffective !== null) {
    params.append('iseffective', query.iseffective) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/repository/searchRepCategory',
    method: 'post',
    data: params
  })
}

// 新增分类属性
export function addRepCategory(query) {
  var params = new URLSearchParams()
  if (query.categoryname !== '' && query.categoryname !== null) {
    params.append('categoryname', query.categoryname) // 你要传给后台的参数值 key/value
  }
  if (query.category !== '' && query.category !== null) {
    params.append('category', query.category) // 你要传给后台的参数值 key/value
  }
  if (query.iseffective !== '' && query.iseffective !== null) {
    params.append('iseffective', query.iseffective) // 你要传给后台的参数值 key/value
  }
  if (query.parentId !== '' && query.parentId !== null) {
    params.append('parentId', query.parentId) // 你要传给后台的参数值 key/value
  }
  if (query.type !== '' && query.type !== null) {
    params.append('type', query.type) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/repository/addRepCategory',
    method: 'post',
    data: params
  })
}

// 修改分类属性
export function updateRepCategory(query) {
  var params = new URLSearchParams()
  if (query.parentId !== '' && query.parentId !== null) {
    params.append('parentId', query.parentId) // 你要传给后台的参数值 key/value
  }
  if (query.categoryName !== '' && query.categoryName !== null && query.categoryName !== undefined) {
    params.append('categoryname', query.categoryName) // 你要传给后台的参数值 key/value
  }
  if (query.isEffective !== '' && query.isEffective !== null) {
    params.append('iseffective', query.isEffective) // 你要传给后台的参数值 key/value
  }
  if (query.id !== '' && query.id !== null) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/repository/updateRepCategory',
    method: 'post',
    data: params
  })
}

// 删除分类属性
export function delateRepCategory(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/repository/delateRepCategory',
    method: 'post',
    data: params
  })
}

// 删除仓库门店
export function deleteRepository(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/repository/deleteRepository',
    method: 'post',
    data: params
  })
}

// 仓库停用和启用
export function startorend(query, stat) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null) {
    params.append('modelids', query) // 你要传给后台的参数值 key/value
  }
  if (stat !== '' && stat !== null) {
    params.append('iseffective', stat) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/repository/startorend',
    method: 'post',
    data: params
  })
}

// 仓库批量导入
export function manyinsert(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('repositoryJson', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/repository/manyinsert',
    method: 'post',
    data: params
  })
}
