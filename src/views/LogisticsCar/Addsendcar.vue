<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--基本信息-->
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('LogisticsCar.sourcenumber')" prop="sourcenumber" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.sourcenumber" placeholder="请输入源单编号" clearable/>
          </el-form-item>
          <el-form-item :label="$t('LogisticsCar.carnumber')" prop="carnumber" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.carnumber" placeholder="请输入车辆编号" clearable/>
          </el-form-item>
          <el-form-item :label="$t('LogisticsCar.outpersonid')" prop="outpersonid" style="width: 40%;margin-top:1%">
            <el-input v-model="outpersonid" placeholder="请选择出车人" @focus="handleoutperson"/>
          </el-form-item>
          <my-out :outperson.sync="outperson" @outpersonname="outpersonname"/>
          <el-form-item :label="$t('LogisticsCar.address')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.address" placeholder="请输入送货地点" clearable/>
          </el-form-item>
          <el-form-item :label="$t('LogisticsCar.outphone')" prop="outphone" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.outphone" placeholder="请输入出车人电话" clearable/>
          </el-form-item>
          <el-form-item :label="$t('LogisticsCar.drivers')" prop="driver" style="width: 40%;margin-top:1%">
            <el-input v-model="driver" placeholder="请选择驾驶员" clearable @focus="handlechoose"/>
          </el-form-item>
          <my-driver :drivercontrol.sync="drivercontrol" @drivername="drivername" />
          <el-form-item :label="$t('LogisticsCar.starttime')" style="width: 40%;margin-top:1%">
            <el-date-picker
              v-model="personalForm.starttime"
              type="datetime"
              placeholder="选择出车时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              clearable
              style="width: 100%"/>
          </el-form-item>
        </el-form>
      </div>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click type="primary" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="success" @click="handleentry()">{{ $t('updates.jxlr') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import MyDriver from './components/MyDriver'
import MyOut from './components/MyOut'
import MyCreate from './components/MyCreate'
import { addsendcar } from '@/api/LogisticsCar'
var _that
export default {
  name: 'Addsendcar',
  components: { MyDriver, MyOut, MyCreate },
  data() {
    return {
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
      personalForm: {
        createid: 1
      },
      // 派车单信息规则数据
      personalrules: {
        sourcenumber: [
          { required: true, message: '请输入源单编号', trigger: 'blur' }
        ],
        carnumber: [
          { required: true, message: '请输入车辆编号', trigger: 'blur' }
        ],
        outpersonid: [
          { required: true, message: '请选择出车人', trigger: 'blue' }
        ],
        outphone: [
          { required: true, message: '请输入出车人电话', trigger: 'blur' }
        ],
        driver: [
          { required: true, message: '请选择驾驶员', trigger: 'blue' }
        ],
        createid: [
          { required: true, message: '请选择创建人', trigger: 'blue' }
        ]
      }
    }
  },
  methods: {
    // 保存操作
    handlesave() {
      console.log(this.personalForm)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addsendcar(this.personalForm).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
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
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {}
      this.outpersonid = ''
      this.driver = ''
      this.createid = ''
    },
    // 继续录入
    handleentry() {
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addsendcar(this.personalForm).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
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
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/LogisticsCar/Addsendcar', name: 'Addsendcar', fullPath: '/LogisticsCar/Addsendcar', title: 'Addsendcar' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
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
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ERP-container{
    margin:0px 30px;
    .form-name{
      font-size: 18px;
      color: #373e4f;
      margin-bottom: -20px;
      margin-top: 30px;
    }
    .container{
      margin-top: 2%;
      border: 1px solid #eceff6;
    }
  }
</style>
