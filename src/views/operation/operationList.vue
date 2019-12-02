<template>
  <div class="ERP-container">
    <!-- 搜索条件栏目 -->
    <el-card class="box-card" style="margin-top: 15px;height: 60px">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" label-width="100px" style="margin-top: -9px">
          <el-col :span="5" style="margin-left: 10px">
            <el-form-item :label="$t('updates.czr')">
              <el-input v-model="operatorId" :placeholder="$t('income.handlePersonId')" clearable @keyup.enter.native="handleFilter" @focus="handlechooseStock"/>
            </el-form-item>
            <my-emp :control.sync="stockControl" @stockName="stockName"/>
          </el-col>
          <el-col :span="5">
            <el-form-item :label="$t('updates.mk')">
              <el-input v-model="getemplist.module" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left: 154px;">
            <!-- 搜索按钮 -->
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px">
      <!-- 表格导出操作 -->
      <el-button v-permission="['131-153-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['131-153-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column :label="$t('operation.module')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.module }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('operation.context')" :resizable="false" fixed="left" align="center" min-width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.context }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('operation.operatorId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.operatorName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('operation.ipAddress')" :resizable="false" align="center" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.ipAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('operation.createTime')" :resizable="false" align="center" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-button v-waves class="filter-item" type="primary" style="width: 86px;margin-left: 75%;margin-top: 1%;" round @click="handleFilter3">上一页</el-button>
        <el-button v-waves class="filter-item" type="primary" style="width: 86px;margin-top: 1%;" round @click="handleFilter4">下一页</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getOperationLog } from '@/api/operation'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyRepository from './components/MyRepository'
import MyEmp from './components/MyEmp'
import MyAccept from './components/MyAccept'
import MyCreate from './components/MyCreate'

var _that
export default {
  name: 'StockAlarmList',
  directives: { waves, permission, permission2 },
  components: { Pagination, MyRepository, MyEmp, MyAccept, MyCreate },
  filters: {
    flagStatFileter(status) {
      const statusMap = {
        1: '下限预警',
        2: '上线预警'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      operatorId: '',
      // 经办人控制框
      stockControl: false,
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
    handleFilter4() {
      const mm = this.getemplist.pageNum + 1
      this.getemplist.pageNum = mm
      console.log('this.getemplist.pageNum1', this.getemplist.pageNum)
      getOperationLog(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          console.log('res.data.data.content.length', res.data.data.content.length)
          console.log('mm', mm)
          console.log('this.getemplist.pageNum2', this.getemplist.pageNum)
          if (res.data.data.content.length > 0) {
            this.list = res.data.data.content
            // this.total = res.data.data.content.totalCount
            this.listLoading = false
          } else {
            this.getemplist.pageNum = this.getemplist.pageNum - 1
            this.$notify.error({
              title: '错误',
              message: '已经最后一页',
              offset: 100
            })
          }
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    handleFilter3() {
      console.log('this.getemplist.pageNum', this.getemplist.pageNum)
      if (this.getemplist.pageNum !== 1) {
        this.getemplist.pageNum = this.getemplist.pageNum - 1
        getOperationLog(this.getemplist).then(res => {
          if (res.data.ret === 200) {
            this.list = res.data.data.content
            // this.total = res.data.data.content.totalCount
            this.listLoading = false
          }
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 100)
        })
      }
    },
    stockName(val) {
      this.operatorId = val.personName
      this.getemplist.operatorId = val.id
    },
    // 经办人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
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
      getOperationLog(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
          // this.total = res.data.data.content.totalCount
          this.listLoading = false
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 清空搜索条件
    restFilter() {
      this.operatorId = ''
      this.getemplist.operatorId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      getOperationLog(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
          // this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
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
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'StockAlarmName', 'StockAlarmShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
    width: 140px;
    margin-left: 20px;
  }
</style>
