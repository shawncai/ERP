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
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">打印</button>
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
                  <span>{{ customerForm.agentType }}</span>
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
                <el-form-item :label="$t('Customer.discount2')" style="width: 100%;">
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
      <el-card class="box-card" shadow="never" style="margin-top: 15px">
        <h2 ref="caiwu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">财务信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="customerForm2" :model="customerForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.accountsDays')" style="width: 100%;">
                  <span>{{ customerForm.accountsDays }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.settleMode')" style="width: 100%;">
                  <span>{{ customerForm.settleModeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.currency')" style="width: 100%;">
                  <span>{{ customerForm.currency | currencyFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.invoiceType')" style="width: 100%;">
                  <span>{{ customerForm.invoiceTypeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.payMode')" style="width: 100%;">
                  <span>{{ customerForm.payModeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.openingbank')" style="width: 100%;">
                  <span>{{ customerForm.openingBank }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.accountname')" style="width: 100%;">
                  <span>{{ customerForm.accountName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.account')" prop="address" style="width: 100%;">
                  <span>{{ customerForm.account }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">辅助信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="customerForm2" :model="customerForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.establishmenttime')" prop="contactName" style="width: 100%;">
                  <span>{{ formatTime(customerForm.establishmentTime,'Y-M-D') }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.totalnumber')" prop="phone" style="width: 100%;">
                  <span>{{ customerForm.totalNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.corporaterepresentative')" style="width: 100%;">
                  <span>{{ customerForm.corporaterepresentative }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Customer.businesslicense')" style="width: 100%;">
                  <span>{{ customerForm.businessLicense }}</span>
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
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <div class="container" style="margin-top: 10px">
          <el-tabs type="card">
            <el-tab-pane label="购买记录">
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  prop="createDate"
                  align="center"
                  label="购买日期"
                  min-width="150"/>
                <el-table-column
                  prop="saleTypeName"
                  align="center"
                  label="销售类别"
                  min-width="150"/>
                <el-table-column
                  prop="productName"
                  align="center"
                  label="商品名称"
                  min-width="150"/>
                <el-table-column
                  prop="productTypeName"
                  align="center"
                  label="型号"
                  min-width="150"/>
                <el-table-column
                  prop="quantity"
                  align="center"
                  label="数量"
                  min-width="150"/>
                <el-table-column
                  prop="money"
                  align="center"
                  label="金额"
                  min-width="150"/>
                <el-table-column
                  prop="salePrice"
                  align="center"
                  label="零售价"
                  min-width="150"/>
                <el-table-column
                  prop="discountMoney"
                  align="center"
                  label="折扣"
                  min-width="150"/>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="预收款记录">
              <el-table
                :data="tableData2"
                border
                style="width: 100%">
                <el-table-column
                  prop="receiptMoney"
                  align="center"
                  label="预收金额"
                  min-width="150"/>
                <el-table-column
                  prop="receiptDate"
                  align="center"
                  label="预收日期"
                  min-width="150"/>
                <el-table-column
                  prop="receiptPersonName"
                  align="center"
                  label="收款人"
                  min-width="150"/>
                <el-table-column
                  prop="closeTypeName"
                  align="center"
                  label="收款方式"
                  min-width="150"/>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="退款信息">
              <el-table
                :data="tableData3"
                border
                style="width: 100%">
                <el-table-column
                  prop="productName"
                  align="center"
                  label="物品名称"
                  min-width="150"/>
                <el-table-column
                  prop="unit"
                  align="center"
                  label="单位"
                  min-width="150"/>
                <el-table-column
                  prop="money"
                  align="center"
                  label="金额"
                  min-width="150"/>
                <el-table-column
                  prop="returnQuantity"
                  align="center"
                  label="退货数量"
                  min-width="150"/>
                <el-table-column
                  prop="returnReason"
                  align="center"
                  label="退货原因"
                  min-width="150"/>
                <el-table-column
                  prop="closeStatusId"
                  align="center"
                  label="退货状态"
                  min-width="150"/>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
    </el-card></div>
  </el-dialog>
</template>

<script>
import { searchsaleOrder } from '@/api/SaleOrder'
import { searchprepReceipt } from '@/api/PrepReceipt'
import { searchsaleReturn } from '@/api/SaleReturn'
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
    },
    currencyFilter(status) {
      const statusMap = {
        1: 'RMB',
        2: 'USD'
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
      // 退货信息记录数据
      tableData3: [],
      // 预收款记录数据
      tableData2: [],
      // 购买记录数据
      tableData: [],
      // 弹窗组件的控制
      editVisible: this.detailcontrol,
      // 供应商信息数据
      customerForm: this.detaildata,
      // 购买记录
      saleOrderData: {
        pageNum: 1,
        pageSize: 9999,
        repositoryId: 0,
        customerType: 1,
        customerId: this.detailid
      },
      // 预收款记录
      prepReceiptData: {
        pageNum: 1,
        pageSize: 9999,
        agentId: this.detailid,
        repositoryId: 0
      },
      // 退款记录
      saleReturnData: {
        pageNum: 1,
        pageSize: 9999,
        repositoryId: 0,
        customerType: 1,
        customerId: this.detailid
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
      this.saleOrderData.customerId = this.detailid
      this.getsaleOrder()
      this.prepReceiptData.agentId = this.detailid
      this.getprepReceipt()
      this.saleReturnData.customerId = this.detailid
      this.getsaleReturn()
    }
  },
  methods: {
    // 格式化日期，如月、日、时、分、秒保证为2位数
    formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    },
    // 参数number为毫秒时间戳，format为需要转换成的日期格式
    formatTime(number, format) {
      const time = new Date(number)
      const newArr = []
      const formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
      newArr.push(time.getFullYear())
      newArr.push(this.formatNumber(time.getMonth() + 1))
      newArr.push(this.formatNumber(time.getDate()))
      newArr.push(this.formatNumber(time.getHours()))
      newArr.push(this.formatNumber(time.getMinutes()))
      newArr.push(this.formatNumber(time.getSeconds()))

      for (const i in newArr) {
        format = format.replace(formatArr[i], newArr[i])
      }
      return format
    },
    // 退款记录
    getsaleReturn() {
      searchsaleReturn(this.saleReturnData).then(res => {
        if (res.data.ret === 200) {
          this.tableData3 = res.data.data.content.list.map(function(item) {
            const needata = item.saleReturnDetailVos.map(function(elem) {
              return {
                productName: elem.productName,
                unit: elem.unit,
                returnQuantity: elem.returnQuantity,
                money: elem.money,
                returnReason: elem.returnReason,
                closeStatusId: item.closeStatusId
              }
            })
            return needata
          }).flat()
        }
      })
    },
    // 预收款记录
    getprepReceipt() {
      searchprepReceipt(this.prepReceiptData).then(res => {
        if (res.data.ret === 200) {
          this.tableData2 = res.data.data.content.list
        }
      })
    },
    // 购买记录
    getsaleOrder() {
      searchsaleOrder(this.saleOrderData).then(res => {
        if (res.data.ret === 200) {
          this.tableData = res.data.data.content.list.map(function(item) {
            const needata = item.saleOrderDetailVos.map(function(elem) {
              return {
                createDate: item.createDate,
                saleTypeName: item.saleTypeName,
                productName: elem.productName,
                productTypeName: elem.productTypeName,
                quantity: elem.quantity,
                money: elem.money,
                salePrice: elem.salePrice,
                discountMoney: elem.discountMoney
              }
            })
            return needata
          }).flat()
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
