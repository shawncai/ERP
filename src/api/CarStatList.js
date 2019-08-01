import request from '@/utils/request'

// 车辆使用情况
export function carStatList(query) {
  var params = new URLSearchParams()
  if (query.licencenumber !== '' && query.licencenumber !== null && query.licencenumber !== undefined) {
    params.append('licencenumber', query.licencenumber) // 你要传给后台的参数值 key/value
  }
  if (query.carnumber !== '' && query.carnumber !== null && query.carnumber !== undefined) {
    params.append('carnumber', query.carnumber) // 你要传给后台的参数值 key/value
  }
  if (query.outPersonId !== '' && query.outPersonId !== null && query.outPersonId !== undefined) {
    params.append('outPersonId', query.outPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.carStat !== '' && query.carStat !== null && query.carStat !== undefined) {
    params.append('carStat', query.carStat) // 你要传给后台的参数值 key/value
  }
  if (query.carType !== '' && query.carType !== null && query.carType !== undefined) {
    params.append('carType', query.carType) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '' && query.stat !== null && query.stat !== undefined) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.createPersonId !== '' && query.createPersonId !== null && query.createPersonId !== undefined) {
    params.append('createPersonId', query.createPersonId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pageNum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pageSize) // 你要传给后台的参数值 key/value
  return request({
    url: '/logisticsCar/carStatList',
    method: 'post',
    data: params
  })
}
