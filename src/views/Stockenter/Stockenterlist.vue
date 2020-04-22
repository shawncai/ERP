<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">

      <el-input v-model="getemplist.title" :placeholder="$t('Stockenter.title')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.enterNumber" :placeholder="$t('Stockenter.enterNumber')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="deliveryPersonId" :placeholder="$t('Stockenter.deliveryPersonId')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter" @clear="restFilter2" @focus="handlechooseDelivery"/>
      <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
      <el-popover
        v-model="visible2"
        placement="bottom"
        width="500"
        size="small"
        trigger="click">
        <el-input v-model="enterRepositoryId" size="small" placeholder="请选择入库仓库" class="filter-item" clearable style="width: 40%;float: left;margin-left: 20px" @clear="restFilter" @keyup.enter.native="handleFilter" @focus="handlechooseRep"/>
        <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
        <el-input v-model="supplierId" size="small" placeholder="请选择供应商" class="filter-item" clearable style="width: 40%;float: right;margin-right: 20px" @clear="restFilter4" @keyup.enter.native="handleFilter" @focus="handlechooseSupplier"/>
        <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
        <el-input v-model="acceptPersonId" :placeholder="$t('Stockenter.acceptPersonId')" size="small" class="filter-item" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px" @clear="restFilter3" @keyup.enter.native="handleFilter" @focus="handlechooseAccept"/>
        <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
        <el-select v-model="getemplist.enterDeptId" size="small" placeholder="请选择入库部门" clearable style="width: 40%;float: right;margin-right: 20px;margin-top: 28px" @focus="updatedept">
          <el-option
            v-for="(item, index) in depts"
            :key="index"
            :value="item.id"
            :label="item.deptName"/>
        </el-select>
        <el-select v-model="getemplist.judgeStat" size="small" placeholder="请选择审核状态" clearable style="width: 40%;float: right;margin-right: 20px;margin-top: 28px" @focus="updatedept">
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
          start-placeholder="Start"
          end-placeholder="End"
          value-format="yyyy-MM-dd"
          style="margin-top: 20px;margin-left: 20px"/>
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button v-waves size="small" class="filter-item" type="primary" style="float: right" @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" size="small" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card :body-style=" { padding: '6px'}" class="box-card" shadow="never">

      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" size="small" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['131-132-133-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['131-132-133-6']" v-waves :loading="downloadLoading" size="small" class="filter-item2" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['131-132-133-7']" v-waves size="small" class="filter-item2" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['131-132-133-1']" v-waves size="small" class="filter-item2" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </el-card>

    <el-card :body-style=" { padding: '6px'}" class="box-card" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :height="tableHeight"
        :key="tableKey"
        :data="list"
        :span-method="arraySpanMethod"
        size="small"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @row-click="clickRow"
        @selection-change="handleSelectionChange">
        <el-table-column
          :selectable="selectInit"
          type="selection"
          width="40"
          fixed="left"
          align="center"/>
        <el-table-column :label="$t('Stockenter.id')" :resizable="false" fixed="left" prop="id" align="center" width="150">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.enterNumber }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="personalForm"/>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.supplierId')" :resizable="false" fixed="left" prop="title" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.supplierName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockArrival.presentdata')" :resizable="false" fixed="left" align="center" min-width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('updates.ys')" :resizable="false" fixed="left" align="center" min-width="75">
          <template slot-scope="scope">
            <span>{{ scope.row.color }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('updates.rksl')" :resizable="false" fixed="left" align="center" min-width="75">
          <template slot-scope="scope">
            <span>{{ scope.row.actualEnterQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Hmodule.dw')" :resizable="false" fixed="left" align="center" min-width="75">
          <template slot-scope="scope">
            <span>{{ scope.row.unit }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.title')" :resizable="false" fixed="left" prop="title" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('Stockenter.enterNumber')" :resizable="false" prop="sourceNumber" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.enterNumber }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('Stockenter.deliveryPersonId')" :resizable="false" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.deliveryPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.acceptPersonId')" :resizable="false" prop="acceptPersonName" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.acceptPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.enterDeptId')" :resizable="false" prop="deliveryPersonName" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.deliveryPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.endPersonName')" :resizable="false" prop="endPersonName" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.enterPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.endDate')" :resizable="false" prop="endDate" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.enterDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.summary')" :resizable="false" prop="stockEnterDetails" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.summary }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('Stockenter.judgeStat')" :resizable="false" prop="judgeStat" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.judgeStat | judgeStatFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.receiptStat')" :resizable="false" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.receiptStat | receiptStatFilter }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="300">
          <template slot-scope="scope">
            <el-button v-permission="['131-132-133-3']" v-show="scope.row.judgeStat === 0" type="primary" size="mini" @click="handleEdit(scope.row)">{{ $t('public.edit') }}</el-button>
            <el-button v-show="isReview(scope.row)" type="warning" size="mini" @click="handleReview(scope.row)">{{ $t('public.review') }}</el-button>
            <el-button v-permission="['131-132-133-76']" v-show="isReview4(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.fsp')" type="warning" size="mini" circle @click="handleReview4(scope.row)"><svg-icon icon-class="fanhui"/></el-button>
            <el-button v-permission="['131-132-133-101']" v-show="isReview6(scope.row)" type="primary" size="mini" @click="handleReview6(scope.row)">{{ $t('collectAndPayDetail.fjf') }}</el-button>
            <el-button v-permission="['131-132-133-16']" v-show="isReview2(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.jd')" type="success" size="mini" icon="el-icon-check" circle @click="handleReview2(scope.row)"/>
            <el-button v-permission="['131-132-133-17']" v-show="isReview3(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.fjd')" type="success" size="mini" icon="el-icon-back" circle @click="handleReview3(scope.row)"/>
            <el-button v-permission="['131-132-133-2']" v-show="scope.row.judgeStat === 0" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
            <el-button v-permission="['266-373-1']" v-show="scope.row.extraMoney !== null&&scope.row.judgeStat !== ''&&scope.row.judgeStat === 2&&scope.row.stat === 2" type="primary" style="width: 80px" @click="handleMyReceipt1(scope.row)"><span style="margin-left: -5px;">生成凭证</span></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <my-dialog :editcontrol.sync="editVisible" :editdata.sync="personalForm" @rest="refreshlist"/>
      <!--修改结束=================================================-->
    </el-card>
  </div>
