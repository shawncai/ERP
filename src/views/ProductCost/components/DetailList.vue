<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.reportNumber +$t('updates.xqing')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">{{ $t('updates.print') }}</button>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="150px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('ProductCost.accountTime')" style="width: 100%;">
                  <span>{{ personalForm.accountTime }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProductCost.productName')" prop="sourceType" style="width: 100%;">
                  <span>{{ personalForm.productName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProductCost.accountType')" prop="sourceNumber" style="width: 100%;">
                  <span>{{ personalForm.accountType | accountTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProductCost.completeRate')" style="width: 100%;">
                  <span>{{ personalForm.completeRate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProductCost.isInput')" prop="reportPersonId" style="width: 100%;">
                  <span>{{ personalForm.isInput | checkModeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProductCost.finishQuantity')" prop="reportDeptId" style="width: 100%;">
                  <span>{{ personalForm.finishQuantity }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProductCost.producingQuantity')" prop="checkType" style="width: 100%;">
                  <span>{{ personalForm.producingQuantity }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProductCost.producingMaterialsQuantity')" prop="checkMode" style="width: 100%;">
                  <span>{{ personalForm.producingMaterialsQuantity }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProductCost.producingSalary')" style="width: 100%;">
                  <span>{{ personalForm.producingSalary }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProductCost.producingCost')" style="width: 100%;">
                  <span>{{ personalForm.producingCost }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProductCost.finishMaterialsUsedQuantity')" style="width: 100%;">
                  <span>{{ personalForm.finishMaterialsUsedQuantity }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProductCost.finishWorkHours')" prop="reportDeptId" style="width: 100%;">
                  <span>{{ personalForm.finishWorkHours }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProductCost.endMaterialsQuantity')" prop="checkDate" style="width: 100%;">
                  <span>{{ personalForm.endMaterialsQuantity }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProductCost.endWorkHours')" prop="checkDate" style="width: 100%;">
                  <span>{{ personalForm.endWorkHours }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProductCost.currency')" prop="checkDate" style="width: 100%;">
                  <span>{{ personalForm.currency }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >成本费用明细</h2>
        <div class="container">
          <el-row :gutter="20" style="margin-top: 100px">
            <el-col :span="24">
              <div style="width: 100%; min-height: 300px;" >
                <el-row :gutter="20" style="margin-top: 26px">
                  <el-col :span="24">
                    <div style="width: 100%; min-height: 400px;" >
                      <el-table
                        ref="totaltable"
                        :data.sync="list2"
                        :border="true"
                        style="width: 100%">
                        <el-table-column
                          prop="productCost"
                          label="产品成本"
                          min-width="140"
                          align="center"/>
                        <el-table-column
                          prop="material"
                          label="直接材料费用"
                          min-width="140"
                          align="center"/>
                        <el-table-column
                          prop="man"
                          label="直接人工费用"
                          min-width="140"
                          align="center"/>
                        <el-table-column
                          prop="produce"
                          label="制造费用"
                          min-width="140"
                          align="center"/>
                        <el-table-column
                          prop="total"
                          label="费用合计"
                          min-width="140"
                          align="center"/>
                      </el-table>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
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
              prop="step"
              align="center"
              :label="$t('updates.dqbz')"
              min-width="150"/>
            <el-table-column
              prop="stepHandlerName"
              align="center"
              :label="$t('updates.dqspr')"
              min-width="150"/>
            <el-table-column
              prop="handleTime"
              align="center"
              :label="$t('updates.spsj')"
              min-width="150"/>
            <el-table-column
              prop="stat"
              align="center"
              :label="$t('updates.spyj')"
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
    chectResultFilter(status) {
      const statusMap = {
        1: '合格',
        2: '不合格'
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
        1: '质检申请单'
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
        1: _that.$t('updates.zd'),
        2: _that.$t('updates.zx'),
        3: _that.$t('updates.jd')
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
    accountTypeFilter(status) {
      const statusMap = {
        1: '约当产量法',
        2: '定额成本法',
        3: '定额比例法'
      }
      return statusMap[status]
    },
    checkModeFilter(status) {
      const statusMap = {
        1: '是',
        2: '否'
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
      results: [{ value: 1, label: '合格' }, { value: 2, label: '不合格' }],
      // 检验部门数据
      depts2: [],
      // 审核数据
      reviewList: [],
      // 详细表数据
      list2: [
        {
          productCost: '月初在产品成本',
          material: '',
          man: '',
          produce: '',
          total: '0.00'
        },
        {
          productCost: '本月发生生产费用',
          material: '',
          man: '',
          produce: '',
          total: '0.00'
        },
        {
          productCost: '合计',
          material: '0.00',
          man: '0.00',
          produce: '0.00',
          total: '0.00'
        },
        {
          productCost: '完工产品总成本',
          material: '0.00',
          man: '0.00',
          produce: '0.00',
          total: '0.00'
        },
        {
          productCost: '单位成本',
          material: '0.00',
          man: '0.00',
          produce: '0.00',
          total: '0.00'
        },
        {
          productCost: '月末在产品成本',
          material: '0.00',
          man: '0.00',
          produce: '0.00',
          total: '0.00'
        }
      ],
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
      // this.list2 = this.personalForm.checkReportDetailVos
      this.reviewList = []
      const review = this.personalForm.approvalUseVos
      for (const i in review) {
        if (review[i].actualStepHandler !== null) {
          this.reviewList.push(review[i])
        }
      }
      this.list2[0].material = this.personalForm.productCostDetails[0].beginMaterialsMoney
      this.list2[0].man = this.personalForm.productCostDetails[0].beginSalaryMoney
      this.list2[0].produce = this.personalForm.productCostDetails[0].beginProduceMoney
      this.list2[1].material = this.personalForm.productCostDetails[0].thisMaterialsMoney
      this.list2[1].man = this.personalForm.productCostDetails[0].thisSalaryMoney
      this.list2[1].produce = this.personalForm.productCostDetails[0].thisProduceMoney
      this.list2[0].total = this.personalForm.productCostDetails[0].beginAll
      this.list2[1].total = this.personalForm.productCostDetails[0].thisAll
      this.list2[2].material = this.personalForm.productCostDetails[0].materialAll
      this.list2[2].man = this.personalForm.productCostDetails[0].salaryAll
      this.list2[2].produce = this.personalForm.productCostDetails[0].produceAll
      this.list2[2].total = this.personalForm.productCostDetails[0].total
      this.list2[3].material = this.personalForm.productCostDetails[0].finishMaterialsMoney
      this.list2[3].man = this.personalForm.productCostDetails[0].finishSalaryMoney
      this.list2[3].produce = this.personalForm.productCostDetails[0].finishProduceMoney
      this.list2[3].total = this.personalForm.productCostDetails[0].finishAll
      this.list2[4].material = this.personalForm.productCostDetails[0].unitMaterialsMoney
      this.list2[4].man = this.personalForm.productCostDetails[0].unitSalaryMoney
      this.list2[4].produce = this.personalForm.productCostDetails[0].unitProduceMoney
      this.list2[4].total = this.personalForm.productCostDetails[0].unitAll
      this.list2[5].material = this.personalForm.productCostDetails[0].endMaterialsMoney
      this.list2[5].man = this.personalForm.productCostDetails[0].endSalaryMoney
      this.list2[5].produce = this.personalForm.productCostDetails[0].endProduceMoney
      this.list2[5].total = this.personalForm.productCostDetails[0].endAll
    }
  },
  created() {
    this.getTypes()
  },
  methods: {
    getTypes() {

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
