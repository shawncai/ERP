<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px;padding-bottom: 400px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                <el-input v-model="personalForm.title" style="width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.customerName')" prop="customerId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                <el-input v-model="customerId" style="width: 200px" @focus="chooseCustomer"/>
                <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.saleRepositoryId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                <el-input v-model="saleRepositoryId" style="width: 200px" @focus="handlechooseRep"/>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.closeType')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                <el-select v-model="personalForm.closeType" style="width: 200px">
                  <el-option
                    v-for="(item, index) in colseTypes"
                    :value="item.id"
                    :key="index"
                    :label="item.categoryName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('update4.receiptMoney')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                <el-input v-model="personalForm.receiptMoney" disabled style="width: 200px"/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('update4.returnMoney')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                <el-input v-model="personalForm.returnMoney" type="number" style="width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('update4.summary')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                <el-input v-model="personalForm.summary" style="width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('update4.createDate')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                <el-date-picker
                  v-model="personalForm.createDate"
                  :picker-options="pickerOptions2"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 200px"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        <el-button type="primary" @click="handleEditok()">{{ $t('Hmodule.baoc') }}</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { getRate } from '@/api/public'
import { updateprepReturn } from '@/api/SaleOrder'
import { searchCategory } from '@/api/Supplier'
import { searchSaleCategory } from '@/api/SaleCategory'
import { searchRoleDiscount } from '@/api/BasicSettings'
import { checkInvoiceExist } from '@/api/SaleOut'
import MyEmp from './MyEmp'
import MyDelivery from '../../DailyAdjust/components/MyDelivery'
import MyDetail from './MyDetail'
import MyApply from './MyApply'
import MySupplier from '../../Product/components/MySupplier'
import MyRequire from './MyRequire'
import MyCustomer from './MyCustomer2'
import MyAgent from './MyAgent'
import MyOpportunity from './MyOpportunity'
import MyRepository from './MyRepository'

