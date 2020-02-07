<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
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
              <el-form-item :label="$t('Recycling.remark')" style="width: 100%;">
                <el-input v-model="personalForm.remark" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">{{ $t('updates.khxx') }}</h2>
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
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" >{{ $t('updates.hscmx') }}</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <!--          <el-button :disabled="Isproduct" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>-->
        <el-button @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
        <my-detail :control.sync="control" :personalform="personalForm" @product="productdetail"/>
        <!-- <el-button :disabled="IsSourceNumber" style="width: 130px" @click="handleAddSource">{{ $t('updates.cydzxz') }}</el-button> -->
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        <!-- <el-button type="primary" @click="checkStock()">{{ $t('updates.kckz') }}</el-button> -->
      </div>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: true, showStatus: true}"
          :edit-rules="validRules"
          class="click-table1"
          stripe
          border
          size="medium"
          style="margin-bottom: 60px;width: 100%"
          @selection-change="handleSelectionChange">
          <el-editable-column type="selection" min-width="55" align="center" />
          <el-editable-column :fixed="isfixed" :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
          <el-editable-column :fixed="isfixed" :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150"/>
          <el-editable-column :fixed="isfixed" :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150"/>
          <el-editable-column :edit-render="{type: 'default'}" :label="$t('Hmodule.hw')" prop="locationId" align="center" width="200px">
            <template slot-scope="scope">
              <el-select v-model="scope.row.locationId" :value="scope.row.locationId" :placeholder="$t('Hmodule.xzhw')" filterable clearable style="width: 100%;" @visible-change="updatebatch($event,scope)">
                <el-option
                  v-for="item in locationlist"
                  :key="item.id"
                  :value="item.id"
                  :label="item.locationCode"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Hmodule.pc')" prop="batch" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.wpfl')" prop="categoryName" align="center" min-width="150"/>
          <el-editable-column :label="$t('updates.jbdw')" prop="unit" align="center" min-width="150"/>
          <el-editable-column :label="$t('updates.ggxh')" prop="productName" align="center" min-width="150"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150"/>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('collectAndPayDetail.sl')" prop="quantity" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-input-number
                v-if="isEdit3(scope.row)"
                :precision="2"
                :controls="false"
                :min="1.00"
                v-model="scope.row.quantity"
                @change="queryStock(scope.row)"
              />
              <!-- <el-input v-if="isEdit2(scope.row)" v-model="personalForm.carCode" clearable/> -->
              <span v-else>{{ scope.row.quantity }}</span>
            </template>
          </el-editable-column>
          <el-editable-column v-if="false" :label="$t('updates.lsj')" prop="recoveryPrice" align="center" min-width="150"/>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.cjbm')" prop="carCode" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-input v-if="isEdit2(scope.row)" v-model="scope.row.carCode" clearable @blur="getInfo(scope.row)"/>
              <span v-else>{{ scope.row.carCode }}</span>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.djbm')" prop="motorCode" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-input v-if="isEdit2(scope.row)" v-model="scope.row.motorCode" clearable @blur="getInfo3(scope.row)"/>
              <span v-else>{{ scope.row.motorCode }}</span>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.dcbm')" prop="batteryCode" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-input v-if="isEdit4(scope.row)" v-model="scope.row.batteryCode" clearable @blur="getInfo2(scope.row)"/>
              <span v-else>{{ scope.row.batteryCode }}</span>
            </template>
          </el-editable-column>
        </el-editable>
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
import MyDetail from './MyDetail'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  components: { MyCustomer, MyMater, MyRepository, MyEmp, MyDetail },
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
      control: false,
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
      isfixed: false,
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
      this.list2 = this.personalForm.recyclingDetailVos
      this.getlocation()
    },
    list2: {
      handler(oldval, newval) {
        if (this.list2.length !== 0) {
          this.isfixed = true
          console.log('可以滚动')
        } else {
          this.isfixed = false
        }
      }
    }
  },
  created() {
    this.getdatatime()
    this.getTypes()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getlocation() {
      locationlist(this.personalForm.recyclingRepositoryId).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list
        }
      })
    },
    updatebatch(event, scope) {
      if (event === true) {
        console.log(this.personalForm.recyclingRepositoryId)
        if (this.personalForm.recyclingRepositoryId === undefined || this.personalForm.countRepositoryId === '') {
          this.$notify.error({
            title: 'wrong',
            message: '请先选择仓库',
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.recyclingRepositoryId, scope.row).then(res => {
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
    handleSelectionChange(val) {
      console.log(val)
      this.moreaction = val
    },
    productdetail(val) {
      for (let i = 0; i < val.length; i++) {
        val[i].quantity = 1
        this.$refs.editable.insert(val[i])
      }
    },
    handleAddproduct() {
      if (this.recyclingRepositoryId === null || this.recyclingRepositoryId === '' || this.recyclingRepositoryId === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: '请先选择回收仓库',
          offset: 100
        })
        return false
      }
      this.control = true
    },
    isEdit4(row) {
      console.log('222', row)
      const re = row.productCode.slice(0, 2)
      if (re === '01' || re === '05') { return true } else { return false }
    },
    isEdit2(row) {
      console.log('222', row)
      const re = row.productCode.slice(0, 2)
      // if (re === '01') {
      //   row.quantity = 1
      //   return row.quantity
      // }
      if (re === '01') { return true } else { return false }
    },
    isEdit3(row) {
      console.log('222', row)
      const re = row.productCode.slice(0, 2)
      if (re === '01' || re === '05') { return false } else { return true }
    },
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
            title: 'wrong',
            message: '请先选择门店',
            offset: 100
          })
          return false
        }
        if (this.personalForm.productCode === null || this.personalForm.productCode === '' || this.personalForm.productCode === undefined) {
          this.$notify.error({
            title: 'wrong',
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
      const EnterDetail = this.$refs.editable.getRecords()
      console.log(EnterDetail)
      for (const i in EnterDetail) {
        if (EnterDetail[i].actualEnterQuantity === 0) {
          this.$notify.error({
            title: 'wrong',
            message: '商品数量不能为0',
            offset: 100
          })
          return false
        }
      }
      let i = 1
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          i = 2
        }
      })
      if (i === 2) {
        this.$notify.error({
          title: 'wrong',
          message: '商品货位不能为空',
          offset: 100
        })
        return false
      }
      console.log(this.personalForm)
      console.log(EnterDetail)
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: '明细表不能为空',
          offset: 100
        })
        return false
      }
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          delete elem.locationId
        }
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.actualEnterQuantity === null || elem.actualEnterQuantity === '' || elem.actualEnterQuantity === undefined) {
          delete elem.actualEnterQuantity
        }
        if (elem.enterQuantity === null || elem.enterQuantity === '' || elem.enterQuantity === undefined) {
          delete elem.enterQuantity
        }
        if (elem.enterPrice === null || elem.enterPrice === '' || elem.enterPrice === undefined) {
          delete elem.enterPrice
        }
        if (elem.enterMoney === null || elem.enterMoney === '' || elem.enterMoney === undefined) {
          delete elem.enterMoney
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        return elem
      })
      const parms2 = JSON.stringify(EnterDetail)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          updaterecycling(parms, parms2).then(res => {
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
                title: 'wrong',
                message: '出错了',
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