</template>

<script>
import { addPurchaseVoucher, stockenterlist, deletestockenter, updatestockenter3, updatestockenter, updateExtra } from '@/api/Stockenter'
import { getdeptlist } from '@/api/BasicSettings'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyDialog from './components/MyDialog'
import MyRepository from './components/MyRepository'
import MySupplier from './components/MySupplier'
import MyEmp from './components/MyEmp'
import MyDelivery from './components/MyDelivery'
import MyAccept from './components/MyAccept'
import MyDetail from './components/MyDetail'
import DetailList from './components/DetailList'

var _that
export default {
  name: 'Stockenterlist',
  directives: { waves, permission, permission2 },
  components: { DetailList, Pagination, MyDialog, MySupplier, MyRepository, MyEmp, MyDelivery, MyAccept, MyDetail },
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
    }
  },
  data() {
    return {
      tableHeight: 200,

      empcontrol: false,
      // 详情组件数据
      detailvisible: false,
      // 更多搜索条件问题
      visible2: false,
      // 入库仓库回显
      enterRepositoryId: '',
      // 仓库选择控制期
      repositorycontrol: false,
      // 验收人回显
      acceptPersonId: '',
      // 验收人控制框
      accetpcontrol: false,
      // 交货人回显
      deliveryPersonId: '',
      // 交货人控制框
      deliverycontrol: false,
      // 部门数据
      depts: [],
      // 采购员控制框
      stockControl: false,
      // 采购员回显
      stockPersonId: '',
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
      // 采购入库单列表查询加展示参数
      getemplist: {
        pagenum: 1,
        pagesize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds
      },
      // 传给组件的数据
      personalForm: {},
      // 控制组件数据
      editVisible: false,
      // 开始时间到结束时间
      date: [],
      supplierId: null
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
          if (data[i].enterId === data[i - 1].enterId) {
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
    clickRow(val) {
      this.$refs.table.toggleRowSelection(val)
    },
    handlechooseSupplier() {
      this.empcontrol = true
    },
    handleMyReceipt1(row) {
      this.$confirm('请确认生成凭证', '确认', {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.qd'),
        type: 'warning'
      }).then(() => {
        addPurchaseVoucher(row.id).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: '生成凭证成功!'
            })
            this.getlist()
          }
        })
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
      const reviewParms = {
        id: row.id,
        judgePersonId: this.$store.getters.userId
      }
      this.$confirm(this.$t('prompt.qfsp'), this.$t('prompt.fsp'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.fsp'),
        type: 'warning'
      }).then(() => {
        reviewParms.judgeStat = 0
        const parms = JSON.stringify(reviewParms)
        console.log(reviewParms, reviewParms.judgeStat, reviewParms.judgePersonId)
        updatestockenter3(reviewParms, reviewParms.judgeStat, reviewParms.judgePersonId).then(res => {
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
              message: this.$t('prompt.fspsb')
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
        const parms = {
          receiptStat: 2,
          id: row.id
        }
        // const parms = JSON.stringify(this.reviewParms)
        console.log(this.reviewParms)
        updatestockenter(parms, '').then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: this.$t('prompt.fjdcg')
            })
            this.getlist()
          }
        })
      }).catch(() => {
        console.log('wrong')
      })
    },
    isReview6(row) {
      console.log(row)
      if (row.receiptStat !== 3 && row.judgeStat === 2) {
        return true
      }
    },
    // 结单操作
    handleReview6(row) {
      // this.reviewParms = {}
      // this.reviewParms.id = row.id
      // this.reviewParms.endPersonId = this.$store.getters.userId
      this.$prompt('请输入附加费', this.$t('prompt.ts'), {
        confirmButtonText: this.$t('prompt.qd'),
        cancelButtonText: this.$t('prompt.qx'),
        inputPattern: /^[0-9]+(.[0-9]{2})?$/,
        inputErrorMessage: '附加费格式不正确'
      }).then(({ value }) => {
        // this.$message({
        //   type: 'success',
        //   message: '你的邮箱是: ' + value
        // })
        // this.reviewParms.receiptStat = 3
        const parms = JSON.stringify(this.reviewParms)
        updateExtra(row.id, this.$store.getters.userId, value).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: '设置成功!'
            })
            this.getlist()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
      // this.$confirm(this.$t('prompt.qjd'), this.$t('prompt.jd'), {
      //   distinguishCancelAndClose: true,
      //   confirmButtonText: this.$t('prompt.jd'),
      //   type: 'warning'
      // }).then(() => {
      //   this.reviewParms.receiptStat = 3
      //   const parms = JSON.stringify(this.reviewParms)
      //   updatestockenter3(parms).then(res => {
      //     if (res.data.ret === 200) {
      //       this.$message({
      //         type: 'success',
      //         message: this.$t('prompt.jdcg')
      //       })
      //       this.getlist()
      //     }
      //   })
      // })
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
        const parms = {
          receiptStat: 3,
          id: row.id
        }
        // const parms = JSON.stringify(this.reviewParms)
        console.log(this.reviewParms)
        updatestockenter(parms, '').then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: this.$t('prompt.jdcg')
            })
            this.getlist()
          }
        })
      }).catch(() => {
        console.log('wrong')
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
    getlist() {
      // 采购入库单列表数据
      this.listLoading = true
      stockenterlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          const needlist = res.data.data.content.list
          const newarr = res.data.data.content.list.map(item => {
            return item.stockEnterDetailVos
          })
          const newarr2 = [].concat.apply([], newarr)
          for (const i in needlist) {
            for (const j in newarr2) {
              if (needlist[i].id === newarr2[j].enterId) {
                newarr2[j].acceptPersonId = needlist[i].acceptPersonId
                newarr2[j].acceptPersonName = needlist[i].acceptPersonName
                newarr2[j].approvalUseVos = needlist[i].approvalUseVos
                newarr2[j].batch = needlist[i].batch
                newarr2[j].countryId = needlist[i].countryId
                newarr2[j].countryName = needlist[i].countryName
                newarr2[j].createDate = needlist[i].createDate
                newarr2[j].createPersonId = needlist[i].createPersonId
                newarr2[j].createPersonName = needlist[i].createPersonName
                newarr2[j].deliveryPersonId = needlist[i].deliveryPersonId
                newarr2[j].deliveryPersonName = needlist[i].deliveryPersonName
                newarr2[j].endDate = needlist[i].endDate
                newarr2[j].endPersonId = needlist[i].endPersonId
                newarr2[j].endPersonName = needlist[i].endPersonName
                newarr2[j].enterDate = needlist[i].enterDate
                newarr2[j].enterDeptId = needlist[i].enterDeptId
                newarr2[j].enterDeptName = needlist[i].enterDeptName
                newarr2[j].enterNumber = needlist[i].enterNumber
                newarr2[j].enterPersonId = needlist[i].enterPersonId
                newarr2[j].enterPersonName = needlist[i].enterPersonName
                newarr2[j].enterRepositoryId = needlist[i].enterRepositoryId
                newarr2[j].enterRepositoryName = needlist[i].enterRepositoryName
                newarr2[j].extraMoney = needlist[i].extraMoney
                newarr2[j].extraPersonId = needlist[i].extraPersonId
                newarr2[j].id = needlist[i].id
                newarr2[j].judgeDate = needlist[i].judgeDate
                newarr2[j].judgePersonId = needlist[i].judgePersonId
                newarr2[j].judgePersonName = needlist[i].judgePersonName
                newarr2[j].judgeStat = needlist[i].judgeStat
                newarr2[j].modifyDate = needlist[i].modifyDate
                newarr2[j].modifyPersonId = needlist[i].modifyPersonId
                newarr2[j].modifyPersonName = needlist[i].modifyPersonName
                newarr2[j].receiptStat = needlist[i].receiptStat
                newarr2[j].repositoryTypeId = needlist[i].repositoryTypeId
                newarr2[j].sourceNumber = needlist[i].sourceNumber
                newarr2[j].sourceType = needlist[i].sourceType
                newarr2[j].stat = needlist[i].stat
                newarr2[j].stockDeptId = needlist[i].stockDeptId
                newarr2[j].stockDeptName = needlist[i].stockDeptName
                newarr2[j].stockEnterDetailVos = needlist[i].stockEnterDetailVos
                newarr2[j].stockPersonId = needlist[i].stockPersonId
                newarr2[j].stockPersonName = needlist[i].stockPersonName
                newarr2[j].summary = needlist[i].summary
                newarr2[j].supplierId = needlist[i].supplierId
                newarr2[j].supplierName = needlist[i].supplierName
                newarr2[j].title = needlist[i].title
              }
            }
          }
          console.log('newarr2============', newarr2)
          this.list = newarr2
          this.getSpanArr(this.list)
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
    },
    // 清空搜索条件
    restFilter() {
      this.enterRepositoryId = ''
      this.getemplist.enterRepositoryId = ''
    },
    restFilter2() {
      this.deliveryPersonId = ''
      this.getemplist.deliveryPersonId = ''
    },
    restFilter4() {
      this.supplierId = ''
      this.getemplist.supplierId = ''
    },
    restFilter3() {
      this.acceptPersonId = ''
      this.getemplist.acceptPersonId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      this.getemplist()
      // stockenterlist(this.getemplist).then(res => {
      //   if (res.data.ret === 200) {
      //     this.list = res.data.data.content.list
      //     this.total = res.data.data.content.totalCount
      //     // this.restFilter()
      //   } else {
      //     // this.restFilter()
      //   }
      // })
    },
    // 修改操作
    handleEdit(row) {
      console.log(row)
      this.editVisible = true
      this.personalForm = Object.assign({}, row)
      this.personalForm.sourceType = String(row.sourceType)
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
      this.personalForm.sourceType = String(row.sourceType)
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
      this.$confirm(this.$t('prompt.qsh'), this.$t('prompt.sh'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.tg'),
        cancelButtonText: this.$t('prompt.btg'),
        type: 'warning'
      }).then(() => {
        updatestockenter3(row, 2, this.$store.getters.userId).then(res => {
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
              updatestockenter3(row, 1, this.$store.getters.userId).then(res => {
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
          deletestockenter(ids, this.$store.getters.userId).then(res => {
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
        deletestockenter(row.id, this.$store.getters.userId).then(res => {
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
      this.$router.push('/Stockenter/addstockenter')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'StockenterName', 'StockenterShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
    supplierName(val) {
      console.log(val)
      this.supplierId = val.supplierName
      this.getemplist.supplierId = val.id
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
