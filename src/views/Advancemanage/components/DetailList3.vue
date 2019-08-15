<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.returnNumber +'    详情'" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">打印</button>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item class="print2" label="预售退款单编号" style="width: 100%;display: none">
                    {{ personalForm.number }}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.title2')" style="width: 100%;">
                    <span>{{ personalForm.title }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.sourceType')" prop="sourceType" style="width: 100%;">
                    <span>{{ personalForm.sourceType | sourceTypeFilter }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.sourceNumber')" style="width: 100%;">
                    <span>{{ personalForm.sourceNumber }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.customerName')" prop="customerName" style="width: 100%;">
                    <span>{{ personalForm.customerName }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.phone')" style="width: 100%;">
                    <span>{{ personalForm.phone }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.address')" style="width: 100%;">
                    <span>{{ personalForm.address }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.settleMode')" style="width: 100%;">
                    <span>{{ personalForm.settleModeName }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.settleMoney')" style="width: 100%;">
                    <span>{{ personalForm.settleMoney }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.payMode')" style="width: 100%;">
                    <span>{{ personalForm.payMode | payModeFilter }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.salePersonId')" style="width: 100%;">
                    <span>{{ personalForm.salePersonName }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.postId')" style="width: 100%;">
                    <span>{{ personalForm.postName }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.saleRepositoryId')" style="width: 100%;">
                    <span>{{ personalForm.saleRepositoryName }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.returnMoney')" style="width: 100%;">
                    <span>{{ personalForm.returnMoney }} </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >订单明细</h2>
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
            <el-editable-column prop="productCode" fixed="left" align="center" label="商品编号" />
            <el-editable-column prop="productName" fixed="left" align="center" label="商品名称" />
            <el-editable-column prop="category" align="center" label="商品分类" />
            <el-editable-column prop="unit" align="center" label="基本单位" />
            <el-editable-column prop="productType" align="center" label="规格" />
            <el-editable-column prop="unit" align="center" label="规格型号" />
            <el-editable-column prop="color" align="center" label="颜色" />
            <el-editable-column prop="kpiGrade" align="center" label="绩效分" />
            <el-editable-column prop="point" align="center" label="商品积分" />
            <el-editable-column prop="quantity" align="center" label="数量" />
            <el-editable-column prop="salePrice" align="center" label="零售价" />
            <el-editable-column prop="costPrice" align="center" label="成本价" />
            <el-editable-column prop="includeTaxMoney" align="center" label="含税金额" />
            <el-editable-column prop="taxRate" align="center" label="税率" />
            <el-editable-column prop="taxMoney" align="center" label="税额" />
            <el-editable-column prop="money" align="center" label="金额" />
            <el-editable-column prop="includeTaxCostMoney" align="center" label="含税成本金额" />
            <el-editable-column prop="carCode" align="center" label="车架编码" />
            <el-editable-column prop="batteryCode" align="center" label="电池编码" />
            <el-editable-column prop="motorCode" align="center" label="电机编码" />
            <el-editable-column prop="discount" align="center" label="折扣" />
            <el-editable-column prop="discountMoney" align="center" label="折扣额" />
          </el-editable>
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
    </div>
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
        1: '预售订单'
      }
      return statusMap[status]
    },
    currencyFliter(status) {
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
      this.list2 = this.personalForm.advanceReturnDetailVos
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
