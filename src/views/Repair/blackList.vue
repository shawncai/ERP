<template>
  <div class="tab-container">
    <div class="filter-container">
      <el-input :placeholder="$t('lostUnits.username')" v-model="listQuery.personname" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="$t('lostUnits.coding')" v-model="listQuery.productsn" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.stat" :placeholder="$t('lostUnits.stat')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
    </div>
    <div class="app-container">
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;">
        <el-table-column :label="$t('lostUnits.Serialnumber')" :resizable="false" prop="id" align="center" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('lostUnits.name')" :resizable="false" prop="personName" min-width="130px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.personName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('lostUnits.tel')" :resizable="false" align="center" prop="phoneNumber" min-width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.phoneNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('lostUnits.coding')" :resizable="false" prop="productSn" min-width="120px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.productSn }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('lostUnits.stat')" :resizable="false" prop="stat" min-width="90px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.stat | zhuan }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('lostUnits.employeeName')" :resizable="false" prop="employeeName" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.employeeName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('lostUnits.description')" :resizable="false" prop="description" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('lostUnits.modifyTime')" :resizable="false" prop="createTime" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :resizable="false" :label="$t('table.actions')" align="center" min-width="100" >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table2.edit') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pagenum" :limit.sync="listQuery.pagesize" @pagination="getList" />
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :title="$t('lostUnits.stat')" width="45%" center lock-scroll>
      <el-form :model="categoriesform" style="width: 400px; margin:0 auto;">
        <el-form-item :label-width="formLabelWidth" :label="$t('lostUnits.stat')">
          <el-select v-model="categoriesform.stat" :placeholder="$t('table2.status')" clearable class="filter-item">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('lostUnits.cancel') }}</el-button>
        <el-button type="primary" @click="updateData">{{ $t('lostUnits.ok') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { blacklist, judgeblacklist, searcblacklist } from '@/api/lostUnits'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
const calendarTypeOptions = [
  { key: 1, display_name: 'normal' },
  { key: 2, display_name: 'Relieve' }
]

var _that
export default {
  name: 'Sample',
  components: { Pagination },
  directives: { waves, permission, permission2 },
  filters: {
    zhuan: function(val) {
      if (val === 1) {
        return 'normal'
      } else if (val === 2) {
        return 'Relieve'
      }
    }
  },
  data() {
    return {
      categoriesform: {
        stat: ''
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pagenum: 1,
        pagesize: 10,
        personname: '',
        stat: '',
        productsn: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      options: [],
      formLabelWidth: '120px',
      dialogImageUrl: '',
      dialogVisible: false,
      centerDialogVisible: false,
      calendarTypeOptions
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
      blacklist(this.listQuery).then(response => {
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
      searcblacklist(this.listQuery).then(res => {
        this.list = res.data.data.content.list
        this.total = res.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
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
    restfcat() {
      this.categoriesform = {
        stat: ''
      }
    },
    // 列表修改
    handleUpdate(row) {
      this.restfcat()
      this.categoriesform = Object.assign({}, row) // copy obj
      this.dialogFormVisible = true
    },
    updateData() {
      console.log(this.categoriesform)
      const tempData = Object.assign({}, this.categoriesform)
      judgeblacklist(tempData).then(() => {
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
