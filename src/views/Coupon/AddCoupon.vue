<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">基本信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="135px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Coupon.name')" prop="name" style="width: 100%;">
                  <el-input v-model="personalForm.name" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Coupon.money')" prop="money" style="width: 100%;">
                  <el-input-number v-model="personalForm.money" :precision="2" :controls="false" :step="0.1" :min="0" style="margin-left: 11px;width: 200px;text-align: left"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Coupon.requireMoney')" prop="requireMoney" style="width: 100%;">
                  <el-input-number v-model="personalForm.requireMoney" :precision="2" :controls="false" :step="0.1" :min="0" style="margin-left: 11px;width: 200px;text-align: left"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Coupon.beginTime')" prop="beginTime" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.beginTime"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Coupon.endTime')" prop="endTime" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.endTime"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Coupon.beginClock')" style="width: 100%;">
                  <el-input-number v-model="personalForm.beginClock" :precision="0" :controls="false" :step="0.1" :min="0" :max="12" style="margin-left: 11px;width: 200px;text-align: left"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Coupon.endClock')" style="width: 100%;">
                  <el-input-number v-model="personalForm.endClock" :precision="0" :controls="false" :step="0.1" :min="0" :max="12" style="margin-left: 11px;width: 200px;text-align: left"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Coupon.isDiscount')" prop="isDiscount" style="width: 100%;">
                  <el-radio-group v-model="personalForm.isDiscount" style="margin-left: 18px;width: 200px">
                    <el-radio :label="1" style="width: 100px">YES</el-radio>
                    <el-radio :label="2">NO</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Coupon.isToday')" prop="isToday" style="width: 100%;">
                  <el-radio-group v-model="personalForm.isToday" style="margin-left: 18px;width: 200px">
                    <el-radio :label="1" style="width: 100px">YES</el-radio>
                    <el-radio :label="2">NO</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Coupon.applicableWeek')" style="width: 100%;">
                  <el-select v-model="personalForm.applicableWeek" multiple collapse-tags style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="周一"/>
                    <el-option value="2" label="周二"/>
                    <el-option value="3" label="周三"/>
                    <el-option value="4" label="周四"/>
                    <el-option value="5" label="周五"/>
                    <el-option value="6" label="周六"/>
                    <el-option value="7" label="周日"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Coupon.content')" style="width: 100%;">
                  <el-input v-model="personalForm.content" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >适用商品</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button :disabled="Isproduct" @click="handleAddproduct">添加商品</el-button>
          <my-detail :control.sync="control" @product="productdetail"/>
          <my-order :ordercontrol.sync="ordercontrol" @saleOrderDetail="saleOrderDetail" @saleOrder="saleOrder"/>
          <my-presale :presalecontrol.sync="presalecontrol" @advanceOrderDetail="advanceOrderDetail" @advanceData="advanceData"/>
          <my-opportunity :opportunitycontrol.sync="opportunitycontrol" @opportunityDetail="opportunityDetail" @opportunity="opportunity"/>
          <my-contract :contractcontrol.sync="contractcontrol" @salecontractDetail="salecontractDetail" @salecontract="salecontract"/>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">删除</el-button>
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
            stripe
            border
            size="medium"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column label="序号" fixed="left" min-width="55" align="center" type="index"/>
            <el-editable-column prop="code" fixed="left" align="center" label="物品编号" />
            <el-editable-column prop="productName" fixed="left" align="center" label="物品名称" />
            <el-editable-column prop="category" align="center" label="物品分类" />
            <el-editable-column prop="purchaseMeasurement" align="center" label="基本单位" />
            <el-editable-column prop="productType" align="center" label="规格型号" />
            <el-editable-column prop="color" align="center" label="颜色" />
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">保存</el-button>
        <el-button type="danger" @click="handlecancel()">取消</el-button>
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
                <el-table-column :resizable="false" label="仓库" align="center" min-width="150">
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
import { createCoupon } from '@/api/Coupon'
import { searchSaleCategory } from '@/api/SaleCategory'
import { getlocation, locationlist, countlist3 } from '@/api/public'
import MyEmp from './components/MyEmp'
import MyDelivery from '../DailyAdjust/components/MyDelivery'
import MyDetail from './components/MyDetail'
import { searchCategory } from '@/api/Supplier'
import MyApply from './components/MyApply'
import MySupplier from '../Product/components/MySupplier'
import MyRequire from './components/MyRequire'
import MyCustomer from './components/MyCustomer'
import MyAgent from './components/MyAgent'
import MyAccept from './components/MyAccept'
import MyRepository from './components/MyRepository'
import MyOrder from './components/MyOrder'
import MyAdvance from './components/MyAdvance'
import MyPresale from './components/MyPresale'
import MyOpportunity from './components/MyOpportunity'
import MyDetail2 from './components/MyDetail2'
import MyContract from './components/MyContract'
export default {
  name: 'AddCoupon',
  components: { MyContract, MyDetail2, MyOpportunity, MyPresale, MyAdvance, MyOrder, MyRepository, MyAccept, MyAgent, MyCustomer, MyRequire, MySupplier, MyApply, MyDetail, MyDelivery, MyEmp },
  data() {
    return {
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      // 合计信息
      heji1: '',
      heji2: '',
      heji3: '',
      heji4: '',
      heji5: '',
      heji6: '',
      heji7: '',
      heji8: '',
      heji9: '',
      heji10: '',
      heji11: '',
      // 货位数据
      locationlist: [],
      // 控制销售合同
      contractcontrol: false,
      // 控制赠品
      giftcontrol: false,
      // 控制销售机会单
      opportunitycontrol: false,
      // 控制销售预售单
      presalecontrol: false,
      // 控制销售订单
      ordercontrol: false,
      // 控制是否可以编辑添加商品
      Isproduct: false,
      // 控制是否从源单添加
      IsSourceNumber: false,
      // 回收车金额
      huishou: '0.00',
      // 预售款金额
      yushou: '0.00',
      // 仓库回显
      saleRepositoryId: '',
      // 控制仓库
      repositorycontrol: false,
      // 回显出库人
      outPersonId: '',
      // 控制出库人
      accetpcontrol: false,
      // 回显运货人
      transferPersonId: '',
      payModes: [],
      // 控制交货人
      deliverycontrol: false,
      // 回显职务
      roleId: '',
      // 回显客户
      customerId: '',
      // 控制客户
      customercontrol: false,
      agentcontrol: false,
      // 选择的数据
      choosedata: [],
      // 销售人员回显
      salePersonId: '',
      // 控制销售人员
      stockControl: false,
      // 开票类别数据
      invoiceTypes: [],
      // 开票类别获取参数
      invoicetypeparms: {
        type: 4,
        pagenum: 1,
        pagesize: 99999
      },
      // 结算方式数据
      colseTypes: [],
      // 结算方式获取参数
      colseTypeparms: {
        type: 3,
        pagenum: 1,
        pagesize: 99999
      },
      // 控制商品列表窗口
      control: false,
      // 销售订单信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        isDiscount: 1,
        isToday: 1,
        stat: 1,
        requireMoney: 0
      },
      // 销售订单规则数据
      personalrules: {
        name: [
          { required: true, message: '请输入优惠券名称', trigger: 'change' }
        ],
        money: [
          { required: true, message: '请输入面值', trigger: 'change' }
        ],
        beginTime: [
          { required: true, message: '请输入开始时间', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请输入截止时间', trigger: 'change' }
        ]
      },
      // 订单明细数据
      list2: [],
      // 销售费用明细
      list3: [],
      // 明细列表规则
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
    this.getdatatime()
  },
  mounted() {
    this.getinformation()
    this.getinformation2()
    this.getinformation3()
  },
  methods: {
    checkStock(row) {
      console.log('this.personalForm.saleRepositoryId', this.personalForm.saleRepositoryId)
      if (this.personalForm.saleRepositoryId === null || this.personalForm.saleRepositoryId === undefined || this.personalForm.saleRepositoryId === '') {
        this.$notify.error({
          title: '错误',
          message: '请先选择出库仓库',
          offset: 100
        })
        return false
      } else {
        console.log('this.moreaction.length', this.moreaction.length)
        if (this.moreaction.length > 1 || this.moreaction.length === 0) {
          this.$message.error('请选择单个商品')
        } else {
          countlist3(this.personalForm.saleRepositoryId, this.moreaction[0].productCode).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              console.log('res.data.data.content', res.data.data.content)
              this.list111 = res.data.data.content
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
      }
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    getinformation3() {
      if (this.$store.getters.empcontract3) {
        console.log('getempcontract3', this.$store.getters.empcontract3)
        this.personalForm.sourceType = '3'
        this.Isproduct = true
        this.IsSourceNumber = false
        this.personalForm.customerType = '2'
        this.personalForm.customerId = this.$store.getters.empcontract3.customerId
        this.customerId = this.$store.getters.empcontract3.customerName
        this.personalForm.customerPhone = this.$store.getters.empcontract3.phone
        this.personalForm.salePersonId = this.$store.getters.empcontract3.salePersonId
        this.salePersonId = this.$store.getters.empcontract3.salePersonName
        if (this.$store.getters.empcontract3.payMode !== null && this.$store.getters.empcontract3.payMode !== undefined && this.$store.getters.empcontract3.payMode !== '') {
          this.personalForm.payMode = this.$store.getters.empcontract3.payMode
        }
        this.personalForm.saleRepositoryId = this.$store.getters.empcontract3.saleRepositoryId
        this.saleRepositoryId = this.$store.getters.empcontract3.saleRepositoryName
        this.personalForm.address = this.$store.getters.empcontract3.address
        for (let i = 0; i < this.$store.getters.empcontract3.advanceOrderDetailVos.length; i++) {
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].categoryName = this.$store.getters.empcontract3.advanceOrderDetailVos[i].productCategoryName
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].category = this.$store.getters.empcontract3.advanceOrderDetailVos[i].categoryId
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].typeName = this.$store.getters.empcontract3.advanceOrderDetailVos[i].productType
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].type = this.$store.getters.empcontract3.advanceOrderDetailVos[i].typeId
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].taxprice = this.$store.getters.empcontract3.advanceOrderDetailVos[i].salePrice
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].sourceNumber = this.$store.getters.empcontract3.advanceNumber
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].sourceSerialNumber = this.$store.getters.empcontract3.advanceOrderDetailVos[i].id
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].categoryName = this.$store.getters.empcontract3.advanceOrderDetailVos[i].productCategoryName
          this.$refs.editable.insert(this.$store.getters.empcontract3.advanceOrderDetailVos[i])
        }
        this.$store.dispatch('getempcontract3', '')
      }
    },
    getinformation2() {
      if (this.$store.getters.empcontract2) {
        console.log('getempcontract2', this.$store.getters.empcontract2)
        this.personalForm.sourceType = '4'
        this.Isproduct = true
        this.IsSourceNumber = false
        if (this.$store.getters.empcontract2.customerType !== null && this.$store.getters.empcontract2.customerType !== undefined && this.$store.getters.empcontract2.customerType !== '') {
          this.personalForm.customerType = String(this.$store.getters.empcontract2.customerType)
        }
        // this.personalForm.customerId = val.customerId
        this.customerId = this.$store.getters.empcontract2.customerName
        this.personalForm.customerPhone = this.$store.getters.empcontract2.customerPhone
        this.personalForm.salePersonId = this.$store.getters.empcontract2.handlePersonId
        this.salePersonId = this.$store.getters.empcontract2.handlePersonName
        this.personalForm.handleRepositoryId = this.$store.getters.empcontract2.handleRepositoryId
        this.handleRepositoryId = this.$store.getters.empcontract2.handleRepositoryName
        for (let i = 0; i < this.$store.getters.empcontract2.saleOpportunityDetailVos.length; i++) {
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].categoryName = this.$store.getters.empcontract2.saleOpportunityDetailVos[i].productCategory
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].category = this.$store.getters.empcontract2.saleOpportunityDetailVos[i].categoryId
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].typeName = this.$store.getters.empcontract2.saleOpportunityDetailVos[i].productType
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].type = this.$store.getters.empcontract2.saleOpportunityDetailVos[i].typeId
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].quantity = 0
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].salePrice = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].costPrice = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].taxprice = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].costMoney = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].includeTaxMoney = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].taxRate = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].taxMoney = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].money = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].includeTaxCostMoney = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].discount = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].discountMoney = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].carCode = 0
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].motorCode = 0
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].batteryCode = 0
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].sourceNumber = this.$store.getters.empcontract2.opportunityNumber
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].sourceSerialNumber = this.$store.getters.empcontract2.saleOpportunityDetailVos[i].id
          this.$refs.editable.insert(this.$store.getters.empcontract2.saleOpportunityDetailVos[i])
        }
        this.$store.dispatch('getempcontract2', '')
      }
    },
    getinformation() {
      if (this.$store.getters.empcontract) {
        console.log('getempcontract', this.$store.getters.empcontract)
        this.personalForm.sourceType = '1'
        this.Isproduct = true
        this.IsSourceNumber = false
        if (this.$refs.editable.getRecords().length !== 0 && this.$refs.editable.getRecords() !== undefined && this.$refs.editable.getRecords() !== null) {
          this.$refs.editable.clear()
        }
        this.personalForm.sourceNumber = this.$store.getters.empcontract.number
        if (this.$store.getters.empcontract.customerType !== null && this.$store.getters.empcontract.customerType !== undefined && this.$store.getters.empcontract.customerType !== '') {
          this.personalForm.customerType = String(this.$store.getters.empcontract.customerType)
        }
        this.personalForm.customerId = this.$store.getters.empcontract.customerId
        this.customerId = this.$store.getters.empcontract.customerName
        this.personalForm.customerPhone = this.$store.getters.empcontract.customerPhone
        this.personalForm.salePersonId = this.$store.getters.empcontract.salePersonId
        this.salePersonId = this.$store.getters.empcontract.salePersonName
        this.personalForm.settleMode = this.$store.getters.empcontract.settleMode
        this.personalForm.saleRepositoryId = this.$store.getters.empcontract.saleRepositoryId
        this.saleRepositoryId = this.$store.getters.empcontract.saleRepositoryName
        this.personalForm.address = this.$store.getters.empcontract.transAddress
        for (let i = 0; i < this.$store.getters.empcontract.saleOrderDetailVos.length; i++) {
          this.$store.getters.empcontract.saleOrderDetailVos[i].categoryName = this.$store.getters.empcontract.saleOrderDetailVos[i].productCategoryName
          this.$store.getters.empcontract.saleOrderDetailVos[i].category = this.$store.getters.empcontract.saleOrderDetailVos[i].productCategory
          this.$store.getters.empcontract.saleOrderDetailVos[i].typeName = this.$store.getters.empcontract.saleOrderDetailVos[i].productTypeName
          this.$store.getters.empcontract.saleOrderDetailVos[i].type = this.$store.getters.empcontract.saleOrderDetailVos[i].productType
          this.$store.getters.empcontract.saleOrderDetailVos[i].kpiGrade = '0.00'
          this.$store.getters.empcontract.saleOrderDetailVos[i].point = '0.00'
          this.$store.getters.empcontract.saleOrderDetailVos[i].carCode = 0
          this.$store.getters.empcontract.saleOrderDetailVos[i].motorCode = 0
          this.$store.getters.empcontract.saleOrderDetailVos[i].batteryCode = 0
          this.$store.getters.empcontract.saleOrderDetailVos[i].sourceNumber = this.$store.getters.empcontract.number
          this.$store.getters.empcontract.saleOrderDetailVos[i].sourceSerialNumber = this.$store.getters.empcontract.saleOrderDetailVos[i].id
          this.$refs.editable.insert(this.$store.getters.empcontract.saleOrderDetailVos[i])
        }
        this.$store.dispatch('getempcontract', '')
      }
    },
    // 重置一下下拉
    change() {
      this.$forceUpdate()
    },
    updatebatch(event, scope) {
      if (event === true) {
        if (this.personalForm.saleRepositoryId === undefined || this.personalForm.saleRepositoryId === '') {
          this.$notify.error({
            title: '错误',
            message: '请先选择仓库',
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.saleRepositoryId, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
            } else if (res.data.data.content.length === 0) {
              locationlist(this.personalForm.saleRepositoryId).then(res => {
                if (res.data.ret === 200) {
                  this.locationlist = res.data.data.content.list
                }
              })
            }
          }
        })
      }
    },
    chooseSourceType(val) {
      console.log(val)
      if (val === '5' || val === undefined) {
        this.Isproduct = false
        this.IsSourceNumber = true
        if (this.$refs.editable.getRecords().length !== 0 && this.$refs.editable.getRecords() !== undefined && this.$refs.editable.getRecords() !== null) {
          this.$refs.editable.clear()
        }
      } else {
        this.Isproduct = true
        this.IsSourceNumber = false
        if (this.$refs.editable.getRecords().length !== 0 && this.$refs.editable.getRecords() !== undefined && this.$refs.editable.getRecords() !== null) {
          this.$refs.editable.clear()
        }
      }
    },
    // 出库仓库focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      this.saleRepositoryId = val.repositoryName
      this.personalForm.saleRepositoryId = val.id
    },
    // 出库人focus事件触发
    handlechooseAccept() {
      this.accetpcontrol = true
    },
    acceptName(val) {
      this.outPersonId = val.personName
      this.personalForm.outPersonId = val.id
    },
    // 运货人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.transferPersonId = val.personName
      this.personalForm.transferPersonId = val.id
    },
    getdatatime() { // 默认显示今天
      this.personalForm.sendDate = new Date()
      this.personalForm.outDate = new Date()
    },
    // 总计
    getSummaries2(param) {
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
      sums[1] = ''
      sums[2] = ''
      sums[3] = ''
      sums[4] = ''
      sums[5] = ''
      sums[6] = ''
      sums[7] = ''
      sums[8] = ''
      sums[9] = ''
      sums[10] = ''
      sums[11] = ''
      this.personalForm.otherMoney = sums[12]
      return sums
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
      sums[1] = ''
      sums[2] = ''
      sums[3] = ''
      sums[4] = ''
      sums[5] = ''
      sums[6] = ''
      sums[7] = ''
      sums[8] = ''
      sums[9] = ''
      sums[10] = ''
      sums[11] = ''
      sums[13] = ''
      sums[14] = ''
      sums[15] = ''
      sums[18] = ''
      sums[22] = ''
      sums[24] = ''
      sums[25] = ''
      sums[26] = ''
      sums[27] = ''
      this.heji1 = sums[12]
      this.heji2 = sums[20]
      this.heji3 = sums[17]
      this.heji4 = sums[19]
      this.heji5 = sums[23]
      this.heji6 = sums[17] - sums[23]
      this.heji7 = sums[21]
      this.heji8 = sums[16]
      return sums
    },
    // 计算成本金额
    getcostMoney(row) {
      row.costMoney = (row.costPrice * row.quantity).toFixed(2)
      return row.costMoney
    },
    // 计算含税金额
    getincludeTaxMoney(row) {
      row.includeTaxMoney = (row.taxprice * row.quantity).toFixed(2)
      row.discountMoney = (row.taxprice * row.quantity * (1 - row.discountRate / 100)).toFixed(2)
      return row.includeTaxMoney
    },
    // 通过税率计算含税价
    gettaxRate(row) {
      if (row.taxprice !== 0) {
        row.taxprice = (row.salePrice * (1 + row.taxRate / 100)).toFixed(2)
      }
    },
    // 计算税额
    getTaxMoney2(row) {
      row.taxMoney = (row.salePrice * row.taxRate / 100 * row.quantity).toFixed(2)
      return row.taxMoney
    },
    // 通过折扣计算折扣额
    getdiscountRate(row) {
      if (row.discountRate === 0) {
        row.discountMoney = row.taxprice * row.quantity
      } else {
        row.discountMoney = (row.taxprice * row.quantity * (1 - row.discountRate / 100)).toFixed(2)
      }
    },
    // 通过折扣额计算折扣
    getdiscountMoney(row) {
      console.log(row)
      if (row.taxprice !== 0 && row.quantity !== 0 && row.discountMoney !== 0) {
        row.discountRate = ((1 - (row.discountMoney / row.includeTaxCostMoney).toFixed(2)) * 100).toFixed(2)
      }
    },
    // 计算金额
    getMoney(row) {
      row.money = (row.quantity * row.salePrice).toFixed(2)
      return row.money
    },
    // 含税价
    gettaxprice(row) {
      row.taxprice = (row.salePrice * (1 + row.taxRate / 100)).toFixed(2)
      return row.taxprice
    },
    getincludeTaxCostMoney(row) {
      row.includeTaxCostMoney = Number(row.salePrice * row.quantity) + Number(row.taxMoney)
      return row.includeTaxCostMoney
    },
    // 选择客户类型时清理客户名称
    clearCustomer() {
      this.personalForm.customerId = ''
      this.customerId = ''
    },
    // 选择客户focus
    chooseCustomer() {
      this.$forceUpdate()
      if (this.personalForm.customerType === '1') {
        this.agentcontrol = true
        this.$forceUpdate()
      } else if (this.personalForm.customerType === '2') {
        this.customercontrol = true
        this.$forceUpdate()
      }
    },
    customerdata(val) {
      console.log(val)
      this.personalForm.transAddress = val.address
      this.personalForm.customerId = val.id
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.phoneNumber
    },
    agentdata(val) {
      console.log(val)
      this.personalForm.transAddress = val.address
      this.personalForm.customerId = val.id
      this.customerId = val.agentName
      this.personalForm.customerPhone = val.phone
    },
    // 从源单添加商品
    handleAddSource() {
      if (this.personalForm.sourceType === '1') {
        this.ordercontrol = true
      } else if (this.personalForm.sourceType === '2') {
        this.contractcontrol = true
      } else if (this.personalForm.sourceType === '3') {
        this.presalecontrol = true
      } else if (this.personalForm.sourceType === '4') {
        this.opportunitycontrol = true
      }
    },
    // 从销售订单过来数据
    saleOrderDetail(val) {
      console.log('val', val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
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
    saleOrder(val) {
      if (val.customerType !== null && val.customerType !== undefined && val.customerType !== '') {
        this.personalForm.customerType = String(val.customerType)
      }
      this.personalForm.customerId = val.customerId
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.customerPhone
      this.personalForm.salePersonId = val.salePersonId
      this.salePersonId = val.salePersonName
      this.personalForm.settleMode = val.settleMode
      // if (val.payType !== null && val.payType !== undefined && val.payType !== '') {
      //   this.personalForm.payType = String(val.payType)
      // }
      this.personalForm.saleRepositoryId = val.saleRepositoryId
      this.saleRepositoryId = val.saleRepositoryName
      this.personalForm.address = val.transAddress
    },
    // 从预售单过来的源单数据
    advanceOrderDetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
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
    advanceData(val) {
      this.personalForm.customerType = '2'
      this.personalForm.customerId = val.customerId
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.phone
      this.personalForm.salePersonId = val.salePersonId
      this.salePersonId = val.salePersonName
      if (val.payMode !== null && val.payMode !== undefined && val.payMode !== '') {
        this.personalForm.payMode = val.payMode
      }
      this.personalForm.saleRepositoryId = val.saleRepositoryId
      this.saleRepositoryId = val.saleRepositoryName
      this.personalForm.address = val.address
    },
    // 从销售机会过来的源单数据
    opportunityDetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
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
    opportunity(val) {
      console.log(val)
      if (val.customerType !== null && val.customerType !== undefined && val.customerType !== '') {
        this.personalForm.customerType = String(val.customerType)
      }
      // this.personalForm.customerId = val.customerId
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.customerPhone
      this.personalForm.salePersonId = val.handlePersonId
      this.salePersonId = val.handlePersonName
      this.personalForm.handleRepositoryId = val.handleRepositoryId
      this.handleRepositoryId = val.handleRepositoryName
    },
    // 源单类型为销售合同
    salecontractDetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
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
    salecontract(val) {
      if (val.customerType !== null && val.customerType !== undefined && val.customerType !== '') {
        this.personalForm.customerType = '2'
      }
      this.personalForm.customerId = val.customerId
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.customerPhone
      this.personalForm.salePersonId = val.salePersonId
      this.salePersonId = val.salePersonName
      this.personalForm.handleRepositoryId = val.saleRepositoryId
      this.handleRepositoryId = val.saleRepositoryName
      if (val.saleType !== null && val.saleType !== undefined && val.saleType !== '') {
        this.personalForm.saleType = String(val.saleType)
      }
      this.personalForm.settleMode = val.closeType
      this.personalForm.invoiceType = val.invoiceType
      if (val.payType !== null && val.payType !== undefined && val.payType !== '') {
        this.personalForm.payType = String(val.payType)
      }
    },
    // 无来源添加商品
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
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
    // 添加赠品
    handleAddGift() {
      this.giftcontrol = true
    },
    gift(val) {
      const nowlistdata = this.$refs.editable2.getRecords()
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
        this.$refs.editable2.insert(val[i])
      }
    },
    deleteChange(val) {
      this.choosedata = val
    },
    // 更新类型
    updatecountry() {
      this.getTypes()
    },
    getTypes() {
      // 开票类型数据
      searchSaleCategory(this.invoicetypeparms).then(res => {
        if (res.data.ret === 200) {
          this.invoiceTypes = res.data.data.content.list
        }
      })
      // 结算方式数据
      searchCategory(5).then(res => {
        if (res.data.ret === 200) {
          this.colseTypes = res.data.data.content.list
        }
      })
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.payModes = res.data.data.content.list
        }
      })
    },
    // 销售人员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 销售员回显
    stockName(val) {
      this.salePersonId = val.personName
      this.personalForm.salePersonId = val.id
      this.saleRepositoryId = val.repositoryName
      this.personalForm.saleRepositoryId = val.repositoryId
      this.roleId = val.postName
      this.personalForm.roleId = val.postId
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        isDiscount: 1,
        isToday: 1,
        stat: 1,
        applicableWeek: [],
        requireMoney: 0
      }
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
          let applicableProductId = ''
          EnterDetail.map(function(elem) {
            return elem
          }).forEach(function(elem) {
            console.log('id', elem.id)
            if (elem.id !== null || elem.id !== '' || elem.id !== undefined) {
              applicableProductId = applicableProductId + ',' + elem.id
            }
            if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
              delete elem.productCode
            }
            if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
              delete elem.productName
            }
            if (elem.category === null || elem.category === '' || elem.category === undefined) {
              delete elem.category
            }
            if (elem.type === null || elem.type === '' || elem.type === undefined) {
              delete elem.type
            }
            if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
              delete elem.unit
            }
            if (elem.color === null || elem.color === '' || elem.color === undefined) {
              delete elem.color
            }
            if (elem.kpiGrade === null || elem.kpiGrade === '' || elem.kpiGrade === undefined) {
              delete elem.kpiGrade
            }
            if (elem.point === null || elem.point === '' || elem.point === undefined) {
              delete elem.point
            }
            if (elem.quantity === null || elem.quantity === '' || elem.quantity === undefined) {
              delete elem.quantity
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
            if (elem.taxRate !== null || elem.taxRate !== '' || elem.taxRate !== undefined) {
              elem.taxRate = elem.taxRate / 100
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
            if (elem.discountRate === null || elem.discountRate === '' || elem.discountRate === undefined) {
              delete elem.discountRate
            }
            if (elem.discountRate !== null || elem.discountRate !== '' || elem.discountRate !== undefined) {
              elem.discountRate = elem.discountRate / 100
            }
            if (elem.discountMoney === null || elem.discountMoney === '' || elem.discountMoney === undefined) {
              delete elem.discountMoney
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
            return elem
          })
          console.log('resulet', applicableProductId)
          if (applicableProductId !== '') {
            applicableProductId = applicableProductId + ','
          }
          this.personalForm.applicableProductId = applicableProductId
          const Data = this.personalForm
          for (const key in Data) {
            if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
              delete Data[key]
            }
          }
          const parms = JSON.stringify(Data)
          createCoupon(parms).then(res => {
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
      const view = { path: '/Coupon/AddCoupon', name: 'AddCoupon', fullPath: '/Coupon/AddCoupon', title: 'AddCoupon' }
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
