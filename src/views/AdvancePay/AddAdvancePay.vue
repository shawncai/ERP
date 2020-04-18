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
                <el-form-item :label="$t('AdvancePay.supplierId')" prop="supplierId" style="width: 100%;">
                  <el-input v-model="supplierId" style="margin-left: 18px;width:200px" clearable @focus="handlechoose"/>
                  <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockArrival.sourceType')" prop="sourceType" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px" >
                    <el-option value="1" label="采购订单" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockRetreat.sourceNumber')" prop="sourceNumber" style="width: 100%;">
                  <el-input v-model="personalForm.sourceNumber" style="margin-left: 18px;width:200px" clearable @focus="handleAddSouce"/>
                  <my-order :ordercontrol.sync="ordercontrol" :supp.sync="supp" @allOrderinfo="allOrderinfo2"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AdvancePay.payDate')" prop="payDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.payDate"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AdvancePay.stockPersonId')" prop="stockPersonId" style="width: 100%;">
                  <el-input v-model="stockPersonId" style="margin-left: 18px;width:200px" clearable @focus="handlechooseDelivery"/>
                </el-form-item>
                <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AdvancePay.currency')" style="width: 100%;">
                  <el-select v-model="personalForm.currency" clearable style="margin-left: 18px;width: 200px" @change="change()">
                    <el-option value="1" label="PHP"/>
                    <el-option value="2" label="USD"/>
                    <el-option value="3" label="RMB"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AdvancePay.settleMode')" prop="settleMode" style="width: 100%;">
                  <el-select v-model="personalForm.settleMode" clearable style="margin-left: 18px;width: 200px">
                    <el-option
                      v-for="(item, index) in paymentIds"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AdvancePay.payAccount')" prop="payAccount" style="width: 100%;">
                  <el-input v-model="personalForm.payAccount" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item :label="$t('AdvancePay.ratioId')" prop="ratioId" style="width: 100%;">
                  <el-select v-model="personalForm.ratioId" style="margin-left: 18px;width: 200px" @change="handerchoose">
                    <el-option
                      v-for="(item, index) in ratios"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :span="6">
                <el-form-item :label="$t('AdvancePay.ratioId')" prop="ratioRate" style="width: 100%;">
                  <el-input v-model="personalForm.ratioRate" type="number" style="margin-left: 18px;width:200px" clearable @blur="handerchoose"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AdvancePay.orderMoney')" prop="orderMoney" style="width: 100%;">
                  <el-input v-model="personalForm.orderMoney" disabled style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AdvancePay.totalMoney')" prop="totalMoney" style="width: 100%;">
                  <el-input v-model="personalForm.totalMoney" disabled style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AdvancePay.summary')" prop="summary" style="width: 100%;">
                  <el-input v-model="personalForm.summary" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { search2 } from '@/api/Supplier'
