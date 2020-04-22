<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card :body-style="{ padding: '5px' }" class="box-card" shadow="never">
        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('StockInquiry.supplierId')" prop="supplierId" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="supplierId" size="mini" style="margin-left: 18px;width: 200px" @focus="handlechoose"/>
                  <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInquiry.inquiryPersonId')" prop="inquiryPersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="inquiryPersonId" size="mini" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInquiry.inquiryTitle')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="personalForm.inquiryTitle" size="mini" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInquiry.sourceType')" prop="sourceType" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-select v-model="personalForm.sourceType" size="mini" style="margin-left: 18px;width: 200px" @change="chooseType">
                    <el-option value="1" label="采购申请" />
                    <el-option value="2" label="采购计划" />
                    <el-option value="3" label="无来源" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInquiry.stockTypeId')" prop="stockTypeId" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-select v-model="personalForm.stockTypeId" size="mini" style="margin-left: 18px;width: 200px" @focus="updatecountry">
                    <el-option
                      v-for="(item, index) in types"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInquiry.deptId')" prop="deptId" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-select v-model="personalForm.deptId" clearable size="mini" style="margin-left: 18px;width: 200px">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInquiry.inquiryDate')" prop="inquiryDate" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-date-picker
                    v-model="personalForm.inquiryDate"
                    type="date"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInquiry.inquiryTimes')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="personalForm.inquiryTimes" disabled size="mini" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInquiry.isVat')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-radio-group v-model="personalForm.isVat" style="margin-left: 18px;width:200px">
                    <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                    <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOrder.currency')" prop="currency" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-select v-model="personalForm.currency" :disabled="IsCurrency" size="mini" style="margin-left: 18px;width: 200px" @change="changeRate">
                    <el-option value="1" label="PHP"/>
                    <el-option value="2" label="USD"/>
                    <el-option value="3" label="RMB"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Recycling.exchangeRate')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="personalForm.exchangeRate" size="mini" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card :body-style="{ padding: '5px' }" class="box-card" style="margin-top: 15px" shadow="never">
        <div ref="fuzhu" class="form-name" >{{ $t('updates.cgxjdmx') }}</div>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button :disabled="addpro" size="mini" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <my-detail :control.sync="control" :supp.sync="supp" @product="productdetail"/>
          <el-button :disabled="addsouce" size="mini" style="width: 130px" @click="handleAddSouce">{{ $t('updates.cydzxz') }}</el-button>
          <my-apply :applycontrol.sync="applycontrol" @apply="apply" @allapplyinfo="allapplyinfo"/>
          <my-plan :plancontrol.sync="plancontrol" :supp.sync="supp" @plan="plan" @allinfo="allinfo"/>
          <el-button type="danger" size="mini" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
          <el-button type="primary" size="mini" @click="checkStock()">{{ $t('updates.kckz') }}</el-button>
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
            size="small"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" fixed="left" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" fixed="left" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" fixed="left" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" fixed="left" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" fixed="left" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" fixed="left" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0.00, precision: 2}, type: 'visible'}" :label="$t('updates.jhsl')" prop="plannedQuantity" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :disabled="IsPlannedQuantity"
                  :precision="2"
                  :min="1"
                  v-model="scope.row.plannedQuantity"
                  @change="planquantity(scope)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElDatePicker', attrs: {type: 'date', format: 'yyyy-MM-dd'}, type: 'visible'}" :label="$t('updates.jhrq')" prop="planDeliveryDate" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.planDeliveryDate"
                  :disabled="IsPlannedQuantity"
                  type="date"
                  value-format="yyyy-MM-dd"
                  @change="plandelivery(scope)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 2}, type: 'visible'}" :label="$t('Hmodule.dj')" prop="price" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  v-model="scope.row.price"
                  @input="getprice(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.hsj')" prop="includeTaxPrice" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  v-model="scope.row.includeTaxPrice"
                  @input="getincludeTaxPrice(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.sl')" prop="taxRate" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  v-model="scope.row.taxRate"
                  @input="gettaxRate(scope.row)"
                  @change="taxrate(scope)"/>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('Hmodule.je')" prop="money" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.hsje')" prop="includeTaxMoney" align="center" min-width="170px">
              <template slot-scope="scope">
                <p>{{ getTaxMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.se')" prop="taxMoney" align="center" min-width="170px">
              <template slot-scope="scope">
                <p>{{ getTaxMoney2(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.ckl')" prop="discountRate" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  v-model="scope.row.discountRate"
                  @change="getdiscountRate(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.cke')" prop="discountMoney" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  v-model="scope.row.discountMoney"
                  @change="getdiscountMoney(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.bz')" prop="applicationReason" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ydbh')" prop="sourceNumber" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ydxh')" prop="sourceSerialNumber" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card :body-style="{ padding: '5px' }" class="box-card" shadow="never" style="margin-bottom:20px;">
        <div ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('updates.slhj')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="allNumber" size="mini" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('updates.hehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="allMoney" size="mini" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('updates.sehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="allTaxMoney" size="mini" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('updates.hsjehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="allIncludeTaxMoney" size="mini" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('updates.zkjehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="allDiscountMoney" size="mini" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('updates.zhhsjehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="allMoneyMoveDiscount" size="mini" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index:2000;">
        <el-button v-no-more-click type="primary" size="mini" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" size="mini" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
      <el-dialog :visible.sync="receiptVisible2" title="库存快照" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="    width: 500px;">
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                :data="list111"
                height="220"
                style="width: 100%;"
              >
                <el-table-column :resizable="false" :label="$t('updates.cangk')" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span >{{ scope.row.repositoryName }}</span>
                  </template>
                </el-table-column>
                <el-table-column :resizable="false" :label="$t('updates.spmc')" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span >{{ scope.row.productName }}</span>
                  </template>
                </el-table-column>
                <el-table-column :resizable="false" label="可用库存量" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span >{{ scope.row.ableStock }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { countlist, getRate } from '@/api/public'
import { createstockInquiry } from '@/api/StockInquiry'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
// import { productlist } from '@/api/public'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MySupplier from './components/MySupplier'
import MyApply from './components/MyApply'
import MyPlan from './components/MyPlan'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  name: 'AddStockInquiry',
  components: { MyPlan, MyApply, MySupplier, MyDetail, MyEmp },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(this.supplierId)
      if (this.supplierId === undefined || this.supplierId === null || this.supplierId === '') {
        callback(new Error('请选择供应商'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(this.supplierId)
      if (this.inquiryPersonId === undefined || this.inquiryPersonId === null || this.inquiryPersonId === '') {
        callback(new Error('请选择询价员'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(this.supplierId)
      if (this.personalForm.stockTypeId === undefined || this.personalForm.stockTypeId === null || this.personalForm.stockTypeId === '') {
        callback(new Error('请选择采购类别'))
      } else {
        callback()
      }
    }
    const validatePass4 = (rule, value, callback) => {
      console.log(this.supplierId)
      if (this.personalForm.deptId === undefined || this.personalForm.deptId === null || this.personalForm.deptId === '') {
        callback(new Error('请选择部门'))
      } else {
        callback()
      }
    }
    const checkRate = (rule, value, callback) => {
      console.log(value)
      if (value === 0 || value === '' || value === null || value === undefined) {
        callback(new Error('计划数量不能为0'))
      } else {
        callback()
      }
    }
    return {
      // 合计数据
      allNumber: '',
      allMoney: '',
      allTaxMoney: '',
      allIncludeTaxMoney: '',
      allDiscountMoney: '',
      allMoneyMoveDiscount: '',
      // 控制明细中计划数量是否可以编辑
      IsPlannedQuantity: false,
      // 控制采购类别是否可以编辑
      IsStockTypeId: false,
      IsCurrency: false,
      // 控制部门是否可以编辑
      IsDeptId: false,
      // 传递的部门id
      supp: null,
      // 控制源单为采购计划时
      plancontrol: false,
      // 控制源单为采购申请时
      applycontrol: false,
      // 控制添加商品按钮
      addpro: false,
      // 控制从源单中选择按钮
      addsouce: true,
      // 供应商回显
      supplierId: '',
      // 控制供应商
      empcontrol: false,
      // 选择的数据
      choosedata: [],
      // 部门数据
      depts: [],
      // 询价员回显
      inquiryPersonId: '',
      // 控制询价员
      stockControl: false,
      // 类别数据
      types: [],
      // 类别获取参数
      typeparms: {
        pagenum: 1,
        pagesize: 99999
      },
      // 控制商品列表窗口
      control: false,
      // 采购申请单信息数据
      personalForm: {
        deptId: this.$store.getters.deptId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        isVat: 1,
        inquiryTimes: 1,
        inquiryDate: null,
        sourceType: '3',
        currency: '1',
        exchangeRate: '1.0000'
      },
      // 采购申请单规则数据
      personalrules: {
        supplierId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        inquiryPersonId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        inquiryDate: [
          { required: true, message: '请选择询价日期', trigger: 'change' }
        ],
        deptId: [
          { required: true, validator: validatePass4, trigger: 'change' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        stockTypeId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ]
      },
      // 采购申请单明细数据
      list2: [],
      // 采购申请单明细列表规则
      validRules: {
        planDeliveryDate: [
          { required: true, message: '请选择交货日期', trigger: 'change' }
        ],
        plannedQuantity: [
          { required: true, validator: checkRate, trigger: 'blur' }
        ],
        includeTaxPrice: [
          { required: true, message: '请输入含税价', trigger: 'blur' }
        ],
        taxRate: [
          { required: true, message: '请输入税率', trigger: 'blur' }
        ]
      },
      receiptVisible2: false,
      list111: [],
      // 批量操作
      moreaction: []
    }
  },
  watch: {
    list2: {
      handler(oldval, newval) {
        console.log('list2', this.list2)
        let num1 = 0
        let num2 = 0
        let num3 = 0
        let num4 = 0
        let num5 = 0
        for (const i in this.list2) {
          num1 += Number(this.list2[i].plannedQuantity)
          num2 += Number(this.list2[i].money)
          num3 += Number(this.list2[i].taxMoney)
          num4 += Number(this.list2[i].includeTaxMoney)
          num5 += Number(this.list2[i].discountMoney)
        }
        this.allNumber = num1
        this.allMoney = num2
        this.allTaxMoney = num3
        this.allIncludeTaxMoney = num4
        this.allDiscountMoney = num5
        this.allMoneyMoveDiscount = num4 - num5
      },
      deep: true
    }

  },
  created() {
    this.getTypes()
    this.getdatatime()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    taxrate(scope) {
      if (scope.row !== '' && scope.row !== null && scope.row !== undefined && scope.$index === 0) {
        if (scope.row.taxRate !== '' && scope.row.taxRate !== null && scope.row.taxRate !== undefined) {
          for (let i = 0; i < this.list2.length; i++) {
            this.list2[i].temp = i
          }
          for (let i = scope.row.temp; i < this.list2.length; i++) {
            console.log(this.list2[i].requireDate)
            if (this.list2[i].taxRate !== null && this.list2[i].taxRate !== '' && this.list2[i].taxRate !== undefined) {
              // this.list2[i].requireDate = row.requireDate
              this.list2[i].taxRate = scope.row.taxRate
            } else {
              console.log(222)
              // this.list2[i].requireDate = row.requireDate
              this.list2[i].taxRate = scope.row.taxRate
            }
          }
          console.log(scope.row)
        }
      }
    },
    plandelivery(scope) {
      if (scope.row !== '' && scope.row !== null && scope.row !== undefined && scope.$index === 0) {
        if (scope.row.planDeliveryDate !== '' && scope.row.planDeliveryDate !== null && scope.row.planDeliveryDate !== undefined) {
          for (let i = 0; i < this.list2.length; i++) {
            this.list2[i].temp = i
          }
          for (let i = scope.row.temp; i < this.list2.length; i++) {
            console.log(this.list2[i].requireDate)
            if (this.list2[i].planDeliveryDate !== null && this.list2[i].planDeliveryDate !== '' && this.list2[i].planDeliveryDate !== undefined) {
              // this.list2[i].requireDate = row.requireDate
              this.list2[i].planDeliveryDate = scope.row.planDeliveryDate
            } else {
              console.log(222)
              // this.list2[i].requireDate = row.requireDate
              this.list2[i].planDeliveryDate = scope.row.planDeliveryDate
            }
          }
          console.log(scope.row)
        }
      }
    },
    planquantity(scope) {
      if (scope.row !== '' && scope.row !== null && scope.row !== undefined && scope.$index === 0) {
        if (scope.row.plannedQuantity !== '' && scope.row.plannedQuantity !== null && scope.row.plannedQuantity !== undefined) {
          for (let i = 0; i < this.list2.length; i++) {
            this.list2[i].temp = i
          }
          for (let i = scope.row.temp; i < this.list2.length; i++) {
            console.log(this.list2[i].requireDate)
            if (this.list2[i].plannedQuantity !== null && this.list2[i].plannedQuantity !== '' && this.list2[i].plannedQuantity !== undefined) {
              // this.list2[i].requireDate = row.requireDate
              this.list2[i].plannedQuantity = scope.row.plannedQuantity
            } else {
              console.log(222)
              // this.list2[i].requireDate = row.requireDate
              this.list2[i].plannedQuantity = scope.row.plannedQuantity
            }
          }
          console.log(scope.row)
        }
      }
    },
    // 处理汇率
    changeRate() {
      console.log(123)
      if (this.personalForm.currency !== '3') {
        getRate(this.personalForm.currency).then(res => {
          console.log(res)
          if (res.data.ret === 200) {
            // console.log('res.data.data.content', res.data.data.content)
            this.personalForm.exchangeRate = res.data.data.content.rate
          } else {
            this.$notify.error({
              title: 'wrong',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      } else {
        this.personalForm.exchangeRate = '1.0000'
      }
    },
    checkStock(row) {
      console.log('this.moreaction.length', this.moreaction.length)
      if (this.moreaction.length > 1 || this.moreaction.length === 0) {
        this.$message.error('请选择单个商品')
      } else {
        countlist(this.$store.getters.repositoryId, this.$store.getters.regionId, this.moreaction[0].productCode).then(res => {
          console.log(res)
          if (res.data.ret === 200) {
            console.log('res.data.data.content', res.data.data.content.list)
            this.list111 = res.data.data.content.list
            this.receiptVisible2 = true
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
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 通过折扣额计算折扣
    getdiscountMoney(row) {
      console.log(row)
      if (row.includeTaxPrice !== 0 && row.plannedQuantity !== 0 && row.discountMoney !== 0) {
        row.discountRate = (((row.discountMoney / row.includeTaxMoney).toFixed(2)) * 100).toFixed(2)
      }
    },
    // 通过折扣计算折扣额
    getdiscountRate(row) {
      if (row.discountRate === 0) {
        row.discountMoney = row.includeTaxPrice * row.plannedQuantity
      } else {
        row.discountMoney = (row.includeTaxPrice * row.plannedQuantity * (row.discountRate / 100)).toFixed(2)
        console.log('row.discountMoney', row.discountMoney)
      }
    },
    // 总计
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return (Number(prev) + Number(curr)).toFixed(2)
            } else {
              return (Number(prev)).toFixed(2)
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      sums[2] = ''
      sums[3] = ''
      sums[4] = ''
      sums[5] = ''
      sums[8] = ''
      sums[9] = ''
      sums[10] = ''
      sums[11] = ''
      sums[15] = ''
      sums[17] = ''
      sums[18] = ''
      sums[19] = ''
      this.allNumber = sums[7]
      this.allMoney = sums[12]
      this.allTaxMoney = sums[14]
      this.allIncludeTaxMoney = sums[13]
      this.allDiscountMoney = sums[16]
      this.allMoneyMoveDiscount = sums[13] - sums[16]
      return sums
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
      this.personalForm.inquiryDate = currentdate
    },
    // 通过税率计算含税价
    gettaxRate(row) {
      if (row.includeTaxPrice !== 0) {
        row.includeTaxPrice = (row.price * (1 + row.taxRate / 100)).toFixed(2)
      }
    },
    // 通过含税价计算税率
    getincludeTaxPrice(row) {
      if (row.price !== 0) {
        row.taxRate = ((row.includeTaxPrice / row.price - 1) * 100).toFixed(2)
        console.log(row.taxRate)
      }
    },
    // 计算单价
    getprice(row) {
      row.includeTaxPrice = (row.price * (1 + row.taxRate / 100)).toFixed(2)
    },
    // 计算税额
    getTaxMoney2(row) {
      row.taxMoney = (row.price * (row.taxRate / 100) * row.plannedQuantity).toFixed(2)
      return row.taxMoney
    },
    // 计算含税金额
    getTaxMoney(row) {
      row.includeTaxMoney = (row.plannedQuantity * row.includeTaxPrice).toFixed(2)
      row.discountMoney = (row.includeTaxPrice * row.plannedQuantity * (row.discountRate / 100)).toFixed(2)
      return row.includeTaxMoney
    },
    // 计算金额
    getMoney(row) {
      row.money = (row.plannedQuantity * row.price).toFixed(2)
      return row.money
    },
    // 选择源单类型事件
    chooseType() {
      console.log(this.personalForm.sourceType)
      if (this.personalForm.sourceType === '1') {
        this.addsouce = false
        this.addpro = false
        this.IsStockTypeId = true
        this.IsDeptId = true
        if (this.$refs.editable.getRecords().length !== 0) {
          this.$refs.editable.clear()
        }
      } else if (this.personalForm.sourceType === '2') {
        this.addsouce = false
        this.addpro = false
        this.IsStockTypeId = true
        this.IsDeptId = true
        if (this.$refs.editable.getRecords().length !== 0) {
          this.$refs.editable.clear()
        }
      } else if (this.personalForm.sourceType === '3') {
        this.addpro = false
        this.addsouce = true
        this.IsStockTypeId = false
        this.IsDeptId = false
        if (this.$refs.editable.getRecords().length !== 0) {
          this.$refs.editable.clear()
        }
      }
    },
    // 从源单中添加商品
    handleAddSouce() {
      if (this.personalForm.sourceType === '1') {
        this.applycontrol = true
      } else if (this.personalForm.sourceType === '2') {
        if (this.personalForm.supplierId === null || this.personalForm.supplierId === undefined || this.personalForm.supplierId === '') {
          this.$notify.error({
            title: 'wrong',
            message: '请先选择供应商',
            duration: 0
          })
          return false
        }
        this.plancontrol = true
      }
    },
    // 采购申请加载过来数据
    apply(val) {
      console.log(val)
      this.IsPlannedQuantity = true
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].productCode === nowlistdata[j].productCode) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('prompt.wpytj'),
              offset: 100
            })
            return false
          }
        }
        this.$refs.editable.insert(val[i])
      }
    },
    allapplyinfo(val) {
      this.personalForm.stockTypeId = val.stockType
      this.personalForm.deptId = val.applyDeptId
    },
    allinfo(val) {
      this.personalForm.stockTypeId = val.stockType
      this.personalForm.deptId = val.stockDeptId
    },
    // 采购计划加载过来数据
    plan(val) {
      console.log(val)
      this.IsPlannedQuantity = true
      const nowlistdata = this.$refs.editable.getRecords()
      const quchonggong = this.personalForm.supplierId
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].productCode === nowlistdata[j].productCode) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('prompt.wpytj'),
              offset: 100
            })
            return false
          }
        }
        if (val[i].supplierId !== quchonggong) {
          continue
        }
        this.$refs.editable.insert(val[i])
      }
    },
    // 更新类型
    updatecountry() {
      this.getTypes()
    },
    getTypes() {
      // 采购类别数据
      searchStockCategory(this.typeparms).then(res => {
        if (res.data.ret === 200) {
          this.types = res.data.data.content.list
        }
      })
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    // 供应商输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 供应商列表返回数据
    supplierName(val) {
      this.supplierId = val.supplierName
      this.personalForm.supplierId = val.id
      this.supp = val.id
    },
    // 询价员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 询价员回显
    stockName(val) {
      this.inquiryPersonId = val.personName
      this.personalForm.inquiryPersonId = val.id
    },
    // 采购申请明细来源
    handleAddproduct() {
      if (this.personalForm.supplierId === null || this.personalForm.supplierId === undefined || this.personalForm.supplierId === '') {
        this.$notify.error({
          title: 'wrong',
          message: '请先选择供应商',
          duration: 0
        })
        return false
      }
      this.control = true
    },
    productdetail(val) {
      console.log(val)
      this.IsPlannedQuantity = false
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        console.log(val[i].price)
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].productCode === nowlistdata[j].productCode) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('prompt.wpytj'),
              offset: 100
            })
            return false
          }
        }
        this.$refs.editable.insert(val[i])
      }
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        deptId: this.$store.getters.deptId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        isVat: 1,
        inquiryTimes: 1,
        inquiryDate: null,
        sourceType: '3'
      }
      this.getdatatime()
      this.supplierId = null
      this.inquiryPersonId = null
    },
    // 深拷贝
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    // 保存操作
    handlesave() {
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate().then(valid => {
            const EnterDetail = this.deepClone(this.$refs.editable.getRecords())
            if (EnterDetail.length === 0) {
              this.$notify.error({
                title: 'wrong',
                message: this.$t('prompt.mxbbnwk'),
                offset: 100
              })
              return false
            }
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
              if (elem.price === null || elem.price === '' || elem.price === undefined) {
                delete elem.price
              }
              if (elem.basicQuantity === null || elem.basicQuantity === '' || elem.basicQuantity === undefined) {
                delete elem.basicQuantity
              }
              if (elem.plannedQuantity === null || elem.plannedQuantity === '' || elem.plannedQuantity === undefined) {
                delete elem.plannedQuantity
              }
              if (elem.planMoney === null || elem.planMoney === '' || elem.planMoney === undefined) {
                delete elem.planMoney
              }
              if (elem.planDeliveryDate === null || elem.planDeliveryDate === '' || elem.planDeliveryDate === undefined) {
                delete elem.planDeliveryDate
              }
              if (elem.applicationReason === null || elem.applicationReason === '' || elem.applicationReason === undefined) {
                delete elem.applicationReason
              }
              if (elem.sourceNumber === null || elem.sourceNumber === '' || elem.sourceNumber === undefined) {
                delete elem.sourceNumber
              }
              if (elem.sourceSerialNumber === null || elem.sourceSerialNumber === '' || elem.sourceSerialNumber === undefined) {
                delete elem.sourceSerialNumber
              }
              if (elem.includeTaxPrice === null || elem.includeTaxPrice === '' || elem.includeTaxPrice === undefined) {
                delete elem.includeTaxPrice
              }
              if (elem.taxRate === null || elem.taxRate === '' || elem.taxRate === undefined) {
                delete elem.taxRate
              }
              if (elem.taxRate !== null || elem.taxRate !== '' || elem.taxRate !== undefined) {
                elem.taxRate = elem.taxRate / 100
              }
              if (elem.discountRate === null || elem.discountRate === '' || elem.discountRate === undefined) {
                delete elem.discountRate
              }
              if (elem.discountRate !== null || elem.discountRate !== '' || elem.discountRate !== undefined) {
                elem.discountRate = elem.discountRate / 100
              }
              if (elem.money === null || elem.money === '' || elem.money === undefined) {
                delete elem.money
              }
              if (elem.includeTaxMoney === null || elem.includeTaxMoney === '' || elem.includeTaxMoney === undefined) {
                delete elem.includeTaxMoney
              }
              if (elem.taxMoney === null || elem.taxMoney === '' || elem.taxMoney === undefined) {
                delete elem.taxMoney
              }
              return elem
            })
            const parms2 = JSON.stringify(EnterDetail)
            const Data = this.personalForm
            for (const key in Data) {
              if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
                delete Data[key]
              }
              if (key === 'judgeStat') {
                delete Data[key]
              }
            }
            const parms = JSON.stringify(Data)
            createstockInquiry(parms, parms2, this.personalForm).then(res => {
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
                this.$refs.personalForm.clearValidate()
                this.$refs.personalForm.resetFields()
              } else {
                this.$notify.error({
                  title: 'wrong',
                  message: res.data.msg,
                  offset: 100
                })
              }
            })
          }).catch(valid => {
            console.log('error submit!!')
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
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/StockInquiry/AddStockInquiry', name: 'AddStockInquiry', fullPath: '/StockInquiry/AddStockInquiry', title: 'AddStockInquiry' }
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
<style rel="stylesheet/css" scoped>
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
