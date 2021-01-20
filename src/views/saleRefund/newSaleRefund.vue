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
                <el-form-item :label="$t('update4.refundTitle')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item :label="$t('ProduceTask.sourceType')" prop="sourceType" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.sourceType" style="width: 200px">
                    <el-option :label="$t('updates.sxckd')" value="1" />
                    <el-option :label="$t('route.Receipt')" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.sourceNumber')" prop="sourceNumber" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.sourceNumber" style="width: 200px" @focus="chooseSourceNumber"/>
                  <my-saleout :saleoutcontrol.sync="saleOutStat" :personaldata="personalForm" @saleOutdata="saleOutdata"/>
                  <my-receipt :saleoutcontrol.sync="receiptControl" @receiptData="receiptData"/>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item :label="$t('SaleOrder.customerName')" prop="customerId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerId" disabled style="width: 200px"/>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item :label="$t('update4.tuikuanjine')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.refundMoney" type="number" style="width: 200px"/>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item :label="$t('SaleOrder.saleRepositoryId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="saleRepositoryId" disabled style="width: 200px" @focus="handlechooseRep"/>
                  <!-- <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/> -->
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item :label="$t('CostInvoice.handlePersonId')" prop="handlePersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="handlePersonId" style="width: 200px" @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index:99">
        <el-button :loading="saveloding" type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MySaleout from './componets/MySaleout'
import MyReceipt from './componets/MyReceipt'
import MyEmp from '../SaleReturn/components/MyEmp'
import { addSaleRefund } from '@/api/SaleOrder'

export default {
  name: 'NewSaleRefund',
  components: { MySaleout, MyEmp, MyReceipt },
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
      personalForm: {
        sourceType: '1',
        handlePersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        refundMoney: 0
      },
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
    clearForm() {
      this.personalForm = {
        sourceType: '1',
        handlePersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        refundMoney: 0
      }
      this.customerId = ''
      this.saleRepositoryId = ''
      this.handlePersonId = this.$store.getters.name
    },
    handlesave() {
      if (!this.personalForm.refundMoney) {
        this.$notify.error({
          title: 'wrong',
          message: 'please input refundMoney',
          offset: 100
        })
        return false
      }
      this.saveloding = true
      setTimeout(() => {
        this.$refs.personalForm.validate((valid) => {
          if (valid) {
            const parms = JSON.stringify(this.personalForm)
            addSaleRefund(parms, this.personalForm).then(res => {
              if (res.data.ret === 200) {
                this.$notify({
                  title: 'successful',
                  message: 'save successful',
                  type: 'success',
                  offset: 100
                })
                this.clearForm()
                this.$refs.personalForm.clearValidate()
                this.$refs.personalForm.resetFields()
              } else {
                this.$notify.error({
                  title: 'wrong',
                  message: res.data.msg,
                  offset: 100
                })
              }
              this.saveloding = false
            })
          }
        })
      }, 500)
    },
    handlecancel() {

    }
  }
}
</script>

<style scoped>
.ERP-container{
    margin-right: 0;
}
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
