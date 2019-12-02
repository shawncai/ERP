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
        <el-table-column :label="$t('repair.repositoryId')" :resizable='false' prop="repositoryId" align="center" min-width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.repositoryId }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.repositoryName')" :resizable='false' prop="repositoryName" min-width="100px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.repositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.submit')" :resizable='false' align="center" prop="submit" min-width="60px">
          <template slot-scope="scope">
            <span>{{ scope.row.submit }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.assigned')" :resizable='false' prop="assigned" min-width="60px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.assigned }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.repair')" :resizable='false' prop="repair" min-width="60px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.repair }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.begin')" :resizable='false' prop="begin" min-width="60px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.begin }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.finished')" :resizable='false' prop="finished" min-width="60px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.finished }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.comment')" :resizable='false' prop="comment" min-width="60px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.comment }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import { categories, addcategories, deletecategories, editcategories } from '@/api/goods'
  import { countservice, countservice2 } from '@/api/repair'
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
          regionid: this.$store.getters.regionid,
          repositoryid: this.$store.getters.repositoryid,
        },
        listQuery2: {
          regionid: this.$store.getters.regionid,
          repositoryid: this.$store.getters.repositoryid,
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
        twotime: ''
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
        countservice(this.listQuery).then(response => {
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
        this.listQuery.pagenum = 1
        if (this.twotime === '' || this.twotime === null) {
          this.getList()
        } else {
          if (this.twotime === null) {
            this.listQuery2.begintime = ''
            this.listQuery2.endtime = ''
            countservice2(this.listQuery2).then(res => {
              this.list = res.data.data.content
              setTimeout(() => {
                this.listLoading = false
              }, 1.5 * 100)
            })
          } else {
            this.listQuery2.begintime = this.twotime[0]
            this.listQuery2.endtime = this.twotime[1]
            countservice2(this.listQuery2).then(res => {
              this.list = res.data.data.content
              setTimeout(() => {
                this.listLoading = false
              }, 1.5 * 100)
            })
          }
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
