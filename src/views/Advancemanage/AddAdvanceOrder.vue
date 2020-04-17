<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">

        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.customerName')" prop="customerName" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.customerName" style="width: 200px" @focus="chooseCustomer"/>
                </el-form-item>
                <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.phone')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.phone" :disabled="Isphone" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.address')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.address" :disabled="Isaddress" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.advanceDate')" prop="signDate" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.advanceDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.salePrice')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.salePrice" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.advanceMoney')" prop="advanceMoney" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.advanceMoney" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.payMode')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select ref="clear" v-model="personalForm.payMode" style="width: 200px" @change="chooseType">
                    <el-option v-show="false" label="" value=""/>
                    <el-option
                      v-for="(item, index) in payModes"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                    <template>
                      <el-button v-if="isshow" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat">{{ $t('updates.create') }}</el-button>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.salePersonId')" prop="salePersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="salePersonId" style="width: 200px" clearable @focus="choosesale"/>
                  <my-emp :control.sync="control" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.postId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="postId" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.saleRepositoryId')" prop="saleRepositoryId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="saleRepositoryId" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">

        <h2 ref="fuzhu" class="form-name" >{{ $t('updates.ddmx') }}</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button @click="handleAddproduct">{{ $t('updates.tjyssp') }}</el-button>
          <my-advance :advancecontrol.sync="advancecontrol" @advance="advance"/>
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
            size="small"
            style="width: 100%">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <!-- <el-editable-column prop="locationId" align="center" :label="$t('Hmodule.hw')" min-width="150px"/>
            <el-editable-column prop="batch" align="center" label="批次号" min-width="150px"/> -->
            <el-editable-column :label="$t('updates.spfl')" prop="category" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.spbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.spmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.jbdw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ggxh')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.jxf')" prop="kpiGrade" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.spjf')" prop="point" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 1.00, precision: 2}, type: 'visible'}" :label="$t('updates.yssl')" prop="quantity" align="center" min-width="150">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="true"
                  :min="1.00"
                  v-model="scope.row.quantity"
                />
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.lsj')" prop="salePrice" align="center" min-width="170px"/>
            <el-editable-column :label="$t('updates.cbj')" prop="costPrice" align="center" min-width="170px"/>
            <el-editable-column :label="$t('updates.hsje')" prop="taxprice" align="center" min-width="170px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.sl')" prop="taxRate" align="center" min-width="170">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="false"
                  v-model="scope.row.taxRate"
                  @input="gettaxRate(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.se')" prop="taxMoney" align="center" min-width="170">
              <template slot-scope="scope">
                <p>{{ getTaxMoney2(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column v-if="false" :label="$t('Hmodule.je')" prop="money" align="center" min-width="150">
              <template slot-scope="scope">
                <p>{{ getMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <!-- <el-editable-column :label="$t('updates.hscbje')" prop="includeTaxCostMoney" align="center" min-width="170">
              <template slot-scope="scope">
                <p>{{ getincludeTaxCostMoney(scope.row) }}</p>
              </template>
            </el-editable-column> -->
            <!-- <el-editable-column prop="carCode" align="center" :label="$t('updates.cjbm')" min-width="170px"/> -->
            <!-- <el-editable-column prop="batteryCode" align="center" :label="$t('updates.dcbm')" min-width="170px"/> -->
            <!-- <el-editable-column prop="motorCode" align="center" :label="$t('updates.djbm')" min-width="170px"/> -->
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.ckl')" prop="discountRate" align="center" min-width="170">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="false"
                  v-model="scope.row.discountRate"
                  @change="getdiscountRate(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.cke')" prop="discountMoney" align="center" min-width="170">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="false"
                  v-model="scope.row.discountMoney"
                  @change="getdiscountMoney(scope.row)"/>
              </template>
            </el-editable-column>
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">

        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { addadvanceorder } from '@/api/Advancemanage'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchCategory } from '@/api/Supplier'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MySupplier from './components/MySupplier'
import MyApply from './components/MyApply'
import MyPlan from './components/MyPlan'
import MyDelivery from './components/MyDelivery'
import MyAdvance from './components/MyAdvance'
import MyCustomer from '../SaleOpportunity/components/MyCustomer'
var _that
export default {
  name: 'AddAdvanceOrder',
  components: { MyCustomer, MyAdvance, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(value)
      if (this.personalForm.customerName === '' || this.personalForm.customerName === null || this.personalForm.customerName === undefined) {
        callback(new Error('请选择客户'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(value)
      if (this.personalForm.advanceMoney === '' || this.personalForm.advanceMoney === null || this.personalForm.advanceMoney === undefined) {
        callback(new Error('请输入金额'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(value)
      if (this.salePersonId === '' || this.salePersonId === null || this.salePersonId === undefined) {
        callback(new Error('请选择业务员'))
      } else {
        callback()
      }
    }
    const validatePass4 = (rule, value, callback) => {
      console.log(value)
      if (this.saleRepositoryId === '' || this.saleRepositoryId === null || this.saleRepositoryId === undefined) {
        callback(new Error('请指定门店'))
      } else {
        callback()
      }
    }
    return {
      // 判断显示
      isshow: false,
      // 控制地址是否可以编辑
      Isaddress: false,
      // 控制电话是否可以编辑
      Isphone: false,
      // 控制客户
      customercontrol: false,
      // 回显所属门店
      saleRepositoryId: this.$store.getters.repositoryName,
      // 回显职务
      postId: '',
      // 回显业务员
      salePersonId: this.$store.getters.name,
      // 控制业务员
      control: false,
      // 交货方式
      giveIds: [],
      // 运送方式
      transportIds: [],
      // 结算方式
      paymentIds: [],
      // 点收人回显
      acceptPersonId: '',
      // 控制点收人
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
      payModes: [],
      // 部门数据
      depts: [],
      // 采购员回显
      stockPersonId: '',
      // 控制采购员
      stockControl: false,
      // 类别数据
      types: [],
      // 类别获取参数
      typeparms: {
        pagenum: 1,
        pagesize: 99999
      },
      // 控制商品列表窗口
      advancecontrol: false,
      // 采购申请单信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        isVat: 1,
        salePersonId: this.$store.getters.userId
      },
      // 采购申请单规则数据
      personalrules: {
        customerName: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        inquiryPersonId: [
          { required: true, validator: validatePass, trigger: 'focus' }
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
        ],
        advanceMoney: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        salePersonId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        saleRepositoryId: [
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
    this.jungleshow()
    this.getdatatime()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 计算成本金额
    getcostMoney(row) {
      row.costMoney = (row.costPrice * row.quantity).toFixed(2)
      return row.costMoney
    },
    // 计算含税金额
    getincludeTaxMoney(row) {
      row.includeTaxMoney = (row.taxprice * row.quantity).toFixed(2)
      row.discountMoney = (row.taxprice * row.quantity * (row.discountRate / 100)).toFixed(2)
      return row.includeTaxMoney
    },
    // 通过税率计算含税价
    gettaxRate(row) {
      if (row.taxprice !== 0) {
        row.taxprice = (row.salePrice * (1 + row.taxRate / 100)).toFixed(2)
      }
      if (row.discountRate === 0) {
        row.discountMoney = 0
      } else {
        row.discountMoney = (row.taxprice * row.quantity * (row.discountRate / 100)).toFixed(2)
      }
    },
    // 计算税额
    getTaxMoney2(row) {
      row.taxMoney = (row.salePrice * row.taxRate / 100 * row.quantity).toFixed(2)
      return row.taxMoney
    },
    // 通过折扣计算折扣额
    getdiscountRate(row) {
      if (row.discountRate === 0) {
        row.discountMoney = 0
      } else {
        row.discountMoney = (row.taxprice * row.quantity * (row.discountRate / 100)).toFixed(2)
      }
    },
    // 通过折扣额计算折扣
    getdiscountMoney(row) {
      console.log(row)
      if (row.taxprice !== 0 && row.quantity !== 0 && row.discountMoney !== 0) {
        row.discountRate = ((1 - (row.discountMoney / row.includeTaxCostMoney)) * 100).toFixed(2)
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
    // 默认显示今天
    getdatatime() {
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
      this.personalForm.advanceDate = currentdate
    },
    // 判断是否显示
    jungleshow() {
      const roles = this.$store.getters.roles
      this.isshow = roles.includes('1-22-28-1')
      console.log(this.isshow)
    },
    // 选择客户focus
    chooseCustomer() {
      this.customercontrol = true
    },
    customerdata(val) {
      console.log(val)
      this.personalForm.address = val.address
      this.personalForm.customerId = val.id
      this.personalForm.customerName = val.customerName
      this.personalForm.phone = val.phoneNumber
      if (val.address !== null) {
        this.Isaddress = true
      }
      if (val.phoneNumber !== null) {
        this.Isphone = true
      }
    },
    // 控制业务员
    choosesale() {
      this.control = true
    },
    stockName(val) {
      console.log(val)
      this.salePersonId = val.personName
      this.personalForm.salePersonId = val.id
      this.postId = val.postName
      this.personalForm.postId = val.postId
      this.saleRepositoryId = val.repositoryName
      this.personalForm.saleRepositoryId = val.repositoryId
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
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.payModes = res.data.data.content.list
        }
      })
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
      this.ordercontrol = true
    },
    order(val) {
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
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
      this.supplierId = val.supplierName
      this.personalForm.supplierId = val.id
      this.stockPersonId = val.stockPersonName
      this.personalForm.stockPersonId = val.stockPersonId
      this.personalForm.deptId = val.deptId
      this.personalForm.payId = val.payMode
      this.personalForm.deliveryModeId = val.deliveryMode
      this.personalForm.isVat = val.isVat
      this.personalForm.currencyId = val.currency
    },
    // 点收人人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.acceptPersonId = val.personName
      this.personalForm.acceptPersonId = val.id
    },
    // 订单明细来源
    handleAddproduct() {
      this.advancecontrol = true
    },
    advance(val) {
      console.log('值', val)
      this.personalForm.salePrice = val[0].salePrice
      this.personalForm.advanceMoney = val[0].deposit
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
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
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        isVat: 1
      }
      this.salePersonId = null
      this.postId = null
      this.saleRepositoryId = null
      this.ourContractorId = null
      this.acceptPersonId = null
    },
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
          offset: 100
        })
        return false
      }
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
        if (elem.kpiGrade === null || elem.kpiGrade === '' || elem.kpiGrade === undefined) {
          delete elem.kpiGrade
        }
        if (elem.point === null || elem.point === '' || elem.point === undefined) {
          delete elem.point
        }
        if (elem.quantity === null || elem.quantity === '' || elem.quantity === undefined) {
          delete elem.quantity
        }
        if (elem.salePrice === null || elem.salePrice === '' || elem.salePrice === undefined) {
          delete elem.salePrice
        }
        if (elem.costPrice === null || elem.costPrice === '' || elem.costPrice === undefined) {
          delete elem.costPrice
        }
        if (elem.costMoney === null || elem.costMoney === '' || elem.costMoney === undefined) {
          delete elem.costMoney
        }
        if (elem.includeTaxMoney === null || elem.includeTaxMoney === '' || elem.includeTaxMoney === undefined) {
          delete elem.includeTaxMoney
        }
        if (elem.taxRate === null || elem.taxRate === '' || elem.taxRate === undefined) {
          delete elem.taxRate
        }
        if (elem.taxRate !== null || elem.taxRate !== '' || elem.taxRate !== undefined) {
          elem.taxRate = elem.taxRate / 100
        }
        if (elem.taxMoney === null || elem.taxMoney === '' || elem.taxMoney === undefined) {
          delete elem.taxMoney
        }
        if (elem.money === null || elem.money === '' || elem.money === undefined) {
          delete elem.money
        }
        if (elem.includeTaxCostMoney === null || elem.includeTaxCostMoney === '' || elem.includeTaxCostMoney === undefined) {
          delete elem.includeTaxCostMoney
        }
        if (elem.discountRate === null || elem.discountRate === '' || elem.discountRate === undefined) {
          delete elem.discountRate
        }
        if (elem.discountRate !== null || elem.discountRate !== '' || elem.discountRate !== undefined) {
          elem.discountRate = elem.discountRate / 100
          elem.discount = elem.discountRate
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
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addadvanceorder(parms, parms2, this.personalForm).then(res => {
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
      const view = { path: '/StockArrival/AddStockArrival', name: 'AddStockArrival', fullPath: '/StockArrival/AddStockArrival', title: 'AddStockArrival' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    // 出发bulr
    go_creat() {
      this.$router.push('/Supplier/SupplierCategory')
      this.$refs.clear.blur()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
   .ERP-container{
    margin-right: 0;
    .form-name{
      font-weight: bold;
      font-size: 18px;
      color: #373e4f;
      padding: 5px;
      margin-bottom: -20px;
    }
    .container{
      margin-top: 5px;
    }
    .el-button+.el-button{
      width: 98px;
    }
  }
</style>
