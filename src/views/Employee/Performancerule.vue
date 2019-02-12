<template>
  <div class="tab-container">
    <div class="app-container">
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;">
        <el-table-column :label="$t('employee.id')" prop="id" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('employee.ruleName')" prop="ruleName" min-width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.ruleName | ruleName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('employee.mark')" align="center" prop="mark" min-width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.mark }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('employee.createTimerule')" prop="createTime" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column v-permission="[53, 54]" :label="$t('table.actions')" align="center" min-width="230" class-name="small-padding fixed-width" fixed="right">
          <template slot-scope="scope">
            <el-button v-permission="[53]" type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table2.edit') }}</el-button>
            <el-button v-permission="[54]" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('employee.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pagenum" :limit.sync="listQuery.pagesize" @pagination="getList" />
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :title="$t('employee.editperformancerules')" width="45%" center lock-scroll>
      <el-form :model="categoriesform" style="width: 400px; margin:0 auto;">
        <el-form-item :label-width="formLabelWidth" :label="$t('employee.mark')">
          <el-input v-model="categoriesform.mark"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('employee.cancel') }}</el-button>
        <el-button type="primary" @click="updateData()">{{ $t('employee.ok') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { searchcategories, addcategories } from '@/api/goods'
import { getstatByToken } from '@/api/login'
import { kpiruleslist, updaterules, deleterules } from '@/api/employee'
import waves from '@/directive/waves' // Waves directive
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Performancerule',
  components: { Pagination },
  directives: { waves, permission },
  filters: {
    ruleName: function(val) {
      if (val === 'A') {
        return 'very satisfied with the attitude'
      } else if (val === 'B') {
        return 'satisfied with the attitude'
      } else if (val === 'C') {
        return 'fair'
      } else if (val === 'D') {
        return 'not so satisfied with the attitude'
      } else if (val === 'E') {
        return 'unsatisfied with the attitude'
      } else if (val === 'H') {
        return 'very satisfied with the quality'
      } else if (val === 'I') {
        return 'satisfied with the quality'
      } else if (val === 'J') {
        return 'fair'
      } else if (val === 'K') {
        return 'not so satisfied with the quality'
      } else if (val === 'L') {
        return 'Unsatisfied with technician skills'
      } else if (val === 'X') {
        return 'X'
      }
    }
  },
  data() {
    return {
      categoriesform: {
        mark: '',
        kpirulesid: ''
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pagenum: 1,
        pagesize: 10,
        keyword: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      options: [],
      formLabelWidth: '120px',
      dialogImageUrl: '',
      dialogVisible: false,
      textMap: {
        update: '修改分类',
        create: '新增分类'
      },
      centerDialogVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    checkPermission,
    // 列表渲染
    getList() {
      this.listLoading = true
      kpiruleslist(this.listQuery).then(response => {
        this.list = response.data.data.content.list
        this.total = response.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      getstatByToken(this.$store.getters.token).then(res => {
        console.log(res.data.data.content)
        if (res.data.data.content !== true) {
          this.$alert('该账号在其他设备登录', '登出', {
            confirmButtonText: '确定',
            callback: action => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            }
          })
        }
      })
    },
    // 列表搜索
    handleFilter() {
      this.listLoading = true
      searchcategories(this.listQuery).then(res => {
        this.list = res.data.data.content.list
        this.total = res.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      })
    },
    // 列表删除
    handleDelete(row) {
      console.log(row)
      this.$confirm('This will permanently delete the record. Continue?', 'Warning', {
        confirmButtonText: 'ok',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        deleterules(row.id).then(res => {
          console.log(res)
          this.getList()
        })
        this.$message({
          type: 'success',
          message: 'Delete completed!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
      })
    },
    restform() {
      this.categoriesform = {
        categoryCode: '',
        categoryName: '',
        createrId: '',
        id: ''
      }
    },
    // 商品分类添加
    handleCreate() {
      this.restform()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    createData() {
      this.categoriesform.createrId = this.$store.getters.userId
      addcategories(this.categoriesform).then(() => {
        this.getList()
        this.dialogFormVisible = false
        this.$notify({
          title: 'successful',
          message: 'successful',
          type: 'success',
          duration: 2000
        })
      })
    },
    // 列表修改
    handleUpdate(row) {
      this.categoriesform = Object.assign({}, row) // copy obj
      this.dialogFormVisible = true
      console.log(row)
    },
    updateData() {
      const tempData = Object.assign({}, this.categoriesform)
      const kpirulesid = tempData.id
      const mark = tempData.mark
      updaterules(kpirulesid, mark).then(() => {
        this.getList()
        this.dialogFormVisible = false
        this.$notify({
          title: 'successful',
          message: 'successful',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style scoped>
  .tab-container{
    margin: 30px;
  }
  .app-container{
    padding: 0px;
  }
  .tap-container1{
    margin-left: 20px;
  }
  .filter-container{
    margin-left: 20px;
  }
  .el-tabs__header is-top{
    padding-left: 20px;
  }
</style>
