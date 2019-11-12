<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.materialsRequireNumber +'    详情'" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('StockRequire.materialsRequireNumber')" style="width: 100%;">
                {{ personalForm.materialsRequireNumber }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockRequire.productName')" prop="stockType" style="width: 100%;">
                {{ personalForm.productName }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockRequire.productCode')" style="width: 100%;">
                {{ personalForm.productCode }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockRequire.categoryId')" prop="applyDeptId" style="width: 100%;">
                {{ personalForm.productCategory }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockRequire.productType')" prop="sourceType" style="width: 100%;">
                {{ personalForm.productType }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockRequire.color')" prop="applyDate" style="width: 100%;">
                {{ personalForm.color }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockRequire.unit')" prop="applyDate" style="width: 100%;">
                {{ personalForm.unit }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockRequire.requireQuantity')" prop="applyDate" style="width: 100%;">
                {{ personalForm.requireQuantity }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockRequire.inventoryQuantity')" prop="applyDate" style="width: 100%;">
                {{ personalForm.inventoryQuantity }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockRequire.shouldStockQuantity')" prop="applyDate" style="width: 100%;">
                {{ personalForm.shouldStockQuantity }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockRequire.stockAdvanceday')" prop="applyDate" style="width: 100%;">
                {{ personalForm.stockAdvanceday }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockRequire.requireDate')" prop="applyDate" style="width: 100%;">
                {{ personalForm.requireDate }}
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
    sourceTypeFilter(status) {
      const statusMap = {
        1: '无来源'
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
      this.list2 = this.personalForm.StockRequireDetailVos
      this.list3 = this.personalForm.StockRequireDetailVos
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
</style>
