<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.number +'    详情'" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
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
                <span>{{ personalForm.payName }}</span>
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
              <el-form-item :label="$t('StockArrival.isVat')" style="width: 100%;">
                <el-radio-group v-model="personalForm.isVat" style="margin-left: 18px;width: 200px" disabled>
                  <el-radio :label="1" style="width: 120px">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
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
          stripe
          border
          size="medium"
          style="width: 100%">
          <el-editable-column type="selection" min-width="55" align="center"/>
          <el-editable-column label="序号" min-width="55" align="center" type="index"/>
          <el-editable-column prop="productCode" align="center" label="物品编号" min-width="150px"/>
          <el-editable-column prop="productName" align="center" label="物品名称" min-width="150px"/>
          <el-editable-column prop="productType" align="center" label="规格" min-width="150px"/>
          <el-editable-column prop="unit" align="center" label="单位" min-width="150px"/>
          <el-editable-column prop="stockQuantity" align="center" label="采购数量" min-width="150px"/>
          <el-editable-column prop="arrivalQuantity" align="center" label="到货数量" min-width="150px"/>
          <el-editable-column prop="giveDate" align="center" label="交货日期" min-width="170px"/>
          <el-editable-column prop="price" align="center" label="单价" min-width="170px"/>
          <el-editable-column prop="includeTaxPrice" align="center" label="含税价" min-width="170px"/>
          <el-editable-column prop="taxRate" align="center" label="税率(%)" min-width="170px"/>
          <el-editable-column prop="money" align="center" label="金额" min-width="150px"/>
          <el-editable-column prop="includeTaxMoney" align="center" label="含税金额" min-width="150px"/>
          <el-editable-column prop="taxMoney" align="center" label="税额" min-width="150px"/>
          <el-editable-column prop="discountRate" align="center" label="折扣(%)" min-width="170px"/>
          <el-editable-column prop="discountMoney" align="center" label="折扣额" min-width="170px"/>
          <el-editable-column prop="remark" align="center" label="备注" min-width="150px"/>
          <el-editable-column prop="sourceNumber" align="center" label="源单编号" min-width="150px"/>
          <el-editable-column prop="sourceSerialNumber" align="center" label="源单序号" min-width="150px"/>
          <el-editable-column prop="hadStorageQuantity" align="center" label="已入库数量" min-width="150px"/>
          <el-editable-column prop="reportCheckingQuantity" align="center" label="报检数量" min-width="150px"/>
          <el-editable-column prop="actualCheckingQuantity" align="center" label="实捡数量" min-width="150px"/>
          <el-editable-column prop="qualifyQuantity" align="center" label="合格数量" min-width="150px"/>
          <el-editable-column prop="unqualifyQuantity" align="center" label="不合格数量" min-width="150px"/>
          <el-editable-column prop="returnQuantity" align="center" label="退货数量" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <!--审核状态-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name">审核状态</h2>
      <el-steps :active="reviewList.length" direction="vertical">
        <el-step
          v-for="(item, index) in reviewList"
          :key="index"
          :title="'审核步骤' + item.step"
          style="height: 100px">
          <template slot="description" >
            <span style="font-size: 16px;color: red">{{ item.stat | statfilter }}</span><br>
            <span style="font-size: 14px">审核人: {{ item.stepHandlerName }}</span><br>
            <span style="font-size: 14px">审核时间: {{ item.createTime }}</span>
          </template>
        </el-step>
      </el-steps>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">合计信息</h2>
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
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">备注信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('public.receiptStat')" style="width: 100%;">
                {{ personalForm.receiptStat | receiptStatFilter }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('public.createPersonName')" prop="stockType" style="width: 100%;">
                {{ personalForm.createPersonName }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('public.createDate')" style="width: 100%;">
                {{ personalForm.createDate }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('public.judgePersonName')" prop="applyDeptId" style="width: 100%;">
                {{ personalForm.judgePersonName }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('public.judgeDate')" prop="sourceType" style="width: 100%;">
                {{ personalForm.judgeDate }}
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
        1: '采购申请',
        2: '采购计划',
        3: '采购询价单',
        4: '无来源'
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
    payIdFilter(status) {
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
      this.list2 = this.personalForm.stockArrivalDetailVos
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
