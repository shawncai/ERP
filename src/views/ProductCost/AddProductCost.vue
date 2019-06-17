<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">基本信息</h2>
        <div class="container" style="margin-top: 37px;">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="205px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.accountTime')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.accountTime"
                    type="month"
                    placeholder="选择月"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.productName')" prop="sourceType" style="width: 100%;">
                  <el-input v-model="personalForm.productName" style="margin-left: 18px;width:200px" @focus="handlemater"/>
                  <my-mater :matercontrol.sync="matercontrol" @mater="mater"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.accountType')" prop="sourceNumber" style="width: 100%;">
                  <el-select v-model="personalForm.accountType" value="personalForm.accountType" style="margin-left: 18px;width: 200px" @change="change()">
                    <el-option value="1" label="约当产量法"/>
                    <el-option value="2" label="定额成本发"/>
                    <el-option value="3" label="定额比例发"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.completeRate')+'%'" style="width: 100%;">
                  <el-input v-model="personalForm.completeRate" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.isInput')" prop="inspectionPersonId" style="width: 100%;">
                  <el-radio-group v-model="personalForm.isInput" style="margin-left: 18px;width: 200px" >
                    <el-radio :label="1" style="width: 100px">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.finishQuantity')" prop="reportDeptId" style="width: 100%;">
                  <el-input v-model="personalForm.finishQuantity" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.producingQuantity')" prop="checkType" style="width: 100%;">
                  <el-input v-model="personalForm.producingQuantity" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.producingMaterialsQuantity')" prop="checkMode" style="width: 100%;">
                  <el-input v-model="personalForm.producingMaterialsQuantity" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.producingSalary')" style="width: 100%;">
                  <el-input v-model="personalForm.producingSalary" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.producingCost')" style="width: 100%;">
                  <el-input v-model="personalForm.producingCost" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.finishMaterialsUsedQuantity')" style="width: 100%;">
                  <el-input v-model="personalForm.finishMaterialsUsedQuantity" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.finishWorkHours')" prop="reportDeptId" style="width: 100%;">
                  <el-input v-model="personalForm.finishWorkHours" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.endMaterialsQuantity')" prop="checkDate" style="width: 100%;">
                  <el-input v-model="personalForm.endMaterialsQuantity" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.endWorkHours')" prop="reportDeptId" style="width: 100%;">
                  <el-input v-model="personalForm.endWorkHours" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.currency')" prop="reportDeptId" style="width: 100%;">
                  <el-select v-model="personalForm.checkMode" value="personalForm.checkMode" style="margin-left: 18px;width: 200px" >
                    <el-option value="1" label="RMB"/>
                    <el-option value="2" label="USD"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>

      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >成本费用明细</h2>
        <div class="container">
          <el-row :gutter="20" style="margin-top: 100px">
            <el-col :span="24">
              <div style="width: 100%; min-height: 300px;" >
                <el-row :gutter="20" style="margin-top: 26px">
                  <el-col :span="24">
                    <div style="width: 100%; min-height: 400px;" >
                      <el-table
                        :data="list2"
                        :border="true"
                        style="width: 100%">
                        <el-table-column
                          prop="productCost"
                          label="产品成本"
                          min-width="140"
                          align="center"/>
                        <el-table-column
                          prop="material"
                          label="直接材料费用"
                          min-width="140"
                          align="center">
                          <template slot-scope="scope">
                            <span v-show="scope.$index >= 2" @click="getscope(scope)">{{ scope.row.material }}</span>
                            <el-input v-show="scope.$index < 2" v-model="scope.row.material" style="width: 130px;" @blur="getdata(scope)"/>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="man"
                          label="直接人工费用"
                          min-width="140"
                          align="center">
                          <template slot-scope="scope">
                            <span v-show="scope.$index >= 2" @click="getscope(scope)">{{ scope.row.material }}</span>
                            <el-input v-show="scope.$index < 2" v-model="scope.row.man" style="width: 130px;"/>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="produce"
                          label="制造费用"
                          min-width="140"
                          align="center">
                          <template slot-scope="scope">
                            <span v-show="scope.$index >= 2" @click="getscope(scope)">{{ scope.row.material }}</span>
                            <el-input v-show="scope.$index < 2" v-model="scope.row.produce" style="width: 130px;"/>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="total"
                          label="费用合计"
                          min-width="140"
                          align="center"/>
                      </el-table>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">保存</el-button>
        <el-button type="danger" @click="handlecancel()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addqualitycheck } from '@/api/CheckReport'
