<!--suppress ALL -->
<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">

    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon||item.meta.icon" :title="generateTitle(onlyOneChild.meta.title)" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="submenu" :index="resolvePath(item.path)">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="generateTitle(item.meta.title)" />
        <el-badge v-if="item.meta.tixing === true" id="cshi" class="mark" value="new" style="float: right;margin-right: 17px"/>
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu" />
        <app-link v-else :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)">
            <item v-if="child.meta" :icon="child.meta.icon" :title="generateTitle(child.meta.title)"/>
            <el-badge v-if="child.meta.tixing === true" id="zhuan" value="13" style="float:right;width: 100%;padding-left: 60%" class="mark" @click.native="yinchang"/>
          </el-menu-item>
        </app-link>
      </template>
    </el-submenu>

  </div>
</template>

<script>
import path from 'path'
import { generateTitle } from '@/utils/i18n'
import { isExternal } from '@/utils'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null,
      yin: false,
      gamemuiscs1: null,
      bobao2: 0,
      userId: this.$store.getters.userId
    }
  },
  updated() {
    this.initwebsocket()
  },
  methods: {
    initwebsocket() { // 初始化websocket
      // const wsuri = 'ws://192.168.1.45:8080/pss/websocket'
      const wsuri = 'ws://www.nwowapp.com:9090/pss/websocket'
      this.websock = new WebSocket(wsuri)// 这里面的this都指向vue
      this.websock.onopen = this.websocketopen
      // this.websock.onmessage = this.websocketonmessage
      this.websock.onclose = this.websocketclose
      this.websock.onerror = this.websocketerror
      this.websock.onmessage = function(e) {
        const bobao = parseInt(e.data)
        this.bobao2 += 1
        if (bobao === 1) {
          document.getElementById('zhuan').style.display = 'block'
          document.getElementById('cshi').style.display = 'block'
          document.getElementsByClassName('mark')[1].children[0].innerText = this.bobao2
          this.gamemuiscs1 = new Audio('../static/audio/ywxdd.mp3')
          if (this.gamemuiscs1.paused === true) { // 判读是否播放
            this.gamemuiscs1.paused === false
            this.gamemuiscs1.play() // 没有就播放
          }
          this.$notify.success({
            title: 'Info',
            message: 'You have a new repair order'
          })
        }
      }.bind(this)
    },
    websocketopen() { // 打开
      console.log('WebSocket连接成功')
      this.bobao2 === 0
      document.getElementById('zhuan').style.display = 'none'
      document.getElementById('cshi').style.display = 'none'
      console.log(this.userId)
      this.websocketsend(this.userId)
    },
    // websocketonmessage(e) { // 数据接收
    //   const bobao = parseInt(e.data)
    //   console.log(_this.yinchang())
    //   if (bobao === 1) {
    //     this.gamemuiscs1 = new Audio('../static/audio/ywxdd.mp3')
    //     console.log(this.gamemuiscs1.paused)
    //     if (this.gamemuiscs1.paused === true) { // 判读是否播放
    //       this.gamemuiscs1.paused === false
    //       this.gamemuiscs1.play() // 没有就播放
    //     }
    //     this.$notify.success({
    //       title: 'Info',
    //       message: 'You have a new repair order'
    //     })
    //   }
    // },
    // func() {
    //
    // },
    websocketsend(data) { // 数据发送
      this.websock.send(data)
    },
    websocketclose() { // 关闭
      console.log('WebSocket关闭')
    },
    websocketerror() { // 失败
      console.log('WebSocket连接失败')
      this.bobao2 === 0
    },
    yinchang() {
      document.getElementById('zhuan').style.display = 'none'
      document.getElementById('cshi').style.display = 'none'
      this.bobao2 * 0
    },
    hasOneShowingChild(children, parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    },
    isExternalLink(routePath) {
      return isExternal(routePath)
    },
    generateTitle
  }
}
</script>
