<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <el-select v-model="getemplist.type" :placeholder="$t('stockOrderCount.type')" :value="getemplist.type" class="filter-item" style="width: 120px" @keyup.enter.native="handleFilter" @change="changeName">
        <el-option value="1" label="所有仓库"/>
        <el-option value="3" label="年"/>
        <el-option value="4" label="月"/>
        <el-option value="5" label="日"/>
      </el-select>

      <el-input v-if="second" v-model="repositoryId" :placeholder="$t('updates.repository')" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechooseRep" @clear="restFilter2"/>
      <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>

      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="-"
        unlink-panels
        value-format="yyyy-MM-dd"
        style="width: 250px"/>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>

    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :data="list"
        :cell-style="myTable"
        :header-cell-style="myytablehead"
        :summary-method="getSummaries2"
        :height="tableHeight"
        show-summary
        border
        style="width: 100%">
        <!--        <el-table-column-->
        <!--          :label="$t('searchSaleOrderReport.id')"-->
        <!--          prop="id"-->
        <!--          width="240"-->
        <!--          align="center"/>-->
        <el-table-column
          :label="$t('searchSaleOrderReport.id')"
          type="index"
          fixed="left"
          sortable
          width="50"
          align="center"/>
        <el-table-column
          v-if="getemplist.type !== '1'"
          :label="first"
          sortable
          prop="time"
          width="240"
          fixed
          align="center"/>
        <el-table-column
          v-if="getemplist.type === '1'"
          :label="first"
          prop="name"
          sortable
          width="240"
          fixed
          align="center"/>
        <!--        <el-table-column-->
        <!--          :label="$t('collectAndPay.time')"-->
        <!--          prop="time"-->
        <!--          width="240"-->
        <!--          align="center"/>-->
        <el-table-column
          :label="$t('collectAndPay.saleOut')"
          prop="saleOut"
          sortable
          width="240"
          align="center"/>
        <el-table-column
          :label="$t('collectAndPay.saleReceipt')"
          prop="saleReceipt"
          sortable
          width="240"
          align="center"/>
        <el-table-column
          :label="$t('collectAndPay.hhd')"
          prop="exchangeMoney"
          sortable
          width="240"
          align="center"/>

        <el-table-column
          :label="$t('collectAndPay.collectMoney')"
          prop="collectMoney"
          sortable
          width="240"
          align="center"/>
        <el-table-column
          :label="$t('collectAndPay.income')"
          prop="income"
          width="240"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('collectAndPay.repaireOut')"
          prop="repaireOut"
          width="240"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('collectAndPay.advanceCollect')"
          prop="advanceCollect"
          width="240"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('collectAndPay.totalCollect')"
          prop="totalCollect"
          sortable
          width="240"
          align="center"/>
        <el-table-column
          :label="$t('collectAndPay.preReturn')"
          prop="preReturn"
          sortable
          width="240"
          align="center"/>
        <el-table-column
          :label="$t('collectAndPay.stockRetreat')"
          prop="stockRetreat"
          sortable
          width="240"
          align="center"/>
        <el-table-column
          :label="$t('collectAndPay.saleReturn')"
          prop="saleReturn"
          width="240"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('collectAndPay.payment')"
          prop="payment"
          sortable
          width="240"
          align="center"/>
        <el-table-column
          :label="$t('collectAndPayDetail.transferExpense')"
          prop="transferExpense"
          width="240"
          sortable
          align="center">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail2(scope.row)">{{ scope.row.transferExpense }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('collectAndPay.totalPay')"
          prop="totalPay"
          width="240"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('collectAndPay.balance')"
          prop="balance"
          width="240"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('collectAndPayDetail.transferReceipt')"
          prop="transferReceipt"
          width="240"
          sortable
          align="center">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.transferReceipt }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('collectAndPay.outlay')"
          prop="outlay"
          sortable
          width="240"
          align="center"/>
        <el-table-column
          :label="$t('collectAndPay.balance')"
          prop="transferBalance"
          width="240"
          sortable
          align="center"/>
      </el-table>
      <!-- 列表结束 -->
      <!-- <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" /> -->
    </el-card>
    <el-dialog :visible.sync="paydetail" title="收付款明细" class="normal" width="70%">
      <el-table
        :data="paydata"
        border
        style="width: 100%">
        <el-table-column :label="$t('Transfer.transferDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.transferDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Transfer.title')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Transfer.transferTicket')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.transferTicket }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Transfer.transferMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.allmoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Transfer.handlePersonId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.handlePersonName }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('Transfer.transferInAccount')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.transferInAccount }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Transfer.transferInBank')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.transferInBank }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { searchtransfer } from '@/api/Transfer'
