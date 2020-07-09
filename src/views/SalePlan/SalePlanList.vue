<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">
      <el-input
        v-model="getemplist.title"
        :placeholder="$t('SalePlan.title')"
        class="filter-item"
        size="small"
        clearable
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="getemplist.planNumber"
        :placeholder="$t('updates.jhdh')"
        class="filter-item"
        clearable
        size="small"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="getemplist.planType"
        :placeholder="$t('SalePlan.planType')"
        :value="getemplist.planType"
        class="filter-item"
        clearable
        size="small"
        @keyup.enter.native="handleFilter"
      >
        <el-option value="1" label="年" />
        <el-option value="2" label="月" />
        <el-option value="3" label="周" />
        <el-option value="4" label="日" />
      </el-select>
      <el-select v-model="getemplist.searchRepositoryId" :placeholder="$t('Hmodule.xzmd')" size="small" clearable filterable class="filter-item">
        <el-option
          v-for="(item, index) in repositories"
          :key="index"
          :label="item.repositoryName"
          :value="item.id"/>
      </el-select>
      <el-popover v-model="visible2" placement="bottom" width="500" trigger="click">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="-"
          unlink-panels
          size="small"
          start-placeholder="申请时间"
          end-placeholder="申请时间"
          value-format="yyyy-MM-dd"
          style="margin-top: 20px;margin-left: 20px"/>
        <el-select
          v-model="getemplist.judgeStat"
          :value="getemplist.judgeStat"
          :placeholder="$t('updates.spzt')"
          clearable
          size="small"
          style="margin-top: 20px;width: 50%;margin-left: 20px;"
        >
          <el-option :label="$t('updates.wsh')" value="0" />
          <el-option :label="$t('updates.shz')" value="1" />
          <el-option :label="$t('updates.shtg')" value="2" />
          <el-option :label="$t('updates.shptg')" value="3" />
        </el-select>
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button
            v-waves
            size="small"
            class="filter-item"
            type="primary"
            style="float: right"
            round
            @click="handleFilter"
          >{{ $t('public.search') }}</el-button>
        </div>
        <el-button
          v-waves
          slot="reference"
          size="small"
          type="primary"
          class="filter-item"
          style="width: 130px"
          @click="visible2 = !visible2"
        >
          {{ $t('public.filter') }}
          <svg-icon icon-class="shaixuan" style="margin-left: 4px" />
        </el-button>
      </el-popover>

      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="width: 86px;margin-top: 10px"
        round
        size="small"
        @click="handleFilter"
      >{{ $t('public.search') }}</el-button>
    </el-card>
    <el-card :body-style=" { padding: '6px'}" class="box-card" shadow="never">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves size="small" class="filter-item" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }}
          <i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['54-61-2']" style="text-align: left" command="delete">
            <svg-icon icon-class="shanchu" style="width: 40px" />
            {{ $t('public.delete') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button
        v-permission="['54-61-6']"
        v-waves
        :loading="downloadLoading"
        size="small"
        class="filter-item2"
        style="width: 86px"
        @click="handleExport"
      >
        <svg-icon icon-class="daochu" />
        {{ $t('public.export') }}
      </el-button>
      <!-- 打印操作 -->
      <el-button
        v-permission="['54-61-7']"
        v-waves
        size="small"
        class="filter-item2"
        icon="el-icon-printer"
        style="width: 86px"
        @click="handlePrint"
      >{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button
        v-permission="['54-61-1']"
        v-waves
        size="small"
        class="filter-item2"
        icon="el-icon-plus"
        type="success"
        style="width: 86px"
        @click="handleAdd"
      >{{ $t('public.add') }}</el-button>
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          :selectable="selectInit"
          type="selection"
          width="55"
          fixed="left"
          align="center"
        />
        <el-table-column
          :label="$t('public.id')"
          :resizable="false"
          fixed="left"
          align="center"
          min-width="150"
        >
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.planNumber }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="personalForm" />
        </el-table-column>
        <el-table-column
          :label="$t('SalePlan.title')"
          :resizable="false"
          fixed="left"
          align="center"
          min-width="150"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('SalePlan.planType')"
          :resizable="false"
          align="center"
          min-width="150"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.planType | planTypeFliter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('SalePlan.planCategory')"
          :resizable="false"
          align="center"
          min-width="150"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.planCategory | planCategoryFliter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('SalePlan.beginTime')"
          :resizable="false"
          align="center"
          min-width="150"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.beginTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('SalePlan.endTime')"
          :resizable="false"
          align="center"
          min-width="150"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.endTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('SalePlan.regOrRep')"
          :resizable="false"
          align="center"
          min-width="150"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.planRepositoryName || scope.row.planRegionName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('public.judgeStat')"
          :resizable="false"
          prop="judgeStat"
          align="center"
          min-width="150"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.judgeStat | judgeStatFilter }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          :label="$t('public.receiptStat')"
          :resizable="false"
          align="center"
          min-width="150"
        > -->
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.receiptStat | receiptStatFilter }}</span>
        </template>
        </el-table-column> -->
        <el-table-column
          :label="$t('public.actions')"
          :resizable="false"
          align="center"
          min-width="230"
        >
          <template slot-scope="scope">
            <el-button
              v-permission2="['54-61-3', scope.row.createPersonId]"
              v-show="scope.row.judgeStat === 0"
              :title="$t('updates.xg')"
              type="primary"
              size="mini"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.row)"
            />
            <el-button
              v-show="isReview(scope.row)"
              :title="$t('updates.spi')"
              type="warning"
              size="mini"
              icon="el-icon-view"
              circle
              @click="handleReview(scope.row)"
            />
            <el-button
              v-show="isTrace(scope.row)"
              :title="$t('updates.gz')"
              type="success"
              size="mini"
              icon="el-icon-news"
              circle
              @click="handleTrace(scope.row)"
            />
            <el-button
              v-permission2="['54-61-2', scope.row.createPersonId]"
              v-show="scope.row.judgeStat === 0"
              :title="$t('updates.sc')"
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.row)"
            />
            <el-button v-permission="['54-61-76']" v-show="isReview4(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :title="$t('updates.fsp')" type="warning" size="mini" circle @click="handleReview4(scope.row)"><svg-icon icon-class="fanhui"/></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="getemplist.pageNum"
        :limit.sync="getemplist.pageSize"
        @pagination="getlist"
      />
      <!--修改开始=================================================-->
      <my-dialog :editcontrol.sync="editVisible" :editdata.sync="personalForm" @rest="refreshlist" />
      <!--修改结束=================================================-->
      <!-- 跟踪统计================================================= -->
      <el-dialog :visible.sync="traceControl" :title="$t('SalePlan.trackingStatistics')" class="edit" width="1010px" top="55px" >
        <el-form :model="traceForm">
          <el-card class="box-card" shadow="never">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('SalePlan.planNum')" style="width: 100%;">
                  <el-input v-model="traceForm.planNumber" style="margin-left: 18px;width:200px" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SalePlan.title')" style="width: 100%;">
                  <el-input v-model="traceForm.title" style="margin-left: 18px;width:200px" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <div class="container">
              <el-editable
                ref="editable"
                :data.sync="list2"
                :edit-config="{ showIcon: true, showStatus: true}"
                class="click-table1"
                stripe
                border
                size="small"
                style="width: 100%">
                <el-editable-column type="selection" min-width="55" align="center"/>
                <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
                <el-editable-column :edit-render="{name: 'ElCascader ', type: 'visible', options: 'options'}" :label="$t('SalePlan.planTarget')" prop="" align="center" min-width="250px">
                  <template slot="edit" slot-scope="scope">
                    <el-select v-model="scope.row.planTarget" :placeholder="$t('SalePlan.xzmd')" clearable filterable style="margin-left: 18px;width: 180px" disabled @change="jungleAddress(scope.row,$event)" >
                      <el-option value="1" label="sale target" />
                      <el-option value="2" label="collection target" />
                      <el-option value="3" label="update mptarget" />
                      <el-option value="4" label="one month delay target" />
                      <el-option value="5" label="three month delay target" />
                      <el-option value="6" label="more than three month delay target" />
                      <el-option value="7" label="area target" />
                    </el-select>
                  </template>
                </el-editable-column>
                <el-editable-column :label="$t('SalePlan.address')" prop="address" align="center" min-width="150px"/>
                <el-editable-column :label="$t('SalePlan.typeId')" prop="productType" align="center" min-width="250px"/>
                <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('SalePlan.actualQuantity')" prop="actualQuantity" align="center" min-width="150" >
                  <template slot="edit" slot-scope="scope">
                    <el-input-number
                      v-if="scope.row.planTarget === 7"
                      :precision="6"
                      :disabled="scope.row.isdisable3"
                      v-model="scope.row.actualQuantity"
                    />
                    <span v-else>{{ scope.row.actualQuantity }}</span>
                  </template>
                </el-editable-column>
                <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('SalePlan.actualMoney')" prop="actualMoney" align="center" min-width="150" >
                  <template slot="edit" slot-scope="scope">
                    <el-input-number
                      v-if="scope.row.planTarget === 7"
                      :precision="6"
                      :disabled="scope.row.isdisable3"
                      v-model="scope.row.actualMoney"
                    />
                    <span v-else>{{ scope.row.actualMoney }}</span>
                  </template>
                </el-editable-column>
              </el-editable>
            </div>
          </el-card>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="traceControl = false">cancel</el-button>
          <el-button type="primary" @click="handsavetrace">comfirm</el-button>
        </div>
      </el-dialog>
      <!-- 统计结束================================================= -->
    </el-card>
  </div>
