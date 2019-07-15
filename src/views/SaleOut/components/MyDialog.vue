<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.number +'    修改'" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.sourceType')" prop="sourceType" style="width: 100%;">
                <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px" @change="chooseSourceType">
                  <el-option value="1" label="销售订单"/>
                  <el-option value="2" label="销售合同"/>
                  <el-option value="3" label="预售单"/>
                  <el-option value="4" label="销售机会"/>
                  <el-option value="5" label="无来源"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.customerType')" prop="customerType" style="width: 100%;">
                <el-select v-model="personalForm.customerType" style="margin-left: 18px;width: 200px" @change="clearCustomer">
                  <el-option value="1" label="经销商"/>
                  <el-option value="2" label="零售"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.customerName')" prop="customerId" style="width: 100%;">
                <el-input v-model="customerId" style="margin-left: 18px;width: 200px" @focus="chooseCustomer"/>
                <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
                <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.customerPhone')" style="width: 100%;">
                <el-input v-model="personalForm.phoneNumber" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.customerAccount')" style="width: 100%;">
                <el-input v-model="personalForm.customerAccount" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.outType')" prop="outType" style="width: 100%;">
                <el-select v-model="personalForm.outType" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="销售出库"/>
                  <el-option value="2" label="换货出库"/>
                  <el-option value="3" label="以旧换新"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.salePersonId')" prop="salePersonId" style="width: 100%;">
                <el-input v-model="salePersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.saleType')" style="width: 100%;">
                <el-select v-model="personalForm.saleType" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="类别1"/>
                  <el-option value="2" label="类别2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.sendDate')" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.sendDate"
                  :picker-options="pickerOptions1"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.closeType')" style="width: 100%;">
                <el-select v-model="personalForm.settleMode" style="margin-left: 18px;width: 200px" @change="change">
                  <el-option
                    v-for="(item, index) in colseTypes"
                    :value="item.id"
                    :key="index"
                    :label="item.categoryName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.invoiceType')" style="width: 100%;">
                <el-select v-model="personalForm.invoiceType" style="margin-left: 18px;width: 200px" @change="change">
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
              <el-form-item :label="$t('SaleOut.payType')" style="width: 100%;">
                <el-select v-model="personalForm.payMode" style="margin-left: 18px;width: 200px" @change="change">
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
              <el-form-item :label="$t('SaleOut.transferPersonId')" style="width: 100%;">
                <el-input v-model="transferPersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseDelivery"/>
              </el-form-item>
              <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.saleRepositoryId')" style="width: 100%;">
                <el-input v-model="saleRepositoryId" style="margin-left: 18px;width: 200px" @focus="handlechooseRep"/>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.address')" style="width: 100%;">
                <el-input v-model="personalForm.address" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.outPersonId')" style="width: 100%;">
                <el-input v-model="outPersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseAccept"/>
              </el-form-item>
              <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.outDate')" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.outDate"
                  :picker-options="pickerOptions1"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.pointSupport')" style="width: 100%;">
                <el-input v-model="personalForm.pointSupport" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.couponSupport')" style="width: 100%;">
                <el-input v-model="personalForm.couponSupport" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.ridMoney')" style="width: 100%;">
                <el-input v-model="personalForm.ridMoney" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
              <span style="color: red;font-size: 14px">预售款金额：{{ yushou }}</span>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.ridBikeMoney')" style="width: 100%;">
                <el-input v-model="personalForm.ridBikeMoney" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
              <span style="color: red;font-size: 14px">回收车金额：{{ huishou }}</span>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.receivableMoney')" style="width: 100%;">
                <el-input v-model="personalForm.receivableMoney" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.isInvoice')" style="width: 100%;">
                <el-radio-group v-model="personalForm.isInvoice" style="margin-left: 18px;width: 200px">
                  <el-radio :label="1" style="width: 100px">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" >出库单明细</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button :disabled="Isproduct" @click="handleAddproduct">添加商品</el-button>
        <my-detail :control.sync="control" @product="productdetail"/>
        <el-button :disabled="IsSourceNumber" style="width: 130px" @click="handleAddSource">从源单中选择</el-button>
        <my-order :ordercontrol.sync="ordercontrol" @saleOrderDetail="saleOrderDetail" @saleOrder="saleOrder"/>
        <my-presale :presalecontrol.sync="presalecontrol" @advanceOrderDetail="advanceOrderDetail" @advanceData="advanceData"/>
        <my-opportunity :opportunitycontrol.sync="opportunitycontrol" @opportunityDetail="opportunityDetail" @opportunity="opportunity"/>
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
          <el-editable-column :edit-render="{type: 'visible'}" prop="locationId" align="center" label="货位" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-select v-model="scope.row.locationId" :value="scope.row.locationId" placeholder="请选择货位" filterable clearable style="width: 100%;" @visible-change="updatebatch($event,scope)">
                <el-option
                  v-for="(item, index) in locationlist"
                  :key="index"
                  :value="item.id"
                  :label="item.locationCode"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="batch" align="center" label="批次" min-width="150px"/>
          <el-editable-column prop="productCode" align="center" label="物品编号" min-width="150px"/>
          <el-editable-column prop="productName" align="center" label="物品名称" min-width="150px"/>
          <el-editable-column prop="categoryName" align="center" label="物品分类" min-width="150px"/>
          <el-editable-column prop="unit" align="center" label="基本单位" min-width="150px"/>
          <el-editable-column prop="typeName" align="center" label="规格型号" min-width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
          <el-editable-column prop="kpiGrade" align="center" label="绩效分" min-width="150px"/>
          <el-editable-column prop="point" align="center" label="商品积分" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 1, precision: 2}, type: 'visible'}" prop="quantity" align="center" label="出库数量" min-width="150px"/>
          <el-editable-column prop="salePrice" align="center" label="零售价" min-width="150px"/>
          <el-editable-column prop="costPrice" align="center" label="成本价" min-width="150px"/>
          <el-editable-column prop="taxprice" align="center" label="含税价" min-width="150px">
            <template slot-scope="scope">
              <span>{{ gettaxprice(scope.row) }}</span>
            </template>
          </el-editable-column>
          <el-editable-column prop="costMoney" align="center" label="成本金额" min-width="150px">
            <template slot-scope="scope">
              <p>{{ getcostMoney(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column prop="includeTaxMoney" align="center" label="含税金额" min-width="150px">
            <template slot-scope="scope">
              <p>{{ getincludeTaxMoney(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="taxRate" align="center" label="税率(%)" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="2"
                :controls="false"
                v-model="scope.row.taxRate"
                @change="gettaxRate(scope.row)"/>
            </template>
          </el-editable-column>
          <el-editable-column prop="taxMoney" align="center" label="税额" min-width="170px">
            <template slot-scope="scope">
              <p>{{ getTaxMoney2(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column prop="money" align="center" label="金额" min-width="150px">
            <template slot-scope="scope">
              <p>{{ getMoney(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column prop="includeTaxCostMoney" align="center" label="含税成本金额" min-width="170px">
            <template slot-scope="scope">
              <p>{{ getincludeTaxCostMoney(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="discount" align="center" label="折扣(%)" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="2"
                :controls="false"
                v-model="scope.row.discount"
                @input="getdiscountRate(scope.row)"/>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="discountMoney" align="center" label="折扣额" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="2"
                :controls="false"
                v-model="scope.row.discountMoney"
                @input="getdiscountMoney(scope.row)"/>
            </template>
          </el-editable-column>
          <el-editable-column prop="carCode" align="center" label="车架编码" min-width="150px"/>
          <el-editable-column prop="motorCode" align="center" label="电机编码" min-width="150px"/>
          <el-editable-column prop="batteryCode" align="center" label="电池编码" min-width="150px"/>
          <el-editable-column prop="sourceNumber" align="center" label="源单编号" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" >赠品明细</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button @click="handleAddGift">添加</el-button>
        <my-detail2 :giftcontrol.sync="giftcontrol" @gift="gift"/>
        <el-button type="danger" @click="$refs.editable2.removeSelecteds()">删除</el-button>
      </div>
      <div class="container">
        <el-editable
          ref="editable2"
          :data.sync="list3"
          :edit-config="{ showIcon: true, showStatus: true}"
          :edit-rules="validRules"
          :summary-method="getSummaries2"
          class="click-table1"
          show-summary
          stripe
          border
          size="medium"
          style="width: 100%">
          <el-editable-column type="selection" min-width="55" align="center"/>
          <el-editable-column label="序号" min-width="55" align="center" type="index"/>
          <el-editable-column :edit-render="{type: 'visible'}" prop="locationId" align="center" label="货位" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-select v-model="scope.row.locationId" :value="scope.row.locationId" placeholder="请选择货位" filterable clearable style="width: 100%;" @visible-change="updatebatch($event,scope)">
                <el-option
                  v-for="(item, index) in locationlist"
                  :key="index"
                  :value="item.id"
                  :label="item.locationCode"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="batch" align="center" label="批次" min-width="150px"/>
          <el-editable-column prop="productCode" align="center" label="物品编号" min-width="150px"/>
          <el-editable-column prop="productName" align="center" label="物品名称" min-width="150px"/>
          <el-editable-column prop="categoryName" align="center" label="物品分类" min-width="150px"/>
          <el-editable-column prop="unit" align="center" label="基本单位" min-width="150px"/>
          <el-editable-column prop="typeName" align="center" label="规格型号" min-width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
          <el-editable-column prop="salePrice" align="center" label="零售价" min-width="150px"/>
          <el-editable-column prop="money" align="center" label="金额" min-width="150px">
            <template slot-scope="scope">
              <p>{{ getMoney(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 1, precision: 2}, type: 'visible'}" prop="quantity" align="center" label="数量" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">合计信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji1')" style="width: 100%;">
                <el-input v-model="personalForm.allQuantity" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji2')" style="width: 100%;">
                <el-input v-model="personalForm.allMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji3')" style="width: 100%;">
                <el-input v-model="personalForm.allIncludeTaxMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji4')" style="width: 100%;">
                <el-input v-model="personalForm.allTaxMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji5')" style="width: 100%;">
                <el-input v-model="personalForm.allDiscountMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji6')" style="width: 100%;">
                <el-input v-model="personalForm.allIncludeTaxDiscountMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji7')" style="width: 100%;">
                <el-input v-model="personalForm.allIncludeTaxCostMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji8')" style="width: 100%;">
                <el-input v-model="personalForm.allCostMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji9')" style="width: 100%;">
                <el-input v-model="personalForm.allGiftQuantity" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji10')" style="width: 100%;">
                <el-input v-model="personalForm.allGiftMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji11')" style="width: 100%;">
                <el-input v-model="personalForm.otherMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">取消</el-button>
        <el-button type="primary" @click="handleEditok()">保存</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { updatesaleOut } from '@/api/SaleOut'
import { searchCategory } from '@/api/Supplier'
import { searchSaleCategory } from '@/api/SaleCategory'
import { getlocation, locationlist } from '@/api/public'
import MyEmp from './MyEmp'
import MyDelivery from './MyDelivery'
import MyDetail from './MyDetail'
import MyApply from './MyApply'
import MySupplier from './MySupplier'
import MyRequire from './MyRequire'
import MyCustomer from './MyCustomer'
import MyAgent from './MyAgent'
import MyAccept from './MyAccept'
import MyRepository from './MyRepository'
import MyOrder from './MyOrder'
import MyAdvance from './MyAdvance'
import MyPresale from './MyPresale'
import MyOpportunity from './MyOpportunity'
import MyDetail2 from './MyDetail2'
export default {
  components: { MyDetail2, MyOpportunity, MyPresale, MyAdvance, MyOrder, MyRepository, MyAccept, MyAgent, MyCustomer, MyRequire, MySupplier, MyApply, MyDetail, MyDelivery, MyEmp },
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
      if (this.salePersonId === undefined || this.salePersonId === null || this.salePersonId === '') {
        callback(new Error('请选择销售人员'))
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
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
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
      payModes: [],
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
      // 控制交货人
      deliverycontrol: false,
      // 回显职务
      roleId: '',
      // 回显客户
      customerId: '',
      // 控制客户
      customercontrol: false,
      agentcontrol: false,
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
      // 销售订单规则数据
      personalrules: {
        customerType: [
          { required: true, message: '请选择客户类别', trigger: 'change' }
        ],
        transDate: [
          { required: true, message: '请选择送货日期', trigger: 'change' }
        ],
        salePersonId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        backType: [
          { required: true, message: '请选择回款状态', trigger: 'change' }
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
      this.planPersonId = this.personalForm.planPersonName
      this.stockPersonId = this.personalForm.stockPersonName
      this.list2 = this.personalForm.saleOutDetailVos
      this.list3 = this.personalForm.saleOutGiftVos
      this.customerId = this.personalForm.customerName
      this.salePersonId = this.personalForm.salePersonName
      this.transferPersonId = this.personalForm.transferPersonName
      this.saleRepositoryId = this.personalForm.saleRepositoryName
      this.outPersonId = this.personalForm.outPersonName
      this.updatebatch()
    }
  },
  created() {
    this.getTypes()
    this.getdatatime()
    this.chooseSourceType()
  },
  methods: {
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
    getlocation() {
      // 货位根据仓库id展现
      locationlist(this.personalForm.enterRepositoryId).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list.map(function(item) {
            return {
              'value': item.id,
              'label': item.locationName
            }
          })
        }
      })
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
        console.log('未做')
      } else if (this.personalForm.sourceType === '3') {
        this.presalecontrol = true
      } else if (this.personalForm.sourceType === '4') {
        this.opportunitycontrol = true
      }
    },
    // 从销售订单过来数据
    saleOrderDetail(val) {
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
        this.personalForm.payMode = String(val.payMode)
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
        customerType: '1',
        sendType: '2',
        sendDate: null,
        outDate: null,
        sourceType: '5',
        otherMoney: ''
      }
      this.customerId = null
      this.salePersonId = null
      this.saleRepositoryId = null
      this.transferPersonId = null
      this.outPersonId = null
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
          const EnterDetail = this.$refs.editable.getRecords()
          const EnterDetail2 = this.$refs.editable2.getRecords()
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
          EnterDetail2.map(function(elem) {
            return elem
          }).forEach(function(elem) {
            if (elem.batch === null || elem.batch === '' || elem.batch === undefined) {
              delete elem.batch
            }
            if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
              delete elem.productName
            }
            if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
              delete elem.productCode
            }
            if (elem.category === null || elem.category === '' || elem.category === undefined) {
              delete elem.category
            }
            if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
              delete elem.unit
            }
            if (elem.color === null || elem.color === '' || elem.color === undefined) {
              delete elem.color
            }
            if (elem.type === null || elem.type === '' || elem.type === undefined) {
              delete elem.type
            }
            if (elem.money === null || elem.money === '' || elem.money === undefined) {
              delete elem.money
            }
            if (elem.quantity === null || elem.quantity === '' || elem.quantity === undefined) {
              delete elem.quantity
            }
            if (elem.salePrice === null || elem.salePrice === '' || elem.salePrice === undefined) {
              delete elem.salePrice
            }
            return elem
          })
          const parms2 = JSON.stringify(EnterDetail)
          const parms3 = JSON.stringify(EnterDetail2)
          const Data = this.personalForm
          for (const key in Data) {
            if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
              delete Data[key]
            }
          }
          const parms = JSON.stringify(Data)
          updatesaleOut(parms, parms2, parms3).then(res => {
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
              this.$refs.editable2.clear()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
              this.$refs.personalForm2.clearValidate()
              this.$refs.personalForm2.resetFields()
              this.$refs.personalForm3.clearValidate()
              this.$refs.personalForm3.resetFields()
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
      this.$refs.editable2.clear()
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.$refs.personalForm2.clearValidate()
      this.$refs.personalForm2.resetFields()
      this.$refs.personalForm3.clearValidate()
      this.$refs.personalForm3.resetFields()
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
