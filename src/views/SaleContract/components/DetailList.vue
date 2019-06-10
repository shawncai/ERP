<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.contractNumber +'    详情'" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.title')" prop="title" style="width: 100%;">
                <span>{{ personalForm.title }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.sourceType')" prop="sourceType" style="width: 100%;">
                <span>{{ personalForm.sourceType | sourceTypeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.sourceNumber')" style="width: 100%;">
                <span>{{ personalForm.sourceNumber }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.customerType')" style="width: 100%;">
                <span>{{ personalForm.customerType | customerTypeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.customerName')" style="width: 100%;">
                <span>{{ personalForm.customerName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.customerPhone')" style="width: 100%;">
                <span>{{ personalForm.customerPhone }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.saleType')" style="width: 100%;">
                <span>{{ personalForm.saleType | saleTypeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.closeType')" style="width: 100%;">
                <span>{{ personalForm.closeTypeName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.payType')" style="width: 100%;">
                <span>{{ personalForm.payType | payTypeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.deliveryMode')" style="width: 100%;">
                <span>{{ personalForm.deliveryMode | deliveryModeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.currency')" prop="currency" style="width: 100%;">
                <span>{{ personalForm.currency | currencyFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.salePersonId')" style="width: 100%;">
                <span>{{ personalForm.salePersonName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.deptId')" style="width: 100%;">
                <span>{{ personalForm.deptName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.saleRepositoryId')" style="width: 100%;">
                <span>{{ personalForm.saleRepositoryName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.signDate')" style="width: 100%;">
                <span>{{ personalForm.signDate }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.signAddress')" style="width: 100%;">
                <span>{{ personalForm.signAddress }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.contractStat')" style="width: 100%;">
                <span>{{ personalForm.contractStat | contractStatFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.invoiceType')" style="width: 100%;">
                <span>{{ personalForm.invoiceType | invoiceTypeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleContract.taxRate')" style="width: 100%;">
                <span>{{ personalForm.taxRate }}</span>
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
          stripe
          border
          size="medium"
          style="width: 100%">
          <el-editable-column label="序号" min-width="55" align="center" type="index"/>
          <el-editable-column prop="productCode" align="center" label="物品编号" min-width="150px"/>
          <el-editable-column prop="productName" align="center" label="物品名称" min-width="150px"/>
          <el-editable-column prop="categoryName" align="center" label="物品分类" min-width="150px"/>
          <el-editable-column prop="typeName" align="center" label="规格型号" min-width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
          <el-editable-column prop="unit" align="center" label="单位" min-width="150px"/>
          <el-editable-column prop="performanceScore" align="center" label="绩效分" min-width="150px"/>
          <el-editable-column prop="productScore" align="center" label="商品积分" min-width="150px"/>
          <el-editable-column prop="quantity" align="center" label="订单数量" min-width="150px"/>
          <el-editable-column prop="salePrice" align="center" label="零售价" min-width="150px"/>
          <!--          <el-editable-column prop="costPrice" align="center" label="成本价" min-width="150px"/>-->
          <el-editable-column prop="taxprice" align="center" label="含税价" min-width="150px"/>
          <!--          <el-editable-column prop="costMoney" align="center" label="成本金额" min-width="150px"/>-->
          <el-editable-column prop="includeTaxMoney" align="center" label="含税金额" min-width="150px"/>
          <el-editable-column prop="taxRate" align="center" label="税率(%)" min-width="170px"/>
          <el-editable-column prop="taxMoney" align="center" label="税额" min-width="170px"/>
          <el-editable-column prop="money" align="center" label="金额" min-width="150px"/>
          <!--          <el-editable-column prop="includeTaxCostMoney" align="center" label="含税成本金额" min-width="170px"/>-->
          <el-editable-column prop="discount" align="center" label="折扣(%)" min-width="170px"/>
          <el-editable-column prop="discountMoney" align="center" label="折扣额" min-width="170px"/>
          <el-editable-column prop="carCode" align="center" label="车架编码" min-width="150px"/>
          <el-editable-column prop="motorCode" align="center" label="电机编码" min-width="150px"/>
          <el-editable-column prop="batteryCode" align="center" label="电池编码" min-width="150px"/>
        </el-editable>
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
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">合计信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="采购数量合计" style="width: 100%;">
                <span>{{ personalForm.allQuantity }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="金额合计" style="width: 100%;">
                <span>{{ personalForm.allMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="税额合计" style="width: 100%;">
                <span>{{ personalForm.allTaxMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="含税金额合计" style="width: 100%;">
                <span>{{ personalForm.allIncludeTaxMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="整单折扣金额合计" style="width: 100%;">
                <span>{{ personalForm.allDiscountMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="折后含税金额合计" style="width: 100%;">
                <span>{{ personalForm.allIncludeTaxDiscountMoney }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
    deliveryModeFilter(status) {
      const statusMap = {
        1: '交货1'
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
        1: '零售',
        2: '批发'
      }
      return statusMap[status]
    },
    sourceTypeFilter(status) {
      const statusMap = {
        1: '销售机会',
        2: '分期申请'
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
      this.list2 = this.personalForm.saleContractDetailVos
      this.reviewList = this.personalForm.approvalUseVos
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
