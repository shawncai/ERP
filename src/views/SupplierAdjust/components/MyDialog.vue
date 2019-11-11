<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.number +'    修改'" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('SupplierAdjust.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width:200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('SupplierAdjust.applyPersonId')" prop="applyPersonId" style="width: 100%;">
                <el-input v-model="applyPersonId" :disabled="IsStockPersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('SupplierAdjust.deptId')" prop="deptId" style="width: 100%;">
                <el-select v-model="personalForm.deptId" style="margin-left: 18px;width: 200px" @change="change()">
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('SupplierAdjust.supplierId')" prop="supplierId" style="width: 100%;">
                <el-input v-model="supplierId" style="margin-left: 18px;width: 200px" @focus="handlechoose"/>
                <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('SupplierAdjust.applyDate')" prop="applyDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.applyDate"
                  :picker-options="pickerOptions1"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width:200px"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">采购订货单明细</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
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
          show-summary
          stripe
          border
          size="medium"
          style="width: 100%">
          <el-editable-column type="selection" min-width="55" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="type" align="center" min-width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
          <el-editable-column prop="oldPrice" align="center" label="采购单原价" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 2}, type: 'visible'}" prop="newPrice" align="center" label="采购单现价" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 70px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        <el-button type="primary" @click="handleEditok()">{{ $t('Hmodule.baoc') }}</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { updateSupplierAdjust } from '@/api/SupplierAdjust'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchCategory } from '@/api/Supplier'
