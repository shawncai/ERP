<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" shadow="never" style="margin-top: 30px">
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('ChangeCount.sourceType')" prop="sourceType" style="width: 100%;">
                <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px">
                  <el-option :label="$t('updates.fqsqd')" value="1"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Verification.jbr')" prop="handlePersonId" style="width: 100%;">
                <el-input v-model="handlePersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
              </el-form-item>
              <my-emp :control.sync="stockControl" @stockName="stockName"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Verification.hxrq')" prop="cancelDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.cancelDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('ChangeCount.sourceNumber')" prop="sourceNumber" style="width: 100%;">
                <el-input v-model="personalForm.sourceNumber" style="margin-left: 18px;width: 200px" @focus="handleAddsourceNum"/>
              </el-form-item>
              <my-installment2 :installmentcontrol.sync="installmentcontrol" @InstallmentDetail="InstallmentDetail" @Installment="Installment"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('ChangeCount.customerId')" prop="customerId" style="width: 100%;">
                <el-input v-model="customerId" disabled style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Verification.qqq')" prop="totalMoney" style="width: 100%;">
                <el-input v-model="personalForm.shouldMoney" disabled style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Verification.www')" prop="beforeCount" style="width: 100%;">
                <el-input v-model="personalForm.paidMoney" disabled style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Verification.eee')" style="width: 100%;">
                <el-input v-model="personalForm.cancleMoney" disabled style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('public.hxzt')" style="width: 100%;">
                <el-select v-model="personalForm.stat" style="margin-left: 18px;width: 200px">
                  <el-option :value="1" label="normal"/>
                  <el-option :value="2" label="pull out"/>
                  <el-option :value="3" label="bad account"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Receipt.remark')" style="width: 100%;">
                <el-input v-model="personalForm.remark" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        <el-button type="primary" @click="handleEditok()">{{ $t('Hmodule.baoc') }}</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { updateVerification } from '@/api/Verification'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import MyMater from './MyMater'
import MyInstallment2 from './MyInstallment2'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  components: { MyInstallment2, MyMater, MyDetail, MyEmp },
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
    const validatePass2 = (rule, value, callback) => {
      if (this.personalForm.sourceNumber === undefined || this.personalForm.sourceNumber === null || this.personalForm.sourceNumber === '') {
        callback(new Error('请选择源单编号'))
      } else {
        callback()
      }
    }
    return {
      customerId: '',
      handlePersonId: '',
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      stockControl: false,
      // 控制表单是否可以编辑
      IscustomerName: true,
      IscustomerPhone: true,
      IstotalMoney: true,
      IsbeforeCount: true,
      IspaidCount: true,
      IspaidMoney: true,
      IspaidCapital: true,
      IsremainCapital: true,
      IssaleRepositoryId: true,
      // 回显销售门店
      saleRepositoryId: '',
      // 控制分期订单
      installmentcontrol: false,
      // 编辑表格数据
      list2: [],
      // 商品信息
      productForm: {},
      // 销售订单规则数据
      personalrules: {
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        sourceNumber: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        afterCount: [
          { required: true, message: '请输入修改之后期数', trigger: 'blur' }
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
      this.personalForm.handlePersonId = this.editdata.handlePersonId
      this.handlePersonId = this.personalForm.handlePersonName
      this.personalForm.customerId = this.editdata.customerId
      this.customerId = this.personalForm.customerName
    }
  },
  created() {
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    handlechooseStock() {
      this.stockControl = true
    },
    // 收款人回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    // 源单控制
    handleAddsourceNum() {
      this.installmentcontrol = true
    },
    InstallmentDetail(val) {
      console.log(val)
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    Installment(val) {
      this.personalForm.customerId = val.customerId
      this.customerId = val.customerName
      this.personalForm.shouldMoney = val.totalMoney
      this.personalForm.paidMoney = val.totalMoney - val.leftAllmoney
      this.personalForm.cancleMoney = val.leftAllmoney
      this.personalForm.sourceNumber = val.orderNumber
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1'
      }
      this.saleRepositoryId = null
      this.IscustomerName = false
      this.IscustomerPhone = false
      this.IstotalMoney = false
      this.IsbeforeCount = false
      this.IspaidCount = false
      this.IspaidMoney = false
      this.IspaidCapital = false
      this.IsremainCapital = false
      this.IssaleRepositoryId = false
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
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          updateVerification(parms).then(res => {
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
    handlecancel() {
      this.restAllForm()
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.$emit('rest', true)
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
