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
                <el-form-item :label="$t('update4.groupName')" prop="groupName" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.groupName" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('update4.khm')" prop="customerId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerId" style="width: 200px" @focus="chooseCustomer"/>
                  <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('update4.stat')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.stat" style="width: 200px">
                    <el-option label="启用" value="1"/>
                    <el-option label="停用" value="2"/>
                  </el-select>
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
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">
        <div ref="fuzhu" class="form-name" >{{ $t('updates.ddmx') }}</div>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button @click="chooseProduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <my-detail :control.sync="control" @product="productdetail"/>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        </div>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list"
            :key="tableKey"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.wpfl')" prop="productCategoryName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.jbdw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ggxh')" prop="productTypeName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
            <el-editable-column :label="$t('StockOrder.currency')" :edit-render="{name: 'ElSelect', options: currencyList, type: 'visible'}" prop="currency" align="center" min-width="200px"/>
            <el-editable-column :label="$t('update4.customerPrice')" :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="price" align="center" min-width="150px"/>

          </el-editable>
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
import MyCustomer from '../SaleOrder/components/MyCustomer'
import MyDetail from './components/MyDetail'
import { addCustomerProduct } from '@/api/Customer'

export default {
  name: 'NewCustomerGroup',
  components: { MyCustomer, MyDetail },
  data() {
    const validatePass = (rule, value, callback) => {
      if (this.customerId === undefined || this.customerId === null || this.customerId === '') {
        callback(new Error('please select customer'))
      } else {
        callback()
      }
    }
    return {
      personalForm: {
        stat: '1',
        createId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId
      },
      personalrules: {
        customerId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        groupName: [
          { required: true, message: '填写主题', trigger: 'blur' }
        ]
      },
      customercontrol: false,
      customerId: '',
      saveloding: false,
      list: [],
      control: false,
      moreaction: '',
      tableKey: 0,
      currencyList: [{ value: 1, label: 'PHP' }, { value: 2, label: 'USD' }, { value: 3, label: 'RMB' }, { value: 4, label: 'LKR' }]
    }
  },
  methods: {
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    productdetail(val) {
      this.list = val
      this.tableKey = Math.random()
    },
    chooseProduct() {
      this.control = true
    },
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Customer/NewCustomerGroup', name: 'NewCustomerGroup', fullPath: '/Customer/NewCustomerGroup', title: 'NewCustomerGroup' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    clearForm() {
      this.personalForm = {
        stat: '1',
        createId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId
      }
      this.customerId = ''
    },
    handlesave() {
      if (this.list.length === 0) {
        console.log(12333)
      }
      this.saveloding = true
      setTimeout(() => {
        const parms = JSON.stringify(this.personalForm)
        const detailParms = JSON.stringify(this.$refs.editable.getRecords())
        this.$refs.personalForm.validate((valid) => {
          if (valid) {
            addCustomerProduct(parms, detailParms).then(res => {
              console.log(res)
              if (res.data.ret === 200) {
                this.$notify({
                  title: 'successful',
                  message: 'save successful',
                  type: 'success',
                  offset: 100
                })
                this.clearForm()
                this.$refs.editable.clear()
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
      }, 1000)
    },
    customerdata(val) {
      console.log(val)
      this.customerId = val.customerName
      this.personalForm.customerId = val.id
    },
    chooseCustomer() {
      this.customercontrol = true
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