import { searchStockCategory } from '@/api/StockCategory'
import { collectAndPay } from '@/api/count'
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
  name: 'CollectAndPay',
  directives: { waves, permission, permission2 },
  components: { MyDialog, DetailList, MyRepository, MySupplier, MyEmp, MyCustomer, MyTree, MyAgent, Pagination },
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
      detailparms: {
        pageNum: 1,
        pageSize: 99999
      },
      paydata: [],
      paydetail: false,
      // 加载表格
      listLoading: true,
      categoryId: '',
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
      // 采购申请查询加展示参数
      getemplist: {
        pageNum: 1,
        pageSize: 10,
        type: '1',
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

  mounted() {
    this.getdatatime()
    this.changeName()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 150
    }, 100)
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    handleDetail2(row) {
      console.log('row', row.id)
      this.detailparms.repositoryId = row.id
      this.detailparms.regionIds = this.$store.getters.regionIds
      if (this.date === null || this.date === undefined || this.date === '' || this.date.length === 0) {
        this.detailparms.beginTime = ''
        this.detailparms.endTime = ''
      } else {
        this.detailparms.beginTime = this.date[0] + ' 00:00:00'
        this.detailparms.endTime = this.date[1] + ' 23:59:59'
      }
      searchtransfer(this.detailparms).then(res => {
        if (res.data.ret === 200) {
          this.paydata = res.data.data.content.list.filter(item => {
            return item.direction === 2
          })
          for (const i in this.paydata) {
            this.paydata[i].allmoney = 0
            for (const j in this.paydata[i].transferDetailVos) {
              this.paydata[i].allmoney += this.paydata[i].transferDetailVos[j].money
            }
          }
          console.log('this.paydata', this.paydata)
          // const paydatadetail = res.data.data.content.list.map(item => {
          //   return item.transferDetailVos
          // })
          // const arrdetail = [].concat.apply([], paydatadetail)
          // let allmoney = 0
          // for (const i in arrdetail) {
          //   allmoney += arrdetail[i].money
          // }
          // console.log('allmoney', allmoney)
          this.paydetail = true
        }
      })
    },
    handleDetail(row) {
      console.log('row', row.id)
      this.detailparms.repositoryId = row.id
      this.detailparms.regionIds = this.$store.getters.regionIds
      if (this.date === null || this.date === undefined || this.date === '' || this.date.length === 0) {
        this.detailparms.beginTime = ''
        this.detailparms.endTime = ''
      } else {
        this.detailparms.beginTime = this.date[0] + ' 00:00:00'
        this.detailparms.endTime = this.date[1] + ' 23:59:59'
      }
      searchtransfer(this.detailparms).then(res => {
        if (res.data.ret === 200) {
          this.paydata = res.data.data.content.list.filter(item => {
            return item.direction === 1
          })
          for (const i in this.paydata) {
            this.paydata[i].allmoney = 0
            for (const j in this.paydata[i].transferDetailVos) {
              this.paydata[i].allmoney += this.paydata[i].transferDetailVos[j].money
            }
          }
          console.log('this.paydata', this.paydata)
          // const paydatadetail = res.data.data.content.list.map(item => {
          //   return item.transferDetailVos
          // })
          // const arrdetail = [].concat.apply([], paydatadetail)
          // let allmoney = 0
          // for (const i in arrdetail) {
          //   allmoney += arrdetail[i].money
          // }
          // console.log('allmoney', allmoney)
          this.paydetail = true
        }
      })
    },
    numFormat(num) {
      var res = num.toString().replace(/\d+/, function(n) { // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, function($1) {
          return $1 + ','
        })
      })
      return res
    },
    // 总计
    getSummaries2(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = this.numFormat(values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return (Number(prev) + Number(curr)).toFixed(6)
            } else {
              return (Number(prev)).toFixed(6)
            }
          }, 0))
          // console.log('sums[index]', sums[index])
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      return sums
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
    myytablehead({ row, column, rowIndex, columnIndex }) {
      // console.log('myindex=================>', row, column, rowIndex, columnIndex)
      if (columnIndex === 12) {
        return 'border-right:3px solid red'
      }
    },
    myTable({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 12) {
        return 'border-right:3px solid red'
      }
    },
    treechoose() {
      this.treecontrol = true
    },
    tree(val) {
      this.categoryId = val.categoryName
      this.getemplist.categoryId = val.id
    },
    changeName() {
      if (this.getemplist.type === '1') {
        this.first = '仓库'
        this.restFilter2()
        this.second = false
      }
      if (this.getemplist.type === '6') {
        this.first = ' 制单人'
        this.second = false
      }
      if (this.getemplist.type === '3') {
        this.first = '日期'
        this.second = true
      }
      if (this.getemplist.type === '4') {
        this.first = '日期'
        this.second = true
      }
      if (this.getemplist.type === '5') {
        this.first = '日期'
        this.second = true
      }
      this.list = []
      // this.getlist()
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
    getdatatime() { // 默认显示今天
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
      console.log('currentdate', currentdate)
      // this.personalForm.sendDate = currentdate
      // this.personalForm.outDate = currentdate
      this.getemplist.beginTime = currentdate + ' 00:00:00'
      this.getemplist.endTime = currentdate + ' 23:59:59'
      this.getlist()
    },
    getlist() {
      const para = {}
      para.iseffective = 1
      para.type = 1
      this.listLoading = true
      // para.pagenum = 1
      // para.pagesize = 999
      searchStockCategory(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.types = res.data.data.content.list
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      // 物料需求计划列表数据
      this.listLoading = true
      collectAndPay(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 清空搜索条件
    restFilter() {
      this.customerName = ''
      this.getemplist.customerId = ''
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
      console.log('this.date', this.date)
      if (this.getemplist.type === '1' && (this.date === null || this.date === undefined || this.date === '' || this.date.length === 0)) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.qxxzrq'),
          offset: 100
        })
        return false
      }
      if (this.getemplist.type === '3' && (this.getemplist.repositoryId === '' || this.getemplist.repositoryId === null || this.getemplist.repositoryId === undefined)) {
        this.$notify.error({
          title: 'wrong',
          message: '请选择仓库',
          offset: 100
        })
        return false
      }
      if (this.getemplist.type === '3' && (this.date === null || this.date === undefined || this.date === '' || this.date.length === 0)) {
        this.$notify.error({
          title: 'wrong',
          message: '请选择日期',
          offset: 100
        })
        return false
      }
      if (this.getemplist.type === '4' && (this.getemplist.repositoryId === '' || this.getemplist.repositoryId === null || this.getemplist.repositoryId === undefined)) {
        this.$notify.error({
          title: 'wrong',
          message: '请选择仓库',
          offset: 100
        })
        return false
      }
      if (this.getemplist.type === '4' && (this.date === null || this.date === undefined || this.date === '' || this.date.length === 0)) {
        this.$notify.error({
          title: 'wrong',
          message: '请选择日期',
          offset: 100
        })
        return false
      }
      if (this.getemplist.type === '5' && (this.getemplist.repositoryId === '' || this.getemplist.repositoryId === null || this.getemplist.repositoryId === undefined)) {
        this.$notify.error({
          title: 'wrong',
          message: '请选择仓库',
          offset: 100
        })
        return false
      }
      if (this.getemplist.type === '5' && (this.date === null || this.date === undefined || this.date === '' || this.date.length === 0)) {
        this.$notify.error({
          title: 'wrong',
          message: '请选择日期',
          offset: 100
        })
        return false
      }
      this.getemplist.pageNum = 1
      this.getemplist.repositoryId = this.$store.getters.repositoryId
      if (this.date === null || this.date === undefined || this.date === '' || this.date.length === 0) {
        this.getemplist.beginTime = ''
        this.getemplist.endTime = ''
      } else {
        this.getemplist.beginTime = this.date[0] + ' 00:00:00'
        this.getemplist.endTime = this.date[1] + ' 23:59:59'
      }
      this.listLoading = true
      collectAndPay(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
          // this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          // this.restFilter()
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
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
    // // 详情操作
    // handleDetail(row) {
    //   console.log(row)
    //   this.detailvisible = true
    //   this.personalForm = Object.assign({}, row)
    // },
    // 判断审核按钮
    isReview(row) {
      if (row.approvalUseVos !== '' && row.approvalUseVos !== null && row.approvalUseVos !== undefined && row.approvalUseVos.length !== 0) {
        const approvalUse = row.approvalUseVos
        const index = approvalUse[approvalUse.length - 1].stepHandler.indexOf(',' + this.$store.getters.userId + ',')
        console.log(approvalUse[approvalUse.length - 1].stepHandler)
        console.log(index)
        if (index > -1 && (row.judgeStat === 1 || row.judgeStat === 0)) {
          return true
        }
      }
    },
    // // 仓库列表focus事件触发
    // handlechooseRep() {
    //   this.repositorycontrol = true
    // },
    // repositoryname(val) {
    //   console.log(val)
    //   this.repositoryId = val.repositoryName
    //   this.getemplist.repositoryId = val.id
    // },
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
  .ERP-container >>>  .el-form-item__label{
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
  .filter-container{
    padding: 20px;
    padding-left: 0px;
  }
  .filter-item{
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
