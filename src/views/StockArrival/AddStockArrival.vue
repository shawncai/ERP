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
                <el-form-item :label="$t('StockArrival.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockArrival.sourceType')" prop="sourceType" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px" @change="chooseType">
                    <el-option value="1" label="采购订单" />
                    <el-option value="2" label="无来源" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockArrival.supplierId')" prop="supplierId" style="width: 100%;">
                  <el-input v-model="supplierId" style="margin-left: 18px;width:200px" clearable @focus="handlechoose"/>
                  <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
                </el-form-item>
              </el-col>
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('StockArrival.sourceNumber')" :rules="personalForm.sourceType === '2'" prop="sourceNumber" style="width: 100%;">-->
              <!--                  <el-input v-model="personalForm.sourceNumber" :disabled="addsouce" style="margin-left: 18px;width:200px" clearable @focus="handleAddSouce"/>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <el-col :span="6">
                <el-form-item :label="$t('StockArrival.stockPersonId')" prop="stockPersonId" style="width: 100%;">
                  <el-input v-model="stockPersonId" style="margin-left: 18px;width:200px" clearable @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockArrival.stockTypeId')" prop="stockType" style="width: 100%;">
                  <el-select v-model="personalForm.stockTypeId" style="margin-left: 18px;width: 200px" @focus="updatecountry">
                    <el-option
                      v-for="(item, index) in types"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockArrival.deptId')" style="width: 100%;">
                  <el-select v-model="personalForm.deptId" style="margin-left: 18px;width: 200px" @change="change()">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockArrival.payId')" style="width: 100%;">
                  <el-select v-model="personalForm.settleMode" style="margin-left: 18px;width: 200px" @change="change()">
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
                <el-form-item :label="$t('StockArrival.acceptDate')" prop="signDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.acceptDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockArrival.arrivalDate')" prop="arrivalDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.arrivalDate"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockArrival.acceptPersonId')" style="width: 100%;">
                  <el-input v-model="acceptPersonId" style="margin-left: 18px;width:200px" clearable @focus="handlechooseDelivery"/>
                </el-form-item>
                <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockArrival.deliveryModeId')" style="width: 100%;">
                  <el-select v-model="personalForm.deliveryMode" clearable style="margin-left: 18px;width: 200px">
                    <el-option
                      v-for="item in giveIds"
                      :key="item.id"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.payMode')" style="width: 100%;">
                  <el-select v-model="personalForm.payMode" clearable style="margin-left: 18px;width: 200px">
                    <el-option
                      v-for="item in payModes"
                      :key="item.id"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockArrival.isVat')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.isVat" style="margin-left: 18px;width:200px">
                    <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                    <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOrder.currency')" prop="currency" style="width: 100%;">
                  <el-select v-model="personalForm.currencyId" :disabled="IsCurrency" style="margin-left: 18px;width: 200px" @change="changeRate">
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
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >{{ $t('updates.cgdhdmx') }}</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button :disabled="addpro" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <my-detail :control.sync="control" :supp.sync="supp" @product="productdetail"/>
          <el-button :disabled="IsSourceNumber" style="width: 130px" @click="handleAddSouce">{{ $t('updates.cydzxz') }}</el-button>
          <my-order :ordercontrol.sync="ordercontrol" :supp.sync="supp" @order="order" @allOrderinfo="allOrderinfo"/>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
          <el-button type="primary" @click="checkStock()">{{ $t('updates.kckz') }}</el-button>
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
            <el-editable-column prop="color" align="center" :label="$t('updates.ys')" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.cgsl')" prop="stockQuantity" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0.00, precision: 2}, type: 'visible'}" :label="$t('updates.dhsl')" prop="arrivalQuantity" align="center" min-width="150px"/>
            <el-editable-column prop="giveDate" align="center" :label="$t('updates.jhrq')" min-width="170px"/>
            <el-editable-column :label="$t('Hmodule.dj')" prop="price" align="center" min-width="170px"/>
            <el-editable-column prop="includeTaxPrice" align="center" :label="$t('updates.hsj')" min-width="170px"/>
            <el-editable-column prop="taxRate" align="center" :label="$t('updates.sl')" min-width="170px"/>
            <el-editable-column :label="$t('Hmodule.je')" prop="money" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column prop="includeTaxMoney" align="center" :label="$t('updates.hsje')" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getTaxMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column prop="taxMoney" align="center" :label="$t('updates.se')" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getTaxMoney2(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column prop="discountRate" align="center" :label="$t('updates.ckl')" min-width="170px"/>
            <el-editable-column prop="discountMoney" align="center" :label="$t('updates.cke')" min-width="170px">
              <template slot-scope="scope">
                <p>{{ getdiscountMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column prop="remark" align="center" :label="$t('updates.bz')" min-width="150px"/>
            <el-editable-column prop="sourceNumber" align="center" :label="$t('updates.ydbh')" min-width="150px"/>
            <el-editable-column prop="sourceSerialNumber" align="center" :label="$t('updates.ydxh')" min-width="150px"/>
            <el-editable-column prop="hadStorageQuantity" align="center" :label="$t('updates.yrksl')" min-width="150px"/>
            <el-editable-column prop="reportCheckingQuantity" align="center" :label="$t('updates.bjsl')" min-width="150px"/>
            <el-editable-column prop="actualCheckingQuantity" align="center" :label="$t('updates.sjsl')" min-width="150px"/>
            <el-editable-column prop="qualifyQuantity" align="center" :label="$t('updates.hgsl')" min-width="150px"/>
            <el-editable-column prop="unqualifyQuantity" align="center" :label="$t('updates.bhgsl')" min-width="150px"/>
            <el-editable-column prop="returnQuantity" align="center" :label="$t('updates.thsl')" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('updates.dhslzj')" style="width: 100%;">
                  <el-input v-model="allNumber" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('updates.hehj')" style="width: 100%;">
                  <el-input v-model="allMoney" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('updates.sehj')" style="width: 100%;">
                  <el-input v-model="allTaxMoney" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('updates.hsjehj')" style="width: 100%;">
                  <el-input v-model="allIncludeTaxMoney" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('updates.zdzkjehj')" style="width: 100%;">
                  <el-input v-model="allDiscountMoney" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('updates.zhhsjehj')" style="width: 100%;">
                  <el-input v-model="allMoneyMoveDiscount" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item :label="$t('updates.cqtfyzchjgjhj')" style="width: 100%;">
                  <el-input v-model="personalForm.otherMoney" style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col> -->
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
import { createstockArrival } from '@/api/StockArrival'
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
import '@/directive/noMoreClick/index.js'
var _that
export default {
  name: 'AddStockArrival',
  components: { MyOrder, MyLnquiry, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp },
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
      if (this.personalForm.sourceNumber === undefined || this.personalForm.sourceNumber === null || this.personalForm.sourceNumber === '') {
        callback(new Error('请选择源单编号'))
      } else {
        callback()
      }
    }
    // const checkRate = (rule, value, callback) => {
    //   console.log(value)
    //   if (value === 0 || value === '' || value === null || value === undefined) {
    //     callback(new Error('到货数量不能为0'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      // 采购数量
      arrivalNumber: 0,
      // 控制是否可以从源单选择
      IsSourceNumber: false,
      // 带入的供应商
      supp: null,
      // 结算方式
      paymentIds: [],
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
      // 点收人回显
      IsCurrency: false,
      acceptPersonId: '',
      // 控制点收人
      deliverycontrol: false,
      // 控制源单为采购到货单
      ordercontrol: false,
      // 控制添加商品按钮
      addpro: true,
      // 控制从源单中选择按钮
      addsouce: false,
      // 供应商回显
      supplierId: '',
      // 控制供应商
      empcontrol: false,
      // 支付方式
      payModes: [],
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
      // 采购申请单信息数据
      personalForm: {
        stockPersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        isVat: 1,
        currencyId: '3',
        arrivalDate: null,
        deliveryMode: '',
        payMode: '',
        settleMode: '',
        stockTypeId: '',
        currency: '3',
        exchangeRate: '1.0000'
      },
      // 采购申请单规则数据
      personalrules: {
        supplierId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        arrivalDate: [
          { required: true, message: '请选择到货日期', trigger: 'change' }
        ],
        deptId: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        sourceNumber: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        stockTypeId: [
          { required: true, message: '请选择采购类别', trigger: 'change' }
        ],
        currencyId: [
          { required: true, message: '请选择币种', trigger: 'change' }
        ]
      },
      // 采购申请单明细数据
      list2: [],
      // 采购申请单明细列表规则
      validRules: {
        // arrivalQuantity: [
        //   { required: true, validator: checkRate, trigger: 'blur' }
        // ]
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
  methods: {
    // 处理汇率
    changeRate() {
      console.log(123)
      if (this.personalForm.currencyId !== '3') {
        getRate(this.personalForm.currencyId).then(res => {
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
      this.personalForm.arrivalDate = currentdate
      this.personalForm.arrivalDate = currentdate
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.payModes = res.data.data.content.list
        }
      })
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
      sums[6] = ''
      sums[9] = ''
      sums[10] = ''
      sums[12] = ''
      sums[16] = ''
      sums[18] = ''
      sums[19] = ''
      sums[20] = ''
      this.arrivalNumber = sums[7]
      this.allNumber = sums[8]
      this.allMoney = sums[13]
      this.allTaxMoney = sums[15]
      this.allIncludeTaxMoney = sums[14]
      this.allDiscountMoney = sums[17]
      this.allMoneyMoveDiscount = sums[14] - sums[17]
      return sums
    },
    getdiscountMoney(row) {
      if (row.discountRate === 0) {
        row.discountMoney = 0
      } else {
        row.discountMoney = (row.includeTaxPrice * row.arrivalQuantity * (row.discountRate / 100)).toFixed(2)
      }
      return row.discountMoney
    },
    // 计算税额
    getTaxMoney2(row) {
      row.taxMoney = (row.price * row.taxRate / 100 * row.arrivalQuantity).toFixed(2)
      return row.taxMoney
    },
    // 计算含税金额
    getTaxMoney(row) {
      row.includeTaxMoney = (row.arrivalQuantity * row.includeTaxPrice).toFixed(2)
      return row.includeTaxMoney
    },
    // 计算金额
    getMoney(row) {
      row.money = (row.arrivalQuantity * row.price).toFixed(2)
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
          this.paymentIds = res.data.data.content.list
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
        this.IsSourceNumber = false
      } else if (this.personalForm.sourceType === '2') {
        this.IsSourceNumber = true
        this.addpro = false
        this.addsouce = true
        this.personalForm.sourceNumber = ''
        this.$refs.editable.clear()
        this.$refs.personalForm.clearValidate()
      }
    },
    // 重置一下下拉
    change() {
      this.$forceUpdate()
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
      this.ordercontrol = true
    },
    order(val) {
      for (let i = 0; i < val.length; i++) {
        // allarrivalQuantity 到货数量
        if ((val[i].allarrivalQuantity - val[i].returnQuantity) >= val[i].stockQuantity) {
          this.$notify.error({
            title: '错误',
            message: val[i].productCode + '总到货数量-退货数量已达到订单数量',
            duration: 0
          })
        } else {
          val[i].arrivalQuantity = (val[i].stockQuantity - val[i].allarrivalQuantity + val[i].returnQuantity).toFixed(2)
          this.$refs.editable.insert(val[i])
        }
      }
    },
    allOrderinfo(val) {
      this.personalForm.sourceNumber = val.orderNumber
      this.personalForm.supplierId = val.supplierId
      this.supplierId = val.supplierName
      this.personalForm.stockPersonId = val.stockPersonId
      this.stockPersonId = val.stockPersonName
      this.personalForm.stockTypeId = val.stockTypeId
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
      // 结算方式
      searchCategory(5).then(res => {
        if (res.data.ret === 200) {
          this.paymentIds = res.data.data.content.list
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
      this.supp = val.id
      this.supplierId = val.supplierName
      this.personalForm.supplierId = val.id
      this.personalForm.deliveryMode = val.deliveryMode
      this.personalForm.settleMode = val.settleMode
      this.personalForm.payMode = val.payMode
      if (val.giveId !== null && val.giveId !== '' && val.giveId !== undefined) {
        this.personalForm.deliveryMode = val.giveId
      }
      if (val.payMode !== null && val.payMode !== '' && val.payMode !== undefined) {
        this.personalForm.payMode = val.paymentId
      }
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
        stockPersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        isVat: 1,
        sourceType: '1'
      }
      this.supplierId = null
      this.inquiryPersonId = null
      this.stockPersonId = this.$store.getters.name
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
              title: '错误',
              message: '明细表不能为空',
              offset: 100
            })
            return false
          }
          let ll = 1
          let lll = 1
          console.log('ll', ll)
          EnterDetail.map(function(elem) {
            return elem
          }).forEach(function(elem) {
            if (elem.arrivalQuantity === 0) {
              ll = 2
            }
            // 订单数量-到货数量+退货数量 < 0
            if ((elem.stockQuantity - elem.arrivalQuantity + elem.returnQuantity) < 0) {
              lll = 2
            }
          })
          console.log('ll', ll)
          console.log('lll', lll)
          if (ll === 2) {
            this.$notify.error({
              title: '错误',
              message: '到货数量不能为0',
              offset: 100
            })
            return false
          }
          if (lll === 2) {
            this.$notify.error({
              title: '错误',
              message: '不允许超过关联的采购订单数量',
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
            if (elem.stockQuantity === null || elem.stockQuantity === '' || elem.stockQuantity === undefined) {
              delete elem.stockQuantity
            }
            if (elem.arrivalQuantity === null || elem.arrivalQuantity === '' || elem.arrivalQuantity === undefined) {
              delete elem.arrivalQuantity
            }
            if (elem.giveDate === null || elem.giveDate === '' || elem.giveDate === undefined) {
              delete elem.giveDate
            }
            if (elem.price === null || elem.price === '' || elem.price === undefined) {
              delete elem.price
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
            if (key === 'judgeStat') {
              delete Data[key]
            }
          }
          const parms = JSON.stringify(Data)
          if (EnterDetail.length === 0) {
            this.$notify.error({
              title: '错误',
              message: '明细表不能为空',
              offset: 100
            })
            return false
          }
          this.$refs.editable.validate().then(valid => {
            if (this.arrivalNumber > this.allNumber) {
              this.$confirm('到货数量小于采购数量, 是否继续保存?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                createstockArrival(parms, parms2, this.personalForm).then(res => {
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
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消保存'
                })
                return false
              })
            } else {
              createstockArrival(parms, parms2, this.personalForm).then(res => {
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
            }
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
      const view = { path: '/StockArrival/AddStockArrival', name: 'AddStockArrival', fullPath: '/StockArrival/AddStockArrival', title: 'AddStockArrival' }
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
