<template>
  <el-dialog
    :visible.sync="editVisible"
    :detailcontrol="detailcontrol"
    :detailid="detailid"
    :close-on-press-escape="false"
    :title="customerForm.id +'客户详情信息'"
    append-to-body
    width="1010px"
    class="edit"
    top="-10px"
    @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">{{ $t('updates.print') }}</button>
        <div class="container" style="margin-top: 37px">
          <el-form ref="customerForm" :model="customerForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.account')" prop="firstName" style="width: 100%;">
                  {{ customerForm.account }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.firstname')" prop="firstName" style="width: 100%;">
                  {{ customerForm.firstName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.middlename')" style="width: 100%;">
                  {{ customerForm.middleName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.lastname')" prop="lastName" sstyle="width: 100%;">
                  {{ customerForm.lastName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.phone')" prop="phoneNumber" style="width: 100%">
                  {{ customerForm.phoneNumber }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.gender')" prop="gender" style="width: 100%">
                  {{ customerForm.gender | genderFilter }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.level')" style="width: 100%">
                  {{ customerForm.customerLevel }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.source')" style="width: 100%">
                  {{ customerForm.source | sourceFilter }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.newold')" style="width: 100%">
                  {{ customerForm.newOrOld | newoldFilter }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.address')" prop="address" style="width: 100%">
                  {{ customerForm.address }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.countyrId')" style="width: 100%">
                  {{ customerForm.countryName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.provinceid')" style="width: 100%">
                  {{ customerForm.provinceName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.cityid')" style="width: 100%">
                  {{ customerForm.cityName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('updates.repository')" prop="repositoryid" style="width: 100%">
                  {{ customerForm.repositoryName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.birthday')" style="width: 100%">
                  {{ customerForm.birthday }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <div class="container" style="margin-top: 10px">
          <el-tabs type="card">
            <el-tab-pane label="收车信息">
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  prop="productName"
                  align="center"
                  label="商品名称"
                  min-width="150"/>
                <el-table-column
                  prop="productType"
                  align="center"
                  label="型号"
                  min-width="150"/>
                <el-table-column
                  prop="carCode"
                  align="center"
                  label="车架号"
                  min-width="150"/>
                <el-table-column
                  prop="recoverReason"
                  align="center"
                  label="收车原因"
                  min-width="150"/>
                <el-table-column
                  prop="handlePersonName"
                  align="center"
                  label="收车人"
                  min-width="150"/>
                <el-table-column
                  prop="recoverDate"
                  align="center"
                  label="收车时间"
                  min-width="150"/>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="回款记录">
              <el-table
                :data="tableData2"
                border
                style="width: 100%">
                <el-table-column
                  prop="idx"
                  align="center"
                  label="当前期数"
                  min-width="150"/>
                <el-table-column
                  prop="payDate"
                  align="center"
                  label="回款日期"
                  min-width="150"/>
                <el-table-column
                  prop="paidMoney"
                  align="center"
                  label="回款金额"
                  min-width="150"/>
                <el-table-column
                  prop="payMode"
                  align="center"
                  label="付款方式"
                  min-width="150"/>
                <el-table-column
                  prop="sourceNumber"
                  align="center"
                  :label="$t('updates.djbh')"
                  min-width="150"/>
                <el-table-column
                  prop="collectName"
                  align="center"
                  label="收款人"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.skrq')"
                  prop="collectDate"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  prop="stat"
                  align="center"
                  label="状态"
                  min-width="150"/>
              </el-table>
            </el-tab-pane>
          <!--<el-tab-pane :label="$t('updates.skxx')">-->
          <!--<el-table-->
          <!--:data="tableData2"-->
          <!--border-->
          <!--style="width: 100%">-->
          <!--<el-table-column-->
          <!--prop="customerName"-->
          <!--align="center"-->
          <!--:label="$t('updates.kh')"-->
          <!--min-width="150"/>-->
          <!--<el-table-column-->
          <!--prop="money"-->
          <!--align="center"-->
          <!--:label="$t('updates.skje')"-->
          <!--min-width="150"/>-->
          <!--<el-table-column-->
          <!--prop="idx"-->
          <!--align="center"-->
          <!--:label="$t('updates.skqs')"-->
          <!--min-width="150"/>-->
          <!--<el-table-column-->
          <!--prop="collectDate"-->
          <!--align="center"-->
          <!--:label="$t('updates.skrq')"-->
          <!--min-width="150"/>-->
          <!--<el-table-column-->
          <!--prop="collectType"-->
          <!--align="center"-->
          <!--:label="$t('updates.skfs')"-->
          <!--min-width="150"/>-->
          <!--</el-table>-->
          <!--<pagination v-show="total2>0" :total="total2" :page.sync="getCollectlist.pagenum" :limit.sync="getCollectlist.pagesize" @pagination="getCollect" />-->
          <!--</el-tab-pane>-->
          <!--<el-tab-pane :label="$t('updates.hfjl')">-->
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
          <!--:label="$t('updates.hfrq')"-->
          <!--min-width="150"/>-->
          <!--<el-table-column-->
          <!--prop="customerName"-->
          <!--align="center"-->
          <!--:label="$t('updates.kh')"-->
          <!--min-width="150"/>-->
          <!--<el-table-column-->
          <!--prop="content"-->
          <!--align="center"-->
          <!--:label="$t('updates.hfnr')"-->
          <!--min-width="150"/>-->
          <!--<el-table-column-->
          <!--prop="visitMode"-->
          <!--align="center"-->
          <!--:label="$t('updates.hffs')"-->
          <!--min-width="150"/>-->
          <!--</el-table>-->
          <!--<pagination v-show="total3>0" :total="total3" :page.sync="getVisitlistdata.pagenum" :limit.sync="getVisitlistdata.pagesize" @pagination="getVisitlist" />-->
          <!--</el-tab-pane>-->
          </el-tabs>
        </div>
      </el-card>
    </div>
  </el-dialog>
</template>

<script>
import { customerDetail } from '@/api/Customer'
var _that
export default {
  filters: {
    genderFilter(status) {
      const statusMap = {
        1: '男',
        2: '女'
      }
      return statusMap[status]
    },
    newoldFilter(status) {
      const statusMap = {
        1: '老',
        2: '新'
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
    sourceFilter(status) {
      const statusMap = {
        1: '线上',
        2: '线下'
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
        1: _that.$t('updates.zd'),
        2: _that.$t('updates.zx'),
        3: _that.$t('updates.jd')
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
      // 回访日期段
      date: [],
      // 回访信息分页和数据
      tableData3: [],
      total3: 0,
      // 回款信息数据
      tableData2: [],
      total2: 0,
      // 收车信息数据
      total: 0,
      tableData: [],
      // 维修信息
      repearData: {},
      // 合同信息
      contracts: {},
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
      customerForm: {},
      // 客户id
      customerdetailId: ''
    }
  },
  watch: {
    detailcontrol() {
      this.editVisible = this.detailcontrol
    },
    detailid() {
      this.customerdetailId = this.detailid
      this.getcustomerDetail()
    }
  },
  methods: {
    // 客户详情
    getcustomerDetail() {
      customerDetail(this.customerdetailId).then(res => {
        if (res.data.ret === 200) {
          console.log(res.data.data)
          this.customerForm = res.data.data.content
          console.log('this.customerForm', this.customerForm)
          this.tableData = res.data.data.recover
          this.tableData2 = res.data.data.repayment
        }
      })
    },
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
