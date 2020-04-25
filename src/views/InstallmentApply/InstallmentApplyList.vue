<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">

      <el-input v-model="getemplist.customerName" :placeholder="$t('InstallmentApply.customerName')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="getemplist.customerPhone" :placeholder="$t('updates.dh')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="salePersonId" :placeholder="$t('InstallmentApply.salePersonId')" size="small" class="filter-item" @clear="restFilter" @keyup.enter.native="handleFilter" @focus="handlechooseStock"/>
      <my-emp :control.sync="stockControl" @stockName="stockName"/>

      <el-popover
        v-model="visible2"
        placement="bottom"
        width="500"
        size="small"
        trigger="click">
        <el-select v-model="getemplist.receiptStat" :value="getemplist.receiptStat" :placeholder="$t('updates.djzt')" size="small" clearable style="width: 40%;float: left;margin-left: 20px">
          <el-option :label="$t('updates.zd')" value="1"/>
          <el-option :label="$t('updates.zx')" value="2"/>
          <el-option :label="$t('updates.jd')" value="3"/>
        </el-select>
        <el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" :placeholder="$t('updates.spzt')" size="small" clearable style="width: 40%;float: right;margin-right: 20px">
          <el-option :label="$t('updates.wsh')" value="0"/>
          <el-option :label="$t('updates.shz')" value="1"/>
          <el-option :label="$t('updates.shtg')" value="2"/>
          <el-option :label="$t('updates.shptg')" value="3"/>
        </el-select>
        <el-input v-model="getemplist.suretyName" :placeholder="$t('otherlanguage.dbr')" size="small" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 10px" @keyup.enter.native="handleFilter"/>
        <el-input v-model="saleRepositoryId" :placeholder="$t('collectAndPay.saleRepository')" size="small" style="width: 40%;float: left;margin-left: 53px;margin-top: 10px;" clearable @focus="handlechooseRep" @clear="clearid"/>
        <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
        <!--<el-date-picker-->
        <!--v-model="date"-->
        <!--type="daterange"-->
        <!--range-separator="-"-->
        <!--unlink-panels-->
        <!--start-placeholder="销售日期"-->
        <!--end-placeholder="销售日期"-->
        <!--value-format="yyyy-MM-dd"-->
        <!--style="margin-top: 20px;margin-left: 20px"/>-->
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button v-waves size="small" class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" size="small" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>

      <el-button v-waves size="small" class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card :body-style=" { padding: '6px'}" class="box-card" shadow="never">

      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" size="small" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['200-201-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['200-201-6']" v-waves :loading="downloadLoading" size="small" class="filter-item2" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <!-- <el-button v-permission="['200-201-7']" v-waves size="small" class="filter-item2" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button> -->
      <!-- 新建操作 -->
      <el-button v-permission="['200-201-1']" v-waves size="small" class="filter-item2" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
      <el-button v-permission="['54-65-1']" v-waves size="small" class="filter-item2" icon="el-icon-plus" type="success" @click="handleAddreport">{{ $t('InstallmentApply.addInvestigationReport') }}</el-button>
      <el-button v-permission="['54-65-1']" v-waves size="small" class="filter-item2" icon="el-icon-plus" type="success" @click="handleAddcontrat">{{ $t('InstallmentApply.salecontrat') }}</el-button>
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
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.applyNumber }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="personalForm"/>
        </el-table-column>
        <el-table-column :label="$t('InstallmentApply.title')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('InstallmentApply.customerName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.applyPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('InstallmentApply.applyCellPhone')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.applyCellPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('InstallmentApply.currentAddress')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.currentAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('InstallmentApply.totalMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.totalMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('InstallmentApply.installmentCount')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.installmentCount }}</span>
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
        <el-table-column :label="$t('InstallmentApply.isInvestigation')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.isInvestigation | InvestigationFilter }}</span> -->
            <span v-if="scope.row.isInvestigation === 2">{{ $t('prompt.ydc') }}</span>
            <span v-else>{{ $t('prompt.wdc') }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('InstallmentApply.isInvestigation')" :resizable="false" :formatter="getisInvestigation" prop="isInvestigation" align="center" min-width="150"/> -->
        <el-table-column :label="$t('InstallmentApply.investigationDetail')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.isInvestigation === 2" class="link-type" @click="handlerdetail(scope.row)">{{ scope.row.InvestigationResult | resultFilter }}</span>
            <span v-else>{{ $t('prompt.wu') }}</span>
          </template>
          <detail-list2 :detailcontrol.sync="detailvisible2" :detaildata.sync="personalForm2"/>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="250">
          <template slot-scope="scope">
            <el-button v-show="scope.row.inquirePersonId !== null && scope.row.judgeStat === 0" size="mini" type="primary" @click="handleDispatch2(scope.row)">{{ $t('otherlanguage.zcfp') }}</el-button>
            <el-button v-show="scope.row.inquirePersonId === null && scope.row.judgeStat !== 4" size="mini" type="success" @click="handleDispatch(scope.row)">{{ $t('repair.Dispatch') }}</el-button>
            <el-button v-permission2="['200-201-3', scope.row.createPersonId]" v-show="(scope.row.judgeStat === 0||scope.row.judgeStat === 4)&&scope.row.receiptStat === 1" :title="$t('updates.xg')" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
            <el-button v-show="isReview(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.spi')" type="warning" size="mini" icon="el-icon-view" circle @click="handleReview(scope.row)"/>
            <el-button v-permission2="['200-201-2', scope.row.createPersonId]" v-show="(scope.row.judgeStat === 0||scope.row.judgeStat === 4)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.sc')" size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
            <el-button :title="$t('updates.jc')" size="mini" type="primary" icon="el-icon-sort" circle @click="handleReceipt(scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <my-dialog :editcontrol.sync="editVisible" :editdata.sync="personalForm" @rest="refreshlist"/>
      <!--修改结束=================================================-->
      <el-dialog :visible.sync="receiptVisible" title="分期进程" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;">
            <el-steps :space="200" style="width: 150%;" finish-status="success">
              <el-step :status="step4" :title="$t('prompt.fqsq')"/>
              <el-step :status="step5" :title="$t('prompt.fqdc')"/>
              <el-step :status="step6" :title="$t('prompt.xsht')"/>
              <el-step :status="step7" :title="$t('prompt.xsck')"/>
              <el-step :status="step8" :title="$t('prompt.wc')"/>
            </el-steps>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
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
  </div>
</template>

<script>
import { checkReceiptApply2 } from '@/api/public'
import { getremplist2 } from '@/api/repair'
import { applylist, deleteapply, updateapply2 } from '@/api/InstallmentApply'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { CustomerSurveyReportList2 } from '@/api/CustomerSurveyReport'
import { addtaskoffline } from '../../api/repair'
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
import MyRepository from './components/MyRepository'

var _that
export default {
  name: 'InstallmentApplyList',
  directives: { waves, permission, permission2 },
  components: { MyDialog, DetailList, MyEmp, MyCustomer, MyAgent, Pagination, DetailList2, MyRepository },
  filters: {
    judgeStatFilter(status) {
      const statusMap = {
        0: _that.$t('updates.wsh'),
        1: _that.$t('updates.shz'),
        2: _that.$t('Hmodule.shtg'),
        3: _that.$t('Hmodule.shbtg'),
        4: _that.$t('collectAndPay.lsbc')
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
    },
    InvestigationFilter(status) {
      const statusMap = {
        0: '未调查',
        2: '已调查'
      }
      return statusMap[status]
    },
    resultFilter(status) {
      const statusMap = {
        1: _that.$t('prompt.tg'),
        2: _that.$t('prompt.btg')
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableHeight: 200,
      saleRepositoryId: '',
      step1: '',
      step2: '',
      step3: '',
      step4: '',
      step5: '',
      step6: '',
      step7: '',
      step8: '',
      receiptVisible: false,
      options2: [],
      isvisible: false,
      formdata: [],
      dispatchform: {
        id: ''
      },
      formLabelWidth: '150px',
      // 销售员回显
      salePersonId: '',
      // 控制销售
      stockControl: false,
      // 回显客户
      customerName: '',
      repositorycontrol: false,
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
      // 调查结果详情
      detailvisible2: false,
      // 更多搜索条件问题
      visible2: false,
      // 供应商回显
      supplierId: '',
      // 供应商控制框
      empcontrol: false,
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
      // 用户调查数据
      personalForm2: {},
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
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  mounted() {
    this.getlist()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    clickRow(val) {
      if (val.judgeStat === 0) {
        this.$refs.table.toggleRowSelection(val)
      }
    },
    // 清楚id
    clearid() {
      this.saleRepositoryId = ''
      this.getemplist.saleRepositoryId = ''
    },
    // 新建客户报告
    handleAddreport() {
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
        if (this.moreaction[0].judgeStat !== 0) {
          this.$notify.error({
            title: 'wrong',
            message: '单据已审核',
            offset: 100
          })
          return false
        }
      }
      if (this.moreaction[0].inquirePersonId === this.$store.getters.userId) {
        this.$store.dispatch('getempcontract', this.moreaction)
        this.$router.push('/CustomerSurveyReport/AddCustomerSurveyReport')
      } else {
        this.$notify.error({
          title: 'wrong',
          message: '请先分配调查',
          offset: 100
        })
        return false
      }
    },
    // 新建销售合同
    handleAddcontrat() {
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
        if (this.moreaction[0].judgeStat === 1) {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.gdjzss'),
            offset: 100
          })
          return false
        }
        if (this.moreaction[0].judgeStat === 3) {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.gdjwtgsh'),
            offset: 100
          })
          return false
        }
        if (this.moreaction[0].isInvestigation !== 2) {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.gdjswdc'),
            offset: 100
          })
          return false
        }
      }
      this.$store.dispatch('getempcontract', this.moreaction)
      this.$router.push('/SaleContract/AddSaleContract')
    },
    // 打开客户报告
    handlerdetail(row) {
      console.log(row)
      this.detailvisible2 = true
      this.personalForm2 = Object.assign({}, row.InvestigationDetailvos[0])
    },
    getisInvestigation(row) {
      checkReceiptApply2(row.applyNumber).then(res => {
        console.log('结果', res.data.data.reportStat)
        const test = res.data.data.reportStat
        return test
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
      updateapply2(parms).then(res => {
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
        this.form.remark = ''
        this.options2 = res.data.data.content.list
      })
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
    restdispatchform() {
      this.dispatchform = {
        id: ''
      }
    },
    contorlstep4(val) {
      if (val === 0) {
        this.step4 = 'wait'
      }
      if (val === 1) {
        this.step4 = 'finish'
      }
      if (val === 2) {
        this.step4 = 'success'
      }
    },
    contorlstep5(val) {
      if (val === 0) {
        this.step5 = 'wait'
      }
      if (val === 1) {
        this.step5 = 'finish'
      }
      if (val === 2) {
        this.step5 = 'success'
      }
    },
    contorlstep6(val) {
      if (val === 0) {
        this.step6 = 'wait'
      }
      if (val === 1) {
        this.step6 = 'finish'
      }
      if (val === 2) {
        this.step6 = 'success'
      }
    },
    contorlstep7(val) {
      if (val === 0) {
        this.step7 = 'wait'
      }
      if (val === 1) {
        this.step7 = 'finish'
      }
      if (val === 2) {
        this.step7 = 'success'
      }
    },
    contorlstep8(val) {
      if (val === 0) {
        this.step8 = 'wait'
      }
      if (val === 1) {
        this.step8 = 'finish'
      }
      if (val === 2) {
        this.step8 = 'success'
      }
    },
    // 进程操作
    handleReceipt(row) {
      this.receiptVisible = true
      console.log('row', row)
      checkReceiptApply2(row.applyNumber).then(res => {
        if (res.data.ret === 200) {
          console.log('res.data.data', res.data.data)
          this.contorlstep4(res.data.data.applyStat)
          this.contorlstep5(res.data.data.reportStat)
          this.contorlstep6(res.data.data.contractStat)
          this.contorlstep7(res.data.data.outStat)
          this.contorlstep8(res.data.data.finishStat)
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    checkPermission,
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
    // selectInit(row, index) {
    //   if (row.judgeStat !== 0) {
    //     return false
    //   } else {
    //     return true
    //   }
    // },
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
      console.log(regionIds)
      // 物料需求计划列表数据
      // this.listLoading = true
      const needdata = await (applylist(this.getemplist).then(res => {
        return res
      }))
      const processdata = needdata.data.data.content.list
      this.total = needdata.data.data.content.totalCount
      const lists = await Promise.all(processdata.map(function(item) {
        return checkReceiptApply2(item.applyNumber)
      }))
      const lists2 = await Promise.all(processdata.map(function(item) {
        return CustomerSurveyReportList2({
          applyNumber: item.applyNumber,
          regionIds: regionIds
        })
      }))
      console.log('调查结果', lists2)
      for (let i = 0; i < processdata.length; i++) {
        for (let j = 0; j < lists.length; j++) {
          if (processdata[i].applyNumber === lists[j].data.data.applyNumber) {
            processdata[i].isInvestigation = lists[j].data.data.reportStat
          }
        }
      }
      for (let i = 0; i < processdata.length; i++) {
        for (let j = 0; j < lists2.length; j++) {
          if (lists2[j].data.data.content.list.length > 0) {
            if (processdata[i].applyNumber === lists2[j].data.data.content.list[0].sourceNumber) {
              processdata[i].InvestigationDetailvos = lists2[j].data.data.content.list
              processdata[i].InvestigationResult = lists2[j].data.data.content.list[0].result
            }
          }
        }
      }

      console.log('processdata', processdata)
      this.list = processdata
      this.listLoading = false
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
      this.salePersonId = ''
      this.getemplist.salePersonId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      applylist(this.getemplist).then(res => {
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
      if (row.workType !== null) {
        this.personalForm.workType = String(row.workType)
      }
      if (row.mateWorkType !== null) {
        this.personalForm.mateWorkType = String(row.mateWorkType)
      }
      if (row.mateLiveStauts !== null) {
        this.personalForm.mateLiveStauts = String(row.mateLiveStauts)
      }
      if (row.certificateType !== null) {
        this.personalForm.certificateType = String(row.certificateType)
      }
      if (row.liveStauts !== null) {
        this.personalForm.liveStauts = String(row.liveStauts)
      }
      if (row.suretyCertificateType !== null) {
        this.personalForm.suretyCertificateType = String(row.suretyCertificateType)
      }
    },
    // 修改组件修改成功后返回
    refreshlist(val) {
      console.log('val', val)
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
        if (approvalUse[approvalUse.length - 1].stepHandler) {
          const index = approvalUse[approvalUse.length - 1].stepHandler.indexOf(',' + this.$store.getters.userId + ',')
          console.log('index', index)
          console.log('this.$store.getters.userId', this.$store.getters.userId)
          console.log('approvalUse[approvalUse.length - 1].stepHandler', approvalUse[approvalUse.length - 1].stepHandler)
          if (index > -1 && (row.judgeStat === 1 || row.judgeStat === 0)) {
            if (row.isInvestigation === 2) {
              return true
            } else {
              return false
            }
          // return true
          } else {
            return false
          }
        } else {
          return false
        }
      }
      // console.log('row', row)
      // if (row.isInvestigation === 0) {
      //   return false
      // } else {
      //   if (row.judgeStat !== 0) {
      //     return false
      //   } else {
      //     return true
      //   }
      // }
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
        updateapply2(parms).then(res => {
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
              updateapply2(parms).then(res => {
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
      const ids = this.moreaction.map(item => item.id).join()
      if (command === 'delete') {
        this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
          confirmButtonText: this.$t('prompt.qd'),
          cancelButtonText: this.$t('prompt.qx'),
          type: 'warning'
        }).then(() => {
          deleteapply(ids, this.$store.getters.userId).then(res => {
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
        deleteapply(row.id, this.$store.getters.userId).then(res => {
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
      this.$router.push('/InstallmentApply/AddInstallmentApply')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'InstallmentApplyName', 'InstallmentApplyShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
      this.saleRepositoryId = val.repositoryName
      this.getemplist.saleRepositoryId = val.id
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
