<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="8"  class="card-panel-col">
      <div class="card-panel" >
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="zongfen" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ $t('employee.Totalscore') }}</div>
          <count-to :start-val="0" :end-val="saleT2" :duration="5000" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" >
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="haoping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ $t('employee.praise') }}</div>
          <count-to :start-val="0" :end-val="maintainT2" :duration="3000" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" >
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="chengfa" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ $t('employee.Deductions') }}</div>
          <count-to :start-val="0" :end-val="cengfaT2" :duration="3000" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props: {
    saleT: {
      type: Number, // 指定传入的类型
      // type 也可以是一个自定义构造器函数，使用 instanceof 检测。
      default: 0 // 这样可以指定默认的值
    },
    maintainT: {
      type: Number, // 指定传入的类型
      // type 也可以是一个自定义构造器函数，使用 instanceof 检测。
      default: 0 // 这样可以指定默认的值
    },
    cengfaT: {
      type: Number, // 指定传入的类型
      // type 也可以是一个自定义构造器函数，使用 instanceof 检测。
      default: 0 // 这样可以指定默认的值
    }
  },
  data() {
    return {
      saleT2: this.saleT,
      maintainT2: this.maintainT,
      cengfaT2: this.cengfaT
    }
  },
  watch: {
    saleT(val) {
      this.saleT2 = val
    },
    maintainT(val) {
      this.maintainT2 = val
    },
    cengfaT(val) {
      this.cengfaT2 = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #f65e5e;
      }
      .icon-message {
        background: #ff0000;
      }
      .icon-money {
        background: #1296db;
      }
      .icon-shopping {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #f65e5e;
    }
    .icon-message {
      color: #ff0000;
    }
    .icon-money {
      color: #1296db;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
