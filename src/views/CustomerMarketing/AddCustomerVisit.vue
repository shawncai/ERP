<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">基本信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('CustomerMarketing.title2')" prop="title" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CustomerMarketing.customerId')" prop="customerId" style="width: 100%;">
                  <el-input v-model="customerId" style="margin-left: 18px;width: 200px" @focus="chooseCustomer"/>
                </el-form-item>
                <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CustomerMarketing.handlePersonId2')" prop="handlePersonId" style="width: 100%;">
                  <el-input v-model="handlePersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                </el-form-item>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CustomerMarketing.visitReson')" prop="visitReson" style="width: 100%;">
                  <el-select v-model="personalForm.visitReson" style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="售后"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CustomerMarketing.visitMode')" prop="visitMode" style="width: 100%;">
                  <el-select v-model="personalForm.visitMode" style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="面对面"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CustomerMarketing.visitDate')" prop="visitDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.visitDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CustomerMarketing.content')" style="width: 100%;">
                  <el-input v-model="personalForm.content" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">保存</el-button>
        <el-button type="danger" @click="handlecancel()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { addCustomerVisit } from '@/api/CustomerMarketing'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MyMater from './components/MyMater'
import MyInstallment from './components/MyInstallment'
import MyRepository from './components/MyRepository'
import MyCustomer from './components/MyCustomer'
export default {
  name: 'AddCustomerVisit',
  components: { MyCustomer, MyRepository, MyInstallment, MyMater, MyDetail, MyEmp },
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (this.handlePersonId === undefined || this.handlePersonId === null || this.handlePersonId === '') {
        callback(new Error('请选择回访人'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      if (this.customerId === undefined || this.customerId === null || this.customerId === '') {
        callback(new Error('请选择客户'))
      } else {
        callback()
      }
    }
    return {
      // 回显客户
      customerId: '',
      // 控制客户
      customercontrol: false,
      // 回显我方联络人
      handlePersonId: '',
      // 控制我方联络人
      stockControl: false,
      // 控制分期订单
      installmentcontrol: false,
      // 编辑表格数据
      list2: [],
      // 销售订单信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      },
      // 商品信息
      productForm: {},
      // 销售订单规则数据
      personalrules: {
        title: [
          { required: true, message: '请输入洽谈主题', trigger: 'blur' }
        ],
        customerId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        handlePersonId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        visitDate: [
          { required: true, message: '请选择洽谈日期', trigger: 'change' }
        ],
        visitReson: [
          { required: true, message: '请选择回访事由', trigger: 'change' }
        ],
        visitMode: [
          { required: true, message: '请选择回访方式', trigger: 'change' }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    // 选择客户focus
    chooseCustomer() {
      this.customercontrol = true
    },
    customerdata(val) {
      this.personalForm.customerId = val.id
      this.customerId = val.customerName
    },
    // 我方联络人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 我方联络人回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      }
      this.handlePersonId = ''
      this.customerId = ''
    },
    // 保存操作
    handlesave() {
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addCustomerVisit(parms).then(res => {
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
      const view = { path: '/CustomerMarketing/AddCustomerMarketing', name: 'AddCustomerMarketing', fullPath: '/CustomerMarketing/AddCustomerMarketing', title: 'AddCustomerMarketing' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ERP-container{
    margin-right: 0;
    .form-name{
      font-size: 18px;
      color: #373e4f;
      margin-bottom: -20px;
      margin-top: 20px;
    }
    .container{
      margin-top: 40px;
    }
    .el-button+.el-button{
      width: 98px;
    }
  }
</style>
