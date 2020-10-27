<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.title')" prop="title" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.sourceType')" prop="sourceType" style="width: 100%;">
                <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px" @change="chooseType">
                  <el-option :label="$t('prompt.xsjh')" value="1" />
                  <el-option :label="$t('prompt.fqsq')" value="2" />
                  <el-option :label="$t('prompt.wly')" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.sourceNumber')" style="width: 100%;">
                <el-input v-model="personalForm.sourceNumber" style="margin-left: 18px;width: 200px" @focus="chooseData"/>
              </el-form-item>
              <my-opportunity :opportunitycontrol.sync="opportunitycontrol" @opportunityDetail="opportunityDetail" @opportunity="opportunity"/>
              <my-installmentapply :installappleycontrol.sync = "installappleycontrol" @installappleyDetail="installappleyDetail" @installappley="installappley"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.customerType')" prop="customerType" style="width: 100%;">
                <el-select v-model="personalForm.customerType" style="margin-left: 18px;width: 200px" @change="clearCustomer">
                  <el-option :label="$t('prompt.jxs')" value="1"/>
                  <el-option :label="$t('prompt.ls')" value="2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.customerName')" style="width: 100%;">
                <el-input v-model="customerId" style="margin-left: 18px;width: 200px" @focus="chooseCustomer"/>
                <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
                <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.customerPhone')" style="width: 100%;">
                <el-input v-model="personalForm.customerPhone" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.saleType')" style="width: 100%;">
                <el-select v-model="personalForm.saleType" style="margin-left: 18px;width: 200px" disabled>
                  <el-option :label="$t('prompt.xj')" value="1" />
                  <el-option :label="$t('prompt.fq')" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.closeType')" style="width: 100%;">
                <el-select v-model="personalForm.closeType" clearable style="margin-left: 18px;width: 200px" @change="change">
                  <el-option
                    v-for="(item, index) in colseTypes"
                    :value="item.id"
                    :key="index"
                    :label="item.categoryName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.payType')" style="width: 100%;">
                <el-select v-model="personalForm.payType" clearable style="margin-left: 18px;width: 200px" @change="change">
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
              <el-form-item :label="$t('SaleContract.deliveryMode')" style="width: 100%;">
                <el-select v-model="personalForm.deliveryMode" clearable style="margin-left: 18px;width: 200px" @change="change">
                  <el-option
                    v-for="(item, index) in deliverymodes"
                    :key="index"
                    :value="item.id"
                    :label="item.categoryName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockOrder.currency')" prop="currency" style="width: 100%;">
                <el-select v-model="personalForm.currency" style="margin-left: 18px;width: 200px" @change="changeRate">
                  <el-option value="1" label="PHP"/>
                  <el-option value="2" label="USD"/>
                  <el-option value="3" label="RMB"/>
                  <el-option value="4" label="LKR"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Recycling.exchangeRate')" style="width: 100%;">
                <el-input v-model="personalForm.exchangeRate" style="margin-left: 18px;width:200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.salePersonId')" style="width: 100%;">
                <el-input v-model="salePersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.deptId')" style="width: 100%;">
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
              <el-form-item :label="$t('SaleContract.saleRepositoryId')" style="width: 100%;">
                <el-input v-model="saleRepositoryId" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.signDate')" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.signDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.signAddress')" style="width: 100%;">
                <el-input v-model="personalForm.signAddress" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.contractStat')" style="width: 100%;">
                <el-select v-model="personalForm.contractStat" clearable style="margin-left: 18px;width: 200px">
                  <el-option :label="$t('tongyo.zdz')" value="1"/>
                  <el-option :label="$t('tongyo.zxz')" value="2"/>
                  <el-option :label="$t('tongyo.js')" value="3"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.invoiceType')" style="width: 100%;">
                <el-select v-model="personalForm.invoiceType" clearable style="margin-left: 18px;width: 200px" @change="change">
                  <el-option
                    v-for="(item, index) in invoiceTypes"
                    :value="item.id"
                    :key="index"
                    :label="item.categoryName"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('update4.isSecondApply')" style="width: 100%;">
                <span>{{ personalForm.isSecondApply | isSecondApplyFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.installmentCount')" style="width: 100%;">
                <el-select v-model="personalForm.installmentCount" :disabled="isinstallappley" clearable style="margin-left: 18px;width: 200px" @change="change">
                  <el-option
                    v-for="(item, index) in installmentCounts"
                    :key="index"
                    :value="item.installmentCount"
                    :label="item.installmentCount"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.dayOfMonth')" style="width: 100%;">
                <el-input-number v-model="personalForm.dayOfMonth" :disabled="isinstallappley" :controls="false" :min="1" :max="31" style="margin-left: 18px;width: 200px" placeholder="号"/>
              </el-form-item>
            </el-col>
            <!--<el-col :span="6">-->
            <!--<el-form-item :label="$t('SaleContract.installmentAllMoney')" style="width: 100%;">-->
            <!--<el-input v-model="personalForm.installmentAllMoney" style="margin-left: 18px;width: 200px" clearable/>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.installmentBegintime')" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.installmentBegintime"
                  :picker-options="pickerOptions0"
                  :disabled="isinstallappley"
                  type="month"
                  value-format="yyyy-MM"
                  style="margin-left: 18px;width: 200px"
                  @change="clearfinal"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.installmentEndtime')" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.installmentEndtime"
                  :picker-options="pickerOptions1"
                  :disabled="isinstallappley"
                  type="month"
                  value-format="yyyy-MM"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.notaryPerson')" style="width: 100%;">
                <el-input v-model="personalForm.notaryPerson" :disabled="isinstallappley" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.notaryDate')" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.notaryDate"
                  :picker-options="pickerOptions3"
                  :disabled="isinstallappley"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.firstMoney')" style="width: 100%;">
                <el-input v-model="personalForm.firstMoney" :disabled="isinstallappley" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.installmentAllMoney')" style="width: 100%;">
                <el-input v-model="personalForm.totalMoney" :disabled="isinstallappley" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.eachMoney')" style="width: 100%;">
                <el-input v-model="personalForm.eachMoney" :disabled="isinstallappley" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('otherlanguage.djylfj')" style="width: 100%;">
                <a :href="personalForm.picPaths[0]">
                  <el-button type="success">{{ $t('otherlanguage.djylfj') }}</el-button>
                </a>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.uploadAttachments')" style="width: 100%;">
                <el-upload
                  ref="upload"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :on-change="handleChange"
                  :file-list="fileList3"
                  :on-success="handlepicsuccess"
                  :data="picidsData"
                  :action="actionurl"
                  class="upload-demo"
                  style="margin-left: 18px"
                >
                  <el-button size="small" type="primary" style="width: 200px">{{ $t('newupd.mmm') }}</el-button>
                  <div slot="tip" class="el-upload__tip">{{ $t('newupd.nnn') }}</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px; margin-bottom： 100px" shadow="never">
      <h2 ref="fuzhu" class="form-name" >{{ $t('updates.htmx') }}</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button :disabled="canclick" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
        <my-detail :control.sync="control" :personalform="personalForm" @product="productdetail"/>
        <el-button @click="handleAddpackage">{{ $t('otherlanguage.xztc') }}</el-button>
        <my-package :packagecontrol.sync="packagecontrol" :packagerepository.sync="packagerepository" :productnumber.sync="productnumber" @isManila="isManilaData" @salePrice="salePrice" @packagedata="packagedata"/>
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
          size="small"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-editable-column type="selection" min-width="55" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.wpfl')" prop="categoryName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ggxh')" prop="typeName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.jxf')" prop="performanceScore" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.spjf')" prop="productScore" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.ddsl')" prop="quantity" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="6"
                :controls="false"
                :min="1.00"
                v-model="scope.row.quantity"
                @change="queryStock(scope.row)"
              />
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.lsj')" prop="salePrice" align="center" min-width="150px">
            <template slot-scope="scope">
              <span v-show="jundgeprice()">{{ gettaxprice(scope.row) }}</span>
            </template>
          </el-editable-column>
          <!--          <el-editable-column prop="costPrice" align="center" :label="$t('updates.cbj')" min-width="150px"/>-->
          <el-editable-column :label="$t('updates.hsj')" prop="taxprice" align="center" min-width="150px">
            <template slot-scope="scope">
              <span v-show="personalForm.saleType === '1'">{{ gettaxprice(scope.row) }}</span>
            </template>
          </el-editable-column>
          <!--          <el-editable-column prop="costMoney" align="center" label="成本金额" min-width="150px">-->
          <!--            <template slot-scope="scope">-->
          <!--              <p>{{ getcostMoney(scope.row) }}</p>-->
          <!--            </template>-->
          <!--          </el-editable-column>-->
          <el-editable-column :label="$t('updates.hsje')" prop="includeTaxMoney" align="center" min-width="150px">
            <template slot-scope="scope">
              <p v-show="personalForm.saleType === '1'">{{ getincludeTaxMoney(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.sl')" prop="taxRate" align="center" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="6"
                :controls="false"
                v-model="scope.row.taxRate"
                @input="gettaxRate(scope.row)"/>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.se')" prop="taxMoney" align="center" min-width="170px">
            <template slot-scope="scope">
              <p v-show="personalForm.saleType === '1'">{{ getTaxMoney2(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('Hmodule.je')" prop="money" align="center" min-width="150px">
            <template slot-scope="scope">
              <p v-show="jundgeprice()">{{ getMoney(scope.row) }}</p>
            </template>
          </el-editable-column>
          <!--          <el-editable-column prop="includeTaxCostMoney" align="center" :label="$t('updates.hscbje')" min-width="170px">-->
          <!--            <template slot-scope="scope">-->
          <!--              <p>{{ getincludeTaxCostMoney(scope.row) }}</p>-->
          <!--            </template>-->
          <!--          </el-editable-column>-->
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.ckl')" prop="discount" align="center" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="6"
                :controls="false"
                v-model="scope.row.discount"
                disabled
                @change="getdiscountRate(scope.row)"/>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.cke')" prop="discountMoney" align="center" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="6"
                :controls="false"
                v-model="scope.row.discountMoney"
                @change="getdiscountMoney(scope.row, $event, scope)"
                @input="notundefined(scope.row)"/>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.cjbm')" prop="carCode" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.djbm')" prop="motorCode" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.dcbm')" prop="batteryCode" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('tongyo.controlCode')" prop="controlCode" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('tongyo.chargeCode')" prop="chargeCode" align="center" min-width="150px"/>
        </el-editable>
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
import { searchRoleDiscount } from '@/api/BasicSettings'
import { getRate } from '@/api/public'
import { updatesaleContract } from '@/api/SaleContract'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchSaleCategory } from '@/api/SaleCategory'
import { searchCategory } from '@/api/Supplier'
import { ratelist } from '@/api/Installmentrate'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import MySupplier from './MySupplier'
import MyApply from './MyApply'
import MyPlan from './MyPlan'
import MyDelivery from './MyDelivery'
import MyOpportunity from './MyOpportunity'
import MyInstallmentapply from './MyInstallmentapply'
import MyAgent from './MyAgent'
import MyCustomer from '../../SaleOpportunity/components/MyCustomer'
import MyPackage from './MyPackage'
import { isSpecial } from '@/utils/judgeisspecial'

// eslint-disable-next-line no-unused-vars
var _that
export default {
  components: { MyCustomer, MyPackage, MyDetail, MyInstallmentapply, MyOpportunity, MyDelivery, MyPlan, MyApply, MySupplier, MyEmp, MyAgent },
  filters: {
    isSecondApplyFilter(status) {
      const statusMap = {
        1: _that.$t('updates.yes'),
        2: _that.$t('updates.no')
      }
      return statusMap[status]
    }
  },
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
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.personalForm.installmentEndtime !== null) {
            return time.getTime() < new Date().getTime() - 8.64e7
          } else if (this.personalForm.installmentEndtime === null) {
            return time.getTime() < new Date().getTime() - 8.64e7
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.personalForm.installmentBegintime).getTime() - 8.64e7
        }
      },
      pickerOptions3: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      packagerepository: '',
      rate: 0,
      moreaction: [],
      canclick: false,
      packagecontrol: false,
      needarr: [],
      picidsData: {
        type: 25
      },
      actionurl: '',
      // 附件列表
      fileList3: [],
      // 分期数据
      installmentCounts: [],
      // 分期期数参数
      ratelistData: {
        stat: 1,
        pagenum: 1,
        pagesize: 9999
      },
      // 是否可以编辑分期数据
      isinstallappley: true,
      // 回显客户
      customerId: '',
      // 控制客户弹窗
      customercontrol: false,
      // 分期申请
      installappleycontrol: false,
      // 销售门店
      saleRepositoryId: this.$store.getters.repositoryName,
      // 业务员回显
      salePersonId: this.$store.getters.name,
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 控制经销商
      agentcontrol: false,
      // 开票类别数据
      invoiceTypes: [],
      // 结算方式数据
      colseTypes: [],
      // 支付方式
      payModes: [],
      // 合计数据
      allNumber: '',
      allMoney: '',
      allTaxMoney: '',
      allIncludeTaxMoney: '',
      allDiscountMoney: '',
      allMoneyMoveDiscount: '',
      // 交货方式
      deliverymodes: [],
      // 运送方式
      transportIds: [],
      // 结算方式
      paymentIds: [],
      // 我方签约人回显
      ourContractorId: '',
      // 控制我方签约人
      deliverycontrol: false,
      // 控制源单为销售机会时
      opportunitycontrol: false,
      // 控制添加商品按钮
      addpro: true,
      // 控制从源单中选择按钮
      addsouce: true,
      // 供应商回显
      supplierId: '',
      // 控制供应商
      empcontrol: false,
      // 部门数据
      depts: [],
      // 控制业务员
      stockControl: false,
      // 类别数据
      types: [],
      // 类别获取参数
      typeparms: {
        pagenum: 1,
        pagesize: 99999
      },
      // 开票类别获取参数
      invoicetypeparms: {
        type: 4,
        pagenum: 1,
        pagesize: 99999
      },
      // 控制商品列表窗口
      control: false,
      // 采购申请单规则数据
      personalrules: {
        customerType: [
          { required: true, message: '请选择客户类别', trigger: 'change' }
        ],
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
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
      // this.getTypes()
      this.getuploadurl()
      this.getTypes()
      this.getways()
      this.getratelist()
    },
    editdata() {
      this.personalForm = this.editdata
      this.personalForm.totalMoney = this.personalForm.installmentAllMoney
      this.personalForm.notaryDate = this.formatTime(this.personalForm.notaryDate, 'Y-M-D')
      this.personalForm.contractStat = String(this.personalForm.contractStat)
      this.personalForm.payType = Number(this.personalForm.payType)
      // this.personalForm.categoryName = this.personalForm.productCategoryName
      // this.personalForm.typeName = this.personalForm.productTypeName
      this.supplierId = this.personalForm.supplierName
      this.stockPersonId = this.personalForm.stockPersonName
      this.salePersonId = this.personalForm.salePersonName
      this.customerId = this.personalForm.customerName
      for (let j = 0; j < this.personalForm.saleContractDetailVos.length; j++) {
        this.personalForm.saleContractDetailVos[j].categoryName = this.personalForm.saleContractDetailVos[j].productCategoryName
        this.personalForm.saleContractDetailVos[j].typeName = this.personalForm.saleContractDetailVos[j].productTypeName
      }
      this.list2 = this.personalForm.saleContractDetailVos
      this.changeRate()
      // this.getTypes()
    },
    list2: {
      handler(oldval, newval) {
        let num = 0
        for (const i in this.list2) {
          num += Number(this.list2[i].includeTaxMoney)
        }
        if (this.personalForm.isSecondApply === 1 || this.personalForm.sourceType === '2') {
          this.price = num
          this.changefirstmoney()
        }
      },
      deep: true
    }
  },
  created() {

  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    salePrice(val) {
      console.log('val1222222', val)
      this.moreaction[0].salePrice = val
    },
    geteachmoney() {
      console.log(this.list2)
      let carTypeId = ''
      for (const i in this.list2) {
        console.log('this.list2[i]', this.list2[i])
        if (this.list2[i].productCode.slice(0, 2) === '01') {
          carTypeId = this.list2[i].productType
        }
      }
      const date = new Date()
      let byear = 0
      let bmonth = 0
      let eyear = 0
      let emonth = 0
      if (date.getMonth() + 2 >= 12) {
        byear = date.getFullYear() + 1
        bmonth = date.getMonth() - 10
      } else {
        byear = date.getFullYear()
        bmonth = date.getMonth() + 2
      }
      if (bmonth + this.personalForm.installmentCount % 12 >= 12) {
        eyear = byear + parseInt(this.personalForm.installmentCount / 12) + 1
        emonth = bmonth + this.personalForm.installmentCount % 12 - 12
      } else {
        eyear = byear + parseInt(this.personalForm.installmentCount / 12)
        emonth = bmonth + this.personalForm.installmentCount % 12
      }
      this.personalForm.installmentBegintime = `${byear}-${bmonth}`
      this.personalForm.installmentEndtime = `${eyear}-${emonth}`
      if (this.personalForm.isManila === 2) {
        this.personalForm.eachMoney = ((this.personalForm.totalMoney) / this.personalForm.installmentCount).toFixed(6)
      } else if (this.personalForm.isManila === 1) {
        const sendparms = {
          count: this.personalForm.installmentCount,
          typeId: carTypeId,
          first: this.personalForm.firstMoney
        }
        isSpecial(sendparms).then(res => {
        // console.log(res)
          if (res.data.ret === 200 && res.data.data.flag === 1) {
            this.personalForm.eachMoney = res.data.data.eachMoney
            this.personalForm.totalMoney = Number(res.data.data.eachMoney) * this.personalForm.installmentCount
          } else {
            this.personalForm.eachMoney = ((this.personalForm.totalMoney) / this.personalForm.installmentCount).toFixed(6)
          }
        })
      }
    },
    changefirstmoney() {
      const needval = this.installmentCounts.find(item => {
        if (item.installmentCount === this.personalForm.installmentCount) {
          return (item)
        }
      })
      console.log('needval', needval)
      this.rate = needval.rate
      console.log('首付款', this.personalForm.firstMoney)
      if (this.personalForm.firstMoney != null && this.personalForm.firstMoney !== '' && this.personalForm.firstMoney !== undefined) {
        if (this.price != null && this.price !== '' && this.price !== undefined) {
          if (this.rate != null && this.rate !== '' && this.rate !== undefined && this.rate !== 0) {
            this.personalForm.totalMoney = ((Number(this.price) - Number(this.personalForm.firstMoney)) * (1 + Number(this.rate))).toFixed(6)
            const each = Math.ceil(this.personalForm.totalMoney / this.personalForm.installmentCount)
            if (each % 100 < 25) {
              this.personalForm.totalMoney = Math.floor((each / 100)) * 100 * this.personalForm.installmentCount
            } else if (each % 100 >= 25 && each % 100 < 75) {
              this.personalForm.totalMoney = (Math.floor((each / 100)) * 100 + 50) * this.personalForm.installmentCount
            } else if (each % 100 >= 75) {
              this.personalForm.totalMoney = (Math.floor((each / 100)) * 100 + 100) * this.personalForm.installmentCount
            }
          } else if (this.rate === 0) {
            this.personalForm.totalMoney = ((Number(this.productForm.price) - Number(this.personalForm.firstMoney)) * (1 + Number(this.rate))).toFixed(6)
            const each = Math.ceil(this.personalForm.totalMoney / this.personalForm.installmentCount)
          }
        }
      }
      let carTypeId = ''
      for (const i in this.list2) {
        console.log('this.list2[i]', this.list2[i])
        if (this.list2[i].productCode.slice(0, 2) === '01') {
          carTypeId = this.list2[i].productType
        }
      }
      if (this.personalForm.isManila === 1) {
        const sendparms = {
          count: this.personalForm.installmentCount,
          typeId: carTypeId,
          first: this.personalForm.firstMoney
        }
        isSpecial(sendparms).then(res => {
        // console.log(res)
          if (res.data.ret === 200 && res.data.data.flag === 1) {
            // this.personalForm.eachMoney = res.data.data.eachMoney
            this.personalForm.totalMoney = Number(res.data.data.eachMoney) * this.personalForm.installmentCount
          }
        })
      }
      this.geteachmoney()
    },
    isManilaData(val) {
      console.log('maniladata', val)
      this.personalForm.isManila = val
    },
    packagedata(val) {
      console.log('val1222222', val)
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    // 选择套餐
    handleAddpackage() {
      if (this.moreaction.length > 1 || this.moreaction.length === 0) {
        this.$notify.error({
          title: '请选择主商品',
          message: '请选择主商品',
          offset: 100
        })
      } else {
        this.productnumber = this.moreaction[0].productCode
        this.packagerepository = this.personalForm.saleRepositoryId
        this.packagecontrol = true
      }
    },
    jundgeprice() {
      if (this.personalForm.saleType === '2') {
        return false
      }
      if (this.$store.getters.countryId === 2) {
        return true
      }
      const value = ['1-22-24-115']
      const roles = this.$store.getters && this.$store.getters.roles
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      console.log('hasPermission=======', hasPermission)
      return hasPermission
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handlepicsuccess(response) {
      console.log(response.data.content.picId)
      const arr = []
      arr.push(response.data.content.picId)
      this.needarr = arr.join(',')
    },
    getuploadurl() {
      if (this.$store.getters.useCountry === 1 || this.$store.getters.useCountry === '1') {
        this.actionurl = process.env.BASE_API + '/erp/upload/uploadpic'
      }
      if (this.$store.getters.useCountry === 2 || this.$store.getters.useCountry === '2') {
        this.actionurl = process.env.BASE_API + '/philippines/upload/uploadpic'
      }
      console.log(this.actionurl)
    },
    // 上传附件
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3)
    },
    // 处理汇率
    changeRate() {
      console.log('this.personalForm', this.personalForm)
      if (this.personalForm.currency !== '3') {
        getRate(this.personalForm.currency).then(res => {
          console.log(res)
          if (res.data.ret === 200) {
            // console.log('res.data.data.content', res.data.data.content)
            // this.personalForm.exchangeRate = res.data.data.content.rate
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
    // 格式化日期，如月、日、时、分、秒保证为2位数
    formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    },
    // 参数number为毫秒时间戳，format为需要转换成的日期格式
    formatTime(number, format) {
      const time = new Date(number)
      const newArr = []
      const formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
      newArr.push(time.getFullYear())
      newArr.push(this.formatNumber(time.getMonth() + 1))
      newArr.push(this.formatNumber(time.getDate()))
      newArr.push(this.formatNumber(time.getHours()))
      newArr.push(this.formatNumber(time.getMinutes()))
      newArr.push(this.formatNumber(time.getSeconds()))

      for (const i in newArr) {
        format = format.replace(formatArr[i], newArr[i])
      }
      return format
    },
    // 数量变化其他参数
    queryStock(row) {
      if (row.discountRate === 0) {
        // row.discountMoney = 0
      } else {
        // row.discountMoney = (row.taxprice * row.quantity * (row.discountRate / 100)).toFixed(6)
      }
    },
    change() {
      this.$forceUpdate()
    },
    // 获取分期期数
    getratelist() {
      ratelist(this.ratelistData).then(res => {
        if (res.data.ret === 200) {
          this.installmentCounts = res.data.data.content.list
        }
      })
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
      this.personalForm.customerId = val.id
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.phoneNumber
    },
    agentdata(val) {
      console.log(val)
      this.personalForm.customerId = val.id
      this.customerId = val.agentName
      this.personalForm.customerPhone = val.phone
    },
    clearfinal() {
      this.personalForm.installmentEndtime = null
    },
    chooseData() {
      if (this.personalForm.sourceType === '1') {
        this.opportunitycontrol = true
      } else if (this.personalForm.sourceType === '2') {
        this.installappleycontrol = true
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
        if (this.personalForm.saleType === '2') {
          sums[11] = ''
          sums[12] = ''
          sums[13] = ''
          sums[14] = ''
          sums[16] = ''
          sums[17] = ''
          sums[18] = ''
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return (prev + curr).toFixed(6)
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
    // 计算成本金额
    getcostMoney(row) {
      row.costMoney = (row.costPrice * row.quantity).toFixed(6)
      return row.costMoney
    },
    // 计算含税金额
    getincludeTaxMoney(row) {
      row.includeTaxMoney = (row.taxprice * row.quantity).toFixed(6)
      // row.discountMoney = (row.taxprice * row.quantity * (1 - row.discount / 100)).toFixed(6)
      return row.includeTaxMoney
    },
    // 通过税率计算含税价
    gettaxRate(row) {
      if (row.taxRate === undefined) {
        this.$set(row, 'taxRate', 0)
      }
      if (row.taxprice !== 0) {
        row.taxprice = (row.salePrice * (1 + row.taxRate / 100)).toFixed(6)
      }
    },
    // 计算税额
    getTaxMoney2(row) {
      row.taxMoney = (row.salePrice * row.taxRate / 100 * row.quantity).toFixed(6)
      return row.taxMoney
    },
    // 通过折扣计算折扣额
    getdiscountRate(row) {
      if (row.discount === 0) {
        // row.discountMoney = row.taxprice * row.quantity
      } else {
        // row.discountMoney = (row.taxprice * row.quantity * (row.discount / 100)).toFixed(6)
      }
    },
    notundefined(row) {
      if (row.discount === undefined) {
        this.$set(row, 'discount', 0)
      }
      if (row.discountMoney === undefined) {
        this.$set(row, 'discountMoney', 0)
      }
    },
    // 通过折扣额计算折扣
    getdiscountMoney(row, val, scope) {
      const re = row.productCode.slice(0, 2)
      if (re === '01') {
        const discountparms = {
          typeId: row.type,
          roleId: this.$store.getters.roleId,
          category: 1,
          pageNum: 1,
          pageSize: 1
        }
        searchRoleDiscount(discountparms).then(res => {
          console.log('res', res)
          if (res.data.ret === 200) {
            if (res.data.data.content.list.length === 0) {
              row.discountMoney = 0
              row.discount = 0
              this.$notify.error({
                title: 'wrong',
                message: this.$t('tongyo.cgzdzke'),
                offset: 100
              })
            } else {
              const isoverdiscount = val / row.quantity
              console.log('isoverdiscount', isoverdiscount)
              if (res.data.data.content.list[0].discountMoney < isoverdiscount) {
                row.discountMoney = 0
                row.discount = 0
                this.$notify.error({
                  title: 'wrong',
                  message: this.$t('tongyo.cgzdzke'),
                  offset: 100
                })
              }
            }
          }
          if (row.taxprice !== 0 && row.quantity !== 0 && row.discountMoney !== 0) {
            row.discount = (((row.discountMoney / row.includeTaxCostMoney)) * 100).toFixed(6)
          }
        })
      } else {
        const discountparms = {
          roleId: this.$store.getters.roleId,
          category: 2,
          pageNum: 1,
          pageSize: 1
        }
        searchRoleDiscount(discountparms).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.list.length === 0) {
              row.discountMoney = 0
              row.discount = 0
              this.$notify.error({
                title: 'wrong',
                message: this.$t('tongyo.cgzdzke'),
                offset: 100
              })
            } else {
              console.log('res222', res)
              const isoverdiscount = res.data.data.content.list[0].discountRate * row.money
              console.log('isoverdiscount', isoverdiscount)
              if (isoverdiscount < val) {
                row.discountMoney = 0
                row.discount = 0
                this.$notify.error({
                  title: 'wrong',
                  message: this.$t('tongyo.cgzdzke'),
                  offset: 100
                })
              }
            }
          }
          if (row.taxprice !== 0 && row.quantity !== 0 && row.discountMoney !== 0) {
            row.discount = (((row.discountMoney / row.includeTaxCostMoney)) * 100).toFixed(6)
          }
        })
      }
    },
    // 计算金额
    getMoney(row) {
      row.money = (row.quantity * row.salePrice).toFixed(6)
      return row.money
    },
    // 含税价
    gettaxprice(row) {
      row.taxprice = (row.salePrice * (1 + row.taxRate / 100)).toFixed(6)
      return row.taxprice
    },
    getincludeTaxCostMoney(row) {
      row.includeTaxCostMoney = Number(row.salePrice * row.quantity) + Number(row.taxMoney)
      return row.includeTaxCostMoney
    },
    // 选择源单类型事件
    chooseType() {
      console.log(this.personalForm.sourceType)
      if (this.personalForm.sourceType === '1') {
        this.$refs.editable.clear()
        this.personalForm.sourceNumber = ''
        this.personalForm.installmentCount = ''
        this.isinstallappley = true
        this.canclick = true
      } else if (this.personalForm.sourceType === '2') {
        this.$refs.editable.clear()
        this.personalForm.sourceNumber = ''
        this.personalForm.installmentCount = ''
        this.isinstallappley = true
        this.canclick = true
      } else if (this.personalForm.sourceType === '3') {
        this.$refs.editable.clear()
        this.personalForm.sourceNumber = ''
        this.personalForm.installmentCount = ''
        this.isinstallappley = true
        this.canclick = false
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
    // 从销售机会过来的源单数据
    opportunityDetail(val) {
      console.log(val)
      this.$refs.editable.clear()
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
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
    opportunity(val) {
      this.personalForm.sourceNumber = val.opportunityNumber
      this.personalForm.salePersonId = val.handlePersonId
      this.salePersonId = val.handlePersonName
    },
    installappleyDetail(val) {
      console.log(val)
      this.$refs.editable.clear()
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('prompt.wpytj'),
              offset: 100
            })
            return false
          }
        }
        val[i].productCategoryName = val[i].categoryName
        val[i].productTypeName = val[i].typeName
        this.$refs.editable.insert(val[i])
      }
    },
    installappley(val) {
      console.log('源单数据', val)
      const date = new Date()
      this.personalForm.customerId = val.customerId
      this.customerId = val.applyPersonName
      this.personalForm.customerPhone = val.applyCellPhone
      this.personalForm.saleType = '2'
      this.personalForm.sourceNumber = val.applyNumber
      this.personalForm.installmentCount = val.installmentCount
      this.personalForm.dayOfMonth = val.installmentDays
      this.personalForm.firstMoney = val.firstMoney
      this.personalForm.totalMoney = val.totalMoney
      this.personalForm.isManila = val.isManila

      let byear = 0
      let bmonth = 0
      let eyear = 0
      let emonth = 0
      if (date.getMonth() + 2 >= 12) {
        byear = date.getFullYear() + 1
        bmonth = date.getMonth() - 10
      } else {
        byear = date.getFullYear()
        bmonth = date.getMonth() + 2
      }
      if (bmonth + val.installmentCount % 12 >= 12) {
        eyear = byear + parseInt(val.installmentCount / 12) + 1
        emonth = bmonth + val.installmentCount % 12 - 12
      } else {
        eyear = byear + parseInt(val.installmentCount / 12)
        emonth = bmonth + val.installmentCount % 12
      }
      this.personalForm.installmentBegintime = `${byear}-${bmonth}`
      this.personalForm.installmentEndtime = `${eyear}-${emonth}`
      this.personalForm.eachMoney = ((val.totalMoney) / val.installmentCount).toFixed(6)
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
      // 获取交货方式
      searchCategory(2).then(res => {
        if (res.data.ret === 200) {
          this.deliverymodes = res.data.data.content.list
          console.log(this.deliverymodes)
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
      console.log(val)
      this.salePersonId = val.personName
      this.personalForm.salePersonId = val.id
      this.personalForm.deptId = val.deptId
      this.personalForm.saleRepositoryId = val.repositoryId
      this.saleRepositoryId = val.repositoryName
    },
    // 我方签约人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.ourContractorId = val.personName
      this.personalForm.ourContractorId = val.id
    },
    // 无来源添加商品
    handleAddproduct() {
      if (this.personalForm.saleRepositoryId === 0 || this.personalForm.saleRepositoryId === '0' || this.personalForm.saleRepositoryId === '') {
        this.$notify.error({
          title: 'wrong',
          message: 'please select repository',
          offset: 100
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
      this.personalForm.installmentAllMoney = this.personalForm.totalMoney
      const EnterDetail2 = this.$refs.editable.getRecords()
      if (EnterDetail2.length === 1) {
        this.$notify.error({
          title: 'wrong',
          message: 'please choose package',
          offset: 100
        })
        return false
      }
      if (Number(this.personalForm.totalMoney) < 0) {
        this.$notify.error({
          title: 'wrong',
          message: 'totalMoney is wrong',
          offset: 100
        })
        return false
      }
      let needcode = ''
      for (const i in EnterDetail2) {
        if (EnterDetail2[i].productCode.slice(0, 2) === '01') {
          needcode = EnterDetail2[i].productCode
        }
      }
      console.log('needcode', needcode)
      const judgeissecond = needcode.slice(10, 12)
      const judgecartype = needcode.slice(3, 7)
      if (this.personalForm.isSecondApply === 1 || this.personalForm.sourceType === '2') {
        // 二手gb2
        if ((judgeissecond === '18' || judgeissecond === '04') && (judgecartype === '0002') && Number(this.personalForm.firstMoney) < 5000) {
          this.$notify.error({
            title: 'wrong',
            message: 'the down payment of second hands unit is wrong',
            offset: 100
          })
          return false
        }

        // 二手ars和二手ep
        if ((judgeissecond === '18' || judgeissecond === '04') && (judgecartype === '0003' || judgecartype === '0005') && Number(this.personalForm.firstMoney) < 6000) {
          this.$notify.error({
            title: 'wrong',
            message: 'the down payment of second hands unit is wrong',
            offset: 100
          })
          return false
        }

        // 二手erv和二手tk
        if ((judgeissecond === '18' || judgeissecond === '04') && (judgecartype === '0001' || judgecartype === '0007') && Number(this.personalForm.firstMoney) < 7000) {
          this.$notify.error({
            title: 'wrong',
            message: 'the down payment of second hands unit is wrong',
            offset: 100
          })
          return false
        }

        // 二手其他车
        if ((judgeissecond === '18' || judgeissecond === '04') && (judgecartype !== '0002' && judgecartype !== '0005' && judgecartype !== '0003' && judgecartype !== '0001' && judgecartype !== '0007') && Number(this.personalForm.firstMoney) < 7000) {
          this.$notify.error({
            title: 'wrong',
            message: 'the down payment of second hands unit is wrong',
            offset: 100
          })
          return false
        }

        // 新gb2
        if ((judgeissecond !== '18' && judgeissecond !== '04') && (judgecartype === '0002' || judgecartype === '0005') && Number(this.personalForm.firstMoney) < 5000) {
          this.$notify.error({
            title: 'wrong',
            message: 'the car firstMoney is wrong',
            offset: 100
          })
          return false
        }
        // 新ep
        if ((judgeissecond !== '18' && judgeissecond !== '04') && (judgecartype === '0005') && Number(this.personalForm.firstMoney) < 7000) {
          this.$notify.error({
            title: 'wrong',
            message: 'the car firstMoney is wrong',
            offset: 100
          })
          return false
        }

        // 其他新车
        if ((judgeissecond !== '18' && judgeissecond !== '04') && (judgecartype !== '0002' && judgecartype !== '0005') && Number(this.personalForm.firstMoney) < 10000) {
          console.log('123')
          this.$notify.error({
            title: 'wrong',
            message: 'the new car firstMoney is wrong',
            offset: 100
          })
          return false
        }
      }
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
            if (elem.discount === null || elem.discount === '' || elem.discount === undefined) {
              delete elem.discount
            }
            if (elem.discount !== null || elem.discount !== '' || elem.discount !== undefined) {
              elem.discount = elem.discount / 100
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
            if (key === 'judgeStat') {
              delete Data[key]
            }
          }
          const parms = JSON.stringify(Data)
          updatesaleContract(parms, parms2, this.needarr).then(res => {
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

<style rel="stylesheet/css" scoped>
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
