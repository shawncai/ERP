<template>
  <div class="ERP-container">
    <el-card :body-style="{ padding: '10px' }" class="box-card" style="margin-top: 10px" shadow="never">
      <el-input v-model="getemplist.productName" :placeholder="$t('updates.wlmc')" size="mini" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.orderNumber" :placeholder="$t('updates.cgdh')" size="mini" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="stockPersonId" :placeholder="$t('StockOrder.stockPersonId')" size="mini" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechooseStock" @clear="restFilter2"/>
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
        <el-date-picker
          v-model="date"
          type="daterange"
          size="mini"
          range-separator="-"
          unlink-panels
          start-placeholder="到货日期"
          end-placeholder="到货日期"
          value-format="yyyy-MM-dd"
          style="margin-top: 20px;margin-left: 20px"/>
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button v-waves class="filter-item" type="primary" style="float: right" round size="mini" @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" type="primary" size="mini" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>

      <!-- 搜索按钮 -->
      <el-button v-waves size="mini" class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px " round @click="handleFilter">{{ $t('public.search') }}</el-button>
    </el-card>
    <el-card :body-style="{ padding: '10px' }" class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves size="mini" class="filter-item" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['104-114-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['104-114-6']" v-waves :loading="downloadLoading" size="mini" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['104-114-7']" v-waves size="mini" class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <el-select v-model="getemplist.sortId" :value="getemplist.sortId" :placeholder="$t('update4.sortId')" size="mini" class="filter-item" @change="handlesort">
        <el-option :label="$t('update4.dhsjpx')" value="1"/>
        <el-option :label="$t('update4.ddbh')" value="2"/>
      </el-select>
      <!-- 新建操作 -->
      <el-button v-permission="['104-114-1']" v-waves size="mini" class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>

    </el-card>

    <el-card :body-style="{ padding: '10px' }" class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 列表开始 -->
      <!-- <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        border
        fit
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          :selectable="selectInit"
          type="selection"
          width="55"
          fixed="left"
          align="center"/>
        <el-table-column :label="$t('public.id')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.orderNumber }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="personalForm"/>
        </el-table-column>
        <el-table-column :label="$t('StockOrder.title')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockOrder.stockType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.stockTypeName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockOrder.sourceType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.sourceType | sourceTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockOrder.stockPersonId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.stockPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockOrder.supplierId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.supplierName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockOrder.allMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.allMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockOrder.allTaxMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.allTaxMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockOrder.allIncludeTaxMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.allIncludeTaxMoney }}</span>
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
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="270">
          <template slot-scope="scope">
            <el-button v-permission2="['104-114-3', scope.row.createPersonId]" v-show="scope.row.judgeStat === 0&&scope.row.receiptStat === 1" :key="scope.row.id + Math.random()" :title="$t('updates.xg')" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
            <el-button v-show="isReview(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.spi')" type="warning" size="mini" icon="el-icon-view" circle @click="handleReview(scope.row)"/>
            <el-button v-permission="['104-114-76']" v-show="isReview4(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.fsp')" type="warning" size="mini" circle @click="handleReview4(scope.row)"><svg-icon icon-class="fanhui"/></el-button>
            <el-button v-permission="['104-114-16']" v-show="isReview2(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.jd')" type="success" size="mini" icon="el-icon-check" circle @click="handleReview2(scope.row)"/>
            <el-button v-permission="['104-114-17']" v-show="isReview3(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.fjd')" type="success" size="mini" icon="el-icon-back" circle @click="handleReview3(scope.row)"/>
            <el-button v-permission2="['104-114-2', scope.row.createPersonId]" scope.row.createPersonId]" v-show="scope.row.judgeStat === 0&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :key="scope.row.id + Math.random()" :title="$t('updates.sc')" size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
            <el-button :title="$t('updates.jc')" size="mini" type="primary" icon="el-icon-sort" circle @click="handleReceipt(scope.row)"/>
            <el-button v-permission="['104-114-44']" v-show="scope.row.judgeStat === 2" type="primary" style="width: 107px" @click="handleMyReceipt1(scope.row)"><span style="margin-left: -15px;">生成预付款单</span></el-button>
          </template>
        </el-table-column>
      </el-table> -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :data="list"
        :height="tableHeight"
        :span-method="arraySpanMethod"
        border
        size="small"
        fit
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="40"/>
        <el-table-column :label="$t('public.id')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.orderNumber }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="personalFormdetail"/>
        </el-table-column>
        <!-- <el-table-column :label="$t('StockOrder.title')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column> -->
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
        <el-table-column :label="$t('updates.cgsl')" :resizable="false" fixed="left" align="center" min-width="75">
          <template slot-scope="scope">
            <span>{{ scope.row.stockQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('updates.dhsl')" :resizable="false" fixed="left" align="center" min-width="75">
          <template slot-scope="scope">
            <span>{{ scope.row.actualArrivalQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Hmodule.dw')" :resizable="false" fixed="left" align="center" min-width="75">
          <template slot-scope="scope">
            <span>{{ scope.row.unit }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('updates.dhrq')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.arrivalDate }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('StockOrder.stockType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.stockTypeName }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column :label="$t('StockOrder.sourceType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.sourceType | sourceTypeFilter }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('StockOrder.stockPersonId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.stockPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockOrder.supplierId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.supplierName }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="jundgeprice()" :label="$t('StockOrder.allMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.allMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="jundgeprice()" :label="$t('StockOrder.allTaxMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.allTaxMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="jundgeprice()" :label="$t('StockOrder.allIncludeTaxMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.allIncludeTaxMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="jundgeprice()" :label="$t('StockOrder.discountMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.allDiscountMoney }}</span>
          </template>
        </el-table-column>
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
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="270">
          <template slot-scope="scope">
            <el-button v-permission2="['104-114-3', scope.row.createPersonId]" v-show="scope.row.judgeStat === 0&&scope.row.receiptStat === 1" :key="scope.row.id + Math.random()" :title="$t('updates.xg')" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
            <el-button v-show="isReview(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.spi')" type="warning" size="mini" icon="el-icon-view" circle @click="handleReview(scope.row)"/>
            <el-button v-permission="['104-114-76']" v-show="isReview4(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.fsp')" type="warning" size="mini" circle @click="handleReview4(scope.row)"><svg-icon icon-class="fanhui"/></el-button>
            <el-button v-permission="['104-114-16']" v-show="isReview2(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.jd')" type="success" size="mini" icon="el-icon-check" circle @click="handleReview2(scope.row)"/>
            <el-button v-permission="['104-114-17']" v-show="isReview3(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.fjd')" type="success" size="mini" icon="el-icon-back" circle @click="handleReview3(scope.row)"/>
            <el-button v-permission2="['104-114-2', scope.row.createPersonId]" v-show="scope.row.judgeStat === 0&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :key="scope.row.id + Math.random()" :title="$t('updates.sc')" scope-row-create-person-id- size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
            <el-button :title="$t('updates.jc')" size="mini" type="primary" icon="el-icon-sort" circle @click="handleReceipt(scope.row)"/>
            <el-button v-permission="['104-114-44']" v-show="scope.row.judgeStat === 2" type="primary" style="width: 107px" @click="handleMyReceipt1(scope.row)"><span style="margin-left: -15px;">生成预付款单</span></el-button>
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
import { stockorderlist, deletestockorder, updatestockorder2 } from '@/api/StockOrder'
import { getdeptlist } from '@/api/BasicSettings'
import { checkReceiptOrder } from '@/api/public'
import { searchStockCategory } from '@/api/StockCategory'
import waves from '@/directive/waves' // Waves directive
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import Pagination from '@/components/Pagination'
import MyEmp from './components/MyEmp'
import DetailList from './components/DetailList'
import MyDialog from './components/MyDialog'
import MySupplier from './components/MySupplier'

var _that
export default {
  name: 'StockOrderList',
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
        1: _that.$t('updates.cgsq'),
        2: _that.$t('updates.cgjhd'),
        3: _that.$t('updates.cgxjd'),
        4: _that.$t('updates.cght'),
        5: _that.$t('Hmodule.Nosource')
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      personalFormdetail: {},
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
        sortId: '1',
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
      // 查询参数
      countquery: ''
    }
  },
  activated() {
    this.getinformation()
    this.countquery = this.$route.query.arry
    if (this.countquery) {
      console.log('this.countquery====', this.countquery)
      this.getemplist.supplierId = this.countquery.id
      this.supplierId = this.countquery.name
      if (this.countquery.beginTime !== '') {
        this.getemplist.beginTime = this.countquery.beginTime
      }
      if (this.countquery.beginTime !== '') {
        this.getemplist.endTime = this.countquery.endTime
      }
    }
    this.getlist()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  mounted() {
    this.countquery = this.$route.query.arry
    if (this.countquery) {
      console.log('this.countquery====', this.countquery)
      this.getemplist.supplierId = this.countquery.id
      this.supplierId = this.countquery.name
      if (this.countquery.beginTime !== '') {
        this.getemplist.beginTime = this.countquery.beginTime
      }
      if (this.countquery.beginTime !== '') {
        this.getemplist.endTime = this.countquery.endTime
      }
    }
    this.getlist()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    handlesort() {
      this.getlist()
    },
    jundgeprice() {
      const value = ['1-22-24-115']
      const roles = this.$store.getters && this.$store.getters.roles
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      // console.log('hasPermission=======', hasPermission)
      return hasPermission
    },
    getinformation() {
      if (this.$store.getters.empcontract) {
        console.log('getempcontract', this.$store.getters.empcontract)
        console.log('1111111', 111111111)
        this.getemplist.supplierId = this.$store.getters.empcontract.supplierId
        this.getemplist.beginTime = this.$store.getters.empcontract.beginTime
        this.getemplist.endTime = this.$store.getters.empcontract.endTime
        this.$store.dispatch('getempcontract', '')
      }
    },
    handleMyReceipt1(val) {
      this.$store.dispatch('getempcontract', val)
      this.$router.push('/AdvancePay/AddAdvancePay')
    },
    // 判断反审批按钮
    isReview4(row) {
      // console.log(row)
      if (row.judgeStat === 2 && row.receiptStat !== 3) {
        return true
      }
    },
    // 反结单操作
    handleReview4(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.parentId
      this.reviewParms.judgePersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qfsp'), this.$t('prompt.fsp'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.fsp'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.judgeStat = 0
        const parms = JSON.stringify(this.reviewParms)
        updatestockorder2(parms).then(res => {
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
      // console.log(row)
      if (row.receiptStat === 3) {
        return true
      }
    },
    // 反结单操作
    handleReview3(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.parentId
      this.reviewParms.endPersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qfjd'), this.$t('prompt.fjd'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.fjd'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.receiptStat = 2
        const parms = JSON.stringify(this.reviewParms)
        updatestockorder2(parms).then(res => {
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
      this.reviewParms.id = row.parentId
      this.reviewParms.endPersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qjd'), this.$t('prompt.jd'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.jd'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.receiptStat = 3
        const parms = JSON.stringify(this.reviewParms)
        updatestockorder2(parms).then(res => {
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
      // console.log('row', row)
      checkReceiptOrder(row.orderNumber).then(res => {
        if (res.data.ret === 200) {
          console.log('res.data.data', res.data.data)
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
    getSpanArr(data) {
      this.spanArr = []
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].orderId === data[i - 1].orderId) {
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
      if (columnIndex !== 2 && columnIndex !== 3 && columnIndex !== 4 && columnIndex !== 5 && columnIndex !== 6) {
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    getlist() {
      // console.log('this.getemplist', this.getemplist)
      // 物料需求计划列表数据1212
      this.listLoading = true
      stockorderlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          console.log('res.data.data.content.list', res.data.data.content.list)
          if (res.data.data.content.list !== '' && res.data.data.content.list !== undefined && res.data.data.content.list !== null) {
            for (let i = 0; i < res.data.data.content.list.length; i++) {
              console.log('res.data.data.content.list[i].stockOrderDetailVos', res.data.data.content.list[i].stockOrderDetailVos)
              const list2 = res.data.data.content.list[i].stockOrderDetailVos
              console.log('list2', list2)
              if (list2 !== '' && list2 !== undefined && list2 !== null) {
                for (let j = 0; j < list2.length; j++) {
                  list2[j].taxRate = list2[j].taxRate * 100
                  list2[j].discountRate = list2[j].discountRate * 100
                  console.log('list2[j].taxRate', list2[j].taxRate)
                }
              }
            }
          }
          const needlist = res.data.data.content.list
          const newarr = res.data.data.content.list.map(item => {
            return item.stockOrderDetailVos
          })
          const newarr2 = [].concat.apply([], newarr)
          const process = this._.cloneDeep(newarr2)
          for (const i in needlist) {
            for (const j in process) {
              if (needlist[i].id === process[j].orderId) {
                process[j].parentId = needlist[i].id
                process[j].orderNumber = needlist[i].orderNumber
                process[j].title = needlist[i].title
                process[j].sourceType = needlist[i].sourceType
                process[j].stockTypeId = needlist[i].stockTypeId
                process[j].supplierId = needlist[i].supplierId
                process[j].stockRepositoryId = needlist[i].stockRepositoryId
                process[j].stockPersonId = needlist[i].stockPersonId
                process[j].deptId = needlist[i].deptId
                process[j].payMode = needlist[i].payMode
                process[j].orderDate = needlist[i].orderDate
                process[j].isVat = needlist[i].isVat
                process[j].deliveryMode = needlist[i].deliveryMode
                process[j].settleMode = needlist[i].settleMode
                process[j].signPersonId = needlist[i].signPersonId
                process[j].currency = needlist[i].currency
                process[j].receiptStat = needlist[i].receiptStat
                process[j].judgeStat = needlist[i].judgeStat
                process[j].createPersonId = needlist[i].createPersonId
                process[j].createDate = needlist[i].createDate
                process[j].judgePersonId = needlist[i].judgePersonId
                process[j].judgeDate = needlist[i].judgeDate
                process[j].endPersonId = needlist[i].endPersonId
                process[j].endDate = needlist[i].endDate
                process[j].modifyPersonId = needlist[i].modifyPersonId
                process[j].modifyDate = needlist[i].modifyDate
                process[j].countryId = needlist[i].countryId
                process[j].otherMoney = needlist[i].otherMoney
                process[j].supplierNumber = needlist[i].supplierNumber
                process[j].arrivalDate = needlist[i].arrivalDate
                process[j].stockOrderDetailVos = needlist[i].stockOrderDetailVos
                process[j].approvalUseVos = needlist[i].approvalUseVos
                process[j].stockType = needlist[i].stockType
                process[j].supplierName = needlist[i].supplierName
                process[j].stockPersonName = needlist[i].stockPersonName
                process[j].deptName = needlist[i].deptName
                process[j].signPersonName = needlist[i].signPersonName
                process[j].createPersonName = needlist[i].createPersonName
                process[j].judgePersonName = needlist[i].judgePersonName
                process[j].endPersonName = needlist[i].endPersonName
                process[j].modifyPersonName = needlist[i].modifyPersonName
                process[j].countryName = needlist[i].countryName
                process[j].stockRepositoryName = needlist[i].stockRepositoryName
                process[j].allIncludeTaxMoney = needlist[i].allIncludeTaxMoney
                process[j].allMoney = needlist[i].allMoney
                process[j].allTaxMoney = needlist[i].allTaxMoney
                process[j].settleModeName = needlist[i].settleModeName
                process[j].allQuantity = needlist[i].allQuantity
                process[j].allDiscountMoney = needlist[i].allDiscountMoney
                process[j].allIncludeTaxDiscountMoney = needlist[i].allIncludeTaxDiscountMoney
                process[j].deliveryModeName = needlist[i].deliveryModeName
                process[j].payModeName = needlist[i].payModeName
              }
            }
          }
          this.list = process
          this.getSpanArr(this.list)
          console.log('this.list==================', this.list)
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
      if (this.date && this.date.length !== 0) {
        this.getemplist.beginTime = this.date[0] + ' 00:00:00'
        this.getemplist.endTime = this.date[1] + ' 23:59:59'
      } else {
        this.getemplist.beginTime = ''
        this.getemplist.endTime = ''
      }
      this.getemplist.pageNum = 1
      this.getlist()
      // stockorderlist(this.getemplist).then(res => {
      //   if (res.data.ret === 200) {
      //     this.list = res.data.data.content.list
      //     this.total = res.data.data.content.totalCount
      //     // this.restFilter()
      //   } else {
      //     // this.restFilter()
      //   }
      // })
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
      // console.log(val)
      this.supplierId = val.supplierName
      this.getemplist.supplierId = val.id
    },
    // 修改操作
    handleEdit(row) {
      // console.log(row)
      this.editVisible = true
      this.personalForm = Object.assign({}, row)
      this.personalForm.sourceType = String(row.sourceType)
      if (row.currency !== null) {
        this.personalForm.currency = String(row.currency)
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
      this.personalFormdetail = Object.assign({}, row)
    },
    // 判断审核按钮
    isReview(row) {
      if (row.approvalUseVos !== '' && row.approvalUseVos !== null && row.approvalUseVos !== undefined && row.approvalUseVos.length !== 0) {
        const approvalUse = row.approvalUseVos
        const index = approvalUse[approvalUse.length - 1].stepHandler.indexOf(',' + this.$store.getters.userId + ',')
        if (index > -1 && (row.judgeStat === 1 || row.judgeStat === 0)) {
          return true
        }
      }
    },
    // 审批操作
    handleReview(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.parentId
      this.reviewParms.judgePersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qsh'), this.$t('prompt.sh'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.tg'),
        cancelButtonText: this.$t('prompt.btg'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.judgeStat = 2
        const parms = JSON.stringify(this.reviewParms)
        updatestockorder2(parms).then(res => {
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
              updatestockorder2(parms).then(res => {
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
      const ids = this.moreaction.map(item => item.parentId).join()
      if (command === 'delete') {
        this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
          confirmButtonText: this.$t('prompt.qd'),
          cancelButtonText: this.$t('prompt.qx'),
          type: 'warning'
        }).then(() => {
          deletestockorder(ids, this.$store.getters.userId).then(res => {
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
        deletestockorder(row.parentId, this.$store.getters.userId).then(res => {
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
      this.$router.push('/StockOrder/AddStockOrder')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
      if (this.moreaction.length === 0) {
        this.$message({
          message: '请选择要导出数据',
          type: 'warning'
        })
        this.downloadLoading = false
        return false
      }
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['物品编号', '物品名称', '规格', '颜色', '单位', '采购数量', '交货日期', '备注', '单价', '含税价', '税率', '金额', '含税金额', '税额', '折扣率', '折扣额', '源单编号', '源单序号', '已到货数量', '退货数量', '实到数量']
          const filterVal = ['productCode', 'productName', 'productType', 'color', 'unit', 'stockQuantity', 'deliveryDate', 'remarks', 'price', 'includeTaxPrice', 'taxRate', 'money', 'includeTaxMoney', 'tax', 'discountRate', 'discountMoney', 'sourceNumber', 'sourceSerialNumber', 'arrivalQuantity', 'returnQuantity', 'actualArrivalQuantity']
          for (let i = 0; i < this.moreaction.length; i++) {
            const data = this.formatJson(filterVal, this.moreaction[i].stockOrderDetailVos)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: this.moreaction[i].supplierName
            })
          }
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
