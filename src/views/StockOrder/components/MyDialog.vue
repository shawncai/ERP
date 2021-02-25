<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.orderNumber +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息123-->
    <el-card :body-style="{ padding: '5px' }" class="box-card" style="margin-top: 63px" shadow="never">
      <div ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</div>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('StockOrder.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-input v-model="personalForm.title" size="mini" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockOrder.sourceType')" prop="sourceType" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-select v-model="personalForm.sourceType" size="mini" style="margin-left: 18px;width: 200px" @change="chooseType">
                  <el-option value="1" label="采购申请" />
                  <el-option value="2" label="采购计划" />
                  <el-option value="3" label="采购询价单" />
                  <el-option value="4" label="采购合同" />
                  <el-option value="5" label="无来源" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockOrder.supplierId')" prop="supplierId" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-input v-model="supplierId" size="mini" style="margin-left: 18px;width: 200px" clearable @focus="handlechoose"/>
                <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('collectAndPayDetail.cgck')" prop="stockRepositoryId" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-input v-model="stockRepositoryId" placeholder="请选择采购仓库" size="mini" style="margin-left: 18px;width: 200px" @focus="handlechooseRep"/>
              </el-form-item>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockOrder.stockPersonId')" prop="stockPersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-input v-model="stockPersonId" :disabled="IsStockPersonId" size="mini" style="margin-left: 18px;width: 200px" clearable @focus="handlechooseStock"/>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockOrder.stockType')" prop="stockType" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-select v-model="personalForm.stockTypeId" :disabled="IsStockTypeId" size="mini" style="margin-left: 18px;width: 200px" @focus="updatecountry">
                  <el-option
                    v-for="(item, index) in types"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockOrder.deptId')" prop="deptId" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-select v-model="personalForm.deptId" :disabled="IsDeptId" clearable size="mini" style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockOrder.payMode')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-select v-model="personalForm.payMode" :disabled="IsPayMode" size="mini" clearable style="margin-left: 18px;width: 200px">
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
              <el-form-item :label="$t('StockOrder.orderDate')" prop="signDate" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-date-picker
                  v-model="personalForm.orderDate"
                  :picker-options="pickerOptions1"
                  type="date"
                  size="mini"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item :label="$t('StockOrder.signPersonId')" style="width: 100%;">
                <el-input v-model="signPersonId" :disabled="IsSignPersonId" style="margin-left: 18px;width: 200px" clearable @focus="handlechooseDelivery"/>
              </el-form-item>
              <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
            </el-col> -->
            <el-col :span="12">
              <el-form-item :label="$t('StockOrder.deliveryMode')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-select v-model="personalForm.deliveryMode" :disabled="IsDeliveryMode" size="mini" clearable style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in giveIds"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockOrder.settleMode')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-select v-model="personalForm.settleMode" :disabled="IsSettleMode" size="mini" clearable style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in paymentIds"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockOrder.isVat')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-radio-group v-model="personalForm.isVat" style="margin-left: 18px;width: 200px">
                  <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                  <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockOrder.currency')" prop="currency" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-select v-model="personalForm.currency" :disabled="IsCurrency" size="mini" style="margin-left: 18px;width: 200px" @change="changeRate">
                  <el-option value="1" label="PHP"/>
                  <el-option value="2" label="USD"/>
                  <el-option value="3" label="RMB"/>
                  <el-option value="4" label="LKR"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Recycling.exchangeRate')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-input v-model="personalForm.exchangeRate" size="mini" style="margin-left: 18px;width:200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockOrder.supplierNumber')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-input v-model="personalForm.supplierNumber" size="mini" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card :body-style="{ padding: '5px' }" class="box-card" style="margin-top: 15px" shadow="never">
      <div ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">采购订货单明细</div>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button :disabled="addpro" size="mini" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
        <my-detail v-if="editVisible" :control.sync="control" :supp.sync="supp" @product="productdetail"/>
        <el-button :disabled="addsouce" style="width: 130px" @click="handleAddSouce">{{ $t('updates.cydzxz') }}</el-button>
        <my-apply :applycontrol.sync="applycontrol" @apply="apply" @allapplyinfo="allapplyinfo"/>
        <my-plan :plancontrol.sync="plancontrol" :supp.sync="supp" @plan="plan" @allPlaninfo="allPlaninfo"/>
        <my-lnquiry :inquirycontrol.sync="inquirycontrol" :supp.sync="supp" @lnquiry="lnquiry" @allLnquirinfo="allLnquirinfo"/>
        <my-contract :contractcontrol.sync="contractcontrol" :supp.sync="supp" @contract="contract" @allcontractinfo="allcontractinfo"/>
        <el-button type="danger" size="mini" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
      </div>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: true, showStatus: true}"
          :edit-rules="validRules"
          class="click-table1"
          stripe
          border
          size="small"
          style="width: 100%">
          <el-editable-column type="selection" fixed="left" min-width="55" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" fixed="left" min-width="50" align="center" type="index"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" fixed="left" prop="productCode" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" fixed="left" prop="productName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" fixed="left" prop="productType" align="center" min-width="100px"/>
          <el-editable-column :label="$t('updates.ys')" fixed="left" prop="color" align="center" min-width="100px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="100px"/>
          <!-- <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 6}, type: 'visible'}" prop="stockQuantity" align="center" :label="$t('updates.cgsl')" min-width="150px"/> -->
          <!-- <el-editable-column :edit-render="{name: 'ElDatePicker', attrs: {type: 'date', format: 'yyyy-MM-dd'}, type: 'visible'}" prop="deliveryDate" align="center" :label="$t('updates.jhrq')" min-width="170px"/> -->
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 1.00, precision: 6}, type: 'visible'}" :label="$t('updates.cgsl')" prop="stockQuantity" align="center" min-width="150px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="6"
                :min="1.00"
                v-model="scope.row.stockQuantity"
                @change="changenumber(scope.row)"
                @keyup.enter.native="test(scope.row)"/>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElDatePicker', attrs: {type: 'date', format: 'yyyy-MM-dd'}, type: 'visible'}" :label="$t('updates.jhrq')" prop="deliveryDate" align="center" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-date-picker
                v-model="scope.row.deliveryDate"
                value-format="yyyy-MM-dd"
                @change="copydate(scope.row)"/>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.bz')" prop="remarks" align="center" min-width="150px"/>
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
              <p v-show="jundgeprice()">{{ scope.row.includeTaxPrice }}</p>
            </template>
            <!-- <template slot-scope="scope">
                <el-input-number
                  v-show="jundgeprice()"
                  :precision="6"
                  v-model="scope.row.includeTaxPrice"/>
              </template> -->
          </el-editable-column>
          <el-editable-column :label="$t('updates.sl')" prop="taxRate" align="center" min-width="170px">
            <template slot-scope="scope">
              <el-input-number
                v-show="jundgeprice()"
                :precision="6"
                v-model="scope.row.taxRate"
                @input="gettaxRate(scope.row)"/>
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
          <el-editable-column :label="$t('updates.se')" prop="tax" align="center" min-width="150px">
            <template slot-scope="scope">
              <p v-show="jundgeprice()">{{ getTaxMoney2(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.ckl')" prop="discountRate" align="center" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                v-show="jundgeprice()"
                :precision="6"
                v-model="scope.row.discountRate"
                @change="getdiscountRate(scope.row)"/>
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
          <el-editable-column :label="$t('updates.ydbh')" prop="sourceNumber" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ydxh')" prop="sourceSerialNumber" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ydhsl')" prop="arrivalQuantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.thsl')" prop="returnQuantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.sdsl')" prop="actualArrivalQuantity" align="center" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <el-card :body-style="{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 10px">
      <div ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</div>
      <div class="container" style="margin-top: 37px">
        <el-form :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('updates.cgslhj')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-input v-model="personalForm.allQuantity" size="mini" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col v-if="jundgeprice()" :span="12">
              <el-form-item :label="$t('updates.hehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-input v-model="personalForm.allMoney" size="mini" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col v-if="jundgeprice()" :span="12">
              <el-form-item :label="$t('updates.sehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-input v-model="personalForm.allTaxMoney" size="mini" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col v-if="jundgeprice()" :span="12">
              <el-form-item :label="$t('updates.hsjehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-input v-model="personalForm.allIncludeTaxMoney" size="mini" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col v-if="jundgeprice()" :span="12">
              <el-form-item :label="$t('updates.zdzkjehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-input v-model="personalForm.allDiscountMoney" size="mini" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col v-if="jundgeprice()" :span="12">
              <el-form-item :label="$t('updates.zhhsjehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-input v-model="personalForm.allIncludeTaxDiscountMoney" size="mini" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col v-if="jundgeprice()" :span="12">
              <el-form-item :label="$t('updates.cqtfyzchjgjhj')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-input v-model="personalForm.otherMoney" size="mini" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 70px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button size="mini" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        <el-button type="primary" size="mini" @click="handleEditok()">{{ $t('Hmodule.baoc') }}</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { updatestockorder, querytax } from '@/api/StockOrder'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchCategory } from '@/api/Supplier'
import { searchsupplier, getRate } from '@/api/public'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import MySupplier from './MySupplier'
import MyApply from './MyApply'
import MyPlan from './MyPlan'
import MyDelivery from './MyDelivery'
import MyLnquiry from './MyLnquiry'
import MyContract from './MyContract'
import MyRepository from './MyRepository'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  components: { MyContract, MyRepository, MyLnquiry, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp },
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
    const validatePass6 = (rule, value, callback) => {
      console.log(this.stockRepositoryId)
      if (this.stockRepositoryId === undefined || this.stockRepositoryId === null || this.stockRepositoryId === '') {
        callback(new Error('请选择入库仓库'))
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
      console.log(this.signPersonId)
      if (this.signPersonId === undefined || this.signPersonId === null || this.signPersonId === '') {
        callback(new Error('请选择签约人'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(this.stockPersonId)
      if (this.stockPersonId === undefined || this.stockPersonId === null || this.stockPersonId === '') {
        callback(new Error('请选择采购员'))
      } else {
        callback()
      }
    }
    const validatePass4 = (rule, value, callback) => {
      console.log(this.personalForm.deptId)
      if (this.personalForm.deptId === undefined || this.personalForm.deptId === null || this.personalForm.deptId === '') {
        callback(new Error('请选择部门'))
      } else {
        callback()
      }
    }
    return {
      repositorycontrol: false,
      stockRepositoryId: '',
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      // 带入的供应商
      supp: null,
      // 控制币种是否可以编辑
      IsCurrency: false,
      // 控制我方签约人是否可以编辑
      IsSignPersonId: false,
      // 控制支付方式是否可以编辑
      IsPayMode: false,
      // 控制结算方式是否可以编辑
      IsSettleMode: false,
      // 控制交货方式是否可以编辑
      IsDeliveryMode: false,
      // 控制供应商是否可以编辑
      IsSupplierId: false,
      // 控制采购员是否可以编辑
      IsStockPersonId: false,
      // 控制采购类别是否可以编辑
      IsStockTypeId: false,
      // 控制部门是否可以编辑
      IsDeptId: false,
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 合计数据
      allNumber: '',
      allMoney: '',
      allTaxMoney: '',
      allIncludeTaxMoney: '',
      allDiscountMoney: '',
      allMoneyMoveDiscount: '',
      allOhterMoney: '',
      // 交货方式
      giveIds: [],
      // 运送方式
      transportIds: [],
      // 结算方式
      paymentIds: [],
      // 我方签约人回显
      signPersonId: '',
      // 控制我方签约人
      deliverycontrol: false,
      // 控制源单为询价单时
      inquirycontrol: false,
      // 控制源单为采购合同时
      contractcontrol: false,
      // 控制源单为采购计划时
      plancontrol: false,
      // 控制源单为采购申请时
      applycontrol: false,
      // 控制添加商品按钮
      addpro: false,
      // 控制从源单中选择按钮
      addsouce: true,
      // 供应商回显
      supplierId: '',
      // 控制供应商
      empcontrol: false,
      // 部门数据
      depts: [],
      payModes: [],
      // 采购员回显
      stockPersonId: '',
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
      // 采购申请单规则数据
      personalrules: {
        stockRepositoryId: [
          { required: true, validator: validatePass6, trigger: 'change' }
        ],
        signPersonId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        stockPersonId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        supplierId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        orderDate: [
          { required: true, message: '请选择询价日期', trigger: 'change' }
        ],
        deptId: [
          { required: true, validator: validatePass4, trigger: 'change' }
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
        stockQuantity: [
          { required: true, message: '请输入采购数量', trigger: 'blur' }
        ],
        // includeTaxPrice: [
        //   { required: true, message: '请输入含税价', trigger: 'blur' }
        // ],
        deliveryDate: [
          { required: true, message: '请输入交货日期', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.applyPersonId = this.personalForm.applyPersonName
      if (this.personalForm.sourceType === '2' || this.personalForm.sourceType === 2) {
        this.addsouce = false
      }
      this.supplierId = this.personalForm.supplierName
      this.supp = this.personalForm.supplierId
      this.stockPersonId = this.personalForm.stockPersonName
      this.signPersonId = this.personalForm.signPersonName
      this.stockRepositoryId = this.personalForm.stockRepositoryName
      this.personalForm.id = this.personalForm.parentId
      this.list2 = this.personalForm.stockOrderDetailVos
      this.changeRate()
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
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.stockRepositoryId = val.repositoryName
      this.personalForm.stockRepositoryId = val.id
    },
    // 处理汇率
    changeRate() {
      console.log(123)
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
    changenumber(row) {
      if (row.stockQuantity === 1 || row.stockQuantity === '' || row.stockQuantity === null || row.stockQuantity === undefined) {
        return false
      }
      let re = 1
      for (let i = 0; i < this.list2.length; i++) {
        if (this.list2[i].stockQuantity !== 1) {
          re++
        }
      }
      if (re === 2) {
        for (let i = 0; i < this.list2.length; i++) {
          this.list2[i].stockQuantity = row.stockQuantity
        }
      }
    },
    copydate(row) {
      if (row.deliveryDate === '' || row.deliveryDate === null || row.deliveryDate === undefined) {
        return false
      }
      for (let i = 0; i < this.list2.length; i++) {
        this.list2[i].temp = i
      }
      for (let i = row.temp; i < this.list2.length; i++) {
        console.log(this.list2[i].deliveryDate)
        if (this.list2[i].deliveryDate !== null && this.list2[i].deliveryDate !== '' && this.list2[i].deliveryDate !== undefined) {
          console.log(111)
          continue
        } else {
          console.log(222)
          this.list2[i].deliveryDate = row.deliveryDate
        }
      }
      console.log(row)
    },
    test(row) {
      console.log(row.stockQuantity)
      for (let i = 0; i < this.list2.length; i++) {
        this.list2[i].temp = i
      }
      for (let i = row.temp; i < this.list2.length; i++) {
        this.list2[i].stockQuantity = row.stockQuantity
      }
    },
    // 重置一下下拉
    change() {
      this.$forceUpdate()
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
      sums[2] = ''
      sums[3] = ''
      sums[4] = ''
      sums[5] = ''
      sums[7] = ''
      sums[8] = ''
      sums[9] = ''
      sums[13] = ''
      sums[14] = ''
      sums[16] = ''
      sums[17] = ''
      sums[18] = ''
      sums[19] = ''
      this.allNumber = sums[6]
      this.allMoney = sums[10]
      this.allTaxMoney = sums[12]
      this.allIncludeTaxMoney = sums[11]
      this.allDiscountMoney = sums[15]
      this.allMoneyMoveDiscount = sums[11] - sums[15]
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
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.payModes = res.data.data.content.list
        }
      })
      // 结算方式
      searchCategory(5).then(res => {
        if (res.data.ret === 200) {
          this.paymentIds = res.data.data.content.list
        }
      })
    },
    // 通过折扣额计算折扣
    getdiscountMoney(row) {
      console.log(row)
      if (row.includeTaxPrice !== 0 && row.stockQuantity !== 0 && row.discountMoney !== 0) {
        row.discountRate = (((row.discountMoney / row.includeTaxMoney).toFixed(6)) * 100).toFixed(6)
      }
    },
    // 通过折扣计算折扣额
    getdiscountRate(row) {
      if (row.discountRate === 0) {
        row.discountMoney = row.includeTaxPrice * row.stockQuantity
      } else {
        row.discountMoney = (row.includeTaxPrice * row.stockQuantity * (row.discountRate / 100)).toFixed(6)
      }
    },
    // 通过税率计算含税价
    gettaxRate(row) {
      console.log('row', row)
      // if (row.includeTaxPrice !== 0) {
      //   row.includeTaxPrice = (row.price * (1 + row.taxRate / 100)).toFixed(6)
      // }
      if (row.flag === undefined) {
        row.flag = true
      } else {
        return row.taxRate
      }
      // 默认批次
      if (row.flag) {
        if (this.personalForm.sourceType === '5' || this.personalForm.sourceType === '2') {
          // 查询供应商价格
          querytax(this.personalForm.supplierId, row.productCode).then(res => {
            if (res.data.data.content.length > 0) {
              row.price = res.data.data.content[0].price || 0
              row.taxRate = res.data.data.content[0].taxRate || 0
              row.includeTaxPrice = res.data.data.content[0].includeTaxPrice || 0
            } else {
              this.$notify.error({
                title: 'wrong',
                message: '未查询到商品',
                duration: 0
              })
            }
          })
        }
      }
      row.flag = false
    },
    // 通过含税价计算税率
    getincludeTaxPrice(row) {
      if (row.price !== 0) {
        row.taxRate = ((row.includeTaxPrice / row.price - 1) * 100).toFixed(6)
        console.log(row.taxRate)
      }
    },
    // 计算单价
    getprice(row) {
      row.includeTaxPrice = (row.price * (1 + row.taxRate / 100)).toFixed(6)
    },
    // 计算税额
    getTaxMoney2(row) {
      row.tax = (row.price * row.taxRate / 100 * row.stockQuantity).toFixed(6)
      return row.tax
    },
    // 计算含税金额
    getTaxMoney(row) {
      row.includeTaxMoney = (row.stockQuantity * row.includeTaxPrice).toFixed(6)
      row.discountMoney = (row.includeTaxPrice * row.stockQuantity * (row.discountRate / 100)).toFixed(6)
      return row.includeTaxMoney
    },
    // 计算金额
    getMoney(row) {
      row.money = (row.stockQuantity * row.price).toFixed(6)
      return row.money
    },
    // 选择源单类型事件
    chooseType() {
      console.log(this.personalForm.sourceType)
      if (this.personalForm.sourceType === '1') {
        this.addsouce = false
        this.addpro = false
        this.IsSupplierId = false
        this.IsStockPersonId = false
        this.IsPayMode = false
        this.IsSignPersonId = false
        this.IsDeliveryMode = false
        this.IsSettleMode = false
        this.IsCurrency = false
        const ceshi2 = this.$refs.editable.getRecords()
        console.log(ceshi2)
        for (let i = 0; i < ceshi2.length; i++) {
          if (ceshi2[i].sourceNumber !== '' && ceshi2[i].sourceNumber !== null && ceshi2[i].sourceNumber !== undefined) {
            this.$refs.editable.remove(ceshi2[i])
          }
        }
        // if (this.$refs.editable.getRecords().length !== 0) {
        //   this.$refs.editable.clear()
        // }
      } else if (this.personalForm.sourceType === '2') {
        this.addsouce = false
        this.addpro = false
        this.IsSupplierId = false
        this.IsPayMode = false
        this.IsSignPersonId = false
        this.IsDeliveryMode = false
        this.IsSettleMode = false
        this.IsCurrency = false
        if (this.$refs.editable.getRecords().length !== 0) {
          const ceshi2 = this.$refs.editable.getRecords()
          console.log(ceshi2)
          for (let i = 0; i < ceshi2.length; i++) {
            if (ceshi2[i].sourceNumber !== '' && ceshi2[i].sourceNumber !== null && ceshi2[i].sourceNumber !== undefined) {
              this.$refs.editable.remove(ceshi2[i])
            }
          }
        }
      } else if (this.personalForm.sourceType === '3') {
        this.addsouce = false
        this.addpro = false
        this.IsStockPersonId = false
        this.IsPayMode = false
        this.IsSignPersonId = false
        this.IsCurrency = false
        if (this.$refs.editable.getRecords().length !== 0) {
          const ceshi2 = this.$refs.editable.getRecords()
          console.log(ceshi2)
          for (let i = 0; i < ceshi2.length; i++) {
            if (ceshi2[i].sourceNumber !== '' && ceshi2[i].sourceNumber !== null && ceshi2[i].sourceNumber !== undefined) {
              this.$refs.editable.remove(ceshi2[i])
            }
          }
        }
      } else if (this.personalForm.sourceType === '4') {
        this.addsouce = false
        this.addpro = false
        this.IsSupplierId = false
        if (this.$refs.editable.getRecords().length !== 0) {
          const ceshi2 = this.$refs.editable.getRecords()
          console.log(ceshi2)
          for (let i = 0; i < ceshi2.length; i++) {
            if (ceshi2[i].sourceNumber !== '' && ceshi2[i].sourceNumber !== null && ceshi2[i].sourceNumber !== undefined) {
              this.$refs.editable.remove(ceshi2[i])
            }
          }
        }
      } else if (this.personalForm.sourceType === '5') {
        this.addpro = false
        this.addsouce = true
        this.IsStockPersonId = false
        this.IsStockTypeId = false
        this.IsDeptId = false
        this.IsDeliveryMode = false
        this.IsSettleMode = false
        this.IsPayMode = false
        this.IsSignPersonId = false
        this.currency = false
        this.IsSupplierId = false
        if (this.$refs.editable.getRecords().length !== 0) {
          const ceshi2 = this.$refs.editable.getRecords()
          console.log(ceshi2)
          for (let i = 0; i < ceshi2.length; i++) {
            if (ceshi2[i].sourceNumber !== '' && ceshi2[i].sourceNumber !== null && ceshi2[i].sourceNumber !== undefined) {
              this.$refs.editable.remove(ceshi2[i])
            }
          }
        }
      }
    },
    // 从源单中添加商品
    handleAddSouce() {
      console.log(this.personalForm.supplierId)
      if (this.personalForm.sourceType === '1') {
        this.applycontrol = true
      } else if (this.personalForm.sourceType === '2') {
        if (this.personalForm.supplierId === null || this.personalForm.supplierId === undefined || this.personalForm.supplierId === '') {
          this.$notify.error({
            title: 'wrong',
            message: '请先选择供应商',
            duration: 0
          })
          return false
        }
        this.plancontrol = true
      } else if (this.personalForm.sourceType === '3') {
        if (this.personalForm.supplierId === null || this.personalForm.supplierId === undefined || this.personalForm.supplierId === '') {
          this.$notify.error({
            title: 'wrong',
            message: '请先选择供应商',
            duration: 0
          })
          return false
        }
        this.inquirycontrol = true
      } else if (this.personalForm.sourceType === '4') {
        if (this.personalForm.supplierId === null || this.personalForm.supplierId === undefined || this.personalForm.supplierId === '') {
          this.$notify.error({
            title: 'wrong',
            message: '请先选择供应商',
            duration: 0
          })
          return false
        }
        this.contractcontrol = true
      }
      if (this.$refs.editable.getRecords().length !== 0) {
        this.$refs.editable.clear()
      }
    },
    // 采购合同加载过来数据
    contract(val) {
      console.log(val)
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
    allcontractinfo(val) {
      console.log(val)
      if (val.stockPersonId === null || val.stockPersonId === '' || val.stockPersonId === undefined) {
        this.IsStockPersonId = false
      } else {
        this.stockPersonId = val.stockPersonName
        this.personalForm.stockPersonId = val.stockPersonId
        this.IsStockPersonId = true
      }
      if (val.stockType === null || val.stockType === '' || val.stockType === undefined) {
        this.IsStockTypeId = false
      } else {
        this.personalForm.stockType = val.stockType
        this.IsStockTypeId = true
      }
      if (val.deptId === null || val.deptId === '' || val.deptId === undefined) {
        this.IsDeptId = false
      } else {
        this.personalForm.deptId = val.deptId
        this.IsDeptId = true
      }
      this.personalForm.isVat = val.isVat
      this.personalForm.payMode = String(val.payId)
      this.signPersonId = val.ourContractorName
      this.personalForm.signPersonId = val.ourContractorId
      this.personalForm.deliveryMode = val.deliveryMode
      this.personalForm.settleMode = val.settleId
      this.personalForm.currency = String(val.currency)
      // this.getRate()
    },
    // 采购询价单加载过来数据
    lnquiry(val) {
      console.log(val)
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
    allLnquirinfo(val) {
      if (val.stockType === null || val.stockType === '' || val.stockType === undefined) {
        this.IsStockTypeId = false
      } else {
        this.personalForm.stockTypeId = val.stockTypeId
        this.IsStockTypeId = true
      }
      if (val.deptId === null || val.deptId === '' || val.deptId === undefined) {
        this.IsDeptId = false
      } else {
        this.personalForm.deptId = val.deptId
        this.IsDeptId = true
      }
      searchsupplier(val.supplierName).then(res => {
        if (res.data.ret === 200) {
          console.log(res)
          if (res.data.data.content.list[0].giveId === null || res.data.data.content.list[0].giveId === '' || res.data.data.content.list[0].giveId === undefined) {
            this.IsDeliveryMode = false
          } else {
            this.personalForm.deliveryMode = res.data.data.content.list[0].giveId
            this.IsDeliveryMode = true
          }
          this.personalForm.transferId = res.data.data.content.list[0].transportId
          if (res.data.data.content.list[0].paymentId === null || res.data.data.content.list[0].paymentId === '' || res.data.data.content.list[0].paymentId === undefined) {
            this.IsSettleMode = false
          } else {
            this.personalForm.settleMode = res.data.data.content.list[0].paymentId
            this.IsSettleMode = true
          }
        }
        this.getways()
      })
      this.getways()
    },
    // 采购申请加载过来数据
    apply(val) {
      this.$refs.editable.clear()
      console.log('val', val)
      console.log('this.supplierDetailVos', this.supplierDetailVos)
      let re = 1
      for (const x in val) {
        for (const j in this.supplierDetailVos) {
          if (this.supplierDetailVos[j].productCode === val[x].productCode) {
            val[x].price = this.supplierDetailVos[j].price
            val[x].stockQuantity = val[x].planQuantity - val[x].applyQuantity
            this.$refs.editable.insert(val[x])
            re = 2
          }
        }
      }
      if (re === 1) {
        this.$notify.error({
          title: 'wrong',
          message: '源单中的商品该供应商都无法提供',
          offset: 100
        })
      }
    },
    allapplyinfo(val) {
      console.log(val)
      if (val.stockType === null || val.stockType === '' || val.stockType === undefined) {
        this.IsStockTypeId = false
      } else {
        this.personalForm.stockTypeId = val.stockType
        this.IsStockTypeId = true
      }
      if (val.applyDeptId === null || val.applyDeptId === '' || val.applyDeptId === undefined) {
        this.IsDeptId = false
      } else {
        this.personalForm.deptId = val.applyDeptId
        this.IsDeptId = true
      }
    },
    // 采购计划加载过来数据
    plan(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      const quchonggong = this.personalForm.supplierId
      console.log('quchonggong', quchonggong)
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
        console.log('val[i].supplierId', val[i].supplierId)
        if (val[i].supplierId !== quchonggong) {
          console.log(1234)
          continue
        }
        val[i].stockQuantity = (val[i].planQuantity - val[i].orderQuantity).toFixed(6)
        this.$refs.editable.insert(val[i])
      }
    },
    allPlaninfo(val) {
      if (val.stockType === null || val.stockType === '' || val.stockType === undefined) {
        this.IsStockTypeId = false
      } else {
        this.personalForm.stockTypeId = val.stockType
        this.IsStockTypeId = true
      }
      if (val.stockDeptId === null || val.stockDeptId === '' || val.stockDeptId === undefined) {
        this.IsDeptId = false
      } else {
        this.personalForm.deptId = val.stockDeptId
        this.IsDeptId = true
      }
      if (val.stockPersonId === null || val.stockPersonId === '' || val.stockPersonId === undefined) {
        this.IsStockPersonId = false
      } else {
        this.stockPersonId = val.stockPersonName
        this.personalForm.stockPersonId = val.stockPersonId
        this.IsStockPersonId = true
      }
      // this.personalForm.isVat = val.isVat
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
      this.supp = val.id
      this.$refs.editable.clear()
    },
    // 采购员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 采购员回显
    stockName(val) {
      this.stockPersonId = val.personName
      this.personalForm.stockPersonId = val.id
    },
    // 我方签约人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.signPersonId = val.personName
      this.personalForm.signPersonId = val.id
    },
    // 采购申请明细来源
    handleAddproduct() {
      if (this.personalForm.supplierId === null || this.personalForm.supplierId === undefined || this.personalForm.supplierId === '') {
        this.$notify.error({
          title: 'wrong',
          message: '请先选择供应商',
          duration: 0
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
        isVat: 1,
        sourceType: '5',
        currency: '1'
      }
      this.personalForm.orderDate = new Date()
      this.supplierId = null
      this.inquiryPersonId = null
      this.stockPersonId = null
      this.signPersonId = null
      // 控制币种是否可以编辑
      this.IsCurrency = false
      // 控制我方签约人是否可以编辑
      this.IsSignPersonId = false
      // 控制支付方式是否可以编辑
      this.IsPayMode = false
      // 控制结算方式是否可以编辑
      this.IsSettleMode = false
      // 控制交货方式是否可以编辑
      this.IsDeliveryMode = false
      // 控制供应商是否可以编辑
      this.IsSupplierId = false
      // 控制采购员是否可以编辑
      this.IsStockPersonId = false
      // 控制采购类别是否可以编辑
      this.IsStockTypeId = false
      // 控制部门是否可以编辑
      this.IsDeptId = false
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
      delete this.personalForm.judgeStat
      delete this.personalForm.receiptStat
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate().then(valid => {
            const EnterDetail = this.deepClone(this.$refs.editable.getRecords())
            if (EnterDetail.length === 0) {
              this.$notify.error({
                title: 'wrong',
                message: this.$t('prompt.mxbbnwk'),
                offset: 100
              })
              return false
            }
            let ll = 1
            let ll3 = 1
            let ll4 = ''
            console.log('ll', ll)
            EnterDetail.map(function(elem) {
              return elem
            }).forEach(function(elem) {
              if (elem.stockQuantity === 0) {
                ll = 2
              }
              if (elem.price === 0) {
                ll3 = 2
                ll4 = elem.productName
              }
            })
            if (ll3 === 2) {
              this.$notify.error({
                title: 'wrong',
                message: ll4 + '的采购单价不能为0',
                offset: 100
              })
              return false
            }
            console.log('ll', ll)
            if (ll === 2) {
              this.$notify.error({
                title: 'wrong',
                message: '采购数量不能为0',
                offset: 100
              })
              return false
            }
            let ll2 = 1
            console.log('ll2', ll2)
            const date = this.personalForm.orderDate
            EnterDetail.map(function(elem) {
              return elem
            }).forEach(function(elem) {
              console.log('elem.deliveryDate', elem.deliveryDate)
              console.log('elem.deliveryDate', Date.parse(elem.deliveryDate))
              console.log('this.personalForm.orderDate', date)
              console.log('this.personalForm.orderDate', Date.parse(date))
              if (Date.parse(elem.deliveryDate) < Date.parse(date)) {
                ll2 = 2
              }
              console.log('ll2', ll2)
            })
            console.log('ll2', ll2)
            if (ll2 === 2) {
              this.$notify.error({
                title: 'wrong',
                message: '交货日期不能早于下单日期',
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
              elem.typeId = elem.type
              if (elem.type === null || elem.type === '' || elem.type === undefined) {
                delete elem.type
              }
              if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
                delete elem.unit
              }
              if (elem.price === null || elem.price === '' || elem.price === undefined) {
                delete elem.price
              }
              if (elem.stockQuantity === null || elem.stockQuantity === '' || elem.stockQuantity === undefined) {
                elem.stockQuantity = 1
              }
              if (elem.deliveryDate === null || elem.deliveryDate === '' || elem.deliveryDate === undefined) {
                delete elem.deliveryDate
              }
              if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
                delete elem.remarks
              }
              if (elem.sourceNumber === null || elem.sourceNumber === '' || elem.sourceNumber === undefined) {
                delete elem.sourceNumber
              }
              if (elem.sourceSerialNumber === null || elem.sourceSerialNumber === '' || elem.sourceSerialNumber === undefined) {
                delete elem.sourceSerialNumber
              }
              if (elem.includeTaxPrice === null || elem.includeTaxPrice === '' || elem.includeTaxPrice === undefined) {
                elem.includeTaxPrice = 0
              }
              if (elem.taxRate !== null || elem.taxRate !== '' || elem.taxRate !== undefined) {
                elem.taxRate = elem.taxRate / 100
              }
              if (elem.taxRate === null || elem.taxRate === '' || elem.taxRate === undefined) {
                elem.taxRate = 0
              }
              if (elem.discountRate === null || elem.discountRate === '' || elem.discountRate === undefined) {
                elem.discountRate = 0
              }
              if (elem.discountRate !== null || elem.discountRate !== '' || elem.discountRate !== undefined) {
                elem.discountRate = elem.discountRate / 100
              }
              if (elem.money === null || elem.money === '' || elem.money === undefined) {
                elem.money = 0
              }
              if (elem.includeTaxMoney === null || elem.includeTaxMoney === '' || elem.includeTaxMoney === undefined) {
                elem.includeTaxMoney = 0
              }
              if (elem.tax === null || elem.tax === '' || elem.tax === undefined) {
                elem.tax = 0
              }
              if (elem.discountMoney === null || elem.discountMoney === '' || elem.discountMoney === undefined) {
                elem.discountMoney = 0
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
            updatestockorder(parms, parms2).then(res => {
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
          }).catch(valid => {
            console.log('error submit!!', valid)
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
