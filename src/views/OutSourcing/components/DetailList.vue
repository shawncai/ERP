<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.number +'    详情'" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.title')" style="width: 100%;">
                <span>{{ personalForm.title }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.personId')" prop="personId" style="width: 100%;">
                <span>{{ personalForm.personName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.taxRate')" style="width: 100%;">
                <span>{{ personalForm.taxRate }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.outFactoryId')" prop="outFactoryId" style="width: 100%;">
                <span>{{ personalForm.outFactoryName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.paymentAgreementId')" style="width: 100%;">
                <span>{{ personalForm.paymentAgreementId | paymentAgreementIdFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.deadline')" style="width: 100%;">
                <span>{{ personalForm.deadline }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.productionDate')" prop="productionDate" style="width: 100%;">
                <span>{{ personalForm.productionDate }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.completeDate')" prop="completeDate" style="width: 100%;">
                <span>{{ personalForm.completeDate }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.billingTypeId')" style="width: 100%;">
                <span>{{ personalForm.billingTypeId | billingTypeIdFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.giveAddress')" style="width: 100%;">
                <span>{{ personalForm.giveAddress }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">费用信息</h2>
      <div class="container">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="110px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.heji')" style="width: 100%;">
                <span>{{ heji }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">外包单明细</h2>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: true, showStatus: true}"
          :summary-method="getSummaries"
          show-summary
          class="click-table1"
          stripe
          border
          size="medium"
          style="width: 100%">
          <el-editable-column type="selection" width="85" align="center"/>
          <el-editable-column label="序号" min-width="55" align="center" type="index"/>
          <el-editable-column prop="productCode" align="center" label="物品编号" min-width="150px"/>
          <el-editable-column prop="productName" align="center" label="物品名称" min-width="150px"/>
          <el-editable-column prop="productType" align="center" label="规格" min-width="150px"/>
          <el-editable-column prop="unit" align="center" label="单位" min-width="150px"/>
          <el-editable-column prop="quantity" align="center" label="数量" min-width="150px"/>
          <el-editable-column prop="money" align="center" label="加工费" min-width="150px"/>
          <el-editable-column prop="totalMoney" align="center" label="金额" min-width="150px">
            <template slot-scope="scope">
              <p>{{ gettotalMoney(scope.row.quantity, scope.row.money, scope.row) }}</p>
            </template>
          </el-editable-column>
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
    paymentAgreementIdFilter(status) {
      const statusMap = {
        1: '付款1',
        2: '付款2'
      }
      return statusMap[status]
    },
    billingTypeIdFilter(status) {
      const statusMap = {
        1: '普通发票',
        2: '付款2'
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
      // 合计
      heji: 0,
      // 详细表数据
      list2: [],
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
      this.list2 = this.personalForm.outsourcingDetailVos
      this.reviewList = this.personalForm.approvalUseVos
    }
  },
  methods: {
    // 明细表金额
    gettotalMoney(quantity, money, row) {
      row.totalMoney = quantity * money
      return row.totalMoney
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
      this.heji = sums[8]
      sums[2] = ''
      sums[4] = ''
      sums[6] = ''
      sums[7] = ''
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
    height: 1000px;
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
