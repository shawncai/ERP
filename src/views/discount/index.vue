<template>
  <div class="tab-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
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
        <el-table-column :label="$t('discount.discountName')" prop="discountName" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.discountName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('discount.discountRate')" prop="discountRate" min-width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.discountRate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('discount.createTime')" align="center" prop="createTime" min-width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('discount.actions')" align="center" min-width="230" class-name="small-padding fixed-width" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table2.edit') }}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('discount.Del') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :title="textMap[dialogStatus]" width="40%" center lock-scroll>
      <el-form :model="categoriesform" style="width: 400px; margin:0 auto;">
        <el-form-item v-if="dialogStatus === 'create'" :label-width="formLabelWidth" :label="$t('discount.discountName')">
          <el-input v-model="categoriesform.discountName"/>
        </el-form-item>
        <el-form-item v-if="dialogStatus === 'update'" :label-width="formLabelWidth" :label="$t('discount.discountName')">
          <el-input v-model="categoriesform.discountName" disabled/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('discount.discountRate')">
          <el-input v-model="categoriesform.discountRate"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { searchcategories } from '@/api/goods'
import { getstatByToken } from '@/api/login'
import { listdiscount, adddiscount, updatediscount, deletediscount } from '@/api/discount'
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Sample',
  components: { Pagination },
  directives: { waves, permission },
  data() {
    return {
      categoriesform: {
        discountName: '',
        discountRate: '',
        createid: ''
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
        update: 'edit discount',
        create: 'add discount'
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
      listdiscount().then(response => {
        console.log(response)
        this.list = response.data.data.content
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
        deletediscount(row).then(res => {
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
        discountname: '',
        discountrate: '',
        createid: ''
      }
    },
    // 商品分类添加
    handleCreate() {
      this.restform()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    createData() {
      this.categoriesform.createid = this.$store.getters.userId
      adddiscount(this.categoriesform).then(res => {
        if (res.data.ret === 200) {
          this.getList()
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    // 列表修改
    handleUpdate(row) {
      console.log(row)
      this.categoriesform = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    updateData() {
      const tempData = Object.assign({}, this.categoriesform)
      updatediscount(tempData).then(res => {
        if (res.data.ret === 200) {
          this.getList()
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '修改成功',
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
