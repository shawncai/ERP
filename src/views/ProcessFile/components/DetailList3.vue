<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" append-to-body class="edit" top="10px" title="修改采购入库单" @close="$emit('update:detailcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="135px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.code3')" prop="code" style="width: 100%;">
                <el-input v-model="personalForm.code" style="margin-left: 18px; width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.createrName')" prop="code" style="width: 100%;">
                <el-input v-model="personalForm.createPersonName" style="margin-left: 18px; width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.createTime')" prop="code" style="width: 100%;">
                <el-input v-model="personalForm.createTime" style="margin-left: 18px; width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.processName2')" prop="processName" style="width: 100%;">
                <el-input v-model="personalForm.processName" style="margin-left: 18px; width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.shortName')" style="width: 100%;">
                <el-input v-model="personalForm.shortName" style="margin-left: 18px; width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.workCenterId')" prop="workCenterId" style="width: 100%;">
                <el-input v-model="personalForm.workCenterName" style="margin-left: 18px; width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.testMethod')" prop="testMethod" style="width: 100%;">
                <el-select v-model="personalForm.testMethod" style="margin-left: 18px; width: 150px" disabled >
                  <el-option value="1" label="自检"/>
                  <el-option value="2" label="别人检"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.timeUnit')" prop="timeUnit" style="width: 100%;">
                <el-select v-model="personalForm.timeUnit" style="margin-left: 18px; width: 150px" disabled >
                  <el-option value="1" label="天"/>
                  <el-option value="2" label="月"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.preTime')" style="width: 100%;">
                <el-input v-model="personalForm.preTime" style="margin-left: 18px; width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.runTime')" style="width: 100%;">
                <el-input v-model="personalForm.runTime" style="margin-left: 18px; width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.isCost')" prop="isCost" style="width: 100%;">
                <el-radio-group v-model="personalForm.isCost" disabled style="margin-left: 19px; width: 150px">
                  <el-radio :label="1">{{ $t('updates.yes') }}</el-radio>
                  <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.isHelp')" label-width="120px" prop="isHelp" style="width: 100%;">
                <el-radio-group v-model="personalForm.isHelp" disabled style="margin-left: 19px; width: 150px">
                  <el-radio :label="1">{{ $t('updates.yes') }}</el-radio>
                  <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.timeWage')" style="width: 100%;">
                <el-input v-model="personalForm.timeWage" style="margin-left: 18px; width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.numberWage')" style="width: 100%;">
                <el-input v-model="personalForm.numberWage" style="margin-left: 18px; width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.stat')" prop="stat" style="width: 100%;">
                <el-radio-group v-model="personalForm.stat" disabled style="margin-left: 19px; width: 150px">
                  <el-radio :label="1">启用</el-radio>
                  <el-radio :label="2">停用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--工序明细-->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">{{ $t('updates.gxmx') }}</h2>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: true, showStatus: true}"
          class="click-table1"
          stripe
          border
          size="medium"
          style="width: 100%">
          <el-editable-column type="selection" min-width="55" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
          <el-editable-column :label="$t('updates.gymc')" prop="processFileName" align="center" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
var _that
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
      // 弹窗组件的控制
      editVisible: this.detailcontrol,
      // 详细信息数据
      personalForm: this.detaildata,
      // 详细表数据
      list2: []
    }
  },
  watch: {
    detailcontrol() {
      this.editVisible = this.detailcontrol
    },
    detaildata() {
      this.personalForm = this.detaildata
      this.list2 = this.personalForm.standardProcessDetailVos
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
    left: 0;
  }
</style>
