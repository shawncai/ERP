import request from '@/utils/request'

// 部门列表
export function getdeptlist(query) {
  return request({
    url: 'http://192.168.1.45:8080/erp/country/getdeptlist',
    method: 'post',
    params: query
  })
}

// 仓库类型
export function searchRepCategory() {
  var params = new URLSearchParams()
  params.append('pagenum', 1) // 你要传给后台的参数值 key/value
  params.append('pagesize', 99999) // 你要传给后台的参数值 key/value
  return request({
    url: 'http://192.168.1.45:8080/erp/repository/searchRepCategory',
    method: 'post',
    data: params
  })
}
