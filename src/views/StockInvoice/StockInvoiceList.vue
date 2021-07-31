<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">

      <el-input v-model="getemplist.number" :placeholder="$t('updates.djbh')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-select v-model="getemplist.isRed" :placeholder="$t('updates.sfhz')" :value="getemplist.isRed" size="small" class="filter-item" clearable >
        <el-option :label="$t('updates.no')" value="1"/>
        <el-option :label="$t('updates.yes')" value="2"/>
      </el-select>

      <el-input v-model="getemplist.sourceNumber" :placeholder="$t('LogisticsCar.sourcenumber')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="getemplist.invoiceNumber" :placeholder="$t('update4.invoiceNumber')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="supplierId" :placeholder="$t('SupplierAdjust.supplierId')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechoose" @clear="clearSupplier"/>

      <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>

      <el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" :placeholder="$t('updates.spzt')" size="small" clearable >
        <el-option :label="$t('updates.wsh')" value="0"/>
        <el-option :label="$t('updates.shz')" value="1"/>
        <el-option :label="$t('updates.shtg')" value="2"/>
        <el-option :label="$t('updates.shptg')" value="3"/>
      </el-select>
      <el-button v-waves class="filter-item" size="small" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card :body-style=" { padding: '6px'}" class="box-card" shadow="never">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" size="small" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['266-257-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
          <el-dropdown-item style="text-align: left" command="review"><svg-icon icon-class="renwu" style="width: 40px"/>{{ $t('public.review') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['266-257-6']" v-waves :loading="downloadLoading" class="filter-item2" size="small" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['266-257-7']" v-waves class="filter-item2" size="small" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['266-257-1']" v-waves class="filter-item2" size="small" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </el-card>

    <el-card :body-style="	{ padding: '10px' }" class="box-card" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :height="tableHeight"
        :key="tableKey"
        :data="list"
        :row-class-name="tableRowClassName"
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
        <el-table-column :label="$t('public.id')" :resizable="false" fixed="left" prop="number" align="center" min-width="150" sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.judgeStat === 0" class="link-type" @click="handleDetail(scope.row)">{{ scope.row.number }}</span>
            <span v-else class="link-type" @click="handleDetail(scope.row)">{{ scope.row.number }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="personalForm" @rest="refreshlist"/>
        </el-table-column>
        <el-table-column :label="$t('StockInvoice.sourceType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.sourceType | sourceTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockInvoice.invoiceNumber')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.invoiceNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockInvoice.supplierId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.supplierName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('saleBillList.money')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.money }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockInvoice.isRed')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.isRed | isRedFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('updates.wbgc')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.factoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockInvoice.createDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockInvoice.payDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.payDate }}</span>
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
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="300px">
          <template slot-scope="scope">
            <el-button v-permission2="['266-257-3', scope.row.createPersonId]" v-show="scope.row.judgeStat === 0&&scope.row.receiptStat === 1" :key="scope.row.id + Math.random()" :title="$t('updates.xg')" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
            <el-button v-permission="['266-257-76']" v-show="isReview4(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.fsp')" type="warning" size="mini" circle @click="handleReview4(scope.row)"><svg-icon icon-class="fanhui"/></el-button>
            <!--            <el-button v-permission="['266-257-16']" v-show="isReview2(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.jd')" type="success" size="mini" icon="el-icon-check" circle @click="handleReview2(scope.row)"/>-->
            <!--            <el-button v-permission="['266-257-17']" v-show="isReview3(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.fjd')" type="success" size="mini" icon="el-icon-back" circle @click="handleReview3(scope.row)"/>-->
            <el-button v-permission2="['266-257-2', scope.row.createPersonId]" v-show="scope.row.judgeStat === 0&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :key="scope.row.id + Math.random()" :title="$t('updates.sc')" scope-row-create-person-id- size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
            <el-button v-show="scope.row.judgeStat === 2 && scope.row.isRed === 1" type="primary" style="width: 125px" @click="handleMyReceipt1(scope.row)"><span style="margin-left: -15px;">生成红字采购发票</span></el-button>
            <el-button v-show="scope.row.judgeStat === 2" type="primary" style="width: 90px" @click="handleMyReceipt2(scope.row)"><span style="margin-left: -15px;">生成付款单</span></el-button>
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
import { stockInvoiceList, deletestockinvoice, updatestockinvoice2, stockInvoiceGetList } from '@/api/StockInvoice'
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
import MySupplier from './components/MySupplier'

var _that
export default {
  name: 'StockInvoiceList',
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
    isRedFilter(status) {
      const statusMap = {
        1: '否',
        2: '是'
      }
      return statusMap[status]
    },
    sourceTypeFilter(status) {
      const statusMap = {
        1: '采购入库',
        2: '委外入库单',
        3: '采购发票',
        4: '采购退货'
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
    tableRowClassName({ row, rowIndex }) {
      if (row.isRed === 2) {
        return 'warning-row'
      }
      return ''
    },
    clickRow(val) {
      if (val.judgeStat === 0) {
        this.$refs.table.toggleRowSelection(val)
      }
    },
    handleMyReceipt2(val) {
      const parms = {
        id: val.id,
        repositoryId: 0,
        pageNum: 1,
        pageSize: 10
      }

      stockInvoiceList(parms).then(res => {
        if (res.data.ret === 200) {
          console.log(res.data.data.content.list[0])
          this.$store.dispatch('getempcontract', res.data.data.content.list[0])
          this.$router.push('/payment/AddPayment')
        }
      })
    },
    handleMyReceipt1(val) {
      const parms = {
        id: val.id,
        repositoryId: 0,
        pageNum: 1,
        pageSize: 10
      }

      stockInvoiceList(parms).then(res => {
        if (res.data.ret === 200) {
          console.log(res.data.data.content.list[0])
          this.$store.dispatch('getempcontract', res.data.data.content.list[0])
          this.$router.push('/Invoice/AddRedStockInvoice')
        }
      })
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
        updatestockinvoice2(parms).then(res => {
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
        updatestockinvoice2(parms).then(res => {
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
        updatestockinvoice2(parms).then(res => {
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
      stockInvoiceGetList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          // for (let i = 0; i < this.list.length; i++) {
          //   for (let j = 0; j < this.list[i].stockInvoiceDetailVos.length; j++) {
          //     console.log('this.list[i].stockInvoiceDetailVos[j]', this.list[i].stockInvoiceDetailVos[j])
          //     this.list[i].stockInvoiceDetailVos[j].taxRate2 = this.list[i].stockInvoiceDetailVos[j].taxRate * 100
          //   }
          // }
          for (const i in this.list) {
            this.list[i].money = (this.list[i].allIncludeTaxMoney - this.list[i].allDiscountMoney).toFixed(2)
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
      this.stockPersonId = ''
      this.getemplist.stockPersonId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      stockInvoiceGetList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          for (const i in this.list) {
            this.list[i].money = (this.list[i].allIncludeTaxMoney - this.list[i].allDiscountMoney).toFixed(2)
          }
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
    clearSupplier() {
      this.supplierId = ''
      this.getemplist.supplierId = ''
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

      stockInvoiceList(parms).then(res => {
        if (res.data.ret === 200) {
          console.log(res.data.data.content.list[0])
          this.personalForm = {}
          this.editVisible = true
          this.personalForm = this._.cloneDeep(res.data.data.content.list[0])
          for (const i in this.personalForm.stockInvoiceDetailVos) {
            this.personalForm.stockInvoiceDetailVos[i].discountRate = Number(this.personalForm.stockInvoiceDetailVos[i].discountRate) * 100
          }
          this.personalForm.sourceType = String(res.data.data.content.list[0].sourceType)
          if (res.data.data.content.list[0].currency !== null) {
            this.personalForm.currency = String(res.data.data.content.list[0].currency)
          }
          if (res.data.data.content.list[0].invoiceType !== null) {
            this.personalForm.invoiceType = String(res.data.data.content.list[0].invoiceType)
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
      const parms = {
        id: row.id,
        repositoryId: 0,
        pageNum: 1,
        pageSize: 10
      }

      stockInvoiceList(parms).then(res => {
        if (res.data.ret === 200) {
          this.personalForm = {}
          console.log(res.data.data.content.list[0])
          this.detailvisible = true
          this.personalForm = this._.cloneDeep(res.data.data.content.list[0])
          for (const i in this.personalForm.stockInvoiceDetailVos) {
            this.personalForm.stockInvoiceDetailVos[i].discountRate = Number(this.personalForm.stockInvoiceDetailVos[i].discountRate) * 100
          }
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
        updatestockinvoice2(parms).then(res => {
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
              updatestockinvoice2(parms).then(res => {
                if (res.data.ret === 200) {
                  this.$message({
                    type: 'success',
                    message: this.$t('prompt.shcg')
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
      const ids = this.moreaction.length && this.moreaction.map(item => item.id).join()
      if (command === 'delete') {
        this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
          confirmButtonText: this.$t('prompt.qd'),
          cancelButtonText: this.$t('prompt.qx'),
          type: 'warning'
        }).then(() => {
          deletestockinvoice(ids, this.$store.getters.userId).then(res => {
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
          for (let i = 0; i < this.moreaction.length; i++) {
            // if (this.moreaction[i].judgeStat !== 0) {
            //   this.$message.error(`第${i + 1}条数据已经审核`)
            //   continue
            // }
            if (this.moreaction[i].approvalUseVos !== '' && this.moreaction[i].approvalUseVos !== null && this.moreaction[i].approvalUseVos !== undefined && this.moreaction[i].approvalUseVos.length !== 0) {
              const approvalUse = this.moreaction[i].approvalUseVos
              const index = approvalUse[approvalUse.length - 1].stepHandler.indexOf(',' + this.$store.getters.userId + ',')
              console.log(approvalUse[approvalUse.length - 1].stepHandler)
              console.log(index)
              if (!(index > -1 && (this.moreaction[i].judgeStat === 1 || this.moreaction[i].judgeStat === 0))) {
                this.$message.error(`第${i + 1}条数据无权审核`)
                continue
              }
            }
            this.reviewParms.id = this.moreaction[i].id
            const parms = JSON.stringify(this.reviewParms)
            updatestockinvoice2(parms).then(res => {
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
                for (let i = 0; i < this.moreaction.length; i++) {
                  // if (this.moreaction[i].judgeStat !== 0) {
                  //   this.$message.error(`第${i + 1}条数据已经审核`)
                  //   continue
                  // }
                  if (this.moreaction[i].approvalUseVos !== '' && this.moreaction[i].approvalUseVos !== null && this.moreaction[i].approvalUseVos !== undefined && this.moreaction[i].approvalUseVos.length !== 0) {
                    const approvalUse = this.moreaction[i].approvalUseVos
                    const index = approvalUse[approvalUse.length - 1].stepHandler.indexOf(',' + this.$store.getters.userId + ',')
                    console.log(approvalUse[approvalUse.length - 1].stepHandler)
                    console.log(index)
                    if (!(index > -1 && (this.moreaction[i].judgeStat === 1 || this.moreaction[i].judgeStat === 0))) {
                      this.$message.error(`第${i + 1}条数据无权审核`)
                      continue
                    }
                  }
                  this.reviewParms.id = this.moreaction[i].id
                  const parms = JSON.stringify(this.reviewParms)
                  updatestockinvoice2(parms).then(res => {
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
        deletestockinvoice(row.id, this.$store.getters.userId).then(res => {
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
      this.$router.push('/Invoice/AddStockInvoice')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'StockInvoiceName', 'StockInvoiceShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
