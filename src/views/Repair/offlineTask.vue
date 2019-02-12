<template>
  <div class="tab-container">
    <div class="filter-container">
      <el-input :placeholder="$t('repair.Ordernumber')" v-model="listQuery.code" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.employeeid" :placeholder="$t('repair.staffName')" clearable class="filter-item" style="width: 160px" filterable>
        <el-option v-for="item in staffnamelist" :key="item.id" :label="item.personName" :value="item.id"/>
      </el-select>
      <el-select v-model="listQuery.result" :placeholder="$t('repair.stat')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button v-permission="[88]" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    </div>
    <div class="app-container">
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        height="535"
        border
        fit
        highlight-current-row
        style="width: 100%;">
        <el-table-column :label="$t('repair.Ordernumber')" prop="code" align="center" width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.staffName')" prop="employeeName" min-width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.employeeName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.staffphone')" align="center" prop="employeePhone" min-width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.employeePhone }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.taskname')" prop="taskName" min-width="110px" align="center">
          <template slot-scope="scope">
            <span style="word-break: keep-all;word-wrap: break-word;white-space: pre-wrap;">{{ scope.row.taskName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.taskaddress')" prop="taskAddress" min-width="200px" align="center">
          <template slot-scope="scope">
            <span style="word-break: keep-all;word-wrap: break-word;white-space: pre-wrap;">{{ scope.row.taskAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.taskcontent')" prop="taskContent" width="150px" align="center">
          <template slot-scope="scope">
            <span style="word-break: keep-all;word-wrap: break-word;white-space: pre-wrap;">{{ scope.row.taskContent }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.createTime')" prop="createTime" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.createName')" prop="createName" min-width="110px" align="center">
          <template slot-scope="scope">
            <span style="word-break: keep-all;word-wrap: break-word;white-space: pre-wrap;">{{ scope.row.createName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.result')" prop="result" width="70px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.result | result }}</span>
          </template>
        </el-table-column>
        <el-table-column v-permission="[89]" :label="$t('table.actions')" align="center" min-width="100">
          <template slot-scope="scope">
            <el-button v-permission="[89]" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('repair.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pagenum" :limit.sync="listQuery.pagesize" @pagination="getList" />
    </div>
    <el-dialog :visible.sync="addproject" :title="$t('repair.new')" width="50%" center lock-scroll >
      <el-form :model="form" style="width: 400px; margin-left:50px;">
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.taskname')">
          <el-input v-model="form.taskname"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.taskaddress')">
          <el-input v-model="form.taskaddress"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.assignstaff')">
          <el-select v-model="form.employeeid" placeholder="please choose">
            <el-option v-for="item in staffnamelist" :key="item.id" :label="item.personName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.taskcontent')">
          <el-input v-model="form.taskcontent"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addproject = false">{{ $t('repair.cancel') }}</el-button>
        <el-button type="primary" @click="createData">{{ $t('repair.ok') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { editrepairproject, stafflist, gettaskofflinelist, deletetaskoffline, addtaskoffline } from '../../api/repair'
import waves from '@/directive/waves' // Waves directive
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const calendarTypeOptions = [
  { key: '1', display_name: 'finished' },
  { key: '2', display_name: 'unfinished' }
]
export default {
  name: 'Sample',
  components: { Pagination },
  directives: { waves, permission },
  filters: {
    result: function(val) {
      if (val === 1) {
        return 'finished'
      } else if (val === 2) {
        return 'unfinished'
      }
    }
  },
  data() {
    return {
      categoriesform: {
        price: '',
        itemid: ''
      },
      staffnamelist: [],
      calendarTypeOptions,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pagenum: 1,
        pagesize: 10,
        begintime: '',
        endtime: '',
        code: '',
        repositoryid: this.$store.getters.repositoryid,
        regionid: this.$store.getters.regionid
      },
      dialogFormVisible: false,
      dialogStatus: '',
      options: [],
      form: {
        taskname: '',
        taskaddress: '',
        taskcontent: '',
        createid: '',
        employeeid: '',
        repositoryid: this.$store.getters.repositoryid,
      },
      formLabelWidth: '120px',
      dialogVisible: false,
      addproject: false,
      centerDialogVisible: false
    }
  },
  created() {
    this.getList()
    this.getAllStaff()
  },
  mounted() {
    stafflist().then(res => {
      this.restaurants = res.data.data.content.list
      return this.restaurants
    })
  },
  methods: {
    checkPermission,
    // 列表渲染
    getList() {
      this.listLoading = true
      gettaskofflinelist(this.listQuery).then(response => {
        this.list = response.data.data.content.list
        this.total = response.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    getAllStaff() {
      const repositoryid = this.$store.getters.repositoryid
      const regionid = this.$store.getters.regionid
      stafflist(repositoryid, regionid).then(res => {
        this.staffnamelist = res.data.data.content.list
      })
    },
    // 列表搜索
    handleFilter() {
      this.listLoading = true
      this.listQuery.pagenum = 1
      gettaskofflinelist(this.listQuery).then(res => {
        this.list = res.data.data.content.list
        this.total = res.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      })
    },
    // 维修项目删除
    handleDelete(row) {
      this.$confirm('This will permanently delete the record. Continue?', 'Warning', {
        confirmButtonText: 'ok',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        console.log(row)
        deletetaskoffline(row).then(res => {
          if (res.data.ret === 200) {
            this.getList()
          }
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
    // 维修项目添加
    handleCreate() {
      this.addproject = true
    },
    createData() {
      this.form.createid = this.$store.getters.userId
      addtaskoffline(this.form).then(res => {
        this.getList()
        this.addproject = false
        this.$notify({
          title: 'successful',
          message: 'successful',
          type: 'success',
          duration: 2000
        })
      })
    },
    // 维修项目修改
    handleUpdate(row) {
      this.categoriesform = Object.assign({}, row) // copy obj
      this.dialogFormVisible = true
    },
    updateData() {
      const tempData = Object.assign({}, this.categoriesform)
      const itemid = tempData.id
      editrepairproject(this.categoriesform.price, itemid).then(res => {
        if (res.data.ret === 200) {
          this.getList()
          this.dialogFormVisible = false
          this.$notify({
            title: 'successful',
            message: 'successful',
            type: 'success',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .app-container >>> .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 23px;
    word-break: keep-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
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
