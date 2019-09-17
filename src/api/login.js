import request from '@/utils/request'

export function loginByUsername(username, password) {
  var params = new URLSearchParams()
  params.append('username', username) // 你要传给后台的参数值 key/value
  params.append('passwd', password)
  return request({
    url: '/employee/login',
    method: 'post',
    data: params
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  var params = new URLSearchParams()
  params.append('token', token) // 你要传给后台的参数值 key/value
  return request({
    url: '/employee/getInforByToken',
    method: 'post',
    data: params
  })
}

export function getstatByToken(token) {
  var params = new URLSearchParams()
  params.append('token', token) // 你要传给后台的参数值 key/value
  return request({
    url: '/employee/getInforByToken',
    method: 'post',
    data: params
  })
}
