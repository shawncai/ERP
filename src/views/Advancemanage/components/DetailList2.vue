<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.advanceNumber +'    详情'" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Advancemanage.title')" style="width: 100%;">
                <span>{{ personalForm.title }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Advancemanage.customerName')" style="width: 100%;">
                <span>{{ personalForm.customerName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Advancemanage.phone')" style="width: 100%;">
                <span>{{ personalForm.phone }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Advancemanage.address')" style="width: 100%;">
                <span>{{ personalForm.address }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Advancemanage.advanceDate')" prop="signDate" style="width: 100%;">
                <span>{{ personalForm.advanceDate }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Advancemanage.salePrice')" style="width: 100%;">
                <span>{{ personalForm.salePrice }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Advancemanage.advanceMoney')" style="width: 100%;">
                <span>{{ personalForm.advanceMoney }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Advancemanage.payMode')" style="width: 100%;">
                <span>{{ personalForm.payMode | payModeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Advancemanage.salePersonId')" style="width: 100%;">
                <span>{{ personalForm.salePersonName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Advancemanage.postId')" style="width: 100%;">
                <span>{{ personalForm.postName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Advancemanage.saleRepositoryId')" style="width: 100%;">
                <span>{{ personalForm.saleRepositoryName }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" >预售商品</h2>
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
          <el-editable-column prop="locationId" align="center" label="货位" min-width="150px"/>
          <el-editable-column prop="batch" align="center" label="批次号" min-width="150px"/>
          <el-editable-column prop="productCategory" align="center" label="商品分类" min-width="150px"/>
          <el-editable-column prop="productCode" align="center" label="商品编号" min-width="150px"/>
          <el-editable-column prop="productName" align="center" label="商品名称" min-width="150px"/>
          <el-editable-column prop="unit" align="center" label="基本单位" min-width="150px"/>
          <el-editable-column prop="productType" align="center" label="规格" min-width="150px"/>
          <el-editable-column prop="unit" align="center" label="规格型号" min-width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
          <el-editable-column prop="kpiGrade" align="center" label="绩效分" min-width="150px"/>
          <el-editable-column prop="point" align="center" label="商品积分" min-width="150px"/>
          <el-editable-column prop="quantity" align="center" label="预售数量" min-width="170px"/>
          <el-editable-column prop="salePrice" align="center" label="零售价" min-width="170px"/>
          <el-editable-column prop="costPrice" align="center" label="成本价" min-width="170px"/>
          <el-editable-column prop="includeTaxMoney" align="center" label="含税金额" min-width="170px"/>
          <el-editable-column prop="taxRate" align="center" label="税率" min-width="170px"/>
          <el-editable-column prop="taxMoney" align="center" label="税额" min-width="170px"/>
          <el-editable-column prop="money" align="center" label="金额" min-width="170px"/>
          <el-editable-column prop="includeTaxCostMoney" align="center" label="含税成本金额" min-width="170px"/>
          <el-editable-column prop="carCode" align="center" label="车架编码" min-width="170px"/>
          <el-editable-column prop="batteryCode" align="center" label="电池编码" min-width="170px"/>
          <el-editable-column prop="motorCode" align="center" label="电机编码" min-width="170px"/>
          <el-editable-column prop="discount" align="center" label="折扣率" min-width="170px"/>
          <el-editable-column prop="discountMoney" align="center" label="折扣额" min-width="170px"/>
        </el-editable>
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
    receiveModeFilter(status) {
      const statusMap = {
        1: '接收1',
        2: '接收2'
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
    payModeFilter(status) {
      const statusMap = {
        1: '现金'
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
    invoiceTypeFilter(status) {
      const statusMap = {
        1: '增值税',
        2: '普通'
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
      // 回显所属门店
      saleRepositoryId: '',
      // 回显职务
      postId: '',
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
      this.list2 = this.personalForm.advanceOrderDetailVos
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
