<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">

      <el-input v-model="getemplist.title" :placeholder="$t('CheckReport.title')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="getemplist.reportNumber" :placeholder="$t('updates.bgbh')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="inspectionPersonId" :placeholder="$t('CheckReport.inspectionPersonId')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechooseStock" @clear="restFilter2"/>

      <el-input v-model="getemplist.sourceNumber" :placeholder="$t('LogisticsCar.sourcenumber')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <my-emp :control.sync="stockControl" @stockName="stockName"/>

      <el-popover
        v-model="visible2"
        size="small"
        placement="bottom"
        width="500"
        trigger="click">
        <el-select v-model="getemplist.inspectionDeptId" size="small" placeholder="报检部门" clearable style="width: 40%;float: left;margin-left: 20px">
          <el-option
            v-for="(item, index) in depts"
            :key="index"
            :value="item.id"
            :label="item.deptName"/>
        </el-select>
        <el-input v-model="supplierId" size="small" placeholder="供应商" style="width: 40%;float: right;margin-right: 20px;" clearable @clear="restFilter3" @focus="handlechoose"/>
        <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
        <el-select v-model="personalForm.checkType" size="small" placeholder="质检类型" style="width: 40%;float: right;margin-right: 20px;margin-top: 20px">
          <el-option value="1" label="来料质检"/>
          <el-option value="2" label="送样质检"/>
          <el-option value="3" label="生产质检"/>
        </el-select>
        <el-select v-model="getemplist.checkMode" :value="getemplist.checkMode" size="small" placeholder="检验方式" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
          <el-option value="1" label="抽样"/>
        </el-select>
        <el-date-picker
          v-model="date"
          type="daterange"
          size="mini"
          range-separator="-"
          unlink-panels
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          style="margin-top: 20px;margin-left: 20px"/>
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button v-waves size="small" class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>

      <!-- 搜索按钮 -->
      <el-button v-waves size="small" class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card :body-style=" { padding: '6px'}" class="box-card" shadow="never">
      <!-- 批量操作132 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" size="small" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
          <el-dropdown-item style="text-align: left" command="review"><svg-icon icon-class="renwu" style="width: 40px"/>{{ $t('public.review') }}</el-dropdown-item>
          <el-dropdown-item v-permission="['227-231-17']" style="text-align: left" command="reverse"><svg-icon icon-class="zuzhuang" style="width: 40px"/>{{ $t('updates.fjd') }}</el-dropdown-item>
          <el-dropdown-item v-permission="['227-231-76']" style="text-align: left" command="antiaudit"><svg-icon icon-class="zhinengbuhuo" style="width: 40px"/>{{ $t('updates.fsp') }}</el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['227-231-6']" v-waves :loading="downloadLoading" class="filter-item2" size="small" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['227-231-7']" v-waves class="filter-item2" size="small" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['227-231-1']" v-waves class="filter-item2" size="small" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </el-card>

    <el-card :body-style="	{ padding: '10px' }" class="box-card" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :height="tableHeight"
        :key="tableKey"
        :data="list"
        size="small"
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
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.reportNumber }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="personalForm"/>
        </el-table-column>
        <el-table-column :label="$t('CheckReport.title')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CheckReport.checkResult')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.checkResult | checkResultFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CheckReport.sourceType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.sourceType | sourceTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CheckReport.productName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CheckReport.color')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.color }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CheckReport.supplierId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.supplierName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CheckReport.checkType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.checkType | checkTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CheckReport.checkMode')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.checkMode | checkModeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CheckReport.inspectionPersonId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.inspectionPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CheckReport.inspectionDeptId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.inspectionDeptName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CheckReport.checkDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.checkDate }}</span>
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
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button v-permission2="['227-231-3', scope.row.createPersonId]" v-show="scope.row.judgeStat === 0&&scope.row.receiptStat === 1" :title="$t('updates.xg')" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
            <el-button v-show="isReview(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.spi')" type="warning" size="mini" icon="el-icon-view" circle @click="handleReview(scope.row)"/>
            <el-button v-permission="['227-231-76']" v-show="isReview4(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.fsp')" type="warning" size="mini" circle @click="handleReview4(scope.row)"><svg-icon icon-class="fanhui"/></el-button>
            <el-button v-permission="['227-231-16']" v-show="isReview2(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.jd')" type="success" size="mini" icon="el-icon-check" circle @click="handleReview2(scope.row)"/>
            <el-button v-permission="['227-231-17']" v-show="isReview3(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.fjd')" type="success" size="mini" icon="el-icon-back" circle @click="handleReview3(scope.row)"/>
            <el-button v-permission2="['227-231-2', scope.row.createPersonId]" v-show="scope.row.judgeStat === 0&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.sc')" size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
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
import { checkreportlist, updatecheckreport2, deletecheckreport } from '@/api/CheckReport'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import MyEmp from './components/MyEmp'
import DetailList from './components/DetailList'
import MyDialog from './components/MyDialog'
import MySupplier from './components/MySupplier'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数

