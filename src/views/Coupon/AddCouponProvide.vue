<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="135px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Coupon.name')" prop="name" style="width: 100%;">
                  <el-input :disabled="nameDis" v-model="personalForm.name" style="margin-left: 18px;width: 200px" @focus="handlechoose"/>
                  <my-coupon :recyclingcontrol.sync="recyclingcontrol" @coupondata="coupondata($event)"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Coupon.money')" style="width: 100%;">
                  <el-input-number v-model="personalForm.money" :precision="6" :controls="false" :step="0.1" :min="0" disabled style="margin-left: 11px;width: 200px;text-align: left"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('collectAndPay.left')" style="width: 100%;">
                  <el-input-number v-model="personalForm.leftNumber" :controls="false" :step="0.1" :min="0" disabled style="margin-left: 11px;width: 200px;text-align: left"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('collectAndPay.type')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.type" disabled style="margin-left: 18px;width: 210px">
                    <el-radio :label="1" style="width: 100px">全部门店</el-radio>
                    <el-radio :label="2">部分门店</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Storagemove.repostiryName')" style="width: 100%;">
                  <el-input v-model="personalForm.itemName" :value="personalForm.itemName" disabled placeholder="请选择仓库" filterable clearable style="margin-left: 18px;width: 200px;" @focus="handlechooseRep"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('collectAndPay.effectiveType')" style="width: 100%;">
                  <el-select v-model="personalForm.effectiveType" disabled multiple collapse-tags style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="分期付款"/>
                    <el-option value="2" label="购车"/>
                    <el-option value="3" label="配件"/>
                    <el-option value="4" label="电池"/>
                    <el-option value="5" label="全部适用"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('collectAndPay.isRepeat')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.isRepeat" disabled style="margin-left: 18px;width: 210px">
                    <el-radio :label="1" style="width: 100px">Yes</el-radio>
                    <el-radio :label="2">No</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('collectAndPay.effectiveTime')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.effectiveTime" disabled style="margin-left: 18px;width: 225px" @change="changeTime">
                    <el-radio :label="1" style="width: 100px">限制时间</el-radio>
                    <el-radio :label="2">不限制时间</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Coupon.beginTime')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.beginTime"
                    :picker-options="pickerOptions1"
                    disabled
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Coupon.endTime')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.endTime"
                    :picker-options="pickerOptions1"
                    disabled
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
        <h2 ref="fuzhu" class="form-name" >{{ $t('updates.symd') }}</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button :disabled="repo" @click="handlechooseRep">选择门店</el-button>
          <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname($event)"/>
          <!--          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>-->
        </div>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules"
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%">
            <!--            <el-editable-column type="selection" min-width="55" align="center"/>-->
            <!--            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>-->
            <el-editable-column :label="$t('collectAndPay.repositoryName')" prop="repositoryName" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 0}, type: 'visible'}" :label="$t('collectAndPay.number2')" prop="number" align="center" min-width="150px"/>
          </el-editable>
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
import { provide } from '@/api/Coupon'
import { searchSaleCategory } from '@/api/SaleCategory'
import { getlocation, locationlist, countlist3 } from '@/api/public'
import MyEmp from './components/MyEmp'
import MyDelivery from '../DailyAdjust/components/MyDelivery'
import MyDetail from './components/MyDetail'
import { searchCategory } from '@/api/Supplier'
import MyApply from './components/MyApply'
import MySupplier from '../Product/components/MySupplier'
import MyRequire from './components/MyRequire'
import MyCustomer from './components/MyCustomer'
import MyAgent from './components/MyAgent'
import MyAccept from './components/MyAccept'
import MyRepository from './components/MyRepository'
import MyOrder from './components/MyOrder'
import MyAdvance from './components/MyAdvance'
import MyPresale from './components/MyPresale'
import MyOpportunity from './components/MyOpportunity'
import MyDetail2 from './components/MyDetail2'
import MyContract from './components/MyContract'
import MyCoupon from './components/MyCoupon'
var _that
export default {
  name: 'AddCouponProvide',
  components: { MyCoupon, MyContract, MyDetail2, MyOpportunity, MyPresale, MyAdvance, MyOrder, MyRepository, MyAccept, MyAgent, MyCustomer, MyRequire, MySupplier, MyApply, MyDetail, MyDelivery, MyEmp },
  data() {
    return {
      nameDis: false,
      repo: true,
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      // 合计信息
      heji1: '',
      heji2: '',
      heji3: '',
      heji4: '',
      heji5: '',
      heji6: '',
      heji7: '',
      heji8: '',
      heji9: '',
      heji10: '',
      heji11: '',
      // 货位数据
      locationlist: [],
      // 控制销售合同
      contractcontrol: false,
      // 控制赠品
      giftcontrol: false,
      // 控制销售机会单
      opportunitycontrol: false,
      // 控制销售预售单
      presalecontrol: false,
      // 控制销售订单
      ordercontrol: false,
      // 控制是否可以编辑添加商品
      Isproduct: false,
      // 控制是否从源单添加
      IsSourceNumber: false,
      // 回收车金额
      huishou: '0.00',
      // 预售款金额
      yushou: '0.00',
      // 仓库回显
      saleRepositoryId: '',
      // 控制仓库
      repositorycontrol: false,
      recyclingcontrol: false,
      // 回显出库人
      outPersonId: '',
      // 控制出库人
      accetpcontrol: false,
      // 回显运货人
      transferPersonId: '',
      payModes: [],
      // 控制交货人
      deliverycontrol: false,
      // 回显职务
      roleId: '',
      // 回显客户
      customerId: '',
      // 控制客户
      customercontrol: false,
      agentcontrol: false,
      // 选择的数据
      choosedata: [],
      // 销售人员回显
      salePersonId: '',
      // 控制销售人员
      stockControl: false,
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
      // 控制商品列表窗口
      control: false,
      // 销售订单信息数据
      personalForm: {
        effectiveTime: 1,
        type: 1,
        isRepeat: 2,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        regionId: this.$store.getters.regionId,
        isDiscount: 1,
        isToday: 1,
        stat: 1,
        requireMoney: 0
      },
      // 销售订单规则数据
      personalrules: {
        name: [
          { required: true, message: '请输入优惠券名称', trigger: 'change' }
        ],
        number: [
          { required: true, message: '请输入发行量', trigger: 'change' }
        ],
        money: [
          { required: true, message: '请输入面值', trigger: 'change' }
        ],
        beginTime: [
          { required: true, message: '请输入开始时间', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请输入截止时间', trigger: 'change' }
        ]
      },
      // 订单明细数据
      list: [],
      // 销售费用明细
      list3: [],
      // 明细列表规则
      validRules: {
      },
      receiptVisible2: false,
      list111: [],
      // 批量操作
      moreaction: []
    }
  },
  created() {
    this.getTypes()
    this.getdatatime()
  },

  mounted() {
    this.getinformation()
    this.getinformation2()
    this.getinformation3()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getinformation() {
      if (this.$store.getters.empcontract) {
        console.log('getempcontract', this.$store.getters.empcontract)
        // this.personalForm.sourceNumber = this.$store.getters.empcontract.number
        this.list = []
        this.personalForm = this.$store.getters.empcontract
        this.personalForm.effectiveType = this.personalForm.effectiveType.split(',')
        this.personalForm.itemName = this.personalForm.repositoryName
        if (this.personalForm.type === 1) {
          this.repo = false
        } else {
          this.repo = true
          this.list = this.personalForm.repositories
        }
        this.$store.dispatch('getempcontract', '')
      }
    },
    changeTime() {
      if (this.personalForm.effectiveTime === 1) {
        this.addpro = false
      } else {
        this.addpro = true
        this.personalForm.beginTime = ''
        this.personalForm.endTime = ''
      }
    },
    checkStock(row) {
      console.log('this.personalForm.saleRepositoryId', this.personalForm.saleRepositoryId)
      if (this.personalForm.saleRepositoryId === null || this.personalForm.saleRepositoryId === undefined || this.personalForm.saleRepositoryId === '') {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.qxxzckck'),
          offset: 100
        })
        return false
      } else {
        console.log('this.moreaction.length', this.moreaction.length)
        if (this.moreaction.length > 1 || this.moreaction.length === 0) {
          this.$message.error('请选择单个商品')
        } else {
          countlist3(this.personalForm.saleRepositoryId, this.moreaction[0].productCode).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              console.log('res.data.data.content', res.data.data.content)
              this.list111 = res.data.data.content
              this.receiptVisible2 = true
            } else {
              this.$notify.error({
                title: 'wrong',
                message: res.data.msg,
                offset: 100
              })
            }
          })
        }
      }
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    getinformation3() {
      if (this.$store.getters.empcontract3) {
        console.log('getempcontract3', this.$store.getters.empcontract3)
        this.personalForm.sourceType = '3'
        this.Isproduct = true
        this.IsSourceNumber = false
        this.personalForm.customerType = '2'
        this.personalForm.customerId = this.$store.getters.empcontract3.customerId
        this.customerId = this.$store.getters.empcontract3.customerName
        this.personalForm.customerPhone = this.$store.getters.empcontract3.phone
        this.personalForm.salePersonId = this.$store.getters.empcontract3.salePersonId
        this.salePersonId = this.$store.getters.empcontract3.salePersonName
        if (this.$store.getters.empcontract3.payMode !== null && this.$store.getters.empcontract3.payMode !== undefined && this.$store.getters.empcontract3.payMode !== '') {
          this.personalForm.payMode = this.$store.getters.empcontract3.payMode
        }
        this.personalForm.saleRepositoryId = this.$store.getters.empcontract3.saleRepositoryId
        this.saleRepositoryId = this.$store.getters.empcontract3.saleRepositoryName
        this.personalForm.address = this.$store.getters.empcontract3.address
        for (let i = 0; i < this.$store.getters.empcontract3.advanceOrderDetailVos.length; i++) {
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].categoryName = this.$store.getters.empcontract3.advanceOrderDetailVos[i].productCategoryName
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].category = this.$store.getters.empcontract3.advanceOrderDetailVos[i].categoryId
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].typeName = this.$store.getters.empcontract3.advanceOrderDetailVos[i].productType
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].type = this.$store.getters.empcontract3.advanceOrderDetailVos[i].typeId
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].taxprice = this.$store.getters.empcontract3.advanceOrderDetailVos[i].salePrice
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].sourceNumber = this.$store.getters.empcontract3.advanceNumber
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].sourceSerialNumber = this.$store.getters.empcontract3.advanceOrderDetailVos[i].id
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].categoryName = this.$store.getters.empcontract3.advanceOrderDetailVos[i].productCategoryName
          this.$refs.editable.insert(this.$store.getters.empcontract3.advanceOrderDetailVos[i])
        }
        this.$store.dispatch('getempcontract3', '')
      }
    },
    getinformation2() {
      if (this.$store.getters.empcontract2) {
        console.log('getempcontract2', this.$store.getters.empcontract2)
        this.personalForm.sourceType = '4'
        this.Isproduct = true
        this.IsSourceNumber = false
        if (this.$store.getters.empcontract2.customerType !== null && this.$store.getters.empcontract2.customerType !== undefined && this.$store.getters.empcontract2.customerType !== '') {
          this.personalForm.customerType = String(this.$store.getters.empcontract2.customerType)
        }
        // this.personalForm.customerId = val.customerId
        this.customerId = this.$store.getters.empcontract2.customerName
        this.personalForm.customerPhone = this.$store.getters.empcontract2.customerPhone
        this.personalForm.salePersonId = this.$store.getters.empcontract2.handlePersonId
        this.salePersonId = this.$store.getters.empcontract2.handlePersonName
        this.personalForm.handleRepositoryId = this.$store.getters.empcontract2.handleRepositoryId
        this.handleRepositoryId = this.$store.getters.empcontract2.handleRepositoryName
        for (let i = 0; i < this.$store.getters.empcontract2.saleOpportunityDetailVos.length; i++) {
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].categoryName = this.$store.getters.empcontract2.saleOpportunityDetailVos[i].productCategory
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].category = this.$store.getters.empcontract2.saleOpportunityDetailVos[i].categoryId
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].typeName = this.$store.getters.empcontract2.saleOpportunityDetailVos[i].productType
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].type = this.$store.getters.empcontract2.saleOpportunityDetailVos[i].typeId
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].quantity = 0
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].salePrice = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].costPrice = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].taxprice = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].costMoney = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].includeTaxMoney = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].taxRate = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].taxMoney = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].money = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].includeTaxCostMoney = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].discount = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].discountMoney = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].carCode = 0
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].motorCode = 0
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].batteryCode = 0
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].sourceNumber = this.$store.getters.empcontract2.opportunityNumber
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].sourceSerialNumber = this.$store.getters.empcontract2.saleOpportunityDetailVos[i].id
          this.$refs.editable.insert(this.$store.getters.empcontract2.saleOpportunityDetailVos[i])
        }
        this.$store.dispatch('getempcontract2', '')
      }
    },
    // 重置一下下拉
    change() {
      this.$forceUpdate()
    },
    updatebatch(event, scope) {
      if (event === true) {
        if (this.personalForm.saleRepositoryId === undefined || this.personalForm.saleRepositoryId === '') {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.sqslcg'),
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.saleRepositoryId, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
            } else if (res.data.data.content.length === 0) {
              locationlist(this.personalForm.saleRepositoryId).then(res => {
                if (res.data.ret === 200) {
                  this.locationlist = res.data.data.content.list
                }
              })
            }
          }
        })
      }
    },
    chooseSourceType(val) {
      console.log(val)
      if (val === '5' || val === undefined) {
        this.Isproduct = false
        this.IsSourceNumber = true
        if (this.$refs.editable.getRecords().length !== 0 && this.$refs.editable.getRecords() !== undefined && this.$refs.editable.getRecords() !== null) {
          this.$refs.editable.clear()
        }
      } else {
        this.Isproduct = true
        this.IsSourceNumber = false
        if (this.$refs.editable.getRecords().length !== 0 && this.$refs.editable.getRecords() !== undefined && this.$refs.editable.getRecords() !== null) {
          this.$refs.editable.clear()
        }
      }
    },
    handlechoose() {
      this.recyclingcontrol = true
    },
    // 出库仓库focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    coupondata(val) {
      this.list = []
      console.log('coupondata', val)
      this.personalForm = val
      this.personalForm.effectiveType = this.personalForm.effectiveType.split(',')
      this.personalForm.itemName = this.personalForm.repositoryName
      if (this.personalForm.type === 1) {
        this.repo = false
      } else {
        this.repo = true
        this.list = val.repositories
      }
    },
    repositoryname(val) {
      console.log('val', val)
      this.list = val
      // const name = []
      // const id = []
      // for (const i in val) {
      //   name.push(val[i].repositoryName)
      //   id.push(val[i].id)
      // }
      // console.log(name, id)
      // this.personalForm.itemName = name.join(',')
      // this.personalForm.repositoryId = id.join(',')
      // console.log(this.personalForm)
    },
    // 出库人focus事件触发
    handlechooseAccept() {
      this.accetpcontrol = true
    },
    acceptName(val) {
      this.outPersonId = val.personName
      this.personalForm.outPersonId = val.id
    },
    // 运货人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.transferPersonId = val.personName
      this.personalForm.transferPersonId = val.id
    },
    getdatatime() { // 默认显示今天
      this.personalForm.sendDate = new Date()
      this.personalForm.outDate = new Date()
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
              return (Number(prev) + Number(curr)).toFixed(6)
            } else {
              return (Number(prev)).toFixed(6)
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      sums[1] = ''
      sums[2] = ''
      sums[3] = ''
      sums[4] = ''
      sums[5] = ''
      sums[6] = ''
      sums[7] = ''
      sums[8] = ''
      sums[9] = ''
      sums[10] = ''
      sums[11] = ''
      this.personalForm.otherMoney = sums[12]
      return sums
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
              return (Number(prev) + Number(curr)).toFixed(6)
            } else {
              return (Number(prev)).toFixed(6)
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      sums[1] = ''
      sums[2] = ''
      sums[3] = ''
      sums[4] = ''
      sums[5] = ''
      sums[6] = ''
      sums[7] = ''
      sums[8] = ''
      sums[9] = ''
      sums[10] = ''
      sums[11] = ''
      sums[13] = ''
      sums[14] = ''
      sums[15] = ''
      sums[18] = ''
      sums[22] = ''
      sums[24] = ''
      sums[25] = ''
      sums[26] = ''
      sums[27] = ''
      this.heji1 = sums[12]
      this.heji2 = sums[20]
      this.heji3 = sums[17]
      this.heji4 = sums[19]
      this.heji5 = sums[23]
      this.heji6 = sums[17] - sums[23]
      this.heji7 = sums[21]
      this.heji8 = sums[16]
      return sums
    },
    // 计算成本金额
    getcostMoney(row) {
      row.costMoney = (row.costPrice * row.quantity).toFixed(6)
      return row.costMoney
    },
    // 计算含税金额
    getincludeTaxMoney(row) {
      row.includeTaxMoney = (row.taxprice * row.quantity).toFixed(6)
      row.discountMoney = (row.taxprice * row.quantity * (1 - row.discountRate / 100)).toFixed(6)
      return row.includeTaxMoney
    },
    // 通过税率计算含税价
    gettaxRate(row) {
      if (row.taxprice !== 0) {
        row.taxprice = (row.salePrice * (1 + row.taxRate / 100)).toFixed(6)
      }
    },
    // 计算税额
    getTaxMoney2(row) {
      row.taxMoney = (row.salePrice * row.taxRate / 100 * row.quantity).toFixed(6)
      return row.taxMoney
    },
    // 通过折扣计算折扣额
    getdiscountRate(row) {
      if (row.discountRate === 0) {
        row.discountMoney = 0
      } else {
        row.discountMoney = (row.taxprice * row.quantity * (1 - row.discountRate / 100)).toFixed(6)
      }
    },
    // 通过折扣额计算折扣
    getdiscountMoney(row) {
      console.log(row)
      if (row.taxprice !== 0 && row.quantity !== 0 && row.discountMoney !== 0) {
        row.discountRate = ((1 - (row.discountMoney / row.includeTaxCostMoney)) * 100).toFixed(6)
      }
    },
    // 计算金额
    getMoney(row) {
      row.money = (row.quantity * row.salePrice).toFixed(6)
      return row.money
    },
    // 含税价
    gettaxprice(row) {
      row.taxprice = (row.salePrice * (1 + row.taxRate / 100)).toFixed(6)
      return row.taxprice
    },
    getincludeTaxCostMoney(row) {
      row.includeTaxCostMoney = Number(row.salePrice * row.quantity) + Number(row.taxMoney)
      return row.includeTaxCostMoney
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
      console.log(val)
      this.personalForm.transAddress = val.address
      this.personalForm.customerId = val.id
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.phoneNumber
    },
    agentdata(val) {
      console.log(val)
      this.personalForm.transAddress = val.address
      this.personalForm.customerId = val.id
      this.customerId = val.agentName
      this.personalForm.customerPhone = val.phone
    },
    // 从源单添加商品
    handleAddSource() {
      if (this.personalForm.sourceType === '1') {
        this.ordercontrol = true
      } else if (this.personalForm.sourceType === '2') {
        this.contractcontrol = true
      } else if (this.personalForm.sourceType === '3') {
        this.presalecontrol = true
      } else if (this.personalForm.sourceType === '4') {
        this.opportunitycontrol = true
      }
    },
    // 从销售订单过来数据
    saleOrderDetail(val) {
      console.log('val', val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
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
    saleOrder(val) {
      if (val.customerType !== null && val.customerType !== undefined && val.customerType !== '') {
        this.personalForm.customerType = String(val.customerType)
      }
      this.personalForm.customerId = val.customerId
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.customerPhone
      this.personalForm.salePersonId = val.salePersonId
      this.salePersonId = val.salePersonName
      this.personalForm.settleMode = val.settleMode
      // if (val.payType !== null && val.payType !== undefined && val.payType !== '') {
      //   this.personalForm.payType = String(val.payType)
      // }
      this.personalForm.saleRepositoryId = val.saleRepositoryId
      this.saleRepositoryId = val.saleRepositoryName
      this.personalForm.address = val.transAddress
    },
    // 从预售单过来的源单数据
    advanceOrderDetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
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
    advanceData(val) {
      this.personalForm.customerType = '2'
      this.personalForm.customerId = val.customerId
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.phone
      this.personalForm.salePersonId = val.salePersonId
      this.salePersonId = val.salePersonName
      if (val.payMode !== null && val.payMode !== undefined && val.payMode !== '') {
        this.personalForm.payMode = val.payMode
      }
      this.personalForm.saleRepositoryId = val.saleRepositoryId
      this.saleRepositoryId = val.saleRepositoryName
      this.personalForm.address = val.address
    },
    // 从销售机会过来的源单数据
    opportunityDetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
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
    opportunity(val) {
      console.log(val)
      if (val.customerType !== null && val.customerType !== undefined && val.customerType !== '') {
        this.personalForm.customerType = String(val.customerType)
      }
      // this.personalForm.customerId = val.customerId
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.customerPhone
      this.personalForm.salePersonId = val.handlePersonId
      this.salePersonId = val.handlePersonName
      this.personalForm.handleRepositoryId = val.handleRepositoryId
      this.handleRepositoryId = val.handleRepositoryName
    },
    // 源单类型为销售合同
    salecontractDetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
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
    salecontract(val) {
      if (val.customerType !== null && val.customerType !== undefined && val.customerType !== '') {
        this.personalForm.customerType = '2'
      }
      this.personalForm.customerId = val.customerId
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.customerPhone
      this.personalForm.salePersonId = val.salePersonId
      this.salePersonId = val.salePersonName
      this.personalForm.handleRepositoryId = val.saleRepositoryId
      this.handleRepositoryId = val.saleRepositoryName
      if (val.saleType !== null && val.saleType !== undefined && val.saleType !== '') {
        this.personalForm.saleType = String(val.saleType)
      }
      this.personalForm.settleMode = val.closeType
      this.personalForm.invoiceType = val.invoiceType
      if (val.payType !== null && val.payType !== undefined && val.payType !== '') {
        this.personalForm.payType = String(val.payType)
      }
    },
    // 无来源添加商品
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
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
    // 添加赠品
    handleAddGift() {
      this.giftcontrol = true
    },
    gift(val) {
      const nowlistdata = this.$refs.editable2.getRecords()
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
        this.$refs.editable2.insert(val[i])
      }
    },
    deleteChange(val) {
      this.choosedata = val
    },
    // 更新类型
    updatecountry() {
      this.getTypes()
    },
    getTypes() {
      // 开票类型数据
      searchSaleCategory(this.invoicetypeparms).then(res => {
        if (res.data.ret === 200) {
          this.invoiceTypes = res.data.data.content.list
        }
      })
      // 结算方式数据
      searchCategory(5).then(res => {
        if (res.data.ret === 200) {
          this.colseTypes = res.data.data.content.list
        }
      })
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.payModes = res.data.data.content.list
        }
      })
    },
    // 销售人员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 销售员回显
    stockName(val) {
      this.salePersonId = val.personName
      this.personalForm.salePersonId = val.id
      this.saleRepositoryId = val.repositoryName
      this.personalForm.saleRepositoryId = val.repositoryId
      this.roleId = val.postName
      this.personalForm.roleId = val.postId
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        effectiveTime: 1,
        type: 1,
        isRepeat: 2,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        regionId: this.$store.getters.regionId,
        isDiscount: 1,
        isToday: 1,
        stat: 1,
        effectiveType: [],
        requireMoney: 0
      }
      this.addpro = false
      this.repo = true
      this.personalForm.repositoryId = ''
      this.personalForm.itemName = ''
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
          const EnterDetail = this.$refs.editable.getRecords()
          if (EnterDetail.length === 0) {
            this.$notify.error({
              title: 'wrong',
              message: '门店不能为空',
              offset: 100
            })
            return false
          }
          let number = 0
          for (let i = 0; i < this.list.length; i++) {
            this.list[i].couponId = this.personalForm.id
            this.list[i].repositoryid = this.list[i].id
            number = number + this.list[i].number
          }
          if (number > this.personalForm.leftNumber) {
            this.$notify.error({
              title: 'wrong',
              message: '发放数量不能超过剩余数量',
              offset: 100
            })
            return false
          }
          const parms2 = JSON.stringify(EnterDetail)
          provide(parms2).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: 'successful',
                message: 'save successful',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.personalForm.resetFields()
              this.$refs.editable.clear()
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
      const view = { path: '/Coupon/AddCoupon', name: 'AddCoupon', fullPath: '/Coupon/AddCoupon', title: 'AddCoupon' }
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

<style rel="stylesheet/css" scoped>
  .normal >>> .el-dialog__header {
    padding: 20px 20px 10px;
    background: #fff;
    position: static;
    top: auto;
    z-index: auto;
    width: auto;
    border-bottom: none;
  }
  .normal >>> .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    height: auto;
  }
</style>
