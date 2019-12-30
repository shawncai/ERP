<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.sourceType')" prop="sourceType" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width:200px">
                    <el-option value="1" label="分期订单"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Verification.jbr')" prop="handlePersonId" style="width: 100%;">
                  <el-input v-model="handlePersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                </el-form-item>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Verification.hxrq')" prop="cancelDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.cancelDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="margin-bottom: 30px">核销明细</h2>
        <el-button style="width: 130px" @click="chooseCustomer">{{ $t('updates.cydzxz') }}</el-button>
        <my-installment :installmentcontrol.sync="installmentcontrol" @InstallmentDetail="InstallmentDetail" @Installment="Installment"/>
        <div class="container">
          <el-editable
            ref="editable2"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            stripe
            border
            size="medium"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column :key="Math.random()" :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :key="Math.random()" prop="customerName" align="center" label="顾客姓名" min-width="150px"/>
            <el-editable-column :key="Math.random()" prop="sourceNumber" align="center" label="源单单号" min-width="150px"/>
            <el-editable-column :key="Math.random()" prop="shouldMoney" align="center" label="应结算金额" min-width="150px"/>
            <el-editable-column :key="Math.random()" prop="paidMoney" align="center" label="已结算金额" min-width="150px"/>
            <el-editable-column :key="Math.random()" prop="cancleMoney" align="center" label="核销金额" min-width="150px"/>
            <el-editable-column :key="Math.random()" :edit-render="{name: 'ElInput', type: 'visible'}" prop="remark" align="center" label="备注" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { addVerification } from '@/api/Verification'
