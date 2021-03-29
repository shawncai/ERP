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
                <el-form-item :label="$t('CostInvoice.settleMode')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.settleMode" placeholder="请选择结算方式" style="width: 200px" @change="change()">
                    <el-option
                      v-for="(item, index) in settleModes"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CostInvoice.payDate')" prop="payDate" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.payDate"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('update4.invoiceDate')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.invoiceDate"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.subject')" prop="type" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.subject" filterable style="width: 200px">
                    <el-option v-for="(item, index) in subjects" :key="index" :value="item.id" :label="item.itemName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CostInvoice.isInclude')" prop="isInclude" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-radio-group v-model="personalForm.isInclude" style="width: 200px">
                    <el-radio :label="1" style="width: 100px">计入成本</el-radio>
                    <el-radio :label="2">不计入</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CostInvoice.invoiceNumber')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.invoiceNumber" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Invoice.invoiceType')" prop="invoiceType" style="width: 100%;">
                  <el-select v-model="personalForm.invoiceType" style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="增值税专用发票" />
                    <el-option value="2" label="增值税普通发票" />
                    <el-option value="3" label="普通发票" />
                    <el-option value="4" label="无票" />
                    <el-option value="5" label="其他" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CostInvoice.supplierId')" prop="supplierId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="supplierId" style="width: 200px" clearable @focus="handlechoose"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                  <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CostInvoice.taxNumber')" prop="taxNumber" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.taxNumber" disabled style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CostInvoice.address')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.address" disabled style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CostInvoice.bank')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.bank" disabled style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item :label="$t('CostInvoice.currency')" prop="currency" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.currency" clearable style="width: 200px" @change="change()">
                    <el-option value="1" label="PHP"/>
                    <el-option value="2" label="USD"/>
                    <el-option value="3" label="RMB"/>
                    <el-option value="4" label="LKR"/>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :span="6">
                <el-form-item :label="$t('CostInvoice.handlePersonId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="handlePersonId" style="width: 200px" @focus="handlechooseStock"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CostInvoice.deptId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.deptId" style="width: 200px">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item :label="$t('Recycling.exchangeRate')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.currencyRate" style="width: 200px" disabled/>
                </el-form-item>
              </el-col> -->
              <el-col :span="6">
                <el-form-item :label="$t('Repository.countryId')" prop="countryId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.countryId" placeholder="请选择国家" style="width: 200px">
                    <el-option
                      v-for="(item, index) in nations"
                      :key="index"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">
        <div ref="fuzhu" class="form-name" >费用发票明细</div>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button @click="handleAdd2">{{ $t('updates.tj') }}</el-button>
          <my-detail :control.sync="control" @product="productdetail"/>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        </div>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules"
            :summary-method="getSummaries"
            class="click-table1"
            height="600"
            show-summary
            stripe
            border
            size="small"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" min-width="55" align="center" fixed/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index" fixed/>
            <el-editable-column :edit-render="{name: 'ElSelect',options: costs ,type: 'visible', events: {change: change2}}" :label="$t('updates.fymc')" prop="costName" align="center" min-width="150px" fixed/>
            <el-editable-column :label="$t('updates.fydm')" prop="costCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.fylx')" prop="costCategoryName" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.jldw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 6}, type: 'visible'}" :label="$t('updates.shuli')" prop="quantity" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 6}, type: 'visible'}" :label="$t('updates.hsj')" prop="includeTaxPrice" align="center" min-width="170px"/>
            <el-editable-column :label="$t('updates.hsje')" prop="includeTaxMoney" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getTaxMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 6}, type: 'visible'}" :label="$t('updates.sl')" prop="taxRate" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="6"
                  v-model="scope.row.taxRate"
                  @input="gettaxRate(scope.row, scope)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 6}, type: 'visible'}" :label="$t('updates.kdyse')" prop="deduTaxMoney" align="center" min-width="170px"/>
            <el-editable-column :label="$t('updates.bhsje')" prop="money" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.bz')" prop="remark" align="center" min-width="170px"/>
            <el-editable-column :edit-render="{name: 'ElSelect',options: currencys ,type: 'visible'}" :label="$t('CostInvoice.currency')" prop="currency" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.fykm')" prop="subjectName" align="center" min-width="170px"/>
          </el-editable>
        </div>
      </el-card>
      <!-- 合计信息 -->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('SaleOrder.heji1')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="allNumber" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('updates.sehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="allTaxMoney" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('updates.hsjehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="allIncludeTaxMoney" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">
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
                style="margin-left: 18px;width: 100%;margin-bottom: 0"
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
import { searchCostInstall } from '@/api/CostInstall'
import { itemList } from '@/api/SubjectFinance'
import { countlist, getcountrylist } from '@/api/public'
import { addCostInvoice } from '@/api/CostInvoice'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchCategory } from '@/api/Supplier'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MySupplier from './components/MySupplier'
import MyApply from './components/MyApply'
import MyPlan from './components/MyPlan'
import MyDelivery from './components/MyDelivery'
import MyLnquiry from './components/MyLnquiry'
import MyOrder from './components/MyOrder'
import MyArrival from './components/MyArrival'
import MyRepository from './components/MyRepository'
var _that
export default {
  name: 'AddCostInvoice',
  components: { MyRepository, MyArrival, MyOrder, MyLnquiry, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(this.stockPersonId)
      if (this.stockPersonId === undefined || this.stockPersonId === null || this.stockPersonId === '') {
        callback(new Error('请选择采购员'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(this.supplierId)
      if (this.supplierId === undefined || this.supplierId === null || this.supplierId === '') {
        callback(new Error('请选择供应商'))
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
    return {
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      // 国家列表
      nations: [],
      // 回显仓库
      retreatRepositoryId: '',
      // 控制仓库
      repositorycontrol: false,
      subjects: [],
      // 合计数据
      allNumber: '',
      allMoney: '',
      allTaxMoney: '',
      allIncludeTaxMoney: '',
      allDiscountMoney: '',
      allMoneyMoveDiscount: '',
      allOthermoney: '',
      // 交货方式
      giveIds: [],
      // 运送方式
      transportIds: [],
      costs: [],
      currencys: [{ value: 1, label: 'PHP' }, { value: 2, label: 'USD' }, { value: 3, label: 'RMB' }],
      cost: {},
      // 结算方式
      settleModes: [],
      // 支付方式
      payModes: [],
      // 点收人回显
      acceptPersonId: '',
      // 控制点收人
      deliverycontrol: false,
      // 控制源单为采购到货单
      arrivalcontrol: false,
      // 控制添加商品按钮
      addpro: true,
      // 控制从源单中选择按钮
      addsouce: false,
      // 供应商回显
      supplierId: '',
      // 控制供应商
      empcontrol: false,
      // 选择的数据
      choosedata: [],
      // 部门数据
      depts: [],
      // 采购员回显
      handlePersonId: this.$store.getters.name,
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
      // 采购申请单信息数据
      personalForm: {
        payDate: null,
        handlePersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        deptId: this.$store.getters.deptId,
        isInclude: 2,
        currency: '1',
        retreatDate: null,
        currencyRate: '1.0000'
      },
      // 采购申请单规则数据
      personalrules: {
        invoiceType: [
          { required: true, message: '请选择发票类型', trigger: 'change' }
        ],
        supplierId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        stockPersonId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        payDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        invoiceNumber: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        deptId: [
          { required: true, validator: validatePass4, trigger: 'change' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        stockTypeId: [
          { required: true, message: '请选择采购类别', trigger: 'change' }
        ],
        retreatRepositoryId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ]
      },
      // 采购申请单明细数据
      list2: [],
      // 采购申请单明细列表规则
      validRules: {
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
    this.getcurrency()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    gettaxRate(row, scope) {
      if (row !== '' && row !== null && row !== undefined && scope.$index === 0) {
        if (row.taxRate !== '' && row.taxRate !== null && row.taxRate !== undefined) {
          for (let i = 0; i < this.list2.length; i++) {
            this.list2[i].temp = i
          }
          for (let i = row.temp; i < this.list2.length; i++) {
            console.log('需求值=========', this.list2[i].taxRate)
            console.log(222)
            this.list2[i].taxRate = row.taxRate
          }
          console.log(row)
        }
      }
    },
    getcurrency() {
      const mycountry = this.$store.getters.countryId
      if (mycountry === 1) {
        this.personalForm.currency = '3'
      } else if (mycountry === 2) {
        this.personalForm.currency = '1'
      }
    },
    change2(val) {
      console.log('val', val)
      console.log('this.costs', this.costs)
      for (let i = 0; i < this.costs.length; i++) {
        if (this.costs[i].costName === val.row.costName) {
          console.log('this.costs[i]', this.costs[i])
          val.row.costName = this.costs[i].costName
          val.row.costCode = this.costs[i].costCode
          val.row.costCategory = this.costs[i].costCategory
          val.row.costCategoryName = this.costs[i].costCategoryName
          val.row.subject = this.costs[i].subjectId
          val.row.subjectName = this.costs[i].subjectName
          val.row.unit = this.costs[i].unit
        }
      }
    },
    handleAdd2() {
      for (let i = 0; i < this.costs.length; i++) {
        this.costs[i].value = this.costs[i].costName
        this.costs[i].label = this.costs[i].costName
      }
      // this.$refs.editable.insertAt(-1)
      const row = this.$refs.editable.insertAt('', -1)
      this.$nextTick(() => this.$refs.editable.setActiveCell(row, 'name'))
      this.list2[0].quantity = 1
      const mycountry = this.$store.getters.countryId
      if (mycountry === 1) {
        this.list2[0].currency = 3
      } else if (mycountry === 2) {
        this.list2[0].currency = 1
      }
    },
    // 重置一下下拉
    change() {
      this.$forceUpdate()
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
    getinformation() {
      if (this.$store.getters.empcontract) {
        console.log('getempcontract', this.$store.getters.empcontract)
        this.personalForm.sourceType = '1'
        this.chooseType()
        this.allarrivalinfo(this.$store.getters.empcontract)
        for (let i = 0; i < this.$store.getters.empcontract.stockArrivalDetailVos.length; i++) {
          this.$store.getters.empcontract.stockArrivalDetailVos[i].typeName = this.$store.getters.empcontract.stockArrivalDetailVos[i].productType
          this.$store.getters.empcontract.stockArrivalDetailVos[i].type = this.$store.getters.empcontract.stockArrivalDetailVos[i].typeId
          this.$store.getters.empcontract.stockArrivalDetailVos[i].retreatQuantity = 0
          this.$store.getters.empcontract.stockArrivalDetailVos[i].retreatReason = ''
          this.$store.getters.empcontract.stockArrivalDetailVos[i].sourceNumber = this.$store.getters.empcontract.number
          this.$store.getters.empcontract.stockArrivalDetailVos[i].sourceSerialNumber = this.$store.getters.empcontract.stockArrivalDetailVos[i].id
          this.$store.getters.empcontract.stockArrivalDetailVos[i].taxRate = this.$store.getters.empcontract.stockArrivalDetailVos[i].taxRate * 100
        }
        this.arrival(this.$store.getters.empcontract.stockArrivalDetailVos)
        this.$store.dispatch('getempcontract', '')
      }
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
      this.personalForm.payDate = currentdate
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.retreatRepositoryId = val.repositoryName
      this.personalForm.retreatRepositoryId = val.id
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
              return prev + curr
            } else {
              return (prev).toFixed(6)
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
      sums[12] = ''
      sums[13] = ''
      this.allNumber = sums[6]
      this.allMoney = sums[12]
      this.allTaxMoney = sums[9]
      this.allIncludeTaxMoney = sums[8]
      return sums
    },
    getdiscountMoney(row) {
      row.discountMoney = row.discountRate * row.retreatQuantity * (1 - row.discountRate / 100)
      return row.discountMoney
    },
    // 计算税额
    getTaxMoney2(row) {
      row.taxMoney = (row.price * row.taxRate / 100 * row.retreatQuantity).toFixed(6)
      return row.taxMoney
    },
    // 计算含税金额
    getTaxMoney(row) {
      row.includeTaxMoney = (row.quantity * row.includeTaxPrice).toFixed(6)
      return row.includeTaxMoney
    },
    // 计算金额
    getMoney(row) {
      row.money = (row.includeTaxMoney - row.deduTaxMoney).toFixed(6)
      return row.money
    },
    getways() {
      // 交货方式
      searchCategory(2).then(res => {
        if (res.data.ret === 200) {
          this.giveIds = res.data.data.content.list
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
          console.log('123')
          this.settleModes = res.data.data.content.list
        }
      })
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          console.log('res.data.data.content.list', res.data.data.content.list)
          this.payModes = res.data.data.content.list
          console.log('this.payModes', this.payModes)
        }
      })
    },
    // 选择源单类型事件
    chooseType() {
      console.log(this.personalForm.sourceType)
      if (this.personalForm.sourceType === '1') {
        this.addsouce = false
        this.addpro = true
        this.$refs.editable.clear()
        this.$refs.personalForm.clearValidate()
      } else if (this.personalForm.sourceType === '2') {
        this.addpro = false
        this.addsouce = true
        this.personalForm.sourceNumber = ''
        this.$refs.editable.clear()
        this.$refs.personalForm.clearValidate()
      }
    },
    // 从源单中添加商品
    handleAddSouce() {
      this.arrivalcontrol = true
    },
    arrival(val) {
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    allarrivalinfo(val) {
      this.personalForm.sourceNumber = val.number
      this.personalForm.supplierId = val.supplierId
      this.supplierId = val.supplierName
      if (val.stockTypeId !== null && val.stockTypeId !== undefined && val.stockTypeId !== '') {
        this.personalForm.stockTypeId = val.stockTypeId
      }
      this.personalForm.isVat = val.isVat
      if (val.stockPersonId !== null && val.stockPersonId !== undefined && val.stockPersonId !== '') {
        this.personalForm.stockPersonId = val.stockPersonId
        this.stockPersonId = val.stockPersonName
      }
      if (val.payMode !== null && val.payMode !== undefined && val.payMode !== '') {
        this.personalForm.payMode = val.payMode
      }
      if (val.deliveryModeId !== null && val.deliveryModeId !== undefined && val.deliveryModeId !== '') {
        this.personalForm.deliveryModeId = val.deliveryModeId
      }
      if (val.currencyId !== null && val.currencyId !== undefined && val.currencyId !== '') {
        this.personalForm.currencyId = String(val.currencyId)
      }
      this.getTypes()
    },
    // 更新类型
    updatecountry() {
      this.getTypes()
    },
    getTypes() {
      getcountrylist().then(res => {
        if (res.data.ret === 200) {
          this.nations = res.data.data.content
        } else {
          console.log('国籍列表出错')
        }
      })
      const param = {}
      param.subjectId = 1
      itemList(param).then(res => {
        if (res.data.ret === 200) {
          this.subjects = res.data.data.content
        }
      })
      const param2 = {}
      param2.pageNum = 1
      param2.pageSize = 9999
      searchCostInstall(param2).then(res => {
        if (res.data.ret === 200) {
          console.log('res.data.data.content.list', res.data.data.content.list)
          this.costs = res.data.data.content.list
          console.log('this.costs', this.costs)
        }
      })
      console.log('this.costs', this.costs)
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
      this.supplierId = val.supplierName
      this.personalForm.supplierId = val.id
      if (val.stockPersonId !== null && val.stockPersonId !== undefined && val.stockPersonId !== '') {
        this.personalForm.stockPersonId = val.stockPersonId
        this.handlePersonId = val.handlePersonName
      }
      this.personalForm.payMode = val.payMode
      this.personalForm.deliveryModeId = val.deliveryMode
      this.personalForm.isVat = val.isVat
      this.personalForm.currencyId = val.currency
    },
    // 采购员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 采购员回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.personalForm.stockPersonId = val.id
    },
    // 点收人人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.acceptPersonId = val.personName
      this.personalForm.acceptPersonId = val.id
    },
    // 采购申请明细来源
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      console.log(val)
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
        handlePersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        deptId: this.$store.getters.deptId,
        isInclude: 2,
        currency: '1',
        retreatDate: null
      }
      this.getcurrency()
      this.getdatatime()
      this.supplierId = null
      this.inquiryPersonId = null
      this.handlePersonId = this.$store.getters.name
      this.ourContractorId = null
      this.acceptPersonId = null
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
          const EnterDetail = this.deepClone(this.$refs.editable.getRecords())
          if (EnterDetail.length === 0) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('prompt.mxbbnwk'),
              offset: 100
            })
            return false
          }
          let m = 1
          let m2 = 1
          for (let i = 0; i < EnterDetail.length; i++) {
            if (EnterDetail[i].costCode === null) {
              m = 2
            }
            if (EnterDetail[i].includeTaxMoney === '0.00') {
              m2 = 2
            }
          }
          if (m === 2) {
            this.$notify.error({
              title: 'wrong',
              message: '费用代码不能为空',
              offset: 100
            })
            return false
          }
          if (m2 === 2) {
            this.$notify.error({
              title: 'wrong',
              message: '含税金额不能为0',
              offset: 100
            })
            return false
          }
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
          addCostInvoice(parms, parms2, this.personalForm).then(res => {
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
      const view = { path: '/CostInvoice/AddCostInvoice', name: 'AddCostInvoice', fullPath: '/CostInvoice/AddCostInvoice', title: 'AddCostInvoice' }
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

