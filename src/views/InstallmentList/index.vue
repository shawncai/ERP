<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px;height: 60px" shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" label-width="100px" style="margin-top: -9px">
          <el-col :span="5">
            <el-form-item label="客户姓名" label-width="100px">
              <el-input v-model="getemplist.customerName" :placeholder="$t('InstallmentList.customerName')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left: 10px">
            <el-form-item label="电话">
              <el-input v-model="getemplist.customerPhone" placeholder="电话" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="分期申请编号" label-width="100px">
              <el-input v-model="getemplist.applyNumber" :placeholder="$t('InstallmentList.applyNumber')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <!--更多搜索条件-->
          <!-- <el-col :span="3">
            <el-popover
              v-model="visible2"
              placement="bottom"
              width="500"
              trigger="click">
              <el-select v-model="getemplist.receiptStat" :value="getemplist.receiptStat" placeholder="单据状态" clearable style="width: 40%;float: left;margin-left: 20px">
                <el-option value="1" label="制单"/>
                <el-option value="2" label="执行"/>
                <el-option value="3" label="结单"/>
              </el-select>
              <el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" placeholder="审批状态" clearable style="width: 40%;float: right;margin-right: 20px">
                <el-option value="0" label="未审核"/>
                <el-option value="1" label="审核中"/>
                <el-option value="2" label="审核通过"/>
                <el-option value="3" label="审核不通过"/>
              </el-select>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="-"
          unlink-panels
          start-placeholder="销售日期"
          end-placeholder="销售日期"
          value-format="yyyy-MM-dd"
          style="margin-top: 20px;margin-left: 20px"/>
          <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
            <el-button v-waves class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>
          </div>
          <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
            </el-popover>
          </el-col> -->
          <el-col :span="3" style="margin-left: 20px"> -->
            <!-- 搜索按钮 -->
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
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
      <el-button v-permission="['200-203-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['200-203-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <!--<el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>-->
    </el-card>

    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <h2 ref="fenqi" class="form-name">分期列表</h2>
      <div class="container">
        <!-- 列表开始 -->
        <el-table
          v-loading="listLoading"
          :key="tableKey"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%;"
          @current-change="getPayPlan"
        >
          <el-table-column
            type="selection"
            width="55"
            fixed="left"
            align="center"/>
          <el-table-column :label="$t('public.id')" :resizable="false" fixed="left" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.orderNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.customerName')" :resizable="false" fixed="left" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.customerName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.customerPhone')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.customerPhone }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.address')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.productCode')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.productCode }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.productName')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.productName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.count')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.count }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.paidCount')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.paidCount }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.isChange')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.isChange | isChangeFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.afterCount')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.afterCount }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column :label="$t('InstallmentList.afterRate')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.afterRate }}</span>
            </template>
          </el-table-column> -->
          <el-table-column :label="$t('InstallmentList.leftAllmoney')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.leftAllmoney }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.installmentMoney')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.installmentMoney }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.leftMoney')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.leftMoney }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column :label="$t('InstallmentList.leftMoney')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.leftMoney }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.Interest')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.totalMoney - scope.row.installmentMoney }}</span>
            </template>
          </el-table-column> -->
          <!-- <el-table-column :label="$t('public.judgeStat')" :resizable="false" prop="judgeStat" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.judgeStat | judgeStatFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.receiptStat')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.receiptStat | receiptStatFilter }}</span>
          </template>
        </el-table-column> -->
          <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
            <template slot-scope="scope">
              <el-button v-permission2="['200-203-3', scope.row.createPersonId]" v-show="scope.row.judgeStat === 0" title="修改" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
              <el-button v-show="isReview(scope.row)" title="审批" type="warning" size="mini" icon="el-icon-view" circle @click="handleReview(scope.row)"/>
              <el-button v-permission2="['200-203-2', scope.row.createPersonId]" v-show="scope.row.judgeStat === 0" title="删除" size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
              <el-button v-permission="['200-203-59']" v-show="scope.row.stat !== 2" type="primary" @click="handleMyReceipt1(scope.row)"><span>改期</span></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 列表结束 -->
        <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <!--修改结束=================================================-->
      </div>
    </el-card>

    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <h2 ref="huankuan" class="form-name">还款计划</h2>
      <!-- 列表开始 -->
      <div class="container">
        <el-table
          v-loading="listLoading"
          :key="tableKey"
          :data="list2"
          :row-class-name="tableRowClassName"
          border
          fit
          highlight-current-row
          style="width: 100%;"
        >
          <el-table-column :label="$t('InstallmentList.count')" :resizable="false" fixed="left" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ `第${scope.row.idx}期` }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.Repaymentdate')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.deadline }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.Currentamount')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.shouldMoney }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.Principal')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.capitalMoney }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.Interest')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.interestMoney }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.reward')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.reward }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.Latefee')" :resizable="false" prop="Latefee" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.penalty }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.pay')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.paidMoney }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.unpay')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.shouldMoney - scope.row.paidMoney }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.collectperson')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.collectPersonName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.actualDate')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.actualDate }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('InstallmentList.status')" :resizable="false" prop="status" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.stat | payFilter }}</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 列表结束 -->
        <pagination v-show="total>0" :total="total2" :page.sync="planList.pageNum" :limit.sync="planList.pageSize" :auto-scroll="false" @pagination="pagingPlan"/>
      </div>

    </el-card>
  </div>
