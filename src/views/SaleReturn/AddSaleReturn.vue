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
                <el-form-item :label="$t('SaleReturn.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.sourceType')" prop="sourceType" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width:200px" @change="chooseSource">
                    <el-option value="1" label="销售出库单"/>
                    <el-option value="2" label="无来源"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.sourceNumber')" style="width: 100%;">
                  <el-input v-model="personalForm.sourceNumber" :disabled="IsNumber" style="margin-left: 18px;width:200px" @focus="choosesaleout"/>
                </el-form-item>
                <my-saleout :saleoutcontrol.sync="saleoutcontrol" @saleOutDetail="saleOutDetail" @saleOutdata="saleOutdata"/>
              </el-col> -->
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.customerType')" prop="customerType" style="width: 100%;">
                  <el-select v-model="personalForm.customerType" style="margin-left: 18px;width:200px" @change="clearCustomer">
                    <el-option value="1" label="经销商"/>
                    <el-option value="2" label="零售"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.customerName')" prop="customerId" style="width: 100%;">
                  <el-input v-model="customerId" style="margin-left: 18px;width:200px" clearable @focus="chooseCustomer"/>
                  <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
                  <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.customerPhone')" style="width: 100%;">
                  <el-input v-model="personalForm.customerPhone" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.closeType')" style="width: 100%;">
                  <el-select ref="clear" v-model="personalForm.settleMode" style="margin-left: 18px;width:200px">
                    <el-option v-show="false" label="" value=""/>
                    <el-option
                      v-for="(item, index) in colseTypes"
                      :value="item.id"
                      :key="index"
                      :label="item.categoryName"/>
                    <template>
                      <el-button v-if="isshow" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat">{{ $t('updates.create') }}</el-button>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.payType')" style="width: 100%;">
                  <el-select ref="clear2" v-model="personalForm.payMode" style="margin-left: 18px;width:200px">
                    <el-option v-show="false" label="" value=""/>
                    <el-option
                      v-for="(item, index) in payModes"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                    <template>
                      <el-button v-if="isshow" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat2">{{ $t('updates.create') }}</el-button>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.salePersonId')" prop="salePersonId" style="width: 100%;">
                  <el-input v-model="salePersonId" style="margin-left: 18px;width:200px" clearable @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.saleRepositoryId')" style="width: 100%;">
                  <el-input v-model="saleRepositoryId" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.receiveAddress')" style="width: 100%;">
                  <el-input v-model="personalForm.receiveAddress" style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.returnDate')" prop="returnDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.returnDate"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.currency')" prop="currency" style="width: 100%;">
                  <el-select v-model="personalForm.currency" style="margin-left: 18px;width:200px" @change="changeRate">
                    <el-option value="1" label="PHP"/>
                    <el-option value="2" label="USD"/>
                    <el-option value="3" label="RMB"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.exchangeRate')" style="width: 100%;">
                  <el-input v-model="personalForm.exchangeRate" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >退货明细</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button :disabled="Isproduct" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <my-detail :control.sync="control" @product="productdetail"/>
          <el-button :disabled="IsSourceNumber" style="width: 130px" @click="handleAddSource">{{ $t('updates.cydzxz') }}</el-button>
          <my-saleout :saleoutcontrol.sync="saleoutcontrol" :personaldata="personalForm" @saleOutDetail="saleOutDetail" @saleOutdata="saleOutdata"/>
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
            <el-editable-column v-if="personalForm.sourceType === '1'" :label="$t('Hmodule.hw')" prop="locationName" align="center" min-width="150px"/>
            <el-editable-column v-if="personalForm.sourceType === '1'" :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="150px"/>
            <el-editable-column v-if="personalForm.sourceType === '2'" :edit-render="{type: 'visible'}" :label="$t('Hmodule.hw')" prop="locationId" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-select v-model="scope.row.locationId" :value="scope.row.locationId" :placeholder="$t('Hmodule.xzhw')" filterable clearable style="width: 100%;" @visible-change="updatebatch($event,scope)" @change="$refs.editable.updateStatus(scope)">
                  <el-option
                    v-for="(item, index) in locationlist"
                    :key="index"
                    :value="item.id"
                    :label="item.locationCode"/>
                </el-select>
              </template>
            </el-editable-column>
            <el-editable-column v-if="personalForm.sourceType === '2'" :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column prop="productCategoryName" align="center" label="物品分类" min-width="150px"/>
            <el-editable-column prop="unit" align="center" label="基本单位" min-width="150px"/>
            <el-editable-column prop="productTypeName" align="center" label="规格型号" min-width="150px"/>
            <el-editable-column prop="color" align="center" :label="$t('updates.ys')" min-width="150px"/>
            <el-editable-column prop="kpiGrade" align="center" label="绩效分" min-width="150px"/>
            <el-editable-column prop="point" align="center" label="商品积分" min-width="150px"/>
            <el-editable-column v-if="false" prop="salePrice" align="center" label="零售价" min-width="150px"/>
            <el-editable-column v-if="false" prop="costPrice" align="center" label="成本价" min-width="150px"/>
            <el-editable-column prop="salePrice" align="center" label="销售单价" min-width="150px"/>
            <el-editable-column v-if="false" prop="costMoney" align="center" label="成本金额" min-width="150px"/>
            <el-editable-column v-if="false" prop="includeTaxMoney" align="center" :label="$t('updates.hsje')" min-width="150px"/>
            <el-editable-column prop="taxRate" align="center" :label="$t('updates.sl')" min-width="150px"/>
            <el-editable-column prop="taxMoney" align="center" :label="$t('updates.se')" min-width="150px"/>
            <el-editable-column v-if="false" :label="$t('Hmodule.je')" prop="money" align="center" min-width="150px"/>
            <el-editable-column prop="money" align="center" label="退货金额" min-width="150px"/>
            <el-editable-column prop="discount" align="center" label="折扣(%)" min-width="150px"/>
            <el-editable-column prop="discountMoney" align="center" :label="$t('updates.cke')" min-width="150px"/>
            <el-editable-column prop="alreadyReturnQuantity" align="center" label="已退货数量" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 1}, type: 'visible'}" prop="returnQuantity" align="center" :label="$t('updates.thsl')" min-width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :controls="false"
                  v-model="scope.row.returnQuantity"
                  @change="getquantity(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', attrs: {min: 0}, type: 'visible'}" prop="returnReason" align="center" label="退货原因" min-width="150px"/>
            <el-editable-column prop="sendQuantity" align="center" label="发货数量" min-width="150px"/>
            <el-editable-column prop="carCode" align="center" label="车架号" min-width="150px"/>
            <el-editable-column prop="motorCode" align="center" label="电机编码" min-width="150px"/>
            <el-editable-column prop="batteryCode" align="center" label="电池编码" min-width="150px"/>
            <el-editable-column prop="sourceNumber" align="center" :label="$t('updates.ydbh')" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.heji1')" style="width: 100%;">
                  <el-input v-model="heji1" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.heji2')" style="width: 100%;">
                  <el-input v-model="heji2" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col> -->
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.heji3')" style="width: 100%;">
                  <el-input v-model="heji3" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.heji4')" style="width: 100%;">
                  <el-input v-model="heji4" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.heji5')" style="width: 100%;">
                  <el-input v-model="heji5" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.heji6')" style="width: 100%;">
                  <el-input v-model="heji6" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.ridMoney')" prop="ridMoney" style="width: 100%;">
                  <el-input v-model="personalForm.ridMoney" :disabled="personalForm.customerType === '2'" style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.actualReturnMoney')" prop="actualReturnMoney" style="width: 100%;">
                  <el-input v-model="personalForm.actualReturnMoney" style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!-- <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="geren" class="form-name">相关单据状态</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm3" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.closeStatusId')" prop="closeStatusId" style="width: 100%;">
                  <el-select v-model="personalForm.closeStatusId" style="margin-left: 18px;width:200px" disabled>
                    <el-option value="1" label="已结算"/>
                    <el-option value="2" label="未结算"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.alreadyMoney')" style="width: 100%;">
                  <el-input v-model="personalForm.alreadyMoney" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.enterStatusId')" style="width: 100%;">
                  <el-select v-model="personalForm.enterStatusId" style="margin-left: 18px;width:200px" disabled>
                    <el-option value="1" label="已入库"/>
                    <el-option value="2" label="未入库"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card> -->
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
import { createsaleReturn } from '@/api/SaleReturn'
import { searchCategory } from '@/api/Supplier'
import { getlocation, locationlist, countlist, getRate } from '@/api/public'
import MyEmp from './components/MyEmp'
import MyDelivery from '../DailyAdjust/components/MyDelivery'
import MyDetail from './components/MyDetail'
import MyApply from './components/MyApply'
import MyRequire from './components/MyRequire'
import MyCustomer from './components/MyCustomer'
import MyAgent from './components/MyAgent'
import MySaleout from '../DeliverGoods/components/MySaleout'
var _that
export default {
  name: 'AddSaleReturn',
  components: { MySaleout, MyAgent, MyCustomer, MyRequire, MyApply, MyDetail, MyDelivery, MyEmp },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请选择'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(value)
      if (this.personalForm.actualReturnMoney === '' || this.personalForm.actualReturnMoney === undefined || this.personalForm.actualReturnMoney === null) {
        callback(new Error('请输入退款金额'))
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
      // 判断权限
      isshow: false,
      // 控制是否从源单添加
      IsSourceNumber: true,
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
      // 控制源单编码是否可以选择
      IsNumber: true,
      // 控制添加商品按钮是否可以点击
      Isproduct: false,
      // 回显门店
      saleRepositoryId: this.$store.getters.repositoryName,
      // 回显客户
      customerId: '',
      // 控制客户
      customercontrol: false,
      agentcontrol: false,
      // 选择的数据
      choosedata: [],
      // 销售人员回显
      salePersonId: this.$store.getters.name,
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
      // 销售订单信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        customerType: '1',
        customerId: '',
        sourceType: '2',
        exchangeRate: '1.0000',
        currency: '3',
        returnDate: null,
        saleRepositoryId: this.$store.getters.repositoryId
      },
      // 销售订单规则数据
      personalrules: {
        customerType: [
          { required: true, message: '请选择客户类别', trigger: 'change' }
        ],
        salePersonId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        customerId: [
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
        ],
        actualReturnMoney: [
          { required: true, message: validatePass2, trigger: 'change' }
        ]
      },
      // 订单明细数据
      list2: [],
      payModes: [],
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
    this.chooseSource()
    this.jungleshow()
  },
  methods: {
    // 判断权限
    jungleshow() {
      const roles = this.$store.getters.roles
      this.isshow = roles.includes('1-22-28-1')
      console.log(this.isshow)
    },
    // 添加源单操作
    handleAddSource() {
      this.saleoutcontrol = true
      console.log(123)
    },
    // 汇率变化
    changeRate() {
      console.log(123)
      if (this.personalForm.currency !== '3') {
        getRate(this.personalForm.currency).then(res => {
          console.log(res)
          if (res.data.ret === 200) {
            // console.log('res.data.data.content', res.data.data.content)
            this.personalForm.exchangeRate = res.data.data.content.rate
            console.log(this.personalForm.exchangeRate)
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
    // 默认显示今天
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
      this.personalForm.returnDate = currentdate
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
    // 选择源单
    // choosesaleout() {
    //   this.saleoutcontrol = true
    // },
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
      this.customerId = val.customerName
      this.personalForm.customerId = val.customerId
      this.personalForm.customerPhone = val.phoneNumber
      this.personalForm.receiveAddress = val.address
      console.log(this.list2)
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
        this.IsSourceNumber = false
      } else if (val === '2') {
        this.Isproduct = false
        this.IsNumber = true
        this.personalForm.sourceNumber = ''
        this.IsSourceNumber = true
      }
      // this.restAllForm()
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
      sums[10] = ''
      sums[11] = ''
      sums[12] = ''
      sums[13] = ''
      sums[16] = ''
      sums[20] = ''
      sums[22] = ''
      sums[23] = ''
      sums[24] = ''
      sums[25] = ''
      this.heji1 = sums[19]
      this.heji3 = sums[15]
      this.heji4 = sums[14]
      this.heji5 = sums[17]
      this.heji6 = sums[15] - sums[17]
      this.personalForm.actualReturnMoney = this.heji6
      return sums
    },
    // 通过折扣额计算折扣
    // getdiscountMoney(row) {
    //   row.discount = ((1 - row.discountMoney / row.salePrice / row.quantity) * 100).toFixed(2)
    // },
    // 通过折扣计算折扣额
    // getdiscount(row) {
    //   row.discountMoney = (row.salePrice * row.quantity * (1 - row.discount / 100)).toFixed(2)
    // },
    // 通过数量计算成本金额， 含税金额， 金额， 含税成本金额
    getquantity(row) {
      console.log(row.discount)
      row.money = (row.salePrice * row.returnQuantity).toFixed(2)
      row.taxMoney = (row.salePrice / (1 + row.taxRate) * row.taxRate * row.returnQuantity).toFixed(2)
      row.discountMoney = (row.OriginalDiscountMont * row.returnQuantity).toFixed(2)
      if (row.returnQuantity > (row.sendQuantity - row.alreadyReturnQuantity) && this.personalForm.sourceType === '1') {
        this.$notify.error({
          title: '错误',
          message: '超过可退货数量',
          offset: 100
        })
        row.returnQuantity = 1
        row.money = (row.salePrice * row.returnQuantity).toFixed(2)
        row.taxMoney = (row.salePrice / (1 + row.taxRate) * row.taxRate * row.returnQuantity).toFixed(2)
        row.discountMoney = (row.OriginalDiscountMont * row.returnQuantity).toFixed(2)
        return false
      }
      return row.returnQuantity
    },
    // 计算含税价
    // gettaxprice(row) {
    //   row.taxprice = (row.salePrice * (1 + row.taxRate / 100)).toFixed(2)
    //   return row.taxprice
    // },
    // 通过税率计算税额
    // gettaxRate(row) {
    //   if (row.taxRate !== 0) {
    //     row.taxMoney = (row.salePrice * row.taxRate * row.quantity / 100).toFixed(2)
    //   }
    //   return row.taxRate
    // },
    // 通过税额计算税率
    // gettaxMoney(row) {
    //   if (row.taxMoney !== 0 && row.quantity !== 0 && row.salePrice !== 0) {
    //     row.taxRate = ((row.taxMoney / (row.salePrice * row.quantity)) * 100).toFixed(2)
    //   }
    //   return row.taxMoney
    // },
    // 选择客户类型时清理客户名称
    clearCustomer() {
      // this.$store.dispatch('get_customtype', this.personalForm.customerType)
      console.log(this.personalForm.customerType)
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
      // console.log(this.personalForm.customerId)
    },
    customerdata(val) {
      // this.$store.dispatch('get_customid', this.personalForm.customerId)
      this.$set(this.personalForm, 'customerId', val.id)
      console.log('customer', this.personalForm.customerId)
      // this.personalForm.customerId = val.id
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.phoneNumber
      this.personalForm.receiveAddress = val.address
    },
    agentdata(val) {
      // this.$store.dispatch('get_customid', this.personalForm.customerId)
      this.$set(this.personalForm, 'customerId', val.id)
      console.log('agent', this.personalForm.customerId)
      // this.personalForm.customerId = val.id
      this.customerId = val.agentName
      this.personalForm.customerPhone = val.phone
      this.personalForm.receiveAddress = val.address
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
        regionId: this.$store.getters.regionId,
        saleRepositoryId: this.$store.getters.repositoryId,
        returnDate: null
      }
      this.customerId = null
      this.salePersonId = null
      this.saleRepositoryId = this.$store.getters.repositoryName
      this.getdatatime()
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
          console.log(EnterDetail)
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
            // if (elem.batch === null || elem.batch === '' || elem.batch === undefined) {
            //   delete elem.batch
            // }
            // if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
            //   delete elem.productName
            // }
            // if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
            //   delete elem.unit
            // }
            // if (elem.color === null || elem.color === '' || elem.color === undefined) {
            //   delete elem.color
            // }
            // if (elem.kpiGrade === null || elem.kpiGrade === '' || elem.kpiGrade === undefined) {
            //   delete elem.kpiGrade
            // }
            // if (elem.point === null || elem.point === '' || elem.point === undefined) {
            //   delete elem.point
            // }
            // if (elem.salePrice === null || elem.salePrice === '' || elem.salePrice === undefined) {
            //   delete elem.salePrice
            // }
            // if (elem.costPrice === null || elem.costPrice === '' || elem.costPrice === undefined) {
            //   delete elem.costPrice
            // }
            // if (elem.costMoney === null || elem.costMoney === '' || elem.costMoney === undefined) {
            //   delete elem.costMoney
            // }
            // if (elem.includeTaxMoney === null || elem.includeTaxMoney === '' || elem.includeTaxMoney === undefined) {
            //   delete elem.includeTaxMoney
            // }
            // if (elem.taxRate === null || elem.taxRate === '' || elem.taxRate === undefined) {
            //   delete elem.taxRate
            // }
            if (elem.taxRate !== null || elem.taxRate !== '' || elem.taxRate !== undefined) {
              elem.taxRate = elem.taxRate / 100
            }
            // if (elem.taxMoney === null || elem.taxMoney === '' || elem.taxMoney === undefined) {
            //   delete elem.taxMoney
            // }
            // if (elem.money === null || elem.money === '' || elem.money === undefined) {
            //   delete elem.money
            // }
            // if (elem.includeTaxCostMoney === null || elem.includeTaxCostMoney === '' || elem.includeTaxCostMoney === undefined) {
            //   delete elem.includeTaxCostMoney
            // }
            // if (elem.discount === null || elem.discount === '' || elem.discount === undefined) {
            //   delete elem.discount
            // }
            if (elem.discountRate !== null || elem.discountRate !== '' || elem.discountRate !== undefined) {
              elem.discount = elem.discount / 100
            }
            // if (elem.discountMoney === null || elem.discountMoney === '' || elem.discountMoney === undefined) {
            //   delete elem.discountMoney
            // }
            // if (elem.alreadyReturnQuantity === null || elem.alreadyReturnQuantity === '' || elem.alreadyReturnQuantity === undefined) {
            //   delete elem.alreadyReturnQuantity
            // }
            // if (elem.returnQuantity === null || elem.returnQuantity === '' || elem.returnQuantity === undefined) {
            //   delete elem.returnQuantity
            // }
            // if (elem.returnReason === null || elem.returnReason === '' || elem.returnReason === undefined) {
            //   delete elem.returnReason
            // }
            // if (elem.sendQuantity === null || elem.sendQuantity === '' || elem.sendQuantity === undefined) {
            //   delete elem.sendQuantity
            // }
            // if (elem.carCode === null || elem.carCode === '' || elem.carCode === undefined) {
            //   delete elem.carCode
            // }
            // if (elem.motorCode === null || elem.motorCode === '' || elem.motorCode === undefined) {
            //   delete elem.motorCode
            // }
            // if (elem.batteryCode === null || elem.batteryCode === '' || elem.batteryCode === undefined) {
            //   delete elem.batteryCode
            // }
            // if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
            //   delete elem.locationId
            // }
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
          createsaleReturn(parms, parms2, this.personalForm).then(res => {
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
              this.$refs.personalForm2.clearValidate()
              this.$refs.personalForm2.resetFields()
              this.$refs.personalForm3.clearValidate()
              this.$refs.personalForm3.resetFields()
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
      const view = { path: '/SaleReturn/AddSaleReturn', name: 'AddSaleReturn', fullPath: '/SaleReturn/AddSaleReturn', title: 'AddSaleReturn' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    go_creat() {
      this.$router.push('/Supplier/SupplierCategory')
      this.$refs.clear.blur()
    },
    go_creat2() {
      this.$router.push('/Supplier/SupplierCategory')
      this.$refs.clear2.blur()
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
