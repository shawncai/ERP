<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <el-input v-model="getemplist.productCode" :placeholder="$t('StockQuery.productCode')" size="mini" class="filter-item" clearable style="width: 150px" @keyup.enter.native="handleFilter" @focus="handleAddproduct"/>
      <my-detail :control.sync="control" @product="product"/>
      <el-input v-model="supplierId" :placeholder="$t('StockQuery.supplierId')" size="mini" class="filter-item" style="width: 200px" clearable @keyup.enter.native="handleFilter" @clear="restFilter" @focus="handlechoose"/>
      <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
      <el-date-picker
        v-model="date"
        type="daterange"
        size="mini"
        range-separator="-"
        unlink-panels
        style="width: 230px;"
        start-placeholder="Start"
        end-placeholder="End"
      />
      <el-button v-waves type="primary" icon="el-icon-search" size="mini" class="filter-item" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
      <el-button v-waves :loading="downloadLoading" size="small" class="filter-item2" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>

    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <span style="float: left;margin-bottom: 13px">{{ $t('updates.tjx') }}</span>
      <el-radio-group v-model="checkboxVal" style="float: left;margin-left: 10px">
        <el-radio label="quantity">{{ $t('updates.shul') }}</el-radio>
        <el-radio label="includeTaxMoney">{{ $t('updates.hsjehj') }}</el-radio>
        <el-radio label="includeTaxPrice">{{ $t('updates.hsj') }}</el-radio>
        <el-radio label="totalMoney">{{ $t('updates.jehj') }}</el-radio>
      </el-radio-group>
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
        fit
        size="small"
        highlight-current-row
        style="width: 100%;">
        <el-table-column :label="$t('StockQuery.productName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.supplierName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.supplierName }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="formThead.indexOf('quantity') > -1" :label="$t('StockQuery.quantity')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.quantity }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="formThead.indexOf('includeTaxMoney') > -1" :label="$t('StockQuery.includeTaxMoney2')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.includeTaxMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="formThead.indexOf('includeTaxPrice') > -1" :label="$t('StockQuery.includeTaxPrice2')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.includeTaxPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="formThead.indexOf('totalMoney') > -1" :label="$t('StockQuery.totalMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.totalMoney }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
    </el-card>
  </div>
</template>

<script>
const defaultFormThead = ['quantity']
import { stockcountlist } from '@/api/StockQuery'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import DetailList from './components/DetailList'
import MyDetail from './components/MyDetail'
import MySupplier from './components/MySupplier'
import { GMTToStr } from '@/utils'

var _that
export default {
  name: 'StockCount',
  directives: { waves },
  components: { MySupplier, MyDetail, DetailList, Pagination },
  data() {
    return {
      tableHeight: 200,
      formTheadOptions: ['quantity', 'includeTaxMoney', 'includeTaxPrice', 'totalMoney'],
      formThead: defaultFormThead,
      checkboxVal: defaultFormThead,
      // 供应商回显
      supplierId: '',
      // 控制供应商
      empcontrol: false,
      // 物品名称回显
      productName: '',
      // 控制物品弹窗
      control: false,
      // 详情组件数据
      detailvisible: false,
      // 表格数据
      list: [],
      // 表格数据条数
      total: 0,
      // 表格识别
      tableKey: 0,
      // 加载表格
      listLoading: false,
      // 采购价格分析查询加展示参数
      getemplist: {
        pageNum: 1,
        pageSize: 10
      },
      // 传给组件的数据
      personalForm: {},
      // 修改控制组件数据
      editVisible: false,
      // 开始时间到结束时间
      date: [],
      downloadLoading: false
    }
  },
  watch: {
    checkboxVal(valArr) {
      this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
      console.log(this.formThead)
      this.tableKey = this.tableKey + 1// 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
    }
  },
  activated() {
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  mounted() {
    // this.getlist()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
    this.getchecked()
    this.getamouthDate()
    this.handleFilter()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getamouthDate() {
      const end = new Date()
      const start = new Date()
      start.setDate(1)
      this.date = [start, end]
    },
    getchecked() {
      this.checkboxVal = 'quantity'
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
    // 物品名称focus控制
    handleAddproduct() {
      this.control = true
    },
    // 物品返回数据
    product(val) {
      this.getemplist.productName = val.productName
      this.getemplist.productCode = val.code
    },
    getlist() {
      // 采购价格分析列表数据
      this.listLoading = true
      stockcountlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
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
      if (this.date !== null && this.date !== '') {
        this.getemplist.beginTime = GMTToStr(this.date[0])
        this.getemplist.endTime = GMTToStr(this.date[1])
      } else {
        this.getemplist.beginTime = null
        this.getemplist.endTime = null
      }
      stockcountlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
    },
    // 详情操作
    handleDetail(row) {
      console.log(row)
      this.detailvisible = true
      this.personalForm = Object.assign({}, row)
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
      const parms = {
        productCode: this.getemplist.productCode,
        supplierId: this.getemplist.supplierId,
        beginTime: this.getemplist.beginTime,
        endTime: this.getemplist.endTime,
        pageNum: 1,
        pageSize: 1000000
      }
      stockcountlist(parms).then(res => {
        if (res.data.ret === 200) {
         import('@/vendor/Export2Excel').then(excel => {
           const tHeader = ['物品名称', '供应商名称', '数量', '含税金额合计', '含税价', '金额合计']
           const filterVal = ['productName', 'supplierName', 'quantity', 'includeTaxMoney', 'includeTaxPrice', 'totalMoney']
           const data = this.formatJson(filterVal, res.data.data.content.list)
           excel.export_json_to_excel({
             header: tHeader,
             data,
             filename: '采购汇总表'
           })
           this.downloadLoading = false
         })
          // this.restFilter()
        }
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
