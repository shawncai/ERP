<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Storagemovediff.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Complaint.handlerName')" prop="handlePersonId" style="width: 100%;">
                <el-input v-model="handlePersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('update4.groupchoose')" prop="groupId" style="width: 100%;">
                <el-input v-model="groupId" style="margin-left: 18px;width: 200px" @focus="handleChooseGroup"/>
                <my-group :saleoutcontrol.sync="groupControl" @groupData="groupData"/>

              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('update4.adjustDate')" prop="adjustDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.adjustDate"
                  :picker-options="pickerOptions2"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('update4.summary')" style="width: 100%;">
                <el-input v-model="personalForm.summary" style="margin-left: 18px;width: 200px"/>
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
        <!-- <el-button @click="chooseProduct">{{ $t('Hmodule.tjsp') }}</el-button> -->
        <!-- <my-detail :control.sync="control" @product="productdetail"/> -->
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
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.jbdw')" prop="unit" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ggxh')" prop="productType" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
          <el-editable-column :label="$t('update4.oldPrice')" :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="oldPrice" align="center" min-width="150px"/>
          <el-editable-column :label="$t('update4.newPrice')" :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="newPrice" align="center" min-width="150px"/>
          <el-editable-column :label="$t('update4.remark')" :edit-render="{name: 'ElInput', type: 'visible'}" prop="remark" align="center" min-width="200px"/>
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
import { updateCustomerAdjust } from '@/api/Customer'
import MyCustomer from '../../SaleOrder/components/MyCustomer'
import MyGroup from './MyGroup'
import MyEmp from '../../SaleReturn/components/MyEmp'

// import MyDetail from './MyDetail'

var _that
export default {
  components: { MyCustomer, MyEmp, MyGroup },
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
      if (this.groupId === undefined || this.groupId === null || this.groupId === '') {
        callback(new Error('please select groupId'))
      } else {
        callback()
      }
    }
    return {

      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      pickerOptions2: {
        disabledDate: (time) => {
          const _now = Date.now()
          const seven = 60 * 24 * 60 * 60 * 1000
          const sevenDays = _now - seven
          return time.getTime() > _now || time.getTime() < sevenDays
        }
      },
      groupControl: false,
      stockControl: false,
      personalrules: {
        groupId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ]
      },
      customercontrol: false,
      handlePersonId: this.$store.getters.name,
      groupId: '',
      saveloding: false,
      list: [],
      control: false,
      moreaction: '',
      tableKey: 0,
      currencyList: [{ value: 1, label: 'PHP' }, { value: 2, label: 'USD' }, { value: 3, label: 'RMB' }, { value: 4, label: 'LKR' }]
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      console.log(this.editdata)
      this.personalForm = this.editdata
      this.groupId = this.personalForm.groupName
      this.list = this.personalForm.customerProductAdjustDetailVos
      this.tableKey = Math.random()
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    handlecancel() {
      this.editVisible = false
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
      this.personalForm.adjustDate = currentdate
    },
    handleChooseGroup() {
      this.groupControl = true
    },
    groupData(val) {
      console.log('val', val)
      //   this.personalForm.summary = val.summary
      this.groupId = val.groupName
      this.personalForm.groupId = val.id
      this.list = val.customerProductGroupDetailVos
      for (const i in this.list) {
        this.list[i].oldPrice = this.list[i].price
        this.list[i].newPrice = this.list[i].price
        this.list[i].productCategoryName = this.list[i].productCategory
        this.list[i].productTypeName = this.list[i].productType
        this.list[i].productType = this.list[i].productType
      }
      this.tableKey = Math.random()
    },
    stockName(val) {
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    handlechooseStock() {
      this.stockControl = true
    },
    clearForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        handlePersonId: this.$store.getters.userId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        adjustDate: null
      }
      this.groupId = ''
      this.getdatatime()
    },
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      delete this.personalForm.customerProductAdjustDetailVos
      delete this.personalForm.judgeStat

      if (this.list.length === 0) {
        console.log(12333)
      }
      const parms = JSON.stringify(this.personalForm)
      const detailParms = JSON.stringify(this.$refs.editable.getRecords())
      // console.log('this.list', this.$refs.editable.getRecords())
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          updateCustomerAdjust(parms, detailParms, this.$store.getters.userId).then(res => {
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
