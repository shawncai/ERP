<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">
        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('SaleOut.invoiceNumber')" prop="invoiceNumber" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.invoiceNumber" style="width: 200px" clearable @blur="judgeinvoce"/>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('SaleOut.customerName')" prop="customerId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerId" style="width: 200px" @focus="chooseCustomer"/>
                  <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
                  <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('SaleOut.customerPhone')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.customerPhone" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>

              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('SaleOut.salePersonId')" prop="salePersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="salePersonId" style="width: 200px" @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('SaleOut.saleRepositoryId')" prop="saleRepositoryId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="saleRepositoryId" style="width: 200px" @focus="handlechooseRep"/>
                  <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
                </el-form-item>
              </el-col>
              <el-col v-show="ischina === 2" :span="6" style="height: 57px">
                <el-form-item :label="$t('update4.isAppService')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-radio-group v-model="personalForm.isAppService" style="width: 200px" @change="changeAppDiscount">
                    <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                    <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col v-show="ischina === 2" :span="6" style="height: 57px">
                <el-form-item :label="$t('update4.appDiscount')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <span style="margin-left: 20px;">
                    {{ personalForm.appDiscount }}
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('SaleOut.pointSupport')" prop="pointSupport" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.pointSupport" :disabled="personalForm.customerType === '1'" style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('collectAndPay.couponSupportOld')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input-number v-model="personalForm.couponSupportOld" :controls="false" :step="0.1" :min="0" style="width: 200px" @blur="getReceivableMoney"/>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('SaleOut.couponRemark')" :rules="(personalForm.couponSupportOld === 0 || personalForm.couponSupportOld === '') ? personalrules.couponRemark:[{ required: true, message: 'please select couponRemark', trigger: 'change' }]" prop="couponRemark" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select ref="clear3" v-model="personalForm.couponRemark" style="width: 200px">
                    <el-option value="1" label="tax rebate amount"/>
                    <el-option value="2" label="employee discount amount"/>
                    <el-option value="3" label="old cash voucher amount"/>
                    <el-option value="4" label="special discount amount"/>
                    <el-option value="5" label="freebies/promo"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('SaleOut.ridMoney')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.ridMoney" disabled style="width: 200px"/>
                </el-form-item>
                <!-- <span style="color: red;margin-left: 52px;font-size: 14px">预售款金额：{{ yushou }}</span> -->
              </el-col>
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('SaleOut.ridBikeMoney')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.ridBikeMoney" disabled style="width: 200px"/>
                </el-form-item>
                <!-- <span style="color: red;margin-left: 52px;font-size: 14px">回收车金额：{{ huishou }}</span> -->
              </el-col>
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('otherlanguage.yskdk')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input-number v-model="personalForm.advanceMoney" :controls="false" :step="0.1" :min="0" style="width: 200px" @change="changeAdvanceMoney()"/>
                </el-form-item>
                <span style="margin-left: 18px;color: red;font-size: 14px">{{ $t('otherlanguage.yskdk') }}：{{ flexAdvanceMoney }}</span>
              </el-col>
              <el-col v-for="(item, index) in personalForm.couponSupports" :key="index" :span="6" style="height: 57px">
                <el-form-item :label="$t('SaleOut.couponSupport') + (index + 1)" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="item.couponSupport" style="margin-left: 18px;width: 130px" @blur="changeCoupon"/>
                  <el-button v-show="index === personalForm.couponSupports.length -1" icon="el-icon-plus" type="success" @click="addDomain" />
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('SaleOut.receivableMoney')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <span style="margin-left: 20px;">
                    {{ personalForm.receivableMoney }}
                  </span>
                </el-form-item>
              </el-col> -->

              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('update4.shouldMoney')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <span style="margin-left: 20px;">
                    {{ personalForm.shouldMoney }}
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('update4.customerPay')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input-number v-model="personalForm.customerPay" :controls="false" :step="0.1" :min="0" style="width: 200px" @change="updatePrice()" @blur="updatePrice()"/>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('update4.changeMoney')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <span style="margin-left: 20px;">
                    {{ personalForm.changeMoney }}
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('update4.receivableMoney')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <span style="margin-left: 20px;">
                    {{ personalForm.receivableMoney }}
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('update4.unpayMoney')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <span style="margin-left: 20px;">
                    {{ personalForm.unpayMoney }}
                  </span>
                </el-form-item>
              </el-col>

              <!-- <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('SaleOut.isInvoice')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-radio-group v-model="personalForm.isInvoice" style="width: 200px">
                    <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                    <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col> -->
              <!-- <el-col :span="6">
                <el-form-item :label="$t('collectAndPay.isfree')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-radio-group v-model="personalForm.isFree" style="width: 200px">
                    <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                    <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col> -->
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('tongyo.useType')" prop="useType" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.useType" style="width: 200px" @change="changeusetype">
                    <el-option :label="$t('tongyo.jy')" value="1"/>
                    <el-option :label="$t('tongyo.yy')" value="2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('tongyo.useMonth')" prop="useMonth" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.useMonth" style="width: 200px" @change="getReceivableMoney" @focus="getusemonth">
                    <el-option v-for="(item, index) in mouesitems" :key="index" :value="item" :label="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('SaleOut.outDate')" prop="outDate" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.outDate"
                    :picker-options="pickerOptions2"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 200px"/>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">

        <div ref="fuzhu" class="form-name" >{{ $t('updates.ckdmx') }}</div>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button :disabled="Isproduct" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <my-detail :control.sync="control" :personalform="personalForm" @product="productdetail"/>
          <my-recycling :recyclingcontrol.sync="recyclingcontrol" @recyclingdata="recyclingdata"/>
          <el-button type="danger" @click="$refs.editable.removeSelecteds();test()">{{ $t('Hmodule.delete') }}</el-button>
          <el-button type="primary" @click="checkStock()">{{ $t('updates.kckz') }}</el-button>
        </div>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules"
            class="click-table1"
            stripe
            height="600"

            border
            size="small"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" min-width="55" align="center" />
            <el-editable-column :fixed="isfixed" :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :fixed="isfixed" :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150"/>
            <el-editable-column :fixed="isfixed" :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150"/>
            <el-editable-column :label="$t('Hmodule.hw')" :fixed="isfixed" prop="location" align="center" min-width="150">
              <template slot-scope="scope">
                <p>{{ getLocationData(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Hmodule.pc')" :fixed="isfixed" prop="batch" align="center" min-width="150">
              <template slot="edit" slot-scope="scope">
                <el-select v-if="scope.row.batch !== '不使用'" v-model="scope.row.batch" :value="scope.row.batch" :placeholder="$t('Hmodule.xcpc')" filterable clearable style="margin-left: 18px;width: 100%;margin-bottom: 0; padding: 0 20px" @visible-change="updatebatch2($event,scope)">
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
            <el-editable-column :label="$t('updates.ggxh')" prop="typeId" align="center" min-width="150"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150"/>
            <el-editable-column :label="$t('updates.jxf')" prop="kpiGrade" align="center" min-width="150"/>
            <el-editable-column :label="$t('updates.spjf')" prop="point" align="center" min-width="150"/>
            <el-editable-column :label="$t('updates.ydsl')" prop="allQuantity" align="center" min-width="150"/>
            <el-editable-column :label="$t('updates.wcksl')" prop="allQuantity" align="center" min-width="150"/>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.cksli')" prop="quantity" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  v-if="isEdit5(scope.row)"
                  :precision="6"
                  :controls="false"
                  :min="1.00"
                  v-model="scope.row.quantity"
                  disabled
                  @change="queryStock(scope.row)"
                />
                <!-- <el-input v-if="isEdit2(scope.row)" v-model="personalForm.carCode" clearable/> -->
                <span v-else>{{ scope.row.quantity }}</span>
              </template>
            </el-editable-column>
            <el-editable-column v-if="false" :label="$t('updates.lsj')" prop="salePrice" align="center" min-width="150"/>
            <el-editable-column v-if="false" :label="$t('updates.cbj')" prop="costPrice" align="center" min-width="150"/>
            <!-- <el-editable-column prop="taxprice" align="center" :label="$t('updates.hsj')" min-width="150px"> -->
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
                  :min="0.00"
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
                  :min="0"
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
                  :min="0"
                  v-model="scope.row.discountMoney"
                  disabled
                  @change="getdiscountMoney(scope.row, $event, scope)"/>
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
                <el-input v-if="isEdit3(scope.row)" v-model="scope.row.batteryCode" clearable @blur="getInfo2(scope.row)"/>
                <span v-else>{{ scope.row.batteryCode }}</span>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.ydbh')" prop="sourceNumber" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ydxh')" prop="sourceSerialNumber" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>

      <!--  退货入库 -->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">
        <div ref="fuzhu" class="form-name">{{ $t('tongyo.zbthd') }}</div>
        <div class="buttons" style="margin-top: 58px">
          <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddreturnproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <el-button type="danger" @click="$refs.editable2.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        </div>
        <my-return :control.sync="control2" @product="productdetail2"/>
        <div class="container">
          <el-editable
            ref="editable2"
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
                <el-select v-model="scope.row.locationId" :value="scope.row.locationId" :placeholder="$t('Hmodule.xzhw')" filterable clearable style="margin-left: 18px;width: 100%;margin-bottom: 0" @visible-change="updatebatchreturnpro($event,scope)">
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
            <el-editable-column :label="$t('updates.wpfl')" prop="categoryName" align="center" min-width="150"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
            <!-- <el-editable-column prop="basicQuantity" align="center" :label="$t('updates.jbel')" width="150px"/> -->
            <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible'}" :label="$t('updates.rksl')" prop="quantity" align="center" width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  v-if="isEdit5(scope.row)"
                  :controls="false"
                  :min="1.00"
                  v-model="scope.row.quantity"
                  disabled
                  @change="returnquanty(scope.row)"
                />
                <!-- <el-input v-if="isEdit2(scope.row)" v-model="personalForm.carCode" clearable/> -->
                <span v-else>{{ scope.row.quantity }}</span>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.dcbm')" prop="batteryCode" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input v-if="isEdit3(scope.row)" v-model="scope.row.batteryCode" clearable/>
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
              <el-col :span="6">
                <el-form-item :label="$t('SaleOut.heji1')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="heji1" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleOut.heji3')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="heji3" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleOut.heji4')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="heji4" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleOut.heji11')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.otherMoney" style="width: 200px" @blur="getReceivableMoney"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">

        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <!-- <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave2()">{{ $t('collectAndPay.lsbc') }}</el-button> -->
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
                <el-table-column :resizable="false" label="available stock" align="center" min-width="150">
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
import { batteryList2, searchDiffPrice } from '@/api/DiffPrice'
import { searchRoleDiscount } from '@/api/BasicSettings'
import { customerlist2 } from '@/api/Customer'
import { returnMoney } from '@/api/Coupon'
import { getPackage } from '@/api/Package'
import { getAllBatch, vehicleInfo, getQuantity2 } from '@/api/public'
import { createsaleOut, checkInvoiceExist } from '@/api/SaleOut'
import { searchSaleCategory } from '@/api/SaleCategory'
import { getlocation, locationlist, countlist, batchlist, productlist } from '@/api/public'
import MyEmp from './components/MyEmp2'
import MyDelivery from '../DailyAdjust/components/MyDelivery'
import MyDetail from './components/BatteryOut'
import { searchCategory } from '@/api/Supplier'
import MyApply from './components/MyApply'
import MySupplier from '../Product/components/MySupplier'
import MyRequire from './components/MyRequire'
import MyCustomer from './components/MyCustomer'
import MyAgent from './components/MyAgent'
import MyAccept from './components/MyAccept'
import MyRepository from './components/MyRepository'
import MyOrder from './components/MyOrder'
import MyAdvance from './components/MyAdvance'
import MyPresale from './components/MyPresale'
import MyOpportunity from './components/MyOpportunity'
import MyDetail2 from './components/MyDetail2'
import MyReturn from './components/BatteryReturn'
import MyContract from './components/MyContract'
import MyRecycling from './components/MyRecycling'
import MyPackage from './components/MyPackage'
import MyItem from './components/MyItem'

var _that
export default {
  name: 'NewBatteryOut',
  components: { MyReturn, MyItem, MyRecycling, MyContract, MyDetail2, MyOpportunity, MyPresale, MyAdvance, MyOrder, MyRepository, MyAccept, MyAgent, MyCustomer, MyRequire, MySupplier, MyApply, MyDetail, MyDelivery, MyEmp, MyPackage },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(this.supplierId)
      if (this.salePersonId === undefined || this.salePersonId === null || this.salePersonId === '') {
        callback(new Error('please select saleperson'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(this.saleRepositoryId)
      if (this.saleRepositoryId === undefined || this.saleRepositoryId === null || this.saleRepositoryId === '') {
        callback(new Error('please select salebranch'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(1789, this.personalForm.pointSupport)
      if (Number(this.personalForm.pointSupport) < 0 || Number(this.personalForm.pointSupport) > this.point) {
        callback(new Error('please input point'))
      } else {
        callback()
      }
    }
    const validatePass4 = (rule, value, callback) => {
      console.log(89, this.customerId)
      if (this.customerId === undefined || this.customerId === null || this.customerId === '') {
        callback(new Error('please input customer'))
      } else {
        callback()
      }
    }
    const validatePass5 = (rule, value, callback) => {
      console.log(89, this.customerId)
      if (this.transferPersonId === undefined || this.transferPersonId === null || this.transferPersonId === '') {
        callback(new Error('please select transferperson'))
      } else {
        callback()
      }
    }
    const validatePass6 = (rule, value, callback) => {
      console.log(89, this.customerId)
      if (this.personalForm.outDate === undefined || this.personalForm.outDate === null || this.personalForm.outDate === '') {
        callback(new Error('please select outdate'))
      } else {
        callback()
      }
    }
    const validatePass7 = (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        callback(new Error('stock in quantity can not be blank'))
      } else if (value < 0) {
        callback(new Error('stock in quantity need over 0'))
      } else {
        callback()
      }
    }
    const validatePass8 = (rule, value, callback) => {
      console.log(89, this.customerId)
      if (this.personalForm.saleType === undefined || this.personalForm.saleType === null || this.personalForm.saleType === '') {
        callback(new Error('please select saletype'))
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
      pickerOptions2: {
        disabledDate: (time) => {
          const _now = Date.now()
          const seven = 130 * 24 * 60 * 60 * 1000
          const sevenDays = _now - seven
          return time.getTime() > _now || time.getTime() < sevenDays
        }
      },
      flexAdvanceMoney: 0,
      ischina: this.$store.getters.countryId,
      isbendi: null,
      projectmoney: 0,
      control3: false,
      itemlist: [],
      mouesitems: [],
      diffpricelist: [],
      control2: false,
      // 退货入库数据
      returnlist: [],

      // 赠品选择控制
      packagecontrol: false,
      productnumber: '',
      // 判断权限
      isshow: false,
      isshow2: false,
      // 积分信息
      point: 0,
      // 滚动判断
      isfixed: false,
      // 判断是否可以编辑
      isEdit: true,
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
      // 控制销售合同
      contractcontrol: false,
      recyclingcontrol: false,
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
      saleRepositoryId: this.$store.getters.repositoryName,
      // 控制仓库
      repositorycontrol: false,
      // 回显出库人
      outPersonId: '',
      // 控制出库人
      accetpcontrol: false,
      // 回显运货人
      transferPersonId: '',
      payModes: [],
      // 控制交货人
      deliverycontrol: false,
      // 回显职务
      roleId: '',
      // 回显客户
      customerId: '',
      // 控制客户
      customercontrol: false,
      agentcontrol: false,
      // 选择的数据
      choosedata: [],
      // 销售人员回显
      salePersonId: this.$store.state.user.name,
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
      // 销售订单信息数据
      personalForm: {
        unpayMoney: 0,
        customerPay: 0,
        couponSupports: [
          {
            couponSupport: 0
          }
        ],
        title: 'Battery replacement',
        salePersonId: this.$store.getters.userId,
        address: '',
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        customerType: '2',
        sendType: '2',
        sendDate: null,
        outDate: null,
        saleType: '1',
        sourceType: '5',
        otherMoney: '0',
        couponSupport: 0,
        outType: '1',
        saleRepositoryId: this.$store.getters.repositoryId,
        pointSupport: 0,
        ridMoney: 0,
        ridBikeMoney: 0,
        advanceMoney: 0,
        receiveMoney: 0,
        isInvoice: 1,
        couponMoney: 0,
        couponSupportOld: 0,
        isFree: 2,
        useMonth: null,
        isAppService: 2,
        appDiscount: 0
      },
      // 销售订单规则数据
      personalrules: {
        invoiceNumber: [
          { required: true, message: 'please input', trigger: 'blur' }
        ],
        useType: [
          { required: true, message: _that.$t('tongyo.qxzdcsylx'), trigger: 'change' }
        ],
        useMonth: [
          { required: true, message: _that.$t('tongyo.qxzdcsysc'), trigger: 'change' }
        ],
        saleType: [
          { required: true, validator: validatePass8, trigger: 'change' }
        ],
        customerType: [
          { required: true, message: 'please select customertype', trigger: 'change' }
        ],
        transDate: [
          { required: true, message: 'please select transdate', trigger: 'change' }
        ],
        salePersonId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        backType: [
          { required: true, message: 'please select backType', trigger: 'change' }
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
      receivableMoney: 0,
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
      receiptVisible2: false,
      list111: [],
      // 批量操作
      moreaction: [],
      // 可否提交
      ableSubmission: true,
      // 批次列表
      batchlist: [],
      getemplist: {
        pagenum: 1,
        pagesize: 999999
      }
    }
  },
  watch: {
    myshouldMoney: {
      handler(oldval, newval) {
        this.updatePrice()
      }
    },
    list2: {
      handler(oldval, newval) {
        console.log(this.list2.length)
        if (this.list2.length !== 0) {
          this.isfixed = true
          console.log('可以滚动')
        } else {
          this.isfixed = false
        }
        let num = 0
        let num1 = 0
        let num2 = 0
        for (const i in this.list2) {
          console.log(this.list2[i].productCode)
          num += this.list2[i].quantity
          num2 += Number(this.list2[i].discountMoney)
          num1 += this.list2[i].includeTaxCostMoney
          productlist(this.list2[i].productCode).then(res => {
            if (res.data.ret === 200) {
              console.log(res.data.data.content.list[0].isBatch)
              if (res.data.data.content.list[0].isBatch === 2) {
                this.list2[i].batch = '不使用'
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
        this.heji1 = num
        this.heji3 = num1
        this.heji4 = num2
        this.personalForm.useMonth = null
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
        } else {
          for (const i in this.itemlist) {
            num += this.itemlist[i].price
          }
        }

        this.projectmoney = num
        this.getReceivableMoney()
      },
      deep: true
    }
  },
  created() {
    this.jungleshow()
    this.getTypes()
    this.getdatatime()
    this.chooseSourceType()
    // this.getdiffprice()
  },

  mounted() {
    this.getinformation()
    this.getinformation2()
    this.getinformation3()
    this.getinformation4()
    this.getinformationcopy()
  },
  activated() {
    this.getinformationcopy()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    changeAdvanceMoney(val) {
      console.log('val', val)
      if (Number(val) > this.flexAdvanceMoney) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('update4.chaguomorenyushoujine'),
          offset: 100
        })
        this.personalForm.advanceMoney = 0
      }
      this.getReceivableMoney()
      this.updatePrice()
    },
    changeAppDiscount() {
      this.getReceivableMoney()
      this.updatePrice()
    },
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
    getinformationcopy() {
      if (this.$store.getters.saleoutcopy) {
        this.personalForm = this.$store.getters.saleoutcopy
        this.personalForm.couponSupports = [{ couponSupport: 0 }]
        this.personalForm.customerType = String(this.$store.getters.saleoutcopy.customerType)
        this.customerId = this.personalForm.customerName
        this.personalForm.customerPhone = this.$store.getters.saleoutcopy.phoneNumber
        this.personalForm.outType = String(this.$store.getters.saleoutcopy.outType)
        this.personalForm.saleType = String(this.$store.getters.saleoutcopy.saleType)
        this.saleRepositoryId = this.$store.getters.saleoutcopy.saleRepositoryName
        this.salePersonId = this.$store.state.user.name
        this.personalForm.salePersonId = this.$store.getters.userId
        this.list2 = this.personalForm.saleOutDetailVos
        this.returnlist = this.personalForm.saleOutRetreatVos
        this.personalForm.createPersonId = this.$store.getters.userId
        this.personalForm.countryId = this.$store.getters.countryId
        this.personalForm.repositoryId = this.$store.getters.repositoryId
        this.personalForm.regionId = this.$store.getters.regionId
        this.$store.dispatch('getempcontract', '')
      }
    },
    changeusetype() {
      this.personalForm.useMonth = null
      this.getReceivableMoney()
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
    getusemonth() {
      const allbattery = this.$refs.editable.getRecords()
      console.log('this.personalForm.useType', this.personalForm.useType)
      if (allbattery.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('update4.qxxzdc'),
          offset: 100
        })
        return false
      }

      if (!this.personalForm.useType) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('update4.qxzyylx'),
          offset: 100
        })
        return false
      }
      this.getemplist.useType = this.personalForm.useType
      this.getemplist.categoryId = allbattery[0].category
      this.getemplist.iseffective = 1
      this.getdiffprice()
    },
    updatePrice() {
      console.log('999', 999)
      if (this.personalForm.shouldMoney !== null && this.personalForm.shouldMoney !== '' && this.personalForm.shouldMoney !== undefined) {
        if (this.personalForm.customerPay !== null && this.personalForm.customerPay !== '' && this.personalForm.customerPay !== undefined) {
          // 客户给的钱多
          if (Number(this.personalForm.customerPay) > Number(this.personalForm.shouldMoney)) {
            this.personalForm.changeMoney = Number(Number(this.personalForm.customerPay) - Number(this.personalForm.shouldMoney)).toFixed(2)
            this.personalForm.receivableMoney = this.personalForm.shouldMoney
            this.personalForm.unpayMoney = Number(Number(this.personalForm.shouldMoney) - Number(this.personalForm.receivableMoney)).toFixed(2)
          } else {
            this.personalForm.changeMoney = 0
            this.personalForm.receivableMoney = Number(this.personalForm.customerPay)
            this.personalForm.unpayMoney = Number(Number(this.personalForm.shouldMoney) - Number(this.personalForm.receivableMoney)).toFixed(2)
          }
          console.log('this.personalForm.shouldMoney', this.personalForm.shouldMoney)
          console.log('this.personalForm.receivableMoney', this.personalForm.receivableMoney)

          console.log('this.personalForm.unpayMoney', this.personalForm.unpayMoney)
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
      // console.log('hasPermission=======', hasPermission)
      return hasPermission
    },
    unique(arr) {
      return Array.from(new Set(arr))
    },
    getdiffprice() {
      searchDiffPrice(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.diffpricelist = res.data.data.content.list
          const temparr = res.data.data.content.list.map(item => {
            return item.useMonth
          })

          this.mouesitems = this.unique(temparr)
          this.mouesitems.sort((x, y) => {
            return x - y// 升序
          })
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
    async  judgequantity() {
      const controlcategorys = await batteryList2(8).then(res => {
        return res.data.data.content
      })
      const controlcategorysdetail = [35]
      const chargecategorys = await batteryList2(14).then(res => {
        return res.data.data.content
      })
      const chargecategorysdetail = [83]
      const motocategorys = [9, 10, 218, 219, 318, 319, 415, 906]
      console.log('controlcategorysdetail', controlcategorysdetail)
      const outproduct = this.$refs.editable.getRecords()
      console.log('outproduct', outproduct)
      if (this.returnlist.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('tongyo.zbthmxbnwk'),
          offset: 100
        })
        return false
      }
      const returnproduct = this.$refs.editable2.getRecords()
      const controlpro = []
      const chargepro = []
      const motopro = []
      for (const i in outproduct) {
        if (controlcategorysdetail.includes(outproduct[i].category)) {
          controlpro.push(outproduct[i])
        } else if (chargecategorysdetail.includes(outproduct[i].category)) {
          chargepro.push(outproduct[i])
        } else if (motocategorys.includes(outproduct[i].category)) {
          motopro.push(outproduct[i])
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

      console.log('controlpro', controlpro)
      console.log('chargepro', chargepro)
      console.log('motopro', motopro)
      const returncontrolpro = []
      const returnchargepro = []
      const returnmotopro = []
      for (const i in returnproduct) {
        if (controlcategorysdetail.includes(outproduct[i].category)) {
          returncontrolpro.push(outproduct[i])
        } else if (chargecategorysdetail.includes(outproduct[i].category)) {
          returnchargepro.push(outproduct[i])
        } else if (motocategorys.includes(outproduct[i].category)) {
          returnmotopro.push(outproduct[i])
        }
      }
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

      if (allcontrolproquantity !== allreturncontrolproquantity) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('tongyo.kzqthslyckslbf'),
          offset: 100
        })
        return false
      }

      if (allreturnchargeproquantity !== allchargeproquantity) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('tongyo.cdqthslyckslbf'),
          offset: 100
        })
        return false
      }

      if (allreturnmotoproquantity !== allmotoproquantity) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('tongyo.djthslyckslbf'),
          offset: 100
        })
        return false
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
      const nowlistdata = this.$refs.editable2.getRecords()
      this.$refs.editable2.clear()

      for (let i = 0; i < val.length; i++) {
        this.$refs.editable2.insert(val[i])
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
    changeCoupon() {
      console.log('this.personalForm.couponSupports', this.personalForm.couponSupports)
      const parms2 = JSON.stringify(this.personalForm.couponSupports)
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
      this.personalForm.couponSupports.push({
        couponSupport: 0
      })
    },
    chooseNumber() {
      this.recyclingcontrol = true
    },
    salePrice(val) {
      console.log('val1222222', val)
      this.moreaction[0].salePrice = val
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
          title: 'please select main product',
          message: 'please select main product',
          offset: 100
        })
      } else {
        this.productnumber = this.moreaction[0].productCode
        this.packagecontrol = true
      }
    },
    // 获取默认消息（销售合同）
    getinformation4() {
      if (this.$store.getters.newsaleoutdata) {
        this.personalForm.sourceType = '2'
        console.log('this.$store.getters.newsaleoutdatacontract', this.$store.getters.newsaleoutdata)
        this.installappley(this.$store.getters.newsaleoutdata)
        this.getReceivableMoney()
        this.$store.dispatch('getnewsaleoutdata', '')
      }
    },
    installappley(val) {
      console.log('getempcontract3', this.$store.getters.newsaleoutdata)
      if (val.sourceType === 2 && val.sourceNumber !== null) {
        this.personalForm.applyNumber = val.sourceNumber
      }
      this.heji9 = 0
      this.heji10 = 0
      this.Isproduct = true
      this.IsSourceNumber = false
      if (this.$store.getters.newsaleoutdata.firstMoney !== '' && this.$store.getters.newsaleoutdata.firstMoney !== null && this.$store.getters.newsaleoutdata.firstMoney !== undefined) {
        this.receivableMoney = this.$store.getters.newsaleoutdata.firstMoney
      }
      this.personalForm.customerType = this.$store.getters.newsaleoutdata.customerType.toString()
      this.personalForm.customerId = this.$store.getters.newsaleoutdata.customerId

      this.customerId = this.$store.getters.newsaleoutdata.customerName

      customerlist2(this.personalForm.customerId).then(res => {
        console.log('res======', res)
        if (res.data.ret === 200) {
          this.personalForm.advanceMoney = res.data.data.content.advanceMoney
          this.flexAdvanceMoney = res.data.data.content.advanceMoney
        }
      })

      this.personalForm.customerPhone = this.$store.getters.newsaleoutdata.phone
      this.personalForm.salePersonId = this.$store.getters.newsaleoutdata.salePersonId
      this.salePersonId = this.$store.getters.newsaleoutdata.salePersonName
      if (this.$store.getters.newsaleoutdata.payMode !== null && this.$store.getters.newsaleoutdata.payMode !== undefined && this.$store.getters.newsaleoutdata.payMode !== '') {
        this.personalForm.payMode = this.$store.getters.newsaleoutdata.payMode
      }
      console.log('this.$store.getters.newsaleoutdata.saleRepositoryId', this.$store.getters.newsaleoutdata.saleRepositoryId)
      if (this.$store.getters.newsaleoutdata.saleRepositoryId !== 0 && this.$store.getters.newsaleoutdata.saleRepositoryId !== null && this.$store.getters.newsaleoutdata.saleRepositoryId !== undefined && this.$store.getters.newsaleoutdata.saleRepositoryId !== '') {
        this.personalForm.saleRepositoryId = this.$store.getters.newsaleoutdata.saleRepositoryId
        this.saleRepositoryId = this.$store.getters.newsaleoutdata.saleRepositoryName
      }
      this.personalForm.address = this.$store.getters.newsaleoutdata.address
      for (let i = 0; i < this.$store.getters.newsaleoutdata.saleContractDetailVos.length; i++) {
        this.$store.getters.newsaleoutdata.saleContractDetailVos[i].categoryName = this.$store.getters.newsaleoutdata.saleContractDetailVos[i].productCategoryName
        this.$store.getters.newsaleoutdata.saleContractDetailVos[i].category = this.$store.getters.newsaleoutdata.saleContractDetailVos[i].productCategory
        this.$store.getters.newsaleoutdata.saleContractDetailVos[i].typeName = this.$store.getters.newsaleoutdata.saleContractDetailVos[i].productTypeName
        this.$store.getters.newsaleoutdata.saleContractDetailVos[i].type = this.$store.getters.newsaleoutdata.saleContractDetailVos[i].productType
        this.$store.getters.newsaleoutdata.saleContractDetailVos[i].typeId = this.$store.getters.newsaleoutdata.saleContractDetailVos[i].typeName
        this.$store.getters.newsaleoutdata.saleContractDetailVos[i].taxprice = this.$store.getters.newsaleoutdata.saleContractDetailVos[i].salePrice
        this.$store.getters.newsaleoutdata.saleContractDetailVos[i].sourceNumber = this.$store.getters.newsaleoutdata.number
        this.$store.getters.newsaleoutdata.saleContractDetailVos[i].sourceSerialNumber = this.$store.getters.newsaleoutdata.saleContractDetailVos[i].id
        this.$store.getters.newsaleoutdata.saleContractDetailVos[i].kpiGrade = '0.00'
        this.$store.getters.newsaleoutdata.saleContractDetailVos[i].point = '0.00'
        this.$refs.editable.insert(this.$store.getters.newsaleoutdata.saleContractDetailVos[i])
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
    getReceivableMoney() {
      console.log('666', 666)
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
        this.flexAdvanceMoney = 0
      }
      if (!this.personalForm.otherMoney) {
        this.personalForm.otherMoney = 0
      }
      if (!this.projectmoney) {
        this.projectmoney = 0
      }
      console.log('this.personalForm.sourceTypethis.personalForm.sourceType', this.personalForm.sourceType)
      console.log('this.projectmoney', this.projectmoney)
      if (this.personalForm.couponSupportOld === null || this.personalForm.couponSupportOld === '' || this.personalForm.couponSupportOld === undefined) {
        this.personalForm.couponSupportOld = 0
      }
      if (this.list2.length === 0) {
        this.$set(this.personalForm, 'shouldMoney', 0)
        // this.$set(this.personalForm, 'receivableMoney', 0)
        // 未减去优惠券额的金额
        this.$set(this.personalForm, 'receivableMoney2', 0)
      } else {
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
        console.log('this.projectmoney', this.projectmoney)

        switch (this.personalForm.isAppService) {
          case 1:

            if (filterfinally.length !== 0) {
              console.log('this.projectmoney', this.projectmoney)

              let testneedmoney = (Number(filterfinally[0].diffMoney) * Number(allbattery[0].quantity) - Number(this.personalForm.pointSupport) - Number(this.personalForm.ridMoney) - Number(this.personalForm.ridBikeMoney) - Number(this.personalForm.advanceMoney) - Number(this.personalForm.couponSupportOld) - Number(this.personalForm.couponMoney)) + Number(this.personalForm.otherMoney) + Number(this.projectmoney)
              const testneedmoney2 = (Number(filterfinally[0].diffMoney) * Number(allbattery[0].quantity) - Number(this.personalForm.pointSupport) - Number(this.personalForm.ridMoney) - Number(this.personalForm.ridBikeMoney) - Number(this.personalForm.advanceMoney) - Number(this.personalForm.couponSupportOld)) + Number(this.personalForm.otherMoney) + Number(this.projectmoney)
              if (testneedmoney < 0) {
                testneedmoney = 0
              }

              const appdiscount = Math.ceil(Number(testneedmoney) / 500) * 10
              const appdiscount2 = Math.ceil(Number(testneedmoney2) / 500) * 10

              const needmoney = Number(testneedmoney) - Number(appdiscount)
              const needmoney2 = Number(testneedmoney2) - Number(appdiscount)
              this.$set(this.personalForm, 'appDiscount', appdiscount)
              // this.$set(this.personalForm, 'receivableMoney', needmoney)
              this.$set(this.personalForm, 'shouldMoney', needmoney)

              // 未减去优惠券额的金额
              this.$set(this.personalForm, 'receivableMoney2', needmoney2)
            } else {
              this.$set(this.personalForm, 'appDiscount', 0)
              // this.$set(this.personalForm, 'receivableMoney', 0)
              this.$set(this.personalForm, 'shouldMoney', 0)

              // 未减去优惠券额的金额
              this.$set(this.personalForm, 'receivableMoney2', 0)
            }

            break
          case 2:
            if (filterfinally.length !== 0) {
              console.log('this.projectmoney', this.projectmoney)

              let needmoney = (Number(filterfinally[0].diffMoney) * Number(allbattery[0].quantity) - Number(this.personalForm.pointSupport) - Number(this.personalForm.ridMoney) - Number(this.personalForm.ridBikeMoney) - Number(this.personalForm.advanceMoney) - Number(this.personalForm.couponSupportOld) - Number(this.personalForm.couponMoney)) + Number(this.personalForm.otherMoney) + Number(this.projectmoney)
              const needmoney2 = (Number(filterfinally[0].diffMoney) * Number(allbattery[0].quantity) - Number(this.personalForm.pointSupport) - Number(this.personalForm.ridMoney) - Number(this.personalForm.ridBikeMoney) - Number(this.personalForm.advanceMoney) - Number(this.personalForm.couponSupportOld)) + Number(this.personalForm.otherMoney) + Number(this.projectmoney)
              if (needmoney < 0) {
                needmoney = 0
              }
              this.$set(this.personalForm, 'appDiscount', 0)
              // this.$set(this.personalForm, 'receivableMoney', needmoney)
              this.$set(this.personalForm, 'shouldMoney', needmoney)

              // 未减去优惠券额的金额
              this.$set(this.personalForm, 'receivableMoney2', needmoney2)
            } else {
              this.$set(this.personalForm, 'appDiscount', 0)
              // this.$set(this.personalForm, 'receivableMoney', 0)
              this.$set(this.personalForm, 'shouldMoney', 0)

              // 未减去优惠券额的金额
              this.$set(this.personalForm, 'receivableMoney2', 0)
            }

            break

          default:
            this.$set(this.personalForm, 'appDiscount', 0)
            // this.$set(this.personalForm, 'receivableMoney', 0)
            this.$set(this.personalForm, 'shouldMoney', 0)

            // 未减去优惠券额的金额
            this.$set(this.personalForm, 'receivableMoney2', 0)
            break
        }

        // this.diffpricelist
      }
    },
    isEdit5(row) {
      console.log('222', row)
      const re = row.productCode.slice(0, 2)
      if (re === '01') { return false } else { return true }
    },
    isEdit4(row) {
      console.log('222', row)
      const re = row.productCode.slice(0, 2)
      if (re === '05') { return true } else { return false }
    },
    isEdit3(row) {
      const re = row.productCode.slice(0, 2)
      // if (re === '01') {
      //   row.quantity = 1
      //   return row.quantity
      // }
      if (re === '01' || re === '05') { return true } else { return false }
    },
    isEdit2(row) {
      console.log('222', row)
      const re = row.productCode.slice(0, 2)
      // if (re === '01') {
      //   row.quantity = 1
      //   return row.quantity
      // }
      if (re === '01') { return true } else { return false }
    },
    // 判断权限显示
    jungleshow() {
      const roles = this.$store.getters.roles
      this.isshow = roles.includes('1-22-28-1')
      this.isshow2 = roles.includes('54-83-1')
      console.log(this.isshow)
    },
    test() {
      const list = [...this.list2]
      console.log(list.length)
      if (list.length === 0) {
        this.ableSubmission = true
        console.log(this.ableSubmission)
      }
    },
    queryStock(row) {
      console.log('row', row)
      if (row.location === null || row.location === '' || row.location === undefined) {
        console.log('1222222200--------------')
        this.$notify.error({
          title: 'wrong',
          message: 'branch donnot have stock',
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
                message: 'branch donnot have stock',
                offset: 100
              })
              row.quantity = 1
              return false
            }
            if (row.quantity > res.data.data.content.list[0].existStock) {
              this.$notify.error({
                title: 'wrong',
                message: this.$t('prompt.ckslgykcsl'),
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

      if (row.discountRate === 0) {
        // row.discountMoney = 0
      } else {
        // row.discountMoney = (row.taxprice * row.quantity * (row.discountRate / 100)).toFixed(6)
      }
    },
    checkStock(row) {
      console.log('this.personalForm.saleRepositoryId', this.personalForm.saleRepositoryId)
      if (this.personalForm.saleRepositoryId === null || this.personalForm.saleRepositoryId === undefined || this.personalForm.saleRepositoryId === '') {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.qxxzckck'),
          offset: 100
        })
        return false
      } else {
        console.log('this.moreaction.length', this.moreaction)
        if (this.moreaction.length > 1 || this.moreaction.length === 0) {
          this.$message.error('please select single product')
        } else {
          countlist(this.personalForm.saleRepositoryId, 0, this.moreaction[0].productCode).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              console.log('res.data.data.content', res.data.data.content)
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
      }
    },
    // 批量操作
    handleSelectionChange(val) {
      console.log(val)
      this.moreaction = val
    },
    getinformation3() {
      if (this.$store.getters.empcontract3) {
        console.log('getempcontract3', this.$store.getters.empcontract3)
        this.personalForm.sourceType = '3'
        this.Isproduct = true
        this.IsSourceNumber = false
        this.personalForm.customerType = '2'
        if (this.$store.getters.empcontract3.advanceMoney !== '' && this.$store.getters.empcontract3.advanceMoney !== null && this.$store.getters.empcontract3.advanceMoney !== undefined) {
          this.personalForm.ridMoney = this.$store.getters.empcontract3.advanceMoney
        }

        this.personalForm.customerId = this.$store.getters.empcontract3.customerId
        customerlist2(this.personalForm.customerId).then(res => {
          console.log('res======', res)
          if (res.data.ret === 200) {
            this.personalForm.advanceMoney = res.data.data.content.advanceMoney
            this.flexAdvanceMoney = res.data.data.content.advanceMoney
          }
        })
        this.customerId = this.$store.getters.empcontract3.customerName
        this.personalForm.customerPhone = this.$store.getters.empcontract3.phone
        this.personalForm.salePersonId = this.$store.getters.empcontract3.salePersonId
        this.salePersonId = this.$store.getters.empcontract3.salePersonName
        if (this.$store.getters.empcontract3.payMode !== null && this.$store.getters.empcontract3.payMode !== undefined && this.$store.getters.empcontract3.payMode !== '') {
          this.personalForm.payMode = this.$store.getters.empcontract3.payMode
        }
        this.personalForm.saleRepositoryId = this.$store.getters.empcontract3.saleRepositoryId
        this.saleRepositoryId = this.$store.getters.empcontract3.saleRepositoryName
        this.personalForm.address = this.$store.getters.empcontract3.address
        for (let i = 0; i < this.$store.getters.empcontract3.advanceOrderDetailVos.length; i++) {
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].categoryName = this.$store.getters.empcontract3.advanceOrderDetailVos[i].productCategoryName
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].category = this.$store.getters.empcontract3.advanceOrderDetailVos[i].categoryId
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].typeName = this.$store.getters.empcontract3.advanceOrderDetailVos[i].productType
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].type = this.$store.getters.empcontract3.advanceOrderDetailVos[i].typeId
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].taxprice = this.$store.getters.empcontract3.advanceOrderDetailVos[i].salePrice
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].sourceNumber = this.$store.getters.empcontract3.advanceNumber
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].sourceSerialNumber = this.$store.getters.empcontract3.advanceOrderDetailVos[i].id
          this.$store.getters.empcontract3.advanceOrderDetailVos[i].categoryName = this.$store.getters.empcontract3.advanceOrderDetailVos[i].productCategoryName
          this.$refs.editable.insert(this.$store.getters.empcontract3.advanceOrderDetailVos[i])
        }
        this.getReceivableMoney()
        this.$store.dispatch('getempcontract3', '')
      }
    },
    getinformation2() {
      if (this.$store.getters.empcontract2) {
        console.log('getempcontract2', this.$store.getters.empcontract2)
        this.personalForm.sourceType = '4'
        this.Isproduct = true
        this.IsSourceNumber = false
        if (this.$store.getters.empcontract2.customerType !== null && this.$store.getters.empcontract2.customerType !== undefined && this.$store.getters.empcontract2.customerType !== '') {
          this.personalForm.customerType = String(this.$store.getters.empcontract2.customerType)
        }
        // this.personalForm.customerId = val.customerId
        this.customerId = this.$store.getters.empcontract2.customerName
        this.personalForm.customerPhone = this.$store.getters.empcontract2.customerPhone
        this.personalForm.salePersonId = this.$store.getters.empcontract2.handlePersonId
        this.salePersonId = this.$store.getters.empcontract2.handlePersonName
        this.personalForm.handleRepositoryId = this.$store.getters.empcontract2.handleRepositoryId
        this.handleRepositoryId = this.$store.getters.empcontract2.handleRepositoryName
        for (let i = 0; i < this.$store.getters.empcontract2.saleOpportunityDetailVos.length; i++) {
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].categoryName = this.$store.getters.empcontract2.saleOpportunityDetailVos[i].productCategory
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].category = this.$store.getters.empcontract2.saleOpportunityDetailVos[i].categoryId
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].typeName = this.$store.getters.empcontract2.saleOpportunityDetailVos[i].productType
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].type = this.$store.getters.empcontract2.saleOpportunityDetailVos[i].typeId
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].quantity = 0
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].salePrice = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].costPrice = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].taxprice = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].costMoney = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].includeTaxMoney = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].taxRate = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].taxMoney = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].money = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].includeTaxCostMoney = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].discount = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].discountMoney = '0.00'
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].carCode = 0
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].motorCode = 0
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].batteryCode = 0
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].sourceNumber = this.$store.getters.empcontract2.opportunityNumber
          this.$store.getters.empcontract2.saleOpportunityDetailVos[i].sourceSerialNumber = this.$store.getters.empcontract2.saleOpportunityDetailVos[i].id
          this.$refs.editable.insert(this.$store.getters.empcontract2.saleOpportunityDetailVos[i])
        }
        this.getReceivableMoney()
        this.$store.dispatch('getempcontract2', '')
      }
    },
    getinformation() {
      if (this.$store.getters.empcontract) {
        console.log('getempcontractsaleorder', this.$store.getters.empcontract)
        this.personalForm.sourceType = '1'
        this.Isproduct = true
        this.IsSourceNumber = false
        if (this.list2 !== 0 && this.list2 !== undefined && this.list2 !== null) {
          this.$refs.editable.clear()
        }
        if (this.$store.getters.empcontract.receiveMoney) {
          this.personalForm.advanceMoney = this.$store.getters.empcontract.receiveMoney
          this.flexAdvanceMoney = this.$store.getters.empcontract.receiveMoney
        }
        this.personalForm.sourceNumber = this.$store.getters.empcontract.number
        if (this.$store.getters.empcontract.customerType !== null && this.$store.getters.empcontract.customerType !== undefined && this.$store.getters.empcontract.customerType !== '') {
          this.personalForm.customerType = String(this.$store.getters.empcontract.customerType)
        }
        this.personalForm.customerId = this.$store.getters.empcontract.customerId
        customerlist2(this.personalForm.customerId).then(res => {
          console.log('res======', res)
          if (res.data.ret === 200) {
            this.personalForm.advanceMoney = res.data.data.content.advanceMoney
            this.flexAdvanceMoney = res.data.data.content.advanceMoney
          }
        })
        this.customerId = this.$store.getters.empcontract.customerName
        // console.log('顾客姓名', this.customerId)
        this.personalForm.customerPhone = this.$store.getters.empcontract.customerPhone
        // console.log('顾客电话', this.personalForm.customerPhone)
        this.personalForm.saleType = String(this.$store.getters.empcontract.saleType)
        this.personalForm.payMode = this.$store.getters.empcontract.payMode
        this.personalForm.invoiceType = this.$store.getters.empcontract.invoiceType
        this.personalForm.salePersonId = this.$store.getters.empcontract.salePersonId
        this.salePersonId = this.$store.getters.empcontract.salePersonName
        this.personalForm.settleMode = this.$store.getters.empcontract.settleMode
        this.personalForm.saleRepositoryId = this.$store.getters.empcontract.saleRepositoryId
        this.saleRepositoryId = this.$store.getters.empcontract.saleRepositoryName
        this.personalForm.address = this.$store.getters.empcontract.transAddress
        for (let i = 0; i < this.$store.getters.empcontract.saleOrderDetailVos.length; i++) {
          this.$store.getters.empcontract.saleOrderDetailVos[i].categoryName = this.$store.getters.empcontract.saleOrderDetailVos[i].productCategoryName
          this.$store.getters.empcontract.saleOrderDetailVos[i].category = this.$store.getters.empcontract.saleOrderDetailVos[i].productCategory
          this.$store.getters.empcontract.saleOrderDetailVos[i].typeName = this.$store.getters.empcontract.saleOrderDetailVos[i].productTypeName
          this.$store.getters.empcontract.saleOrderDetailVos[i].type = this.$store.getters.empcontract.saleOrderDetailVos[i].productType
          this.$store.getters.empcontract.saleOrderDetailVos[i].kpiGrade = '0.00'
          this.$store.getters.empcontract.saleOrderDetailVos[i].point = '0.00'
          this.$store.getters.empcontract.saleOrderDetailVos[i].carCode = 0
          this.$store.getters.empcontract.saleOrderDetailVos[i].motorCode = 0
          this.$store.getters.empcontract.saleOrderDetailVos[i].batteryCode = 0
          this.$store.getters.empcontract.saleOrderDetailVos[i].sourceNumber = this.$store.getters.empcontract.number
          this.$store.getters.empcontract.saleOrderDetailVos[i].sourceSerialNumber = this.$store.getters.empcontract.saleOrderDetailVos[i].id
          this.$refs.editable.insert(this.$store.getters.empcontract.saleOrderDetailVos[i])
        }
        this.getReceivableMoney()
        this.$store.dispatch('getempcontract', '')
      }
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
    updatebatch3(scope) {
      const parms3 = scope.row.productCode
      batchlist(this.personalForm.saleRepositoryId, parms3).then(res => {
        this.batchlist = res.data.data.content
      })
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
          if (res.data.data.content.length !== 0) {
            row.location = res.data.data.content[0].locationCode
            row.locationId = res.data.data.content[0].id
          } else {
            row.location = null
            row.locationId = null
          }
        }
      })
      return row.location
    },
    chooseSourceType(val) {
      this.receivableMoney = ''
      this.personalForm.ridMoney = ''
      this.personalForm.ridBikeMoney = ''
      console.log(val)
      console.log('this.list2', this.list2)
      if (val === '5' || val === undefined) {
        this.Isproduct = false
        this.IsSourceNumber = true
        // if (this.$refs.editable.getRecords().length !== 0 && this.$refs.editable.getRecords() !== undefined && this.$refs.editable.getRecords() !== null) {
        //   this.$refs.editable.clear()
        // }
      } else if (val === '6') {
        this.IsSourceNumber = true
        this.Isproduct = true
      } else {
        this.Isproduct = true
        this.IsSourceNumber = false
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
      //   const EnterDetail2 = this.$refs.editable2.getRecords()
      //   EnterDetail2.map(function(elem) {
      //     return elem
      //   }).forEach(function(elem) {
      //     elem.quantity = 1
      //   })
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
          sums[index] = 'summery'
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
          sums[index] = 'summery'
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
      sums[12] = ''
      sums[13] = ''
      sums[15] = ''
      sums[16] = ''
      sums[17] = ''
      sums[21] = ''
      sums[22] = ''
      sums[23] = ''
      sums[24] = ''
      sums[25] = ''
      this.heji1 = sums[14]
      this.heji3 = sums[18]
      this.heji4 = sums[20]
      // this.heji5 = sums[25]
      // this.heji6 = sums[19] - sums[25]
      // this.heji7 = sums[23]
      // this.heji8 = sums[18]
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
        // row.discountMoney = row.includeTaxCostMoney * row.discountRate
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
      if (row.discountRate === 0) {
        // row.discountMoney = 0
      } else {
        // row.discountMoney = (row.taxprice * row.quantity * (row.discountRate / 100)).toFixed(6)
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
              if (row.taxprice !== 0 && row.quantity !== 0 && row.discountMoney !== 0 && row.includeTaxCostMoney !== 0) {
                row.discountRate = (((isoverdiscount / row.includeTaxCostMoney)) * 100).toFixed(6)
              } else {
                row.discountMoney = 0
                row.discountRate = 0
              }
            }
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
              const isoverdiscount = res.data.data.content.list[0].discountRate * row.money
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
            if (row.taxprice !== 0 && row.quantity !== 0 && row.discountMoney !== 0 && row.includeTaxCostMoney !== 0) {
              row.discountRate = (((val / row.includeTaxCostMoney)) * 100).toFixed(6)
            } else {
              row.discountMoney = 0
              row.discountRate = 0
            }
          }
        })
      }
    },
    // // 通过折扣额计算折扣
    // getdiscountMoney(row) {
    //   console.log(row)
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
      row.includeTaxMoney = Number(row.salePrice * row.quantity) + Number(row.taxMoney)
      return row.includeTaxCostMoney
    },
    // 选择客户类型时清理客户名称
    clearCustomer() {
      this.personalForm.customerId = ''
      this.customerId = ''
      this.personalForm.advanceMoney = 0
      this.flexAdvanceMoney = 0
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
      this.isbendi = val.newOrOld
      this.personalForm.transAddress = val.address
      this.personalForm.customerId = val.id
      customerlist2(this.personalForm.customerId).then(res => {
        console.log('res======', res)
        if (res.data.ret === 200) {
          this.personalForm.advanceMoney = res.data.data.content.advanceMoney
          this.flexAdvanceMoney = res.data.data.content.advanceMoney
        }
      })
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.phoneNumber
      this.personalForm.address = val.address
      this.personalForm.advanceMoney = val.advanceMoney
      this.flexAdvanceMoney = val.advanceMoney

      this.point = val.point
    },
    agentdata(val) {
      console.log('val', val)
      this.personalForm.transAddress = val.address
      this.personalForm.customerId = val.id
      customerlist2(this.personalForm.customerId).then(res => {
        console.log('res======', res)
        if (res.data.ret === 200) {
          this.personalForm.advanceMoney = res.data.data.content.advanceMoney
          this.flexAdvanceMoney = res.data.data.content.advanceMoney
        }
      })
      this.customerId = val.agentName
      this.personalForm.customerPhone = val.phone
      this.personalForm.address = val.address
      this.personalForm.settleMode = val.settleMode
      this.personalForm.payMode = val.payMode
      this.personalForm.invoiceType = val.invoiceType
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
      } else if (this.personalForm.sourceType === '6') {
        this.recyclingcontrol = true
      }
    },
    // 从销售订单过来数据
    saleOrderDetail(val) {
      console.log('val', val)
      // const nowlistdata = this.$refs.editable.getRecords()
      this.$refs.editable.clear()
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
      this.receivableMoney = ''
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
          this.flexAdvanceMoney = res.data.data.content.advanceMoney
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
      this.$refs.editable.clear()
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
      this.personalForm.ridMoney = val.advanceMoney
      this.personalForm.customerType = '2'
      this.personalForm.customerId = val.customerId
      customerlist2(this.personalForm.customerId).then(res => {
        console.log('res======', res)
        if (res.data.ret === 200) {
          this.personalForm.advanceMoney = res.data.data.content.advanceMoney
          this.flexAdvanceMoney = res.data.data.content.advanceMoney
        }
      })
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.phone
      this.personalForm.salePersonId = val.salePersonId
      this.salePersonId = val.salePersonName
      if (val.payMode !== null && val.payMode !== undefined && val.payMode !== '') {
        this.personalForm.payMode = val.payMode
      }
      this.personalForm.address = val.address
      this.getReceivableMoney()
    },
    // 从销售机会过来的源单数据
    opportunityDetail(val) {
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
        this.$refs.editable.insert(val[i])
      }
    },
    opportunity(val) {
      this.receivableMoney = ''
      console.log(val)
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
    // 源单类型为销售合同
    salecontractDetail(val) {
      console.log(val)
      // const nowlistdata = this.$refs.editable.getRecords()
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        val[i].typeId = val[i].typeName
        console.log('val[i]', val[i])
        const re = val[i].productCode.slice(0, 2)
        if (re === '01') {
          this.$refs.editable.insert(val[i])
        } else {
          this.$refs.editable2.insert(val[i])
        }
      }
    },
    salecontract(val) {
      console.log('val===========', val)
      console.log('val.firstMoney', val.firstMoney)
      if (val.sourceType === 2 && val.sourceNumber !== null) {
        this.personalForm.applyNumber = val.sourceNumber
      }
      this.receivableMoney = val.firstMoney
      if (val.customerType !== null && val.customerType !== undefined && val.customerType !== '') {
        this.personalForm.customerType = '2'
      }
      this.personalForm.customerId = val.customerId
      customerlist2(this.personalForm.customerId).then(res => {
        console.log('res======', res)
        if (res.data.ret === 200) {
          this.personalForm.advanceMoney = res.data.data.content.advanceMoney
          this.flexAdvanceMoney = res.data.data.content.advanceMoney
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
    recyclingdata(val) {
      // console.log(12312312312)
      this.personalForm.sourceNumber = val.number
      this.personalForm.ridBikeMoney = val.recyclingMoney
      console.log('val', val)
      this.personalForm.customerType = '2'
      this.personalForm.customerId = val.customerId
      customerlist2(this.personalForm.customerId).then(res => {
        console.log('res======', res)
        if (res.data.ret === 200) {
          this.personalForm.advanceMoney = res.data.data.content.advanceMoney
          this.flexAdvanceMoney = res.data.data.content.advanceMoney
        }
      })
      this.customerId = val.customerName
      this.personalForm.salePersonId = val.recyclingPersonId
      this.salePersonId = val.recyclingPersonName
      this.personalForm.customerPhone = val.customerPhone
      const data = {}
      data.productCode = val.productCode
      data.productName = val.productName
      data.salePrice = val.price
      data.discountRate = 0
      data.costPrice = val.costPrice
      data.categoryName = val.productCategoryName
      data.category = val.productCategory
      data.unit = val.unit
      data.typeName = val.productTypeName
      data.type = val.productType
      data.color = val.color
      data.kpiGrade = '0.00'
      data.point = '0.00'
      data.quantity = 1
      // this.$refs.editable.insert(data)
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
      console.log('val', val)
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        val[i].quantity = 1
        this.$refs.editable.insert(val[i])
      }

      console.log('123', 123)
      const that = this
      // const list = await Promise.all(val.map(function(item) {
      //   console.log('321', 321)
      //   const param = {}
      //   param.productCode = item.productCode
      //   param.repositoryId = that.personalForm.saleRepositoryId
      //   console.log('param', param)
      //   getPackage(param).then(res => {
      //     if (res.data.ret === 200) {
      //       console.log('result2', res.data.data.content)
      //     }
      //   })
      //   // return getPackage(param)
      // }))
      // console.log('list', list)
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
      // const nowlistdata = this.$refs.editable2.getRecords()
      for (let i = 0; i < val.length; i++) {
        // for (let j = 0; j < nowlistdata.length; j++) {
        //   if (val[i].productCode === nowlistdata[j].productCode) {
        //     this.$notify.error({
        //       title: 'wrong',
        //       message: this.$t('prompt.wpytj'),
        //       offset: 100
        //     })
        //     return false
        //   }
        // }
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
        title: 'Battery replacement',
        salePersonId: this.$store.getters.userId,
        address: '',
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        customerType: '2',
        sendType: '2',
        saleType: '1',
        sourceType: '5',
        otherMoney: '0',
        couponMoney: 0,
        couponSupport: 0,
        outType: '1',
        saleRepositoryId: this.$store.getters.repositoryId,
        pointSupport: 0,
        ridMoney: 0,
        ridBikeMoney: 0,
        advanceMoney: 0,
        receiveMoney: 0,
        isInvoice: 1,
        isFree: 2,
        couponSupportOld: 0,
        couponSupports: [
          {
            couponSupport: 0
          }
        ]
      }
      this.customerId = null
      this.salePersonId = this.$store.state.user.name
      this.saleRepositoryId = this.$store.getters.repositoryName
      this.transferPersonId = null
      this.outPersonId = null
      this.getdatatime()
    },
    // 深拷贝
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    // 临时保存
    handlesave2() {
      if (this.personalForm.couponSupportOld === null || this.personalForm.couponSupportOld === '' || this.personalForm.couponSupportOld === undefined) {
        this.personalForm.couponSupportOld = 0
      }
      const EnterDetail = this.deepClone(this.$refs.editable.getRecords())
      const servicedata = this.deepClone(this.$refs.editable3.getRecords())

      // 整车出库时相关编码必填
      let m = 1
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        const re = elem.productCode.slice(0, 2)
        if (re === '01') {
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
        return false
      }
      if (m === 2) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.zcckytbm'),
          offset: 100
        })
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
          message: 'same product can not have same batch',
          offset: 100
        })
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
        return false
      }
      //   const EnterDetail2 = this.deepClone(this.$refs.editable2.getRecords())
      if (EnterDetail.length === 0) {
        // this.$notify.error({
        //   title: 'wrong',
        //   message: this.$t('prompt.mxbbnwk'),
        //   offset: 100
        // })
        // return false
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
        if (elem.batch === '不使用') {
          delete elem.batch
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
          elem.quantity = 0
        }
        if (elem.salePrice === null || elem.salePrice === '' || elem.salePrice === undefined) {
          elem.salePrice = 0
        }
        if (elem.costPrice === null || elem.costPrice === '' || elem.costPrice === undefined) {
          elem.costPrice = 0
        }
        if (elem.costMoney === null || elem.costMoney === '' || elem.costMoney === undefined) {
          elem.costMoney = 0
        }
        if (elem.includeTaxMoney === null || elem.includeTaxMoney === '' || elem.includeTaxMoney === undefined) {
          delete elem.includeTaxMoney
        }
        if (elem.taxRate === null || elem.taxRate === '' || elem.taxRate === undefined) {
          elem.taxRate = 0
        }
        if (elem.taxRate !== null || elem.taxRate !== '' || elem.taxRate !== undefined) {
          elem.taxRate = elem.taxRate / 100
        }
        if (elem.taxMoney === null || elem.taxMoney === '' || elem.taxMoney === undefined) {
          elem.taxMoney = 0
        }
        if (elem.money === null || elem.money === '' || elem.money === undefined) {
          elem.money = 0
        }
        if (elem.includeTaxCostMoney === null || elem.includeTaxCostMoney === '' || elem.includeTaxCostMoney === undefined) {
          elem.includeTaxCostMoney = 0
        }
        if (elem.discountRate === null || elem.discountRate === '' || elem.discountRate === undefined) {
          elem.discountRate = 0
        }
        if (elem.discountRate !== null || elem.discountRate !== '' || elem.discountRate !== undefined) {
          elem.discountRate = elem.discountRate / 100
        }
        if (elem.discountMoney === null || elem.discountMoney === '' || elem.discountMoney === undefined) {
          elem.discountMoney = 0
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
      for (let i = 0; i < this.personalForm.couponSupports.length; i++) {
        if (this.personalForm.couponSupports[i].couponSupport !== 0 && this.personalForm.couponSupports[i].couponSupport !== '') {
          couponNumbers = couponNumbers + this.personalForm.couponSupports[i].couponSupport + ','
        }
      }
      console.log('couponNumbers', couponNumbers)
      couponNumbers = couponNumbers.substring(0, couponNumbers.length - 1)
      console.log('couponNumbers', couponNumbers)
      this.personalForm.couponNumbers = couponNumbers
      if (this.personalForm.receivableMoney === '' || this.personalForm.receivableMoney === undefined || this.personalForm.receivableMoney === null) {
        // this.$notify.error({
        //   title: 'wrong',
        //   message: '本次收款金额不能为空',
        //   offset: 100
        // })
        // return false
        this.personalForm.receivableMoney = 0
      }
      console.log('this.personalForm.isFree', this.personalForm.isFree)
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
      const parms7 = JSON.stringify(servicedata)
      this.personalForm.judgeStat = 4
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
        // if (key === 'judgeStat') {
        //   delete Data[key]
        // }
      }
      const parms = JSON.stringify(Data)
      createsaleOut(parms, parms2, parms3, this.personalForm, this.personalForm.receivableMoney2, null, parms7).then(res => {
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
          //   this.$refs.editable2.clear()
          this.$refs.personalForm.clearValidate()
          this.$refs.personalForm.resetFields()
          this.$refs.personalForm2.clearValidate()
          this.$refs.personalForm2.resetFields()
          // this.$refs.personalForm3.clearValidate()
          // this.$refs.personalForm3.resetFields()
        } else {
          this.$notify.error({
            title: 'wrong',
            message: res.data.msg,
            offset: 100
          })
        }
      })
    },
    // 保存操作
    async handlesave() {
      if (!this.personalForm.couponRemark && this.personalForm.couponSupportOld !== 0) {
        this.$notify({
          type: 'warning',
          message: 'please select discount option',
          offset: 100,
          duration: 5000
        })
        return false
      }
      const needbatterycategorys = await batteryList2(5).then(res => {
        return res.data.data.content
      })
      const battery1 = needbatterycategorys[0].productClassfyVos
      const battery2 = needbatterycategorys[1].productClassfyVos
      const batterycategorys = [...battery1, ...battery2]
      const batterycategorysdetail = batterycategorys.map(item => {
        return item.id
      })
      console.log('batterycategorysdetail', batterycategorysdetail)
      const outproduct = this.$refs.editable.getRecords()
      const servicedata = this.deepClone(this.$refs.editable3.getRecords())

      console.log('outproduct', outproduct)
      if (this.returnlist.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('tongyo.zbthmxbnwk'),
          offset: 100
        })
        return false
      }
      const returnproduct = this.$refs.editable2.getRecords()
      const batterypro = []
      for (const i in outproduct) {
        if (batterycategorys.includes(outproduct[i].category)) {
          batterypro.push(outproduct[i])
        }
      }

      const batteryproquantity = batterypro.map(item => {
        return item.quantity
      })
      const allbatteryproquantity = this.sum(batteryproquantity)
      console.log('allbatteryproquantity', allbatteryproquantity)
      console.log('batterypro', batterypro)
      const returnbatterypro = []
      for (const i in returnproduct) {
        if (batterycategorys.includes(returnproduct[i].category)) {
          returnbatterypro.push(returnproduct[i])
        }
      }
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
        return false
      }
      let z = 1
      for (const j in returnproduct) {
        if (returnproduct[j].locationId === '' || returnproduct[j].locationId === null || returnproduct[j].locationId === undefined) {
          z = 2
        }
        const re = returnproduct[j].productCode.slice(0, 2)
        if (re === '05') {
          if (returnproduct[j].batteryCode === null || returnproduct[j].batteryCode === undefined || returnproduct[j].batteryCode === '') {
            z = 3
          }
        }
      }
      if (z === 2) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.pchwbnwk'),
          offset: 100
        })
        return false
      }
      if (z === 3) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.dcckytbm'),
          offset: 100
        })
        return false
      }

      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          if (this.personalForm.couponSupportOld === null || this.personalForm.couponSupportOld === '' || this.personalForm.couponSupportOld === undefined) {
            this.personalForm.couponSupportOld = 0
          }
          const EnterDetail = this.deepClone(this.$refs.editable.getRecords())
          // 整车出库时相关编码必填
          let m = 1
          EnterDetail.map(function(elem) {
            return elem
          }).forEach(function(elem) {
            const re = elem.productCode.slice(0, 2)
            if (re === '01') {
              if (elem.carCode === null || elem.carCode === undefined || elem.carCode === '' || elem.motorCode === null || elem.motorCode === undefined || elem.motorCode === '' || elem.batteryCode === null || elem.batteryCode === undefined || elem.batteryCode === '') {
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
            return false
          }
          if (m === 2) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('prompt.zcckytbm'),
              offset: 100
            })
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
              message: 'same product can not have same batch',
              offset: 100
            })
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
            return false
          }
          const EnterDetail2 = this.deepClone(this.$refs.editable2.getRecords())
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
              elem.quantity = 1
            }
            if (elem.salePrice === null || elem.salePrice === '' || elem.salePrice === undefined) {
              elem.salePrice = 0
            }
            if (elem.costPrice === null || elem.costPrice === '' || elem.costPrice === undefined) {
              elem.costPrice = 0
            }
            if (elem.costMoney === null || elem.costMoney === '' || elem.costMoney === undefined) {
              elem.costMoney = 0
            }
            if (elem.includeTaxMoney === null || elem.includeTaxMoney === '' || elem.includeTaxMoney === undefined) {
              elem.includeTaxMoney = 0
            }
            if (elem.taxRate === null || elem.taxRate === '' || elem.taxRate === undefined) {
              elem.taxRate = 0
            }
            if (elem.taxRate !== null || elem.taxRate !== '' || elem.taxRate !== undefined) {
              elem.taxRate = elem.taxRate / 100
            }
            if (elem.taxMoney === null || elem.taxMoney === '' || elem.taxMoney === undefined) {
              elem.taxMoney = 0
            }
            if (elem.money === null || elem.money === '' || elem.money === undefined) {
              elem.money = 0
            }
            if (elem.includeTaxCostMoney === null || elem.includeTaxCostMoney === '' || elem.includeTaxCostMoney === undefined) {
              elem.includeTaxCostMoney = 0
            }
            if (elem.discountRate === null || elem.discountRate === '' || elem.discountRate === undefined) {
              elem.discountRate = 0
            }
            if (elem.discountRate !== null || elem.discountRate !== '' || elem.discountRate !== undefined) {
              elem.discountRate = elem.discountRate / 100
            }
            if (elem.discountMoney === null || elem.discountMoney === '' || elem.discountMoney === undefined) {
              elem.discountMoney = 0
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
            if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
              delete elem.remarks
            }
            if (elem.quantity === null || elem.quantity === '' || elem.quantity === undefined) {
              elem.quantity = 1
            }
            if (elem.salePrice === null || elem.salePrice === '' || elem.salePrice === undefined) {
              elem.salePrice = 0
            }
            return elem
          })
          const parms3 = ''
          let couponNumbers = ''
          for (let i = 0; i < this.personalForm.couponSupports.length; i++) {
            if (this.personalForm.couponSupports[i].couponSupport !== 0 && this.personalForm.couponSupports[i].couponSupport !== '') {
              couponNumbers = couponNumbers + this.personalForm.couponSupports[i].couponSupport + ','
            }
          }
          console.log('couponNumbers', couponNumbers)
          couponNumbers = couponNumbers.substring(0, couponNumbers.length - 1)
          console.log('couponNumbers', couponNumbers)
          this.personalForm.couponNumbers = couponNumbers
          if (this.personalForm.receivableMoney === '' || this.personalForm.receivableMoney === undefined || this.personalForm.receivableMoney === null) {
            this.$notify.error({
              title: 'wrong',
              message: 'receivableMoney cannot be blank',
              offset: 100
            })
            return false
          }

          if (Number(this.personalForm.shouldMoney) !== 0 && Number(this.personalForm.customerPay) === 0) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('update4.qsrshijshk'),
              offset: 100
            })
            return false
          }

          console.log('Number(this.personalForm.shouldMoney)', Number(this.personalForm.shouldMoney))
          console.log('Number(this.personalForm.customerPay)', Number(this.personalForm.receivableMoney))
          // if (Number(this.personalForm.shouldMoney) !== Number(this.personalForm.receivableMoney) && this.$store.getters.countryId === 2) {
          //   this.$notify.error({
          //     title: 'wrong',
          //     message: this.$t('update4.bcskyw'),
          //     offset: 100
          //   })
          //   return false
          // }
          // eslint-disable-next-line use-isnan
          if (this.personalForm.customerPay === '' || this.personalForm.customerPay === undefined || this.personalForm.customerPay === NaN || this.personalForm.customerPay === null) {
            this.$notify.error({
              title: 'wrong',
              message: 'customerPay can not be blank',
              offset: 100
            })
            return false
          }
          console.log('this.personalForm.isFree', this.personalForm.isFree)
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
          const parms6 = JSON.stringify(EnterDetail2)
          const parms7 = JSON.stringify(servicedata)

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
          createsaleOut(parms, parms2, parms3, this.personalForm, this.personalForm.receivableMoney2, parms6, parms7).then(res => {
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
              this.$refs.editable2.clear()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
              this.$refs.personalForm2.clearValidate()
              this.$refs.personalForm2.resetFields()
              // this.$refs.personalForm3.clearValidate()
              // this.$refs.personalForm3.resetFields()
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
      const view = { path: '/SaleOut/AddSaleOut', name: 'AddSaleOut', fullPath: '/SaleOut/AddSaleOut', title: 'AddSaleOut' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    go_creat() {
      this.$router.push('/Supplier/SupplierCategory')
      this.$refs.clear.blur()
    },
    go_creat2() {
      this.$router.push('/SaleCategory/SaleCategoryList')
      this.$refs.clear2.blur()
    },
    go_creat3() {
      this.$router.push('/Supplier/SupplierCategory')
      this.$refs.clear3.blur()
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
