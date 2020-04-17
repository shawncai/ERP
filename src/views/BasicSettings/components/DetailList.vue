<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.id +$t('updates.xqing')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('BasicSettings.process_name')" class="print2" style="width: 100%;display: none">
                  {{ personalForm.processName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('BasicSettings.is_effective')" style="width: 100%;">
                  <span>{{ personalForm.isEffective | isEffectiveFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('BasicSettings.type3')" prop="sourceType" style="width: 100%;">
                  <span>{{ personalForm.typeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('BasicSettings.is_message')" prop="sourceNumber" style="width: 100%;">
                  <span>{{ personalForm.isMessage | isMessageFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('BasicSettings.effect_region')" prop="customerId" style="width: 100%;">
                  <span>{{ personalForm.regionName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('BasicSettings.effect_repository')" style="width: 100%;">
                  <span>{{ personalForm.repositoryName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >审批流程明细</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            border
            size="small"
            style="width: 100%">
            <el-editable-column :label="$t('Hmodule.xh')" width="55" fixed="left" align="center" type="index"/>
            <el-editable-column label="流程步骤" prop="step" width="100" align="center" fixed="left" />
            <el-editable-column label="步骤描述" prop="description" width="100" align="center" fixed="left" />
            <el-editable-column label="流转条件" prop="money" width="80" align="center" />
            <el-editable-column label="步骤处理人" prop="handlerName" align="center" />
          </el-editable>
        </div>
      </el-card>
    </div>
  </el-dialog>
</template>

<script>
var _that
export default {
  filters: {
    isMessageFilter(status) {
      const statusMap = {
        1: _that.$t('otherlanguage.fs'),
        2: _that.$t('otherlanguage.bfs')
      }
      return statusMap[status]
    },
    isEffectiveFilter(status) {
      const statusMap = {
        1: _that.$t('otherlanguage.qyong'),
        2: _that.$t('otherlanguage.tingyong')
      }
      return statusMap[status]
    },
    receiptStatFilter(status) {
      const statusMap = {
        1: _that.$t('updates.zd'),
        2: _that.$t('updates.zx'),
        3: _that.$t('updates.jd')
      }
      return statusMap[status]
    }
  },
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
      // 审核数据
      reviewList: [],
      list2: [],
      // 弹窗组件的控制
      editVisible: this.detailcontrol,
      // 供应商信息数据
      personalForm: this.detaildata,
      productForm: {}
    }
  },
  watch: {
    detailcontrol() {
      this.editVisible = this.detailcontrol
    },
    detaildata() {
      this.personalForm = this.detaildata.process[0]
      this.list2 = this.detaildata.detail
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    handlecancel() {
      this.editVisible = false
    }
  }
}
</script>

<style scoped>
  .edit >>> .el-dialog{
    -webkit-transform: none;
    transform: none;
    position: absolute;
    right: 0;
    left: auto;
    height: auto;
  }
  .edit >>> .el-dialog__header{
    background: #fff;
    position: fixed;
    top: 0;
    display: block;
    width: 1010px;
    z-index: 100;
    border-bottom: 1px solid #f1f1f1;
  }
  .edit >>> .el-dialog__body{
    padding-left: 0;
    padding-right: 0;
    padding-top: 10px;
  }
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
  .container >>> .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    margin-left: -10px;
  }
  .container >>> .el-form-item__label{
    text-align: left;
  }
  .container >>> .el-form-item__label{
    color: #60626696;
  }
  .el-col-12{
    width: 49%;
  }
  @media print {
    .print {
      display: none;
    }
    .print2 {
      display: block !important;
    }
  }
</style>
