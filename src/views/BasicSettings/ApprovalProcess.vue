<template>
  <div class="ERP-container">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <el-input v-model="getemplist.process_name" :placeholder="$t('BasicSettings.process_name')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="getemplist.is_effective" :value="getemplist.is_effective" placeholder="请选择状态" class="filter-item" clearable>
        <el-option label="active" value="1"/>
        <el-option label="dead" value="2"/>
      </el-select>
      <el-select v-model="getemplist.type" :value="getemplist.type" filterable placeholder="请选择单据类型" style="width: 150px" class="filter-item" clearable>
        <el-option v-for="(item, index) in categorys" :key="index" :value="item.id" :label="item.categoryName"/>
      </el-select>
      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
      <!-- 批量操作 -->
      <!--      <el-dropdown @command="handleCommand">-->
      <!--        <el-button v-waves class="filter-item" type="primary">-->
      <!--          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon&#45;&#45;right"/>-->
      <!--        </el-button>-->
      <!--        <el-dropdown-menu slot="dropdown" style="width: 140px">-->
      <!--          <el-dropdown-item v-permission="['1-39-45-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>-->
      <!--        </el-dropdown-menu>-->
      <!--      </el-dropdown>-->
      <!-- 表格导出操作 -->
      <el-button v-permission="['1-39-45-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['1-39-45-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['1-39-45-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;float: right" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </div>
    <div class="app-container">
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
        <el-table-column
          type="selection"
          width="55"
          align="center"/>
        <el-table-column :label="$t('BasicSettings.id2')" :resizable="false" fixed="left" prop="id" align="center" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.process_name')" :resizable="false" fixed="left" prop="processName" align="center" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.processName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.isEffective')" :resizable="false" prop="isEffective" align="center" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.isEffective | genderFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.type3')" :resizable="false" align="center" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.typeName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.isMessage')" :resizable="false" prop="isMessage" align="center" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.isMessage | isMessageFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('UnitGroup.createPersonName')" :resizable="false" align="center" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.createPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('UnitGroup.createDate')" :resizable="false" align="center" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button v-permission="['1-39-45-8']" v-show="scope.row.isEffective === 2" title="启用" style="margin-left: 18px;" type="primary" size="mini" icon="el-icon-check" circle @click="open(scope.row)"/>
            <el-button v-permission="['1-39-45-9']" v-show="scope.row.isEffective === 1" title="停用" type="primary" size="mini" icon="el-icon-close" circle @click="close(scope.row)"/>
            <el-button v-permission="['1-39-45-3']" type="primary" size="mini" @click="handleEdit(scope.row)">{{ $t('public.edit') }}</el-button>
            <!--            <el-button v-permission="['1-39-45-2']" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <my-dialog :control.sync="editVisible" :editdata.sync="personalForm" @rest="refreshlist"/>
      <!--修改结束=================================================-->
    </div>
  </div>
</template>

<script>
import { searchProcess, deleteProcess, searchDetail, searchcategory, updateeapproval } from '@/api/BasicSettings'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyDialog from './components/MyDialog'

var _that
export default {
  name: 'ApprovalProcess',
  directives: { waves, permission, permission2 },
  components: { Pagination, MyDialog },
  filters: {
    genderFilter(status) {
      const statusMap = {
        1: '发布',
        2: '停用'
      }
      return statusMap[status]
    },
    isMessageFilter(status) {
      const statusMap = {
        1: '是',
        2: '否'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      personalForm2: {},
      // 单据类型数据
      categorys: [],
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
      // 审批流程列表查询加展示参数
      getemplist: {
        pagenum: 1,
        pagesize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds
      },
      // 传给组件的数据
      personalForm: {},
      // 控制组件数据
      editVisible: false
    }
  },

  mounted() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 启用停用操作
    open(row) {
      console.log('row', row)
      this.personalForm2.id = row.id
      this.personalForm2.isEffective = 1
      updateeapproval(this.personalForm2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.getlist()
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    close(row) {
      console.log('row', row)
      this.personalForm2.id = row.id
      this.personalForm2.isEffective = 2
      updateeapproval(this.personalForm2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.getlist()
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    checkPermission,
    getlist() {
      // 审批流程列表数据
      this.listLoading = true
      searchProcess(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      // 单据编号类型数据
      searchcategory().then(res => {
        if (res.data.ret === 200) {
          this.categorys = res.data.data.content
        }
      })
    },
    // 搜索
    handleFilter() {
      searchProcess(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
      })
    },
    // 修改操作
    handleEdit(row) {
      console.log(row)
      searchDetail(row.id).then(res => {
        console.log(res)
        this.personalForm.detail = res.data.data.detail
      })
      this.editVisible = true
      this.personalForm = Object.assign({}, row)
      this.personalForm.isEffective = String(row.isEffective)
      this.personalForm.isMessage = String(row.isMessage)
    },
    // 修改组件修改成功后返回
    refreshlist(val) {
      if (val === true) {
        this.getlist()
      }
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
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteProcess(ids, this.$store.getters.userId).then(res => {
            if (res.data.ret === 200 || res.data.ret === 100) {
              this.$notify({
                title: '删除成功',
                type: 'success',
                offset: 100
              })
              this.getlist()
            } else {
              this.$notify.error({
                title: '错误',
                message: '出错了',
                offset: 100
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    // 单条删除
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteProcess(row.id, this.$store.getters.userId).then(res => {
          if (res.data.ret === 200 || res.data.ret === 100) {
            this.$notify({
              title: '删除成功',
              type: 'success',
              offset: 100
            })
            this.getlist()
          } else {
            this.$notify.error({
              title: '错误',
              message: '出错了',
              offset: 100
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/BasicSettings/NewApprovalProcess')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'BasicSettingsName', 'BasicSettingsShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
    margin: 0px 30px;
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
