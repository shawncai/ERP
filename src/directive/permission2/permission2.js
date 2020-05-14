
import store from '@/store'

export default{
  inserted(el, binding, vnode) {
    const { value } = binding
    const roles = store.getters && store.getters.roles
    // console.log('zhixing===================', value)
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value[0]
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      // console.log('hasPermission', hasPermission)
      // console.log('value[0]', value[0])
      // console.log('value[1]', value[1])
      // if (hasPermission && value[1] === store.getters.userId) {
      //   const mm = 1
      // } else {
      //   el.parentNode && el.parentNode.removeChild(el)
      // }
      if (value) {
        const mm = 1
      } else {
        el.parentNode && el.parentNode.removeChild(el)
      }
      // if (!hasPermission) {
      //   el.parentNode && el.parentNode.removeChild(el)
      // }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
