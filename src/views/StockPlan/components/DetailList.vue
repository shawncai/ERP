<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.planNumber +'    详情'" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">打印</button>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item class="print2" label="采购计划单编号" style="width: 100%;display: none">
                  {{ personalForm.planNumber }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockPlan.title')" style="width: 100%;">
                  <span>{{ personalForm.title }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockPlan.stockType')" prop="stockType" style="width: 100%;">
                  <span>{{ personalForm.stockTypeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockPlan.planPersonId')" prop="planPersonId" style="width: 100%;">
                  <span>{{ personalForm.planPersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockPlan.stockPersonId')" prop="stockPersonId" style="width: 100%;">
                  <span>{{ personalForm.stockPersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockPlan.stockDeptId')" prop="stockDeptId" style="width: 100%;">
                  <span>{{ personalForm.stockDeptName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockPlan.sourceType')" style="width: 100%;">
                  <span>{{ personalForm.sourceType | sourceTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockPlan.planDate')" prop="planDate" style="width: 100%;">
                  <span>{{ somedate }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">采购申请明细来源</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            border
            size="medium"
            style="width: 100%">
            <el-editable-column class="print" fixed="left" label="序号" align="center" type="index"/>
            <el-editable-column prop="productCode" fixed="left" align="center" label="物品编号" />
            <el-editable-column prop="productName" fixed="left" align="center" label="物品名称" />
            <el-editable-column prop="productType" align="center" label="规格" />
            <el-editable-column prop="color" align="center" label="颜色" />
            <el-editable-column prop="unit" align="center" label="单位" />
            <el-editable-column prop="basicPrice" align="center" label="单价" />
            <el-editable-column prop="planQuantity" align="center" label="计划数量" />
            <el-editable-column prop="planMoney" align="center" label="计划金额" />
            <el-editable-column prop="planDeliveryDate" align="center" label="计划交货日期" />
            <el-editable-column prop="applyReason" align="center" label="申请原因" />
            <el-editable-column prop="sourceNumber" align="center" label="源单编号" />
            <el-editable-column prop="supplierName" align="center" label="供应商" />
            <el-editable-column prop="orderQuantity" align="center" label="已订购数量" />
            <el-editable-column prop="sourceSerialNumber" align="center" label="源单序号" />
          </el-editable>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">采购申请明细来源</h2>
        <div class="container">
          <el-editable
            ref="editable2"
            :data.sync="list3"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            border
            size="medium"
            style="width: 100%">
            <el-editable-column class="print" label="序号" align="center" type="index"/>
            <el-editable-column class="print" prop="productCode" align="center" label="物品编号" />
            <el-editable-column prop="productName" align="center" label="物品名称" />
            <el-editable-column prop="productType" align="center" label="规格" />
            <el-editable-column prop="color" align="center" label="颜色" />
            <el-editable-column prop="unit" align="center" label="单位" />
            <el-editable-column prop="basicPrice" align="center" label="单价" />
            <el-editable-column prop="planQuantity" align="center" label="计划数量" />
            <el-editable-column prop="planMoney" align="center" label="计划金额" />
            <el-editable-column prop="planDeliveryDate" align="center" label="计划交货日期"/>
            <el-editable-column prop="applyReason" align="center" label="申请原因" />
            <el-editable-column prop="sourceNumber" align="center" label="源单编号" />
            <el-editable-column prop="supplierName" align="center" label="供应商" />
            <el-editable-column prop="orderQuantity" align="center" label="已订购数量" />
            <el-editable-column prop="sourceSerialNumber" align="center" label="源单序号" />
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
    </div>
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
        1: '采购申请',
        2: '采购需求',
        3: '无来源'
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
      // 中转data
      somedate: '',
      // 合计数据
      heji1: '',
      heji2: '',
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
      this.list2 = this.personalForm.stockPlanDetailVos
      this.list3 = this.personalForm.stockPlanDetailVos
      this.reviewList = this.personalForm.approvalUseVos
      this.somedate = this.personalForm.planDate
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
  .print3 {
    width:50px;
  }
  @media print {
    .print {
      display: none;
    }
    .print2 {
      display: block !important;
    }
    /*.print3 {*/
    /*  width:50px !important;*/
    /*}*/
  }
</style>
