<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.refundNumber +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('update4.refundTitle')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('ProduceTask.sourceType')" prop="sourceType" style="width: 100%;">
                <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px">
                  <el-option :label="$t('updates.sxckd')" value="1" />
                  <el-option :label="$t('route.Receipt')" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.sourceNumber')" prop="sourceNumber" style="width: 100%;">
                <el-input v-model="personalForm.sourceNumber" style="margin-left: 18px;width: 200px" @focus="chooseSourceNumber"/>
                <my-saleout :saleoutcontrol.sync="saleOutStat" :personaldata="personalForm" @saleOutdata="saleOutdata"/>
                <my-receipt :saleoutcontrol.sync="receiptControl" @receiptData="receiptData"/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.customerName')" prop="customerId" style="width: 100%;">
                <el-input v-model="customerId" disabled style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('update4.tuikuanjine')" style="width: 100%;">
                <el-input v-model="personalForm.refundMoney" type="number" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.saleRepositoryId')" style="width: 100%;">
                <el-input v-model="saleRepositoryId" disabled style="margin-left: 18px;width: 200px" @focus="handlechooseRep"/>
                <!-- <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/> -->
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('CostInvoice.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                <el-input v-model="handlePersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
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
import MySaleout from './MySaleout'
import MyReceipt from './MyReceipt'
import MyEmp from '../../SaleReturn/components/MyEmp'
import { updateSaleRefund } from '@/api/SaleOrder'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  components: { MySaleout, MyEmp, MyReceipt },
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
      if (!this.personalForm.sourceNumber) {
        callback(new Error('please select sourceNumber'))
      } else {
        callback()
      }
    }
    return {
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      personalrules: {
        sourceType: [
          { required: true, message: 'please select sourceType', trigger: 'change' }
        ],
        sourceNumber: [
          { required: true, validator: validatePass, trigger: 'change' }
        ]
      },
      customerId: '',
      saleRepositoryId: '',
      handlePersonId: this.$store.getters.name,
      saleOutStat: false,
      saveloding: false,
      stockControl: false,
      receiptControl: false
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      console.log(this.editdata)
      this.personalForm = this.editdata
      this.customerId = this.personalForm.customerName
      this.saleRepositoryId = this.personalForm.refundRepositoryName
      this.personalForm.sourceType = String(this.editdata.sourceType)
    }
  },
  created() {
    // this.getTypes()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    receiptData(val) {
      this.personalForm.sourceNumber = val.number
      this.customerId = val.customerName
      this.saleRepositoryId = val.receiptRepositoryName
      this.personalForm.customerId = val.customerId
      this.personalForm.refundRepositoryId = val.receiptRepositoryId
    },
    stockName(val) {
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    handlechooseStock() {
      this.stockControl = true
    },
    chooseSourceNumber() {
      if (this.personalForm.sourceType === '1') {
        this.saleOutStat = true
      } else if (this.personalForm.sourceType === '2') {
        this.receiptControl = true
      }
    },
    handlechooseRep() {

    },
    saleOutdata(val) {
      console.log(val)
      this.personalForm.sourceNumber = val.number
      this.customerId = val.customerName
      this.saleRepositoryId = val.saleRepositoryName
      this.personalForm.customerId = val.customerId
      this.personalForm.refundRepositoryId = val.saleRepositoryId
    //   this.personalForm.handlePersonId = val.number
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      delete this.personalForm.judgeStat
      delete this.personalForm.receiptStat
      delete this.personalForm.saleOrderDetailVos
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          const parms = JSON.stringify(this.personalForm)
          updateSaleRefund(parms).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: this.$t('prompt.czcg'),
                message: this.$t('prompt.czcg'),
                type: 'success',
                duration: 1000,
                offset: 100
              })
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
        }
      })
    },
    handlecancel() {
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
    height: 100vh;
  }
  .el-col-12{
    width: 49%;
  }
</style>
