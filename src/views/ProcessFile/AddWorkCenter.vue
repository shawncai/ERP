<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card">
        <h2 ref="geren" class="form-name">基本信息</h2>
        <div class="container">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="135px" style="margin-left: 30px;">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.code')" prop="code" style="width: 100%;">
                  <el-input v-model="personalForm.code" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.workCenterName')" prop="workCenterName" style="width: 100%;">
                  <el-input v-model="personalForm.workCenterName" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.stat')" prop="stat" label-width="100px" style="width: 100%;">
                  <el-radio-group v-model="personalForm.stat" style="margin-left: 18px;width: 200px">
                    <el-radio :label="1">启用</el-radio>
                    <el-radio :label="2">未启用</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.deptId')" prop="deptId" label-width="100px" style="width: 100%;">
                  <el-select v-model="personalForm.deptId" style="margin-left: 18px;width: 200px" clearable >
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.isKey')" prop="isKey" style="width: 100%;">
                  <el-radio-group v-model="personalForm.isKey" style="margin-left: 19px">
                    <el-radio :label="1" style="width: 100px">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">保存</el-button>
        <el-button type="danger" @click="handlecancel()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { createworkCenter } from '@/api/ProcessFile'
import { getdeptlist } from '@/api/BasicSettings'
export default {
  name: 'AddWorkCenter',
  data() {
    return {
      // 部门数据
      depts: [],
      // 工作中心信息数据
      personalForm: {
        createId: 3,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      },
      // 工作中心规则数据
      personalrules: {
        code: [
          { required: true, message: '请输入工作中心编号', trigger: 'blur' }
        ],
        workCenterName: [
          { required: true, message: '请输入工作中心名称', trigger: 'blur' }
        ],
        isKey: [
          { required: true, message: '请选择是否关键工作中心', trigger: 'change' }
        ],
        deptId: [
          { required: true, message: '请选择所属部门', trigger: 'change' }
        ],
        stat: [
          { required: true, message: '请选择启用状态', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    // 部门列表数据
    getlist() {
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createId: 3,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      }
    },
    // 保存操作
    handlesave() {
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          if (valid) {
            createworkCenter(parms).then(res => {
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
          }
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
      const view = { path: '/ProcessFile/AddWorkCenter', name: 'AddWorkCenter', fullPath: '/ProcessFile/AddWorkCenter', title: 'AddWorkCenter' }
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
