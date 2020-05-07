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
                <el-form-item :label="$t('SaleReturn.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.sourceType')" prop="sourceType" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.sourceType" style="width: 200px" @change="chooseSource">
                    <el-option :label="$t('updates.xsckd')" value="1"/>
                    <el-option :label="$t('Hmodule.Nosource')" value="2"/>
                    <el-option :label="$t('Hmodule.hhd')" value="3"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.customerType')" prop="customerType" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.customerType" style="width: 200px" @change="clearCustomer">
                    <el-option :label="$t('prompt.jxs')" value="1"/>
                    <el-option :label="$t('prompt.ls')" value="2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.customerName')" prop="customerId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerId" style="width: 200px" clearable @focus="chooseCustomer"/>
                  <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
                  <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.customerPhone')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.customerPhone" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.closeType')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select ref="clear" v-model="personalForm.settleMode" style="width: 200px">
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
                <el-form-item :label="$t('SaleReturn.payType')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select ref="clear2" v-model="personalForm.payMode" style="width: 200px">
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
                <el-form-item :label="$t('SaleReturn.salePersonId')" prop="salePersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="salePersonId" style="width: 200px" clearable @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.saleRepositoryId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="saleRepositoryId" style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.receiveAddress')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.receiveAddress" style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.returnDate')" prop="returnDate" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.returnDate"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.currency')" prop="currency" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.currency" style="width: 200px" @change="changeRate">
                    <el-option value="1" label="PHP"/>
                    <el-option value="2" label="USD"/>
                    <el-option value="3" label="RMB"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.exchangeRate')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.exchangeRate" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">
        <div ref="fuzhu" class="form-name" >{{ $t('updates.thmx') }}</div>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button :disabled="Isproduct" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <my-detail :control.sync="control" @product="productdetail"/>
          <el-button :disabled="IsSourceNumber" style="width: 130px" @click="handleAddSource">{{ $t('updates.cydzxz') }}</el-button>
          <my-saleout :saleoutcontrol.sync="saleoutcontrol" :personaldata="personalForm" @saleOutDetail="saleOutDetail" @saleOutdata="saleOutdata"/>
          <my-returnexchange :returncontrol.sync="returncontrol" @returnDetail="returnDetail" @returndata="returndata"/>
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
            size="small"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column v-if="personalForm.sourceType === '1' || personalForm.sourceType === '3'" :label="$t('Hmodule.hw')" prop="locationName" align="center" min-width="150px"/>
            <el-editable-column v-if="personalForm.sourceType === '1' || personalForm.sourceType === '3'" :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="150px"/>
            <el-editable-column v-if="personalForm.sourceType === '2'" :edit-render="{type: 'visible'}" :label="$t('Hmodule.hw')" prop="locationId" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-select v-model="scope.row.locationId" :value="scope.row.locationId" :placeholder="$t('Hmodule.xzhw')" filterable clearable style="margin-left: 18px;width: 100%;margin-bottom: 0" @visible-change="updatebatch($event,scope)" @change="$refs.editable.updateStatus(scope)">
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
            <el-editable-column :label="$t('updates.wpfl')" prop="productCategoryName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.jbdw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ggxh')" prop="productType" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.jxf')" prop="kpiGrade" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.spjf')" prop="point" align="center" min-width="150px"/>
            <el-editable-column v-if="false" :label="$t('updates.lsj')" prop="salePrice" align="center" min-width="150px"/>
            <el-editable-column v-if="false" :label="$t('updates.cbj')" prop="costPrice" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.xsdj')" prop="salePrice" align="center" min-width="150px"/>
            <el-editable-column v-if="false" prop="costMoney" align="center" label="成本金额" min-width="150px"/>
            <el-editable-column v-if="false" :label="$t('updates.hsje')" prop="includeTaxMoney" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.sl')" prop="taxRate" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.se')" prop="taxMoney" align="center" min-width="150px"/>
            <!--            <el-editable-column v-if="false" :label="$t('Hmodule.je')" prop="money" align="center" min-width="150px"/>-->
            <el-editable-column :label="$t('updates.thje')" prop="money" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.zk')" prop="discount" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.cke')" prop="discountMoney" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ythsl')" prop="alreadyReturnQuantity" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 1}, type: 'visible'}" :label="$t('updates.thsl')" prop="returnQuantity" align="center" min-width="150px">
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
            <el-editable-column :label="$t('updates.ydbh')" prop="sourceNumber" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px; margin-bottom: 20px">

        <div ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" label-position="left" size="mini" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.heji1')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="heji1" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.heji2')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="heji2" style="width: 200px" disabled/>
                </el-form-item>
              </el-col> -->
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.heji3')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="heji3" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.heji4')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="heji4" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.heji5')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="heji5" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.heji6')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="heji6" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.ridMoney')" prop="ridMoney" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.ridMoney" :disabled="personalForm.customerType === '2'" style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.actualReturnMoney')" prop="actualReturnMoney" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.actualReturnMoney" style="width: 200px"/>
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
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.closeStatusId')" prop="closeStatusId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.closeStatusId" style="width: 200px" disabled>
                    <el-option value="1" label="已结算"/>
                    <el-option value="2" label="未结算"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.alreadyMoney')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.alreadyMoney" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.enterStatusId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.enterStatusId" style="width: 200px" disabled>
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
import { createsaleReturn } from '@/api/SaleReturn'
import { searchCategory } from '@/api/Supplier'
import { getlocation, locationlist, countlist, getRate, vehicleInfo } from '@/api/public'
import MyEmp from './components/MyEmp'
import MyDelivery from '../DailyAdjust/components/MyDelivery'
import MyDetail from './components/MyDetail'
import MyApply from './components/MyApply'
import MyRequire from './components/MyRequire'
import MyCustomer from './components/MyCustomer'
import MyAgent from './components/MyAgent'
import MySaleout from './components/MySaleout'
import MyReturnexchange from './components/MyReturnexchange'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  name: 'AddSaleReturn',
  components: { MySaleout, MyAgent, MyCustomer, MyRequire, MyApply, MyDetail, MyDelivery, MyEmp, MyReturnexchange },
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
      returncontrol: false,
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
        customerType: '2',
        customerId: '',
        sourceType: '2',
        exchangeRate: '1.0000',
        currency: '1',
        returnDate: null,
        saleRepositoryId: this.$store.getters.repositoryId,
        ridMoney: 0
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
              title: 'wrong',
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
              title: 'wrong',
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
              title: 'wrong',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      }
    },
    isEdit2(row) {
      // console.log('222', row)
      const re = row.productCode.slice(0, 2)
      // if (re === '01') {
      //   row.quantity = 1
      //   return row.quantity
      // }
      if (re === '01') { return true } else { return false }
    },
    // 判断权限
    jungleshow() {
      const roles = this.$store.getters.roles
      this.isshow = roles.includes('1-22-28-1')
      console.log(this.isshow)
    },
    // 添加源单操作
    handleAddSource() {
      if (this.personalForm.sourceType === '1') {
        this.saleoutcontrol = true
      } else if (this.personalForm.sourceType === '3') {
        this.returncontrol = true
      }
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
    // 选择源单
    // choosesaleout() {
    //   this.saleoutcontrol = true
    // },
    returnDetail(val) {
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        // val[i].taxMoney = (val[i].salePrice / (1 + val[i].taxRate) * val[i].taxRate * val[i].returnQuantity).toFixed(6)
        val[i].discountMoney = (val[i].OriginalDiscountMont * val[i].returnQuantity).toFixed(6)
        // val[i].returnQuantity = (val[i].quantity - val[i].retreatQuantity).toFixed(6)
        this.$refs.editable.insert(val[i])
      }
    },
    returndata(val) {
      console.log(val)
      this.personalForm.sourceNumber = val.sourceNumber
      this.customerId = val.customerName
      this.personalForm.customerId = val.customerId
      this.personalForm.customerPhone = val.customerPhone
      // this.personalForm.receiveAddress = val.address
      this.personalForm.customerType = String(val.customerType)
      this.personalForm.salePersonId = val.salePersonId
      // this.salePersonId = val.salePersonName
      // this.salePersonName = val.salePersonName
      this.personalForm.saleRepositoryId = val.repositoryId
      this.saleRepositoryId = val.repositoryName
      console.log(this.list2)
    },
    saleOutDetail(val) {
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        // val[i].taxMoney = (val[i].salePrice / (1 + val[i].taxRate) * val[i].taxRate * val[i].returnQuantity).toFixed(6)
        val[i].discountMoney = (val[i].OriginalDiscountMont * val[i].returnQuantity).toFixed(6)
        // val[i].returnQuantity = (val[i].quantity - val[i].retreatQuantity).toFixed(6)
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
      this.personalForm.customerType = String(val.customerType)
      this.personalForm.salePersonId = val.salePersonId
      this.salePersonId = val.salePersonName
      this.personalForm.salePersonId = val.salePersonId
      this.personalForm.saleRepositoryId = val.saleRepositoryId
      this.saleRepositoryId = val.saleRepositoryName
      // this.list3 = val.saleOutGiftVos
      // console.log(this.list2)
    },
    updatebatch(event, scope) {
      if (event === true) {
        if (this.personalForm.saleRepositoryId === undefined || this.personalForm.saleRepositoryId === '') {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.sqslcg'),
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
      } else if (val === '3') {
        this.Isproduct = true
        this.IsNumber = false
        this.IsSourceNumber = false
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
              return (prev)
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
              return (Number(prev) + Number(curr)).toFixed(6)
            } else {
              return (Number(prev)).toFixed(6)
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
      this.heji9 = sums[12]
      this.heji10 = sums[11]
      this.personalForm.otherMoney = sums[12]
      return sums
    },
    // 通过折扣额计算折扣
    // getdiscountMoney(row) {
    //   row.discount = ((1 - row.discountMoney / row.salePrice / row.quantity) * 100).toFixed(6)
    // },
    // 通过折扣计算折扣额
    // getdiscount(row) {
    //   row.discountMoney = (row.salePrice * row.quantity * (1 - row.discount / 100)).toFixed(6)
    // },
    // 通过数量计算成本金额， 含税金额， 金额， 含税成本金额
    getquantity(row) {
      console.log(row.discount)
      console.log('row.salePrice', row.salePrice)
      console.log('row.returnQuantity', row.returnQuantity)
      console.log('row.taxMoney', row.taxMoney)
      if (row.returnQuantity > (row.sendQuantity - row.alreadyReturnQuantity) && this.personalForm.sourceType === '1') {
        this.$notify.error({
          title: 'wrong',
          message: '超过可退货数量',
          offset: 100
        })
        row.returnQuantity = 1
        console.log('row.salePrice', row.salePrice)
        console.log('row.returnQuantity', row.returnQuantity)
        console.log('row.taxMoney', row.taxMoney)
        row.taxMoney = row.salePrice * row.returnQuantity * (row.taxRate / 100)
        row.money = (row.salePrice * row.returnQuantity + Number(row.salePrice * row.returnQuantity * (row.taxRate / 100))).toFixed(6)
        row.includeTaxMoney = (row.salePrice * row.returnQuantity + Number(row.salePrice * row.returnQuantity * (row.taxRate / 100))).toFixed(6)
        row.discountMoney = (row.OriginalDiscountMont * row.returnQuantity).toFixed(6)
        return row.returnQuantity
      } else {
        row.taxMoney = row.salePrice * row.returnQuantity * (row.taxRate / 100)
        row.money = (row.salePrice * row.returnQuantity + Number(row.taxMoney)).toFixed(6)
        row.includeTaxMoney = (row.salePrice * row.returnQuantity + Number(row.salePrice * row.returnQuantity * (row.taxRate / 100))).toFixed(6)
        row.discountMoney = (row.OriginalDiscountMont * row.returnQuantity).toFixed(6)
        return row.returnQuantity
      }

      // row.taxMoney = (row.salePrice / (1 + (row.taxRate / 100)) * (row.taxRate / 100) * row.returnQuantity).toFixed(6)
    },
    // 计算含税价
    // gettaxprice(row) {
    //   row.taxprice = (row.salePrice * (1 + row.taxRate / 100)).toFixed(6)
    //   return row.taxprice
    // },
    // 通过税率计算税额
    // gettaxRate(row) {
    //   if (row.taxRate !== 0) {
    //     row.taxMoney = (row.salePrice * row.taxRate * row.quantity / 100).toFixed(6)
    //   }
    //   return row.taxRate
    // },
    // 通过税额计算税率
    // gettaxMoney(row) {
    //   if (row.taxMoney !== 0 && row.quantity !== 0 && row.salePrice !== 0) {
    //     row.taxRate = ((row.taxMoney / (row.salePrice * row.quantity)) * 100).toFixed(6)
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
        customerType: '2',
        customerId: '',
        sourceType: '2',
        exchangeRate: '1.0000',
        currency: '1',
        returnDate: null,
        saleRepositoryId: this.$store.getters.repositoryId,
        ridMoney: 0
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
              title: 'wrong',
              message: this.$t('prompt.mxbbnwk'),
              offset: 100
            })
            return false
          }
          let i = 1
          const sourceType = this.personalForm.sourceType
          EnterDetail.map(function(elem) {
            return elem
          }).forEach(function(elem) {
            console.log(' elem.returnQuantity', elem.returnQuantity)
            if (elem.returnQuantity === null || elem.returnQuantity === '' || elem.returnQuantity === undefined || elem.returnQuantity === '0') {
              i = 2
            }
            if (sourceType === '1') {
              if (elem.returnQuantity > elem.sendQuantity) {
                i = 2
              }
            }
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
            if (elem.kpiGrade === null || elem.kpiGrade === '' || elem.kpiGrade === undefined) {
              delete elem.kpiGrade
            }
            if (elem.point === null || elem.point === '' || elem.point === undefined) {
              delete elem.point
            }
            if (elem.salePrice === null || elem.salePrice === '' || elem.salePrice === undefined) {
              delete elem.salePrice
            }
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
          if (i === 2) {
            this.$notify.error({
              title: 'wrong',
              message: '请正确填写退货数量',
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
          createsaleReturn(parms, parms2, this.personalForm).then(res => {
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
              this.$refs.personalForm2.clearValidate()
              this.$refs.personalForm2.resetFields()
              this.$refs.personalForm3.clearValidate()
              this.$refs.personalForm3.resetFields()
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
.ERP-container{
    margin-right: 0;
}
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
