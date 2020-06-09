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
        <el-menu-item v-if="mywlgl?(iswuliu && show < 9):iswuliu" index="9">{{ $t('updates.wlgl') }}</el-menu-item>
        <el-menu-item v-if="mycwgl?(iscaiwuroles && show < 8):iscaiwuroles" index="11">{{ $t('updates.cwgl') }}</el-menu-item>
        <el-menu-item v-if="mybbgl?(istongji && show < 7):istongji" index="12">{{ $t('updates.bbgl') }}</el-menu-item>
        <el-menu-item v-if="myrzgl?(isbaobiao && show < 6):isbaobiao" index="13">{{ $t('updates.rzgl') }}</el-menu-item>
        <el-menu-item v-if="show < 1" index="1">{{ $t('updates.sy') }}</el-menu-item>
        <el-menu-item v-if="show < 2 && isxitong" index="10">{{ $t('updates.xtgl') }}</el-menu-item>
        <el-menu-item v-if="show < 3 && iscaigou" index="2">{{ $t('updates.cggl') }}</el-menu-item>
        <el-menu-item v-if="show < 4 && isxiaoshou" index="3">{{ $t('updates.xsgl') }}</el-menu-item>
        <el-menu-item v-if="show < 5 && iskucun" index="4">{{ $t('updates.kcgl') }}</el-menu-item>
        <el-menu-item v-if="show < 6 && isyingxiao" index="5">{{ $t('updates.yxgl') }}</el-menu-item>
        <el-menu-item v-if="show < 7 && isfenqi" index="6">{{ $t('updates.fqgl') }}</el-menu-item>
        <el-menu-item v-if="show < 8 && isshengchang" index="7">{{ $t('updates.scgl') }}</el-menu-item>
        <el-menu-item v-if="show < 9 && iszhijian" index="8">{{ $t('updates.zjgl') }}</el-menu-item>
        <el-menu-item index="14"><router-link to="/Chat/index">{{ $t('updates.kf') }}</router-link></el-menu-item>
      </el-submenu>
      <el-menu-item v-if="show > 0" index="1">{{ $t('updates.sy') }}</el-menu-item>
      <el-menu-item v-if="show > 1 && isxitong" index="10">{{ $t('updates.xtgl') }}</el-menu-item>
      <el-menu-item v-if="show > 2 && iscaigou" index="2">{{ $t('updates.cggl') }}</el-menu-item>
      <el-menu-item v-if="show > 3 && isxiaoshou" index="3">{{ $t('updates.xsgl') }}</el-menu-item>
      <el-menu-item v-if="show > 4 && iskucun" index="4">{{ $t('updates.kcgl') }}</el-menu-item>
      <el-menu-item v-if="show > 5 && isyingxiao" index="5">{{ $t('updates.yxgl') }}</el-menu-item>
      <el-menu-item v-if="show > 6 && isfenqi" index="6">{{ $t('updates.fqgl') }}</el-menu-item>
      <el-menu-item v-if="show > 7 && isshengchang" index="7">{{ $t('updates.scgl') }}</el-menu-item>
      <el-menu-item v-if="show > 8 && iszhijian" index="8">{{ $t('updates.zjgl') }}</el-menu-item>
      <el-menu-item v-if="mywlgl && iswuliu && show > 8" index="9">{{ $t('updates.wlgl') }}</el-menu-item>
      <el-menu-item v-if="mycwgl && iscaiwuroles && show > 7" index="11">{{ $t('updates.cwgl') }}</el-menu-item>
      <el-menu-item v-if="mybbgl && istongji && show > 6" index="12">{{ $t('updates.bbgl') }}</el-menu-item>
      <el-menu-item v-if="myrzgl && isbaobiao && show > 4" index="13">{{ $t('updates.rzgl') }}</el-menu-item>
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
      screenWidth: document.body.clientWidth,
      isxitong: false,
      iscaigou: false,
      isxiaoshou: false,
      iskucun: false,
      isyingxiao: false,
      isfenqi: false,
      isshengchang: false,
      iszhijian: false,
      iswuliu: false,
      iscaiwuroles: false,
      istongji: false,
      isbaobiao: false,
      mywlgl: false,
      mycwgl: false,
      mybbgl: false,
      myrzgl: false
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
    this.judgerolement()
    this.junglenavbar()
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
        // console.log(that.show);
        // console.log(!that.mycwgl,that.iscaiwuroles,that.show < 8,!that.mycwgl && that.iscaiwuroles && that.show < 8);
      }
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    judgerolement() {
      const myroles = this.$store.getters.roles
      const xitongroles = ['1-2-3-1', '1-2-4-4', '1-2-6-1', '1-2-7-4', '1-2-8-4', '1-9-10-1','1-9-11-4', '1-9-13-4',
       '1-9-12-13', '1-9-170-1', '1-9-169-4', '1-14-15-1', '1-14-16-4', '1-14-19-13', '1-14-17-1', '1-14-18-4', '1-14-21-4',
        '1-22-23-1', '1-22-24-4', '131-151-1', '131-152-4', '1-22-28-4', '1-22-27-13', '1-31-32-1', '1-31-33-4', '1-31-34-1',
         '1-31-35-4', '1-31-38-4', '1-31-37-1', '1-39-40-1', '1-39-41-1', '1-39-41-4', '1-39-42-4', '1-39-43-1', '1-39-44-1',
          '1-39-45-4', '1-39-46-1', '1-39-47-4', '1-39-48-1', '1-39-49-1', '1-39-50-4', '1-39-51-1', '1-39-52-1', '1-39-53-1', '1-366-4']
          const caigouroles =['104-105-4', '104-106-1', '104-107-4', '104-108-4', '104-109-1', '104-110-4', '104-111-1', '104-114-4', '104-115-1', 
          '104-116-4', '104-117-1', '104-118-4', '104-119-1', '104-120-121-4', '104-120-122-4', '104-120-123-4', '104-120-124-4',
          '104-125-1', '104-125-2', '104-125-3', '104-125-4', '104-125-5', '104-125-6', '104-125-7']
          const xiaoshouroles = ['54-57-4', '54-58-1', '54-65-4', '54-66-1', '54-55-4', '54-56-1', '54-59-4', '54-60-1', '54-61-4', '54-62-1', '54-63-4', '54-64-1',
          '54-67-68-4', '54-67-74-4', '54-67-71-4', '54-67-76-4', '54-67-81-4', '54-67-82-1', '54-67-272-4','54-224-4', '54-223-1','54-225-4',
          '54-96-4', '54-97-1', '54-84-87-4', '54-84-88-1', '54-84-85-1', '54-84-86-4', '54-84-89-4', '54-83-4', '54-83-1', '54-83-2', '54-83-3', '54-83-5', '54-83-6', '54-83-7',
          '54-102-4', '54-102-2', '54-102-6', '54-102-7', '54-102-39']
          const kucunroles = ['131-132-133-4', '131-132-134-1', '131-132-135-4', '131-132-136-1', '131-132-137-4', '131-138-139-1', '131-138-140-4',
          '131-141-142-4', '131-141-143-1', '131-141-359-4', '131-141-361-1', '131-141-360-4','131-145-1', '131-146-4','131-147-1', '131-148-4',
          '131-152-4','131-154-4', '131-153-4', '131-369-4', '131-155-1', '131-370-4',  '131-270-4', '131-269-1', '131-271-4', '131-156-1', '131-157-4', '131-158-1', '131-159-4',
          '131-161-1', '131-162-4', '131-163-165-1', '131-163-166-4', '131-163-165-1', '131-163-164-4', '131-163-166-4', '131-163-167-1', '131-163-168-13', '131-163-169-4',
           '131-163-170-1', '131-278-1', '131-278-2', '131-278-3', '131-278-4', '131-278-5', '131-278-6', '131-278-7']
           const yingxiaoroles = ['215-216-218-1', '215-216-218-4', '215-239-240-1', '215-239-241-4', '215-239-242-1', '215-239-243-4', 
           '215-244-245-1', '215-244-246-4']
           const fengqiroles = ['200-201-4', '200-202-1', '200-211-4', '200-212-1', '200-203-4', '200-203-2', '200-203-59', '200-203-22', '200-203-7', '200-203-6', '200-203-5',
           '200-365-4', '200-364-1', '200-206-4', '200-206-6', '200-206-7', '200-206-74', '200-206-60', '200-204-4', '200-205-1', '200-250-251-4', '200-250-252-4',
            '200-250-253-4', '200-208-4', '200-209-4', '200-210-1', '200-213-4', '200-214-1', '200-213-4', '200-214-1', '200-207-4']
            const shengchang = ['171-175-1', '171-174-4', '171-176-4', '171-177-1', '171-179-1', '171-178-4', '171-226-4', '171-180-181-4', '171-180-182-1',
             '171-180-183-4', '171-180-184-1','171-173-1', '171-172-4', '171-185-186-4', '171-185-187-1', '171-185-188-4', '171-185-189-1',
             '171-190-191-4', '171-190-192-1', '171-190-193-4', '171-190-194-1', '171-190-195-4', '171-190-196-1',
             '171-190-197-4', '171-190-198-1','171-190-199-4']
             const zhijian = ['227-228-1', '227-229-4', '227-230-1', '227-231-4', '227-232-1', '227-233-4', '227-234-1', '227-234-4']
             const wuliu = ['1-247-248-1', '1-247-249-4', '235-236-1', '235-237-4', '235-238-4']
             const caiwuroles =['266-257-4', '266-256-1', '266-259-4', '266-258-1', '266-127-1', '266-128-6', '266-128-4', '266-128-7', '266-128-67',
              '266-128-5', '266-222-4', '266-221-1', '266-126-4', '266-127-1', '266-268-1', '104-128-6', '104-128-4', '104-128-7', '104-128-67',
               '104-128-5', '266-267-4', '54-90-4', '54-91-1', '266-92-4', '266-93-1', '266-94-4', '266-95-1', '266-98-4', '266-99-1', '266-371-4', '266-372-4' ]
               const tongjiroles =['311-312-318-4', '311-312-319-4', '311-312-320-4', '311-312-321-4', '311-312-322-4', '311-312-323-4',
               '311-313-324-4', '311-313-325-4', '311-313-326-4', '311-313-327-4', '311-314-328-4', '311-314-329-4', '311-315-330-4', '311-315-331-4', '311-315-332-4',
               '311-316-333-4', '311-316-334-4', '311-316-335-4', '311-316-336-4','311-317-337-4', '311-317-338-4', '311-317-339-4', '311-317-340-4', '311-317-341-4', '311-317-342-4', '311-317-343-4', '311-317-344-4', '311-317-345-4']
              if (myroles.includes('273-274-4')) {
          this.isbaobiao = true
        }
              for(const i in tongjiroles) {
        if (myroles.includes(tongjiroles[i])) {
          this.istongji = true
          break
        }
      }
      for(const i in caiwuroles) {
        if (myroles.includes(caiwuroles[i])) {
          this.iscaiwuroles = true
          break
        }
      }
      for(const i in wuliu) {
        if (myroles.includes(wuliu[i])) {
          this.iswuliu = true
          break
        }
      }
      for(const i in zhijian) {
        if (myroles.includes(zhijian[i])) {
          this.iszhijian = true
          break
        }
      }
      for(const i in shengchang) {
        if (myroles.includes(shengchang[i])) {
          this.isshengchang = true
          break
        }
      }
      for(const i in fengqiroles) {
        if (myroles.includes(fengqiroles[i])) {
          this.isfenqi = true
          break
        }
      }
      for(const i in xitongroles) {
        if (myroles.includes(xitongroles[i])) {
          this.isxitong = true
          break
        }
      }
      for(const i in caigouroles) {
        if (myroles.includes(caigouroles[i])) {
          this.iscaigou = true
          break
        }
      }
      for(const i in xiaoshouroles) {
        if (myroles.includes(xiaoshouroles[i])) {
          this.isxiaoshou = true
          break
        }
      }
      for(const i in kucunroles) {
        if (myroles.includes(kucunroles[i])) {
          this.iskucun = true
          break
        }
      }
      for(const i in yingxiaoroles) {
        if (myroles.includes(yingxiaoroles[i])) {
          this.isyingxiao = true
          break
        }
      }

    },
    junglenavbar() {
      const junglearr = []
      let falgnum = 0
      junglearr.push(this.isxitong,this.iscaigou,this.isxiaoshou,this.iskucun,this.isyingxiao,this.isfenqi,this.isshengchang)
      for (const i in junglearr) {
        if (junglearr[i] === false) {
          falgnum ++
        }
      }
      if (falgnum === 1) {
        this.mywlgl = true
      } else if (falgnum === 2) {
        this.mywlgl = true
        this.mycwgl = true
      } else if (falgnum === 3) {
        this.mywlgl = true
        this.mycwgl = true
        this.mybbgl = true
      } else if (falgnum >= 4) {
        this.mywlgl = true
        this.mycwgl = true
        this.mybbgl = true
        this.myrzgl = true
      }
      console.log('falgnum=====>',falgnum);
      
      console.log(!this.mywlgl && this.iswuliu && this.show < 7,!this.mywlgl,this.iswuliu,this.show < 7)
    },
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    logout() {
      this.$store.dispatch('delAllViews').then(({ visitedViews }) => {
      this.$store.dispatch("LogOut").then(() => {
      
          location.reload(); // In order to re-instantiate the vue-router object to avoid bugs 
        this.$router.push({path: '/login'});
      })
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
      // console.log(that.screenWidth)
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
      // console.log(123123, that.show);
    }
  }
};
</script>

<style rel="stylesheet/css" scoped>
.el-menu-demo >>> .el-submenu__icon-arrow {
  display: none;
}

.el-menu-demo >>> .el-menu-item {
  height: 43px;
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
