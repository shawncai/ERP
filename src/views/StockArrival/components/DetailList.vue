<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.number +'    采购到货单详情'" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">打印</button>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item class="print2" label="采购到货单编号" style="width: 100%;display: none">
                  {{ personalForm.number }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockArrival.title')" style="width: 100%;">
                  <span>{{ personalForm.title }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockArrival.sourceType')" prop="sourceType" style="width: 100%;">
                  <span>{{ personalForm.sourceType | sourceTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockArrival.supplierId')" prop="supplierId" style="width: 100%;">
                  <span>{{ personalForm.supplierName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockArrival.stockPersonId')" prop="stockPersonId" style="width: 100%;">
                  <span>{{ personalForm.stockPersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockArrival.stockTypeId')" prop="stockType" style="width: 100%;">
                  <span>{{ personalForm.stockTypeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockArrival.deptId')" prop="deptId" style="width: 100%;">
                  <span>{{ personalForm.deptName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockArrival.payId')" style="width: 100%;">
                  <span>{{ personalForm.settleModeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockArrival.acceptDate')" prop="signDate" style="width: 100%;">
                  <span>{{ personalForm.acceptDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockArrival.arrivalDate')" prop="signDate" style="width: 100%;">
                  <span>{{ personalForm.arrivalDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockArrival.acceptPersonId')" style="width: 100%;">
                  <span>{{ personalForm.acceptPersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockArrival.deliveryModeId')" style="width: 100%;">
                  <span>{{ personalForm.deliveryModeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Supplier.payMode')" style="width: 100%;">
                  <span>{{ personalForm.payModeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockArrival.isVat')" style="width: 100%;">
                  <span>{{ personalForm.isVat | isVatFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockArrival.currencyId')" prop="currency" style="width: 100%;">
                  <span>{{ personalForm.currencyId | currencyIdFilter }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">采购合同明细</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            border
            size="medium"
            style="width: 100%">
            <el-editable-column label="序号" min-width="55" fixed="left" align="center" type="index"/>
            <el-editable-column prop="productCode" fixed="left" align="center" label="物品编号" />
            <el-editable-column prop="productName" fixed="left" align="center" label="物品名称" />
            <el-editable-column prop="productType" align="center" label="规格" />
            <el-editable-column prop="unit" align="center" label="单位" />
            <el-editable-column prop="stockQuantity" align="center" label="采购数量" />
            <el-editable-column prop="arrivalQuantity" align="center" label="到货数量" />
            <el-editable-column prop="giveDate" align="center" label="交货日期" />
            <el-editable-column prop="price" align="center" label="单价" />
            <el-editable-column prop="includeTaxPrice" align="center" label="含税价" />
            <el-editable-column prop="taxRate" align="center" label="税率(%)" />
            <el-editable-column prop="money" align="center" label="金额" />
            <el-editable-column prop="includeTaxMoney" align="center" label="含税金额" />
            <el-editable-column prop="taxMoney" align="center" label="税额" />
            <el-editable-column prop="discountRate" align="center" label="折扣(%)" />
            <el-editable-column prop="discountMoney" align="center" label="折扣额" />
            <el-editable-column prop="remark" align="center" label="备注" />
            <el-editable-column prop="sourceNumber" align="center" label="源单编号" />
            <el-editable-column prop="sourceSerialNumber" align="center" label="源单序号" />
            <el-editable-column prop="hadStorageQuantity" align="center" label="已入库数量" />
            <el-editable-column prop="reportCheckingQuantity" align="center" label="报检数量" />
            <el-editable-column prop="actualCheckingQuantity" align="center" label="实捡数量" />
            <el-editable-column prop="qualifyQuantity" align="center" label="合格数量" />
            <el-editable-column prop="unqualifyQuantity" align="center" label="不合格数量" />
            <el-editable-column prop="returnQuantity" align="center" label="退货数量" />
          </el-editable>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">合计信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-form :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="到货数量总计" style="width: 100%;">
                  <span> {{ personalForm.allQuantity }} </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="金额合计" style="width: 100%;">
                  <span> {{ personalForm.allMoney }} </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="税额合计" style="width: 100%;">
                  <span> {{ personalForm.allTaxMoney }} </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="含税金额合计" style="width: 100%;">
                  <span> {{ personalForm.allIncludeTaxMoney }} </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="整单折扣金额合计" style="width: 100%;">
                  <span> {{ personalForm.allDiscountMoney }} </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="折后含税金额合计" style="width: 100%;">
                  <span> {{ personalForm.allIncludeTaxDiscountMoney }} </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="其他费用支出合计" style="width: 100%;">
                  <span> {{ personalForm.otherMoney }} </span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
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
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">质检信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-table
            :data="Checkreportdata"
            border
            style="width: 100%">
            <el-table-column
              prop="reportNumber"
              align="center"
              label="质检单号"
              min-width="150"/>
            <el-table-column
              prop="productCode"
              align="center"
              label="物品编号"
              min-width="150"/>
            <el-table-column
              prop="arrivalQuantity"
              align="center"
              label="关联单据"
              min-width="150"/>
            <el-table-column
              prop="checkQuantity"
              align="center"
              label="质检数量"
              min-width="150"/>
            <el-table-column
              prop="passQuantity"
              align="center"
              label="合格数量"
              min-width="150"/>
            <el-table-column
              prop="failedQuantity"
              align="center"
              label="不合格数量"
              min-width="150"/>
            <el-table-column
              prop="checkDate"
              align="center"
              label="质检日期"
              min-width="150"/>
            <el-table-column
              prop="checkPersonName"
              align="center"
              label="质检人"
              min-width="150"/>
          </el-table>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">退货信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-table
            :data="stockRetreatData"
            border
            style="width: 100%">
            <el-table-column
              prop="number"
              align="center"
              label="退货单编号"
              min-width="150"/>
            <el-table-column
              prop="productCode"
              align="center"
              label="物品编号"
              min-width="150"/>
            <el-table-column
              prop="arrivalQuantity"
              align="center"
              label="关联单据"
              min-width="150"/>
            <el-table-column
              prop="retreatQuantity"
              align="center"
              label="退货数量"
              min-width="150"/>
            <el-table-column
              prop="retreatReason"
              align="center"
              label="退货原因"
              min-width="150"/>
            <el-table-column
              prop="retreatDate"
              align="center"
              label="退货日期"
              min-width="150"/>
            <el-table-column
              prop="stockPersonName"
              align="center"
              label="退货人"
              min-width="150"/>
          </el-table>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">入库信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-table
            :data="stockenterData"
            border
            style="width: 100%">
            <el-table-column
              prop="enterNumber"
              align="center"
              label="入库单编号"
              min-width="150"/>
            <el-table-column
              prop="productCode"
              align="center"
              label="物品编号"
              min-width="150"/>
            <el-table-column
              prop="arrivalQuantity"
              align="center"
              label="关联单据"
              min-width="150"/>
            <el-table-column
              prop="basicQuantity"
              align="center"
              label="入库数量"
              min-width="150"/>
            <el-table-column
              prop="enterPersonName"
              align="center"
              label="入库人"
              min-width="150"/>
            <el-table-column
              prop="enterDate"
              align="center"
              label="入库时间"
              min-width="150"/>
          </el-table>
        </div>
      </el-card>
    </div>
  </el-dialog>
</template>

<script>
import { checkreportlist } from '@/api/CheckReport'
import { searchstockRetreat } from '@/api/StockRetreat'
import { stockenterlist } from '@/api/Stockenter'
export default {
  filters: {
    isVatFilter(status) {
      const statusMap = {
        1: '是',
        2: '否'
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
        1: '采购订单',
        2: '无来源'
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
        1: '制单',
        2: '执行',
        3: '结单'
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
      // 入库信息
      stockenterData: [],
      stockenterlistdata: {
        sourceNumber: this.detaildata.number,
        pagenum: 1,
        pagesize: 999,
        repositoryId: 0
      },
      // 退货信息
      stockRetreatData: [],
      stockRetreatlistdata: {
        sourceNumber: this.detaildata.number,
        pageNum: 1,
        pageSize: 999,
        repositoryId: 0
      },
      // 质检信息
      Checkreportdata: [],
      checkreportData: {
        sourceNumber: this.detaildata.number,
        pageNum: 1,
        pageSize: 999,
        repositoryId: 0
      },
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
      this.list2 = this.personalForm.stockArrivalDetailVos
      this.reviewList = this.personalForm.approvalUseVos
      this.checkreportData.sourceNumber = this.detaildata.number
      this.getcheckreportlist()
      this.stockRetreatlistdata.sourceNumber = this.detaildata.number
      this.getstockRetreat()
      this.stockenterlistdata.sourceNumber = this.detaildata.number
      this.getstockenterlist()
    }
  },
  methods: {
    getstockenterlist() {
      stockenterlist(this.stockenterlistdata).then(res => {
        if (res.data.ret === 200) {
          this.stockenterData = res.data.data.content.list.map(function(item) {
            const needata = item.stockEnterDetailVos.map(function(elem) {
              return {
                enterNumber: item.enterNumber,
                productCode: elem.productCode,
                arrivalQuantity: '采购到货单',
                basicQuantity: elem.basicQuantity,
                enterPersonName: item.enterPersonName,
                enterDate: item.enterDate
              }
            })
            return needata
          }).flat()
        }
      })
    },
    // 退货信息
    getstockRetreat() {
      searchstockRetreat(this.stockRetreatlistdata).then(res => {
        if (res.data.ret === 200) {
          this.stockRetreatData = res.data.data.content.list.map(function(item) {
            const needata = item.stockRetreatDetailVos.map(function(elem) {
              return {
                number: item.number,
                productCode: elem.productCode,
                arrivalQuantity: '采购到货单',
                retreatQuantity: elem.retreatQuantity,
                retreatReason: elem.retreatReason,
                retreatDate: item.retreatDate,
                stockPersonName: item.stockPersonName
              }
            })
            return needata
          }).flat()
        }
      })
    },
    // 质检信息
    getcheckreportlist() {
      checkreportlist(this.checkreportData).then(res => {
        if (res.data.ret === 200) {
          this.Checkreportdata = res.data.data.content.list.map(function(item) {
            const needata = item.checkReportDetailVos.map(function(elem) {
              return {
                reportNumber: item.reportNumber,
                productCode: item.productCode,
                arrivalQuantity: '采购到货单',
                checkQuantity: elem.checkQuantity,
                passQuantity: elem.passQuantity,
                failedQuantity: elem.failedQuantity,
                checkDate: item.checkDate,
                checkPersonName: item.checkPersonName
              }
            })
            return needata
          }).flat()
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
