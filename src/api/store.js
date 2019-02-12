import request from '@/utils/request'

// 门店列表
export function getrepositorylist(query) {
  var params = new URLSearchParams()
  params.append('phone', query.phone) // 你要传给后台的参数值 key/value
  params.append('repositoryname', query.repositoryname) // 你要传给后台的参数值 key/value
  params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/repository/getrepositorylist',
    method: 'post',
    data: params
  })
}

// 新建门店
export function addrepository(query) {
  var params = new URLSearchParams()
  params.append('longitude', query.longitude) // 你要传给后台的参数值 key/value
  params.append('latitude', query.latitude) // 你要传给后台的参数值 key/value
  params.append('address', query.address) // 你要传给后台的参数值 key/value
  params.append('phone', query.phone) // 你要传给后台的参数值 key/value
  params.append('regionId', query.regionId) // 你要传给后台的参数值 key/value
  params.append('name', query.name) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/repository/addrepository',
    method: 'post',
    data: params
  })
}

// 获取门店经理
export function getremplist(query) {
  var params = new URLSearchParams()
  params.append('repositoryid', query.id) // 你要传给后台的参数值 key/value
  params.append('pagenum', 1) // 你要传给后台的参数值 key/value
  params.append('pagesize', 10000) // 你要传给后台的参数值 key/value
  params.append('stat', 1) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/repository/getremplist',
    method: 'post',
    data: params
  })
}

// 修改门店
export function updaterepository(query) {
  var params = new URLSearchParams()
  params.append('repositoryid', query.id) // 你要传给后台的参数值 key/value
  params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  params.append('phone', query.phone) // 你要传给后台的参数值 key/value
  params.append('managerid', query.managerid) // 你要传给后台的参数值 key/value
  params.append('regionid', query.regionId) // 你要传给后台的参数值 key/value
  params.append('repositoryname', query.name) // 你要传给后台的参数值 key/value
  params.append('address', query.address) // 你要传给后台的参数值 key/value
  params.append('longitude', query.longitude) // 你要传给后台的参数值 key/value
  params.append('latitude', query.latitude) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/repository/updaterepository',
    method: 'post',
    data: params
  })
}
