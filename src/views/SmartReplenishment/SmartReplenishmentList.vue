<template>
  <div class="ERP-container">
    <!-- 搜索条件栏目 -->
    <el-card class="box-card" style="margin-top: 15px">
      <el-input v-model="saleRepositoryId" :placeholder="$t('SmartReplenishmentList.repositoryName')" class="filter-item" clearable @clear="restFilter" @keyup.enter.native="handleFilter" @focus="handlechooseRep"/>
      <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
      <el-input v-model="getemplist.productCode" :placeholder="$t('SmartReplenishmentList.productCode')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input
        v-waves
        v-model="getemplist.productName"
        :placeholder="$t('SmartReplenishmentList.productName')"
        class="filter-item"
        clearable/>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="width: 86px;margin-top: 10px"
        @keyup.enter.native="handleFilter"
        @click="handleFilter">{{ $t('public.search') }}</el-button>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px">
      <!-- 表格导出操作 -->
      <el-button v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <el-button v-waves class="filter-item" icon="el-icon-document" style="width: 86px" @click="handleStoragemove">{{ $t('SmartReplenishmentList.Storagemove') }}</el-button>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        :row-key="getRowKeys"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          :selectable="selectInit"
          type="selection"
          width="55"
          reserve-selection
        />
        <el-table-column :label="$t('public.id')" :resizable="false" type="index" align="center" width="100"/>
        <el-table-column :label="$t('SmartReplenishmentList.productCode')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productCode }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SmartReplenishmentList.productName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SmartReplenishmentList.repositoryName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.repositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SmartReplenishmentList.unit')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.unit }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SmartReplenishmentList.existStock')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.existStock }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SmartReplenishmentList.onStock')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.onStock }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SmartReplenishmentList.upStock')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.upStock }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SmartReplenishmentList.downStock')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.downStock }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SmartReplenishmentList.salesDay')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.daySale }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SmartReplenishmentList.adviceQuantity')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.adviceQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SmartReplenishmentList.Days')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.days }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('SmartReplenishmentList.isMove')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.isMove | isMoveFilter }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button v-permission="['54-83-3']" type="primary" size="mini" @click="handleallocation(scope.row)" >生成调拨单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
    </el-card>
  </div>
</template>

<script>
import { smartReplenishmentList } from '@/api/SmartReplenishmentList'
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
  name: 'SmartReplenishmentList',
  directives: { waves, permission, permission2 },
  components: { Pagination, MyRepository, MyAccept, MyCreate },
  filters: {
    isMoveFilter(status) {
      const statusMap = {
        1: _that.$t('updates.yes'),
        2: _that.$t('updates.no')
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // 搜索数据----------------------
      // 部门数据
      depts: [],
      // 仓库回显
      saleRepositoryId: '',
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
      // 表格数据条数
      total: 0,
      // 表格识别
      tableKey: 0,
      // 加载表格
      listLoading: true
    }
  },

  mounted() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 禁止选择
    selectInit(row, index) {
      if (this.moreaction.length) {
        if (row.repositoryId !== this.moreaction[0].repositoryId) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
      // if (row.repositoryId !== this.moreaction[0].repositoryId) {
      //   return true
      // } else {
      //   return false
      // }
    },
    // 获取row的key值
    getRowKeys(row) {
      console.log(row.id)
      return row.id
    },
    checkPermission,
    // 批量新建调拨单
    handleStoragemove() {
      this.$store.dispatch('getempcontract4', this.moreaction)
      this.$router.push('/Storagemove/AddStoragemove')
    },
    // 新建调拨单
    handleallocation(row) {
      console.log('消息', row)
      this.$store.dispatch('getempcontract4', row)
      this.$router.push('/Storagemove/AddStoragemove')
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      this.saleRepositoryId = val.repositoryName
      this.getemplist.saleRepositoryId = val.id
    },
    getlist() {
      // 预警列表数据
      this.listLoading = true
      smartReplenishmentList(this.getemplist).then(res => {
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
      this.saleRepositoryId = ''
      this.getemplist.saleRepositoryId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      smartReplenishmentList(this.getemplist).then(res => {
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
      console.log('多选', val)
      this.moreaction = val
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'SmartReplenishmentListName', 'SmartReplenishmentListShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
    margin: 0px 15px;
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
