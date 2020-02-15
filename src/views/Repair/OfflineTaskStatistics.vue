<template>
  <div class="tab-container">
    <div class="filter-container">
      <div class="filter-item">
        <el-date-picker
          v-model="twotime"
          type="daterange"
          range-separator="-"
          unlink-panels
          start-placeholder="start"
          end-placeholder="end"
          value-format="yyyy-MM-dd"/>
      </div>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
    </div>
    <div class="app-container">
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        border
        fit
        height="600"
        style="width: 100%;">
        <el-table-column
          type="index"
          :label="$t('repair.index')"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column :label="$t('repair.repositoryName')" :resizable='false' prop="repositoryName" min-width="100px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.repositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.total')" :resizable='false' align="center" prop="total" min-width="60px">
          <template slot-scope="scope">
            <span>{{ scope.row.total }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.unfinished')" :resizable='false' prop="unfinished" min-width="60px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.unfinished }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.gonging')" :resizable='false' prop="going" min-width="60px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.going }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.finished')" :resizable='false' prop="finished" min-width="60px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.finished }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import { categories, addcategories, deletecategories, editcategories } from '@/api/goods'
  import { countservice, gettaskofflinecount } from '@/api/repair'
  import { getstatByToken } from '@/api/login'
  import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
  import checkPermission from '@/utils/permission' // 权限判断函数
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  var _that
export default {
    name: 'Sample',
    components: { Pagination },
    directives: { waves, permission, permission2 },
    data() {
      return {
        categoriesform: {
          categoryCode: '',
          categoryName: '',
          createrId: '',
          id: ''
        },
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          begintime: '',
          endtime: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        options: [],
        formLabelWidth: '140px',
        dialogImageUrl: '',
        dialogVisible: false,
        textMap: {
          update: 'edit category',
          create: 'add category'
        },
        centerDialogVisible: false,
        twotime: []
      }
    },
    created() {
      this.getList()
    },
    beforeCreate() {
    _that = this
  },
  methods: {
      checkPermission,
      // 列表渲染
      getList() {
        this.listLoading = true
        gettaskofflinecount(this.listQuery).then(response => {
          this.list = response.data.data.content
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 100)
        })
        getstatByToken(this.$store.getters.token).then(res => {
          console.log(res.data.data.content)
          if (res.data.data.content !== true) {
            this.$alert('该账号在其他设备登录', '登出', {
              confirmButtonText: this.$t('prompt.qd'),
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
        this.listQuery.pagenum = 1
        if (this.twotime == null) {
          console.log(123)
          this.listQuery.begintime = ''
          this.listQuery.endtime = ''
          gettaskofflinecount(this.listQuery).then(response => {
            this.list = response.data.data.content
            setTimeout(() => {
              this.listLoading = false
            }, 0.5 * 100)
          })
        } else {
          this.listQuery.begintime = this.twotime[0]
          this.listQuery.endtime = this.twotime[1]
          gettaskofflinecount(this.listQuery).then(response => {
            this.list = response.data.data.content
            setTimeout(() => {
              this.listLoading = false
            }, 0.5 * 100)
          })
        }
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
