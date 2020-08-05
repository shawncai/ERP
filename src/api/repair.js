import request from '@/utils/request'

// 门店维修员工列表
export function getServiceEmp(serviceid) {
  var params = new URLSearchParams()
  if (serviceid !== '' && serviceid !== null && serviceid !== undefined) {
    params.append('repositoryId', serviceid) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/repository/getServiceEmp',
    method: 'post',
    data: params
  })
}

// 维修列表
export function repairList(query) {
  var params = new URLSearchParams()
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  params.append('username', query.username) // 你要传给后台的参数值 key/value
  params.append('begintime', query.begintime) // 你要传给后台的参数值 key/value
  params.append('endtime', query.endtime) // 你要传给后台的参数值 key/valuedelaycount
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  params.append('regionid', query.regionid) // 你要传给后台的参数值 key/value
  params.append('expectrepositoryid', query.expectrepositoryid) // 你要传给后台的参数值 key/value
  return request({
    url: '/admin/service/getservicelistbycondition',
    method: 'post',
    data: params
  })
}

// 维修详情
export function repairDetail(serviceid) {
  var params = new URLSearchParams()
  params.append('serviceid', serviceid) // 你要传给后台的参数值 key/value
  return request({
    url: '/admin/service/getservicedetail',
    method: 'post',
    data: params
  })
}

//  取消已分配的订单重新分配给员工
export function serviceretoemp(serviceid) {
  var params = new URLSearchParams()
  params.append('serviceid', serviceid) // 你要传给后台的参数值 key/value
  return request({
    url: '/admin/service/serviceretoemp',
    method: 'post',
    data: params
  })
}

//  取消已分配的订单重新分配给员工
export function endservicebackground(serviceid) {
  var params = new URLSearchParams()
  params.append('serviceid', serviceid) // 你要传给后台的参数值 key/value
  return request({
    url: '/admin/service/endservicebackground',
    method: 'post',
    data: params
  })
}

// 维修单重新分配门店
export function retoreposervice(serviceid, repositoryid) {
  var params = new URLSearchParams()
  params.append('serviceid', serviceid) // 你要传给后台的参数值 key/value
  params.append('repositoryid', repositoryid) // 你要传给后台的参数值 key/value
  return request({
    url: '/admin/service/retoreposervice',
    method: 'post',
    data: params
  })
}

// 维修追踪
export function getserviceschedule(serviceid) {
  var params = new URLSearchParams()
  params.append('serviceid', serviceid) // 你要传给后台的参数值 key/value
  return request({
    url: '/admin/serviceposition/getserviceschedule',
    method: 'post',
    data: params
  })
}

// 分派维修订单
export function repairtoemp(serviceorderid, handlerid) {
  var params = new URLSearchParams()
  params.append('serviceorderid', serviceorderid) // 你要传给后台的参数值 key/value
  params.append('handlerid', handlerid) // 你要传给后台的参数值 key/value
  return request({
    url: '/admin/service/serviceordertoemp',
    method: 'post',
    data: params
  })
}

// 车辆型号
export function producttype(query) {
  return request({
    url: 'erp/product/getproducttype',
    method: 'post',
    params: query
  })
}

// 门店列表
export function repositorylist(query) {
  var params = new URLSearchParams()
  // if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
  //   params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  // }
  // if (query.regionId !== '' && query.regionId !== null && query.regionId !== undefined) {
  //   params.append('regionId', query.regionId) // 你要传给后台的参数值 key/value
  // }
  params.append('pageNum', 1) // 你要传给后台的参数值 key/value
  params.append('pageSize', 9999) // 你要传给后台的参数值 key/value
  return request({
    url: '/repository/getRepositoryList',
    method: 'post',
    params: params
  })
}

