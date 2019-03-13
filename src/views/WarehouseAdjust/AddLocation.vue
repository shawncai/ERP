<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card">
        <h2 ref="geren" class="form-name">基本信息</h2>
        <div class="container">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('WarehouseAdjust.locationCode')" prop="locationCode" style="width: 100%;">
                  <el-input v-model="personalForm.locationCode" placeholder="请输入货位编号" style="margin-left: 18px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('WarehouseAdjust.locationName')" prop="locationName" style="width: 100%;">
                  <el-input v-model="personalForm.locationName" placeholder="请输入货位名称" style="margin-left: 18px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('WarehouseAdjust.length')" prop="length" style="width: 100%;">
                <el-input v-model="personalForm.length" placeholder="请输入货位长" style="margin-left: 18px" clearable/></el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('WarehouseAdjust.width')" prop="width" style="width: 100%;">
                <el-input v-model="personalForm.width" placeholder="请输入货位宽" style="margin-left: 18px" clearable/></el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('WarehouseAdjust.height')" prop="height" style="width: 100%;">
                <el-input v-model="personalForm.height" placeholder="请输入货位高" style="margin-left: 18px" clearable/></el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('WarehouseAdjust.volume')" style="width: 100%;">
                <el-input v-model="personalForm.volume" style="margin-left: 18px;width: 220px" disabled/></el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('WarehouseAdjust.repositoryId')" prop="repositoryId" style="width: 100%;">
                  <el-input v-model="repositoryId" placeholder="请选择仓库" style="margin-left: 18px" clearable @focus="handlechooseRep"/>
                </el-form-item>
              </el-col>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/><br>
            </el-row>
          </el-form>
        </div>
        <!--操作-->
        <div class="buttons" style="margin-top: 20px">
          <el-button type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">保存</el-button>
          <el-button type="danger" @click="handlecancel()">取消</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { addlocation } from '@/api/WarehouseAdjust'
import MyCreate from './components/MyCreate'
import MyRepository from './components/MyRepository'
import MyDetail from './components/MyDetail'
export default {
  name: 'AddLocation',
  components: { MyCreate, MyRepository, MyDetail },
  data() {
    return {
      // 控制仓库弹窗
      repositorycontrol: false,
      // 货位单信息数据
      personalForm: {
        createPersonId: 2
      },
      repositoryId: '',
      // 货位单规则数据
      personalrules: {
        locationCode: [
          { required: true, message: '请输入货位编号', trigger: 'blur' }
        ],
        locationName: [
          { required: true, message: '请输入货位名称', trigger: 'blur' }
        ],
        length: [
          { required: true, message: '请输入货位长', trigger: 'blur' }
        ],
        width: [
          { required: true, message: '请输入货位宽', trigger: 'blur' }
        ],
        height: [
          { required: true, message: '请输入货位高', trigger: 'blur' }
        ],
        repositoryId: [
          { required: true, message: '请选择仓库', trigger: 'blue' }
        ]
      }
    }
  },
  methods: {
    // 保存操作
    handlesave() {
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      console.log(this.personalForm)
      console.log(Data)
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addlocation(parms).then(res => {
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
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/WarehouseAdjust/NewWarehouseAdjust', name: 'NewWarehouseAdjust', fullPath: '/WarehouseAdjust/NewWarehouseAdjust', title: 'NewWarehouseAdjust' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    // 入库人输入框focus事件触发
    handlechoose() {
      this.createcontrol = true
    },
    // 员工列表返回经办人数据
    createname(val) {
      console.log(val)
      this.enterPersonId = val.personName
      this.personalForm.enterPersonId = val.id
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.repositoryId = val.repositoryName
      this.personalForm.repositoryId = val.id
    },
    // 入库单事件
    // 新增入库单明细
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      console.log(val)
      this.list2 = val
    },
    // 入库金额计算
    getSize(quan, pric) {
      return quan * pric
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ERP-container{
    margin:0px 20px;
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
