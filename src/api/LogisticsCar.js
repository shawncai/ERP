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
    url: '/logisticsCar/addcar',
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
    url: '/logisticsCar/carlist',
    method: 'post',
    data: params
  })
}

// 物流车使用情况
export function useLogList(query) {
  var params = new URLSearchParams()
  if (query.outPersonId !== '' && query.outPersonId !== null && query.outPersonId !== undefined) {
    params.append('outPersonId', query.outPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.carId !== '' && query.carId !== null && query.carId !== undefined) {
    params.append('carId', query.carId) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/logisticsCar/useLogList',
    method: 'post',
    data: params
  })
}

// 物流车辆管理删除
export function deletecar(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('logicarids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/logisticsCar/deletecar',
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
    url: '/logisticsCar/updatecar',
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
    url: '/logisticsCar/addsendcar',
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
    url: '/logisticsCar/sendcarlist',
    method: 'post',
    data: params
  })
}

// 派车单删除
export function deleteoutcar(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('outcarids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/logisticsCar/deleteoutcar',
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
    url: '/logisticsCar/updatesendcar',
    method: 'post',
    data: params
  })
}

// 新建回车单
export function addreturncar(query) {
  var params = new URLSearchParams()
  if (query.outnumber !== '' && query.outnumber !== null && query.outnumber !== undefined) {
    params.append('outnumber', query.outnumber) // 你要传给后台的参数值 key/value
  }
  if (query.returnaddress !== '' && query.returnaddress !== null && query.returnaddress !== undefined) {
    params.append('returnaddress', query.returnaddress) // 你要传给后台的参数值 key/value
  }
  if (query.returnpersonid !== '' && query.returnpersonid !== null && query.returnpersonid !== undefined) {
    params.append('returnpersonid', query.returnpersonid) // 你要传给后台的参数值 key/value
  }
  if (query.returntime !== '' && query.returntime !== null && query.returntime !== undefined) {
    params.append('returntime', query.returntime) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/logisticsCar/addreturncar',
    method: 'post',
    data: params
  })
}

// 回车单列表
export function returncarlist(query) {
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
  if (query.outnumber !== '' && query.outnumber !== null && query.outnumber !== undefined) {
    params.append('outnumber', query.outnumber) // 你要传给后台的参数值 key/value
  }
  if (query.starttime !== '' && query.starttime !== null && query.starttime !== undefined) {
    params.append('starttime', query.starttime) // 你要传给后台的参数值 key/value
  }
  if (query.checkintime !== '' && query.checkintime !== null && query.checkintime !== undefined) {
    params.append('checkintime', query.checkintime) // 你要传给后台的参数值 key/value
  }
  if (query.returntime !== '' && query.returntime !== null && query.returntime !== undefined) {
    params.append('returntime', query.returntime) // 你要传给后台的参数值 key/value
  }
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/logisticsCar/returncarlist',
    method: 'post',
    data: params
  })
}

// 回车单删除
export function deletereturncar(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('returncarids', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('operatorId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/logisticsCar/deletereturncar',
    method: 'post',
    data: params
  })
}

// 回车单修改
export function updatereturncar(query) {
  var params = new URLSearchParams()
  if (query.id !== '' && query.id !== null && query.id !== undefined) {
    params.append('returncarid', query.id) // 你要传给后台的参数值 key/value
  }
  if (query.returnAddress !== '' && query.returnAddress !== null && query.returnAddress !== undefined) {
    params.append('returnaddress', query.returnAddress) // 你要传给后台的参数值 key/value
  }
  if (query.returnPersonId !== '' && query.returnPersonId !== null && query.returnPersonId !== undefined) {
    params.append('returnpersonid', query.returnPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.returnTime !== '' && query.returnTime !== null && query.returnTime !== undefined) {
    params.append('returntime', query.returnTime) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/logisticsCar/updatereturncar',
    method: 'post',
    data: params
  })
}
