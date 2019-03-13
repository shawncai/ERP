<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--基本信息-->
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('LogisticsCar.outnumber')" prop="outnumber" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.outnumber" placeholder="请输入派车单编号" clearable/>
          </el-form-item>
          <el-form-item :label="$t('LogisticsCar.returntime')" prop="returntime" style="width: 40%;margin-top:1%">
            <el-date-picker
              v-model="personalForm.returntime"
              type="datetime"
              placeholder="选择回车时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              clearable
              style="width: 100%"/>
          </el-form-item>
          <el-form-item :label="$t('LogisticsCar.returnpersonid')" prop="returnpersonid" style="width: 40%;margin-top:1%">
            <el-input v-model="returnpersonid" placeholder="请选择回车人" @focus="handleoutperson"/>
          </el-form-item>
          <my-out :outperson.sync="outperson" @outpersonname="outpersonname"/>
          <el-form-item :label="$t('LogisticsCar.returnaddress')" prop="returnaddress" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.returnaddress" placeholder="请输入回车地址" clearable/>
          </el-form-item>
        </el-form>
      </div>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button type="primary" @click="handlesave()">保存</el-button>
        <el-button type="success" @click="handleentry()">继续录入</el-button>
        <el-button type="danger" @click="handlecancel()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MyDriver from './components/MyDriver'
import MyOut from './components/MyOut'
import MyCreate from './components/MyCreate'
import { addreturncar } from '@/api/LogisticsCar'
export default {
  name: 'Addreturncar',
  components: { MyDriver, MyOut, MyCreate },
  data() {
    return {
      // 回车人弹窗控制
      outperson: false,
      // 回车人回显
      returnpersonid: '',
      // 回车单信息数据
      personalForm: {},
      // 回车单信息规则数据
      personalrules: {
        outnumber: [
          { required: true, message: '请输入派车单编号', trigger: 'blur' }
        ],
        returntime: [
          { required: true, message: '请选择回车时间', trigger: 'change' }
        ],
        returnaddress: [
          { required: true, message: '请输入回车地址', trigger: 'blur' }
        ],
        returnpersonid: [
          { required: true, message: '请选择回车人', trigger: 'blue' }
        ]
      }
    }
  },
  methods: {
    // 保存操作
    handlesave() {
      console.log(this.personalForm)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addreturncar(this.personalForm).then(res => {
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
              this.$router.go(-1)
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
    // 清空记录
    restAllForm() {
      this.personalForm = {}
      this.returnpersonid = ''
    },
    // 继续录入
    handleentry() {
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addreturncar(this.personalForm).then(res => {
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
      const view = { path: '/LogisticsCar/Addreturncar', name: 'Addreturncar', fullPath: '/LogisticsCar/Addreturncar', title: 'Addreturncar' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    // 出车人输入框focus事件触发
    handleoutperson() {
      this.outperson = true
    },
    // 出车人列表返回数据
    outpersonname(val) {
      console.log(val)
      this.returnpersonid = val.personName
      this.personalForm.returnpersonid = val.id
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
