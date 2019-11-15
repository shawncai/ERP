<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.sourceType')" prop="sourceType" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px" @change="chooseType">
                    <el-option value="1" label="质检申请单" />
                    <el-option value="2" label="采购到货单" />
                    <el-option value="3" label="生产任务单" />
                    <!--                    <el-option value="4" label="无来源" />-->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.sourceNumber')" prop="sourceNumber" style="width: 100%;">
                  <el-input v-model="personalForm.sourceNumber" style="margin-left: 18px;width: 200px" clearable @focus="chooseNumber"/>
                  <my-quality :qualitycontrol.sync="qualitycontrol" @allqualityinfo="allqualityinfo"/>
                  <my-arrival :arrivalcontrol.sync="arrivalcontrol" @allarrivalinfodata="allarrivalinfodata"/>
                  <produce-task :procontrol.sync="producecontrol" @produce="produce"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.supplierId')" style="width: 100%;">
                  <el-input v-model="supplierId" :disabled="IsSupplierId" style="margin-left: 18px;width: 200px" @focus="handlechoose"/>
                  <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.inspectionPersonId')" prop="inspectionPersonId" style="width: 100%;">
                  <el-input v-model="inspectionPersonId" :disabled="IsInspectionPersonId" style="margin-left: 18px;width: 200px" clearable @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.inspectionDeptId')" prop="reportDeptId" style="width: 100%;">
                  <el-select v-model="personalForm.inspectionDeptId" :disabled="IsInspectionDeptId" style="margin-left: 18px;width: 200px" @change="change()">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.checkType')" prop="checkType" style="width: 100%;">
                  <el-select v-model="personalForm.checkType" value="personalForm.checkType" style="margin-left: 18px;width: 200px" @change="change()">
                    <el-option value="1" label="来料质检"/>
                    <el-option value="2" label="送样质检"/>
                    <el-option value="3" label="生产质检"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.checkMode')" prop="checkMode" style="width: 100%;">
                  <el-select v-model="personalForm.checkMode" value="personalForm.checkMode" style="margin-left: 18px;width: 200px" @change="checkModeChoose">
                    <el-option value="1" label="抽样"/>
                    <el-option value="2" label="全检"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.produceManagerId')" style="width: 100%;">
                  <el-input v-model="produceManagerId" :disabled="IsProduceManagerId" style="margin-left: 18px;width: 200px" @focus="handlechooseDelivery"/>
                </el-form-item>
                <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.workCenterId')" style="width: 100%;">
                  <el-input v-model="workCenterId" :disabled="IsWorkCenterId" style="margin-left: 18px;width: 200px" @focus="workcenterchoose"/>
                  <my-center :control.sync="centercontrol" @center="center"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.checkPersonId')" style="width: 100%;">
                  <el-input v-model="checkPersonId" style="margin-left: 18px;width: 200px" clearable @focus="handlechooseAccept"/>
                  <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
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
              <el-col :span="6">
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
        <h2 ref="geren" class="form-name">物品信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.productCode')" prop="productCode" style="width: 100%;">
                  <el-input v-model="personalForm.productCode" style="margin-left: 18px;width:200px" @focus="handlemater"/>
                  <my-mater :matercontrol.sync="matercontrol" @mater="mater"/>
                  <detail-report :reportcontrol.sync="reportcontrol" :reportdata.sync="reportdata" @report="report"/>
                  <detail-report2 :reportcontrol2.sync="reportcontrol2" :reportdata2.sync="reportdata2" @report2="report2"/>
                  <detail-report3 :reportcontrol3.sync="reportcontrol3" :reportdata3.sync="reportdata3" @report3="report3"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.productName')" style="width: 100%;">
                  <el-input v-model="personalForm.productName" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.unit')" style="width: 100%;">
                  <el-input v-model="personalForm.unit" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.typeId')" style="width: 100%;">
                  <el-input v-model="typeId" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="geren" class="form-name">检验信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm3" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.checkQuantity')" prop="checkQuantity" style="width: 100%;" >
                  <el-input v-model="personalForm.checkQuantity" style="margin-left: 18px;width:200px" clearable @blur="changeCheckQuantity"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.sampleQuantity')" prop="sampleQuantity" style="width: 100%;">
                  <el-input v-model="personalForm.sampleQuantity" :disabled="IsSampleQuantity" style="margin-left: 18px;width:200px" clearable @blur="changeSampleQuantity"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.passQuantity')" prop="passQuantity" style="width: 100%;">
                  <el-input v-model="personalForm.passQuantity" style="margin-left: 18px;width:200px" @blur="changePassQuantity"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.failedQuantity')" style="width: 100%;">
                  <el-input :disabled="true" v-model="personalForm.failedQuantity" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.passRate')" style="width: 100%;">
                  <el-input :disabled="true" v-model="personalForm.passRate" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.checkResult')" style="width: 100%;">
                  <el-select v-model="personalForm.checkResult" style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="合格"/>
                    <el-option value="2" label="不合格"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckReport.isRecheck')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.isRecheck" style="margin-left: 18px;width:200px">
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
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >质检报告单明细</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <!--          <el-button @click="handleAdd">添加</el-button>-->
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
            size="medium"
            style="width: 100%">
            <el-editable-column type="selection" fixed width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" fixed width="55" align="center" type="index"/>
            <el-editable-column prop="checkItem" fixed align="center" label="检验项目" width="200px"/>
            <el-editable-column prop="checkContent" fixed align="center" label="检验内容" width="200px"/>
            <el-editable-column prop="checkTools" fixed align="center" label="检验工具" width="200px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="checkQuantity" align="center" label="样本数" width="200px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="passQuantity" align="center" label="合格数量" width="200px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="failedQuantity" align="center" label="不合格数量" width="200px"/>
            <el-editable-column :edit-render="{name: 'ElSelect',options: results ,type: 'visible'}" prop="chectResult" align="center" label="检验结果" width="200px"/>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="remarks" align="center" label="单项结论" width="200px"/>
            <!--            <el-editable-column :edit-render="{name: 'ElSelect',options: results ,type: 'visible'}" prop="chectResult" align="center" label="检验结果" min-width="150px"/>-->
            <!--            <el-editable-column prop="checkQuantity" align="center" label="检验数量" min-width="150px">-->
            <!--              <template slot-scope="scope">-->
            <!--                <p>{{ getcheckQuantity(scope.row) }}</p>-->
            <!--              </template>-->
            <!--            </el-editable-column>-->
            <!--            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="passQuantity" align="center" label="合格数量" min-width="150px"/>-->
            <!--            <el-editable-column prop="failedQuantity" align="center" label="不合格数量" min-width="150px">-->
            <!--              <template slot-scope="scope">-->
            <!--                <p>{{ getfailedQuantity(scope.row) }}</p>-->
            <!--              </template>-->
            <!--            </el-editable-column>-->
            <!--          </el-editable>-->
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { searchCheckSet } from '@/api/CheckSet'
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
var _that
export default {
  name: 'AddCheckReport',
  components: { DetailReport3, DetailReport2, DetailReport, MyEmp2, MyMater, MyQuality, MyAccept, ProduceTask, MyArrival, MyCenter, MyDelivery, MySupplier, MyDetail, MyEmp },
  data() {
    const validatePass = (rule, value, callback) => {
      // console.log(value)
      if (value === '') {
        callback(new Error('请选择'))
      } else {
        callback()
      }
    }
    const validatePass100 = (rule, value, callback) => {
      console.log('value', value)
      if (value === undefined || value === null || value === '') {
        // callback(new Error('请选择供应商'))
        this.$notify.error({
          title: '错误',
          message: '请选择质检人员',
          offset: 100
        })
        callback()
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      // console.log(this.supplierId)
      if (this.personalForm.productCode === undefined || this.personalForm.productCode === null || this.personalForm.productCode === '') {
        callback(new Error('请选择抽检商品'))
      } else {
        callback()
      }
    }
    const validatePass10 = (rule, value, callback) => {
      // console.log(this.personalForm.checkQuantity)
      // console.log(this.personalForm.sampleQuantity)
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
      // 控制scope
      kongscope: '',
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
      checkPersonId: this.$store.getters.name,
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
      inspectionPersonId: this.$store.getters.name,
      // 控制报检人员
      stockControl: false,
      // 类别数据
      types: [],
      // 类别获取参数
      typeparms: {
        pagenum: 1,
        pagesize: 99999
      },
      arrivalQuantity: '',
      reportCheckingQuantity: '',
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
        inspectionPersonId: this.$store.getters.userId,
        isRecheck: 1,
        sourceType: '2',
        sampleQuantity: null,
        checkQuantity: null,
        failedQuantity: '',
        passQuantity: '',
        checkMode: '1',
        checkType: '1',
        checkDate: null,
        checkResult: '1',
        checkPersonId: this.$store.getters.userId,
        checkDeptId: this.$store.getters.deptId
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
      // 采购申请单明细数据
      list2: [],
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
          { required: true, validator: validatePass100, trigger: 'blur' }
        ],
        checkDeptId: [
          { required: true, message: '请选择检验部门', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getTypes()
    this.getdatatime()
  },
  beforeCreate() {
    _that = this
  },
  mounted() {
    this.getinformation()
  },
  methods: {
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
      this.personalForm.checkDate = currentdate
    },
    getinformation() {
      if (this.$store.getters.empcontract) {
        console.log('getempcontract', this.$store.getters.empcontract)
        this.personalForm.sourceType = '2'
        this.chooseType()
        this.allarrivalinfo(this.$store.getters.empcontract)
        // for (let i = 0; i < this.$store.getters.empcontract.advanceOrderDetailVos.length; i++) {
        //   this.$refs.editable.insert(this.$store.getters.empcontract.advanceOrderDetailVos[i])
        // }
        this.$store.dispatch('getempcontract', '')
      }
    },
    getcheckQuantity(row) {
      row.sampleQuantity = this.personalForm.sampleQuantity
      return row.sampleQuantity
    },
    getfailedQuantity(row) {
      // console.log(row.checkQuantity)
      // console.log(row.passQuantity)
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
      this.$refs.editable.clear()
      this.$refs.personalForm2.clearValidate()
      this.$refs.personalForm2.resetFields()
      this.$refs.personalForm3.clearValidate()
      this.$refs.personalForm3.resetFields()
      this.personalForm.productName = ''
      this.personalForm.unit = ''
      this.personalForm.typeId = ''
      this.personalForm.failedQuantity = ''
      this.personalForm.passRate = ''
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
    handlechoosestaff(scope) {
      this.staffcontrol = true
      this.kongscope = scope
    },
    chuli(scope, val) {
      console.log('scope', scope)
      console.log('val', val)
      // scope.row.checkPersonname = val.personName
      // scope.row.checkPersonId = val.id
      this.kongscope.row.checkPersonname = val.personName
      this.kongscope.row.checkPersonId = val.id
    },
    // 物品信息focus事件
    handlemater() {
      if (this.personalForm.sourceType === '1') {
        this.reportcontrol = true
      } else if (this.personalForm.sourceType === '2') {
        this.reportcontrol2 = true
      } else if (this.personalForm.sourceType === '3') {
        this.reportcontrol3 = true
      } else if (this.personalForm.sourceType === '4') {
        this.matercontrol = true
      }
    },
    adddetail(val) {
      this.$refs.editable.clear()
      const para = {}
      para.productCode = val
      para.pagenum = 1
      para.pagesize = 99
      console.log('para', para)
      searchCheckSet(para).then(res => {
        if (res.data.ret === 200) {
          const list = res.data.data.content.list
          if (list.length < 1) {
            this.$notify.error({
              title: '错误',
              message: '该物品未添加检验项目',
              offset: 100
            })
          }
          for (let i = 0; i < list.length; i++) {
            const re = {}
            re.checkItem = list[i].itemName
            re.chectResult = 1
            re.checkItemId = list[i].itemId
            re.checkContent = list[i].checkContent
            re.checkTools = list[i].checkTools
            re.checkQuantity = this.personalForm.sampleQuantity
            this.$refs.editable.insert(re)
          }
        } else {
          console.log('列表出错')
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 源单为质检申请单时返回数据
    report(val) {
      // console.log(val)
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
      this.personalForm.checkQuantity = (val.checkQuantity - val.checkedQuantity).toFixed(2)
      if (this.personalForm.checkQuantity < 3) {
        this.personalForm.sampleQuantity = 1
      }
      if (this.personalForm.checkQuantity >= 3 && this.personalForm.checkQuantity <= 100) {
        this.personalForm.sampleQuantity = 3
      }
      if (this.personalForm.checkQuantity >= 101 && this.personalForm.checkQuantity <= 500) {
        this.personalForm.sampleQuantity = 5
      }
      if (this.personalForm.checkQuantity >= 501 && this.personalForm.checkQuantity <= 1200) {
        this.personalForm.sampleQuantity = 8
      }
      if (this.personalForm.checkQuantity >= 1201 && this.personalForm.checkQuantity <= 3200) {
        this.personalForm.sampleQuantity = 12
      }
      // 增加明细
      this.adddetail(val.productCode)
    },
    // 源单为采购到货单时返回数据
    report2(val) {
      console.log(val)
      this.arrivalQuantity = val.arrivalQuantity
      this.reportCheckingQuantity = val.reportCheckingQuantity
      this.sourceSerialNumber = val.id
      this.personalForm.productCode = val.productCode
      this.personalForm.productName = val.productName
      this.personalForm.unit = val.unit
      this.personalForm.typeId = val.type
      this.personalForm.checkQuantity = val.arrivalQuantity - val.reportCheckingQuantity
      if (this.personalForm.checkQuantity < 3) {
        this.personalForm.sampleQuantity = 1
      }
      if (this.personalForm.checkQuantity >= 3 && this.personalForm.checkQuantity <= 100) {
        this.personalForm.sampleQuantity = 3
      }
      if (this.personalForm.checkQuantity >= 101 && this.personalForm.checkQuantity <= 500) {
        this.personalForm.sampleQuantity = 5
      }
      if (this.personalForm.checkQuantity >= 501 && this.personalForm.checkQuantity <= 1200) {
        this.personalForm.sampleQuantity = 8
      }
      if (this.personalForm.checkQuantity >= 1201 && this.personalForm.checkQuantity <= 3200) {
        this.personalForm.sampleQuantity = 12
      }
      this.typeId = val.typeName
      this.personalForm.sourceSerialNumber = val.id
      // 增加明细
      this.adddetail(val.productCode)
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
      this.personalForm.checkQuantity = (val.produceQuantity - val.alreadyProduceQuantity).toFixed(2)
      if (this.personalForm.checkQuantity < 3) {
        this.personalForm.sampleQuantity = 1
      }
      if (this.personalForm.checkQuantity >= 3 && this.personalForm.checkQuantity <= 100) {
        this.personalForm.sampleQuantity = 3
      }
      if (this.personalForm.checkQuantity >= 101 && this.personalForm.checkQuantity <= 500) {
        this.personalForm.sampleQuantity = 5
      }
      if (this.personalForm.checkQuantity >= 501 && this.personalForm.checkQuantity <= 1200) {
        this.personalForm.sampleQuantity = 8
      }
      if (this.personalForm.checkQuantity >= 1201 && this.personalForm.checkQuantity <= 3200) {
        this.personalForm.sampleQuantity = 12
      }
      // 增加明细
      this.adddetail(val.productCode)
    },
    mater(val) {
      console.log(123)
      this.sourceSerialNumber = val.id
      this.personalForm.productCode = val.code
      this.personalForm.productName = val.productName
      this.personalForm.unit = val.stockMeasu
      this.personalForm.typeId = val.typeId
      this.typeId = val.productType
      const para = {}
      para.productCode = val.code
      console.log('para', para)
      searchCheckSet(para).then(res => {
        if (res.data.ret === 200) {
          // this.list = res.data.data.content.list
        } else {
          console.log('列表出错')
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
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
        if (this.personalForm.checkQuantity >= 3 && this.personalForm.checkQuantity <= 100) {
          this.personalForm.sampleQuantity = 3
        }
        if (this.personalForm.checkQuantity >= 101 && this.personalForm.checkQuantity <= 500) {
          this.personalForm.sampleQuantity = 5
        }
        if (this.personalForm.checkQuantity >= 501 && this.personalForm.checkQuantity <= 1200) {
          this.personalForm.sampleQuantity = 8
        }
        if (this.personalForm.checkQuantity >= 1201 && this.personalForm.checkQuantity <= 3200) {
          this.personalForm.sampleQuantity = 12
        }
      }
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
      console.log(this.personalForm.passQuantity)
      console.log(this.personalForm.sampleQuantity)
      if (this.personalForm.passQuantity > this.personalForm.sampleQuantity) {
        this.$notify.error({
          title: '错误',
          message: '合格数量不能大于抽样数量',
          offset: 100
        })
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
      console.log(123)
      this.$refs.editable.clear()
      this.$refs.personalForm2.clearValidate()
      this.$refs.personalForm2.resetFields()
      this.$refs.personalForm3.clearValidate()
      this.$refs.personalForm3.resetFields()
      this.personalForm.productName = ''
      this.personalForm.unit = ''
      this.personalForm.typeId = ''
      this.personalForm.failedQuantity = ''
      this.personalForm.passRate = ''
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
    allarrivalinfodata(val) {
      console.log(123)
      this.$refs.editable.clear()
      this.$refs.personalForm2.clearValidate()
      this.$refs.personalForm2.resetFields()
      this.$refs.personalForm3.clearValidate()
      this.$refs.personalForm3.resetFields()
      this.personalForm.productName = ''
      this.personalForm.unit = ''
      this.personalForm.typeId = ''
      this.personalForm.failedQuantity = ''
      this.personalForm.passRate = ''
      const lis = []
      for (let i = 0; i < val.stockArrivalDetailVos.length; i++) {
        console.log('val.arrivalQuantity - val.reportCheckingQuantity', val)
        if ((val.stockArrivalDetailVos[i].arrivalQuantity - val.stockArrivalDetailVos[i].reportCheckingQuantity) > 0) {
          val.stockArrivalDetailVos[i].checkQuantity = (val.stockArrivalDetailVos[i].arrivalQuantity - val.stockArrivalDetailVos[i].reportCheckingQuantity).toFixed(2)
          lis.push(val.stockArrivalDetailVos[i])
        }
      }
      this.reportdata2 = lis
      this.personalForm.sourceNumber = val.number
      this.personalForm.supplierId = val.supplierId
      this.supplierId = val.supplierName
      this.personalForm.inspectionDeptId = val.deptId
      // this.sourceSerialNumber = val.sourceSerialNumber
    },
    // 源单类型为生产任务单
    produce(val) {
      console.log(123)
      this.$refs.editable.clear()
      this.$refs.personalForm2.clearValidate()
      this.$refs.personalForm2.resetFields()
      this.$refs.personalForm3.clearValidate()
      this.$refs.personalForm3.resetFields()
      this.personalForm.productName = ''
      this.personalForm.unit = ''
      this.personalForm.typeId = ''
      this.personalForm.failedQuantity = ''
      this.personalForm.passRate = ''
      this.reportdata3 = val.produceTaskDetailVos
      this.personalForm.sourceNumber = val.taskNumber
      this.personalForm.inspectionDeptId = val.produceDeptId
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
        inspectionPersonId: this.$store.getters.userId,
        isRecheck: 1,
        sourceType: '2',
        sampleQuantity: null,
        checkQuantity: null,
        failedQuantity: '',
        passQuantity: '',
        checkMode: '1',
        checkType: '1',
        checkDate: null,
        checkResult: '1'
      }
      this.inspectionPersonId = this.$store.getters.name
      this.supplierId = null
      this.workCenterId = null
      this.produceManagerId = null
      this.checkPersonId = null
      this.getdatatime()
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
      if (this.personalForm.passQuantity > this.personalForm.sampleQuantity) {
        this.$notify.error({
          title: '错误',
          message: '合格数量不能大于抽样数量',
          offset: 100
        })
        return false
      }
      console.log(this.personalForm.sourceType)
      if (this.personalForm.sourceType === '2') {
        console.log(this.personalForm.sourceType)
        console.log(this.personalForm.checkQuantity > (this.arrivalQuantity - this.reportCheckingQuantity))
        if (this.personalForm.checkQuantity > (this.arrivalQuantity - this.reportCheckingQuantity)) {
          this.$notify.error({
            title: '错误',
            message: '质检数量超过关联单据数量',
            offset: 100
          })
          return false
        }
      }
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        delete elem.checkItem
        if (elem.checkContent === null || elem.checkContent === '' || elem.checkContent === undefined) {
          delete elem.checkContent
        }
        if (elem.checkTools === null || elem.checkTools === '' || elem.checkTools === undefined) {
          delete elem.checkTools
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
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
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
</style>