// 新增维修订单
export function newservice(query) {
  var params = new URLSearchParams()
  // params.append('detail', query.detail) // 你要传给后台的参数值 key/value
  // params.append('producttype', query.producttype) // 你要传给后台的参数值 key/value
  // params.append('userid', query.userid) // 你要传给后台的参数值 key/value
  // params.append('address', query.address) // 你要传给后台的参数值 key/value
  // params.append('personname', query.personname) // 你要传给后台的参数值 key/value
  // params.append('phonenumber', query.phonenumber) // 你要传给后台的参数值 key/value
  // params.append('servicexpecttime', query.servicexpecttime) // 你要传给后台的参数值 key/value
  // params.append('repositoryid', query.repositoryid) // 你要传给后台的参数值 key/value
  // params.append('cityid', query.cityid) // 你要传给后台的参数值 key/value
  // params.append('provinceid', query.provinceid) // 你要传给后台的参数值 key/value
  // params.append('components', query.components) // 你要传给后台的参数值 key/value
  // params.append('servicemode', query.servicemode) // 你要传给后台的参数值 key/value
  if (query.employeeId !== '' && query.employeeId !== null && query.employeeId !== undefined) {
    params.append('employeeId', query.employeeId) // 你要传给后台的参数值 key/value
  }
  if (query.detail !== '' && query.detail !== null && query.detail !== undefined) {
    params.append('detail', query.detail) // 你要传给后台的参数值 key/value
  }
  if (query.producttype !== '' && query.producttype !== null && query.producttype !== undefined) {
    params.append('producttype', query.producttype) // 你要传给后台的参数值 key/value
  }
  if (query.userid !== '' && query.userid !== null && query.userid !== undefined) {
    params.append('userid', query.userid) // 你要传给后台的参数值 key/value
  }
  if (query.address !== '' && query.address !== null && query.address !== undefined) {
    params.append('address', query.address) // 你要传给后台的参数值 key/value
  }
  if (query.personname !== '' && query.personname !== null && query.personname !== undefined) {
    params.append('personname', query.personname) // 你要传给后台的参数值 key/value
  }
  if (query.phonenumber !== '' && query.phonenumber !== null && query.phonenumber !== undefined) {
    params.append('phonenumber', query.phonenumber) // 你要传给后台的参数值 key/value
  }
  if (query.servicexpecttime !== '' && query.servicexpecttime !== null && query.servicexpecttime !== undefined) {
    params.append('servicexpecttime', query.servicexpecttime) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryid !== '' && query.repositoryid !== null && query.repositoryid !== undefined) {
    params.append('repositoryid', query.repositoryid) // 你要传给后台的参数值 key/value
  }

  if (query.cityid !== '' && query.cityid !== null && query.cityid !== undefined) {
    params.append('cityid', query.cityid) // 你要传给后台的参数值 key/value
  }

  if (query.provinceid !== '' && query.provinceid !== null && query.provinceid !== undefined) {
    params.append('provinceid', query.provinceid) // 你要传给后台的参数值 key/value
  }

  if (query.components !== '' && query.components !== null && query.components !== undefined) {
    params.append('components', query.components) // 你要传给后台的参数值 key/value
  }

  if (query.servicemode !== '' && query.servicemode !== null && query.servicemode !== undefined) {
    params.append('servicemode', query.servicemode) // 你要传给后台的参数值 key/value
  }

  return request({
    url: '/admin/service/newservice',
    method: 'post',
    data: params
  })
}

// 维修项目列表
export function repairprojectList(query) {
  var params = new URLSearchParams()
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  params.append('producttype', query.productType) // 你要传给后台的参数值 key/value
  params.append('name', query.name) // 你要传给后台的参数值 key/value

  return request({
    url: '/admin/service/listserviceitem',
    method: 'post',
    data: params
  })
}

// 维修项目修改
export function editrepairproject(price, itemid, otherPrice) {
  var params = new URLSearchParams()
  params.append('price', price) // 你要传给后台的参数值 key/value
  params.append('otherPrice', otherPrice) // 你要传给后台的参数值 key/value
  params.append('itemid', itemid) // 你要传给后台的参数值 key/value
  return request({
    url: '/admin/service/updateserviceitem',
    method: 'post',
    data: params
  })
}

// 维修项目删除
export function deleterepairproject(itemid) {
  var params = new URLSearchParams()
  params.append('itemid', itemid) // 你要传给后台的参数值 key/value
  return request({
    url: '/admin/service/deleteserviceitem',
    method: 'post',
    data: params
  })
}

// 添加维修项目
export function addrepairproject(query) {
  var params = new URLSearchParams()
  params.append('producttype', query.producttype) // 你要传给后台的参数值 key/value
  params.append('name', query.name) // 你要传给后台的参数值 key/value
  params.append('price', query.price) // 你要传给后台的参数值 key/value
  params.append('otherPrice', query.otherPrice) // 你要传给后台的参数值 key/value
  params.append('desc', query.desc) // 你要传给后台的参数值 key/value
  params.append('mark', query.mark) // 你要传给后台的参数值 key/value
  return request({
    url: '/admin/service/addserviceitem',
    method: 'post',
    data: params
  })
}

