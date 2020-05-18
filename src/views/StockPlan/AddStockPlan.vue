<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card :body-style="{ padding: '5px' }" class="box-card" shadow="never">
        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('collectAndPayDetail.cgck')" prop="planRepositoryId" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="planRepositoryId" placeholder="请选择采购仓库" size="mini" style="margin-left: 18px;width: 200px" @focus="handlechooseRep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockPlan.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="personalForm.title" size="mini" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockPlan.stockType')" prop="stockType" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-select v-model="personalForm.stockType" size="mini" style="margin-left: 18px;width: 200px" @focus="updatecountry" @change="change()">
                    <el-option
                      v-for="(item, index) in types"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockPlan.planPersonId')" prop="planPersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="planPersonId" size="mini" style="margin-left: 18px;width:200px" @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockPlan.stockPersonId')" prop="stockPersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="stockPersonId" size="mini" style="margin-left: 18px;width:200px" @focus="handlechooseDelivery"/>
                  <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockPlan.stockDeptId')" prop="stockDeptId" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-select v-model="personalForm.stockDeptId" size="mini" style="margin-left: 18px;width: 200px" @change="change()">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockPlan.sourceType')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-select v-model="personalForm.sourceType" size="mini" style="margin-left: 18px;width: 200px" @change="chooseType">
                    <el-option :label="$t('route.StockApply')" value="1" />
                    <el-option :label="$t('route.StockRequire')" value="2" />
                    <el-option :label="$t('AccessMaterials.Nosource')" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockPlan.planDate')" prop="planDate" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-date-picker
                    v-model="personalForm.planDate"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    size="mini"
                    style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card :body-style="{ padding: '5px' }" class="box-card" style="margin-top: 15px" shadow="never">
        <div ref="fuzhu" class="form-name" >{{ $t('updates.cgjhjlymx') }}</div>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button :disabled="addpro" size="mini" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <my-detail :control.sync="control" @product="productdetail" @product2="productdetail2"/>
          <el-button :disabled="addsouce" size="mini" style="width: 130px" @click="handleAddSouce">{{ $t('updates.cydzxz') }}</el-button>
          <my-apply :applycontrol.sync="applycontrol" @apply="apply" @apply2="apply2" @allinfo="allinfo"/>
          <my-require :requirecontrol.sync="requirecontrol" @require="requiredata" @require2="requiredata2"/>
          <el-button type="danger" size="mini" @click="deleteEdit">{{ $t('Hmodule.delete') }}</el-button>
          <el-button type="primary" size="mini" @click="checkStock()">{{ $t('updates.kckz') }}</el-button>
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
            style="width: 100%"
            @selection-change="deleteChange">
            <el-editable-column type="selection" fixed="left" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" fixed="left" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" fixed="left" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" fixed="left" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" fixed="left" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" fixed="left" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.cgjhj')" prop="basicPrice" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ basicPrice(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.kcsl')" prop="inventoryQuantity" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.xqsl')" prop="requireQuantity" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ysxqsl')" prop="requireQuantity2" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.xqrq')" prop="requireDate" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: -0.01, precision: 6}, type: 'visible' ,events: {change: changeDate}}" :label="$t('updates.jhsl')" prop="planQuantity" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.jhje')" prop="planMoney" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ planMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElDatePicker', attrs: {type: 'date', format: 'yyyy-MM-dd'}, type: 'visible', events: {change: changeDate}}" :label="$t('updates.jhjhrq')" prop="planDeliveryDate" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.planDeliveryDate"
                  :picker-options="pickerOptions1"
                  type="date"
                  size="mini"
                  value-format="yyyy-MM-dd"
                  @change="changeDate(scope)"/>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.sqyy')" prop="applyReason" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ydbh')" prop="sourceNumber" align="center" min-width="150px"/>
            <!--            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.gys')" prop="supplierName" align="center" min-width="150px">-->
            <!--              <template slot="edit" slot-scope="scope">-->
            <!--                <el-input v-model="scope.row.supplierName" @focus="handlechoose(scope)"/>-->
            <!--                <my-supplier :control.sync="empcontrol" :procode="procode" @supplierName="personName(scope, $event)"/>-->
            <!--              </template>-->
            <!--            </el-editable-column>-->
            <el-editable-column :edit-render="{type: 'default'}" :label="$t('updates.gys')" prop="supplierId" align="center" width="200px">
              <template slot-scope="scope">
                <el-select v-model="scope.row.supplierId" :value="scope.row.supplierId" filterable size="mini" style="margin-left: 18px;width: 100%;margin-bottom: 0;" @visible-change="updatesupp($event,scope)" @change="changeDate2($event,scope)">
                  <el-option
                    v-for="item in suppliers"
                    :key="item.id"
                    :value="item.id"
                    :label="item.supplierName"/>
                </el-select>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.ydgsl')" prop="orderQuantity" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ydxh')" prop="sourceSerialNumber" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card :body-style="{ padding: '5px' }" class="box-card" style="margin-top: 15px" shadow="never">
        <div ref="fuzhu" class="form-name" >{{ $t('updates.cgjhmx') }}</div>
        <div class="container">
          <el-editable
            ref="editable2"
            :data.sync="list3"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules"
            :summary-method="getSummaries"
            show-summary
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%">
            <el-editable-column :label="$t('Hmodule.xh')" width="60" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.cgjhj')" prop="basicPrice" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ basicPrice(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.jhsl')" prop="planQuantity" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ planQuantity(scope.row) }}</p>
              </template>
            </el-editable-column>
            <!-- <el-editable-column :label="$t('updates.jhje')" prop="planMoney" align="center" min-width="150px"/> -->
            <el-editable-column :edit-render="{name: 'ElDatePicker', attrs: {type: 'date', format: 'yyyy-MM-dd'}, type: 'default'}" :label="$t('updates.jhjhrq')" prop="planDeliveryDate" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.planDeliveryDate"
                  :picker-options="pickerOptions1"
                  type="date"
                  value-format="yyyy-MM-dd"
                />
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.sqyy')" prop="applyReason" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ydbh')" prop="sourceNumber" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.gys')" prop="supplierName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ydgsl')" prop="orderQuantity" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ydxh')" prop="sourceSerialNumber" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card :body-style="{ padding: '5px' }" class="box-card" shadow="never" style="margin-bottom:20px;">
        <div ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('StockPlan.heji1')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="personalForm.allMoney" size="mini" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockPlan.heji2')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="personalForm.totalQuantity" size="mini" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index:2000;">
        <el-button v-no-more-click :loading="canclick" size="mini" type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" size="mini" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
      <el-dialog :visible.sync="receiptVisible2" title="库存快照" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="width: 500px;">
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
import { getStockInfoByProduct } from '@/api/Supplier'
// import { materialslist2 } from '@/api/MaterialsList'
import { search2 } from '@/api/Supplier'
import { countlist } from '@/api/public'
import { addstockplan } from '@/api/StockPlan'
import { getdeptlist } from '@/api/BasicSettings'
// import { productlist } from '@/api/public'
import { searchStockCategory } from '@/api/StockCategory'
import MyEmp from './components/MyEmp'
import MyDelivery from '../DailyAdjust/components/MyDelivery'
import MyDetail from './components/MyDetail'
import MyApply from './components/MyApply'
import MySupplier from './components/MySupplier'
import MyRequire from './components/MyRequire'
import MyRepository from './components/MyRepository'

