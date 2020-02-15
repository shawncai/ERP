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
                <el-form-item :label="$t('CheckFail.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckFail.sourceType')" prop="sourceType" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="质检报告单" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckFail.sourceNumber')" prop="sourceNumber" style="width: 100%;">
                  <el-input v-model="personalForm.sourceNumber" style="margin-left: 18px;width:200px" clearable @focus="chooseNumber"/>
                  <my-report :reportcontrol.sync="reportcontrol" @allreportinfo="allreportinfo"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckFail.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                  <el-input v-model="handlePersonId" style="margin-left: 18px;width:200px" clearable @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckFail.handleDate')" prop="handleDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.handleDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"/>
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
              <el-col :span="6">
                <el-form-item :label="$t('CheckFail.productCode')" prop="productCode" style="width: 100%;">
                  <el-input v-model="personalForm.productCode" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckFail.productName')" style="width: 100%;">
                  <el-input v-model="personalForm.productName" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckFail.unit')" style="width: 100%;">
                  <el-input v-model="personalForm.unit" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckFail.typeId')" style="width: 100%;">
                  <el-input v-model="personalForm.typeId" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CheckFail.failedQuantity')" style="width: 100%;">
                  <el-input v-model="personalForm.failedQuantity" style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >{{ $t('updates.bhgczdmx') }}</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button @click="$refs.editable.insert(-1)">{{ $t('updates.tj') }}</el-button>
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
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :edit-render="{name: 'ElSelect', options: unqualify, type: 'visible'}" :label="$t('updates.bhgyy')" prop="failedReason" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.shuli')" prop="quantity" align="center" min-width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  v-model="scope.row.quantity"
                  @input="getrate(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElSelect', options: modes, type: 'visible'}" :label="$t('updates.czfs')" prop="handleMode" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.bl')" prop="rate" align="center" min-width="150px"/>
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
import { addcheckfail } from '@/api/CheckFail'
import { getdeptlist } from '@/api/BasicSettings'
import { searchCheckCategory } from '@/api/CheckCategory'
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
import MyReport from './components/MyReport'
var _that
export default {
  name: 'AddCheckFail',
  components: { MyReport, MyEmp2, MyMater, MyQuality, MyAccept, ProduceTask, MyArrival, MyCenter, MyDelivery, MySupplier, MyDetail, MyEmp },
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
      // 不合格下拉
      unqualify: [],
      // 控制质检报告单
      reportcontrol: false,
      // 所有处置方式
      modes: [{ value: 1, label: '回收' }, { value: 2, label: '拒收' }],
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
      // 处置负责人员回显
      handlePersonId: this.$store.getters.name,
      // 控制处置负责人员
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
        isVat: 1,
        sourceType: '1',
        handlePersonId: this.$store.getters.userId
      },
      // 采购申请单规则数据
      personalrules: {
        sourceNumber: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        inspectionPersonId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        handlePersonId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        productCode: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        handleDate: [
          { required: true, message: '请选择处置日期', trigger: 'change' }
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
        failedReason: [
          { required: true, message: '请选择不合格原因', trigger: 'change' }
        ],
        quantity: [
          { required: true, message: '请选择检验方式', trigger: 'change' }
        ],
        handleMode: [
          { required: true, message: '请输入报检数量', trigger: 'change' }
        ]
      },
      // 退货原因
      getemplist: {
        categoryname: '',
        type: '2',
        iseffective: '1',
        pagenum: 1,
        pagesize: 99999
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
      this.personalForm.handleDate = currentdate
    },
    // 计算不合格数量
    getrate(row) {
      console.log(row)
      console.log(this.personalForm.failedQuantity)
      if (this.personalForm.failedQuantity !== 0 && this.personalForm.failedQuantity !== null && this.personalForm.failedQuantity !== undefined) {
        row.rate = (row.quantity / this.personalForm.failedQuantity).toFixed(2)
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
    // 处置负责人员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 处置负责人员回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
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
      this.reportcontrol = true
    },
    allreportinfo(val) {
      console.log(val)
      this.personalForm.sourceNumber = val.reportNumber
      this.personalForm.productCode = val.productCode
      this.personalForm.productName = val.productName
      this.personalForm.unit = val.unit
      this.personalForm.typeId = val.productType
      this.personalForm.failedQuantity = val.failedQuantity
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
      this.handlePersonId = null
      this.supplierId = null
      this.workCenterId = null
      this.produceManagerId = null
      this.checkPersonId = null
    },
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.failedReason === null || elem.failedReason === '' || elem.failedReason === undefined) {
          delete elem.failedReason
        }
        if (elem.quantity === null || elem.quantity === '' || elem.quantity === undefined) {
          delete elem.quantity
        }
        if (elem.handleMode === null || elem.handleMode === '' || elem.handleMode === undefined) {
          delete elem.handleMode
        }
        if (elem.rate === null || elem.rate === '' || elem.rate === undefined) {
          delete elem.rate
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
          this.$refs.editable.validate((valid) => {
            if (valid) {
              addcheckfail(parms, parms2, this.personalForm).then(res => {
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
                  this.$refs.personalForm2.clearValidate()
                  this.$refs.personalForm2.resetFields()
                  this.$refs.personalForm3.clearValidate()
                  this.$refs.personalForm3.resetFields()
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
      const view = { path: '/CheckFail/AddCheckFail', name: 'AddCheckFail', fullPath: '/CheckFail/AddCheckFail', title: 'AddCheckFail' }
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
