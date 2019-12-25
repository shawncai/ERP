<template>
  <div class="ERP-container">
    <div class="filter-container">
      <div id="app">
        <p>{{ $t('route.DriveRes') }}</p>
      </div>
      <el-row :gutter="20" style="margin-top: 26px">
        <el-col :span="24">
          <div style="width: 100%; min-height: 400px;" >
            <div style="width: 100%; height: 50px;background: #d9e0e8;" >
              <div style="padding-top: 16px;padding-left: 20px;width: 25%;height: 100%;float: left">{{ $t('updates.xxyjmydb') }}</div>
              <div class="block">
                <el-form ref="getemplist3" :model="getemplist3" label-width="100px">
                  <el-date-picker
                    v-model="date"
                    :placeholder="$t('Hmodule.xzrq')"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 52%;"
                    class="shipei"/>
                  <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px;" round @click="handleFilter">{{ $t('public.search') }}</el-button>
                </el-form>
              </div>
            </div>
            <el-table
              :data="list2"
              :header-cell-style="tableHeaderColor2"
              style="width: 100%">
              <el-table-column
                :label="$t('updates.repository')"
                prop="repositoryName"
                width="262"
                align="center"/>
              <el-table-column :label="$t('updates.xseyjdb')" align="center">
                <el-table-column
                  :label="$t('updates.jrcg')"
                  prop="todaySale"
                  width="230"
                  align="center"/>
                <el-table-column
                  :label="$t('updates.byzj')"
                  prop="monthSale"
                  width="230"
                  align="center"/>
                <el-table-column
                  :label="$t('updates.sytqi')"
                  prop="lastSale"
                  width="230"
                  align="center"/>
              </el-table-column>
              <el-table-column :label="$t('updates.hkeyjdb')" align="center">
                <el-table-column
                  :label="$t('updates.hkeyjdb')"
                  prop="todayReceipt"
                  width="230"
                  align="center"/>
                <el-table-column
                  :label="$t('updates.byzj')"
                  prop="monthReceipt"
                  width="230"
                  align="center"/>
                <el-table-column
                  :label="$t('updates.sytq')"
                  prop="lastReceipt"
                  width="230"
                  align="center"/>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="24">
          <div style="width: 100%; min-height: 400px;" >
            <div style="width: 100%; height: 50px;background: #d9e0e8;" >
              <div style="padding-top: 16px;padding-left: 20px;width: 25%;height: 100%;float: left">{{ $t('updates.szhzb') }}</div>
              <div style="width: 75%;height: 100%;float: left;">
                <el-form ref="getemplist3" :model="getemplist3" label-width="100px">
                  <el-date-picker
                    v-model="date2"
                    type="daterange"
                    range-separator="-"
                    :start-placeholder="$t('updates.ksrq')"
                    unlink-panels
                    :end-placeholder="$t('updates.jsrq')"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 60%;"
                    class="shipei"/>
                  <!-- 搜索按钮 -->
                  <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px;" round @click="handleFilter2">{{ $t('public.search') }}</el-button>
                </el-form>
              </div>
            </div>
            <el-table
              :data="list"
              :header-cell-style="tableHeaderColor"
              style="width: 100%">
              <el-table-column
                :label="$t('updates.repository')"
                prop="name"
                width="161"
                align="center"/>
              <el-table-column :label="$t('updates.sk')" align="center">
                <el-table-column
                  :label="$t('updates.sxckd')"
                  prop="saleOut"
                  width="120"
                  align="center"/>
                <el-table-column
                  :label="$t('updates.cgthd')"
                  prop="stockRetreat"
                  width="120"
                  align="center"/>
                <el-table-column
                  :label="$t('updates.skd')"
                  prop="collectMoney"
                  width="120"
                  align="center"/>
                <el-table-column
                  :label="$t('updates.srd')"
                  prop="income"
                  width="120"
                  align="center"/>
                <el-table-column
                  :label="$t('updates.wxckd')"
                  prop="repaireOut"
                  width="120"
                  align="center"/>
                <el-table-column
                  :label="$t('updates.yskd')"
                  prop="advanceCollect"
                  width="120"
                  align="center"/>
                <el-table-column
                  :label="$t('updates.hj')"
                  prop="totalCollect"
                  width="120"
                  align="center"/>
              </el-table-column>
              <el-table-column :label="$t('updates.fk')" align="center">
                <el-table-column
                  :label="$t('updates.xsth')"
                  prop="saleReturn"
                  width="120"
                  align="center"/>
                <el-table-column
                  :label="$t('updates.fkd')"
                  prop="payment"
                  width="120"
                  align="center"/>
                <el-table-column
                  :label="$t('updates.zcd')"
                  prop="outlay"
                  width="120"
                  align="center"/>
                <el-table-column
                  :label="$t('updates.hj')"
                  prop="totalPay"
                  width="120"
                  align="center"/>
              </el-table-column>
              <el-table-column
                :label="$t('updates.ye')"
                prop="balance"
                width="160"
                align="center"/>
            </el-table>
          </div>
        </el-col>
      </el-row>

      <!--      <el- v-model="getemplist.id" :placeholder="$t('route.WorkDesk')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>-->
    </div>
  </div>
