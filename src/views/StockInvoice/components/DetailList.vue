<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.xqing')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h1 v-show="personalForm.isRed === 2" style="color: red; font-size: 40px">红字发票{{ personalForm.number }}</h1>
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">{{ $t('updates.print') }}</button>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.sourceType')" style="width: 100%;">
                  <span>{{ personalForm.sourceType | sourceTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.subject')" prop="sourceType" style="width: 100%;">
                  <span>{{ personalForm.subjectName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.invoiceNumber')" prop="supplierId" style="width: 100%;">
                  <span>{{ personalForm.invoiceNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.invoiceType')" prop="stockPersonId" style="width: 100%;">
                  <span>{{ personalForm.invoiceType | invoiceTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.supplierId')" prop="stockType" style="width: 100%;">
                  <span>{{ personalForm.supplierName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.settleMode')" prop="deptId" style="width: 100%;">
                  <span>{{ personalForm.settleModeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.printTimes')" style="width: 100%;">
                  <span>{{ personalForm.printTimes }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.address')" style="width: 100%;">
                  <span>{{ personalForm.address }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.taxNumber')" prop="signDate" style="width: 100%;">
                  <span>{{ personalForm.taxNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.bank')" style="width: 100%;">
                  <span>{{ personalForm.bank }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.currency')" style="width: 100%;">
                  <span>{{ personalForm.currency | currencyFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.handlePersonId')" prop="currency" style="width: 100%;">
                  <span>{{ personalForm.handlePersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.deptId')" style="width: 100%;">
                  <span>{{ personalForm.deptName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockInvoice.payDate')" style="width: 100%;">
                  <span>{{ personalForm.payDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('update4.invoiceDate')" style="width: 100%;">
                  <span>{{ personalForm.invoiceDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Stockenter.summary')" style="width: 100%;">
                  <span>{{ personalForm.summary }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.cgfpmx') }}</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            :summary-method="getSummaries"
            :show-summary="jundgeprice()"
            :row-class-name="tableRowClassName"
            height="500"
            class="click-table1"
            border
            size="small"
            style="width: 100%">
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index" fixed/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="90px" fixed/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="90px" fixed/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="50px" fixed/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="50px" fixed/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="50px" fixed/>
            <el-editable-column :label="$t('updates.shuli')" prop="quantity" align="center" min-width="90px" fixed/>
            <el-editable-column v-if="jundgeprice()" :label="$t('Hmodule.dj')" prop="price" align="center" min-width="170px"/>
            <el-editable-column v-if="jundgeprice()" :label="$t('updates.hsj')" prop="includeTaxPrice" align="center" min-width="170px"/>
            <el-editable-column v-if="jundgeprice()" :label="$t('updates.sl')" prop="taxRate2" align="center" min-width="170px"/>
            <el-editable-column v-if="jundgeprice()" :label="$t('updates.zk')" prop="discountRate" align="center" min-width="170px"/>
            <el-editable-column v-if="jundgeprice()" :label="$t('updates.cke')" prop="discountMoney" align="center" min-width="170px"/>
            <el-editable-column :label="$t('update4.zhehoujine')" prop="discountreduceMoney" align="center" min-width="150px">
              <template slot-scope="scope">
                <p v-show="jundgeprice()">{{ getdiscountreduceMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('update4.zhehouhanshuijine')" prop="discountreduceMoney2" align="center" min-width="150px">
              <template slot-scope="scope">
                <p v-show="jundgeprice()">{{ getdiscountreduceMoney2(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column v-if="jundgeprice()" :label="$t('Hmodule.je')" prop="money" align="center" min-width="150px"/>
            <el-editable-column v-if="jundgeprice()" :label="$t('updates.hsje')" prop="includeTaxMoney" align="center" min-width="150px"/>
            <el-editable-column v-if="jundgeprice()" :label="$t('updates.se')" prop="tax" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getTaxMoney2(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('update4.redQuantity')" prop="redQuantity" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ydbh')" prop="sourceNumber" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.dddh')" prop="orderNumber" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOrder.heji1')" style="width: 100%;">
                  <span>{{ personalForm.allQuantity }}</span>
                </el-form-item>
              </el-col>
              <el-col v-if="jundgeprice()" :span="12">
                <el-form-item :label="$t('updates.hehj')" style="width: 100%;">
                  <span>{{ personalForm.allMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col v-if="jundgeprice()" :span="12">
                <el-form-item :label="$t('updates.sehj')" style="width: 100%;">
                  <span>{{ personalForm.allTaxMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col v-if="jundgeprice()" :span="12">
                <el-form-item :label="$t('updates.hsjehj')" style="width: 100%;">
                  <span>{{ personalForm.allIncludeTaxMoney }}</span>
                </el-form-item>
              </el-col>

              <el-col v-if="jundgeprice()" :span="12">
                <el-form-item :label="$t('update4.zhehoujineheji')" style="width: 100%;">
                  <span>{{ alldiscountmoney2 }}</span>
                </el-form-item>
              </el-col>

              <el-col v-if="jundgeprice()" :span="12">
                <el-form-item :label="$t('updates.zhhsjehj')" style="width: 100%;">
                  <span>{{ allMoneyMoveDiscount }}</span>
                </el-form-item>
              </el-col>
              <el-col v-if="jundgeprice()" :span="12">
                <el-form-item :label="$t('updates.zdzkjehj')" style="width: 100%;">
                  <span>{{ personalForm.allDiscountMoney }}</span>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
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
import { updatestockinvoice2 } from '@/api/StockInvoice'

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
    sourceTypeFilter(status) {
      const statusMap = {
        1: '采购入库',
        2: '委外入库单',
        3: '采购发票',
        4: '采购退货'
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
      // 审核数据
      reviewList: [],
      // 详细表数据
      list2: [],
      list3: [],
      alldiscountmoney2: 0,
      allMoneyMoveDiscount: 0,
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
      for (const i in this.personalForm.stockInvoiceDetailVos) {
        this.personalForm.stockInvoiceDetailVos[i].taxRate = Number(this.personalForm.stockInvoiceDetailVos[i].taxRate) * 100
      }
      this.list2 = this.personalForm.stockInvoiceDetailVos
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
    tableRowClassName({ row, rowIndex }) {
      if (this.personalForm.isRed === 2) {
        return 'warning-row'
      }
      return ''
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
        updatestockinvoice2(parms).then(res => {
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
              updatestockinvoice2(parms).then(res => {
                if (res.data.ret === 200) {
                  this.$message({
                    type: 'success',
                    message: this.$t('prompt.shcg')
                  })
                  this.editVisible = false
                  this.$emit('rest', true)
                } else {
                  this.$notify.error({
                    title: 'wrong',
                    message: res.data.msg,
                    offset: 100
                  })
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
    // 总计
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return (Number(prev) + Number(curr)).toFixed(2)
            } else {
              console.log(prev)
              return Number(prev).toFixed(2)
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      sums[1] = ''
      sums[2] = ''
      sums[3] = ''
      sums[4] = ''
      sums[5] = ''
      sums[6] = ''
      sums[10] = ''
      sums[18] = ''
      sums[19] = ''
      this.allMoneyMoveDiscount = sums[13]
      this.alldiscountmoney2 = sums[12]
      return sums
    },
    getdiscountreduceMoney(row) {
      // row.discountreduceMoney = (Number(row.money) - Number(row.discountMoney)).toFixed(2)
      row.discountreduceMoney = (((Number(row.includeTaxMoney) - Number(row.discountMoney)) / (1 + row.taxRate / 100))).toFixed(2)
      return row.discountreduceMoney
    },
    getdiscountreduceMoney2(row) {
      row.discountreduceMoney2 = (Number(row.includeTaxMoney) - Number(row.discountMoney)).toFixed(2)
      return row.discountreduceMoney2
    },
    jundgeprice() {
      const value = ['1-22-24-115']
      const roles = this.$store.getters && this.$store.getters.roles
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      return hasPermission
    },
    // 计算税额
    getTaxMoney2(row) {
      // row.tax = (Number(row.includeTaxMoney) - Number(row.money)).toFixed(6)
      row.tax = (((Number(row.includeTaxMoney) - Number(row.discountMoney)) / (1 + (row.taxRate / 100))) * (row.taxRate / 100)).toFixed(2)
      return row.tax
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
