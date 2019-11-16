<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.checkNumber +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('QualityCheck.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('QualityCheck.sourceType')" prop="sourceType" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px" @change="chooseType">
                    <el-option value="1" label="采购到货单" />
                    <el-option value="2" label="生产任务单" />
                    <el-option value="3" label="无来源" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('QualityCheck.supplierId')" style="width: 100%;">
                  <el-input v-model="supplierId" style="margin-left: 18px;width: 200px" clearable @focus="handlechoose"/>
                  <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('QualityCheck.reportPersonId')" prop="reportPersonId" style="width: 100%;">
                  <el-input v-model="reportPersonId" style="margin-left: 18px;width: 200px" clearable @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('QualityCheck.reportDeptId')" prop="reportDeptId" style="width: 100%;">
                  <el-select v-model="personalForm.reportDeptId" clearable style="margin-left: 18px;width: 200px" @change="change()">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('QualityCheck.checkType')" prop="checkType" style="width: 100%;">
                  <el-select v-model="personalForm.checkType" style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="来料质检"/>
                    <el-option value="2" label="送样质检"/>
                    <el-option value="3" label="生产质检"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('QualityCheck.checkMode')" prop="checkMode" style="width: 100%;">
                  <el-select v-model="personalForm.checkMode" clearable style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="抽样"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('QualityCheck.produceManagerId')" style="width: 100%;">
                  <el-input v-model="produceManagerId" style="margin-left: 18px;width: 200px" clearable @focus="handlechooseDelivery"/>
                </el-form-item>
                <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('QualityCheck.workCenterId')" style="width: 100%;">
                  <el-input v-model="personalForm.workCenterId" style="margin-left: 18px;width: 200px" clearable @focus="workcenterchoose"/>
                  <my-center :control.sync="centercontrol" @center="center"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('QualityCheck.reportDate')" prop="reportDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.reportDate"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">质检申请单明细</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button :disabled="addpro" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
        <my-detail :control.sync="control" :supp.sync="supp" @product="productdetail"/>
        <el-button :disabled="addsouce" style="width: 130px" @click="handleAddSouce">{{ $t('updates.cydzxz') }}</el-button>
        <my-arrival :arrivalcontrol.sync="arrivalcontrol" :supp.sync="supp" @arrival="arrival" />
        <produce-task :procontrol.sync="producecontrol" @produce="produce"/>
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
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
          <el-editable-column prop="basicQuantity" align="center" label="基本数量" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="checkQuantity" align="center" :label="$t('updates.bjsl')" min-width="150px"/>
          <el-editable-column prop="hadCheckQuantity" align="center" label="已报捡数量" min-width="150px"/>
          <el-editable-column prop="checkedQuantity" align="center" label="已捡数量" min-width="150px"/>
          <el-editable-column :label="$t('updates.dhsl')" prop="arrivalQuantity" align="center" min-width="150px"/>
          <el-editable-column prop="sourceNumber" align="center" :label="$t('updates.ydbh')" min-width="150px"/>
          <el-editable-column prop="sourceSerialNumber" align="center" :label="$t('updates.ydbh')" min-width="150px"/>
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
import { updatequalitycheck } from '@/api/QualityCheck'
import { getdeptlist } from '@/api/BasicSettings'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import MySupplier from './MySupplier'
import MyDelivery from './MyDelivery'
import MyCenter from './MyCenter'
import MyArrival from './MyArrival'
import ProduceTask from './ProduceTask'
var _that
export default {
  components: { ProduceTask, MyArrival, MyCenter, MyDelivery, MySupplier, MyDetail, MyEmp },
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
    const validatePass4 = (rule, value, callback) => {
      console.log(this.personalForm.reportDeptId)
      if (this.personalForm.reportDeptId === undefined || this.personalForm.reportDeptId === null || this.personalForm.reportDeptId === '') {
        callback(new Error('请选择报检部门'))
      } else {
        callback()
      }
    }
    return {
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      // 带入的供应商
      supp: null,
      // 控制供应商是否可以编辑
      IsSupplierId: false,
      // 控制生产负责人是否可以编辑
      IsProduceManagerId: false,
      // 控制工作中心是否可以编辑
      IsWorkCenterId: false,
      // 工作中心回显
      workCenterId: '',
      // 控制工作中心
      centercontrol: false,
      // 生产负责人回显
      produceManagerId: '',
      // 控制生产负责人
      deliverycontrol: false,
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
      // 报检人员回显
      reportPersonId: '',
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
        reportPersonId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        reportDate: [
          { required: true, message: '请选择报检日期', trigger: 'change' }
        ],
        reportDeptId: [
          { required: true, validator: validatePass4, trigger: 'change' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        checkType: [
          { required: true, message: '请选择质检类别', trigger: 'change' }
        ],
        checkMode: [
          { required: true, message: '请选择检验方式', trigger: 'change' }
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
      this.reportPersonId = this.personalForm.reportPersonName
      this.workCenterId = this.personalForm.workCenter
      this.produceManagerId = this.personalForm.produceManagerName
      this.list2 = this.personalForm.qualityCheckDetailVos
    }
  },
  created() {
    this.getTypes()
  },
  methods: {
    // 重置一下下拉
    change() {
      this.$forceUpdate()
    },
    // 选择源单类型事件
    chooseType() {
      console.log(this.personalForm.sourceType)
      if (this.personalForm.sourceType === '1') {
        this.addsouce = false
        this.addpro = true
        this.IsProduceManagerId = true
        this.IsWorkCenterId = true
        this.$refs.editable.clear()
      } else if (this.personalForm.sourceType === '2') {
        this.addsouce = false
        this.addpro = true
        this.IsProduceManagerId = true
        this.IsWorkCenterId = false
        this.supplierId = ''
        this.personalForm.supplierId = ''
        this.$refs.editable.clear()
      } else if (this.personalForm.sourceType === '3') {
        this.addpro = false
        this.addsouce = true
        this.IsProduceManagerId = false
        this.IsWorkCenterId = false
        this.IsSupplierId = false
        this.$refs.editable.clear()
      }
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
      this.$refs.editable.clear()
      this.supp = val.id
      this.supplierId = val.supplierName
      this.personalForm.supplierId = val.id
    },
    // 报检人员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 报检人员回显
    stockName(val) {
      console.log(val)
      this.personalForm.reportDeptId = val.deptId
      this.reportPersonId = val.personName
      this.personalForm.reportPersonId = val.id
    },
    // 生产负责人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.produceManagerId = val.personName
      this.personalForm.produceManagerId = val.id
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
      this.supplierId = null
      this.reportPersonId = null
      this.workCenterId = null
      this.produceManagerId = null
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      const EnterDetail = this.$refs.editable.getRecords()
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.basicQuantity === null || elem.basicQuantity === '' || elem.basicQuantity === undefined) {
          delete elem.basicQuantity
        }
        if (elem.checkQuantity === null || elem.checkQuantity === '' || elem.checkQuantity === undefined) {
          delete elem.checkQuantity
        }
        if (elem.checkedQuantity === null || elem.checkedQuantity === '' || elem.checkedQuantity === undefined) {
          delete elem.checkedQuantity
        }
        if (elem.arrivalQuantity === null || elem.arrivalQuantity === '' || elem.arrivalQuantity === undefined) {
          delete elem.arrivalQuantity
        }
        if (elem.sourceNumber === null || elem.sourceNumber === '' || elem.sourceNumber === undefined) {
          delete elem.sourceNumber
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
      updatequalitycheck(parms, parms2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
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
            title: '错误',
            message: '出错了',
            offset: 100
          })
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
    height: 900px;
  }
  .el-col-12{
    width: 49%;
  }
</style>
