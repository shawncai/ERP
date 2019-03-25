<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" append-to-body class="edit" top="10px" title="修改采购入库单" @close="$emit('update:detailcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="135px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.code2')" prop="code" style="width: 100%;">
                <el-input v-model="personalForm.code" style="margin-left: 18px; width: 170px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.createrName')" style="width: 100%;">
                <el-input v-model="personalForm.createrName" style="margin-left: 18px; width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.processName')" prop="processName" style="width: 100%;">
                <el-input v-model="personalForm.processName" style="margin-left: 18px; width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.shortName')" style="width: 100%;">
                <el-input v-model="personalForm.shortName" style="margin-left: 18px; width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.description')" style="width: 100%;">
                <el-input v-model="personalForm.description" style="margin-left: 18px; width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.stat')" prop="stat" style="width: 100%;">
                <el-radio-group v-model="personalForm.stat" style="margin-left: 19px; width: 150px" disabled>
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
      <el-button type="danger" @click="handlecancel()">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    detailcontrol: {
      type: Boolean,
      default: false
    },
    detaildata: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 部门数据
      depts: [],
      // 弹窗组件的控制
      editVisible: this.detailcontrol,
      // 供应商信息数据
      personalForm: this.detaildata
    }
  },
  watch: {
    detailcontrol() {
      this.editVisible = this.detailcontrol
    },
    detaildata() {
      this.personalForm = this.detaildata
    }
  },
  methods: {
    handlecancel() {
      this.editVisible = false
    }
  }
}
</script>

<style scoped>
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
  }
</style>
