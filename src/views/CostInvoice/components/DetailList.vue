<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="$t('updates.xqing')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">{{ $t('updates.print') }}</button>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('CostInvoice.settleMode')" style="width: 100%;">
                  <span>{{ personalForm.settleModeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('CostInvoice.payDate')" prop="sourceType" style="width: 100%;">
                  <span>{{ personalForm.payDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('CostInvoice.subject')" prop="supplierId" style="width: 100%;">
                  <span>{{ personalForm.subjectName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('CostInvoice.isInclude')" prop="stockPersonId" style="width: 100%;">
                  <span>{{ personalForm.isInclude | isIncludeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('CostInvoice.invoiceNumber')" prop="stockType" style="width: 100%;">
                  <span>{{ personalForm.invoiceNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('CostInvoice.supplierId')" prop="deptId" style="width: 100%;">
                  <span>{{ personalForm.supplierName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('CostInvoice.taxNumber')" style="width: 100%;">
                  <span>{{ personalForm.taxNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('CostInvoice.address')" style="width: 100%;">
                  <span>{{ personalForm.address }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('CostInvoice.bank')" prop="signDate" style="width: 100%;">
                  <span>{{ personalForm.bank }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('CostInvoice.currency')" style="width: 100%;">
                  <span>{{ personalForm.currency | currencyFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('CostInvoice.handlePersonId')" prop="currency" style="width: 100%;">
                  <span>{{ personalForm.handlePersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('CostInvoice.deptId')" style="width: 100%;">
                  <span>{{ personalForm.deptName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">费用发票明细</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            border
            size="medium"
            style="width: 100%">
            <el-editable-column :label="$t('Hmodule.xh')" fixed="left" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('updates.fydm')" prop="costCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.fymc')" prop="costName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.fylx')" prop="costCategory" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.jldw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.shuli')" prop="quantity" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.hsj')" prop="includeTaxPrice" align="center" min-width="170px"/>
            <el-editable-column prop="includeTaxMoney" align="center" label="含税额" min-width="170px"/>
            <el-editable-column :label="$t('updates.sl')" prop="taxRate" align="center" min-width="170px"/>
            <el-editable-column :label="$t('updates.kdyse')" prop="deduTaxMoney" align="center" min-width="170px"/>
            <el-editable-column :label="$t('updates.bhsje')" prop="money" align="center" min-width="170px"/>
            <el-editable-column :label="$t('updates.bz')" prop="remark" align="center" min-width="170px"/>
            <el-editable-column :label="$t('updates.fykm')" prop="subjectName" align="center" min-width="170px"/>
          </el-editable>
        </div>
      </el-card>
      <!--审核状态-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.spjl') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-table
            :data="reviewList"
            border
            style="width: 100%">
            <el-table-column
              :label="$t('updates.dqbz')"
              prop="step"
              align="center"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.dqspr')"
              prop="stepHandlerName"
              align="center"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.spsj')"
              prop="handleTime"
              align="center"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.spyj')"
              prop="stat"
              align="center"
              min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | statfilter }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.bzxx') }}</h2>
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
var _that
export default {
  filters: {
    currencyFilter(status) {
      const statusMap = {
        1: 'RMB',
        2: 'USD'
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
    stockTypeIdFilter(status) {
      const statusMap = {
        1: '采购1'
      }
      return statusMap[status]
    },
    sourceTypeFilter(status) {
      const statusMap = {
        1: _that.$t('updates.cgsq'),
        2: _that.$t('updates.cgjhd'),
        3: _that.$t('updates.cgxjd'),
        4: _that.$t('Hmodule.Nosource')
      }
      return statusMap[status]
    },
    currencyIdFilter(status) {
      const statusMap = {
        1: 'RMB',
        2: 'USD'
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
    },
    isIncludeFilter(status) {
      const statusMap = {
        1: '计入成本',
        2: '不计入成本'
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
      this.list2 = this.personalForm.costInvoiceDetailVos
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
