<template>
  <div class="tab-container">
    <div class="filter-container">
      <el-input :placeholder="$t('order.coding')" v-model="listQuery.keyword" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.repositoryid" placeholder="请选择" class="filter-item">
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.name"
          :value="item.id"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
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
        <el-table-column :label="$t('order.coding')" prop="code" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('order.personName')" prop="personName" min-width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.personName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('order.personPhone')" align="center" prop="personPhone" min-width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.personPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('order.address')" prop="address" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('order.deadline')" prop="deadline" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.deadline }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('order.idx')" prop="idx" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.idx }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('order.amount')" prop="amount" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('order.employeeName')" prop="employeeName" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.employeeName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('order.payTime')" prop="payTime" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.payTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('order.stat')" prop="stat" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.stat }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')" align="center" min-width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table2.edit') }}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('classification.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pagenum" :limit.sync="listQuery.pagesize" @pagination="getList" />
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :title="textMap[dialogStatus]" width="30%" center lock-scroll>
      <el-form :model="categoriesform" style="width: 400px; margin:0 auto;">
        <el-form-item :label-width="formLabelWidth" :label="$t('classification.coding')">
          <el-input v-model="categoriesform.categoryCode"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('classification.Category-Name')">
          <el-input v-model="categoriesform.categoryName"/>
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
import { deletecategories, editcategories } from '@/api/goods'
import { getrepositorylists, getgather, receiptseach } from '@/api/order'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Receipt',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      categoriesform: {
        categoryCode: '',
        categoryName: '',
        createrId: 1,
        id: ''
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pagenum: 1,
        pagesize: 10,
        repositoryid: undefined,
        ordercode: undefined
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
    this.getrepository()
  },
  methods: {
    // 列表渲染
    getList() {
      this.listLoading = true
      getgather(this.listQuery).then(response => {
        this.list = response.data.data.content.list
        this.total = response.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 门店查询下拉
    getrepository() {
      getrepositorylists().then((res) => {
        console.log(res)
        this.options = res.data.data.content.list
      })
    },
    // 列表搜索
    handleFilter() {
      this.listLoading = true
      receiptseach(this.listQuery).then(res => {
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
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletecategories(row).then(res => {
          console.log(res)
          this.getList()
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    restform() {
      this.categoriesform = {
        categoryCode: '',
        categoryName: '',
        createrId: 1,
        id: ''
      }
    },
    // 列表修改
    handleUpdate(row) {
      this.categoriesform = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    updateData() {
      console.log(this.categoriesform)
      const tempData = Object.assign({}, this.categoriesform)
      editcategories(tempData).then(() => {
        this.getList()
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '修改成功',
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
