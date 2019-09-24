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
                <el-form-item :label="$t('Receipt.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.customerType')" prop="customerType" style="width: 100%;">
                  <el-select v-model="personalForm.customerType" style="margin-left: 18px;width: 200px" @change="clearCustomer">
                    <el-option value="1" label="经销商"/>
                    <el-option value="2" label="客户"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.customerId')" prop="customerId" style="width: 100%;">
                  <el-input v-model="customerId" style="margin-left: 18px;width: 200px" @focus="chooseCustomer"/>
                </el-form-item>
                <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
                <my-installment :installmentcontrol.sync="installmentcontrol" @InstallmentDetail="InstallmentDetail" @Installment="Installment"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.moneyType')" style="width: 100%;">
                  <el-select v-model="personalForm.moneyType" style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="RMB"/>
                    <el-option value="2" label="USD"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.receiptMoney')" prop="receiptMoney" style="width: 100%;">
                  <el-input v-model="personalForm.receiptMoney" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('payment.payMode')" prop="payMode" style="width: 100%;">
                  <el-select v-model="personalForm.payMode" style="margin-left: 18px;width: 200px">
                    <el-option
                      v-for="(item, index) in payModes"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.receiptAccount')" style="width: 100%;">
                  <el-input v-model="personalForm.receiptAccount" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.receiptAccountNumber')" style="width: 100%;">
                  <el-input v-model="personalForm.receiptAccountNumber" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.receiptPersonId')" prop="receiptPersonId" style="width: 100%;">
                  <el-input v-model="receiptPersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                </el-form-item>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.receiptDate')" prop="payDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.payDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.totalLackMoney')" prop="totalLackMoney" style="width: 100%;">
                  <el-input v-model="personalForm.totalLackMoney" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.remark')" style="width: 100%;">
                  <el-input v-model="personalForm.remark" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.penaltyMoney')" prop="penaltyMoney" style="width: 100%;">
                  <el-input v-model="personalForm.penaltyMoney" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.deductionMoney')" style="width: 100%;">
                  <el-input v-model="personalForm.deductionMoney" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
                <span style="color: red;margin-left: 52px;font-size: 14px">预收款：{{ yufu }}</span>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card v-if="personalForm.customerType === '2'" class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >收款明细</h2>
        <div class="container">
          <el-editable
            ref="editable2"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            :summary-method="getSummaries"
            class="click-table1"
            show-summary
            stripe
            border
            size="medium"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column label="序号" min-width="55" align="center" type="index"/>
            <el-editable-column prop="presentCount" align="center" label="当前期数" min-width="150px"/>
            <el-editable-column prop="returnMoney" align="center" label="本期还款金额" min-width="150px"/>
            <el-editable-column prop="returnSource" align="center" label="本期还款本金" min-width="150px"/>
            <el-editable-column prop="reward" align="center" label="奖励" min-width="150px"/>
            <el-editable-column prop="penalty" align="center" label="滞纳金" min-width="150px"/>
            <el-editable-column prop="returnInterest" align="center" label="本期还款利息" min-width="150px"/>
            <el-editable-column prop="paidmoney" align="center" label="已收金额" min-width="150px"/>
            <el-editable-column prop="unpay" align="center" label="未收金额" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card v-if="personalForm.customerType === '1'" class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >收款明细</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            :summary-method="getSummaries2"
            class="click-table1"
            show-summary
            stripe
            border
            size="medium"
            style="width: 100%"
            @selection-change="handleSelectionChange2">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column label="序号" min-width="55" align="center" type="index"/>
            <el-editable-column prop="shouldMoney" align="center" label="应收款金额" min-width="150px"/>
            <el-editable-column prop="discountMoney" align="center" label="折扣额" min-width="150px"/>
            <el-editable-column prop="retreatMoney" align="center" label="退货抵扣" min-width="150px"/>
            <el-editable-column prop="collectedMoney" align="center" label="已收金额" min-width="150px"/>
            <el-editable-column prop="uncollectedMoney" align="center" label="未收款金额" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="thisMoney" align="center" label="本次收款" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
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
import { createreceipt } from '@/api/Receipt'
import { agentCollectList } from '@/api/public'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MyMater from './components/MyMater'
import MyInstallment from './components/MyInstallment'
import MyAgent from '../SaleOpportunity/components/MyAgent'
import { searchCategory } from '@/api/Supplier'
export default {
  name: 'AddReceipt',
  components: { MyAgent, MyInstallment, MyMater, MyDetail, MyEmp },
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (this.personalForm.sourceNumber === undefined || this.personalForm.sourceNumber === null || this.personalForm.sourceNumber === '') {
        callback(new Error('请选择源单编号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (this.customerId === undefined || this.customerId === null || this.customerId === '') {
        callback(new Error('请选择顾客'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      if (this.receiptPersonId === undefined || this.receiptPersonId === null || this.receiptPersonId === '') {
        callback(new Error('请选择收款人'))
      } else {
        callback()
      }
    }
    const validatePass4 = (rule, value, callback) => {
      if (this.personalForm.payDate === undefined || this.personalForm.payDate === null || this.personalForm.payDate === '') {
        callback(new Error('请选择收款日期'))
      } else {
        callback()
      }
    }
    return {
      // 批量操作
      moreaction: [],
      moreaction2: [],
      // 回显收款人
      receiptPersonId: '',
      // 控制收款人
      stockControl: false,
      // 预收款
      yufu: 0,
      // 回显客户姓名
      customerId: '',
      // 控制经销商窗口
      agentcontrol: false,
      // 控制表单是否可以编辑
      IscustomerName: false,
      IscustomerPhone: false,
      IstotalMoney: false,
      IsbeforeCount: false,
      IspaidCount: false,
      IspaidMoney: false,
      IspaidCapital: false,
      IsremainCapital: false,
      IssaleRepositoryId: false,
      // 回显销售门店
      saleRepositoryId: '',
      // 控制分期订单
      installmentcontrol: false,
      // 编辑表格数据
      list2: [],
      payModes: [],
      // 销售订单信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        receiptMoney: 0,
        deductionMoney: 0
      },
      // 商品信息
      productForm: {},
      // 销售订单规则数据
      personalrules: {
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        sourceNumber: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        afterCount: [
          { required: true, message: '请输入修改之后期数', trigger: 'blur' }
        ],
        customerId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        payMode: [
          { required: true, message: '请选择支付方式', trigger: 'change' }
        ],
        receiptPersonId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        payDate: [
          { required: true, validator: validatePass4, trigger: 'change' }
        ],
        penaltyMoney: [
          { required: true, message: '请输入滞纳金金额', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    personalForm: {
      handler() {
        this.personalForm.totalLackMoney = this.allmoney - this.personalForm.receiptMoney
      },
      deep: true
    }
  },
  created() {
    this.getways()
  },
  mounted() {
    this.getinformation()
  },
  methods: {
    // 批量操作
    handleSelectionChange(val) {
      // console.log(val)
      this.moreaction = val
      // this.personalForm.receiptMoney
      this.personalForm.receiptMoney = 0
      const processdata = this.moreaction
      for (const i in processdata) {
        this.personalForm.receiptMoney += processdata[i].unpay
      }
      this.personalForm.totalLackMoney = this.allmoney - this.personalForm.receiptMoney
    },
    handleSelectionChange2(val) {
      console.log(val)
      this.moreaction2 = val
      // this.personalForm.receiptMoney = 0
      this.personalForm.totalLackMoney = this.allmoney - this.personalForm.receiptMoney
    },
    getinformation() {
      if (this.$store.getters.empcontract) {
        console.log('getempcontract', this.$store.getters.empcontract)
        this.personalForm.customerType = '2'
        this.personalForm.customerId = this.$store.getters.empcontract.customerId
        this.customerId = this.$store.getters.empcontract.customerName
        // if (val.advanceMoney !== null && val.advanceMoney !== undefined && val.advanceMoney !== '') {
        //   this.yufu = val.advanceMoney
        // }
        for (let i = 0; i < this.$store.getters.empcontract.installmentOrderDetailVos.length; i++) {
          this.$store.getters.empcontract.installmentOrderDetailVos[i].categoryName = this.$store.getters.empcontract.installmentOrderDetailVos[i].productCategory
        }
        this.InstallmentDetail(this.$store.getters.empcontract.installmentOrderDetailVos)
        this.$store.dispatch('getempcontract', '')
      }
    },
    getinformation2() {
      if (this.$store.getters.empcontract2) {
        console.log('getempcontract2', this.$store.getters.empcontract2)
        this.personalForm.customerType = '2'
        this.personalForm.customerId = this.$store.getters.empcontract2.customerId
        this.customerId = this.$store.getters.empcontract2.customerName
        for (let i = 0; i < this.$store.getters.empcontract2.installmentOrderDetailVos.length; i++) {
          this.$store.getters.empcontract2.installmentOrderDetailVos[i].categoryName = this.$store.getters.empcontract2.installmentOrderDetailVos[i].productCategory
        }
        this.InstallmentDetail(this.$store.getters.empcontract2.installmentOrderDetailVos)
        this.$store.dispatch('getempcontract2', '')
      }
    },
    getways() {
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.payModes = res.data.data.content.list
        }
      })
    },
    // 收款人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 收款人回显
    stockName(val) {
      this.receiptPersonId = val.personName
      this.personalForm.receiptPersonId = val.id
    },
    // 总计
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return (Number(prev) + Number(curr)).toFixed(2)
            } else {
              return (Number(prev).toFixed(2))
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      sums[2] = ''
      this.allmoney = sums[9]
      return sums
    },
    // 总计
    getSummaries2(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      sums[2] = ''
      this.allmoney = sums[6]
      this.personalForm.receiptMoney = sums[7]
      this.personalForm.deductionMoney = sums[7]
      return sums
    },
    // 选择客户类型时清理客户名称
    clearCustomer() {
      this.personalForm.customerId = ''
      this.customerId = ''
    },
    // 选择客户focus
    chooseCustomer() {
      this.$forceUpdate()
      if (this.personalForm.customerType === '1') {
        this.agentcontrol = true
        this.$forceUpdate()
      } else if (this.personalForm.customerType === '2') {
        this.installmentcontrol = true
        this.$forceUpdate()
      }
    },
    agentdata(val) {
      this.$refs.editable.clear()
      this.personalForm.customerId = val.id
      this.customerId = val.agentName
      agentCollectList(val).then(res => {
        if (res.data.ret === 200) {
          console.log('供应商欠款', res.data.data.content.list)
          const agentcollectDetail = res.data.data.content.list.map(function(item) {
            return {
              agentCollectId: item.id,
              shouldMoney: item.shouldMoney,
              discountMoney: item.discountMoney,
              retreatMoney: item.returnMoney,
              collectedMoney: item.collectedMoney,
              uncollectedMoney: item.uncollectedMoney,
              thisMoney: '0.00'
            }
          })
          for (let i = 0; i < agentcollectDetail.length; i++) {
            this.$refs.editable.insert(agentcollectDetail[i])
          }
        }
      })
    },
    Installment(val) {
      console.log(val)
      this.personalForm.customerId = val.customerId
      this.customerId = val.customerName
      if (val.advanceMoney !== null && val.advanceMoney !== undefined && val.advanceMoney !== '') {
        this.yufu = val.advanceMoney
      }
    },
    InstallmentDetail(val) {
      console.log(val)
      this.$refs.editable2.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable2.insert(val[i])
      }
    },
    // 源单控制
    handleAddsourceNum() {
      this.installmentcontrol = true
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        receiptMoney: 0,
        deductionMoney: 0
      }
      this.receiptPersonId = null
      this.customerId = null
    },
    // 保存操作
    handlesave() {
      if (this.personalForm.customerType === '1') {
        const EnterDetail = this.$refs.editable.getRecords()
        if (EnterDetail.length === 0) {
          this.$notify.error({
            title: '错误',
            message: '明细表不能为空',
            offset: 100
          })
          return false
        }
        const parms2 = JSON.stringify(EnterDetail)
        const Data = this.personalForm
        for (const key in Data) {
          if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
            delete Data[key]
          }
        }
        const parms = JSON.stringify(Data)
        this.$refs.personalForm.validate((valid) => {
          if (valid) {
            createreceipt(parms, parms2, this.personalForm).then(res => {
              console.log(res)
              if (res.data.ret === 200) {
                this.$notify({
                  title: '成功',
                  message: '保存成功',
                  type: 'success',
                  offset: 100
                })
                this.restAllForm()
                this.$refs.editable.clear()
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
      } else if (this.personalForm.customerType === '2') {
        const EnterDetail = this.$refs.editable2.getRecords()
        if (EnterDetail.length === 0) {
          this.$notify.error({
            title: '错误',
            message: '明细表不能为空',
            offset: 100
          })
          return false
        }
        const parms2 = JSON.stringify(EnterDetail)
        const Data = this.personalForm
        for (const key in Data) {
          if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
            delete Data[key]
          }
        }
        const parms = JSON.stringify(Data)
        this.$refs.personalForm.validate((valid) => {
          if (valid) {
            createreceipt(parms, parms2, this.personalForm).then(res => {
              console.log(res)
              if (res.data.ret === 200) {
                this.$notify({
                  title: '成功',
                  message: '保存成功',
                  type: 'success',
                  offset: 100
                })
                this.restAllForm()
                this.$refs.editable2.clear()
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
      }
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Receipt/AddReceipt', name: 'AddReceipt', fullPath: '/Receipt/AddReceipt', title: 'AddReceipt' }
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
