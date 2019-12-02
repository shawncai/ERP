<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
  </div>
</template>

<script>
import SwitchRoles from './components/SwitchRoles'

export default{
  name: 'PagePermission',
  components: { SwitchRoles },
  beforeCreate() {
    _that = this
  },
  methods: {
    handleRolesChange() {
      this.$router.push({ path: '/permission/index?' + +new Date() })
    }
  }
}
</script>
