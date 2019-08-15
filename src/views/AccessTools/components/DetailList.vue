<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="'    详情'" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">打印</button>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('AccessTools.title')" prop="title" style="width: 100%;">
                  <span>{{ personalForm.title }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('AccessTools.applyDate')" prop="sourceType" style="width: 100%;">
                  <span>{{ personalForm.applyDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('AccessTools.accessDate')" style="width: 100%;">
                  <span>{{ personalForm.accessDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('AccessTools.applyPersonId')" style="width: 100%;">
                  <span>{{ personalForm.applyPersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('AccessTools.deptId')" style="width: 100%;">
                  <span>{{ personalForm.deptName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('AccessTools.useType')" style="width: 100%;">
                  <span>{{ personalForm.useType | useTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('AccessTools.emergencyLevel')" style="width: 100%;">
                  <span>{{ personalForm.emergencyLevel | emergencyLevelFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('AccessTools.reason')" style="width: 100%;">
                  <span>{{ personalForm.applyReason }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('AccessTools.accessRepositoryId')" style="width: 100%;">
                  <span>{{ personalForm.accessRepositoryName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('AccessTools.providePersonId')" style="width: 100%;">
                  <span>{{ personalForm.providePersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('AccessTools.stat')" style="width: 100%;">
                  <span>{{ personalForm.stat | statFilter }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">工具明细</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            border
            size="medium"
            style="width: 100%">
            <el-editable-column label="序号" fixed="left" min-width="55" align="center" type="index"/>
            <el-editable-column prop="toolsCode" fixed="left" align="center" label="工具编号" />
            <el-editable-column prop="toolsName" align="center" fixed="left" label="工具名称" />
            <el-editable-column prop="unit" align="center" label="基本单位" />
            <!--          <el-editable-column prop="locationName" align="center" label="货位" />-->
            <el-editable-column prop="quantity" align="center" label="数量" />
            <el-editable-column prop="lossQuantity" align="center" label="丢失数量" />
            <el-editable-column prop="stat" align="center" label="状态" >
              <template slot-scope="scope">
                <p>{{ scope.row.stat | statFilter }}</p>
              </template>
            </el-editable-column>
          </el-editable>
        </div>
      </el-card>
    <!--审核状态-->
    <!--    <el-card class="box-card" style="margin-top: 15px" shadow="never">-->
    <!--      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">审批记录</h2>-->
    <!--      <div class="container" style="margin-top: 37px">-->
    <!--        <el-table-->
    <!--          :data="reviewList"-->
    <!--          border-->
    <!--          style="width: 100%">-->
    <!--          <el-table-column-->
    <!--            prop="step"-->
    <!--            align="center"-->
    <!--            label="当前步骤"-->
    <!--            min-width="150"/>-->
    <!--          <el-table-column-->
    <!--            prop="stepHandlerName"-->
    <!--            align="center"-->
    <!--            label="当前审批人"-->
    <!--            min-width="150"/>-->
    <!--          <el-table-column-->
    <!--            prop="handleTime"-->
    <!--            align="center"-->
    <!--            label="审批时间"-->
    <!--            min-width="150"/>-->
    <!--          <el-table-column-->
    <!--            prop="stat"-->
    <!--            align="center"-->
    <!--            label="审批意见"-->
    <!--            min-width="150">-->
    <!--            <template slot-scope="scope">-->
    <!--              <span>{{ scope.row.stat | statfilter }}</span>-->
    <!--            </template>-->
    <!--          </el-table-column>-->
    <!--        </el-table>-->
    <!--      </div>-->
    <!--    </el-card>-->
    <!--    <el-card class="box-card" shadow="never" style="margin-top: 10px">-->
    <!--      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">合计信息</h2>-->
    <!--      <div class="container" style="margin-top: 37px">-->
    <!--        <el-form :inline="true" status-icon class="demo-ruleForm" label-width="130px">-->
    <!--          <el-row>-->
    <!--            <el-col :span="12">-->
    <!--              <el-form-item label="采购数量合计" style="width: 100%;">-->
    <!--                <span>{{ personalForm.allQuantity }}</span>-->
    <!--              </el-form-item>-->
    <!--            </el-col>-->
    <!--            <el-col :span="12">-->
    <!--              <el-form-item label="金额合计" style="width: 100%;">-->
    <!--                <span>{{ personalForm.allMoney }}</span>-->
    <!--              </el-form-item>-->
    <!--            </el-col>-->
    <!--            <el-col :span="12">-->
    <!--              <el-form-item label="税额合计" style="width: 100%;">-->
    <!--                <span>{{ personalForm.allTaxMoney }}</span>-->
    <!--              </el-form-item>-->
    <!--            </el-col>-->
    <!--            <el-col :span="12">-->
    <!--              <el-form-item label="含税金额合计" style="width: 100%;">-->
    <!--                <span>{{ personalForm.allIncludeTaxMoney }}</span>-->
    <!--              </el-form-item>-->
    <!--            </el-col>-->
    <!--            <el-col :span="12">-->
    <!--              <el-form-item label="整单折扣金额合计" style="width: 100%;">-->
    <!--                <span>{{ personalForm.allDiscountMoney }}</span>-->
    <!--              </el-form-item>-->
    <!--            </el-col>-->
    <!--            <el-col :span="12">-->
    <!--              <el-form-item label="折后含税金额合计" style="width: 100%;">-->
    <!--                <span>{{ personalForm.allIncludeTaxDiscountMoney }}</span>-->
    <!--              </el-form-item>-->
    <!--            </el-col>-->
    <!--          </el-row>-->
    <!--        </el-form>-->
    <!--      </div>-->
    <!--    </el-card>-->
    <!--    <el-card class="box-card" style="margin-top: 15px" shadow="never">-->
    <!--      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">备注信息</h2>-->
    <!--      <div class="container" style="margin-top: 37px">-->
    <!--        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">-->
    <!--          <el-row>-->
    <!--            <el-col :span="12">-->
    <!--              <el-form-item :label="$t('public.createPersonName2')" prop="stockType" style="width: 100%;">-->
    <!--                {{ personalForm.createPersonName }}-->
    <!--              </el-form-item>-->
    <!--            </el-col>-->
    <!--            <el-col :span="12">-->
    <!--              <el-form-item :label="$t('public.createDate2')" style="width: 100%;">-->
    <!--                {{ personalForm.createDate }}-->
    <!--              </el-form-item>-->
    <!--            </el-col>-->
    <!--            <el-col :span="12">-->
    <!--              <el-form-item :label="$t('public.endPersonName')" prop="applyDate" style="width: 100%;">-->
    <!--                {{ personalForm.endPersonName }}-->
    <!--              </el-form-item>-->
    <!--            </el-col>-->
    <!--            <el-col :span="12">-->
    <!--              <el-form-item :label="$t('public.endDate')" prop="applyDate" style="width: 100%;">-->
    <!--                {{ personalForm.endDate }}-->
    <!--              </el-form-item>-->
    <!--            </el-col>-->
    <!--            <el-col :span="12">-->
    <!--              <el-form-item :label="$t('public.modifyPersonName')" prop="applyDate" style="width: 100%;">-->
    <!--                {{ personalForm.modifyPersonName }}-->
    <!--              </el-form-item>-->
    <!--            </el-col>-->
    <!--            <el-col :span="12">-->
    <!--              <el-form-item :label="$t('public.modifyDate')" prop="applyDate" style="width: 100%;">-->
    <!--                {{ personalForm.modifyDate }}-->
    <!--              </el-form-item>-->
    <!--            </el-col>-->
    <!--          </el-row>-->
    <!--        </el-form>-->
    <!--      </div>-->
    <!--    </el-card>-->
    </div>
  </el-dialog>
</template>

<script>
export default {
  filters: {
    customerTypeFilter(status) {
      const statusMap = {
        1: '经销商',
        2: '客户'
      }
      return statusMap[status]
    },
    contractStatFilter(status) {
      const statusMap = {
        1: '状态1'
      }
      return statusMap[status]
    },
    statFilter(status) {
      const statusMap = {
        1: '借出',
        2: '归还'
      }
      return statusMap[status]
    },
    statfilter(status) {
      const statusMap = {
        1: '审核中',
        2: '审核通过',
        3: '审核不通过'
      }
      return statusMap[status]
    },
    emergencyLevelFilter(status) {
      const statusMap = {
        1: '紧急',
        2: '不紧急'
      }
      return statusMap[status]
    },
    useTypeFilter(status) {
      const statusMap = {
        1: '维修',
        2: '其他'
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
    payTypeFilter(status) {
      const statusMap = {
        1: '现金'
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
      this.list2 = this.personalForm.accessToolsDetails
      this.reviewList = []
      const review = this.personalForm.approvalUseVos
      for (const i in review) {
        if (review[i].actualStepHandler !== null) {
          this.reviewList.push(review[i])
        }
      }
    }
  },
  methods: {
    // 计算税额
    getTaxMoney2(row) {
      row.taxMoney = row.price * row.taxRate
      return row.taxMoney
    },
    // 计算含税金额
    getTaxMoney(row) {
      row.includeTaxMoney = row.plannedQuantity * row.includeTaxPrice
      return row.includeTaxMoney
    },
    // 计算金额
    getMoney(row) {
      row.money = row.plannedQuantity * row.price
      return row.money
    },
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
