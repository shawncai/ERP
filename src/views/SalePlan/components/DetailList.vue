<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.number +'    详情'" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.title')" style="width: 100%;">
                <span>{{ personalForm.title }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.sourceType')" prop="sourceType" style="width: 100%;">
                <span>{{ personalForm.sourceType | sourceTypeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.sourceNumber')" style="width: 100%;">
                <span>{{ personalForm.sourceNumber }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.customerType')" prop="customerType" style="width: 100%;">
                <span>{{ personalForm.customerType | customerTypeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.customerName')" prop="customerId" style="width: 100%;">
                <span>{{ personalForm.customerName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.customerPhone')" style="width: 100%;">
                <span>{{ personalForm.customerPhone }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.closeType')" style="width: 100%;">
                <span>{{ personalForm.closeTypeName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.payType')" style="width: 100%;">
                <span>{{ personalForm.payType | payTypeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.salePersonId')" style="width: 100%;">
                <span>{{ personalForm.salePersonName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.saleRepositoryId')" style="width: 100%;">
                <span>{{ personalForm.saleRepositoryName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.receiveAddress')" style="width: 100%;">
                <span>{{ personalForm.receiveAddress }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.returnDate')" prop="returnDate" style="width: 100%;">
                <span>{{ personalForm.returnDate }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.currency')" prop="currency" style="width: 100%;">
                <span>{{ personalForm.currency | currencyFilter }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">退货明细</h2>
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
          <el-editable-column prop="locationName" align="center" label="货位" min-width="150px"/>
          <el-editable-column prop="batch" align="center" label="批次" min-width="150px"/>
          <el-editable-column prop="productCode" align="center" label="物品编号" min-width="150px"/>
          <el-editable-column prop="productName" align="center" label="物品名称" min-width="150px"/>
          <el-editable-column prop="productCategoryName" align="center" label="物品分类" min-width="150px"/>
          <el-editable-column prop="unit" align="center" label="基本单位" min-width="150px"/>
          <el-editable-column prop="productTypeName" align="center" label="规格型号" min-width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
          <el-editable-column prop="kpiGrade" align="center" label="绩效分" min-width="150px"/>
          <el-editable-column prop="point" align="center" label="商品积分" min-width="150px"/>
          <el-editable-column prop="salePrice" align="center" label="零售价" min-width="150px"/>
          <el-editable-column prop="costPrice" align="center" label="成本价" min-width="150px"/>
          <el-editable-column prop="taxprice" align="center" label="含税价" min-width="150px"/>
          <el-editable-column prop="costMoney" align="center" label="成本金额" min-width="150px"/>
          <el-editable-column prop="includeTaxMoney" align="center" label="含税金额" min-width="150px"/>
          <el-editable-column prop="taxRate" align="center" label="税率(%)" min-width="150px"/>
          <el-editable-column prop="taxMoney" align="center" label="税额" min-width="150px"/>
          <el-editable-column prop="money" align="center" label="金额" min-width="150px"/>
          <el-editable-column prop="includeTaxCostMoney" align="center" label="含税成本金额" min-width="150px"/>
          <el-editable-column prop="discount" align="center" label="折扣率" min-width="150px"/>
          <el-editable-column prop="discountMoney" align="center" label="折扣额" min-width="150px"/>
          <el-editable-column prop="alreadyReturnQuantity" align="center" label="已退货数量" min-width="150px"/>
          <el-editable-column prop="returnQuantity" align="center" label="退货数量" min-width="150px"/>
          <el-editable-column prop="returnReason" align="center" label="退货原因" min-width="150px"/>
          <el-editable-column prop="sendQuantity" align="center" label="发货数量" min-width="150px"/>
          <el-editable-column prop="carCode" align="center" label="车架号" min-width="150px"/>
          <el-editable-column prop="motorCode" align="center" label="电机编码" min-width="150px"/>
          <el-editable-column prop="batteryCode" align="center" label="电池编码" min-width="150px"/>
          <el-editable-column prop="includeTaxCostMoney" align="center" label="源单编号" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">合计信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm2" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.heji1')" style="width: 100%;">
                <span>{{ personalForm.allQuantity }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.heji2')" style="width: 100%;">
                <span>{{ personalForm.allMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.heji3')" style="width: 100%;">
                <span>{{ personalForm.allIncludeTaxMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.heji4')" style="width: 100%;">
                <span>{{ personalForm.allTaxMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.heji5')" style="width: 100%;">
                <span>{{ personalForm.allDiscountMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.heji6')" style="width: 100%;">
                <span>{{ personalForm.allIncludeTaxDiscountMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.ridMoney')" style="width: 100%;">
                <span>{{ personalForm.ridMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.actualReturnMoney')" style="width: 100%;">
                <span>{{ personalForm.actualReturnMoney }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">相关单据状态</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm3" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.closeStatusId')" prop="closeStatusId" style="width: 100%;">
                <span>{{ personalForm.closeStatusId | closeStatusIdFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.alreadyMoney')" style="width: 100%;">
                <span>{{ personalForm.alreadyMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.enterStatusId')" style="width: 100%;">
                <span>{{ personalForm.enterStatusId | enterStatusIdFilter }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
    currencyFilter(status) {
      const statusMap = {
        1: 'RMB',
        2: 'USD'
      }
      return statusMap[status]
    },
    payTypeFilter(status) {
      const statusMap = {
        1: '货到付款',
        2: '当场支付'
      }
      return statusMap[status]
    },
    closeStatusIdFilter(status) {
      const statusMap = {
        1: '已结算',
        2: '未结算'
      }
      return statusMap[status]
    },
    enterStatusIdFilter(status) {
      const statusMap = {
        1: '已入库',
        2: '未入库'
      }
      return statusMap[status]
    },
    customerTypeFilter(status) {
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
        1: '销售出库单',
        2: '无来源'
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
      this.list2 = this.personalForm.saleReturnDetailVos
      this.reviewList = this.personalForm.approvalUseVos
    }
  },
  methods: {
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
