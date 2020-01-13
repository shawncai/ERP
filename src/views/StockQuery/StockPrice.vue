<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px" shadow="never">

      <el-input v-model="getemplist.productName" :placeholder="$t('StockQuery.productName')" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handleAddproduct"/>
      <my-detail :control.sync="control" @product="product"/>
      <el-date-picker
        v-model="date"
        :placeholder="$t('updates.cgsjd')"
        type="daterange"
        range-separator="-"
        unlink-panels
        start-placeholder="Start"
        end-placeholder="End"
        value-format="yyyy-MM-dd"/>

      <!-- 搜索按钮 -->
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 表格导出操作 -->
      <el-button v-waves class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
    </el-card>

    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;">
        <el-table-column :label="$t('StockQuery.productCode')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.productCode }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="personalForm"/>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.productName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.typeId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.typeId }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.unit')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.unit }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.maxPrice')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.maxPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.minPrice')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.minPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.avgPrice')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.avgPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.recentlyPrice')" :resizable="false" prop="judgeStat" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.recentlyPrice }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column :label="$t('StockQuery.includeTaxMoney')" :resizable="false" align="center" min-width="150">-->
        <!--<template slot-scope="scope">-->
        <!--<span>{{ scope.row.includeTaxMoney }}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
    </el-card>
  </div>
</template>

<script>
import { stockpricelist } from '@/api/StockQuery'
import waves from '@/directive/waves' // Waves directive
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import Pagination from '@/components/Pagination'
import DetailList from './components/DetailList'
import MyDetail from './components/MyDetail'

var _that
export default {
  name: 'StockPrice',
  directives: { waves, permission, permission2 },
  components: { MyDetail, DetailList, Pagination },
  data() {
    return {
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

  mounted() {
    // this.getlist()
    this.getamouthDate()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    checkPermission,
    getamouthDate() {
      const end = new Date()
      const start = new Date()
      start.setDate(1)
      this.date = [start, end]
    },
    // 物品名称focus控制
    handleAddproduct() {
      this.control = true
    },
    // 物品返回数据
    product(val) {
      this.getemplist.productName = val.productName
    },
    getlist() {
      // 采购价格分析列表数据
      this.listLoading = true
      stockpricelist(this.getemplist).then(res => {
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
        this.getemplist.beginTime = this.date[0]
        this.getemplist.endTime = this.date[1]
      } else {
        this.getemplist.beginTime = null
        this.getemplist.endTime = null
      }
      stockpricelist(this.getemplist).then(res => {
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
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'StockQueryName', 'StockQueryShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
