<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">

      <el-input v-model="getemplist.code" :placeholder="$t('ProcessFile.code')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="getemplist.shortName" :placeholder="$t('ProcessFile.shortName')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="workCenterId" :placeholder="$t('ProcessFile.workCenterId')" size="small" class="filter-item" clearable @clear="restFilter" @keyup.enter.native="handleFilter" @focus="workcenterchoose"/>

      <my-center :control.sync="centercontrol" @center="center"/>

      <el-popover
        v-model="visible2"
        size="small"
        placement="bottom"
        width="500"
        trigger="click">
        <el-select v-model="getemplist.testMethod" size="small" placeholder="请选择校验方式" clearable style="width: 40%;float: left;margin-left: 20px">
          <el-option value="1" label="自检"/>
          <el-option value="2" label="别人检"/>
        </el-select>
        <el-select v-model="getemplist.isCost" size="small" placeholder="是否计费" clearable style="width: 40%;float: right;margin-right: 20px">
          <el-option :label="$t('updates.yes')" value="1"/>
          <el-option :label="$t('updates.no')" value="2"/>
        </el-select>
        <el-select v-model="getemplist.isHelp" size="small" placeholder="是否外部协助" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
          <el-option :label="$t('updates.yes')" value="1"/>
          <el-option :label="$t('updates.no')" value="2"/>
        </el-select>
        <el-select v-model="getemplist.stat" size="small" placeholder="启用状态" clearable style="width: 40%;float: right;margin-right: 20px;margin-top: 20px">
          <el-option :label="$t('updates.yes')" value="1"/>
          <el-option :label="$t('updates.no')" value="2"/>
        </el-select>
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button v-waves size="small" class="filter-item" type="primary" style="float: right" @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" size="small" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>

      <el-button v-waves size="small" class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card :body-style=" { padding: '6px'}" class="box-card" shadow="never">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves size="small" class="filter-item" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['171-190-195-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['171-190-195-6']" v-waves :loading="downloadLoading" class="filter-item2" size="small" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['171-190-195-7']" v-waves class="filter-item2" size="small" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['171-190-195-1']" v-waves class="filter-item2" size="small" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </el-card>

    <el-card :body-style="	{ padding: '10px' }" class="box-card" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :height="tableHeight"
        :key="tableKey"
        :data="list"
        size="small"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @row-click="clickRow"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          align="center"/>
        <el-table-column :label="$t('ProcessFile.code')" :resizable="false" prop="id" align="center" width="150">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.code }}</span>
          </template>
          <detail-list3 :detailcontrol.sync="detailvisible" :detaildata.sync="personalForm"/>
        </el-table-column>
        <el-table-column :label="$t('ProcessFile.processName')" :resizable="false" prop="title" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.processName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProcessFile.shortName')" :resizable="false" prop="sourceNumber" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.shortName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProcessFile.workCenterName')" :resizable="false" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.workCenterName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProcessFile.timeUnit')" :resizable="false" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.timeUnit | timeUnitFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProcessFile.preTime')" :resizable="false" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.preTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProcessFile.runTime')" :resizable="false" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.runTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProcessFile.stat')" :resizable="false" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.stat | statFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button v-permission="['171-190-195-3']" type="primary" size="mini" @click="handleEdit(scope.row)">{{ $t('public.edit') }}</el-button>
            <el-button v-permission="['171-190-195-2']" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <my-dialog3 :editcontrol.sync="editVisible" :editdata.sync="personalForm" @rest="refreshlist"/>
      <!--修改结束=================================================-->
    </el-card>
  </div>
</template>

<script>
import { searchprocess, deletestandardProcess } from '@/api/ProcessFile'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyCenter from './components/MyCenter'
import MyDialog3 from './components/MyDialog3'
import DetailList3 from './components/DetailList3' // Secondary package based on el-pagination

var _that
export default {
  name: 'StandardProcess',
  directives: { waves, permission, permission2 },
  components: { DetailList3, MyDialog3, MyCenter, Pagination },
  filters: {
    statFilter(status) {
      const statusMap = {
        1: '启用',
        2: '未启用'
      }
      return statusMap[status]
    },
    timeUnitFilter(status) {
      const statusMap = {
        1: '天',
        2: '月'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableHeight: 200,

      // 工作中心回显
      workCenterId: '',
      // 工作中心控制组件
      centercontrol: false,
      // 详情组件数据
      detailvisible: false,
      // 更多搜索条件问题
      visible2: false,
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
      // 采购入库单列表查询加展示参数
      getemplist: {
        pageNum: 1,
        pageSize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds
      },
      // 传给修改组件的数据
      personalForm: {},
      // 控制修改组件
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
    clickRow(val) {
      this.$refs.table.toggleRowSelection(val)
    },
    checkPermission,
    // 标准工序列表数据
    getlist() {
      this.listLoading = true
      searchprocess(this.getemplist).then(res => {
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
      this.workCenterId = ''
      this.getemplist.workCenterId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      searchprocess(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
      })
    },
    // 修改操作
    handleEdit(row) {
      console.log(row)
      this.editVisible = true
      this.personalForm = Object.assign({}, row)
      this.personalForm.testMethod = String(row.testMethod)
      this.personalForm.timeUnit = String(row.timeUnit)
    },
    // 修改组件修改成功后返回
    refreshlist(val) {
      if (val === true) {
        this.getlist()
      }
    },
    // 详情操作
    handleDetail(row) {
      console.log(row)
      this.detailvisible = true
      this.personalForm = Object.assign({}, row)
      this.personalForm.testMethod = String(row.testMethod)
      this.personalForm.timeUnit = String(row.timeUnit)
    },
    // 工作中心focus事件
    workcenterchoose() {
      this.centercontrol = true
    },
    center(val) {
      console.log(val)
      this.workCenterId = val.workCenterName
      this.getemplist.workCenterId = val.id
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
        }).then(() => {
          deletestandardProcess(ids, this.$store.getters.userId).then(res => {
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
        }).catch(() => {
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
      }).then(() => {
        deletestandardProcess(row.id, this.$store.getters.userId).then(res => {
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('prompt.yqxsc')
        })
      })
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/ProcessFile/AddStandardProcess')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'ProcessFileName', 'ProcessFileShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
