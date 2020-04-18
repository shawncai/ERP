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
  },
  mounted() {
    console.log('before')
    console.log(console.log([' ´´´´´´´´██´´´´´´´',
      ' ´´´´´´´████´´´´´´',
      ' ´´´´´████████´´´´',
      ' ´´`´███▒▒▒▒███´´´´´',
      ' ´´´███▒●▒▒●▒██´´´',
      ' ´´´███▒▒▒▒▒▒██´´´´´',
      ' ´´´███▒▒▒▒██´ 项目：vue-user-center ',
      ' ´´██████▒▒███´´´´´ 语言： ES6-babel',
      ' ´██████▒▒▒▒███´´ 框架： vue+vue-router+vuex+iview+axios',
      ' ██████▒▒▒▒▒▒███´´´´ 构建工具： webpack',
      ' ´´▓▓▓▓▓▓▓▓▓▓▓▓▓▒´´ 版本控制： git-github',
      ' ´´▒▒▒▒▓▓▓▓▓▓▓▓▓▒´´´´´ css预处理: less',
      ' ´.▒▒▒´´▓▓▓▓▓▓▓▓▒´´´´´ 代码风格：eslint-standard',
      ' ´.▒▒´´´´▓▓▓▓▓▓▓▒ 编辑器： vsCode',
      ' ..▒▒.´´´´▓▓▓▓▓▓▓▒ 数据库: mysql',
      ' ´▒▒▒▒▒▒▒▒▒▒▒▒ 服务器端脚本: java go',
      ' ´´´´´´´´´███████´´´´´ author: codeRabbit',
      ' ´´´´´´´´████████´´´´´´´',
      ' ´´´´´´´█████████´´´´´´',
      ' ´´´´´´██████████´´´´ 大部分人都在关注你飞的高不高，却没人在乎你飞的累不累，这就是现实！',
      ' ´´´´´´██████████´´´ 我从不相信梦想，我，只，相，信，自，己！',
      ' ´´´´´´´█████████´´',
      ' ´´´´´´´█████████´´´',
      ' ´´´´´´´´████████´´´´´',
      ' ________▒▒▒▒▒',
      ' _________▒▒▒▒',
      ' _________▒▒▒▒',
      ' ________▒▒_▒▒',
      ' _______▒▒__▒▒',
      ' _____ ▒▒___▒▒',
      ' _____▒▒___▒▒',
      ' ____▒▒____▒▒',
      ' ___▒▒_____▒▒',
      ' ███____ ▒▒',
      ' ████____███',
      ' █ _███_ _█_███'
    ].join('\n')))
    window.onbeforeunload = function() { return '确认离开页面？！' }
  },
  beforeDestroy() {
    console.log('before')
    window.onbeforeunload = function() { return '确认离开页面？！' }
  },
  destroyed() {
    console.log('destroyed')
    window.onbeforeunload = function() { return '确认离开页面？！' }
  }
}
</script>
<style>
  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .el-table__body tr.current-row>td {
    background-color: #efefef;
  }
  .el-table--small td, .el-table--small th {
    padding: 1px 0 !important;
  }
  .el-table {
    color: #303133;
  }
 .el-table tbody tr:hover>td {
    background-color:#d7ebff!important
}

.el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row>td, .el-table__body tr.hover-row.current-row>td, .el-table__body tr.hover-row.el-table__row--striped.current-row>td, .el-table__body tr.hover-row.el-table__row--striped>td, .el-table__body tr.hover-row>td {
    background-color: #d7ebff!important;
  }

 /*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
    width:10px;
    height:10px;
    background-color:#F5F5F5;
}
/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track
{
    -webkit-box-shadow:inset 0 0 6px rgba(209, 209, 209, 0.3);
    border-radius:10px;
    background-color:#F5F5F5;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
    border-radius:10px;
    -webkit-box-shadow:inset 0 0 6px rgba(209, 209, 209, 0.3);
    background-color:rgb(151, 151, 151);
}
#app /deep/ .el-input.is-disabled .el-input__inner {
    color:#000;
}
</style>
