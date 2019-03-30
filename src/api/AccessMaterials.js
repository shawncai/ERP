import request from '@/utils/request'

// 根据任务单编号获取领料明细
export function getDetailByTaskNumber(query, query2) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('taskNumber', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('repositoryId', query2) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/accessmaterials/getDetailByTaskNumber',
    method: 'post',
    data: params
  })
}

// 添加领料单
export function addaccessmaterials(query, query2, query3) {
  var params = new URLSearchParams()
  if (query !== '' && query !== null && query !== undefined) {
    params.append('accessMaterialsJson', query) // 你要传给后台的参数值 key/value
  }
  if (query2 !== '' && query2 !== null && query2 !== undefined) {
    params.append('accessMaterialsDetailJson', query2) // 你要传给后台的参数值 key/value
  }
  if (query3.repositoryId !== '' && query3.repositoryId !== null && query3.repositoryId !== undefined) {
    params.append('repositoryId', query3.repositoryId) // 你要传给后台的参数值 key/value
  }
  if (query3.regionId !== '' && query3.regionId !== null && query3.regionId !== undefined) {
    params.append('regionId', query3.regionId) // 你要传给后台的参数值 key/value
  }
  return request({
    url: '/erp/accessmaterials/addaccessmaterials',
    method: 'post',
    data: params
  })
}