var _that
export default {
  name: 'AddStockPlan',
  components: { MyRequire, MySupplier, MyApply, MyDetail, MyDelivery, MyEmp, MyRepository },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(this.planPersonId)
      if (this.planPersonId === undefined || this.planPersonId === null || this.planPersonId === '') {
        callback(new Error('请选择计划员'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(this.stockPersonId)
      if (this.stockPersonId === undefined || this.stockPersonId === null || this.stockPersonId === '') {
        callback(new Error('请选择采购员'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(this.personalForm.stockDeptId)
      if (this.personalForm.stockDeptId === undefined || this.personalForm.stockDeptId === null || this.personalForm.stockDeptId === '') {
        callback(new Error('请选择采购部门'))
      } else {
        callback()
      }
    }
    const validatePass4 = (rule, value, callback) => {
      console.log(this.personalForm.stockType)
      if (this.personalForm.stockType === undefined || this.personalForm.stockType === null || this.personalForm.stockType === '') {
        callback(new Error('请选择采购类别'))
      } else {
        callback()
      }
    }
    const validatePass5 = (rule, value, callback) => {
      console.log(value)
      if (value === undefined || value === null || value === '') {
        // callback(new Error('请选择供应商'))
        this.$notify.error({
          title: 'wrong',
          message: '供应商不能为空',
          offset: 100
        })
        return false
      } else {
        callback()
      }
    }
    const validatePass6 = (rule, value, callback) => {
      console.log(this.planRepositoryId)
      if (this.planRepositoryId === undefined || this.planRepositoryId === null || this.planRepositoryId === '') {
        callback(new Error('请选择采购仓库'))
      } else {
        callback()
      }
    }
    return {
      repositorycontrol: false,
      planRepositoryId: this.$store.getters.repositoryName,
      suppliers: [],
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      // 传商品code去获取能提供这个商品的供应商
      procode: null,
      // 控制scope
      kongscope: '',
      // 合计数据
      heji1: '',
      heji2: '',
      // 供应商控制
      empcontrol: false,
      // 控制从采购需求中选择
      requirecontrol: false,
      // 控制从采购申请中选择
      applycontrol: false,
      // 控制添加商品按钮
      addpro: true,
      // 控制从源单中选择按钮
      addsouce: true,
      // 选择的数据
      choosedata: [],
      // 部门数据
      depts: [],
      // 计划人回显
      planPersonId: this.$store.getters.name,
      // 控制计划人
      stockControl: false,
      // 采购员回显
      stockPersonId: this.$store.getters.name,
      // 控制采购员
      deliverycontrol: false,
      // 类别数据
      types: [],
      // 类别获取参数
      typeparms: {
        pagenum: 1,
        pagesize: 99999
      },
      // 控制商品列表窗口
      control: false,
      // 采购计划单信息数据
      personalForm: {
        stockDeptId: this.$store.getters.deptId,
        createPersonId: this.$store.getters.userId,
        stockPersonId: this.$store.getters.userId,
        planPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        planRepositoryId: this.$store.getters.repositoryId,
        sourceType: '3',
        totalQuantity: '',
        allMoney: '',
        planDate: null
      },
      // 采购计划单规则数据
      personalrules: {
        planRepositoryId: [
          { required: true, validator: validatePass6, trigger: 'change' }
        ],
        stockType: [
          { required: true, validator: validatePass4, trigger: 'change' }
        ],
        planDate: [
          { required: true, message: '请选择计划日期', trigger: 'change' }
        ],
        stockDeptId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        planPersonId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        stockPersonId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ]
      },
      // 采购计划单明细数据
      list2: [],
      // 采购计划明细
      list3: [],
      // 采购计划单明细列表规则
      validRules: {
        planQuantity: [
          { required: true, message: '请输入计划数量', trigger: 'blur' }
        ],
        planDeliveryDate: [
          { required: true, message: '请输入计划交货日期', trigger: 'change' }
        ]
      },
      receiptVisible2: false,
      list111: [],
      // 批量操作
      moreaction: [],
      canclick: false
    }
  },
  created() {
    this.getTypes()
    this.getdatatime()
    this.chooseType()
  },

  mounted() {
    this.getinformation()
  },
  activated() {
    this.getinformation()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.planRepositoryId = val.repositoryName
      this.personalForm.planRepositoryId = val.id
    },
    async changeDate2(event, scope) {
      console.log('event', event)
      const param = {}
      param.id = scope.row.supplierId
      // eslint-disable-next-line no-return-assign
      const a = this.suppliers.find(item => item.id = event)
      console.log('this.suppliers', this.suppliers)
      scope.row.supplierName = a.supplierName
      console.log('scope.row', scope.row)
      // scope.row.productCode
      this.changeDate()
    },
    updatesupp(event, scope) {
      if (event === true) {
        console.log(scope.row.productCode)
        const param = {}
        param.productCode = scope.row.productCode
        param.isEffective = 1
        param.pagenum = 1
        param.pagesize = 9999
        search2(param).then(res => {
          if (res.data.ret === 200) {
            this.suppliers = res.data.data.content.list
          }
        })
        console.log('this.location', this.suppliers)
      }
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
    async getinformation() {
      if (this.$store.getters.empcontract) {
        if (this.$store.getters.empcontract.length) {
          this.personalForm.sourceType = '2'
          this.chooseType()
          const requiredata = this.$store.getters.empcontract
          const requireDetail = requiredata.map(function(item) {
            return {
              productCode: item.productCode,
              productName: item.productName,
              productType: item.productType,
              typeId: item.typeId,
              unit: item.unit,
              color: item.color,
              basicQuantity: item.requireQuantity,
              planDeliveryDate: item.requireDate,
              applyReason: '',
              sourceNumber: item.materialsRequireNumber,
              supplierId: '',
              supplierName: '',
              basicPrice: 0,
              planMoney: '0.00',
              orderQuantity: '0.00',
              stockRequireId: item.id,
              requireDate: item.requireDate,
              sourceSerialNumber: item.id,
              requireQuantity: item.requireQuantity,
              planedQuantity: item.planedQuantity,
              planQuantity: item.shouldStockQuantity - item.planedQuantity,
              inventoryQuantity: item.inventoryQuantity
            }
          })
          const list = await Promise.all(requireDetail.map(function(item) {
            return getStockInfoByProduct(item.productCode, item.planQuantity).then(res => {
              for (let i = 0; i < res.data.data.content.length; i++) {
                res.data.data.content[i].sourceNumber = item.sourceNumber
              }
              return res.data.data.content
            })
          }))
          console.log('list', list)
          const list2 = []
          for (let i = 0; i < list.length; i++) {
            for (let m = 0; m < list[i].length; m++) {
              list[i][m].basicPrice = list[i][m].price
              list[i][m].requireQuantity = list[i][m].quantity
              list[i][m].basicQuantity = list[i][m].quantity
              list2.push(list[i][m])
            }
          }
          const list3 = []
          console.log('list2', list2)
          console.log('requireDetail', requireDetail)
          for (const i in list2) {
            for (const j in requireDetail) {
              if (list2[i].productCode === requireDetail[j].productCode) {
                list2[i].sourceSerialNumber = requireDetail[j].sourceSerialNumber
                list2[i].stockRequireId = requireDetail[j].stockRequireId
                list2[i].orderQuantity = requireDetail[j].orderQuantity
                list2[i].planQuantity = requireDetail[j].planQuantity
                list3.push(list2[i])
              }
            }
          }
          // this.$refs.editable.insert(this.$store.getters.empcontract[i])
          // this.$refs.editable2.insert(this.$store.getters.empcontract[i])
          console.log('list3', list3)
          for (let i = 0; i < list3.length; i++) {
            console.log('val[i]', list3[i])
            this.$refs.editable.insert(list3[i])
          }
          // this.list2 = list3
          this.list3 = list3
          console.log('this.$refs.editable', this.list2)
          console.log('this.$refs.editable2', this.list3)
          this.$store.dispatch('getempcontract', '')
        } else {
          console.log('getempcontract', this.$store.getters.empcontract)
          this.personalForm.sourceType = '2'
          this.chooseType()
          this.$store.getters.empcontract.basicQuantity = this.$store.getters.empcontract.requireQuantity
          this.$store.getters.empcontract.planQuantity = this.$store.getters.empcontract.requireQuantity
          this.$store.getters.empcontract.planDeliveryDate = this.$store.getters.empcontract.requireDate
          this.$store.getters.empcontract.applyReason = ''
          this.$store.getters.empcontract.sourceNumber = this.$store.getters.empcontract.materialsRequireNumber
          this.$store.getters.empcontract.supplierId = ''
          this.$store.getters.empcontract.supplierName = ''
          this.$store.getters.empcontract.basicPrice = 0
          this.$store.getters.empcontract.planMoney = '0.00'
          this.$store.getters.empcontract.orderQuantity = '0.00'
          this.$store.getters.empcontract.stockRequireId = this.$store.getters.empcontract.id
          this.$store.getters.empcontract.sourceSerialNumber = this.$store.getters.empcontract.id
          console.log('查看例子', this.$store.getters.empcontract)
          this.$refs.editable.insert(this.$store.getters.empcontract)
          this.$refs.editable2.insert(this.$store.getters.empcontract)
          this.$store.dispatch('getempcontract', '')
        }
      }
    },
    planQuantity(row) {
      console.log('行', row)
      if (row.planQuantity !== null && row.planQuantity !== '' && row.planQuantity !== undefined) {
        return Number(row.planQuantity).toFixed(6)
      } else {
        return Number(row.planQuantity)
      }
    },
    // 重置一下下拉
    change() {
      this.$forceUpdate()
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
      this.personalForm.planDate = currentdate
    },
    // 计划金额
    planMoney(row) {
      row.planMoney = (row.basicPrice * row.planQuantity).toFixed(6)
      return row.planMoney
    },
    // 转化单价
    basicPrice(row) {
      return (row.basicPrice)
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
      this.personalForm.allMoney = sums[8]
      this.personalForm.totalQuantity = sums[7]
      sums[1] = ''
      sums[2] = ''
      sums[3] = ''
      sums[4] = ''
      sums[6] = ''
      sums[9] = ''
      sums[10] = ''
      sums[11] = ''
      sums[12] = ''
      sums[13] = ''
      sums[14] = ''
      return sums
    },
    // // 两表联动
    // changeDate(scope, value) {
    //   this.$refs.editable2.clear()
    //   const nowlistdata = this.$refs.editable.getRecords()
    //   for (let i = 0; i < nowlistdata.length; i++) {
    //     this.$refs.editable2.insert(nowlistdata[i])
    //   }
    // },
    // 深拷贝
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    // 两表联动
    changeDate(scope) {
      console.log('scope.row', scope.row)
      console.log('scope.$index', scope.$index)
      if (scope.row !== '' && scope.row !== null && scope.row !== undefined && scope.$index === 0) {
        if (scope.row.planDeliveryDate !== '' && scope.row.planDeliveryDate !== null && scope.row.planDeliveryDate !== undefined) {
          for (let i = 0; i < this.list2.length; i++) {
            this.list2[i].temp = i
          }
          for (let i = scope.row.temp; i < this.list2.length; i++) {
            console.log(this.list2[i].requireDate)
            if (this.list2[i].planDeliveryDate !== null && this.list2[i].planDeliveryDate !== '' && this.list2[i].planDeliveryDate !== undefined) {
              console.log(111)
              this.list2[i].planDeliveryDate = scope.row.planDeliveryDate
            } else {
              console.log(222)
              this.list2[i].planDeliveryDate = scope.row.planDeliveryDate
            }
          }
          console.log(scope.row)
        }
      }

      console.log('ooooo')
      this.$refs.editable2.clear()
      const nowlistdata = this.deepClone(this.$refs.editable.getRecords())
      const newArr = []
      console.log('nowlistdata', nowlistdata)
      nowlistdata.forEach(el => {
        console.log('el', el)
        const result = newArr.findIndex(ol => { return el.planDeliveryDate === ol.planDeliveryDate && el.productCode === ol.productCode && el.supplierId === ol.supplierId })
        console.log('result', result)
        if (result !== -1) {
          if (el.planDeliveryDate !== null && el.planDeliveryDate !== '' && el.planDeliveryDate !== undefined) {
            newArr[result].planQuantity = newArr[result].planQuantity + el.planQuantity
            newArr[result].planMoney = newArr[result].basicPrice * newArr[result].planQuantity
            console.log(newArr[result].planMoney)
          } else {
            el.planMoney = el.basicPrice * el.planQuantity
            newArr.push(el)
          }
        } else {
          el.planMoney = el.basicPrice * el.planQuantity
          newArr.push(el)
        }
      })
      console.log('newArr', newArr)
      const result2 = newArr.map(function(item, index) {
        return {
          productCode: item.productCode,
          productName: item.productName,
          productType: item.productType,
          typeId: item.typeId,
          unit: item.unit,
          color: item.color,
          basicQuantity: item.basicQuantity,
          planDeliveryDate: item.planDeliveryDate,
          planQuantity: item.planQuantity,
          applyReason: item.applyReason,
          sourceNumber: item.sourceNumber,
          supplierId: item.supplierId,
          supplierName: item.supplierName,
          basicPrice: item.basicPrice,
          planMoney: item.planMoney,
          orderQuantity: item.orderQuantity,
          requireQuantity: item.requireQuantity,
          requireDate: item.requireDate,
          sourceSerialNumber: item.sourceSerialNumber
        }
      })
      for (let i = 0; i < result2.length; i++) {
        this.$refs.editable2.insert(result2[i])
      }
    },
    // 供货商输入框focus事件触发
    handlechoose(scope) {
      console.log('123', 123)
      this.empcontrol = true
      this.kongscope = scope
      this.procode = scope.row.productCode
    },
    // 供货商列表返回数据
    personName(scope, val) {
      console.log('scope', scope)
      console.log('val', val)
      // scope.row.supplierName = val.supplierName
      // scope.row.supplierId = val.id
      for (let i = 0; i < val.supplierDetailVos.length; i++) {
        if (val.supplierDetailVos[i].productCode === scope.row.productCode) {
          console.log('val.supplierDetailVos[i]', val.supplierDetailVos[i])
          this.kongscope.row.basicPrice = val.supplierDetailVos[i].price
        }
      }
      this.kongscope.row.supplierName = val.supplierName
      this.kongscope.row.supplierId = val.id
      this.changeDate()
      return
    },

    // 选择源单类型事件
    chooseType() {
      try {
        if (this.personalForm.sourceType === '1' || this.personalForm.sourceType === '2') {
          this.addsouce = false
          this.addpro = false
          if (this.$refs.editable.getRecords().length !== 0) {
            for (let i = 0; i < this.list2.length; i++) {
              if (this.list2[i].sourceNumber) {
                this.list2.splice(i, 1)
                i--
              }
              // this.$refs.editable.insert(this.list2[i])
            }
            console.log('嘻嘻哈哈', this.list2)
          }
          if (this.$refs.editable2.getRecords().length !== 0) {
            for (let i = 0; i < this.list3.length; i++) {
              if (this.list3[i].sourceNumber) {
                this.list3.splice(i, 1)
                i--
              }
              // this.$refs.editable.insert(this.list2[i])
            }
          }
        } else if (this.personalForm.sourceType === '3') {
          this.addpro = false
          this.addsouce = true
          if (this.$refs.editable.getRecords().length !== 0) {
            for (let i = 0; i < this.list2.length; i++) {
              if (this.list2[i].sourceNumber) {
                this.list2.splice(i, 1)
                i--
              }
              // this.$refs.editable.insert(this.list2[i])
            }
            console.log('嘻嘻哈哈', this.list2)
            // this.$refs.editable.clear()
          }
          if (this.$refs.editable2.getRecords().length !== 0) {
            for (let i = 0; i < this.list2.length; i++) {
              if (this.list3[i].sourceNumber) {
                this.list3.splice(i, 1)
                i--
              }
              // this.$refs.editable.insert(this.list2[i])
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
      console.log(this.personalForm.sourceType)
      // if (this.personalForm.sourceType === '1' || this.personalForm.sourceType === '2') {
      //   this.addsouce = false
      //   this.addpro = false
      //   if (this.$refs.editable.getRecords().length !== 0) {
      //     this.$refs.editable.clear()
      //   }
      //   if (this.$refs.editable2.getRecords().length !== 0) {
      //     this.$refs.editable2.clear()
      //   }
      // } else if (this.personalForm.sourceType === '3') {
      //   this.addpro = false
      //   this.addsouce = true
      //   if (this.$refs.editable.getRecords().length !== 0) {
      //     this.$refs.editable.clear()
      //   }
      //   if (this.$refs.editable2.getRecords().length !== 0) {
      //     this.$refs.editable2.clear()
      //   }
      // }
    },
    // 无来源添加商品
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      console.log(val)
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    productdetail2(val) {
      console.log(val)
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable2.insert(val[i])
      }
    },
    // 从源单中添加商品
    handleAddSouce() {
      if (this.personalForm.sourceType === '1') {
        this.applycontrol = true
      } else if (this.personalForm.sourceType === '2') {
        this.requirecontrol = true
      }
    },
    allinfo(val) {
      console.log(val)
      // this.personalForm.planDate = val.applyDate
      // this.personalForm.stockType = val.stockType
      // this.personalForm.stockDeptId = val.applyDeptId
    },
    async apply(val) {
      console.log('val', val)
      // for (let i = 0; i < val.length; i++) {
      //   if (val[i].productCode.substring(0, 2) === '01') {
      //     console.log('01')
      //     const list = await materialslist2(val[i].productCode)
      //     console.log('list', list.data.data.content.list[0].materialsListDetailVos)
      //     const list2 = list.data.data.content.list[0].materialsListDetailVos
      //     for (let j = 0; j < list2.length; j++) {
      //       list2[j].basicPrice = 0
      //       console.log('val[i]', val[i])
      //       list2[j].planQuantity = (Number(list2[j].quantity) * (Number(val[i].applyQuantity) - Number(val[i].planQuantity))).toFixed(6)
      //       // - val.alre
      //       console.log(list2[j])
      //       this.$refs.editable.insert(list2[j])
      //     }
      //   } else {
      //     val[i].planQuantity = (Number(val[i].applyQuantity) - Number(val[i].planQuantity)).toFixed(6)
      //     this.$refs.editable.insert(val[i])
      //   }
      // }
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    async apply2(val) {
      this.getTypes()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable2.insert(val[i])
      }
    },
    // 采购需求数据
    requiredata(val) {
      this.getTypes()
      console.log('val1', val)
      for (let i = 0; i < val.length; i++) {
        console.log('val[i]', val[i])
        this.$refs.editable.insert(val[i])
      }
    },
    requiredata2(val) {
      console.log('val2', val)
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable2.insert(val[i])
      }
    },
    // 删除数据
    deleteEdit() {
      this.$refs.editable.removeSelecteds()
      this.changeDate()
    },
    deleteChange(val) {
      this.moreaction = val
      this.choosedata = val
    },
    // 更新类型
    updatecountry() {
      this.getTypes()
    },
    getTypes() {
      const param = {}
      param.pagenum = 1
      param.pagesize = 9999
      search2(param).then(res => {
        if (res.data.ret === 200) {
          this.suppliers = res.data.data.content.list
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
    // 计划人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 计划人回显
    stockName(val) {
      this.planPersonId = val.personName
      this.personalForm.planPersonId = val.id
    },
    // 采购人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    // 采购员回显
    deliveryName(val) {
      this.stockPersonId = val.personName
      this.personalForm.stockPersonId = val.id
      this.personalForm.stockDeptId = val.deptId
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        stockDeptId: this.$store.getters.deptId,
        createPersonId: this.$store.getters.userId,
        stockPersonId: this.$store.getters.userId,
        planPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        planRepositoryId: this.$store.getters.repositoryId,
        sourceType: '3',
        totalQuantity: '',
        allMoney: '',
        planDate: null
      }
      this.getdatatime()
      this.planRepositoryId = this.$store.getters.repositoryName
      this.planPersonId = this.$store.getters.name
      this.stockPersonId = this.$store.getters.name
    },
    // 保存操作
    handlesave() {
      this.canclick = true
      const EnterDetail = this.deepClone(this.$refs.editable.getRecords())
      const EnterDetail2 = this.deepClone(this.$refs.editable2.getRecords())
      console.log('EnterDetail2', EnterDetail2)
      let mm = 1
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
          offset: 100
        })
        this.canclick = false
        return false
      }
      EnterDetail2.map(function(elem) {
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
        if (elem.basicPrice === null || elem.basicPrice === '' || elem.basicPrice === undefined) {
          delete elem.basicPrice
        }
        if (elem.basicQuantity === null || elem.basicQuantity === '' || elem.basicQuantity === undefined) {
          delete elem.basicQuantity
        }
        if (elem.planQuantity === null || elem.planQuantity === '' || elem.planQuantity === undefined) {
          delete elem.planQuantity
        }
        if (elem.planMoney === null || elem.planMoney === '' || elem.planMoney === undefined) {
          delete elem.planMoney
        }
        if (elem.applyReason === null || elem.applyReason === '' || elem.applyReason === undefined) {
          delete elem.applyReason
        }
        if (elem.sourceNumber === null || elem.sourceNumber === '' || elem.sourceNumber === undefined) {
          delete elem.sourceNumber
        }
        if (elem.planDeliveryDate === null || elem.planDeliveryDate === '' || elem.planDeliveryDate === undefined) {
          delete elem.planDeliveryDate
        }
        if (elem.supplierId === null || elem.supplierId === '' || elem.supplierId === undefined) {
          delete elem.supplierId
          mm = 2
        }
        return elem
      })
      if (mm === 2) {
        this.$notify.error({
          title: 'wrong',
          message: '请选择计划交货日期和供应商',
          offset: 100
        })
        this.canclick = false
        return false
      }
      const parms2 = JSON.stringify(EnterDetail)
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate().then(valid => {
            if (valid) {
              addstockplan(parms, parms2, this.personalForm).then(res => {
                console.log(res)
                if (res.data.ret === 200) {
                  this.$notify({
                    title: 'successful',
                    message: 'save successful',
                    type: 'success',
                    offset: 100
                  })
                  this.canclick = false
                  this.restAllForm()
                  this.$refs.editable.clear()
                  this.$refs.editable2.clear()
                  this.$refs.personalForm.clearValidate()
                  this.$refs.personalForm.resetFields()
                } else {
                  this.$notify.error({
                    title: 'wrong',
                    message: res.data.msg,
                    offset: 100
                  })
                  this.canclick = false
                }
              })
            } else {
              this.$notify.error({
                title: 'wrong',
                message: 'Information is incomplete',
                offset: 100
              })
              this.canclick = false
              return false
            }
          })
            .catch(res => {
              this.$notify.error({
                title: 'wrong',
                message: 'Information is incomplete',
                offset: 100
              })
              this.canclick = false
            })
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'Information is incomplete',
            offset: 100
          })
          this.canclick = false
          return false
        }
      })
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/StockPlan/AddStockPlan', name: 'AddStockPlan', fullPath: '/StockPlan/AddStockPlan', title: 'AddStockPlan' }
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
      font-size: 18px;
      color: #373e4f;
      margin-bottom: -20px;
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
