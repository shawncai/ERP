<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">
      <el-input v-model="accessrepository" :placeholder="$t('updates.repository')" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechooseRep" @clear="restFilter2"/>
      <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
      <el-date-picker
        v-model="date"
        :default-time="['00:00:00', '23:59:59']"
        type="daterange"
        range-separator="-"
        unlink-panels
        value-format="yyyy-MM-dd"
        style="width: 250px"/>

      <el-button v-waves class="filter-item" size="small" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>

    <el-card :body-style="	{ padding: '10px' }" class="box-card" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :data="list"
        :height="tableHeight"
        size="small"
        border
        style="width: 100%"
        @row-click="clickRow">
        <el-table-column
          :label="$t('update4.rq')"
          prop="receiptDate"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('update4.djh')"
          prop="receiptNumber"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('update4.khm')"
          prop="customerName"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('update4.ck')"
          prop="handleRepositoryName"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('update4.djlx')"
          prop="receiptType"
          sortable
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.receiptType | receiptTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('update4.addMoney')"
          prop="addMoney"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('update4.lessMoney')"
          prop="lessMoney"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('update4.invoiceNumber')"
          prop="invoiceNumber"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('update4.remark')"
          prop="remark"
          sortable
          align="center"/>
      </el-table>
      <!-- 列表结束 -->
    </el-card>
  </div>
</template>

<script>
import { incomeAnalysis } from '@/api/count'
import { searchStockCategory } from '@/api/StockCategory'
import MyRepository from './components/MyRepository'
import waves from '@/directive/waves' // Waves directive
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyDetail from './components/MyDetail'

var _that
export default {
  name: 'IncomeAnalysis',
  directives: { waves, permission, permission2 },
  components: { MyRepository, MyDetail },
  filters: {
    receiptTypeFilter(sta) {
      const statusMap = {

        1: _that.$t('update4.xsckd'),
        2: _that.$t('update4.xsthd'),
        3: _that.$t('update4.skd'),
        4: _that.$t('update4.srk')

      }
      return statusMap[sta]
    }
  },
  data() {
    return {
      tableHeight: 200,
      getemplist: {
        searchRepositoryId: '',
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds,
        beginTime: '',
        endTime: '',
        productCode: '',
        productName: ''
      },
      date: [],
      list: [],
      control: false,
      repositorycontrol: false,
      accessrepository: '',
      listLoading: false
    }
  },
  activated() {
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  mounted() {
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
    handleFilter() {
      if (this.date.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: '请选择日期开始搜索',
          offset: 100
        })
        return false
      }
      this.getemplist.beginTime = this.date[0] + ' 00:00:00'
      this.getemplist.endTime = this.date[1] + ' 23:59:59'
      console.log(this.getemplist)
      this.listLoading = true
      incomeAnalysis(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
        }
        this.listLoading = false
      })
    },
    handlechoosepro() {
      this.control = true
    },
    handlechooseRep() {
      this.repositorycontrol = true
    },
    productdetail(val) {
      this.getemplist.productCode = val.productCode
    },
    repositoryname(val) {
      console.log('repval', val)
      this.getemplist.searchRepositoryId = val.id
      this.accessrepository = val.repositoryName
    },
    restFilter() {
      this.getemplist.productCode = ''
    },
    restFilter2() {
      this.getemplist.searchRepositoryId = ''
      this.accessrepository = ''
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
