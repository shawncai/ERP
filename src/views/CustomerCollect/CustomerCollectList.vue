<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">

      <!-- <el-input v-model="getemplist.agentName" :placeholder="$t('AgentCollect.agentName')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/> -->
      <el-input v-model="getemplist.customerName" :placeholder="$t('installmentPayList.customerName')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="searchRepositoryId" :placeholder="$t('updates.xsmd')" size="small" class="filter-item" @focus="handlechooseRep" @clear="restFilter"/>
      <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>

      <el-input v-model="getemplist.title" :placeholder="$t('SaleOut.title')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.outNumber" :placeholder="$t('updates.ckdbh')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-date-picker
        v-model="date"
        :default-time="['00:00:00', '23:59:59']"
        type="daterange"
        range-separator="-"
        unlink-panels
        value-format="yyyy-MM-dd"
        style="width: 250px"/>
      <!--更多搜索条件1231231-->
      <!--<el-col :span="3">-->
      <!--<el-popover-->
      <!--v-model="visible2"-->
      <!--placement="bottom"-->
      <!--width="500"-->
      <!--trigger="click">-->
      <!--&lt;!&ndash;<el-select v-model="getemplist.receiptStat" :value="getemplist.receiptStat" :placeholder="$t('updates.djzt')" clearable style="width: 40%;float: left;margin-left: 20px">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-option value="1" :label="$t('updates.zd')"/>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-option value="2" :label="$t('updates.zx')"/>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-option value="3" :label="$t('updates.jd')"/>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" :placeholder="$t('updates.spzt')" clearable style="width: 40%;float: right;margin-right: 20px">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-option value="0" :label="$t('updates.wsh')"/>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-option value="1" :label="$t('updates.shz')"/>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-option value="2" :label="$t('updates.shtg')"/>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-option value="3" :label="$t('updates.shptg')"/>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
      <!--<el-input v-model="getemplist.batteryCode" :placeholder="$t('AgentCollect.batteryCode')" clearable style="width: 40%;float: left;margin-left: 20px" @keyup.enter.native="handleFilter"/>-->
      <!--<el-input v-model="getemplist.count" :placeholder="$t('AgentCollect.count')" clearable style="width: 40%;float: right;margin-right: 20px" @keyup.enter.native="handleFilter"/>-->
      <!--<el-date-picker-->
      <!--v-model="getemplist.time"-->
      <!--type="date"-->
      <!--:placeholder="$t('Hmodule.xzrq')"-->
      <!--value-format="yyyy-MM-dd"-->
      <!--style="width: 40%;float: left;margin-left: 20px;margin-top: 20px"/>-->
      <!--&lt;!&ndash;<el-date-picker&ndash;&gt;-->
      <!--&lt;!&ndash;v-model="date"&ndash;&gt;-->
      <!--&lt;!&ndash;type="daterange"&ndash;&gt;-->
      <!--&lt;!&ndash;range-separator="-"&ndash;&gt;-->
      <!--&lt;!&ndash;unlink-panels&ndash;&gt;-->
      <!--&lt;!&ndash;start-placeholder="销售日期"&ndash;&gt;-->
      <!--&lt;!&ndash;end-placeholder="销售日期"&ndash;&gt;-->
      <!--&lt;!&ndash;value-format="yyyy-MM-dd"&ndash;&gt;-->
      <!--&lt;!&ndash;style="margin-top: 20px;margin-left: 20px"/>&ndash;&gt;-->
      <!--<div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">-->
      <!--<el-button v-waves class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>-->
      <!--</div>-->
      <!--<el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>-->
      <!--</el-popover>-->
      <!--</el-col>-->

      <el-button v-waves class="filter-item" size="small" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card :body-style=" { padding: '6px'}" class="box-card" shadow="never">

      <!-- 批量操作 -->
      <!--<el-dropdown @command="handleCommand">-->
      <!--<el-button v-waves class="filter-item" style="margin-left: 0" type="primary">-->
      <!--{{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon&#45;&#45;right"/>-->
      <!--</el-button>-->
      <!--<el-dropdown-menu slot="dropdown" style="width: 140px">-->
      <!--<el-dropdown-item style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>-->
      <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
      <!-- 表格导出操作 -->
      <el-button v-permission="['54-225-6']" v-waves :loading="downloadLoading" size="small" class="filter-item2" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <!-- <el-button v-permission="['54-225-7']" v-waves size="small" class="filter-item2" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button> -->
      <!-- <el-button v-permission="['54-225-7']" v-waves size="small" class="filter-item2" icon="el-icon-printer" style="width: 86px" @click="handleReceivables">{{ $t('AgentCollect.Receivables') }}</el-button> -->
      <!-- 新建操作 -->
      <!--<el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>-->
    </el-card>

    <el-card :body-style="	{ padding: '10px' }" class="box-card" shadow="never">

      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :height="tableHeight"
        :key="tableKey"
        :data="list"
        :summary-method="getSummaries2"
        show-summary
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @row-click="clickRow"
        @selection-change="handleSelectionChange">
        <!-- <el-table-column
          :selectable="selectInit"
          type="selection"
          width="55"
          fixed="left"
          align="center"/> -->
        <el-table-column :label="$t('public.id')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.sourceNumber }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="personalForm"/>
        </el-table-column>
        <el-table-column :label="$t('SaleOut.title')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockOut.code')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.sourceNumber }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('installmentPayList.customerName')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.customerName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('AgentCollect.shouldMoney')" :resizable="false" prop="shouldMoney" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.shouldMoney }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('AgentCollect.shouldMoney')" :resizable="false" prop="shouldMoney" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.shouldMoney }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('StockOut.outDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.outDate }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('AgentCollect.returnMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.returnMoney }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('AgentCollect.collectedMoney')" :resizable="false" prop="collectedMoney" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.collectedMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('AgentCollect.uncollectedMoney')" :resizable="false" prop="uncollectedMoney" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.uncollectedMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('recoveryCarDetail.repositoryName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.repositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="120px">
          <template slot-scope="scope">
            <el-button type="primary" style="width: 90px" @click="handleMyReceipt2(scope.row)"><span style="margin-left: -15px;">sales collection</span></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <my-dialog :editcontrol.sync="editVisible" :editdata.sync="personalForm" @rest="refreshlist"/>
      <!--修改结束=================================================-->
    </el-card>
  </div>
</template>

<script>
import { customerCollectList } from '@/api/customerCollectList'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyEmp from './components/MyEmp'
import DetailList from './components/DetailList'
import MyDialog from './components/MyDialog'
import MyCustomer from './components/MyCustomer'
import MyAgent from './components/MyAgent'
import MyRepository from '../StockRetreat/components/MyRepository'

var _that
export default {
  name: 'CustomerCollectList',
  directives: { waves, permission },
  components: { MyRepository, MyDialog, DetailList, MyEmp, MyCustomer, MyAgent, Pagination },
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
    payStatFilter(status) {
      const statusMap = {
        1: '待收款',
        2: '收款完成'
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
      tableHeight: 200,

      // 销售员回显
      salePersonId: '',
      // 控制销售
      stockControl: false,
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
      // 审核传参
      reviewParms: {
        id: '',
        judgePersonId: '',
        judgeStat: ''
      },
      // 回显销售门店
      searchRepositoryId: '',
      // 控制销售门店
      repositorycontrol: false,
      // 详情组件数据
      detailvisible: false,
      // 更多搜索条件问题
      visible2: false,
      // 供应商回显
      supplierId: '',
      // 供应商控制框
      empcontrol: false,
      // 批量操作
      moreaction: [],
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
        pageNum: 1,
        pageSize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds,
        time: null
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
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  created() {
    this.getlist()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
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
              return (Number(prev) + Number(curr)).toFixed(2)
            } else {
              return (Number(prev)).toFixed(2)
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
    handleMyReceipt2(val) {
      console.log(val)
      this.$store.dispatch('getempcontract', val)
      this.$router.push('/SaleReceipt/AddSaleReceipt')
    },
    clickRow(val) {
      if (val.judgeStat === 0) {
        this.$refs.table.toggleRowSelection(val)
      }
    },
    // 收款
    handleReceivables() {
      if (this.moreaction.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: '请选择收款对象',
          offset: 100
        })
        return false
      }
      console.log('开始')
      console.log(this.moreaction)
      this.$store.dispatch('getempcontract3', this.moreaction)
      this.$router.push('/Receipt/AddReceipt')
    },
    checkPermission,
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      this.searchRepositoryId = val.repositoryName
      this.getemplist.searchRepositoryId = val.id
    },
    getamouthDate() {

    },
    // 销售人员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 销售员回显
    stockName(val) {
      this.salePersonId = val.personName
      this.personalForm.salePersonId = val.id
    },
    // 不让勾选
    selectInit(row, index) {
      if (this.moreaction.length > 0) {
        if (row.id !== this.moreaction[0].id) {
          return false
        } else {
          return true
        }
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
      // 物料需求计划列表数据
      this.listLoading = true
      customerCollectList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
      // 采购类别数据
      searchStockCategory(this.typeparms).then(res => {
        if (res.data.ret === 200) {
          this.types = res.data.data.content.list
        }
      })
    },
    // 清空搜索条件
    restFilter() {
      this.searchRepositoryId = ''
      this.getemplist.searchRepositoryId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      if (this.date && this.date.length !== 0) {
        this.getemplist.beginTime = this.date[0] + ' 00:00:00'
        this.getemplist.endTime = this.date[1] + ' 23:59:59'
      } else {
        this.getemplist.beginTime = ''
        this.getemplist.endTime = ''
      }
      customerCollectList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
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
      if (row.certificateType !== null) {
        this.personalForm.certificateType = String(row.certificateType)
      }
      if (row.workStat !== null) {
        this.personalForm.workStat = String(row.workStat)
      }
      if (row.mateCertificateType !== null) {
        this.personalForm.mateCertificateType = String(row.mateCertificateType)
      }
      if (row.mateWorkStat !== null) {
        this.personalForm.mateWorkStat = String(row.mateWorkStat)
      }
      if (row.enterpriseNature !== null) {
        this.personalForm.enterpriseNature = String(row.enterpriseNature)
      }
      if (row.suretyCertificateType !== null) {
        this.personalForm.suretyCertificateType = String(row.suretyCertificateType)
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
      console.log('row', row)
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
    // // 审批操作
    // handleReview(row) {
    //   this.reviewParms.id = row.id
    //   this.reviewParms.judgePersonId = this.$store.getters.userId
    //   this.$confirm(this.$t('prompt.qsh'), this.$t('prompt.sh'), {
    //     distinguishCancelAndClose: true,
    //     confirmButtonText: this.$t('prompt.tg'),
    //     cancelButtonText: this.$t('prompt.btg'),
    //     type: 'warning'
    //   }).then(() => {
    //     this.reviewParms.judgeStat = 2
    //     const parms = JSON.stringify(this.reviewParms)
    //     updateapply2(parms).then(res => {
    //       if (res.data.ret === 200) {
    //         this.$message({
    //           type: 'success',
    //           message: this.$t('prompt.shcg')
    //         })
    //         this.getlist()
    //       }
    //     })
    //   }).catch(action => {
    //     if (action === 'cancel') {
    //       this.reviewParms.judgeStat = 3
    //       const parms = JSON.stringify(this.reviewParms)
    //       updateapply2(parms).then(res => {
    //         if (res.data.ret === 200) {
    //           this.$message({
    //             type: 'success',
    //             message: this.$t('prompt.shcg')
    //           })
    //           this.getlist()
    //         }
    //       })
    //     }
    //   })
    // },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // // 多条删除
    // // 批量删除
    // handleCommand(command) {
    //   const ids = this.moreaction.map(item => item.id).join()
    //   if (command === 'delete') {
    //     this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
    //       confirmButtonText: this.$t('prompt.qd'),
    //       cancelButtonText: this.$t('prompt.qx'),
    //       type: 'warning'
    //     }).then(() => {
    //       deleteapply(ids).then(res => {
    //         if (res.data.ret === 200) {
    //           this.$notify({
    //             title: this.$t('prompt.sccg'),
    //             type: 'success',
    //             offset: 100
    //           })
    //           this.getlist()
    //         } else {
    //           this.$notify.error({
    //             title: 'wrong',
    //             message: 'wrong',
    //             offset: 100
    //           })
    //         }
    //       })
    //     }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: this.$t('prompt.yqxsc')
    //       })
    //     })
    //   }
    // },
    // // 单条删除
    // handleDelete(row) {
    //   this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
    //     confirmButtonText: this.$t('prompt.qd'),
    //     cancelButtonText: this.$t('prompt.qx'),
    //     type: 'warning'
    //   }).then(() => {
    //     deleteapply(row.id).then(res => {
    //       if (res.data.ret === 200) {
    //         this.$notify({
    //           title: this.$t('prompt.sccg'),
    //           type: 'success',
    //           offset: 100
    //         })
    //         this.getlist()
    //       } else {
    //         this.$notify.error({
    //           title: 'wrong',
    //           message: 'wrong',
    //           offset: 100
    //         })
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: this.$t('prompt.yqxsc')
    //     })
    //   })
    // },
    // 新增数据
    handleAdd() {
      this.$router.push('/AgentCollect/AddAgentCollect')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'AgentCollectName', 'AgentCollectShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
    margin-left:10px;
  }
  .filter-container{
    padding: 20px;
    padding-left: 0px;
  }
  .filter-item{
    width: 180px;
    margin-left: 10px;
    padding: 10px 0;
  }
  .filter-item2{
    width: 180px;
    margin-left: 5px;
    padding: 10px 0;
  }
  .box-card {
    /* border : 1px solid #f1f1ff !important; */
    border-bottom : 1px solid #f1f1ff00 !important
  }
</style>
