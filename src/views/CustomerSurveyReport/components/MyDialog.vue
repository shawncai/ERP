<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.contractNumber +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" shadow="never">
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('CustomerSurveyReport.title')" prop="title" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CustomerSurveyReport.sourceType')" prop="sourceType" style="width: 100%;">
                <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px" @change="chooseType">
                  <el-option value="2" label="分期申请" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CustomerSurveyReport.sourceNumber')" prop="sourceNumber" style="width: 100%;">
                <el-input v-model="personalForm.sourceNumber" style="margin-left: 18px;width: 200px" @focus="chooseData"/>
              </el-form-item>
              <my-opportunity :opportunitycontrol.sync="opportunitycontrol" @opportunityDetail="opportunityDetail" @opportunity="opportunity"/>
              <my-installmentapply :installappleycontrol.sync = "installappleycontrol" @installappleyDetail="installappleyDetail" @installappley="installappley"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CustomerSurveyReport.customerName')" style="width: 100%;">
                <el-input v-model="personalForm.customerName" style="margin-left: 18px;width: 200px" disabled @focus="chooseCustomer"/>
                <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
                <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CustomerSurveyReport.surveyDate')" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.surveyDate"
                  :picker-options="pickerOptions3"
                  :disabled="isinstallappley"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CustomerSurveyReport.surveyPersonId')" style="width: 100%;">
                <el-input v-model="surveyPersonId" style="margin-left: 18px;width: 200px" disabled clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" shadow="never">
      <h2 ref="geren" class="form-name">{{ $t('updates.khdcbgmx') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('CustomerSurveyReport.liveStatus')" prop="title" style="width: 100%;">
                <el-radio-group v-model="personalForm.liveStatus">
                  <el-radio label="1">按揭</el-radio>
                  <el-radio label="2">租房</el-radio>
                  <el-radio label="3">和亲戚住</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('CustomerSurveyReport.liveType')" prop="title" style="width: 100%;">
                <el-radio-group v-model="personalForm.liveType">
                  <el-radio label="1">旧的</el-radio>
                  <el-radio label="2">新建筑</el-radio>
                  <el-radio label="3">高档公寓</el-radio>
                  <el-radio label="4">小隔间</el-radio>
                  <el-radio label="5">普通公寓</el-radio>
                  <el-radio label="6">双层楼建筑</el-radio>
                  <el-radio label="7">低成本住房</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('CustomerSurveyReport.personalProperty')" prop="title" style="width: 100%;">
                <el-checkbox-group v-model="personalProperty">
                  <el-checkbox label="1">电视</el-checkbox>
                  <el-checkbox label="2">家庭影院</el-checkbox>
                  <el-checkbox label="3">冰箱</el-checkbox>
                  <el-checkbox label="4">洗衣机</el-checkbox>
                  <el-checkbox label="5">空调</el-checkbox>
                  <el-checkbox label="6">电脑</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never">
      <h2 ref="geren" class="form-name">{{ $t('updates.zhjg') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm3" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('CustomerSurveyReport.result')" prop="title" style="width: 100%;">
                <el-select v-model="personalForm.result" style="margin-left: 18px;width: 200px">
                  <el-option :label="$t('updates.tg')" value="1" />
                  <el-option :label="$t('updates.btg')" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never">
      <h2 ref="geren" class="form-name">{{ $t('updates.yyfx') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm4" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('CustomerSurveyReport.reason')" prop="title" style="width: 100%;">
                <el-input
                  :autosize="{ minRows: 3}"
                  v-model="personalForm.reason"
                  type="textarea"
                  style="width:300px;"
                  placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        <el-button type="primary" @click="handleEditok()">{{ $t('Hmodule.baoc') }}</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { updateCustomerSurveyReport } from '@/api/CustomerSurveyReport'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchSaleCategory } from '@/api/SaleCategory'
import { searchCategory } from '@/api/Supplier'
import { ratelist } from '@/api/Installmentrate'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import MySupplier from './MySupplier'
import MyApply from './MyApply'
import MyPlan from './MyPlan'
import MyDelivery from './MyDelivery'
import MyOpportunity from './MyOpportunity'
import MyInstallmentapply from './MyInstallmentapply'
import MyAgent from './MyAgent'
import MyCustomer from '../../SaleOpportunity/components/MyCustomer'
var _that
export default {
  components: { MyCustomer, MyInstallmentapply, MyOpportunity, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp, MyAgent },
  props: {
    editcontrol: {
      type: Boolean,
      default: false
    },
    editdata: {
      type: Object,
      default: null
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(this.supplierId)
      if (this.supplierId === undefined || this.supplierId === null || this.supplierId === '') {
        callback(new Error('请选择供应商'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(this.inquiryPersonId)
      if (this.inquiryPersonId === undefined || this.inquiryPersonId === null || this.inquiryPersonId === '') {
        callback(new Error('请选择我方签约人'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(this.inquiryPersonId)
      if (this.stockPersonId === undefined || this.stockPersonId === null || this.stockPersonId === '') {
        callback(new Error('请选择采购员'))
      } else {
        callback()
      }
    }
    return {
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.personalForm.installmentEndtime !== null) {
            return time.getTime() < new Date().getTime() - 8.64e7
          } else if (this.personalForm.installmentEndtime === null) {
            return time.getTime() < new Date().getTime() - 8.64e7
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.personalForm.installmentBegintime).getTime() - 8.64e7
        }
      },
      pickerOptions3: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      // 分期数据
      installmentCounts: [],
      // 分期期数参数
      ratelistData: {
        stat: 1,
        pagenum: 1,
        pagesize: 9999
      },
      // 是否可以编辑分期数据
      isinstallappley: false,
      // 回显客户
      customerId: '',
      // 控制客户弹窗
      customercontrol: false,
      // 分期申请
      installappleycontrol: false,
      // 销售门店
      saleRepositoryId: this.$store.getters.repositoryName,
      // 业务员回显
      salePersonId: this.$store.getters.name,
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 控制经销商
      agentcontrol: false,
      personalProperty: [],
      // 开票类别数据
      invoiceTypes: [],
      // 开票类别获取参数
      invoicetypeparms: {
        type: 4,
        pagenum: 1,
        pagesize: 99999
      },
      // 结算方式数据
      colseTypes: [],
      // 结算方式获取参数
      colseTypeparms: {
        type: 3,
        pagenum: 1,
        pagesize: 99999
      },
      // 合计数据
      allNumber: '',
      allMoney: '',
      allTaxMoney: '',
      allIncludeTaxMoney: '',
      allDiscountMoney: '',
      allMoneyMoveDiscount: '',
      // 交货方式
      giveIds: [],
      // 运送方式
      transportIds: [],
      // 结算方式
      paymentIds: [],
      // 我方签约人回显
      ourContractorId: '',
      // 控制我方签约人
      deliverycontrol: false,
      // 控制源单为销售机会时
      opportunitycontrol: false,
      // 控制添加商品按钮
      addpro: true,
      // 控制从源单中选择按钮
      addsouce: true,
      // 供应商回显
      supplierId: '',
      // 控制供应商
      empcontrol: false,
      // 部门数据
      depts: [],
      // 控制业务员
      stockControl: false,
      // 类别数据
      types: [],
      // 类别获取参数
      typeparms: {
        pagenum: 1,
        pagesize: 99999
      },
      // 控制商品列表窗口
      control: false,
      // 采购申请单规则数据
      personalrules: {
        customerType: [
          { required: true, message: '请选择客户类别', trigger: 'change' }
        ],
        supplierId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        inquiryPersonId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        stockPersonId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        inquiryDate: [
          { required: true, message: '请选择询价日期', trigger: 'change' }
        ],
        deptId: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        stockTypeId: [
          { required: true, message: '请选择采购类别', trigger: 'change' }
        ]
      },
      // 采购申请单明细数据
      list2: [],
      // 采购申请单明细列表规则
      validRules: {
      },
      surveyPersonId: ''
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.supplierId = this.personalForm.supplierName
      this.stockPersonId = this.personalForm.stockPersonName
      this.salePersonId = this.personalForm.salePersonName
      this.customerId = this.personalForm.customerName
      this.list2 = this.personalForm.saleContractDetailVos
      this.surveyPersonId = this.personalForm.surveyPersonName
      const abc = this.personalForm.personalProperty.split(',')
      console.log('abc', abc)
      this.personalProperty = abc
    }
  },
  created() {
    this.getTypes()
    this.getways()
    this.getratelist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    chooseType() {
      console.log(this.personalForm.sourceType)
      if (this.personalForm.sourceType === '1') {
        this.$refs.editable.clear()
        this.personalForm.sourceNumber = ''
        this.personalForm.installmentCount = ''
        this.isinstallappley = true
      } else if (this.personalForm.sourceType === '2') {
        this.$refs.editable.clear()
        this.personalForm.sourceNumber = ''
        this.personalForm.installmentCount = ''
        this.isinstallappley = false
      }
    },
    change() {
      this.$forceUpdate()
    },
    // 获取分期期数
    getratelist() {
      ratelist(this.ratelistData).then(res => {
        if (res.data.ret === 200) {
          this.installmentCounts = res.data.data.content.list
        }
      })
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
        this.customercontrol = true
        this.$forceUpdate()
      }
    },
    customerdata(val) {
      this.personalForm.customerId = val.id
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.phoneNumber
    },
    agentdata(val) {
      console.log(val)
      this.personalForm.customerId = val.id
      this.customerId = val.agentName
      this.personalForm.customerPhone = val.phone
    },
    clearfinal() {
      this.personalForm.installmentEndtime = null
    },
    chooseData() {
      if (this.personalForm.sourceType === '1') {
        this.opportunitycontrol = true
      } else if (this.personalForm.sourceType === '2') {
        this.installappleycontrol = true
      }
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
              return (prev + curr).toFixed(2)
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
      sums[8] = ''
      sums[9] = ''
      sums[10] = ''
      sums[14] = ''
      sums[15] = ''
      sums[17] = ''
      sums[18] = ''
      sums[19] = ''
      this.allNumber = sums[7]
      this.allMoney = sums[11]
      this.allTaxMoney = sums[13]
      this.allIncludeTaxMoney = sums[12]
      this.allDiscountMoney = sums[16]
      this.allMoneyMoveDiscount = sums[12] - sums[16]
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
    },
    // 计算成本金额
    getcostMoney(row) {
      row.costMoney = (row.costPrice * row.quantity).toFixed(2)
      return row.costMoney
    },
    // 计算含税金额
    getincludeTaxMoney(row) {
      row.includeTaxMoney = (row.taxprice * row.quantity).toFixed(2)
      row.discountMoney = (row.taxprice * row.quantity * (1 - row.discount / 100)).toFixed(2)
      return row.includeTaxMoney
    },
    // 通过税率计算含税价
    gettaxRate(row) {
      if (row.taxprice !== 0) {
        row.taxprice = (row.salePrice * (1 + row.taxRate / 100)).toFixed(2)
      }
    },
    // 计算税额
    getTaxMoney2(row) {
      row.taxMoney = (row.salePrice * row.taxRate / 100 * row.quantity).toFixed(2)
      return row.taxMoney
    },
    // 通过折扣计算折扣额
    getdiscountRate(row) {
      if (row.discount === 0) {
        row.discountMoney = row.taxprice * row.quantity
      } else {
        row.discountMoney = (row.taxprice * row.quantity * (1 - row.discount / 100)).toFixed(2)
      }
    },
    // 通过折扣额计算折扣
    getdiscountMoney(row) {
      console.log(row)
      if (row.taxprice !== 0 && row.quantity !== 0 && row.discountMoney !== 0) {
        row.discount = ((1 - row.discountMoney / row.taxprice / row.quantity) * 100).toFixed(2)
      }
    },
    // 计算金额
    getMoney(row) {
      row.money = (row.quantity * row.salePrice).toFixed(2)
      return row.money
    },
    // 含税价
    gettaxprice(row) {
      row.taxprice = (row.salePrice * (1 + row.taxRate / 100)).toFixed(2)
      return row.taxprice
    },
    getincludeTaxCostMoney(row) {
      row.includeTaxCostMoney = Number(row.salePrice * row.quantity) + Number(row.taxMoney)
      return row.includeTaxCostMoney
    },
    // 从源单中添加商品
    handleAddSouce() {
      if (this.personalForm.sourceType === '1') {
        this.applycontrol = true
      } else if (this.personalForm.sourceType === '2') {
        this.plancontrol = true
      } else if (this.personalForm.sourceType === '3') {
        this.inquirycontrol = true
      }
    },
    // 从销售机会过来的源单数据
    opportunityDetail(val) {
      console.log(val)
      this.$refs.editable.clear()
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
            this.$notify.error({
              title: '错误',
              message: '物品已添加',
              offset: 100
            })
            return false
          }
        }
        this.$refs.editable.insert(val[i])
      }
    },
    opportunity(val) {
      this.personalForm.sourceNumber = val.opportunityNumber
      this.personalForm.salePersonId = val.handlePersonId
      this.salePersonId = val.handlePersonName
    },
    installappleyDetail(val) {
      console.log(val)
      this.$refs.editable.clear()
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
            this.$notify.error({
              title: '错误',
              message: '物品已添加',
              offset: 100
            })
            return false
          }
        }
        this.$refs.editable.insert(val[i])
      }
    },
    installappley(val) {
      this.personalForm.sourceNumber = val.applyNumber
      this.personalForm.installmentCount = val.installmentCount
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
      // 开票类型数据
      searchSaleCategory(this.invoicetypeparms).then(res => {
        if (res.data.ret === 200) {
          this.invoiceTypes = res.data.data.content.list
        }
      })
      // 结算方式数据
      searchSaleCategory(this.colseTypeparms).then(res => {
        if (res.data.ret === 200) {
          this.colseTypes = res.data.data.content.list
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
      this.supplierId = val.supplierName
      this.personalForm.supplierId = val.id
    },
    // 业务员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 业务员回显
    stockName(val) {
      console.log(val)
      this.salePersonId = val.personName
      this.personalForm.salePersonId = val.id
      this.personalForm.deptId = val.deptId
      this.personalForm.saleRepositoryId = val.repositoryId
      this.saleRepositoryId = val.repositoryName
    },
    // 我方签约人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.ourContractorId = val.personName
      this.personalForm.ourContractorId = val.id
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
              title: '错误',
              message: '物品已添加',
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
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        isVat: 1
      }
      this.supplierId = null
      this.inquiryPersonId = null
      this.stockPersonId = null
      this.ourContractorId = null
    },
    // 深拷贝
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.personalProperty = this.personalProperty.join(',')
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          if (this.personalForm.liveStatus === '' || this.personalForm.liveStatus === undefined || this.personalForm.liveStatus === null) {
            this.$notify.error({
              title: '错误',
              message: '请选择居住状况',
              offset: 100
            })
            return false
          }
          if (this.personalForm.liveType === '' || this.personalForm.liveType === undefined || this.personalForm.liveType === null) {
            this.$notify.error({
              title: '错误',
              message: '请选择居住类型',
              offset: 100
            })
            return false
          }
          this.personalForm.modifyPersonId = this.$store.getters.userId
          const Data = this.personalForm
          for (const key in Data) {
            if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
              delete Data[key]
            }
            if (key === 'judgeStat') {
              delete Data[key]
            }
          }
          const parms = JSON.stringify(Data)
          updateCustomerSurveyReport(parms).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: '操作成功',
                message: '操作成功',
                type: 'success',
                duration: 1000,
                offset: 100
              })
              this.$emit('rest', true)
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
              this.editVisible = false
            } else {
              this.$notify.error({
                title: '错误',
                message: '出错了',
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
    handlecancel() {
      this.$refs.editable.clear()
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.editVisible = false
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style rel="stylesheet/css" scoped>
  .container >>> .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    margin-left: -10px;
  }
  .container >>> .el-form-item__label{
    text-align: left;
  }
  .container >>> .el-form-item__label{
    color: #60626696;
  }
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
  .el-col-12{
    width: 49%;
  }
</style>
