<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" style="margin: auto;font-size: 14px;" >注: <span style="color: dodgerblue">蓝色的字体</span>是额定成本法必填项,<span style="color: red">红色的字体</span>是额定比例法必填项</h2>
      </el-card>
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container" style="margin-top: 37px;">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="left" label-width="205px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.accountTime')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.accountTime"
                    :placeholder="$t('updates.xzy')"
                    type="month"
                    style="margin-left: 11px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.productName')" prop="productCode" style="width: 100%;">
                  <el-input v-model="personalForm.productName" style="margin-left: 11px;width:200px" @focus="handlemater"/>
                  <my-mater :matercontrol.sync="matercontrol" @mater="mater"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.accountType')" style="width: 100%;">
                  <el-select v-model="personalForm.accountType" value="personalForm.accountType" style="margin-left: 11px;width: 200px" @change="change()">
                    <el-option value="1" label="约当产量法"/>
                    <el-option value="2" label="定额成本法"/>
                    <el-option value="3" label="定额比例法"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.completeRate')+'%'" prop="completeRate" style="width: 100%;">
                  <!--                  <el-input v-model="personalForm.completeRate" :placeholder="placeholder" class="number__input" type="number" style="margin-left: 11px;width: 200px" clearable @input="oninput" @blur="completeRate()"/>-->
                  <el-input-number v-model="personalForm.completeRate" :precision="2" :controls="false" :step="0.1" :min="0" :max="100" style="margin-left: 11px;width: 200px;text-align: left" @blur="completeRate()"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.isInput')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.isInput" style="margin-left: 11px;width: 200px" >
                    <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                    <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.finishQuantity')" prop="finishQuantity" style="width: 100%;">
                  <!--                  <el-input v-model="personalForm.finishQuantity" style="margin-left: 11px;width: 200px" clearable @blur="completeRate()"/>-->
                  <el-input-number v-model="personalForm.finishQuantity" :precision="2" :controls="false" :step="0.1" :min="0" style="margin-left: 11px;width: 200px;text-align: left" @blur="completeRate()"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.producingQuantity')" prop="producingQuantity" style="width: 100%;">
                  <!--                  <el-input v-model="personalForm.producingQuantity" style="margin-left: 11px;width: 200px" clearable @blur="completeRate()"/>-->
                  <el-input-number v-model="personalForm.producingQuantity" :precision="2" :controls="false" :step="0.1" :min="0" style="margin-left: 11px;width: 200px;text-align: left" @blur="completeRate()"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.producingMaterialsQuantity')" style="width: 100%;" class="bluelable">
                  <!--                  <el-input v-model="personalForm.producingMaterialsQuantity" style="margin-left: 11px;width: 200px" clearable @blur="completeRate()"/>-->
                  <el-input-number v-model="personalForm.producingMaterialsQuantity" :disabled="blue" :precision="2" :controls="false" :step="0.1" :min="0" style="margin-left: 11px;width: 200px;text-align: left" @blur="completeRate()"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.producingSalary')" style="width: 100%;" class="bluelable">
                  <!--                  <el-input v-model="personalForm.producingSalary" style="margin-left: 11px;width: 200px" clearable @blur="completeRate()"/>-->
                  <el-input-number v-model="personalForm.producingSalary" :precision="2" :disabled="blue" :controls="false" :step="0.1" :min="0" style="margin-left: 11px;width: 200px;text-align: left" @blur="completeRate()"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.producingCost')" style="width: 100%;" class="bluelable">
                  <!--                  <el-input v-model="personalForm.producingCost" style="margin-left: 11px;width: 200px" clearable @blur="completeRate()"/>-->
                  <el-input-number v-model="personalForm.producingCost" :precision="2" :disabled="blue" :controls="false" :step="0.1" :min="0" style="margin-left: 11px;width: 200px;text-align: left" @blur="completeRate()"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.finishMaterialsUsedQuantity')" style="width: 100%;" class="redable">
                  <!--                  <el-input v-model="personalForm.finishMaterialsUsedQuantity" style="margin-left: 11px;width: 200px" clearable @blur="completeRate()"/>-->
                  <el-input-number v-model="personalForm.finishMaterialsUsedQuantity" :disabled="red" :precision="2" :controls="false" :step="0.1" :min="0" style="margin-left: 11px;width: 200px;text-align: left" @blur="completeRate()"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.finishWorkHours')" style="width: 100%;" class="redable">
                  <!--                  <el-input v-model="personalForm.finishWorkHours" style="margin-left: 11px;width: 200px" clearable @blur="completeRate()"/>-->
                  <el-input-number v-model="personalForm.finishWorkHours" :precision="2" :disabled="red" :controls="false" :step="0.1" :min="0" style="margin-left: 11px;width: 200px;text-align: left" @blur="completeRate()"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.endMaterialsQuantity')" style="width: 100%;" class="redable">
                  <!--                  <el-input v-model="personalForm.endMaterialsQuantity" style="margin-left: 11px;width: 200px" clearable @blur="completeRate()"/>-->
                  <el-input-number v-model="personalForm.endMaterialsQuantity" :precision="2" :disabled="red" :controls="false" :step="0.1" :min="0" style="margin-left: 11px;width: 200px;text-align: left" @blur="completeRate()"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.endWorkHours')" style="width: 100%;" class="redable">
                  <!--                  <el-input v-model="personalForm.endWorkHours" style="margin-left: 11px;width: 200px" clearable @blur="completeRate()"/>-->
                  <el-input-number v-model="personalForm.endWorkHours" :precision="2" :disabled="red" :controls="false" :step="0.1" :min="0" style="margin-left: 11px;width: 200px;text-align: left" @blur="completeRate()"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProductCost.currency')" style="width: 100%;">
                  <el-select v-model="personalForm.currency" value="personalForm.checkMode" style="margin-left: 11px;width: 200px" >
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
        <h2 ref="fuzhu" class="form-name" >{{ $t('updates.cbfymx') }}</h2>
        <div class="container">
          <el-row :gutter="20" style="margin-top: 30px">
            <el-col :span="24">
              <div style="width: 100%; min-height: 300px;" >
                <el-row :gutter="20" style="margin-top: 26px">
                  <el-col :span="24">
                    <div style="width: 100%; min-height: 400px;" >
                      <el-table
                        ref="totaltable"
                        :data.sync="list2"
                        :border="true"
                        style="width: 100%">
                        <el-table-column
                          :label="$t('updates.cpcb')"
                          prop="productCost"
                          min-width="140"
                          align="center"/>
                        <el-table-column
                          :label="$t('updates.zjclfy')"
                          prop="material"
                          min-width="140"
                          align="center">
                          <template slot-scope="scope">
                            <span v-show="scope.$index >= 2" @click="getscope(scope)">{{ scope.row.material }}</span>
                            <!--                            <el-input v-show="scope.$index < 2" v-model="scope.row.material" style="width: 130px;" @blur="material('1')"/>-->
                            <el-input-number v-show="scope.$index < 2" v-model="scope.row.material" :precision="2" :controls="false" :step="0.1" :min="0" style="width: 130px;" @blur="material('1')"/>
                          </template>
                        </el-table-column>
                        <el-table-column
                          :label="$t('updates.zjrgfy')"
                          prop="man"
                          min-width="140"
                          align="center">
                          <template slot-scope="scope">
                            <span v-show="scope.$index >= 2" @click="getscope(scope)">{{ scope.row.man }}</span>
                            <!--                            <el-input v-show="scope.$index < 2" v-model="scope.row.man" style="width: 130px;" @blur="man('1')" />-->
                            <el-input-number v-show="scope.$index < 2" v-model="scope.row.man" :precision="2" :controls="false" :step="0.1" :min="0" style="width: 130px;" @blur="man('1')"/>
                          </template>
                        </el-table-column>
                        <el-table-column
                          :label="$t('updates.zzfy')"
                          prop="produce"
                          min-width="140"
                          align="center">
                          <template slot-scope="scope">
                            <span v-show="scope.$index >= 2" @click="getscope(scope)">{{ scope.row.produce }}</span>
                            <!--                            <el-input v-show="scope.$index < 2" v-model="scope.row.produce" style="width: 130px;" @blur="produce('1')"/>-->
                            <el-input-number v-show="scope.$index < 2" v-model="scope.row.produce" :precision="2" :controls="false" :step="0.1" :min="0" style="width: 130px;" @blur="produce('1')"/>
                          </template>
                        </el-table-column>
                        <el-table-column
                          :label="$t('updates.fyhj')"
                          prop="total"
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
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { addProduceCost } from '@/api/ProduceCost'
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
// eslint-disable-next-line no-unused-vars
var _that
export default {
  name: 'AddProductCost',
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
    // const validatePass11 = (rule, value, callback) => {
    //   console.log(this.personalForm.checkQuantity)
    //   console.log(this.personalForm.sampleQuantity)
    //   if (this.personalForm.sampleQuantity === undefined || this.personalForm.sampleQuantity === null || this.personalForm.sampleQuantity === '') {
    //     callback(new Error('请输入完工比例'))
    //   } else if (Number(this.personalForm.sampleQuantity) > Number(this.personalForm.checkQuantity)) {
    //     console.log('132')
    //     callback(new Error('抽样数量不能大于报检数量'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      blue: true,
      red: true,
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
        accountType: '1',
        completeRate: null,
        finishQuantity: null,
        producingQuantity: null,
        producingMaterialsQuantity: null,
        producingSalary: null,
        producingCost: null,
        endWorkHours: null,
        endMaterialsQuantity: null,
        finishWorkHours: null,
        finishMaterialsUsedQuantity: null
      },
      personalForm2: {
      },
      // 采购申请单规则数据
      personalrules: {
        completeRate: [
          { required: true, message: '请输入完工比例', trigger: 'blur' }
        ],
        finishQuantity: [
          { required: true, message: '请输入完工数量', trigger: 'blur' }
        ],
        producingQuantity: [
          { required: true, message: '请输入在产品数量', trigger: 'blur' }
        ],
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
          total: '0.00'
        },
        {
          productCost: '本月发生生产费用',
          material: '',
          man: '',
          produce: '',
          total: '0.00'
        },
        {
          productCost: '合计',
          material: '0.00',
          man: '0.00',
          produce: '0.00',
          total: '0.00'
        },
        {
          productCost: '完工产品总成本',
          material: '0.00',
          man: '0.00',
          produce: '0.00',
          total: '0.00'
        },
        {
          productCost: '单位成本',
          material: '0.00',
          man: '0.00',
          produce: '0.00',
          total: '0.00'
        },
        {
          productCost: '月末在产品成本',
          material: '0.00',
          man: '0.00',
          produce: '0.00',
          total: '0.00'
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
    material(val) {
      console.log('123', this.personalForm.accountType)
      if (this.personalForm.accountType === '1') {
        if (val === '1') {
          if (this.personalForm.completeRate === '' || this.personalForm.completeRate === null || this.personalForm.completeRate === undefined || this.personalForm.finishQuantity === '' || this.personalForm.finishQuantity === null || this.personalForm.finishQuantity === undefined || this.personalForm.producingQuantity === '' || this.personalForm.producingQuantity === null || this.personalForm.producingQuantity === undefined) {
            this.change()
            this.$notify.error({
              title: '错误',
              message: '上方字段未填写完整',
              offset: 100
            })
            return false
          }
        }
        // else {
        console.log(this.list2[0].man)
        if (this.list2[0].man === 0) {
          console.log(111)
        }
        if (this.list2[0].man === '0') {
          console.log(222)
        }
        if (this.list2[0].man !== 0 || this.list2[1].man !== 0 || this.list2[0].material !== 0 || this.list2[1].material !== 0 || this.list2[0].produce !== 0 || this.list2[1].produce !== 0) {
          // 列合计
          this.list2[2].material = (Number(this.list2[0].material) + Number(this.list2[1].material)).toFixed(2)
          console.log(Number(this.list2[0].material))
          //         1.约当产量法：
          // 在产品约当产量＝在产品数量×完工百分比（完工率）
          // 某项费用分配率＝该项费用总额÷（完工产品产量＋在产品约当产量）
          // 完工产品该项成本＝完工产品数量×费用分配率
          //         月末在产品该项成本＝在产品数量×费用分配率
          //         或 ＝费用总额－完工产品费用
          // 在产品约当产量＝在产品数量×完工百分比（完工率）
          const yuedang = (Number(this.personalForm.producingQuantity) * Number(this.personalForm.completeRate) / 100).toFixed(2)
          // 某项费用分配率＝该项费用总额÷（完工产品产量＋在产品约当产量）
          const moneyRate = (Number(this.list2[2].material) / (Number(this.personalForm.finishQuantity) + Number(yuedang))).toFixed(2)
          // 完工产品该项成本＝完工产品数量×费用分配率
          const cost = (Number(this.personalForm.finishQuantity) * moneyRate).toFixed(2)
          // 完工产品总成本
          this.list2[3].material = cost
          // 月末在产品成本
          this.list2[5].material = (this.list2[2].material - this.list2[3].material).toFixed(2)
          // 单位成本=完工产品总成本/完工数量
          this.list2[4].material = (this.list2[3].material / this.personalForm.finishQuantity).toFixed(2)
          // 行合计
          this.list2[0].total = (Number(this.list2[0].material) + Number(this.list2[0].man) + Number(this.list2[0].produce)).toFixed(2)
          this.list2[1].total = (Number(this.list2[1].material) + Number(this.list2[1].man) + Number(this.list2[1].produce)).toFixed(2)
          this.list2[2].total = (Number(this.list2[2].material) + Number(this.list2[2].man) + Number(this.list2[2].produce)).toFixed(2)
          this.list2[3].total = (Number(this.list2[3].material) + Number(this.list2[3].man) + Number(this.list2[3].produce)).toFixed(2)
          this.list2[4].total = (Number(this.list2[4].material) + Number(this.list2[4].man) + Number(this.list2[4].produce)).toFixed(2)
          this.list2[5].total = (Number(this.list2[5].material) + Number(this.list2[5].man) + Number(this.list2[5].produce)).toFixed(2)
        }
      }
      // }
      if (this.personalForm.accountType === '2') {
        // 2.定额成本发
        // 这种分配方法是按照预先制定的定额成本计算月末在产品成本，
        // 即月末在产品成本按其在产品数量和单位定额成本计算。某种产品应负担的全部费用（月初在产品费用加本月生产费用），
        // 减月末在产品的定额成本，其余额作为完工产品成本。该方法适用于各项消耗定额或费用定额比较准确、稳定，而且各月在产品数量变化不大的产品。
        if (val === '1') {
          if (this.personalForm.finishQuantity === '' || this.personalForm.finishQuantity === null || this.personalForm.finishQuantity === undefined || this.personalForm.producingMaterialsQuantity === '' || this.personalForm.producingMaterialsQuantity === null || this.personalForm.producingMaterialsQuantity === undefined || this.personalForm.producingQuantity === '' || this.personalForm.producingQuantity === null || this.personalForm.producingQuantity === undefined || this.personalForm.producingSalary === '' || this.personalForm.producingSalary === null || this.personalForm.producingSalary === undefined || this.personalForm.producingCost === '' || this.personalForm.producingCost === null || this.personalForm.producingCost === undefined) {
            this.change()
            this.$notify.error({
              title: '错误',
              message: '上方字段未填写完整',
              offset: 100
            })
            return false
          }
        }
        if (this.list2[0].man !== 0 || this.list2[1].man !== 0 || this.list2[0].material !== 0 || this.list2[1].material !== 0 || this.list2[0].produce !== 0 || this.list2[1].produce !== 0) {
          // 按照预先制定的定额成本计算月末在产品成本
          this.list2[5].material = this.personalForm.producingMaterialsQuantity
          this.list2[5].man = this.personalForm.producingSalary
          this.list2[5].produce = this.personalForm.producingCost
          // 列合计
          this.list2[2].material = (Number(this.list2[0].material) + Number(this.list2[1].material)).toFixed(2)
          // 完工产品成本
          this.list2[3].material = (this.list2[2].material - this.list2[5].material).toFixed(2)
          // 单位成本=完工产品总成本/完工数量
          this.list2[4].material = (this.list2[3].material / this.personalForm.finishQuantity).toFixed(2)
          // 行合计
          this.list2[0].total = (Number(this.list2[0].material) + Number(this.list2[0].man) + Number(this.list2[0].produce)).toFixed(2)
          this.list2[1].total = (Number(this.list2[1].material) + Number(this.list2[1].man) + Number(this.list2[1].produce)).toFixed(2)
          this.list2[2].total = (Number(this.list2[2].material) + Number(this.list2[2].man) + Number(this.list2[2].produce)).toFixed(2)
          this.list2[3].total = (Number(this.list2[3].material) + Number(this.list2[3].man) + Number(this.list2[3].produce)).toFixed(2)
          this.list2[4].total = (Number(this.list2[4].material) + Number(this.list2[4].man) + Number(this.list2[4].produce)).toFixed(2)
          this.list2[5].total = (Number(this.list2[5].material) + Number(this.list2[5].man) + Number(this.list2[5].produce)).toFixed(2)
        }
      }
      if (this.personalForm.accountType === '3') {
        // 2.定额成本发
        // 这种分配方法是按照预先制定的定额成本计算月末在产品成本，
        // 即月末在产品成本按其在产品数量和单位定额成本计算。某种产品应负担的全部费用（月初在产品费用加本月生产费用），
        // 减月末在产品的定额成本，其余额作为完工产品成本。该方法适用于各项消耗定额或费用定额比较准确、稳定，而且各月在产品数量变化不大的产品。
        if (val === '1') {
          if (this.personalForm.finishQuantity === '' || this.personalForm.finishQuantity === null || this.personalForm.finishQuantity === undefined || this.personalForm.endWorkHours === '' || this.personalForm.endWorkHours === null || this.personalForm.endWorkHours === undefined || this.personalForm.producingQuantity === '' || this.personalForm.producingQuantity === null || this.personalForm.producingQuantity === undefined || this.personalForm.endMaterialsQuantity === '' || this.personalForm.endMaterialsQuantity === null || this.personalForm.endMaterialsQuantity === undefined || this.personalForm.finishWorkHours === '' || this.personalForm.finishWorkHours === null || this.personalForm.finishWorkHours === undefined || this.personalForm.finishMaterialsUsedQuantity === '' || this.personalForm.finishMaterialsUsedQuantity === null || this.personalForm.finishMaterialsUsedQuantity === undefined) {
            this.change()
            this.$notify.error({
              title: '错误',
              message: '上方字段未填写完整',
              offset: 100
            })
            return false
          }
        }
        if (this.list2[0].man !== 0 || this.list2[1].man !== 0 || this.list2[0].material !== 0 || this.list2[1].material !== 0 || this.list2[0].produce !== 0 || this.list2[1].produce !== 0) {
          // 消耗量分配率＝（月初在产品成本＋本月发生生产费用）÷（完工产品定额消耗量＋月末在产品定额消耗量）
          //  完工产品实际消耗量＝完工产品定额消耗量×消耗量分配率
          //   完工产品成本＝完工产品实际消耗量×原材料单价（完工产品定额/完工数量）
          // 月末在产品实际消耗量＝月末在产品定额消耗量×消耗量分配率
          //   月末在产品成本＝月末在产品实际消耗量×原材料单价（完工产品定额/完工数量）
          // 列合计
          this.list2[2].material = (Number(this.list2[0].material) + Number(this.list2[1].material)).toFixed(2)
          // 消耗量分配率＝（月初在产品成本＋本月发生生产费用）÷（完工产品定额消耗量＋月末在产品定额消耗量）
          const xiaohao = ((this.list2[2].material) / (Number(this.personalForm.finishMaterialsUsedQuantity) + Number(this.personalForm.endMaterialsQuantity))).toFixed(2)
          //  完工产品实际消耗量＝完工产品定额消耗量×消耗量分配率
          const actualrate = (this.personalForm.finishMaterialsUsedQuantity * xiaohao).toFixed(2)
          //   完工产品成本＝完工产品实际消耗量×原材料单价（完工产品定额/完工数量）
          const overCost = (actualrate * (this.personalForm.finishMaterialsUsedQuantity / this.personalForm.finishQuantity)).toFixed(2)
          this.list2[3].material = overCost
          // 月末在产品实际消耗量＝月末在产品定额消耗量×消耗量分配率
          const actualCost = (this.personalForm.endMaterialsQuantity * xiaohao).toFixed(2)
          //   月末在产品成本＝月末在产品实际消耗量×原材料单价（完工产品定额/完工数量）
          const endCost = (actualCost * (this.personalForm.finishMaterialsUsedQuantity / this.personalForm.finishQuantity)).toFixed(2)
          this.list2[5].material = endCost
          // 单位成本=完工产品总成本/完工数量
          this.list2[4].material = (this.list2[3].material / this.personalForm.finishQuantity).toFixed(2)
          // 行合计
          this.list2[0].total = (Number(this.list2[0].material) + Number(this.list2[0].man) + Number(this.list2[0].produce)).toFixed(2)
          this.list2[1].total = (Number(this.list2[1].material) + Number(this.list2[1].man) + Number(this.list2[1].produce)).toFixed(2)
          this.list2[2].total = (Number(this.list2[2].material) + Number(this.list2[2].man) + Number(this.list2[2].produce)).toFixed(2)
          this.list2[3].total = (Number(this.list2[3].material) + Number(this.list2[3].man) + Number(this.list2[3].produce)).toFixed(2)
          this.list2[4].total = (Number(this.list2[4].material) + Number(this.list2[4].man) + Number(this.list2[4].produce)).toFixed(2)
          this.list2[5].total = (Number(this.list2[5].material) + Number(this.list2[5].man) + Number(this.list2[5].produce)).toFixed(2)
        }
      }
    },
    man(val) {
      console.log('123', this.personalForm.accountType)
      if (this.personalForm.accountType === '1') {
        if (val === '1') {
          if (this.personalForm.completeRate === '' || this.personalForm.completeRate === null || this.personalForm.completeRate === undefined || this.personalForm.finishQuantity === '' || this.personalForm.finishQuantity === null || this.personalForm.finishQuantity === undefined || this.personalForm.producingQuantity === '' || this.personalForm.producingQuantity === null || this.personalForm.producingQuantity === undefined) {
            this.change()
            this.$notify.error({
              title: '错误',
              message: '上方字段未填写完整',
              offset: 100
            })
            return false
          }
        }
        // else {
        console.log('啊啊啊', this.list2[0].man)
        if (this.list2[0].man !== 0 || this.list2[1].man !== 0 || this.list2[0].material !== 0 || this.list2[1].material !== 0 || this.list2[0].produce !== 0 || this.list2[1].produce !== 0) {
          // 列合计
          this.list2[2].man = (Number(this.list2[0].man) + Number(this.list2[1].man)).toFixed(2)
          console.log(Number(this.list2[0].man))
          //         1.约当产量法：
          // 在产品约当产量＝在产品数量×完工百分比（完工率）
          // 某项费用分配率＝该项费用总额÷（完工产品产量＋在产品约当产量）
          // 完工产品该项成本＝完工产品数量×费用分配率
          //         月末在产品该项成本＝在产品数量×费用分配率
          //         或 ＝费用总额－完工产品费用
          // 在产品约当产量＝在产品数量×完工百分比（完工率）
          const yuedang = (Number(this.personalForm.producingQuantity) * Number(this.personalForm.completeRate) / 100).toFixed(2)
          // 某项费用分配率＝该项费用总额÷（完工产品产量＋在产品约当产量）
          const moneyRate = (Number(this.list2[2].man) / (Number(this.personalForm.finishQuantity) + Number(yuedang))).toFixed(2)
          // 完工产品该项成本＝完工产品数量×费用分配率
          const cost = (Number(this.personalForm.finishQuantity) * moneyRate).toFixed(2)
          // 完工产品总成本
          this.list2[3].man = cost
          // 月末在产品成本
          this.list2[5].man = (this.list2[2].man - this.list2[3].man).toFixed(2)
          // 单位成本=完工产品总成本/完工数量
          this.list2[4].man = (this.list2[3].man / this.personalForm.finishQuantity).toFixed(2)
          // 行合计
          this.list2[0].total = (Number(this.list2[0].material) + Number(this.list2[0].man) + Number(this.list2[0].produce)).toFixed(2)
          this.list2[1].total = (Number(this.list2[1].material) + Number(this.list2[1].man) + Number(this.list2[1].produce)).toFixed(2)
          this.list2[2].total = (Number(this.list2[2].material) + Number(this.list2[2].man) + Number(this.list2[2].produce)).toFixed(2)
          this.list2[3].total = (Number(this.list2[3].material) + Number(this.list2[3].man) + Number(this.list2[3].produce)).toFixed(2)
          this.list2[4].total = (Number(this.list2[4].material) + Number(this.list2[4].man) + Number(this.list2[4].produce)).toFixed(2)
          this.list2[5].total = (Number(this.list2[5].material) + Number(this.list2[5].man) + Number(this.list2[5].produce)).toFixed(2)
        }
      }
      if (this.personalForm.accountType === '2') {
        // 2.定额成本发
        // 这种分配方法是按照预先制定的定额成本计算月末在产品成本，
        // 即月末在产品成本按其在产品数量和单位定额成本计算。某种产品应负担的全部费用（月初在产品费用加本月生产费用），
        // 减月末在产品的定额成本，其余额作为完工产品成本。该方法适用于各项消耗定额或费用定额比较准确、稳定，而且各月在产品数量变化不大的产品。
        if (val === '1') {
          if (this.personalForm.finishQuantity === '' || this.personalForm.finishQuantity === null || this.personalForm.finishQuantity === undefined || this.personalForm.finishQuantity === '' || this.personalForm.producingMaterialsQuantity === null || this.personalForm.producingMaterialsQuantity === undefined || this.personalForm.producingQuantity === '' || this.personalForm.producingQuantity === null || this.personalForm.producingQuantity === undefined || this.personalForm.producingSalary === '' || this.personalForm.producingSalary === null || this.personalForm.producingSalary === undefined || this.personalForm.producingCost === '' || this.personalForm.producingCost === null || this.personalForm.producingCost === undefined) {
            this.change()
            this.$notify.error({
              title: '错误',
              message: '上方字段未填写完整',
              offset: 100
            })
            return false
          }
        }
        if (this.list2[0].man !== 0 || this.list2[1].man !== 0 || this.list2[0].material !== 0 || this.list2[1].material !== 0 || this.list2[0].produce !== 0 || this.list2[1].produce !== 0) {
          // 按照预先制定的定额成本计算月末在产品成本
          this.list2[5].material = this.personalForm.producingMaterialsQuantity
          this.list2[5].man = this.personalForm.producingSalary
          this.list2[5].produce = this.personalForm.producingCost
          // 列合计
          this.list2[2].man = (Number(this.list2[0].man) + Number(this.list2[1].man)).toFixed(2)
          // 完工产品成本
          this.list2[3].man = (this.list2[2].man - this.list2[5].man).toFixed(2)
          // 单位成本=完工产品总成本/完工数量
          this.list2[4].man = (this.list2[3].man / this.personalForm.finishQuantity).toFixed(2)
          // 行合计
          this.list2[0].total = (Number(this.list2[0].material) + Number(this.list2[0].man) + Number(this.list2[0].produce)).toFixed(2)
          this.list2[1].total = (Number(this.list2[1].material) + Number(this.list2[1].man) + Number(this.list2[1].produce)).toFixed(2)
          this.list2[2].total = (Number(this.list2[2].material) + Number(this.list2[2].man) + Number(this.list2[2].produce)).toFixed(2)
          this.list2[3].total = (Number(this.list2[3].material) + Number(this.list2[3].man) + Number(this.list2[3].produce)).toFixed(2)
          this.list2[4].total = (Number(this.list2[4].material) + Number(this.list2[4].man) + Number(this.list2[4].produce)).toFixed(2)
          this.list2[5].total = (Number(this.list2[5].material) + Number(this.list2[5].man) + Number(this.list2[5].produce)).toFixed(2)
        }
      }
      if (this.personalForm.accountType === '3') {
        // 2.定额成本发
        // 这种分配方法是按照预先制定的定额成本计算月末在产品成本，
        // 即月末在产品成本按其在产品数量和单位定额成本计算。某种产品应负担的全部费用（月初在产品费用加本月生产费用），
        // 减月末在产品的定额成本，其余额作为完工产品成本。该方法适用于各项消耗定额或费用定额比较准确、稳定，而且各月在产品数量变化不大的产品。
        if (val === '1') {
          if (this.personalForm.finishQuantity === '' || this.personalForm.finishQuantity === null || this.personalForm.finishQuantity === undefined || this.personalForm.endWorkHours === '' || this.personalForm.endWorkHours === null || this.personalForm.endWorkHours === undefined || this.personalForm.producingQuantity === '' || this.personalForm.producingQuantity === null || this.personalForm.producingQuantity === undefined || this.personalForm.endMaterialsQuantity === '' || this.personalForm.endMaterialsQuantity === null || this.personalForm.endMaterialsQuantity === undefined || this.personalForm.finishWorkHours === '' || this.personalForm.finishWorkHours === null || this.personalForm.finishWorkHours === undefined || this.personalForm.finishMaterialsUsedQuantity === '' || this.personalForm.finishMaterialsUsedQuantity === null || this.personalForm.finishMaterialsUsedQuantity === undefined) {
            this.change()
            this.$notify.error({
              title: '错误',
              message: '上方字段未填写完整',
              offset: 100
            })
            return false
          }
        }
        if (this.list2[0].man !== 0 || this.list2[1].man !== 0 || this.list2[0].material !== 0 || this.list2[1].material !== 0 || this.list2[0].produce !== 0 || this.list2[1].produce !== 0) {
          // 消耗量分配率＝（月初在产品成本＋本月发生生产费用）÷（完工产品定额消耗量＋月末在产品定额消耗量）
          //  完工产品实际消耗量＝完工产品定额消耗量×消耗量分配率
          //   完工产品成本＝完工产品实际消耗量×原材料单价（完工产品定额/完工数量）
          // 月末在产品实际消耗量＝月末在产品定额消耗量×消耗量分配率
          //   月末在产品成本＝月末在产品实际消耗量×原材料单价（完工产品定额/完工数量）
          // 列合计
          this.list2[2].man = (Number(this.list2[0].man) + Number(this.list2[1].man)).toFixed(2)
          // 消耗量分配率＝（月初在产品成本＋本月发生生产费用）÷（完工产品定额消耗量＋月末在产品定额消耗量）
          const xiaohao = ((this.list2[2].man) / (Number(this.personalForm.finishWorkHours) + Number(this.personalForm.endWorkHours))).toFixed(2)
          //  完工产品实际消耗量＝完工产品定额消耗量×消耗量分配率
          const actualrate = (this.personalForm.finishWorkHours * xiaohao).toFixed(2)
          //   完工产品成本＝完工产品实际消耗量×原材料单价（完工产品定额/完工数量）
          const overCost = (actualrate * (this.personalForm.finishWorkHours / this.personalForm.finishQuantity)).toFixed(2)
          this.list2[3].man = overCost
          // 月末在产品实际消耗量＝月末在产品定额消耗量×消耗量分配率
          const actualCost = (this.personalForm.endWorkHours * xiaohao).toFixed(2)
          //   月末在产品成本＝月末在产品实际消耗量×原材料单价（完工产品定额/完工数量）
          const endCost = (actualCost * (this.personalForm.finishWorkHours / this.personalForm.finishQuantity)).toFixed(2)
          this.list2[5].man = endCost
          // 单位成本=完工产品总成本/完工数量
          this.list2[4].man = (this.list2[3].material / this.personalForm.finishQuantity).toFixed(2)
          // 行合计
          this.list2[0].total = (Number(this.list2[0].material) + Number(this.list2[0].man) + Number(this.list2[0].produce)).toFixed(2)
          this.list2[1].total = (Number(this.list2[1].material) + Number(this.list2[1].man) + Number(this.list2[1].produce)).toFixed(2)
          this.list2[2].total = (Number(this.list2[2].material) + Number(this.list2[2].man) + Number(this.list2[2].produce)).toFixed(2)
          this.list2[3].total = (Number(this.list2[3].material) + Number(this.list2[3].man) + Number(this.list2[3].produce)).toFixed(2)
          this.list2[4].total = (Number(this.list2[4].material) + Number(this.list2[4].man) + Number(this.list2[4].produce)).toFixed(2)
          this.list2[5].total = (Number(this.list2[5].material) + Number(this.list2[5].man) + Number(this.list2[5].produce)).toFixed(2)
        }
      }
      // }
    },
    produce(val) {
      console.log('123', this.personalForm.accountType)
      if (this.personalForm.accountType === '1') {
        if (val === '1') {
          if (this.personalForm.completeRate === '' || this.personalForm.completeRate === null || this.personalForm.completeRate === undefined || this.personalForm.finishQuantity === '' || this.personalForm.finishQuantity === null || this.personalForm.finishQuantity === undefined || this.personalForm.producingQuantity === '' || this.personalForm.producingQuantity === null || this.personalForm.producingQuantity === undefined) {
            this.change()
            this.$notify.error({
              title: '错误',
              message: '上方字段未填写完整',
              offset: 100
            })
          }
        }
        if (this.list2[0].man !== 0 || this.list2[1].man !== 0 || this.list2[0].material !== 0 || this.list2[1].material !== 0 || this.list2[0].produce !== 0 || this.list2[1].produce !== 0) {
          // 列合计
          this.list2[2].produce = (Number(this.list2[0].produce) + Number(this.list2[1].produce)).toFixed(2)
          console.log(Number(this.list2[0].produce))
          //         1.约当产量法：
          // 在产品约当产量＝在产品数量×完工百分比（完工率）
          // 某项费用分配率＝该项费用总额÷（完工产品产量＋在产品约当产量）
          // 完工产品该项成本＝完工产品数量×费用分配率
          //         月末在产品该项成本＝在产品数量×费用分配率
          //         或 ＝费用总额－完工产品费用
          // 在产品约当产量＝在产品数量×完工百分比（完工率）
          const yuedang = (Number(this.personalForm.producingQuantity) * Number(this.personalForm.completeRate) / 100).toFixed(2)
          // 某项费用分配率＝该项费用总额÷（完工产品产量＋在产品约当产量）
          const moneyRate = (Number(this.list2[2].produce) / (Number(this.personalForm.finishQuantity) + Number(yuedang))).toFixed(2)
          // 完工产品该项成本＝完工产品数量×费用分配率
          const cost = (Number(this.personalForm.finishQuantity) * moneyRate).toFixed(2)
          // 完工产品总成本
          this.list2[3].produce = cost
          // 月末在产品成本
          this.list2[5].produce = (this.list2[2].produce - this.list2[3].produce).toFixed(2)
          // 单位成本=完工产品总成本/完工数量
          this.list2[4].produce = (this.list2[3].produce / this.personalForm.finishQuantity).toFixed(2)
          // 行合计
          this.list2[0].total = (Number(this.list2[0].material) + Number(this.list2[0].man) + Number(this.list2[0].produce)).toFixed(2)
          this.list2[1].total = (Number(this.list2[1].material) + Number(this.list2[1].man) + Number(this.list2[1].produce)).toFixed(2)
          this.list2[2].total = (Number(this.list2[2].material) + Number(this.list2[2].man) + Number(this.list2[2].produce)).toFixed(2)
          this.list2[3].total = (Number(this.list2[3].material) + Number(this.list2[3].man) + Number(this.list2[3].produce)).toFixed(2)
          this.list2[4].total = (Number(this.list2[4].material) + Number(this.list2[4].man) + Number(this.list2[4].produce)).toFixed(2)
          this.list2[5].total = (Number(this.list2[5].material) + Number(this.list2[5].man) + Number(this.list2[5].produce)).toFixed(2)
          // }
        }
      }
      if (this.personalForm.accountType === '2') {
        // 2.定额成本发
        // 这种分配方法是按照预先制定的定额成本计算月末在产品成本，
        // 即月末在产品成本按其在产品数量和单位定额成本计算。某种产品应负担的全部费用（月初在产品费用加本月生产费用），
        // 减月末在产品的定额成本，其余额作为完工产品成本。该方法适用于各项消耗定额或费用定额比较准确、稳定，而且各月在产品数量变化不大的产品。
        if (val === '1') {
          if (this.personalForm.finishQuantity === '' || this.personalForm.finishQuantity === null || this.personalForm.finishQuantity === undefined || this.personalForm.finishQuantity === '' || this.personalForm.producingMaterialsQuantity === null || this.personalForm.producingMaterialsQuantity === undefined || this.personalForm.producingQuantity === '' || this.personalForm.producingQuantity === null || this.personalForm.producingQuantity === undefined || this.personalForm.producingSalary === '' || this.personalForm.producingSalary === null || this.personalForm.producingSalary === undefined || this.personalForm.producingCost === '' || this.personalForm.producingCost === null || this.personalForm.producingCost === undefined) {
            this.change()
            this.$notify.error({
              title: '错误',
              message: '上方字段未填写完整',
              offset: 100
            })
            return false
          }
        }
        if (this.list2[0].man !== 0 || this.list2[1].man !== 0 || this.list2[0].material !== 0 || this.list2[1].material !== 0 || this.list2[0].produce !== 0 || this.list2[1].produce !== 0) {
          // 按照预先制定的定额成本计算月末在产品成本
          this.list2[5].material = this.personalForm.producingMaterialsQuantity
          this.list2[5].man = this.personalForm.producingSalary
          this.list2[5].produce = this.personalForm.producingCost
          // 列合计
          this.list2[2].produce = (Number(this.list2[0].produce) + Number(this.list2[1].produce)).toFixed(2)
          // 完工产品成本
          this.list2[3].produce = (this.list2[2].produce - this.list2[5].produce).toFixed(2)
          // 单位成本=完工产品总成本/完工数量
          this.list2[4].produce = (this.list2[3].produce / this.personalForm.finishQuantity).toFixed(2)
          // 行合计
          this.list2[0].total = (Number(this.list2[0].material) + Number(this.list2[0].man) + Number(this.list2[0].produce)).toFixed(2)
          this.list2[1].total = (Number(this.list2[1].material) + Number(this.list2[1].man) + Number(this.list2[1].produce)).toFixed(2)
          this.list2[2].total = (Number(this.list2[2].material) + Number(this.list2[2].man) + Number(this.list2[2].produce)).toFixed(2)
          this.list2[3].total = (Number(this.list2[3].material) + Number(this.list2[3].man) + Number(this.list2[3].produce)).toFixed(2)
          this.list2[4].total = (Number(this.list2[4].material) + Number(this.list2[4].man) + Number(this.list2[4].produce)).toFixed(2)
          this.list2[5].total = (Number(this.list2[5].material) + Number(this.list2[5].man) + Number(this.list2[5].produce)).toFixed(2)
        }
      }
    },
    completeRate() {
      this.material()
      this.man()
      this.produce()
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
    // 重置一下表单
    change() {
      if (this.personalForm.accountType === '1') {
        this.blue = true
        this.red = true
      }
      if (this.personalForm.accountType === '2') {
        this.blue = false
        this.red = true
      }
      if (this.personalForm.accountType === '3') {
        this.blue = true
        this.red = false
      }
      this.list2 = [
        {
          productCost: '月初在产品成本',
          material: '',
          man: '',
          produce: '',
          total: '0.00'
        },
        {
          productCost: '本月发生生产费用',
          material: '',
          man: '',
          produce: '',
          total: '0.00'
        },
        {
          productCost: '合计',
          material: '0.00',
          man: '0.00',
          produce: '0.00',
          total: '0.00'
        },
        {
          productCost: '完工产品总成本',
          material: '0.00',
          man: '0.00',
          produce: '0.00',
          total: '0.00'
        },
        {
          productCost: '单位成本',
          material: '0.00',
          man: '0.00',
          produce: '0.00',
          total: '0.00'
        },
        {
          productCost: '月末在产品成本',
          material: '0.00',
          man: '0.00',
          produce: '0.00',
          total: '0.00'
        }
      ]
      this.personalForm.completeRate = null
      this.personalForm.finishQuantity = null
      this.personalForm.producingQuantity = null
      this.personalForm.producingMaterialsQuantity = null
      this.personalForm.producingSalary = null
      this.personalForm.producingCost = null
      this.personalForm.endWorkHours = null
      this.personalForm.endMaterialsQuantity = null
      this.personalForm.finishWorkHours = null
      this.personalForm.finishMaterialsUsedQuantity = null
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        accountType: '1'
      }
      this.change()
    },
    // 保存操作
    handlesave() {
      // const parms2 = JSON.stringify(EnterDetail)
      if (this.list2[0].material !== '' && this.list2[0].material !== null && this.list2[0].material !== undefined) {
        this.personalForm2.beginMaterialsMoney = this.list2[0].material
      } else {
        this.personalForm2.beginMaterialsMoney = 0
      }
      if (this.list2[0].man !== '' && this.list2[0].man !== null && this.list2[0].man !== undefined) {
        this.personalForm2.beginSalaryMoney = this.list2[0].man
      } else {
        this.personalForm2.beginSalaryMoney = 0
      }
      if (this.list2[0].produce !== '' && this.list2[0].produce !== null && this.list2[0].produce !== undefined) {
        this.personalForm2.beginProduceMoney = this.list2[0].produce
      } else {
        this.personalForm2.beginProduceMoney = 0
      }
      if (this.list2[1].material !== '' && this.list2[1].material !== null && this.list2[1].material !== undefined) {
        this.personalForm2.thisMaterialsMoney = this.list2[1].material
      } else {
        this.personalForm2.thisMaterialsMoney = 0
      }
      if (this.list2[1].man !== '' && this.list2[1].man !== null && this.list2[1].man !== undefined) {
        this.personalForm2.thisSalaryMoney = this.list2[1].man
      } else {
        this.personalForm2.thisSalaryMoney = 0
      }
      if (this.list2[1].produce !== '' && this.list2[1].produce !== null && this.list2[1].produce !== undefined) {
        this.personalForm2.thisProduceMoney = this.list2[1].produce
      } else {
        this.personalForm2.thisProduceMoney = 0
      }
      this.personalForm2.beginAll = this.list2[0].total
      this.personalForm2.thisAll = this.list2[1].total
      this.personalForm2.materialAll = this.list2[2].material
      this.personalForm2.salaryAll = this.list2[2].man
      this.personalForm2.produceAll = this.list2[2].produce
      this.personalForm2.total = this.list2[2].total
      this.personalForm2.finishMaterialsMoney = this.list2[3].material
      this.personalForm2.finishSalaryMoney = this.list2[3].man
      this.personalForm2.finishProduceMoney = this.list2[3].produce
      this.personalForm2.finishAll = this.list2[3].total
      this.personalForm2.unitMaterialsMoney = this.list2[4].material
      this.personalForm2.unitSalaryMoney = this.list2[4].man
      this.personalForm2.unitProduceMoney = this.list2[4].produce
      this.personalForm2.unitAll = this.list2[4].total
      this.personalForm2.endMaterialsMoney = this.list2[5].material
      this.personalForm2.endSalaryMoney = this.list2[5].man
      this.personalForm2.endProduceMoney = this.list2[5].produce
      this.personalForm2.endAll = this.list2[5].total

      const parms2 = JSON.stringify(this.personalForm2)
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate().then(valid => {
        if (this.list2[0].man !== '' || this.list2[1].man !== '' || this.list2[0].material !== '' || this.list2[1].material !== '' || this.list2[0].produce !== '' || this.list2[1].produce !== '') {
          addProduceCost(parms, parms2, this.personalForm).then(res => {
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
            message: '成本费用明细未输入',
            offset: 100
          })
        }
      }).catch(valid => {
        console.log('error submit!!')
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

<style rel="stylesheet/css" scoped>
  .ERP-container{
    margin-right: 0;
  }
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

  .shipei {
    width: 150px !important;
  }

  .bluelable >>> .el-form-item__label{
    color: dodgerblue;
  }

  .redable >>> .el-form-item__label{
    color: red;
  }

</style>
