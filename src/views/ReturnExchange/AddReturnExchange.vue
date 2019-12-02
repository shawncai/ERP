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
                <el-form-item :label="$t('ReturnExchange.title')" prop="title" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.sourceType')" prop="sourceType" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px" @change="clearnumber">
                    <el-option value="1" label="销售出库单"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.sourceNumber')" prop="sourceNumber" style="width: 100%;">
                  <el-input v-model="personalForm.sourceNumber" style="margin-left: 18px;width: 200px" @focus="opensaleout"/>
                </el-form-item>
                <my-saleout :saleoutcontrol.sync="saleoutcontrol" @saleOutDetail="saleOutDetail" @saleOutdata="saleOutdata"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.customerType')" prop="customerType" style="width: 100%;">
                  <el-select v-model="personalForm.customerType" style="margin-left: 18px;width: 200px" @change="clearrequire">
                    <el-option value="1" label="经销商"/>
                    <el-option value="2" label="零售"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.customerId')" prop="customerId" style="width: 100%;">
                  <el-input v-model="customerId" style="margin-left: 18px;width: 200px" @focus="chooseCustomer"/>
                </el-form-item>
                <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
                <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.customerPhone')" prop="customerPhone" style="width: 100%;">
                  <el-input v-model="personalForm.customerPhone" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.sourceMoney')" style="width: 100%;">
                  <el-input v-model="personalForm.sourceMoney" :disabled="Issource" style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.diffMoney')" prop="diffMoney" style="width: 100%;">
                  <el-input v-model="personalForm.diffMoney" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.applyNumber')" style="width: 100%;">
                  <el-input v-model="personalForm.applyNumber" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                  <el-input v-model="handlePersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                </el-form-item>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.exchangeDate')" prop="exchangeDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.exchangeDate"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.repositoryId')" prop="repositoryId" style="width: 100%;">
                  <el-input v-model="repositoryId" style="margin-left: 18px;width: 200px" @focus="chooserep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >{{ $t('updates.trmx') }}</h2>
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
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.hw')" prop="locationName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.wpfl')" prop="productCategoryName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.jxf')" prop="kpiGrade" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.spjf')" prop="point" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.cksli')" prop="quantity" align="center" min-width="150px"/>
            <!-- <el-editable-column prop="salePrice" align="center" :label="$t('updates.lsj')" min-width="150px"/> -->
            <!-- <el-editable-column prop="costPrice" align="center" :label="$t('updates.cbj')" min-width="150px"/> -->
            <!-- <el-editable-column prop="costMoney" align="center" label="成本金额" min-width="150px"/> -->
            <el-editable-column :label="$t('updates.ckj')" prop="taxPrice" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.slv')" prop="taxRate" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.se')" prop="taxMoney" align="center" min-width="150px"/>
            <!-- <el-editable-column prop="money" align="center" :label="$t('Hmodule.je')" min-width="150px"/> -->
            <el-editable-column :label="$t('updates.ckje')" prop="includeTaxCostMoney" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.cklv')" prop="discount" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.cke')" prop="discountMoney" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.cjbm')" prop="carCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.dcbm')" prop="batteryCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.djbm')" prop="motorCode" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >{{ $t('updates.hcmx') }}</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <my-detail :control.sync="control" :personalform="personalForm" @product="productdetail"/>
          <el-button type="danger" @click="$refs.editable2.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        </div>
        <div class="container">
          <el-editable
            ref="editable2"
            :data.sync="list3"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules2"
            class="click-table1"
            stripe
            border
            size="medium"
            style="width: 100%">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.hw')" prop="locationId" align="center" min-width="150px">
              <template slot-scope="scope">
                <el-select v-model="scope.row.locationCode" :value="scope.row.locationCode" :placeholder="$t('Hmodule.xzhw')" filterable clearable style="width: 100%;" @visible-change="updatebatch($event,scope)">
                  <el-option
                    v-for="(item, index) in locationlist"
                    :key="index"
                    :value="item.locationCode"
                    :label="item.locationCode"/>
                </el-select>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.wpfl')" prop="productCategoryName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.jxf')" prop="kpiGrade" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.spjf')" prop="point" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.cksli')" prop="quantity" align="center" min-width="150px"/>
            <!-- <el-editable-column prop="salePrice" align="center" :label="$t('updates.lsj')" min-width="150px"/> -->
            <!-- <el-editable-column prop="costPrice" align="center" :label="$t('updates.cbj')" min-width="150px"/> -->
            <!-- <el-editable-column prop="costMoney" align="center" label="成本金额" min-width="150px"/> -->
            <el-editable-column :label="$t('updates.ckj')" prop="taxPrice" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.slv')" prop="taxRate" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.se')" prop="taxMoney" align="center" min-width="150px"/>
            <!-- <el-editable-column prop="money" align="center" :label="$t('Hmodule.je')" min-width="150px"/> -->
            <el-editable-column :label="$t('updates.zko')" prop="discount" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.cke')" prop="discountMoney" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.cjbm')" prop="carCode" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.dcbm')" prop="batteryCode" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.djbm')" prop="motorCode" align="center" min-width="150px"/>
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
import { addReturnExchange } from '@/api/ReturnExchange'
import { getdeptlist } from '@/api/EmployeeInformation'
import { getlocation, locationlist } from '@/api/public'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MyCustomer from './components/MyCustomer'
import MyAgent from './components/MyAgent'
import MySaleout from './components/MySaleout'
import MyRepository from './components/MyRepository'
import MyMove from './components/MyMove'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  name: 'AddReturnExchange',
  components: { MyMove, MyRepository, MySaleout, MyAgent, MyCustomer, MyDetail, MyEmp },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(this.supplierId)
      if (this.handlePersonId === undefined || this.handlePersonId === null || this.handlePersonId === '') {
        callback(new Error('请选择换货人'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(this.supplierId)
      if (this.customerId === undefined || this.customerId === null || this.customerId === '') {
        callback(new Error('请选择客户姓名'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (this.personalForm.sourceNumber === undefined || this.personalForm.sourceNumber === null || this.personalForm.sourceNumber === '') {
        callback(new Error('请选择源单编号'))
      } else {
        callback()
      }
    }
    const validatePass4 = (rule, value, callback) => {
      if (this.repositoryId === undefined || this.repositoryId === null || this.repositoryId === '') {
        callback(new Error('请选择仓库'))
      } else {
        callback()
      }
    }
    return {
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      // 货位数据
      locationlist: [],
      // 控制换出明细商品
      control: false,
      // 源单带出数据是否可以编辑
      Issource: false,
      // 回显仓库
      repositoryId: this.$store.getters.repositoryName,
      // 控制调拨单
      storagemovecontrol: false,
      // 回显客姓名
      customerId: '',
      // 控制仓库
      repositorycontrol: false,
      // 控制客户
      customercontrol: false,
      // 控制经销商
      agentcontrol: false,
      // 控制销售出库单
      saleoutcontrol: false,
      // 回显换货人
      handlePersonId: this.$store.getters.name,
      // 控制换货人
      stockControl: false,
      // 部门列表
      depts: [],
      // 配送单信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        customerType: '1',
        exchangeDate: null,
        stat: '1'
      },
      // 配送单规则数据
      personalrules: {
        title: [
          { required: true, message: '请输入换货单主题', trigger: 'blur' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        handlePersonId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        sourceNumber: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        exchangeDate: [
          { required: true, message: '请选择换货日期', trigger: 'change' }
        ],
        deliverDept: [
          { required: true, message: '请选择配送部门', trigger: 'change' }
        ],
        customerType: [
          { required: true, message: '请选择客户类型', trigger: 'change' }
        ],
        customerId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        customerPhone: [
          { required: true, message: '请选择客户电话', trigger: 'blur' }
        ],
        diffMoney: [
          { required: true, message: '请输差异金额', trigger: 'blur' }
        ],
        repositoryId: [
          { required: true, validator: validatePass4, trigger: 'blur' }
        ]
      },
      // 订单明细数据
      list2: [],
      // 明细列表规则
      validRules: {
      },
      list3: [],
      validRules2: {
      }
    }
  },
  created() {
    this.getdatatime()
    this.getnationlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    updatebatch(event, scope) {
      if (event === true) {
        console.log(this.personalForm.repositoryId)
        if (this.personalForm.repositoryId === undefined || this.personalForm.repositoryId === '') {
          this.$notify.error({
            title: '错误',
            message: '请先选择仓库',
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.repositoryId, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
              scope.row.locationId = res.data.data.content[0].id
            } else if (res.data.data.content.length === 0) {
              locationlist(this.personalForm.repositoryId).then(res => {
                if (res.data.ret === 200) {
                  this.locationlist = res.data.data.content.list
                }
              })
            }
          }
        })
      }
    },
    // 换出明细添加商品
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      const nowlistdata = this.$refs.editable2.getRecords()
      for (let i = 0; i < val.length; i++) {
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
        this.$refs.editable2.insert(val[i])
      }
    },
    chooserep() {
      this.repositorycontrol = true
    },
    // 仓库列表focus事件触发
    repositoryname(val) {
      this.repositoryId = val.repositoryName
      this.personalForm.repositoryId = val.id
    },
    // 选择要货方时清理
    clearrequire() {
      this.requireId = ''
      this.personalForm.requireId = ''
    },
    // 选择源单时清理
    clearnumber() {
      this.personalForm.sourceNumber = ''
      this.deliverPersonId = ''
    },
    // 选择客户focus
    chooseCustomer() {
      if (this.personalForm.customerType === '1') {
        this.agentcontrol = true
      } else if (this.personalForm.customerType === '2') {
        this.customercontrol = true
      }
    },
    customerdata(val) {
      console.log(val)
      this.personalForm.customerId = val.id
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.phoneNumber
    },
    agentdata(val) {
      console.log(val)
      this.personalForm.customerId = val.id
      this.customerId = val.agentName
    },
    // 选择源单编号
    opensaleout() {
      this.saleoutcontrol = true
    },
    // 源单类型为销售出库单时
    saleOutDetail(val) {
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    saleOutdata(val) {
      console.log(val)
      this.personalForm.sourceNumber = val.number
      this.personalForm.sourceMoney = val.allTaxMoney
      this.personalForm.customerType = String(val.customerType)
      this.Issource = true
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.phoneNumber
      this.personalForm.customerId = val.customerId
      this.personalForm.diffMoney = val.actualMoney
      this.personalForm.sourceMoney = val.actualMoney
      this.repositoryId = val.saleRepositoryName
      this.personalForm.repositoryId = val.saleRepositoryId
    },
    // 源单为调拨单
    StoragemoveDetail(val) {
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    Storagemovedata(val) {
      this.personalForm.sourceNumber = val.moveNumber
    },
    // 部门列表
    getnationlist() {
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        } else {
          console.log('部门列表出错')
        }
      })
    },
    // 补充月份和日子的0
    getzero(obj) {
      if (obj < 10) return '0' + '' + obj
      else return obj
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
      this.personalForm.exchangeDate = currentdate
    },
    // 配送员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 配送员回显
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
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        customerType: '1',
        exchangeDate: null,
        stat: '1'
      }
      this.customerId = ''
      this.Issource = false
      this.handlePersonId = this.$store.getters.name
      this.repositoryId = this.$store.getters.repositoryName
    },
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.batch === null || elem.batch === '' || elem.batch === undefined) {
          delete elem.batch
        }
        if (elem.category === null || elem.category === '' || elem.category === undefined) {
          delete elem.category
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
        if (elem.taxMoney === null || elem.taxMoney === '' || elem.taxMoney === undefined) {
          delete elem.taxMoney
        }
        if (elem.money === null || elem.money === '' || elem.money === undefined) {
          delete elem.money
        }
        if (elem.includeTaxCostMoney === null || elem.includeTaxCostMoney === '' || elem.includeTaxCostMoney === undefined) {
          delete elem.includeTaxCostMoney
        }
        if (elem.discount === null || elem.discount === '' || elem.discount === undefined) {
          delete elem.discount
        }
        if (elem.discountMoney === null || elem.discountMoney === '' || elem.discountMoney === undefined) {
          delete elem.discountMoney
        }
        if (elem.quantity === null || elem.quantity === '' || elem.quantity === undefined) {
          delete elem.quantity
        }
        if (elem.carCode === null || elem.carCode === '' || elem.carCode === undefined) {
          delete elem.carCode
        }
        if (elem.motorCode === null || elem.motorCode === '' || elem.motorCode === undefined) {
          delete elem.motorCode
        }
        if (elem.batteryCode === null || elem.batteryCode === '' || elem.batteryCode === undefined) {
          delete elem.batteryCode
        }
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          delete elem.locationId
        }
        return elem
      })
      const EnterDetail2 = this.$refs.editable2.getRecords()
      EnterDetail2.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.batch === null || elem.batch === '' || elem.batch === undefined) {
          delete elem.batch
        }
        if (elem.category === null || elem.category === '' || elem.category === undefined) {
          delete elem.category
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
        if (elem.taxMoney === null || elem.taxMoney === '' || elem.taxMoney === undefined) {
          delete elem.taxMoney
        }
        if (elem.money === null || elem.money === '' || elem.money === undefined) {
          delete elem.money
        }
        if (elem.includeTaxCostMoney === null || elem.includeTaxCostMoney === '' || elem.includeTaxCostMoney === undefined) {
          delete elem.includeTaxCostMoney
        }
        if (elem.discount === null || elem.discount === '' || elem.discount === undefined) {
          delete elem.discount
        }
        if (elem.discountMoney === null || elem.discountMoney === '' || elem.discountMoney === undefined) {
          delete elem.discountMoney
        }
        if (elem.quantity === null || elem.quantity === '' || elem.quantity === undefined) {
          delete elem.quantity
        }
        if (elem.carCode === null || elem.carCode === '' || elem.carCode === undefined) {
          delete elem.carCode
        }
        if (elem.motorCode === null || elem.motorCode === '' || elem.motorCode === undefined) {
          delete elem.motorCode
        }
        if (elem.batteryCode === null || elem.batteryCode === '' || elem.batteryCode === undefined) {
          delete elem.batteryCode
        }
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          delete elem.locationId
        }
        return elem
      })
      const parms2 = JSON.stringify(EnterDetail)
      const parms3 = JSON.stringify(EnterDetail2)
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addReturnExchange(parms, parms2, parms3, this.personalForm).then(res => {
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
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/ReturnExchange/AddReturnExchange', name: 'AddReturnExchange', fullPath: '/ReturnExchange/AddReturnExchange', title: 'AddReturnExchange' }
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
