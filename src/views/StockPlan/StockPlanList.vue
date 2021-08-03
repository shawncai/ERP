<template>
  <div class="ERP-container">
    <el-card :body-style="{ padding: '5px' }" class="box-card" style="margin-top: 10px" shadow="never">

      <el-input v-model="getemplist.productName" :placeholder="$t('saleBillList.productName')" size="mini" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.planNumber" :placeholder="$t('updates.cgjhbh')" size="mini" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="planPersonId" :placeholder="$t('StockPlan.planPersonId')" size="mini" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechooseStock" @clear="restFilter"/>

      <my-emp :control.sync="stockControl" @stockName="stockName"/>
      <el-popover
        v-model="visible2"
        placement="bottom"
        width="500"
        trigger="click">
        <el-select v-model="getemplist.planDeptId" :placeholder="$t('updates.dept')" clearable size="mini" style="width: 40%;float: left;margin-left: 20px">
          <el-option
            v-for="(item, index) in depts"
            :key="index"
            :value="item.id"
            :label="item.deptName"/>
        </el-select>
        <el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" :placeholder="$t('updates.spzt')" size="mini" clearable style="width: 40%;float: right;margin-right: 20px">
          <el-option :label="$t('updates.wsh')" value="0"/>
          <el-option :label="$t('updates.shz')" value="1"/>
          <el-option :label="$t('updates.shtg')" value="2"/>
          <el-option :label="$t('updates.shptg')" value="3"/>
        </el-select>
        <el-select v-model="getemplist.receiptStat" :value="getemplist.receiptStat" :placeholder="$t('updates.djzt')" size="mini" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
          <el-option :label="$t('updates.zd')" value="1"/>
          <el-option :label="$t('updates.zx')" value="2"/>
          <el-option :label="$t('updates.jd')" value="3"/>
        </el-select>
        <el-date-picker
          v-model="date"
          type="daterange"
          size="mini"
          range-separator="-"
          unlink-panels
          start-placeholder="申请时间"
          end-placeholder="申请时间"
          value-format="yyyy-MM-dd"
          style="margin-top: 20px;margin-left: 20px"/>
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button v-waves class="filter-item" type="primary" style="float: right" round size="mini" @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" type="primary" class="filter-item" size="mini" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>

      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" size="mini" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
    </el-card>
    <el-card :body-style="{ padding: '5px' }" class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" size="mini" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" size="mini" style="width: 140px">
          <el-dropdown-item style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-waves :loading="downloadLoading" class="filter-item" size="mini" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-waves class="filter-item" icon="el-icon-printer" size="mini" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-waves class="filter-item" icon="el-icon-plus" size="mini" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </el-card>

    <el-card :body-style="{ padding: '5px' }" class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :key="tableKey"
        :data="list"
        :height="tableHeight"
        border
        fit
        size="small"
        highlight-current-row
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          :selectable="selectInit"
          type="selection"
          width="40"
          fixed="left"
          align="center"/>
        <el-table-column :label="$t('public.id')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.planNumber }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="personalForm" @rest="refreshlist"/>
        </el-table-column>

        <el-table-column :label="$t('StockPlan.planPersonId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.planPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('collectAndPayDetail.cgck')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.planRepositoryName }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('update4.createDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createDate }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('StockPlan.allMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.allMoney }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('StockPlan.planDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.planDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockApply.stockType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.stockTypeName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockPlan.sourceType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.sourceType | sourceTypeFilter }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('StockPlan.isused')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.isused">已调用</span>
            <span v-else>未调用</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column :label="$t('public.judgeStat')" :resizable="false" prop="judgeStat" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.judgeStat | judgeStatFilter }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column :label="$t('public.receiptStat')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.receiptStat | receiptStatFilter }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button v-permission2="['104-108-3', scope.row.createPersonId]" v-show="scope.row.judgeStat === 0&&scope.row.receiptStat === 1" :key="scope.row.id + Math.random()" :title="$t('updates.xg')" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
            <el-button v-permission="['104-108-76']" v-show="isReview4(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.fsp')" type="warning" size="mini" circle @click="handleReview4(scope.row)"><svg-icon icon-class="fanhui"/></el-button>
            <el-button v-permission="['104-108-16']" v-show="isReview2(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.jd')" type="success" size="mini" icon="el-icon-check" circle @click="handleReview2(scope.row)"/>
            <el-button v-permission="['104-108-17']" v-show="isReview3(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.fjd')" type="success" size="mini" icon="el-icon-back" circle @click="handleReview3(scope.row)"/>
            <el-button v-permission2="['104-108-2', scope.row.createPersonId]" v-show="scope.row.judgeStat === 0&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :key="scope.row.id + Math.random()" :title="$t('updates.sc')" scope-row-create-person-id- size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
            <el-button :title="$t('updates.jc')" size="mini" type="primary" icon="el-icon-sort" circle @click="handleReceipt(scope.row)"/>
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
              <el-step :status="step2" title="采购计划"/>
              <el-step :status="step3" title="采购询价"/>
              <el-step :status="step4" title="采购订单"/>
              <el-step :status="step5" title="采购到货"/>
              <el-step :status="step6" title="质检"/>
              <el-step :status="step7" title="采购入库"/>
              <el-step :status="step8" title="完成"/>
            </el-steps>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { addstockorder } from '@/api/StockOrder'
