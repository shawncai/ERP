<template>
  <el-dialog :visible.sync="editVisible" :control="control" :editdata="editdata" :close-on-press-escape="false" top="10px" title="修改物流车辆" @close="$emit('update:control', false)">
    <!--基本信息-->
    <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
    <div class="container">
      <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
        <el-form-item :label="$t('LogisticsCar.outnumber')" prop="outNumber" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.outNumber" placeholder="请输入派车单编号" disabled/>
        </el-form-item>
        <el-form-item :label="$t('LogisticsCar.returntime')" prop="returnTime" style="width: 40%;margin-top:1%">
          <el-date-picker
            v-model="personalForm.returnTime"
            type="datetime"
            placeholder="选择回车时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            clearable
            style="width: 100%"/>
        </el-form-item>
        <el-form-item :label="$t('LogisticsCar.returnpersonid')" prop="returnpersonid" style="width: 40%;margin-top:1%">
          <el-input v-model="returnpersonid" placeholder="请选择回车人" @focus="handleoutperson"/>
        </el-form-item>
        <my-out :outperson.sync="outperson" @outpersonname="outpersonname"/>
        <el-form-item :label="$t('LogisticsCar.returnaddress')" prop="returnAddress" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.returnAddress" placeholder="请输入回车地址" clearable/>
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
import { updatereturncar } from '@/api/LogisticsCar'
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
      // 回车单信息数据
      personalForm: this.editdata,
      // 回车人弹窗控制
      outperson: false,
      // 回车人回显
      returnpersonid: '',
      // 回车单信息规则数据
      personalrules: {
        outNumber: [
          { required: true, message: '请输入派车单编号', trigger: 'blur' }
        ],
        returnTime: [
          { required: true, message: '请选择回车时间', trigger: 'change' }
        ],
        returnAddress: [
          { required: true, message: '请输入回车地址', trigger: 'blur' }
        ],
        returnpersonid: [
          { required: true, message: '请选择回车人', trigger: 'blue' }
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
      this.returnpersonid = this.personalForm.returnPersonName
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      console.log(this.personalForm)
      updatereturncar(this.personalForm).then(res => {
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
    },
    // 回车人输入框focus事件触发
    handleoutperson() {
      this.outperson = true
    },
    // 回车人列表返回数据
    outpersonname(val) {
      console.log(val)
      this.returnpersonid = val.personName
      this.personalForm.returnPersonId = val.id
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>

</style>
