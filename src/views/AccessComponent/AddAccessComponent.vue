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
                <el-form-item :label="$t('AccessTools.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('accessComponent.accessPersonId')" prop="accessPersonId" style="width: 100%;">
                  <el-input v-model="accessPersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('accessComponent.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                  <el-input v-model="handlePersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock2"/>
                  <my-emp2 :control.sync="stockControl2" @stockName2="stockName2"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('accessComponent.accessDate')" prop="accessDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.accessDate"
                    :picker-options="pickerOptions4"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AccessTools.accessRepositoryId')" prop="handleRepositoryId" style="width: 100%;">
                  <el-input v-model="handleRepositoryId" style="margin-left: 18px;width: 200px" @focus="handlechooseRep"/>
                  <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >{{ $t('accessComponent.sssd') }}</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <my-detail :control.sync="control" @product="productdetail"/>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        </div>
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
            <el-editable-column type="selection" width="55" align="center"/>
            <el-editable-column label="编号" width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.hw')" prop="location" align="center" min-width="150">
              <template slot-scope="scope">
                <p>{{ getLocationData(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-select v-if="scope.row.batch !== '不使用'" v-model="scope.row.batch" :value="scope.row.batch" :placeholder="$t('Hmodule.xcpc')" filterable clearable style="width: 100%;" @visible-change="updatebatch2($event,scope)">
                  <el-option
                    v-for="(item, index) in batchlist"
                    :key="index"
                    :value="item"
                    :label="item"/>
                </el-select>
                <span v-else>{{ scope.row.batch }}</span>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="typeIdname" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 1.00, precision: 2}, type: 'visible'}" :label="$t('accessComponent.accessQuantity')" prop="outQuantity" align="center" min-width="150">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="true"
                  :min="1.00"
                  v-model="scope.row.accessQuantity"
                  @change="queryStock(scope.row)"
                />
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.dcbm')" prop="batteryCode" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input v-if="isEdit4(scope.row)" v-model="scope.row.batteryCode" clearable />
                <span v-else>{{ scope.row.batteryCode }}</span>
              </template>
            </el-editable-column>
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
import { batchlist, getlocation } from '@/api/public'
import { addAccessComponent } from '@/api/AccessComponent'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchSaleCategory } from '@/api/SaleCategory'
import { searchCategory } from '@/api/Supplier'
import { ratelist } from '@/api/Installmentrate'
import { getlocation6 } from '@/api/public'
import MyEmp from './components/MyEmp'
import MyEmp2 from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MySupplier from './components/MySupplier'
import MyApply from './components/MyApply'
import MyPlan from './components/MyPlan'
import MyDelivery from './components/MyDelivery'
import MyRepository from './components/MyRepository'
import MyOpportunity from './components/MyOpportunity'
import MyInstallmentapply from './components/MyInstallmentapply'
import MyCustomer from '../SaleOpportunity/components/MyCustomer'
import MyAgent from '../SaleOpportunity/components/MyAgent'
var _that
export default {
  name: 'AddAccessTools',
  components: { MyAgent, MyCustomer, MyInstallmentapply, MyOpportunity, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp, MyEmp2, MyRepository },
  data() {
    const validatePass4 = (rule, value, callback) => {
      if (this.customerId === undefined || this.customerId === null || this.customerId === '') {
        callback(new Error('请选择客户'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      console.log(this.handleRepositoryId)
      if (this.handleRepositoryId === undefined || this.handleRepositoryId === null || this.handleRepositoryId === '') {
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
      if (this.accessPersonId === undefined || this.accessPersonId === null || this.accessPersonId === '') {
        callback(new Error('请选择领用人'))
      } else {
        callback()
      }
    }
    return {
      pickerOptions4: {
        disabledDate: (time) => {
          // return time.getTime() < new Date(this.personalForm.signDate).getTime() - 8.64e7
        }
      },
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
      // 控制商品列表窗口
      control: false,
      // 控制门店
      repositorycontrol: false,
      // 分期数据
      installmentCounts: [],
      // 分期期数参数
      ratelistData: {
        stat: 1,
        pagenum: 1,
        pagesize: 9999
      },
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
      // 出库明细中货位数据
      locationlist: [],
      // 结算方式数据
      colseTypes: [],
      // 结算方式获取参数
      colseTypeparms: {
        type: 3,
        pagenum: 1,
        pagesize: 99999
      },
      // 是否可以编辑分期数据
      isinstallappley: false,
      // 回显客户
      batchlist: [],
      customerId: '',
      // 控制客户弹窗
      customercontrol: false,
      // 合计数据
      allNumber: '',
      handleRepositoryId: '',
      allMoney: '',
      allTaxMoney: '',
      allIncludeTaxMoney: '',
      allDiscountMoney: '',
      allMoneyMoveDiscount: '',
      // 分期申请
      installappleycontrol: false,
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
      // 选择的数据
      choosedata: [],
      // 部门数据
      depts: [],
      // 销售门店
      saleRepositoryId: this.$store.getters.repositoryName,
      accessPersonId: '',
      // 业务员回显
      handlePersonId: this.$store.getters.name,
      // 控制业务员
      stockControl: false,
      stockControl2: false,
      // 类别数据
      types: [],
      // 类别获取参数
      typeparms: {
        pagenum: 1,
        pagesize: 99999
      },
      // 采购申请单信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        handlePersonId: this.$store.getters.userId,
        isVat: 1,
        installmentEndtime: null,
        installmentBegintime: null,
        notaryDate: null,
        deptId: this.$store.getters.deptId,
        saleRepositoryId: this.$store.getters.repositoryId,
        customerType: '2',
        signDate: null,
        saleType: '1',
        useType: '1'
      },
      // 采购申请单规则数据
      personalrules: {
        emergencyLevel: [
          { required: true, message: '请选择紧急程度', trigger: 'change' }
        ],
        handleRepositoryId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        inquiryPersonId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        accessPersonId: [
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
  created() {
    this.getTypes()
    this.getways()
    this.getratelist()
    this.getdatatime()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    isEdit4(row) {
      console.log('222', row)
      const re = row.productCode.slice(0, 2)
      if (re === '01' || re === '05') { return true } else { return false }
    },
    queryStock(row) {
      if (row.location === null || row.location === '' || row.location === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: '仓库不存在此商品!',
          offset: 100
        })
        row.outQuantity = 1
        return false
      }
    },
    updatebatch2(event, scope) {
      if (event === true) {
        const parms3 = scope.row.productCode
        batchlist(this.personalForm.handleRepositoryId, parms3).then(res => {
          console.log(res)
          this.batchlist = res.data.data.content
        })
      }
    },
    getLocationData(row) {
      // 默认批次
      if (row.batch === null || row.batch === '' || row.batch === undefined) {
        const parms3 = row.productCode
        batchlist(this.personalForm.handleRepositoryId, parms3).then(res => {
          console.log(res)
          if (res.data.data.content.length > 0) {
            row.batch = res.data.data.content[0]
          }
        })
      } else {
        const parms3 = row.productCode
        batchlist(this.personalForm.handleRepositoryId, parms3).then(res => {
          if (res.data.data.content.length === 0) {
            if (row.batch !== '不使用') {
              row.batch = null
            }
          }
        })
      }
      // 默认货位
      getlocation(this.personalForm.handleRepositoryId, row).then(res => {
        if (res.data.ret === 200) {
          console.log('res', res)
          if (res.data.data.content.length !== 0) {
            row.location = res.data.data.content[0].locationCode
            row.locationId = res.data.data.content[0].id
            console.log('row.locationId', row.locationId)
          } else {
            row.location = null
            row.locationId = null
          }
        }
      })
      return row.location
    },
    updatebatch(event, scope) {
      if (event === true) {
        console.log('handleRepositoryId', this.personalForm.handleRepositoryId)
        if (this.personalForm.handleRepositoryId === undefined || this.personalForm.handleRepositoryId === '' || this.personalForm.handleRepositoryId === null) {
          this.$notify.error({
            title: 'wrong',
            message: '请先选择仓库',
            offset: 100
          })
          return false
        }
        getlocation6(this.personalForm.handleRepositoryId, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
              // this.updatebatch3(scope)
            } else if (res.data.data.content.length === 0) {
              this.$notify.error({
                title: 'wrong',
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
    // 无来源添加商品
    handleAddproduct() {
      if (this.handleRepositoryId === null || this.handleRepositoryId === '' || this.handleRepositoryId === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: '请先选择出库仓库',
          offset: 100
        })
        return false
      }
      this.control = true
    },
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      this.handleRepositoryId = val.repositoryName
      this.personalForm.handleRepositoryId = val.id
    },
    getdatatime() { // 默认显示今天
      this.personalForm.applyDate = new Date()
      this.personalForm.accessDate = new Date()
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
        row.discountMoney = row.includeTaxCostMoney * row.discountRate
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
              title: 'wrong',
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
      this.personalForm.accessPersonId = val.handlePersonId
      this.accessPersonId = val.handlePersonName
    },
    installappleyDetail(val) {
      console.log(val)
      this.$refs.editable.clear()
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
            this.$notify.error({
              title: 'wrong',
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
    // 业务员focus事件
    handlechooseStock2() {
      this.stockControl2 = true
    },
    // 业务员回显
    stockName(val) {
      console.log('ewww', val)
      this.accessPersonId = val.personName
      this.personalForm.accessPersonId = val.id
      this.personalForm.deptId = val.deptId
      this.personalForm.handleRepositoryId = val.repositoryId
      this.handleRepositoryId = val.repositoryName
    },
    // 业务员回显
    stockName2(val) {
      console.log(val)
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
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
    productdetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
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
        handlePersonId: this.$store.getters.userId,
        accessPersonId: null,
        isVat: 1,
        installmentEndtime: null,
        installmentBegintime: null,
        notaryDate: null,
        deptId: this.$store.getters.deptId,
        saleRepositoryId: this.$store.getters.repositoryId,
        customerType: '2',
        signDate: null,
        saleType: '1',
        useType: '1'
      }
      this.handlePersonId = this.$store.getters.name
      this.accessPersonId = null
      this.inquiryPersonId = null
      this.stockPersonId = null
      this.ourContractorId = null
      this.customerId = null
      this.isinstallappley = false
      this.getdatatime()
    },
    // 深拷贝
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    // 保存操作
    handlesave() {
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          const EnterDetail = this.deepClone(this.$refs.editable.getRecords())
          console.log(EnterDetail)
          if (EnterDetail.length === 0) {
            this.$notify.error({
              title: 'wrong',
              message: '明细表不能为空',
              offset: 100
            })
            return false
          }
          let b = 1
          let c = 1
          EnterDetail.map(function(elem) {
            return elem
          }).forEach(function(elem) {
            const re = elem.productCode.slice(0, 2)
            if (re === '01' || re === '05') {
              if (elem.batteryCode === null || elem.batteryCode === undefined || elem.batteryCode === '') {
                b = 2
              }
              if (elem.accessQuantity !== 1) {
                c = 2
              }
            }
          })
          if (c === 2) {
            this.$notify.error({
              title: 'wrong',
              message: '电池出库时数量必须为1',
              offset: 100
            })
            return false
          }
          if (b === 2) {
            this.$notify.error({
              title: 'wrong',
              message: '电池出库时电池编码必填',
              offset: 100
            })
            return false
          }
          console.log('length', EnterDetail.length)
          if (EnterDetail.length !== 0) {
            console.log(11)
            EnterDetail.map(function(elem) {
              return elem
            }).forEach(function(elem) {
              elem.stat = '1'
              elem.lossQuantity = '0.0'
              elem.usedQuantity = '0.0'
              elem.returnQuantity = '0.0'
              if (elem.toolsCode === null || elem.toolsCode === '' || elem.toolsCode === undefined) {
                delete elem.toolsCode
              }
              if (elem.toolsName === null || elem.toolsName === '' || elem.toolsName === undefined) {
                delete elem.toolsName
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
              if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
                delete elem.locationId
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
              if (key === 'judgeStat') {
                delete Data[key]
              }
            }
            const parms = JSON.stringify(Data)
            addAccessComponent(parms, parms2, this.personalForm).then(res => {
              console.log(res)
              if (res.data.ret === 200) {
                this.$notify({
                  title: 'successful',
                  message: 'save successful',
                  type: 'success',
                  offset: 100
                })
                this.restAllForm()
                this.$refs.editable.clear()
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
              message: '明细不能为空',
              offset: 100
            })
            return false
          }
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
      const view = { path: '/SaleContract/AddSaleContract', name: 'AddSaleContract', fullPath: '/SaleContract/AddSaleContract', title: 'AddSaleContract' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    }
  }
}
</script>

<style rel="stylesheet/css" scoped>
  .ERP-container >>> .el-input-number.is-without-controls .el-input__inner{
    text-align: left;
  }
  .ERP-container {
    margin-right: 0;
  }
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
</style>
