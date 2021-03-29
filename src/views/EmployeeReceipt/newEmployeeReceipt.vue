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
                <el-form-item :label="$t('update4.peichangzhuti')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.sourceType')" prop="sourceType" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.sourceType" style="width: 200px" >
                    <el-option :label="$t('update4.yuangongpeichagn')" value="1"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('LogisticsCar.sourcenumber')" prop="sourceNumber" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.sourceNumber" style="width: 200px" @focus="chooseSourceType"/>
                  <my-inventoryreceipt :receiptcontrol.sync= "receiptcontrol" @inventoryData="inventoryData"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('recoveryCarDetail.repositoryName')" prop="handleRepositryId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="handleRepositryId" style="width: 200px" @focus="choosehandleRepositryId"/>
                  <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>

                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Complaint.handlerName')" prop="handlePersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="handlePersonId" style="width: 200px" @focus="choosehandlePersonId"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">
        <div ref="fuzhu" class="form-name" >{{ $t('update4.peichangmingxi') }}</div>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button @click="newEmp">{{ $t('update4.tianjiayuangong') }}</el-button>
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
            <el-editable-column :label="$t('update4.shouldMoney')" prop="shouldMoney" align="center" min-width="150px"/>
            <el-editable-column :label="$t('update4.collectedMoney')" prop="collectedMoney" align="center" min-width="150px"/>
            <el-editable-column :label="$t('update4.uncollectMoney')" prop="uncollectMoney" align="center" min-width="150px"/>
            <el-editable-column :label="$t('update4.empId')" prop="employeeName" align="center" min-width="200px"/>
            <el-editable-column :label="$t('Advancemanage.advanceMoney')" :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="moneyThis" align="center" min-width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="6"
                  :controls="false"
                  v-model="scope.row.moneyThis"/>
              </template>
            </el-editable-column>
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
import { getemplist } from '@/api/EmployeeInformation'
import { addEmpReceipt } from '@/api/Inventorydamaged'
import MyCustomer from '../SaleOrder/components/MyCustomer'
// import MyDetail from '../InventoryReceipt/components/MyDetail'
import MyRepository from '../SaleOrder/components/MyRepository'
import MyEmp from '../SaleOrder/components/MyEmp'
import MyInventoryreceipt from './components/MyInventoryreceipt'
// import MyDamage from './components/MyDamage'
// import MyCount from './components/MyCount'
// import MyDiff from './components/MyDiff'

import { addCustomerProduct } from '@/api/Customer'
// import MyInventoryreceipt from './components/MyInventoryreceipt.vue'

export default {
  name: 'NewEmployeeReceipt',
  components: { MyCustomer, MyRepository, MyEmp, MyInventoryreceipt },
  data() {
    const validatePass = (rule, value, callback) => {
      if (this.personalForm.sourceNumber === undefined || this.personalForm.sourceNumber === null || this.personalForm.sourceNumber === '') {
        callback(new Error('please select sourceNumber'))
      } else {
        callback()
      }
    }

    const validatePass2 = (rule, value, callback) => {
      if (this.handleRepositryId === undefined || this.handleRepositryId === null || this.handleRepositryId === '') {
        callback(new Error('please select handleRepositry'))
      } else {
        callback()
      }
    }

    const validatePass3 = (rule, value, callback) => {
      if (this.handlePersonId === undefined || this.handlePersonId === null || this.handlePersonId === '') {
        callback(new Error('please select handlePerson'))
      } else {
        callback()
      }
    }
    return {
      receiptcontrol: false,
      diffcontrol: false,
      countcontrol: false,
      damageControl: false,
      repositorycontrol: false,
      stockControl: false,
      handleRepositryId: '',
      handlePersonId: '',
      personalForm: {
        sourceType: '1',
        createPersonId: this.$store.getters.userId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      },
      personalrules: {
        handlePersonId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        handleRepositryId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        sourceNumber: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        sourceType: [
          { required: true, message: 'please select sourceType', trigger: 'blur' }
        ]
      },
      customercontrol: false,
      customerId: '',
      saveloding: false,
      list: [],
      control: false,
      moreaction: '',
      tableKey: 0,
      empList: [],
      getemplist: {
        repositoryid: '',
        pagenum: 1,
        pagesize: 10,
        loginRepositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds,
        stat: 1,
        time: ''
      }
    }
  },
  methods: {
    inventoryData(val) {
      console.log('val', val)
      this.personalForm.sourceNumber = val.receiptNumber
      this.personalForm.handleRepositoryId = val.handleRepositryId
      this.handleRepositryId = val.handleRepositoryName
      this.personalForm.handlePersonId = val.handlePersonId
      this.handlePersonId = val.handlePersonName

      this.list = val.inventoryReceiptDetailVos.map(item => {
        return {
          employeeId: item.empId,
          shouldMoney: item.shouldMoney,
          collectedMoney: item.collectedMoney,
          uncollectMoney: item.uncollectMoney,
          moneyThis: item.uncollectMoney,
          sourceSerialNumber: item.id,
          employeeName: item.empName
        }
      })
      this.tableKey = Math.random()
    },
    diffData(val) {
      console.log('val3', val)
      this.personalForm.sourceNumber = val.moveNumber
      this.handlePersonId = val.createPersonName
      this.personalForm.handlePersonId = val.createPersonId
      this.handleRepositryId = val.inRepositoryName
      this.personalForm.handleRepositryId = val.inRepositoryId
      this.getEmpData()
    },
    countData(val) {
      console.log('val2', val)
      this.personalForm.sourceNumber = val.countNumber
      this.handlePersonId = val.createPersonName
      this.personalForm.handlePersonId = val.createPersonId
      this.handleRepositryId = val.countRepositoryName
      this.personalForm.handleRepositryId = val.countRepositoryId
      this.getEmpData()
    },
    damageData(val) {
      console.log('val', val)
      this.personalForm.sourceNumber = val.damagedNumber
      this.handlePersonId = val.createPersonName
      this.personalForm.handlePersonId = val.createPersonId
      this.handleRepositryId = val.damagedRepositoryName
      this.personalForm.handleRepositryId = val.damagedRepositoryId
      this.getEmpData()
    },
    chooseSourceType() {
      this.receiptcontrol = true
    },
    repositoryname(val) {
      this.handleRepositryId = val.repositoryName
      this.personalForm.handleRepositryId = val.id
      this.getEmpData()
    },
    getEmpData() {
      this.getemplist.repositoryid = this.personalForm.handleRepositryId
      getemplist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.empList = res.data.data.content.list
        }
      })
    },
    getShouldMoney(row) {
      console.log('row', row)
      row.uncollectMoney = row.shouldMoney
    },
    choosehandlePersonId() {
      this.stockControl = true
    },
    stockName(val) {
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    customerdata(val) {
      console.log(val)
      this.customerId = val.customerName
      this.personalForm.customerId = val.id
    },
    choosehandleRepositryId() {
      this.repositorycontrol = true
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    newEmp() {
      this.$refs.editable.insertAt({ shouldMoney: 0, collectedMoney: 0, uncollectMoney: 0, stat: 1 })
    },
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Customer/NewCustomerGroup', name: 'NewCustomerGroup', fullPath: '/Customer/NewCustomerGroup', title: 'NewCustomerGroup' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    clearForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1'
      }
      this.handlePersonId = ''
      this.handleRepositryId = ''
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
            addEmpReceipt(parms, detailParms, this.personalForm).then(res => {
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
