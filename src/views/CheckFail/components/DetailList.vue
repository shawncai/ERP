<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.handleNumber +'    详情'" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('CheckFail.title')" style="width: 100%;">
                <span>{{ personalForm.title }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckFail.sourceType')" prop="sourceType" style="width: 100%;">
                <span>{{ personalForm.sourceType | sourceTypeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckFail.sourceNumber')" prop="sourceNumber" style="width: 100%;">
                <span>{{ personalForm.sourceNumber }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckFail.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                <span>{{ personalForm.handlePersonName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckFail.handleDate')" prop="handleDate" style="width: 100%;">
                <span>{{ personalForm.handleDate }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">物品信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm2" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('CheckFail.productCode')" prop="productCode" style="width: 100%;">
                <span>{{ personalForm.productCode }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckFail.productName')" style="width: 100%;">
                <span>{{ personalForm.productName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckFail.unit')" style="width: 100%;">
                <span>{{ personalForm.unit }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckFail.typeId')" style="width: 100%;">
                <span>{{ personalForm.typeId }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CheckFail.failedQuantity')" style="width: 100%;">
                <span>{{ personalForm.failedQuantity }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">不合格处置单明细</h2>
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
          <el-editable-column label="序号" min-width="55" align="center" type="index"/>
          <el-editable-column prop="failedReason" align="center" label="不合格原因" min-width="150px"/>
          <el-editable-column prop="quantity" align="center" label="数量" min-width="150px"/>
          <el-editable-column prop="handleMode" align="center" label="处置方式" min-width="150px"/>
          <el-editable-column prop="rate" align="center" label="比例" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <!--审核状态-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">审批记录</h2>
      <div class="container" style="margin-top: 37px">
        <el-table
          :data="reviewList"
          border
          style="width: 100%">
          <el-table-column
            prop="step"
            align="center"
            label="当前步骤"
            min-width="150"/>
          <el-table-column
            prop="stepHandlerName"
            align="center"
            label="当前审批人"
            min-width="150"/>
          <el-table-column
            prop="handleTime"
            align="center"
            label="审批时间"
            min-width="150"/>
          <el-table-column
            prop="stat"
            align="center"
            label="审批意见"
            min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.stat | statfilter }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">备注信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('public.createPersonName2')" prop="stockType" style="width: 100%;">
                {{ personalForm.createPersonName }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('public.createDate2')" style="width: 100%;">
                {{ personalForm.createDate }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('public.endPersonName')" prop="applyDate" style="width: 100%;">
                {{ personalForm.endPersonName }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('public.endDate')" prop="applyDate" style="width: 100%;">
                {{ personalForm.endDate }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('public.modifyPersonName')" prop="applyDate" style="width: 100%;">
                {{ personalForm.modifyPersonName }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('public.modifyDate')" prop="applyDate" style="width: 100%;">
                {{ personalForm.modifyDate }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
export default {
  filters: {
    statfilter(status) {
      const statusMap = {
        1: '审核中',
        2: '审核通过',
        3: '审核不通过'
      }
      return statusMap[status]
    },
    stockTypeIdFilter(status) {
      const statusMap = {
        1: '采购1'
      }
      return statusMap[status]
    },
    sourceTypeFilter(status) {
      const statusMap = {
        1: '质检报告单'
      }
      return statusMap[status]
    },
    currencyFilter(status) {
      const statusMap = {
        1: 'RMB',
        2: 'USD'
      }
      return statusMap[status]
    },
    receiptStatFilter(status) {
      const statusMap = {
        1: '制单',
        2: '执行',
        3: '结单'
      }
      return statusMap[status]
    },
    checkTypeFilter(status) {
      const statusMap = {
        1: '来料质检',
        2: '送样质检',
        3: '生产质检'
      }
      return statusMap[status]
    },
    checkModeFilter(status) {
      const statusMap = {
        1: '抽样'
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
      // 详细表数据
      list2: [],
      list3: [],
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
      this.list2 = this.personalForm.checkFailHandleDetails
      this.reviewList = this.personalForm.approvalUseVos
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
</style>
