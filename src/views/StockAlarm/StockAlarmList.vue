<template>
  <div class="ERP-container">
    <!-- 搜索条件栏目 -->
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">

      <el-input v-model="searchRepositoryId" :placeholder="$t('StockAlarm.searchRepositoryId')" size="small" class="filter-item" clearable @clear="restFilter" @keyup.enter.native="handleFilter" @focus="handlechooseRep"/>

      <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>

      <el-input v-model="getemplist.code" :placeholder="$t('StockAlarm.code')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="getemplist.productName" :placeholder="$t('StockAlarm.productName')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-select v-model="getemplist.alarmType" :placeholder="$t('StockAlarm.flag')" size="small" class="filter-item" clearable >
        <el-option
          :label="$t('update4.xxyj')"
          value="1"/>
        <el-option
          :label="$t('update4.sxyj')"
          value="2"/>
        <el-option
          :label="$t('update4.aqkcyj')"
          value="3"/>
      </el-select>

      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" size="small" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card :body-style=" { padding: '6px'}" class="box-card" shadow="never">

      <!-- 表格导出操作 -->
      <el-button v-permission="['131-153-6']" v-waves :loading="downloadLoading" size="small" class="filter-item2" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <!-- <el-button v-permission="['131-153-7']" v-waves size="small" class="filter-item2" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button> -->
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
        @row-click="clickRow"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          fixed="left"
          align="center"/>
        <el-table-column :label="$t('public.id')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.searchRepositoryId')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.repositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.code')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.productName')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.typeName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.typeName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.stockMeasurement')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.stockMeasurement }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.color')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.color }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.downStock')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.downStock }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.upStock')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.upStock }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.onStock')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.existStock }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.flag')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span v-show="scope.row.alarmType === 3" style="color: #409EFF">{{ scope.row.alarmType | flagStatFileter }}</span>
            <span v-show="scope.row.alarmType === 2" style="color: #E6A23C">{{ scope.row.alarmType | flagStatFileter }}</span>
            <span v-show="scope.row.alarmType === 1" style="color: #F56C6C">{{ scope.row.alarmType | flagStatFileter }}</span>

          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
    </el-card>
  </div>
</template>

<script>
import { searchalarm } from '@/api/StockAlarm'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyRepository from './components/MyRepository'
import MyAccept from './components/MyAccept'
import MyCreate from './components/MyCreate'

var _that
export default {
  name: 'StockAlarmList',
  directives: { waves, permission, permission2 },
  components: { Pagination, MyRepository, MyAccept, MyCreate },
  filters: {
    flagStatFileter(status) {
      const statusMap = {
        1: _that.$t('update4.xxyj'),
        2: _that.$t('update4.sxyj'),
        3: _that.$t('update4.aqkcyj')
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableHeight: 200,
      // 搜索数据----------------------
      // 部门数据
      depts: [],
      // 仓库回显
      searchRepositoryId: '',
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 开始时间到结束时间
      date: [],
      // 预警列表传参数据
      getemplist: {
        pageNum: 1,
        pageSize: 10,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds
      },
      // 搜索结束 ----------------------
      // 列表操作 -------------------------
      // 批量操作
      moreaction: '',
      // 加载操作控制
      downloadLoading: false,
      // 表格数据
      list: [],
      list2: [],
      // 表格数据条数
      total: 0,
      // 表格识别
      tableKey: 0,
      // 加载表格
      listLoading: true
    }
  },
  activated() {
    // if (!this.firstenter) {
    this.getlist()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
    // }
    // this.getlist2()
  },
  mounted() {
    this.getlist()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
    // this.getlist2()
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
    // getlist2() {
    //   this.getemplist.pageNum = 1
    //   this.getemplist.pageSize = 9999
    //   searchalarm(this.getemplist).then(res => {
    //     if (res.data.ret === 200) {
    //       this.list2 = res.data.data.content.list
    //     }
    //   })
    // },
    checkPermission,
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.searchRepositoryId = val.repositoryName
      this.getemplist.searchRepositoryId = val.id
    },
    getlist() {
      // 预警列表数据
      this.listLoading = true
      searchalarm(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          this.listLoading = false
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 清空搜索条件
    restFilter() {
      this.searchRepositoryId = ''
      this.getemplist.searchRepositoryId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      searchalarm(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
          // this.restFilter()
        }
      })
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 导出
    handleExport() {
      for (let i = 0; i < this.list.length; i++) {
        // 1: '下限预警',
        // 2: '上线预警'
        if (this.list[i].alarmType === 1) {
          this.list[i].alarmTypeName = this.$t('update4.xxyj')
        } else if (this.list[i].alarmType === 2) {
          this.list[i].alarmTypeName = this.$t('update4.sxyj')
        } else if (this.list[i].alarmType === 3) {
          this.list[i].alarmTypeName = this.$t('update4.aqkcyj')
        }
      }
      console.log('this.list', this.list)
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = [this.$t('InventoryReplenishment.id'), this.$t('SmartReplenishmentList.productCode'), this.$t('SmartReplenishmentList.productName'), this.$t('Hmodule.ggxh'), this.$t('Hmodule.dw'), this.$t('StockAlarm.downStock'), this.$t('inventoryAlarm.upStock'), this.$t('inventoryAlarm.onStock'), this.$t('StockAlarm.flag')]
          const filterVal = ['id', 'code', 'productName', 'typeName', 'stockMeasurement', 'downStock', 'upStock', 'existStock', 'alarmTypeName']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '库存预警列表'
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
  .app-container >>> .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 24px;
    word-break: keep-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  .filter-container >>> .el-form-item__label{
    padding: 0;
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
