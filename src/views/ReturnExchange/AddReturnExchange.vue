<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">

        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.sourceType')" prop="sourceType" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.sourceType" style="width: 200px" @change="clearnumber">
                    <el-option :label="$t('route.SaleOut')" value="1"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.sourceNumber')" prop="sourceNumber" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.sourceNumber" style="width: 200px" @focus="opensaleout"/>
                </el-form-item>
                <my-saleout :saleoutcontrol.sync="saleoutcontrol" @saleOutDetail="saleOutDetail" @saleOutdata="saleOutdata"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.customerType')" prop="customerType" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.customerType" style="width: 200px" @change="clearrequire">
                    <el-option :label="$t('prompt.jxs')" value="1"/>
                    <el-option :label="$t('prompt.ls')" value="2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.customerId')" prop="customerId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerId" style="width: 200px" @focus="chooseCustomer"/>
                </el-form-item>
                <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
                <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.customerPhone')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.customerPhone" disabled style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.sourceMoney')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.sourceMoney" :disabled="Issource" style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.diffMoney')" prop="shouldMoney" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.shouldMoney" disabled style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('update4.actialdiffermoney')" prop="diffMoney" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input-number v-model="personalForm.diffMoney" :controls="false" :step="0.1" style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col v-if="personalForm.saleType === '2'" :span="6">
                <el-form-item :label="$t('update4.nowFirst')" prop="nowFirst" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input-number v-model="personalForm.nowFirst" :controls="false" :step="0.1" style="width: 200px" @change="changeFirst"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleOut.invoiceNumber')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.invoiceNumber" style="width: 200px" @blur="judgeinvoce"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.applyNumber')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.applyNumber" style="width: 200px" disabled clearable/>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item :label="$t('SaleOut.saleType')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.saleType" style="width: 200px" @change="handleChangeSaleType">
                    <el-option :label="$t('prompt.xj')" value="1" />
                    <el-option :label="$t('prompt.fq')" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.handlePersonId')" prop="handlePersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="handlePersonId" style="width: 200px" @focus="handlechooseStock"/>
                </el-form-item>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.exchangeDate')" prop="exchangeDate" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.exchangeDate"
                    :picker-options="pickerOptions2"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ReturnExchange.repositoryId')" prop="repositoryId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="repositoryId" style="width: 200px" @focus="chooserep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">

        <div ref="fuzhu" class="form-name" >{{ $t('updates.trmx') }}</div>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        </div>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :key="talbeKey"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules"
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.hw')" prop="locationName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.wpfl')" prop="productCategoryName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.jxf')" prop="kpiGrade" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.spjf')" prop="point" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.cksli')" prop="quantity" align="center" min-width="150px"/>
            <!-- <el-editable-column prop="salePrice" align="center" :label="$t('updates.lsj')" min-width="150px"/> -->
            <!-- <el-editable-column prop="costPrice" align="center" :label="$t('updates.cbj')" min-width="150px"/> -->
            <!-- <el-editable-column prop="costMoney" align="center" label="成本金额" min-width="150px"/> -->
            <el-editable-column :label="$t('updates.ckj')" prop="taxPrice" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.slv')" prop="taxRate" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.se')" prop="taxMoney" align="center" min-width="150px"/>
            <!-- <el-editable-column prop="money" align="center" :label="$t('Hmodule.je')" min-width="150px"/> -->
            <el-editable-column :label="$t('updates.ckje')" prop="includeTaxCostMoney" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.cklv')" prop="discount" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.cke')" prop="discountMoney" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.cjbm')" prop="carCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.dcbm')" prop="batteryCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.djbm')" prop="motorCode" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-bottom: 30px">
        <div ref="fuzhu" class="form-name" >{{ $t('updates.hcmx') }}</div>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <my-detail :control.sync="control" :personalform="personalForm" @product="productdetail"/>
          <el-button @click="handleAddpackage">{{ $t('otherlanguage.xztc') }}</el-button>
          <my-package :packagecontrol.sync="packagecontrol" :productnumber.sync="productnumber" :packagerepository.sync="packagerepository" @packagedata="packagedata" @ismanla="ismanla"/>
          <el-button type="danger" @click="$refs.editable2.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        </div>
        <div class="container">
          <el-editable
            ref="editable2"
            :data.sync="list3"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules2"
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.hw')" prop="location" align="center" min-width="150">
              <template slot-scope="scope">
                <p>{{ getLocationData(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-select v-if="scope.row.batch !== '不使用'" v-model="scope.row.batch" :value="scope.row.batch" :placeholder="$t('Hmodule.xcpc')" filterable clearable style="margin-left: 18px;width: 100%;margin-bottom: 0" >
                  <el-option
                    v-for="(item, index) in batchlist"
                    :key="index"
                    :value="item"
                    :label="item"/>
                </el-select>
                <span v-else>{{ scope.row.batch }}</span>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.wpfl')" prop="productCategoryName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.jxf')" prop="kpiGrade" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.spjf')" prop="point" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.cksli')" prop="quantity" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  v-if="isEdit3(scope.row)"
                  :precision="6"
                  :controls="false"
                  :min="1.00"
                  v-model="scope.row.quantity"
                  @change="queryStock(scope.row)"
                />
                <!-- <el-input v-if="isEdit2(scope.row)" v-model="personalForm.carCode" clearable/> -->
                <span v-else>{{ scope.row.quantity }}</span>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.ckj')" prop="taxPrice" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ckje')" prop="includeTaxCostMoney" align="center" min-width="170">
              <template slot-scope="scope">
                <p>{{ getincludeTaxCostMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.sl')" prop="taxRate" align="center" min-width="170">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="6"
                  :controls="false"
                  v-model="scope.row.taxRate"
                  @input="gettaxRate(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.se')" prop="taxMoney" align="center" min-width="150px"/>
            <!--            <el-editable-column :label="$t('updates.zko')" prop="discount" align="center" min-width="150px"/>-->
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.ckl')" prop="discount" align="center" min-width="170">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="6"
                  :controls="false"
                  v-model="scope.row.discount"
                  disable
                  @change="getdiscountRate(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.cke')" prop="discountMoney" align="center" min-width="170">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="6"
                  :controls="false"
                  v-model="scope.row.discountMoney"
                  @change="getdiscountMoney(scope.row, $event, scope)"
                  @input="notundefined(scope.row)"/>
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
                <el-input v-if="isEdit4(scope.row)" v-model="scope.row.batteryCode" clearable @blur="getInfo2(scope.row)"/>
                <span v-else>{{ scope.row.batteryCode }}</span>
              </template>
            </el-editable-column>

            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('tongyo.chargeCode')" prop="chargeCode" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input v-model="scope.row.chargeCode" clearable/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('tongyo.controlCode')" prop="controlCode" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input v-model="scope.row.controlCode" clearable/>
              </template>
            </el-editable-column>
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">

        <el-button :loading="saveLoading" type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { createsaleOut, getCustomerOutCount, checkInvoiceExist } from '@/api/SaleOut'
import { searchRoleDiscount } from '@/api/BasicSettings'
import '@/directive/noMoreClick/index.js'
import { addReturnExchange } from '@/api/ReturnExchange'
import { getdeptlist } from '@/api/EmployeeInformation'
import { getlocation, locationlist, countlist, batchlist, productlist, getAllBatch, vehicleInfo } from '@/api/public'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MyCustomer from './components/MyCustomer'
import MyAgent from './components/MyAgent'
import MySaleout from './components/MySaleout'
import MyRepository from './components/MyRepository'
import MyMove from './components/MyMove'
import MyPackage from './components/MyPackage'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  name: 'AddReturnExchange',
  components: { MyMove, MyRepository, MySaleout, MyAgent, MyCustomer, MyDetail, MyEmp, MyPackage },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(this.supplierId)
      if (this.handlePersonId === undefined || this.handlePersonId === null || this.handlePersonId === '') {
        callback(new Error('please select handlePerson'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(this.supplierId)
      if (this.customerId === undefined || this.customerId === null || this.customerId === '') {
        callback(new Error('please select customer'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (this.personalForm.sourceNumber === undefined || this.personalForm.sourceNumber === null || this.personalForm.sourceNumber === '') {
        callback(new Error('please select sourceNumber'))
      } else {
        callback()
      }
    }
    const validatePass4 = (rule, value, callback) => {
      if (this.repositoryId === undefined || this.repositoryId === null || this.repositoryId === '') {
        callback(new Error('please select branch'))
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
      pickerOptions2: {
        disabledDate: (time) => {
          const _now = Date.now()
          const seven = 60 * 24 * 60 * 60 * 1000
          const sevenDays = _now - seven
          return time.getTime() > _now || time.getTime() < sevenDays
        }
      },
      talbeKey: 1,
      saleOutData: {},
      saveLoading: false,
      moreaction: [],
      productnumber: null,
      packagerepository: null,
      batchlist: [],
      packagecontrol: false,
      // 货位数据
      locationlist: [],
      // 控制换出明细商品
      control: false,
      // 源单带出数据是否可以编辑
      Issource: false,
      // 回显仓库
      repositoryId: this.$store.getters.repositoryName,
      // 控制调拨单
      storagemovecontrol: false,
      // 回显客姓名
      customerId: '',
      // 控制仓库
      repositorycontrol: false,
      // 控制客户
      customercontrol: false,
      // 控制经销商
      agentcontrol: false,
      // 控制销售出库单
      saleoutcontrol: false,
      // 回显换货人
      handlePersonId: this.$store.getters.name,
      // 控制换货人
      stockControl: false,
      // 部门列表
      depts: [],
      // 配送单信息数据
      personalForm: {
        handlePersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        customerType: '2',
        exchangeDate: null,
        stat: '1',
        diffMoney: '0.00',
        sourceMoney: '0.00',
        isManila: 2,
        saleType: ''
      },
      // 配送单规则数据
      personalrules: {
        nowFirst: [
          { required: true, message: 'please input nowFirst', trigger: 'blur' }
        ],
        invoiceNumber: [
          { required: true, message: 'please input invoiceNumber', trigger: 'blur' }
        ],
        diffMoney: [
          { required: true, message: 'please input actialdiffermoney：', trigger: 'blur' }
        ],
        title: [
          { required: true, message: 'please input title', trigger: 'blur' }
        ],
        sourceType: [
          { required: true, message: 'please select sourceType', trigger: 'change' }
        ],
        handlePersonId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        sourceNumber: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        exchangeDate: [
          { required: true, message: 'please select exchangeDate', trigger: 'change' }
        ],
        deliverDept: [
          { required: true, message: 'please select deliverDept', trigger: 'change' }
        ],
        customerType: [
          { required: true, message: 'please select customerType', trigger: 'change' }
        ],
        customerId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        customerPhone: [
          { required: true, message: 'please select customerPhone', trigger: 'blur' }
        ],
        shouldMoney: [
          { required: true, message: 'please input shouldMoney', trigger: 'blur' }
        ],
        repositoryId: [
          { required: true, validator: validatePass4, trigger: 'change' }
        ]
      },
      // 订单明细数据
      list2: [],
      // 明细列表规则
      validRules: {
      },
      list3: [],
      validRules2: {
      }
    }
  },
  watch: {
    list2: {
      handler() {
        let num1 = 0
        let num2 = 0
        for (const i in this.list2) {
          num1 += this.list2[i].taxPrice * this.list2[i].quantity - this.list2[i].discountMoney
        }
        for (const i in this.list3) {
          num2 += this.list3[i].taxPrice * this.list3[i].quantity - this.list3[i].discountMoney
        }
        console.log('num1', num1)
        console.log('num2', num2)

        this.personalForm.shouldMoney = (num2 - Number(this.saleOutData.shouldMoney)).toFixed(6)
        this.personalForm.diffMoney = (num2 - Number(this.saleOutData.shouldMoney)).toFixed(6)

        // if (this.personalForm.saleType === '1') {
        //   this.personalForm.shouldMoney = (num2 - num1).toFixed(6)
        //   this.personalForm.diffMoney = (num2 - num1).toFixed(6)
        // } else if (this.personalForm.saleType === '2') {
        //   this.personalForm.shouldMoney = 0 - Number(this.saleOutData.shouldMoney)
        //   this.personalForm.diffMoney = 0 - Number(this.saleOutData.shouldMoney)
        // }
      },
      deep: true,
      immediate: true
    },
    list3: {
      handler() {
        let num1 = 0
        let num2 = 0
        for (const i in this.list2) {
          num1 += this.list2[i].taxPrice * this.list2[i].quantity - this.list2[i].discountMoney
        }
        for (const i in this.list3) {
          num2 += this.list3[i].taxPrice * this.list3[i].quantity - this.list3[i].discountMoney
        }
        console.log('list3', this.list3)
        console.log('num1', num1)
        console.log('num2', num2)
        this.personalForm.shouldMoney = (num2 - Number(this.saleOutData.shouldMoney)).toFixed(6)
        this.personalForm.diffMoney = (num2 - Number(this.saleOutData.shouldMoney)).toFixed(6)

        // if (this.personalForm.saleType === '1') {
        //   this.personalForm.shouldMoney = (num2 - Number(this.saleOutData.shouldMoney)).toFixed(6)
        //   this.personalForm.diffMoney = (num2 - Number(this.saleOutData.shouldMoney)).toFixed(6)
        // } else if (this.personalForm.saleType === '2') {
        //   this.personalForm.shouldMoney = this.saleOutData.shouldMoney

        //   this.personalForm.diffMoney = this.saleOutData.shouldMoney
        // }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getdatatime()
    this.getnationlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    changeFirst(val) {
      console.log('val', val)
      this.$nextTick(() => {
        if (this.personalForm.saleType === '2') {
        // this.$set(this.personalForm, 'sourceMoney', this.personalForm.shouldMoney)
          this.personalForm.shouldMoney = val - Number(this.personalForm.sourceMoney)
          this.personalForm.diffMoney = val - Number(this.personalForm.sourceMoney)
        }
      })
    },
    /**
     *
     * @param val 改变数据
     */
    handleChangeSaleType(val) {
      console.log('val', val)
      console.log('this.personalForm.saleOutData', this.saleOutData)
      if (this.saleOutData.saleType === 2 && val === '1') {
        this.$set(this.personalForm, 'sourceMoney', this.saleOutData.shouldMoney)
        this.personalForm.shouldMoney = 0 - Number(this.saleOutData.shouldMoney)
        this.personalForm.diffMoney = 0 - Number(this.saleOutData.shouldMoney)
      } else if (this.saleOutData.saleType === 2 && val === '2') {
        this.$set(this.personalForm, 'sourceMoney', this.saleOutData.shouldMoney)
        this.personalForm.shouldMoney = 0 - Number(this.saleOutData.shouldMoney)
        this.personalForm.diffMoney = 0 - Number(this.saleOutData.shouldMoney)
        this.personalForm.nowFirst = 0
      }
    },
    // 批量操作
    handleSelectionChange(val) {
      console.log(val)
      this.moreaction = val
    },
    judgeinvoce() {
      console.log('this.$store.getters.countryId', this.$store.getters.countryId)
      console.log('this.personalForm.invoiceNumber', this.personalForm.invoiceNumber)
      if (!this.personalForm.invoiceNumber) {
        return
      }
      checkInvoiceExist(this.personalForm.invoiceNumber, this.personalForm.repositoryId).then(res => {
        if (res.data.ret === 200) {
          if (res.data.data.content === true) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('update4.fphcf'),
              offset: 100
            })
            this.personalForm.invoiceNumber = null
          }
        }
      })
    },
    // 判断整车或者电池
    isEdit4(row) {
      console.log('222', row)
      const re = row.productCode.slice(0, 2)
      if (re === '01' || re === '05') { return true } else { return false }
    },
    getincludeTaxCostMoney(row) {
      row.includeTaxCostMoney = Number(row.salePrice * row.quantity) + Number(row.taxMoney)
      row.includeTaxMoney = Number(row.salePrice * row.quantity) + Number(row.taxMoney)
      return row.includeTaxCostMoney
    },
    getInfo(row) {
      console.log(row)
      if (row.carCode !== null && row.carCode !== '' && row.carCode !== undefined) {
        const param = {}
        param.carCode = row.carCode
        vehicleInfo(param).then(res => {
          if (res.data.ret === 200) {
            console.log('res.data.data.content', res.data.data.content)
            if (res.data.data.content !== null) {
              row.carCode = res.data.data.content.carCode
              row.batteryCode = res.data.data.content.batteryCode
              row.motorCode = res.data.data.content.motorCode
              row.snCode = res.data.data.content.snCode
            }
          } else {
            this.$notify.error({
              title: 'wrong',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      }
    },
    getInfo2(row) {
      console.log(row)
      if (row.batteryCode !== null && row.batteryCode !== '' && row.batteryCode !== undefined) {
        const param = []
        param.batteryCode = row.batteryCode
        vehicleInfo(param).then(res => {
          if (res.data.ret === 200) {
            console.log('res.data.data.content', res.data.data.content)
            if (res.data.data.content !== null) {
              row.carCode = res.data.data.content.carCode
              row.batteryCode = res.data.data.content.batteryCode
              row.motorCode = res.data.data.content.motorCode
              row.snCode = res.data.data.content.snCode
            }
          } else {
            this.$notify.error({
              title: 'wrong',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      }
    },
    getInfo3(row) {
      console.log(row)
      if (row.motorCode !== null && row.motorCode !== '' && row.motorCode !== undefined) {
        const param = []
        param.motorCode = row.motorCode
        vehicleInfo(param).then(res => {
          if (res.data.ret === 200) {
            console.log('res.data.data.content', res.data.data.content)
            if (res.data.data.content !== null) {
              row.carCode = res.data.data.content.carCode
              row.batteryCode = res.data.data.content.batteryCode
              row.motorCode = res.data.data.content.motorCode
              row.snCode = res.data.data.content.snCode
            }
          } else {
            this.$notify.error({
              title: 'wrong',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      }
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
    notundefined(row) {
      if (row.discount === undefined) {
        this.$set(row, 'discount', 0)
      }
      if (row.discountMoney === undefined) {
        this.$set(row, 'discountMoney', 0)
      }
    },
    // 通过折扣额计算折扣
    getdiscountMoney(row, val, scope) {
      console.log(row)
      // if (row.taxprice !== 0 && row.quantity !== 0 && row.discountMoney !== 0) {
      //   if (row.includeTaxCostMoney !== 0) {
      //     row.discount = (((row.discountMoney / row.includeTaxCostMoney)) * 100).toFixed(6)
      //   } else {
      //     row.discount = 0
      //   }
      // }
      console.log('row', row)
      const re = row.productCode.slice(0, 2)
      if (re === '01') {
        const discountparms = {
          typeId: row.type,
          roleId: this.$store.getters.roleId,
          category: 1,
          pageNum: 1,
          pageSize: 1
        }
        searchRoleDiscount(discountparms).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.list.length === 0) {
              row.discountMoney = 0
              row.discount = 0
              this.$notify.error({
                title: 'wrong',
                message: this.$t('tongyo.cgzdzke'),
                offset: 100
              })
            } else {
              const isoverdiscount = val / row.quantity
              if (res.data.data.content.list[0].discountMoney < isoverdiscount) {
                row.discountMoney = 0
                row.discount = 0
                this.$notify.error({
                  title: 'wrong',
                  message: this.$t('tongyo.cgzdzke'),
                  offset: 100
                })
              } else {
                if (row.taxprice !== 0 && row.quantity !== 0 && row.discountMoney !== 0 && row.includeTaxCostMoney !== 0) {
                  row.discount = (((isoverdiscount / row.includeTaxCostMoney)) * 100).toFixed(6)
                } else {
                  row.discountMoney = 0
                  row.discount = 0
                }
              }
            }
          }
        })
      } else {
        const discountparms = {
          roleId: this.$store.getters.roleId,
          category: 2,
          pageNum: 1,
          pageSize: 1
        }
        searchRoleDiscount(discountparms).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.list.length === 0) {
              row.discountMoney = 0
              row.discount = 0
              this.$notify.error({
                title: 'wrong',
                message: this.$t('tongyo.cgzdzke'),
                offset: 100
              })
            } else {
              const isoverdiscount = res.data.data.content.list[0].discount * row.includeTaxCostMoney
              console.log('isoverdiscount', isoverdiscount)
              console.log('val', val)

              if (isoverdiscount < val) {
                row.discountMoney = 0
                row.discount = 0
                this.$notify.error({
                  title: 'wrong',
                  message: this.$t('tongyo.cgzdzke'),
                  offset: 100
                })
              }
              if (row.taxprice !== 0 && row.quantity !== 0 && row.discountMoney !== 0 && row.includeTaxCostMoney !== 0) {
                row.discount = (((val / row.includeTaxCostMoney)) * 100).toFixed(6)
              } else {
                row.discountMoney = 0
                row.discount = 0
              }
            }
          }
        })
      }
    },
    // 通过折扣计算折扣额
    getdiscountRate(row) {
      if (row.discount === 0) {
        row.discountMoney = 0
      } else {
        row.discountMoney = (row.taxprice * row.quantity * (row.discount / 100)).toFixed(6)
      }
    },
    // 通过税率计算含税价
    gettaxRate(row) {
      if (row.taxprice !== 0) {
        row.taxprice = (row.salePrice * (1 + row.taxRate / 100)).toFixed(6)
        row.discountMoney = row.includeTaxCostMoney * row.discount
      }
      if (row.discount === 0) {
        row.discountMoney = 0
      } else {
        row.discountMoney = (row.taxprice * row.quantity * (row.discount / 100)).toFixed(6)
      }
    },
    queryStock(row) {
      console.log('row', row)
      if (row.location === null || row.location === '' || row.location === undefined) {
        console.log('1222222200--------------')
        this.$notify.error({
          title: 'wrong',
          message: 'branch donnot have stock',
          offset: 100
        })
        row.quantity = 1
        return false
      }
      // 1.批次只有一个 不能超过总库存
      // 2.批次有多个 不能超过单个批次数量
      let i = 0
      const EnterDetail = this.$refs.editable.getRecords()
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.productCode === row.productCode) {
          i++
        }
      })
      if (i === 1) {
        // 1.批次只有一个 不能超过总库存
        countlist(this.personalForm.repositoryId, 0, row.productCode).then(res => {
          if (res.data.ret === 200) {
            console.log('res.data.data.content', res.data.data.content)
            if (res.data.data.content.list.length === 0) {
              this.$notify.error({
                title: 'wrong',
                message: 'branch donnot have stock',
                offset: 100
              })
              row.quantity = 1
              return false
            }
            if (row.quantity > res.data.data.content.list[0].existStock) {
              this.$notify.error({
                title: 'wrong',
                message: this.$t('prompt.qsrzqdsjh'),
                offset: 100
              })
              row.quantity = 1
              return false
            }
          } else {
            this.$notify.error({
              title: 'wrong',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      } else {
        // 2.批次有多个 不能超过单个批次数量
        const param = {}
        param.productCode = row.productCode
        param.batch = row.batch
        param.repositoryId = row.repositoryId
        getAllBatch(param).then(res => {
          if (res.data.ret === 200) {
            console.log('res.data.data.content', res.data.data.content)
            if (row.quantity > res.data.data.content[0].quantity) {
              this.$notify.error({
                title: 'wrong',
                message: this.$t('prompt.ckslcgpcsl'),
                offset: 100
              })
              row.quantity = 1
              return false
            }
          } else {
            this.$notify.error({
              title: 'wrong',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      }

      if (row.discount === 0) {
        row.discountMoney = 0
      } else {
        row.discountMoney = (row.taxprice * row.quantity * (row.discount / 100)).toFixed(6)
      }
    },
    isEdit3(row) {
      console.log('222', row)
      const re = row.productCode.slice(0, 2)
      if (re === '01') { return false } else { return true }
    },
    getLocationData(row) {
      // 默认批次
      if (row.batch === null || row.batch === '' || row.batch === undefined) {
        const parms3 = row.productCode
        batchlist(this.personalForm.repositoryId, parms3).then(res => {
          console.log(res)
          if (res.data.data.content.length > 0) {
            row.batch = res.data.data.content[0]
          }
        })
      } else {
        const parms3 = row.productCode
        batchlist(this.personalForm.repositoryId, parms3).then(res => {
          if (res.data.data.content.length === 0) {
            if (row.batch !== '不使用') {
              row.batch = null
            }
          }
        })
      }
      // 默认货位
      getlocation(this.personalForm.repositoryId, row).then(res => {
        if (res.data.ret === 200) {
          console.log('res', res)
          if (res.data.data.content.length !== 0) {
            row.location = res.data.data.content[0].locationCode
            row.locationId = res.data.data.content[0].id
            console.log('row.locationId', row.locationId)
          } else {
            row.location = null
            row.locationId = null
          }
        }
      })
      return row.location
    },
    ismanla(val) {
      console.log('val123', val)
      this.personalForm.isManila = val[0].isManila
    },
    packagedata(val) {
      this.$refs.editable2.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable2.insert(val[i])
      }
    },
    handleAddpackage() {
      console.log('this.moreaction', this.moreaction)
      if (this.moreaction.length > 1 || this.moreaction.length === 0) {
        this.$notify.error({
          title: 'please select main product',
          message: 'please select main product',
          offset: 100
        })
      } else {
        this.productnumber = this.moreaction[0].productCode
        this.packagerepository = String(this.personalForm.repositoryId)
        this.packagecontrol = true
      }
    },
    updatebatch(event, scope) {
      if (event === true) {
        console.log(this.personalForm.repositoryId)
        if (this.personalForm.repositoryId === undefined || this.personalForm.repositoryId === '') {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.sqslcg'),
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.repositoryId, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
              scope.row.locationId = res.data.data.content[0].id
            } else if (res.data.data.content.length === 0) {
              locationlist(this.personalForm.repositoryId).then(res => {
                if (res.data.ret === 200) {
                  this.locationlist = res.data.data.content.list
                }
              })
            }
          }
        })
      }
    },
    // 换出明细添加商品
    handleAddproduct() {
      if (this.personalForm.repositoryId === undefined || this.personalForm.repositoryId === '') {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.sqslcg'),
          offset: 100
        })
        return false
      }
      this.control = true
    },
    productdetail(val) {
      console.log('12312312', val)
      const nowlistdata = this.$refs.editable2.getRecords()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable2.insert(val[i])
      }
      const nowlistdata1 = this.$refs.editable.getRecords()
      const nowlistdata2 = this.$refs.editable2.getRecords()

      const money1 = this.personalForm.sourceMoney
      let money2 = 0
      console.log('nowlistdata1', nowlistdata1)
      // for (let i = 0; i < nowlistdata1.length; i++) {
      //   money1 = money1 + (nowlistdata1[i].includeTaxCostMoney - nowlistdata1[i].discountMoney)
      //   console.log('includeTaxCostMoney', nowlistdata1[i].includeTaxCostMoney)
      // }
      for (let i = 0; i < nowlistdata2.length; i++) {
        money2 = money2 + ((nowlistdata2[i].taxPrice * nowlistdata2[i].quantity) - nowlistdata2[i].discountMoney)
      }
      // console.log('money1', money1)
      // console.log('money2', money2)
      this.personalForm.diffMoney = (money1 - money2).toFixed(6)
    },
    chooserep() {
      this.repositorycontrol = true
    },
    // 仓库列表focus事件触发
    repositoryname(val) {
      this.repositoryId = val.repositoryName
      this.personalForm.repositoryId = val.id
    },
    // 选择要货方时清理
    clearrequire() {
      this.requireId = ''
      this.personalForm.requireId = ''
    },
    // 选择源单时清理
    clearnumber() {
      this.personalForm.sourceNumber = ''
      this.deliverPersonId = ''
    },
    // 选择客户focus
    chooseCustomer() {
      if (this.personalForm.customerType === '1') {
        this.agentcontrol = true
      } else if (this.personalForm.customerType === '2') {
        this.customercontrol = true
      }
    },
    customerdata(val) {
      console.log(val)
      this.personalForm.customerId = val.id
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.phoneNumber
    },
    agentdata(val) {
      console.log(val)
      this.personalForm.customerId = val.id
      this.customerId = val.agentName
    },
    // 选择源单编号
    opensaleout() {
      this.saleoutcontrol = true
    },
    // 源单类型为销售出库单时
    saleOutDetail(val) {
      console.log('saleout data', val)
      this.list2 = val
      this.talbeKey = Math.random()
      // this.$refs.editable.clear()
      // for (let i = 0; i < val.length; i++) {
      //   this.$refs.editable.insert(val[i])
      // }
    },
    saleOutdata(val) {
      console.log(val)
      this.saleOutData = val
      // this.personalForm.isManila = val.isManila
      this.personalForm.applyNumber = val.applyNumber
      this.personalForm.sourceNumber = val.number
      this.personalForm.customerType = String(val.customerType)
      this.personalForm.saleType = String(val.saleType)
      if (this.personalForm.saleType === '1') {
        this.personalForm.sourceMoney = val.allIncludeTaxMoney
        this.personalForm.diffMoney = val.allIncludeTaxMoney
      } else if (this.personalForm.saleType === '2') {
        this.personalForm.sourceMoney = val.shouldMoney
        this.personalForm.diffMoney = val.shouldMoney
        this.personalForm.nowFirst = val.shouldMoney
      }
      this.Issource = true
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.phoneNumber
      this.personalForm.customerId = val.customerId

      // this.personalForm.sourceMoney = val.actualMoney
      this.repositoryId = val.saleRepositoryName
      this.personalForm.repositoryId = val.saleRepositoryId
    },
    // 源单为调拨单
    StoragemoveDetail(val) {
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    Storagemovedata(val) {
      this.personalForm.sourceNumber = val.moveNumber
    },
    // 部门列表
    getnationlist() {
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        } else {
          console.log('部门列表出错')
        }
      })
    },
    // 补充月份和日子的0
    getzero(obj) {
      if (obj < 10) return '0' + '' + obj
      else return obj
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
      this.personalForm.exchangeDate = currentdate
    },
    // 配送员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 配送员回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        handlePersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        customerType: '2',
        exchangeDate: null,
        stat: '1',
        isManila: 2,
        saleType: '',
        diffMoney: '0.00',
        shouldMoney: '0.00'

      }
      this.customerId = ''
      this.Issource = false
      this.handlePersonId = this.$store.getters.name
      this.repositoryId = this.$store.getters.repositoryName
    },
    // 保存操作
    handlesave() {
      this.saveLoading = true

      setTimeout(() => {
        const EnterDetail = this.$refs.editable.getRecords()
        EnterDetail.map(function(elem) {
          return elem
        }).forEach(function(elem) {
          if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
            delete elem.productCode
          }
          if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
            delete elem.productName
          }
          if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
            delete elem.typeId
          }
          if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
            delete elem.unit
          }
          if (elem.color === null || elem.color === '' || elem.color === undefined) {
            delete elem.color
          }
          if (elem.batch === null || elem.batch === '' || elem.batch === undefined) {
            delete elem.batch
          }
          if (elem.category === null || elem.category === '' || elem.category === undefined) {
            delete elem.category
          }
          if (elem.type === null || elem.type === '' || elem.type === undefined) {
            delete elem.type
          }
          if (elem.kpiGrade === null || elem.kpiGrade === '' || elem.kpiGrade === undefined) {
            delete elem.kpiGrade
          }
          if (elem.point === null || elem.point === '' || elem.point === undefined) {
            delete elem.point
          }
          if (elem.salePrice === null || elem.salePrice === '' || elem.salePrice === undefined) {
            delete elem.salePrice
          }
          if (elem.costPrice === null || elem.costPrice === '' || elem.costPrice === undefined) {
            delete elem.costPrice
          }
          if (elem.costMoney === null || elem.costMoney === '' || elem.costMoney === undefined) {
            delete elem.costMoney
          }
          if (elem.includeTaxMoney === null || elem.includeTaxMoney === '' || elem.includeTaxMoney === undefined) {
            delete elem.includeTaxMoney
          }
          if (elem.taxRate === null || elem.taxRate === '' || elem.taxRate === undefined) {
            delete elem.taxRate
          }
          if (elem.taxMoney === null || elem.taxMoney === '' || elem.taxMoney === undefined) {
            delete elem.taxMoney
          }
          if (elem.money === null || elem.money === '' || elem.money === undefined) {
            delete elem.money
          }
          if (elem.includeTaxCostMoney === null || elem.includeTaxCostMoney === '' || elem.includeTaxCostMoney === undefined) {
            delete elem.includeTaxCostMoney
          }
          if (elem.discount === null || elem.discount === '' || elem.discount === undefined) {
            delete elem.discount
          }
          if (elem.discountMoney === null || elem.discountMoney === '' || elem.discountMoney === undefined) {
            delete elem.discountMoney
          }
          if (elem.quantity === null || elem.quantity === '' || elem.quantity === undefined) {
            delete elem.quantity
          }
          if (elem.carCode === null || elem.carCode === '' || elem.carCode === undefined) {
            delete elem.carCode
          }
          if (elem.motorCode === null || elem.motorCode === '' || elem.motorCode === undefined) {
            delete elem.motorCode
          }
          if (elem.batteryCode === null || elem.batteryCode === '' || elem.batteryCode === undefined) {
            delete elem.batteryCode
          }
          if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
            delete elem.locationId
          }
          return elem
        })
        const EnterDetail2 = this.$refs.editable2.getRecords()
        EnterDetail2.map(function(elem) {
          return elem
        }).forEach(function(elem) {
          if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
            delete elem.productCode
          }
          if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
            delete elem.productName
          }
          if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
            delete elem.typeId
          }
          if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
            delete elem.unit
          }
          if (elem.color === null || elem.color === '' || elem.color === undefined) {
            delete elem.color
          }
          if (elem.batch === null || elem.batch === '' || elem.batch === undefined) {
            delete elem.batch
          }
          if (elem.category === null || elem.category === '' || elem.category === undefined) {
            delete elem.category
          }
          if (elem.type === null || elem.type === '' || elem.type === undefined) {
            delete elem.type
          }
          if (elem.kpiGrade === null || elem.kpiGrade === '' || elem.kpiGrade === undefined) {
            delete elem.kpiGrade
          }
          if (elem.point === null || elem.point === '' || elem.point === undefined) {
            delete elem.point
          }
          if (elem.salePrice === null || elem.salePrice === '' || elem.salePrice === undefined) {
            delete elem.salePrice
          }
          if (elem.costPrice === null || elem.costPrice === '' || elem.costPrice === undefined) {
            delete elem.costPrice
          }
          if (elem.costMoney === null || elem.costMoney === '' || elem.costMoney === undefined) {
            delete elem.costMoney
          }
          if (elem.includeTaxMoney === null || elem.includeTaxMoney === '' || elem.includeTaxMoney === undefined) {
            delete elem.includeTaxMoney
          }
          if (elem.taxRate === null || elem.taxRate === '' || elem.taxRate === undefined) {
            delete elem.taxRate
          }
          if (elem.taxMoney === null || elem.taxMoney === '' || elem.taxMoney === undefined) {
            delete elem.taxMoney
          }
          if (elem.money === null || elem.money === '' || elem.money === undefined) {
            delete elem.money
          }
          if (elem.includeTaxCostMoney === null || elem.includeTaxCostMoney === '' || elem.includeTaxCostMoney === undefined) {
            delete elem.includeTaxCostMoney
          }
          if (elem.discount === null || elem.discount === '' || elem.discount === undefined) {
            delete elem.discount
          }
          if (elem.discountMoney === null || elem.discountMoney === '' || elem.discountMoney === undefined) {
            delete elem.discountMoney
          }
          if (elem.quantity === null || elem.quantity === '' || elem.quantity === undefined) {
            delete elem.quantity
          }
          if (elem.carCode === null || elem.carCode === '' || elem.carCode === undefined) {
            delete elem.carCode
          }
          if (elem.motorCode === null || elem.motorCode === '' || elem.motorCode === undefined) {
            delete elem.motorCode
          }
          if (elem.batteryCode === null || elem.batteryCode === '' || elem.batteryCode === undefined) {
            delete elem.batteryCode
          }
          if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
            delete elem.locationId
          }
          return elem
        })
        let m = 1
        let b = 1
        EnterDetail2.map(function(elem) {
          return elem
        }).forEach(function(elem) {
          const re = elem.productCode.slice(0, 2)
          if (re === '01') {
            if (elem.carCode === null || elem.carCode === undefined || elem.carCode === '' || elem.motorCode === null || elem.motorCode === undefined || elem.motorCode === '') {
              m = 2
            }
          }
        })
        EnterDetail2.map(function(elem) {
          return elem
        }).forEach(function(elem) {
          const re = elem.productCode.slice(0, 2)
          if (re === '05') {
            if (elem.batteryCode === null || elem.batteryCode === undefined || elem.batteryCode === '') {
              b = 2
            }
          }
        })
        if (m === 2) {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.zcckytbm'),
            offset: 100
          })
          this.saveLoading = false
          return false
        }
        if (b === 2) {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.dcckytbm'),
            offset: 100
          })
          this.saveLoading = false

          return false
        }
        const parms2 = JSON.stringify(EnterDetail)
        const parms3 = JSON.stringify(EnterDetail2)
        const Data = this.personalForm
        for (const key in Data) {
          if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
            delete Data[key]
          }
        }
        const parms = JSON.stringify(Data)
        this.$refs.personalForm.validate((valid) => {
          if (valid) {
            addReturnExchange(parms, parms2, parms3, this.personalForm).then(res => {
              console.log(res)
              if (res.data.ret === 200) {
                this.$notify({
                  title: 'successful',
                  message: 'save successful',
                  type: 'success',
                  offset: 100
                })
                this.restAllForm()
                this.$refs.editable.clear()
                this.$refs.editable2.clear()
                this.$refs.personalForm.clearValidate()
                this.$refs.personalForm.resetFields()
              } else {
                this.$notify.error({
                  title: 'wrong',
                  message: res.data.msg,
                  offset: 100
                })
              }
              this.saveLoading = false
            })
          } else {
            this.$notify.error({
              title: 'wrong',
              message: 'Information is incomplete',
              offset: 100
            })
            this.saveLoading = false

            return false
          }
        })
      }, 1000)
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      this.saveLoading = false
      const view = { path: '/ReturnExchange/AddReturnExchange', name: 'AddReturnExchange', fullPath: '/ReturnExchange/AddReturnExchange', title: 'AddReturnExchange' }
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
  }
</style>