import { searchsupplier } from '@/api/public'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import MySupplier from './MySupplier'
import MyApply from './MyApply'
import MyPlan from './MyPlan'
import MyDelivery from './MyDelivery'
import MyLnquiry from './MyLnquiry'
import MyContract from './MyContract'
export default {
  components: { MyContract, MyLnquiry, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp },
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
      console.log(this.signPersonId)
      if (this.signPersonId === undefined || this.signPersonId === null || this.signPersonId === '') {
        callback(new Error('请选择签约人'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(this.stockPersonId)
      if (this.stockPersonId === undefined || this.stockPersonId === null || this.stockPersonId === '') {
        callback(new Error('请选择采购员'))
      } else {
        callback()
      }
    }
    const validatePass4 = (rule, value, callback) => {
      console.log(this.personalForm.deptId)
      if (this.personalForm.deptId === undefined || this.personalForm.deptId === null || this.personalForm.deptId === '') {
        callback(new Error('请选择部门'))
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
      // 带入的供应商
      supp: null,
      // 控制币种是否可以编辑
      IsCurrency: false,
      // 控制我方签约人是否可以编辑
      IsSignPersonId: false,
      // 控制支付方式是否可以编辑
      IsPayMode: false,
      // 控制结算方式是否可以编辑
      IsSettleMode: false,
      // 控制交货方式是否可以编辑
      IsDeliveryMode: false,
      // 控制供应商是否可以编辑
      IsSupplierId: false,
      // 控制采购员是否可以编辑
      IsStockPersonId: false,
      // 控制采购类别是否可以编辑
      IsStockTypeId: false,
      // 控制部门是否可以编辑
      IsDeptId: false,
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      applyPersonId: '',
      // 合计数据
      allNumber: '',
      allMoney: '',
      allTaxMoney: '',
      allIncludeTaxMoney: '',
      allDiscountMoney: '',
      allMoneyMoveDiscount: '',
      allOhterMoney: '',
      // 交货方式
      giveIds: [],
      // 运送方式
      transportIds: [],
      // 结算方式
      paymentIds: [],
      // 我方签约人回显
      signPersonId: '',
      // 控制我方签约人
      deliverycontrol: false,
      // 控制源单为询价单时
      inquirycontrol: false,
      // 控制源单为采购合同时
      contractcontrol: false,
      // 控制源单为采购计划时
      plancontrol: false,
      // 控制源单为采购申请时
      applycontrol: false,
      // 控制添加商品按钮
      addpro: false,
      // 控制从源单中选择按钮
      addsouce: true,
      // 供应商回显
      supplierId: '',
      // 控制供应商
      empcontrol: false,
      // 部门数据
      depts: [],
      payModes: [],
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
        signPersonId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        stockPersonId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        supplierId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        applyDate: [
          { required: true, message: '请选择询价日期', trigger: 'change' }
        ],
        deptId: [
          { required: true, validator: validatePass4, trigger: 'change' }
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
        name: [
          { required: true, message: '请输入名称', trigger: 'change' }
        ],
        stockQuantity: [
          { required: true, message: '请输入采购数量', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入单价', trigger: 'blur' }
        ],
        includeTaxPrice: [
          { required: true, message: '请输入含税价', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.applyPersonId = this.personalForm.applyPersonName
      this.supplierId = this.personalForm.supplierName
      this.stockPersonId = this.personalForm.stockPersonName
      this.signPersonId = this.personalForm.signPersonName
      this.list2 = this.personalForm.supplierAdjustDetailVos
    }
  },
  created() {
    this.getTypes()
    this.getways()
  },
  methods: {
    // 重置一下下拉
    change() {
      this.$forceUpdate()
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
              return (Number(prev)).toFixed(2)
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
      sums[7] = ''
      sums[8] = ''
      sums[9] = ''
      sums[13] = ''
      sums[14] = ''
      sums[16] = ''
      sums[17] = ''
      sums[18] = ''
      sums[19] = ''
      this.allNumber = sums[6]
      this.allMoney = sums[10]
      this.allTaxMoney = sums[12]
      this.allIncludeTaxMoney = sums[11]
      this.allDiscountMoney = sums[15]
      this.allMoneyMoveDiscount = sums[11] - sums[15]
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
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.payModes = res.data.data.content.list
        }
      })
      // 结算方式
      searchCategory(5).then(res => {
        if (res.data.ret === 200) {
          this.paymentIds = res.data.data.content.list
        }
      })
    },
    // 通过折扣额计算折扣
    getdiscountMoney(row) {
      console.log(row)
      if (row.includeTaxPrice !== 0 && row.stockQuantity !== 0 && row.discountMoney !== 0) {
        row.discountRate = ((1 - (row.discountMoney / row.includeTaxMoney).toFixed(2)) * 100).toFixed(2)
      }
    },
    // 通过折扣计算折扣额
    getdiscountRate(row) {
      if (row.discountRate === 0) {
        row.discountMoney = row.includeTaxPrice * row.stockQuantity
      } else {
        row.discountMoney = (row.includeTaxPrice * row.stockQuantity * (1 - row.discountRate / 100)).toFixed(2)
      }
    },
    // 通过税率计算含税价
    gettaxRate(row) {
      if (row.includeTaxPrice !== 0) {
        row.includeTaxPrice = (row.price * (1 + row.taxRate / 100)).toFixed(2)
      }
    },
    // 通过含税价计算税率
    getincludeTaxPrice(row) {
      if (row.price !== 0) {
        row.taxRate = ((row.includeTaxPrice / row.price - 1) * 100).toFixed(2)
        console.log(row.taxRate)
      }
    },
    // 计算单价
    getprice(row) {
      row.includeTaxPrice = (row.price * (1 + row.taxRate / 100)).toFixed(2)
    },
    // 计算税额
    getTaxMoney2(row) {
      row.tax = (row.price * row.taxRate / 100 * row.stockQuantity).toFixed(2)
      return row.tax
    },
    // 计算含税金额
    getTaxMoney(row) {
      row.includeTaxMoney = (row.stockQuantity * row.includeTaxPrice).toFixed(2)
      row.discountMoney = (row.includeTaxPrice * row.stockQuantity * (1 - row.discountRate / 100)).toFixed(2)
      return row.includeTaxMoney
    },
    // 计算金额
    getMoney(row) {
      row.money = (row.stockQuantity * row.price).toFixed(2)
      return row.money
    },
    // 选择源单类型事件
    chooseType() {
      console.log(this.personalForm.sourceType)
      if (this.personalForm.sourceType === '1') {
        this.addsouce = false
        this.addpro = false
        this.IsSupplierId = false
        this.IsStockPersonId = false
        this.IsPayMode = false
        this.IsSignPersonId = false
        this.IsDeliveryMode = false
        this.IsSettleMode = false
        this.IsCurrency = false
        const ceshi2 = this.$refs.editable.getRecords()
        console.log(ceshi2)
        for (let i = 0; i < ceshi2.length; i++) {
          if (ceshi2[i].sourceNumber !== '' && ceshi2[i].sourceNumber !== null && ceshi2[i].sourceNumber !== undefined) {
            this.$refs.editable.remove(ceshi2[i])
          }
        }
        // if (this.$refs.editable.getRecords().length !== 0) {
        //   this.$refs.editable.clear()
        // }
      } else if (this.personalForm.sourceType === '2') {
        this.addsouce = false
        this.addpro = false
        this.IsSupplierId = false
        this.IsPayMode = false
        this.IsSignPersonId = false
        this.IsDeliveryMode = false
        this.IsSettleMode = false
        this.IsCurrency = false
        if (this.$refs.editable.getRecords().length !== 0) {
          const ceshi2 = this.$refs.editable.getRecords()
          console.log(ceshi2)
          for (let i = 0; i < ceshi2.length; i++) {
            if (ceshi2[i].sourceNumber !== '' && ceshi2[i].sourceNumber !== null && ceshi2[i].sourceNumber !== undefined) {
              this.$refs.editable.remove(ceshi2[i])
            }
          }
        }
      } else if (this.personalForm.sourceType === '3') {
        this.addsouce = false
        this.addpro = false
        this.IsStockPersonId = false
        this.IsPayMode = false
        this.IsSignPersonId = false
        this.IsCurrency = false
        if (this.$refs.editable.getRecords().length !== 0) {
          const ceshi2 = this.$refs.editable.getRecords()
          console.log(ceshi2)
          for (let i = 0; i < ceshi2.length; i++) {
            if (ceshi2[i].sourceNumber !== '' && ceshi2[i].sourceNumber !== null && ceshi2[i].sourceNumber !== undefined) {
              this.$refs.editable.remove(ceshi2[i])
            }
          }
        }
      } else if (this.personalForm.sourceType === '4') {
        this.addsouce = false
        this.addpro = false
        this.IsSupplierId = false
        if (this.$refs.editable.getRecords().length !== 0) {
          const ceshi2 = this.$refs.editable.getRecords()
          console.log(ceshi2)
          for (let i = 0; i < ceshi2.length; i++) {
            if (ceshi2[i].sourceNumber !== '' && ceshi2[i].sourceNumber !== null && ceshi2[i].sourceNumber !== undefined) {
              this.$refs.editable.remove(ceshi2[i])
            }
          }
        }
      } else if (this.personalForm.sourceType === '5') {
        this.addpro = false
        this.addsouce = true
        this.IsStockPersonId = false
        this.IsStockTypeId = false
        this.IsDeptId = false
        this.IsDeliveryMode = false
        this.IsSettleMode = false
        this.IsPayMode = false
        this.IsSignPersonId = false
        this.currency = false
        this.IsSupplierId = false
        if (this.$refs.editable.getRecords().length !== 0) {
          const ceshi2 = this.$refs.editable.getRecords()
          console.log(ceshi2)
          for (let i = 0; i < ceshi2.length; i++) {
            if (ceshi2[i].sourceNumber !== '' && ceshi2[i].sourceNumber !== null && ceshi2[i].sourceNumber !== undefined) {
              this.$refs.editable.remove(ceshi2[i])
            }
          }
        }
      }
    },
    // 从源单中添加商品
    handleAddSouce() {
      console.log(this.personalForm.supplierId)
      if (this.personalForm.sourceType === '1') {
        this.applycontrol = true
      } else if (this.personalForm.sourceType === '2') {
        if (this.personalForm.supplierId === null || this.personalForm.supplierId === undefined || this.personalForm.supplierId === '') {
          this.$notify.error({
            title: '错误',
            message: '请先选择供应商',
            duration: 0
          })
          return false
        }
        this.plancontrol = true
      } else if (this.personalForm.sourceType === '3') {
        if (this.personalForm.supplierId === null || this.personalForm.supplierId === undefined || this.personalForm.supplierId === '') {
          this.$notify.error({
            title: '错误',
            message: '请先选择供应商',
            duration: 0
          })
          return false
        }
        this.inquirycontrol = true
      } else if (this.personalForm.sourceType === '4') {
        if (this.personalForm.supplierId === null || this.personalForm.supplierId === undefined || this.personalForm.supplierId === '') {
          this.$notify.error({
            title: '错误',
            message: '请先选择供应商',
            duration: 0
          })
          return false
        }
        this.contractcontrol = true
      }
      if (this.$refs.editable.getRecords().length !== 0) {
        this.$refs.editable.clear()
      }
    },
    // 采购合同加载过来数据
    contract(val) {
      console.log(val)
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
    allcontractinfo(val) {
      console.log(val)
      if (val.stockPersonId === null || val.stockPersonId === '' || val.stockPersonId === undefined) {
        this.IsStockPersonId = false
      } else {
        this.stockPersonId = val.stockPersonName
        this.personalForm.stockPersonId = val.stockPersonId
        this.IsStockPersonId = true
      }
      if (val.stockType === null || val.stockType === '' || val.stockType === undefined) {
        this.IsStockTypeId = false
      } else {
        this.personalForm.stockType = val.stockType
        this.IsStockTypeId = true
      }
      if (val.deptId === null || val.deptId === '' || val.deptId === undefined) {
        this.IsDeptId = false
      } else {
        this.personalForm.deptId = val.deptId
        this.IsDeptId = true
      }
      this.personalForm.isVat = val.isVat
      this.personalForm.payMode = String(val.payId)
      this.signPersonId = val.ourContractorName
      this.personalForm.signPersonId = val.ourContractorId
      this.personalForm.deliveryMode = val.deliveryMode
      this.personalForm.settleMode = val.settleId
      this.personalForm.currency = String(val.currency)
    },
    // 采购询价单加载过来数据
    lnquiry(val) {
      console.log(val)
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
    allLnquirinfo(val) {
      if (val.stockType === null || val.stockType === '' || val.stockType === undefined) {
        this.IsStockTypeId = false
      } else {
        this.personalForm.stockTypeId = val.stockTypeId
        this.IsStockTypeId = true
      }
      if (val.deptId === null || val.deptId === '' || val.deptId === undefined) {
        this.IsDeptId = false
      } else {
        this.personalForm.deptId = val.deptId
        this.IsDeptId = true
      }
      searchsupplier(val.supplierName).then(res => {
        if (res.data.ret === 200) {
          console.log(res)
          if (res.data.data.content.list[0].giveId === null || res.data.data.content.list[0].giveId === '' || res.data.data.content.list[0].giveId === undefined) {
            this.IsDeliveryMode = false
          } else {
            this.personalForm.deliveryMode = res.data.data.content.list[0].giveId
            this.IsDeliveryMode = true
          }
          this.personalForm.transferId = res.data.data.content.list[0].transportId
          if (res.data.data.content.list[0].paymentId === null || res.data.data.content.list[0].paymentId === '' || res.data.data.content.list[0].paymentId === undefined) {
            this.IsSettleMode = false
          } else {
            this.personalForm.settleMode = res.data.data.content.list[0].paymentId
            this.IsSettleMode = true
          }
        }
        this.getways()
      })
      this.getways()
    },
    // 采购申请加载过来数据
    apply(val) {
      console.log(val)
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
    allapplyinfo(val) {
      console.log(val)
      if (val.stockType === null || val.stockType === '' || val.stockType === undefined) {
        this.IsStockTypeId = false
      } else {
        this.personalForm.stockTypeId = val.stockType
        this.IsStockTypeId = true
      }
      if (val.applyDeptId === null || val.applyDeptId === '' || val.applyDeptId === undefined) {
        this.IsDeptId = false
      } else {
        this.personalForm.deptId = val.applyDeptId
        this.IsDeptId = true
      }
    },
    // 采购计划加载过来数据
    plan(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      const quchonggong = this.personalForm.supplierId
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
        if (val[i].supplierId !== quchonggong) {
          console.log(1234)
          continue
        }
        this.$refs.editable.insert(val[i])
      }
    },
    allPlaninfo(val) {
      if (val.stockType === null || val.stockType === '' || val.stockType === undefined) {
        this.IsStockTypeId = false
      } else {
        this.personalForm.stockTypeId = val.stockType
        this.IsStockTypeId = true
      }
      if (val.stockDeptId === null || val.stockDeptId === '' || val.stockDeptId === undefined) {
        this.IsDeptId = false
      } else {
        this.personalForm.deptId = val.stockDeptId
        this.IsDeptId = true
      }
      if (val.stockPersonId === null || val.stockPersonId === '' || val.stockPersonId === undefined) {
        this.IsStockPersonId = false
      } else {
        this.stockPersonId = val.stockPersonName
        this.personalForm.stockPersonId = val.stockPersonId
        this.IsStockPersonId = true
      }
      this.personalForm.isVat = val.isVat
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
      this.supp = val.id
      this.$refs.editable.clear()
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
    // 我方签约人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.signPersonId = val.personName
      this.personalForm.signPersonId = val.id
    },
    // 采购申请明细来源
    handleAddproduct() {
      if (this.personalForm.supplierId === null || this.personalForm.supplierId === undefined || this.personalForm.supplierId === '') {
        this.$notify.error({
          title: '错误',
          message: '请先选择供应商',
          duration: 0
        })
        return false
      }
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
        isVat: 1,
        sourceType: '5',
        currency: '1'
      }
      this.personalForm.applyDate = new Date()
      this.supplierId = null
      this.inquiryPersonId = null
      this.stockPersonId = null
      this.signPersonId = null
      // 控制币种是否可以编辑
      this.IsCurrency = false
      // 控制我方签约人是否可以编辑
      this.IsSignPersonId = false
      // 控制支付方式是否可以编辑
      this.IsPayMode = false
      // 控制结算方式是否可以编辑
      this.IsSettleMode = false
      // 控制交货方式是否可以编辑
      this.IsDeliveryMode = false
      // 控制供应商是否可以编辑
      this.IsSupplierId = false
      // 控制采购员是否可以编辑
      this.IsStockPersonId = false
      // 控制采购类别是否可以编辑
      this.IsStockTypeId = false
      // 控制部门是否可以编辑
      this.IsDeptId = false
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
            if (elem.stockQuantity === null || elem.stockQuantity === '' || elem.stockQuantity === undefined) {
              delete elem.stockQuantity
            }
            if (elem.deliveryDate === null || elem.deliveryDate === '' || elem.deliveryDate === undefined) {
              delete elem.deliveryDate
            }
            if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
              delete elem.remarks
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
            if (elem.discountRate === null || elem.discountRate === '' || elem.discountRate === undefined) {
              delete elem.discountRate
            }
            if (elem.discountRate !== null || elem.discountRate !== '' || elem.discountRate !== undefined) {
              elem.discountRate = elem.discountRate / 100
            }
            if (elem.money === null || elem.money === '' || elem.money === undefined) {
              delete elem.money
            }
            if (elem.includeTaxMoney === null || elem.includeTaxMoney === '' || elem.includeTaxMoney === undefined) {
              delete elem.includeTaxMoney
            }
            if (elem.tax === null || elem.tax === '' || elem.tax === undefined) {
              delete elem.tax
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
          updateSupplierAdjust(parms, parms2).then(res => {
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
