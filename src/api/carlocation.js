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
  if (query !== '' && query !== null && query !== undefined) {
    params.append('snCode', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/vehicle/getVehicleStat',
    method: 'post',
    data: params
  })
}

// 获取客户信息
export function customerInfo(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('customerId', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/customer/customerInfo',
    method: 'post',
    data: params
  })
}

// 获取车辆详细信息
export function rideCount(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('customerId', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('snCode', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/vehicle/rideCount',
    method: 'post',
    data: params
  })
}

// 锁定车辆
export function userLockCar(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('deviceId', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/remoteControl/lockCar',
    method: 'post',
    data: params
  })
}

// 车辆开锁
export function userUnLockCar(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('deviceId', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/remoteControl/unLockCar',
    method: 'post',
    data: params
  })
}

// 判断车辆锁车状态
export function getlockStat(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('snCode', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/vehicle/getVehicleStat',
    method: 'post',
    data: params
  })
}
