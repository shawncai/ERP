import request from '@/utils/request'
// 新建补货周期设置
export function addinventoryreplenishment(query) {
  var params = new URLSearchParams()
  if (query.circle !== '' || query.circle !== undefined || query.circle !== null) {
    params.append('circle', query.circle) // 你要传给后台的参数值 key/value
  }
  if (query.nomalDay !== '' || query.nomalDay !== undefined || query.nomalDay !== null) {
    params.append('nomalDay', query.nomalDay) // 你要传给后台的参数值 key/value
  }
  if (query.emergencyDay !== '' || query.emergencyDay !== undefined || query.emergencyDay !== null) {
    params.append('emergencyDay', query.emergencyDay) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' || query.repositoryId !== undefined || query.repositoryId !== null) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.iseffective !== '' || query.iseffective !== undefined || query.iseffective !== null) {
    params.append('isEffective', query.iseffective) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/smartreplenishment/addRules',
    method: 'post',
    data: params
  })
}

// 查询补货周期设置
export function queryinventoryreplenishment(query) {
  var params = new URLSearchParams()
  if (query.id !== '' || query.id !== undefined || query.id !== null) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' || query.repositoryId !== undefined || query.repositoryId !== null) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.iseffective !== '' || query.iseffective !== undefined || query.iseffective !== null) {
    params.append('iseffective', query.iseffective) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/smartreplenishment/searchRules',
    method: 'post',
    data: params
  })
}

export function updateinventoryreplenishment(query) {
  var params = new URLSearchParams()
  if (query.circle !== '' || query.circle !== undefined || query.circle !== null) {
    params.append('circle', query.circle) // 你要传给后台的参数值 key/value
  }
  if (query.nomalDay !== '' || query.nomalDay !== undefined || query.nomalDay !== null) {
    params.append('nomalDay', query.nomalDay) // 你要传给后台的参数值 key/value
  }
  if (query.emergencyDay !== '' || query.emergencyDay !== undefined || query.emergencyDay !== null) {
    params.append('emergencyDay', query.emergencyDay) // 你要传给后台的参数值 key/value
  }
  if (query.id !== '' || query.id !== undefined || query.id !== null) {
    params.append('id', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.isEffective !== '' || query.isEffective !== undefined || query.isEffective !== null) {
    params.append('iseffective', query.isEffective) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/smartreplenishment/updateRules',
    method: 'post',
    data: params
  })
}

