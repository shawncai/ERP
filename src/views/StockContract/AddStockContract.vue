<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">基本信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('StockContract.contractTitle')" style="width: 100%;">
                  <el-input v-model="personalForm.contractTitle" style="margin-left: 18px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockContract.sourceType')" prop="sourceType" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 218px" @change="chooseType">
                    <el-option value="1" label="采购申请" />
                    <el-option value="2" label="采购计划" />
                    <el-option value="3" label="采购询价单" />
                    <el-option value="4" label="无来源" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockContract.supplierId')" prop="supplierId" style="width: 100%;">
                  <el-input v-model="supplierId" style="margin-left: 18px" clearable @focus="handlechoose"/>
                  <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockContract.stockPersonId')" prop="stockPersonId" style="width: 100%;">
                  <el-input v-model="stockPersonId" style="margin-left: 18px" clearable @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockContract.stockType')" prop="stockType" style="width: 100%;">
                  <el-select v-model="personalForm.stockType" style="margin-left: 18px;width: 218px" @focus="updatecountry">
                    <el-option
                      v-for="(item, index) in types"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockContract.deptId')" prop="deptId" style="width: 100%;">
                  <el-select v-model="personalForm.deptId" clearable style="margin-left: 18px;width: 218px">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockContract.payId')" style="width: 100%;">
                  <el-select v-model="personalForm.payId" clearable style="margin-left: 18px;width: 218px">
                    <el-option value="1" label="现金"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockContract.signDate')" prop="signDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.signDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockContract.supplierContractor')" style="width: 100%;">
                  <el-input v-model="personalForm.supplierContractor" style="margin-left: 18px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockContract.ourContractorId')" style="width: 100%;">
                  <el-input v-model="ourContractorId" style="margin-left: 18px" clearable @focus="handlechooseDelivery"/>
                </el-form-item>
                <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockContract.payAddress')" style="width: 100%;">
                  <el-input v-model="personalForm.payAddress" style="margin-left: 18px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockContract.deliveryMode')" style="width: 100%;">
                  <el-select v-model="personalForm.deliveryMode" clearable style="margin-left: 18px;width: 218px">
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
                <el-form-item :label="$t('StockContract.transferId')" style="width: 100%;">
                  <el-select v-model="personalForm.transferId" clearable style="margin-left: 18px;width: 218px">
                    <el-option
                      v-for="(item, index) in transportIds"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockContract.settleId')" style="width: 100%;">
                  <el-select v-model="personalForm.settleId" clearable style="margin-left: 18px;width: 218px">
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
                <el-form-item :label="$t('StockContract.isVat')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.isVat" style="margin-left: 18px">
                    <el-radio :label="1" style="width: 120px">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockContract.currency')" prop="currency" style="width: 100%;">
                  <el-select v-model="personalForm.currency" clearable style="margin-left: 18px;width: 218px">
                    <el-option value="1" label="RMB"/>
                    <el-option value="2" label="USD"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >采购合同明细</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button :disabled="addpro" @click="handleAddproduct">添加商品</el-button>
          <my-detail :control.sync="control" @product="productdetail"/>
          <el-button :disabled="addsouce" style="width: 130px" @click="handleAddSouce">从源单中选择</el-button>
          <my-apply :applycontrol.sync="applycontrol" @apply="apply" @allapplyinfo="allapplyinfo"/>
          <my-plan :plancontrol.sync="plancontrol" @plan="plan" @allPlaninfo="allPlaninfo"/>
          <my-lnquiry :inquirycontrol.sync="inquirycontrol" @lnquiry="lnquiry" @allLnquirinfo="allLnquirinfo"/>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">删除</el-button>
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
            style="width: 100%">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column label="序号" min-width="55" align="center" type="index"/>
            <el-editable-column prop="productCode" align="center" label="物品编号" min-width="150px"/>
            <el-editable-column prop="productName" align="center" label="物品名称" min-width="150px"/>
            <el-editable-column prop="productType" align="center" label="规格" min-width="150px"/>
            <el-editable-column prop="unit" align="center" label="单位" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="plannedQuantity" align="center" label="采购数量" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="price" align="center" label="单价" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  v-model="scope.row.price"
                  @input="getprice(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="includeTaxPrice" align="center" label="含税价" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  v-model="scope.row.includeTaxPrice"
                  @input="getincludeTaxPrice(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="taxRate" align="center" label="税率(%)" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  v-model="scope.row.taxRate"
                  @input="gettaxRate(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column prop="money" align="center" label="金额" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column prop="includeTaxMoney" align="center" label="含税金额" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getTaxMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column prop="taxMoney" align="center" label="税额" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getTaxMoney2(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElDatePicker', attrs: {type: 'date', format: 'yyyy-MM-dd'}, type: 'visible'}" prop="requireDate" align="center" label="交货日期" min-width="170px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="discountRate" align="center" label="折扣率(%)" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  v-model="scope.row.discountRate"
                  @input="getdiscountRate(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="discountMoney" align="center" label="折扣额" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  v-model="scope.row.discountMoney"
                  @input="getdiscountMoney(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column prop="remark" align="center" label="备注" min-width="150px"/>
            <el-editable-column prop="sourceNumber" align="center" label="源单编号" min-width="150px"/>
            <el-editable-column prop="sourceSerialNumber" align="center" label="源单序号" min-width="150px"/>
            <el-editable-column prop="orderedQuantity" align="center" label="已订购数量" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">合计信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-form :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="采购数量合计" style="width: 100%;">
                  <el-input v-model="allNumber" style="margin-left: 18px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="金额合计" style="width: 100%;">
                  <el-input v-model="allMoney" style="margin-left: 18px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="税额合计" style="width: 100%;">
                  <el-input v-model="allTaxMoney" style="margin-left: 18px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="含税金额合计" style="width: 100%;">
                  <el-input v-model="allIncludeTaxMoney" style="margin-left: 18px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="整单折扣金额合计" style="width: 100%;">
                  <el-input v-model="allDiscountMoney" style="margin-left: 18px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="折后含税金额合计" style="width: 100%;">
                  <el-input v-model="allMoneyMoveDiscount" style="margin-left: 18px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">保存</el-button>
        <el-button type="danger" @click="handlecancel()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { createstockContract } from '@/api/StockContract'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchCategory } from '@/api/Supplier'