import { stockplanlist, deletestockplan, updatestockplan2, stockplanGetList } from '@/api/StockPlan'
import { stockorderlist2 } from '@/api/StockOrder'
import { checkReceiptPlan } from '@/api/public'
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
var _that
export default {
  name: 'StockPlanList',
  directives: { waves, permission, permission2 },
  components: { MyDialog, DetailList, MyEmp, Pagination },
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
        1: _that.$t('updates.cgsq'),
        2: _that.$t('updates.cgxq'),
        3: _that.$t('Hmodule.Nosource')
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // 默认表格高度
      tableHeight: 200,
      todaytime: null,
      step1: '',
      step2: '',
      step3: '',
      step4: '',
      step5: '',
      step6: '',
      step7: '',
      step8: '',
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
      receiptVisible: false,
      // 计划人回显
      planPersonId: '',
      // 计划人控制框
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
    this.getdatatime()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  mounted() {
    // this.getlist()
    this.getdatatime()
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
          if (data[i].planId === data[i - 1].planId) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
      // console.log('this.spanArr=================', this.spanArr)
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      const _row = this.spanArr[rowIndex]
      const _col = _row > 0 ? 1 : 0
      if (columnIndex !== 2 && columnIndex !== 3 && columnIndex !== 4 && columnIndex !== 5) {
        return {
          rowspan: _row,
          colspan: _col
        }
      }
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
      this.todaytime = currentdate
    },
    // 判断反审批按钮
    isReview4(row) {
      // console.log(row)
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
        updatestockplan2(parms).then(res => {
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
              type: 'error',
              message: res.data.msg
            })
          }
        })
      })
    },
    // 判断反结单按钮
    isReview3(row) {
      // console.log(row)
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
        updatestockplan2(parms).then(res => {
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
      // console.log(row)
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
        updatestockplan2(parms).then(res => {
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
    contorlstep2(val) {
      if (val === 0) {
        this.step2 = 'wait'
      }
      if (val === 1) {
        this.step2 = 'finish'
      }
      if (val === 2) {
        this.step2 = 'success'
      }
    },
    contorlstep3(val) {
      if (val === 0) {
        this.step3 = 'wait'
      }
      if (val === 1) {
        this.step3 = 'finish'
      }
      if (val === 2) {
        this.step3 = 'success'
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
      checkReceiptPlan(row.planNumber).then(res => {
        if (res.data.ret === 200) {
          console.log('res.data.data', res.data.data)
          this.contorlstep2(res.data.data.planStat)
          this.contorlstep3(res.data.data.inquiryStat)
          this.contorlstep4(res.data.data.orderStat)
          this.contorlstep5(res.data.data.arrivalStat)
          this.contorlstep6(res.data.data.checkStat)
          this.contorlstep7(res.data.data.enterStat)
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
    // 更新采购类型
    updatecountry() {
      this.getlist()
    },
    async getlist() {
      const regionIds = this.$store.getters.regionId
      // 数据待处理
      // 物料需求计划列表数据
      this.listLoading = true
      const needdata = await (stockplanGetList(this.getemplist).then(res => {
        return res
      }))
      this.list = needdata.data.data.content.list
      this.total = needdata.data.data.content.totalCount
      // const newarr = processdata.map(item => {
      //   return item.stockPlanDetailVos
      // })
      // const newarr2 = [].concat.apply([], newarr)
      // const processdata2 = this._.cloneDeep(newarr2)
      // // console.log('newarr2=========', newarr2)
      // for (const i in processdata) {
      //   for (const j in newarr2) {
      //     if (processdata[i].id === processdata2[j].planId) {
      //       processdata2[j].parentid = processdata[i].id
      //       processdata2[j].planNumber = processdata[i].planNumber
      //       processdata2[j].title = processdata[i].title
      //       processdata2[j].stockType = processdata[i].stockType
      //       processdata2[j].planPersonId = processdata[i].planPersonId
      //       processdata2[j].stockDeptId = processdata[i].stockDeptId
      //       processdata2[j].stockPersonId = processdata[i].stockPersonId
      //       processdata2[j].planDate = processdata[i].planDate
      //       processdata2[j].sourceType = processdata[i].sourceType
      //       processdata2[j].totalQuantity = processdata[i].totalQuantity
      //       processdata2[j].allMoney = processdata[i].allMoney
      //       processdata2[j].receiptStat = processdata[i].receiptStat
      //       processdata2[j].judgeStat = processdata[i].judgeStat
      //       processdata2[j].createPersonId = processdata[i].createPersonId
      //       processdata2[j].createDate = processdata[i].createDate
      //       processdata2[j].judgePersonId = processdata[i].judgePersonId
      //       processdata2[j].judgeDate = processdata[i].judgeDate
      //       processdata2[j].endPersonId = processdata[i].endPersonId
      //       processdata2[j].endDate = processdata[i].endDate
      //       processdata2[j].summary = processdata[i].summary
      //       processdata2[j].countryId = processdata[i].countryId
      //       processdata2[j].planRepositoryId = processdata[i].planRepositoryId
      //       processdata2[j].planPersonName = processdata[i].planPersonName
      //       processdata2[j].planRepositoryName = processdata[i].planRepositoryName
      //       processdata2[j].stockDeptName = processdata[i].stockDeptName
      //       processdata2[j].stockPersonName = processdata[i].stockPersonName
      //       processdata2[j].planRepositoryName = processdata[i].planRepositoryName
      //       processdata2[j].createPersonName = processdata[i].createPersonName
      //       processdata2[j].judgePersonName = processdata[i].judgePersonName
      //       processdata2[j].endPersonName = processdata[i].endPersonName
      //       processdata2[j].modifyPersonName = processdata[i].modifyPersonName
      //       processdata2[j].countryName = processdata[i].countryName
      //       processdata2[j].stockTypeName = processdata[i].stockTypeName
      //       processdata2[j].isused = processdata[i].isused
      //       processdata2[j].stockPlanDetailVos = processdata[i].stockPlanDetailVos
      //       processdata2[j].approvalUseVos = processdata[i].approvalUseVos

      //       processdata2[j].allIncludeTaxMoney = processdata[i].allIncludeTaxMoney
      //       processdata2[j].allPlanMoney = processdata[i].allPlanMoney

      //       processdata2[j].allTaxMoney = processdata[i].allTaxMoney
      //     }
      //   }
      // }
      // this.list = processdata2
      // this.getSpanArr(this.list)
      this.listLoading = false
      // console.log('数据数据数据22222222', processdata2)
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
      this.planPersonId = ''
      this.getemplist.planPersonId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      this.getlist()
      // stockplanlist(this.getemplist).then(res => {
      //   if (res.data.ret === 200) {
      //     this.list = res.data.data.content.list
      //     this.total = res.data.data.content.totalCount
      //     // this.restFilter()
      //   } else {
      //     // this.restFilter()
      //   }
      // })
    },
    // 计划人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 计划人回显
    stockName(val) {
      this.planPersonId = val.personName
      this.getemplist.planPersonId = val.id
    },
    // 修改操作
    handleEdit(row) {
      const parms = {
        planId: row.id,
        repositoryId: 0,
        pageNum: 1,
        pageSize: 10
      }

      stockplanlist(parms).then(res => {
        if (res.data.ret === 200) {
          console.log(res.data.data.content.list[0])
          this.editVisible = true
          this.personalForm = Object.assign({}, res.data.data.content.list[0])
          this.personalForm.sourceType = String(res.data.data.content.list[0].sourceType)
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
        planId: row.id,
        repositoryId: 0,
        pageNum: 1,
        pageSize: 10
      }

      stockplanlist(parms).then(res => {
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
        // console.log(approvalUse[approvalUse.length - 1].stepHandler)
        if (index > -1 && (row.judgeStat === 1 || row.judgeStat === 0)) {
          return true
        }
      }
    },
    // 审批操作123
    handleReview(row) {
      var _that = this
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
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
        console.log('row', row)

        updatestockplan2(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: this.$t('prompt.shcg')
            })
            this.getlist()
            console.log('row.stockPlanDetailVos', row.stockPlanDetailVos)
            const arr = row.stockPlanDetailVos
            // var b = {}
            // var c = []
            // row.stockPlanDetailVos.forEach(v => {
            //   !b[v.supplierId] ? (b[v.supplierId] = [v]) : b[v.supplierId].push(v)
            // })
            // console.log('b', b)
            // var i = 0
            // for (var o in b) {
            //   c[i] = {
            //     'supplierId': o,
            //     'oarr': b[o]
            //   }
            //   i++
            // }
            // console.log('c', c)
            var jmap = {}
            var c = []

            arr.forEach(function(al) {
              var key = al.supplierId + '_' + al.planDeliveryDate
              if (typeof jmap[key] === 'undefined') {
                jmap[key] = []
              }
              jmap[key].push(al)
            })

            var keys = Object.keys(jmap)
            for (var i = 0; i < keys.length; i++) {
              var rs = keys[i].split('_')
              c.push({ supplierId: rs[0], planDeliveryDate: rs[1], oarr: jmap[keys[i]] })
            }
            console.log('c', c)
            for (const z in c) {
              console.log('c[z]', c[z])
              const arr = []
              for (const k in c[z].oarr) {
                let orderQuantity = 0
                if (c[z].oarr[k].orderQuantity === null) {
                  orderQuantity = 0
                } else {
                  orderQuantity = c[z].oarr[k].orderQuantity
                }
                const stockorderparms2 = {
                  productCode: c[z].oarr[k].productCode,
                  productName: c[z].oarr[k].productName,
                  productType: c[z].oarr[k].productType,
                  typeName: c[z].oarr[k].productType,
                  type: c[z].oarr[k].typeId,
                  color: c[z].oarr[k].color,
                  unit: c[z].oarr[k].unit,
                  planQuantity: c[z].oarr[k].planQuantity,
                  orderQuantity: orderQuantity,
                  deliveryDate: c[z].oarr[k].planDeliveryDate,
                  applicationReason: c[z].oarr[k].applyReason,
                  sourceNumber: row.planNumber,
                  sourceSerialNumber: c[z].oarr[k].id,
                  remark: 0,
                  discountRate: 0,
                  discountMoney: 0,
                  arrivalQuantity: 0,
                  price: c[z].oarr[k].basicPrice,
                  includeTaxPrice: c[z].oarr[k].includeTaxPrice,
                  supplierId: c[z].oarr[k].supplierId,
                  returnQuantity: 0,
                  tax: Number(c[z].oarr[k].planQuantity) * Number(c[z].oarr[k].includeTaxPrice) - Number(c[z].oarr[k].planQuantity) * Number(c[z].oarr[k].basicPrice),
                  actualArrivalQuantity: 0,
                  stockQuantity: c[z].oarr[k].planQuantity,
                  taxRate: Number(c[z].oarr[k].taxRate) / 100,
                  money: Number(c[z].oarr[k].planQuantity) * Number(c[z].oarr[k].basicPrice),
                  includeTaxMoney: Number(c[z].oarr[k].planQuantity) * Number(c[z].oarr[k].includeTaxPrice),
                  typeId: c[z].oarr[k].typeId
                }
                arr.push(stockorderparms2)
              }
              const stockorderparms1 = {
                title: '自动生成采购订单',
                stockRepositoryId: row.planRepositoryId,
                stockPersonId: row.planPersonId,
                createPersonId: row.planPersonId,
                countryId: this.$store.getters.countryId,
                repositoryId: this.$store.getters.repositoryId,
                regionId: this.$store.getters.regionId,
                isVat: 1,
                settleMode: 4,
                sourceType: '2',
                currency: '3',
                orderDate: this.todaytime,
                deptId: this.$store.getters.deptId,
                exchangeRate: '1.0000',
                supplierId: c[z].supplierId,
                stockTypeId: row.stockType
              }
              const orderparms = JSON.stringify(stockorderparms1)

              const parms2 = JSON.stringify(arr)
              console.log('arr', arr)
              console.log('stockorderparms1', stockorderparms1)
              setTimeout(function() {
                addstockorder(orderparms, parms2, stockorderparms1).then(res => {
                  if (res.data.ret === 200) {
                    loading.close()
                    _that.$notify({
                      title: 'successful',
                      message: 'save successful',
                      type: 'success',
                      offset: 100
                    })
                  }
                })
              }, z * 500)
            }
            loading.close()
          } else {
            loading.close()
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
              updatestockplan2(parms).then(res => {
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
          deletestockplan(ids, this.$store.getters.userId).then(res => {
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
        deletestockplan(row.id, this.$store.getters.userId).then(res => {
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
      this.$router.push('/StockPlan/AddStockPlan')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['parentid', 'StockPlanName', 'StockPlanShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
