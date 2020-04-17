<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">
        <!--基本信息-->
        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('LogisticsCar.carnumber')" prop="carnumber" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.carnumber" placeholder="请输入车辆名称" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('LogisticsCar.licencenumber')" prop="carnumber" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.licencenumber" placeholder="请输入车牌号" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('LogisticsCar.carname')" prop="carname" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.carname" placeholder="请车辆名称" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('LogisticsCar.cartype')" prop="cartype" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.cartype" placeholder="请车辆类型" style="width: 200px">
                    <el-option value="1" label="大货车"/>
                    <el-option value="2" label="小货车"/>
                    <el-option value="3" label="小轿车"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('LogisticsCar.carload')" prop="carload" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.carload" placeholder="请输入载重" clearable style="width: 200px">
                    <template slot="append">吨</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('LogisticsCar.stat')" prop="stat" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.stat" placeholder="请选择车辆状态" style="width: 200px">
                    <el-option label="正常" value="1"/>
                    <el-option :label="$t('updates.ty')" value="2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('LogisticsCar.drivers')" prop="drivers" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="drivers" placeholder="请输入驾驶员" style="width: 200px" @focus="handlechoose"/>
                </el-form-item>
                <my-emp :control.sync="empcontrol" @personName="personName" @personIds="personIds"/>
              </el-col>

            </el-row>
          </el-form>

        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">

        <el-button v-no-more-click type="primary" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="success" @click="handleentry()">{{ $t('updates.jxlr') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { addcar } from '@/api/LogisticsCar'
import MyEmp from './components/MyEmp'
import MyCreate from './components/MyCreate'
var _that
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
  beforeCreate() {
    _that = this
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
                title: 'successful',
                message: 'save successful',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
              this.$router.go(-1)
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
                title: 'successful',
                message: 'save successful',
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
    margin-right: 0;
    .form-name{
      font-weight: bold;
      font-size: 18px;
      color: #373e4f;
      padding: 5px;
      margin-bottom: -20px;
    }
    .container{
      margin-top: 5px;
    }
    .el-button+.el-button{
      width: 98px;
    }
  }
</style>
