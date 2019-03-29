<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.reportNumber +'    详情'" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('ProduceTask.title')" style="width: 100%;">
                <span>{{ personalForm.title }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('ProduceTask.deptId')" prop="deptId" style="width: 100%;">
                <span>{{ personalForm.deptName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('ProduceTask.workCenterId')" prop="workCenterId" style="width: 100%;">
                <span>{{ personalForm.workCenter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('ProduceTask.produceTaskNumber')" prop="produceTaskNumber" style="width: 100%;">
                <span>{{ personalForm.produceTaskNumber }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('ProduceTask.produceDate')" prop="produceDate" style="width: 100%;">
                <span>{{ personalForm.produceDate }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <el-tabs v-model="activeName2" type="card">
        <el-tab-pane label="生产状况" name="first">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="110px" style="margin-left: 30px;margin-top: 10px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.countFinishQuantity')" style="width: 100%;">
                  <span>{{ personalForm.countFinishQuantity }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.countWorkHours')" style="width: 100%;">
                  <span>{{ personalForm.countWorkHours }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266">生产明细</h2>
          <div class="container">
            <el-editable
              ref="editable"
              :data.sync="list"
              :edit-config="{ showIcon: true, showStatus: true}"
              class="click-table1"
              stripe
              border
              size="medium"
              style="width: 100%">
              <el-editable-column type="selection" min-width="55" align="center"/>
              <el-editable-column label="序号" min-width="55" align="center" type="index"/>
              <el-editable-column prop="productCode" align="center" label="物品编号" min-width="150px"/>
              <el-editable-column prop="productName" align="center" label="物品名称" min-width="150px"/>
              <el-editable-column prop="workHours" align="center" label="工时" min-width="150px"/>
              <el-editable-column prop="finishQuantity" align="center" label="完成数" min-width="150px"/>
              <el-editable-column prop="passQuantity" align="center" label="合格数" min-width="150px"/>
              <el-editable-column prop="passRate" align="center" label="合格率" min-width="150px"/>
            </el-editable>
          </div>
        </el-tab-pane>
        <el-tab-pane label="人员状况" name="second">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="110px" style="margin-left: 30px;margin-top: 10px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.shouldPeoples')" style="width: 100%;">
                  <span>{{ personalForm.shouldPeoples }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.actualPeoples')" style="width: 100%;">
                  <span>{{ personalForm.actualPeoples }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.shouldWorkHours')" style="width: 100%;">
                  <span>{{ personalForm.shouldWorkHours }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.overtimeHours')" style="width: 100%;">
                  <span>{{ personalForm.overtimeHours }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.stopHours')" style="width: 100%;">
                  <span>{{ personalForm.stopHours }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.effectiveHours')" style="width: 100%;">
                  <span>{{ personalForm.effectiveHours }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;">人员明细</h2>
          <div class="container">
            <el-editable
              ref="editable2"
              :data.sync="list2"
              :edit-config="{ showIcon: true, showStatus: true}"
              class="click-table1"
              stripe
              border
              size="medium"
              style="width: 100%">
              <el-editable-column type="selection" min-width="55" align="center"/>
              <el-editable-column label="序号" min-width="55" align="center" type="index"/>
              <el-editable-column prop="personName" align="center" label="人员" min-width="150px"/>
              <el-editable-column prop="workHours" align="center" label="工时" min-width="150px"/>
              <el-editable-column prop="finishQuantity" align="center" label="完成数" min-width="150px"/>
              <el-editable-column prop="passQuantity" align="center" label="合格数" min-width="150px"/>
              <el-editable-column prop="passRate" align="center" label="合格率" min-width="150px"/>
            </el-editable>
          </div>
        </el-tab-pane>
        <el-tab-pane label="设备状况" name="third">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="110px" style="margin-left: 30px;margin-top: 10px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.equipmentQuantity')" style="width: 100%;">
                  <span>{{ personalForm.equipmentQuantity }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.actualEquipQuantity')" style="width: 100%;">
                  <span>{{ personalForm.actualEquipQuantity }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.allRunTime')" style="width: 100%;">
                  <span>{{ personalForm.allRunTime }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.runRate')" style="width: 100%;">
                  <span>{{ personalForm.runRate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.loadRate')" style="width: 100%;">
                  <span>{{ personalForm.loadRate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.useRate')" style="width: 100%;">
                  <span>{{ personalForm.useRate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.stopQuantity')" style="width: 100%;">
                  <span>{{ personalForm.stopQuantity }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.stopTime')" style="width: 100%;">
                  <span>{{ personalForm.stopTime }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.stopReason')" style="width: 100%;">
                  <span>{{ personalForm.stopReason }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;">设备明细</h2>
          <div class="container">
            <el-editable
              ref="editable3"
              :data.sync="list3"
              :edit-config="{ showIcon: true, showStatus: true}"
              class="click-table1"
              stripe
              border
              size="medium"
              style="width: 100%">
              <el-editable-column type="selection" min-width="55" align="center"/>
              <el-editable-column label="序号" min-width="55" align="center" type="index"/>
              <el-editable-column prop="equipmentNumber" align="center" label="设备编号" min-width="150px"/>
              <el-editable-column prop="equipmentName" align="center" label="设备名称" min-width="150px"/>
              <el-editable-column prop="runTime" align="center" label="开机时长" min-width="150px"/>
              <el-editable-column prop="finishQuantity" align="center" label="完成数" min-width="150px"/>
              <el-editable-column prop="passQuantity" align="center" label="合格数" min-width="150px"/>
              <el-editable-column prop="passRate" align="center" label="合格率" min-width="150px"/>
            </el-editable>
          </div>
        </el-tab-pane>
        <el-tab-pane label="物料使用情况" name="fourth">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="110px" style="margin-left: 30px;margin-top: 10px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.countAccess')" style="width: 100%;">
                  <span>{{ personalForm.countAccess }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.countUseup')" style="width: 100%;">
                  <span>{{ personalForm.countUseup }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.countRemain')" style="width: 100%;">
                  <span>{{ personalForm.countRemain }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;">物料明细</h2>
          <div class="container">
            <el-editable
              ref="editable4"
              :data.sync="list4"
              :edit-config="{ showIcon: true, showStatus: true}"
              class="click-table1"
              stripe
              border
              size="medium"
              style="width: 100%">
              <el-editable-column type="selection" min-width="55" align="center"/>
              <el-editable-column label="序号" min-width="55" align="center" type="index"/>
              <el-editable-column prop="productCode" align="center" label="物品编号" min-width="150px"/>
              <el-editable-column prop="productName" align="center" label="物品名称" min-width="150px"/>
              <el-editable-column prop="todayAccess" align="center" label="本日领入" min-width="150px"/>
              <el-editable-column prop="yesterdayRemain" align="center" label="昨日结存" min-width="150px"/>
              <el-editable-column prop="todayUseup" align="center" label="本日耗用" min-width="150px"/>
              <el-editable-column prop="todayDamaged" align="center" label="本日损坏" min-width="150px"/>
              <el-editable-column prop="todayRemain" align="center" label="本日结存" min-width="150px"/>
            </el-editable>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!--审核状态-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name">审核状态</h2>
      <el-steps :active="reviewList.length" direction="vertical">
        <el-step
          v-for="(item, index) in reviewList"
          :key="index"
          :title="'审核步骤' + item.step"
          style="height: 100px">
          <template slot="description" >
            <span style="font-size: 16px;color: red">{{ item.stat | statfilter }}</span><br>
            <span style="font-size: 14px">审核人: {{ item.stepHandlerName }}</span><br>
            <span style="font-size: 14px">审核时间: {{ item.createTime }}</span>
          </template>
        </el-step>
      </el-steps>
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
    sourceTypeFilter(status) {
      const statusMap = {
        1: '主生产计划',
        2: '无来源'
      }
      return statusMap[status]
    },
    processTypeFilter(status) {
      const statusMap = {
        1: '加工1'
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
      // 控制标签页
      activeName2: 'first',
      // 审核数据
      reviewList: [],
      // 生产状况明细数据
      list: [],
      // 人员状况明细数据
      list2: [],
      // 设备状况明细数据
      list3: [],
      // 物料使用情况状况明细数据
      list4: [],
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
      this.workCenterId = this.personalForm.workCenter
      this.reviewList = this.personalForm.approvalUseVos
      this.list = this.personalForm.produceReportDetails
      this.list2 = this.personalForm.produceReportPeopleDetailVos
      this.list3 = this.personalForm.produceReportEquipmentDetails
      this.list4 = this.personalForm.produceReportMaterialsDetails
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
    height: 1000px;
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
