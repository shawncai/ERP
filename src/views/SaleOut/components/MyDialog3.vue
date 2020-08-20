<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.number + $t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
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
                <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px" disabled @change="chooseSourceType">
                  <el-option :label="$t('prompt.xsdd')" value="1"/>
                  <el-option :label="$t('prompt.xsht')" value="2"/>
                  <el-option :label="$t('prompt.ysd')" value="3"/>
                  <el-option :label="$t('prompt.xsjh')" value="4"/>
                  <el-option :label="$t('prompt.wly')" value="5"/>
                  <el-option :label="$t('prompt.eshsd')" value="6"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-if="personalForm.sourceType === '6'" :span="12" >
              <el-form-item :label="$t('SaleOut.ershouNumber')" style="width: 100%;">
                <el-input v-model="personalForm.sourceNumber" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.invoiceNumber')" prop="invoiceNumber" style="width: 100%;">
                <el-input v-model="personalForm.invoiceNumber" style="margin-left: 18px;width: 200px" clearable @blur="judgeinvoce"/>
              </el-form-item>
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
              <el-form-item :label="$t('SaleOut.customerName')" prop="customerId" style="width: 100%;">
                <el-input v-model="customerId" style="margin-left: 18px;width: 200px" @focus="chooseCustomer"/>
                <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
                <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.customerPhone')" prop="phoneNumber" style="width: 100%;">
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
                  <el-option :label="$t('prompt.xsck')" value="1"/>
                  <el-option :label="$t('prompt.hhck')" value="2"/>
                  <el-option :label="$t('prompt.yjhx')" value="3"/>
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
              <el-form-item :label="$t('SaleOut.saleType')" prop="saleType" style="width: 100%;">
                <el-select v-model="personalForm.saleType" style="margin-left: 18px;width: 200px" @change="switchsaletype">
                  <el-option :label="$t('prompt.xj')" value="1" />
                  <el-option :label="$t('prompt.fq')" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.sendDate')" prop="sendDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.sendDate"
                  :picker-options="pickerOptions2"
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
              <el-form-item :label="$t('SaleOut.saleRepositoryId')" prop="saleRepositoryId" style="width: 100%;">
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
              <el-form-item :label="$t('SaleOut.outDate')" prop="outDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.outDate"
                  :picker-options="pickerOptions2"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.pointSupport')+`(${point || 0})`" prop="pointSupport" style="width: 100%;">
                <el-input v-model="personalForm.pointSupport" :disabled="personalForm.customerType === '1'" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('collectAndPay.couponSupportOld')" style="width: 100%;">
                <el-input-number v-model="personalForm.couponSupportOld" :controls="false" :step="0.1" :min="0" style="margin-left: 18px;width: 200px" @blur="getReceivableMoney"/>
              </el-form-item>
            </el-col>
            <el-col :span="12" >
              <el-form-item :label="$t('SaleOut.couponRemark')" :rules="(personalForm.couponSupportOld === 0 || personalForm.couponSupportOld === '') ? personalrules.couponRemark:[{ required: true, message: 'please select couponRemark', trigger: 'change' }]" prop="couponRemark" style="width: 100%;">
                <el-select ref="clear3" v-model="personalForm.couponRemark" style="margin-left: 18px;width: 200px">
                  <el-option :value="1" label="tax rebate amount"/>
                  <el-option :value="2" label="employee discount amount"/>
                  <el-option :value="3" label="old cash voucher amount"/>
                  <el-option :value="4" label="special discount amount"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.ridMoney')" style="width: 100%;">
                <el-input v-model="personalForm.ridMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
              <!-- <span style="color: red;font-size: 14px">预售款金额：{{ yushou }}</span> -->
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.ridBikeMoney')" style="width: 100%;">
                <el-input v-model="personalForm.ridBikeMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
              <!-- <span style="color: red;font-size: 14px">回收车金额：{{ huishou }}</span> -->
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item :label="$t('SaleOut.receivableMoney')" style="width: 100%;">
                {{ personalForm.receivableMoney }}
              </el-form-item>
            </el-col> -->
            <el-col v-for="(item, index) in personalForm2.couponSupports" :key="index" :span="12">
              <el-form-item :label="$t('SaleOut.couponSupport') + (index + 1)" style="width: 100%;">
                <el-input v-model="item.couponSupport" style="margin-left: 18px;width: 130px" @blur="changeCoupon"/>
                <el-button v-show="index === personalForm2.couponSupports.length -1" icon="el-icon-plus" type="success" @click="addDomain" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.isInvoice')" style="width: 100%;">
                <el-radio-group v-model="personalForm.isInvoice" style="margin-left: 18px;width: 200px">
                  <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                  <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('otherlanguage.yskdk')" style="width: 100%;">
                <el-input v-model="personalForm.advanceMoney" disabled style="margin-left: 18px;width: 200px"/>
              </el-form-item>
              <!-- <span style="color: red;font-size: 14px">回收车金额：{{ huishou }}</span> -->
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item :label="$t('collectAndPay.isfree')" style="width: 100%;">
                <el-radio-group v-model="personalForm.isFree" style="margin-left: 18px;width: 200px" disabled>
                  <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                  <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item :label="$t('update4.shouldMoney')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                <span style="margin-left: 20px;">
                  {{ personalForm.shouldMoney }}
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('update4.customerPay')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                <el-input-number v-model="personalForm.customerPay" :controls="false" :step="0.1" :min="0" style="width: 200px" @change="updatePrice()"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('update4.changeMoney')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                <span style="margin-left: 20px;">
                  {{ personalForm.changeMoney }}
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('update4.receivableMoney')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                <span style="margin-left: 20px;">
                  {{ personalForm.receivableMoney }}
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('update4.unpayMoney')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                <span style="margin-left: 20px;">
                  {{ personalForm.unpayMoney }}
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('update4.isAppService')" style="width: 100%;">
                <span>{{ personalForm.isAppService | isFreeTypeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('update4.appDiscount')" style="width: 100%;">
                <span>{{ personalForm.appDiscount }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('collectAndPay.isfree')" style="width: 100%;">
                <span>{{ personalForm.isFree | isFreeTypeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('tongyo.useType')" style="width: 100%;">
                <span>{{ personalForm.useType | useTypeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('tongyo.useMonth')" style="width: 100%;">
                <span>{{ personalForm.useMonth }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" >{{ $t('updates.ckdmx') }}</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button :disabled="true" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
        <my-detail :control.sync="control" :personalform="personalForm" @product="productdetail"/>
        <el-button :disabled="IsSourceNumber" style="width: 130px" @click="handleAddSource">{{ $t('updates.cydzxz') }}</el-button>
        <my-order :ordercontrol.sync="ordercontrol" @saleOrderDetail="saleOrderDetail" @saleOrder="saleOrder"/>
        <my-presale :presalecontrol.sync="presalecontrol" @advanceOrderDetail="advanceOrderDetail" @advanceData="advanceData"/>
        <my-opportunity :opportunitycontrol.sync="opportunitycontrol" @opportunityDetail="opportunityDetail" @opportunity="opportunity"/>
        <my-contract :contractcontrol.sync="contractcontrol" @salecontractDetail="salecontractDetail" @salecontract="salecontract"/>
        <el-button :disabled="true" type="danger" @click="$refs.editable.removeSelecteds();test()">{{ $t('Hmodule.delete') }}</el-button>
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
          size="small"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-editable-column type="selection" min-width="55" align="center" fixed="left"/>
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index" fixed="left"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150" fixed="left"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150" fixed="left"/>
          <el-editable-column :label="$t('Hmodule.hw')" prop="location" align="center" min-width="150">
            <template slot-scope="scope">
              <p>{{ getLocationData(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-select v-if="scope.row.batch !== '不使用'" v-model="scope.row.batch" :value="scope.row.batch" :placeholder="$t('Hmodule.xcpc')" filterable style="width: 100%;" @visible-change="updatebatch2($event,scope)">
                <el-option
                  v-for="(item, index) in batchlist"
                  :key="index"
                  :value="item"
                  :label="item"/>
              </el-select>
              <span v-else>{{ scope.row.batch }}</span>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.wpfl')" prop="categoryName" align="center" min-width="150"/>
          <el-editable-column :label="$t('updates.jbdw')" prop="unit" align="center" min-width="150"/>
          <el-editable-column :label="$t('updates.ggxh')" prop="typeName" align="center" min-width="150"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150"/>
          <el-editable-column :label="$t('updates.jxf')" prop="kpiGrade" align="center" min-width="150"/>
          <el-editable-column ref="haspoint" :label="$t('updates.spjf')" prop="point" align="center" min-width="150"/>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.cksli')" prop="quantity" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-input-number
                v-if="isEdit5(scope.row)"
                :precision="6"
                :controls="false"
                :min="1.00"
                v-model="scope.row.quantity"
                @change="queryStock(scope.row)"
              />
              <!-- <el-input v-if="isEdit2(scope.row)" v-model="personalForm.carCode" clearable/> -->
              <span v-else>{{ scope.row.quantity }}</span>
            </template>
          </el-editable-column>
          <el-editable-column v-if="false" :label="$t('updates.lsj')" prop="salePrice" align="center" min-width="150"/>
          <el-editable-column v-if="false" :label="$t('updates.cbj')" prop="costPrice" align="center" min-width="150"/>
          <el-editable-column v-if="jundgeprice()" :label="$t('updates.ckj')" prop="taxprice" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ gettaxprice(scope.row) }}</span>
            </template>
          </el-editable-column>
          <el-editable-column v-if="false" prop="costMoney" align="center" label="成本金额" min-width="150">
            <template slot-scope="scope">
              <p>{{ getcostMoney(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column v-if="false" :label="$t('updates.hsje')" prop="includeTaxMoney" align="center" min-width="150">
            <template slot-scope="scope">
              <p>{{ getincludeTaxMoney(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.sl')" prop="taxRate" align="center" min-width="170">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="6"
                :controls="false"
                v-model="scope.row.taxRate"
                @input="gettaxRate(scope.row)"/>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.se')" prop="taxMoney" align="center" min-width="170">
            <template slot-scope="scope">
              <p>{{ getTaxMoney2(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column v-if="false" :label="$t('Hmodule.je')" prop="money" align="center" min-width="150">
            <template slot-scope="scope">
              <p>{{ getMoney(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column v-if="jundgeprice()" :label="$t('updates.ckje')" prop="includeTaxCostMoney" align="center" min-width="170">
            <template slot-scope="scope">
              <p>{{ getincludeTaxCostMoney(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.ckl')" prop="discountRate" align="center" min-width="170">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="6"
                :controls="false"
                v-model="scope.row.discountRate"
                disabled
                @change="getdiscountRate(scope.row)"/>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.cke')" prop="discountMoney" align="center" min-width="170">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="6"
                :controls="false"
                v-model="scope.row.discountMoney"
                @change="getdiscountMoney(scope.row, $event, scope)"
                @input="notundefined(scope.row)"/>
            </template>
          </el-editable-column>
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
              <el-input v-if="isEdit4(scope.row)" v-model="scope.row.batteryCode" clearable @blur="getInfo2(scope.row)"/>
              <span v-else>{{ scope.row.batteryCode }}</span>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.ydbh')" prop="sourceNumber" align="center" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <!--  退货入库 -->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">{{ $t('tongyo.zbthd') }}</h2>
      <div class="buttons" style="margin-top: 58px">
        <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddreturnproduct">{{ $t('Hmodule.tjsp') }}</el-button>
        <el-button type="danger" @click="$refs.editable3.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
      </div>
      <my-return :control.sync="control2" @product="productdetail2"/>
      <div class="container">
        <el-editable
          ref="editable3"
          :data.sync="returnlist"
          :edit-config="{ showIcon: true, showStatus: true}"
          class="click-table1"
          stripe
          border
          size="small"
          style="width: 100%">
          <el-editable-column type="selection" width="55" align="center"/>
          <el-editable-column label="编号" width="55" align="center" type="index"/>
          <el-editable-column :edit-render="{type: 'default'}" :label="$t('Hmodule.hw')" prop="locationId" align="center" width="200px">
            <template slot-scope="scope">
              <el-select v-model="scope.row.locationId" :value="scope.row.locationId" :placeholder="$t('Hmodule.xzhw')" filterable style="width: 100%;" @visible-change="updatebatchreturnpro($event,scope)">
                <el-option
                  v-for="(item, index) in locationlist"
                  :key="index"
                  :value="item.id"
                  :label="item.locationCode"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="200px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.wpfl')" prop="productCategoryName" align="center" min-width="150"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productTypeName" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
          <!-- <el-editable-column prop="basicQuantity" align="center" :label="$t('updates.jbel')" width="150px"/> -->
          <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible'}" :label="$t('updates.rksl')" prop="quantity" align="center" width="150px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                v-if="isEdit5(scope.row)"
                :controls="false"
                :min="1.00"
                v-model="scope.row.quantity"
                @change="returnquanty(scope.row)"
              />
              <!-- <el-input v-if="isEdit2(scope.row)" v-model="personalForm.carCode" clearable/> -->
              <span v-else>{{ scope.row.quantity }}</span>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.dcbm')" prop="batteryCode" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-input v-if="isEdit6(scope.row)" v-model="scope.row.batteryCode" clearable/>
              <span v-else>{{ scope.row.batteryCode }}</span>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.bz')" prop="remarks" align="center" width="150px"/>
        </el-editable>
      </div>
    </el-card>

    <!--  维修项目 -->
    <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">
      <div ref="fuzhu" class="form-name">{{ $t('update4.wxxm') }}</div>
      <div class="buttons" style="margin-top: 58px">
        <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="additem">{{ $t('update4.tjxm') }}</el-button>
        <el-button type="danger" @click="$refs.editable3.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        <my-item :control.sync="control3" @product2="productdetail3"/>
      </div>

      <div class="container">
        <el-editable
          ref="editable3"
          :data.sync="itemlist"
          :edit-config="{ showIcon: true, showStatus: true}"
          class="click-table1"
          stripe
          border
          size="small"
          style="width: 100%">
          <el-editable-column type="selection" width="55" align="center"/>
          <el-editable-column width="55" align="center" type="index"/>
          <el-editable-column :label="$t('update4.wxcx')" prop="productType" align="center"/>
          <el-editable-column :label="$t('update4.xmmc')" prop="name" align="center" min-width="200"/>
          <el-editable-column :label="$t('update4.bdkhjg')" prop="price" align="center"/>
          <el-editable-column :label="$t('update4.fbdkhjg')" prop="otherPrice" align="center"/>
          <el-editable-column :label="$t('update4.ms')" prop="description" align="center"/>
        </el-editable>
      </div>
    </el-card>

    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji1')" style="width: 100%;">
                <el-input v-model="heji1" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji2')" style="width: 100%;">
                <el-input v-model="personalForm.allMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji3')" style="width: 100%;">
                <el-input v-model="heji3" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji4')" style="width: 100%;">
                <el-input v-model="heji4" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji5')" style="width: 100%;">
                <el-input v-model="personalForm.allDiscountMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji6')" style="width: 100%;">
                <el-input v-model="personalForm.allIncludeTaxDiscountMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji7')" style="width: 100%;">
                <el-input v-model="personalForm.allIncludeTaxCostMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji8')" style="width: 100%;">
                <el-input v-model="personalForm.allCostMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji9')" style="width: 100%;">
                <el-input v-model="heji9" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji10')" style="width: 100%;">
                <el-input v-model="heji10" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji11')" style="width: 100%;">
                <el-input v-model="personalForm.otherMoney" style="margin-left: 18px;width: 200px" @blur="getReceivableMoney"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button :loading="saveloding" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        <el-button :loading="saveloding" type="primary" @click="handleEditok()">{{ $t('Hmodule.baoc') }}</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { batteryList2, searchDiffPrice } from '@/api/DiffPrice'
import { searchRoleDiscount } from '@/api/BasicSettings'
import { customerlist2 } from '@/api/Customer'
import { returnMoney } from '@/api/Coupon'
import { getPackage } from '@/api/Package'
import { getAllBatch, vehicleInfo } from '@/api/public'
import { updatesaleOut, checkInvoiceExist } from '@/api/SaleOut'
import { searchCategory } from '@/api/Supplier'
import { searchSaleCategory } from '@/api/SaleCategory'
import { getlocation, locationlist, countlist, batchlist } from '@/api/public'
import MyEmp from './MyEmp2'
import MyDelivery from './MyDelivery2'
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
import MyPackage from './MyPackage'
import MyContract from './MyContract'
import MyReturn from './BatteryReturn'
import MyDetail from './BatteryOut'
import MyItem from './MyItem'

// eslint-disable-next-line no-unused-vars
var _that
export default {
  name: 'MyDialog',
  filters: {
    isFreeTypeFilter(sta) {
      const statusMap = {
        1: 'yes',
        2: 'no'
      }
      return statusMap[sta]
    },
    useTypeFilter(sta) {
      const statusMap = {
        1: _that.$t('tongyo.jy'),
        2: _that.$t('tongyo.yy')
      }
      return statusMap[sta]
    }
  },
  components: { MyItem, MyReturn, MyContract, MyPackage, MyDetail2, MyOpportunity, MyPresale, MyAdvance, MyOrder, MyRepository, MyAccept, MyAgent, MyCustomer, MyRequire, MySupplier, MyApply, MyDetail, MyDelivery, MyEmp },
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
    const validatePass2 = (rule, value, callback) => {
      console.log(this.saleRepositoryId)
      if (this.saleRepositoryId === undefined || this.saleRepositoryId === null || this.saleRepositoryId === '') {
        callback(new Error('请选择出库仓库'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(1789, this.personalForm.pointSupport)
      if (Number(this.personalForm.pointSupport) < 0 || Number(this.personalForm.pointSupport) > this.point) {
        callback(new Error('请输入正确积分'))
      } else {
        callback()
      }
    }
    const validatePass4 = (rule, value, callback) => {
      console.log(89, this.customerId)
      if (this.customerId === undefined || this.customerId === null || this.customerId === '') {
        callback(new Error('请输入顾客姓名'))
      } else {
        callback()
      }
    }
    const validatePass5 = (rule, value, callback) => {
      console.log(89, this.customerId)
      if (this.transferPersonId === undefined || this.transferPersonId === null || this.transferPersonId === '') {
        callback(new Error('请选择出库人'))
      } else {
        callback()
      }
    }
    const validatePass6 = (rule, value, callback) => {
      console.log(89, this.customerId)
      if (this.personalForm.outDate === undefined || this.personalForm.outDate === null || this.personalForm.outDate === '') {
        callback(new Error('请选择出库时间'))
      } else {
        callback()
      }
    }
    const validatePass7 = (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        callback(new Error('入库数量不能为空'))
      } else if (value < 0) {
        callback(new Error('入库数量需大于0'))
      } else {
        callback()
      }
    }
    return {
      personalForm2: {
        couponSupports: [
          {
            couponSupport: 0
          }
        ]
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      pickerOptions2: {
        disabledDate: (time) => {
          const _now = Date.now()
          const seven = 30 * 24 * 60 * 60 * 1000
          const sevenDays = _now - seven
          return time.getTime() > _now || time.getTime() < sevenDays
        }
      },
      saveloding: false,
      projectmoney: 0,
      isbendi: null,
      itemlist: [],
      control3: false,
      diffpricelist: [],
      showreturn: false,
      control2: false,
      // 退货入库数据
      returnlist: [],

      moreaction: '',
      // 赠品选择控制
      packagecontrol: false,
      productnumber: '',
      // 积分信息
      point: 0,
      // 修改信息
      isEdit: false,
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
      // 批次列表
      batchlist: [],
      // 控制商品列表窗口
      control: false,
      // 销售订单规则数据
      personalrules: {
        saleType: [
          { required: true, message: '请选择销售类别', trigger: 'change' }
        ],
        customerType: [
          { required: true, message: '请选择客户类别', trigger: 'change' }
        ],
        sendDate: [
          { required: true, message: '请选择送货日期', trigger: 'change' }
        ],
        salePersonId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        backType: [
          { required: true, message: '请选择回款状态', trigger: 'change' }
        ],
        pointSupport: [
          { validator: validatePass3, trigger: 'change' }
        ],
        saleRepositoryId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        customerId: [
          { required: true, validator: validatePass4, trigger: 'change' }
        ],
        transferPersonId: [
          { required: true, validator: validatePass5, trigger: 'change' }
        ],
        outDate: [
          { required: true, validator: validatePass6, trigger: 'change' }
        ]
      },
      // 订单明细数据
      list2: [],
      // 销售费用明细
      list3: [],
      // 明细列表规则
      validRules: {
        quantity: [
          { required: true, validator: validatePass7, trigger: 'blur' }
        ]
      },
      ableSubmission: true,
      getemplist: {
        pagenum: 1,
        pagesize: 999999
      }
    }
  },
  computed: {
    myshouldMoney() {
      return this.personalForm.shouldMoney
    }
  },
  watch: {
    myshouldMoney: {
      handler(oldval, newval) {
        this.updatePrice()
      }
    },
    editcontrol() {
      this.editVisible = this.editcontrol
      // this.chooseSourceType()
    },
    editdata() {
      this.personalForm = this.editdata
      this.isbendi = 1
      if (this.personalForm.saleOutRetreatVos.length === 0) {
        this.showreturn = false
      } else {
        this.showreturn = true
      }
      if (this.personalForm.sourceType === '5' || this.personalForm.sourceType === undefined) {
        this.Isproduct = false
        this.IsSourceNumber = true
        this.personalForm.saleType = '1'
        // if (this.$refs.editable.getRecords().length !== 0 && this.$refs.editable.getRecords() !== undefined && this.$refs.editable.getRecords() !== null) {
        //   this.$refs.editable.clear()
        // }
      } else if (this.personalForm.sourceType === '6') {
        this.IsSourceNumber = true
        this.Isproduct = true
        this.personalForm.saleType = '1'
      } else if (this.personalForm.sourceType === '2') {
        this.Isproduct = true
        this.IsSourceNumber = false
        this.personalForm.saleType = '2'
      } else {
        this.Isproduct = true
        this.IsSourceNumber = false
        this.personalForm.saleType = '1'
        // if (this.$refs.editable.getRecords().length !== 0 && this.$refs.editable.getRecords() !== undefined && this.$refs.editable.getRecords() !== null) {
        //   this.$refs.editable.clear()
        // }
      }
      this.personalForm.couponMoney = this.personalForm.couponSupport
      console.log('this.personalForm.receivableMoney', this.personalForm.receivableMoney)
      if (this.personalForm.couponNumbers === '' || this.personalForm.couponNumbers === null || this.personalForm.couponNumbers === undefined) {
        this.personalForm2.couponSupports = [
          {
            couponSupport: 0
          }
        ]
      } else {
        this.personalForm2.couponSupports = [
          {
            couponSupport: 0
          }
        ]
        const coupon = []
        var b = this.personalForm.couponNumbers.split(',')
        console.log('b', b)
        for (let i = 0; i < b.length; i++) {
          const param = {}
          param.couponSupport = b[i]
          coupon.push(param)
        }
        console.log('coupon', coupon)
        this.personalForm2.couponSupports = coupon
        console.log('this.personalForm.couponSupports2', this.personalForm2.couponSupports)
      }
      if (this.personalForm.sourceType === '5') {
        this.Isproduct = false
        this.IsSourceNumber = true
      } else {
        this.Isproduct = true
        this.IsSourceNumber = false
      }
      this.planPersonId = this.personalForm.planPersonName
      this.stockPersonId = this.personalForm.stockPersonName
      this.list2 = this.personalForm.saleOutDetailVos
      for (const i in this.list2) {
        this.list2[i].location = this.list2[i].locationName
        this.list2[i].locationName = this.list2[i].locationName
        this.list2[i].categoryName = this.list2[i].productCategoryName
        this.list2[i].typeName = this.list2[i].productTypeName
        if (this.list2[i].taxRate < 1) {
          this.list2[i].taxRate = (this.list2[i].taxRate) * 100
        }
      }
      for (const i in this.list2) {
        // if (this.list2[i].discountRate === 0 || this.list2[i].discountRate === 1) {
        //   this.list2[i].discountRate = 100
        //   console.log(this.list2[i].discountRate)
        // }
        if (this.list2[i].discountRate <= 1) {
          this.list2[i].discountRate = (this.list2[i].discountRate) * 100
        }
      }
      this.list3 = this.personalForm.saleOutGiftVos
      this.returnlist = this.personalForm.saleOutRetreatVos
      // for (const i in this.list2) {
      //   this.list3[i].location = this.list3[i].locationName
      // }
      this.customerId = this.personalForm.customerName
      this.salePersonId = this.personalForm.salePersonName
      this.transferPersonId = this.personalForm.transferPersonName
      this.saleRepositoryId = this.personalForm.saleRepositoryName
      this.outPersonId = this.personalForm.outPersonName
      this.customerPhone = this.personalForm.customerPhone
      this.updatebatch()
      this.getlocations()
      this.getdiffprice()
    },
    // 监听明细表计算合计
    list2: {
      handler(oldval, newval) {
        let num = 0
        let num1 = 0
        let num2 = 0
        for (const i in this.list2) {
          // console.log(typeof (this.list2[i].taxprice))
          num += Number(this.list2[i].quantity)
          num2 += Number(this.list2[i].discountMoney)
          num1 += Number(this.list2[i].includeTaxCostMoney)
        }
        this.heji1 = num
        this.heji3 = num1
        this.heji4 = num2
        this.getReceivableMoney()
        // console.log(num)
      },
      deep: true
    },
    list3: {
      handler(oldval, newval) {
        let num = 0
        let num1 = 0
        for (const i in this.list3) {
          // console.log(typeof (this.list3[i].taxprice))
          num += this.list3[i].quantity
          num1 += this.list3[i].salePrice * num
        }
        this.heji9 = num
        this.heji10 = num1
        // console.log(num)
      },
      deep: true
    },
    itemlist: {
      handler(oldval, newval) {
        console.log('oldval', oldval)
        let num = 0
        if (this.isbendi === 1) {
          for (const i in this.itemlist) {
            num += this.itemlist[i].price
          }
        } else if (this.isbendi === 2) {
          for (const i in this.itemlist) {
            num += this.itemlist[i].otherPrice
          }
        }
        this.projectmoney = num
        this.getReceivableMoney()
      },
      deep: true
    }

  },
  created() {
    this.getTypes()
    this.getdatatime()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    uniqueArray3(array, key) {
      var result = [array[0]]
      for (var i = 1; i < array.length; i++) {
        var item = array[i]
        var repeat = false
        for (var j = 0; j < result.length; j++) {
          if (item[key] === result[j][key]) {
            repeat = true
            break
          }
        }
        if (!repeat) {
          result.push(item)
        }
      }
      return result
    },
    additem() {
      if (!this.customerId) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('update4.qxxzkh'),
          offset: 100
        })
        return false
      }
      this.control3 = true
      console.log(123, this.control3)
    },
    productdetail3(val) {
      if (!this.customerId) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('update4.qxxzkh'),
          offset: 100
        })
        return false
      }
      const nowlistdata = this.$refs.editable3.getRecords()
      this.$refs.editable3.clear()
      console.log('val============', val)
      const alldata = [...nowlistdata, ...val]
      const filterdata = this.uniqueArray3(alldata, 'id')
      console.log('filterdata=====', filterdata)
      // this.list2 = filterdata
      for (let i = 0; i < filterdata.length; i++) {
        // val[i].quantity = 1
        this.$refs.editable3.insert(filterdata[i])
      }
    },
    judgeinvoce() {
      console.log('this.personalForm.invoiceNumber', this.personalForm.invoiceNumber)
      checkInvoiceExist(this.personalForm.invoiceNumber, this.personalForm.saleRepositoryId).then(res => {
        if (res.data.ret === 200) {
          if (res.data.data.content === true) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('update4.fphcf'),
              offset: 100
            })
            this.personalForm.invoiceNumber = null
          }
        }
      })
    },
    updatePrice() {
      console.log('999', 999)
      if (this.personalForm.shouldMoney !== null && this.personalForm.shouldMoney !== '' && this.personalForm.shouldMoney !== undefined) {
        if (this.personalForm.customerPay !== null && this.personalForm.customerPay !== '' && this.personalForm.customerPay !== undefined) {
          // 客户给的钱多
          if (this.personalForm.customerPay > this.personalForm.shouldMoney) {
            this.personalForm.changeMoney = Number(this.personalForm.customerPay - this.personalForm.shouldMoney).toFixed(2)
            this.personalForm.receivableMoney = this.personalForm.shouldMoney
            this.personalForm.unpayMoney = Number(this.personalForm.shouldMoney - this.personalForm.receivableMoney).toFixed(2)
          } else {
            this.personalForm.changeMoney = 0
            this.personalForm.receivableMoney = this.personalForm.customerPay
            this.personalForm.unpayMoney = Number(this.personalForm.shouldMoney - this.personalForm.receivableMoney).toFixed(2)
          }
        }
      }
    },
    jundgeprice() {
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
    getdiffprice() {
      searchDiffPrice(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.diffpricelist = res.data.data.content.list
          console.log('this.diffpricelist', this.diffpricelist)
        }
      })
    },
    getlocations() {
      // 货位根据仓库id展现
      locationlist(this.personalForm.saleRepositoryId).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list
        }
      })
    },
    sum(arr) {
      if (arr.length === 0) {
        return 0
      } else {
        // eslint-disable-next-line no-eval
        return eval(arr.join('+'))
      }
    },
    returnquanty(row) {

    },
    updatebatchreturnpro(event, scope) {
      if (event === true) {
        console.log(this.personalForm.saleRepositoryId)
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
    productdetail2(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable3.getRecords()
      this.$refs.editable3.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable3.insert(val[i])
      }
    },
    handleAddreturnproduct() {
      console.log('this.personalForm.saleRepositoryId', this.personalForm.saleRepositoryId)
      const outproduct = this.$refs.editable.getRecords()
      if (this.saleRepositoryId === null || this.saleRepositoryId === '' || this.saleRepositoryId === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.qxxzck'),
          offset: 100
        })
        return false
      } else if (outproduct.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('tongyo.qxxzcknr'),
          offset: 100
        })
        return false
      } else {
        this.control2 = true
      }
    },

    switchsaletype(val) {
      console.log('val', val)
      if (val === '1' && this.personalForm.sourceType === '2') {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.gdjwfq'),
          offset: 100
        })
        this.personalForm.saleType = '2'
      } else {
        this.$notify.error({
          title: 'wrong',
          message: '该单据为现金',
          offset: 100
        })
        this.personalForm.saleType = '1'
      }
    },
    changeCoupon() {
      console.log('this.personalForm.couponSupports2', this.personalForm2.couponSupports)
      const parms2 = JSON.stringify(this.personalForm2.couponSupports)
      returnMoney(parms2).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.personalForm.couponMoney = res.data.data.content
          console.log('res.data.data.content', res.data.data.content)
          this.getReceivableMoney(res.data.data.content)
        } else {
          this.$notify.error({
            title: 'wrong',
            message: res.data.msg,
            offset: 100
          })
        }
      })
    },
    addDomain() {
      console.log('this.personalForm2.couponSupports', this.personalForm2.couponSupports)
      this.personalForm2.couponSupports.push({
        couponSupport: 0
      })
      console.log('this.personalForm.couponSupports', this.personalForm2.couponSupports)
    },
    getReceivableMoney() {
      console.log('666', 666)
      console.log('this.personfomr', this.personalForm)
      if (!this.personalForm.pointSupport) {
        this.personalForm.pointSupport = 0
      }
      if (!this.personalForm.couponSupport) {
        this.personalForm.couponSupport = 0
      }
      if (!this.personalForm.ridMoney) {
        this.personalForm.ridMoney = 0
      }
      if (!this.personalForm.ridBikeMoney) {
        this.personalForm.ridBikeMoney = 0
      }
      if (!this.personalForm.advanceMoney) {
        this.personalForm.advanceMoney = 0
      }
      if (!this.personalForm.otherMoney) {
        this.personalForm.otherMoney = 0
      }
      if (!this.projectmoney) {
        this.projectmoney = 0
      }
      console.log('this.personalForm.sourceTypethis.personalForm.sourceType', this.personalForm.sourceType)
      if (this.personalForm.couponSupportOld === null || this.personalForm.couponSupportOld === '' || this.personalForm.couponSupportOld === undefined) {
        this.personalForm.couponSupportOld = 0
      }

      if ((this.personalForm.sourceType === '1' || this.personalForm.sourceType === '3' || this.personalForm.sourceType === '5' || this.personalForm.sourceType === '4' || this.personalForm.sourceType === '6') && this.personalForm.useMonth === null) {
        console.log('this.heji3', this.heji3)
        console.log('this.heji4', this.heji4)
        console.log('this.personalForm.couponMoney', this.personalForm.couponMoney)
        let needmoney = (this.heji3 - this.heji4 - Number(this.personalForm.pointSupport) - Number(this.personalForm.ridMoney) - Number(this.personalForm.ridBikeMoney) - Number(this.personalForm.advanceMoney) - Number(this.personalForm.couponSupportOld) - Number(this.personalForm.couponMoney)) + Number(this.personalForm.otherMoney)
        const needmoney2 = (this.heji3 - this.heji4 - Number(this.personalForm.pointSupport) - Number(this.personalForm.ridMoney) - Number(this.personalForm.ridBikeMoney) - Number(this.personalForm.advanceMoney) - Number(this.personalForm.couponSupportOld)) + Number(this.personalForm.otherMoney)
        if (needmoney < 0) {
          needmoney = 0
        }
        this.$set(this.personalForm, 'shouldMoney', needmoney)
        // 未减去优惠券额的金额
        this.$set(this.personalForm, 'receivableMoney2', needmoney2)
      } else if (this.personalForm.useMonth !== null) {
        const allbattery = this.$refs.editable.getRecords()
        console.log('allbattery', allbattery)
        console.log('this.diffpricelist', this.diffpricelist)
        const filtertypes = this.diffpricelist.filter(item => {
          return item.useType === Number(this.personalForm.useType)
        })
        console.log('filtertypes', filtertypes)
        const filtermonth = filtertypes.filter(item => {
          return item.useMonth === Number(this.personalForm.useMonth)
        })
        console.log('filtermonth', filtermonth)
        const filterfinally = filtermonth.filter(item => {
          return item.categoryId === allbattery[0].category
        })
        console.log('filterfinally', filterfinally)
        // this.diffpricelist
        if (filterfinally.length !== 0) {
          let needmoney = (Number(filterfinally[0].diffMoney) * Number(allbattery[0].quantity) - Number(this.personalForm.pointSupport) - Number(this.personalForm.ridMoney) - Number(this.personalForm.ridBikeMoney) - Number(this.personalForm.advanceMoney) - Number(this.personalForm.couponSupportOld) - Number(this.personalForm.couponMoney)) + Number(this.personalForm.otherMoney) + Number(this.projectmoney)
          const needmoney2 = (Number(filterfinally[0].diffMoney) * Number(allbattery[0].quantity) - Number(this.personalForm.pointSupport) - Number(this.personalForm.ridMoney) - Number(this.personalForm.ridBikeMoney) - Number(this.personalForm.advanceMoney) - Number(this.personalForm.couponSupportOld)) + Number(this.personalForm.otherMoney) + Number(this.projectmoney)
          if (needmoney < 0) {
            needmoney = 0
          }
          this.$set(this.personalForm, 'shouldMoney', needmoney)
          // 未减去优惠券额的金额
          this.$set(this.personalForm, 'receivableMoney2', needmoney2)
        } else {
          this.$set(this.personalForm, 'shouldMoney', 0)
          // 未减去优惠券额的金额
          this.$set(this.personalForm, 'receivableMoney2', 0)
        }
      } else if (this.$store.getters.newsaleoutdata.firstMoney) {
        console.log('123', 123)
        let needmoney = (this.$store.getters.newsaleoutdata.firstMoney - Number(this.personalForm.couponSupportOld) - Number(this.personalForm.couponMoney)) + Number(this.personalForm.otherMoney) + Number(this.projectmoney)
        const needmoney2 = (this.$store.getters.newsaleoutdata.firstMoney - Number(this.personalForm.couponSupportOld)) + Number(this.personalForm.otherMoney) + Number(this.projectmoney)
        if (needmoney < 0) {
          needmoney = 0
        }
        this.$set(this.personalForm, 'shouldMoney', needmoney)
        // 未减去优惠券额的金额
        this.$set(this.personalForm, 'receivableMoney2', needmoney2)
      } else if (this.receivableMoney !== '' || this.receivableMoney !== null || this.receivableMoney !== undefined) {
        console.log('是否是销售合同带入过来')
        console.log('234', 234)
        let needmoney = (this.receivableMoney - Number(this.personalForm.couponSupportOld) - Number(this.personalForm.couponMoney)) + Number(this.personalForm.otherMoney) + Number(this.projectmoney)
        const needmoney2 = (this.receivableMoney - Number(this.personalForm.couponSupportOld)) + Number(this.personalForm.otherMoney) + Number(this.projectmoney)
        if (needmoney < 0) {
          needmoney = 0
        }
        this.$set(this.personalForm, 'shouldMoney', needmoney)
        // 未减去优惠券额的金额
        this.$set(this.personalForm, 'receivableMoney2', needmoney2)
      } else {
        console.log('456', 456)
        let needmoney = (this.heji3 - this.heji4 - Number(this.personalForm.pointSupport) - Number(this.personalForm.ridMoney) - Number(this.personalForm.ridBikeMoney) - Number(this.personalForm.advanceMoney) - Number(this.personalForm.couponSupportOld) - Number(this.personalForm.couponMoney)) + Number(this.personalForm.otherMoney) + Number(this.projectmoney)
        const needmoney2 = (this.heji3 - this.heji4 - Number(this.personalForm.pointSupport) - Number(this.personalForm.ridMoney) - Number(this.personalForm.ridBikeMoney) - Number(this.personalForm.advanceMoney) - Number(this.personalForm.couponSupportOld)) + Number(this.personalForm.otherMoney) + Number(this.projectmoney)
        if (needmoney < 0) {
          needmoney = 0
        }
        this.$set(this.personalForm, 'shouldMoney', needmoney)
        // 未减去优惠券额的金额
        this.$set(this.personalForm, 'receivableMoney2', needmoney2)
      }

      // if (this.personalForm.pointSupport && this.personalForm.couponSupport && this.personalForm.ridMoney && this.personalForm.ridBikeMoney && this.personalForm.advanceMoney) {
      //   console.log(198283774747)
      //   return (this.heji3 - this.heji4 - Number(this.personalForm.pointSupport) - Number(this.personalForm.couponSupport) - Number(this.personalForm.ridMoney) - Number(this.personalForm.ridBikeMoney) - Number(this.personalForm.advanceMoney))
      // }

      // if (this.personalForm.advanceMoney) {
      //   return (this.heji3 - this.heji4 - Number(this.personalForm.pointSupport) - Number(this.personalForm.couponSupport) - Number(this.personalForm.advanceMoney))
      // }

      // if (this.receivableMoney !== null && this.receivableMoney !== '' && this.receivableMoney !== undefined) {
      //   console.log(12333333333)
      //   this.personalForm.receivableMoney = this.receivableMoney
      //   return (this.receivableMoney - Number(this.personalForm.couponSupport))
      // } else if (this.personalForm.ridMoney !== null && this.personalForm.ridMoney !== '' && this.personalForm.ridMoney !== undefined) {
      //   console.log('this.heji3 - this.heji4 - this.personalForm.ridMoney', this.heji3 - this.heji4 - this.personalForm.ridMoney)
      //   this.personalForm.receivableMoney = this.heji3 - this.heji4 - this.personalForm.ridMoney - this.personalForm.advanceMoney
      //   return (this.heji3 - this.heji4 - this.personalForm.ridMoney - Number(this.personalForm.couponSupport) - this.personalForm.advanceMoney)
      // } else if (this.personalForm.ridBikeMoney !== null && this.personalForm.ridBikeMoney !== '' && this.personalForm.ridBikeMoney !== undefined) {
      //   console.log('this.heji3 - this.heji4 - this.personalForm.ridMoney', this.heji3 - this.heji4 - this.personalForm.ridMoney)
      //   this.personalForm.receivableMoney = this.heji3 - this.heji4 - this.personalForm.ridBikeMoney - this.personalForm.advanceMoney
      //   return (this.heji3 - this.heji4 - this.personalForm.ridBikeMoney - Number(this.personalForm.couponSupport) - this.personalForm.advanceMoney)
      // } else {
      //   if (this.personalForm.sourceType === '1' || this.personalForm.sourceType === '4' || this.personalForm.sourceType === '5') {
      //     console.log('this.heji3 - this.heji4', this.heji3 - this.heji4)
      //     this.personalForm.receivableMoney = this.heji3 - this.heji4
      //     return (this.heji3 - this.heji4 - Number(this.personalForm.couponSupport))
      //   }
      // }
    },
    // getReceivableMoney(val) {
    //   console.log('666', 666)
    //   console.log('val', val)
    //   if (this.receivableMoney !== null && this.receivableMoney !== '' && this.receivableMoney !== undefined) {
    //     this.personalForm.receivableMoney = this.receivableMoney
    //     return (this.receivableMoney - Number(this.personalForm.couponSupport))
    //   } else if (this.personalForm.ridMoney !== null && this.personalForm.ridMoney !== '' && this.personalForm.ridMoney !== undefined) {
    //     console.log('this.heji3 - this.heji4 - this.personalForm.ridMoney', this.heji3 - this.heji4 - this.personalForm.ridMoney)
    //     this.personalForm.receivableMoney = this.heji3 - this.heji4 - this.personalForm.ridMoney
    //     return (this.heji3 - this.heji4 - this.personalForm.ridMoney - Number(this.personalForm.couponSupport))
    //   } else if (this.personalForm.ridBikeMoney !== null && this.personalForm.ridBikeMoney !== '' && this.personalForm.ridBikeMoney !== undefined) {
    //     console.log('this.heji3 - this.heji4 - this.personalForm.ridMoney', this.heji3 - this.heji4 - this.personalForm.ridMoney)
    //     this.personalForm.receivableMoney = this.heji3 - this.heji4 - this.personalForm.ridBikeMoney
    //     return (this.heji3 - this.heji4 - this.personalForm.ridBikeMoney - Number(this.personalForm.couponSupport))
    //   } else {
    //     if (this.personalForm.sourceType === '1' || this.personalForm.sourceType === '4' || this.personalForm.sourceType === '5') {
    //       console.log('this.heji3 - this.heji4', this.heji3 - this.heji4)
    //       this.personalForm.receivableMoney = this.heji3 - this.heji4
    //       return (this.heji3 - this.heji4 - Number(this.personalForm.couponSupport))
    //     }
    //   }
    // },
    changemoney(val) {
      console.log(val)
    },
    salePrice(val) {
      console.log('val1222222', val)
      this.moreaction[0].salePrice = val
    },
    // 批量操作
    handleSelectionChange(val) {
      console.log(val)
      this.moreaction = val
    },
    packagedata(val) {
      console.log('val1222222', val)
      for (let i = 0; i < val.length; i++) {
        val[i].quantity = 1
        this.$refs.editable2.insert(val[i])
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
        this.packagecontrol = true
      }
    },
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
    isEdit6(row) {
      const re = row.productCode.slice(0, 2)
      // if (re === '01') {
      //   row.quantity = 1
      //   return row.quantity
      // }
      if (re === '01' || re === '05') { return true } else { return false }
    },
    isEdit5(row) {
      console.log('222', row)
      const re = row.productCode.slice(0, 2)
      if (re === '01') {
        return false
      } else if (re !== '01' && this.personalForm.sourceType === '5') {
        return true
      } else { return false }
    },
    isEdit4(row) {
      // console.log('222', row)
      const re = row.productCode.slice(0, 2)
      if (re === '05') { return true } else { return false }
    },
    isEdit3(row) {
      // console.log('222', row)
      const re = row.productCode.slice(0, 2)
      if (re === '01') { return false } else { return true }
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
    test() {
      const list = [...this.list2]
      // console.log(list.length)
      if (list.length === 0) {
        this.ableSubmission = true
        console.log(this.ableSubmission)
      }
    },
    updatebatch2(event, scope) {
      if (event === true) {
        const parms3 = scope.row.productCode
        batchlist(this.personalForm.saleRepositoryId, parms3).then(res => {
          console.log(res)
          this.batchlist = res.data.data.content
        })
      }
    },
    queryStock(row) {
      console.log('row+++=======', row)
      this.getReceivableMoney()
      if (row.locationName === null || row.locationName === '' || row.locationName === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: '仓库不存在此商品!',
          offset: 100
        })
        row.quantity = 1
        return false
      }
      // 1.批次只有一个 不能超过总库存
      // 2.批次有多个 不能超过单个批次数量
      let i = 0
      const EnterDetail = this.$refs.editable.getRecords()
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.productCode === row.productCode) {
          i++
        }
      })
      if (i === 1) {
        // 1.批次只有一个 不能超过总库存
        countlist(this.personalForm.saleRepositoryId, 0, row.productCode).then(res => {
          if (res.data.ret === 200) {
            console.log('res.data.data.content', res.data.data.content)
            if (res.data.data.content.list.length === 0) {
              this.$notify.error({
                title: 'wrong',
                message: '仓库内无该物品',
                offset: 100
              })
              row.quantity = 1
              return false
            }
            if (row.quantity > res.data.data.content.list[0].existStock) {
              this.$notify.error({
                title: 'wrong',
                message: this.$t('prompt.qsrzqdsjh'),
                offset: 100
              })
              row.quantity = 1
              return false
            }
          } else {
            this.$notify.error({
              title: 'wrong',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      } else {
        // 2.批次有多个 不能超过单个批次数量
        const param = {}
        param.productCode = row.productCode
        param.batch = row.batch
        param.repositoryId = row.repositoryId
        getAllBatch(param).then(res => {
          if (res.data.ret === 200) {
            console.log('res.data.data.content', res.data.data.content)
            if (row.quantity > res.data.data.content[0].quantity) {
              this.$notify.error({
                title: 'wrong',
                message: this.$t('prompt.ckslcgpcsl'),
                offset: 100
              })
              row.quantity = 1
              return false
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

      // if (row.discountRate === 0) {
      //   row.discountMoney = 0
      // } else {
      //   row.discountMoney = (row.taxprice * row.quantity * (row.discountRate / 100)).toFixed(6)
      // }
    },
    // 重置一下下拉
    change() {
      this.$forceUpdate()
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
    getLocationData(row) {
      // 默认批次
      if (row.batch === null || row.batch === '' || row.batch === undefined) {
        const parms3 = row.productCode
        batchlist(this.personalForm.saleRepositoryId, parms3).then(res => {
          // console.log(res)
          if (res.data.data.content.length > 0) {
            row.batch = res.data.data.content[0]
          }
        })
      } else {
        const parms3 = row.productCode
        batchlist(this.personalForm.saleRepositoryId, parms3).then(res => {
          if (res.data.data.content.length === 0) {
            if (row.batch !== '不使用') {
              row.batch = null
            }
          }
        })
      }
      // 默认货位
      getlocation(this.personalForm.saleRepositoryId, row).then(res => {
        if (res.data.ret === 200) {
          // console.log('res', res)
          if (res.data.data.content.length !== 0) {
            row.location = res.data.data.content[0].locationCode
            row.locationName = res.data.data.content[0].locationCode
            row.locationId = res.data.data.content[0].id
            // console.log('row.location', row.location)
          } else {
            row.location = null
            row.locationName = null
            row.locationId = null
          }
        }
      })
      return row.locationName
    },
    // 源单类型为销售合同
    salecontractDetail(val) {
      console.log(val)
      // const nowlistdata = this.$refs.editable.getRecords()
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        // for (let j = 0; j < nowlistdata.length; j++) {
        //   if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
        //     this.$notify.error({
        //       title: 'wrong',
        //       message: this.$t('prompt.wpytj'),
        //       offset: 100
        //     })
        //     return false
        //   }
        // }
        val[i].typeId = val[i].typeName
        console.log('val[i]', val[i])
        this.$refs.editable.insert(val[i])
      }
    },
    salecontract(val) {
      console.log('val.firstMoney', val.firstMoney)
      this.receivableMoney = val.firstMoney
      if (val.customerType !== null && val.customerType !== undefined && val.customerType !== '') {
        this.personalForm.customerType = '2'
      }
      if (val.sourceType === 2 && val.sourceNumber !== null) {
        this.personalForm.applyNumber = val.sourceNumber
      }
      this.personalForm.customerId = val.customerId
      customerlist2(this.personalForm.customerId).then(res => {
        console.log('res======', res)
        if (res.data.ret === 200) {
          this.personalForm.advanceMoney = res.data.data.content.advanceMoney
        }
      })
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
      this.getReceivableMoney()
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
      this.$refs.editable.clear()
      this.receivableMoney = ''
      this.personalForm.ridMoney = ''
      this.personalForm.ridBikeMoney = ''
      console.log(val)
      console.log('this.list2', this.list2)
      if (val === '5' || val === undefined) {
        this.Isproduct = false
        this.IsSourceNumber = true
        this.personalForm.saleType = '1'
        // if (this.$refs.editable.getRecords().length !== 0 && this.$refs.editable.getRecords() !== undefined && this.$refs.editable.getRecords() !== null) {
        //   this.$refs.editable.clear()
        // }
      } else if (val === '6') {
        this.IsSourceNumber = true
        this.Isproduct = true
        this.personalForm.saleType = '1'
      } else if (val === '2') {
        this.Isproduct = true
        this.IsSourceNumber = false
        this.personalForm.saleType = '2'
      } else {
        this.Isproduct = true
        this.IsSourceNumber = false
        this.personalForm.saleType = '1'
        // if (this.$refs.editable.getRecords().length !== 0 && this.$refs.editable.getRecords() !== undefined && this.$refs.editable.getRecords() !== null) {
        //   this.$refs.editable.clear()
        // }
      }
    },
    // 出库仓库focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      const EnterDetail = this.$refs.editable.getRecords()
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        elem.quantity = 1
      })
      const EnterDetail2 = this.$refs.editable2.getRecords()
      EnterDetail2.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        elem.quantity = 1
      })
      this.saleRepositoryId = val.repositoryName
      this.personalForm.saleRepositoryId = val.id
      this.judgeinvoce()
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
      // this.transferPersonId = val.personName
      // this.personalForm.transferPersonId = val.id
      const salepersonids = val.map(item => {
        return item.id
      })
      this.personalForm.transferPersonId = salepersonids.join(',')
      const salepersonnames = val.map(item => {
        return item.personName
      })
      this.transferPersonId = salepersonnames.join(',')
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
      this.personalForm.sendDate = currentdate
      this.personalForm.outDate = currentdate
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
      sums[11] = ''
      sums[13] = ''
      sums[15] = ''
      sums[17] = ''
      sums[21] = ''
      sums[22] = ''
      sums[23] = ''
      sums[24] = ''
      sums[25] = ''
      this.heji1 = sums[12]
      // this.heji2 = sums[20]
      this.heji3 = sums[16]
      this.heji4 = sums[18]
      // this.heji5 = sums[23]
      // this.heji6 = sums[17] - sums[23]
      // this.heji7 = sums[21]
      // this.heji8 = sums[16]
      return sums
    },
    // 计算成本金额
    getcostMoney(row) {
      row.costMoney = (row.costPrice * row.quantity).toFixed(6)
      return row.costMoney
    },
    // 计算含税金额
    getincludeTaxMoney(row) {
      row.includeTaxMoney = Number(row.salePrice * row.quantity) + Number(row.taxMoney)
      // row.discountMoney = (row.taxprice * row.quantity * (row.discountRate / 100)).toFixed(6)
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
      if (row.discountRate === 0) {
        // row.discountMoney = 0
      } else {
        // row.discountMoney = (row.taxprice * row.quantity * (row.discountRate / 100)).toFixed(6)
      }
    },
    // 计算税额
    getTaxMoney2(row) {
      row.taxMoney = (row.salePrice * row.taxRate / 100 * row.quantity).toFixed(6)
      return row.taxMoney
    },
    // 通过折扣计算折扣额
    getdiscountRate(row) {
      // if (row.discountRate === 0) {
      //   row.discountMoney = 0
      // } else {
      //   row.discountMoney = (row.taxprice * row.quantity * (row.discountRate / 100)).toFixed(6)
      // }
    },
    notundefined(row) {
      if (row.discountRate === undefined) {
        this.$set(row, 'discountRate', 0)
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
          if (res.data.ret === 200) {
            if (res.data.data.content.list.length === 0) {
              row.discountMoney = 0
              row.discountRate = 0
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
                row.discountRate = 0
                this.$notify.error({
                  title: 'wrong',
                  message: this.$t('tongyo.cgzdzke'),
                  offset: 100
                })
              }
            }
          }
          if (row.taxprice !== 0 && row.quantity !== 0 && row.discountMoney !== 0) {
            row.discountRate = (((row.discountMoney / row.includeTaxCostMoney)) * 100).toFixed(6)
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
              row.discountRate = 0
              this.$notify.error({
                title: 'wrong',
                message: this.$t('tongyo.cgzdzke'),
                offset: 100
              })
            } else {
              console.log('res222', res)
              const isoverdiscount = res.data.data.content.list[0].discountRate * row.includeTaxCostMoney
              console.log('isoverdiscount', isoverdiscount)
              if (isoverdiscount < val) {
                row.discountMoney = 0
                row.discountRate = 0
                this.$notify.error({
                  title: 'wrong',
                  message: this.$t('tongyo.cgzdzke'),
                  offset: 100
                })
              }
            }
          }
          if (row.taxprice !== 0 && row.quantity !== 0 && row.discountMoney !== 0) {
            row.discountRate = (((row.discountMoney / row.includeTaxCostMoney)) * 100).toFixed(6)
          }
        })
      }
    },
    // // 通过折扣额计算折扣
    // getdiscountMoney(row) {
    //   if (row.taxprice !== 0 && row.quantity !== 0 && row.discountMoney !== 0) {
    //     if (row.includeTaxCostMoney !== 0) {
    //       row.discountRate = (((row.discountMoney / row.includeTaxCostMoney)) * 100).toFixed(6)
    //     } else {
    //       row.discountRate = 0
    //     }
    //   }
    // },
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
    // 选择客户类型时清理客户名称
    clearCustomer() {
      this.personalForm.customerId = ''
      this.customerId = ''
      this.personalForm.advanceMoney = 0
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
      console.log(111, val.phoneNumber)
      console.log(111, this.personalForm.customerPhone)
      this.isbendi = val.newOrOld
      this.personalForm.transAddress = val.address
      this.personalForm.customerId = val.id
      customerlist2(this.personalForm.customerId).then(res => {
        console.log('res======', res)
        if (res.data.ret === 200) {
          this.personalForm.advanceMoney = res.data.data.content.advanceMoney
        }
      })
      this.customerId = val.customerName
      this.personalForm.phoneNumber = val.phoneNumber
      this.personalForm.address = val.address
      this.point = val.point
    },
    agentdata(val) {
      console.log(222, val)
      this.personalForm.transAddress = val.address
      this.personalForm.customerId = val.id
      customerlist2(this.personalForm.customerId).then(res => {
        console.log('res======', res)
        if (res.data.ret === 200) {
          this.personalForm.advanceMoney = res.data.data.content.advanceMoney
        }
      })
      this.customerId = val.agentName
      this.personalForm.phoneNumber = val.phone
      this.personalForm.address = val.address
      this.point = val.point
    },
    // 从源单添加商品
    handleAddSource() {
      if (this.saleRepositoryId === null || this.saleRepositoryId === '' || this.saleRepositoryId === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.qxxzckck'),
          offset: 100
        })
        return false
      }
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
      // const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        val[i].quantity = (val[i].quantity - val[i].alreadyOutQuantity).toFixed(6)
        const re = val[i].productCode.slice(0, 2)
        console.log('re === ', re === '01')
        let size = 1
        if (re === '01') {
          size = val[i].quantity
          val[i].quantity = 1
          for (let m = 1; m < size; m++) {
            val.push(val[i])
          }
        }
        this.$refs.editable.insert(val[i])
      }
    },
    saleOrder(val) {
      if (val.customerType !== null && val.customerType !== undefined && val.customerType !== '') {
        this.personalForm.customerType = String(val.customerType)
      }
      // if (val.receiveMoney) {
      //   this.personalForm.advanceMoney = val.receiveMoney
      // }
      this.personalForm.customerId = val.customerId
      customerlist2(this.personalForm.customerId).then(res => {
        console.log('res======', res)
        if (res.data.ret === 200) {
          this.personalForm.advanceMoney = res.data.data.content.advanceMoney
        }
      })
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.customerPhone
      this.personalForm.salePersonId = val.salePersonId
      this.salePersonId = val.salePersonName
      this.personalForm.settleMode = val.settleMode
      // if (val.payType !== null && val.payType !== undefined && val.payType !== '') {
      //   this.personalForm.payType = String(val.payType)
      // }
      // this.personalForm.saleRepositoryId = val.saleRepositoryId
      // this.saleRepositoryId = val.saleRepositoryName
      this.personalForm.address = val.transAddress
      this.getReceivableMoney()
    },
    // 从预售单过来的源单数据
    advanceOrderDetail(val) {
      console.log(val)
      // const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        const re = val[i].productCode.slice(0, 2)
        console.log('re === ', re === '01')
        let size = 1
        if (re === '01') {
          size = val[i].quantity
          val[i].quantity = 1
          for (let m = 1; m < size; m++) {
            val.push(val[i])
          }
        }
        this.$refs.editable.insert(val[i])
      }
    },
    advanceData(val) {
      this.personalForm.customerType = '2'
      this.personalForm.customerId = val.customerId
      customerlist2(this.personalForm.customerId).then(res => {
        console.log('res======', res)
        if (res.data.ret === 200) {
          this.personalForm.advanceMoney = res.data.data.content.advanceMoney
        }
      })
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
      this.getReceivableMoney()
    },
    // 从销售机会过来的源单数据
    opportunityDetail(val) {
      console.log(val)
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
      this.getReceivableMoney()
    },
    // 无来源添加商品
    handleAddproduct() {
      if (this.saleRepositoryId === null || this.saleRepositoryId === '' || this.saleRepositoryId === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.qxxzckck'),
          offset: 100
        })
        return false
      }
      this.control = true
    },
    productdetail(val) {
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        val[i].quantity = 1
        this.$refs.editable.insert(val[i])
      }
    },
    // 添加赠品
    handleAddGift() {
      if (this.saleRepositoryId === null || this.saleRepositoryId === '' || this.saleRepositoryId === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.qxxzckck'),
          offset: 100
        })
        return false
      }
      this.giftcontrol = true
    },
    gift(val) {
      const nowlistdata = this.$refs.editable2.getRecords()
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
        val[i].salePrice = 0.0
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
      const salepersonids = val.map(item => {
        return item.id
      })
      this.personalForm.salePersonId = salepersonids.join(',')
      const salepersonnames = val.map(item => {
        return item.personName
      })
      this.salePersonId = salepersonnames.join(',')
      // this.saleRepositoryId = val.repositoryName
      // this.personalForm.saleRepositoryId = val.repositoryId
      // this.roleId = val.postName
      // this.personalForm.roleId = val.postId
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        customerType: '2',
        sendType: '2',
        sendDate: null,
        outDate: null,
        sourceType: '5',
        otherMoney: '',
        receivableMoney: ''
      }
      this.receivableMoney = ''
      this.customerId = null
      this.salePersonId = null
      this.saleRepositoryId = null
      this.transferPersonId = null
      this.outPersonId = null
    },
    // 修改和取消按钮
    // 修改按钮
    async  handleEditok() {
      this.saveloding = true
      const controlcategorys = await batteryList2(8).then(res => {
        return res.data.data.content
      })
      const controlcategorysdetail = [35]
      const chargecategorys = await batteryList2(14).then(res => {
        return res.data.data.content
      })
      const chargecategorysdetail = [83]
      const motocategorys = [9, 10, 218, 219, 318, 319, 415, 906]
      const needbatterycategorys = await batteryList2(5).then(res => {
        return res.data.data.content
      })

      setTimeout(() => {
        if (this.personalForm.isFree === 1) {
          const battery1 = needbatterycategorys[0].productClassfyVos
          const battery2 = needbatterycategorys[1].productClassfyVos
          const batterycategorys = [...battery1, ...battery2]
          const batterycategorysdetail = batterycategorys.map(item => {
            return item.id
          })
          console.log('controlcategorysdetail', controlcategorysdetail)
          const outproduct = this.$refs.editable.getRecords()
          console.log('outproduct', outproduct)
          if (this.returnlist.length === 0) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('tongyo.zbthmxbnwk'),
              offset: 100
            })
            this.saveloding = false
            return false
          }
          const returnproduct = this.$refs.editable3.getRecords()
          const controlpro = []
          const chargepro = []
          const motopro = []
          const batterypro = []
          for (const i in outproduct) {
            if (controlcategorysdetail.includes(outproduct[i].category)) {
              controlpro.push(outproduct[i])
            } else if (chargecategorysdetail.includes(outproduct[i].category)) {
              chargepro.push(outproduct[i])
            } else if (motocategorys.includes(outproduct[i].category)) {
              motopro.push(outproduct[i])
            } else if (batterycategorys.includes(outproduct[i].category)) {
              batterypro.push(outproduct[i])
            }
          }
          const controlproquantity = controlpro.map(item => {
            return item.quantity
          })
          const allcontrolproquantity = this.sum(controlproquantity)
          console.log('allcontrolproquantity', allcontrolproquantity)
          const chargeproquantity = chargepro.map(item => {
            return item.quantity
          })
          const allchargeproquantity = this.sum(chargeproquantity)
          console.log('allchargeproquantity', allchargeproquantity)
          const motoproquantity = motopro.map(item => {
            return item.quantity
          })
          const allmotoproquantity = this.sum(motoproquantity)
          console.log('allmotoproquantity', allmotoproquantity)

          const batteryproquantity = batterypro.map(item => {
            return item.quantity
          })
          const allbatteryproquantity = this.sum(batteryproquantity)
          console.log('allbatteryproquantity', allbatteryproquantity)

          console.log('controlpro', controlpro)
          console.log('chargepro', chargepro)
          console.log('motopro', motopro)
          console.log('batterypro', batterypro)
          const returncontrolpro = []
          const returnchargepro = []
          const returnmotopro = []
          const returnbatterypro = []
          for (const i in returnproduct) {
            if (controlcategorysdetail.includes(returnproduct[i].category)) {
              returncontrolpro.push(returnproduct[i])
            } else if (chargecategorysdetail.includes(returnproduct[i].category)) {
              returnchargepro.push(returnproduct[i])
            } else if (motocategorys.includes(returnproduct[i].category)) {
              returnmotopro.push(returnproduct[i])
            } else if (batterycategorys.includes(returnproduct[i].category)) {
              returnbatterypro.push(returnproduct[i])
            }
          }

          console.log('returncontrolpro', returncontrolpro)
          console.log('returnchargepro', returnchargepro)
          console.log('returnmotopro', returnmotopro)
          console.log('returnbatterypro', returnbatterypro)
          const returncontrolproquantity = returncontrolpro.map(item => {
            return item.quantity
          })
          const allreturncontrolproquantity = this.sum(returncontrolproquantity)
          console.log('allreturncontrolproquantity', allreturncontrolproquantity)
          const returnchargeproquantity = returnchargepro.map(item => {
            return item.quantity
          })
          const allreturnchargeproquantity = this.sum(returnchargeproquantity)
          console.log('allreturnchargeproquantity', allreturnchargeproquantity)
          const returnmotoproquantity = returnmotopro.map(item => {
            return item.quantity
          })
          const allreturnmotoproquantity = this.sum(returnmotoproquantity)
          console.log('allreturnmotoproquantity', allreturnmotoproquantity)

          const returnbatteryproquantity = returnbatterypro.map(item => {
            return item.quantity
          })
          const allreturnbatteryproquantity = this.sum(returnbatteryproquantity)
          console.log('allreturnbatteryproquantity', allreturnbatteryproquantity)

          if (allbatteryproquantity !== allreturnbatteryproquantity) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('tongyo.dcthslyckslbfh'),
              offset: 100
            })
            this.saveloding = false
            return false
          }

          if (allcontrolproquantity !== allreturncontrolproquantity) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('tongyo.kzqthslyckslbf'),
              offset: 100
            })
            this.saveloding = false
            return false
          }

          if (allreturnchargeproquantity !== allchargeproquantity) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('tongyo.cdqthslyckslbf'),
              offset: 100
            })
            this.saveloding = false
            return false
          }

          if (allreturnmotoproquantity !== allmotoproquantity) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('tongyo.djthslyckslbf'),
              offset: 100
            })
            this.saveloding = false
            return false
          }
          let z = 1
          for (const j in returnproduct) {
            if (returnproduct[j].locationId === '' || returnproduct[j].locationId === null || returnproduct[j].locationId === undefined) {
              z = 2
            }
          }
          if (z === 2) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('prompt.pchwbnwk'),
              offset: 100
            })
            this.saveloding = false
            return false
          }
        }
        delete this.personalForm.saleOutRetreatVos
        delete this.personalForm.saleOutDetailVos
        delete this.personalForm.approvalUseVos
        delete this.personalForm.saleOutGiftVos
        delete this.personalForm.judgeStat
        delete this.personalForm.receiptStat
        delete this.personalForm.isDeliver
        delete this.personalForm.payType
        delete this.personalForm.currency

        this.$refs.personalForm.validate((valid) => {
          if (valid) {
            if (this.personalForm.sourceType === '5') {
              if (this.personalForm.saleType === '2') {
                this.$notify.error({
                  title: 'wrong',
                  message: this.$t('prompt.ckslcgpcsl'),
                  offset: 100
                })
                this.saveloding = false
                return false
              }
            }
            if (this.personalForm.couponSupportOld === null || this.personalForm.couponSupportOld === '' || this.personalForm.couponSupportOld === undefined) {
              this.personalForm.couponSupportOld = 0
            }
            this.personalForm.repositoryId = this.$store.getters.repositoryId
            this.personalForm.regionId = this.$store.getters.regionId
            this.personalForm.createPersonId = this.$store.getters.userId
            this.personalForm.countryId = this.$store.getters.countryId
            this.personalForm.modifyPersonId = this.$store.getters.userId
            const EnterDetail = this.$refs.editable.getRecords()
            // 整车出库时相关编码必填
            let m = 1
            // 整车不能质保
            let m3 = 1
            const m4 = this.personalForm.isFree
            EnterDetail.map(function(elem) {
              return elem
            }).forEach(function(elem) {
              const re = elem.productCode.slice(0, 2)
              if (re === '01') {
                if (m4 === 1) {
                  m3 = 2
                }
                if (elem.carCode === null || elem.carCode === undefined || elem.carCode === '' || elem.motorCode === null || elem.motorCode === undefined || elem.motorCode === '') {
                  m = 2
                }
              }
              if (re === '05') {
                if (elem.batteryCode === null || elem.batteryCode === undefined || elem.batteryCode === '') {
                  m = 3
                }
              }
            })
            if (m === 3) {
              this.$notify.error({
                title: 'wrong',
                message: this.$t('prompt.dcckytbm'),
                offset: 100
              })
              this.saveloding = false
              return false
            }
            if (m === 2) {
              this.$notify.error({
                title: 'wrong',
                message: this.$t('prompt.zcckytbm'),
                offset: 100
              })
              this.saveloding = false
              return false
            }
            if (m3 === 2) {
              this.$notify.error({
                title: 'wrong',
                message: '整车不能算作质保',
                offset: 100
              })
              this.saveloding = false
              return false
            }
            // 保存时同样商品不能有同一个批次
            let i = 0
            EnterDetail.map(function(elem) {
              return elem
            }).forEach(function(elem) {
              EnterDetail.map(function(elem2) {
                return elem2
              }).forEach(function(elem2) {
                if (elem2.productCode === elem.productCode && elem2.batch === elem.batch) {
                  const re = elem2.productCode.slice(0, 2)
                  // 去除整车
                  if (re !== '01') {
                    i++
                  }
                }
              })
            })
            console.log(i)
            if (i > EnterDetail.length) {
              this.$notify.error({
                title: 'wrong',
                message: '同样商品不能有同一个批次',
                offset: 100
              })
              this.saveloding = false
              return false
            }
            // 批次货位不能为空
            let j = 1
            EnterDetail.map(function(elem) {
              return elem
            }).forEach(function(elem) {
              if (elem.batch === null || elem.batch === undefined || elem.batch === '' || elem.location === null || elem.location === undefined || elem.location === '') {
                j = 2
              }
            })
            console.log(j)
            if (j === 2) {
              this.$notify.error({
                title: 'wrong',
                message: this.$t('prompt.pchwbnwk'),
                offset: 100
              })
              this.saveloding = false
              return false
            }
            if (EnterDetail.length === 0) {
              this.$notify.error({
                title: 'wrong',
                message: this.$t('prompt.mxbbnwk'),
                offset: 100
              })
              this.saveloding = false
              return false
            }
            EnterDetail.map(function(elem) {
              return elem
            }).forEach(function(elem) {
              if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
                delete elem.productCode
              }
              if (elem.batch === '不使用') {
                delete elem.batch
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

            const parms3 = ''
            let couponNumbers = ''
            for (let i = 0; i < this.personalForm2.couponSupports.length; i++) {
              if (this.personalForm2.couponSupports[i].couponSupport !== 0 && this.personalForm2.couponSupports[i].couponSupport !== '') {
                couponNumbers = couponNumbers + this.personalForm2.couponSupports[i].couponSupport + ','
              }
            }
            console.log('couponNumbers', couponNumbers)
            couponNumbers = couponNumbers.substring(0, couponNumbers.length - 1)
            console.log('couponNumbers', couponNumbers)
            this.personalForm.couponNumbers = couponNumbers
            if (this.personalForm.receivableMoney === '' || this.personalForm.receivableMoney === undefined || this.personalForm.receivableMoney === null) {
              this.$notify.error({
                title: 'wrong',
                message: '本次收款金额不能为空',
                offset: 100
              })
              this.saveloding = false
              return false
            }
            if (Number(this.personalForm.shouldMoney) !== 0 && Number(this.personalForm.customerPay) === 0 && this.$store.getters.countryId === 2) {
              this.$notify.error({
                title: 'wrong',
                message: this.$t('update4.qsrshijshk'),
                offset: 100
              })
              this.saveloding = false
              return false
            }
            if (Number(this.personalForm.shouldMoney) !== Number(this.personalForm.receivableMoney) && this.$store.getters.countryId === 2) {
              this.$notify.error({
                title: 'wrong',
                message: this.$t('update4.bcskyw'),
                offset: 100
              })
              this.saveloding = false
              return false
            }
            // eslint-disable-next-line use-isnan
            if (this.personalForm.customerPay === '' || this.personalForm.customerPay === undefined || this.personalForm.customerPay === NaN || this.personalForm.customerPay === null) {
              this.$notify.error({
                title: 'wrong',
                message: '实际收到客户金额不能为空',
                offset: 100
              })
              this.saveloding = false
              return false
            }

            if (this.personalForm.isFree === 1) {
              console.log('進入了2')
              this.personalForm.taxMoney = 0
              this.personalForm.includeTaxMoney = 0
              this.personalForm.money = 0
              this.personalForm.receivableMoney = 0
              this.personalForm.discount_money = 0
              this.personalForm.actualMoney = 0
              EnterDetail.map(function(elem) {
                return elem
              }).forEach(function(elem) {
                elem.money = 0
                elem.taxprice = 0
                elem.includeTaxMoney = 0
                elem.includeTaxCostMoney = 0
                elem.salePrice = 0
              })
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
            const returndata = this.$refs.editable3.getRecords()
            const parms4 = JSON.stringify(returndata)
            console.log('parms4', parms4)
            updatesaleOut(parms, parms2, parms3, this.personalForm.receivableMoney2, parms4).then(res => {
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
                // this.$refs.editable2.clear()
                this.$refs.personalForm.clearValidate()
                this.$refs.personalForm.resetFields()
                this.$refs.personalForm2.clearValidate()
                this.$refs.personalForm2.resetFields()
                this.editVisible = false
              } else {
                this.$notify.error({
                  title: 'wrong',
                  message: 'wrong',
                  offset: 100
                })
              }
              this.saveloding = false
            })
          } else {
            this.$notify.error({
              title: 'wrong',
              message: 'Information is incomplete',
              offset: 100
            })
            this.saveloding = false
            return false
          }
        })
      }, 1000 * 0.5)
    },
    handlecancel() {
      // this.$refs.editable.clear()
      // this.$refs.editable2.clear()
      // this.$refs.personalForm.clearValidate()
      // this.$refs.personalForm.resetFields()
      // this.$refs.personalForm2.clearValidate()
      // this.$refs.personalForm2.resetFields()
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
