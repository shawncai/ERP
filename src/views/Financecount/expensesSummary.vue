<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <el-input
        v-model="repositoryId"
        :placeholder="$t('updates.repository')"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
        @clear="restFilter2"
        @focus="handlechooseRep"
      />
      <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname" />

      <el-date-picker
        :placeholder="$t('updates.rq')"
        v-model="date"
        type="daterange"
        range-separator="-"
        unlink-panels
        value-format="yyyy-MM-dd"
        style="width: 250px"
      />

      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="width: 86px;margin-top: 10px"
        round
        @click="handleFilter"
      >{{ $t('public.search') }}</el-button>
    </el-card>

    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 列表开始 -->
      <el-table
        ref="table"
        :data="list"
        :height="tableHeight"
        :summary-method="getSummaries2"
        border
        show-summary
        style="width: 100%"
        fit
        highlight-current-row
      >
        <el-table-column
          :label="$t('searchSaleOrderReport.id')"
          type="index"
          fixed="left"
          sortable
          width="50"
          align="center"/>
        <el-table-column
          :label="$t('updates.repository')"
          :resizable="false"
          prop="repositoryName"
          width="240"
          align="center"
          fixed="left"
        />
        <el-table-column
          label="6601.01 Selling-expenses-internet"
          prop="expensesInternet"
          width="240"
          align="center"
        />
        <el-table-column
          label="6601.02 Selling-expenses--communication"
          prop="communication"
          width="240"
          align="center"
        />
        <el-table-column
          label="6601.03 Selling-expenses-light/power"
          prop="lightPower"
          width="240"
          align="center"
        />
        <el-table-column label="6601.04 water" prop="water" width="240" align="center" />
        <el-table-column label="6601.05 professionalFee" prop="professionalFee" width="240" align="center" />
        <el-table-column label="6601.06 rental" prop="rental" width="240" align="center" />
        <el-table-column label="6601.07 freight" prop="freight" width="240" align="center" />
        <el-table-column label="6601.08 penalty" prop="penalty" width="240" align="center" />
        <el-table-column label="6601.09 solicit" prop="solicit" width="240" align="center" />
        <el-table-column label="6601.10 TOLLFEE/FARE" prop="TOLLFEEFARE" width="240" align="center" />
        <el-table-column label="6601.11 purchases" prop="purchases" width="240" align="center" />
        <el-table-column label="6601.12 loads" prop="loads" width="240" align="center" />
        <el-table-column label="6601.13 repair/maintenance" prop="repairMaintenance" width="240" align="center"/>
        <el-table-column label="6601.14 gas and oil" prop="gasAndOil" width="240" align="center" />
        <el-table-column label="6601.15 office supplies" prop="officeSupplies" width="240" align="center" />
        <el-table-column label="6601.16 assets" prop="assets" width="240" align="center" />
        <el-table-column label="6601.17 customer" prop="customer" width="240" align="center" />
        <el-table-column label="6601.18 employee" prop="employee" width="240" align="center" />
        <el-table-column label="6601.19 rental（display)" prop="rentaldisplay" width="240" align="center" />
        <el-table-column label="6601.20 allowance" prop="allowance" width="240" align="center" />
        <el-table-column label="6601.21 others（display)" prop="otherdisplay" width="240" align="center" />
        <el-table-column label="6601.22 salary" prop="salary" width="240" align="center" />
        <el-table-column
          label="6601.23 delivery allowance"
          prop="deliveryAllowance"
          width="240"
          align="center"
        />
        <el-table-column
          label="6601.25 training allowance"
          prop="trainingAllowance"
          width="240"
          align="center"
        />
        <el-table-column label="6601.26 benefits" prop="benefits" width="240" align="center" />
        <el-table-column label="6601.27 tarpaulin" prop="tarpaulin" width="240" align="center" />
        <el-table-column
          label="6601.28 others(advertisment)"
          prop="othersAdvertisment"
          width="240"
          align="center"
        />
        <el-table-column label="6601.29 tax" prop="tax" width="240" align="center" />
        <el-table-column
          label="6601.30 other(for company)"
          prop="otherForCompany"
          width="240"
          align="center"
        />
        <el-table-column label="6601.31 renovation" prop="renovation" width="240" align="center" />
        <el-table-column label="6602.01 internet" prop="internet02" width="240" align="center" />
        <el-table-column label="6602.02 communication" prop="communication02" width="240" align="center" />
        <el-table-column label="6602.03 light/power" prop="lightPower02" width="240" align="center" />
        <el-table-column label="6602.04 water" prop="water02" width="240" align="center" />
        <el-table-column
          label="6602.05 professional fee"
          prop="professionalFee02"
          width="240"
          align="center"
        />
        <el-table-column label="6602.06 rental" prop="rental02" width="240" align="center" />
        <el-table-column label="6602.07 freight" prop="freight02" width="240" align="center" />
        <el-table-column label="6602.08 penalty" prop="penalty02" width="240" align="center" />
        <el-table-column label="6602.09 solicit" prop="solicit02" width="240" align="center" />
        <el-table-column label="6602.10 toll fee/fare" prop="TOLLFEEFARE02" width="240" align="center" />
        <el-table-column label="6602.11 purchases" prop="purchases02" width="240" align="center" />
        <el-table-column label="6602.12 load" prop="loads02" width="240" align="center" />
        <el-table-column
          label="6602.13 repair-maintenance"
          prop="repairMaintenance02"
          width="240"
          align="center"
        />
        <el-table-column label="6602.14 gas and oil" prop="gasAndOil02" width="240" align="center" />
        <el-table-column
          label="6602.15 office supplies"
          prop="officeSupplies02"
          width="240"
          align="center"
        />
        <el-table-column label="6602.16 assets" prop="assets02" width="240" align="center" />
        <el-table-column label="6602.17 customer" prop="customer02" width="240" align="center" />
        <el-table-column label="6602.18 employee" prop="employee02" width="240" align="center" />
        <el-table-column label="6602.19 rental(display)" prop="rentaldisplay02" width="240" align="center" />
        <el-table-column label="6602.20 allowance" prop="allowance02" width="240" align="center" />
        <el-table-column label="6602.21 others(display)" prop="otherdisplay02" width="240" align="center" />
        <el-table-column label="6602.22 salary" prop="salary02" width="240" align="center" />
        <el-table-column
          label="6602.23 delivery allowance"
          prop="deliveryAllowance02"
          width="240"
          align="center"
        />
        <el-table-column
          label="6602.25 training allowance"
          prop="trainingAllowance02"
          width="240"
          align="center"
        />
        <el-table-column label="6602.24 bday incentives" prop="benefits02" width="240" align="center" />
        <el-table-column label="6602.26 benefits" prop="tarpaulin02" width="240" align="center" />
        <el-table-column
          label="6602.28 others(advertisment)"
          prop="othersAdvertisment02"
          width="240"
          align="center"
        />
        <el-table-column label="6602.29 tax" prop="tax02" width="240" align="center" />
        <el-table-column
          label="6602.30 other(for company)"
          prop="otherForCompany02"
          width="240"
          align="center"
        />
        <el-table-column label="6602.31 renovation" prop="renovation02" width="240" align="center" />
        <el-table-column label="6603.01 serviceCharge" prop="serviceCharge" width="240" align="center" />
        <el-table-column label="6603.02 interest" prop="interest" width="240" align="center" />
        <el-table-column label="6604 explorationCost" prop="explorationCost" width="240" align="center" />
      </el-table>
      <!-- 列表结束 -->
    </el-card>
  </div>
