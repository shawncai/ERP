<template>
  <el-dialog
    :visible.sync="editVisible"
    :detailcontrol="detailcontrol"
    :detaildata="detaildata"
    :detailid="detailid"
    :close-on-press-escape="false"
    :title="customerForm.id +'经销商详情信息'"
    append-to-body
    width="1010px"
    class="edit"
    top="-10px"
    @close="$emit('update:detailcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :model="customerForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.agentname')" prop="agentName" style="width: 100%;">
                <span>{{ customerForm.agentName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.customertype')" prop="type" style="width: 100%;">
                <span>{{ customerForm.typeName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.level2')" style="width: 100%;">
                <span>{{ customerForm.agentLevel }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.pinyin')" style="width: 100%;">
                <span>{{ customerForm.pinyin }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.source2')" style="width: 100%;">
                <span>{{ customerForm.sourceName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.discount')" style="width: 100%;">
                <span>{{ customerForm.discount }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.introduce2')" style="width: 100%;">
                <span>{{ customerForm.introduce }}</span>
              </el-form-item>
            </el-col>
            <!--// 基本信息结束-->
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" shadow="never" style="margin-top: 15px">
      <h2 ref="lianxi" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">业务信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="customerForm2" :model="customerForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.contactname')" prop="contactName" style="width: 100%;">
                <span>{{ customerForm.contactName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.phone2')" prop="phone" style="width: 100%;">
                <span>{{ customerForm.phone }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('public.countyrId')" style="width: 100%;">
                <span>{{ customerForm.countryName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.provinceid')" style="width: 100%;">
                <span>{{ customerForm.provinceName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.cityid')" style="width: 100%;">
                <span>{{ customerForm.cityName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.traderid')" prop="address" style="width: 100%;">
                <span>{{ customerForm.traderName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.transmode')" prop="address" style="width: 100%;">
                <span>{{ customerForm.transModeWZ }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.deliverymode')" prop="address" style="width: 100%;">
                <span>{{ customerForm.deliveryModeWZ }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.address2')" prop="address" style="width: 100%;">
                <span>{{ customerForm.address }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">备注信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :model="customerForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('public.createPersonName')" style="width: 100%;">
                {{ customerForm.createName }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('public.createDate')" style="width: 100%;">
                {{ customerForm.createTime }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--<el-card class="box-card" style="margin-top: 15px" shadow="never">-->
    <!--<div class="container" style="margin-top: 10px">-->
    <!--<el-tabs type="card">-->
    <!--<el-tab-pane label="销售信息">-->
    <!--<el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">-->
    <!--<el-row>-->
    <!--<el-col :span="12">-->
    <!--<el-form-item :label="$t('NewEmployeeInformation.saleQuantity')" style="width: 100%;">-->
    <!--{{ personalForm.empsale.saleQuantity }}-->
    <!--</el-form-item>-->
    <!--</el-col>-->
    <!--<el-col :span="12">-->
    <!--<el-form-item :label="$t('NewEmployeeInformation.saleMoney')" style="width: 100%;">-->
    <!--{{ personalForm.empsale.saleMoney }}-->
    <!--</el-form-item>-->
    <!--</el-col>-->
    <!--<el-col :span="12">-->
    <!--<el-form-item :label="$t('NewEmployeeInformation.repoRank')" style="width: 100%;">-->
    <!--{{ personalForm.empsale.repoRank }}-->
    <!--</el-form-item>-->
    <!--</el-col>-->
    <!--<el-col :span="12">-->
    <!--<el-form-item :label="$t('NewEmployeeInformation.regionRank')" style="width: 100%;">-->
    <!--{{ personalForm.empsale.regionRank }}-->
    <!--</el-form-item>-->
    <!--</el-col>-->
    <!--<el-col :span="12">-->
    <!--<el-form-item :label="$t('NewEmployeeInformation.costMoney')" style="width: 100%;">-->
    <!--{{ personalForm.empsale.costMoney }}-->
    <!--</el-form-item>-->
    <!--</el-col>-->
    <!--<el-col :span="12">-->
    <!--<el-form-item :label="$t('NewEmployeeInformation.profitMoney')" style="width: 100%;">-->
    <!--{{ personalForm.empsale.profitMoney }}-->
    <!--</el-form-item>-->
    <!--</el-col>-->
    <!--</el-row>-->
    <!--</el-form>-->
    <!--</el-tab-pane>-->
    <!--<el-tab-pane label="采购信息">-->
    <!--<el-table-->
    <!--:data="tableData"-->
    <!--border-->
    <!--style="width: 100%">-->
    <!--<el-table-column-->
    <!--prop="stockDate"-->
    <!--align="center"-->
    <!--label="采购日期"-->
    <!--min-width="150"/>-->
    <!--<el-table-column-->
    <!--prop="supplierName"-->
    <!--align="center"-->
    <!--label="供应商"-->
    <!--min-width="150"/>-->
    <!--<el-table-column-->
    <!--prop="stockQuantity"-->
    <!--align="center"-->
    <!--label="采购数量"-->
    <!--min-width="150"/>-->
    <!--<el-table-column-->
    <!--prop="stockMoney"-->
    <!--align="center"-->
    <!--label="采购金额"-->
    <!--min-width="150"/>-->
    <!--<el-table-column-->
    <!--prop="arriveQuantity"-->
    <!--align="center"-->
    <!--label="到货数量"-->
    <!--min-width="150"/>-->
    <!--<el-table-column-->
    <!--prop="enterQuantity"-->
    <!--align="center"-->
    <!--label="入库数量"-->
    <!--min-width="150"/>-->
    <!--</el-table>-->
    <!--<pagination v-show="total>0" :total="total" :page.sync="getstocklist.pagenum" :limit.sync="getstocklist.pagesize" @pagination="getstoctlist" />-->
    <!--</el-tab-pane>-->
    <!--<el-tab-pane label="收款信息">-->
    <!--<el-table-->
    <!--:data="tableData2"-->
    <!--border-->
    <!--style="width: 100%">-->
    <!--<el-table-column-->
    <!--prop="customerName"-->
    <!--align="center"-->
    <!--label="客户"-->
    <!--min-width="150"/>-->
    <!--<el-table-column-->
    <!--prop="money"-->
    <!--align="center"-->
    <!--label="收款金额"-->
    <!--min-width="150"/>-->
    <!--<el-table-column-->
    <!--prop="idx"-->
    <!--align="center"-->
    <!--label="收款期数"-->
    <!--min-width="150"/>-->
    <!--<el-table-column-->
    <!--prop="collectDate"-->
    <!--align="center"-->
    <!--label="收款日期"-->
    <!--min-width="150"/>-->
    <!--<el-table-column-->
    <!--prop="collectType"-->
    <!--align="center"-->
    <!--label="收款方式"-->
    <!--min-width="150"/>-->
    <!--</el-table>-->
    <!--<pagination v-show="total2>0" :total="total2" :page.sync="getCollectlist.pagenum" :limit.sync="getCollectlist.pagesize" @pagination="getCollect" />-->
    <!--</el-tab-pane>-->
    <!--<el-tab-pane label="回访记录">-->
    <!--<el-row :gutter="20">-->
    <!--<el-form ref="getVisitlistdata" :model="getVisitlistdata">-->
    <!--<el-col :span="5">-->
    <!--<el-form-item>-->
    <!--<el-input v-model="getVisitlistdata.customerName" placeholder="客户姓名" clearable/>-->
    <!--</el-form-item>-->
    <!--</el-col>-->
    <!--<el-col :span="5">-->
    <!--<el-date-picker-->
    <!--v-model="date"-->
    <!--type="daterange"-->
    <!--range-separator="-"-->
    <!--unlink-panels-->
    <!--start-placeholder="回访开始日期"-->
    <!--end-placeholder="回访结束日期"-->
    <!--value-format="yyyy-MM-dd"/>-->
    <!--</el-col>-->
    <!--<el-col :span="3">-->
    <!--<el-button type="primary" style="margin-left: 200px" @click="handleFilter">{{ $t('public.search') }}</el-button>-->
    <!--</el-col>-->
    <!--</el-form>-->
    <!--</el-row>-->
    <!--<el-table-->
    <!--:data="tableData3"-->
    <!--border-->
    <!--style="width: 100%">-->
    <!--<el-table-column-->
    <!--prop="visitDate"-->
    <!--align="center"-->
    <!--label="回访日期"-->
    <!--min-width="150"/>-->
    <!--<el-table-column-->
    <!--prop="customerName"-->
    <!--align="center"-->
    <!--label="客户"-->
    <!--min-width="150"/>-->
    <!--<el-table-column-->
    <!--prop="content"-->
    <!--align="center"-->
    <!--label="回访内容"-->
    <!--min-width="150"/>-->
    <!--<el-table-column-->
    <!--prop="visitMode"-->
    <!--align="center"-->
    <!--label="回访方式"-->
    <!--min-width="150"/>-->
    <!--</el-table>-->
    <!--<pagination v-show="total3>0" :total="total3" :page.sync="getVisitlistdata.pagenum" :limit.sync="getVisitlistdata.pagesize" @pagination="getVisitlist" />-->
    <!--</el-tab-pane>-->
    <!--</el-tabs>-->
    <!--</div>-->
    <!--</el-card>-->
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  components: { Pagination },
  filters: {
    genderFilter(status) {
      const statusMap = {
        1: '男',
        2: '女'
      }
      return statusMap[status]
    },
    certificateTypeFilter(status) {
      const statusMap = {
        1: '类型1',
        2: '类型2'
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
    },
    detailid: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      // 弹窗组件的控制
      editVisible: this.detailcontrol,
      // 供应商信息数据
      customerForm: this.detaildata,
      getstocklist: {
        pagenum: 1,
        pagesize: 10,
        id: this.detailid
      },
      getCollectlist: {
        pagenum: 1,
        pagesize: 10,
        id: this.detailid
      },
      getVisitlistdata: {
        pagenum: 1,
        pagesize: 10,
        id: this.detailid
      }
    }
  },
  watch: {
    detailcontrol() {
      this.editVisible = this.detailcontrol
    },
    detaildata() {
      this.customerForm = this.detaildata
    },
    detailid() {
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
  .edit >>> .el-tabs--card>.el-tabs__header{
    border: none;
  }
  .edit >>> .el-tabs--card>.el-tabs__header .el-tabs__item{
    border: 1px solid #e4e7ed;
  }
  .edit >>> .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border: none;
  }
  .edit >>> .el-tabs--card>.el-tabs__header .el-tabs__item:first-child{
    margin-right: 10px;
  }
  .edit>>> .el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(2){
    margin-right: 10px;
  }
  .edit>>> .el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(3){
    margin-right: 10px;
  }
  .edit>>> .el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(4){
    margin-right: 10px;
  }
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
