<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">

      <el-input v-model="getemplist.title" :placeholder="$t('SaleOpportunity.title')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.opportunityNumber" :placeholder="$t('updates.jhdhao')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="getemplist.opportunityType" :placeholder="$t('SaleOpportunity.opportunityType')" :value="getemplist.opportunityType" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter">
        <el-option value="1" label="机会1"/>
      </el-select>
      <el-input v-model="repositoryId" :placeholder="$t('StockAlarm.searchRepositoryId')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechooseRep" @clear="clearrep"/>

      <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
      <el-popover
        v-model="visible2"
        placement="bottom"
        width="500"
        size="small"
        trigger="click">
        <el-select v-model="getemplist.customerType" :placeholder="$t('SaleOpportunity.customerType')" size="small" clearable style="width: 40%;float: left;margin-left: 20px">
          <el-option value="1" label="经销商"/>
          <el-option value="2" label="零售"/>
        </el-select>
        <el-input v-model="customerName" :placeholder="$t('SaleOpportunity.customerName')" size="small" style="width: 40%;float: right;margin-right: 20px;" clearable @clear="restFilter" @focus="chooseCustomer"/>
        <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
        <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
        <!--<el-select v-model="getemplist.receiptStat" :value="getemplist.receiptStat" :placeholder="$t('updates.djzt')" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">-->
        <!--<el-option value="1" :label="$t('updates.zd')"/>-->
        <!--<el-option value="2" :label="$t('updates.zx')"/>-->
        <!--<el-option value="3" :label="$t('updates.jd')"/>-->
        <!--</el-select>-->
        <!--<el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" :placeholder="$t('updates.spzt')" clearable style="width: 40%;float: right;margin-right: 20px;margin-top: 20px">-->
        <!--<el-option value="0" :label="$t('updates.wsh')"/>-->
        <!--<el-option value="1" :label="$t('updates.shz')"/>-->
        <!--<el-option value="2" :label="$t('updates.shtg')"/>-->
        <!--<el-option value="3" :label="$t('updates.shptg')"/>-->
        <!--</el-select>-->

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
        <el-button v-waves class="filter-item" size="small" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['54-63-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['54-63-6']" v-waves :loading="downloadLoading" size="small" class="filter-item2" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <!-- <el-button v-permission="['54-63-7']" v-waves size="small" class="filter-item2" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button> -->
      <!-- 新建操作 -->
      <el-button v-permission="['54-63-1']" v-waves size="small" class="filter-item2" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
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
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.opportunityNumber }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="personalForm"/>
        </el-table-column>
        <el-table-column :label="$t('SaleOpportunity.title')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleOpportunity.customerName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.customerName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleOpportunity.customerPhone')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.customerPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleOpportunity.opportunityType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.opportunityTypeName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleOpportunity.opportunitySource')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.opportunitySourceName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleOpportunity.handlePersonId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.handlePersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleOpportunity.isSale')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.isSale | isSaleFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleOpportunity.createPersonName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleOpportunity.createTime')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createDate }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column :label="$t('public.judgeStat')" :resizable="false" prop="judgeStat" align="center" min-width="150">-->
        <!--<template slot-scope="scope">-->
        <!--<span>{{ scope.row.judgeStat | judgeStatFilter }}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column :label="$t('public.receiptStat')" :resizable="false" align="center" min-width="150">-->
        <!--<template slot-scope="scope">-->
        <!--<span>{{ scope.row.receiptStat | receiptStatFilter }}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="400">
          <template slot-scope="scope">
            <el-button v-permission2="['54-63-3', scope.row.createPersonId]" :title="$t('updates.xg')" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
            <!--<el-button v-show="isReview(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.spi')" type="warning" size="mini" icon="el-icon-view" circle @click="handleReview(scope.row)"/>-->
            <el-button v-permission2="['54-63-2', scope.row.createPersonId]" :title="$t('updates.sc')" size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
            <el-button :title="$t('updates.jc')" size="mini" type="primary" icon="el-icon-sort" circle @click="handleReceipt(scope.row)"/>
            <el-button type="primary" style="width: 107px" @click="handleMyReceipt2(scope.row)"><span style="margin-left: -15px;">follow up</span></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <my-dialog :editcontrol.sync="editVisible" :editdata.sync="personalForm" @rest="refreshlist"/>
      <!--修改结束=================================================-->
      <el-dialog :visible.sync="receiptVisible" title="采购进程" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;">
            <el-steps :space="200" style="width: 150%;" finish-status="success">
              <el-step :status="step4" title="sale opportunity"/>
              <el-step :status="step5" title="sale order"/>
              <el-step :status="step6" title="sale out"/>
              <el-step :status="step7" title="sale deliver"/>
              <el-step :status="step8" title="compelet"/>
            </el-steps>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { saleopportunitylist, deletesaleopportunity, saleopportunityGetList } from '@/api/SaleOpportunity'
