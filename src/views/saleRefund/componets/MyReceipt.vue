<template>
  <el-dialog :visible.sync="employeeVisible" :saleoutcontrol="saleoutcontrol" :personaldata="personalForm" :close-on-press-escape="false" top="10px" title="选择收款单" append-to-body width="1100px" @close="$emit('update:saleoutcontrol', false)">
    <el-card class="box-card" style="margin-top: 15px;height: 60px;padding-left:0 " shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" style="margin-top: -9px">
          <el-input v-model="getemplist.number" :placeholder="$t('Receipt.number')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

          <el-input v-model="receiptPersonId" :placeholder="$t('updates.skr')" size="small" class="filter-item" @clear="restFilter" @focus="handlechooseStock"/>
          <my-emp :control.sync="stockControl" @stockName="stockName"/>

          <el-input v-model="getemplist.customerName" :placeholder="$t('Customer.customername')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

          <el-input v-model="getemplist.title" :placeholder="$t('updates.skdzt')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
          <el-select v-model="getemplist.searchRepositoryId" :placeholder="$t('Hmodule.xzmd')" size="small" clearable filterable class="filter-item">
            <el-option
              v-for="(item, index) in repositories"
              :key="index"
              :label="item.repositoryName"
              :value="item.id"/>
          </el-select>
          <!--更多搜索条件-->
          <el-popover
            v-model="visible2"
            placement="bottom"
            width="500"
            trigger="click">
            <el-select v-model="getemplist.receiptStat" :value="getemplist.receiptStat" :placeholder="$t('updates.djzt')" clearable style="width: 40%;float: left;margin-left: 20px">
              <el-option :label="$t('updates.zd')" value="1"/>
              <el-option :label="$t('updates.zx')" value="2"/>
              <el-option :label="$t('updates.jd')" value="3"/>
            </el-select>
            <el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" :placeholder="$t('updates.spzt')" clearable style="width: 40%;float: right;margin-right: 20px">
              <el-option :label="$t('updates.wsh')" value="0"/>
              <el-option :label="$t('updates.shz')" value="1"/>
              <el-option :label="$t('updates.shtg')" value="2"/>
              <el-option :label="$t('updates.shptg')" value="3"/>
            </el-select>
            <el-date-picker
              v-model="date"
              :default-time="['00:00:00', '23:59:59']"
              type="daterange"
              range-separator="-"
              unlink-panels
              value-format="yyyy-MM-dd"
              style="width: 60%;margin-top:10px;margin-left:10px"/>
            <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
              <el-button v-waves class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>
            </div>
            <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
          </el-popover>

          <!-- 搜索按钮 -->
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

          <!-- <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button> -->

        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :key="tableKey"
        :data="list"
        :height="tableHeight"
        size="small"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @current-change="handleCurrentChange">
        <el-table-column :label="$t('Receipt.title')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Receipt.customerId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.customerName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Receipt.allShouldMoney')" :resizable="false" prop="allShouldMoney" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.allShouldMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Receipt.receiptMoney')" :resizable="false" prop="receiptMoney" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.receiptMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Receipt.ontimeMoney')" :resizable="false" prop="ontimeMoney" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.ontimeMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Receipt.overdueMoney')" :resizable="false" prop="overdueMoney" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.overdueMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Receipt.receiptDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.receiptDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Receipt.receiptPersonId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.receiptPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.repositoryid')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.receiptRepositoryName }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-button v-waves class="filter-item" type="success" style="width: 100px;float: left;margin-bottom: 10px" @click="handleConfirm">{{ $t('Hmodule.sure') }}</el-button>
    </el-card>
  </el-dialog>
</template>

