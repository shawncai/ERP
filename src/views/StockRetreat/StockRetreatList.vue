<template>
  <div class="ERP-container">
    <el-card :body-style="{ padding: '10px' }" class="box-card" style="margin-top: 10px" shadow="never">
      <el-input v-model="getemplist.title" :placeholder="$t('StockRetreat.title')" size="mini" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.number" :placeholder="$t('updates.djbh')" size="mini" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="stockPersonId" :placeholder="$t('StockRetreat.stockPersonId')" size="mini" class="filter-item" clearable @keyup.enter.native="handleFilter" @clear="restFilter2" @focus="handlechooseStock"/>
      <my-emp :control.sync="stockControl" @stockName="stockName"/>
      <el-popover
        v-model="visible2"
        placement="bottom"
        width="500"
        trigger="click">
        <el-select v-model="getemplist.deptId" :placeholder="$t('updates.dept')" size="mini" clearable style="width: 40%;float: left;margin-left: 20px">
          <el-option
            v-for="(item, index) in depts"
            :key="index"
            :value="item.id"
            :label="item.deptName"/>
        </el-select>
        <el-input v-model="supplierId" placeholder="供应商" size="mini" style="width: 40%;float: right;margin-right: 20px;" clearable @focus="handlechoose" @clear="restFilter"/>
        <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
        <el-select v-model="getemplist.receiptStat" :value="getemplist.receiptStat" :placeholder="$t('updates.djzt')" size="mini" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
          <el-option :label="$t('updates.zd')" value="1"/>
          <el-option :label="$t('updates.zx')" value="2"/>
          <el-option :label="$t('updates.jd')" value="3"/>
        </el-select>
        <el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" :placeholder="$t('updates.spzt')" size="mini" clearable style="width: 40%;float: right;margin-right: 20px;margin-top: 20px">
          <el-option :label="$t('updates.wsh')" value="0"/>
          <el-option :label="$t('updates.shz')" value="1"/>
          <el-option :label="$t('updates.shtg')" value="2"/>
          <el-option :label="$t('updates.shptg')" value="3"/>
        </el-select>
        <el-select v-model="getemplist.sourceType" :value="getemplist.sourceType" :placeholder="$t('StockRetreat.sourceType')" size="mini" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
          <el-option label="采购到货单" value="1"/>
          <el-option label="采购入库单" value="2"/>
        </el-select>
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button v-waves class="filter-item" size="mini" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>
      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['104-118-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['104-118-6']" v-waves :loading="downloadLoading" class="filter-item" size="mini" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['104-118-7']" v-waves class="filter-item" icon="el-icon-printer" size="mini" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['104-118-1']" v-waves class="filter-item" icon="el-icon-plus" size="mini" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </el-card>

    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :key="tableKey"
        :data="list"
        :height="tableHeight"
        border
        size="small"
        fit
        highlight-current-row
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          :selectable="selectInit"
          type="selection"
          width="55"
          fixed="left"
          align="center"/>
        <el-table-column :label="$t('public.id')" :resizable="false" fixed="left" align="center" min-width="150" sortable>
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.number }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="personalForm" @rest="refreshlist"/>
        </el-table-column>
        <el-table-column :label="$t('StockRetreat.supplierId')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.supplierName }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('StockRetreat.stockPersonId')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.stockPersonName }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('StockRetreat.retreatRepositoryId')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.retreatRepositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRetreat.retreatDate')" :resizable="false" fixed="left" align="center" min-width="150" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.retreatDate }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('update4.createDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createDate }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('StockRetreat.retreatRepositoryId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.retreatRepositoryName }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column :label="$t('StockArrival.presentdata')" :resizable="false" fixed="left" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('updates.ys')" :resizable="false" fixed="left" align="center" min-width="75">
          <template slot-scope="scope">
            <span>{{ scope.row.color }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('updates.thsl')" :resizable="false" fixed="left" align="center" min-width="75">
          <template slot-scope="scope">
            <span>{{ scope.row.retreatQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Hmodule.dw')" :resizable="false" fixed="left" align="center" min-width="75">
          <template slot-scope="scope">
            <span>{{ scope.row.unit }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column :label="$t('StockRetreat.allRetreatMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.allRetreatMoney }}</span>
          </template>
        </el-table-column> -->
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
            <el-button v-permission2="['104-118-3', scope.row.createPersonId]" v-show="scope.row.judgeStat === 0&&scope.row.receiptStat === 1" :key="scope.row.id + Math.random()" :title="$t('updates.xg')" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
            <el-button v-permission="['104-118-76']" v-show="isReview4(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.fsp')" type="warning" size="mini" circle @click="handleReview4(scope.row)"><svg-icon icon-class="fanhui"/></el-button>
            <el-button v-permission="['104-118-16']" v-show="isReview2(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.jd')" type="success" size="mini" icon="el-icon-check" circle @click="handleReview2(scope.row)"/>
            <el-button v-permission="['104-118-17']" v-show="isReview3(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.fjd')" type="success" size="mini" icon="el-icon-back" circle @click="handleReview3(scope.row)"/>
            <el-button v-permission2="['104-118-2', scope.row.createPersonId]" v-show="scope.row.judgeStat === 0&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :key="scope.row.id + Math.random()" :title="$t('updates.sc')" scope-row-create-person-id- size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
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
import { searchstockRetreat, deletestockRetreat, updatestockRetreat2, stockRetreatgetList } from '@/api/StockRetreat'
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
  name: 'StockRetreatList',
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
        1: _that.$t('updates.cgdhd'),
        2: _that.$t('inventorychangelist.stockEnter'),
        4: _that.$t('Hmodule.Nosource')
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
    getSpanArr(data) {
      this.spanArr = []
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].stockRetreatId === data[i - 1].stockRetreatId) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
      console.log('this.spanArr=================', this.spanArr)
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      const _row = this.spanArr[rowIndex]
      const _col = _row > 0 ? 1 : 0
      if (columnIndex !== 3 && columnIndex !== 4 && columnIndex !== 5 && columnIndex !== 6) {
        return {
          rowspan: _row,
          colspan: _col
        }
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
        updatestockRetreat2(parms).then(res => {
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
    // 判断反结单按钮
    isReview3(row) {
      console.log(row)
      if (row.receiptStat === 3) {
        return true
      }
    },
    // 反结单操作123
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
        updatestockRetreat2(parms).then(res => {
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
        updatestockRetreat2(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: this.$t('prompt.jdcg')
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
      stockRetreatgetList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          // const needlist = res.data.data.content.list
          // for (let i = 0; i < needlist.length; i++) {
          //   for (let j = 0; j < needlist[i].stockRetreatDetailVos.length; j++) {
          //     needlist[i].stockRetreatDetailVos[j].taxRate = needlist[i].stockRetreatDetailVos[j].taxRate * 100
          //   }
          // }
          // const newarr = needlist.map(item => {
          //   return item.stockRetreatDetailVos
          // })
          // const newarr2 = [].concat.apply([], newarr)
          // const processarr = this._.cloneDeep(newarr2)
          // for (const i in needlist) {
          //   for (const j in processarr) {
          //     if (needlist[i].id === processarr[j].stockRetreatId) {
          //       processarr[j].taxRate = needlist[i].taxRate
          //       processarr[j].number = needlist[i].number
          //       processarr[j].acceptAddress = needlist[i].acceptAddress
          //       processarr[j].allMoney = needlist[i].allMoney
          //       processarr[j].allQuantity = needlist[i].allQuantity
          //       processarr[j].allRetreatMoney = needlist[i].allRetreatMoney
          //       processarr[j].allTaxMoney = needlist[i].allTaxMoney
          //       processarr[j].approvalUseVos = needlist[i].approvalUseVos
          //       processarr[j].countryId = needlist[i].countryId
          //       processarr[j].createDate = needlist[i].createDate
          //       processarr[j].createPersonId = needlist[i].createPersonId
          //       processarr[j].createPersonName = needlist[i].createPersonName
          //       processarr[j].currencyId = needlist[i].currencyId
          //       processarr[j].deliveryMode = needlist[i].deliveryMode
          //       processarr[j].deliveryModeName = needlist[i].deliveryModeName
          //       processarr[j].deptId = needlist[i].deptId
          //       processarr[j].deptName = needlist[i].deptName
          //       processarr[j].endDate = needlist[i].endDate
          //       processarr[j].endPersonId = needlist[i].endPersonId
          //       processarr[j].id = needlist[i].id
          //       processarr[j].isVat = needlist[i].isVat
          //       processarr[j].judgeDate = needlist[i].judgeDate
          //       processarr[j].judgePersonId = needlist[i].judgePersonId
          //       processarr[j].judgeStat = needlist[i].judgeStat
          //       processarr[j].modifyDate = needlist[i].modifyDate
          //       processarr[j].modifyPersonId = needlist[i].modifyPersonId
          //       processarr[j].offsetMoney = needlist[i].offsetMoney
          //       processarr[j].otherMoney = needlist[i].otherMoney
          //       processarr[j].payMode = needlist[i].payMode
          //       processarr[j].payModeName = needlist[i].payModeName
          //       processarr[j].receiptPeopleId = needlist[i].receiptPeopleId
          //       processarr[j].receiptStat = needlist[i].receiptStat
          //       processarr[j].retreatDate = needlist[i].retreatDate
          //       processarr[j].retreatRepositoryId = needlist[i].retreatRepositoryId
          //       processarr[j].settleMode = needlist[i].settleMode
          //       processarr[j].settleModeName = needlist[i].settleModeName
          //       processarr[j].sourceNumber = needlist[i].sourceNumber
          //       processarr[j].sourceType = needlist[i].sourceType
          //       processarr[j].stockPersonId = needlist[i].stockPersonId
          //       processarr[j].stockPersonName = needlist[i].stockPersonName
          //       processarr[j].stockRetreatDetailVos = needlist[i].stockRetreatDetailVos
          //       processarr[j].stockTypeId = needlist[i].stockTypeId
          //       processarr[j].stockTypeName = needlist[i].stockTypeName
          //       processarr[j].summary = needlist[i].summary
          //       processarr[j].supplierId = needlist[i].supplierId
          //       processarr[j].supplierName = needlist[i].supplierName
          //       processarr[j].title = needlist[i].title
          //       processarr[j].transportModeId = needlist[i].transportModeId
          //       processarr[j].transportModeName = needlist[i].transportModeName
          //     }
          //   }
          // }
          // this.list = processarr
          // this.getSpanArr(processarr)
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
      this.getlist()
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
      searchstockRetreat(parms).then(res => {
        if (res.data.ret === 200) {
          console.log(res.data.data.content.list[0])
          this.editVisible = true
          this.personalForm = Object.assign({}, res.data.data.content.list[0])
          this.personalForm.sourceType = String(res.data.data.content.list[0].sourceType)
          if (res.data.data.content.list[0].currencyId !== null) {
            this.personalForm.currencyId = String(res.data.data.content.list[0].currencyId)
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
      searchstockRetreat(parms).then(res => {
        if (res.data.ret === 200) {
          console.log(res.data.data.content.list[0])
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
        updatestockRetreat2(parms).then(res => {
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
              updatestockRetreat2(parms).then(res => {
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
      const ids = this.moreaction.map(item => item.id).join()
      if (command === 'delete') {
        this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
          confirmButtonText: this.$t('prompt.qd'),
          cancelButtonText: this.$t('prompt.qx'),
          type: 'warning'
        }).then(() => {
          deletestockRetreat(ids, this.$store.getters.userId).then(res => {
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
        deletestockRetreat(row.id, this.$store.getters.userId).then(res => {
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
      this.$router.push('/StockRetreat/AddStockRetreat')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'StockRetreatName', 'StockRetreatShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
  .filter-container{
    padding: 20px;
    padding-left: 0px;
  }
  .filter-item{
    width: 180px;
    margin-left: 20px;
    padding: 10px 0;
  }
</style>
