<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.deliverNumber +'    详情'" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('DeliverGoods.title')" prop="title" style="width: 100%;">
                <span>{{ personalForm.title }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('DeliverGoods.sourceType')" prop="sourceType" style="width: 100%;">
                <span>{{ personalForm.sourceType | sourceTypeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('DeliverGoods.sourceNumber')" prop="sourceNumber" style="width: 100%;">
                <span>{{ personalForm.sourceNumber }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('DeliverGoods.requireArriveDate')" prop="requireArriveDate" style="width: 100%;">
                <span>{{ personalForm.requireArriveDate }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('DeliverGoods.deliverDept')" prop="deliverDept" style="width: 100%;">
                <span>{{ personalForm.deliverDeptName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('DeliverGoods.deliverPersonId')" prop="deliverPersonId" style="width: 100%;">
                <span>{{ personalForm.deliverPersonName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('DeliverGoods.requireType')" prop="requireType" style="width: 100%;">
                <span>{{ personalForm.requireType | requireTypeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('DeliverGoods.requireId')" prop="requireId" style="width: 100%;">
                <span>{{ personalForm.name }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('DeliverGoods.stat')" style="width: 100%;">
                <span>{{ personalForm.stat | statFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('DeliverGoods.address')" style="width: 100%;">
                <span>{{ personalForm.address }}</span>
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
          <el-editable-column prop="productType" align="center" label="规格" min-width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
          <el-editable-column prop="unit" align="center" label="单位" min-width="150px"/>
          <el-editable-column prop="basicQuantity" align="center" label="基本数量" min-width="150px"/>
          <el-editable-column prop="price" align="center" label="单价" min-width="150px"/>
          <el-editable-column prop="deliverQuantity" align="center" label="配送数量" min-width="150px"/>
          <el-editable-column prop="deliverMoney" align="center" label="配送金额" min-width="150px"/>
          <el-editable-column prop="outRepositoryName" align="center" label="出货仓库" min-width="150px"/>
          <el-editable-column prop="batch" align="center" label="批次" min-width="150px"/>
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
  </el-dialog>
</template>

<script>
import { productlist } from '@/api/public'
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
    sourceTypeFilter(status) {
      const statusMap = {
        1: '销售出库单',
        2: '调拨单'
      }
      return statusMap[status]
    },
    statFilter(status) {
      const statusMap = {
        1: '配送申请',
        2: '配送出库',
        3: '配送完成',
        4: '回车'
      }
      return statusMap[status]
    },
    requireTypeFilter(status) {
      const statusMap = {
        1: '客户',
        2: '经销商',
        3: '门店'
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
      this.list2 = this.personalForm.deliverGoodsDetailVos
      this.reviewList = this.personalForm.approvalUseVos
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
