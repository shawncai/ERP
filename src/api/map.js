import request from '@/utils/request'

// 经纬点
export function getrepositorybyreid() {
  var params = new URLSearchParams()
  params.append('regionid', 0) // 你要传给后台的参数值 key/value
  params.append('repositoryid', 0) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/repository/getrepositorybyreid',
    method: 'post',
    data: params
  })
}

// 员工轨迹
export function getpositionbydate(userid, date) {
  var params = new URLSearchParams()
  params.append('userid', userid) // 你要传给后台的参数值 key/value
  params.append('date', date) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/position/getpositionbydate',
    method: 'post',
    data: params
  })
}

// 维修轨迹
export function getposition(userid, serviceorderid) {
  var params = new URLSearchParams()
  params.append('userid', userid) // 你要传给后台的参数值 key/value
  params.append('serviceorderid', serviceorderid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/position/getposition',
    method: 'post',
    data: params
  })
}
