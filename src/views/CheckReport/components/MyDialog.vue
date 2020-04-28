<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.reportNumber +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.sourceType')" prop="sourceType" style="width: 100%;">
                <el-select v-model="personalForm.sourceType" disabled style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="质检申请单" />
                  <el-option value="2" label="采购到货单" />
                  <el-option value="3" label="生产任务单" />
                  <el-option value="4" label="外包单" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.sourceNumber')" prop="sourceNumber" style="width: 100%;">
                <el-input v-model="personalForm.sourceNumber" disabled style="margin-left: 18px;width: 200px" clearable @focus="chooseNumber"/>
                <my-quality :qualitycontrol.sync="qualitycontrol" @allqualityinfo="allqualityinfo"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.supplierId')" style="width: 100%;">
                <el-input v-model="supplierId" style="margin-left: 18px;width: 200px" clearable @focus="handlechoose"/>
                <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.inspectionPersonId')" prop="reportPersonId" style="width: 100%;">
                <el-input v-model="inspectionPersonId" style="margin-left: 18px;width: 200px" clearable @focus="handlechooseStock"/>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.inspectionDeptId')" prop="reportDeptId" style="width: 100%;">
                <el-select v-model="personalForm.inspectionDeptId" clearable style="margin-left: 18px;width: 200px" @change="change()">
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.checkType')" prop="checkType" style="width: 100%;">
                <el-select v-model="personalForm.checkType" value="personalForm.checkType" style="margin-left: 18px;width: 200px" @change="change()">
                  <el-option value="1" label="来料质检"/>
                  <el-option value="2" label="送样质检"/>
                  <el-option value="3" label="生产质检"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.checkMode')" prop="checkMode" style="width: 100%;">
                <el-select v-model="personalForm.checkMode" disabled value="personalForm.checkMode" clearable style="margin-left: 18px;width: 200px" @change="change()">
                  <el-option value="1" label="抽样"/>
                  <el-option value="2" label="全检"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.produceManagerId')" style="width: 100%;">
                <el-input v-model="produceManagerId" style="margin-left: 18px;width: 200px" clearable @focus="handlechooseDelivery"/>
              </el-form-item>
              <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.workCenterId')" style="width: 100%;">
                <el-input v-model="personalForm.workCenterId" style="margin-left: 18px;width: 200px" clearable @focus="workcenterchoose"/>
                <my-center :control.sync="centercontrol" @center="center"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.checkPersonId')" style="width: 100%;">
                <el-input v-model="checkPersonId" style="margin-left: 18px;width: 200px" clearable @focus="handlechooseAccept"/>
                <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.checkDeptId')" prop="reportDeptId" style="width: 100%;">
                <el-select v-model="personalForm.checkDeptId" clearable style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.checkDate')" prop="checkDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.checkDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">{{ $t('updates.wpxx') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.productCode')" prop="productCode" style="width: 100%;">
                <el-input v-model="personalForm.productCode" disabled style="margin-left: 18px;width: 200px" @focus="handlemater"/>
                <my-mater :matercontrol.sync="matercontrol" @mater="mater"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.productName')" style="width: 100%;">
                <el-input v-model="personalForm.productName" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.unit')" style="width: 100%;">
                <el-input v-model="unit" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.typeId')" style="width: 100%;">
                <el-input v-model="typeId" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">{{ $t('updates.jyxx') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm3" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.checkQuantity')" prop="checkQuantity" style="width: 100%;">
                <el-input v-model="personalForm.checkQuantity" style="margin-left: 18px;width: 200px" clearable readonly @blur="changeCheckQuantity"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.sampleQuantity')" prop="sampleQuantity" style="width: 100%;">
                <el-input v-model="personalForm.sampleQuantity" style="margin-left: 18px;width: 200px" clearable @blur="changeSampleQuantity"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.passQuantity')" style="width: 100%;">
                <el-input v-model="personalForm.passQuantity" style="margin-left: 18px;width: 200px" clearable @blur="changePassQuantity"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.failedQuantity')" style="width: 100%;">
                <el-input :disabled="true" v-model="personalForm.failedQuantity" style="margin-left: 18px;width:200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.passRate')" style="width: 100%;">
                <el-input :disabled="true" v-model="personalForm.passRate" style="margin-left: 18px;width:200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.checkResult')" style="width: 100%;">
                <el-select v-model="personalForm.checkResult" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="合格"/>
                  <el-option value="2" label="不合格"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckReport.isRecheck')" style="width: 100%;">
                <el-radio-group v-model="personalForm.isRecheck" style="margin-left: 18px;width: 200px">
                  <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                  <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px;margin-bottom: 30px" shadow="never">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.zjbgmx') }}</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <!--        <el-button @click="$refs.editable.insert(-1)">{{ $t('updates.tj') }}</el-button>-->
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
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
          <el-editable-column type="selection" fixed min-width="55" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" fixed min-width="55" align="center" type="index"/>
          <el-editable-column :label="$t('updates.jyxm')" prop="checkItem" fixed align="center" min-width="200px"/>
          <el-editable-column :label="$t('updates.jynr')" prop="checkContent" fixed align="center" min-width="200px"/>
          <!--          <el-editable-column :label="$t('updates.jygj')" prop="checkTools" fixed align="center" width="200px"/>-->
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.ybs')" prop="checkQuantity" align="center" min-width="200px"/>
          <!--          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.hgsl')" prop="passQuantity" align="center" width="200px"/>-->
          <!--          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.bhgsl')" prop="failedQuantity" align="center" width="200px"/>-->
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.jyjg')" prop="remarks" align="center" min-width="200px"/>
          <el-editable-column :edit-render="{name: 'ElSelect',options: results ,type: 'visible'}" :label="$t('updates.dxjl')" prop="chectResult" align="center" min-width="200px"/>
          <el-editable-column :edit-render="{name: 'ElSelect', options: unqualify, type: 'visible'}" :label="$t('tongyo.bnyy')" prop="failedReason" align="center" min-width="200px"/>
        </el-editable>
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
import { updatecheckreport } from '@/api/CheckReport'
import { searchCheckCategory } from '@/api/CheckCategory'
import { getdeptlist } from '@/api/BasicSettings'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import MySupplier from './MySupplier'
import MyDelivery from './MyDelivery'
import MyCenter from './MyCenter'
import MyArrival from './MyArrival'
import ProduceTask from './ProduceTask'
import MyAccept from './MyAccept'
import MyQuality from './MyQuality'
import MyMater from './MyMater'
import MyEmp2 from './MyEmp2'
var _that
export default {
  components: { MyEmp2, MyMater, MyQuality, MyAccept, ProduceTask, MyArrival, MyCenter, MyDelivery, MySupplier, MyDetail, MyEmp },
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
      console.log(value)
      if (value === '') {
        callback(new Error('请选择'))
      } else {
        callback()
      }
    }
    return {
      // 退货原因
      getemplist: {
        categoryname: '',
        type: '2',
        iseffective: '1',
        pagenum: 1,
        pagesize: 99999
      },
      unqualify: [],
      results: [{ value: 1, label: '合格' }, { value: 2, label: '不合格' }],
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 控制检验人员
      staffcontrol: false,
      // 检验人员回显
      checkPersonname: '',
      // 物品单位回显
      unit: '',
      // 物品规格回显
      typeId: '',
      // 控制物品信息
      matercontrol: false,
      // 控制质检申请
      qualitycontrol: false,
      // 检验人员回显
      checkPersonId: '',
      // 控制检验人员
      accetpcontrol: false,
      // 工作中心回显
      workCenterId: '',
      // 控制工作中心
      centercontrol: false,
      // 生产负责人回显
      produceManagerId: '',
      // 控制生产负责人
      deliverycontrol: false,
      // 供应商回显
      supplierId: '',
      // 控制供应商
      empcontrol: false,
      // 部门数据
      depts: [],
      // 检验部门数据
      depts2: [],
      // 报检人员回显
      inspectionPersonId: '',
      // 控制报检人员
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
      // 控制源单为采购到货单时
      arrivalcontrol: false,
      // 控制源单为生产任务单时
      producecontrol: false,
      // 采购申请单规则数据
      personalrules: {
        sourceNumber: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        inspectionPersonId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        checkPersonId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        productCode: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        checkDate: [
          { required: true, message: '请选择检验日期', trigger: 'change' }
        ],
        inspectionDeptId: [
          { required: true, message: '请选择报检部门', trigger: 'change' }
        ],
        checkDetpId: [
          { required: true, message: '请选择检验部门', trigger: 'change' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        checkType: [
          { required: true, message: '请选择质检类别', trigger: 'change' }
        ],
        checkMode: [
          { required: true, message: '请选择检验方式', trigger: 'change' }
        ],
        checkQuantity: [
          { required: true, message: '请输入报检数量', trigger: 'blur' }
        ],
        sampleQuantity: [
          { required: true, message: '请输入抽样数量', trigger: 'blur' }
        ]
      },
      // 采购申请单明细数据
      list2: [],
      // 采购申请单明细列表规则
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
      this.supplierId = this.personalForm.supplierName
      this.inspectionPersonId = this.personalForm.inspectionPersonName
      this.checkPersonId = this.personalForm.checkPersonName
      this.workCenterId = this.personalForm.workCenter
      this.unit = this.personalForm.unit
      this.typeId = this.personalForm.productType
      this.produceManagerId = this.personalForm.produceManagerName
      for (let i = 0; i < this.personalForm.checkReportDetailVos.length; i++) {
        this.personalForm.checkReportDetailVos[i].checkItem = this.personalForm.checkReportDetailVos[i].checkItemName
      }
      this.list2 = this.personalForm.checkReportDetailVos
      this.getTypes()
    }
  },
  created() {
    this.getTypes()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    changeSampleQuantity() {
      if (this.personalForm.checkMode === '1') {
        if (this.personalForm.passQuantity !== null && this.personalForm.passQuantity !== '' && this.personalForm.sampleQuantity !== null) {
          this.personalForm.failedQuantity = (this.personalForm.sampleQuantity - this.personalForm.passQuantity).toFixed(2)
          this.personalForm.passRate = (this.personalForm.passQuantity / this.personalForm.sampleQuantity) === 1 ? 1 : 0
        } else {
          this.personalForm.failedQuantity = ''
          this.personalForm.passRate = ''
        }
      }
    },
    changeCheckQuantity() {
      if (this.personalForm.checkMode === '2') {
        this.personalForm.sampleQuantity = this.personalForm.checkQuantity
        if (this.personalForm.passQuantity !== null && this.personalForm.passQuantity !== '' && this.personalForm.checkQuantity !== null) {
          this.personalForm.failedQuantity = (this.personalForm.checkQuantity - this.personalForm.passQuantity).toFixed(2)
          this.personalForm.passRate = (this.personalForm.passQuantity / this.personalForm.checkQuantity) === 1 ? 1 : 0
        } else {
          this.personalForm.failedQuantity = ''
          this.personalForm.passRate = ''
        }
      }
    },
    changePassQuantity() {
      console.log('555')
      if (this.personalForm.checkMode === '2') {
        if (this.personalForm.passQuantity !== null && this.personalForm.passQuantity !== '' && this.personalForm.checkQuantity !== null && this.personalForm.checkQuantity !== '') {
          this.personalForm.failedQuantity = (this.personalForm.checkQuantity - this.personalForm.passQuantity).toFixed(2)
          this.personalForm.passRate = (this.personalForm.passQuantity / this.personalForm.checkQuantity) === 1 ? 1 : 0
        } else {
          this.personalForm.failedQuantity = ''
          this.personalForm.passRate = ''
        }
      } else if (this.personalForm.checkMode === '1') {
        if (this.personalForm.passQuantity !== null && this.personalForm.passQuantity !== '' && this.personalForm.sampleQuantity !== null && this.personalForm.sampleQuantity !== '') {
          this.personalForm.failedQuantity = (this.personalForm.sampleQuantity - this.personalForm.passQuantity).toFixed(2)
          this.personalForm.passRate = (this.personalForm.passQuantity / this.personalForm.sampleQuantity) === 1 ? 1 : 0
        } else {
          this.personalForm.failedQuantity = ''
          this.personalForm.passRate = ''
        }
      }
      console.log(this.personalForm.passQuantity)
      console.log(this.personalForm.sampleQuantity)
      if (this.personalForm.passQuantity > this.personalForm.sampleQuantity) {
        this.$notify.error({
          title: 'wrong',
          message: '合格数量不能大于抽样数量',
          offset: 100
        })
      }
    },
    // 检验人员focus事件触发
    handlechoosestaff() {
      this.staffcontrol = true
    },
    chuli(scope, val) {
      scope.row.checkPersonname = val.personName
      scope.row.checkPersonId = val.id
    },
    // 物品信息focus事件
    handlemater() {
      this.matercontrol = true
    },
    mater(val) {
      this.personalForm.productCode = val.code
      this.personalForm.productName = val.productName
      this.personalForm.unit = val.produceMeasurement
      this.unit = val.produceMeasu
      this.personalForm.typeId = val.typeId
      this.typeId = val.productType
    },
    // 重置一下下拉
    change() {
      this.$forceUpdate()
    },
    // 从源单中添加商品
    handleAddSouce() {
      if (this.personalForm.sourceType === '1') {
        this.arrivalcontrol = true
      } else if (this.personalForm.sourceType === '2') {
        this.producecontrol = true
      }
    },
    // 采购到货单返回数据
    arrival(val) {
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    // 生产任务单返回数据
    produce(val) {
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    getTypes() {
      searchCheckCategory(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content.list
          // this.unqualify =res.data.data.content.list
          this.unqualify = res.data.data.content.list.map(function(item) {
            return {
              'value': item.id,
              'label': item.categoryName
            }
          })
        }
      })
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
          this.depts2 = res.data.data.content.map(function(item) {
            return {
              'value': item.id,
              'label': item.deptName
            }
          })
        }
      })
    },
    // 工作中心focus事件
    workcenterchoose() {
      this.centercontrol = true
    },
    center(val) {
      console.log(val)
      this.workCenterId = val.workCenterName
      this.personalForm.workCenterId = val.id
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
    // 报检人员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 报检人员回显
    stockName(val) {
      this.inspectionPersonId = val.personName
      this.personalForm.inspectionPersonId = val.id
    },
    // 生产负责人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.produceManagerId = val.personName
      this.personalForm.produceManagerId = val.id
    },
    // 检验人员focus事件触发
    handlechooseAccept() {
      this.accetpcontrol = true
    },
    acceptName(val) {
      this.checkPersonId = val.personName
      this.personalForm.checkPersonId = val.id
    },
    // 选择源单focus事件触发
    chooseNumber() {
      this.qualitycontrol = true
    },
    allqualityinfo(val) {
      console.log(val)
      this.getTypes()
      this.personalForm.sourceNumber = val.checkNumber
      this.personalForm.supplierId = val.supplierId
      this.supplierId = val.supplierName
      this.personalForm.inspectionPersonId = val.reportPersonId
      this.inspectionPersonId = val.reportPersonName
      this.personalForm.inspectionDeptId = val.reportDeptId
      this.personalForm.checkType = String(val.checkType)
      this.personalForm.checkMode = String(val.checkMode)
      this.personalForm.produceManagerId = val.produceManagerId
      this.produceManagerId = val.produceManagerName
      this.personalForm.workCenterId = val.workCenterId
      this.workCenterId = val.workCenter
    },
    // 质检申请单明细来源为无来源时
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
      this.inspectionPersonId = null
      this.supplierId = null
      this.workCenterId = null
      this.produceManagerId = null
      this.checkPersonId = null
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      if (this.personalForm.passQuantity > this.personalForm.sampleQuantity) {
        this.$notify.error({
          title: 'wrong',
          message: '合格数量不能大于抽样数量',
          offset: 100
        })
        return false
      }
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      const EnterDetail = this.$refs.editable.getRecords()
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.checkItem === null || elem.checkItem === '' || elem.checkItem === undefined) {
          delete elem.checkItem
        }
        if (elem.checkTarget === null || elem.checkTarget === '' || elem.checkTarget === undefined) {
          delete elem.checkTarget
        }
        if (elem.checkValue === null || elem.checkValue === '' || elem.checkValue === undefined) {
          delete elem.checkValue
        }
        if (elem.chectResult === null || elem.chectResult === '' || elem.chectResult === undefined) {
          delete elem.chectResult
        }
        if (elem.checkQuantity === null || elem.checkQuantity === '' || elem.checkQuantity === undefined) {
          delete elem.checkQuantity
        }
        if (elem.passQuantity === null || elem.passQuantity === '' || elem.passQuantity === undefined) {
          delete elem.passQuantity
        }
        if (elem.failedQuantity === null || elem.failedQuantity === '' || elem.failedQuantity === undefined) {
          delete elem.failedQuantity
        }
        if (elem.checkDeptId === null || elem.checkDeptId === '' || elem.checkDeptId === undefined) {
          delete elem.checkDeptId
        }
        if (elem.checkPersonId === null || elem.checkPersonId === '' || elem.checkPersonId === undefined) {
          delete elem.checkPersonId
        }
        if (elem.targetUp === null || elem.targetUp === '' || elem.targetUp === undefined) {
          delete elem.targetUp
        }
        if (elem.targetDown === null || elem.targetDown === '' || elem.targetDown === undefined) {
          delete elem.targetDown
        }
        return elem
      })
      const parms2 = JSON.stringify(EnterDetail)
      delete this.personalForm.judgeStat
      const Data = this.personalForm
      for (const key in Data) {
        if (key === 'createDate') {
          delete Data[key]
        }
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      updatecheckreport(parms, parms2).then(res => {
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
          this.$refs.personalForm2.clearValidate()
          this.$refs.personalForm2.resetFields()
          this.$refs.personalForm3.clearValidate()
          this.$refs.personalForm3.resetFields()
          this.editVisible = false
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
        }
      })
    },
    handlecancel() {
      this.$refs.editable.clear()
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
    height: auto;
  }
  .el-col-12{
    width: 49%;
  }
</style>
