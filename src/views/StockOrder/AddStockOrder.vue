<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('StockOrder.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOrder.sourceType')" prop="sourceType" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px" @change="chooseType">
                    <el-option value="1" label="采购申请" />
                    <el-option value="2" label="采购计划" />
                    <el-option value="3" label="采购询价单" />
                    <el-option value="5" label="无来源" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOrder.supplierId')" prop="supplierId" style="width: 100%;">
                  <el-input v-model="supplierId" style="margin-left: 18px;width: 200px" @focus="handlechoose"/>
                  <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOrder.stockPersonId')" prop="stockPersonId" style="width: 100%;">
                  <el-input v-model="stockPersonId" :disabled="IsStockPersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOrder.stockType')" prop="stockType" style="width: 100%;">
                  <el-select v-model="personalForm.stockTypeId" :disabled="isedit" style="margin-left: 18px;width: 200px" @focus="updatecountry">
                    <el-option
                      v-for="(item, index) in types"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOrder.deptId')" prop="deptId" style="width: 100%;">
                  <el-select v-model="personalForm.deptId" :disabled="isedit" style="margin-left: 18px;width: 200px" @change="change()">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOrder.payMode')" style="width: 100%;">
                  <el-select v-model="personalForm.payMode" :disabled="IsPayMode" clearable style="margin-left: 18px;width: 200px">
                    <el-option
                      v-for="(item, index) in payModes"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOrder.orderDate')" prop="orderDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.orderDate"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOrder.signPersonId')" prop="signPersonId" style="width: 100%;">
                  <el-input v-model="signPersonId" :disabled="IsSignPersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseDelivery"/>
                </el-form-item>
                <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOrder.deliveryMode')" style="width: 100%;">
                  <el-select v-model="personalForm.deliveryMode" :disabled="IsDeliveryMode" clearable style="margin-left: 18px;width: 200px" @change="change()">
                    <el-option
                      v-for="(item, index) in giveIds"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOrder.settleMode')" style="width: 100%;">
                  <el-select v-model="personalForm.settleMode" :disabled="IsSettleMode" clearable style="margin-left: 18px;width: 200px" @change="change()">
                    <el-option
                      v-for="(item, index) in paymentIds"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOrder.isVat')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.isVat" style="margin-left: 18px;width:200px">
                    <el-radio :label="1" style="width: 100px">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOrder.currency')" prop="currency" style="width: 100%;">
                  <el-select v-model="personalForm.currency" :disabled="IsCurrency" style="margin-left: 18px;width: 200px" @change="changeRate">
                    <el-option value="1" label="PHP"/>
                    <el-option value="2" label="USD"/>
                    <el-option value="3" label="RMB"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Recycling.exchangeRate')" style="width: 100%;">
                  <el-input v-model="personalForm.exchangeRate" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item :label="$t('StockOrder.supplierNumber')" style="width: 100%;">
                  <el-input v-model="personalForm.supplierNumber" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >采购订单明细</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button :disabled="addpro" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <my-detail :control.sync="control" :supp.sync="supp" @product="productdetail"/>
          <el-button :disabled="addsouce" style="width: 130px" @click="handleAddSouce">从源单中选择</el-button>
          <my-apply :applycontrol.sync="applycontrol" @apply="apply" @allapplyinfo="allapplyinfo"/>
          <my-plan :plancontrol.sync="plancontrol" :supp.sync="supp" @plan="plan" @allPlaninfo="allPlaninfo"/>
          <my-lnquiry :inquirycontrol.sync="inquirycontrol" :supp.sync="supp" @lnquiry="lnquiry" @allLnquirinfo="allLnquirinfo"/>
          <my-contract :contractcontrol.sync="contractcontrol" :supp.sync="supp" @contract="contract" @allcontractinfo="allcontractinfo"/>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
          <el-button type="primary" @click="checkStock()">库存快照</el-button>
        </div>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules"
            :summary-method="getSummaries"
            class="click-table1"
            show-summary
            stripe
            border
            size="medium"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
            <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 1.00, precision: 2}, type: 'visible'}" :label="$t('updates.cgsl')" prop="stockQuantity" align="center" min-width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :min="1.00"
                  v-model="scope.row.stockQuantity"
                  @change="changenumber(scope.row)"
                  @keyup.enter.native="test(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElDatePicker', attrs: {type: 'date', format: 'yyyy-MM-dd'}, type: 'visible'}" prop="deliveryDate" align="center" label="交货日期" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.deliveryDate"
                  value-format="yyyy-MM-dd"
                  @change="copydate(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="remarks" align="center" label="备注" width="150px"/>
            <!--            <el-editable-column prop="stockNumber" align="center" label="库存" min-width="150px"/>-->
            <el-editable-column :label="$t('Hmodule.dj')" prop="price" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  v-model="scope.row.price"
                  @input="getprice(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column prop="includeTaxPrice" align="center" label="含税价" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  v-model="scope.row.includeTaxPrice"
                  @input="getincludeTaxPrice(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 2}, type: 'visible'}" prop="taxRate" align="center" label="税率(%)" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  v-model="scope.row.taxRate"
                  @input="gettaxRate(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('Hmodule.je')" prop="money" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column prop="includeTaxMoney" align="center" label="含税金额" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getTaxMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column prop="tax" align="center" label="税额" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getTaxMoney2(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="discountRate" align="center" label="折扣率(%)" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  v-model="scope.row.discountRate"
                  @change="getdiscountRate(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="discountMoney" align="center" label="折扣额" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  v-model="scope.row.discountMoney"
                  @change="getdiscountMoney(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column prop="sourceNumber" align="center" label="源单编号" min-width="150px"/>
            <el-editable-column prop="sourceSerialNumber" align="center" label="源单序号" min-width="150px"/>
            <el-editable-column prop="arrivalQuantity" align="center" label="已到货数量" min-width="150px"/>
            <el-editable-column prop="returnQuantity" align="center" label="退货数量" min-width="150px"/>
            <el-editable-column prop="actualArrivalQuantity" align="center" label="实到数量" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">合计信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-form :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="采购数量合计" style="width: 100%;">
                  <el-input v-model="allNumber" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="金额合计" style="width: 100%;">
                  <el-input v-model="allMoney" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="税额合计" style="width: 100%;">
                  <el-input v-model="allTaxMoney" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="含税金额合计" style="width: 100%;">
                  <el-input v-model="allIncludeTaxMoney" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="整单折扣金额合计" style="width: 100%;">
                  <el-input v-model="allDiscountMoney" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="折后含税金额合计" style="width: 100%;">
                  <el-input v-model="allMoneyMoveDiscount" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="其他费用支出合计" style="width: 100%;">
                  <el-input v-model="personalForm.otherMoney" style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
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
                <el-table-column :resizable="false" label="商品名称" align="center" min-width="150">
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
import { addstockorder } from '@/api/StockOrder'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchCategory } from '@/api/Supplier'
import { searchsupplier, countlist, getRate } from '@/api/public'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MySupplier from './components/MySupplier'
import MyApply from './components/MyApply'
import MyPlan from './components/MyPlan'
import MyDelivery from './components/MyDelivery'
import MyLnquiry from './components/MyLnquiry'
import MyContract from './components/MyContract'
export default {
  name: 'AddStockOrder',
  components: { MyContract, MyLnquiry, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp },
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
      console.log(this.signPersonId)
      if (this.signPersonId === undefined || this.signPersonId === null || this.signPersonId === '') {
        callback(new Error('请选择签约人'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(this.stockPersonId)
      if (this.stockPersonId === undefined || this.stockPersonId === null || this.stockPersonId === '') {
        callback(new Error('请选择采购员'))
      } else {
        callback()
      }
    }
    const validatePass4 = (rule, value, callback) => {
      console.log(this.personalForm.deptId)
      if (this.personalForm.deptId === undefined || this.personalForm.deptId === null || this.personalForm.deptId === '') {
        callback(new Error('请选择部门'))
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
      // 控制采购类型，采购部门是否可以编辑
      isedit: false,
      priceabled: false,
      // 带入的供应商
      supp: null,
      // 控制币种是否可以编辑
      IsCurrency: false,
      // 控制我方签约人是否可以编辑
      IsSignPersonId: false,
      // 控制支付方式是否可以编辑
      IsPayMode: false,
      // 控制结算方式是否可以编辑
      IsSettleMode: false,
      // 控制交货方式是否可以编辑
      IsDeliveryMode: false,
      // 控制供应商是否可以编辑
      IsSupplierId: false,
      // 控制采购员是否可以编辑
      IsStockPersonId: false,
      // 控制采购类别是否可以编辑
      IsStockTypeId: false,
      // 控制部门是否可以编辑
      IsDeptId: false,
      // 合计数据
      allNumber: '',
      allMoney: '',
      allTaxMoney: '',
      allIncludeTaxMoney: '',
      allDiscountMoney: '',
      allMoneyMoveDiscount: '',
      allOhterMoney: '',
      // 交货方式
      giveIds: [],
      // 运送方式
      transportIds: [],
      // 结算方式
      paymentIds: [],
      // 我方签约人回显
      signPersonId: '',
      // 控制我方签约人
      deliverycontrol: false,
      // 控制源单为询价单时
      inquirycontrol: false,
      // 控制源单为采购合同时
      contractcontrol: false,
      // 控制源单为采购计划时
      plancontrol: false,
      // 控制源单为采购申请时
      applycontrol: false,
      // 控制添加商品按钮
      addpro: false,
      // 控制从源单中选择按钮
      addsouce: true,
      payModes: [],
      // 供应商回显
      supplierId: '',
      // 控制供应商
      empcontrol: false,
      // 选择的数据
      choosedata: [],
      // 部门数据
      depts: [],
      // 采购员回显
      stockPersonId: this.$store.getters.name,
      // 控制采购员
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
      supplierIdDetail: [],
      // 采购申请单信息数据
      personalForm: {
        stockPersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        isVat: 1,
        sourceType: '5',
        currency: '3',
        orderDate: null,
        deptId: this.$store.getters.deptId,
        exchangeRate: '1.0000'
      },
      // 采购申请单规则数据
      personalrules: {
        signPersonId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        stockPersonId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        supplierId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        orderDate: [
          { required: true, message: '请选择询价日期', trigger: 'change' }
        ],
        deptId: [
          { required: true, validator: validatePass4, trigger: 'change' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        stockTypeId: [
          { required: true, message: '请选择采购类别', trigger: 'change' }
        ]
      },
      // 采购申请单明细数据
      list2: [],
      supplierDetailVos: [],
      // 采购申请单明细列表规则
      validRules: {
        // name: [
        //   { required: true, message: '请输入名称', trigger: 'change' }
        // ],
        // stockQuantity: [
        //   { required: true, message: '请输入采购数量', trigger: 'blur' }
        // ],
        stockQuantity: [
          { required: true, message: '请输入采购数量', trigger: 'blur' }
        ],
        deliveryDate: [
          { required: true, message: '请输入交货日期', trigger: 'blur' }
        ]
      },
      receiptVisible2: false,
      list111: [],
      // 批量操作
      moreaction: []
    }
  },
  created() {
    this.getTypes()
    this.getways()
    this.getdatatime()
  },
  mounted() {
    this.getinformation()
  },
  activated() {
    this.getinformation()
  },
  methods: {
    changenumber(row) {
      if (row.stockQuantity === 1 || row.stockQuantity === '' || row.stockQuantity === null || row.stockQuantity === undefined) {
        return false
      }
      let re = 1
      for (let i = 0; i < this.list2.length; i++) {
        if (this.list2[i].stockQuantity !== 1) {
          re++
        }
      }
      if (re === 2) {
        for (let i = 0; i < this.list2.length; i++) {
          this.list2[i].stockQuantity = row.stockQuantity
        }
      }
    },
    copydate(row) {
      if (row.deliveryDate === '' || row.deliveryDate === null || row.deliveryDate === undefined) {
        return false
      }
      for (let i = 0; i < this.list2.length; i++) {
        this.list2[i].temp = i
      }
      for (let i = row.temp; i < this.list2.length; i++) {
        console.log(this.list2[i].deliveryDate)
        if (this.list2[i].deliveryDate !== null && this.list2[i].deliveryDate !== '' && this.list2[i].deliveryDate !== undefined) {
          console.log(111)
          continue
        } else {
          console.log(222)
          this.list2[i].deliveryDate = row.deliveryDate
        }
      }
      console.log(row)
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
              title: '错误',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      } else {
        this.personalForm.exchangeRate = '1.0000'
      }
    },
    test(row) {
      console.log(row.stockQuantity)
      for (let i = 0; i < this.list2.length; i++) {
        this.list2[i].temp = i
      }
      for (let i = row.temp; i < this.list2.length; i++) {
        this.list2[i].stockQuantity = row.stockQuantity
      }
    },
    getinformation() {
      if (this.$store.getters.empcontract) {
        console.log('getempcontract', this.$store.getters.empcontract)
        this.personalForm = this.$store.getters.empcontract
        this.personalForm.sourceType = (this.personalForm.sourceType).toString()
        this.personalForm.currency = (this.personalForm.currency).toString()
        this.getRate()
        this.supplierId = this.$store.getters.empcontract.supplierName
        this.stockPersonId = this.$store.getters.empcontract.stockPersonName
        this.signPersonId = this.$store.getters.empcontract.signPersonName
        this.list2 = this.personalForm.stockOrderDetailVos
        this.personalForm.createPersonId = this.$store.getters.userId
        this.personalForm.countryId = this.$store.getters.countryId
        this.personalForm.repositoryId = this.$store.getters.repositoryId
        this.personalForm.regionId = this.$store.getters.regionId
        this.$store.dispatch('getempcontract', '')
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
              title: '错误',
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
    // 重置一下下拉
    change() {
      this.$forceUpdate()
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
      this.personalForm.orderDate = currentdate
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
      sums[8] = ''
      sums[9] = ''
      sums[10] = ''
      sums[11] = ''
      sums[12] = ''
      sums[16] = ''
      sums[18] = ''
      sums[19] = ''
      this.allNumber = sums[7]
      this.allMoney = sums[13]
      this.allTaxMoney = sums[15]
      this.allIncludeTaxMoney = sums[14]
      this.allDiscountMoney = sums[17]
      this.allMoneyMoveDiscount = (sums[14] - sums[17]).toFixed(2)
      return sums
    },
    getways() {
      // 交货方式
      searchCategory(2).then(res => {
        if (res.data.ret === 200) {
          this.giveIds = res.data.data.content.list
        }
      })
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.payModes = res.data.data.content.list
        }
      })
      // 运送方式
      searchCategory(3).then(res => {
        if (res.data.ret === 200) {
          this.transportIds = res.data.data.content.list
        }
      })
      // 结算方式
      searchCategory(5).then(res => {
        if (res.data.ret === 200) {
          this.paymentIds = res.data.data.content.list
        }
      })
    },
    // 通过折扣额计算折扣
    getdiscountMoney(row) {
      console.log(row)
      if (row.includeTaxPrice !== 0 && row.stockQuantity !== 0 && row.discountMoney !== 0) {
        row.discountRate = (((row.discountMoney / row.includeTaxMoney).toFixed(2)) * 100).toFixed(2)
      }
    },
    // 通过折扣计算折扣额
    getdiscountRate(row) {
      if (row.discountRate === 0) {
        row.discountMoney = 0
      } else {
        row.discountMoney = (row.includeTaxPrice * row.stockQuantity * (row.discountRate / 100)).toFixed(2)
      }
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
      if (row.stockQuantity !== 0) {
        row.tax = (row.price * row.taxRate / 100 * row.stockQuantity).toFixed(2)
      } else {
        row.tax = 0
      }
      return row.tax
    },
    // 计算含税金额
    getTaxMoney(row) {
      row.includeTaxMoney = (row.stockQuantity * row.includeTaxPrice).toFixed(2)
      row.discountMoney = (row.includeTaxPrice * row.stockQuantity * (row.discountRate / 100)).toFixed(2)
      return row.includeTaxMoney
    },
    // 计算金额
    getMoney(row) {
      row.money = (row.stockQuantity * row.price).toFixed(2)
      return row.money
    },
    // 选择源单类型事件
    chooseType() {
      console.log(this.personalForm.sourceType)
      if (this.personalForm.sourceType === '1') {
        this.addsouce = false
        this.addpro = false
        this.IsSupplierId = false
        this.IsStockPersonId = false
        this.IsPayMode = false
        this.IsSignPersonId = false
        this.IsDeliveryMode = false
        this.IsSettleMode = false
        this.IsCurrency = false
        const ceshi2 = this.$refs.editable.getRecords()
        console.log(ceshi2)
        for (let i = 0; i < ceshi2.length; i++) {
          if (ceshi2[i].sourceNumber !== '' && ceshi2[i].sourceNumber !== null && ceshi2[i].sourceNumber !== undefined) {
            this.$refs.editable.remove(ceshi2[i])
          }
        }
        // if (this.$refs.editable.getRecords().length !== 0) {
        //   this.$refs.editable.clear()
        // }
      } else if (this.personalForm.sourceType === '2') {
        this.addsouce = false
        this.addpro = false
        this.IsSupplierId = false
        this.IsPayMode = false
        this.IsSignPersonId = false
        this.IsDeliveryMode = false
        this.IsSettleMode = false
        this.IsCurrency = false
        if (this.$refs.editable.getRecords().length !== 0) {
          const ceshi2 = this.$refs.editable.getRecords()
          console.log(ceshi2)
          for (let i = 0; i < ceshi2.length; i++) {
            if (ceshi2[i].sourceNumber !== '' && ceshi2[i].sourceNumber !== null && ceshi2[i].sourceNumber !== undefined) {
              this.$refs.editable.remove(ceshi2[i])
            }
          }
        }
      } else if (this.personalForm.sourceType === '3') {
        this.addsouce = false
        this.addpro = false
        this.IsStockPersonId = false
        this.IsPayMode = false
        this.IsSignPersonId = false
        this.IsCurrency = false
        if (this.$refs.editable.getRecords().length !== 0) {
          const ceshi2 = this.$refs.editable.getRecords()
          console.log(ceshi2)
          for (let i = 0; i < ceshi2.length; i++) {
            if (ceshi2[i].sourceNumber !== '' && ceshi2[i].sourceNumber !== null && ceshi2[i].sourceNumber !== undefined) {
              this.$refs.editable.remove(ceshi2[i])
            }
          }
        }
      } else if (this.personalForm.sourceType === '4') {
        this.addsouce = false
        this.addpro = false
        this.IsSupplierId = false
        if (this.$refs.editable.getRecords().length !== 0) {
          const ceshi2 = this.$refs.editable.getRecords()
          console.log(ceshi2)
          for (let i = 0; i < ceshi2.length; i++) {
            if (ceshi2[i].sourceNumber !== '' && ceshi2[i].sourceNumber !== null && ceshi2[i].sourceNumber !== undefined) {
              this.$refs.editable.remove(ceshi2[i])
            }
          }
        }
      } else if (this.personalForm.sourceType === '5') {
        this.addpro = false
        this.addsouce = true
        this.IsStockPersonId = false
        this.IsStockTypeId = false
        this.IsDeptId = false
        this.IsDeliveryMode = false
        this.IsSettleMode = false
        this.IsPayMode = false
        this.IsSignPersonId = false
        this.currency = false
        this.IsSupplierId = false
        this.isedit = false
        if (this.$refs.editable.getRecords().length !== 0) {
          const ceshi2 = this.$refs.editable.getRecords()
          console.log(ceshi2)
          for (let i = 0; i < ceshi2.length; i++) {
            if (ceshi2[i].sourceNumber !== '' && ceshi2[i].sourceNumber !== null && ceshi2[i].sourceNumber !== undefined) {
              this.$refs.editable.remove(ceshi2[i])
            }
          }
        }
      }
    },
    // 从源单中添加商品
    handleAddSouce() {
      console.log(this.personalForm.supplierId)
      if (this.personalForm.sourceType === '1') {
        if (this.stockPersonId !== '') {
          this.IsStockPersonId = true
        }
        if (this.personalForm.stockTypeId !== '') {
          this.isedit = true
        }
        if (this.personalForm.deptId !== '') {
          this.isedit = true
        }
        if (this.personalForm.supplierId === null || this.personalForm.supplierId === undefined || this.personalForm.supplierId === '') {
          this.$notify.error({
            title: '错误',
            message: '请先选择供应商',
            duration: 0
          })
          return false
        }
        this.applycontrol = true
      } else if (this.personalForm.sourceType === '2') {
        if (this.stockPersonId !== '') {
          this.IsStockPersonId = true
        }
        if (this.personalForm.stockTypeId !== '') {
          this.isedit = true
        }
        if (this.personalForm.deptId !== '') {
          this.isedit = true
        }
        if (this.personalForm.supplierId === null || this.personalForm.supplierId === undefined || this.personalForm.supplierId === '') {
          this.$notify.error({
            title: '错误',
            message: '请先选择供应商',
            duration: 0
          })
          return false
        }
        this.plancontrol = true
      } else if (this.personalForm.sourceType === '3') {
        if (this.stockPersonId !== '') {
          this.IsStockPersonId = true
        }
        if (this.personalForm.stockTypeId !== '') {
          this.isedit = true
        }
        if (this.personalForm.deptId !== '') {
          this.isedit = true
        }
        if (this.personalForm.supplierId === null || this.personalForm.supplierId === undefined || this.personalForm.supplierId === '') {
          this.$notify.error({
            title: '错误',
            message: '请先选择供应商',
            duration: 0
          })
          return false
        }
        this.inquirycontrol = true
      } else if (this.personalForm.sourceType === '4') {
        if (this.personalForm.supplierId === null || this.personalForm.supplierId === undefined || this.personalForm.supplierId === '') {
          this.$notify.error({
            title: '错误',
            message: '请先选择供应商',
            duration: 0
          })
          return false
        }
        this.contractcontrol = true
      }

      // if (this.$refs.editable.getRecords().length !== 0) {
      //
      // }
    },
    // 采购合同加载过来数据
    contract(val) {
      this.$refs.editable.clear()
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].productCode === nowlistdata[j].productCode) {
            this.$notify.error({
              title: '错误',
              message: '物品已添加',
              offset: 100
            })
            return false
          }
        }
        this.$refs.editable.insert(val[i])
      }
    },
    allcontractinfo(val) {
      console.log(val)
      if (val.stockPersonId === null || val.stockPersonId === '' || val.stockPersonId === undefined) {
        this.IsStockPersonId = false
      } else {
        this.stockPersonId = val.stockPersonName
        this.personalForm.stockPersonId = val.stockPersonId
        this.IsStockPersonId = true
      }
      if (val.stockType === null || val.stockType === '' || val.stockType === undefined) {
        this.IsStockTypeId = false
      } else {
        this.personalForm.stockType = val.stockType
        this.IsStockTypeId = true
      }
      if (val.deptId === null || val.deptId === '' || val.deptId === undefined) {
        this.IsDeptId = false
      } else {
        this.personalForm.deptId = val.deptId
        this.IsDeptId = true
      }
      // this.personalForm.isVat = String(val.isVat)
      this.personalForm.payMode = String(val.payId)
      this.signPersonId = val.ourContractorName
      this.personalForm.signPersonId = val.ourContractorId
      this.personalForm.deliveryMode = val.deliveryMode
      this.personalForm.settleMode = val.settleId
      this.personalForm.currency = String(val.currency)
      this.getRate()
    },
    // 采购询价单加载过来数据
    lnquiry(val) {
      this.$refs.editable.clear()
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].productCode === nowlistdata[j].productCode) {
            this.$notify.error({
              title: '错误',
              message: '物品已添加',
              offset: 100
            })
            return false
          }
        }
        this.$refs.editable.insert(val[i])
      }
    },
    allLnquirinfo(val) {
      if (val.stockType === null || val.stockType === '' || val.stockType === undefined) {
        this.IsStockTypeId = false
      } else {
        this.personalForm.stockTypeId = val.stockTypeId
        this.IsStockTypeId = true
      }
      if (val.deptId === null || val.deptId === '' || val.deptId === undefined) {
        this.IsDeptId = false
      } else {
        this.personalForm.deptId = val.deptId
        this.IsDeptId = true
      }
      searchsupplier(val.supplierName).then(res => {
        if (res.data.ret === 200) {
          console.log(res)
          if (res.data.data.content.list[0].giveId === null || res.data.data.content.list[0].giveId === '' || res.data.data.content.list[0].giveId === undefined) {
            this.IsDeliveryMode = false
          } else {
            this.personalForm.deliveryMode = res.data.data.content.list[0].giveId
            this.IsDeliveryMode = true
          }
          this.personalForm.transferId = res.data.data.content.list[0].transportId
          if (res.data.data.content.list[0].paymentId === null || res.data.data.content.list[0].paymentId === '' || res.data.data.content.list[0].paymentId === undefined) {
            this.IsSettleMode = false
          } else {
            this.personalForm.settleMode = res.data.data.content.list[0].paymentId
            this.IsSettleMode = true
          }
        }
        this.getways()
      })
      this.getways()
    },
    // 采购申请加载过来数据
    apply(val) {
      this.$refs.editable.clear()
      console.log('val', val)
      console.log('this.supplierDetailVos', this.supplierDetailVos)
      let re = 1
      for (const x in val) {
        for (const j in this.supplierDetailVos) {
          if (this.supplierDetailVos[j].productCode === val[x].productCode) {
            val[x].price = this.supplierDetailVos[j].price
            val[x].stockQuantity = val[x].applyQuantity - val[x].planQuantity
            this.$refs.editable.insert(val[x])
            re = 2
          }
        }
      }
      if (re === 1) {
        this.$notify.error({
          title: '错误',
          message: '源单中的商品该供应商都无法提供',
          offset: 100
        })
      }
    },
    allapplyinfo(val) {
      console.log(val)
      if (val.stockType === null || val.stockType === '' || val.stockType === undefined) {
        this.IsStockTypeId = false
      } else {
        this.personalForm.stockTypeId = val.stockType
        this.IsStockTypeId = true
      }
      if (val.applyDeptId === null || val.applyDeptId === '' || val.applyDeptId === undefined) {
        this.IsDeptId = false
      } else {
        this.personalForm.deptId = val.applyDeptId
        this.IsDeptId = true
      }
    },
    // 采购计划加载过来数据
    plan(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      const quchonggong = this.personalForm.supplierId
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].productCode === nowlistdata[j].productCode) {
            this.$notify.error({
              title: '错误',
              message: '物品已添加',
              offset: 100
            })
            return false
          }
        }
        if (val[i].supplierId !== quchonggong) {
          console.log(1234)
          continue
        }
        val[i].stockQuantity = (val[i].planQuantity - val[i].orderQuantity).toFixed(2)
        this.$refs.editable.insert(val[i])
      }
    },
    allPlaninfo(val) {
      this.priceabled = true
      if (val.stockType === null || val.stockType === '' || val.stockType === undefined) {
        this.IsStockTypeId = false
      } else {
        this.personalForm.stockTypeId = val.stockType
        this.IsStockTypeId = true
      }
      if (val.stockDeptId === null || val.stockDeptId === '' || val.stockDeptId === undefined) {
        this.IsDeptId = false
      } else {
        this.personalForm.deptId = val.stockDeptId
        this.IsDeptId = true
      }
      if (val.stockPersonId === null || val.stockPersonId === '' || val.stockPersonId === undefined) {
        this.IsStockPersonId = false
      } else {
        this.stockPersonId = val.stockPersonName
        this.personalForm.stockPersonId = val.stockPersonId
        this.IsStockPersonId = true
      }
      // this.personalForm.isVat = String(val.isVat)
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
      console.log(val)
      this.supplierDetailVos = val.supplierDetailVos
      this.supplierId = val.supplierName
      this.personalForm.supplierId = val.id
      this.supp = val.id
      this.personalForm.deliveryMode = val.deliveryMode
      this.personalForm.settleMode = val.settleMode
      this.personalForm.payMode = val.payMode
      if (val.moneyId !== null && val.moneyId !== undefined && val.moneyId !== '') {
        this.personalForm.currency = String(val.moneyId)
        this.getRate()
      }
      this.supplierIdDetail = val.supplierDetailVos
      this.$refs.editable.clear()
    },
    // 采购员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 采购员回显
    stockName(val) {
      console.log(val)
      this.stockPersonId = val.personName
      this.personalForm.stockPersonId = val.id
      this.personalForm.deptId = val.deptId
    },
    // 我方签约人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.signPersonId = val.personName
      this.personalForm.signPersonId = val.id
    },
    // 采购申请明细来源
    handleAddproduct() {
      if (this.personalForm.supplierId === null || this.personalForm.supplierId === undefined || this.personalForm.supplierId === '') {
        this.$notify.error({
          title: '错误',
          message: '请先选择供应商',
          duration: 0
        })
        return false
      }
      this.control = true
    },
    productdetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      const nowlistdata2 = this.supplierIdDetail
      for (let i = 0; i < val.length; i++) {
        console.log(val[i].price)
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].productCode === nowlistdata[j].productCode) {
            this.$notify.error({
              title: '错误',
              message: '物品已添加',
              offset: 100
            })
            return false
          }
        }
        console.log('nowlistdata2', nowlistdata2)
        console.log('val', val)
        for (let p = 0; p < nowlistdata2.length; p++) {
          if (val[i].productCode === nowlistdata2[p].productCode) {
            console.log('success')
            val[i].discountRate = nowlistdata2[p].discountRate
            if (nowlistdata2[p].price !== null && nowlistdata2[p].price !== undefined && nowlistdata2[p].price !== '') {
              val[i].price = nowlistdata2[p].price
            } else {
              val[i].price = 0
            }
            val[i].includeTaxPrice = nowlistdata2[p].includeTaxPrice
          }
        }
        this.$refs.editable.insert(val[i])
      }
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        stockPersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        isVat: 1,
        sourceType: '5'
      }
      this.personalForm.orderDate = new Date()
      this.supplierId = null
      this.inquiryPersonId = null
      this.stockPersonId = this.$store.getters.name
      this.signPersonId = null
      // 控制币种是否可以编辑
      this.IsCurrency = false
      // 控制我方签约人是否可以编辑
      this.IsSignPersonId = false
      // 控制支付方式是否可以编辑
      this.IsPayMode = false
      // 控制结算方式是否可以编辑
      this.IsSettleMode = false
      // 控制交货方式是否可以编辑
      this.IsDeliveryMode = false
      // 控制供应商是否可以编辑
      this.IsSupplierId = false
      // 控制采购员是否可以编辑
      this.IsStockPersonId = false
      // 控制采购类别是否可以编辑
      this.IsStockTypeId = false
      // 控制部门是否可以编辑
      this.IsDeptId = false
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
            console.log('123')
            const EnterDetail = this.deepClone(this.$refs.editable.getRecords())
            if (EnterDetail.length === 0) {
              this.$notify.error({
                title: '错误',
                message: '明细表不能为空',
                offset: 100
              })
              return false
            }
            let ll = 1
            console.log('ll', ll)
            EnterDetail.map(function(elem) {
              return elem
            }).forEach(function(elem) {
              if (elem.stockQuantity === 0) {
                ll = 2
              }
            })
            console.log('ll', ll)
            if (ll === 2) {
              this.$notify.error({
                title: '错误',
                message: '采购数量不能为0',
                offset: 100
              })
              return false
            }
            let ll2 = 1
            console.log('ll2', ll2)
            const date = this.personalForm.orderDate
            EnterDetail.map(function(elem) {
              return elem
            }).forEach(function(elem) {
              console.log('elem.deliveryDate', elem.deliveryDate)
              console.log('elem.deliveryDate', Date.parse(elem.deliveryDate))
              console.log('this.personalForm.orderDate', date)
              console.log('this.personalForm.orderDate', Date.parse(date))
              if (Date.parse(elem.deliveryDate) < Date.parse(date)) {
                ll2 = 2
              }
              console.log('ll2', ll2)
            })
            console.log('ll2', ll2)
            if (ll2 === 2) {
              this.$notify.error({
                title: '错误',
                message: '交货日期不能早于下单日期',
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
              elem.typeId = elem.type
              if (elem.type === null || elem.type === '' || elem.type === undefined) {
                delete elem.type
              }
              if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
                delete elem.unit
              }
              if (elem.price === null || elem.price === '' || elem.price === undefined) {
                delete elem.price
              }
              if (elem.stockQuantity === null || elem.stockQuantity === '' || elem.stockQuantity === undefined) {
                delete elem.stockQuantity
              }
              if (elem.deliveryDate === null || elem.deliveryDate === '' || elem.deliveryDate === undefined) {
                delete elem.deliveryDate
              }
              if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
                delete elem.remarks
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
              // if (elem.taxRate === null || elem.taxRate === '' || elem.taxRate === undefined) {
              //   delete elem.taxRate
              // }
              if (elem.taxRate !== null || elem.taxRate !== '' || elem.taxRate !== undefined) {
                elem.taxRate = elem.taxRate / 100
              }
              // if (elem.discountRate === null || elem.discountRate === '' || elem.discountRate === undefined) {
              //   delete elem.discountRate
              // }
              if (elem.discountRate !== null || elem.discountRate !== '' || elem.discountRate !== undefined) {
                elem.discountRate = elem.discountRate / 100
              }
              if (elem.money === null || elem.money === '' || elem.money === undefined) {
                delete elem.money
              }
              if (elem.includeTaxMoney === null || elem.includeTaxMoney === '' || elem.includeTaxMoney === undefined) {
                delete elem.includeTaxMoney
              }
              if (elem.tax === null || elem.tax === '' || elem.tax === undefined) {
                delete elem.tax
              }
              if (elem.discountMoney === null || elem.discountMoney === '' || elem.discountMoney === undefined) {
                delete elem.discountMoney
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
            addstockorder(parms, parms2, this.personalForm).then(res => {
              console.log(res)
              if (res.data.ret === 200) {
                this.$notify({
                  title: '成功',
                  message: '保存成功',
                  type: 'success',
                  offset: 100
                })
                this.restAllForm()
                this.$refs.editable.clear()
                this.$refs.personalForm.clearValidate()
                this.$refs.personalForm.resetFields()
              } else {
                this.$notify.error({
                  title: '错误',
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
      const view = { path: '/StockOrder/AddStockOrder', name: 'AddStockOrder', fullPath: '/StockOrder/AddStockOrder', title: 'AddStockOrder' }
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
