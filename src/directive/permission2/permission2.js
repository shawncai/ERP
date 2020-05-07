
import store from '@/store'

export default{
  inserted(el, binding, vnode) {
    const { value } = binding
    const roles = store.getters && store.getters.roles

    if (value[0]) {
      const permissionRoles = value[0]

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission || value[1] !== store.getters.userId) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