var _that
export default {
  name: 'CheckReportList',
  directives: { waves, permission, permission2 },
  components: { MyDialog, DetailList, MyEmp, Pagination, MySupplier },
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
    sourceTypeFilter(status) {
      const statusMap = {
        1: _that.$t('updates.zjsqd'),
        2: _that.$t('updates.cgdhd'),
        3: _that.$t('updates.zscrw'),
        4: '外包单'
      }
      return statusMap[status]
    },
    checkResultFilter(status) {
      const statusMap = {
        1: _that.$t('updates.pass'),
        2: _that.$t('updates.unpass')
      }
      return statusMap[status]
    },
    checkTypeFilter(status) {
      const statusMap = {
        1: '来料质检',
        2: '送样质检',
        3: '生产质检'
      }
      return statusMap[status]
    },
    checkModeFilter(status) {
      const statusMap = {
        1: '抽样'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableHeight: 200,

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
      // 报检员回显
      inspectionPersonId: '',
      // 报检员控制框
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
    clickRow(val) {
      if (val.judgeStat === 0) {
        this.$refs.table.toggleRowSelection(val)
      }
    },
    // 判断反审批按钮
    isReview4(row) {
      console.log(row)
      if (row.judgeStat === 2 && row.receiptStat === 2) {
        return true
      }
    },
    // 反结单操作
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
        updatecheckreport2(parms).then(res => {
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
            this.$message({
              type: 'success',
              message: this.$t('prompt.fspcg')
            })
          }
        })
      })
    },
    // 判断反结单按钮
    isReview3(row) {
      console.log(row)
      if (row.receiptStat === 3) {
        return true
      }
    },
    // 反结单操作
    handleReview3(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.endPersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qfjd'), this.$t('prompt.fjd'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.fjd'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.receiptStat = 2
        const parms = JSON.stringify(this.reviewParms)
        updatecheckreport2(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: this.$t('prompt.fjdcg')
            })
            this.getlist()
          }
        })
      })
    },
    // 判断结单按钮
    isReview2(row) {
      console.log(row)
      if (row.receiptStat !== 3 && (row.judgeStat === 2 || row.judgeStat === 3)) {
        return true
      }
    },
    // 结单操作
    handleReview2(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.endPersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qjd'), this.$t('prompt.jd'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.jd'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.receiptStat = 3
        const parms = JSON.stringify(this.reviewParms)
        updatecheckreport2(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: this.$t('prompt.jdcg')
            })
            this.getlist()
          }
        })
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
    // 更新采购类型
    updatecountry() {
      this.getlist()
    },
    getlist() {
      // 物料需求计划列表数据
      this.listLoading = true
      if (this.date === null || this.date === '') {
        this.getemplist.beginTime = null
        this.getemplist.endTime = null
      } else {
        this.getemplist.beginTime = this.date[0]
        this.getemplist.endTime = this.date[1]
      }
      console.log('this.getemplist====', this.getemplist)
      checkreportlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          // this.list = res.data.data.content.list
          this.list = []
          for (const i in res.data.data.content.list) {
            this.list.push(res.data.data.content.list[i])
          }
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
      this.supplierId = ''
      this.getemplist.supplierId = ''
    },
    restFilter2() {
      this.inspectionPersonId = ''
      this.getemplist.inspectionPersonId = ''
    },
    restFilter3() {
      this.supplierId = ''
      this.getemplist.supplierId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      this.getlist()
      // checkreportlist(this.getemplist).then(res => {
      //   if (res.data.ret === 200) {
      //     this.list = res.data.data.content.list
      //     this.total = res.data.data.content.totalCount
      //     // this.restFilter()
      //   } else {
      //     // this.restFilter()
      //   }
      // })
    },
    // 报检员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 报检员回显
    stockName(val) {
      this.inspectionPersonId = val.personName
      this.getemplist.inspectionPersonId = val.id
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
      if (row.checkType !== null) {
        this.personalForm.checkType = String(row.checkType)
      }
      if (row.checkMode !== null) {
        this.personalForm.checkMode = String(row.checkMode)
      }
      if (row.checkResult !== null) {
        this.personalForm.checkResult = String(row.checkResult)
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
      this.$confirm(this.$t('prompt.qsh'), this.$t('prompt.sh'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.tg'),
        cancelButtonText: this.$t('prompt.btg'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.judgeStat = 2
        const parms = JSON.stringify(this.reviewParms)
        updatecheckreport2(parms).then(res => {
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
              updatecheckreport2(parms).then(res => {
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
      const canfjd = this.moreaction.filter(item => {
        return item.receiptStat === 3
      })
      const canfsp = this.moreaction.filter(item => {
        return (item.judgeStat === 2 || item.judgeStat === 3)
      })
      console.log('canfjd', canfjd)
      const ids = this.moreaction.length && this.moreaction.map(item => item.id).join()

      if (command === 'antiaudit') {
        this.$confirm(this.$t('prompt.qfsp'), this.$t('prompt.fsp'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('prompt.fsp'),
          type: 'warning'
        }).then(() => {
          for (const i in canfsp) {
            const parms = {}
            parms.id = canfsp[i].id
            parms.endPersonId = this.$store.getters.userId
            parms.judgeStat = 0
            const sendparms = JSON.stringify(parms)
            updatecheckreport2(sendparms).then(res => {
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
                this.$message({
                  type: 'success',
                  message: this.$t('prompt.fspcg')
                })
              }
            })
          }
        })
      }

      if (command === 'reverse') {
        this.$confirm(this.$t('prompt.qfjd'), this.$t('prompt.fjd'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('prompt.fjd'),
          type: 'warning'
        }).then(() => {
          for (const i in canfjd) {
            const parms = {}
            parms.id = canfjd[i].id
            parms.endPersonId = this.$store.getters.userId
            parms.receiptStat = 2
            const sendparms = JSON.stringify(parms)
            updatecheckreport2(sendparms).then(res => {
              if (res.data.ret === 200) {
                this.$message({
                  type: 'success',
                  message: this.$t('prompt.fjdcg')
                })
                this.getlist()
              }
            })
          }
        })
      }
      if (command === 'delete') {
        this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
          confirmButtonText: this.$t('prompt.qd'),
          cancelButtonText: this.$t('prompt.qx'),
          type: 'warning'
        }).then(() => {
          deletecheckreport(ids, this.$store.getters.userId).then(res => {
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
      if (command === 'review') {
        this.reviewParms = {}
        this.reviewParms.judgePersonId = this.$store.getters.userId
        this.$confirm(this.$t('prompt.qsh'), this.$t('prompt.sh'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('prompt.tg'),
          cancelButtonText: this.$t('prompt.btg'),
          type: 'warning'
        }).then(() => {
          this.reviewParms.judgeStat = 2
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].judgeStat !== 0) {
              this.$message.error(`第${i + 1}条数据已经审核`)
              continue
            }
            if (this.list[i].approvalUseVos !== '' && this.list[i].approvalUseVos !== null && this.list[i].approvalUseVos !== undefined && this.list[i].approvalUseVos.length !== 0) {
              const approvalUse = this.list[i].approvalUseVos
              const index = approvalUse[approvalUse.length - 1].stepHandler.indexOf(',' + this.$store.getters.userId + ',')
              console.log(approvalUse[approvalUse.length - 1].stepHandler)
              console.log(index)
              if (!(index > -1 && (this.list[i].judgeStat === 1 || this.list[i].judgeStat === 0))) {
                this.$message.error(`第${i + 1}条数据无权审核`)
                continue
              }
            }
            this.reviewParms.id = this.list[i].id
            const parms = JSON.stringify(this.reviewParms)
            updatecheckreport2(parms).then(res => {
              if (res.data.ret === 200) {
                this.$message({
                  type: 'success',
                  message: this.$t('prompt.shcg')
                })
                this.getlist()
              }
            }).catch(err => {
              this.$message.error(err)
              return false
            })
          }
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
                for (let i = 0; i < this.list.length; i++) {
                  if (this.list[i].judgeStat !== 0) {
                    this.$message.error(`第${i + 1}条数据已经审核`)
                    continue
                  }
                  if (this.list[i].approvalUseVos !== '' && this.list[i].approvalUseVos !== null && this.list[i].approvalUseVos !== undefined && this.list[i].approvalUseVos.length !== 0) {
                    const approvalUse = this.list[i].approvalUseVos
                    const index = approvalUse[approvalUse.length - 1].stepHandler.indexOf(',' + this.$store.getters.userId + ',')
                    console.log(approvalUse[approvalUse.length - 1].stepHandler)
                    console.log(index)
                    if (!(index > -1 && (this.list[i].judgeStat === 1 || this.list[i].judgeStat === 0))) {
                      this.$message.error(`第${i + 1}条数据无权审核`)
                      continue
                    }
                  }
                  this.reviewParms.id = this.list[i].id
                  const parms = JSON.stringify(this.reviewParms)
                  updatecheckreport2(parms).then(res => {
                    if (res.data.ret === 200) {
                      this.$message({
                        type: 'success',
                        message: this.$t('prompt.shcg')
                      })
                      this.getlist()
                    }
                  })
                }
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
      }
    },
    // 单条删除
    handleDelete(row) {
      this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
        confirmButtonText: this.$t('prompt.qd'),
        cancelButtonText: this.$t('prompt.qx'),
        type: 'warning'
      }).then(() => {
        deletecheckreport(row.id, this.$store.getters.userId).then(res => {
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
      this.$router.push('/CheckReport/AddCheckReport')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['质检报告单号', '报检人员', '检验人员', '检验部门', '源单编号', '检验日期', '物品编号', '物品名称', '单位', '报检数量', '抽样数量', '合格数量', '不合格数量', '合格率']
          const filterVal = ['reportNumber', 'inspectionPersonName', 'checkPersonName', 'checkDeptName', 'sourceNumber', 'checkDate', 'productCode', 'productName', 'unit', 'checkQuantity', 'sampleQuantity', 'passQuantity', 'failedQuantity', 'passRate']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '质检报告表'
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
