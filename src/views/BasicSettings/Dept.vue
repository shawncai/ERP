<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 15px">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
      <el-dialog :visible.sync="addDeptVisible" title="新建部门" width="500px" style="margin-top:10px">
        <el-form :model="AddDeptform" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
          <el-form-item label-width="120px" label="部门编号">
            <el-input v-model="AddDeptform.deptno" placeholder="请输入部门编号" autocomplete="off" style="width: 200px"/>
          </el-form-item>
          <el-form-item label-width="120px" label="部门名称">
            <el-input v-model="AddDeptform.deptname" placeholder="请输入部门名称" autocomplete="off" style="width: 200px"/>
          </el-form-item>
          <el-form-item label-width="120px" label="启用状态">
            <el-select v-model="AddDeptform.iseffective" placeholder="请选择状态" style="width: 200px">
              <el-option label="启用 " value="1"/>
              <el-option label="停用" value="2"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="addDeptVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleOk">确 定</el-button>
        </div>
      </el-dialog>
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
        <el-table-column
          type="selection"
          width="55"
          align="center"/>
        <el-table-column :label="$t('BasicSettings.id')" :resizable="false" prop="id" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.deptName')" :resizable="false" prop="deptName" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.deptName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.deptNo')" :resizable="false" prop="deptNo" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.deptNo }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.iseffective')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.isEffective | iseffectiveFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.createTime')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.personName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">{{ $t('public.edit') }}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <!--修改开始=================================================-->
      <el-dialog :visible.sync="editDeptVisible" title="修改部门" width="500px">
        <el-form :model="editDeptform" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
          <el-form-item label-width="120px" label="部门编号">
            <el-input v-model="editDeptform.deptNo" autocomplete="off" style="width: 200px"/>
          </el-form-item>
          <el-form-item label-width="120px" label="部门名称">
            <el-input v-model="editDeptform.deptName" autocomplete="off" style="width: 200px"/>
          </el-form-item>
          <el-form-item label-width="120px" label="启用状态">
            <el-select v-model="editDeptform.isEffective" placeholder="请选择状态" style="width: 200px">
              <el-option label="启用 " value="1"/>
              <el-option label="停用" value="2"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="editDeptVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleYes">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改结束=================================================-->
    </el-card>
  </div>
</template>

<script>
import { getdeptlist, adddept, updatedept, deletedept } from '@/api/BasicSettings'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import MyDialog from './components/MyDialog'

export default {
  name: 'Dept',
  directives: { waves },
  components: { Pagination, MyDialog },
  filters: {
    genderFilter(status) {
      const statusMap = {
        1: '男',
        2: '女'
      }
      return statusMap[status]
    },
    iseffectiveFilter(status) {
      const statusMap = {
        1: '启用',
        2: '禁用'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // 新建弹窗
      addDeptVisible: false,
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
        pagenum: 1,
        pagesize: 10
      },
      // 新建部门
      AddDeptform: {
        iseffective: '1',
        createid: this.$store.getters.userId
      },
      // 修改部门弹窗
      editDeptVisible: false,
      // 修改部门
      editDeptform: {}
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    getlist() {
      // 部门列表数据
      this.listLoading = true
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      this.listLoading = false
    },
    // 修改操作
    handleEdit(row) {
      console.log(row)
      this.editDeptVisible = true
      this.editDeptform = Object.assign({}, row)
      this.editDeptform.isEffective = String(row.isEffective)
    },
    // 确认修改
    handleYes() {
      console.log(this.editDeptform)
      updatedept(this.editDeptform).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            offset: 100
          })
          this.getlist()
          this.editDeptVisible = false
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
          deletedept(ids, this.$store.getters.userId).then(res => {
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
        deletedept(row.id, this.$store.getters.userId).then(res => {
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
    restDept() {
      this.AddDeptform = {}
    },
    // 新增数据
    handleAdd() {
      this.addDeptVisible = true
    },
    // 确认增加
    handleOk() {
      console.log(this.AddDeptform)
      adddept(this.AddDeptform).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '成功',
            message: '新建成功',
            type: 'success',
            offset: 100
          })
          this.getlist()
          this.restDept()
          this.addDeptVisible = false
        }
      })
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
  .filter-container >>> .el-form-item__label{
    padding: 0;
  }
  .ERP-container {
    margin: 0px 30px;
  }
  .ERP-container >>> .el-dialog {
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
  }
  .ERP-container >>> .el-dialog__header {
    position: inherit;
    width: 500px;
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
