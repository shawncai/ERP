<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('StockRetreat.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockRetreat.sourceType')" prop="sourceType" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px" @change="chooseType">
                    <el-option value="1" label="采购到货单" />
                    <el-option :label="$t('update4.wulaiyuan')" value="4" />
                    <el-option value="2" label="采购入库单" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockRetreat.supplierId')" prop="supplierId" style="width: 100%;">
                  <el-input v-model="supplierId" style="margin-left: 18px;width: 200px" @focus="handlechoose"/>
                  <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockRetreat.sourceNumber')" style="width: 100%;">
                  <el-input v-model="personalForm.sourceNumber" :disabled="addsouce" style="margin-left: 18px;width:200px" clearable @focus="handleAddSouce"/>
                  <my-arrival :arrivalcontrol.sync="arrivalcontrol" @arrival="arrival" @allarrivalinfo="allarrivalinfo"/>
                  <my-enter :entercontrol.sync="entercontrol" @enter="enter" @enterinfo="enterinfo"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockRetreat.stockPersonId')" prop="stockPersonId" style="width: 100%;">
                  <el-input v-model="stockPersonId" style="margin-left: 18px;width: 200px" clearable @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockRetreat.stockTypeId')" prop="stockType" style="width: 100%;">
                  <el-select v-model="personalForm.stockTypeId" style="margin-left: 18px;width: 200px" @focus="updatecountry">
                    <el-option
                      v-for="(item, index) in types"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockRetreat.deptId')" prop="deptId" style="width: 100%;">
                  <el-select v-model="personalForm.deptId" clearable style="margin-left: 18px;width: 200px">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Supplier.payMode')" style="width: 100%;">
                  <el-select v-model="personalForm.payMode" clearable style="margin-left: 18px;width: 200px">
                    <el-option
                      v-for="(item, index) in payModes"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Supplier.settleMode')" style="width: 100%;">
                  <el-select v-model="personalForm.settleMode" placeholder="请选择结算方式" style="margin-left: 18px;width: 200px" @focus="updatePaymen">
                    <el-option
                      v-for="(item, index) in settleModes"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockRetreat.retreatDate')" prop="signDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.retreatDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockRetreat.deliveryModeId')" style="width: 100%;">
                  <el-select v-model="personalForm.deliveryMode" clearable style="margin-left: 18px;width: 200px">
                    <el-option
                      v-for="(item, index) in giveIds"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockRetreat.isVat')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.isVat" style="margin-left: 18px;width: 200px">
                    <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                    <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockOrder.currency')" prop="currency" style="width: 100%;">
                  <el-select v-model="personalForm.currencyId" :disabled="IsCurrency" style="margin-left: 18px;width: 200px" @change="changeRate">
                    <el-option value="1" label="PHP"/>
                    <el-option value="2" label="USD"/>
                    <el-option value="3" label="RMB"/>
                    <el-option value="4" label="LKR"/>
                    <el-option value="5" label="THB"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Recycling.exchangeRate')" style="width: 100%;">
                  <el-input v-model="personalForm.exchangeRate" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockRetreat.acceptAddress')" style="width: 100%;">
                  <el-input v-model="personalForm.acceptAddress" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockRetreat.transportModeId')" style="width: 100%;">
                  <el-select v-model="personalForm.transportModeId" clearable style="margin-left: 18px;width: 200px">
                    <el-option
                      v-for="(item, index) in transportIds"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.cgthdmx') }}</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button :disabled="addpro" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
        <my-detail :control.sync="control" :supp.sync="supp" @product="productdetail"/>
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
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
          style="width: 100%">
          <el-editable-column type="selection" fixed="left" min-width="55" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" fixed="left" min-width="50" align="center" type="index"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" fixed="left" prop="productCode" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" fixed="left" prop="productName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" fixed="left" prop="typeName" align="center" min-width="100px"/>
          <el-editable-column :label="$t('updates.ys')" fixed="left" prop="color" align="center" min-width="100px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.dhsl')" prop="arrivalQuantity" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="200">
            <template slot="edit" slot-scope="scope">
              <el-select v-model="scope.row.batch" :value="scope.row.batch" :placeholder="$t('Hmodule.xcpc')" filterable style="margin-left: 18px;width: 100%;margin-bottom: 0; padding: 0 20px" @visible-change="updatebatch2($event,scope)">
                <el-option
                  v-for="(item, index) in batchlist"
                  :key="index"
                  :value="item"
                  :label="item"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible', events: {change: jungleNumbers}}" :label="$t('updates.thsl')" prop="retreatQuantity" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.thyy')" prop="retreatReason" align="center" min-width="170px"/>
          <el-editable-column :label="$t('Hmodule.dj')" prop="price" align="center" min-width="170px">
            <template slot-scope="scope">
              <p v-show="jundgeprice()">{{ scope.row.price }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.hsj')" prop="includeTaxPrice" align="center" min-width="170px">
            <template slot-scope="scope">
              <p v-show="jundgeprice()">{{ scope.row.includeTaxPrice }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.sl')" prop="taxRate" align="center" min-width="170px">
            <template slot-scope="scope">
              <p v-show="jundgeprice()">{{ gettaxRate(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('Hmodule.je')" prop="money" align="center" min-width="150px">
            <template slot-scope="scope">
              <p v-show="jundgeprice()">{{ getMoney(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.hsje')" prop="includeTaxMoney" align="center" min-width="150px">
            <template slot-scope="scope">
              <p v-show="jundgeprice()">{{ getTaxMoney(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.se')" prop="taxMoney" align="center" min-width="150px">
            <template slot-scope="scope">
              <p v-show="jundgeprice()">{{ getTaxMoney2(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.ckl')" prop="discountRate" align="center" min-width="170px">
            <template slot-scope="scope">
              <p v-show="jundgeprice()">{{ scope.row.discountRate }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.cke')" prop="discountMoney" align="center" min-width="170px">
            <template slot-scope="scope">
              <p v-show="jundgeprice()">{{ getdiscountMoney(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('update4.invoiceQuantity')" prop="invoiceQuantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.bz')" prop="remark" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ydbh')" prop="sourceNumber" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ydxh')" prop="sourceSerialNumber" align="center" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('updates.thslzj')" style="width: 100%;">
                <el-input v-model="allNumber" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col v-if="jundgeprice()" :span="12">
              <el-form-item :label="$t('updates.hehj')" style="width: 100%;">
                <el-input v-model="allMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col v-if="jundgeprice()" :span="12">
              <el-form-item :label="$t('updates.sehj')" style="width: 100%;">
                <el-input v-model="allTaxMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="抵应付账款" style="width: 100%;">
                <el-input v-model="allIncludeTaxMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="12">
              <el-form-item label="应退货款合计" style="width: 100%;">
                <el-input v-model="allDiscountMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col> -->
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        <el-button type="primary" @click="handleEditok()">{{ $t('Hmodule.baoc') }}</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { querytax } from '@/api/StockOrder'
import { getRate, batchlist } from '@/api/public'
import { updatestockRetreat } from '@/api/StockRetreat'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchCategory } from '@/api/Supplier'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import MySupplier from './MySupplier'
import MyApply from './MyApply'
import MyPlan from './MyPlan'
import MyDelivery from './MyDelivery'
import MyLnquiry from './MyLnquiry'
import MyOrder from './MyOrder'
import MyArrival from './MyArrival'
import MyEnter from './MyEnter'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  components: { MyEnter, MyArrival, MyOrder, MyLnquiry, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp },
  props: {
    editcontrol: {
      type: Boolean,
      default: false
    },
    editdata: {
      type: Object,
      default: null
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请选择'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      if (this.personalForm.sourceNumber === undefined || this.personalForm.sourceNumber === null || this.personalForm.sourceNumber === '') {
        callback(new Error('请选择源单编号'))
      } else {
        callback()
      }
    }
    return {
      supp: '',
      entercontrol: false,
      IsCurrency: false,
      // 结算方式
      settleModes: [],
      // 支付方式
      payModes: [],
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
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
      // 结算方式
      paymentIds: [],
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
        sourceNumber: [
          { validator: validatePass3, trigger: 'change' }
        ],
        stockTypeId: [
          { required: true, message: '请选择采购类别', trigger: 'change' }
        ]
      },
      // 采购申请单明细数据
      list2: [],
      // 采购申请单明细列表规则
      validRules: {
      },
      batchlist: []
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.supplierId = this.personalForm.supplierName
      this.stockPersonId = this.personalForm.stockPersonName
      this.supp = this.personalForm.supplierId
      this.ourContractorId = this.personalForm.ourContractorName
      this.list2 = this.personalForm.stockRetreatDetailVos
      console.log('this.personalForm.sourceType', this.personalForm.sourceType)
      if (this.personalForm.sourceType === 4 || this.personalForm.sourceType === '4') {
        this.addpro = false
      }
      this.changeRate()
    }
  },
  created() {
    this.getTypes()
    this.getways()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    updatebatch2(event, scope) {
      if (event === true) {
        const parms3 = scope.row.productCode
        batchlist(this.personalForm.retreatRepositoryId, parms3).then(res => {
          if (res.data.ret === 200) {
            this.batchlist = res.data.data.content
          }
        })
      }
    },
    gettaxRate(row) {
      console.log('row==============110', row.flag)
      if (row.flag === undefined) {
        row.flag = true
      } else {
        return row.taxRate
      }
      // 默认批次
      if (row.flag) {
        console.log('执行')
        if (this.personalForm.sourceType === '4') {
          console.log('执行22222')
          // 查询供应商价格
          querytax(this.personalForm.supplierId, row.productCode).then(res => {
            if (res.data.data.content.length > 0) {
              row.taxRate = res.data.data.content[0].taxRate || 0
              row.includeTaxPrice = res.data.data.content[0].includeTaxPrice || 0
              row.discountRate = res.data.data.content[0].discountRate || 0
            } else {
              this.$notify.error({
                title: 'wrong',
                message: '未查询到商品',
                duration: 0
              })
            }
          })
        }
      }
      row.flag = false
    },
    enter(val) {
      console.log('enter', val)
      // this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        console.log('val', val[i])
        this.$refs.editable.insert(val[i])
      }
    },
    enterinfo(val) {
      console.log('enterinfo', val)
      this.personalForm.sourceNumber = val.enterNumber
    },
    jundgeprice() {
      const value = ['1-22-24-115']
      const roles = this.$store.getters && this.$store.getters.roles
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      return hasPermission
    },
    // 处理汇率
    changeRate() {
      console.log(123)
      if (this.personalForm.currencyId !== '3') {
        getRate(this.personalForm.currencyId).then(res => {
          console.log(res)
          if (res.data.ret === 200) {
            // console.log('res.data.data.content', res.data.data.content)
            this.$set(this.personalForm, 'exchangeRate', res.data.data.content.rate)
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
    updatePaymen() {
      this.getTypes()
    },
    // 判断数量
    jungleNumbers(scope) {
      console.log(this.actualilNumber, this.allNumber)
      console.log(scope.row)
      if (this.personalForm.sourceType === '1') {
        if (scope.row.retreatQuantity > scope.row.arrivalQuantity) {
        // scope.row.retreatQuantity = scope.row.arrivalQuantity
          this.$refs.editable.revert(scope.row)
          this.$notify.error({
            title: 'wrong',
            message: '退货数量不能大于到货数量',
            offset: 100
          })
        }
      } else if (this.personalForm.sourceType === '2') {
        if (scope.row.retreatQuantity > scope.row.enterQuantity) {
        // scope.row.retreatQuantity = scope.row.arrivalQuantity
          this.$refs.editable.revert(scope.row)
          this.$notify.error({
            title: 'wrong',
            message: '退货数量不能大于入库数量',
            offset: 100
          })
        }
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
      row.includeTaxMoney = (row.retreatQuantity * row.includeTaxPrice).toFixed(6)
      return row.includeTaxMoney
    },
    // 计算金额
    getMoney(row) {
      row.money = (row.retreatQuantity * row.price).toFixed(6)
      return row.money
    },
    getways() {
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          console.log('payModes', res.data.data.content.list)
          this.payModes = res.data.data.content.list
        }
      })
      // 交货方式
      searchCategory(2).then(res => {
        if (res.data.ret === 200) {
          this.giveIds = res.data.data.content.list
        }
      })
      // 结算方式
      searchCategory(5).then(res => {
        if (res.data.ret === 200) {
          this.settleModes = res.data.data.content.list
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
      } else if (this.personalForm.sourceType === '4') {
        this.addpro = false
        this.addsouce = true
        this.personalForm.sourceNumber = ''
        this.$refs.editable.clear()
        this.$refs.personalForm.clearValidate()
      }
    },
    // 从源单中添加商品
    handleAddSouce() {
      if (this.personalForm.sourceType === '1') {
        this.arrivalcontrol = true
      } else if (this.personalForm.sourceType === '2') {
        this.entercontrol = true
      }
    },
    arrival(val) {
      // this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        val[i].retreatQuantity = (val[i].arrivalQuantity - val[i].returnQuantity).toFixed(6)
        this.$refs.editable.insert(val[i])
      }
      if (val.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: '质检不通过的物品才能退货',
          offset: 100
        })
      }
    },
    allarrivalinfo(val) {
      this.personalForm.sourceNumber = val.number
      this.personalForm.supplierId = val.supplierId
      this.supplierId = val.supplierName
      this.personalForm.stockTypeId = val.stockTypeId
      this.personalForm.deptId = val.deptId
      this.personalForm.isVat = val.isVat
      this.personalForm.stockPersonId = val.stockPersonId
      this.stockPersonId = val.stockPersonName
      this.personalForm.payMode = String(val.payMode)
      this.personalForm.deliveryModeId = val.deliveryModeId
      this.personalForm.currencyId = String(val.currencyId)
      this.changeRate()
      this.getTypes()
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
      this.stockPersonId = val.stockPersonName
      this.personalForm.stockPersonId = val.stockPersonId
      this.personalForm.deptId = val.deptId
      this.personalForm.payMode = val.payMode
      this.personalForm.deliveryModeId = val.deliveryMode
      this.personalForm.isVat = val.isVat
      this.$refs.editable.clear()
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
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        isVat: 1
      }
      this.supplierId = null
      this.inquiryPersonId = null
      this.stockPersonId = null
      this.ourContractorId = null
      this.acceptPersonId = null
    },
    // 深拷贝
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      delete this.personalForm.judgeStat
      delete this.personalForm.receiptStat
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
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
              elem.includeTaxPrice = (elem.includeTaxPrice).toFixed(6)
            }
            if (elem.taxRate === null || elem.taxRate === '' || elem.taxRate === undefined) {
              delete elem.taxRate
            }
            if (elem.taxRate !== null || elem.taxRate !== '' || elem.taxRate !== undefined) {
              elem.taxRate = (elem.taxRate / 100).toFixed(6)
            }
            if (elem.discountRate === null || elem.discountRate === '' || elem.discountRate === undefined) {
              delete elem.discountRate
            }
            if (elem.discountRate !== null || elem.discountRate !== '' || elem.discountRate !== undefined) {
              elem.discountRate = (elem.discountRate).toFixed(6)
            }
            if (elem.money === null || elem.money === '' || elem.money === undefined) {
              delete elem.money
            }
            if (elem.money !== null || elem.money !== '' || elem.money !== undefined) {
              elem.money = (Number(elem.money)).toFixed(6)
            }
            if (elem.includeTaxMoney === null || elem.includeTaxMoney === '' || elem.includeTaxMoney === undefined) {
              delete elem.includeTaxMoney
            }
            if (elem.includeTaxMoney !== null || elem.includeTaxMoney !== '' || elem.includeTaxMoney !== undefined) {
              elem.includeTaxMoney = Number(elem.includeTaxMoney).toFixed(6)
            }
            if (elem.taxMoney === null || elem.taxMoney === '' || elem.taxMoney === undefined) {
              delete elem.taxMoney
            }
            if (elem.taxMoney !== null || elem.taxMoney !== '' || elem.taxMoney !== undefined) {
              elem.taxMoney = Number(elem.taxMoney).toFixed(6)
            }
            if (elem.discountRate === null || elem.discountRate === '' || elem.discountRate === undefined) {
              delete elem.discountRate
            }
            if (elem.discountMoney === null || elem.discountMoney === '' || elem.discountMoney === undefined) {
              delete elem.discountMoney
            }
            if (elem.discountMoney !== null || elem.discountMoney !== '' || elem.discountMoney !== undefined) {
              elem.discountMoney = Number(elem.discountMoney).toFixed(6)
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
          updatestockRetreat(parms, parms2).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: this.$t('prompt.czcg'),
                message: this.$t('prompt.czcg'),
                type: 'success',
                duration: 1000,
                offset: 100
              })
              this.$emit('rest', true)
              this.$refs.editable.clear()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
              this.editVisible = false
            } else {
              this.$notify.error({
                title: 'wrong',
                message: 'wrong',
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
    handlecancel() {
      this.$refs.editable.clear()
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.editVisible = false
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>
  .container >>> .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    margin-left: -10px;
  }
  .container >>> .el-form-item__label{
    text-align: left;
  }
  .container >>> .el-form-item__label{
    color: #60626696;
  }
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
  .el-col-12{
    width: 49%;
  }
</style>
