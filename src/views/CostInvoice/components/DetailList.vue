<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="$t('updates.xqing')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">{{ $t('updates.print') }}</button>
        <button style="font-size: 10px;margin-left: 10px" @click="handleMyReceipt2()">{{ $t('updates.fzdj') }}</button>

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
                <el-form-item :label="$t('update4.invoiceDate')" style="width: 100%;">
                  <span>{{ personalForm.invoiceDate }}</span>
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
                <el-form-item :label="$t('Invoice.invoiceType')" prop="invoiceType" style="width: 100%;">
                  <span>{{ personalForm.invoiceType | invoiceTypeFilter }}</span>
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
              <!-- <el-col :span="12">
                <el-form-item :label="$t('CostInvoice.currency')" style="width: 100%;">
                  <span>{{ personalForm.currency | currencyFilter }}</span>
                </el-form-item>
              </el-col> -->
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
              <!-- <el-col :span="12">
                <el-form-item :label="$t('Recycling.exchangeRate')" style="width: 100%;">
                  <span>{{ personalForm.currencyRate }}</span>
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item :label="$t('Repository.countryId')" style="width: 100%;">
                  <span>{{ personalForm.countryName }}</span>
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
            size="small"
            style="width: 100%">
            <el-editable-column :label="$t('Hmodule.xh')" fixed="left" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('updates.fydm')" prop="costCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.fymc')" prop="costName" align="center" min-width="150px"/>
            <!-- <el-editable-column :label="$t('updates.fylx')" prop="costCategory" align="center" min-width="150px"/> -->
            <el-editable-column :label="$t('updates.fylx')" prop="costCategoryName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.jldw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.shuli')" prop="quantity" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.hsj')" prop="includeTaxPrice" align="center" min-width="170px"/>
            <el-editable-column prop="includeTaxMoney" align="center" label="含税额" min-width="170px"/>
            <el-editable-column :label="$t('updates.sl')" prop="taxRate" align="center" min-width="170px"/>
            <el-editable-column :label="$t('updates.kdyse')" prop="deduTaxMoney" align="center" min-width="170px"/>
            <el-editable-column :label="$t('updates.bhsje')" prop="money" align="center" min-width="170px"/>
            <el-editable-column :label="$t('updates.bz')" prop="remark" align="center" min-width="170px"/>
            <el-editable-column :label="$t('CostInvoice.currency')" prop="mycurrency" align="center" min-width="170px"/>
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
        <div>
          <el-button v-show="isReview()&&(personalForm.receiptStat === 1||personalForm.receiptStat === 2||personalForm.receiptStat === 3)" type="warning" size="mini" @click="handleReview()">
            {{ $t('updates.spi') }}
          </el-button>

        </div>
      </el-card>
    </div>
  </el-dialog>
</template>

<script>
var _that
import { updatecostinvoice2 } from '@/api/CostInvoice'

export default {
  filters: {
    invoiceTypeFilter(status) {
      const statusMap = {
        1: '增值税专用发票',
        2: '增值税普通发票',
        3: '普通发票',
        4: '无票',
        5: '其他'
      }
      return statusMap[status]
    },
    currencyFilter(status) {
      const statusMap = {
        1: 'PHP',
        2: 'USD',
        3: 'RMB',
        4: 'LKR',
        5: 'THB'
      }
      return statusMap[status]
    },
    statfilter(status) {
      const statusMap = {
        0: _that.$t('updates.wsh'),
        1: _that.$t('updates.shz'),
        2: _that.$t('Hmodule.shtg'),
        3: _that.$t('Hmodule.shbtg')
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
        1: 'PHP',
        2: 'USD',
        3: 'RMB',
        4: 'LKR',
        5: 'THB'
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
      if (this.personalForm.costInvoiceDetailVos !== null && this.personalForm.costInvoiceDetailVos !== '' && this.personalForm.costInvoiceDetailVos !== undefined && this.personalForm.costInvoiceDetailVos.length !== 0) {
        for (let i = 0; i < this.personalForm.costInvoiceDetailVos.length; i++) {
          if (this.personalForm.costInvoiceDetailVos[i].currency === 1) {
            this.personalForm.costInvoiceDetailVos[i].mycurrency = 'PHP'
          } else if (this.personalForm.costInvoiceDetailVos[i].currency === 2) {
            this.personalForm.costInvoiceDetailVos[i].mycurrency = 'USD'
          } else {
            this.personalForm.costInvoiceDetailVos[i].mycurrency = 'RMB'
          }
        }
      }

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
  beforeCreate() {
    _that = this
  },
  methods: {
    // 判断审核按钮
    isReview() {
      if (this.personalForm.approvalUseVos && this.personalForm.approvalUseVos.length !== 0) {
        const approvalUse = this.personalForm.approvalUseVos
        const index = approvalUse[approvalUse.length - 1].stepHandler.indexOf(',' + this.$store.getters.userId + ',')
        console.log(approvalUse[approvalUse.length - 1].stepHandler)
        console.log(index)
        if (index > -1 && (this.personalForm.judgeStat === 1 || this.personalForm.judgeStat === 0)) {
          return true
        }
      }
    },
    // 审批操作
    handleReview() {
      this.reviewParms = {}
      this.reviewParms.id = this.personalForm.id
      this.reviewParms.judgePersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qsh'), this.$t('prompt.sh'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.tg'),
        cancelButtonText: this.$t('prompt.btg'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.judgeStat = 2
        const parms = JSON.stringify(this.reviewParms)
        updatecostinvoice2(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: this.$t('prompt.shcg')
            })
            this.editVisible = false
            this.$emit('rest', true)
          }
        })
      }).catch(action => {
        if (action === 'cancel') {
          // 取消弹框
          this.$confirm('是否确认审核不通过？', 'Warning', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消'
          })
            .then(() => {
              this.reviewParms.judgeStat = 3
              const parms = JSON.stringify(this.reviewParms)
              updatecostinvoice2(parms).then(res => {
                if (res.data.ret === 200) {
                  this.$message({
                    type: 'success',
                    message: this.$t('prompt.shcg')
                  })
                  this.editVisible = false
                  this.$emit('rest', true)
                }
              })
            })
            .catch(action => {
              this.$message({
                type: 'info',
                message: action === 'cancel'
                  ? '确认取消'
                  : '停留在当前页面'
              })
            })
          // ================取消弹框结束
        }
      })
    },
    handleMyReceipt2() {
      console.log(this.detaildata)
      this.$store.dispatch('getempcontract', this.detaildata)
      this.$router.push('/Invoice/AddCostInvoice')
      this.editVisible = false
    },
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