// eslint-disable-next-line no-unused-vars
var _that
export default {
  components: { MyAgent, MyRepository, MyCustomer, MyRequire, MySupplier, MyApply, MyDetail, MyDelivery, MyEmp, MyOpportunity },
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
      if (this.salePersonId === undefined || this.salePersonId === null || this.salePersonId === '') {
        callback(new Error('please select sale person'))
      } else {
        callback()
      }
    }
    const validinvoice = (rule, value, callback) => {
      console.log('this.personalForm.invoiceNumber', this.personalForm.invoiceNumber)
      if (this.personalForm.invoiceNumber === undefined || this.personalForm.invoiceNumber === null || this.personalForm.invoiceNumber === '') {
        callback(new Error('please input invoiceNumber'))
      } else {
        callback()
      }
    }
    return {
      pickerOptions2: {
        disabledDate: (time) => {
          const _now = Date.now()
          const seven = 60 * 24 * 60 * 60 * 1000
          const sevenDays = _now - seven
          return time.getTime() > _now || time.getTime() < sevenDays
        }
      },
      colseTypes: [],
      repositorycontrol: false,
      rate: 1,
      // 选择的数据
      choosedata: [],
      deliveryModes: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      saleRepositoryId: '',
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
      // 控制添加商品按钮是否可以点击
      Isproduct: true,
      // 回显客户
      customerId: '',
      // 控制客户
      customercontrol: false,
      agentcontrol: false,
      // 销售人员回显
      salePersonId: '',
      // 控制销售人员
      stockControl: false,
      // 仓库回显
      saleRepositoryName: '',
      // 开票类别数据
      invoiceTypes: [],
      // 开票类别获取参数
      invoicetypeparms: {
        type: 4,
        pagenum: 1,
        pagesize: 99999
      },
      // 结算方式数据
      settleModes: [],
      // 控制源单编码是否可以选择
      IsNumber: true,
      // 结算方式获取参数
      settleModeparms: {
        type: 3,
        pagenum: 1,
        pagesize: 99999
      },
      // 控制销售机会
      opportunitycontrol: false,
      payModes: [],
      transportIds: [],
      // 控制商品列表窗口
      control: false,
      // 销售订单规则数据
      personalrules: {
        invoiceNumber: [
          { required: true, validator: validinvoice, trigger: 'blur' }
        ],
        customerType: [
          { required: true, message: 'please select customertype', trigger: 'change' }
        ],
        customerName: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        transDate: [
          { required: true, message: 'please select transdate', trigger: 'change' }
        ],
        salePersonId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        backType: [
          { required: true, message: 'please select backtype', trigger: 'change' }
        ]
      },
      // 订单明细数据
      list2: [],
      // 销售费用明细
      list3: [],
      // 明细列表规则
      validRules: {
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      console.log(this.editdata)
      this.personalForm = this.editdata
      this.saleRepositoryId = this.personalForm.repositoryName
      this.customerId = this.personalForm.customerName
    }
  },
  created() {
    this.getTypes()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    repositoryname(val) {
      this.saleRepositoryId = val.repositoryName
      this.personalForm.saleRepositoryId = val.id
    },
    // 出库仓库focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    judgeinvoce() {
      console.log('this.$store.getters.countryId', this.$store.getters.countryId)
      console.log('this.personalForm.invoiceNumber', this.personalForm.invoiceNumber)
      if (!this.personalForm.invoiceNumber) {
        return
      }
      checkInvoiceExist(this.personalForm.invoiceNumber, this.personalForm.saleRepositoryId).then(res => {
        if (res.data.ret === 200) {
          if (res.data.data.content === true) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('update4.fphcf'),
              offset: 100
            })
            this.personalForm.invoiceNumber = null
          }
        }
      })
    },
    isEdit6(row) {
      const re = row.productCode.slice(2, 4)
      const re2 = row.productCode.slice(0, 2)
      // if (re === '01') {
      //   row.quantity = 1
      //   return row.quantity
      // }
      if (re2 === '01' || re === '13') { return true } else { return false }
    },
    isEdit7(row) {
      const re = row.productCode.slice(2, 4)
      const re2 = row.productCode.slice(0, 2)
      // if (re === '01') {
      //   row.quantity = 1
      //   return row.quantity
      // }
      if (re2 === '01' || re === '11') { return true } else { return false }
    },
    jundgeprice() {
      if (this.$store.getters.countryId === 2) {
        return true
      }
      const value = ['1-22-24-115']
      const roles = this.$store.getters && this.$store.getters.roles
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      console.log('hasPermission=======', hasPermission)
      return hasPermission
    },
    // 无来源添加商品
    chooseType() {
      if (this.saleRepositoryName === null || this.saleRepositoryName === '' || this.saleRepositoryName === undefined) {
        this.saleRepositoryId = this.saleRepositoryName
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.qxxzckck'),
          offset: 100
        })
        return false
      }
      this.control = true
    },
    isEdit2(row) {
      console.log('222', row)
      const re = row.productCode.slice(0, 2)
      // if (re === '01') {
      //   row.quantity = 1
      //   return row.quantity
      // }
      if (re === '01' && this.personalForm.customerType === '2') { return true } else { return false }
    },
    isEdit3(row) {
      console.log('222', row)
      const re = row.productCode.slice(0, 2)
      // if (re === '01') {
      //   row.quantity = 1
      //   return row.quantity
      // }
      if (re === '05' && this.personalForm.customerType === '2') { return true } else { return false }
    },
    // 数量变化其他参数
    queryStock(row) {
      if (row.discountRate === 0) {
        row.discountMoney = 0
      } else {
        row.discountMoney = (row.taxprice * row.quantity * (row.discountRate / 100)).toFixed(6)
      }
    },
    // 处理汇率
    changeRate() {
      console.log('this.personalForm', this.personalForm)
      if (this.personalForm.currency !== '3') {
        getRate(this.personalForm.currency).then(res => {
          console.log(res)
          if (res.data.ret === 200) {
            // console.log('res.data.data.content', res.data.data.content)
            // this.personalForm.exchangeRate = res.data.data.content.rate
            this.$set(this.personalForm, 'exchangeRate', res.data.data.content.rate)
          } else {
            this.$notify.error({
              title: 'wrong',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      } else {
        this.personalForm.exchangeRate = '1.0000'
      }
    },
    // 从销售机会过来的源单数据
    opportunityDetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
            // this.$notify.error({
            //   title: 'wrong',
            //   message: this.$t('prompt.wpytj'),
            //   offset: 100
            // })
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
      // this.customerId = val.customerName
      // this.personalForm.customerPhone = val.customerPhone
      this.personalForm.sourceNumber = val.opportunityNumber
      this.personalForm.salePersonId = val.handlePersonId
      this.salePersonId = val.handlePersonName
      this.personalForm.handleRepositoryId = val.handleRepositoryId
      this.handleRepositoryId = val.handleRepositoryName
    },
    openoppo() {
      if (this.personalForm.sourceType === '2') {
        this.opportunitycontrol = true
      }
    },
    // 控制源单类型
    chooseSource2(val) {
      if (val === '2') {
        this.Isproduct = true
        this.IsNumber = false
      } else if (val === '1') {
        this.Isproduct = false
        this.IsNumber = true
      }
    },
    // 控制源单类型
    chooseSource(val) {
      if (val === '2') {
        this.Isproduct = true
        this.IsNumber = false
        this.$refs.editable.clear()
        this.personalForm.sourceNumber = ''
      } else if (val === '1') {
        this.Isproduct = false
        this.IsNumber = true
        this.$refs.editable.clear()
        this.personalForm.sourceNumber = ''
      }
    },
    // 从源单中添加商品
    handleAddSouce() {
      this.arrivalcontrol = true
    },
    // 总计
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = 'summery'
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
      sums[2] = ''
      sums[6] = ''
      sums[8] = ''
      sums[9] = ''
      this.heji1 = sums[10]
      this.heji2 = sums[16]
      this.heji3 = sums[16]
      this.heji4 = sums[15]
      this.heji5 = sums[18]
      this.heji6 = sums[16] - sums[18]
      this.heji7 = sums[19]
      this.heji8 = sums[14]
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
      row.discountMoney = (row.taxprice * row.quantity * (row.discountRate / 100)).toFixed(6)
      return row.includeTaxMoney
    },
    // 通过税率计算含税价
    gettaxRate(row) {
      if (row.taxRate === undefined) {
        this.$set(row, 'taxRate', 0)
      }
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
        row.discountMoney = (row.taxprice * row.quantity * (row.discountRate / 100)).toFixed(6)
      }
    },
    notundefined(row) {
      if (row.discountRate === undefined) {
        this.$set(row, 'discountRate', 0)
      }
      if (row.discountMoney === undefined) {
        this.$set(row, 'discountMoney', 0)
      }
    },
    // 通过折扣额计算折扣
    // 通过折扣额计算折扣
    getdiscountMoney(row, val, scope) {
      const re = row.productCode.slice(0, 2)
      if (re === '01') {
        const discountparms = {
          typeId: row.type,
          roleId: this.$store.getters.roleId,
          category: 1,
          pageNum: 1,
          pageSize: 1
        }
        searchRoleDiscount(discountparms).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.list.length === 0) {
              row.discountMoney = 0
              row.discountRate = 0
              this.$notify.error({
                title: 'wrong',
                message: this.$t('tongyo.cgzdzke'),
                offset: 100
              })
            } else {
              const isoverdiscount = val / row.quantity
              if (res.data.data.content.list[0].discountMoney < isoverdiscount) {
                row.discountMoney = 0
                row.discountRate = 0
                this.$notify.error({
                  title: 'wrong',
                  message: this.$t('tongyo.cgzdzke'),
                  offset: 100
                })
              }
            }
          }
          if (row.taxprice !== 0 && row.quantity !== 0 && row.discountMoney !== 0) {
            row.discountRate = (((row.discountMoney / row.includeTaxCostMoney)) * 100).toFixed(6)
          }
        })
      } else {
        const discountparms = {
          roleId: this.$store.getters.roleId,
          category: 2,
          pageNum: 1,
          pageSize: 1
        }
        searchRoleDiscount(discountparms).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.list.length === 0) {
              row.discountMoney = 0
              row.discountRate = 0
              this.$notify.error({
                title: 'wrong',
                message: this.$t('tongyo.cgzdzke'),
                offset: 100
              })
            } else {
              const isoverdiscount = res.data.data.content.list[0].discountRate * row.money
              if (isoverdiscount < val) {
                row.discountMoney = 0
                row.discountRate = 0
                this.$notify.error({
                  title: 'wrong',
                  message: this.$t('tongyo.cgzdzke'),
                  offset: 100
                })
              }
            }
          }
          if (row.taxprice !== 0 && row.quantity !== 0 && row.discountMoney !== 0) {
            row.discountRate = (((row.discountMoney / row.includeTaxCostMoney)) * 100).toFixed(6)
          }
        })
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
    // 选择客户类型时清理客户名称
    clearCustomer() {
      this.personalForm.customerId = ''
      this.customerId = ''
    },
    // 选择客户focus
    chooseCustomer() {
      this.customercontrol = true
    },
    customerdata(val) {
      this.personalForm.customerId = val.id
      this.personalForm.receiptMoney = val.advanceMoney
      this.customerId = val.customerName
    },
    agentdata(val) {
      this.personalForm.customerId = val.id
      this.customerId = val.agentName
      this.personalForm.customerPhone = val.phone
    },
    // 无来源添加商品
    handleAddproduct() {
      if (this.saleRepositoryId === null || this.saleRepositoryId === '' || this.saleRepositoryId === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.qxxzckck'),
          offset: 100
        })
        return false
      }
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
        val[i].quantity = 1
        val[i].alreadyOutQuantity = 0
        val[i].retreatQuantity = 0
        this.$refs.editable.insert(val[i])
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
      // 结算方式数据
      searchCategory(5).then(res => {
        if (res.data.ret === 200) {
          this.colseTypes = res.data.data.content.list
        }
      })
    },
    // 销售人员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 销售员回显
    stockName(val) {
      console.log('销售员回显', val)
      this.salePersonId = val.personName
      this.personalForm.salePersonId = val.id
      this.saleRepositoryName = val.repositoryName
      this.personalForm.saleRepositoryId = val.repositoryId
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        saleRepositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      }
      this.customerId = null
      this.salePersonId = null
    },
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      delete this.personalForm.judgeStat
      delete this.personalForm.receiptStat
      delete this.personalForm.approvalUseVos

      if (Number(this.personalForm.receiptMoney) < Number(this.personalForm.returnMoney)) {
        this.$notify.error({
          title: 'wrong',
          message: 'returnMoney is wrong',
          offset: 100
        })
        return false
      }

      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          const parms = JSON.stringify(this.personalForm)
          updateprepReturn(parms).then(res => {
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
              this.$emit('rest', true)
              this.editVisible = false
            } else {
              this.$notify.error({
                title: 'wrong',
                message: res.data.msg,
                offset: 100
              })
            }
            this.saveloding = false
          })
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'Information is incomplete',
            offset: 100
          })
          this.saveloding = false

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
