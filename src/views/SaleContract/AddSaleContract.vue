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
                <el-form-item :label="$t('SaleContract.title')" prop="title" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.sourceType')" prop="sourceType" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 218px" @change="chooseType">
                    <el-option value="1" label="销售机会" />
                    <el-option value="2" label="分期申请" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.sourceNumber')" style="width: 100%;">
                  <el-input v-model="personalForm.sourceNumber" style="margin-left: 18px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.customerName')" style="width: 100%;">
                  <el-input v-model="personalForm.customerName" style="margin-left: 18px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.customerPhone')" style="width: 100%;">
                  <el-input v-model="personalForm.customerPhone" style="margin-left: 18px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.saleType')" style="width: 100%;">
                  <el-select v-model="personalForm.saleType" style="margin-left: 18px;width: 218px" @change="chooseType">
                    <el-option value="1" label="零售" />
                    <el-option value="2" label="批发" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.closeType')" style="width: 100%;">
                  <el-select v-model="personalForm.closeType" clearable style="margin-left: 18px;width: 218px">
                    <el-option value="1" label="结算1"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.payType')" style="width: 100%;">
                  <el-select v-model="personalForm.payType" clearable style="margin-left: 18px;width: 218px">
                    <el-option value="1" label="支付1"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.deliveryMode')" style="width: 100%;">
                  <el-select v-model="personalForm.deliveryMode" clearable style="margin-left: 18px;width: 218px">
                    <el-option value="1" label="交货1"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.currency')" prop="currency" style="width: 100%;">
                  <el-select v-model="personalForm.currency" clearable style="margin-left: 18px;width: 218px">
                    <el-option value="1" label="RMB"/>
                    <el-option value="2" label="USD"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.salePersonId')" style="width: 100%;">
                  <el-input v-model="salePersonId" style="margin-left: 18px" @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.deptId')" style="width: 100%;">
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
                <el-form-item :label="$t('SaleContract.saleRepositoryId')" style="width: 100%;">
                  <el-input v-model="personalForm.saleRepositoryId" style="margin-left: 18px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.signDate')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.signDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.signAddress')" style="width: 100%;">
                  <el-input v-model="personalForm.signAddress" style="margin-left: 18px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.contractStat')" style="width: 100%;">
                  <el-select v-model="personalForm.contractStat" clearable style="margin-left: 18px;width: 218px">
                    <el-option value="1" label="状态1"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.invoiceType')" style="width: 100%;">
                  <el-select v-model="personalForm.invoiceType" clearable style="margin-left: 18px;width: 218px">
                    <el-option value="1" label="增值税"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.taxRate')" style="width: 100%;">
                  <el-input v-model="personalForm.taxRate" style="margin-left: 18px" clearable/>
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
            <el-editable-column prop="productCategory" align="center" label="物品分类" min-width="150px"/>
            <el-editable-column prop="productType" align="center" label="规格型号" min-width="150px"/>
            <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
            <el-editable-column prop="unit" align="center" label="单位" min-width="150px"/>
            <el-editable-column prop="performanceScore" align="center" label="绩效分" min-width="150px"/>
            <el-editable-column prop="productScore" align="center" label="商品积分" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="quantity" align="center" label="订单数量" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="salePrice" align="center" label="零售价" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  v-model="scope.row.price"
                  @input="getprice(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column prop="costPrice" align="center" label="成本价" min-width="150px"/>
            <el-editable-column prop="costMoney" align="center" label="成本金额" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="includeTaxMoney" align="center" label="含税价" min-width="170px">
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
            <el-editable-column prop="includeTaxCostMoney" align="center" label="含税成本金额" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getTaxMoney2(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="discount" align="center" label="折扣率(%)" min-width="170px">
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
          </el-editable>
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
// import { createSaleContract } from '@/api/SaleContract'
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
  name: 'AddSaleContract',
  components: { MyLnquiry, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp },
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
      console.log(this.inquiryPersonId)
      if (this.inquiryPersonId === undefined || this.inquiryPersonId === null || this.inquiryPersonId === '') {
        callback(new Error('请选择我方签约人'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(this.inquiryPersonId)
      if (this.stockPersonId === undefined || this.stockPersonId === null || this.stockPersonId === '') {
        callback(new Error('请选择采购员'))
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
      // 业务员回显
      salePersonId: '',
      // 控制业务员
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
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        inquiryPersonId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        stockPersonId: [
          { required: true, validator: validatePass3, trigger: 'change' }
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
              return (prev + curr).toFixed(2)
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
      row.taxMoney = (row.price * row.taxRate / 100 * row.plannedQuantity).toFixed(2)
      return row.taxMoney
    },
    // 计算含税金额
    getTaxMoney(row) {
      row.includeTaxMoney = (row.plannedQuantity * row.includeTaxPrice).toFixed(2)
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
    // 业务员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 业务员回显
    stockName(val) {
      this.salePersonId = val.personName
      this.personalForm.salePersonId = val.id
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
    // // 保存操作
    // handlesave() {
    //   const EnterDetail = this.$refs.editable.getRecords()
    //   EnterDetail.map(function(elem) {
    //     return elem
    //   }).forEach(function(elem) {
    //     if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
    //       delete elem.productCode
    //     }
    //     if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
    //       delete elem.productName
    //     }
    //     if (elem.type === null || elem.type === '' || elem.type === undefined) {
    //       delete elem.type
    //     }
    //     if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
    //       delete elem.unit
    //     }
    //     if (elem.price === null || elem.price === '' || elem.price === undefined) {
    //       delete elem.price
    //     }
    //     if (elem.plannedQuantity === null || elem.plannedQuantity === '' || elem.plannedQuantity === undefined) {
    //       delete elem.plannedQuantity
    //     }
    //     if (elem.requireDate === null || elem.requireDate === '' || elem.requireDate === undefined) {
    //       delete elem.requireDate
    //     }
    //     if (elem.reason === null || elem.reason === '' || elem.reason === undefined) {
    //       delete elem.reason
    //     }
    //     if (elem.sourceNumber === null || elem.sourceNumber === '' || elem.sourceNumber === undefined) {
    //       delete elem.sourceNumber
    //     }
    //     if (elem.sourceSerialNumber === null || elem.sourceSerialNumber === '' || elem.sourceSerialNumber === undefined) {
    //       delete elem.sourceSerialNumber
    //     }
    //     if (elem.includeTaxPrice === null || elem.includeTaxPrice === '' || elem.includeTaxPrice === undefined) {
    //       delete elem.includeTaxPrice
    //     }
    //     if (elem.taxRate === null || elem.taxRate === '' || elem.taxRate === undefined) {
    //       delete elem.taxRate
    //     }
    //     if (elem.taxRate !== null || elem.taxRate !== '' || elem.taxRate !== undefined) {
    //       elem.taxRate = elem.taxRate / 100
    //     }
    //     if (elem.discountRate === null || elem.discountRate === '' || elem.discountRate === undefined) {
    //       delete elem.discountRate
    //     }
    //     if (elem.discountRate !== null || elem.discountRate !== '' || elem.discountRate !== undefined) {
    //       elem.discountRate = elem.discountRate / 100
    //     }
    //     if (elem.money === null || elem.money === '' || elem.money === undefined) {
    //       delete elem.money
    //     }
    //     if (elem.includeTaxMoney === null || elem.includeTaxMoney === '' || elem.includeTaxMoney === undefined) {
    //       delete elem.includeTaxMoney
    //     }
    //     if (elem.taxMoney === null || elem.taxMoney === '' || elem.taxMoney === undefined) {
    //       delete elem.taxMoney
    //     }
    //     if (elem.discountRate === null || elem.discountRate === '' || elem.discountRate === undefined) {
    //       delete elem.discountRate
    //     }
    //     if (elem.discountMoney === null || elem.discountMoney === '' || elem.discountMoney === undefined) {
    //       delete elem.discountMoney
    //     }
    //     return elem
    //   })
    //   const parms2 = JSON.stringify(EnterDetail)
    //   const Data = this.personalForm
    //   for (const key in Data) {
    //     if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
    //       delete Data[key]
    //     }
    //   }
    //   const parms = JSON.stringify(Data)
    //   this.$refs.personalForm.validate((valid) => {
    //     if (valid) {
    //       createSaleContract(parms, parms2, this.personalForm).then(res => {
    //         console.log(res)
    //         if (res.data.ret === 200) {
    //           this.$notify({
    //             title: '成功',
    //             message: '保存成功',
    //             type: 'success',
    //             offset: 100
    //           })
    //           this.restAllForm()
    //           this.$refs.editable.clear()
    //           this.$refs.personalForm.clearValidate()
    //           this.$refs.personalForm.resetFields()
    //         } else {
    //           this.$notify.error({
    //             title: '错误',
    //             message: res.data.msg,
    //             offset: 100
    //           })
    //         }
    //       })
    //     } else {
    //       this.$notify.error({
    //         title: '错误',
    //         message: '信息未填完整',
    //         offset: 100
    //       })
    //       return false
    //     }
    //   })
    // },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/SaleContract/AddSaleContract', name: 'AddSaleContract', fullPath: '/SaleContract/AddSaleContract', title: 'AddSaleContract' }
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