import { searchsupplier } from '@/api/public'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MySupplier from './components/MySupplier'
import MyApply from './components/MyApply'
import MyPlan from './components/MyPlan'
import MyDelivery from './components/MyDelivery'
import MyLnquiry from './components/MyLnquiry'
export default {
  name: 'AddStockContract',
  components: { MyLnquiry, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请选择'))
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
      // 交货方式
      giveIds: [],
      // 运送方式
      transportIds: [],
      // 结算方式
      paymentIds: [],
      // 我方签约人回显
      ourContractorId: '',
      // 控制我方签约人
      deliverycontrol: false,
      // 控制源单为询价单时
      inquirycontrol: false,
      // 控制源单为采购计划时
      plancontrol: false,
      // 控制源单为采购申请时
      applycontrol: false,
      // 控制添加商品按钮
      addpro: true,
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
      // 采购员回显
      stockPersonId: '',
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
        createPersonId: 3,
        countryId: 1,
        repositoryId: 438,
        regionId: 2,
        isVat: 1
      },
      // 采购申请单规则数据
      personalrules: {
        supplierId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        inquiryPersonId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        inquiryDate: [
          { required: true, message: '请选择询价日期', trigger: 'change' }
        ],
        deptId: [
          { required: true, message: '请选择部门', trigger: 'change' }
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
      // 采购申请单明细列表规则
      validRules: {
      }
    }
  },
  created() {
    this.getTypes()
    this.getways()
  },
  methods: {
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
      sums[8] = ''
      sums[9] = ''
      sums[10] = ''
      sums[14] = ''
      sums[15] = ''
      sums[17] = ''
      sums[18] = ''
      sums[19] = ''
      this.allNumber = sums[7]
      this.allMoney = sums[11]
      this.allTaxMoney = sums[13]
      this.allIncludeTaxMoney = sums[12]
      this.allDiscountMoney = sums[16]
      this.allMoneyMoveDiscount = sums[12] - sums[16]
      return sums
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
          this.paymentIds = res.data.data.content.list
        }
      })
    },
    // 通过折扣额计算折扣率
    getdiscountMoney(row) {
      console.log(row)
      if (row.price !== 0 && row.plannedQuantity !== 0 && row.discountMoney !== 0) {
        row.discountRate = ((1 - row.discountMoney / row.price / row.plannedQuantity) * 100).toFixed(2)
      }
    },
    // 通过折扣率计算折扣额
    getdiscountRate(row) {
      if (row.discountRate === 0) {
        row.discountMoney = 0
      } else {
        row.discountMoney = (row.price * row.plannedQuantity * (1 - row.discountRate / 100)).toFixed(2)
      }
    },
    // 通过税率计算含税价
    gettaxRate(row) {
      row.includeTaxPrice = row.price * (1 + row.taxRate / 100)
    },
    // 计算含税价
    getincludeTaxPrice(row) {
      if (row.price !== 0) {
        row.taxRate = ((row.includeTaxPrice / row.price - 1) * 100).toFixed(2)
      }
    },
    // 计算单价
    getprice(row) {
      row.includeTaxPrice = row.price * (1 + row.taxRate)
    },
    // 计算税额
    getTaxMoney2(row) {
      row.taxMoney = row.price * row.taxRate * row.plannedQuantity
      return row.taxMoney
    },
    // 计算含税金额
    getTaxMoney(row) {
      row.includeTaxMoney = row.plannedQuantity * row.includeTaxPrice
      return row.includeTaxMoney
    },
    // 计算金额
    getMoney(row) {
      row.money = row.plannedQuantity * row.price
      return row.money
    },
    // 选择源单类型事件
    chooseType() {
      console.log(this.personalForm.sourceType)
      if (this.personalForm.sourceType === '1' || this.personalForm.sourceType === '2' || this.personalForm.sourceType === '3') {
        this.addsouce = false
        this.addpro = true
        this.$refs.editable.clear()
      } else if (this.personalForm.sourceType === '4') {
        this.addpro = false
        this.addsouce = true
        this.$refs.editable.clear()
      }
    },
    // 从源单中添加商品
    handleAddSouce() {
      if (this.personalForm.sourceType === '1') {
        this.applycontrol = true
      } else if (this.personalForm.sourceType === '2') {
        this.plancontrol = true
      } else if (this.personalForm.sourceType === '3') {
        this.inquirycontrol = true
      }
    },
    // 采购询价单加载过来数据
    lnquiry(val) {
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
      this.personalForm.supplierId = val.supplierId
      this.supplierId = val.supplierName
      this.personalForm.stockType = val.stockTypeId
      this.personalForm.deptId = val.deptId
      this.personalForm.isVat = val.isVat
      searchsupplier(val.supplierName).then(res => {
        if (res.data.ret === 200) {
          this.personalForm.deliveryMode = res.data.data.content.list[0].giveId
          this.personalForm.transferId = res.data.data.content.list[0].transportId
          this.personalForm.settleId = res.data.data.content.list[0].paymentId
        }
        this.getways()
      })
      this.getways()
    },
    // 采购申请加载过来数据
    apply(val) {
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
    allapplyinfo(val) {
      this.personalForm.stockType = val.stockType
      this.personalForm.deptId = val.applyDeptId
    },
    // 采购计划加载过来数据
    plan(val) {
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
    allPlaninfo(val) {
      this.personalForm.stockType = val.stockType
      this.personalForm.deptId = val.stockDeptId
      this.personalForm.isVat = val.isVat
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
      this.supplierId = val.supplierName
      this.personalForm.supplierId = val.id
    },
    // 采购员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 采购员回显
    stockName(val) {
      this.stockPersonId = val.personName
      this.personalForm.stockPersonId = val.id
    },
    // 我方签约人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.ourContractorId = val.personName
      this.personalForm.ourContractorId = val.id
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
        createPersonId: 3,
        countryId: 1,
        repositoryId: 438,
        regionId: 2,
        isVat: 1
      }
      this.supplierId = null
      this.inquiryPersonId = null
      this.stockPersonId = null
      this.ourContractorId = null
    },
    // 保存操作
    handlesave() {
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
        if (elem.type === null || elem.type === '' || elem.type === undefined) {
          delete elem.type
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.price === null || elem.price === '' || elem.price === undefined) {
          delete elem.price
        }
        if (elem.plannedQuantity === null || elem.plannedQuantity === '' || elem.plannedQuantity === undefined) {
          delete elem.plannedQuantity
        }
        if (elem.requireDate === null || elem.requireDate === '' || elem.requireDate === undefined) {
          delete elem.requireDate
        }
        if (elem.reason === null || elem.reason === '' || elem.reason === undefined) {
          delete elem.reason
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
        if (elem.discountRate === null || elem.discountRate === '' || elem.discountRate === undefined) {
          delete elem.discountRate
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
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          createstockContract(parms, parms2, this.personalForm).then(res => {
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
      const view = { path: '/StockContract/AddStockContract', name: 'AddStockContract', fullPath: '/StockContract/AddStockContract', title: 'AddStockContract' }
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
