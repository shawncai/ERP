<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <el-input v-model="getemplist.productCode" :placeholder="$t('StockQuery.productCode')" size= "mini" class="filter-item" clearable style="width: 200px" @keyup.enter.native="handleFilter" @focus="handleAddproduct"/>
      <my-detail :control.sync="control" @product="product"/>
      <el-input v-model="supplierId" :placeholder="$t('StockQuery.supplierId')" size= "mini" class="filter-item" style="width: 200px" @keyup.enter.native="handleFilter" @focus="handlechoose" @clear="restFilter"/>
      <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
      <el-date-picker
        v-model="date"
        type="daterange"
        size= "mini"
        range-separator="-"
        unlink-panels
        start-placeholder="Start"
        end-placeholder="End"
        value-format="yyyy-MM-dd"
      />

      <!-- 搜索按钮 -->
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-search" size= "mini" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 表格导出操作 -->
      <el-button v-waves class="filter-item" style="width: 86px" size= "mini" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <!-- <el-button v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" size= "mini" @click="handlePrint">{{ $t('public.print') }}</el-button> -->
    </el-card>

    <el-card class="box-card" style="margin-top: 10px" shadow="never">
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
        style="width: 100%;">
        <el-table-column :label="$t('StockQuery.sourceNumber')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.orderNumber }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="personalForm"/>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.stockDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.stockDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.productCode')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productCode }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.productName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.suppilerIdNum')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.suppilerId }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.suppilerName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.suppilerName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.typeId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productType }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.unit')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.unit }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.stockQuantity')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.stockQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.arrivalQuantity')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.arrivalQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.onQuantity')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.onQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.includeTaxEnterMoney')" :resizable="false" prop="judgeStat" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.includeTaxMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.unIncludeTaxEnterMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.money }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.onIncludedTax')" :resizable="false" prop="judgeStat" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.onIncludedTax }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockQuery.onUnIncludedTax')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.onUnIncludedTax }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
    </el-card>
  </div>
</template>

<script>
import { searchOnSummary } from '@/api/StockQuery'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import DetailList from './components/DetailList3'
import MyDetail from './components/MyDetail'
import MySupplier from './components/MySupplier'

var _that
export default {
  name: 'OnSummary',
  directives: { waves },
  components: { MySupplier, MyDetail, DetailList, Pagination },
  data() {
    return {
      tableHeight: 200,
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
      listLoading: true,
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
      this.getemplist.productCode = val.code
    },
    getlist() {
      // 采购价格分析列表数据
      this.listLoading = true
      searchOnSummary(this.getemplist).then(res => {
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
      // this.stockPersonId = ''
      // this.getemplist.stockPersonId = ''
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
      searchOnSummary(this.getemplist).then(res => {
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
        pageSize: 1000000,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds
      }
      searchOnSummary(parms).then(res => {
        if (res.data.ret === 200) {
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = ['采购订单编号', '采购日期', '物品编号', '物品名称', '供应商编号', '供应商名称', '规格', '单位', '采购数量', '到货数量', '在途数量', '含税进价', '去税进价', '在途含税金额', '在途去税金额']
            const filterVal = ['orderNumber', 'stockDate', 'productCode', 'productName', 'suppilerId', 'suppilerName', 'productType', 'unit', 'stockQuantity', 'arrivalQuantity', 'onQuantity', 'includeTaxMoney', 'money', 'onIncludedTax', 'onUnIncludedTax']
            const data = this.formatJson(filterVal, res.data.data.content.list)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: '在途物品查询'
            })
            this.downloadLoading = false
          })
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