</template>

<script>
import { installmentlist } from '@/api/InstallmentList'
import { getdeptlist } from '@/api/BasicSettings'
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

export default {
  name: 'Index',
  directives: { waves, permission, permission2 },
  components: { MyDialog, DetailList, MyEmp, MyCustomer, MyAgent, Pagination },
  filters: {
    isChangeFilter(status) {
      const statusMap = {
        1: '未改期',
        2: '已改期'
      }
      return statusMap[status]
    },
    judgeStatFilter(status) {
      const statusMap = {
        0: '未审核',
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
    payFilter(status) {
      const statusMap = {
        1: '未还',
        2: '已还',
        3: '逾期'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
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
      // 详情组件数据
      detailvisible: false,
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
      // 还款计划表格
      list2: [],
      total2: 0,
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
        regionIds: this.$store.getters.regionId
      },
      // 传给组件的数据
      personalForm: {},
      // 修改控制组件数据
      editVisible: false,
      // 开始时间到结束时间
      date: [],
      planList: {
        pageNum: 1,
        pageSize: 10
      },
      processData: []
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    // 提示逾期
    tableRowClassName({ row, rowIndex }) {
      console.log('状态判断', row)
      if (row.stat === 3) {
        console.log('row.id', row.id)
        return 'warning-row'
      }
      if (row.stat === 2) {
        return 'success-row'
      }
      return ''
    },
    // 深拷贝
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    // 还款计划分页
    pagingPlan() {
      console.log(this.planList)
      const showData = this.processData.slice((this.planList.pageNum - 1) * this.planList.pageSize, this.planList.pageSize * this.planList.pageNum)
      this.list2 = showData
    },
    // 单选获取还款计划
    getPayPlan(val) {
      console.log(val)
      try {
        this.list2 = val.installmentOrderDetailVos
        this.total2 = val.installmentOrderDetailVos.length
        this.processData = this.deepClone(this.list2)
        this.pagingPlan()
      } catch (error) {
        this.list2 = []
      }
    },
    handleMyReceipt1(val) {
      console.log(val)
      this.$store.dispatch('getempcontract', val)
      this.$router.push('/ChangeCount/AddChangeCount')
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
      installmentlist(this.getemplist).then(res => {
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
      this.salePersonId = ''
      this.getemplist.salePersonId = ''
    },
    // 搜索
    handleFilter() {
      this.list2 = []
      this.getemplist.pageNum = 1
      installmentlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          this.restFilter()
        } else {
          this.restFilter()
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
    // // 审批操作
    // handleReview(row) {
    //   this.reviewParms.id = row.id
    //   this.reviewParms.judgePersonId = this.$store.getters.userId
    //   this.$confirm('请审核', '审核', {
    //     distinguishCancelAndClose: true,
    //     confirmButtonText: '通过',
    //     cancelButtonText: '不通过',
    //     type: 'warning'
    //   }).then(() => {
    //     this.reviewParms.judgeStat = 2
    //     const parms = JSON.stringify(this.reviewParms)
    //     updateapply2(parms).then(res => {
    //       if (res.data.ret === 200) {
    //         this.$message({
    //           type: 'success',
    //           message: '审核成功!'
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
    //             message: '审核成功!'
    //           })
    //           this.getlist()
    //         }
    //       })
    //     }
    //   })
    // },
    // // 批量操作
    // handleSelectionChange(val) {
    //   this.moreaction = val
    // },
    // // 多条删除
    // // 批量删除
    // handleCommand(command) {
    //   const ids = this.moreaction.map(item => item.id).join()
    //   if (command === 'delete') {
    //     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       deleteapply(ids).then(res => {
    //         if (res.data.ret === 200) {
    //           this.$notify({
    //             title: '删除成功',
    //             type: 'success',
    //             offset: 100
    //           })
    //           this.getlist()
    //         } else {
    //           this.$notify.error({
    //             title: '错误',
    //             message: '出错了',
    //             offset: 100
    //           })
    //         }
    //       })
    //     }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     })
    //   }
    // },
    // // 单条删除
    // handleDelete(row) {
    //   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     deleteapply(row.id).then(res => {
    //       if (res.data.ret === 200) {
    //         this.$notify({
    //           title: '删除成功',
    //           type: 'success',
    //           offset: 100
    //         })
    //         this.getlist()
    //       } else {
    //         this.$notify.error({
    //           title: '错误',
    //           message: '出错了',
    //           offset: 100
    //         })
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    // 新增数据
    handleAdd() {
      this.$router.push('/InstallmentList/AddInstallmentList')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'InstallmentListName', 'InstallmentListShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
    margin: 0px 10px;
  }
  .container {
    margin-top: 40px;
  }
  .form-name{
      font-size: 18px;
      color: #373e4f;
      margin-bottom: -20px;
      margin-top: 20px;
    }
  .filter-container{
    padding: 20px;
    padding-left: 0px;
  }
  .filter-item{
    width: 140px;
    margin-left: 30px;
  }
  .el-table >>> .warning-row {
    background: #F56C6C;
  }
  .el-table >>> .success-row {
    background: #409EFF;
  }
</style>
