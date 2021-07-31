<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h1 v-show="personalForm.isRed === 2" style="color: red; font-size: 40px">红字发票{{ personalForm.number }}</h1>

      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('public.id')" style="width: 100%;">
                  <el-input v-model="personalForm.number" style="margin-left: 18px;width:200px" @change="changeEditNumber"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.sourceType')" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" disabled style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="采购入库单" />
                    <el-option value="2" label="委外入库单" />
                    <el-option value="3" label="采购发票" />
                    <el-option value="4" label="采购退货" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.subject')" prop="type" style="width: 100%;">
                  <el-select v-model="personalForm.subject" filterable style="margin-left: 18px;width: 200px">
                    <el-option v-for="(item, index) in subjects" :key="index" :value="item.id" :label="item.itemName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.invoiceNumber')" style="width: 100%;">
                  <el-input v-model="personalForm.invoiceNumber" style="margin-left: 18px;width:200px" clearable/>
                  <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
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
              <el-col v-if="personalForm.sourceType === '1'" :span="12">
                <el-form-item :label="$t('StockInvoice.supplierId')" prop="supplierId" style="width: 100%;">
                  <el-input v-model="supplierId" style="margin-left: 18px;width: 200px" clearable @focus="handlechoose" />
                  <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col v-if="personalForm.sourceType === '2'" :span="12">
                <el-form-item :label="$t('OutSourcing.outFactoryId')" prop="outFactoryId" style="width: 100%;">
                  <el-input v-model="outFactoryId" style="margin-left: 18px;width: 200px" clearable @focus="chooseFactory"/>
                </el-form-item>
                <my-factory :factorycontrol.sync="factorycontrol" @factoryName="factoryName"/>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.settleMode')" prop="settleMode" style="width: 100%;">
                  <el-select v-model="personalForm.settleMode" placeholder="请选择结算方式" style="margin-left: 18px;width: 200px" @change="change()">
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
              <!--                <el-form-item :label="$t('StockInvoice.printTimes')" prop="printTimes" style="width: 100%;">-->
              <!--                  <el-select v-model="personalForm.printTimes" clearable style="margin-left: 18px;width: 200px">-->
              <!--                    <el-option-->
              <!--                      v-for="(item, index) in depts"-->
              <!--                      :key="index"-->
              <!--                      :value="item.id"-->
              <!--                      :label="item.deptName"/>-->
              <!--                  </el-select>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.address')" style="width: 100%;">
                  <el-input v-model="personalForm.address" disabled style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Supplier.taxNumber')" style="width: 100%;">
                  <el-input v-model="personalForm.taxNumber" disabled style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.bank')" prop="bank" style="width: 100%;">
                  <el-input v-model="personalForm.bank" disabled style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.currency')" style="width: 100%;">
                  <el-select v-model="personalForm.currency" clearable style="margin-left: 18px;width: 200px" @change="change()">
                    <el-option value="1" label="PHP"/>
                    <el-option value="2" label="USD"/>
                    <el-option value="3" label="RMB"/>
                    <el-option value="4" label="LKR"/>
                    <el-option value="5" label="THB"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('StockInvoice.currencyRate')" style="width: 100%;">-->
              <!--                  <el-radio-group v-model="personalForm.currencyRate" style="margin-left: 18px;width:200px">-->
              <!--                    <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>-->
              <!--                    <el-radio :label="2">{{ $t('updates.no') }}</el-radio>-->
              <!--                  </el-radio-group>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                  <el-input v-model="handlePersonId" style="margin-left: 18px;width:200px" clearable @focus="handlechooseStock"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.deptId')" style="width: 100%;">
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
                <el-form-item :label="$t('StockInvoice.payDate')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.payDate"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('update4.invoiceDate')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.invoiceDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Stockenter.summary')" style="width: 100%;">
                  <el-input v-model="personalForm.summary" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" >{{ $t('updates.cgfpmx') }}</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button style="width: 130px" @click="handleAddSouce">{{ $t('updates.cydzxz') }}</el-button>
        <my-enter :entercontrol.sync="entercontrol" :supp.sync="supp" @enter="enter" @enterinfo="enterinfo"/>
        <my-outsource :outsourcecontrol.sync="outsourcecontrol" :factoryname.sync="outFactoryId" @outSource="outSource"/>
        <my-retreat
          :retreatcontrol.sync="retreatcontrol"
          :supp.sync="supp"
          :checklist.sync="checklist"
          @retreat="stockretreat"
          @retreatinfo="stockretreatinfo"
        />
        <my-invoice
          :entercontrol.sync="entercontrol"
          :supp.sync="supp"
          @enter="enter"
          @enterinfo="enterinfo"
        />

        <!--          <el-button :disabled="addpro" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>-->
        <my-detail :control.sync="control" @product="productdetail"/>
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        <!--          <el-button type="primary" @click="checkStock()">{{ $t('updates.kckz') }}</el-button>-->
      </div>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :key="tableKey"
          :edit-config="{ showIcon: true, showStatus: true}"
          :edit-rules="validRules"
          :summary-method="getSummaries"
          :row-class-name="tableRowClassName"
          :show-summary="jundgeprice()"
          height="600px"
          class="click-table1"

          border
          size="small"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-editable-column type="selection" min-width="55" fixed align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" fixed align="center" type="index"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" fixed align="center" min-width="90px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" fixed align="center" min-width="90px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productType" fixed align="center" min-width="60px"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" fixed align="center" min-width="60px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" fixed align="center" min-width="60px"/>
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
              <p v-show="jundgeprice()">{{ (scope.row.taxRate).toFixed(2) }}</p>
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
                @change="getdiscountRate(scope.row, scope)"/>
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
          <!-- <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.zya')" prop="summary" align="center" min-width="150px"/> -->

        </el-editable>
      </div>
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('SaleOrder.heji1')" style="width: 100%;">
                  <el-input v-model="allNumber" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col v-if="jundgeprice()" :span="6">
                <el-form-item :label="$t('updates.hehj')" style="width: 100%;">
                  <el-input v-model="allMoney" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col v-if="jundgeprice()" :span="6">
                <el-form-item :label="$t('updates.sehj')" style="width: 100%;">
                  <el-input v-model="allTaxMoney" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col v-if="jundgeprice()" :span="6">
                <el-form-item :label="$t('updates.hsjehj')" style="width: 100%;">
                  <el-input v-model="allIncludeTaxMoney" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col v-if="jundgeprice()" :span="6">
                <el-form-item :label="$t('updates.zdzkjehj')" style="width: 100%;">
                  <el-input v-model="allDiscountMoney" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col v-if="jundgeprice()" :span="6">
                <el-form-item :label="$t('update4.zhehoujineheji')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="alldiscountmoney2" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col v-if="jundgeprice()" :span="6">
                <el-form-item :label="$t('updates.zhhsjehj')" style="width: 100%;">
                  <el-input v-model="allMoneyMoveDiscount" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </div>
      </el-card>
      <div class="buttons" style="margin-top: 20px;margin-left: 30px">
        <el-button type="primary" @click="handleEditok()">{{ $t('public.edit') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        <el-button type="info" @click="handleReview()">{{ $t('prompt.sh') }}</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { searchoutsourcing } from '@/api/OutSourcing'
import { itemList } from '@/api/SubjectFinance'
import { updatestockinvoice } from '@/api/StockInvoice'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchCategory } from '@/api/Supplier'
import { updatestockinvoice2 } from '@/api/StockInvoice'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import MySupplier from './MySupplier'
import MyApply from './MyApply'
import MyPlan from './MyPlan'
import MyDelivery from './MyDelivery'
import MyLnquiry from './MyLnquiry'
import MyOrder from './MyOrder'
import MyArrival from './MyArrival'
import MyFactory from './MyFactory'
import MyOutsource from './MyOutsource'
import MyRetreat from './MyRetreat'
import MyEnter from './MyEnter'
import MyInvoice from './MyInvoice'

import { deleterepairproject } from '../../../api/repair'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  components: { MyArrival, MyOrder, MyLnquiry, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp, MyFactory, MyOutsource, MyRetreat, MyEnter, MyInvoice },
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
      if (this.personalForm.deptId === undefined || this.personalForm.deptId === null || this.personalForm.deptId === '') {
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
      retreatcontrol: false,
      editNumber: '',
      inputNumber: '',
      alldiscountmoney2: '',
      tableKey: 1,
      outsourcecontrol: false,
      factorycontrol: false,
      outFactoryId: '',
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
      subjects: [],
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
          { required: true, validator: validatePass5, trigger: 'blur' }
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
      // 采购申请单明细数据
      list2: [],
      // 采购申请单明细列表规则
      validRules: {
      },
      receiptVisible2: false,
      list111: [],
      // 批量操作
      moreaction: [],
      reviewParms: {
        id: '',
        judgePersonId: '',
        judgeStat: ''
      },
      checklist: []
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.supplierId = this.personalForm.supplierName
      this.handlePersonId = this.personalForm.handlePersonName
      this.personalForm.invoiceType = String(this.personalForm.invoiceType)
      this.inputNumber = this.personalForm.number
      // for (const i in this.personalForm.stockInvoiceDetailVos) {
      //   this.personalForm.stockInvoiceDetailVos[i].taxRate = Number(this.personalForm.stockInvoiceDetailVos[i].taxRate) * 100
      // }
      this.list2 = this.personalForm.stockInvoiceDetailVos
      this.$nextTick(() => {
        this.calculationMoney()
      })
    }
  },
  created() {
    this.getTypes()
    this.getways()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (this.personalForm.isRed === 2) {
        return 'warning-row'
      }
      return ''
    },
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
    stockretreat(val) {
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    stockretreatinfo(val) {
      console.log('stockretreatinfo =====> val', val)
      this.personalForm.address = val.acceptAddress
      this.personalForm.handlePersonId = val.stockPersonId
      this.personalForm.deptId = val.deptId
      this.supplierId = val.supplierName
      this.handlePersonId = val.stockPersonName
      this.personalForm.sourceType = '4'
      this.personalForm.isRed = 2
      // this.list2 = val.stockInvoiceDetailVos
    },
    changeEditNumber(val) {
      if (val !== this.inputNumber && val) {
        this.editNumber = val
      } else {
        this.editNumber = ''
      }
    },
    async  outSource(val) {
      // console.log('val', val)
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

      // console.log('newarr', newarr)
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

      this.list2 = newarr
      this.tableKey = Math.random()
      this.calculationMoney()
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
    jundgeprice() {
      const value = ['1-22-24-115']
      const roles = this.$store.getters && this.$store.getters.roles
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      return hasPermission
    },
    // 审批操作
    handleReview() {
      this.reviewParms = {}
      this.reviewParms.id = this.personalForm.id
      this.reviewParms.judgePersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qsh'), this.$t('prompt.sh'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.tg'),
        cancelButtonText: this.$t('prompt.btg'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.judgeStat = 2
        const parms = JSON.stringify(this.reviewParms)
        updatestockinvoice2(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: this.$t('prompt.shcg')
            })
            this.$emit('rest', true)
            this.editVisible = false
          }
        })
      }).catch(action => {
        if (action === 'cancel') {
          // 取消弹框
          this.$confirm('是否确认审核不通过？', 'Warning', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消'
          })
            .then(() => {
              this.reviewParms.judgeStat = 3
              const parms = JSON.stringify(this.reviewParms)
              updatestockinvoice2(parms).then(res => {
                if (res.data.ret === 200) {
                  this.$message({
                    type: 'success',
                    message: this.$t('prompt.shcg')
                  })
                  this.$emit('rest', true)
                  this.editVisible = false
                } else {
                  this.$notify.error({
                    title: 'wrong',
                    message: res.data.msg,
                    offset: 100
                  })
                }
              })
            })
            .catch(action => {
              this.$message({
                type: 'info',
                message: action === 'cancel'
                  ? '确认取消'
                  : '停留在当前页面'
              })
            })
          // ================取消弹框结束
        }
      })
    },
    // 重置一下下拉
    change() {
      this.$forceUpdate()
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
      this.allNumber = sums[7]
      // this.allMoney = sums[13]
      this.allTaxMoney = sums[15]
      this.allIncludeTaxMoney = sums[14]
      this.allDiscountMoney = sums[12]
      // this.allMoneyMoveDiscount = sums[17]
      // this.alldiscountmoney2 = sums[16]
      return sums
    },
    // 通过折扣额计算折扣
    getdiscountMoney(row) {
      this.calculationMoney()
      console.log(row)
      if (row.includeTaxPrice !== 0 && row.quantity !== 0 && row.discountMoney !== 0) {
        row.discountRate = (((row.discountMoney / row.includeTaxMoney).toFixed(2)) * 100).toFixed(2)
      }
    },
    // 通过折扣计算折扣额
    getdiscountRate(row, scope) {
      this.calculationMoney()

      if (row !== '' && row !== null && row !== undefined && scope.$index === 0) {
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
      if (row.discountRate === 0) {
        row.discountMoney = 0
      } else {
        row.discountMoney = (row.includeTaxPrice * row.quantity * (row.discountRate / 100)).toFixed(2)
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
      // if (row.quantity !== 0) {
      //   row.tax = (row.price * row.taxRate / 100 * row.quantity).toFixed(6)
      // } else {
      //   row.tax = 0
      // }
      // row.tax = (Number(row.includeTaxMoney) - Number(row.money)).toFixed(2)
      row.taxMoney = (((Number(row.includeTaxMoney) - Number(row.discountMoney)) / (1 + (row.taxRate / 100))) * (row.taxRate / 100)).toFixed(2)

      return row.taxMoney
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
      } else if (this.personalForm.sourceType === '3') {
        this.entercontrol = true
      } else if (this.personalForm.sourceType === '4') {
        this.retreatcontrol = true
        if (this.list2.length > 0) {
          console.log('this.list2========>', this.list2)
          this.checklist = this.list2
          console.log('this.checklist', this.checklist)
        } else {
          this.checklist = []
        }
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
      } else if (this.personalForm.sourceType === '3') {
        this.entercontrol = true
      } else if (this.personalForm.sourceType === '4') {
        this.retreatcontrol = true
        if (this.list2.length > 0) {
          console.log('this.list2========>', this.list2)
          this.checklist = this.list2
          console.log('this.checklist', this.checklist)
        } else {
          this.checklist = []
        }
      }
    },
    enter(val) {
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        val[i].quantity = (val[i].actualEnterQuantity - val[i].invoiceQuantity).toFixed(6)
        this.$refs.editable.insertAt(val[i], -1)
      }
    },
    enterinfo(invoicedata) {
      console.log('invoicedata ======> ', invoicedata)
      const val = invoicedata[0]
      // this.personalForm.invoiceNumber = val.invoiceNumber
      this.personalForm.invoiceType = val.invoiceType
      this.personalForm.supplierId = val.supplierId
      this.personalForm.settleMode = val.settleMode
      this.personalForm.address = val.address
      this.personalForm.taxNumber = val.taxNumber
      this.personalForm.bank = val.bank
      this.personalForm.handlePersonId = val.handlePersonId
      this.personalForm.deptId = val.deptId
      this.personalForm.subject = val.subject
      this.personalForm.payDate = val.payDate
      this.supplierId = val.supplierName
      this.handlePersonId = val.handlePersonName
      if (this.personalForm.currency) {
        this.personalForm.currency = String(val.currency)
      }
      if (this.personalForm.invoiceType !== null) {
        this.personalForm.invoiceType = String(val.invoiceType)
      }
      this.personalForm.sourceType = '3'
      this.personalForm.isRed = 2
      const newarr = []
      for (const i in invoicedata) {
        for (const j in invoicedata[i].stockInvoiceDetailVos) {
          if (invoicedata[i].stockInvoiceDetailVos[j].invoiceId === invoicedata[i].id) {
            invoicedata[i].stockInvoiceDetailVos[j].sourceNumber = invoicedata[i].number
            invoicedata[i].stockInvoiceDetailVos[j].taxRate = invoicedata[i].stockInvoiceDetailVos[j].taxRate2
            invoicedata[i].stockInvoiceDetailVos[j].quantity2 = invoicedata[i].stockInvoiceDetailVos[j].quantity
            newarr.push(invoicedata[i].stockInvoiceDetailVos[j])
          }
        }
      }
      console.log('newarr ======> ', newarr)
      // this.list2 = newarr
      for (const x in newarr) {
        this.$refs.editable.insert(newarr[x])
      }
      // this.$refs.editable.insert(val[i])
      // this.list2 = val.stockInvoiceDetailVos
      // for (let i = 0; i < this.list2.length; i++) {
      //   this.list2[i].quantity2 = this.list2[i].quantity
      //   this.list2[i].sourceNumber = val.number
      //   this.list2[i].taxRate = this.list2[i].taxRate2
      // }
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
      this.acceptPersonId = null
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
      delete
      delete this.personalForm.judgeStat
      delete this.personalForm.receiptStat
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
            if (elem.includeTaxPrice !== null || elem.includeTaxPrice !== '' || elem.includeTaxPrice !== undefined) {
              elem.includeTaxPrice = (elem.includeTaxPrice).toFixed(6)
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
          delete this.personalForm.number
          const Data = this.personalForm
          // for (const key in Data) {
          //   if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          //     delete Data[key]
          //   }
          //   if (key === 'judgeStat') {
          //     delete Data[key]
          //   }
          // }
          const parms = JSON.stringify(Data)
          updatestockinvoice(parms, parms2, this.editNumber).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: 'successful',
                message: 'save successful',
                type: 'success',
                offset: 100
              })
              this.$emit('rest', true)
              this.restAllForm()
              this.$refs.editable.clear()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
              this.editVisible = false
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