</template>

<script>
import { deletesaleOrder, updatesaleOrder2 } from '@/api/SaleOrder'
import { drive, drive2 } from '@/api/home'
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

var _that
export default {
  name: 'DriveRes',
  directives: { waves, permission, permission2 },
  components: { MyDialog, DetailList, MyEmp, MyCustomer, MyAgent, Pagination },
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
        1: '已发货',
        2: '未发货'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      deskdata: {
      },
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
      types: [],
      // 申请部门数据
      depts: [],
      // 开始时间到结束时间
      date: null,
      // 审核传参
      reviewParms: {
        id: '',
        judgePersonId: '',
        judgeStat: ''
      },
      // 详情组件数据
      detailvisible: false,
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
      list2: [],
      list3: [],
      applyList: [],
      // 表格数据条数
      total: 0,
      // 表格识别
      tableKey: 0,
      // 加载表格
      listLoading: true,
      // 采购申请查询加展示参数
      getemplist: {
        pageNum: 1,
        pageSize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds
      },
      getemplist2: {
        pageNum: 1,
        pageSize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds,
        employeeId: this.$store.getters.userId
      },
      getemplist3: {
        repositoryid: this.$store.getters.repositoryId,
        regionid: this.$store.getters.regionId,
        type: 1
      },
      getemplist4: {
        repositoryid: this.$store.getters.repositoryId,
        regionid: this.$store.getters.regionId,
        type: 1
      },
      // 传给组件的数据
      personalForm: {},
      // 修改控制组件数据
      editVisible: false,
      // 开始时间到结束时间
      date2: []
    }
  },

  mounted() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 搜索
    handleFilter() {
      console.log(this.date)
      if (this.date === null || this.date === undefined || this.date === '') {
        console.log('123', this.getemplist3.oneDay)
        this.getemplist3.oneDay = ''
      } else {
        console.log('123', this.getemplist3.oneDay)
        this.getemplist3.oneDay = this.date
      }
      drive2(this.getemplist3).then(res => {
        if (res.data.ret === 200) {
          console.log(res.data)
          this.list2 = res.data.data.saleCompareAllVos.map(function(item) {
            return {
              repositoryName: item.repositoryName,
              todaySale: item.todaySale,
              monthSale: item.monthSale,
              lastSale: item.lastSale,
              todayReceipt: item.todayReceipt,
              monthReceipt: item.monthReceipt,
              lastReceipt: item.lastReceipt
            }
          })
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 搜索
    handleFilter2() {
      if (this.date2 === null || this.date2 === undefined || this.date2 === '') {
        this.getemplist4.beginTime = ''
        this.getemplist4.endTime = ''
      } else {
        this.getemplist4.beginTime = this.date2[0]
        this.getemplist4.endTime = this.date2[1]
      }
      drive(this.getemplist4).then(res => {
        if (res.data.ret === 200) {
          console.log(res.data)
          console.log(res.data.data.repositoryName)
          this.list = res.data.data.content.list.map(function(item) {
            console.log('repaire', item.repaireOut)
            console.log('totalPay', item.totalPay)
            if (item.repaireOut === null) {
              item.repaireOut = 0
              console.log('repaire', item.repaireOut)
            }
            return {
              name: item.name,
              saleOut: item.saleOut,
              stockRetreat: item.stockRetreat,
              income: item.income,
              repaireOut: item.repaireOut,
              advanceCollect: item.advanceCollect,
              totalCollect: item.totalCollect,
              saleReturn: item.saleReturn,
              payment: item.payment,
              outlay: item.outlay,
              totalPay: item.totalPay,
              balance: item.balance,
              payModeName: item.payModeName,
              collectMoney: item.collectMoney
            }
          })
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background: red '
      } else {
        return ''
      }
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      console.log('rowIndex', rowIndex)
      console.log('columnIndex', columnIndex)
      if (rowIndex === 0 && columnIndex === 0) {
        return 'background-color: #5bba56;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 1) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 0) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 1) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 2) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 3) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 4) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 5) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 6) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 2) {
        return 'background-color: #f99a00;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 7) {
        return 'background-color: #f99a00;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 8) {
        return 'background-color: #f99a00;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 9) {
        return 'background-color: #f99a00;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 10) {
        return 'background-color: #f99a00;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 3) {
        return 'background-color: #f93f33;color: white;'
      }
    },
    tableHeaderColor2({ row, column, rowIndex, columnIndex }) {
      console.log('rowIndex', rowIndex)
      console.log('columnIndex', columnIndex)
      if (rowIndex === 0 && columnIndex === 0) {
        return 'background-color: #5bba56;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 1) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 0) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 1) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 2) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 3) {
        return 'background-color: #f99a00;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 4) {
        return 'background-color: #f99a00;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 5) {
        return 'background-color: #f99a00;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 6) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 2) {
        return 'background-color: #f99a00;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 7) {
        return 'background-color: #f99a00;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 8) {
        return 'background-color: #f99a00;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 9) {
        return 'background-color: #f99a00;color: white;'
      }
      if (rowIndex === 1 && columnIndex === 10) {
        return 'background-color: #f99a00;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 3) {
        return 'background-color: #f93f33;color: white;'
      }
    },
    getlink(row) {
      console.log(row)
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
      this.listLoading = true
      drive(this.getemplist4).then(res => {
        if (res.data.ret === 200) {
          console.log(res.data)
          console.log(res.data.data.repositoryName)
          this.list = res.data.data.content.list.map(function(item) {
            console.log('repaire', item.repaireOut)
            console.log('totalPay', item.totalPay)
            if (item.repaireOut === null) {
              item.repaireOut = 0
              console.log('repaire', item.repaireOut)
            }
            return {
              name: item.name,
              saleOut: item.saleOut,
              stockRetreat: item.stockRetreat,
              income: item.income,
              repaireOut: item.repaireOut,
              advanceCollect: item.advanceCollect,
              totalCollect: item.totalCollect,
              saleReturn: item.saleReturn,
              payment: item.payment,
              outlay: item.outlay,
              totalPay: item.totalPay,
              balance: item.balance,
              payModeName: item.payModeName,
              collectMoney: item.collectMoney
            }
          })
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })

      drive2(this.getemplist3).then(res => {
        if (res.data.ret === 200) {
          console.log(res.data)
          this.list2 = res.data.data.saleCompareAllVos.map(function(item) {
            return {
              repositoryName: item.repositoryName,
              todaySale: item.todaySale,
              monthSale: item.monthSale,
              lastSale: item.lastSale,
              todayReceipt: item.todayReceipt,
              monthReceipt: item.monthReceipt,
              lastReceipt: item.lastReceipt
            }
          })
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
      this.stockPersonId = ''
      this.getemplist.stockPersonId = ''
    },
    // 采购人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 采购人回显
    stockName(val) {
      this.stockPersonId = val.personName
      this.getemplist.stockPersonId = val.id
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
      if (row.payMode !== null) {
        this.personalForm.payMode = String(row.payMode)
      }
      if (row.saleType !== null) {
        this.personalForm.saleType = String(row.saleType)
      }
      if (row.payType !== null) {
        this.personalForm.payType = String(row.payType)
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
    // 审批操作
    handleReview(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.judgePersonId = this.$store.getters.userId
      this.$confirm('请审核', '审核', {
        distinguishCancelAndClose: true,
        confirmButtonText: '通过',
        cancelButtonText: '不通过',
        type: 'warning'
      }).then(() => {
        this.reviewParms.judgeStat = 2
        const parms = JSON.stringify(this.reviewParms)
        updatesaleOrder2(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: '审核成功!'
            })
            this.getlist()
          }
        })
      }).catch(action => {
        if (action === 'cancel') {
          this.reviewParms.judgeStat = 3
          const parms = JSON.stringify(this.reviewParms)
          updatesaleOrder2(parms).then(res => {
            if (res.data.ret === 200) {
              this.$message({
                type: 'success',
                message: '审核成功!'
              })
              this.getlist()
            }
          })
        }
      })
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 多条删除
    // 批量删除
    handleCommand(command) {
      const ids = this.moreaction.map(item => item.id).join()
      if (command === 'delete') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletesaleOrder(ids, this.$store.getters.userId).then(res => {
            if (res.data.ret === 200 || res.data.ret === 100) {
              this.$notify({
                title: '删除成功',
                type: 'success',
                offset: 100
              })
              this.getlist()
            } else {
              this.$notify.error({
                title: '错误',
                message: '出错了',
                offset: 100
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    // 单条删除
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletesaleOrder(row.id, this.$store.getters.userId).then(res => {
          if (res.data.ret === 200 || res.data.ret === 100) {
            this.$notify({
              title: '删除成功',
              type: 'success',
              offset: 100
            })
            this.getlist()
          } else {
            this.$notify.error({
              title: '错误',
              message: '出错了',
              offset: 100
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/SaleOrder/AddSaleOrder')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'SaleOrderName', 'SaleOrderShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '经销商资料表'
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    // 打印
    handlePrint() {
      console.log(456)
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.enterRepositoryId = val.repositoryName
      this.getemplist.enterRepositoryId = val.id
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
  .app-container >>> .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 24px;
    word-break: keep-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  .ERP-container {
    margin: 0px 30px;
  }
  .filter-container{
    padding: 20px;
    padding-left: 0px;
  }
  .filter-item{
    width: 140px;
    margin-left: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: white;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 400px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  @media screen and (max-width: 1400px) {
    .shipei {
      margin-left: 36% !important;
    }
  }
</style>
