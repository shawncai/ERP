<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
    v-if="topmenus !== '14'"
      :show-timeout="200"
      :default-active="$route.path"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :unique-opened="true"
    >
      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
    <div class="msglist" v-if="topmenus === '14'">
      <ul class="msgul">
        <li
          v-for="(item, index) in chatlist"
          :key="index"
          class="sessionlist"
          :class="{ active: item.id === selectId }"
          @click="selectSession(item.id)"
        >
          <div class="list-left">
            <img class="avatar" width="42" height="42" :alt="item.user.name" :src="item.user.img" />
          </div>
          <div class="list-right">
            <div class="flextop">
              <p class="name">{{item.user.name}}</p>
              <span class="time">{{item.messages[item.messages.length-1].date | time}}</span>
            </div>

            <p class="lastmsg">{{item.messages[item.messages.length-1].content}}</p>
          </div>
        </li>
      </ul>
    </div>
    
  </el-scrollbar>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import SidebarItem from './SidebarItem'

var _that
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar',
      "selectId",
       "chatlist",
       ""
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    topmenu() {
      return this.$store.getters.topmenu;
    }
  },
   watch: {
    topmenu: function(newVal) {
      console.log('newVal', newVal)
      this.topmenus = newVal;
      console.log("this.topmenus", this.$store.getters.chatlist);
      console.log(this.topmenus === "14");
    }
  },
   filters: {
    // 将日期过滤为 hour:minutes
    time(date) {
      if (typeof date === "string") {
        date = new Date(date);
      }
      if (date.getMinutes() < 10) {
        return date.getHours() + ":0" + date.getMinutes();
      } else {
        return date.getHours() + ":" + date.getMinutes();
      }
    }
  },
  data() {
    return {
      topmenus: this.$store.getters.topmenu
    };
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    selectSession(val) {
      this.$store.dispatch('selectSession', val)
    }
  }
}
</script>
<style rel="stylesheet/css" scoped>
.msglist {
  height: 100%;
  padding-top: 40px;
  padding-right: 10px;

  overflow-y: auto;
  overflow-x: hidden;
  background: rgb(48, 65, 86)
}

.msgul {
  padding-left: 0;
}

.flextop {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
    justify-content: space-between;
}

.sessionlist {
  display: flex;
  padding:0 12px;
  align-items: center;
  transition: background-color 0.1s;
  font-size: 0;
}

.sessionlist:hover {
  background-color: rgb(38, 52, 69);
}

.sessionlist.active {
  background-color: rgb(38, 52, 69);
}

.avatar {
  border-radius: 2px;
  margin-right: 12px;
}

.list-right {
  position: relative;
  flex: 1;
  /* margin-top: 4px; */
}

.name {
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
  color: rgb(191, 203, 217)
}

.time {
  float: right;
  color: rgb(191, 203, 217);
  font-size: 10px;
  vertical-align: top;
}

.lastmsg {
  position: absolute;
  font-size: 12px;
  width: 130px;
  height: 15px;
  line-height: 15px;
  color: rgb(191, 203, 217);
  bottom: 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 25px;
}
</style>
