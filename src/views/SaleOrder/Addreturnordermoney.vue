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
                <el-form-item :label="$t('SaleOrder.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleOrder.customerName')" prop="customerId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerId" style="width: 200px" @focus="chooseCustomer"/>
                  <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item :label="$t('SaleOrder.saleRepositoryId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="saleRepositoryId" style="width: 200px" @focus="handlechooseRep"/>
                  <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
                </el-form-item>
              </el-col> -->
              <el-col :span="6">
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
              <el-col :span="6">
                <el-form-item :label="$t('update4.receiptMoney')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.receiptMoney" disabled style="width: 200px"/>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item :label="$t('update4.returnMoney')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.returnMoney" type="number" style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('update4.summary')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.summary" style="width: 200px"/>
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
import MyCustomer from './components/MyCustomer'
import { searchCategory } from '@/api/Supplier'
import { createprepReturn } from '@/api/SaleOrder'
import { customerlist2 } from '@/api/Customer'
import MyRepository from './components/MyRepository'

var _that
export default {
  name: 'Addreturnordermoney',
  components: { MyCustomer, MyRepository },
  data() {
    return {
      saveloding: false,
      customercontrol: false,
      repositorycontrol: false,
      colseTypes: [],
      // 回显门店
      saleRepositoryId: this.$store.getters.repositoryName,
      // 回显客户
      customerId: '',
      // 销售订单信息数据
      personalForm: {
        saleRepositoryId: this.$store.getters.repositoryId,
        createPersonId: this.$store.getters.userId,
        salePersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        currency: '1',
        receiptMoney: 0
      },
      // 销售订单规则数据
      personalrules: {
      },
      // 订单明细数据
      list2: []
    }
  },
  created() {
    this.getTypes()
  },
  activated() {
    this.getTypes()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    chooseCustomer() {
      this.customercontrol = true
    },
    customerdata(val) {
      this.personalForm.customerId = val.id
      this.personalForm.receiptMoney = val.advanceMoney
      this.customerId = val.customerName
    },
    getTypes() {
      // 结算方式数据
      searchCategory(5).then(res => {
        if (res.data.ret === 200) {
          this.colseTypes = res.data.data.content.list
        }
      })
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
      this.personalForm.transDate = currentdate
      this.personalForm.createDate = currentdate
    },
    repositoryname(val) {
      this.saleRepositoryId = val.repositoryName
      this.personalForm.saleRepositoryId = val.id
    },
    // 出库仓库focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        saleRepositoryId: this.$store.getters.repositoryId,
        createPersonId: this.$store.getters.userId,
        salePersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        currency: '1',
        receiptMoney: 0

      }
      this.customerId = ''
      this.saleRepositoryId = this.$store.getters.repositoryName
    },
    // 深拷贝
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    // 保存操作
    handlesave() {
      if (Number(this.personalForm.receiptMoney) < Number(this.personalForm.returnMoney)) {
        this.$notify.error({
          title: 'wrong',
          message: 'returnMoney is wrong',
          offset: 100
        })
      }
      this.saveloding = true
      setTimeout(() => {
        this.$refs.personalForm.validate((valid) => {
          if (valid) {
            const parms = JSON.stringify(this.personalForm)
            createprepReturn(parms, this.personalForm).then(res => {
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
      }, 0.5 * 1000)
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/SaleOrder/AddSaleOrder', name: 'AddSaleOrder', fullPath: '/SaleOrder/AddSaleOrder', title: 'AddSaleOrder' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    }
  }
}
</script>
<style rel="stylesheet/css" scoped>
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

