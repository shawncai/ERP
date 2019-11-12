<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">红字采购发票{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.sourceType')" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" disabled style="margin-left: 18px;width: 200px">
                    <el-option value="2" label="采购发票" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.subject')" prop="type" style="width: 100%;">
                  <el-select v-model="personalForm.subject" disabled filterable style="margin-left: 18px;width: 200px">
                    <el-option v-for="(item, index) in subjects" :key="index" :value="item.id" :label="item.itemName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.invoiceNumber')" prop="invoiceNumber" style="width: 100%;">
                  <el-input v-model="personalForm.invoiceNumber" disabled style="margin-left: 18px;width:200px" clearable/>
                  <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.invoiceType')" prop="invoiceType" style="width: 100%;">
                  <el-select v-model="personalForm.invoiceType" disabled style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="增值税" />
                    <el-option value="2" label="普通" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.supplierId')" prop="supplierId" style="width: 100%;">
                  <el-input v-model="supplierId" style="margin-left: 18px;width:200px" disabled clearable @focus="handlechoose"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.settleMode')" prop="settleMode" style="width: 100%;">
                  <el-select v-model="personalForm.settleMode" disabled placeholder="请选择结算方式" style="margin-left: 18px;width: 200px" @change="change()">
                    <el-option
                      v-for="(item, index) in settleModes"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('StockInvoice.printTimes')" prop="printTimes" style="width: 100%;">-->
              <!--                  <el-select v-model="personalForm.printTimes" clearable style="margin-left: 18px;width: 200px">-->
              <!--                    <el-option-->
              <!--                      v-for="(item, index) in depts"-->
              <!--                      :key="index"-->
              <!--                      :value="item.id"-->
              <!--                      :label="item.deptName"/>-->
              <!--                  </el-select>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.address')" style="width: 100%;">
                  <el-input v-model="personalForm.address" disabled style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.taxNumber')" style="width: 100%;">
                  <el-input v-model="personalForm.taxNumber" disabled style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.bank')" prop="bank" style="width: 100%;">
                  <el-input v-model="personalForm.bank" disabled style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.currency')" style="width: 100%;">
                  <el-select v-model="personalForm.currency" disabled clearable style="margin-left: 18px;width: 200px" @change="change()">
                    <el-option value="1" label="RMB"/>
                    <el-option value="2" label="USD"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('StockInvoice.currencyRate')" style="width: 100%;">-->
              <!--                  <el-radio-group v-model="personalForm.currencyRate" style="margin-left: 18px;width:200px">-->
              <!--                    <el-radio :label="1" style="width: 100px">是</el-radio>-->
              <!--                    <el-radio :label="2">否</el-radio>-->
              <!--                  </el-radio-group>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                  <el-input v-model="handlePersonId" disabled style="margin-left: 18px;width:200px" clearable @focus="handlechooseStock"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.deptId')" style="width: 100%;">
                  <el-select v-model="personalForm.deptId" disabled clearable style="margin-left: 18px;width: 200px">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.payDate')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.payDate"
                    :picker-options="pickerOptions1"
                    type="date"
                    disabled
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >红字采购发票明细</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <!--          <el-button style="width: 130px" @click="handleAddSouce">从源单中选择</el-button>-->
          <my-enter :entercontrol.sync="entercontrol" :supp.sync="supp" @enter="enter" @enterinfo="enterinfo"/>
          <!--          <el-button :disabled="addpro" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>-->
          <my-detail :control.sync="control" @product="productdetail"/>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
          <!--          <el-button type="primary" @click="checkStock()">库存快照</el-button>-->
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
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 2}, type: 'visible'}" prop="quantity" align="center" label="数量" min-width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :max="scope.row.quantity2"
                  v-model="scope.row.quantity"/>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('Hmodule.dj')" prop="price" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  v-model="scope.row.price"
                  @input="getprice(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 2}, type: 'visible'}" prop="includeTaxPrice" align="center" label="含税价" min-width="170px">
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
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="discountRate" align="center" label="折扣(%)" min-width="170px">
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
            <el-editable-column prop="orderNumber" align="center" label="订单单号" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!--      <el-card class="box-card" shadow="never">-->
      <!--        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">合计信息</h2>-->
      <!--        <div class="container" style="margin-top: 37px">-->
      <!--          <el-form :inline="true" status-icon class="demo-ruleForm" label-width="130px">-->
      <!--            <el-row>-->
      <!--              <el-col :span="6">-->
      <!--                <el-form-item label="退货数量总计" style="width: 100%;">-->
      <!--                  <el-input v-model="allNumber" style="margin-left: 18px;width:200px" disabled/>-->
      <!--                </el-form-item>-->
      <!--              </el-col>-->
      <!--              <el-col :span="6">-->
      <!--                <el-form-item label="金额合计" style="width: 100%;">-->
      <!--                  <el-input v-model="allMoney" style="margin-left: 18px;width:200px" disabled/>-->
      <!--                </el-form-item>-->
      <!--              </el-col>-->
      <!--              <el-col :span="6">-->
      <!--                <el-form-item label="税额合计" style="width: 100%;">-->
      <!--                  <el-input v-model="allTaxMoney" style="margin-left: 18px;width:200px" disabled/>-->
      <!--                </el-form-item>-->
      <!--              </el-col>-->
      <!--              <el-col :span="6">-->
      <!--                <el-form-item label="抵应付账款" style="width: 100%;">-->
      <!--                  <el-input v-model="allIncludeTaxMoney" style="margin-left: 18px;width:200px" disabled/>-->
      <!--                </el-form-item>-->
      <!--              </el-col>-->
      <!--            </el-row>-->
      <!--          </el-form>-->
      <!--        </div>-->
      <!--      </el-card>-->
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
import { itemList } from '@/api/SubjectFinance'
import { countlist } from '@/api/public'
import { addStockInvoice } from '@/api/StockInvoice'
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
import MyEnter from './components/MyEnter'
import MyRepository from './components/MyRepository'
export default {
  name: 'AddStockInvoice',
  components: { MyRepository, MyArrival, MyOrder, MyLnquiry, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp, MyEnter },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(this.handlePersonId)
      if (this.handlePersonId === undefined || this.handlePersonId === null || this.handlePersonId === '') {
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
      // 回显仓库
      retreatRepositoryId: '',
      // 控制仓库
      repositorycontrol: false,
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
      // 单据类型数据
      subjects: [],
      // 运送方式
      transportIds: [],
      // 结算方式
      settleModes: [],
      supp: null,
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
      entercontrol: false,
      // 采购申请单信息数据
      personalForm: {
        handlePersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        deptId: this.$store.getters.deptId,
        isRed: 2,
        isVat: 1,
        sourceType: '2',
        payDate: null,
        invoiceType: '1'
      },
      // 采购申请单规则数据
      personalrules: {
        supplierId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        handlePersonId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        payDate: [
          { required: true, message: '请选择退货日期', trigger: 'change' }
        ],
        invoiceNumber: [
          { required: true, message: '请输入发票号', trigger: 'blur' }
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
  },
  mounted() {
    this.getinformation()
  },
  methods: {
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
    getinformation() {
      if (this.$store.getters.empcontract) {
        console.log('getempcontract', this.$store.getters.empcontract)
        // this.personalForm = this.$store.getters.empcontract
        this.personalForm.invoiceNumber = this.$store.getters.empcontract.invoiceNumber
        this.personalForm.invoiceType = this.$store.getters.empcontract.invoiceType
        this.personalForm.supplierId = this.$store.getters.empcontract.supplierId
        this.personalForm.settleMode = this.$store.getters.empcontract.settleMode
        this.personalForm.address = this.$store.getters.empcontract.address
        this.personalForm.taxNumber = this.$store.getters.empcontract.taxNumber
        this.personalForm.bank = this.$store.getters.empcontract.bank
        this.personalForm.handlePersonId = this.$store.getters.empcontract.handlePersonId
        this.personalForm.deptId = this.$store.getters.empcontract.deptId
        this.personalForm.subject = this.$store.getters.empcontract.subject
        this.personalForm.payDate = this.$store.getters.empcontract.payDate
        this.supplierId = this.$store.getters.empcontract.supplierName
        this.handlePersonId = this.$store.getters.empcontract.handlePersonName
        if (this.personalForm.currency !== null && this.personalForm.currency !== '' && this.personalForm.currency !== undefined) {
          this.personalForm.currency = String(this.$store.getters.empcontract.currency)
        }
        if (this.personalForm.invoiceType !== null) {
          this.personalForm.invoiceType = String(this.$store.getters.empcontract.invoiceType)
        }
        this.personalForm.sourceType = '2'
        this.personalForm.isRed = 2
        this.list2 = this.$store.getters.empcontract.stockInvoiceDetailVos
        for (let i = 0; i < this.list2.length; i++) {
          this.list2[i].quantity2 = this.list2[i].quantity
          this.list2[i].sourceNumber = this.$store.getters.empcontract.number
        }
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
              return (prev).toFixed(2)
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
      sums[6] = ''
      sums[10] = ''
      sums[15] = ''
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
    // 通过折扣额计算折扣
    getdiscountMoney(row) {
      console.log(row)
      if (row.includeTaxPrice !== 0 && row.quantity !== 0 && row.discountMoney !== 0) {
        row.discountRate = ((1 - (row.discountMoney / row.includeTaxMoney).toFixed(2)) * 100).toFixed(2)
      }
    },
    // 通过折扣计算折扣额
    getdiscountRate(row) {
      if (row.discountRate === 0) {
        row.discountMoney = 0
      } else {
        row.discountMoney = (row.includeTaxPrice * row.quantity * (1 - row.discountRate / 100)).toFixed(2)
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
      if (row.quantity !== 0) {
        row.tax = (row.price * row.taxRate / 100 * row.quantity).toFixed(2)
      } else {
        row.tax = 0
      }
      return row.tax
    },
    // 计算含税金额
    getTaxMoney(row) {
      row.includeTaxMoney = (row.quantity * row.includeTaxPrice).toFixed(2)
      return row.includeTaxMoney
    },
    // 计算金额
    getMoney(row) {
      row.money = (row.quantity * row.price).toFixed(2)
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
      if (this.personalForm.supplierId === null || this.personalForm.supplierId === undefined || this.personalForm.supplierId === '') {
        this.$notify.error({
          title: '错误',
          message: '请先选择供应商',
          duration: 0
        })
        return false
      }
      this.entercontrol = true
    },
    enter(val) {
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    enterinfo(val) {
    //   this.personalForm.sourceNumber = val.number
    //   this.personalForm.supplierId = val.supplierId
    //   this.supplierId = val.supplierName
    //   if (val.stockTypeId !== null && val.stockTypeId !== undefined && val.stockTypeId !== '') {
    //     this.personalForm.stockTypeId = val.stockTypeId
    //   }
    //   this.personalForm.isVat = val.isVat
    //   if (val.handlePersonId !== null && val.handlePersonId !== undefined && val.handlePersonId !== '') {
    //     this.personalForm.handlePersonId = val.handlePersonId
    //     this.handlePersonId = val.stockPersonName
    //   }
    //   if (val.payMode !== null && val.payMode !== undefined && val.payMode !== '') {
    //     this.personalForm.payMode = val.payMode
    //   }
    //   if (val.deliveryModeId !== null && val.deliveryModeId !== undefined && val.deliveryModeId !== '') {
    //     this.personalForm.deliveryModeId = val.deliveryModeId
    //   }
    //   if (val.currencyId !== null && val.currencyId !== undefined && val.currencyId !== '') {
    //     this.personalForm.currencyId = String(val.currencyId)
    //   }
    //   this.getTypes()
    },
    // 更新类型
    updatecountry() {
      this.getTypes()
    },
    getTypes() {
      const param = {}
      param.subjectId = 1
      itemList(param).then(res => {
        if (res.data.ret === 200) {
          this.subjects = res.data.data.content
        }
      })
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
      this.supp = val.id
      this.personalForm.supplierId = val.id
      if (val.detailAddress !== null && val.detailAddress !== undefined && val.detailAddress !== '') {
        this.personalForm.address = val.detailAddress
      }
      if (val.taxNumber !== null && val.taxNumber !== undefined && val.taxNumber !== '') {
        this.personalForm.taxNumber = val.taxNumber
      }
      if (val.bankName !== null && val.bankName !== undefined && val.bankName !== '') {
        this.personalForm.bank = val.bankName
      }
      if (val.stockPersonId !== null && val.stockPersonId !== undefined && val.stockPersonId !== '') {
        this.personalForm.handlePersonId = val.stockPersonId
        this.handlePersonId = val.stockPersonName
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
      this.personalForm.handlePersonId = val.id
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
    // 清空记录
    restAllForm() {
      this.personalForm = {
        handlePersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        deptId: this.$store.getters.deptId,
        isVat: 1,
        sourceType: '1',
        payDate: null,
        invoiceType: '1'
      }
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
        const EnterDetail = this.deepClone(this.$refs.editable.getRecords())
        if (EnterDetail.length === 0) {
          this.$notify.error({
            title: '错误',
            message: '明细表不能为空',
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
          if (elem.type === null || elem.type === '' || elem.type === undefined) {
            delete elem.type
          }
          if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
            delete elem.unit
          }
          if (elem.price === null || elem.price === '' || elem.price === undefined) {
            delete elem.price
          }
          if (elem.arrivalQuantity === null || elem.arrivalQuantity === '' || elem.arrivalQuantity === undefined) {
            delete elem.arrivalQuantity
          }
          if (elem.retreatQuantity === null || elem.retreatQuantity === '' || elem.retreatQuantity === undefined) {
            delete elem.retreatQuantity
          }
          if (elem.retreatReason === null || elem.retreatReason === '' || elem.retreatReason === undefined) {
            delete elem.retreatReason
          }
          if (elem.sourceSerialNumber === null || elem.sourceSerialNumber === '' || elem.sourceSerialNumber === undefined) {
            delete elem.sourceSerialNumber
          }
          if (elem.includeTaxPrice === null || elem.includeTaxPrice === '' || elem.includeTaxPrice === undefined) {
            delete elem.includeTaxPrice
          }
          if (elem.includeTaxPrice !== null || elem.includeTaxPrice !== '' || elem.includeTaxPrice !== undefined) {
            elem.includeTaxPrice = (elem.includeTaxPrice).toFixed(2)
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
          if (elem.discountRate === null || elem.discountRate === '' || elem.discountRate === undefined) {
            delete elem.discountRate
          }
          if (elem.discountMoney === null || elem.discountMoney === '' || elem.discountMoney === undefined) {
            delete elem.discountMoney
          }
          if (elem.remark === null || elem.remark === '' || elem.remark === undefined) {
            delete elem.remark
          }
          if (elem.sourceNumber === null || elem.sourceNumber === '' || elem.sourceNumber === undefined) {
            delete elem.sourceNumber
          }
          if (elem.sourceSerialNumber === null || elem.sourceSerialNumber === '' || elem.sourceSerialNumber === undefined) {
            delete elem.sourceSerialNumber
          }
          if (elem.hadStorageQuantity === null || elem.hadStorageQuantity === '' || elem.hadStorageQuantity === undefined) {
            delete elem.hadStorageQuantity
          }
          if (elem.reportCheckingQuantity === null || elem.reportCheckingQuantity === '' || elem.reportCheckingQuantity === undefined) {
            delete elem.reportCheckingQuantity
          }
          if (elem.actualCheckingQuantity === null || elem.actualCheckingQuantity === '' || elem.actualCheckingQuantity === undefined) {
            delete elem.actualCheckingQuantity
          }
          if (elem.qualifyQuantity === null || elem.qualifyQuantity === '' || elem.qualifyQuantity === undefined) {
            delete elem.qualifyQuantity
          }
          if (elem.unqualifyQuantity === null || elem.unqualifyQuantity === '' || elem.unqualifyQuantity === undefined) {
            delete elem.unqualifyQuantity
          }
          if (elem.returnQuantity === null || elem.returnQuantity === '' || elem.returnQuantity === undefined) {
            delete elem.returnQuantity
          }
          return elem
        })
        const parms2 = JSON.stringify(EnterDetail)
        const Data = this.personalForm
        for (const key in Data) {
          if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
            delete Data[key]
          }
        }
        const parms = JSON.stringify(Data)
        addStockInvoice(parms, parms2, this.personalForm).then(res => {
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
            this.$router.push('/Invoice/StockInvoiceList')
          } else {
            this.$notify.error({
              title: '错误',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      })
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/StockInvoice/AddStockInvoice', name: 'AddStockInvoice', fullPath: '/StockInvoice/AddStockInvoice', title: 'AddStockInvoice' }
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
