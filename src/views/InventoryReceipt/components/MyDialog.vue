<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.receiptNumber +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('update4.peichangzhuti')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockInvoice.sourceType')" prop="sourceType" style="width: 100%;">
                <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px" >
                  <el-option :label="$t('route.Inventorydamaged')" value="1"/>
                  <el-option :label="$t('route.InventoryCount')" value="2"/>
                  <el-option :label="$t('route.difflist')" value="3"/>

                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('LogisticsCar.sourcenumber')" prop="sourceNumber" style="width: 100%;">
                <el-input v-model="personalForm.sourceNumber" style="margin-left: 18px;width: 200px" @focus="chooseSourceType"/>
              </el-form-item>
              <my-damage :saleoutcontrol.sync ="damageControl" @damageData="damageData"/>
              <my-count :countcontrol.sync = "countcontrol" @countData="countData"/>
              <my-diff :diffcontrol.sync="diffcontrol" @diffData="diffData"/>

            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('recoveryCarDetail.repositoryName')" prop="handleRepositryId" style="width: 100%;">
                <el-input v-model="handleRepositryId" style="margin-left: 18px;width: 200px" @focus="choosehandleRepositryId"/>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>

              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Complaint.handlerName')" prop="handlePersonId" style="width: 100%;">
                <el-input v-model="handlePersonId" style="margin-left: 18px;width: 200px" @focus="choosehandlePersonId"/>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" >{{ $t('updates.ddmx') }}</h2>
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
          style="width: 100%">
          <el-editable-column type="selection" min-width="55" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
          <el-editable-column :label="$t('update4.shouldMoney')" :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="shouldMoney" align="center" min-width="150px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="6"
                :controls="false"
                v-model="scope.row.shouldMoney"
                @change="getShouldMoney(scope.row)"/>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('update4.collectedMoney')" prop="collectedMoney" align="center" min-width="150px"/>
          <el-editable-column :label="$t('update4.uncollectMoney')" prop="uncollectMoney" align="center" min-width="150px"/>
          <el-editable-column :label="$t('update4.empId')" :edit-render="{name: 'ElSelect', type: 'default'}" prop="empId" align="center" min-width="200px">
            <template slot-scope="scope">
              <el-select v-model="scope.row.empId" filterable style="margin-left: 18px;width: 100%;margin-bottom: 0; padding: 0 20px">
                <el-option
                  v-for="(item, index) in empList"
                  :key="index"
                  :value="item.id"
                  :label="item.personName"/>
              </el-select>
            </template>
          </el-editable-column>
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
import { getemplist } from '@/api/EmployeeInformation'
import { updateInventoryReceipt } from '@/api/Inventorydamaged'
import MyCustomer from '../../SaleOrder/components/MyCustomer'
// import MyDetail from './components/MyDetail'
import MyRepository from '../../SaleOrder/components/MyRepository'
import MyEmp from '../../SaleOrder/components/MyEmp'
import MyDamage from './MyDamage'
import MyCount from './MyCount'
import MyDiff from './MyDiff'

var _that
export default {
  components: { MyCustomer, MyRepository, MyEmp, MyDamage, MyCount, MyDiff },
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
      diffcontrol: false,

      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      countcontrol: false,
      damageControl: false,
      repositorycontrol: false,
      stockControl: false,
      handleRepositryId: '',
      handlePersonId: '',
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
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      console.log(this.editdata)
      this.personalForm = this.editdata
      this.personalForm.sourceType = String(this.editdata.sourceType)
      this.handleRepositryId = this.personalForm.handleRepositoryName
      this.handlePersonId = this.personalForm.handlePersonName
      this.list = this.personalForm.inventoryReceiptDetailVos
      this.tableKey = Math.random()
      this.getEmpData()
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
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
      if (this.personalForm.sourceType === '1') {
        this.damageControl = true
      } else if (this.personalForm.sourceType === '2') {
        this.countcontrol = true
      } else if (this.personalForm.sourceType === '3') {
        this.diffcontrol = true
      }
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

    clearForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      }
      this.handlePersonId = ''
      this.handleRepositryId = ''
    },
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      delete this.personalForm.inventoryReceiptDetailVos
      delete this.personalForm.judgeStat

      if (this.list.length === 0) {
        console.log(12333)
      }
      const parms = JSON.stringify(this.personalForm)
      const detailParms = JSON.stringify(this.$refs.editable.getRecords())
      // console.log('this.list', this.$refs.editable.getRecords())
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          updateInventoryReceipt(parms, detailParms, this.$store.getters.userId).then(res => {
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
                message: 'wrong',
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
