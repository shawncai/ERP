<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.paymentNumber +$t('updates.xqing')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">{{ $t('updates.print') }}</button>
        <el-button @click="exportData">{{ $t('public.export') }}</el-button>

        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item class="print2" label="付款单编号" style="width: 100%;display: none">
                  {{ personalForm.paymentNumber }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('payment.title')" style="width: 100%;">
                  <span>{{ personalForm.title }}</span>
                </el-form-item>
              </el-col>
              <!--              <el-col :span="12">-->
              <!--                <el-form-item :label="$t('payment.sourceType')" prop="sourceType" style="width: 100%;">-->
              <!--                  <span>{{ personalForm.sourceType | sourceTypeFilter }}</span>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <el-col :span="12">
                <el-form-item :label="$t('payment.supplierId')" prop="supplierId" style="width: 100%;">
                  <span>{{ personalForm.supplierName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('payment.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                  <span>{{ personalForm.handlePersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('payment.payMode')" style="width: 100%;">
                  <span>{{ personalForm.payModeName }}</span>
                </el-form-item>
              </el-col>
              <!--            <el-col :span="12">-->
              <!--              <el-form-item :label="$t('payment.applyDate')" prop="applyDate" style="width: 100%;">-->
              <!--                <span>{{ personalForm.applyDate }}</span>-->
              <!--              </el-form-item>-->
              <!--            </el-col>-->
              <el-col :span="12">
                <el-form-item :label="$t('payment.currency')" style="width: 100%;">
                  <span>{{ personalForm.currency | currencyIdFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Supplier.bankName')" style="width: 100%;">
                  <span>{{ personalForm.payAccount }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('payment.payAccountNumber')" style="width: 100%;">
                  <span>{{ personalForm.payAccountNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('payment.remarks')" style="width: 100%;">
                  <span>{{ personalForm.remarks }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('payment.rate')" style="width: 100%;">
                  <span>{{ personalForm.rate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('payment.payDate')" prop="payDate" style="width: 100%;">
                  <span>{{ personalForm.payDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('payment.offsetAdvance')" style="width: 100%;">
                  <span>{{ personalForm.offsetAdvance }}</span>
                </el-form-item>
                <span style="color: red;margin-left: 30px">预付款金额：{{ yufu }}</span>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('payment.moneyThis')" style="width: 100%;">
                  <span>{{ personalForm.moneyThis }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.fkmx') }}</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            border
            size="small"
            style="width: 100%">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('update4.faiaochuangjiariqil')" prop="invoiceDate" align="center" min-width="180px"/>
            <el-editable-column :label="$t('update4.caigoufapiaodanjubianhao')" prop="sourceNumber" align="center" min-width="150px" />
            <el-editable-column :label="$t('updates.yfje')" prop="shouldMoney" align="center" />
            <el-editable-column :label="$t('updates.yfjei')" prop="paidMoney" align="center" />
            <el-editable-column :label="$t('updates.wfje')" prop="payingMoney" align="center" />
            <el-editable-column :label="$t('updates.hph')" prop="invoiceNumber" align="center" />
            <el-editable-column :label="$t('updates.fplx')" prop="invoiceType" align="center" />
            <el-editable-column :label="$t('updates.bczfje')" prop="payThis" align="center" />
            <el-editable-column :label="$t('updates.dkyfk')" prop="advanceMoney" align="center" />
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
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('updates.dhslzj')" style="width: 100%;">
                  <span> {{ personalForm.allQuantity }} </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('updates.hehj')" style="width: 100%;">
                  <span> {{ personalForm.allMoney }} </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('updates.sehj')" style="width: 100%;">
                  <span> {{ personalForm.allTaxMoney }} </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('updates.hsjehj')" style="width: 100%;">
                  <span> {{ personalForm.allIncludeTaxMoney }} </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('updates.zdzkjehj')" style="width: 100%;">
                  <span> {{ personalForm.allDiscountMoney }} </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('updates.zhhsjehj')" style="width: 100%;">
                  <span> {{ personalForm.allIncludeTaxDiscountMoney }} </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('updates.cqtfyzchjgjhj')" style="width: 100%;">
                  <span> {{ personalForm.otherMoney }} </span>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
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
              <el-col :span="12">
                <el-form-item :label="$t('accessComponent.ppp')" prop="applyDate" style="width: 100%;">
                  {{ personalForm.confirmPersonName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('accessComponent.ooo')" prop="applyDate" style="width: 100%;">
                  {{ personalForm.confirmDate }}
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
import { updatepayment2 } from '@/api/payment'

export default {
  filters: {
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
        1: _that.$t('updates.cgdd'),
        2: _that.$t('Hmodule.Nosource')
      }
      return statusMap[status]
    },
    currencyIdFilter(status) {
      const statusMap = {
        1: 'RMB',
        2: 'USD',
        3: 'PHP',
        4: 'LKR'
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
    payModeFilter(status) {
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
      // 预付金额
      yufu: '',
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
      this.list2 = this.personalForm.paymentDetailVos
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
    exportData() {
      const array = this.list2
      for (const i in array) {
        array[i].supplierName = this.personalForm.supplierName
        array[i].payAccount = this.personalForm.payAccount
        array[i].payAccountNumber = this.personalForm.payAccountNumber
        array[i].payDate = this.personalForm.payDate
        if (array[i].invoiceType === 1) {
          array[i].invoiceTypeName = '采购发票'
        } else {
          array[i].invoiceTypeName = '费用发票'
        }
      }
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商', '开户行', '账号', '付款日期', '发票创建日期', '采购发票单据编号', '应付金额', '已付金额', '未付金额', '发票号', '发票类型', '本次支付金额', '抵扣预付款']
          const filterVal = ['supplierName', 'payAccount', 'payAccountNumber', 'payDate', 'invoiceDate', 'sourceNumber', 'shouldMoney', 'paidMoney', 'payingMoney', 'invoiceNumber', 'invoiceTypeName', 'payThis', 'advanceMoney']
          const data = this.formatJson(filterVal, array)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.personalForm.paymentNumber + '付款单详情'
          })
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
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
        updatepayment2(parms).then(res => {
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
              updatepayment2(parms).then(res => {
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