</template>

<script>
import { saleplanlist, deletesaleplan, updatesaleplan2, saleplanlistDetail, updatetrace } from '@/api/SalePlan'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchRepository } from '@/api/public'
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

var _that
export default {
  name: 'SalePlanList',
  directives: { waves, permission, permission2 },
  components: { MyDialog, DetailList, MyEmp, MyCustomer, MyAgent, Pagination },
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
    planTypeFliter(status) {
      const statusMap = {
        1: 'year',
        2: 'season',
        3: 'month',
        4: 'week',
        5: 'day'
      }
      return statusMap[status]
    },
    planCategoryFliter(status) {
      const statusMap = {
        1: 'branch',
        2: 'area'
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
      tableHeight: 200,
      list2: [],
      formLabelWidth: '130px',
      traceForm: {},
      // 追踪开关
      traceControl: false,
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
  watch: {
    traceControl() {
      saleplanlistDetail(this.traceForm.id).then(res => {
        console.log('详情数据============>', res.data.data.content.salePlanDetailVos)
        for (let i = 0; i < res.data.data.content.salePlanDetailVos.length; i++) {
          res.data.data.content.salePlanDetailVos[i].planTarget = String(res.data.data.content.salePlanDetailVos[i].planTarget)
        }
        this.list2 = res.data.data.content.salePlanDetailVos
      })
    }
  },
  activated() {
    this.getlist()
    this.handlerep()

    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  mounted() {
    this.getlist()
    this.handlerep()

    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 根据区域选择门店
    handlerep() {
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
    clickRow(val) {
      if (val.judgeStat === 0) {
        this.$refs.table.toggleRowSelection(val)
      }
    },
    handsavetrace() {
      this.traceControl = false
      for (let i = 0; i < this.list2.length; i++) {
        this.list2[i].planTarget = Number(this.list2[i].planTarget)
      }
      const parms = JSON.stringify(this.list2)
      updatetrace(parms).then(res => {
        console.log(res)
      })
    },
    // 追踪操作
    handleTrace(row) {
      console.log('追踪')
      this.traceControl = true
      this.traceForm = row
    },
    // 判断是否可以追踪
    isTrace(row) {
      // console.log('row========>', row)
      if (row.judgeStat === 2) {
        return true
      } else {
        return false
      }
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
      saleplanlist(this.getemplist).then(res => {
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
      this.getemplist.pageNum = 1
      console.log('this.date==============>', this.date, this.getemplist)
      if (this.date && this.date.length !== 0) {
        this.getemplist.beginTime = this.date[0] + ' 00:00:00'
        this.getemplist.endTime = this.date[1] + ' 23:59:59'
      } else {
        this.getemplist.beginTime = ''
        this.getemplist.endTime = ''
      }
      saleplanlist(this.getemplist).then(res => {
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
      this.supplierId = val.supplierName
      this.getemplist.supplierId = val.id
    },
    // 修改操作
    handleEdit(row) {
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
      if (row.planType !== null) {
        this.personalForm.planType = String(row.planType)
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
        updatesaleplan2(parms).then(res => {
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
      }).catch(action => {
        // console.log('action========>', action)
      }
      )
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
      })
        .then(() => {
          this.reviewParms.judgeStat = 2
          const parms = JSON.stringify(this.reviewParms)
          updatesaleplan2(parms).then(res => {
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
          if (action === 'cancel') {
            // 取消弹框
            this.$confirm('comfirm not approved?', 'Warning', {
              distinguishCancelAndClose: true,
              confirmButtonText: 'yes',
              cancelButtonText: 'no'
            })
              .then(() => {
                this.reviewParms.judgeStat = 3
                const parms = JSON.stringify(this.reviewParms)
                updatesaleplan2(parms).then(res => {
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
                    ? 'yes'
                    : 'stay this page'
                })
              })
          // ================取消弹框结束
          }
        })
    },
    // 反审批权限
    isReview4(row) {
      console.log(row)
      if (row.judgeStat === 2) {
        return true
      }
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
        })
          .then(() => {
            deletesaleplan(ids, this.$store.getters.userId).then(res => {
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
          })
          .catch(() => {
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
      })
        .then(() => {
          deletesaleplan(row.id, this.$store.getters.userId).then(res => {
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
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('prompt.yqxsc')
          })
        })
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/SalePlan/AddSalePlan')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '供应商编号',
          '供应商名称',
          '供应商简称',
          '供应商类别',
          '所在区域',
          '采购员',
          '供应商优质级别',
          '建档人',
          '建档日期'
        ]
        const filterVal = [
          'id',
          'SalePlanName',
          'SalePlanShortName',
          'typeName',
          'regionName',
          'buyerName',
          'levelName',
          'createName',
          'createTime'
        ]
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
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j]
        })
      )
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
      // console.log(val)
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
.edit >>> .el-dialog{
    -webkit-transform: none;
    transform: none;
    position: absolute;
    right: 0;
    left: auto;
    height: auto;
  }
  .edit >>> .el-dialog__header{
    background: #fff;
    position: fixed;
    top: 0;
    display: block;
    width: 1010px;
    z-index: 100;
    border-bottom: 1px solid #f1f1f1;
  }
  .edit >>> .el-dialog__body{
    padding-left: 0;
    padding-right: 0;
    padding-top: 10px;
  }
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
.ERP-container >>> .el-form-item__label {
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