// 维修项目搜索
export function searchrepairproject(query) {
  var params = new URLSearchParams()
  params.append('producttype', query.productType) // 你要传给后台的参数值 key/value
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/admin/service/listserviceitem',
    method: 'post',
    data: params
  })
}

// 根据门点id获取员工
export function getremplist(repositoryid) {
  var params = new URLSearchParams()
  params.append('repositoryid', repositoryid) // 你要传给后台的参数值 key/value
  params.append('stat', 1) // 你要传给后台的参数值 key/value
  return request({
    url: '/employee/getremplist',
    method: 'post',
    data: params
  })
}

// 根据门点id获取员工2下拉框
export function getremplist2(repositoryid, regionIds) {
  var params = new URLSearchParams()
  params.append('loginRepositoryId', repositoryid) // 你要传给后台的参数值 key/value
  if (regionIds !== '' && regionIds !== null && regionIds !== undefined) {
    params.append('regionIds', regionIds) // 你要传给后台的参数值 key/value
  }
  params.append('stat', 1) // 你要传给后台的参数值 key/value
  params.append('pagenum', 1) // 你要传给后台的参数值 key/value
  params.append('pagesize', 999) // 你要传给后台的参数值 key/value
  return request({
    url: '/employee/getemplist',
    method: 'post',
    data: params
  })
}
// 项目所有员工
export function stafflist(repositoryid, regionid) {
  var params = new URLSearchParams()
  params.append('loginRepositoryId', repositoryid) // 你要传给后台的参数值 key/value
  params.append('regionIds', regionid) // 你要传给后台的参数值 key/value
  params.append('pagesize', 1000) // 你要传给后台的参数值 key/value
  params.append('pagenum', 1) // 你要传给后台的参数值 key/value
  return request({
    url: '/employee/getemplist',
    method: 'post',
    data: params
  })
}

// 线下任务列表
export function gettaskofflinelist(query) {
  var params = new URLSearchParams()
  if (query.result !== '' && query.result !== null && query.result !== undefined) {
    params.append('result', query.result) // 你要传给后台的参数值 key/value
  }
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.employeeid !== '' && query.employeeid !== null && query.employeeid !== undefined) {
    params.append('employeeId', query.employeeid) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pagesize) // 你要传给后台的参数值 key/value
  params.append('regionIds', query.regionid) // 你要传给后台的参数值 key/value
  params.append('repositoryId', query.repositoryid) // 你要传给后台的参数值 key/value
  if (query.begintime !== '' && query.begintime !== null && query.begintime !== undefined) {
    params.append('beginTime', query.begintime) // 你要传给后台的参数值 key/value
  }
  if (query.endtime !== '' && query.endtime !== null && query.endtime !== undefined) {
    params.append('endTime', query.endtime) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/taskoffline/gettaskofflinelist',
    method: 'post',
    data: params
  })
}

// 线下任务删除
export function deletetaskoffline(query) {
  var params = new URLSearchParams()
  params.append('taskid', query.id) // 你要传给后台的参数值 key/value
  return request({
    url: '/taskoffline/deletetaskoffline',
    method: 'post',
    data: params
  })
}

// 添加线下任务
export function addtaskoffline(query) {
  var params = new URLSearchParams()
  params.append('taskName', query.taskname) // 你要传给后台的参数值 key/value
  params.append('taskAddress', query.taskaddress) // 你要传给后台的参数值 key/value
  params.append('taskContent', query.taskcontent) // 你要传给后台的参数值 key/value
  params.append('createId', query.createId) // 你要传给后台的参数值 key/value
  params.append('employeeId', query.employeeId) // 你要传给后台的参数值 key/value
  params.append('taskType', query.taskType) // 你要传给后台的参数值 key/value
  params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  params.append('remarks', query.remarks) // 你要传给后台的参数值 key/value
  if (query.customerId !== '' && query.customerId !== null && query.customerId !== undefined) {
    params.append('customerId', query.customerId) // 你要传给后台的参数值 key/value
  }
  params.append('customerName', query.customerName) // 你要传给后台的参数值 key/value
  return request({
    url: '/taskoffline/addtaskoffline',
    method: 'post',
    data: params
  })
}

