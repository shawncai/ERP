<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default{
  name: 'App'
}
</script>
<style>
  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .el-table__body tr.current-row>td {
    background-color: #ffec8b;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #9FB6CD;
  }
</style>
