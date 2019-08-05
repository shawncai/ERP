<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--基本信息-->
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('LogisticsCar.carnumber')" prop="carnumber" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.carnumber" placeholder="请输入车辆名称" clearable/>
          </el-form-item>
          <el-form-item :label="$t('LogisticsCar.licencenumber')" prop="carnumber" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.licencenumber" placeholder="请输入车牌号" clearable/>
          </el-form-item>
          <el-form-item :label="$t('LogisticsCar.carname')" prop="carname" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.carname" placeholder="请车辆名称" clearable/>
          </el-form-item>
          <el-form-item :label="$t('LogisticsCar.cartype')" prop="cartype" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.cartype" placeholder="请车辆类型" style="width: 100%;">
              <el-option value="1" label="大货车"/>
              <el-option value="2" label="小货车"/>
              <el-option value="3" label="小轿车"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('LogisticsCar.carload')" prop="carload" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.carload" placeholder="请输入载重" clearable>
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
      <div class="buttons" style="margin-top: 20px">
        <el-button type="primary" @click="handlesave()">保存</el-button>
        <el-button type="success" @click="handleentry()">继续录入</el-button>
        <el-button type="danger" @click="handlecancel()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addcar } from '@/api/LogisticsCar'
import MyEmp from './components/MyEmp'
import MyCreate from './components/MyCreate'
export default {
  name: 'AddLogisticsCar',
  components: { MyEmp, MyCreate },
  data() {
    return {
      // 创建人弹窗控制
      createcontrol: false,
      // 采购员弹窗控制
      empcontrol: false,
      // 驾驶员回显
      drivers: '',
      // 创建人回显
      createid: '',
      // 物流车辆信息数据
      personalForm: {
        createid: 1
      },
      // 物流车辆信息规则数据
      personalrules: {
        carnumber: [
          { required: true, message: '请输入车辆编号', trigger: 'blur' }
        ],
        carname: [
          { required: true, message: '请输入车辆名称', trigger: 'blur' }
        ],
        licencenumber: [
          { required: true, message: '请输入车牌号', trigger: 'blur' }
        ],
        cartype: [
          { required: true, message: '请选择车辆类型', trigger: 'change' }
        ],
        stat: [
          { required: true, message: '请选择车辆状态', trigger: 'change' }
        ],
        drivers: [
          { required: true, message: '请选择驾驶员', trigger: 'blue' }
        ],
        createid: [
          { required: true, message: '请选择创建人', trigger: 'blue' }
        ],
        createtime: [
          { required: true, message: '请选择创建时间', trigger: 'change' }
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
          addcar(this.personalForm).then(res => {
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
              this.$router.go(-1)
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
      this.createid = ''
      this.drivers = ''
    },
    // 继续录入
    handleentry() {
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addcar(this.personalForm).then(res => {
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
              const anchor = this.$refs.geren.offsetTop
              console.log(anchor)
              document.documentElement.scrollTop = anchor - 100
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
          const anchor2 = this.$refs.geren.offsetTop
          console.log(anchor2)
          document.documentElement.scrollTop = anchor2 - 100
          return false
        }
      })
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/LogisticsCar/AddLogisticsCar', name: 'AddLogisticsCar', fullPath: '/LogisticsCar/AddLogisticsCar', title: 'AddLogisticsCar' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
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
      this.personalForm.drivers = ',' + val + ','
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
