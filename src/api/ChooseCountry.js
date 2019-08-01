import request from '@/utils/request'

// 新建质检报告
export function chinaVerify(query) {
  var params = new URLSearchParams()
  params.append('account', query) // 你要传给后台的参数值 key/value
  params.append('loginRepositoryId', 0)
  params.append('regionIds', 0)
  return request({
    url: '/china/employee/getemplist',
    method: 'post',
    data: params
  })
}

// 质检报告单列表
export function philippinesVerify(query) {
  var params = new URLSearchParams()
  params.append('account', query) // 你要传给后台的参数值 key/value
  params.append('loginRepositoryId', 0)
  params.append('regionIds', 0)
  return request({
    url: '/philippines/employee/getemplist',
    method: 'post',
    data: params
  })
}
