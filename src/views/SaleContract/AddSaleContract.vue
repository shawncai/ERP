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
                <el-form-item :label="$t('SaleContract.title')" prop="title" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.sourceType')" prop="sourceType" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px" @change="chooseType">
                    <el-option value="1" label="销售机会" />
                    <el-option value="2" label="分期申请" />
                    <el-option value="3" label="无来源" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.sourceNumber')" style="width: 100%;">
                  <el-input :disabled="personalForm.sourceType === '3'" v-model="personalForm.sourceNumber" style="margin-left: 18px;width: 200px" @focus="chooseData"/>
                </el-form-item>
                <my-opportunity :opportunitycontrol.sync="opportunitycontrol" @opportunityDetail="opportunityDetail" @opportunity="opportunity"/>
                <my-installmentapply :installappleycontrol.sync = "installappleycontrol" @installappleyDetail="installappleyDetail" @installappley="installappley"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleOut.customerType')" prop="customerType" style="width: 100%;">
                  <el-select v-model="personalForm.customerType" style="margin-left: 18px;width: 200px" @change="clearCustomer">
                    <el-option value="1" label="经销商"/>
                    <el-option value="2" label="零售"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.customerName')" prop="customerId" style="width: 100%;">
                  <el-input v-model="customerId" style="margin-left: 18px;width: 200px" @focus="chooseCustomer"/>
                  <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
                  <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.customerPhone')" style="width: 100%;">
                  <el-input v-model="personalForm.customerPhone" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.saleType')" style="width: 100%;">
                  <el-select v-model="personalForm.saleType" style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="零售" />
                    <el-option value="2" label="批发" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.closeType')" style="width: 100%;">
                  <el-select ref="clear" v-model="personalForm.closeType" clearable style="margin-left: 18px;width: 200px">
                    <el-option v-show="false" label="" value=""/>
                    <el-option
                      v-for="(item, index) in colseTypes"
                      :value="item.id"
                      :key="index"
                      :label="item.categoryName"/>
                    <template>
                      <el-button v-if="isshow2" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat">{{ $t('updates.create') }}</el-button>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.payType')" style="width: 100%;">
                  <el-select ref="clear2" v-model="personalForm.payType" clearable style="margin-left: 18px;width: 200px">
                    <el-option v-show="false" label="" value=""/>
                    <el-option
                      v-for="(item, index) in payModes"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                    <template>
                      <el-button v-if="isshow2" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat2">{{ $t('updates.create') }}</el-button>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.deliveryMode')" style="width: 100%;">
                  <el-select ref="clear5" v-model="personalForm.deliveryMode" clearable style="margin-left: 18px;width: 200px">
                    <el-option v-show="false" label="" value=""/>
                    <el-option
                      v-for="(item, index) in deliverymodes"
                      :key="index"
                      :value="item.id"
                      :label="item.categoryName"/>
                    <template>
                      <el-button v-if="isshow2" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat5">{{ $t('updates.create') }}</el-button>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleOrder.currency')" style="width: 100%;">
                  <el-select v-model="personalForm.currency" style="margin-left: 18px;width: 200px" @change="changeRate">
                    <el-option value="1" label="PHP"/>
                    <el-option value="2" label="USD"/>
                    <el-option value="3" label="RMB"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('public.rate')" style="width: 100%;">
                  <el-input v-model="personalForm.exchangeRate" disabled style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.salePersonId')" style="width: 100%;">
                  <el-input v-model="salePersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
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
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.saleRepositoryId')" style="width: 100%;">
                  <el-input v-model="saleRepositoryId" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.signDate')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.signDate"
                    :picker-options="pickerOptions4"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.signAddress')" style="width: 100%;">
                  <el-input v-model="personalForm.signAddress" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.contractStat')" style="width: 100%;">
                  <el-select v-model="personalForm.contractStat" clearable style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="制单中"/>
                    <el-option value="2" label="执行中"/>
                    <el-option value="3" label="结束"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.invoiceType')" style="width: 100%;">
                  <el-select ref="clear3" v-model="personalForm.invoiceType" clearable style="margin-left: 18px;width: 200px">
                    <el-option v-show="false" label="" value=""/>
                    <el-option
                      v-for="(item, index) in invoiceTypes"
                      :value="item.id"
                      :key="index"
                      :label="item.categoryName"
                    />
                    <template>
                      <el-button v-if="isshow" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat3">{{ $t('updates.create') }}</el-button>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.taxRate')" style="width: 100%;">
                  <el-input v-model="personalForm.taxRate" style="margin-left: 18px;width: 200px" clearable disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
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
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.dayOfMonth')" style="width: 100%;">
                  <el-input-number v-model="personalForm.dayOfMonth" :disabled="isinstallappley" :controls="false" :min="1" :max="31" style="margin-left: 18px;width: 200px" placeholder="号"/>
                </el-form-item>
              </el-col>
              <!--<el-col :span="6">-->
              <!--<el-form-item :label="$t('SaleContract.installmentAllMoney')" style="width: 100%;">-->
              <!--<el-input v-model="personalForm.installmentAllMoney" style="margin-left: 18px;width: 200px" clearable/>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <el-col :span="6">
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
              <el-col :span="6">
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
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.notaryPerson')" style="width: 100%;">
                  <el-input v-model="personalForm.notaryPerson" :disabled="isinstallappley" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
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
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.firstMoney')" style="width: 100%;">
                  <el-input-number v-model="personalForm.firstMoney" :precision="2" :controls="false" :disabled="isinstallappley" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.uploadAttachments')" style="width: 100%;">
                  <el-upload
                    :on-change="handleChange"
                    :file-list="fileList3"
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    style="margin-left: 18px"
                  >
                    <el-button size="small" type="primary" style="width: 200px">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.installmentAllMoney')" style="width: 100%;">
                  <el-input v-model="personalForm.totalMoney" :disabled="isinstallappley" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.eachMoney')" style="width: 100%;">
                  <el-input v-model="personalForm.eachMoney" :disabled="isinstallappley" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >{{ $t('updates.htmx') }}</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button :disabled="canclick" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <my-detail :control.sync="control" @product="productdetail"/>
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
            <el-editable-column :label="$t('updates.wpfl')" prop="categoryName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ggxh')" prop="typeName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.jxf')" prop="performanceScore" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.spjf')" prop="productScore" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.ddsl')" prop="quantity" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="false"
                  :min="1.00"
                  v-model="scope.row.quantity"
                  @change="queryStock(scope.row)"
                />
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.lsj')" prop="salePrice" align="center" min-width="150px"/>
            <!--            <el-editable-column prop="costPrice" align="center" :label="$t('updates.cbj')" min-width="150px"/>-->
            <el-editable-column :label="$t('updates.hsj')" prop="taxprice" align="center" min-width="150px">
              <template slot-scope="scope">
                <span>{{ gettaxprice(scope.row) }}</span>
              </template>
            </el-editable-column>
            <!--            <el-editable-column prop="costMoney" align="center" label="成本金额" min-width="150px">-->
            <!--              <template slot-scope="scope">-->
            <!--                <p>{{ getcostMoney(scope.row) }}</p>-->
            <!--              </template>-->
            <!--            </el-editable-column>-->
            <el-editable-column :label="$t('updates.hsje')" prop="includeTaxMoney" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getincludeTaxMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.sl')" prop="taxRate" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="false"
                  v-model="scope.row.taxRate"
                  @change="gettaxRate(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.se')" prop="taxMoney" align="center" min-width="170px">
              <template slot-scope="scope">
                <p>{{ getTaxMoney2(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('Hmodule.je')" prop="money" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.hscbje')" prop="includeTaxCostMoney" align="center" min-width="170px">
              <template slot-scope="scope">
                <p>{{ getincludeTaxCostMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.ckl')" prop="discount" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="false"
                  v-model="scope.row.discount"
                  @change="getdiscountRate(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.cke')" prop="discountMoney" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="false"
                  v-model="scope.row.discountMoney"
                  @change="getdiscountMoney(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.cjbm')" prop="carCode" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.djbm')" prop="motorCode" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.dcbm')" prop="batteryCode" align="center" min-width="150px"/>
          </el-editable>
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
import { createsaleContract } from '@/api/SaleContract'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchSaleCategory } from '@/api/SaleCategory'
import { searchCategory } from '@/api/Supplier'
import { ratelist } from '@/api/Installmentrate'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MySupplier from './components/MySupplier'
import MyApply from './components/MyApply'
import MyPlan from './components/MyPlan'
import MyDelivery from './components/MyDelivery'
import MyOpportunity from './components/MyOpportunity'
import MyInstallmentapply from './components/MyInstallmentapply'
import MyCustomer from '../SaleOpportunity/components/MyCustomer'
import MyAgent from '../SaleOpportunity/components/MyAgent'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  name: 'AddSaleContract',
  components: { MyAgent, MyCustomer, MyInstallmentapply, MyOpportunity, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp },
  data() {
    const validatePass4 = (rule, value, callback) => {
      if (this.customerId === undefined || this.customerId === null || this.customerId === '') {
        callback(new Error('请选择客户'))
      } else {
        callback()
      }
    }
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
      pickerOptions4: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.personalForm.signDate).getTime() - 8.64e7
        }
      },
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
      // 支付方式
      payModes: [],
      // 附件列表
      fileList3: [],
      // 判断点击
      canclick: false,
      // 权限判断
      isshow: false,
      isshow2: false,
      // 分期数据
      installmentCounts: [],
      // 分期期数参数
      ratelistData: {
        stat: 1,
        pagenum: 1,
        pagesize: 9999
      },
      // 控制经销商
      agentcontrol: false,
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
      // 是否可以编辑分期数据
      isinstallappley: true,
      // 回显客户
      customerId: '',
      // 控制客户弹窗
      customercontrol: false,
      // 合计数据
      allNumber: '',
      allMoney: '',
      allTaxMoney: '',
      allIncludeTaxMoney: '',
      allDiscountMoney: '',
      allMoneyMoveDiscount: '',
      // 分期申请
      installappleycontrol: false,
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
      // 选择的数据
      choosedata: [],
      // 部门数据
      depts: [],
      // 销售门店
      saleRepositoryId: this.$store.getters.repositoryName,
      // 业务员回显
      salePersonId: this.$store.getters.name,
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
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        salePersonId: this.$store.getters.userId,
        isVat: 1,
        installmentEndtime: null,
        installmentBegintime: null,
        exchangeRate: '1.0000',
        currency: '1',
        notaryDate: null,
        deptId: this.$store.getters.deptId,
        saleRepositoryId: this.$store.getters.repositoryId,
        customerType: '2',
        signDate: null,
        sourceType: '3',
        taxRate: 0,
        contractStat: '1'
      },
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
        ],
        customerId: [
          { required: true, validator: validatePass4, trigger: 'change' }
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
    this.getratelist()
    // this.getdatatime()
    this.getCategory()
    this.jungleshow()
  },
  activated() {
    this.getinformation()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 获取默认消息（分期列表）
    getinformation() {
      console.log(11111111111111111111111111)
      if (this.$store.getters.empcontract) {
        this.personalForm.sourceType = '2'
        this.isinstallappley = false
        this.installappley(this.$store.getters.empcontract[0])
        console.log('empcontract', this.$store.getters.empcontract)
      }
      this.$store.dispatch('getempcontract', '')
    },
    // 数量变化其他参数
    queryStock(row) {
      if (row.discountRate === 0) {
        row.discountMoney = row.taxprice * row.quantity
      } else {
        row.discountMoney = (row.taxprice * row.quantity * (1 - row.discountRate / 100)).toFixed(2)
      }
    },
    // 上传附件
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3)
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
    // 无来源添加商品
    handleAddproduct() {
      this.control = true
    },
    // 判断权限
    jungleshow() {
      const roles = this.$store.getters.roles
      this.isshow = roles.includes('54-83-1')
      this.isshow2 = roles.includes('1-22-28-1')
      console.log(this.isshow)
      console.log(this.isshow2)
    },
    // 获取类型
    getCategory() {
      // 获取运送方式
      searchCategory(3).then(res => {
        if (res.data.ret === 200) {
          this.transmodes = res.data.data.content.list
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
      // 获取交货方式
      searchCategory(2).then(res => {
        if (res.data.ret === 200) {
          this.deliverymodes = res.data.data.content.list
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
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
    // getdatatime() { // 默认显示今天
    //   var date = new Date()
    //   var seperator1 = '-'
    //   var year = date.getFullYear()
    //   var month = date.getMonth() + 1
    //   var strDate = date.getDate()
    //   if (month >= 1 && month <= 9) {
    //     month = '0' + month
    //   }
    //   if (strDate >= 0 && strDate <= 9) {
    //     strDate = '0' + strDate
    //   }
    //   var currentdate = year + seperator1 + month + seperator1 + strDate
    //   this.personalForm.signDate = currentdate
    //   this.personalForm.installmentBegintime = currentdate
    // },
    change() {
      this.$forceUpdate()
      console.log('期数', this.personalForm.installmentCount)
      console.log('开始时间', this.personalForm.installmentBegintime.split('-'))
      const byear = Number(this.personalForm.installmentBegintime.split('-')[0])
      const bmonth = Number(this.personalForm.installmentBegintime.split('-')[1])
      let eyear = 0
      let emonth = 0
      if (bmonth + this.personalForm.installmentCount % 12 >= 12) {
        eyear = byear + parseInt(this.personalForm.installmentCount / 12) + 1
        emonth = bmonth + this.personalForm.installmentCount % 12 - 12
      } else {
        eyear = byear + parseInt(this.personalForm.installmentCount / 12)
        emonth = bmonth + this.personalForm.installmentCount % 12
      }
      this.personalForm.installmentEndtime = `${eyear}-${emonth}`
      this.personalForm.eachMoney = ((this.personalForm.totalMoney - this.personalForm.firstMoney) / this.personalForm.installmentCount).toFixed(2)
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
      console.log('经销信息', val)
      this.personalForm.customerId = val.id
      this.customerId = val.agentName
      this.personalForm.customerPhone = val.phone
      this.personalForm.deliveryMode = val.deliveryMode
      this.personalForm.payType = val.payMode
      this.personalForm.invoiceType = val.invoiceType
      this.personalForm.closeType = val.settleMode
      this.personalForm.currency = String(val.currency)
      this.changeRate()
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
          this.deliverymodes = res.data.data.content.list
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
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.payModes = res.data.data.content.list
        }
      })
    },
    // 计算成本金额
    getcostMoney(row) {
      row.costMoney = (row.costPrice * row.quantity).toFixed(2)
      return row.costMoney
    },
    // 计算含税金额
    getincludeTaxMoney(row) {
      row.includeTaxMoney = (row.taxprice * row.quantity).toFixed(2)
      row.discountMoney = (row.taxprice * row.quantity * (row.discount / 100)).toFixed(2)
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
      if (row.discount === 0) {
        row.discountMoney = row.taxprice * row.quantity
      } else {
        row.discountMoney = (row.taxprice * row.quantity * (row.discount / 100)).toFixed(2)
      }
    },
    // 通过折扣额计算折扣
    getdiscountMoney(row) {
      console.log(row)
      if (row.taxprice !== 0 && row.quantity !== 0 && row.discountMoney !== 0) {
        row.discountRate = (((row.discountMoney / row.includeTaxCostMoney)) * 100).toFixed(2)
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
        this.isinstallappley = false
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
      console.log('销售机会', val)
      this.personalForm.sourceNumber = val.opportunityNumber
      this.personalForm.salePersonId = val.handlePersonId
      this.salePersonId = val.handlePersonName
      this.personalForm.customerType = String(val.customerType)
      this.saleRepositoryId = val.handleRepositoryName
      this.personalForm.saleRepositoryId = val.handleRepositoryId
      this.personalForm.deptId = val.deptId
    },
    installappleyDetail(val) {
      console.log(val)
      this.$refs.editable.clear()
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
        console.log('表单2', this.list2)
      }
    },
    installappley(val) {
      console.log('源单数据', val)
      const date = new Date()
      this.personalForm.sourceNumber = val.applyNumber
      this.personalForm.installmentCount = val.installmentCount
      this.personalForm.dayOfMonth = val.installmentDays
      this.personalForm.firstMoney = val.firstMoney
      this.personalForm.totalMoney = val.totalMoney
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
      this.personalForm.eachMoney = ((val.totalMoney - val.firstMoney) / val.installmentCount).toFixed(2)
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
    // 采购申请明细来源
    // handleAddproduct() {
    //   this.control = true
    // },
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
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        salePersonId: this.$store.getters.userId,
        isVat: 1,
        installmentEndtime: null,
        installmentBegintime: null,
        exchangeRate: '1.0000',
        currency: '1',
        notaryDate: null,
        deptId: this.$store.getters.deptId,
        saleRepositoryId: this.$store.getters.repositoryId,
        customerType: '2',
        signDate: null,
        sourceType: '3',
        taxRate: 0,
        contractStat: '1'
      }
      this.supplierId = null
      this.inquiryPersonId = null
      this.stockPersonId = null
      this.ourContractorId = null
      this.customerId = null
      this.isinstallappley = false
    },
    // 深拷贝
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    // 保存操作
    handlesave() {
      const EnterDetail2 = this.$refs.editable.getRecords()
      console.log('EnterDetail', EnterDetail2)
      if (EnterDetail2.length === 0) {
        this.$notify.error({
          title: '错误',
          message: '明细表不能为空',
          offset: 100
        })
        return false
      }

      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          const EnterDetail = this.deepClone(this.$refs.editable.getRecords())
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
          createsaleContract(parms, parms2, this.personalForm).then(res => {
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
      const view = { path: '/SaleContract/AddSaleContract', name: 'AddSaleContract', fullPath: '/SaleContract/AddSaleContract', title: 'AddSaleContract' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    // 触发下拉blur
    go_creat() {
      this.$router.push('/Supplier/SupplierCategory')
      this.$refs.clear.blur()
    },
    go_creat2() {
      this.$router.push('/Supplier/SupplierCategory')
      this.$refs.clear2.blur()
    },
    go_creat3() {
      this.$router.push('/SaleCategory/SaleCategoryList')
      this.$refs.clear3.blur()
    },
    go_creat5() {
      this.$router.push('/Supplier/SupplierCategory')
      this.$refs.clear5.blur()
    }
  }
}
</script>

<style rel="stylesheet/css" scoped>
  .ERP-container >>> .el-input-number.is-without-controls .el-input__inner{
    text-align: left;
  }
  .ERP-container {
    margin-right: 0;
  }
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