<script>
import { getRepositoryList, detailList } from '@/api/Expenses'
import { regionlist, searchRepository } from '@/api/public'
import { searchreceipt, updatereceipt, deletereceipt } from '@/api/Receipt'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import MyEmp from '../../SaleReturn/components/MyEmp'
import MyCustomer from '../../SaleReturn/components/MyCustomer'
import MyAgent from '../../SaleReturn/components/MyAgent'
import MyAccept from '../../SaleReturn/components/MyAccept'
import MyRepository from '../../SaleReturn/components/MyRepository'
var _that
export default {
  directives: { waves },
  components: { MyRepository, MyAccept, MyEmp, MyCustomer, MyAgent, Pagination },
  filters: {
    isOntimeFilter(status) {
      const statusMap = {
        1: _that.$t('Receipt.zs'),
        2: _that.$t('Receipt.bzs')
      }
      return statusMap[status]
    },
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
    sourceTypeFilter(status) {
      const statusMap = {
        1: _that.$t('updates.fqsqd')
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
  props: {
    saleoutcontrol: {
      type: Boolean,
      default: false
    },
    personaldata: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      tableHeight: 200,

      // 接受数据
      querydata: this.personaldata,
      // 选择框控制
      employeeVisible: this.saleoutcontrol,
      date: [],
      repositories: [],
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() - 8.64e7
        }
      },
      downloadLoading2: false,
      categoryVisible: false,
      isvoucherrep: false,
      respositoryarr: [],
      isvoucherregion: false,
      sendregionIds: [],
      regions: [],
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      voucherparms: {
        repositoryId: '',
        regionId: '',
        date: '',
        type: 4
      },
      receiptVisible99: false,
      // 回显收款人
      receiptPersonId: '',
      // 控制收款人
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
      receiptVisible9: false,
      picPaths: []
    }
  },
  watch: {
    saleoutcontrol() {
      this.employeeVisible = this.saleoutcontrol
      this.getlist()
      this.getallrepositorys()
      this.getallregionlist()
      this.handlereps()
      console.log(this.querydata)

      setTimeout(() => {
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 180
      }, 100)
    },
    personaldata() {
      console.log(this.personaldata)
      this.querydata = this.personaldata
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 根据区域选择门店
    handlereps() {
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
    closetag() {
      this.categoryVisible = false
      this.restvoucherparms()
    },
    restvoucherparms() {
      this.voucherparms = {
        repositoryId: '',
        regionId: '',
        date: '',
        type: 4
      }
      this.respositoryarr = []
      this.isvoucherregion = false
      this.isvoucherrep = false
    },
    handlevoucher() {
      console.log(this.voucherparms)
      if (this.voucherparms.date === '' || this.voucherparms.date === null || this.voucherparms.date === undefined) {
        this.$notify.error({
          title: this.$t('prompt.qxxzrq'),
          message: this.$t('prompt.qxxzrq'),
          offset: 100
        })
        return false
      }
      if (this.voucherparms.repositoryId === '' && this.voucherparms.regionId === '') {
        this.$notify.error({
          title: this.$t('prompt.qxxzmdhqy'),
          message: this.$t('prompt.qxxzmdhqy'),
          offset: 100
        })
        return false
      }

      detailList(this.voucherparms).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          if (res.data.data.content.length === 0) {
            this.$notify.error({
              title: '该门店或区域暂无凭证',
              message: '该门店或区域暂无凭证',
              offset: 100
            })
            return false
          } else {
            const senddata = {}
            senddata.voucherlist = res.data.data.content
            senddata.date = this.voucherparms.date
            senddata.regionId = this.voucherparms.regionId
            senddata.repositoryId = this.voucherparms.repositoryId
            senddata.type = this.voucherparms.type
            senddata.sourceType = 4

            this.$store.dispatch('getvoucherdata', senddata)
            this.$router.push({ path: '/Voucher/Newvoucher' })
          }
        }
      })
    },
    // 获取所有门店
    getallrepositorys() {
      getRepositoryList().then(res => {
        if (res.data.ret === 200) {
          this.respositoryarr = res.data.data.content.list
        }
      })
    },
    // 转化数据方法
    tranKTree(arr) {
      if (!arr || !arr.length) return
      return arr.map(item => ({
        id: item.id,
        regionName: item.regionName,
        regionListVos: this.tranKTree(item.regionListVos)
      }))
    },
    // 获取所有区域
    getallregionlist() {
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
        }
      })
    },
    handlevoucherparms() {
      this.categoryVisible = true
    },
    choosevoucherrep(val) {
      console.log('val', val)
      if (val === '') {
        this.isvoucherregion = false
      } else {
        this.isvoucherregion = true
      }
    },
    // 根据区域选择门店
    handlechange4(val) {
      console.log(val)
      if (val.length === 0) {
        this.isvoucherrep = false
      } else {
        this.isvoucherrep = true
        this.voucherparms.regionId = val[val.length - 1]
      }
    },
    // 修改
    handleEdit(row) {
      console.log(row)
      this.editVisible = true
      this.personalForm = Object.assign({}, row)
      if (row.customerType) {
        this.personalForm.customerType = String(row.customerType)
      }
      if (row.moneyType) {
        this.personalForm.moneyType = String(row.moneyType)
      }
    },
    // 附件操作
    check(row) {
      console.log(row)
      this.receiptVisible9 = true
      this.picPaths = row.picPaths
    },
    // 收款人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 收款人回显
    stockName(val) {
      this.receiptPersonId = val.personName
      this.getemplist.receiptPersonId = val.id
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
      searchreceipt(this.getemplist).then(res => {
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
      this.receiptPersonId = ''
      this.getemplist.receiptPersonId = ''
    },
    // 搜索
    handleFilter() {
      console.log(this.date)
      if (this.date === null) {
        this.getemplist.beginTime = ''
        this.getemplist.endTime = ''
      } else if (this.date.length === 0) {
        this.getemplist.beginTime = ''
        this.getemplist.endTime = ''
      } else {
        this.getemplist.beginTime = this.date[0] + ' 00:00:00'
        this.getemplist.endTime = this.date[1] + ' 23:59:59'
      }
      this.getemplist.pageNum = 1
      searchreceipt(this.getemplist).then(res => {
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
    // 修改组件修改成功后返回
    refreshlist(val) {
      if (val === true) {
        this.getlist()
      }
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/SaleOut/AddSaleOut')
    },
    // 选择主生产计划数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    handleConfirm() {
      this.employeeVisible = false
      this.$emit('receiptData', this.choosedata)
    }
    // 仓库管理员选择结束
  }
}
</script>

<style scoped>
  .ERP-container {
    margin: 50px 30px;
  }
  .filter-item{
    width: 140px;
  }
  .form-name{
    font-size: 18px;
    color: #373e4f;
    margin-bottom: -20px;
    margin-top: 30px;
  }
  .container{
    margin-top: 2%;
    border: 1px solid #eceff6;
  }
</style>
