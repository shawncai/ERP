<template>
  <el-dialog :visible.sync="editVisible3" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="'修改'" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" >归还明细</h2>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: true, showStatus: true}"
          :edit-rules="validRules"
          class="click-table1"
          stripe
          border
          size="medium"
          style="width: 100%">
          <!--          <el-editable-column type="selection" min-width="55" align="center"/>-->
          <el-editable-column label="序号" min-width="55" align="center" type="index"/>
          <el-editable-column prop="toolsCode" align="center" label="工具编号" min-width="150px"/>
          <el-editable-column prop="toolsName" align="center" label="工具名称" min-width="150px"/>
          <!--            <el-editable-column prop="productCategory" align="center" label="物品分类" min-width="150px"/>-->
          <el-editable-column prop="unit" align="center" label="基本单位" min-width="150px"/>
          <!--            <el-editable-column prop="productType" align="center" label="规格型号" min-width="150px"/>-->
          <!--            <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>-->
          <el-editable-column prop="quantity" align="center" label="数量" width="150px"/>
          <el-editable-column prop="lossQuantity" align="center" label="丢失数量" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElSelect',options: results ,type: 'visible'}" prop="stat" align="center" label="状态" min-width="150px"/>
          <el-editable-column prop="stat" align="center" label="状态" min-width="150px">
            <template slot-scope="scope">
              <p>{{ scope.row.stat | statFilter }}</p>
            </template>
          </el-editable-column>
        </el-editable>
      </div>
    </el-card>
    <el-card class="box-card" style="width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">取消</el-button>
        <el-button type="primary" @click="handleEditok()">保存</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { updateAccessTools } from '@/api/AccessTools'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchSaleCategory } from '@/api/SaleCategory'
