<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('ProduceTask.sourceType')" prop="sourceType" style="width: 100%;">
                <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px" @change="chooseSource">
                  <el-option value="1" label="无来源" />
                  <el-option value="2" label="销售机会" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.sourceNumber')" style="width: 100%;">
                <el-input v-model="personalForm.sourceNumber" :disabled="IsNumber" style="margin-left: 18px;width: 200px" @focus="openoppo"/>
                <my-opportunity :opportunitycontrol.sync="opportunitycontrol" @opportunityDetail="opportunityDetail" @opportunity="opportunity"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.customerType')" prop="customerType" style="width: 100%;">
                <el-select v-model="personalForm.customerType" style="margin-left: 18px;width: 200px" @change="clearCustomer">
                  <el-option value="1" label="经销商"/>
                  <el-option value="2" label="零售"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.customerName')" prop="customerId" style="width: 100%;">
                <el-input v-model="customerId" style="margin-left: 18px;width: 200px" @focus="chooseCustomer"/>
                <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
                <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.customerPhone')" style="width: 100%;">
                <el-input v-model="personalForm.customerPhone" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.invoiceType')" style="width: 100%;">
                <el-select v-model="personalForm.invoiceType" style="margin-left: 18px;width: 200px">
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
              <el-form-item :label="$t('StockContract.payId')" style="width: 100%;">
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
            <!--            <el-col :span="12">-->
            <!--              <el-form-item :label="$t('SaleOrder.transDate')" prop="transDate" style="width: 100%;">-->
            <!--                <el-date-picker-->
            <!--                  v-model="personalForm.transDate"-->
            <!--                  type="date"-->
            <!--                  value-format="yyyy-MM-dd"-->
            <!--                  style="margin-left: 18px;width: 200px"/>-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.salePersonId')" prop="salePersonId" style="width: 100%;">
                <el-input v-model="salePersonId" style="margin-left: 18px;width: 200px" clearable @focus="handlechooseStock"/>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.saleRepositoryId')" style="width: 100%;">
                <el-input v-model="saleRepositoryName" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.roleId')" style="width: 100%;">
                <el-input v-model="personalForm.roleName" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.saleType')" style="width: 100%;">
                <el-select v-model="personalForm.saleType" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="零售" />
                  <el-option value="2" label="批发" />
                </el-select>
              </el-form-item>
            </el-col>
            <!--            <el-col :span="12">-->
            <!--              <el-form-item :label="$t('SaleOrder.payType')" style="width: 100%;">-->
            <!--                <el-select v-model="personalForm.payType" style="margin-left: 18px;width: 200px">-->
            <!--                  <el-option value="1" label="方式1"/>-->
            <!--                  <el-option value="2" label="方式2"/>-->
            <!--                </el-select>-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
            <el-col :span="12">
              <el-form-item :label="$t('StockOrder.currency')" prop="currency" style="width: 100%;">
                <el-select v-model="personalForm.currency" style="margin-left: 18px;width: 200px" @change="changeRate">
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
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.transAddress')" style="width: 100%;">
                <el-input v-model="personalForm.transAddress" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <!--            <el-col :span="12">-->
            <!--              <el-form-item :label="$t('SaleOrder.receiveMoney')" style="width: 100%;">-->
            <!--                <el-input v-model="personalForm.receiveMoney" style="margin-left: 18px;width: 200px"/>-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.colseType')" style="width: 100%;">
                <el-select v-model="personalForm.settleMode" style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in settleModes"
                    :value="item.id"
                    :key="index"
                    :label="item.categoryName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.deliveryMode')" style="width: 100%;">
                <el-select v-model="personalForm.deliveryMode" style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in deliveryModes"
                    :value="item.id"
                    :key="index"
                    :label="item.categoryName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockRetreat.transportModeId')" style="width: 100%;">
                <el-select v-model="personalForm.transMode" clearable style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in transportIds"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('otherlanguage.bcskje')" style="width: 100%;">
                <el-input v-model="personalForm.receiveMoney" style="margin-left: 18px;width:200px"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" >{{ $t('updates.ddmx') }}</h2>
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
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.wpfl')" prop="productCategoryName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.jbdw')" prop="unit" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ggxh')" prop="productTypeName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.jxf')" prop="performanceScore" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.spjf')" prop="productScore" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.cksli')" prop="quantity" align="center" min-width="150" >
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
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.cjbm')" prop="carCode" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-input v-if="isEdit2(scope.row)" v-model="scope.row.carCode" clearable/>
              <span v-else>{{ scope.row.carCode }}</span>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.djbm')" prop="motorCode" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-input v-if="isEdit2(scope.row)" v-model="scope.row.motorCode" clearable/>
              <span v-else>{{ scope.row.motorCode }}</span>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.dcbm')" prop="batteryCode" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-input v-if="isEdit3(scope.row)" v-model="scope.row.batteryCode" clearable />
              <span v-else>{{ scope.row.batteryCode }}</span>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.ycksl')" prop="alreadyOutQuantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ythsl')" prop="retreatQuantity" align="center" min-width="150px"/>
          <!--          <el-editable-column prop="salePrice" align="center" :label="$t('updates.lsj')" min-width="150px"/>-->
          <!--          <el-editable-column prop="costPrice" align="center" :label="$t('updates.cbj')" min-width="150px"/>-->
          <el-editable-column :label="$t('updates.xsdj')" prop="taxprice" align="center" min-width="150px">
            <template slot-scope="scope">
              <span>{{ gettaxprice(scope.row) }}</span>
            </template>
          </el-editable-column>
          <el-editable-column v-if="false" prop="costMoney" align="center" label="成本金额" min-width="150px">
            <template slot-scope="scope">
              <p>{{ getcostMoney(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column v-if="false" :label="$t('updates.sxje')" prop="includeTaxMoney" align="center" min-width="150px">
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
          <el-editable-column v-if="false" :label="$t('Hmodule.je')" prop="money" align="center" min-width="150px">
            <template slot-scope="scope">
              <p>{{ getMoney(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.sxje')" prop="includeTaxCostMoney" align="center" min-width="170px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.ckl')" prop="discountRate" align="center" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="2"
                :controls="false"
                v-model="scope.row.discountRate"
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
          <el-editable-column :label="$t('updates.yxdcgsl')" prop="alreadyApplicationQuantity" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElDatePicker', attrs: {type: 'date', format: 'yyyy-MM-dd'}, type: 'visible'}" :label="$t('updates.jhrq')" prop="deliveryDate" align="center" min-width="180px">
            <template slot="edit" slot-scope="scope">
              <el-date-picker
                v-model="scope.row.deliveryDate"
                :picker-options="pickerOptions2"
                type="date"
                value-format="yyyy-MM-dd"/>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.yxdscsl')" prop="alreadyProduceQuantity" align="center" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <!--<el-card class="box-card" style="margin-top: 15px" shadow="never">-->
    <!--<h2 ref="fuzhu" class="form-name" >销售费用明细</h2>-->
    <!--<div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">-->
    <!--<el-button @click="$refs.editable2.insert(-1)">{{ $t('updates.tj') }}</el-button>-->
    <!--<el-button type="danger" @click="$refs.editable2.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>-->
    <!--</div>-->
    <!--<div class="container">-->
    <!--<el-editable-->
    <!--ref="editable2"-->
    <!--:data.sync="list3"-->
    <!--:edit-config="{ showIcon: true, showStatus: true}"-->
    <!--:edit-rules="validRules"-->
    <!--class="click-table1"-->
    <!--stripe-->
    <!--border-->
    <!--size="medium"-->
    <!--style="width: 100%">-->
    <!--<el-editable-column type="selection" min-width="55" align="center"/>-->
    <!--<el-editable-column :label="$t('Hmodule.xh')" width="60" align="center" type="index"/>-->
    <!--<el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="costName" align="center" :label="$t('updates.fymc')" min-width="150px"/>-->
    <!--<el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="money" align="center" :label="$t('Hmodule.je')" min-width="150px"/>-->
    <!--<el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="remark" align="center" :label="$t('updates.bz')" min-width="150px"/>-->
    <!--</el-editable>-->
    <!--</div>-->
    <!--</el-card>-->
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.heji1')" style="width: 100%;">
                <el-input v-model="personalForm.allQuantity" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.heji2')" style="width: 100%;">
                <el-input v-model="personalForm.allMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.heji3')" style="width: 100%;">
                <el-input v-model="personalForm.allIncludeTaxMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.heji4')" style="width: 100%;">
                <el-input v-model="personalForm.allTaxMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.heji5')" style="width: 100%;">
                <el-input v-model="personalForm.allDiscountMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.heji6')" style="width: 100%;">
                <el-input v-model="personalForm.allIncludeTaxDiscountMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.heji7')" style="width: 100%;">
                <el-input v-model="personalForm.allIncludeTaxCostMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.heji8')" style="width: 100%;">
                <el-input v-model="personalForm.allCostMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.heji9')" style="width: 100%;">
                <el-input v-model="personalForm.otherMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">{{ $t('updates.xgdjzt') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm3" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.backType')" prop="backType" style="width: 100%;">
                <el-select v-model="personalForm.backType" style="margin-left: 18px;width: 200px" disabled>
                  <el-option value="1" label="已回款"/>
                  <el-option value="2" label="未回款"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.backMoney')" style="width: 100%;">
                <el-input v-model="personalForm.backMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.sendType')" style="width: 100%;">
                <el-select v-model="personalForm.sendType" style="margin-left: 18px;width: 200px" disabled>
                  <el-option value="1" label="已发货"/>
                  <el-option value="2" label="未发货"/>
                </el-select>
              </el-form-item>
            </el-col>
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
import { getRate } from '@/api/public'
import { updatesaleOrder } from '@/api/SaleOrder'
import { searchCategory } from '@/api/Supplier'
import { searchSaleCategory } from '@/api/SaleCategory'
import MyEmp from './MyEmp'
import MyDelivery from '../../DailyAdjust/components/MyDelivery'
import MyDetail from './MyDetail'
import MyApply from './MyApply'
import MySupplier from '../../Product/components/MySupplier'
import MyRequire from './MyRequire'
import MyCustomer from './MyCustomer'
import MyAgent from './MyAgent'
import MyOpportunity from './MyOpportunity'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  components: { MyAgent, MyCustomer, MyRequire, MySupplier, MyApply, MyDetail, MyDelivery, MyEmp, MyOpportunity },
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
      pickerOptions2: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      rate: 1,
      // 选择的数据
      choosedata: [],
      deliveryModes: [],
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
      // 控制添加商品按钮是否可以点击
      Isproduct: true,
      // 回显客户
      customerId: '',
      // 控制客户
      customercontrol: false,
      agentcontrol: false,
      // 销售人员回显
      salePersonId: '',
      // 控制销售人员
      stockControl: false,
      // 仓库回显
      saleRepositoryName: '',
      // 开票类别数据
      invoiceTypes: [],
      // 开票类别获取参数
      invoicetypeparms: {
        type: 4,
        pagenum: 1,
        pagesize: 99999
      },
      // 结算方式数据
      settleModes: [],
      // 控制源单编码是否可以选择
      IsNumber: true,
      // 结算方式获取参数
      settleModeparms: {
        type: 3,
        pagenum: 1,
        pagesize: 99999
      },
      // 控制销售机会
      opportunitycontrol: false,
      payModes: [],
      transportIds: [],
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
      console.log(this.editdata)
      this.personalForm = this.editdata
      this.saleRepositoryName = this.personalForm.saleRepositoryName
      this.planPersonId = this.personalForm.planPersonName
      this.stockPersonId = this.personalForm.stockPersonName
      this.salePersonId = this.personalForm.salePersonName
      this.customerId = this.personalForm.customerName
      this.list2 = this.personalForm.saleOrderDetailVos
      this.list3 = this.personalForm.saleOrderCostDetails
      this.changeRate()
      // this.chooseSource(this.personalForm.sourceType)
    }
  },
  created() {
    this.getTypes()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    isEdit2(row) {
      console.log('222', row)
      const re = row.productCode.slice(0, 2)
      // if (re === '01') {
      //   row.quantity = 1
      //   return row.quantity
      // }
      if (re === '01' && this.personalForm.customerType === '2') { return true } else { return false }
    },
    isEdit3(row) {
      console.log('222', row)
      const re = row.productCode.slice(0, 2)
      // if (re === '01') {
      //   row.quantity = 1
      //   return row.quantity
      // }
      if (re === '05' && this.personalForm.customerType === '2') { return true } else { return false }
    },
    // 数量变化其他参数
    queryStock(row) {
      if (row.discountRate === 0) {
        row.discountMoney = 0
      } else {
        row.discountMoney = (row.taxprice * row.quantity * (row.discountRate / 100)).toFixed(2)
      }
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
    // 从销售机会过来的源单数据
    opportunityDetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
            // this.$notify.error({
            //   title: '错误',
            //   message: '物品已添加',
            //   offset: 100
            // })
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
      // this.customerId = val.customerName
      // this.personalForm.customerPhone = val.customerPhone
      this.personalForm.sourceNumber = val.opportunityNumber
      this.personalForm.salePersonId = val.handlePersonId
      this.salePersonId = val.handlePersonName
      this.personalForm.handleRepositoryId = val.handleRepositoryId
      this.handleRepositoryId = val.handleRepositoryName
    },
    openoppo() {
      if (this.personalForm.sourceType === '2') {
        this.opportunitycontrol = true
      }
    },
    // 控制源单类型
    chooseSource(val) {
      if (val === '2') {
        this.Isproduct = true
        this.IsNumber = false
        this.$refs.editable.clear()
      } else if (val === '1') {
        this.Isproduct = false
        this.IsNumber = true
        this.$refs.editable.clear()
      }
    },
    // 从源单中添加商品
    handleAddSouce() {
      this.arrivalcontrol = true
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
      sums[6] = ''
      sums[8] = ''
      sums[9] = ''
      this.heji1 = sums[10]
      this.heji2 = sums[16]
      this.heji3 = sums[16]
      this.heji4 = sums[15]
      this.heji5 = sums[18]
      this.heji6 = sums[16] - sums[18]
      this.heji7 = sums[19]
      this.heji8 = sums[14]
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
      row.discountMoney = (row.taxprice * row.quantity * (row.discountRate / 100)).toFixed(2)
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
        row.discountMoney = 0
      } else {
        row.discountMoney = (row.taxprice * row.quantity * (row.discountRate / 100)).toFixed(2)
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
    getTypes() {
      searchCategory(3).then(res => {
        if (res.data.ret === 200) {
          this.transportIds = res.data.data.content.list
        }
      })
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.payModes = res.data.data.content.list
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
          this.settleModes = res.data.data.content.list
        }
      })
      // 结算方式数据
      searchCategory(2).then(res => {
        if (res.data.ret === 200) {
          this.deliveryModes = res.data.data.content.list
        }
      })
    },
    // 销售人员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 销售员回显
    stockName(val) {
      console.log('销售员回显', val)
      this.salePersonId = val.personName
      this.personalForm.salePersonId = val.id
      this.saleRepositoryName = val.repositoryName
      this.personalForm.saleRepositoryId = val.repositoryId
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        saleRepositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      }
      this.customerId = null
      this.salePersonId = null
    },
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
          // this.personalForm.repositoryId = this.$store.getters.repositoryId
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
            if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
              delete elem.productCode
            }
            if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
              delete elem.productName
            }
            if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
              delete elem.typeId
            }
            if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
              delete elem.unit
            }
            if (elem.color === null || elem.color === '' || elem.color === undefined) {
              delete elem.color
            }
            if (elem.performanceScore === null || elem.performanceScore === '' || elem.performanceScore === undefined) {
              delete elem.performanceScore
            }
            if (elem.productScore === null || elem.productScore === '' || elem.productScore === undefined) {
              delete elem.productScore
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
          updatesaleOrder(parms, parms2, null).then(res => {
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
