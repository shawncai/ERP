<template>
  <div class="navbar">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      style="float: left;height: 50px"
      @select="handleSelect"
    >
      <!--      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>-->
      <el-submenu v-if="show" index="44">
        <template slot="title">
          <svg-icon icon-class="menus" style="margin-left: 4px" />
        </template>
        <el-menu-item index="9">{{ $t('updates.wlgl') }}</el-menu-item>
        <el-menu-item index="11">{{ $t('updates.cwgl') }}</el-menu-item>
        <el-menu-item index="12">{{ $t('updates.bbgl') }}</el-menu-item>
        <el-menu-item index="13">{{ $t('updates.rzgl') }}</el-menu-item>
        <el-menu-item v-if="show < 1" index="1">{{ $t('updates.sy') }}</el-menu-item>
        <el-menu-item v-if="show < 2" index="10">{{ $t('updates.xtgl') }}</el-menu-item>
        <el-menu-item v-if="show < 3" index="2">{{ $t('updates.cggl') }}</el-menu-item>
        <el-menu-item v-if="show < 4" index="3">{{ $t('updates.xsgl') }}</el-menu-item>
        <el-menu-item v-if="show < 5" index="4">{{ $t('updates.kcgl') }}</el-menu-item>
        <el-menu-item v-if="show < 6" index="5">{{ $t('updates.yxgl') }}</el-menu-item>
        <el-menu-item v-if="show < 7" index="6">{{ $t('updates.fqgl') }}</el-menu-item>
        <el-menu-item v-if="show < 8" index="7">{{ $t('updates.scgl') }}</el-menu-item>
        <el-menu-item v-if="show < 9" index="8">{{ $t('updates.zjgl') }}</el-menu-item>
        <el-menu-item index="14"><router-link to="/Chat/index">{{ $t('updates.kf') }}</router-link></el-menu-item>
      </el-submenu>
      <el-menu-item v-if="show > 0" index="1">{{ $t('updates.sy') }}</el-menu-item>
      <el-menu-item v-if="show > 1" index="10">{{ $t('updates.xtgl') }}</el-menu-item>
      <el-menu-item v-if="show > 2" index="2">{{ $t('updates.cggl') }}</el-menu-item>
      <el-menu-item v-if="show > 3" index="3">{{ $t('updates.xsgl') }}</el-menu-item>
      <el-menu-item v-if="show > 4" index="4">{{ $t('updates.kcgl') }}</el-menu-item>
      <el-menu-item v-if="show > 5" index="5">{{ $t('updates.yxgl') }}</el-menu-item>
      <el-menu-item v-if="show > 6" index="6">{{ $t('updates.fqgl') }}</el-menu-item>
      <el-menu-item v-if="show > 7" index="7">{{ $t('updates.scgl') }}</el-menu-item>
      <el-menu-item v-if="show > 8" index="8">{{ $t('updates.zjgl') }}</el-menu-item>
      <!-- a -->
      <!-- <el-submenu v-else index="44">
        <template slot="title">
          <svg-icon icon-class="menus" style="margin-left: 4px" />
        </template>
        <el-menu-item index="9">物流管理</el-menu-item>
        <el-menu-item index="11">{{ $t('updates.cwgl') }}</el-menu-item>
        <el-menu-item index="12">{{ $t('updates.bbgl') }}</el-menu-item>
        <el-menu-item index="13">{{ $t('updates.rzgl') }}</el-menu-item>
        <el-menu-item index="1">{{ $t('updates.sy') }}</el-menu-item>
        <el-menu-item index="10">{{ $t('updates.xtgl') }}</el-menu-item>
        <el-menu-item index="2">{{ $t('updates.cggl') }}</el-menu-item>
        <el-menu-item index="3">{{ $t('updates.xsgl') }}</el-menu-item>
        <el-menu-item index="4">{{ $t('updates.kcgl') }}</el-menu-item>
        <el-menu-item index="5">{{ $t('updates.yxgl') }}</el-menu-item>
        <el-menu-item index="6">{{ $t('updates.fqgl') }}</el-menu-item>
        <el-menu-item index="7">{{ $t('updates.scgl') }}</el-menu-item>
        <el-menu-item index="8">{{ $t('updates.zjgl') }}</el-menu-item>
      </el-submenu>-->
    </el-menu>
    <!--<breadcrumb class="breadcrumb-container"/>-->

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!--<error-log class="errLog-container right-menu-item"/>-->

        <!--<el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom">-->
        <!--<screenfull class="screenfull right-menu-item"/>-->
        <!--</el-tooltip>-->

        <lang-select class="international right-menu-item" />

        <!--<el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">-->
        <!--<theme-picker class="theme-switch right-menu-item"/>-->
        <!--</el-tooltip>-->
      </template>
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <!-- eslint-disable-next-line -->
          <img
            :src="avatar === undefined ? 'static/img/tp.png' : avatar+'?imageView2/1/w/80/h/80'"
            class="user-avatar"
          />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>{{ $t('navbar.dashboard') }}</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tag style="float: right;margin-top: 10px">{{ name }}</el-tag>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import LangSelect from "@/components/LangSelect";