import { searchCategory } from '@/api/Supplier'
import { ratelist } from '@/api/Installmentrate'
import { locationlist, getlocation6 } from '@/api/public'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import MySupplier from './MySupplier'
import MyApply from './MyApply'
import MyPlan from './MyPlan'
import MyDelivery from './MyDelivery'
import MyRepository from './MyRepository'
import MyOpportunity from './MyOpportunity'
import MyInstallmentapply from './MyInstallmentapply'
import MyAgent from './MyAgent'
import MyCustomer from '../../SaleOpportunity/components/MyCustomer'
export default {
  components: { MyCustomer, MyInstallmentapply, MyOpportunity, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp, MyAgent, MyRepository },
  filters: {
    statFilter(status) {
      const statusMap = {
        1: '借出',
        2: '归还'
      }
      return statusMap[status]
    }
  },
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
    const validatePass4 = (rule, value, callback) => {
      if (this.customerId === undefined || this.customerId === null || this.customerId === '') {
        callback(new Error('请选择客户'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      console.log(this.accessRepositoryId)
      if (this.accessRepositoryId === undefined || this.accessRepositoryId === null || this.accessRepositoryId === '') {
        callback(new Error('请选择仓库'))
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
      console.log(this.applyPersonId)
      if (this.applyPersonId === undefined || this.applyPersonId === null || this.applyPersonId === '') {
        callback(new Error('请选择申请员'))
      } else {
        callback()
      }
    }
    return {
      results: [{ value: 1, label: '借出' }, { value: 2, label: '归还' }],
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
      accessRepositoryId: '',
      // 分期申请
      installappleycontrol: false,
      // 销售门店
      saleRepositoryId: this.$store.getters.repositoryName,
      // 业务员回显
      salePersonId: this.$store.getters.name,
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible3: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 控制经销商
      agentcontrol: false,
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
      applyPersonId: '',
      // 控制门店
      repositorycontrol: false,
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
      // 出库明细中货位数据
      locationlist: [],
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
        emergencyLevel: [
          { required: true, message: '请选择紧急程度', trigger: 'change' }
        ],
        accessRepositoryId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        inquiryPersonId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        applyPersonId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        title: [
          { required: true, message: '请输入主题', trigger: 'change' }
        ],
        applyDate: [
          { required: true, message: '请选择申请日期', trigger: 'change' }
        ],
        deptId: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        accessDate: [
          { required: true, message: '请选择使用日期', trigger: 'change' }
        ],
        applyReason: [
          { required: true, message: '请输入原因', trigger: 'change' }
        ],
        customerId: [
          { required: true, validator: validatePass4, trigger: 'change' }
        ]
      },
      // 采购申请单明细数据
      list2: [],
      // 采购申请单明细列表规则
      validRules: {
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible3 = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.accessRepositoryId = this.personalForm.accessRepositoryName
      this.applyPersonId = this.personalForm.applyPersonName
      this.stockPersonId = this.personalForm.stockPersonName
      this.salePersonId = this.personalForm.salePersonName
      this.customerId = this.personalForm.customerName
      this.personalForm.useType = String(this.personalForm.useType)
      this.personalForm.emergencyLevel = String(this.personalForm.emergencyLevel)
      this.list2 = this.personalForm.accessToolsDetails
      this.getlocation6()
    }
  },
  created() {
    this.getTypes()
    this.getways()
    this.getratelist()
  },
  methods: {
    getlocation6() {
      // 货位根据仓库id展现
      locationlist(this.personalForm.accessRepositoryId).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list
        }
      })
    },
    updatebatch(event, scope) {
      if (event === true) {
        console.log(this.personalForm.accessRepositoryId)
        if (this.personalForm.accessRepositoryId === undefined || this.personalForm.accessRepositoryId === '') {
          this.$notify.error({
            title: '错误',
            message: '请先选择仓库',
            offset: 100
          })
          return false
        }
        getlocation6(this.personalForm.accessRepositoryId, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
              // this.updatebatch3(scope)
            } else if (res.data.data.content.length === 0) {
              this.$notify.error({
                title: '错误',
                message: '该仓库没有该商品',
                offset: 100
              })
              this.locationlist = []
              return false
            }
          }
        })
      }
    },
    productdetail(val) {
      console.log('val', val)
      const nowlistdata = this.$refs.editable.getRecords()
      console.log('nowlistdata', nowlistdata)
      for (let i = 0; i < val.length; i++) {
        console.log(val[i].price)
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].toolsCode === nowlistdata[j].toolsCode) {
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
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      this.accessRepositoryId = val.repositoryName
      this.personalForm.accessRepositoryId = val.id
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
    // 选择源单类型事件
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
      this.applyPersonId = val.personName
      this.personalForm.applyPersonId = val.id
      // this.personalForm.deptId = val.deptId
      // this.personalForm.saleRepositoryId = val.repositoryId
      // this.saleRepositoryId = val.repositoryName
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
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      const EnterDetail = this.deepClone(this.$refs.editable.getRecords())
      if (EnterDetail.length !== 0) {
        EnterDetail.map(function(elem) {
          return elem
        }).forEach(function(elem) {
          if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
            delete elem.productCode
          }
          if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
            delete elem.productName
          }
          if (elem.type === null || elem.type === '' || elem.type === undefined) {
            delete elem.type
          }
          if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
            delete elem.unit
          }
          if (elem.price === null || elem.price === '' || elem.price === undefined) {
            delete elem.price
          }
          if (elem.plannedQuantity === null || elem.plannedQuantity === '' || elem.plannedQuantity === undefined) {
            delete elem.plannedQuantity
          }
          if (elem.requireDate === null || elem.requireDate === '' || elem.requireDate === undefined) {
            delete elem.requireDate
          }
          if (elem.reason === null || elem.reason === '' || elem.reason === undefined) {
            delete elem.reason
          }
          if (elem.sourceNumber === null || elem.sourceNumber === '' || elem.sourceNumber === undefined) {
            delete elem.sourceNumber
          }
          if (elem.sourceSerialNumber === null || elem.sourceSerialNumber === '' || elem.sourceSerialNumber === undefined) {
            delete elem.sourceSerialNumber
          }
          if (elem.includeTaxPrice === null || elem.includeTaxPrice === '' || elem.includeTaxPrice === undefined) {
            delete elem.includeTaxPrice
          }
          if (elem.taxRate === null || elem.taxRate === '' || elem.taxRate === undefined) {
            delete elem.taxRate
          }
          if (elem.taxRate !== null || elem.taxRate !== '' || elem.taxRate !== undefined) {
            elem.taxRate = elem.taxRate / 100
          }
          if (elem.discount === null || elem.discount === '' || elem.discount === undefined) {
            delete elem.discount
          }
          if (elem.discount !== null || elem.discount !== '' || elem.discount !== undefined) {
            elem.discount = elem.discount / 100
          }
          if (elem.money === null || elem.money === '' || elem.money === undefined) {
            delete elem.money
          }
          if (elem.includeTaxMoney === null || elem.includeTaxMoney === '' || elem.includeTaxMoney === undefined) {
            delete elem.includeTaxMoney
          }
          if (elem.taxMoney === null || elem.taxMoney === '' || elem.taxMoney === undefined) {
            delete elem.taxMoney
          }
          if (elem.discountRate === null || elem.discountRate === '' || elem.discountRate === undefined) {
            delete elem.discountRate
          }
          if (elem.discountMoney === null || elem.discountMoney === '' || elem.discountMoney === undefined) {
            delete elem.discountMoney
          }
          return elem
        })
        const parms2 = JSON.stringify(EnterDetail)
        const Data = this.personalForm
        for (const key in Data) {
          if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
            delete Data[key]
          }
        }
        const parms = JSON.stringify(Data)
        updateAccessTools(parms, parms2).then(res => {
          if (res.data.ret === 200) {
            this.$notify({
              title: '操作成功',
              message: '操作成功',
              type: 'success',
              duration: 1000,
              offset: 100
            })
            this.$emit('rest', true)
            this.$refs.editable.clear()
            // this.$refs.personalForm.clearValidate()
            // this.$refs.personalForm.resetFields()
            this.editVisible3 = false
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
          message: '明细不能为空',
          offset: 100
        })
        return false
      }
    },
    handlecancel() {
      this.$refs.editable.clear()
      // this.$refs.personalForm.clearValidate()
      // this.$refs.personalForm.resetFields()
      this.editVisible3 = false
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
