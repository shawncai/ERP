import request from '@/utils/request'

// 物流车辆管理新增
export function addcar(query) {
  var params = new URLSearchParams()
  if (query.cartype !== '' && query.cartype !== null && query.cartype !== undefined) {
    params.append('cartype', query.cartype) // 你要传给后台的参数值 key/value
  }
  if (query.carnumber !== '' && query.carnumber !== null && query.carnumber !== undefined) {
    params.append('carnumber', query.carnumber) // 你要传给后台的参数值 key/value
  }
  if (query.carname !== '' && query.carname !== null && query.carname !== undefined) {
    params.append('carname', query.carname) // 你要传给后台的参数值 key/value
  }
  if (query.licencenumber !== '' && query.licencenumber !== null && query.licencenumber !== undefined) {
    params.append('licencenumber', query.licencenumber) // 你要传给后台的参数值 key/value
  }
  if (query.carload !== '' && query.carload !== null && query.carload !== undefined) {
    params.append('carload', query.carload) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '' && query.stat !== null && query.stat !== undefined) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  if (query.drivers !== '' && query.drivers !== null && query.drivers !== undefined) {
    params.append('drivers', query.drivers) // 你要传给后台的参数值 key/value
  }
  if (query.createid !== '' && query.createid !== null && query.createid !== undefined) {
    params.append('createid', query.createid) // 你要传给后台的参数值 key/value
  }
  if (query.driverNames !== '' && query.driverNames !== null && query.driverNames !== undefined) {
    params.append('driverNames', query.driverNames) // 你要传给后台的参数值 key/value
  }
  return request({
    url: 'http://192.168.1.45:8080/erp/logisticsCar/addcar',
    method: 'post',
    data: params
  })
}

// 物流车辆管理列表
export function carlist(query) {
  var params = new URLSearchParams()
  if (query.cartype !== '' && query.cartype !== null && query.cartype !== undefined) {
    params.append('cartype', query.cartype) // 你要传给后台的参数值 key/value
  }
  if (query.carnumber !== '' && query.carnumber !== null && query.carnumber !== undefined) {
    params.append('carnumber', query.carnumber) // 你要传给后台的参数值 key/value
  }
  if (query.carname !== '' && query.carname !== null && query.carname !== undefined) {
    params.append('carname', query.carname) // 你要传给后台的参数值 key/value
  }
  if (query.licencenumber !== '' && query.licencenumber !== null && query.licencenumber !== undefined) {
    params.append('licencenumber', query.licencenumber) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '' && query.stat !== null && query.stat !== undefined) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: 'http://192.168.1.45:8080/erp/logisticsCar/carlist',
    method: 'post',
    data: params
  })
}

// 物流车辆管理删除
export function deletecar(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('logicarids', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: 'http://192.168.1.45:8080/erp/logisticsCar/deletecar',
    method: 'post',
    data: params
  })
}

// 物流车辆管理修改
export function updatecar(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('logicarid', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.carType !== '' && query.carType !== null && query.carType !== undefined) {
    params.append('cartype', query.carType) // 你要传给后台的参数值 key/value
  }
  if (query.carNumber !== '' && query.carNumber !== null && query.carNumber !== undefined) {
    params.append('carnumber', query.carNumber) // 你要传给后台的参数值 key/value
  }
  if (query.carName !== '' && query.carName !== null && query.carName !== undefined) {
    params.append('carname', query.carName) // 你要传给后台的参数值 key/value
  }
  if (query.licenceNumber !== '' && query.licenceNumber !== null && query.licenceNumber !== undefined) {
    params.append('licencenumber', query.licenceNumber) // 你要传给后台的参数值 key/value
  }
  if (query.carLoad !== '' && query.carLoad !== null && query.carLoad !== undefined) {
    params.append('carload', query.carLoad) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '' && query.stat !== null && query.stat !== undefined) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  if (query.driverNames !== '' && query.driverNames !== null && query.driverNames !== undefined) {
    params.append('driverNames', query.driverNames) // 你要传给后台的参数值 key/value
  }
  return request({
    url: 'http://192.168.1.45:8080/erp/logisticsCar/updatecar',
    method: 'post',
    data: params
  })
}