import { getdeptlist } from '@/api/BasicSettings'
import { checkReceiptOpportunity } from '@/api/public'
import { searchStockCategory } from '@/api/StockCategory'
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
import MyRepository from './components/MyRepository2'

var _that
export default {
  name: 'SaleOpportunityList',
  directives: { waves, permission, permission2 },
  components: { MyDialog, DetailList, MyEmp, MyCustomer, MyAgent, MyRepository, Pagination },
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
    isSaleFilter(status) {
      const statusMap = {
        1: 'follow up ',
        2: 'sale success'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      repositoryId: '',
      repositorycontrol: false,
      tableHeight: 200,

      step1: '',
      step2: '',
      step3: '',
      step4: '',
      step5: '',
      step6: '',
      step7: '',
      step8: '',
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
      date: []
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
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.repositoryId = val.repositoryName
      this.getemplist.repositoryId = val.id
    },
    clearrep() {
      this.getemplist.repositoryId = this.$store.getters.repositoryId
      this.repositoryId = ''
    },
    clickRow(val) {
      if (val.judgeStat === 0) {
        this.$refs.table.toggleRowSelection(val)
      }
    },
    handleMyReceipt1(val) {
      console.log(val)
      this.$store.dispatch('getempcontract2', val)
      this.$router.push('/SaleOut/AddSaleOut')
    },
    handleMyReceipt2(val) {
      console.log(val)
      this.$store.dispatch('getempcontract', val)
      this.$router.push('/CustomerMarketing/AddCustomerChat')
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
      checkReceiptOpportunity(row.opportunityNumber).then(res => {
        if (res.data.ret === 200) {
          console.log('res.data.data', res.data.data)
          this.contorlstep4(res.data.data.opportunityStat)
          this.contorlstep5(res.data.data.orderStat)
          this.contorlstep6(res.data.data.outStat)
          this.contorlstep7(res.data.data.deliverStat)
          this.contorlstep8(res.data.data.finishStat)
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
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
    getlist() {
      // 物料需求计划列表数据
      this.listLoading = true
      saleopportunityGetList(this.getemplist).then(res => {
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
      saleopportunityGetList(this.getemplist).then(res => {
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
      const parms = {
        id: row.id,
        repositoryId: 0,
        pageNum: 1,
        pageSize: 10
      }
      saleopportunitylist(parms).then(res => {
        if (res.data.ret === 200) {
          console.log(row)
          this.editVisible = true
          this.personalForm = Object.assign({}, res.data.data.content.list[0])
          this.personalForm.sourceType = String(res.data.data.content.list[0].sourceType)
          if (res.data.data.content.list[0].currency !== null) {
            this.personalForm.currency = String(res.data.data.content.list[0].currency)
          }
          if (res.data.data.content.list[0].customerType !== null) {
            this.personalForm.customerType = String(res.data.data.content.list[0].customerType)
          }
          if (res.data.data.content.list[0].isSale !== null) {
            this.personalForm.isSale = String(res.data.data.content.list[0].isSale)
          }
        }
      })
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
      const parms = {
        id: row.id,
        repositoryId: 0,
        pageNum: 1,
        pageSize: 10
      }
      saleopportunitylist(parms).then(res => {
        if (res.data.ret === 200) {
          this.detailvisible = true
          this.personalForm = Object.assign({}, res.data.data.content.list[0])
        }
      })
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
    //     updateSaleOpportunity2(parms).then(res => {
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
    //       updateSaleOpportunity2(parms).then(res => {
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
          deletesaleopportunity(ids, this.$store.getters.userId).then(res => {
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
        deletesaleopportunity(row.id, this.$store.getters.userId).then(res => {
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
      this.$router.push('/SaleOpportunity/AddSaleOpportunity')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'SaleOpportunityName', 'SaleOpportunityShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
