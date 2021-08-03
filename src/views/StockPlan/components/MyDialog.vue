<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.planNumber +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息123-->
    <el-card :body-style="{ padding: '5px' }" class="box-card" style="margin-top: 63px" shadow="never">
      <div ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</div>
      <div class="container" style="margin-top: 25px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('StockPlan.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-input v-model="personalForm.title" size="mini" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockPlan.stockType')" prop="stockType" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-select v-model="personalForm.stockType" size="mini" style="margin-left: 18px;width: 200px" @focus="updatecountry">
                  <el-option
                    v-for="(item, index) in types"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockPlan.planPersonId')" prop="planPersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-input v-model="planPersonId" size="mini" style="margin-left: 18px;width: 200px" clearable @focus="handlechooseStock"/>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockPlan.stockPersonId')" prop="stockPersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-input v-model="stockPersonId" size="mini" style="margin-left: 18px;width: 200px" clearable @focus="handlechooseDelivery"/>
                <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockPlan.stockDeptId')" prop="stockDeptId" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-select v-model="personalForm.stockDeptId" size="mini" clearable style="margin-left: 18px;width: 200px" @change="change()">
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockPlan.sourceType')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-select v-model="personalForm.sourceType" size="mini" style="margin-left: 18px;width: 200px" @change="chooseType">
                  <el-option :label="$t('route.StockApply')" value="1" />
                  <el-option :label="$t('route.StockRequire')" value="2" />
                  <el-option :label="$t('AccessMaterials.Nosource')" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockPlan.planDate')" prop="planDate" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-date-picker
                  v-model="personalForm.planDate"
                  type="date"
                  size="mini"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('collectAndPayDetail.cgck')" prop="planRepositoryId" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-input v-model="planRepositoryId" size="mini" placeholder="请选择采购仓库" style="margin-left: 18px;width: 200px" @focus="handlechooseRep"/>
              </el-form-item>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card :body-style="{ padding: '5px' }" class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" >{{ $t('updates.cgjhjlymx') }}</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button :disabled="addpro" size="mini" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
        <my-detail :control.sync="control" @product="productdetail" @product2="productdetail2"/>
        <el-button :disabled="addsouce" size="mini" style="width: 130px" @click="handleAddSouce">{{ $t('updates.cydzxz') }}</el-button>
        <my-apply :applycontrol.sync="applycontrol" @apply="apply" @apply2="apply2" @allinfo="allinfo"/>
        <my-require :requirecontrol.sync="requirecontrol" @require="requiredata" @require2="requiredata2"/>
        <el-button type="danger" size="mini" @click="deleteEdit">{{ $t('Hmodule.delete') }}</el-button>
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
          <el-editable-column fixed="left" type="selection" min-width="55" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" fixed="left" min-width="50" align="center" type="index"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" fixed="left" prop="productCode" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" fixed="left" prop="productName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" fixed="left" prop="productType" align="center" min-width="100px"/>
          <el-editable-column :label="$t('updates.ys')" fixed="left" prop="color" align="center" min-width="100px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
          <!-- <el-editable-column :label="$t('Hmodule.dj')" prop="basicPrice" align="center" min-width="150px"/> -->
          <el-editable-column :label="$t('Hmodule.xqsl')" prop="requireQuantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.xqrq')" prop="requireDate" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0.00, precision: 6}, type: 'visible' ,events: {change: changeDate}}" :label="$t('updates.jhsl')" prop="planQuantity" align="center" min-width="150px"/>
          <!-- <el-editable-column :label="$t('updates.jhje')" prop="planMoney" align="center" min-width="150px">
            <template slot-scope="scope">
              <p>{{ planMoney(scope.row) }}</p>
            </template>
          </el-editable-column> -->
          <el-editable-column :edit-render="{name: 'ElDatePicker', attrs: {type: 'date', format: 'yyyy-MM-dd'}, type: 'visible', events: {change: changeDate}}" :label="$t('updates.jhjhrq')" prop="planDeliveryDate" align="center" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-date-picker
                v-model="scope.row.planDeliveryDate"
                :picker-options="pickerOptions1"
                type="date"
                value-format="yyyy-MM-dd"
                @change="changeDate"/>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.sqyy')" prop="applyReason" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ydbh')" prop="sourceNumber" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{type: 'default'}" :label="$t('updates.gys')" prop="supplierId" align="center" width="200px">
            <template slot-scope="scope">
              <el-select v-model="scope.row.supplierId" :value="scope.row.supplierId" filterable style="width: 100%;" @visible-change="updatesupp($event,scope)" @change="changeDate2($event,scope)">
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
    <el-card :body-style="{ padding: '5px' }" class="box-card" style="margin-bottom: 30px" shadow="never">
      <div ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</div>
      <div class="container" style="margin-top: 25px">
        <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <!-- <el-col :span="6">
              <el-form-item :label="$t('StockPlan.heji1')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-input v-model="heji1" size="mini" style="margin-left: 18px;width:200px" disabled/>
              </el-form-item>
            </el-col> -->
            <el-col :span="6">
              <el-form-item :label="$t('StockPlan.heji2')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                <el-input v-model="heji2" size="mini" style="margin-left: 18px;width:200px" disabled/>
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
import { updatestockplan } from '@/api/StockPlan'
import { getdeptlist } from '@/api/BasicSettings'
import { search2, getStockInfoByProduct } from '@/api/Supplier'
// import { productlist } from '@/api/public'
import { searchStockCategory } from '@/api/StockCategory'
import MyEmp from './MyEmp'
import MyDelivery from '../../DailyAdjust/components/MyDelivery'
import MyDetail from './MyDetail'
import MyApply from './MyApply'
import MySupplier from './MySupplier'
import MyRequire from './MyRequire'
import MyRepository from './MyRepository'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  components: { MyRequire, MySupplier, MyApply, MyDetail, MyDelivery, MyEmp, MyRepository },
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
      planRepositoryId: '',
      suppliers: [],
      zzz: 123,
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      // 传商品code去获取能提供这个商品的供应商
      procode: null,
      // 控制scope
      kongscope: '',
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
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
      addpro: false,
      // 控制从源单中选择按钮
      addsouce: true,
      // 部门数据
      depts: [],
      // 计划人回显
      planPersonId: '',
      // 控制计划人
      stockControl: false,
      // 采购员回显
      stockPersonId: '',
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
      // 采购计划单规则数据
      personalrules: {
        planRepositoryId: [
          { required: true, validator: validatePass6, trigger: 'change' }
        ],
        stockType: [
          { required: true, message: '请选择采购类别', trigger: 'change' }
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
        supplierName: [
          { required: true, message: '请选择供应商', trigger: 'none' }
        ],
        planQuantity: [
          { required: true, message: '请输入计划数量', trigger: 'blur' }
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
      this.planPersonId = this.personalForm.planPersonName
      this.stockPersonId = this.personalForm.stockPersonName
      this.planRepositoryId = this.personalForm.planRepositoryName
      // this.personalForm.id = this.personalForm.parentid
      this.personalForm.sourceType = String(this.personalForm.sourceType)
      if (this.personalForm.sourceType === '1' || this.personalForm.sourceType === '2') {
        this.addsouce = false
        this.addpro = false
      } else if (this.personalForm.sourceType === '3') {
        this.addpro = false
        this.addsouce = true
      }
      for (const i in this.personalForm.stockPlanDetailVos) {
        delete this.personalForm.stockPlanDetailVos[i].stockPlanDetailVos
      }
      this.list2 = this.personalForm.stockPlanDetailVos
      this.list3 = this.personalForm.stockPlanDetailVos
      this.getdatatime()
    }
  },
  created() {
    this.getTypes()
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
    planQuantity(row) {
      return (row.planQuantity).toFixed(6)
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
      this.heji1 = sums[8]
      this.heji2 = sums[7]
      sums[1] = ''
      sums[2] = ''
      sums[3] = ''
      sums[4] = ''
      sums[6] = ''
      sums[9] = ''
      sums[10] = ''
      sums[11] = ''
      sums[12] = ''
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
    async  changeDate(scope) {
      if (!scope.row.sourceSerialNumber && !scope.row.supplierId) {
        const suppdata = await getStockInfoByProduct(scope.row.productCode, scope.row.planQuantity).then(res => {
          return res
        })
        console.log('suppdata', suppdata)
        if (suppdata.data.data.content.length !== 0) {
          const newparms = scope.row
          for (const i in suppdata.data.data.content) {
            newparms.supplierName = suppdata.data.data.content[i].supplierName
            newparms.supplierId = suppdata.data.data.content[i].supplierId
            newparms.planQuantity = suppdata.data.data.content[i].quantity
            newparms.basicPrice = suppdata.data.data.content[i].price
            newparms.includeTaxPrice = suppdata.data.data.content[i].includeTaxPrice
            this.$refs.editable.insertAt(newparms)
          }
          this.$refs.editable.remove(scope.row)
        }
      }
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
          } else {
            newArr.push(el)
          }
        } else {
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
      this.kongscope.row.supplierName = val.supplierName
      this.kongscope.row.supplierId = val.id
      this.changeDate()
    },

    // 选择源单类型事件
    chooseType() {
      console.log(this.personalForm.sourceType)
      if (this.personalForm.sourceType === '1' || this.personalForm.sourceType === '2') {
        this.addsouce = false
        this.addpro = false
        if (this.$refs.editable.getRecords().length !== 0) {
          this.$refs.editable.clear()
        }
        if (this.$refs.editable2.getRecords().length !== 0) {
          this.$refs.editable2.clear()
        }
      } else if (this.personalForm.sourceType === '3') {
        this.addpro = false
        this.addsouce = true
        if (this.$refs.editable.getRecords().length !== 0) {
          this.$refs.editable.clear()
        }
        if (this.$refs.editable2.getRecords().length !== 0) {
          this.$refs.editable2.clear()
        }
      }
    },
    // 无来源添加商品
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      console.log(val)
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insertAt(val[i], -1)
      }
    },
    productdetail2(val) {
      console.log(val)
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable2.insertAt(val[i], -1)
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
    },
    apply(val) {
      this.getTypes()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insertAt(val[i], -1)
      }
    },
    apply2(val) {
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable2.insertAt(val[i], -1)
      }
    },
    // 采购需求数据
    requiredata(val) {
      this.getTypes()
      console.log(val)
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insertAt(val[i], -1)
      }
    },
    requiredata2(val) {
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable2.insertAt(val[i], -1)
      }
    },
    // 删除数据
    deleteEdit() {
      this.$refs.editable.removeSelecteds()
      this.changeDate()
    },
    deleteChange(val) {
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
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      }
      this.planPersonId = null
      this.stockPersonId = null
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      delete this.personalForm.judgeStat
      delete this.personalForm.receiptStat
      delete this.personalForm.approvalUseVos
      delete this.personalForm.stockPlanDetailVos

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
      const parms2 = JSON.stringify(EnterDetail)
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      console.log(this.personalForm, Data)
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate().then(valid => {
            updatestockplan(parms, parms2).then(res => {
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
                  message: res.data.msg,
                  offset: 100
                })
              }
            })
          }).catch(valid => {
            console.log('error submit!!')
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