</template>

<script>
import { searchEmpCategory2 } from '@/api/Product'
import { expensesInfo } from '@/api/count'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyEmp from './components/MyEmp'
import DetailList from './components/DetailList'
import MyDialog from './components/MyDialog'
import MyCustomer from './components/MyCustomer'
import MyAgent from './components/MyAgent'
import MyRepository from './components/MyRepository'
import MyTree from './components/MyTree'
import MySupplier from './components/MySupplier'

var _that
export default {
  name: 'ExpensesSummary',
  directives: { waves, permission, permission2 },
  components: {
    MyDialog,
    DetailList,
    MyRepository,
    MySupplier,
    MyEmp,
    MyCustomer,
    MyTree,
    MyAgent,
    Pagination
  },
  filters: {
    judgeStatFilter(status) {
      const statusMap = {
        0: _that.$t('updates.wsh'),
        1: _that.$t('updates.shz'),
        2: _that.$t('Hmodule.shtg'),
        3: _that.$t('Hmodule.shbtg')
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
    },
    stockTypeFilter(status) {
      const statusMap = {
        1: '采购1'
      }
      return statusMap[status]
    },
    sendTypeFilter(status) {
      const statusMap = {
        1: '未发货',
        2: '发货中',
        3: '已发货'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableHeight: 50,

      productCategory: '',
      first: '',
      second: false,
      third: '',
      step1: '',
      step2: '',
      step3: '',
      step4: '',
      step5: '',
      step6: '',
      step7: '',
      step8: '',
      types: [],
      repositoryId: '',
      handlePersonId: '',
      receiptVisible: false,
      // 回显客户
      customerName: '',
      // 控制客户
      customercontrol: false,
      agentcontrol: false,
      // 类别获取参数
      typeparms: {
        pagenum: 1,
        pagesize: 99999
      },
      // 采购类别数据
      // 申请部门数据
      depts: [],
      // 审核传参
      reviewParms: {
        id: '',
        judgePersonId: '',
        judgeStat: ''
      },
      // 详情组件数据
      treecontrol: false,
      detailvisible: false,
      repositorycontrol: false,
      // 更多搜索条件问题
      visible2: false,
      // 供应商回显
      supplierId: '',
      // 供应商控制框
      empcontrol: false,
      // 采购人回显
      stockPersonId: '',
      // 采购人控制框
      stockControl: false,
      // 批量操作
      moreaction: '',
      // 加载操作控制
      downloadLoading: false,
      // 表格数据
      list: [],
      // 表格数据条数
      total: 0,
      // 表格识别
      tableKey: 0,
      // 加载表格
      listLoading: true,
      // 采购申请查询加展示参数
      getemplist: {
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionId
      },
      // 传给组件的数据
      personalForm: {},
      // 修改控制组件数据
      editVisible: false,
      // 开始时间到结束时间
      date: []
    }
  },
  activated() {
    this.getlist()
  },
  mounted() {
    this.getlist()
    this.changeName()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 150
    }, 100)
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    numFormat(num) {
      var res = num.toString().replace(/\d+/, function(n) { // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, function($1) {
          return $1 + ','
        })
      })
      return res
    },
    getSummaries2(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        if (index === 1) {
          sums[index] = ''
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = this.numFormat(values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return (Number(prev) + Number(curr)).toFixed(2)
            } else {
              return (Number(prev)).toFixed(2)
            }
          }, 0))
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      return sums
    },
    treechoose() {
      this.treecontrol = true
    },
    tree(val) {
      this.productCategory = val.categoryName
      this.getemplist.productCategory = val.id
    },
    changeName() {
      if (this.getemplist.type === '1') {
        this.first = '供应商类别分组'
        this.second = false
      }
      if (this.getemplist.type === '2') {
        this.first = '客户'
        this.second = false
      }
      if (this.getemplist.type === '3') {
        this.first = '员工'
        this.second = false
      }
      if (this.getemplist.type === '4') {
        this.first = '门店'
        this.second = true
      }
      this.getlist()
    },
    checkPermission,
    // 不让勾选
    selectInit(row, index) {
      if (row.judgeStat !== 0) {
        return false
      } else {
        return true
      }
    },
    // 选择客户类型时清理客户名称
    clearCustomer() {
      this.getemplist.customerId = ''
      this.customerName = ''
    },
    // 选择客户focus
    chooseCustomer() {
      if (this.getemplist.customerType === '1') {
        this.agentcontrol = true
      } else if (this.getemplist.customerType === '2') {
        this.customercontrol = true
      }
    },
    customerdata(val) {
      this.getemplist.customerId = val.id
      this.customerName = val.customerName
    },
    agentdata(val) {
      this.getemplist.customerId = val.id
      this.customerName = val.agentName
    },
    // 更新采购类型
    updatecountry() {
      this.getlist()
    },
    getlist() {
      const para = {}
      para.iseffective = 1
      para.type = 1
      para.pagenum = 1
      para.pagesize = 999
      searchEmpCategory2(2).then(res => {
        if (res.data.ret === 200) {
          this.types = res.data.data.content.list
        }
      })
      // 物料需求计划列表数据
      this.listLoading = true
      expensesInfo(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
        //   this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 清空搜索条件
    restFilter() {
      this.productCategory = ''
      this.getemplist.productCategory = ''
    },
    restFilter2() {
      this.repositoryId = ''
      this.getemplist.repositoryId = ''
    },
    restFilter3() {
      this.handlePersonId = ''
      this.getemplist.handlePersonId = ''
    },
    // 搜索
    handleFilter() {
    //   this.getemplist.pageNum = 1
      if (this.date === null || this.date === undefined || this.date === '') {
        this.getemplist.beginTime = ''
        this.getemplist.endTime = ''
      } else {
        this.getemplist.beginTime = this.date[0] + ' 00:00:00'
        this.getemplist.endTime = this.date[1] + ' 23:59:59'
      }
      expensesInfo(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
        //   this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
    },
    // 采购人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 采购人回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.getemplist.handlePersonId = val.id
    },
    // 供应商输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 供应商列表返回数据
    supplierName(val) {
      console.log(val)
      this.supplierId = val.supplierName
      this.getemplist.supplierId = val.id
    },
    // 修改操作
    handleEdit(row) {
      console.log(row)
      this.editVisible = true
      this.personalForm = Object.assign({}, row)
      this.personalForm.sourceType = String(row.sourceType)
      if (row.currency !== null) {
        this.personalForm.currency = String(row.currency)
      }
      if (row.customerType !== null) {
        this.personalForm.customerType = String(row.customerType)
      }
      if (row.saleType !== null) {
        this.personalForm.saleType = String(row.saleType)
      }
      if (row.payType !== null) {
        this.personalForm.payType = String(row.payType)
      }
    },
    // 修改组件修改成功后返回
    refreshlist(val) {
      if (val === true) {
        this.getlist()
      }
    },
    // 详情操作
    handleDetail(row) {
      console.log(row)
      this.detailvisible = true
      this.personalForm = Object.assign({}, row)
    },
    // 判断审核按钮
    isReview(row) {
      if (
        row.approvalUseVos !== '' &&
        row.approvalUseVos !== null &&
        row.approvalUseVos !== undefined &&
        row.approvalUseVos.length !== 0
      ) {
        const approvalUse = row.approvalUseVos
        const index = approvalUse[approvalUse.length - 1].stepHandler.indexOf(
          ',' + this.$store.getters.userId + ','
        )
        console.log(approvalUse[approvalUse.length - 1].stepHandler)
        console.log(index)
        if (index > -1 && (row.judgeStat === 1 || row.judgeStat === 0)) {
          return true
        }
      }
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.repositoryId = val.repositoryName
      this.getemplist.repositoryId = val.id
    },
    // 部门列表focus刷新
    updatedept() {
      this.getlist()
    },
    // 交货人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.deliveryPersonId = val.personName
      this.getemplist.deliveryPersonId = val.id
    },
    // 验收人focus事件触发
    handlechooseAccept() {
      this.accetpcontrol = true
    },
    acceptName(val) {
      this.acceptPersonId = val.personName
      this.getemplist.acceptPersonId = val.id
    }
  }
}
</script>

<style rel="stylesheet/css" scoped>
.ERP-container >>> .el-form-item__label {
  color: #909399;
  text-align: left;
}
.app-container >>> .el-table .cell {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 24px;
  word-break: keep-all;
  word-wrap: break-word;
  white-space: pre-wrap;
}
.ERP-container {
  margin: 0px 10px;
}
.filter-container {
  padding: 20px;
  padding-left: 0px;
}
.filter-item {
  width: 180px;
  margin-left: 20px;
  padding: 10px 0;
}
.normal >>> .el-dialog__header {
  padding: 20px 20px 10px;
  background: #fff;
  position: static;
  top: auto;
  z-index: auto;
  width: auto;
  border-bottom: none;
}
.normal >>> .el-dialog {
  -webkit-transform: none;
  transform: none;
  left: 0;
  position: relative;
  margin: 0 auto;
  height: auto;
}
</style>
