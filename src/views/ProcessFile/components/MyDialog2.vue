<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" class="edit" top="10px" title="修改工艺档案" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="135px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.code2')" prop="code" style="width: 100%;">
                <el-input v-model="personalForm.code" style="margin-left: 18px; width: 170px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.processName')" prop="processName" style="width: 100%;">
                <el-input v-model="personalForm.processName" style="margin-left: 18px; width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.shortName')" style="width: 100%;">
                <el-input v-model="personalForm.shortName" style="margin-left: 18px; width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.description')" style="width: 100%;">
                <el-input v-model="personalForm.description" style="margin-left: 18px; width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.stat')" prop="stat" style="width: 100%;">
                <el-radio-group v-model="personalForm.stat" style="margin-left: 19px; width: 150px">
                  <el-radio :label="1">启用</el-radio>
                  <el-radio :label="2">未启用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">修改</el-button>
      <el-button type="danger" @click="handlecancel()">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateprocessFile } from '@/api/ProcessFile'
export default {
  props: {
    editcontrol: {
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
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 工艺档案规则数据
      personalrules: {
        code: [
          { required: true, message: '请输入工艺档案编号', trigger: 'blur' }
        ],
        processName: [
          { required: true, message: '请输入工艺档案名称', trigger: 'blur' }
        ],
        stat: [
          { required: true, message: '请选择启用状态', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
    }
  },
  methods: {
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createId: 3,
        countryId: 1,
        repositoryId: 438,
        regionId: 2
      }
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = 438
      this.personalForm.regionId = 2
      this.personalForm.createPersonId = 3
      this.personalForm.countryId = 1
      this.personalForm.modifyPersonId = 3
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      updateprocessFile(parms).then(res => {
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
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
  }
</style>