import { agentCollectList } from '@/api/public'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MyMater from './components/MyMater'
import MyInstallment from './components/MyInstallment'
import MyAgent from '../SaleOpportunity/components/MyAgent'
import { searchCategory } from '@/api/Supplier'
var _that
export default {
  name: 'AddVerification',
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
      if (this.handlePersonId === undefined || this.handlePersonId === null || this.handlePersonId === '') {
        callback(new Error('请选择经办人'))
      } else {
        callback()
      }
    }
    const validatePass4 = (rule, value, callback) => {
      if (this.personalForm.cancelDate === undefined || this.personalForm.cancelDate === null || this.personalForm.cancelDate === '') {
        callback(new Error('请选择收款日期'))
      } else {
        callback()
      }
    }
    const validatePass5 = (rule, value, callback) => {
      if (this.personalForm.deductionMoney > this.yufu) {
        callback(new Error('抵扣额不可大于预付款'))
      } else {
        callback()
      }
    }
    return {
      isshow: false,
      allmoney: '',
      // 批量操作
      moreaction: [],
      moreaction2: [],
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
      handlePersonId: this.$store.getters.name,
      // 销售订单信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        penaltyMoney: 0,
        receiptMoney: 0,
        deductionMoney: 0,
        totalLackMoney: 0,
        handlePersonId: this.$store.getters.userId
      },
      // 商品信息
      productForm: {},
      // 销售订单规则数据
      personalrules: {
        invoiceNumber: [
          { required: true, message: '请输入发票号', trigger: 'change' }
        ],
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
        handlePersonId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        cancelDate: [
          { required: true, validator: validatePass4, trigger: 'blur' }
        ],
        penaltyMoney: [
          { required: true, message: '请输入滞纳金金额', trigger: 'blur' }
        ],
        deductionMoney: [
          { validator: validatePass5, trigger: 'change' }
        ]
      }
    }
  },
  // watch: {
  //   personalForm: {
  //     handler() {
  //       this.personalForm.totalLackMoney = this.allmoney - this.personalForm.receiptMoney
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // },
  created() {
    this.getways()
    this.getdatatime()
  },

  mounted() {
    this.getinformation()
    this.getdatatime()
  },
  activated() {
    this.setinstallmentdata()
    this.setinformation()
    this.getinformation()
    this.getinformation2()
    this.getinformation3()
    this.getdatatime()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    setinstallmentdata() {
      if (this.$store.getters.newinstallpaydata) {
        this.isshow = true
        const val = this.$store.getters.newinstallpaydata
        this.personalForm.customerType = '2'
        this.customerId = val.customerName
        this.personalForm.customerId = val.customerId
        const befroedetail = []
        for (const i in val.installmentOrderDetailVos) {
          if (val.installmentOrderDetailVos[i].stat !== 2) {
            befroedetail.push(val.installmentOrderDetailVos[i])
          }
        }
        console.log('befroedetailbefroedetail', befroedetail)
        const InstallmentDetail = befroedetail.map(function(item) {
          return {
            installmentDetailId: item.id,
            presentCount: item.idx,
            returnMoney: item.shouldMoney,
            shouldMoney: item.shouldMoney,
            returnSource: item.capitalMoney,
            reward: item.reward,
            penalty: item.penalty,
            returnInterest: item.interestMoney,
            paidmoney: item.paidMoney,
            unpay: item.shouldMoney - item.paidMoney,
            thisMoney: item.shouldMoney - item.paidMoney,
            installmentId: item.installmentId
          }
        })
        console.log('InstallmentDetail', InstallmentDetail)
        // for (const i in InstallmentDetail) {
        //   this.$refs.editable2.insert(InstallmentDetail[i])
        // }
        this.list2 = InstallmentDetail
        this.$store.dispatch('getnewinstallpaydata', '')
      }
    },
    junglemoney() {
      console.log(123123123)
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
      this.personalForm.receiptMoney = 0
      const processdata = this.moreaction
      for (const i in processdata) {
        this.personalForm.receiptMoney += processdata[i].unpay
      }
      this.personalForm.totalLackMoney = this.allmoney - this.personalForm.receiptMoney
    },
    handleSelectionChange2(val) {
      this.moreaction2 = val
      this.personalForm.totalLackMoney = this.allmoney - this.personalForm.receiptMoney
    },
    setinformation() {
      if (this.$store.getters.newreceiptdata) {
        this.isshow = false
        const val = this.$store.getters.newreceiptdata
        this.personalForm.customerType = '2'
        this.customerId = this.$store.getters.newreceiptdata.customerName
        this.personalForm.customerId = this.$store.getters.newreceiptdata.customerId
        const valmap = []
        valmap.push(val)
        const InstallmentDetail = valmap.map(function(item) {
          return {
            installmentDetailId: item.id,
            presentCount: item.idx,
            returnMoney: item.shouldMoney,
            shouldMoney: item.shouldMoney,
            returnSource: item.capitalMoney,
            reward: item.reward,
            penalty: item.penalty,
            returnInterest: item.interestMoney,
            paidmoney: item.paidMoney,
            unpay: item.shouldMoney - item.paidMoney,
            thisMoney: item.shouldMoney - item.paidMoney,
            installmentId: item.installmentId
          }
        })
        console.log('InstallmentDetail', InstallmentDetail)
        // for (const i in InstallmentDetail) {
        //   this.$refs.editable2.insert(InstallmentDetail[i])
        // }
        this.list2 = InstallmentDetail
        this.$store.dispatch('getnewreceiptdata', '')
      }
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
        console.log(this.$store.getters.empcontract.installmentOrderDetailVos)
        const val = this.$store.getters.empcontract.installmentOrderDetailVos
        setTimeout(() => {
          this.$refs.editable2.clear()
          const valmap = []
          for (const i in val) {
            valmap.push(val[i])
          }
          const InstallmentDetail = valmap.map(function(item) {
            return {
              installmentDetailId: item.id,
              presentCount: item.idx,
              returnMoney: item.shouldMoney,
              shouldMoney: item.shouldMoney,
              returnSource: item.capitalMoney,
              reward: item.reward,
              penalty: item.penalty,
              returnInterest: item.interestMoney,
              paidmoney: item.paidMoney,
              unpay: item.shouldMoney - item.paidMoney,
              thisMoney: item.shouldMoney - item.paidMoney,
              installmentId: item.installmentId
            }
          })
          console.log('InstallmentDetail', InstallmentDetail)
          for (let i = 0; i < InstallmentDetail.length; i++) {
            this.$refs.editable2.insert(InstallmentDetail[i])
          }
          this.personalForm.totalLackMoney = Number(this.allmoney) - Number(this.personalForm.receiptMoney)
        }, 0)
        this.$store.dispatch('getempcontract', '')
      }
    },
    getinformation2() {
      if (this.$store.getters.empcontract2) {
        console.log('getempcontract2', this.$store.getters.empcontract2)
        this.personalForm.customerType = '2'
        this.personalForm.customerId = this.$store.getters.empcontract2.customerId
        this.customerId = this.$store.getters.empcontract2.customerName
        // for (let i = 0; i < this.$store.getters.empcontract2.installmentOrderDetailVos.length; i++) {
        //   this.$store.getters.empcontract2.installmentOrderDetailVos[i].categoryName = this.$store.getters.empcontract2.installmentOrderDetailVos[i].productCategory
        // }
        this.InstallmentDetail(this.$store.getters.empcontract2)
        this.$store.dispatch('getempcontract2', '')
      }
    },
    getinformation3() {
      if (this.$store.getters.empcontract3) {
        console.log('getempcontract3', this.$store.getters.empcontract3)
        this.personalForm.customerType = '1'
        this.personalForm.customerId = this.$store.getters.empcontract3[0].agentId
        this.customerId = this.$store.getters.empcontract3[0].agentName
        const agentcollectDetail = this.$store.getters.empcontract3.map(function(item) {
          return {
            sourceNumber: item.sourceNumber,
            agentCollectId: item.id,
            shouldMoney: item.shouldMoney,
            discountMoney: item.discountMoney,
            retreatMoney: item.returnMoney,
            collectedMoney: item.collectedMoney,
            uncollectedMoney: item.uncollectedMoney,
            thisMoney: '0.00'
          }
        })
        setTimeout(() => {
          for (let i = 0; i < agentcollectDetail.length; i++) {
            this.$refs.editable.insert(agentcollectDetail[i])
          }
        }, 0)
        this.$store.dispatch('getempcontract3', '')
      }
    },
    getways() {
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.payModes = res.data.data.content.list
        }
      })
    },
    // 默认显示今天
    getdatatime() { // 默认显示今天
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
      this.personalForm.cancelDate = currentdate
    },
    // 收款人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 收款人回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
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
      this.allmoney = sums[8]
      if (this.isshow === true) {
        this.personalForm.penaltyMoney = sums[6]
        this.personalForm.totalLackMoney = sums[9]
        const jiangli = Number(sums[5])
        const zhina = Number(sums[6])
        const zhuanghua = zhina - jiangli
        console.log('jiangli', jiangli)
        console.log('zhina', zhina)
        console.log('zhuanghua', zhuanghua)
        this.personalForm.receiptMoney = Number(sums[10]) + zhuanghua
      } else {
        console.log(456)
        this.personalForm.penaltyMoney = sums[5]
        this.personalForm.totalLackMoney = sums[8]
        this.personalForm.receiptMoney = sums[9] - sums[4] + sums[5]
      }

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
              return (Number(prev) + Number(curr)).toFixed(2)
            } else {
              return Number(prev).toFixed(2)
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      sums[1] = ''
      this.allmoney = sums[5]
      this.personalForm.receiptMoney = sums[6]
      this.personalForm.deductionMoney = sums[7]
      this.personalForm.totalLackMoney = sums[5] - sums[6]
      return sums
    },
    // 选择客户类型时清理客户名称
    clearCustomer() {
      this.personalForm.customerId = ''
      this.customerId = ''
      this.list2 = []
    },
    // 选择客户focus
    chooseCustomer() {
      this.installmentcontrol = true
    },
    agentdata(val) {
      setTimeout(() => {
        this.$refs.editable.clear()
        this.personalForm.customerId = val.id
        this.customerId = val.agentName
        agentCollectList(val).then(res => {
          if (res.data.ret === 200) {
          // console.log('供应商欠款', res.data.data.content.list)
            const agentcollectDetail = res.data.data.content.list.map(function(item) {
              return {
                sourceNumber: item.sourceNumber,
                agentCollectId: item.id,
                shouldMoney: item.shouldMoney,
                discountMoney: item.discountMoney,
                retreatMoney: item.returnMoney,
                collectedMoney: item.collectedMoney,
                uncollectedMoney: item.uncollectedMoney,
                thisMoney: '0.00',
                deductionMoney: '0.00'
              }
            })
            for (let i = 0; i < agentcollectDetail.length; i++) {
              console.log(agentcollectDetail[i])
              this.$refs.editable.insert(agentcollectDetail[i])
            }
          }
        })
      }, 0)
    },
    Installment(val) {
      console.log(val)
      const ress = val
      for (let i = 0; i < ress.length; i++) {
        ress[i].shouldMoney = ress[i].totalMoney
        ress[i].paidMoney = ress[i].totalMoney - ress[i].leftAllmoney
        ress[i].cancleMoney = ress[i].leftAllmoney
        ress[i].sourceNumber = ress[i].orderNumber
      }
      this.list2 = ress
    },
    InstallmentDetail(val) {
      // console.log(val)
      setTimeout(() => {
        this.$refs.editable2.clear()
        if (val.length) {
          console.log('sdsdsdsdsdsdsdsdsdsdsdsdsd', val)
          const InstallmentDetail = val.map(function(item) {
            return {
              installmentDetailId: item.installmentDetailId,
              presentCount: item.presentCount,
              returnMoney: item.returnMoney,
              shouldMoney: item.shouldMoney,
              returnSource: item.returnSource,
              reward: item.reward,
              penalty: item.penalty,
              returnInterest: item.returnInterest,
              paidmoney: item.paidmoney,
              unpay: item.unpay,
              thisMoney: item.unpay,
              installmentId: item.installmentId
            }
          })
          console.log('shushushushushsuhsuhsuhsuhsushu', InstallmentDetail)
          for (let i = 0; i < InstallmentDetail.length; i++) {
            this.$refs.editable2.insert(InstallmentDetail[i])
          }
          this.personalForm.totalLackMoney = Number(this.allmoney) - Number(this.personalForm.receiptMoney)
        }
        // else {
        //   this.$refs.editable2.clear()
        //   const valmap = []
        //   valmap.push(val)
        //   const InstallmentDetail = valmap.map(function(item) {
        //     return {
        //       installmentDetailId: item.id,
        //       presentCount: item.idx,
        //       returnMoney: item.shouldMoney,
        //       shouldMoney: item.shouldMoney,
        //       returnSource: item.capitalMoney,
        //       reward: item.reward,
        //       penalty: item.penalty,
        //       returnInterest: item.interestMoney,
        //       paidmoney: item.paidMoney,
        //       unpay: item.shouldMoney - item.paidMoney,
        //       thisMoney: item.shouldMoney - item.paidMoney,
        //       installmentId: item.installmentId
        //     }
        //   })
        //   console.log('shushushushushsuhsuhsuhsuhsushu', InstallmentDetail)
        //   for (let i = 0; i < InstallmentDetail.length; i++) {
        //     this.$refs.editable2.insert(InstallmentDetail[i])
        //   }
        //   this.personalForm.totalLackMoney = Number(this.allmoney) - Number(this.personalForm.receiptMoney)
        // }
      }, 0)
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
      this.handlePersonId = null
      this.customerId = null
    },
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable2.getRecords()
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: '错误',
          message: '明细表不能为空',
          offset: 100
        })
        return false
      }
      console.log('this.personalForm', this.personalForm)
      this.$refs.personalForm.validate(async(valid) => {
        if (valid) {
          for (let i = 0; i < EnterDetail.length; i++) {
            EnterDetail[i].handlePersonId = this.personalForm.handlePersonId
            EnterDetail[i].repositoryId = this.personalForm.repositoryId
            EnterDetail[i].regionId = this.personalForm.regionId
            EnterDetail[i].cancelDate = this.personalForm.cancelDate
            EnterDetail[i].sourceType = this.personalForm.sourceType
            EnterDetail[i].createPersonId = this.personalForm.createPersonId
            const parms2 = JSON.stringify(EnterDetail[i])
            const applydata = await addVerification(parms2, this.personalForm).then(res => {
              if (i === EnterDetail.length - 1) {
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
              }
            })
          }
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
      const view = { path: '/Verification/AddVerification', name: 'AddVerification', fullPath: '/Verification/AddVerification', title: 'AddVerification' }
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
