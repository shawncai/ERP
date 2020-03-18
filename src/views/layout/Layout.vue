<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container" style="background: #f1f1f1">
      <navbar/>
      <tags-view/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'

// eslint-disable-next-line no-unused-vars
var _that
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    chatsenddata() {
      return this.$store.getters.chatsenddata
    }
  },
  watch: {
    chatsenddata(newdata) {
      console.log(newdata)
      const useId = this.$store.getters.userId
      const customId = this.$store.getters.selectId
      this.websocketsend(
        'CS-' + useId + '-' + customId + '-' + newdata
      )
    }
  },
  created() {
    console.log('this.$store.getters.roleId', this.$store.getters.roleId)
    const roleid = this.$store.getters.roleId
    if (roleid === 23) { // 给websocket加入判断条件，是否是客服
      this.initwebsocket()
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    },
    initwebsocket() { // 初始化websocket
      // const wsuri = 'ws://192.168.1.45:8080/pss/websocket'
      const wsuri = 'ws://192.168.1.21:8888/erp/websocket'
      this.websock = new WebSocket(wsuri)// 这里面的this都指向vue
      this.websock.onopen = this.websocketopen
      // this.websock.onmessage = this.websocketonmessage
      this.websock.onclose = this.websocketclose
      this.websock.onerror = this.websocketerror
      this.websock.onmessage = this.getMessage
    },
    websocketopen() { // 打开
      console.log('WebSocket连接成功')
      const useId = this.$store.getters.userId
      console.log('useId', useId)
      this.websocketsend(
        'CS-' + useId
      )
    },
    getMessage(data) {
      console.log('websoctet', data)
      this.$store.dispatch('getmessagedata', data)
    },
    websocketsend(data) { // 数据发送
      this.websock.send(data)
    },
    websocketclose() { // 关闭
      console.log('WebSocket关闭')
    },
    websocketerror() { // 失败
      console.log('WebSocket连接失败')
      this.bobao2 === 0
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";

  .main-container >>> .el-dialog{
    -webkit-transform: none;
    transform: none;
    position: absolute;
    right: 0;
    left: auto;
    height: auto;
  }
  .main-container >>> .el-dialog__header{
    background: #fff;
    position: fixed;
    top: 0;
    display: block;
    width: 1010px;
    z-index: 100;
    border-bottom: 1px solid #f1f1f1;
  }
  .main-container >>> .el-dialog__body{
    padding-left: 0;
    padding-right: 0;
    padding-top: 10px;
  }
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
