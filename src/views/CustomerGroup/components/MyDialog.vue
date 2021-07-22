<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.id +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('update4.groupName')" style="width: 100%;">
                <el-input v-model="personalForm.groupName" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item :label="$t('update4.khm')" prop="customerId" style="width: 100%;">
                <el-input v-model="customerId" style="margin-left: 18px;width: 200px" @focus="chooseCustomer"/>
                <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item :label="$t('Customer.level')" prop="levelId" style="width: 100%;">
                <el-select ref="clear" v-model="personalForm.levelId" :value="personalForm.levelId" style="margin-left: 18px;width: 200px" @focus="handleFocus">
                  <el-option v-show="false" label="" value=""/>
                  <el-option
                    v-for="(item, index) in levels"
                    :key="index"
                    :value="item.id"
                    :label="item.categoryName"/>
                  <template>
                    <el-button v-if="isshow" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat">{{ $t('updates.create') }}</el-button>
                  </template>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('update4.stat')" style="width: 100%;">
                <el-select v-model="personalForm.stat" style="margin-left: 18px;width: 200px">
                  <el-option label="启用" value="1"/>
                  <el-option label="停用" value="2"/>
                </el-select>
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
          <el-editable-column :label="$t('updates.ggxh')" prop="productType" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
          <el-editable-column :label="$t('StockOrder.currency')" :edit-render="{name: 'ElSelect', options: currencyList, type: 'visible'}" prop="currency" align="center" min-width="200px"/>
          <el-editable-column :label="$t('update4.customerPrice')" :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="price" align="center" min-width="150px"/>
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
import { updateCustomerProduct } from '@/api/Customer'
import MyCustomer from '../../SaleOrder/components/MyCustomer'
import MyDetail from './MyDetail'
import { searchCusCategory } from '@/api/Customer'

var _that
export default {
  components: { MyCustomer, MyDetail },
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
      if (this.customerId === undefined || this.customerId === null || this.customerId === '') {
        callback(new Error('please select customer'))
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
        customerId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ]
      },
      customercontrol: false,
      customerId: '',
      saveloding: false,
      list: [],
      control: false,
      moreaction: '',
      tableKey: 0,
      // 判断增加按钮
      isshow: false,
      levels: [],
      levelstype: 2,
      currencyList: [{ value: 1, label: 'PHP' }, { value: 2, label: 'USD' }, { value: 3, label: 'RMB' }, { value: 4, label: 'LKR' }]
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
      this.getCategory()
    },
    editdata() {
      console.log(this.editdata)
      this.personalForm = this.editdata
      this.customerId = this.personalForm.customerName
      this.list = this.personalForm.customerProductGroupDetailVos
      this.tableKey = Math.random()
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 触发下拉框brlu
    go_creat() {
      this.$router.push('/Customer/CustomerCategory')
      this.$refs.clear.blur()
    },
    jungleshow() {
      const roles = this.$store.getters.roles
      this.isshow = roles.includes('1-14-21-1')
      console.log(this.isshow)
    },
    handleFocus() {
      this.getCategory()
      this.jungleshow()
    },
    getCategory() {
      // 获取客户优质级别
      searchCusCategory(this.levelstype).then(res => {
        if (res.data.ret === 200) {
          this.levels = res.data.data.content.list
        } else {
          console.log('客户优质级别错误')
        }
      })
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    customerdata(val) {
      console.log(val)
      this.customerId = val.customerName
      this.personalForm.customerId = val.id
    },
    chooseCustomer() {
      this.customercontrol = true
    },
    uniqueArray(array, key) {
      var result = [array[0]]
      for (var i = 1; i < array.length; i++) {
        var item = array[i]
        var repeat = false
        for (var j = 0; j < result.length; j++) {
          if (item[key] === result[j][key]) {
            repeat = true
            break
          }
        }
        if (!repeat) {
          result.push(item)
        }
      }
      return result
    },
    productdetail(val) {
      const nowlistdata = this.$refs.editable.getRecords()
      // console.log('val ====> ', val)
      // console.log('nowlistdata', nowlistdata)
      // console.log('this.list', this.list)
      const newarr = [...val, ...nowlistdata]
      // console.log('needarr', newarr)

      const needarr2 = this.uniqueArray(newarr, 'productCode')
      // console.log('needarr2', needarr2)
      this.list = needarr2
      this.tableKey = Math.random()
    },
    chooseProduct() {
      this.control = true
    },
    handlecancel() {
      this.editVisible = false
    },
    clearForm() {
      this.personalForm = {
        stat: '1',
        createId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId
      }
      this.customerId = ''
    },
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      delete this.personalForm.customerProductGroupDetailVos
      if (this.list.length === 0) {
        console.log(12333)
      }
      const parms = JSON.stringify(this.personalForm)
      const detailParms = JSON.stringify(this.$refs.editable.getRecords())
      // console.log('this.list', this.$refs.editable.getRecords())
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          updateCustomerProduct(parms, detailParms, this.$store.getters.userId).then(res => {
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
