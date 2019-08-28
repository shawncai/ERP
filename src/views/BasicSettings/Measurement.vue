<template>
  <div class="ERP-container">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <el-input v-model="getemplist.categoryname" :placeholder="$t('BasicSettings.categoryname')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="getemplist.type" :placeholder="$t('BasicSettings.type2')" class="filter-item" clearable >
        <el-option value="1" label="数量" />
        <el-option value="2" label="体积" />
        <el-option value="3" label="重量" />
      </el-select>
      <el-select v-model="getemplist.iseffective" :placeholder="$t('BasicSettings.iseffective3')" class="filter-item" clearable >
        <el-option value="1" label="启用" />
        <el-option value="2" label="禁用" />
      </el-select>
      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['1-39-47-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['1-39-47-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['1-39-47-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['1-39-47-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;float: right" @click="handleAdd">{{ $t('public.add') }}</el-button>
      <!--新建列表开始-->
      <el-dialog :visible.sync="addNumberingVisible" title="新建计量单位" class="normal" width="600px">
        <el-form :model="Numberingform" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
          <el-form-item label-width="120px" label="计量单位名称">
            <el-input v-model="Numberingform.categoryname" placeholder="请输入计量单位名称" autocomplete="off" style="width: 200px"/>
          </el-form-item>
          <el-form-item label-width="120px" label="计量单位类别">
            <el-select v-model="Numberingform.type" placeholder="请选择计量单位类别">
              <el-option label="数量" value="1"/>
              <el-option label="体积" value="2"/>
              <el-option label="重量" value="3"/>
            </el-select>
          </el-form-item>
          <el-form-item label-width="120px" label="启用状态">
            <el-select v-model="Numberingform.iseffective" placeholder="请选择启用状态">
              <el-option label="启用" value="1"/>
              <el-option label="禁用" value="2"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="addNumberingVisible = false">取 消</el-button>
          <el-button v-no-more-click type="primary" @click="handleOk">确 定</el-button>
        </div>
      </el-dialog>
      <!--新建结束-->
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
        <el-table-column :label="$t('BasicSettings.id')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.categoryname')" :resizable="false" prop="categoryName" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.categoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.type2')" :resizable="false" prop="type" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.type | typeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.iseffective')" :resizable="false" prop="isEffective" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.isEffective | genderFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.createTime')" :resizable="false" prop="createTime" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button v-permission="['1-39-47-8']" v-show="scope.row.isEffective === 2" title="启用" style="margin-left: 18px;" type="primary" size="mini" icon="el-icon-check" circle @click="open(scope.row)"/>
            <el-button v-permission="['1-39-47-9']" v-show="scope.row.isEffective === 1" title="停用" type="primary" size="mini" icon="el-icon-close" circle @click="close(scope.row)"/>
            <el-button v-permission="['1-39-47-3']" type="primary" size="mini" @click="handleEdit(scope.row)">{{ $t('public.edit') }}</el-button>
            <el-button v-permission="['1-39-47-2']" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-dialog :visible.sync="editNumberingVisible" title="修改计量单位" class="normal" width="600px">
        <el-form :model="editNumberingform" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
          <el-form-item label-width="120px" label="计量单位名称">
            <el-input v-model="editNumberingform.categoryName" placeholder="请输入计量单位名称" autocomplete="off" style="width: 200px"/>
          </el-form-item>
          <el-form-item label-width="120px" label="计量单位类别">
            <el-select v-model="editNumberingform.type" placeholder="请选择计量单位类别" disabled>
              <el-option label="数量" value="1"/>
              <el-option label="体积" value="2"/>
              <el-option label="重量" value="3"/>
            </el-select>
          </el-form-item>
          <el-form-item label-width="120px" label="启用状态">
            <el-select v-model="editNumberingform.isEffective" placeholder="请选择启用状态">
              <el-option label="启用" value="1"/>
              <el-option label="禁用" value="2"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="editNumberingVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEditOk">修改</el-button>
        </div>
      </el-dialog>
      <!--修改结束=================================================-->
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { searchMea2, deletemea, createmea, updatemea } from '@/api/BasicSettings'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Measurement',
  directives: { waves, permission, permission2 },
  components: { Pagination },
  filters: {
    genderFilter(status) {
      const statusMap = {
        1: '已启用',
        2: '停用'
      }
      return statusMap[status]
    },
    typeFilter(status) {
      const statusMap = {
        1: '数量',
        2: '体积',
        3: '重量'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      personalForm2: {},
      // 修改数据集合
      editNumberingform: {},
      // 新建数据集合
      Numberingform: {
        category: '',
        categoryname: '',
        type: '',
        iseffective: '1'
      },
      // 修改窗口控制器
      editNumberingVisible: false,
      // 新建窗口控制器
      addNumberingVisible: false,
      // 控制组件数据
      editVisible: false,
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
      // 计量单位查询加展示参数
      getemplist: {
        categoryname: '',
        type: '',
        iseffective: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    // 启用停用操作
    open(row) {
      console.log('row', row)
      this.personalForm2.id = row.id
      this.personalForm2.isEffective = 1
      updatemea(this.personalForm2).then(res => {
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
      updatemea(this.personalForm2).then(res => {
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
      // 计量单位数据
      this.listLoading = true
      searchMea2(this.getemplist).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 搜索
    handleFilter() {
      searchMea2(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
          this.total = res.data.data.content.length
        }
      })
    },
    // 修改操作
    handleEdit(row) {
      console.log(row)
      this.editNumberingform.categoryName = row.categoryName
      this.editNumberingform.isEffective = String(row.isEffective)
      this.editNumberingform.type = String(row.type)
      this.editNumberingVisible = true
    },
    // 确认修改
    handleEditOk() {
      console.log(this.editNumberingform)
      updatemea(this.editNumberingform).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '修改成功',
            type: 'success',
            offset: 100
          })
          this.getlist()
          this.editNumberingVisible = false
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg,
            offset: 100
          })
        }
      })
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
          deletemea(ids, this.$store.getters.userId).then(res => {
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
        deletemea(row.id, this.$store.getters.userId).then(res => {
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
    // 清除数据
    restNumberingform() {
      this.Numberingform = {
        category: '',
        type: '',
        iseffective: '1'
      }
    },
    // 新增数据
    handleAdd() {
      this.addNumberingVisible = true
    },
    // 确认新增
    handleOk() {
      createmea(this.Numberingform).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '新增成功',
            type: 'success',
            offset: 100
          })
          this.getlist()
          this.restNumberingform()
          this.addNumberingVisible = false
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg,
            offset: 100
          })
        }
      })
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['序号', '编号规则名称', '单据类型', '编号前缀', '日期类型', '流水号长度', '状态', '创建日期']
          const filterVal = ['id', 'ruleName', 'type', 'prefix', 'dateType', 'length', 'isEffective', 'createTime']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '编号规则资料表'
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
