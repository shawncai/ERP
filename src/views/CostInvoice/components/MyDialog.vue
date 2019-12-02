<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('CostInvoice.settleMode')" style="width: 100%;">
                <el-select v-model="personalForm.settleMode" placeholder="请选择结算方式" style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in settleModes"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CostInvoice.payDate')" prop="payDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.payDate"
                  :picker-options="pickerOptions1"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width:200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockInvoice.subject')" prop="type" style="width: 100%;">
                <el-select v-model="personalForm.subject" filterable style="margin-left: 18px;width: 200px">
                  <el-option v-for="(item, index) in subjects" :key="index" :value="item.id" :label="item.itemName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CostInvoice.isInclude')" prop="isInclude" style="width: 100%;">
                <el-radio-group v-model="personalForm.isInclude" style="margin-left: 18px;width:200px">
                  <el-radio :label="1" style="width: 100px">计入成本</el-radio>
                  <el-radio :label="2">不计入</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CostInvoice.invoiceNumber')" prop="invoiceNumber" style="width: 100%;">
                <el-input v-model="personalForm.invoiceNumber" style="margin-left: 18px;width:200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CostInvoice.supplierId')" prop="supplierId" style="width: 100%;">
                <el-input v-model="supplierId" style="margin-left: 18px;width:200px" clearable @focus="handlechoose"/>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
                <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CostInvoice.taxNumber')" prop="taxNumber" style="width: 100%;">
                <el-input v-model="personalForm.taxNumber" disabled style="margin-left: 18px;width:200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CostInvoice.address')" style="width: 100%;">
                <el-input v-model="personalForm.address" disabled style="margin-left: 18px;width:200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CostInvoice.bank')" style="width: 100%;">
                <el-input v-model="personalForm.bank" disabled style="margin-left: 18px;width:200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CostInvoice.currency')" prop="currency" style="width: 100%;">
                <el-select v-model="personalForm.currency" clearable style="margin-left: 18px;width: 200px" @change="change()">
                  <el-option value="1" label="RMB"/>
                  <el-option value="2" label="USD"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CostInvoice.handlePersonId')" style="width: 100%;">
                <el-input v-model="handlePersonId" style="margin-left: 18px;width:200px" @focus="handlechooseStock"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CostInvoice.deptId')" style="width: 100%;">
                <el-select v-model="personalForm.deptId" style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px;margin-bottom: 30px" shadow="never">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">费用发票明细</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button @click="handleAdd2">{{ $t('updates.tj') }}</el-button>
        <my-detail :control.sync="control" @product="productdetail"/>
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
      </div>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: true, showStatus: true}"
          :edit-rules="validRules"
          :summary-method="getSummaries"
          class="click-table1"
          stripe
          border
          size="medium"
          style="width: 100%">
          <el-editable-column type="selection" min-width="55" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
          <el-editable-column :edit-render="{name: 'ElSelect',options: costs ,type: 'visible', events: {change: change2}}" :label="$t('updates.fymc')" prop="costName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.fydm')" prop="costCode" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.fylx')" prop="costCategory" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.jldw')" prop="unit" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 2}, type: 'visible'}" :label="$t('updates.shuli')" prop="quantity" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 2}, type: 'visible'}" :label="$t('updates.hsj')" prop="includeTaxPrice" align="center" min-width="170px"/>
          <el-editable-column :label="$t('updates.hsje')" prop="includeTaxMoney" align="center" min-width="150px">
            <template slot-scope="scope">
              <p>{{ getTaxMoney(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 2}, type: 'visible'}" :label="$t('updates.sl')" prop="taxRate" align="center" min-width="170px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 2}, type: 'visible'}" :label="$t('updates.kdyse')" prop="deduTaxMoney" align="center" min-width="170px"/>
          <el-editable-column :label="$t('updates.bhsje')" prop="money" align="center" min-width="150px">
            <template slot-scope="scope">
              <p>{{ getMoney(scope.row) }}</p>
            </template>
          </el-editable-column>          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.bz')" prop="remark" align="center" min-width="170px"/>
          <el-editable-column :label="$t('updates.fykm')" prop="subjectName" align="center" min-width="170px"/>
        </el-editable>
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
import { searchCostInstall } from '@/api/CostInstall'
import { itemList } from '@/api/SubjectFinance'
import { updatecostinvoice } from '@/api/CostInvoice'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchCategory } from '@/api/Supplier'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import MySupplier from './MySupplier'
import MyApply from './MyApply'
import MyPlan from './MyPlan'
import MyDelivery from './MyDelivery'
import MyLnquiry from './MyLnquiry'
import MyOrder from './MyOrder'
import MyArrival from './MyArrival'
var _that
export default {
  components: { MyArrival, MyOrder, MyLnquiry, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp },
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
      console.log(value)
      if (value === '') {
        callback(new Error('请选择'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      if (this.personalForm.sourceNumber === undefined || this.personalForm.sourceNumber === null || this.personalForm.sourceNumber === '') {
        callback(new Error('请选择源单编号'))
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
      // 结算方式
      settleModes: [],
      // 支付方式
      payModes: [],
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      subjects: [],
      costs: [],
      cost: {},
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
      // 点收人回显
      acceptPersonId: '',
      // 控制点收人
      deliverycontrol: false,
      handlePersonId: '',
      // 控制源单为采购到货单
      arrivalcontrol: false,
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
      control: false,
      // 采购申请单规则数据
      personalrules: {
        payDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        invoiceNumber: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        supplierId: [
          { required: true, validator: validatePass, trigger: 'focus' }
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
        sourceNumber: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        stockTypeId: [
          { required: true, message: '请选择采购类别', trigger: 'change' }
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
      this.editVisible = this.editcontrol
      this.changedata()
    },
    editdata() {
      this.changedata()
      this.personalForm = this.editdata
      this.supplierId = this.personalForm.supplierName
      this.handlePersonId = this.personalForm.handlePersonName
      this.ourContractorId = this.personalForm.ourContractorName
      this.list2 = this.personalForm.costInvoiceDetailVos
    }
  },
  created() {
    this.getTypes()
    this.getways()
    this.changedata()
  },
  methods: {
    changedata() {
      console.log(123)
      for (let i = 0; i < this.costs.length; i++) {
        this.costs[i].value = this.costs[i].costCode
        this.costs[i].label = this.costs[i].costCode
      }
    },
    change2(val) {
      console.log('val', val)
      for (let i = 0; i < this.costs.length; i++) {
        if (this.costs[i].costName === val.row.costName) {
          val.row.costName = this.costs[i].costName
          val.row.costCategory = this.costs[i].costCategory
          val.row.costCode = this.costs[i].costCode
          val.row.subject = this.costs[i].subjectId
          val.row.subjectName = this.costs[i].subjectName
        }
      }
    },
    handleAdd2() {
      for (let i = 0; i < this.costs.length; i++) {
        this.costs[i].value = this.costs[i].costName
        this.costs[i].label = this.costs[i].costName
      }
      const row = this.$refs.editable.insertAt('', -1)
      this.$nextTick(() => this.$refs.editable.setActiveCell(row, 'name'))
      this.list2[0].quantity = 1
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
    getdiscountMoney(row) {
      row.discountMoney = row.discountRate * row.retreatQuantity * (1 - row.discountRate / 100)
      return row.discountMoney
    },
    // 计算税额
    getTaxMoney2(row) {
      row.taxMoney = (row.price * row.taxRate / 100 * row.retreatQuantity).toFixed(2)
      return row.taxMoney
    },
    // 计算含税金额
    getTaxMoney(row) {
      row.includeTaxMoney = (row.quantity * row.includeTaxPrice).toFixed(2)
      return row.includeTaxMoney
    },
    // 计算金额
    getMoney(row) {
      row.money = (row.includeTaxMoney - row.deduTaxMoney).toFixed(2)
      return row.money
    },
    getways() {
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          console.log('payModes', res.data.data.content.list)
          this.payModes = res.data.data.content.list
        }
      })
      // 交货方式
      searchCategory(2).then(res => {
        if (res.data.ret === 200) {
          this.giveIds = res.data.data.content.list
        }
      })
      // 结算方式
      searchCategory(5).then(res => {
        if (res.data.ret === 200) {
          this.settleModes = res.data.data.content.list
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
        this.$refs.personalForm.clearValidate()
      } else if (this.personalForm.sourceType === '2') {
        this.addpro = false
        this.addsouce = true
        this.personalForm.sourceNumber = ''
        this.$refs.editable.clear()
        this.$refs.personalForm.clearValidate()
      }
    },
    // 从源单中添加商品
    handleAddSouce() {
      this.arrivalcontrol = true
    },
    arrival(val) {
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    allarrivalinfo(val) {
      this.personalForm.sourceNumber = val.number
      this.personalForm.supplierId = val.supplierId
      this.supplierId = val.supplierName
      this.personalForm.stockTypeId = val.stockTypeId
      this.personalForm.deptId = val.deptId
      this.personalForm.isVat = val.isVat
      this.personalForm.stockPersonId = val.stockPersonId
      this.stockPersonId = val.stockPersonName
      this.personalForm.payMode = String(val.payMode)
      this.personalForm.deliveryModeId = val.deliveryModeId
      this.personalForm.currencyId = String(val.currencyId)
      this.getTypes()
    },
    // 更新类型
    updatecountry() {
      this.getTypes()
    },
    getTypes() {
      const param = {}
      param.subjectId = 1
      itemList(param).then(res => {
        if (res.data.ret === 200) {
          this.subjects = res.data.data.content
        }
      })
      const param2 = {}
      param2.pageNum = 1
      param2.pageSize = 9999
      searchCostInstall(param2).then(res => {
        if (res.data.ret === 200) {
          console.log('res.data.data.content.list', res.data.data.content.list)
          this.costs = res.data.data.content.list
          console.log('this.costs', this.costs)
        }
      })
      console.log('this.costs', this.costs)
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
      this.handlePersonId = val.handlePersonName
      this.personalForm.stockPersonId = val.stockPersonId
      this.personalForm.deptId = val.deptId
      this.personalForm.payMode = val.payMode
      this.personalForm.deliveryModeId = val.deliveryMode
      this.personalForm.isVat = val.isVat
      this.personalForm.currencyId = val.currency
    },
    // 采购员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 采购员回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.personalForm.stockPersonId = val.id
    },
    // 点收人人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.acceptPersonId = val.personName
      this.personalForm.acceptPersonId = val.id
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
      this.acceptPersonId = null
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
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          const EnterDetail = this.deepClone(this.$refs.editable.getRecords())
          if (EnterDetail.length === 0) {
            this.$notify.error({
              title: '错误',
              message: '明细表不能为空',
              offset: 100
            })
            return false
          }
          let m = 1
          let m2 = 1
          for (let i = 0; i < EnterDetail.length; i++) {
            if (EnterDetail[i].costCode === null) {
              m = 2
            }
            if (EnterDetail[i].includeTaxMoney === '0.00') {
              m2 = 2
            }
          }
          if (m === 2) {
            this.$notify.error({
              title: '错误',
              message: '费用代码不能为空',
              offset: 100
            })
            return false
          }
          if (m2 === 2) {
            this.$notify.error({
              title: '错误',
              message: '含税金额不能为0',
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
            if (key === 'judgeStat') {
              delete Data[key]
            }
          }
          const parms = JSON.stringify(Data)
          updatecostinvoice(parms, parms2).then(res => {
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

<style scoped>
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