import ThemePicker from "@/components/ThemePicker";

var _that
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker
  },
  data() {
    return {
      show: 0,
      screenWidth: document.body.clientWidth
    };
  },
  computed: {
    ...mapGetters([
      "sidebar",
      "name",
      "avatar",
      "device",
      "name",
      "permission_routers"
    ])
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    },
    handleSelect(key) {
      console.log('key', key)
      this.$store.dispatch("setTopmenu", key);
    },
    //获取屏幕宽度
    getBrowserWidth() {
      window.screenWidth = document.body.clientWidth;
      this.screenWidth = window.screenWidth;
      const that = this;
      // console.log(12323123123)
      if (that.screenWidth > 1525) {
        that.show = 9;
      }
      if (that.screenWidth <= 1525) {
        that.show = 8;
      }
      if (that.screenWidth <= 1373) {
        that.show = 7;
      }
      if (that.screenWidth <= 1220) {
        that.show = 6;
      }
      if (that.screenWidth <= 1068) {
        that.show = 5;
      }
      if (that.screenWidth <= 899) {
        that.show = 4;
      }
      if (that.screenWidth <= 747) {
        that.show = 3;
      }
      if (that.screenWidth <= 594) {
        that.show = 2;
      }
      if (that.screenWidth <= 444) {
        that.show = 1;
      }
      if (that.screenWidth <= 338) {
        that.show = 0;
      }
      console.log(123123, that.show);
    }
  },

  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  },
  created() {
    this.getBrowserWidth();
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        // 打印screenWidth变化的值
        that.timer = false;
        if (that.screenWidth > 1525) {
          that.show = 9;
        }
        if (that.screenWidth <= 1525) {
          that.show = 8;
        }
        if (that.screenWidth <= 1373) {
          that.show = 7;
        }
        if (that.screenWidth <= 1220) {
          that.show = 6;
        }
        if (that.screenWidth <= 1068) {
          that.show = 5;
        }
        if (that.screenWidth <= 899) {
          that.show = 4;
        }
        if (that.screenWidth <= 747) {
          that.show = 3;
        }
        if (that.screenWidth <= 594) {
          that.show = 2;
        }
        if (that.screenWidth <= 444) {
          that.show = 1;
        }
        if (that.screenWidth <= 338) {
          that.show = 0;
        }
        console.log(that.show);
      }
    }
  }
};
</script>

<style rel="stylesheet/css" scoped>
.el-menu-demo >>> .el-submenu__icon-arrow {
  display: none;
}

.navbar >>> .el-menu--popup-bottom-start {
  margin-top: -15px !important;
}

.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  position: fixed;
  top: 0;
  z-index: 10;
  background: #fff;
  width: 90%;
  display: flex;
}
.el-menu-demo {
  flex: 7;
}
.hamburger-container {
  line-height: 58px;
  height: 50px;
  float: left;
  padding: 0 10px;
}
.breadcrumb-container {
  float: left;
}
.errLog-container {
  display: inline-block;
  vertical-align: top;
}
.right-menu {
  /* float: right; */
  flex: 3;
  height: 100%;
  margin-right: 80px;
}
.right-menu:focus {
  outline: none;
}
.right-menu-item {
  display: inline-block;
  margin: 0 8px;
}
.screenfull {
  height: 20px;
}
.international {
  vertical-align: top;
}
.theme-switch {
  vertical-align: 15px;
}
.avatar-container {
  height: 50px;
  margin-right: 30px;
}
.avatar-wrapper {
  margin-top: 5px;
  position: relative;
}
.user-avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
.el-icon-caret-bottom {
  cursor: pointer;
  position: absolute;
  right: -20px;
  top: 25px;
  font-size: 12px;
}
</style>
