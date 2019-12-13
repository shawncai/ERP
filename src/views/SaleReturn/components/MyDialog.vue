<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.sourceType')" prop="sourceType" style="width: 100%;">
                <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px" @change="chooseSource">
                  <el-option value="1" label="销售出库单"/>
                  <el-option value="2" label="无来源"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.sourceNumber')" style="width: 100%;">
                <el-input v-model="personalForm.sourceNumber" :disabled="IsNumber" style="margin-left: 18px;width: 200px" @focus="choosesaleout"/>
              </el-form-item>
              <my-saleout :saleoutcontrol.sync="saleoutcontrol" :personaldata="personalForm" @saleOutDetail="saleOutDetail" @saleOutdata="saleOutdata"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.customerType')" prop="customerType" style="width: 100%;">
                <el-select v-model="personalForm.customerType" style="margin-left: 18px;width: 200px" @change="clearCustomer">
                  <el-option value="1" label="经销商"/>
                  <el-option value="2" label="零售"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.customerName')" prop="customerId" style="width: 100%;">
                <el-input v-model="customerId" style="margin-left: 18px;width: 200px" @focus="chooseCustomer"/>
                <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
                <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.customerPhone')" style="width: 100%;">
                <el-input v-model="personalForm.customerPhone" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.closeType')" style="width: 100%;">
                <el-select v-model="personalForm.settleMode" style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="item in colseTypes"
                    :value="item.id"
                    :key="item.id"
                    :label="item.categoryName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.payType')" style="width: 100%;">
                <el-select v-model="personalForm.payMode " style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="item in payModes"
                    :key="item.id"
                    :label="item.categoryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.salePersonId')" style="width: 100%;">
                <el-input v-model="salePersonId" style="margin-left: 18px;width: 200px" clearable @focus="handlechooseStock"/>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.saleRepositoryId')" style="width: 100%;">
                <el-input v-model="saleRepositoryId" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.receiveAddress')" style="width: 100%;">
                <el-input v-model="personalForm.receiveAddress" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.returnDate')" prop="returnDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.returnDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockOrder.currency')" prop="currency" style="width: 100%;">
                <el-select v-model="personalForm.currency" :disabled="IsCurrency" style="margin-left: 18px;width: 200px" @change="changeRate">
                  <el-option value="1" label="PHP"/>
                  <el-option value="2" label="USD"/>
                  <el-option value="3" label="RMB"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
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
      <h2 ref="fuzhu" class="form-name" >{{ $t('updates.thmx') }}</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button :disabled="Isproduct" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
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
          show-summary
          stripe
          border
          size="medium"
          style="width: 100%">
          <el-editable-column type="selection" min-width="55" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
          <el-editable-column v-if="personalForm.sourceType === '1'" :label="$t('Hmodule.hw')" prop="locationName" align="center" min-width="150px"/>
          <el-editable-column v-if="personalForm.sourceType === '1'" :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="150px"/>
          <el-editable-column v-if="personalForm.sourceType === '2'" :edit-render="{type: 'visible'}" :label="$t('Hmodule.hw')" prop="locationId" align="center" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-select v-model="scope.row.locationId" :value="scope.row.locationId" :placeholder="$t('Hmodule.xzhw')" filterable clearable style="width: 100%;" @visible-change="updatebatch($event,scope)" @change="$refs.editable.updateStatus(scope)">
                <el-option
                  v-for="item in locationlist"
                  :key="item.id"
                  :label="item.locationCode"
                  :value="item.id"
                />
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column v-if="personalForm.sourceType === '2'" :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.wpfl')" prop="productCategoryName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.jbdw')" prop="unit" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ggxh')" prop="productTypeName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.jxf')" prop="kpiGrade" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.spjf')" prop="point" align="center" min-width="150px"/>
          <el-editable-column v-if="false" :label="$t('updates.lsj')" prop="salePrice" align="center" min-width="150px"/>
          <el-editable-column v-if="false" :label="$t('updates.cbj')" prop="costPrice" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.xsdj')" prop="taxprice" align="center" min-width="150px"/>
          <el-editable-column v-if="false" prop="costMoney" align="center" label="成本金额" min-width="150px"/>
          <el-editable-column v-if="false" :label="$t('updates.hsje')" prop="includeTaxMoney" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.sl')" prop="taxRate" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.se')" prop="taxMoney" align="center" min-width="150px"/>
          <el-editable-column v-if="false" :label="$t('Hmodule.je')" prop="money" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.thje')" prop="includeTaxCostMoney" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.zko')" prop="discount" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.cke')" prop="discountMoney" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ythsl')" prop="alreadyReturnQuantity" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.thsl')" prop="returnQuantity" align="center" min-width="150px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :controls="false"
                v-model="scope.row.returnQuantity"
                @change="getquantity(scope.row)"/>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.thyy')" prop="returnReason" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.fhsl')" prop="sendQuantity" align="center" min-width="150px"/>
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
              <el-input v-if="isEdit2(scope.row)" v-model="scope.row.batteryCode" clearable @blur="getInfo2(scope.row)"/>
              <span v-else>{{ scope.row.batteryCode }}</span>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.ydbh')" prop="includeTaxCostMoney" align="center" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.heji1')" style="width: 100%;">
                <el-input v-model="heji1" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.heji2')" style="width: 100%;">
                <el-input v-model="heji2" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.heji3')" style="width: 100%;">
                <el-input v-model="heji3" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.heji4')" style="width: 100%;">
                <el-input v-model="heji4" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.heji5')" style="width: 100%;">
                <el-input v-model="heji5" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.heji6')" style="width: 100%;">
                <el-input v-model="heji6" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.ridMoney')" style="width: 100%;">
                <el-input v-model="personalForm.ridMoney" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.actualReturnMoney')" style="width: 100%;">
                <el-input v-model="personalForm.actualReturnMoney" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!-- <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">{{ $t('updates.xgdjzt') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm3" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.closeStatusId')" prop="closeStatusId" style="width: 100%;">
                <el-select v-model="personalForm.closeStatusId" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="已结算"/>
                  <el-option value="2" label="未结算"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.alreadyMoney')" style="width: 100%;">
                <el-input v-model="personalForm.alreadyMoney" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.enterStatusId')" style="width: 100%;">
                <el-select v-model="personalForm.enterStatusId" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="已入库"/>
                  <el-option value="2" label="未入库"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card> -->
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        <el-button type="primary" @click="handleEditok()">{{ $t('Hmodule.baoc') }}</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { updatesaleReturn } from '@/api/SaleReturn'
import { searchCategory } from '@/api/Supplier'
import { getlocation, locationlist, getRate, vehicleInfo } from '@/api/public'
import MyEmp from './MyEmp'
import MyDelivery from './MyDelivery'
import MyDetail from './MyDetail'
import MyApply from './MyApply'
import MyRequire from './MyRequire'
import MyCustomer from './MyCustomer'
import MyAgent from './MyAgent'
import MySaleout from '../../DeliverGoods/components/MySaleout'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  components: { MyAgent, MyCustomer, MyRequire, MyApply, MyDetail, MyDelivery, MyEmp, MySaleout },
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
    return {
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 控制源单
      saleoutcontrol: false,
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
      // 货位数据
      locationlist: [],
      payModes: [],
      // 控制源单编码是否可以选择
      IsNumber: true,
      // 控制添加商品按钮是否可以点击
      Isproduct: true,
      // 回显门店
      saleRepositoryId: '',
      // 回显客户
      customerId: '',
      // 控制客户
      customercontrol: false,
      agentcontrol: false,
      // 销售人员回显
      salePersonId: '',
      // 控制销售人员
      stockControl: false,
      // 结算方式数据
      colseTypes: [],
      // 结算方式获取参数
      colseTypeparms: {
        type: 3,
        pagenum: 1,
        pagesize: 99999,
        iseffective: 1
      },
      // 控制商品列表窗口
      control: false,
      // 销售订单规则数据
      personalrules: {
        customerType: [
          { required: true, message: '请选择客户类别', trigger: 'change' }
        ],
        customerName: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        returnDate: [
          { required: true, message: '请选择退货日期', trigger: 'change' }
        ],
        currency: [
          { required: true, message: '请选择币种', trigger: 'change' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        closeStatusId: [
          { required: true, message: '请选择结算状态', trigger: 'change' }
        ]
      },
      // 订单明细数据
      list2: [],
      // 销售费用明细
      list3: [],
      // 明细列表规则
      validRules: {
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.salePersonId = this.personalForm.salePersonName
      this.customerId = this.personalForm.customerName
      this.saleRepositoryId = this.personalForm.saleRepositoryName
      this.personalForm.customerPhone = this.personalForm.phoneNumber
      this.list2 = this.personalForm.saleReturnDetailVos
      this.chooseSource()
      this.changeRate()
    }
  },
  created() {
    this.getTypes()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
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
              title: '错误',
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
              title: '错误',
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
              title: '错误',
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
      if (re === '01' && this.personalForm.sourceType === 2) { return true } else { return false }
    },
    // 处理汇率
    changeRate() {
      console.log(123)
      if (this.personalForm.currency !== '3') {
        getRate(this.personalForm.currency).then(res => {
          console.log(res)
          if (res.data.ret === 200) {
            // console.log('res.data.data.content', res.data.data.content)
            // this.personalForm.exchangeRate = res.data.data.content.rate
            this.$set(this.personalForm, 'exchangeRate', res.data.data.content.rate)
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
    // 选择源单
    choosesaleout() {
      this.saleoutcontrol = true
    },
    saleOutDetail(val) {
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        val[i].returnQuantity = (val[i].quantity - val[i].retreatQuantity).toFixed(2)
        this.$refs.editable.insert(val[i])
      }
    },
    saleOutdata(val) {
      console.log(val)
      this.personalForm.sourceNumber = val.number
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
    getTypes() {
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.payModes = res.data.data.content.list
        }
      })
      // 结算方式数据
      searchCategory(5).then(res => {
        if (res.data.ret === 200) {
          this.colseTypes = res.data.data.content.list
        }
      })
    },
    // 控制源单类型
    chooseSource(val) {
      if (val === '1') {
        this.Isproduct = true
        this.IsNumber = false
      } else if (val === '2') {
        this.Isproduct = false
        this.IsNumber = true
        this.personalForm.sourceNumber = ''
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
      sums[7] = ''
      sums[8] = ''
      sums[9] = ''
      sums[25] = ''
      sums[27] = ''
      sums[28] = ''
      sums[29] = ''
      sums[30] = ''
      this.heji1 = sums[24]
      this.heji2 = sums[19]
      this.heji3 = sums[16]
      this.heji4 = sums[18]
      this.heji5 = sums[22]
      this.heji6 = sums[20] - sums[22]
      return sums
    },
    // 通过折扣额计算折扣
    getdiscountMoney(row) {
      row.discount = ((1 - row.discountMoney / row.salePrice / row.quantity) * 100).toFixed(2)
    },
    // 通过折扣计算折扣额
    getdiscount(row) {
      row.discountMoney = (row.salePrice * row.quantity * (1 - row.discount / 100)).toFixed(2)
    },
    getquantity(row) {
      row.costMoney = row.returnQuantity * row.costPrice
      row.taxprice = row.salePrice * (1 + row.taxRate / 100)
      row.includeTaxMoney = row.returnQuantity * row.taxprice
      row.money = row.returnQuantity * row.salePrice
      row.includeTaxCostMoney = row.includeTaxMoney + row.costMoney
      row.taxMoney = ((row.taxRate / 100) * row.salePrice * row.returnQuantity).toFixed(2)
      if (row.returnQuantity !== 0) {
        row.taxRate = ((row.taxMoney / (row.salePrice * row.returnQuantity)) * 100).toFixed(2)
        row.discount = (1 - row.discountMoney / row.salePrice / row.returnQuantity).toFixed(2)
      }
      row.discountMoney = (row.salePrice * row.returnQuantity * (1 - row.discount)).toFixed(2)
      return row.returnQuantity
    },
    // 计算含税价
    gettaxprice(row) {
      row.taxprice = (row.salePrice * (1 + row.taxRate / 100)).toFixed(2)
      return row.taxprice
    },
    // 通过税率计算税额
    gettaxRate(row) {
      if (row.taxRate !== 0) {
        row.taxMoney = (row.salePrice * row.taxRate * row.quantity / 100).toFixed(2)
      }
      return row.taxRate
    },
    // 通过税额计算税率
    gettaxMoney(row) {
      if (row.taxMoney !== 0 && row.quantity !== 0 && row.salePrice !== 0) {
        row.taxRate = ((row.taxMoney / (row.salePrice * row.quantity)) * 100).toFixed(2)
      }
      return row.taxMoney
    },
    // 选择客户类型时清理客户名称
    clearCustomer() {
      this.personalForm.customerId = ''
      this.customerId = ''
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
      this.personalForm.customerId = val.id
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.phoneNumber
    },
    agentdata(val) {
      this.personalForm.customerId = val.id
      this.customerId = val.agentName
      this.personalForm.customerPhone = val.phone
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
    deleteChange(val) {
      this.choosedata = val
    },
    // 更新类型
    updatecountry() {
      this.getTypes()
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
        regionId: this.$store.getters.regionId
      }
      this.customerId = null
      this.salePersonId = null
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
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.personalForm.repositoryId = this.$store.getters.repositoryId
          this.personalForm.regionId = this.$store.getters.regionId
          this.personalForm.createPersonId = this.$store.getters.userId
          this.personalForm.countryId = this.$store.getters.countryId
          this.personalForm.modifyPersonId = this.$store.getters.userId
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
            if (elem.batch === null || elem.batch === '' || elem.batch === undefined) {
              delete elem.batch
            }
            if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
              delete elem.productName
            }
            if (elem.category === null || elem.category === '' || elem.category === undefined) {
              delete elem.category
            }
            if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
              delete elem.unit
            }
            if (elem.type === null || elem.type === '' || elem.type === undefined) {
              delete elem.type
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
            if (elem.discount === null || elem.discount === '' || elem.discount === undefined) {
              delete elem.discount
            }
            if (elem.discount !== null || elem.discount !== '' || elem.discount !== undefined) {
              elem.discount = elem.discount / 100
            }
            if (elem.discountMoney === null || elem.discountMoney === '' || elem.discountMoney === undefined) {
              delete elem.discountMoney
            }
            if (elem.alreadyReturnQuantity === null || elem.alreadyReturnQuantity === '' || elem.alreadyReturnQuantity === undefined) {
              delete elem.alreadyReturnQuantity
            }
            if (elem.returnQuantity === null || elem.returnQuantity === '' || elem.returnQuantity === undefined) {
              delete elem.returnQuantity
            }
            if (elem.returnReason === null || elem.returnReason === '' || elem.returnReason === undefined) {
              delete elem.returnReason
            }
            if (elem.sendQuantity === null || elem.sendQuantity === '' || elem.sendQuantity === undefined) {
              delete elem.sendQuantity
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
          updatesaleReturn(parms, parms2).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: '操作成功',
                message: '操作成功',
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
                title: '错误',
                message: '出错了',
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