import { addadvancepay } from '@/api/AdvancePay'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchCategory } from '@/api/Supplier'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MySupplier from './components/MySupplier'
import MyApply from './components/MyApply'
import MyPlan from './components/MyPlan'
import MyDelivery from './components/MyDelivery'
import MyLnquiry from './components/MyLnquiry'
import MyOrder from './components/MyOrder'
var _that
export default {
  name: 'AddAdvancePay',
  components: { MyOrder, MyLnquiry, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp },
  data() {
    const validatePass3 = (rule, value, callback) => {
      console.log(this.stockPersonId)
      if (this.stockPersonId === undefined || this.stockPersonId === null || this.stockPersonId === '') {
        callback(new Error('请选择采购员'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      console.log(this.supplierId)
      if (this.supplierId === undefined || this.supplierId === null || this.supplierId === '') {
        callback(new Error('请选择供应商'))
      } else {
        callback()
      }
    }
    // const validatePass4 = (rule, value, callback) => {
    //   console.log(this.personalForm.settleMode)
    //   if (this.personalForm.settleMode === undefined || this.personalForm.settleMode === null || this.personalForm.settleMode === '') {
    //     callback(new Error('请选择结算方式'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      stockPersonId: this.$store.getters.name,
      ratios: [],
      supp: null,
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      // 合计数据
      allNumber: '',
      allMoney: '',
      allTaxMoney: '',
      allIncludeTaxMoney: '',
      allDiscountMoney: '',
      allMoneyMoveDiscount: '',
      allOthermoney: '',
      // 交货方式
      giveIds: [],
      // 运送方式
      transportIds: [],
      // 结算方式
      paymentIds: [],
      // 控制采购员
      deliverycontrol: false,
      // 控制源单为采购到货单
      ordercontrol: false,
      // 控制添加商品按钮
      addpro: true,
      // 控制从源单中选择按钮
      addsouce: true,
      // 供应商回显
      supplierId: '',
      // 控制供应商
      empcontrol: false,
      // 选择的数据
      choosedata: [],
      // 部门数据
      depts: [],
      // 类别数据
      types: [],
      // 类别获取参数
      typeparms: {
        pagenum: 1,
        pagesize: 99999
      },
      // 控制商品列表窗口
      control: false,
      // 采购申请单信息数据
      personalForm: {
        sourceType: '1',
        stockPersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        isVat: 1,
        totalMoney: 0,
        ratioRate: 100,
        payDate: null,
        payAccount: ''
      },
      // 采购申请单规则数据
      personalrules: {
        supplierId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        stockPersonId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        payDate: [
          { required: true, message: '请选择询价日期', trigger: 'change' }
        ],
        totalMoney: [
          { required: true, message: '请输入预付金额', trigger: 'blur' }
        ],
        orderMoney: [
          { required: true, message: '请输入订单金额', trigger: 'blur' }
        ],
        payAccount: [
          { required: true, message: '请输入付款账户', trigger: 'blur' }
        ],
        ratioId: [
          { required: true, message: '请选择付款比例', trigger: 'change' }
        ],
        ratioRate: [
          { required: true, message: '请输入付款比例', trigger: 'blur' }
        ]
        // settleMode: [
        //   { required: true, validator: validatePass4, trigger: 'change' }
        // ]
      },
      // 采购申请单明细数据
      list2: [],
      // 采购申请单明细列表规则
      validRules: {
      }
    }
  },
  created() {
    this.getTypes()
    this.getways()
    this.getdatatime()
  },

  mounted() {
    this.getinformation()
    this.getcurrency()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getcurrency() {
      const mycountry = this.$store.getters.countryId
      if (mycountry === 1) {
        this.personalForm.currency = '3'
      } else if (mycountry === 2) {
        this.personalForm.currency = '1'
      }
    },
    handerchoose(val) {
      // console.log(val)
      // const needratio = this.ratios.find(item => {
      //   return item.id === val
      // })
      // console.log('needratio', needratio)
      console.log('this.personalForm.ratioRate', this.personalForm.ratioRate)
      this.personalForm.totalMoney = Number(this.personalForm.ratioRate) / 100 * Number(this.personalForm.orderMoney)
    },
    getinformation() {
      if (this.$store.getters.empcontract) {
        console.log('getempcontract', this.$store.getters.empcontract)
        this.personalForm.orderMoney = Number(this.$store.getters.empcontract.allIncludeTaxMoney)
        this.personalForm.currency = String(this.$store.getters.empcontract.currency)
        this.personalForm.sourceNumber = this.$store.getters.empcontract.orderNumber
        this.personalForm.supplierId = this.$store.getters.empcontract.supplierId
        const parms = { id: this.personalForm.supplierId }
        search2(parms).then(res => {
          console.log('res', res)
          if (res.data.ret === 200) {
            this.personalForm.payAccount = res.data.data.content.list[0].account
          }
        })
        this.supplierId = this.$store.getters.empcontract.supplierName
        this.stockPersonId = this.$store.getters.empcontract.stockPersonName
        this.personalForm.stockPersonId = this.$store.getters.empcontract.stockPersonId
        if (this.$store.getters.empcontract.settleMode !== null) {
          this.personalForm.settleMode = this.$store.getters.empcontract.settleMode
        }
        this.$store.dispatch('getempcontract', '')
      }
    },
    // 重置一下下拉
    change() {
      this.$forceUpdate()
    },
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
      this.personalForm.payDate = currentdate
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
              return prev + curr
            } else {
              return (prev).toFixed(2)
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      sums[2] = ''
      sums[3] = ''
      sums[4] = ''
      sums[5] = ''
      sums[6] = ''
      sums[10] = ''
      sums[15] = ''
      sums[18] = ''
      sums[19] = ''
      this.allNumber = sums[7]
      this.allMoney = sums[12]
      this.allTaxMoney = sums[14]
      this.allIncludeTaxMoney = sums[13]
      this.allDiscountMoney = sums[16]
      this.allMoneyMoveDiscount = sums[13] - sums[16]
      return sums
    },
    getways() {
      // 交货方式
      searchCategory(2).then(res => {
        if (res.data.ret === 200) {
          this.giveIds = res.data.data.content.list
        }
      })
      // 运送方式
      searchCategory(3).then(res => {
        if (res.data.ret === 200) {
          this.transportIds = res.data.data.content.list
        }
      })
      // 结算方式
      searchCategory(5).then(res => {
        if (res.data.ret === 200) {
          this.paymentIds = res.data.data.content.list
        }
      })
      // 付款比例
      searchCategory(8).then(res => {
        if (res.data.ret === 200) {
          this.ratios = res.data.data.content.list
        }
      })
    },
    // 选择源单类型事件
    chooseType() {
      console.log(this.personalForm.sourceType)
      if (this.personalForm.sourceType === '1') {
        this.addsouce = false
        this.addpro = true
        this.$refs.editable.clear()
      } else if (this.personalForm.sourceType === '2') {
        this.addpro = false
        this.addsouce = true
        this.$refs.editable.clear()
      }
    },
    // 从源单中添加商品
    handleAddSouce() {
      if (this.supp === '' || this.supp === undefined || this.supp === null) {
        this.$notify.error({
          title: 'wrong',
          message: '请先选择供应商',
          offset: 100
        })
        return false
      } else {
        this.ordercontrol = true
      }
    },
    order(val) {
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    allOrderinfo2(val) {
      this.personalForm.sourceNumber = val.orderNumber
      this.stockPersonId = val.stockPersonName
      this.personalForm.stockPersonId = val.stockPersonId
      if (val.settleMode !== null) {
        this.personalForm.settleMode = val.settleMode
      }
      this.personalForm.orderMoney = Number(val.allIncludeTaxMoney)
      this.personalForm.currency = String(val.currency)
      this.handerchoose()
    },
    allOrderinfo(val) {
      this.personalForm.supplierId = val.supplierId
      this.supplierId = val.supplierName
    },
    // 更新类型
    updatecountry() {
      this.getTypes()
    },
    getTypes() {
      // 采购类别数据
      searchStockCategory(this.typeparms).then(res => {
        if (res.data.ret === 200) {
          this.types = res.data.data.content.list
        }
      })
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    // 供应商输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 供应商列表返回数据
    supplierName(val) {
      console.log(val)
      this.supp = val.id
      this.supplierId = val.supplierName
      this.personalForm.supplierId = val.id
      this.personalForm.payAccount = val.account
      this.stockPersonId = val.buyerName
      this.personalForm.stockPersonId = val.buyerId
      this.personalForm.settleMode = val.paymentId
      if (val.moneyId !== '' && val.moneyId !== null && val.moneyId !== undefined) {
        this.personalForm.currency = String(val.moneyId)
      }
    },
    // 采购员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 采购员回显
    stockName(val) {
      this.stockPersonId = val.personName
      this.personalForm.stockPersonId = val.id
    },
    // 采购人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.stockPersonId = val.personName
      this.personalForm.stockPersonId = val.id
    },
    // 采购申请明细来源
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        console.log(val[i].price)
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].productCode === nowlistdata[j].productCode) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('prompt.wpytj'),
              offset: 100
            })
            return false
          }
        }
        this.$refs.editable.insert(val[i])
      }
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        sourceType: '1',
        stockPersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        isVat: 1,
        totalMoney: 0,
        ratioRate: 100,
        payDate: null,
        payAccount: ''
      }
      this.supplierId = null
      this.inquiryPersonId = null
      this.stockPersonId = this.$store.getters.name
      this.ourContractorId = null
      this.acceptPersonId = null
      this.getdatatime()
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
          addadvancepay(parms, this.personalForm).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: 'successful',
                message: 'save successful',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
            } else {
              this.$notify.error({
                title: 'wrong',
                message: res.data.msg,
                offset: 100
              })
            }
          })
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'Information is incomplete',
            offset: 100
          })
          return false
        }
      })
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/AdvancePay/AddAdvancePay', name: 'AddAdvancePay', fullPath: '/AdvancePay/AddAdvancePay', title: 'AddAdvancePay' }
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
