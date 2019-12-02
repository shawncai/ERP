<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--基本信息-->
      <h2 ref="geren" class="form-name">批次规则设置</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('BasicSettings.batchName')" prop="ruleName" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.ruleName" placeholder="请输入批次规则" clearable/>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.prefix')" prop="prefix" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.prefix" placeholder="请输入编号前缀" clearable/>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.length')" prop="length" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.length" placeholder="请输入流水号长度" clearable/>
          </el-form-item>
          <el-form-item label="日期类型" style="width: 40%;margin-top:1%">
            <el-radio-group v-model="personalForm.dateType">
              <el-radio :label="1">年</el-radio>
              <el-radio :label="2">年月</el-radio>
              <el-radio :label="3">年月日</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button type="primary" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { createRules2 } from '@/api/BasicSettings'
var _that
export default {
  name: 'BatchRules',
  data() {
    return {
      // 批次规则设置信息数据
      personalForm: {
        type: 0,
        iseffective: 1,
        dateType: 1
      },
      // 批次规则设置信息规则
      personalrules: {
        ruleName: [
          { required: true, message: '请输入批次规则', trigger: 'blur' }
        ],
        prefix: [
          { required: true, message: '请输入编号前缀', trigger: 'blur' }
        ],
        length: [
          { required: true, message: '请输入流水号长度', trigger: 'blur' }
        ]
      }
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 清空记录
    restAllForm() {
      this.personalForm = {
        dateType: 1
      }
    },
    // 保存操作
    handlesave() {
      console.log(this.personalForm)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          createRules2(this.personalForm).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
            } else {
              this.$notify.error({
                title: '错误',
                message: res.data.msg,
                offset: 100
              })
            }
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '信息未填完整',
            offset: 100
          })
          return false
        }
      })
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/BasicSettings/NewBasicSettings', name: 'NewBasicSettings', fullPath: '/BasicSettings/NewBasicSettings', title: 'NewBasicSettings' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
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
