<template>
  <el-dialog :visible.sync="editVisible" :control="control" :editdata="editdata" :close-on-press-escape="false" top="10px" title="修改物流车辆" @close="$emit('update:control', false)">
    <!--基本信息-->
    <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
    <div class="container">
      <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
        <el-form-item :label="$t('LogisticsCar.sourcenumber')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.sourceNumber" placeholder="请输入源单编号" disabled/>
        </el-form-item>
        <el-form-item :label="$t('LogisticsCar.carnumber')" prop="carNumber" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.carNumber" placeholder="请输入车辆编号" clearable/>
        </el-form-item>
        <el-form-item :label="$t('LogisticsCar.outpersonid')" prop="outpersonid" style="width: 40%;margin-top:1%">
          <el-input v-model="outpersonid" placeholder="请选择出车人" @focus="handleoutperson"/>
        </el-form-item>
        <my-out :outperson.sync="outperson" @outpersonname="outpersonname"/>
        <el-form-item :label="$t('LogisticsCar.address')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.address" placeholder="请输入送货地点" clearable/>
        </el-form-item>
        <el-form-item :label="$t('LogisticsCar.outphone')" prop="outPhone" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.outPhone" placeholder="请输入出车人电话" clearable/>
        </el-form-item>
        <el-form-item :label="$t('LogisticsCar.drivers')" prop="driver" style="width: 40%;margin-top:1%">
          <el-input v-model="driver" placeholder="请选择驾驶员" clearable @focus="handlechoose"/>
        </el-form-item>
        <my-driver :drivercontrol.sync="drivercontrol" @drivername="drivername" />
        <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
        <el-form-item :label="$t('LogisticsCar.starttime')" style="width: 40%;margin-top:1%">
          <el-date-picker
            v-model="personalForm.startTime"
            type="datetime"
            placeholder="选择出车时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            clearable
            style="width: 100%"/>
        </el-form-item>
      </el-form>
    </div>
    <!--操作-->
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">{{ $t('public.edit') }}</el-button>
      <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updatesendcar } from '@/api/LogisticsCar'
import MyDriver from './MyDriver'
import MyOut from './MyOut'
import MyCreate from './MyCreate'
var _that
export default {
  components: { MyDriver, MyOut, MyCreate },
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
      // 出车人弹窗控制
      outperson: false,
      // 驾驶员弹窗控制
      drivercontrol: false,
      // 创建人弹窗控制
      createcontrol: false,
      // 出车人回显
      outpersonid: '',
      // 驾驶员回显
      driver: '',
      // 创建人回显
      createid: '',
      // 派车单信息数据
      personalForm: this.editdata,
      // 派车单信息规则数据
      personalrules: {
        sourceNumber: [
          { required: true, message: '请输入源单编号', trigger: 'blur' }
        ],
        carNumber: [
          { required: true, message: '请输入车辆编号', trigger: 'blur' }
        ],
        outpersonid: [
          { required: true, message: '请选择出车人', trigger: 'blue' }
        ],
        outPhone: [
          { required: true, message: '请输入出车人电话', trigger: 'blur' }
        ],
        driver: [
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
      this.outpersonid = this.personalForm.outPersonName
      this.driver = this.personalForm.driverName
    }
  },
  methods: {
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      console.log(this.personalForm)
      updatesendcar(this.personalForm).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
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
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    handlecancel() {
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.editVisible = false
    },
    // 出车人输入框focus事件触发
    handleoutperson() {
      this.outperson = true
    },
    // 出车人列表返回数据
    outpersonname(val) {
      console.log(val)
      this.outpersonid = val.personName
      this.personalForm.outpersonid = val.id
    },
    // 驾驶员输入框focus事件触发
    handlechoose() {
      this.drivercontrol = true
    },
    // 驾驶员列表返回数据
    drivername(val) {
      this.driver = val.personName
      this.personalForm.driver = val.id
    },
    // 创建人输入框focus事件触发
    handlechoosecreateman() {
      this.createcontrol = true
    },
    createname(val) {
      this.createid = val.personName
      this.personalForm.createid = val.id
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>

</style>
