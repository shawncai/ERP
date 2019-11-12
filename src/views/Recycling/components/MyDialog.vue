<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.number +'    修改'" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Recycling.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Recycling.productCode')" prop="productCode" style="width: 100%;">
                <el-input v-model="personalForm.productCode" style="margin-left: 18px;width: 200px" @focus="handlemater"/>
              </el-form-item>
            </el-col>
            <my-mater :matercontrol.sync="matercontrol" @mater="mater"/>
            <el-col :span="12">
              <el-form-item :label="$t('Recycling.productType')" style="width: 100%;">
                <el-input v-model="productType" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Recycling.color')" style="width: 100%;">
                <el-input v-model="personalForm.color" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Recycling.productCategory')" style="width: 100%;">
                <el-input v-model="productCategory" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Recycling.recyclingMoney')" prop="recyclingMoney" style="width: 100%;">
                <el-input v-model="personalForm.recyclingMoney" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Recycling.recyclingDate')" prop="recyclingDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.recyclingDate"
                  :picker-options="pickerOptions1"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Recycling.recyclingPersonId')" prop="recyclingPersonId" style="width: 100%;">
                <el-input v-model="recyclingPersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Recycling.recyclingRepositoryId')" style="width: 100%;">
                <el-input v-model="recyclingRepositoryId" style="margin-left: 18px;width: 200px" @focus="handlechooseRep"/>
              </el-form-item>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Recycling.locationId')" style="width: 100%;">
                <el-select v-model="personalForm.locationId" style="margin-left: 18px;width: 200px" @visible-change="changelocation($event)">
                  <el-option
                    v-for="(item, index) in locationlist"
                    :key="index"
                    :value="item.id"
                    :label="item.locationCode"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Recycling.batch')" style="width: 100%;">
                <el-input v-model="personalForm.batch" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Recycling.remark')" style="width: 100%;">
                <el-input v-model="personalForm.remark" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">客户信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Recycling.customerId')" prop="customerId" style="width: 100%;">
                <el-input v-model="customerId" style="margin-left: 18px;width: 200px" @focus="chooseCustomer"/>
              </el-form-item>
              <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Recycling.sexId')" style="width: 100%;">
                <el-select v-model="personalForm.sexId" style="margin-left: 18px;width: 200px" disabled>
                  <el-option value="1" label="男"/>
                  <el-option value="2" label="女"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Recycling.customerPhone')" style="width: 100%;">
                <el-input v-model="personalForm.customerPhone" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Recycling.provinceId')" style="width: 100%;">
                <el-input v-model="provinceId" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Recycling.cityId')" style="width: 100%;">
                <el-input v-model="cityId" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Recycling.detailAddress')" style="width: 100%;">
                <el-input v-model="personalForm.detailAddress" style="margin-left: 18px;width: 200px" disabled/>
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
import { updaterecycling } from '@/api/Recycling'
import { getlocation, locationlist } from '@/api/public'
import { searchSaleCategory } from '@/api/SaleCategory'
import { getdeptlist } from '@/api/BasicSettings'
import MyEmp from './MyEmp'
import MyRepository from './MyRepository'
import MyMater from './MyMater'
import MyCustomer from './MyCustomer'
export default {
  components: { MyCustomer, MyMater, MyRepository, MyEmp },
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
      if (this.recyclingPersonId === undefined || this.recyclingPersonId === null || this.recyclingPersonId === '') {
        callback(new Error('请选择回收人'))
      } else {
        callback()
      }
    }
    return {
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 回显证件类型
      certificateType: '',
      // 回显市
      cityId: '',
      // 回显省
      provinceId: '',
      // 回显性别
      sexId: '',
      // 回显客户
      customerId: '',
      // 控制客户
      customercontrol: false,
      // 货位数据
      locationlist: [],
      // 回显规格
      productType: '',
      // 回显类别
      productCategory: '',
      // 控制回收物品
      matercontrol: false,
      // 结算方式数据
      colseTypes: [],
      // 结算方式获取参数
      colseTypeparms: {
        type: 3,
        pagenum: 1,
        pagesize: 99999
      },
      // 门店回显
      recyclingRepositoryId: '',
      // 控制门店
      repositorycontrol: false,
      // 部门数据
      depts: [],
      // 回收人回显
      recyclingPersonId: '',
      // 控制回收人
      stockControl: false,
      // 收入单信息数据
      // 收入单规则数据
      personalrules: {
        recyclingPersonId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        recyclingDate: [
          { required: true, message: '请选择回收时间', trigger: 'change' }
        ],
        recyclingMoney: [
          { required: true, message: '请输入回收金额', trigger: 'change' }
        ]
      },
      // 收入单明细数据
      list2: [],
      // 收入单明细列表规则
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
      this.productType = this.personalForm.productTypeName
      this.productCategory = this.personalForm.productCategoryName
      this.recyclingPersonId = this.personalForm.recyclingPersonName
      this.recyclingRepositoryId = this.personalForm.recyclingRepositoryName
      this.customerId = this.personalForm.customerName
      this.provinceId = this.personalForm.provinceName
      this.cityId = this.personalForm.cityName
    }
  },
  created() {
    this.getdatatime()
    this.getTypes()
  },
  methods: {
    // 选择客户focus
    chooseCustomer() {
      this.customercontrol = true
    },
    customerdata(val) {
      console.log(val)
      this.personalForm.customerId = val.id
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.phoneNumber
      if (val.gender !== null && val.gender !== undefined && val.gender !== '') {
        this.personalForm.sexId = String(val.gender)
      }
      this.personalForm.provinceId = val.provinceId
      this.provinceId = val.provinceName
      this.personalForm.cityId = val.cityId
      this.cityId = val.cityName
      this.personalForm.detailAddress = val.address
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.recyclingRepositoryId = val.repositoryName
      this.personalForm.recyclingRepositoryId = val.id
    },
    // 批次change事件
    changelocation(event) {
      console.log(event)
      if (event === true) {
        if (this.personalForm.recyclingRepositoryId === null || this.personalForm.recyclingRepositoryId === '' || this.personalForm.recyclingRepositoryId === undefined) {
          this.$notify.error({
            title: '错误',
            message: '请先选择门店',
            offset: 100
          })
          return false
        }
        if (this.personalForm.productCode === null || this.personalForm.productCode === '' || this.personalForm.productCode === undefined) {
          this.$notify.error({
            title: '错误',
            message: '请先选择物品',
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.recyclingRepositoryId, this.personalForm).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
            } else if (res.data.data.content.length === 0) {
              locationlist(this.personalForm.recyclingRepositoryId).then(res => {
                if (res.data.ret === 200) {
                  this.locationlist = res.data.data.content.list
                }
              })
            }
          }
        })
      }
    },
    // 物品focus事件
    handlemater() {
      this.matercontrol = true
    },
    mater(val) {
      console.log(val)
      this.personalForm.productCode = val.code
      this.personalForm.productType = val.typeId
      this.productType = val.productType
      this.personalForm.productCategory = val.categoryId
      this.productCategory = val.category
      this.personalForm.color = val.color
    },
    // 新增收入明细
    insertEvent(index) {
      this.$refs.editable.insertAt({ productCode: null }, index)
    },
    getTypes() {
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
      // 结算方式数据
      searchSaleCategory(this.colseTypeparms).then(res => {
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
      this.personalForm.recyclingDate = currentdate
    },
    // 重置一下下拉
    change() {
      this.$forceUpdate()
    },
    // 回收人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 回收人回显
    stockName(val) {
      console.log(val)
      this.recyclingRepositoryId = val.repositoryName
      this.personalForm.recyclingRepositoryId = val.repositoryId
      this.recyclingPersonId = val.personName
      this.personalForm.recyclingPersonId = val.id
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        recyclingDate: null
      }
      this.recyclingPersonId = null
      this.recyclingRepositoryId = null
      this.productCategory = null
      this.productType = null
      this.customerId = null
      this.provinceId = null
      this.cityId = null
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
          updaterecycling(parms).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: '操作成功',
                message: '操作成功',
                type: 'success',
                duration: 1000,
                offset: 100
              })
              this.$emit('rest', true)
              this.restAllForm()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
              this.$refs.personalForm2.clearValidate()
              this.$refs.personalForm2.resetFields()
              this.editVisible = false
            } else {
              this.$notify.error({
                title: '错误',
                message: '出错了',
                offset: 100
              })
            }
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '信息未填完整',
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
      this.$refs.personalForm2.clearValidate()
      this.$refs.personalForm2.resetFields()
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