// 线下任务搜索
export function searchtaskofflinelist(query) {
  var params = new URLSearchParams()
  params.append('employeeid', query.employeeid) // 你要传给后台的参数值 key/value
  params.append('result', query.result) // 你要传给后台的参数值 key/value
  params.append('code', query.code) // 你要传给后台的参数值 key/value
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/taskoffline/gettaskofflinelist',
    method: 'post',
    data: params
  })
}

// 延误统计列表
export function delaycount(query) {
  var params = new URLSearchParams()
  params.append('regionid', query.regionid) // 你要传给后台的参数值 key/value
  params.append('repositoryid', query.repositoryid) // 你要传给后台的参数值 key/value
  params.append('code', query.code) // 你要传给后台的参数值 key/value
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/admin/serviceorderdelay/delaycount',
    method: 'post',
    data: params
  })
}

// 延误统计搜索
export function searchdelaycount(query) {
  var params = new URLSearchParams()
  params.append('begintime', query.begintime) // 你要传给后台的参数值 key/value
  params.append('endtime', query.endtime) // 你要传给后台的参数值 key/value
  params.append('code', query.code) // 你要传给后台的参数值 key/value
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  params.append('regionid', query.regionid) // 你要传给后台的参数值 key/value
  params.append('repositoryid', query.repositoryid) // 你要传给后台的参数值 key/value
  return request({
    url: '/admin/serviceorderdelay/delaycount',
    method: 'post',
    data: params
  })
}

// 问题部位列表
export function searchproblemobject(query) {
  return request({
    url: '/admin/fault/search',
    method: 'post',
    params: query
  })
}

// 添加问题部位
export function addfaultcomponent(query) {
  var params = new URLSearchParams()
  params.append('faultname', query.faultname) // 你要传给后台的参数值 key/value
  params.append('level', query.level) // 你要传给后台的参数值 key/value
  params.append('parentid', query.parentid) // 你要传给后台的参数值 key/value
  return request({
    url: '/admin/fault/addfaultcomponent',
    method: 'post',
    data: params
  })
}

// 自检管理列表
export function selfChecklist(query) {
  return request({
    url: '/admin/selfchecking/search',
    method: 'post',
    params: query
  })
}

// 添加自检部位
export function addselfchecking(query) {
  var params = new URLSearchParams()
  params.append('name', query.name) // 你要传给后台的参数值 key/value
  params.append('level', query.level) // 你要传给后台的参数值 key/value
  params.append('parentid', query.parentid) // 你要传给后台的参数值 key/value
  params.append('content', query.content) // 你要传给后台的参数值 key/value
  params.append('employeeguide', query.employeeguide) // 你要传给后台的参数值 key/value
  return request({
    url: '/admin/selfchecking/addselfchecking',
    method: 'post',
    data: params
  })
}

// 删除自检部位
export function deleteselfchecking(query) {
  var params = new URLSearchParams()
  params.append('id', query.id) // 你要传给后台的参数值 key/value
  return request({
    url: '/admin/selfchecking/deleteselfchecking',
    method: 'post',
    data: params
  })
}

// 删除未分配的维修单
export function deleteservice(query) {
  var params = new URLSearchParams()
  params.append('serviceid', query.id) // 你要传给后台的参数值 key/value
  return request({
    url: '/admin/service/deleteservice',
    method: 'post',
    data: params
  })
}

// 问题部位删除
export function deletefaultcomponent(query) {
  var params = new URLSearchParams()
  params.append('id', query.id) // 你要传给后台的参数值 key/value
  return request({
    url: '/admin/fault/deletefaultcomponent',
    method: 'post',
    data: params
  })
}

// 维修各个状态的统计
export function countservice(query) {
  var params = new URLSearchParams()
  params.append('regionid', query.regionid) // 你要传给后台的参数值 key/value
  params.append('repositoryid', query.repositoryid) // 你要传给后台的参数值 key/value
  return request({
    url: '/admin/service/countservice',
    method: 'post',
    data: params
  })
}

