<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.number +'    详情'" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">打印</button>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item class="print2" label="销售出库单编号" style="width: 100%;display: none">
                  {{ personalForm.number }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.title')" style="width: 100%;">
                  <span>{{ personalForm.title }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.sourceType')" prop="sourceType" style="width: 100%;">
                  <span>{{ personalForm.sourceType | sourceTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.customerType')" prop="customerType" style="width: 100%;">
                  <span>{{ personalForm.customerType | customerTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.customerName')" prop="customerId" style="width: 100%;">
                  <span>{{ personalForm.customerName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.customerPhone')" style="width: 100%;">
                  <span>{{ personalForm.phoneNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.customerAccount')" style="width: 100%;">
                  <span>{{ personalForm.customerAccount }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.outType')" prop="outType" style="width: 100%;">
                  <span>{{ personalForm.outType | outTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.salePersonId')" prop="salePersonId" style="width: 100%;">
                  <span>{{ personalForm.salePersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.saleType')" style="width: 100%;">
                  <span>{{ personalForm.saleTypeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.sendDate')" style="width: 100%;">
                  <span>{{ personalForm.sendDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.closeType')" style="width: 100%;">
                  <span>{{ personalForm.settleModeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.invoiceType')" style="width: 100%;">
                  <span>{{ personalForm.invoiceTypeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.payType')" style="width: 100%;">
                  <span>{{ personalForm.payModeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.transferPersonId')" style="width: 100%;">
                  <span>{{ personalForm.transferPersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.saleRepositoryId')" style="width: 100%;">
                  <span>{{ personalForm.saleRepositoryName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.address')" style="width: 100%;">
                  <span>{{ personalForm.address }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.outPersonId')" style="width: 100%;">
                  <span>{{ personalForm.outPersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.outDate')" style="width: 100%;">
                  <span>{{ personalForm.outDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.pointSupport')" style="width: 100%;">
                  <span>{{ personalForm.pointSupport }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.couponSupport')" style="width: 100%;">
                  <span>{{ personalForm.couponSupport }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.ridMoney')" style="width: 100%;">
                  <span>{{ personalForm.ridMoney }}</span>
                </el-form-item>
                <span style="color: red;font-size: 14px">预售款金额：{{ yushou }}</span>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.ridBikeMoney')" style="width: 100%;">
                  <span>{{ personalForm.ridBikeMoney }}</span>
                </el-form-item>
                <span style="color: red;font-size: 14px">回收车金额：{{ huishou }}</span>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.receivableMoney')" style="width: 100%;">
                  <span>{{ personalForm.receivableMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.isInvoice')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.isInvoice" style="margin-left: 18px;width: 200px" disabled>
                    <el-radio :label="1" style="width: 100px">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
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
            border
            size="medium"
            style="width: 100%">
            <el-editable-column label="序号" fixed="left" min-width="55" align="center" type="index"/>
            <el-editable-column prop="productCode" fixed="left" align="center" label="物品编号" />
            <el-editable-column prop="productName" fixed="left" align="center" label="物品名称" />
            <el-editable-column prop="locationId" align="center" label="货位" />
            <el-editable-column prop="batch" align="center" label="批次" />
            <el-editable-column prop="categoryName" align="center" label="物品分类" />
            <el-editable-column prop="unit" align="center" label="基本单位" />
            <el-editable-column prop="typeName" align="center" label="规格型号" />
            <el-editable-column prop="color" align="center" label="颜色" />
            <el-editable-column prop="kpiGrade" align="center" label="绩效分" />
            <el-editable-column prop="point" align="center" label="商品积分" />
            <el-editable-column prop="quantity" align="center" label="出库数量" />
            <el-editable-column prop="salePrice" align="center" label="零售价" />
            <el-editable-column prop="costPrice" align="center" label="成本价" />
            <el-editable-column prop="taxprice" align="center" label="含税价" />
            <el-editable-column prop="costMoney" align="center" label="成本金额" />
            <el-editable-column prop="includeTaxMoney" align="center" label="含税金额" />
            <el-editable-column prop="taxRate" align="center" label="税率(%)" />
            <el-editable-column prop="taxMoney" align="center" label="税额" />
            <el-editable-column prop="money" align="center" label="金额" />
            <el-editable-column prop="includeTaxCostMoney" align="center" label="含税成本金额" />
            <el-editable-column prop="discountRate" align="center" label="折扣(%)" />
            <el-editable-column prop="discountMoney" align="center" label="折扣额" />
            <el-editable-column prop="carCode" align="center" label="车架编码" />
            <el-editable-column prop="motorCode" align="center" label="电机编码" />
            <el-editable-column prop="batteryCode" align="center" label="电池编码" />
            <el-editable-column prop="sourceNumber" align="center" label="源单编号" />
          </el-editable>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">赠品明细</h2>
        <div class="container">
          <el-editable
            ref="editable2"
            :data.sync="list3"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            stripe
            border
            size="medium"
            style="width: 100%">
            <el-editable-column label="序号" fixed="left" min-width="55" align="center" type="index"/>
            <el-editable-column prop="productCode" fixed="left" align="center" label="物品编号" />
            <el-editable-column prop="productName" fixed="left" align="center" label="物品名称" />
            <el-editable-column prop="locationId" align="center" label="货位" />
            <el-editable-column prop="batch" align="center" label="批次" />
            <el-editable-column prop="categoryName" align="center" label="物品分类" />
            <el-editable-column prop="unit" align="center" label="基本单位" />
            <el-editable-column prop="typeName" align="center" label="规格型号" />
            <el-editable-column prop="color" align="center" label="颜色" />
            <el-editable-column prop="salePrice" align="center" label="零售价" />
            <el-editable-column prop="money" align="center" label="金额" />
            <el-editable-column prop="quantity" align="center" label="数量" />
          </el-editable>
        </div>
      </el-card>
      <!--审核状态-->
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">合计信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm2" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji1')" style="width: 100%;">
                  <span>{{ personalForm.allQuantity }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji2')" style="width: 100%;">
                  <span>{{ personalForm.allMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji3')" style="width: 100%;">
                  <span>{{ personalForm.allIncludeTaxMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji4')" style="width: 100%;">
                  <span>{{ personalForm.allTaxMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji5')" style="width: 100%;">
                  <span>{{ personalForm.allDiscountMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji6')" style="width: 100%;">
                  <span>{{ personalForm.allIncludeTaxDiscountMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji7')" style="width: 100%;">
                  <span>{{ personalForm.allIncludeTaxCostMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji8')" style="width: 100%;">
                  <span>{{ personalForm.allCostMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji9')" style="width: 100%;">
                  <span>{{ personalForm.allGiftQuantity }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji10')" style="width: 100%;">
                  <span>{{ personalForm.allGiftMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji11')" style="width: 100%;">
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
    </div>
  </el-dialog>
</template>

<script>
import { productlist } from '@/api/public'
export default {
  filters: {
    sourceTypeFilter(status) {
      const statusMap = {
        1: '销售订单',
        2: '销售合同',
        3: '预售单',
        4: '销售机会',
        5: '无来源'
      }
      return statusMap[status]
    },
    customerTypeFilter(status) {
      const statusMap = {
        1: '经销商',
        2: '零售'
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
    outTypeFilter(status) {
      const statusMap = {
        1: '销售出库',
        2: '换货出库',
        3: '以旧换新'
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
    saleTypeFilter(status) {
      const statusMap = {
        1: '类别1',
        2: '类别2'
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
        1: '货到付款',
        2: '当场支付'
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
      huishou: '',
      yushou: '',
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
      this.list2 = this.personalForm.saleOrderDetailVos
      this.list3 = this.personalForm.saleOrderCostDetails
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
