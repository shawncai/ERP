<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default{
  name: 'App',
  created() {
    this.$store.dispatch('initData')
  }
}
</script>
<style>
  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .el-table__body tr.current-row>td {
    background-color: #efefef;
  }
  .el-table--small td, .el-table--small th {
    padding: 4px 0 !important;
  }
</style>