// 维修各个状态的统计
export function countservice2(query) {
  var params = new URLSearchParams()
  params.append('regionid', query.regionid) // 你要传给后台的参数值 key/value
  params.append('repositoryid', query.repositoryid) // 你要传给后台的参数值 key/value
  params.append('begintime', query.begintime) // 你要传给后台的参数值 key/value
  params.append('endtime', query.endtime) // 你要传给后台的参数值 key/value
  return request({
    url: '/admin/service/countservice',
    method: 'post',
    data: params
  })
}

// 线下任务统计
export function gettaskofflinecount(query) {
  var params = new URLSearchParams()
  if (query.begintime !== '' && query.begintime !== null && query.begintime !== undefined) {
    params.append('begintime', query.begintime) // 你要传给后台的参数值 key/value
  }
  if (query.endtime !== '' && query.endtime !== null && query.endtime !== undefined) {
    params.append('endtime', query.endtime) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/taskoffline/gettaskofflinecount',
    method: 'post',
    data: params
  })
}

// 维修部位
export function faultsearch() {
  return request({
    url: '/admin/fault/search',
    method: 'post'
  })
}

// 线下任务 查询
export function getofflinelist(query) {
  var params = new URLSearchParams()
  if (query.employeeId !== '' && query.employeeId !== null && query.employeeId !== undefined) {
    params.append('employeeId', query.employeeId) // 你要传给后台的参数值 key/value
  }
  if (query.result !== '' && query.result !== null && query.result !== undefined) {
    params.append('result', query.result) // 你要传给后台的参数值 key/value
  }
  if (query.code !== '' && query.code !== null && query.code !== undefined) {
    params.append('code', query.code) // 你要传给后台的参数值 key/value
  }
  if (query.stat !== '' && query.stat !== null && query.stat !== undefined) {
    params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  }
  if (query.customerName !== '' && query.customerName !== null && query.customerName !== undefined) {
    params.append('customerName', query.customerName) // 你要传给后台的参数值 key/value
  }
  if (query.begintime !== '' && query.begintime !== null && query.begintime !== undefined) {
    params.append('begintime', query.begintime) // 你要传给后台的参数值 key/value
  }
  if (query.endTime !== '' && query.endTime !== null && query.endTime !== undefined) {
    params.append('endTime', query.endTime) // 你要传给后台的参数值 key/value
  }
  if (query.repositoryId !== '' && query.repositoryId !== null && query.repositoryId !== undefined) {
    params.append('repositoryId', query.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query.regionIds !== '' && query.regionIds !== null && query.regionIds !== undefined) {
    params.append('regionIds', query.regionIds) // 你要传给后台的参数值 key/value
  }
  params.append('pageNum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pageSize', query.pagesize)
  return request({
    url: '/taskoffline/gettaskofflinelist',
    data: params,
    method: 'post'
  })
}

// 线下任务修改
export function updateoffline(query) {
  var params = new URLSearchParams()
  if (query.taskId !== '' && query.taskId !== null && query.taskId !== undefined) {
    params.append('taskId', query.taskId) // 你要传给后台的参数值 key/value
  }
  if (query.taskName !== '' && query.taskName !== null && query.taskName !== undefined) {
    params.append('taskName', query.taskName) // 你要传给后台的参数值 key/value
  }
  if (query.taskAddress !== '' && query.taskAddress !== null && query.taskAddress !== undefined) {
    params.append('taskAddress', query.taskAddress) // 你要传给后台的参数值 key/value
  }
  if (query.taskContent !== '' && query.taskContent !== null && query.taskContent !== undefined) {
    params.append('taskContent', query.taskContent) // 你要传给后台的参数值 key/value
  }
  if (query.employeeId !== '' && query.employeeId !== null && query.employeeId !== undefined) {
    params.append('employeeId', query.employeeId) // 你要传给后台的参数值 key/value
  }
  if (query.remarks !== '' && query.remarks !== null && query.remarks !== undefined) {
    params.append('remarks', query.remarks) // 你要传给后台的参数值 key/value
  }
  if (query.customerId !== '' && query.customerId !== null && query.customerId !== undefined) {
    params.append('customerId', query.customerId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: 'taskoffline/updatetaskoffline',
    data: params,
    method: 'post'
  })
}

// 线下任务取消
export function cancleoffline(query) {
  var params = new URLSearchParams()
  params.append('taskId', query) // 你要传给后台的参数值 key/value
  return request({
    url: 'taskoffline/cancelTask',
    data: params,
    method: 'post'
  })
}
