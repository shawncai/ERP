<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">{{ $t('updates.hsspxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Recycling.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Recycling.productCode')" prop="productCode" style="width: 100%;">
                  <el-input v-model="personalForm.productCode" style="margin-left: 18px;width: 200px" @focus="handlemater"/>
                </el-form-item>
              </el-col>
              <my-mater :matercontrol.sync="matercontrol" @mater="mater"/>
              <el-col :span="6">
                <el-form-item :label="$t('Recycling.productType')" style="width: 100%;">
                  <el-input v-model="productType" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Recycling.color')" style="width: 100%;">
                  <el-input v-model="personalForm.color" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Recycling.productCategory')" style="width: 100%;">
                  <el-input v-model="productCategory" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Recycling.recyclingMoney')" prop="recyclingMoney" style="width: 100%;">
                  <el-input v-model="personalForm.recyclingMoney" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Recycling.recyclingDate')" prop="recyclingDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.recyclingDate"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Recycling.recyclingPersonId')" prop="recyclingPersonId" style="width: 100%;">
                  <el-input v-model="recyclingPersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Recycling.recyclingRepositoryId')" prop="recyclingRepositoryId" style="width: 100%;">
                  <el-input v-model="recyclingRepositoryId" style="margin-left: 18px;width: 200px" @focus="handlechooseRep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Recycling.locationId')" style="width: 100%;">
                  <el-select v-if="junglelocation" v-model="personalForm.locationId" style="margin-left: 18px;width: 200px" @visible-change="changelocation($event)">
                    <el-option
                      v-for="item in locationlist"
                      :key="item.id"
                      :value="item.id"
                      :label="item.locationCode"/>
                  </el-select>
                  <el-input v-else v-model="locationId" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item :label="$t('Recycling.batch')" style="width: 100%;">
                  <el-input v-model="personalForm.batch" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col> -->
              <el-col :span="6">
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
              <el-col :span="6">
                <el-form-item :label="$t('Recycling.customerId')" prop="customerId" style="width: 100%;">
                  <el-input v-model="customerId" style="margin-left: 18px;width: 200px" @focus="chooseCustomer"/>
                </el-form-item>
                <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Recycling.sexId')" style="width: 100%;">
                  <el-select v-model="personalForm.sexId" style="margin-left: 18px;width: 200px" disabled>
                    <el-option value="1" label="男"/>
                    <el-option value="2" label="女"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Recycling.customerPhone')" style="width: 100%;">
                  <el-input v-model="personalForm.customerPhone" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Recycling.provinceId')" style="width: 100%;">
                  <el-input v-model="provinceId" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Recycling.cityId')" style="width: 100%;">
                  <el-input v-model="cityId" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Recycling.detailAddress')" style="width: 100%;">
                  <el-input v-model="personalForm.detailAddress" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!-- 明细 -->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >{{ $t('updates.hscmx') }}</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <!--          <el-button :disabled="Isproduct" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>-->
          <!-- <el-button @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button> -->
          <!-- <my-detail :control.sync="control" :personalform="personalForm" @product="productdetail"/> -->
          <!-- <el-button :disabled="IsSourceNumber" style="width: 130px" @click="handleAddSource">{{ $t('updates.cydzxz') }}</el-button> -->
          <!-- <el-button type="danger" @click="$refs.editable.removeSelecteds();test()">{{ $t('Hmodule.delete') }}</el-button> -->
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
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" min-width="55" align="center" />
            <el-editable-column :fixed="isfixed" :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :fixed="isfixed" :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150"/>
            <el-editable-column :fixed="isfixed" :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150"/>
            <el-editable-column :label="$t('Hmodule.hw')" prop="location" align="center" min-width="150">
              <template slot-scope="scope">
                <p>{{ getLocationData(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-select v-if="scope.row.batch !== '不使用'" v-model="scope.row.batch" :value="scope.row.batch" :placeholder="$t('Hmodule.xcpc')" filterable clearable style="width: 100%;" @visible-change="updatebatch2($event,scope)">
                  <el-option
                    v-for="(item, index) in batchlist"
                    :key="index"
                    :value="item"
                    :label="item"/>
                </el-select>
                <span v-else>{{ scope.row.batch }}</span>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.wpfl')" prop="categoryName" align="center" min-width="150"/>
            <el-editable-column :label="$t('updates.jbdw')" prop="unit" align="center" min-width="150"/>
            <el-editable-column :label="$t('updates.ggxh')" prop="typeId" align="center" min-width="150"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150"/>
            <el-editable-column :label="$t('updates.jxf')" prop="kpiGrade" align="center" min-width="150"/>
            <el-editable-column :label="$t('updates.spjf')" prop="point" align="center" min-width="150"/>
            <el-editable-column :label="$t('updates.ydsl')" prop="allQuantity" align="center" min-width="150"/>
            <el-editable-column :label="$t('updates.wcksl')" prop="allQuantity" align="center" min-width="150"/>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.cksli')" prop="quantity" align="center" min-width="150" >
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
            <el-editable-column v-if="false" :label="$t('updates.lsj')" prop="salePrice" align="center" min-width="150"/>
            <el-editable-column v-if="false" :label="$t('updates.cbj')" prop="costPrice" align="center" min-width="150"/>
            <!-- <el-editable-column prop="taxprice" align="center" :label="$t('updates.hsj')" min-width="150px"> -->
            <el-editable-column :label="$t('updates.ckj')" prop="taxprice" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ gettaxprice(scope.row) }}</span>
              </template>
            </el-editable-column>
            <el-editable-column v-if="false" prop="costMoney" align="center" label="成本金额" min-width="150">
              <template slot-scope="scope">
                <p>{{ getcostMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column v-if="false" :label="$t('updates.hsje')" prop="includeTaxMoney" align="center" min-width="150">
              <template slot-scope="scope">
                <p>{{ getincludeTaxMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.sl')" prop="taxRate" align="center" min-width="170">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="false"
                  v-model="scope.row.taxRate"
                  @input="gettaxRate(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.se')" prop="taxMoney" align="center" min-width="170">
              <template slot-scope="scope">
                <p>{{ getTaxMoney2(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column v-if="false" :label="$t('Hmodule.je')" prop="money" align="center" min-width="150">
              <template slot-scope="scope">
                <p>{{ getMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.ckje')" prop="includeTaxCostMoney" align="center" min-width="170">
              <template slot-scope="scope">
                <p>{{ getincludeTaxCostMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.ckl')" prop="discountRate" align="center" min-width="170">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="false"
                  v-model="scope.row.discountRate"
                  @change="getdiscountRate(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.cke')" prop="discountMoney" align="center" min-width="170">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="false"
                  v-model="scope.row.discountMoney"
                  @change="getdiscountMoney(scope.row)"/>
              </template>
            </el-editable-column>
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
                <el-input v-if="isEdit2(scope.row)" v-model="scope.row.batteryCode" clearable @blur="getInfo2(scope.row)"/>
                <span v-else>{{ scope.row.batteryCode }}</span>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.ydbh')" prop="sourceNumber" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ydxh')" prop="sourceSerialNumber" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { createrecycling } from '@/api/Recycling'
import { getlocation, locationlist } from '@/api/public'
import { searchSaleCategory } from '@/api/SaleCategory'
import { getdeptlist } from '@/api/BasicSettings'
import MyEmp from './components/MyEmp'
import MyRepository from './components/MyRepository'
import MyMater from './components/MyMater'
import MyCustomer from './components/MyCustomer'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  name: 'AddRecycling',
  components: { MyCustomer, MyMater, MyRepository, MyEmp },
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (this.recyclingPersonId === undefined || this.recyclingPersonId === null || this.recyclingPersonId === '') {
        callback(new Error('请选择回收人'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      // console.log('物品编码', value)
      if (this.personalForm.productCode === undefined || this.personalForm.productCode === null || this.personalForm.productCode === '') {
        callback(new Error('请选择物品编码'))
      } else {
        callback()
      }
    }
    const validatePass4 = (rule, value, callback) => {
      console.log('回收门店', value)
      if (this.recyclingRepositoryId === undefined || this.recyclingRepositoryId === null || this.recyclingRepositoryId === '') {
        callback(new Error('请选择回收门店'))
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
      // 判断货位的显示
      junglelocation: true,
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
      recyclingRepositoryId: this.$store.getters.repositoryName,
      // 控制门店
      repositorycontrol: false,
      // 选择的数据
      choosedata: [],
      // 部门数据
      depts: [],
      // 回收人回显
      recyclingPersonId: this.$store.getters.name,
      // 控制回收人
      stockControl: false,
      // 收入单信息数据
      // 登陆者数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        recyclingRepositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        recyclingDate: null,
        exchangeRate: '1.0000',
        recyclingPersonId: this.$store.getters.userId,
        repositoryId: this.$store.getters.repositoryId
      },
      // 收入单规则数据
      personalrules: {
        recyclingPersonId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        recyclingDate: [
          { required: true, message: '请选择回收时间', trigger: 'change' }
        ],
        productCode: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        recyclingRepositoryId: [
          { required: true, validator: validatePass4, trigger: 'change' }
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
  created() {
    this.getdatatime()
    this.getTypes()
  },
  beforeCreate() {
    _that = this
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
      if (this.personalForm.productCode) {
        // console.log('gogogo')
        getlocation(this.personalForm.recyclingRepositoryId, this.personalForm).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.junglelocation = false
              this.locationId = res.data.data.content[0].locationCode
              this.personalForm.locationId = res.data.data.content[0].id
            } else {
              this.junglelocation = true
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
    // 批次change事件
    changelocation(event) {
      console.log(event)
      // if (event === true) {
      //   if (this.personalForm.recyclingRepositoryId === null || this.personalForm.recyclingRepositoryId === '' || this.personalForm.recyclingRepositoryId === undefined) {
      //     this.$notify.error({
      //       title: '错误',
      //       message: '请先选择门店',
      //       offset: 100
      //     })
      //     return false
      //   }
      //   if (this.personalForm.productCode === null || this.personalForm.productCode === '' || this.personalForm.productCode === undefined) {
      //     this.$notify.error({
      //       title: '错误',
      //       message: '请先选择物品',
      //       offset: 100
      //     })
      //     return false
      //   }
      //   getlocation(this.personalForm.recyclingRepositoryId, this.personalForm).then(res => {
      //     if (res.data.ret === 200) {
      //       if (res.data.data.content.length !== 0) {
      //         this.locationlist = res.data.data.content
      //       } else if (res.data.data.content.length === 0) {
      //         locationlist(this.personalForm.recyclingRepositoryId).then(res => {
      //           if (res.data.ret === 200) {
      //             this.locationlist = res.data.data.content.list
      //           }
      //         })
      //       }
      //     }
      //   })
      // }
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
      if (this.recyclingRepositoryId) {
        // console.log('gogogo')
        getlocation(this.personalForm.recyclingRepositoryId, this.personalForm).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.junglelocation = false
              this.locationId = res.data.data.content[0].locationCode
              this.personalForm.locationId = res.data.data.content[0].id
            } else {
              this.junglelocation = true
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
    // 保存操作
    handlesave() {
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          createrecycling(parms, this.personalForm).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
              this.$refs.personalForm2.clearValidate()
              this.$refs.personalForm2.resetFields()
              this.getdatatime()
            } else {
              this.$notify.error({
                title: '错误',
                message: res.data.msg,
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
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Recycling/AddRecycling', name: 'AddRecycling', fullPath: '/Recycling/AddRecycling', title: 'AddRecycling' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ERP-container{
    margin-right: 0;
    .form-name{
      font-size: 18px;
      color: #373e4f;
      margin-bottom: -20px;
      margin-top: 20px;
    }
    .container{
      margin-top: 40px;
    }
    .el-button+.el-button{
      width: 98px;
    }
  }
</style>
