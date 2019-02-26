import request from '@/utils/request'

// 部门列表
export function getdeptlist(query) {
  return request({
    url: 'http://192.168.1.45:8080/erp/country/getdeptlist',
    method: 'post',
    params: query
  })
}

// 添加员工
export function register(query) {
  var params = new URLSearchParams()
  params.append('firstname', query.firstname) // 你要传给后台的参数值 key/value
  params.append('middlename', query.middlename) // 你要传给后台的参数值 key/value
  params.append('lastname', query.lastname) // 你要传给后台的参数值 key/value
  params.append('passwd', query.passwd) // 你要传给后台的参数值 key/value
  params.append('email', query.email) // 你要传给后台的参数值 key/value
  params.append('phone', query.phone) // 你要传给后台的参数值 key/value
  params.append('gender', query.gender) // 你要传给后台的参数值 key/value
  params.append('countryid', query.country) // 你要传给后台的参数值 key/value
  params.append('provinceid', query.provinceid) // 你要传给后台的参数值 key/value
  params.append('cityid', query.cityid) // 你要传给后台的参数值 key/value
  params.append('address', query.address) // 你要传给后台的参数值 key/value
  params.append('birthday', query.birthday) // 你要传给后台的参数值 key/value
  params.append('account', query.account) // 你要传给后台的参数值 key/value
  params.append('jobnumber', query.jobnumber) // 你要传给后台的参数值 key/value
  params.append('deptid', query.deptid) // 你要传给后台的参数值 key/value
  params.append('roleid', query.roleid) // 你要传给后台的参数值 key/value
  params.append('postid', query.postid) // 你要传给后台的参数值 key/value
  params.append('repositoryid', query.repositoryid) // 你要传给后台的参数值 key/value
  params.append('regionid', query.regionid1) // 你要传给后台的参数值 key/value
  params.append('certificatetype', query.certificatetype) // 你要传给后台的参数值 key/value
  params.append('certificatenumber', query.certificatenumber) // 你要传给后台的参数值 key/value
  return request({
    url: 'http://192.168.1.45:8080/erp/employee/register',
    method: 'post',
    data: params
  })
}