import { productlist } from '@/api/public'
import { getdeptlist } from '@/api/BasicSettings'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MySupplier from './components/MySupplier'
import MyDelivery from './components/MyDelivery'
import MyCenter from './components/MyCenter'
import MyArrival from './components/MyArrival'
import ProduceTask from './components/ProduceTask'
import MyAccept from './components/MyAccept'
import MyQuality from './components/MyQuality'
import MyMater from './components/MyMater'
import MyEmp2 from './components/MyEmp2'
import DetailReport from './components/DetailReport'
import DetailReport2 from './components/DetailReport2'
import DetailReport3 from './components/DetailReport3'
export default {
  name: 'AddCheckReport',
  components: { DetailReport3, DetailReport2, DetailReport, MyEmp2, MyMater, MyQuality, MyAccept, ProduceTask, MyArrival, MyCenter, MyDelivery, MySupplier, MyDetail, MyEmp },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请选择'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(this.supplierId)
      if (this.personalForm.productCode === undefined || this.personalForm.productCode === null || this.personalForm.productCode === '') {
        callback(new Error('请选择抽检商品'))
      } else {
        callback()
      }
    }
    const validatePass10 = (rule, value, callback) => {
      console.log(this.personalForm.checkQuantity)
      console.log(this.personalForm.sampleQuantity)
      if (this.personalForm.sampleQuantity === undefined || this.personalForm.sampleQuantity === null || this.personalForm.sampleQuantity === '') {
        callback(new Error('请输入抽样数量'))
      } else if (Number(this.personalForm.sampleQuantity) > Number(this.personalForm.checkQuantity)) {
        console.log('132')
        callback(new Error('抽样数量不能大于报检数量'))
      } else {
        callback()
      }
    }
    return {
      results: [{ value: 1, label: '合格' }, { value: 2, label: '不合格' }],
      // 控制报检部门是否可以编辑
      IsInspectionDeptId: false,
      // 控制报检人员是否可以编辑
      IsInspectionPersonId: false,
      // 控制供应商是否可以编辑
      IsSupplierId: false,
      // 控制工作中心是否可以编辑
      IsWorkCenterId: false,
      // 控制抽样数量是否可以编辑
      IsSampleQuantity: false,
      // 控制生产负责人是否可以编辑
      IsProduceManagerId: false,
      // 生产任务单传给物品信息数据
      reportdata3: [],
      // 生产任务单控制物品明细
      reportcontrol3: false,
      // 采购到货单传给物品信息数据
      reportdata2: [],
      // 采购到货单控制物品明细
      reportcontrol2: false,
      // 传给物品信息数据
      reportdata: [],
      // 控制物品明细
      reportcontrol: false,
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
      // 选择的数据
      choosedata: [],
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
      // 采购申请单信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        isRecheck: 1,
        sourceType: '4',
        sampleQuantity: null,
        checkQuantity: null,
        failedQuantity: '',
        passQuantity: '',
        checkMode: '1'
        // checkQuantity: this.personalForm.sampleQuantity,
      },
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
          { required: true, validator: validatePass2, trigger: 'change' }
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
          { required: true, message: '请选择质检类别', trigger: 'none' }
        ],
        checkMode: [
          { required: true, message: '请选择检验方式', trigger: 'none' }
        ],
        checkQuantity: [
          { required: true, message: '请输入报检数量', trigger: 'blur' }
        ],
        sampleQuantity: [
          { required: true, validator: validatePass10, trigger: 'blur' }
        ],
        passQuantity: [
          { required: true, message: '请输入合格数量', trigger: 'blur' }
        ]
      },
      // 表格数据
      list: [],
      // 加载表格
      listLoading: true,
      // 采购申请单明细数据
      list2: [
        {
          productCost: '月初在产品成本',
          material: '',
          man: '',
          produce: '',
          total: 0.00
        },
        {
          productCost: '本月发生生产费用',
          material: '',
          man: '',
          produce: '',
          total: 0.00
        },
        {
          productCost: '合计',
          material: 0.00,
          man: 0.00,
          produce: 0.00,
          total: 0.00
        },
        {
          productCost: '完工产品总成本',
          material: 0.00,
          man: 0.00,
          produce: 0.00,
          total: 0.00
        },
        {
          productCost: '单位成本',
          material: 0.00,
          man: 0.00,
          produce: 0.00,
          total: 0.00
        },
        {
          productCost: '月末在产品成本',
          material: 0.00,
          man: 0.00,
          produce: 0.00,
          total: 0.00
        }
      ],
      // 采购申请单明细列表规则
      validRules: {
        chectResult: [
          { required: true, message: '请输入检验结果', trigger: 'blur' }
        ],
        checkQuantity: [
          { required: true, message: '请输入检验结果', trigger: 'blur' }
        ],
        passQuantity: [
          { required: true, message: '请输入合格数量', trigger: 'blur' }
        ],
        checkPersonname: [
          { required: true, message: '请选择检验人员', trigger: 'blur' }
        ],
        checkDeptId: [
          { required: true, message: '请选择检验部门', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getTypes()
  },
  methods: {
    getdata(val) {
      console.log('123', val)
    },
    getscope(val) {
      console.log(val)
    },
    getcheckQuantity(row) {
      row.sampleQuantity = this.personalForm.sampleQuantity
      return row.sampleQuantity
    },
    getfailedQuantity(row) {
      console.log(row.checkQuantity)
      console.log(row.passQuantity)
      row.failedQuantity = row.sampleQuantity - row.passQuantity
      return row.failedQuantity
    },
    handleAdd() {
      if (this.personalForm.sampleQuantity === '' || this.personalForm.sampleQuantity === null || this.personalForm.sampleQuantity === undefined) {
        this.$notify.error({
          title: '错误',
          message: '抽样数量为空',
          offset: 100
        })
        return false
      }
      this.$refs.editable.insert({ checkQuantity: this.personalForm.sampleQuantity })
    },
    chooseType(val) {
      if (this.personalForm.sourceType === '1') {
        this.IsProduceManagerId = false
        this.IsWorkCenterId = false
        this.personalForm.supplierId = ''
        this.supplierId = ''
        this.personalForm.sourceNumber = ''
      } else if (this.personalForm.sourceType === '2') {
        this.IsProduceManagerId = true
        this.IsWorkCenterId = true
        this.IsSupplierId = true
        this.personalForm.supplierId = ''
        this.supplierId = ''
        this.personalForm.sourceNumber = ''
      } else if (this.personalForm.sourceType === '3') {
        this.IsWorkCenterId = false
        this.IsSupplierId = true
        this.personalForm.supplierId = ''
        this.supplierId = ''
        this.personalForm.sourceNumber = ''
      } else if (this.personalForm.sourceType === '4') {
        this.IsProduceManagerId = false
        this.IsWorkCenterId = false
        this.personalForm.supplierId = ''
        this.supplierId = ''
        this.personalForm.sourceNumber = ''
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
    // 源单为质检申请单时返回数据
    report(val) {
      console.log(val)
      this.personalForm.sourceSerialNumber = val.id
      this.personalForm.productCode = val.productCode
      this.personalForm.productName = val.productName
      this.personalForm.unit = val.unit
      productlist(val.productCode).then(res => {
        if (res.data.ret === 200) {
          this.personalForm.typeId = res.data.data.content.list[0].typeId
          this.typeId = res.data.data.content.list[0].productType
        }
      })
    },
    // 源单为采购到货单时返回数据
    report2(val) {
      console.log(val)
      this.sourceSerialNumber = val.id
      this.personalForm.productCode = val.productCode
      this.personalForm.productName = val.productName
      this.personalForm.unit = val.unit
      this.personalForm.typeId = val.type
      this.typeId = val.typeName
      this.personalForm.sourceSerialNumber = val.id
    },
    // 源单为采购到货单时返回数据
    report3(val) {
      console.log(val)
      this.sourceSerialNumber = val.id
      this.personalForm.productCode = val.productCode
      this.personalForm.productName = val.productName
      this.personalForm.unit = val.unit
      this.personalForm.typeId = val.typeId
      this.typeId = val.productType
    },
    mater(val) {
      this.sourceSerialNumber = val.id
      this.personalForm.productCode = val.code
      this.personalForm.productName = val.productName
      this.personalForm.unit = val.produceMeasurement
      this.personalForm.typeId = val.typeId
      this.typeId = val.productType
    },
    // 重置一下下拉
    change() {
      this.$forceUpdate()
    },
    getTypes() {
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
    checkModeChoose() {
      this.$forceUpdate()
      console.log(this.personalForm.checkMode)
      if (this.personalForm.checkMode === '2') {
        console.log('222')
        this.IsSampleQuantity = true
        console.log(this.personalForm.sampleQuantity)
        this.personalForm.sampleQuantity = this.personalForm.checkQuantity
      } else if (this.personalForm.checkMode === '1') {
        console.log('111')
        this.IsSampleQuantity = false
      }
      this.personalForm.checkQuantity = ''
      this.personalForm.sampleQuantity = ''
      this.personalForm.passQuantity = ''
      this.personalForm.failedQuantity = ''
      this.personalForm.passRate = ''
    },
    changeCheckQuantity() {
      if (this.personalForm.checkMode === '2') {
        this.personalForm.sampleQuantity = this.personalForm.checkQuantity
        if (this.personalForm.passQuantity !== null && this.personalForm.passQuantity !== '' && this.personalForm.checkQuantity !== null) {
          this.personalForm.failedQuantity = (this.personalForm.checkQuantity - this.personalForm.passQuantity).toFixed(2)
          this.personalForm.passRate = (this.personalForm.passQuantity / this.personalForm.checkQuantity).toFixed(2)
        } else {
          this.personalForm.failedQuantity = ''
          this.personalForm.passRate = ''
        }
      }
    },
    changeSampleQuantity() {
      if (this.personalForm.checkMode === '1') {
        if (this.personalForm.passQuantity !== null && this.personalForm.passQuantity !== '' && this.personalForm.sampleQuantity !== null) {
          this.personalForm.failedQuantity = (this.personalForm.sampleQuantity - this.personalForm.passQuantity).toFixed(2)
          this.personalForm.passRate = (this.personalForm.passQuantity / this.personalForm.sampleQuantity).toFixed(2)
        } else {
          this.personalForm.failedQuantity = ''
          this.personalForm.passRate = ''
        }
      }
    },
    changePassQuantity() {
      console.log('555')
      if (this.personalForm.checkMode === '2') {
        console.log(this.personalForm.passQuantity)
        console.log(this.personalForm.checkQuantity)
        if (this.personalForm.passQuantity !== null && this.personalForm.passQuantity !== '' && this.personalForm.checkQuantity !== null && this.personalForm.checkQuantity !== '') {
          this.personalForm.failedQuantity = (this.personalForm.checkQuantity - this.personalForm.passQuantity).toFixed(2)
          this.personalForm.passRate = (this.personalForm.passQuantity / this.personalForm.checkQuantity).toFixed(2)
        } else {
          this.personalForm.failedQuantity = ''
          this.personalForm.passRate = ''
        }
      } else if (this.personalForm.checkMode === '1') {
        if (this.personalForm.passQuantity !== null && this.personalForm.passQuantity !== '' && this.personalForm.sampleQuantity !== null && this.personalForm.sampleQuantity !== '') {
          this.personalForm.failedQuantity = (this.personalForm.sampleQuantity - this.personalForm.passQuantity).toFixed(2)
          this.personalForm.passRate = (this.personalForm.passQuantity / this.personalForm.sampleQuantity).toFixed(2)
        } else {
          this.personalForm.failedQuantity = ''
          this.personalForm.passRate = ''
        }
      }
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
      if (this.personalForm.sourceType === '1') {
        this.qualitycontrol = true
      } else if (this.personalForm.sourceType === '2') {
        this.arrivalcontrol = true
      } else if (this.personalForm.sourceType === '3') {
        this.producecontrol = true
      }
    },
    allqualityinfo(val) {
      console.log(val)
      this.reportdata = val.qualityCheckDetailVos
      this.personalForm.sourceNumber = val.checkNumber
      this.IsSupplierId = true
      if (val.supplierId !== '' && val.supplierId !== null && val.supplierId !== undefined) {
        this.personalForm.supplierId = val.supplierId
        this.supplierId = val.supplierName
      }
      this.IsInspectionPersonId = true
      if (val.reportPersonId !== '' && val.reportPersonId !== null && val.reportPersonId !== undefined) {
        this.personalForm.inspectionPersonId = val.reportPersonId
        this.inspectionPersonId = val.reportPersonName
      }
      this.IsInspectionDeptId = true
      if (val.reportDeptId !== '' && val.reportDeptId !== null && val.reportDeptId !== undefined) {
        this.personalForm.inspectionDeptId = val.reportDeptId
      }
      if (val.checkType !== '' && val.checkType !== null && val.checkType !== undefined) {
        this.personalForm.checkType = String(val.checkType)
      }
      if (val.checkMode !== '' && val.checkMode !== null && val.checkMode !== undefined) {
        this.personalForm.checkMode = String(val.checkMode)
      }
      this.IsProduceManagerId = true
      if (val.produceManagerId !== '' && val.produceManagerId !== null && val.produceManagerId !== undefined) {
        this.personalForm.produceManagerId = val.produceManagerId
        this.produceManagerId = val.produceManagerName
      }
      this.IsWorkCenterId = true
      if (val.workCenterId !== '' && val.workCenterId !== null && val.workCenterId !== undefined) {
        this.personalForm.workCenterId = val.workCenterId
        this.workCenterId = val.workCenter
      }
    },
    // 源单类型为采购到货单
    allarrivalinfo(val) {
      this.reportdata2 = val.stockArrivalDetailVos
      this.personalForm.sourceNumber = val.number
      this.personalForm.supplierId = val.supplierId
      this.supplierId = val.supplierName
      // this.sourceSerialNumber = val.sourceSerialNumber
    },
    // 源单类型为生产任务单
    produce(val) {
      this.reportdata3 = val.produceTaskDetailVos
      this.personalForm.sourceNumber = val.taskNumber
      if (val.handlePersonId !== '' && val.handlePersonId !== null && val.handlePersonId !== undefined) {
        this.personalForm.produceManagerId = val.handlePersonId
        this.produceManagerId = val.handlePersonName
        this.IsProduceManagerId = true
      }
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
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
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
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.personalForm2.validate((valid) => {
            if (valid) {
              this.$refs.personalForm3.validate((valid) => {
                if (valid) {
                  this.$refs.editable.validate().then(valid => {
                    addqualitycheck(parms, parms2, this.personalForm).then(res => {
                      console.log(res)
                      if (res.data.ret === 200) {
                        this.$notify({
                          title: '成功',
                          message: '保存成功',
                          type: 'success',
                          offset: 100
                        })
                        this.restAllForm()
                        this.$refs.editable.clear()
                        this.$refs.personalForm.clearValidate()
                        this.$refs.personalForm.resetFields()
                        this.$refs.personalForm2.clearValidate()
                        this.$refs.personalForm2.resetFields()
                        this.$refs.personalForm3.clearValidate()
                        this.$refs.personalForm3.resetFields()
                      } else {
                        this.$notify.error({
                          title: '错误',
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
                    title: '错误',
                    message: '信息未填完整',
                    offset: 100
                  })
                  return false
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
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/CheckReport/AddCheckReport', name: 'AddCheckReport', fullPath: '/CheckReport/AddCheckReport', title: 'AddCheckReport' }
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
      margin-top: 20px;
    }
    .container{
      margin-top: 40px;
    }
    .el-button+.el-button{
      width: 98px;
    }
  }

  .shipei {
    width: 150px !important;
  }
</style>
