<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.number +'    详情'" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.title')" style="width: 100%;">
                <span>{{ personalForm.title }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.customerType')" prop="customerType" style="width: 100%;">
                <span>{{ personalForm.customerType | customerTypeFliter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.customerName')" prop="customerId" style="width: 100%;">
                <span>{{ personalForm.customerName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.customerPhone')" style="width: 100%;">
                <span>{{ personalForm.customerPhone }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.invoiceType')" style="width: 100%;">
                <span>{{ personalForm.invoiceType | invoiceTypeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.payMode')" style="width: 100%;">
                <span>{{ personalForm.payMode | payModeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.transDate')" prop="transDate" style="width: 100%;">
                <span>{{ personalForm.transDate }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.salePersonId')" prop="salePersonId" style="width: 100%;">
                <span>{{ personalForm.salePersonName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.saleRepositoryId')" style="width: 100%;">
                <span>{{ personalForm.saleRepositoryName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.roleId')" style="width: 100%;">
                <span>{{ personalForm.roleName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.saleType')" style="width: 100%;">
                <span>{{ personalForm.saleTypeName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.payType')" style="width: 100%;">
                <span>{{ personalForm.payTypeName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.currency')" style="width: 100%;">
                <span>{{ personalForm.currency | currencyFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.transAddress')" style="width: 100%;">
                <span>{{ personalForm.transAddress }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.receiveMoney')" style="width: 100%;">
                <span>{{ personalForm.receiveMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.colseType')" style="width: 100%;">
                <span>{{ personalForm.colseTypeName }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">订单明细</h2>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: true, showStatus: true}"
          class="click-table1"
          stripe
          border
          size="medium"
          style="width: 100%">
          <el-editable-column label="序号" min-width="55" align="center" type="index"/>
          <el-editable-column prop="productCode" align="center" label="物品编号" min-width="150px"/>
          <el-editable-column prop="productName" align="center" label="物品名称" min-width="150px"/>
          <el-editable-column prop="Categoryid" align="center" label="物品分类" min-width="150px"/>
          <el-editable-column prop="unit" align="center" label="基本单位" min-width="150px"/>
          <el-editable-column prop="typeId" align="center" label="规格型号" min-width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
          <el-editable-column prop="performanceScore" align="center" label="绩效分" min-width="150px"/>
          <el-editable-column prop="productScore" align="center" label="商品积分" min-width="150px"/>
          <el-editable-column prop="quantity" align="center" label="订单数量" min-width="150px"/>
          <el-editable-column prop="salePrice" align="center" label="零售价" min-width="150px"/>
          <el-editable-column prop="costPrice" align="center" label="成本价" min-width="150px"/>
          <el-editable-column prop="taxprice" align="center" label="含税价" min-width="150px"/>
          <el-editable-column prop="costMoney" align="center" label="成本金额" min-width="150px"/>
          <el-editable-column prop="includeTaxMoney" align="center" label="含税金额" min-width="150px"/>
          <el-editable-column prop="taxRate" align="center" label="税率(%)" min-width="170px"/>
          <el-editable-column prop="taxMoney" align="center" label="税额" min-width="170px"/>
          <el-editable-column prop="money" align="center" label="金额" min-width="150px"/>
          <el-editable-column prop="includeTaxCostMoney" align="center" label="含税成本金额" min-width="170px"/>
          <el-editable-column prop="discountRate" align="center" label="折扣(%)" min-width="170px"/>
          <el-editable-column prop="discountMoney" align="center" label="折扣额" min-width="170px"/>
          <el-editable-column prop="alreadyApplicationQuantity" align="center" label="已下达采购数量" min-width="150px"/>
          <el-editable-column prop="deliveryDate" align="center" label="需求日期" min-width="180px"/>
          <el-editable-column prop="alreadyProduceQuantity" align="center" label="已下达生产数量" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <!--<el-card class="box-card" style="margin-top: 15px" shadow="never">-->
    <!--<h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">销售费用明细</h2>-->
    <!--<div class="container">-->
    <!--<el-editable-->
    <!--ref="editable2"-->
    <!--:data.sync="list3"-->
    <!--:edit-config="{ showIcon: true, showStatus: true}"-->
    <!--:summary-method="getSummaries"-->
    <!--show-summary-->
    <!--class="click-table1"-->
    <!--stripe-->
    <!--border-->
    <!--size="medium"-->
    <!--style="width: 100%">-->
    <!--<el-editable-column type="selection" min-width="55" align="center"/>-->
    <!--<el-editable-column label="序号" width="60" align="center" type="index"/>-->
    <!--<el-editable-column prop="costName" align="center" label="费用名称" min-width="150px"/>-->
    <!--<el-editable-column prop="money" align="center" label="金额" min-width="150px"/>-->
    <!--<el-editable-column prop="remark" align="center" label="备注" min-width="150px"/>-->
    <!--</el-editable>-->
    <!--</div>-->
    <!--</el-card>-->
    <!--审核状态-->
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">合计信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm2" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.heji1')" style="width: 100%;">
                <span>{{ personalForm.allQuantity }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.heji2')" style="width: 100%;">
                <span>{{ personalForm.allMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.heji3')" style="width: 100%;">
                <span>{{ personalForm.allIncludeTaxMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.heji4')" style="width: 100%;">
                <span>{{ personalForm.allTaxMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.heji5')" style="width: 100%;">
                <span>{{ personalForm.allDiscountMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.heji6')" style="width: 100%;">
                <span>{{ personalForm.allIncludeTaxDiscountMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.heji7')" style="width: 100%;">
                <span>{{ personalForm.allIncludeTaxCostMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.heji8')" style="width: 100%;">
                <span>{{ personalForm.allCostMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOrder.heji9')" style="width: 100%;">
                <span>{{ personalForm.otherMoney }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
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
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">预收款记录</h2>
      <div class="container" style="margin-top: 37px">
        <el-table
          :data="tableData2"
          border
          style="width: 100%">
          <el-table-column
            prop="receiptMoney"
            align="center"
            label="预收款金额"
            min-width="150"/>
          <el-table-column
            prop="receiptDate"
            align="center"
            label="收款时间"
            min-width="150"/>
          <el-table-column
            prop="closeTypeName"
            align="center"
            label="收款方式"
            min-width="150"/>
          <el-table-column
            prop="receiptPersonName"
            align="center"
            label="收款人"
            min-width="150"/>
        </el-table>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">出库明细</h2>
      <div class="container" style="margin-top: 37px">
        <el-table
          :data="tableData3"
          border
          style="width: 100%">
          <el-table-column
            prop="outDate"
            align="center"
            label="出库日期"
            min-width="150"/>
          <el-table-column
            prop="saleRepositoryName"
            align="center"
            label="仓库"
            min-width="150"/>
          <el-table-column
            prop="quantity"
            align="center"
            label="出库数量"
            min-width="150"/>
          <el-table-column
            prop="outPersonName"
            align="center"
            label="出库人"
            min-width="150"/>
          <el-table-column
            prop="receiptPersonName"
            align="center"
            label="状态"
            min-width="150"/>
        </el-table>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">利润明细</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm2" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji2')" style="width: 100%;">
                <span>{{ personalForm.allMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji11')" style="width: 100%;">
                <span>{{ personalForm.otherMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.heji8')" style="width: 100%;">
                <span>{{ personalForm.allCostMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.profit')" style="width: 100%;">
                <span>{{ personalForm.allMoney - personalForm.allCostMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleOut.ProfitMargin')" style="width: 100%;">
                <span>{{ (personalForm.allMoney - personalForm.allCostMoney) / personalForm.allCostMoney }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { productlist } from '@/api/public'
import { searchprepReceipt } from '@/api/PrepReceipt'
import { searchsaleOut } from '@/api/SaleOut'
export default {
  filters: {
    currencyFilter(status) {
      const statusMap = {
        1: 'RMB',
        2: 'USD'
      }
      return statusMap[status]
    },
    payTypeFilter(status) {
      const statusMap = {
        1: '方式1',
        2: '方式2'
      }
      return statusMap[status]
    },
    payModeFilter(status) {
      const statusMap = {
        1: '货到付款',
        2: '当场支付'
      }
      return statusMap[status]
    },
    invoiceTypeFilter(status) {
      const statusMap = {
        1: '无',
        2: '增值税'
      }
      return statusMap[status]
    },
    customerTypeFliter(status) {
      const statusMap = {
        1: '经销商',
        2: '零售商'
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
      // 出库明细数据
      tableData3: [],
      saleOutparms: {
        pageNum: 1,
        pageSize: 9999,
        sourceNumber: this.detaildata.number,
        repositoryId: 0
      },
      // 预收款记录数据
      tableData2: [],
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
      personalForm: this.detaildata,
      // 预收款记录
      prepReceiptData: {
        pageNum: 1,
        pageSize: 9999,
        sourceNumber: this.detaildata.number,
        repositoryId: 0
      }
    }
  },
  watch: {
    detailcontrol() {
      this.editVisible = this.detailcontrol
    },
    detaildata() {
      this.personalForm = this.detaildata
      this.list2 = this.personalForm.saleOrderDetailVos
      this.list3 = this.personalForm.saleOrderCostDetails
      this.reviewList = this.personalForm.approvalUseVos
      this.prepReceiptData.sourceNumber = this.personalForm.number
      this.getprepReceipt()
      this.saleOutparms.sourceNumber = this.personalForm.number
      this.getsaleOutLis()
    }
  },
  methods: {
    getsaleOutLis() {
      searchsaleOut(this.saleOutparms).then(res => {
        if (res.data.ret === 200) {
          this.tableData3 = res.data.data.content.list.map(function(item) {
            const needata = item.saleOutDetailVos.map(function(elem) {
              return {
                outDate: item.outDate,
                saleRepositoryName: item.saleRepositoryName,
                quantity: elem.quantity,
                outPersonName: item.outPersonName
              }
            })
            return needata
          }).flat()
        }
      })
    },
    // 预收款记录
    getprepReceipt() {
      searchprepReceipt(this.prepReceiptData).then(res => {
        if (res.data.ret === 200) {
          this.tableData2 = res.data.data.content.list
        }
      })
    },
    // 计划金额
    planMoney(row) {
      row.planMoney = row.basicPrice * row.planQuantity
      return row.planMoney
    },
    // 计算单价和供应商
    basicPrice(row) {
      productlist(row.productCode).then(res => {
        if (res.data.ret === 200) {
          row.basicPrice = res.data.data.content.list[0].purchasePrice
        }
      })
      return row.basicPrice
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
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      this.heji1 = sums[8]
      this.heji2 = sums[7]
      sums[1] = ''
      sums[2] = ''
      sums[3] = ''
      sums[4] = ''
      sums[6] = ''
      sums[9] = ''
      sums[10] = ''
      sums[11] = ''
      sums[12] = ''
      return sums
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
</style>
