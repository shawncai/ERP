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
                <el-form-item :label="$t('Advancemanage.title2')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.sourceType')" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="预售订单"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.sourceNumber')" prop="sourceNumber" style="width: 100%;">
                  <el-input v-model="personalForm.sourceNumber" style="margin-left: 18px;width: 200px" @focus="choosepresale"/>
                </el-form-item>
                <my-presale :presalecontrol.sync="presalecontrol" @presale="presale"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.customerName')" prop="customerName" style="width: 100%;">
                  <el-input v-model="personalForm.customerName" style="margin-left: 18px;width: 200px" @focus="chooseCustomer"/>
                </el-form-item>
                <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.phone')" style="width: 100%;">
                  <el-input v-model="personalForm.phone" :disabled="Isphone" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.address')" style="width: 100%;">
                  <el-input v-model="personalForm.address" :disabled="Isaddress" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.settleMode')" style="width: 100%;">
                  <el-select ref="clear" v-model="personalForm.settleMode" clearable style="margin-left: 18px;width: 200px">
                    <el-option v-show="false" label="" value=""/>
                    <el-option
                      v-for="(item, index) in colseTypes"
                      :value="item.id"
                      :key="index"
                      :label="item.categoryName"/>
                    <template>
                      <el-button v-if="isshow" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat">{{ $t('updates.create') }}</el-button>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.settleMoney')" style="width: 100%;">
                  <el-input v-model="personalForm.settleMoney" disabled style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.payMode')" style="width: 100%;">
                  <el-select ref="clear2" v-model="personalForm.payMode" style="margin-left: 18px;width: 200px" @change="chooseType">
                    <el-option v-show="false" label="" value=""/>
                    <el-option
                      v-for="(item, index) in payModes"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                    <template>
                      <el-button v-if="isshow" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat2">{{ $t('updates.create') }}</el-button>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.salePersonId')" style="width: 100%;">
                  <el-input v-model="salePersonId" style="margin-left: 18px;width: 200px" clearable @focus="choosesale"/>
                  <my-emp :control.sync="control" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.postId')" style="width: 100%;">
                  <el-input v-model="postId" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.saleRepositoryId')" style="width: 100%;">
                  <el-input v-model="saleRepositoryId" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.returnMoney')" style="width: 100%;">
                  <el-input v-model="personalForm.returnMoney" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >订单明细</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <!-- <el-button @click="handleAddproduct">添加预售商品</el-button> -->
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
            size="medium"
            style="width: 100%">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column prop="productCategory" align="center" label="商品分类" min-width="150px"/>
            <el-editable-column prop="productCode" align="center" label="商品编号" min-width="150px"/>
            <el-editable-column prop="productName" align="center" label="商品名称" min-width="150px"/>
            <el-editable-column prop="unit" align="center" label="基本单位" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
            <el-editable-column prop="unit" align="center" label="规格型号" min-width="150px"/>
            <el-editable-column prop="color" align="center" :label="$t('updates.ys')" min-width="150px"/>
            <el-editable-column prop="kpiGrade" align="center" label="绩效分" min-width="150px"/>
            <el-editable-column prop="point" align="center" label="商品积分" min-width="150px"/>
            <el-editable-column prop="quantity" align="center" label="数量" min-width="170px"/>
            <el-editable-column prop="salePrice" align="center" label="零售价" min-width="170px"/>
            <el-editable-column prop="costPrice" align="center" label="成本价" min-width="170px"/>
            <el-editable-column prop="includeTaxMoney" align="center" label="含税金额" min-width="170px"/>
            <el-editable-column prop="taxRate" align="center" label="税率" min-width="170px"/>
            <el-editable-column prop="taxMoney" align="center" label="税额" min-width="170px"/>
            <el-editable-column :label="$t('Hmodule.je')" prop="money" align="center" min-width="170px"/>
            <el-editable-column prop="includeTaxCostMoney" align="center" label="含税成本金额" min-width="170px"/>
            <el-editable-column prop="carCode" align="center" label="车架编码" min-width="170px"/>
            <el-editable-column prop="batteryCode" align="center" label="电池编码" min-width="170px"/>
            <el-editable-column prop="motorCode" align="center" label="电机编码" min-width="170px"/>
            <el-editable-column prop="discount" align="center" label="折扣（%）" min-width="170px"/>
            <el-editable-column prop="discountMoney" align="center" label="折扣额" min-width="170px"/>
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
import { addadvancereturn } from '@/api/Advancemanage'
// import { searchSaleCategory } from '@/api/SaleCategory'
import { searchCategory } from '@/api/Supplier'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MySupplier from './components/MySupplier'
import MyApply from './components/MyApply'
import MyPlan from './components/MyPlan'
import MyDelivery from './components/MyDelivery'
import MyAdvance from './components/MyAdvance'
import MyCustomer from '../SaleOpportunity/components/MyCustomer'
import MyPresale from './components/MyPresale'
export default {
  name: 'AddPrepReturn',
  components: { MyPresale, MyCustomer, MyAdvance, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp },
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
      if (this.personalForm.sourceNumber === '' || this.personalForm.sourceNumber === null || this.personalForm.sourceNumber === undefined) {
        callback(new Error('请选择源单'))
      } else {
        callback()
      }
    }
    return {
      // 支付方式
      payModes: [],
      // 判断权限
      isshow: false,
      // 控制预售单
      presalecontrol: false,
      // 结算方式数据
      colseTypes: [],
      // 结算方式获取参数
      colseTypeparms: {
        type: 3,
        pagenum: 1,
        pagesize: 99999
      },
      // 控制地址是否可以编辑
      Isaddress: false,
      // 控制电话是否可以编辑
      Isphone: false,
      // 控制客户
      customercontrol: false,
      // 回显所属门店
      saleRepositoryId: '',
      // 回显职务
      postId: '',
      // 回显业务员
      salePersonId: '',
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
        sourceType: '1',
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        isVat: 1
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
        sourceNumber: [
          { required: true, validator: validatePass2, trigger: 'change' }
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
  },
  mounted() {
    this.getinformation()
  },
  activated() {
    this.getinformation()
  },
  methods: {
    // 判断权限
    jungleshow() {
      const roles = this.$store.getters.roles
      this.isshow = roles.includes('1-22-28-1')
      console.log(this.isshow)
    },
    getinformation() {
      if (this.$store.getters.empcontract) {
        console.log('getempcontract', this.$store.getters.empcontract)
        this.personalForm.sourceType = '1'
        this.personalForm.sourceNumber = this.$store.getters.empcontract.advanceNumber
        this.personalForm.customerName = this.$store.getters.empcontract.customerName
        this.personalForm.phone = this.$store.getters.empcontract.phone
        this.personalForm.address = this.$store.getters.empcontract.address
        this.personalForm.settleMoney = this.$store.getters.empcontract.advanceMoney
        this.personalForm.returnMoney = this.$store.getters.empcontract.advanceMoney
        if (this.$store.getters.empcontract.payMode !== null) {
          this.personalForm.payMode = String(this.$store.getters.empcontract.payMode)
        }
        this.personalForm.salePersonId = this.$store.getters.empcontract.salePersonId
        this.salePersonId = this.$store.getters.empcontract.salePersonName
        this.postId = this.$store.getters.empcontract.postName
        this.personalForm.postId = this.$store.getters.empcontract.postId
        this.saleRepositoryId = this.$store.getters.empcontract.saleRepositoryName
        this.personalForm.saleRepositoryId = this.$store.getters.empcontract.saleRepositoryId
        for (let i = 0; i < this.$store.getters.empcontract.advanceOrderDetailVos.length; i++) {
          this.$refs.editable.insert(this.$store.getters.empcontract.advanceOrderDetailVos[i])
        }
        this.$store.dispatch('getempcontract', '')
      }
    },
    // 控制源单
    choosepresale() {
      this.presalecontrol = true
    },
    presale(val) {
      console.log('预售退货单', val)
      this.personalForm.sourceNumber = val.advanceNumber
      this.personalForm.customerName = val.customerName
      for (const i in val.advanceOrderDetailVos) {
        val.advanceOrderDetailVos[i].taxRate
      }
      this.list2 = val.advanceOrderDetailVos
      this.personalForm.phone = val.phone
      this.personalForm.address = val.address
      this.personalForm.settleMoney = this.personalForm.returnMoney = val.advanceMoney
      if (val.payMode !== null) {
        this.personalForm.payMode = val.payMode
      }
      this.personalForm.salePersonId = val.salePersonId
      this.salePersonId = val.salePersonName
      this.postId = val.postName
      this.personalForm.postId = val.postId
      this.saleRepositoryId = val.saleRepositoryName
      this.personalForm.saleRepositoryId = val.saleRepositoryId
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
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.payModes = res.data.data.content.list
        }
      })
      // 结算方式数据
      searchCategory(5).then(res => {
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
    // handleAddproduct() {
    //   this.advancecontrol = true
    // },
    advance(val) {
      const nowlistdata = this.$refs.editable.getRecords()
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
          title: '错误',
          message: '明细表不能为空',
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
        if (elem.categoryId === null || elem.categoryId === '' || elem.categoryId === undefined) {
          delete elem.categoryId
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
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
        if (elem.quantity === null || elem.quantity === '' || elem.quantity === undefined) {
          delete elem.quantity
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
          addadvancereturn(parms, parms2, this.personalForm).then(res => {
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
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/StockArrival/AddStockArrival', name: 'AddStockArrival', fullPath: '/StockArrival/AddStockArrival', title: 'AddStockArrival' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    go_creat() {
      this.$router.push('/Supplier/SupplierCategory')
      this.$refs.clear.blur()
    },
    go_creat2() {
      this.$router.push('/Supplier/SupplierCategory')
      this.$refs.clear2.blur()
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
