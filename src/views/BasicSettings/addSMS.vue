<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--基本信息-->
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" status-icon class="demo-ruleForm" label-position="left" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('BasicSettings.modelname')" prop="modelname" style="width: 50%;margin-top:1%">
            <el-input v-model="personalForm.modelname" placeholder="请输入短信模板名称" clearable/>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.content')" prop="content" style="width: 80%;margin-top:1%">
            <el-input v-model="personalForm.content" :rows="4" type="textarea" clearable/>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.BasicSettingsShortName')" prop="BasicSettingsShortName" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.BasicSettingsShortName" placeholder="请输入供应商简称" clearable/>
          </el-form-item><br>
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
import { create } from '@/api/BasicSettings'
import MyEmp from './components/MyEmp'
export default {
  name: 'AddSMS',
  components: { MyEmp },
  data() {
    return {
      // 短信模板信息数据
      personalForm: {
        iseffective: '',
        modelname: '',
        content: ''
      },
      // 个人信息规则数据
      personalrules: {
        modelname: [
          { required: true, message: '请输入短信模板名称', trigger: 'blur' }
        ],
        iseffective: [
          { required: true, message: '请选择启用状态', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 保存操作
    handlesave() {
      this.personalForm.regionId = this.perregions[this.perregions.length - 1]
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          create(this.personalForm).then(res => {
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
              this.$refs.personalForm2.clearValidate()
              this.$refs.personalForm2.resetFields()
              this.$refs.personalForm3.clearValidate()
              this.$refs.personalForm3.resetFields()
              this.$refs.personalForm4.clearValidate()
              this.$refs.personalForm4.resetFields()
            } else if (res.data.msg === 'account isExist') {
              this.$notify.error({
                title: '错误',
                message: '登陆账号已存在',
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
      this.personalForm = {
        BasicSettingsName: '',
        typeId: '',
        BasicSettingsShortName: '',
        BasicSettingsIntroduction: '',
        // 业务信息
        countryId: '',
        provinceId: '',
        cityId: '',
        detailAddress: '',
        groupId: '',
        zipCode: '',
        contactPersonName: '',
        contactPersonPhone: '',
        regionId: '',
        giveId: '',
        transportId: '',
        levelId: '',
        isHot: '',
        isEffective: '',
        buyerId: '',
        // 财务信息
        businessScopeIntroduction: '',
        paymentId: '',
        moneyId: '',
        bankName: '',
        accountName: '',
        account: '',
        establishDate: '',
        legalPerson: '',
        taxNumber: '',
        businessLicense: '',
        companyTypeId: ''
      }
      this.perregions = []
      this.buyerId = ''
    },
    // 继续录入
    handleentry() {
      this.personalForm.regionId = this.perregions[this.perregions.length - 1]
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          create(this.personalForm).then(res => {
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
              this.$refs.personalForm2.clearValidate()
              this.$refs.personalForm2.resetFields()
              this.$refs.personalForm3.clearValidate()
              this.$refs.personalForm3.resetFields()
              this.$refs.personalForm4.clearValidate()
              this.$refs.personalForm4.resetFields()
              const anchor = this.$refs.geren.offsetTop
              console.log(anchor)
              document.documentElement.scrollTop = anchor - 100
            } else if (res.data.msg === 'account isExist') {
              this.$notify.error({
                title: '错误',
                message: '登陆账号已存在',
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
          const anchor2 = this.$refs.geren.offsetTop
          console.log(anchor2)
          document.documentElement.scrollTop = anchor2 - 100
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
