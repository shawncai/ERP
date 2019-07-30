
import store from '@/store'

export default{
  inserted(el, binding, vnode) {
    const { value } = binding
    console.log('value[0]', value[0])
    console.log('value[1]', value[1])
    console.log('binding', binding)
    const roles = store.getters && store.getters.roles

    if (value[0]) {
      const permissionRoles = value[0]

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      console.log('userId', store.getters.userId)
      if (!hasPermission && value[1] !== store.getters.userId) {
        console.log('hasPermission', hasPermission)
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