// 派车单新增
export function addsendcar(query) {
  var params = new URLSearchParams()
  if (query.sourcenumber !== '' && query.sourcenumber !== null && query.sourcenumber !== undefined) {
    params.append('sourcenumber', query.sourcenumber) // 你要传给后台的参数值 key/value
  }
  if (query.carnumber !== '' && query.carnumber !== null && query.carnumber !== undefined) {
    params.append('carnumber', query.carnumber) // 你要传给后台的参数值 key/value
  }
  if (query.outpersonid !== '' && query.outpersonid !== null && query.outpersonid !== undefined) {
    params.append('outpersonid', query.outpersonid) // 你要传给后台的参数值 key/value
  }
  if (query.address !== '' && query.address !== null && query.address !== undefined) {
    params.append('address', query.address) // 你要传给后台的参数值 key/value
  }
  if (query.outphone !== '' && query.outphone !== null && query.outphone !== undefined) {
    params.append('outphone', query.outphone) // 你要传给后台的参数值 key/value
  }
  if (query.driver !== '' && query.driver !== null && query.driver !== undefined) {
    params.append('driver', query.driver) // 你要传给后台的参数值 key/value
  }
  if (query.createid !== '' && query.createid !== null && query.createid !== undefined) {
    params.append('createid', query.createid) // 你要传给后台的参数值 key/value
  }
  if (query.starttime !== '' && query.starttime !== null && query.starttime !== undefined) {
    params.append('starttime', query.starttime) // 你要传给后台的参数值 key/value
  }
  return request({
    url: 'http://192.168.1.45:8080/erp/logisticsCar/addsendcar',
    method: 'post',
    data: params
  })
}

// 派车单列表
export function sendcarlist(query) {
  var params = new URLSearchParams()
  if (query.licencenumber !== '' && query.licencenumber !== null && query.licencenumber !== undefined) {
    params.append('licencenumber', query.licencenumber) // 你要传给后台的参数值 key/value
  }
  if (query.carnumber !== '' && query.carnumber !== null && query.carnumber !== undefined) {
    params.append('carnumber', query.carnumber) // 你要传给后台的参数值 key/value
  }
  if (query.outperson !== '' && query.outperson !== null && query.outperson !== undefined) {
    params.append('outperson', query.outperson) // 你要传给后台的参数值 key/value
  }
  if (query.address !== '' && query.address !== null && query.address !== undefined) {
    params.append('address', query.address) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '' && query.stat !== null && query.stat !== undefined) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  if (query.starttime !== '' && query.starttime !== null && query.starttime !== undefined) {
    params.append('starttime', query.starttime) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: 'http://192.168.1.45:8080/erp/logisticsCar/sendcarlist',
    method: 'post',
    data: params
  })
}

// 派车单删除
export function deleteoutcar(query) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('outcarids', query) // 你要传给后台的参数值 key/value
  }
  return request({
    url: 'http://192.168.1.45:8080/erp/logisticsCar/deleteoutcar',
    method: 'post',
    data: params
  })
}

// 派车单修改
export function updatesendcar(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('outcarid', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.carNumber !== '' && query.carNumber !== null && query.carNumber !== undefined) {
    params.append('carnumber', query.carNumber) // 你要传给后台的参数值 key/value
  }
  if (query.outpersonid !== '' && query.outpersonid !== null && query.outpersonid !== undefined) {
    params.append('outpersonid', query.outpersonid) // 你要传给后台的参数值 key/value
  }
  if (query.address !== '' && query.address !== null && query.address !== undefined) {
    params.append('address', query.address) // 你要传给后台的参数值 key/value
  }
  if (query.outPhone !== '' && query.outPhone !== null && query.outPhone !== undefined) {
    params.append('outphone', query.outPhone) // 你要传给后台的参数值 key/value
  }
  if (query.driver !== '' && query.driver !== null && query.driver !== undefined) {
    params.append('driver', query.driver) // 你要传给后台的参数值 key/value
  }
  if (query.startTime !== '' && query.startTime !== null && query.startTime !== undefined) {
    params.append('starttime', query.startTime) // 你要传给后台的参数值 key/value
  }
  return request({
    url: 'http://192.168.1.45:8080/erp/logisticsCar/updatesendcar',
    method: 'post',
    data: params
  })
}
