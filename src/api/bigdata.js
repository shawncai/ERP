import request from '@/utils/request'

// 维修问题
export function sericecomponentcount(query) {
  return request({
    url: '/pss/servicecount/sericecomponentcount',
    method: 'post',
    params: query
  })
}

// 维修完成率
export function serviceitemscount2(query) {
  var params = new URLSearchParams()
  params.append('regionid', query.regionid) // 你要传给后台的参数值 key/value
  params.append('date', query.date) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/servicecount/serviceitemscount2',
    method: 'post',
    data: params
  })
}

// 维修延误统计
export function delaycount(query) {
  var params = new URLSearchParams()
  params.append('regionid', query.regionid) // 你要传给后台的参数值 key/value
  params.append('date', query.date) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/servicecount/delaycount',
    method: 'post',
    data: params
  })
}
// 维修延误统计更多数据
export function delaycount2(query) {
  var params = new URLSearchParams()
  params.append('regionid', query.regionid) // 你要传给后台的参数值 key/value
  params.append('date', query.date) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/servicecount/delaycount1',
    method: 'post',
    data: params
  })
}
// 维修延误统计更多数据
export function delaycount2more(date, repositoryid) {
  var params = new URLSearchParams()
  params.append('repositoryid', repositoryid) // 你要传给后台的参数值 key/value
  params.append('date', date) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/servicecount/delaycount1',
    method: 'post',
    data: params
  })
}

// 维修问题百分比
export function sericecomponentcount1(query) {
  return request({
    url: '/pss/servicecount/sericecomponentcount1',
    method: 'post',
    params: query
  })
}

// 维修完成统计率
export function serviceitemscount3(query) {
  var params = new URLSearchParams()
  params.append('regionid', query.regionid) // 你要传给后台的参数值 key/value
  params.append('date', query.date) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/servicecount/serviceitemscount3',
    method: 'post',
    data: params
  })
}

// 门店id
export function serviceitemscountmen(repositoryid, date) {
  var params = new URLSearchParams()
  params.append('repositoryid', repositoryid) // 你要传给后台的参数值 key/value
  params.append('date', date) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/servicecount/serviceitemscount3',
    method: 'post',
    data: params
  })
}
