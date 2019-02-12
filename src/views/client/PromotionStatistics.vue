<template>
  <div class="tab-container">
    <div class="filter-container">
      <el-input :placeholder="$t('client.Store')" v-model="listQuery.repositoryname" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-date-picker
        v-model="listQuery.date"
        :placeholder="$t('client.dayseach')"
        class="filter-item"
        value-format="yyyy-MM-dd"
        type="date"/>
      <el-date-picker
        v-model="listQuery.date2"
        :placeholder="$t('client.mouthseach')"
        class="filter-item"
        value-format="yyyy-MM"
        type="month"/>
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
        <el-table-column :label="$t('client.repositoryName')" prop="repositoryName" align="center" min-width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.repositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('client.count')" prop="count" min-width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.count }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pagenum" :limit.sync="listQuery.pagesize" @pagination="getList" />
    </div>
  </div>
</template>
<script>
import { addcategories, deletecategories } from '@/api/goods'
import { getuserextension, userdetailbyid, addblacklist, seachuserextension } from '@/api/client'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'PromotionStatistics',
  components: { Pagination },
  directives: { waves },
  filters: {
    zhuan: function(val) {
      if (val === 1) {
        return '正常'
      } else if (val === 2) {
        return '解除'
      }
    },
    sex: function(val) {
      if (val === 1) {
        return '男'
      } else if (val === 2) {
        return '女'
      }
    }
  },
  data() {
    return {
      categoriesform: {
        description: '',
        id: ''
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pagenum: 1,
        pagesize: 10,
        date: '',
        date2: '',
        repositoryname: ''
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
      centerDialogVisible: false,
      details: {
        userInfo: '',
        serviceOrders: ''
      },
      dialogFormVisible2: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 列表渲染
    getList() {
      this.listLoading = true
      getuserextension(this.listQuery).then(response => {
        this.list = response.data.data.content.list
        this.total = response.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 列表搜索
    handleFilter() {
      this.listLoading = true
      if (this.listQuery.date === '') {
        const date = this.listQuery.date2
        const repositoryname = this.listQuery.repositoryname
        seachuserextension(repositoryname, date).then(response => {
          this.list = response.data.data.content.list
          this.total = response.data.data.content.totalCount
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 100)
        })
      } else {
        const date = this.listQuery.date
        const repositoryname = this.listQuery.repositoryname
        seachuserextension(repositoryname, date).then(response => {
          this.list = response.data.data.content.list
          this.total = response.data.data.content.totalCount
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 100)
        })
      }
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
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    // 列表修改
    handleUpdate(row) {
      userdetailbyid(row).then(res => {
        this.details = res.data.data
      })
      this.dialogFormVisible = true
    },
    addblacklist(res) {
      this.categoriesform = Object.assign({}, res)
      this.dialogFormVisible2 = true
    },
    updateData() {
      const employeeid = this.$store.getters.userId
      const userid = this.categoriesform.id
      const description = this.categoriesform.description
      addblacklist(employeeid, userid, description).then(res => {
        this.dialogFormVisible2 = false
        this.$notify({
          title: '成功',
          message: '拉黑成功',
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
