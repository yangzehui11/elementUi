let sysConfig = require('../../config/sysConfig')
let apiUrl = sysConfig.manageUrl // 调用前缀的标识

// 导入querystring工具组件，querystring在package-lock.json已配置
import queryString from 'querystring'

// 编写调用微服务的接口地址，并将方法通过export const进行导出，提供给外部使用
export const findAll = () => {
  return fetch(apiUrl+ '/m_teacher/findAllTeacher')
}

export const page_add = params => {
  return http.requestPost(apiUrl + '/cms/page/add', params)
}

/*根据cmsPage的Id查询数据*/
export const page_get = id => {
  return http.requestQuickGet(apiUrl + '/cms/page/get/' + id)
}
/*CmsPage数据修改，采用put方法*/
export const page_edit = (id, params) => {
  return http.requestPut(apiUrl + '/cms/page/edit/' + id, params)
}
/*删除数据*/
export const page_del = id => {
  return http.requestQuickGet(apiUrl + '/cms/page/del/' + id)
}
