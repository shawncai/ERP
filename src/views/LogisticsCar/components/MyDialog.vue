<template>
  <el-dialog :visible.sync="editVisible" :control="control" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.carNumber +$t('updates.xg')" class="edit" width="1010px" top="-10px" @close="$emit('update:control', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('LogisticsCar.carnumber')" prop="carNumber" style="width: 100%;">
                <el-input v-model="personalForm.carNumber" placeholder="请输入车辆名称" clearable style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('LogisticsCar.licencenumber')" prop="licenceNumber" style="width: 100%;">
                <el-input v-model="personalForm.licenceNumber" placeholder="请输入车牌号" clearable style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('LogisticsCar.carname')" prop="carName" style="width: 100%;">
                <el-input v-model="personalForm.carName" placeholder="请车辆名称" clearable style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('LogisticsCar.cartype')" prop="carType" style="width: 100%;">
                <el-select v-model="personalForm.carType" placeholder="请车辆类型" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="大货车"/>
                  <el-option value="2" label="小货车"/>
                  <el-option value="3" label="小轿车"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 58px">
              <el-form-item :label="$t('LogisticsCar.carload')" prop="carLoad" style="width: 100%;">
                <el-input v-model="personalForm.carLoad" placeholder="请输入载重" clearable style="margin-left: 18px;width: 200px">
                  <template slot="append">吨</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('LogisticsCar.stat')" prop="stat" style="width: 100%;">
                <el-select v-model="personalForm.stat" placeholder="请选择车辆状态" style="margin-left: 18px;width: 200px">
                  <el-option label="正常" value="1"/>
                  <el-option :label="$t('updates.ty')" value="2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('LogisticsCar.drivers')" prop="drivers" style="width: 100%;">
                <el-input v-model="drivers" placeholder="请输入驾驶员" style="margin-left: 18px;width: 200px" @focus="handlechoose"/>
              </el-form-item>
              <my-emp :control.sync="empcontrol" @personName="personName" @personIds="personIds"/>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--操作-->
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        <el-button type="primary" @click="handleEditok()">{{ $t('Hmodule.baoc') }}</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { updatecar } from '@/api/LogisticsCar'
import MyEmp from './MyEmp'
var _that
export default {
  components: { MyEmp },
  props: {
    control: {
      type: Boolean,
      default: false
    },
    editdata: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 弹窗组件的控制
      editVisible: this.control,
      // 创建人弹窗控制
      createcontrol: false,
      // 采购员弹窗控制
      empcontrol: false,
      // 驾驶员回显
      drivers: '',
      // 创建人回显
      createid: '',
      // 物流车辆信息数据
      personalForm: this.editdata,
      // 物流车辆信息规则数据
      personalrules: {
        carNumber: [
          { required: true, message: '请输入车辆编号', trigger: 'blur' }
        ],
        carName: [
          { required: true, message: '请输入车辆名称', trigger: 'blur' }
        ],
        licenceNumber: [
          { required: true, message: '请输入车牌号', trigger: 'blur' }
        ],
        carType: [
          { required: true, message: '请选择车辆类型', trigger: 'change' }
        ],
        stat: [
          { required: true, message: '请选择车辆状态', trigger: 'change' }
        ],
        drivers: [
          { required: true, message: '请选择驾驶员', trigger: 'blue' }
        ]
      }
    }
  },
  watch: {
    control() {
      this.editVisible = this.control
    },
    editdata() {
      this.personalForm = this.editdata
      this.drivers = this.personalForm.driverNames
      this.createid = this.personalForm.driverNames
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 驾驶员输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 驾驶员列表返回数据
    personName(val) {
      this.drivers = val
      this.personalForm.driverNames = val
    },
    personIds(val) {
      this.personalForm.drivers = val
    },
    // 创建人输入框focus事件触发
    handlechoosecreateman() {
      this.createcontrol = true
    },
    createname(val) {
      this.createid = val.personName
      this.personalForm.createid = val.id
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      console.log(this.personalForm)
      updatecar(this.personalForm).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: this.$t('prompt.czcg'),
            message: this.$t('prompt.czcg'),
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.$emit('rest', true)
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
    },
    handlecancel() {
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
    height: 950px;
  }
  .el-col-12{
    width: 49%;
  }
</style>
