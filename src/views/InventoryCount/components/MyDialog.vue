<template>
  <el-dialog :visible.sync="editVisible" :control="control" :editdata="editdata" :close-on-press-escape="false" top="10px" title="修改物流车辆" @close="$emit('update:control', false)">
    <!--基本信息-->
    <h2 ref="geren" class="form-name">基本信息</h2>
    <div class="container">
      <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
        <el-form-item :label="$t('LogisticsCar.carnumber')" prop="carNumber" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.carNumber" placeholder="请输入车辆名称" clearable/>
        </el-form-item>
        <el-form-item :label="$t('LogisticsCar.licencenumber')" prop="licenceNumber" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.licenceNumber" placeholder="请输入车牌号" clearable/>
        </el-form-item>
        <el-form-item :label="$t('LogisticsCar.carname')" prop="carName" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.carName" placeholder="请车辆名称" clearable/>
        </el-form-item>
        <el-form-item :label="$t('LogisticsCar.cartype')" prop="carType" style="width: 40%;margin-top:1%">
          <el-select v-model="personalForm.carType" placeholder="请车辆类型" style="width: 100%;">
            <el-option value="1" label="大货车"/>
            <el-option value="2" label="小货车"/>
            <el-option value="3" label="小轿车"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('LogisticsCar.carload')" prop="carLoad" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.carLoad" placeholder="请输入载重" clearable>
            <template slot="append">吨</template>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('LogisticsCar.stat')" prop="stat" style="width: 40%;margin-top:1%">
          <el-select v-model="personalForm.stat" placeholder="请选择车辆状态" style="width: 100%;">
            <el-option label="正常" value="1"/>
            <el-option label="停用" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('LogisticsCar.drivers')" prop="drivers" style="width: 40%;margin-top:1%">
          <el-input v-model="drivers" placeholder="请输入驾驶员" @focus="handlechoose"/>
        </el-form-item>
        <my-emp :control.sync="empcontrol" @personName="personName" @personIds="personIds"/>
      </el-form>
    </div>
    <!--操作-->
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">修改</el-button>
      <el-button type="danger" @click="handlecancel()">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updatecar } from '@/api/LogisticsCar'
import MyEmp from './MyEmp'
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

</style>
