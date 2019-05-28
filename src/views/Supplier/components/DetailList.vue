<template>
  <el-dialog
    :visible.sync="editVisible"
    :detailcontrol="detailcontrol"
    :detaildata="detaildata"
    :detailid="detailid"
    :close-on-press-escape="false"
    :title="personalForm.id + '供应商详情信息'"
    append-to-body
    width="1010px"
    class="edit"
    top="-10px"
    @close="$emit('update:detailcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.supplierName')" prop="supplierName" style="width: 100%;">
                <span>{{ personalForm.supplierName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.typeId')" prop="typeId" style="width: 100%;">
                <span>{{ personalForm.typeName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.supplierShortName')" prop="supplierShortName" style="width: 100%;">
                <span>{{ personalForm.supplierShortName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.supplierIntroduction')" prop="supplierShortName" style="width: 100%;">
                <span>{{ personalForm.supplierIntroduction }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="lianxi" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">业务信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm2" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('public.countyrId')" prop="countryId" style="width: 100%;">
                <span>{{ personalForm.countryNname }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('public.provinceId')" style="width: 100%;">
                <span>{{ personalForm.provinceName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('public.cityId')" style="width: 100%;">
                <span>{{ personalForm.cityName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('public.address')" style="width: 100%;">
                <span>{{ personalForm.detailAddress }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.groupId')" prop="groupId" style="width: 100%;">
                <span>{{ personalForm.groupName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.zipCode')" style="width: 100%;">
                <span>{{ personalForm.zipCode }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.contactPersonName')" style="width: 100%;">
                <span>{{ personalForm.contactPersonName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.contactPersonPhone')" style="width: 100%;">
                <span>{{ personalForm.contactPersonPhone }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.regionId')" prop="regionid" style="width: 100%;">
                <span>{{ personalForm.regionName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.giveId')" style="width: 100%;">
                <span>{{ personalForm.giveName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.transportId')" style="width: 100%;">
                <span>{{ personalForm.transportName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.levelId')" style="width: 100%;">
                <span>{{ personalForm.levelName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.isHot')" prop="isHot" style="width: 100%;">
                <span>{{ personalForm.isHot | isHotFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.isEffective')" style="width: 100%;">
                <span>{{ personalForm.isEffective | isEffectiveFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.buyerId')" style="width: 100%;">
                <span>{{ personalForm.buyerName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.businessScopeIntroduction')" style="width: 100%;">
                <span>{{ personalForm.businessScopeIntroduction }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">可提供商品明细</h2>
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
          <el-editable-column prop="unit" align="center" label="单位" min-width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
          <el-editable-column prop="proportion" align="center" label="供货比列" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">财务信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm3" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.paymentId')" style="width: 100%;">
                <span>{{ personalForm.paymentName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.moneyId')" style="width: 100%;">
                <span>{{ personalForm.moneyId | moneyIdFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.bankName')" style="width: 100%;">
                <span>{{ personalForm.bankName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.accountName')" style="width: 100%;">
                <span>{{ personalForm.accountName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.account')" style="width: 100%;">
                <span>{{ personalForm.account }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">辅助信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm4" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.establishDate')" style="width: 100%;">
                <span>{{ personalForm.establishDate }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.legalPerson')" style="width: 100%;">
                <span>{{ personalForm.legalPerson }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.taxNumber')" style="width: 100%;">
                <span>{{ personalForm.taxNumber }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.businessLicense')" style="width: 100%;">
                <span>{{ personalForm.businessLicense }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.companyTypeId')" style="width: 100%;">
                <span>{{ personalForm.companyTypeId | companyTypeIdFilter }}</span>
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
              <el-form-item :label="$t('public.createPersonName')" style="width: 100%;">
                {{ personalForm.createName }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('public.createDate')" style="width: 100%;">
                {{ personalForm.createTime }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <div class="container" style="margin-top: 10px">
        <el-tabs type="card">
          <el-tab-pane label="询价信息">
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                prop="inquiryDate"
                align="center"
                label="询价日期"
                min-width="150"/>
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
                prop="price"
                align="center"
                label="采购单价"
                min-width="150"/>
              <el-table-column
                prop="inquiryPersonName"
                align="center"
                label="询价人"
                min-width="150"/>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="付款信息">
            <el-table
              :data="tableData2"
              border
              style="width: 100%">
              <el-table-column
                prop="payThis"
                align="center"
                label="付款金额"
                min-width="150"/>
              <el-table-column
                prop="payDate"
                align="center"
                label="付款日期"
                min-width="150"/>
              <el-table-column
                prop="payMode"
                align="center"
                label="付款方式"
                min-width="150"/>
              <el-table-column
                prop="paidMoney"
                align="center"
                label="已付金额"
                min-width="150"/>
              <el-table-column
                prop="payingMoney"
                align="center"
                label="未付金额"
                min-width="150"/>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="退货信息">
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
                prop="retreatQuantity"
                align="center"
                label="退货数量"
                min-width="150"/>
              <el-table-column
                prop="retreatReason"
                align="center"
                label="退货原因"
                min-width="150"/>
              <el-table-column
                prop="stat"
                align="center"
                label="退货状态"
                min-width="150"/>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="预付款信息">
            <el-table
              :data="tableData4"
              border
              style="width: 100%">
              <el-table-column
                prop="totalMoney"
                align="center"
                label="预付款金额"
                min-width="150"/>
              <el-table-column
                prop="payDate"
                align="center"
                label="预付款日期"
                min-width="150"/>
              <el-table-column
                prop="settleModeName"
                align="center"
                label="付款方式"
                min-width="150"/>
              <el-table-column
                prop="stockPersonName"
                align="center"
                label="付款人"
                min-width="150"/>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="采购信息">
            <el-table
              :data="tableData5"
              border
              style="width: 100%">
              <el-table-column
                prop="productName"
                align="center"
                label="商品名称"
                min-width="150"/>
              <el-table-column
                prop="stat"
                align="center"
                label="物品状态"
                min-width="150"/>
              <el-table-column
                prop="stockType"
                align="center"
                label="供应类型"
                min-width="150"/>
              <el-table-column
                prop="stockQuantity"
                align="center"
                label="采购数量"
                min-width="150"/>
              <el-table-column
                prop="price"
                align="center"
                label="采购价"
                min-width="150"/>
              <el-table-column
                prop="money"
                align="center"
                label="采购金额"
                min-width="150"/>
              <el-table-column
                prop="returnQuantity"
                align="center"
                label="退货数量"
                min-width="150"/>
              <el-table-column
                prop="stockTimes"
                align="center"
                label="采购次数"
                min-width="150"/>
              <el-table-column
                prop="returnTimes"
                align="center"
                label="退货次数"
                min-width="150"/>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="惩罚信息">
            <el-table
              :data="tableData6"
              border
              style="width: 100%">
              <el-table-column
                prop="createTime"
                align="center"
                label="惩罚时间"
                min-width="150"/>
              <el-table-column
                prop="comment"
                align="center"
                label="惩罚内容"
                min-width="150"/>
              <el-table-column
                prop="reason"
                align="center"
                label="惩罚原因"
                min-width="150"/>
              <el-table-column
                prop="createName"
                align="center"
                label="经办人"
                min-width="150"/>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="延迟记录">
            <el-table
              :data="tableData7"
              border
              style="width: 100%">
              <el-table-column
                prop="number"
                align="center"
                label="订单编号"
                min-width="150"/>
              <el-table-column
                prop="arrivalDate"
                align="center"
                label="交货日期"
                min-width="150"/>
              <el-table-column
                prop="acceptDate"
                align="center"
                label="实际到货日期"
                min-width="150"/>
              <el-table-column
                prop="createName"
                align="center"
                label="延迟时间"
                min-width="150"/>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { stockplanlist } from '@/api/StockInquiry'
import { paymentlist } from '@/api/payment'
import { searchstockRetreat } from '@/api/StockRetreat'
import { stockorderlist } from '@/api/StockOrder'
import { paylist } from '@/api/AdvancePay'
import { searchstockArrival } from '@/api/StockArrival'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  components: { Pagination },
  filters: {
    isHotFilter(status) {
      const statusMap = {
        1: '是',
        2: '否'
      }
      return statusMap[status]
    },
    isEffectiveFilter(status) {
      const statusMap = {
        1: '启用',
        2: '未启用'
      }
      return statusMap[status]
    },
    moneyIdFilter(status) {
      const statusMap = {
        1: 'RMB',
        2: 'USD'
      }
      return statusMap[status]
    },
    companyTypeIdFilter(status) {
      const statusMap = {
        1: '类型1',
        2: '类型2'
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
      // 延迟记录数据
      tableData7: [],
      // 惩罚数据
      tableData6: [],
      // 采购数据
      tableData5: [],
      // 预付款数据
      tableData4: [],
      // 回访日期段
      date: [],
      // 退货信息分页和数据
      tableData3: [],
      total3: 0,
      // 付款信息分页和数据
      tableData2: [],
      total2: 0,
      // 采购信息分页和数据
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
      personalForm: this.detaildata,
      getstockinquirylist: {
        pageNum: 1,
        pageSize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionId,
        supplierId: this.detailid
      },
      // 付款信息请求数据
      getpaymentlistData: {
        pageNum: 1,
        pageSize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionId,
        supplierId: this.detailid
      },
      // 采购退货信息请求数据
      getretreatlistData: {
        pageNum: 1,
        pageSize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionId,
        supplierId: this.detailid
      },
      // 预付款信息请求数据
      getpaylistData: {
        pageNum: 1,
        pageSize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionId,
        supplierId: this.detailid
      },
      // 采购信息请求数据
      getstocklistData: {
        pageNum: 1,
        pageSize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionId,
        supplierId: this.detailid
      },
      getstockArrivalData: {
        pageNum: 1,
        pageSize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionId,
        supplierId: this.detailid
      }
    }
  },
  watch: {
    detailcontrol() {
      this.editVisible = this.detailcontrol
    },
    detaildata() {
      this.personalForm = this.detaildata
      this.list2 = this.personalForm.supplierDetailVos
      this.tableData6 = this.personalForm.supplierPunishments
    },
    detailid() {
      this.getstockinquirylist.supplierId = this.detailid
      this.getstockpinquirylist()
      this.getpaymentlistData.supplierId = this.detailid
      this.getpaymentlist()
      this.getretreatlistData.supplierId = this.detailid
      this.getretreatlist()
      this.getpaylistData.supplierId = this.detailid
      this.getpaylist()
      this.getstocklistData.supplierId = this.detailid
      this.getstockorderlist()
      this.getstockArrivalData.supplierId = this.detailid
      this.getsearchstockArrivallist()
    }
  },
  methods: {
    // 延迟记录
    getsearchstockArrivallist() {
      searchstockArrival(this.getstockArrivalData).then(res => {
        if (res.data.ret === 200) {
          this.tableData7 = res.data.data.content.list
        }
      })
    },
    // 采购信息
    getstockorderlist() {
      stockorderlist(this.getstocklistData).then(res => {
        if (res.data.ret === 200) {
          this.tableData5 = res.data.data.content.list.map(function(item) {
            const needata = item.stockOrderDetailVos.map(function(elem) {
              return {
                productName: elem.productName,
                stockType: item.stockType,
                stockQuantity: elem.stockQuantity,
                price: elem.price,
                money: elem.money,
                returnQuantity: elem.returnQuantity
              }
            })
            return needata
          }).flat()
        }
      })
    },
    // 预付款信息
    getpaylist() {
      paylist(this.getpaylistData).then(res => {
        if (res.data.ret === 200) {
          this.tableData4 = res.data.data.content.list
        }
      })
    },
    // 退货信息
    getretreatlist() {
      searchstockRetreat(this.getretreatlistData).then(res => {
        if (res.data.ret === 200) {
          this.tableData3 = res.data.data.content.list.map(function(item) {
            const needata = item.stockRetreatDetailVos.map(function(elem) {
              return {
                productName: elem.productName,
                unit: elem.unit,
                money: elem.money,
                retreatQuantity: elem.retreatQuantity,
                retreatReason: elem.retreatReason
              }
            })
            return needata
          }).flat()
        }
      })
    },
    // 询价信息
    getstockpinquirylist() {
      stockplanlist(this.getstockinquirylist).then(res => {
        if (res.data.ret === 200) {
          this.tableData = res.data.data.content.list.map(function(item) {
            const needata = item.stockInquiryDetailVos.map(function(elem) {
              return {
                inquiryDate: item.inquiryDate,
                productName: elem.productName,
                paidMoney: elem.paidMoney,
                price: elem.price,
                inquiryPersonName: elem.inquiryPersonName
              }
            })
            return needata
          }).flat()
        }
      })
    },
    // 付款信息
    getpaymentlist() {
      paymentlist(this.getpaymentlistData).then(res => {
        if (res.data.ret === 200) {
          if (res.data.ret === 200) {
            this.tableData2 = res.data.data.content.list.map(function(item) {
              const needata = item.paymentDetailVos.map(function(elem) {
                return {
                  payThis: elem.payThis,
                  payDate: elem.payDate,
                  payMode: item.payMode,
                  paidMoney: elem.paidMoney,
                  payingMoney: elem.payingMoney
                }
              })
              return needata
            }).flat()
          }
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
  .edit>>> .el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(5){
    margin-right: 10px;
  }
  .edit>>> .el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(6){
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
