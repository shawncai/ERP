<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">
        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.code')" prop="code" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.code" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.workCenterName')" prop="workCenterName" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.workCenterName" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.stat')" prop="stat" label-width="100px" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-radio-group v-model="personalForm.stat" style="width: 200px">
                    <el-radio :label="1">启用</el-radio>
                    <el-radio :label="2">未启用</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.deptId')" prop="deptId" label-width="100px" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.deptId" style="width: 200px" clearable >
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.isKey')" prop="isKey" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-radio-group v-model="personalForm.isKey" style="width: 200px">
                    <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                    <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { createworkCenter } from '@/api/ProcessFile'
import { getdeptlist } from '@/api/BasicSettings'
var _that
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
  beforeCreate() {
    _that = this
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
                  title: 'successful',
                  message: 'save successful',
                  type: 'success',
                  offset: 100
                })
                this.restAllForm()
                this.$refs.personalForm.clearValidate()
                this.$refs.personalForm.resetFields()
              } else {
                this.$notify.error({
                  title: 'wrong',
                  message: res.data.msg,
                  offset: 100
                })
              }
            })
          }
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
