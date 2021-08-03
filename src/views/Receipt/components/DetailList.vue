<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.xqing')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">{{ $t('updates.print') }}</button>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item class="print2" label="收款单编号" style="width: 100%;display: none">
                  {{ personalForm.number }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Receipt.title')" style="width: 100%;">
                  <span>{{ personalForm.title }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Receipt.customerType')" prop="sourceType" style="width: 100%;">
                  <span>{{ personalForm.customerType | customerTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Receipt.customerId')" prop="sourceNumber" style="width: 100%;">
                  <span>{{ personalForm.customerName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Receipt.moneyType')" prop="customerId" style="width: 100%;">
                  <span>{{ personalForm.moneyType | moneyTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Receipt.receiptMoney')" style="width: 100%;">
                  <span>{{ personalForm.receiptMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.couponSupport')" style="width: 100%;">
                  <span>{{ personalForm.couponSupport }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('collectAndPay.couponNumbers')" style="width: 100%;">
                  <span>{{ personalForm.couponNumbers }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('collectAndPay.couponSupportOld')" style="width: 100%;">
                  <span>{{ personalForm.couponSupportOld }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('payment.payMode')" prop="totalMoney" style="width: 100%;">
                  <span>{{ personalForm.payModeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Receipt.receiptAccount')" prop="beforeCount" style="width: 100%;">
                  <span>{{ personalForm.receiptAccount }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Receipt.receiptAccountNumber')" style="width: 100%;">
                  <span>{{ personalForm.receiptAccountNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Receipt.receiptPersonId')" style="width: 100%;">
                  <span>{{ personalForm.receiptPersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Receipt.receiptDate')" style="width: 100%;">
                  <span>{{ personalForm.receiptDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Receipt.totalLackMoney')" style="width: 100%;">
                  <span>{{ personalForm.totalLackMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Receipt.remark')" prop="afterCount" style="width: 100%;">
                  <span>{{ personalForm.remark }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Receipt.penaltyMoney')" style="width: 100%;">
                  <span>{{ personalForm.penaltyMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Receipt.deductionMoney')" style="width: 100%;">
                  <span>{{ personalForm.deductionMoney }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >collection list</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            border
            size="small"
            style="width: 100%">
            <el-editable-column :key="Math.random()" :label="$t('update4.term')" prop="presentCount" align="center" min-width="150px"/>
            <el-editable-column :key="Math.random()" :label="$t('update4.monthlypayment')" prop="returnMoney" align="center" min-width="150px"/>
            <el-editable-column :key="Math.random()" :label="$t('update4.originalamout')" prop="returnSource" align="center" min-width="150px"/>
            <el-editable-column :key="Math.random()" :label="$t('update4.rebate')" prop="reward" align="center" min-width="150px"/>
            <el-editable-column :key="Math.random()" :label="$t('update4.penalty')" prop="penalty" align="center" min-width="150px"/>
            <el-editable-column :key="Math.random()" :label="$t('update4.interest')" prop="returnInterest" align="center" min-width="150px"/>
            <el-editable-column :key="Math.random()" :label="$t('update4.aleadypaid')" prop="collectedMoney" align="center" min-width="150px"/>
            <el-editable-column :key="Math.random()" :label="$t('update4.unpaid')" prop="uncollectedMoney" align="center" min-width="150px"/>
            <el-editable-column :key="Math.random()" :label="$t('update4.paid')" prop="thisMoney" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
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
import { updatereceipt } from '@/api/Receipt'

export default {
  filters: {
    moneyTypeFilter(status) {
      const statusMap = {
        1: 'PHP',
        2: 'USD',
        3: 'RMB',
        4: 'LKR',
        5: 'THB'
      }
      return statusMap[status]
    },
    customerTypeFilter(status) {
      const statusMap = {
        1: _that.$t('updates.jxs'),
        2: _that.$t('updates.kh')
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
      this.personalForm = this.detaildata
      this.reviewList = []
      const review = this.personalForm.approvalUseVos
      for (const i in review) {
        if (review[i].actualStepHandler !== null) {
          this.reviewList.push(review[i])
        }
      }
      this.list2 = this.personalForm.receiptDetails
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
        updatereceipt(parms).then(res => {
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
          this.$confirm('comfirm not approved?', 'Warning', {
            distinguishCancelAndClose: true,
            confirmButtonText: 'confirm',
            cancelButtonText: 'cancel'
          })
            .then(() => {
              this.reviewParms.judgeStat = 3
              const parms = JSON.stringify(this.reviewParms)
              updatereceipt(parms).then(res => {
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
                  ? 'confirm'
                  : 'stay this page'
              })
            })
          // ================取消弹框结束
        }
      })
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
