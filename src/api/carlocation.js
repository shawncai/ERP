import request from '@/utils/request'

// 所有车辆
export function vehicleStat() {
  return request({
    url: '/vehicle/vehicleStat',
    method: 'post'
  })
}

// 获取车辆信息
export function getVehicleStat(query) {
  var params = new URLSearchParams()
  params.append('snCode', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/vehicle/getVehicleStat',
    method: 'post',
    data: params
  })
}
