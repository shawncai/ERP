<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">

      <el-input v-model="getemplist.productCode" :placeholder="$t('saleBillList.productCode')" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechoosepro" @clear="restFilter"/>
      <my-detail :control.sync="control" @product="productdetail"/>

      <el-input v-model="getemplist.productName" :placeholder="$t('saleBillList.productName')" class="filter-item" clearable @keyup.enter.native="handleFilter" />

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
      <el-select v-model="getemplist.receiptType" :placeholder="$t('shouldPayDetail.receiptType')" :value="getemplist.receiptType" clearable class="filter-item">
        <el-option :label="$t('update4.wwrk')" value="1"/>
        <el-option :label="$t('update4.wwck')" value="2"/>
      </el-select>

      <el-button v-waves class="filter-item" size="small" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
      <el-button v-waves :loading="downloadLoading" size="small" class="filter-item2" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>

    </el-card>

    <el-card :body-style="	{ padding: '10px' }" class="box-card" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :data="list"
        :height="tableHeight"
        :summary-method="getSummaries2"
        size="small"
        show-summary
        border
        style="width: 100%"
        @row-click="clickRow">
        <el-table-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>

        <el-table-column
          :label="$t('saleBillList.productCode')"
          prop="productCode"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('saleBillList.productName')"
          prop="productName"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('inventoryCollect.unit')"
          prop="unit"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('update4.outQuantity')"
          prop="outQuantity"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('update4.enterQuantity')"
          prop="enterQuantity"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('update4.processFactory')"
          prop="processFactory"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('update4.receiptType')"
          prop="receiptType"
          sortable
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.receiptType | receiptTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('update4.repositoryName')"
          prop="repositoryName"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('update4.beginQuantity')"
          prop="beginQuantity"
          sortable
          align="center"/>
      </el-table>
      <!-- 列表结束 -->
    </el-card>
  </div>
</template>

<script>
import { outSourceCount } from '@/api/count'
import { searchStockCategory } from '@/api/StockCategory'
import MyRepository from './components/MyRepository'
import waves from '@/directive/waves' // Waves directive
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyDetail from './components/MyDetail'

var _that
export default {
  name: 'OutSourceCount',
  directives: { waves, permission, permission2 },
  components: { MyRepository, MyDetail },
  filters: {
    receiptTypeFilter(sta) {
      const statusMap = {

        1: _that.$t('update4.wwrk'),
        2: _that.$t('update4.wwck')

      }
      return statusMap[sta]
    }
  },
  data() {
    return {
      tableHeight: 200,
      getemplist: {
        repositoryId: '',
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
    numFormat(num) {
      var res = num.toString().replace(/\d+/, function(n) { // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, function($1) {
          return $1 + ','
        })
      })
      return res
    },
    // 总计
    getSummaries2(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = this.numFormat(values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return (Number(prev) + Number(curr)).toFixed(2)
            } else {
              return (Number(prev)).toFixed(2)
            }
          }, 0))
          // console.log('sums[index]', sums[index])
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      sums[7] = ''
      return sums
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    // 导出
    handleExport() {
      const statusMap = {

        1: _that.$t('update4.wwrk'),
        2: _that.$t('update4.wwck')

      }
      console.log('this.list', this.list)
      const exportArr = this.list
      for (const i in exportArr) {
        exportArr[i].receiptTypeName = statusMap[exportArr[i].receiptType]
      }
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['物品编码', '物品名称', '单位', '出库数量', '入库数量', '加工单位', '单据类型', '门店名称', '期初数量']
          const filterVal = ['productCode', 'productName', 'unit', 'outQuantity', 'enterQuantity', 'processFactory', 'receiptTypeName', 'repositoryName', 'beginQuantity']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '采购订单查询表'
          })
          this.downloadLoading = false
        })
    },

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
      outSourceCount(this.getemplist).then(res => {
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
      console.log('val', val)
      this.getemplist.productCode = val
    },
    repositoryname(val) {
      console.log('repval', val)
      this.getemplist.repositoryId = val.id
      this.accessrepository = val.repositoryName
    },
    restFilter() {
      this.getemplist.productCode = ''
    },
    restFilter2() {
      this.getemplist.repositoryId = ''
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
