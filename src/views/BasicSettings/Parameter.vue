<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--基本信息-->
      <h2 ref="geren" class="form-name">设置参数</h2>
      <div class="container">
        <el-form v-for="(item, index) in parameters" ref="personalForm" :key="index" :inline="true" status-icon class="demo-ruleForm" label-position="left" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="item.parameterName" style="width: 40%;margin-top:3%">
            <el-radio-group v-model="item.isEffective" @change="handlechange(item)">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item style="margin-top: 1%;text-align: center">
            <code style="width: 600px;color: red">{{ item.text }}</code>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { parameter, effective } from '@/api/BasicSettings'
import MyEmp from './components/MyEmp'
var _that
export default {
  name: 'Parameter',
  components: { MyEmp },
  data() {
    return {
      // 所有参数数据
      parameters: []
    }
  },
  created() {
    this.getnationlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 参数列表
    getnationlist() {
      parameter().then(res => {
        if (res.data.ret === 200) {
          this.parameters = res.data.data.content
        }
      })
    },
    // 实时更改
    handlechange(val) {
      console.log(this.parameters)
      effective(val).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            offset: 100
          })
          this.getnationlist()
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg,
            offset: 100
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ERP-container{
    margin:0px 30px;
    .form-name{
      font-size: 18px;
      color: #373e4f;
      margin-bottom: -20px;
      margin-top: 30px;
    }
    .container{
      margin-top: 2%;
      border: 1px solid #eceff6;
    }
  }
</style>
