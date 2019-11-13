<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.invoiceNumber +'    修改'" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('Invoice.sourceNumber')" style="width: 100%;">
                  <el-input v-model="personalForm.sourceNumber" style="margin-left: 18px;width: 200px" clearable @focus="handleAddSouce"/>
                  <my-arrival :arrivalcontrol.sync="arrivalcontrol" @allarrivalinfo="allarrivalinfo"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Invoice.sourceType')" prop="sourceType" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="采购到货" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Invoice.invoiceNumber')" prop="invoiceNumber" style="width: 100%;">
                  <el-input v-model="personalForm.invoiceNumber" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Invoice.invoiceType')" prop="invoiceType" style="width: 100%;">
                  <el-select v-model="personalForm.invoiceType" style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="增值税" />
                    <el-option value="2" label="普通" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Invoice.supplierId')" style="width: 100%;">
                  <el-input v-model="supplierId" style="margin-left: 18px;width: 200px" clearable @focus="handlechoose"/>
                  <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Invoice.totalMoney')" style="width: 100%;">
                  <el-input v-model="personalForm.totalMoney" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Invoice.paidMoney')" style="width: 100%;">
                  <el-input v-model="personalForm.paidMoney" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Invoice.payingMoney')" style="width: 100%;">
                  <el-input v-model="personalForm.payingMoney" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Invoice.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                  <el-input v-model="handlePersonId" style="margin-left: 18px;width: 200px" clearable @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Invoice.currency')" prop="currency" style="width: 100%;">
                  <el-select v-model="personalForm.currency" clearable style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="RMB"/>
                    <el-option value="2" label="USD"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Invoice.rate')" style="width: 100%;">
                  <el-input v-model="personalForm.rate" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Invoice.handleDeptId')" style="width: 100%;">
                  <el-select v-model="personalForm.handleDeptId" clearable style="margin-left: 18px;width: 200px">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Invoice.isCheckin')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.isCheckin" style="margin-left: 18px;width: 200px">
                    <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                    <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Invoice.makeoutDate')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.makeoutDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Invoice.receiveMode')" style="width: 100%;">
                  <el-select v-model="personalForm.receiveMode" clearable style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="接收1"/>
                    <el-option value="2" label="接收2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Invoice.settleStat')" style="width: 100%;">
                  <el-select v-model="personalForm.settleStat" clearable style="margin-left: 18px;width: 200px">
                    <el-option
                      v-for="(item, index) in paymentIds"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
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
import { updateinvoice } from '@/api/Invoice'
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
import MyArrival from './MyArrival'
export default {
  components: { MyArrival, MyLnquiry, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp },
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
    return {
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 控制到货单窗口
      arrivalcontrol: false,
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
      // 控制源单为询价单时
      inquirycontrol: false,
      // 控制源单为采购计划时
      plancontrol: false,
      // 控制源单为采购申请时
      applycontrol: false,
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
      // 经办人回显
      handlePersonId: '',
      // 控制经办人
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
        handlePersonId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        sourceType: [
          { required: true, message: '请选择业务单类型', trigger: 'change' }
        ],
        invoiceType: [
          { required: true, message: '请选择发票类型', trigger: 'change' }
        ],
        currency: [
          { required: true, message: '请选择币种', trigger: 'change' }
        ],
        invoiceNumber: [
          { required: true, message: '请输入发票号', trigger: 'blur' }
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
    },
    editdata() {
      this.personalForm = this.editdata
      this.supplierId = this.personalForm.supplierName
      this.handlePersonId = this.personalForm.handlePersonName
    }
  },
  created() {
    this.getTypes()
    this.getways()
  },
  methods: {
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
    // 业务单据编号控制
    handleAddSouce() {
      this.arrivalcontrol = true
    },
    allarrivalinfo(val) {
      this.personalForm.sourceNumber = val.number
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
    },
    // 经办人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 经办人回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
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
      this.handlePersonId = null
      this.ourContractorId = null
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      updateinvoice(parms).then(res => {
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
    },
    handlecancel() {
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
    height: 900px;
  }
  .el-col-12{
    width: 49%;
  }
</style>
