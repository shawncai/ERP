<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">
      <el-input v-model="getemplist.title" :placeholder="$t('SaleContract.title')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.number" :placeholder="$t('updates.htdh')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="getemplist.saleType" :placeholder="$t('SaleContract.saleType')" :value="getemplist.saleType" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter">
        <el-option value="1" label="零售"/>
        <el-option value="2" label="批发"/>
      </el-select>
      <el-input v-model="getemplist.customerName" :placeholder="$t('updates2.customerName')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="getemplist.repositoryId" :placeholder="$t('Hmodule.xzmd')" size="small" clearable filterable class="filter-item" @clear="clearrep">
        <el-option
          v-for="(item, index) in repositories"
          :key="index"
          :label="item.repositoryName"
          :value="item.id"/>
      </el-select>
      <el-popover
        v-model="visible2"
        placement="bottom"
        width="500"
        size="small"
        trigger="click">
        <el-select v-model="getemplist.customerType" :placeholder="$t('SaleContract.customerType')" size="small" clearable style="width: 40%;float: left;margin-left: 20px">
          <el-option :label="$t('prompt.jxs')" value="1"/>
          <el-option :label="$t('prompt.ls')" value="2"/>
        </el-select>
        <el-select v-model="getemplist.receiptStat" :value="getemplist.receiptStat" :placeholder="$t('updates.djzt')" size="small" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
          <el-option :label="$t('updates.zd')" value="1"/>
          <el-option :label="$t('updates.zx')" value="2"/>
          <el-option :label="$t('updates.jd')" value="3"/>
        </el-select>
        <el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" :placeholder="$t('updates.spzt')" size="small" clearable style="width: 40%;float: right;margin-right: 20px;margin-top: 20px">
          <el-option :label="$t('updates.wsh')" value="0"/>
          <el-option :label="$t('updates.shz')" value="1"/>
          <el-option :label="$t('updates.shtg')" value="2"/>
          <el-option :label="$t('updates.shptg')" value="3"/>
        </el-select>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="-"
          unlink-panels
          size="small"
          start-placeholder="销售日期"
          end-placeholder="销售日期"
          value-format="yyyy-MM-dd"
          style="margin-top: 20px;margin-left: 20px"/>
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button v-waves class="filter-item" size="small" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" size="small" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>

      <el-button v-waves class="filter-item" size="small" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card :body-style=" { padding: '6px'}" class="box-card" shadow="never">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves size="small" class="filter-item2" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['54-65-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['54-65-6']" v-waves :loading="downloadLoading" size="small" class="filter-item2" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <!-- <el-button v-permission="['54-65-7']" v-waves size="small" class="filter-item2" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button> -->
      <!-- 新建操作 -->
      <el-button v-permission="['54-65-1']" v-waves size="small" class="filter-item2" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
      <!-- 跳转销售出库 -->
      <el-button v-permission="['54-55-1']" v-waves size="small" class="filter-item2" icon="el-icon-plus" type="success" @click="handleAddsaleout">{{ $t('route.AddSaleOut') }}</el-button>

    </el-card>

    <el-card :body-style="	{ padding: '10px' }" class="box-card" shadow="never">

      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :height="tableHeight"
        :key="tableKey"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @row-click="clickRow"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          fixed="left"
          align="center"/>
        <el-table-column :label="$t('public.id')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.number }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="personalForm"/>
        </el-table-column>
        <el-table-column :label="$t('SaleContract.title')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleContract.sourceNumber')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.sourceNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleContract.salePersonId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.salePersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleContract.customerName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.customerName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleContract.customerPhone')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.customerPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleContract.allMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.allMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.judgeStat')" :resizable="false" prop="judgeStat" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.judgeStat | judgeStatFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.receiptStat')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.receiptStat | receiptStatFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('update4.isSecondApplyResult')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.InvestigationResult">{{ $t('prompt.ydc') }}</span>
            <span v-else>{{ $t('prompt.wdc') }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('InstallmentApply.investigationDetail')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.InvestigationResult" class="link-type" @click="handlerdetail(scope.row)">{{ scope.row.InvestigationResult | resultFilter }}</span>
            <span v-else>{{ $t('prompt.wu') }}</span>
          </template>
          <detail-list2 :detailcontrol.sync="detailvisible2" :detaildata.sync="personalForm2"/>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button v-show="scope.row.inquirePersonId !== null && scope.row.judgeStat === 0 && scope.row.isSecondApply === 1" size="mini" type="primary" @click="handleDispatch2(scope.row)">{{ $t('otherlanguage.zcfp') }}</el-button>
            <el-button v-show="scope.row.inquirePersonId === null && scope.row.judgeStat !== 4 && scope.row.isSecondApply === 1" size="mini" type="success" @click="handleDispatch(scope.row)">{{ $t('repair.Dispatch') }}</el-button>
            <el-button v-permission2="['54-65-3', scope.row.createPersonId]" v-show="scope.row.judgeStat === 0&&scope.row.receiptStat === 1" :key="scope.row.id + Math.random()" :title="$t('updates.xg')" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
            <el-button v-show="isReview(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.spi')" type="warning" size="mini" icon="el-icon-view" circle @click="handleReview(scope.row)"/>
            <el-button v-permission2="['54-65-2', scope.row.createPersonId]" v-show="scope.row.judgeStat === 0&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :key="scope.row.id + Math.random()" :title="$t('updates.sc')" scope-row-create-person-id- size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
            <el-button v-permission="['54-65-17']" v-show="isReview3(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.fjd')" type="success" size="mini" icon="el-icon-back" circle @click="handleReview3(scope.row)"/>
            <el-button v-permission="['54-65-76']" v-show="isReview4(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.fsp')" type="warning" size="mini" circle @click="handleReview4(scope.row)"><svg-icon icon-class="fanhui"/></el-button>

          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <my-dialog :editcontrol.sync="editVisible" :editdata.sync="personalForm" @rest="refreshlist"/>
      <!--修改结束=================================================-->
      <el-dialog :visible.sync="isvisible" title="分派调查员" append-to-body width="600px" class="normal" center lock-scroll>
        <el-form :model="dispatchform" style="width: 400px; margin:0 auto;">
          <el-form-item :label-width="formLabelWidth" :label="$t('repair.Employee')">
            <el-select v-model="dispatchform.id" filterable>
              <el-option
                v-for="(item, index) in options2"
                :key="index"
                :label="item.personName"
                :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isvisible = false">{{ $t('repair.cancel') }}</el-button>
          <el-button type="primary" @click="dispatch">{{ $t('repair.ok') }}</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { searchRepository } from '@/api/public'
import { searchsaleContract, deletesaleContract, updatesaleContract2 } from '@/api/SaleContract'
import { searchsaleOut } from '@/api/SaleOut'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { CustomerSurveyReportList2 } from '@/api/CustomerSurveyReport'
import { getremplist2, addtaskoffline } from '@/api/repair'
import { updateapply2 } from '@/api/InstallmentApply'
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
import DetailList2 from './components/DetailList2'

var _that
export default {
  name: 'SaleContractList',
  directives: { waves, permission, permission2 },
  components: { MyDialog, DetailList, MyEmp, MyCustomer, MyAgent, Pagination, DetailList2 },
  filters: {
    resultFilter(status) {
      const statusMap = {
        1: _that.$t('prompt.tg'),
        2: _that.$t('prompt.btg')
      }
      return statusMap[status]
    },
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
      repositories: [],
      // 用户调查数据
      personalForm2: {},
      detailvisible2: false,
      dispatchform: {
        id: ''
      },
      formLabelWidth: '150px',
      options2: [],
      isvisible: false,
      tableHeight: 200,
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
      // 传给组件的数据
      personalForm: {},
      // 修改控制组件数据
      editVisible: false,
      // 开始时间到结束时间
      date: [],
      // 自动创建列表
      form: {}
    }
  },
  activated() {
    this.getlist()
    this.getrepos()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  mounted() {
    this.getlist()
    this.getrepos()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    clearrep() {
      console.log('123', 123)
      this.getemplist.repositoryId = this.$store.getters.repositoryId
    },
    // 根据区域选择门店
    getrepos() {
      console.log('this.$store.getters.repositoryId', this.$store.getters.repositoryId)
      if (this.$store.getters.repositoryId !== '' && this.$store.getters.repositoryId !== null && this.$store.getters.repositoryId !== undefined) {
        searchRepository(null, this.$store.getters.repositoryId, this.$store.getters.regionIds).then(res => {
          if (res.data.ret === 200) {
            this.repositories = res.data.data.content.list
          } else {
            this.$message.error('出错了')
          }
        })
      }
    },
    handlerdetail(row) {
      console.log(row)
      this.detailvisible2 = true
      this.personalForm2 = Object.assign({}, row.InvestigationDetailvos[0])
    },
    handleDispatch(row) {
      this.restdispatchform()
      this.formdata = Object.assign({}, row)
      this.isvisible = true
      console.log(row)
      getremplist2(this.$store.getters.repositoryId, this.$store.getters.regionId).then(res => {
        this.form.taskType = 3
        this.form.taskname = '分期收款任务'
        this.form.repositoryId = row.saleRepositoryId
        this.form.customerName = row.firstName + ' ' + row.middleName + ' ' + row.lastName
        this.form.taskaddress = row.currentAddress
        this.form.employeeId = row.inquirePersonId
        this.form.taskcontent = '分期申请调查'
        this.form.sourceNumber = row.applyNumber
        this.form.createId = row.createPersonId
        this.form.remarks = ''
        this.options2 = res.data.data.content.list
      })
    },
    restdispatchform() {
      this.dispatchform = {
        id: ''
      }
    },
    handleDispatch2(row) {
      this.restdispatchform()
      this.formdata = Object.assign({}, row)
      this.isvisible = true
      console.log(row)
      getremplist2(this.$store.getters.repositoryId, this.$store.getters.regionId).then(res => {
        this.options2 = res.data.data.content.list
      })
    },
    dispatch() {
      const tempData = Object.assign({}, this.formdata)
      this.reviewParms.id = tempData.id
      this.reviewParms.inquirePersonId = this.dispatchform.id
      for (const key in this.reviewParms) {
        if (key === 'judgePersonId' || key === 'judgeStat') {
          delete this.reviewParms[key]
        }
      }
      const parms = JSON.stringify(this.reviewParms)
      updatesaleContract2(parms).then(res => {
        if (res.data.ret === 200) {
          // 自动生成线下任务单
          this.form.employeeId = this.dispatchform.id
          addtaskoffline(this.form).then(res => {
            console.log(res)
          })
          this.isvisible = false
          this.$notify({
            title: 'successful',
            message: 'successful',
            type: 'success',
            duration: 1000
          })
          this.getlist()
        }
      })
    },
    // 反审核
    handleReview4(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.judgePersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qfsp'), this.$t('prompt.fsp'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.fsp'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.judgeStat = 0
        const parms = JSON.stringify(this.reviewParms)
        updatesaleContract2(parms).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.result === false) {
              this.$message({
                type: 'error',
                message: this.$t('prompt.fspsb')
              })
            } else {
              this.$message({
                type: 'success',
                message: this.$t('prompt.fspcg')
              })
            }
            this.getlist()
          } else {
            this.$notify.error({
              title: 'wrong',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      })
    },
    // 反结单操作
    handleReview3(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      // this.reviewParms.endPersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qfjd'), this.$t('prompt.fjd'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.fjd'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.receiptStat = 2
        const parms = JSON.stringify(this.reviewParms)
        updatesaleContract2(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: this.$t('prompt.fjdcg')
            })
            this.getlist()
          } else {
            this.$notify.error({
              title: 'wrong',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      })
    },
    isReview3(row) {
      if (row.receiptStat === 3) {
        return true
      }
    },
    isReview4(row) {
      // 测试阶段临时
      if (row.judgeStat === 2) {
        return true
      }
      // 正式时放开
      // if (row.judgeStat === 2 && row.confirmPersonId === null) {
      //   return true
      // }
    },
    clickRow(val) {
      if (val.judgeStat === 0) {
        this.$refs.table.toggleRowSelection(val)
      }
    },
    handleAddsaleout() {
      if (this.moreaction.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.qxzdj'),
          offset: 100
        })
        return false
      } else if (this.moreaction.length > 1) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.qbyxzdgdj'),
          offset: 100
        })
        return false
      } else {
        if (this.moreaction[0].judgeStat === 0) {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.qxshdj'),
            offset: 100
          })
          return false
        }
      }
      const parms = {
        pageNum: 1,
        pageSize: 10,
        sourceNumber: this.moreaction[0].number,
        repositoryId: 0,
        regionIds: null
      }
      searchsaleOut(parms).then(res => {
        if (res.data.data.content.totalCount === 0) {
          this.$store.dispatch('getnewsaleoutdata', this.moreaction[0])
          this.$router.push('/SaleOut/AddSaleOut')
        } else {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.ghtyscckd'),
            offset: 100
          })
        }
      })
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
    async getlist() {
      const regionIds = this.$store.getters.regionId
      // 物料需求计划列表数据
      this.listLoading = true

      const listdata = await searchsaleContract(this.getemplist).then(res => {
        return res.data.data.content
      })
      console.log('listdata', listdata)
      const reportdata = await Promise.all(listdata.list.map(function(item) {
        return CustomerSurveyReportList2({
          applyNumber: item.number,
          regionIds: regionIds
        })
      }))
      console.log('reportdata', reportdata)
      for (const i in listdata.list) {
        for (const j in reportdata) {
          if (reportdata[j].data.data.content.list.length > 0) {
            if (listdata.list[i].number === reportdata[j].data.data.content.list[0].sourceNumber) {
              listdata.list[i].InvestigationResult = reportdata[j].data.data.content.list[0].result
              listdata.list[i].InvestigationDetailvos = reportdata[j].data.data.content.list
            }
          }
        }
      }
      console.log('listdata', listdata)
      this.listLoading = false
      this.list = listdata.list
      this.total = listdata.totalCount

      // searchsaleContract(this.getemplist).then(res => {
      //   if (res.data.ret === 200) {
      //     this.list = res.data.data.content.list
      //     this.total = res.data.data.content.totalCount
      //   }
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 0.5 * 100)
      // })
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
      this.customerName = ''
      this.getemplist.customerId = ''
    },
    restFilter2() {
      this.stockPersonId = ''
      this.getemplist.stockPersonId = ''
    },
    // 搜索
    handleFilter() {
      if (this.date && this.date.length !== 0) {
        this.getemplist.beginTime = this.date[0] + ' 00:00:00'
        this.getemplist.endTime = this.date[1] + ' 23:59:59'
      } else {
        this.getemplist.beginTime = ''
        this.getemplist.endTime = ''
      }
      this.getemplist.pageNum = 1
      if (this.getemplist.customerName !== null && this.getemplist.customerName !== undefined && this.getemplist.customerName !== '') {
        this.getemplist.customerType = 2
      } else {
        this.getemplist.customerType = null
      }
      searchsaleContract(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
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
      localStorage.clear()
      // this.$store.dispatch('getprintdata', row)
      localStorage.setItem('getprintdata', JSON.stringify(row))
      this.detailvisible = true
      this.personalForm = Object.assign({}, row)
    },
    // 判断审核按钮
    isReview(row) {
      if (row.approvalUseVos !== '' && row.approvalUseVos !== null && row.approvalUseVos !== undefined && row.approvalUseVos.length !== 0) {
        const approvalUse = row.approvalUseVos
        const index = approvalUse[approvalUse.length - 1].stepHandler.indexOf(',' + this.$store.getters.userId + ',')
        if (index > -1 && (row.judgeStat === 1 || row.judgeStat === 0)) {
          if (row.InvestigationResult === 1 && row.isSecondApply === 1) {
            return true
          } else if (row.InvestigationResult === 2 && row.isSecondApply === 1) {
            return false
          } else if (!row.InvestigationResult && row.isSecondApply === 1) {
            return false
          } else if (!row.InvestigationResult && row.isSecondApply === 2) {
            return true
          }
        }
      }
    },
    // 审批操作
    handleReview(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.judgePersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qsh'), this.$t('prompt.sh'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.tg'),
        cancelButtonText: this.$t('prompt.btg'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.judgeStat = 2
        const parms = JSON.stringify(this.reviewParms)
        updatesaleContract2(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: this.$t('prompt.shcg')
            })
            this.getlist()
          }
        })
      }).catch(action => {
        if (action === 'cancel') {
          // 取消弹框
          this.$confirm('是否确认审核不通过？', 'Warning', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消'
          })
            .then(() => {
              this.reviewParms.judgeStat = 3
              const parms = JSON.stringify(this.reviewParms)
              updatesaleContract2(parms).then(res => {
                if (res.data.ret === 200) {
                  this.$message({
                    type: 'success',
                    message: this.$t('prompt.shcg')
                  })
                  this.getlist()
                }
              })
            })
            .catch(action => {
              this.$message({
                type: 'info',
                message: action === 'cancel'
                  ? '确认取消'
                  : '停留在当前页面'
              })
            })
          // ================取消弹框结束
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
      const deleteids = this.moreaction.filter(item => {
        return item.judgeStat === 0
      })
      const ids = deleteids.map(item => item.id).join()
      if (command === 'delete') {
        this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
          confirmButtonText: this.$t('prompt.qd'),
          cancelButtonText: this.$t('prompt.qx'),
          type: 'warning'
        }).then(() => {
          deletesaleContract(ids, this.$store.getters.userId).then(res => {
            if (res.data.ret === 200 || res.data.ret === 100) {
              this.$notify({
                title: this.$t('prompt.sccg'),
                type: 'success',
                offset: 100
              })
              this.getlist()
            } else {
              this.$notify.error({
                title: 'wrong',
                message: 'wrong',
                offset: 100
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('prompt.yqxsc')
          })
        })
      }
    },
    // 单条删除
    handleDelete(row) {
      this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
        confirmButtonText: this.$t('prompt.qd'),
        cancelButtonText: this.$t('prompt.qx'),
        type: 'warning'
      }).then(() => {
        deletesaleContract(row.id, this.$store.getters.userId).then(res => {
          if (res.data.ret === 200 || res.data.ret === 100) {
            this.$notify({
              title: this.$t('prompt.sccg'),
              type: 'success',
              offset: 100
            })
            this.getlist()
          } else {
            this.$notify.error({
              title: 'wrong',
              message: 'wrong',
              offset: 100
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('prompt.yqxsc')
        })
      })
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/SaleContract/AddSaleContract')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'SaleContractName', 'SaleContractShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
