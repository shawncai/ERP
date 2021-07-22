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
                <el-form-item :label="$t('StockInvoice.sourceType')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.sourceType" style="width: 200px" @change="handleChange">
                    <el-option value="1" label="采购入库单" />
                    <el-option value="2" label="委外入库单" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.subject')" prop="type" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.subject" filterable style="width: 200px">
                    <el-option v-for="(item, index) in subjects" :key="index" :value="item.id" :label="item.itemName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  :label="$t('StockInvoice.invoiceNumber')"
                  style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.invoiceNumber" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Invoice.invoiceType')" prop="invoiceType" style="width: 100%;">
                  <el-select v-model="personalForm.invoiceType" style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="增值税专用发票" />
                    <el-option value="2" label="增值税普通发票" />
                    <el-option value="3" label="普通发票" />
                    <el-option value="4" label="无票" />
                    <el-option value="5" label="其他" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-if="personalForm.sourceType === '1'" :span="6">
                <el-form-item :label="$t('StockInvoice.supplierId')" prop="supplierId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="supplierId" style="width: 200px" clearable @focus="handlechoose" @clear="clearinfo"/>
                  <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col v-if="personalForm.sourceType === '2'" :span="6">
                <el-form-item :label="$t('OutSourcing.outFactoryId')" prop="outFactoryId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="outFactoryId" style="width: 200px" clearable @focus="chooseFactory"/>
                </el-form-item>
                <my-factory :factorycontrol.sync="factorycontrol" @factoryName="factoryName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.settleMode')" prop="settleMode" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.settleMode" placeholder="请选择结算方式" style="width: 200px" @change="change()">
                    <el-option
                      v-for="(item, index) in settleModes"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('StockInvoice.printTimes')" prop="printTimes" style="margin-left: 18px;width: 100%;margin-bottom: 0">-->
              <!--                  <el-select v-model="personalForm.printTimes" clearable style="width: 200px">-->
              <!--                    <el-option-->
              <!--                      v-for="(item, index) in depts"-->
              <!--                      :key="index"-->
              <!--                      :value="item.id"-->
              <!--                      :label="item.deptName"/>-->
              <!--                  </el-select>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.address')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.address" disabled style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.taxNumber')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.taxNumber" disabled style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.bank')" prop="bank" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.bank" disabled style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.currency')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.currency" clearable style="width: 200px" @change="change()">
                    <el-option value="1" label="PHP"/>
                    <el-option value="2" label="USD"/>
                    <el-option value="3" label="RMB"/>
                    <el-option value="4" label="LKR"/>
                    <el-option value="5" label="THB"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('StockInvoice.currencyRate')" style="margin-left: 18px;width: 100%;margin-bottom: 0">-->
              <!--                  <el-radio-group v-model="personalForm.currencyRate" style="width: 200px">-->
              <!--                    <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>-->
              <!--                    <el-radio :label="2">{{ $t('updates.no') }}</el-radio>-->
              <!--                  </el-radio-group>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.handlePersonId')" prop="handlePersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="handlePersonId" style="width: 200px" clearable @focus="handlechooseStock"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.deptId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.deptId" clearable style="width: 200px">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.payDate')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.payDate"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('update4.invoiceDate')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.invoiceDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.summary')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.summary" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息1234-->
      <el-card :body-style=" { padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">
        <div ref="fuzhu" class="form-name" >{{ $t('updates.cgfpmx') }}</div>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button style="width: 130px" @click="handleAddSouce" >{{ $t('updates.cydzxz') }}</el-button>
          <my-enter :entercontrol.sync="entercontrol" :supp.sync="supp" :checklist.sync="checklist" @enter="enter" @enterinfo="enterinfo"/>

          <my-outsource :outsourcecontrol.sync="outsourcecontrol" :factoryname.sync="outFactoryId" @outSource="outSource"/>
          <!--          <el-button :disabled="addpro" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>-->
          <my-detail :control.sync="control" @product="productdetail"/>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
          <!--          <el-button type="primary" @click="checkStock()">{{ $t('updates.kckz') }}</el-button>-->
          <el-button :loading="downloadLoading" size="small" class="filter-item2" type="primary" @click="handleExport">{{ $t('public.export') }}</el-button>

        </div>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :key="tableKey"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules"
            :summary-method="getSummaries"
            :show-summary="jundgeprice()"
            stripe
            border
            height="600px"
            size="small"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" min-width="55" fixed align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" fixed align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" fixed align="center" min-width="90px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" fixed align="center" min-width="90px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" fixed align="center" min-width="90px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" fixed align="center" min-width="90px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" fixed align="center" min-width="90px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 6}, type: 'visible'}" :label="$t('updates.shuli')" fixed prop="quantity" align="center" min-width="200px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="6"
                  :max="scope.row.quantity2"
                  v-model="scope.row.quantity"
                  @change="calculationMoney"/>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('Hmodule.dj')" prop="price" align="center" min-width="170px">
              <template slot-scope="scope">
                <p v-show="jundgeprice()">{{ scope.row.price }}</p>
              </template>
              <!-- <template slot-scope="scope">
                <el-input-number
                  v-show="jundgeprice()"
                  :precision="6"
                  v-model="scope.row.price"
                  @input="getprice(scope.row)"/>
              </template> -->
            </el-editable-column>
            <el-editable-column :label="$t('updates.hsj')" prop="includeTaxPrice" align="center" min-width="170px">
              <template slot-scope="scope">
                <p v-show="jundgeprice()">{{ (scope.row.includeTaxPrice).toFixed(6) }}</p>
              </template>
              <!-- <template slot-scope="scope">
                <el-input-number
                  v-show="jundgeprice()"
                  :precision="6"
                  v-model="scope.row.includeTaxPrice"
                  @input="getincludeTaxPrice(scope.row)"/>
              </template> -->
            </el-editable-column>
            <el-editable-column :label="$t('updates.sl')" prop="taxRate" align="center" min-width="170px">
              <template slot-scope="scope">
                <p v-show="jundgeprice()">{{ scope.row.taxRate }}</p>
              </template>
              <!-- <template slot-scope="scope">
                <el-input-number
                  v-show="jundgeprice()"
                  :precision="6"
                  v-model="scope.row.taxRate"
                  @input="gettaxRate(scope.row, scope)"/>
              </template> -->
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.zk')" prop="discountRate" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  v-show="jundgeprice()"
                  :precision="6"
                  v-model="scope.row.discountRate"
                  @input="getdiscountRate(scope.row, scope)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.cke')" prop="discountMoney" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  v-show="jundgeprice()"
                  :precision="6"
                  v-model="scope.row.discountMoney"
                  @change="getdiscountMoney(scope.row)"/>
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

            <el-editable-column :label="$t('update4.zhehoujine')" prop="discountreduceMoney" align="center" min-width="150px">
              <template slot-scope="scope">
                <p v-show="jundgeprice()">{{ getdiscountreduceMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('update4.zhehouhanshuijine')" prop="discountreduceMoney2" align="center" min-width="150px">
              <template slot-scope="scope">
                <p v-show="jundgeprice()">{{ getdiscountreduceMoney2(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('update4.redQuantity')" prop="redQuantity" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ydbh')" prop="sourceNumber" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.dddh')" prop="orderNumber" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('SaleOrder.heji1')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="allNumber" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col v-if="jundgeprice()" :span="6">
                <el-form-item :label="$t('updates.hehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="allMoney" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col v-if="jundgeprice()" :span="6">
                <el-form-item :label="$t('updates.sehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="allTaxMoney" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col v-if="jundgeprice()" :span="6">
                <el-form-item :label="$t('updates.hsjehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="allIncludeTaxMoney" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col v-if="jundgeprice()" :span="6">
                <el-form-item :label="$t('updates.zdzkjehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="allDiscountMoney" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col v-if="jundgeprice()" :span="6">
                <el-form-item :label="$t('update4.zhehoujineheji')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="alldiscountmoney2" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col v-if="jundgeprice()" :span="6">
                <el-form-item :label="$t('updates.zhhsjehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="allMoneyMoveDiscount" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--      <el-card class="box-card" shadow="never">-->
      <!--        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</h2>-->
      <!--        <div class="container" style="margin-top: 37px">-->
      <!--          <el-form :inline="true" status-icon class="demo-ruleForm" label-width="130px">-->
      <!--            <el-row>-->
      <!--              <el-col :span="6">-->
      <!--                <el-form-item :label="$t('updates.thslzj')" style="margin-left: 18px;width: 100%;margin-bottom: 0">-->
      <!--                  <el-input v-model="allNumber" style="width: 200px" disabled/>-->
      <!--                </el-form-item>-->
      <!--              </el-col>-->
      <!--              <el-col :span="6">-->
      <!--                <el-form-item :label="$t('updates.hehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0">-->
      <!--                  <el-input v-model="allMoney" style="width: 200px" disabled/>-->
      <!--                </el-form-item>-->
      <!--              </el-col>-->
      <!--              <el-col :span="6">-->
      <!--                <el-form-item :label="$t('updates.sehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0">-->
      <!--                  <el-input v-model="allTaxMoney" style="width: 200px" disabled/>-->
      <!--                </el-form-item>-->
      <!--              </el-col>-->
      <!--              <el-col :span="6">-->
      <!--                <el-form-item label="抵应付账款" style="margin-left: 18px;width: 100%;margin-bottom: 0">-->
      <!--                  <el-input v-model="allIncludeTaxMoney" style="width: 200px" disabled/>-->
      <!--                </el-form-item>-->
      <!--              </el-col>-->
      <!--            </el-row>-->
      <!--          </el-form>-->
      <!--        </div>-->
      <!--      </el-card>-->
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
import { searchoutsourcing } from '@/api/OutSourcing'
import '@/directive/noMoreClick/index.js'
import { itemList } from '@/api/SubjectFinance'
import { countlist } from '@/api/public'
import { addStockInvoice } from '@/api/StockInvoice'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchCategory } from '@/api/Supplier'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MySupplier from './components/MySupplier'
import MyApply from './components/MyApply'
import MyPlan from './components/MyPlan'
import MyDelivery from './components/MyDelivery'
import MyLnquiry from './components/MyLnquiry'
import MyOrder from './components/MyOrder'
import MyArrival from './components/MyArrival'
import MyEnter from './components/MyEnter'
import MyRepository from './components/MyRepository'
import MyFactory from './components/MyFactory'
import MyOutsource from './components/MyOutsource'

var _that
export default {
  name: 'AddStockInvoice',
  components: { MyRepository, MyArrival, MyOrder, MyLnquiry, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp, MyEnter, MyFactory, MyOutsource },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(this.handlePersonId)
      if (this.handlePersonId === undefined || this.handlePersonId === null || this.handlePersonId === '') {
        callback(new Error('请选择采购员'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(this.supplierId)
      if (this.supplierId === undefined || this.supplierId === null || this.supplierId === '') {
        callback(new Error('请选择供应商'))
      } else {
        callback()
      }
    }
    const validatePass4 = (rule, value, callback) => {
      console.log(this.supplierId)
      if (this.personalForm.invoiceNumber === undefined || this.personalForm.invoiceNumber === null || this.personalForm.invoiceNumber === '') {
        callback(new Error('请选择部门'))
      } else {
        callback()
      }
    }

    const validatePass5 = (rule, value, callback) => {
      if (this.personalForm.invoiceNumber === undefined || this.personalForm.invoiceNumber === null || this.personalForm.invoiceNumber === '') {
        callback(new Error('请输入发票号'))
      } else if ((this.personalForm.invoiceType === '1' || this.personalForm.invoiceType === '2') && this.personalForm.invoiceNumber.length !== 8) {
        callback(new Error('发票号位数不正确'))
      } else {
        callback()
      }
    }
    const validatePass6 = (rule, value, callback) => {
      console.log(value)
      if (this.outFactoryId === undefined || this.outFactoryId === null || this.outFactoryId === '') {
        callback(new Error('请选择外包工厂'))
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
      alldiscountmoney2: '',
      tableKey: 1,
      outsourcecontrol: false,
      factorycontrol: false,
      outFactoryId: '',
      downloadLoading: false,
      checklist: [],
      // 回显仓库
      retreatRepositoryId: '',
      // 控制仓库
      repositorycontrol: false,
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
      settleModes: [],
      supp: null,
      // 支付方式
      payModes: [],
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
      // 选择的数据
      choosedata: [],
      // 部门数据
      depts: [],
      // 采购员回显
      handlePersonId: this.$store.getters.name,
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
      entercontrol: false,
      // 采购申请单信息数据
      personalForm: {
        handlePersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        deptId: this.$store.getters.deptId,
        isRed: 1,
        isVat: 1,
        sourceType: '1',
        payDate: null,
        invoiceType: '1'
      },
      // 采购申请单规则数据
      personalrules: {
        outFactoryId: [
          { required: true, validator: validatePass6, trigger: 'change' }
        ],
        supplierId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        handlePersonId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        payDate: [
          { required: true, message: '请选择退货日期', trigger: 'change' }
        ],
        invoiceNumber: [
          { validator: validatePass5, trigger: 'blur' }
        ],
        deptId: [
          { required: true, validator: validatePass4, trigger: 'change' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        stockTypeId: [
          { required: true, message: '请选择采购类别', trigger: 'change' }
        ],
        retreatRepositoryId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ]
      },
      subjects: [],
      // 采购申请单明细数据
      list2: [],
      // 采购申请单明细列表规则
      validRules: {
        // quantity: [
        //   { required: true, validator: validatePass5, trigger: 'focus' }
        // ]
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
    this.getdatatime()
  },
  mounted() {
    this.getinformation()
    this.getcurrency()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    calculationMoney() {
      // eslint-disable-next-line prefer-const
      let listData = this.$refs.editable.getRecords()
      let countMoney = 0
      let countdiscountreduceMoney = 0
      let countdiscountreduceMoney2 = 0

      for (const i in listData) {
        const money = listData[i].quantity * (Number(listData[i].includeTaxPrice) / (1 + (listData[i].taxRate / 100)))
        const money2 = ((Number(listData[i].includeTaxMoney) - Number(listData[i].discountMoney)) / (1 + listData[i].taxRate / 100))
        const money3 = Number(listData[i].includeTaxMoney) - Number(listData[i].discountMoney)

        countMoney += money
        countdiscountreduceMoney += money2
        countdiscountreduceMoney2 += money3
      }

      this.allMoney = Number(countMoney).toFixed(2)
      this.alldiscountmoney2 = Number(countdiscountreduceMoney).toFixed(2)
      this.allMoneyMoveDiscount = Number(countdiscountreduceMoney2).toFixed(2)

      console.log('countMoney   =====> countMoney', countMoney)
    },
    async  outSource(val) {
      // console.log('val', val)

      const moreSourceData = await Promise.all(val.map((item, index) => {
        return new Promise((resolve, reject) => {
          searchoutsourcing({ number: item.sourceNumber, pageNum: 1, pageSize: 10 }).then(res => {
            resolve(res.data.data.content.list[0])
          })
        })
      }))

      // console.log('moreSourceData', moreSourceData)
      // eslint-disable-next-line prefer-const
      let newarr = []
      for (const i in moreSourceData) {
        for (const j in moreSourceData[i].outsourcingDetailVos) {
          for (const x in moreSourceData[i].outsourcingEnterDetailVos) {
            if (moreSourceData[i].outsourcingDetailVos[j].idx === moreSourceData[i].outsourcingEnterDetailVos[x].idx) {
              const obj = {}
              obj.productCode = moreSourceData[i].outsourcingEnterDetailVos[x].productCode
              obj.price = moreSourceData[i].outsourcingDetailVos[j].price
              obj.money = moreSourceData[i].outsourcingDetailVos[j].totalMoney
              obj.includeTaxPrice = moreSourceData[i].outsourcingDetailVos[j].includeTaxPrice
              obj.includeTaxMoney = moreSourceData[i].outsourcingDetailVos[j].includeTaxMoney
              obj.taxRate = moreSourceData[i].outsourcingDetailVos[j].taxRate
              newarr.push(obj)
            }
          }
        }
      }

      for (const x in newarr) {
        for (const z in val) {
          for (const y in val[z].outsourceEnterDetailVos) {
            if (newarr[x].productCode === val[z].outsourceEnterDetailVos[y].productCode) {
              newarr[x].productName = val[z].outsourceEnterDetailVos[y].productName
              newarr[x].productType = val[z].outsourceEnterDetailVos[y].productType
              newarr[x].typeName = val[z].outsourceEnterDetailVos[y].productType
              newarr[x].typeId = val[z].outsourceEnterDetailVos[y].typeId
              newarr[x].unit = val[z].outsourceEnterDetailVos[y].unit
              newarr[x].color = val[z].outsourceEnterDetailVos[y].color
              newarr[x].arrivalQuantity = val[z].outsourceEnterDetailVos[y].actualEnterQuantity
              newarr[x].retreatQuantity = 0
              newarr[x].retreatReason = val[z].outsourceEnterDetailVos[y].retreatReason
              newarr[x].sourceNumber = val[z].enterNumber
              newarr[x].sourceSerialNumber = val[z].outsourceEnterDetailVos[y].id
              newarr[x].remark = val[z].outsourceEnterDetailVos[y].remark
              newarr[x].quantity = val[z].outsourceEnterDetailVos[y].actualEnterQuantity
              newarr[x].quantity2 = val[z].outsourceEnterDetailVos[y].actualEnterQuantity
              newarr[x].discountMoney = 0
              newarr[x].discountRate = 0
              newarr[x].actualEnterQuantity = val[z].outsourceEnterDetailVos[y].actualEnterQuantity
              newarr[x].invoiceQuantity = 0
            }
          }
        }
      }

      for (const i in newarr) {
        this.$refs.editable.insertAt(newarr[i], -1)
      }

      this.calculationMoney()

      // const outSourceParms = {
      //   number: val.sourceNumber,
      //   pageNum: 1,
      //   pageSize: 10
      // }
      // const outSourceData = await new Promise((resovle, reject) => {
      //   searchoutsourcing(outSourceParms).then((res) => {
      //     resovle(res.data.data.content.list)
      //   })
      // })
      // console.log('outSourceData', outSourceData)
      // const outsourcingDetailVos = outSourceData[0].outsourcingDetailVos
      // const outsourcingEnterDetailVos = outSourceData[0].outsourcingEnterDetailVos
      // // eslint-disable-next-line prefer-const
      // let newarr = []
      // for (const i in outsourcingEnterDetailVos) {
      //   for (const j in outsourcingDetailVos) {
      //     if (outsourcingDetailVos[j].idx === outsourcingEnterDetailVos[i].idx) {
      //       // eslint-disable-next-line prefer-const
      //       let obj = {}
      //       obj.productCode = outsourcingEnterDetailVos[j].productCode
      //       obj.price = outsourcingDetailVos[j].price
      //       obj.money = outsourcingDetailVos[j].totalMoney
      //       obj.includeTaxPrice = outsourcingDetailVos[j].includeTaxPrice
      //       obj.includeTaxMoney = outsourcingDetailVos[j].includeTaxMoney
      //       obj.taxRate = outsourcingDetailVos[j].taxRate
      //       newarr.push(obj)
      //     }
      //   }
      // }
      // console.log('newarr', newarr)
      // for (const x in newarr) {
      //   for (const y in val.outsourceEnterDetailVos) {
      //     if (newarr[x].productCode === val.outsourceEnterDetailVos[y].productCode) {
      //       newarr[x].productName = val.outsourceEnterDetailVos[y].productName
      //       newarr[x].productType = val.outsourceEnterDetailVos[y].productType
      //       newarr[x].typeName = val.outsourceEnterDetailVos[y].productType
      //       newarr[x].typeId = val.outsourceEnterDetailVos[y].typeId
      //       newarr[x].unit = val.outsourceEnterDetailVos[y].unit
      //       newarr[x].color = val.outsourceEnterDetailVos[y].color
      //       newarr[x].arrivalQuantity = val.outsourceEnterDetailVos[y].actualEnterQuantity
      //       newarr[x].retreatQuantity = 0
      //       newarr[x].retreatReason = val.outsourceEnterDetailVos[y].retreatReason
      //       newarr[x].sourceNumber = val.enterNumber
      //       newarr[x].sourceSerialNumber = val.outsourceEnterDetailVos[y].id
      //       newarr[x].remark = val.outsourceEnterDetailVos[y].remark
      //       newarr[x].quantity = val.outsourceEnterDetailVos[y].actualEnterQuantity
      //       newarr[x].quantity2 = val.outsourceEnterDetailVos[y].actualEnterQuantity
      //       newarr[x].discountMoney = 0
      //       newarr[x].discountRate = 0
      //       newarr[x].actualEnterQuantity = val.outsourceEnterDetailVos[y].actualEnterQuantity
      //       newarr[x].invoiceQuantity = 0
      //     }
      //   }
      // }

      // for (const i in newarr) {
      //   this.$refs.editable.insertAt(newarr[i], -1)
      // }

      // this.list2 = newarr
      // this.tableKey = Math.random()

      // const detailData = val.outsourceEnterDetailVos.map((item) => {
      //   return {
      //     productCode: item.productCode,
      //     productName: item.productName,
      //     productType: item.productType,
      //     typeName: item.productType,
      //     typeId: item.typeId,
      //     unit: item.unit,
      //     color: item.color,
      //     arrivalQuantity: item.actualEnterQuantity,
      //     retreatQuantity: 0,
      //     retreatReason: '',
      //     sourceNumber: item.sourceNumber,
      //     sourceSerialNumber: item.id,
      //     remark: item.remark,
      //     quantity: item.actualEnterQuantity,
      //     quantity2: item.actualEnterQuantity,
      //     price: item.enterPrice,
      //     includeTaxPrice: item.enterPrice,
      //     taxRate: 0,
      //     money: item.enterMoney,
      //     includeTaxMoney: 0,
      //     taxMoney: 0,
      //     discountMoney: 0.0,
      //     discountRate: 0.0,
      //     actualEnterQuantity: item.actualEnterQuantity,
      //     invoiceQuantity: item.invoiceQuantity,
      //     unJudgeQuantity: item.unJudgeQuantity
      //   }
      // })
      // this.list2 = detailData
      // this.tableKey = Math.random()
    },
    handleChange() {
      this.outFactoryId = ''
      this.personalForm.outFactoryId = ''
      this.supplierId = ''
      this.supp = ''
      this.personalForm.supplierId = ''
      this.list2 = []
      this.tableKey = Math.random()
    },
    // 外包工厂focus事件
    chooseFactory() {
      this.factorycontrol = true
    },
    // 外包工厂回显
    factoryName(val) {
      this.outFactoryId = val.factoryName
      this.personalForm.outFactoryId = val.id
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    handleExport() {
      const list = this.$refs.editable.getRecords()
      console.log('list', list)
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['物料编码', '产品名称', '规格型号', '颜色', '数量', '单价', '含税价', '税率', '金额', '含税金额', '税额', '折扣', '折扣额', '源单编号', '订单单号']
        const filterVal = ['productCode', 'productName', 'productType', 'color', 'quantity', 'price', 'includeTaxPrice', 'taxRate', 'money', 'includeTaxMoney', 'tax', 'discountRate', 'discountMoney', 'sourceNumber', 'orderNumber']
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '采购发票明细'
        })
        this.downloadLoading = false
      })
    },
    jundgeprice() {
      const value = ['1-22-24-115']
      const roles = this.$store.getters && this.$store.getters.roles
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      // console.log('hasPermission=======', hasPermission)
      return hasPermission
    },
    getcurrency() {
      const mycountry = this.$store.getters.countryId
      if (mycountry === 1) {
        this.personalForm.currency = '3'
      } else if (mycountry === 2) {
        this.personalForm.currency = '1'
      }
    },
    // 重置一下下拉
    change() {
      this.$forceUpdate()
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
    getinformation() {
      if (this.$store.getters.empcontract) {
        console.log('getempcontract', this.$store.getters.empcontract)
        this.personalForm.sourceType = '1'
        this.chooseType()
        this.allarrivalinfo(this.$store.getters.empcontract)
        for (let i = 0; i < this.$store.getters.empcontract.stockArrivalDetailVos.length; i++) {
          this.$store.getters.empcontract.stockArrivalDetailVos[i].typeName = this.$store.getters.empcontract.stockArrivalDetailVos[i].productType
          this.$store.getters.empcontract.stockArrivalDetailVos[i].type = this.$store.getters.empcontract.stockArrivalDetailVos[i].typeId
          this.$store.getters.empcontract.stockArrivalDetailVos[i].retreatQuantity = 0
          this.$store.getters.empcontract.stockArrivalDetailVos[i].retreatReason = ''
          this.$store.getters.empcontract.stockArrivalDetailVos[i].sourceNumber = this.$store.getters.empcontract.number
          this.$store.getters.empcontract.stockArrivalDetailVos[i].sourceSerialNumber = this.$store.getters.empcontract.stockArrivalDetailVos[i].id
          this.$store.getters.empcontract.stockArrivalDetailVos[i].taxRate = this.$store.getters.empcontract.stockArrivalDetailVos[i].taxRate * 100
        }
        this.arrival(this.$store.getters.empcontract.stockArrivalDetailVos)
        this.$store.dispatch('getempcontract', '')
      }
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
      this.personalForm.payDate = currentdate
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.retreatRepositoryId = val.repositoryName
      this.personalForm.retreatRepositoryId = val.id
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
              console.log(prev)
              return Number(prev).toFixed(2)
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
      sums[18] = ''
      sums[19] = ''
      this.allNumber = Number(sums[7]).toFixed(2)
      // this.allMoney = Number(sums[13]).toFixed(2)
      this.allTaxMoney = Number(sums[15]).toFixed(2)
      this.allIncludeTaxMoney = Number(sums[14]).toFixed(2)
      this.allDiscountMoney = Number(sums[12]).toFixed(2)
      // this.allMoneyMoveDiscount = Number(sums[17]).toFixed(2)
      // this.alldiscountmoney2 = Number(sums[16]).toFixed(2)
      return sums
    },
    // 通过折扣额计算折扣
    getdiscountMoney(row) {
      console.log(row)
      this.calculationMoney()
      if (row.includeTaxPrice !== 0 && row.quantity !== 0 && row.discountMoney !== 0) {
        row.discountRate = (((row.discountMoney / row.includeTaxMoney).toFixed(2)) * 100).toFixed(2)
      }
    },
    // 通过折扣计算折扣额
    getdiscountRate(row, scope) {
      this.calculationMoney()
      if (row !== '' && row !== null && row !== undefined && scope.$index === 0) {
        console.log('row', row)
        if (row.discountRate !== '' && row.discountRate !== null && row.discountRate !== undefined) {
          for (let i = 0; i < this.list2.length; i++) {
            this.list2[i].temp = i
          }
          for (let i = row.temp; i < this.list2.length; i++) {
            console.log('需求值=========', this.list2[i].discountRate)
            console.log(222)
            this.list2[i].discountRate = row.discountRate
          }
          console.log(row)
        }
      }
      console.log('执行了')
      if (row.discountRate === 0) {
        row.discountMoney = 0
      } else {
        row.discountMoney = (row.includeTaxPrice * row.quantity * (row.discountRate / 100)).toFixed(2)
      }
      if (row !== '' && row !== null && row !== undefined && scope.$index === 0) {
        if (row.discountRate !== '' && row.discountRate !== null && row.discountRate !== undefined) {
          for (let i = 0; i < this.list2.length; i++) {
            this.list2[i].temp = i
          }
          for (let i = row.temp; i < this.list2.length; i++) {
            console.log('this.list2[i].discountRate', this.list2[i].discountRate)
            if (this.list2[i].discountRate !== null && this.list2[i].discountRate !== 0 && this.list2[i].discountRate !== '' && this.list2[i].discountRate !== undefined) {
              // this.list2[i].requireDate = row.requireDate
              // this.list2[i].requireQuantity = row.requireQuantity
            } else {
              console.log(222)
              // this.list2[i].requireDate = row.requireDate
              this.list2[i].discountRate = row.discountRate
            }
          }
          console.log(row)
        }
      }
    },
    // 通过税率计算含税价
    gettaxRate(row, scope) {
      if (row !== '' && row !== null && row !== undefined && scope.$index === 0) {
        if (row.taxRate !== '' && row.taxRate !== null && row.taxRate !== undefined) {
          for (let i = 0; i < this.list2.length; i++) {
            this.list2[i].temp = i
          }
          for (let i = row.temp; i < this.list2.length; i++) {
            console.log('需求值=========', this.list2[i].taxRate)
            console.log(222)
            this.list2[i].taxRate = row.taxRate
          }
          console.log(row)
        }
      }
      if (row.includeTaxPrice !== 0) {
        row.includeTaxPrice = (row.price * (1 + row.taxRate / 100)).toFixed(6)
      }
    },
    getdiscountreduceMoney(row) {
      // row.discountreduceMoney = (Number(row.money) - Number(row.discountMoney)).toFixed(2)
      row.discountreduceMoney = (((Number(row.includeTaxMoney) - Number(row.discountMoney)) / (1 + row.taxRate / 100))).toFixed(2)
      return row.discountreduceMoney
    },
    getdiscountreduceMoney2(row) {
      row.discountreduceMoney2 = (Number(row.includeTaxMoney) - Number(row.discountMoney)).toFixed(2)
      return row.discountreduceMoney2
    },
    // 通过含税价计算税率
    getincludeTaxPrice(row) {
      if (row.price !== 0) {
        row.taxRate = ((row.includeTaxPrice / row.price - 1) * 100).toFixed(2)
        console.log(row.taxRate)
      }
    },
    // 计算单价
    getprice(row) {
      row.includeTaxPrice = (row.price * (1 + row.taxRate / 100)).toFixed(6)
    },
    // 计算税额
    getTaxMoney2(row) {
      row.taxMoney = (((Number(row.includeTaxMoney) - Number(row.discountMoney)) / (1 + (row.taxRate / 100))) * (row.taxRate / 100)).toFixed(2)
      return row.taxMoney
    },
    // 计算含税金额
    getTaxMoney(row) {
      row.includeTaxMoney = (Number(row.quantity).toFixed(6) * Number(row.includeTaxPrice).toFixed(6)).toFixed(2)
      return row.includeTaxMoney
    },
    // 计算金额
    getMoney(row) {
      row.money = (row.quantity * (Number(row.includeTaxPrice) / (1 + (row.taxRate / 100)))).toFixed(2)
      return row.money
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
          console.log('123')
          this.settleModes = res.data.data.content.list
        }
      })
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          console.log('res.data.data.content.list', res.data.data.content.list)
          this.payModes = res.data.data.content.list
          console.log('this.payModes', this.payModes)
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
      } else if (this.personalForm.sourceType === '2') {
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
        if (this.supplierId === null || this.supplierId === undefined || this.supplierId === '') {
          this.$notify.error({
            title: 'wrong',
            message: '请先选择供应商',
            duration: 0
          })
          return false
        }
        this.entercontrol = true
        if (this.list2.length > 0) {
          console.log('this.list2========>', this.list2)
          this.checklist = this.list2
          console.log('this.checklist', this.checklist)
        } else {
          this.checklist = []
        }
      } else if (this.personalForm.sourceType === '2') {
        if (this.outFactoryId === null || this.outFactoryId === undefined || this.outFactoryId === '') {
          this.$notify.error({
            title: 'wrong',
            message: '请先选择外包工厂',
            duration: 0
          })
          return false
        }
        this.outsourcecontrol = true
      }
    },
    enter(val) {
      console.log('val==========', val)
      const myval = this.$store.getters.myflagApproval
      for (let i = 0; i < this.checklist.length; i++) {
        for (let j = 0; j < myval.length; j++) {
          if (this.checklist[i].sourceNumber === myval[j]) {
            this.checklist.splice(i, 1)
            i--
          }
        }
      }
      const mychecklist = this.checklist
      console.log('mychecklist=====>', mychecklist, val)
      const mychecklistprop = this.checklist.map(item => {
        return item.sourceNumber
      })
      const checklistprop = Array.from(new Set(mychecklistprop))
      console.log('checklistprop', checklistprop)
      for (let i = 0; i < val.length; i++) {
        var index = checklistprop.findIndex(item => item === val[i].sourceNumber)
        console.log(i, !index)
        if (!index) {
          val.splice(i, 1)
          i--
        }
      }
      const newarr = val.concat(mychecklist)
      // const newnewarr = this.uniqueArray(newarr, 'productCode', 'sourceNumber')
      const newnewarr = newarr

      // const obj = {}
      // const processaction = newarr.reduce((cur, next) => {
      //   obj[next.sourceNumber] ? '' : obj[next.sourceNumber] = true && cur.push(next)
      //   return cur
      // }, [])
      this.$refs.editable.clear()
      console.log('newnewarr======>', newnewarr)
      for (let i = 0; i < newnewarr.length; i++) {
        newnewarr[i].quantity = (newnewarr[i].actualEnterQuantity - newnewarr[i].invoiceQuantity - newnewarr[i].unJudgeQuantity).toFixed(6)
        this.$refs.editable.insertAt(newnewarr[i], -1)
      }
      this.$store.dispatch('getmyflagApproval', '')
    },
    enterinfo(val) {
    //   this.personalForm.sourceNumber = val.number
    //   this.personalForm.supplierId = val.supplierId
    //   this.supplierId = val.supplierName
    //   if (val.stockTypeId !== null && val.stockTypeId !== undefined && val.stockTypeId !== '') {
    //     this.personalForm.stockTypeId = val.stockTypeId
    //   }
    //   this.personalForm.isVat = val.isVat
    //   if (val.handlePersonId !== null && val.handlePersonId !== undefined && val.handlePersonId !== '') {
    //     this.personalForm.handlePersonId = val.handlePersonId
    //     this.handlePersonId = val.stockPersonName
    //   }
    //   if (val.payMode !== null && val.payMode !== undefined && val.payMode !== '') {
    //     this.personalForm.payMode = val.payMode
    //   }
    //   if (val.deliveryModeId !== null && val.deliveryModeId !== undefined && val.deliveryModeId !== '') {
    //     this.personalForm.deliveryModeId = val.deliveryModeId
    //   }
    //   if (val.currencyId !== null && val.currencyId !== undefined && val.currencyId !== '') {
    //     this.personalForm.currencyId = String(val.currencyId)
    //   }
    //   this.getTypes()
    },
    // json数组去重
    uniqueArray(array, key, key2) {
      var result = [array[0]]
      for (var i = 1; i < array.length; i++) {
        var item = array[i]
        var repeat = false
        for (var j = 0; j < result.length; j++) {
          if (item[key] === result[j][key] && item[key2] === result[j][key2]) {
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
    // 更新类型
    updatecountry() {
      this.getTypes()
    },
    getTypes() {
      const param = {}
      param.subjectId = 1
      itemList(param).then(res => {
        if (res.data.ret === 200) {
          this.subjects = res.data.data.content
        }
      })
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
    clearinfo() {
      this.personalForm.taxNumber = ''
      this.personalForm.address = ''
      this.personalForm.bank = ''
      this.supplierId = ''
      this.supp = ''
      this.personalForm.supplierId = ''
    },
    // 供应商列表返回数据
    supplierName(val) {
      this.list2 = []
      console.log(val)
      this.supplierId = val.supplierName
      this.supp = val.id
      this.personalForm.supplierId = val.id
      if (val.detailAddress !== null && val.detailAddress !== undefined && val.detailAddress !== '') {
        this.personalForm.address = val.detailAddress
      }
      if (val.taxNumber !== null && val.taxNumber !== undefined && val.taxNumber !== '') {
        this.personalForm.taxNumber = val.taxNumber
      }
      if (val.bankName !== null && val.bankName !== undefined && val.bankName !== '') {
        this.personalForm.bank = val.bankName
      }
      if (val.stockPersonId !== null && val.stockPersonId !== undefined && val.stockPersonId !== '') {
        this.personalForm.handlePersonId = val.stockPersonId
        this.handlePersonId = val.stockPersonName
      }
      this.personalForm.payMode = val.payMode
      this.personalForm.deliveryModeId = val.deliveryMode
      this.personalForm.isVat = val.isVat
      this.personalForm.currencyId = val.currency
    },
    // 采购员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 采购员回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
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
        handlePersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        deptId: this.$store.getters.deptId,
        isRed: 1,
        isVat: 1,
        sourceType: '1',
        payDate: null,
        invoiceType: '1'
      }
      this.getcurrency()
      this.supplierId = null
      this.inquiryPersonId = null
      this.handlePersonId = this.$store.getters.name
      this.ourContractorId = null
      this.acceptPersonId = null
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
            if (elem.taxRate === null || elem.taxRate === '' || elem.taxRate === undefined) {
              delete elem.taxRate
            }
            if (elem.taxRate !== null || elem.taxRate !== '' || elem.taxRate !== undefined) {
              elem.taxRate = elem.taxRate / 100
            }
            if (elem.discountRate === null || elem.discountRate === '' || elem.discountRate === undefined) {
              delete elem.discountRate
            }
            if (elem.discountRate !== null || elem.discountRate !== '' || elem.discountRate !== undefined) {
              elem.discountRate = elem.discountRate / 100
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
          addStockInvoice(parms, parms2, this.personalForm).then(res => {
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
      const view = { path: '/StockInvoice/AddStockInvoice', name: 'AddStockInvoice', fullPath: '/StockInvoice/AddStockInvoice', title: 'AddStockInvoice' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ERP-container{
    margin-right: 0;
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
  }
</style>

