<template>
  <div class="ERP-container">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <el-input v-model="getemplist.adjustnumber" :placeholder="$t('Product.adjustnumber')" style="width: 9%" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.productcode" :placeholder="$t('Product.productcode')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.productname" :placeholder="$t('Product.productname2')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['1-31-35-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['1-31-35-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['1-31-35-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['1-31-35-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;float: right" @click="handleAdd">{{ $t('public.add') }}</el-button>
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
          fixed="left"
          align="center"/>
        <el-table-column :label="$t('Product.id')" :resizable="false" fixed="left" prop="adjustNumber" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.adjustNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Product.title')" :resizable="false" fixed="left" prop="title" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Product.productCode')" :resizable="false" prop="productCode" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productCode }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Product.productname2')" :resizable="false" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Product.adjustCostPrice')" :resizable="false" prop="adjustCostPrice" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.adjustCostPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Product.adjustTradePrice')" :resizable="false" prop="adjustTradePrice" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.adjustTradePrice }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Product.adjustSalePrice')" :resizable="false" prop="adjustSalePrice" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.adjustSalePrice }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Product.adjustMemberPrice')" :resizable="false" prop="adjustMemberPrice" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.adjustMemberPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Product.adjustLowerPrice')" :resizable="false" prop="adjustLowerPrice" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.adjustLowerPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button v-permission="['1-31-35-3']" type="primary" size="mini" @click="handleEdit(scope.row)">{{ $t('public.edit') }}</el-button>
            <el-button v-permission="['1-31-35-2']" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <my-adjust :control.sync="editVisible" :editdata.sync="personalForm" @rest="refreshlist"/>
      <!--修改结束=================================================-->
    </div>
  </div>
</template>

<script>
import { adjustpricelist, deleteadjustprice } from '@/api/Product'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyAdjust from './components/MyAdjust'

var _that
export default {
  name: 'AdjustpriceList',
  directives: { waves, permission, permission2 },
  components: { Pagination, MyAdjust },
  filters: {
    genderFilter(status) {
      const statusMap = {
        1: '男',
        2: '女'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // 新增分组参数
      groupName: '',
      // 分组表格数据
      groupData: [],
      // 新建分组控制器
      GroupVisible: false,
      // 批量操作
      moreaction: '',
      // 优质级别
      levelIds: [],
      // 供应商类别
      typeIds: [],
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
      // 价格变更列表查询加展示参数
      getemplist: {
        adjustid: '',
        adjustnumber: '',
        productcode: '',
        productname: '',
        stat: '',
        pagenum: 1,
        pagesize: 10
      },
      // 部门列表
      depts: [],
      // 区域级联数据转化
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      // 区域数据
      regions: [],
      getemplistregions: [],
      // 门店数据
      repositories: [],
      // 传给组件的数据
      personalForm: {},
      // 控制组件数据
      editVisible: false
    }
  },

  mounted() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    checkPermission,
    getlist() {
      // 价格变更单列表数据
      this.listLoading = true
      adjustpricelist(this.getemplist).then(res => {
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
      this.getemplist.pagenum = 1
      adjustpricelist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
      })
    },
    // 修改操作
    handleEdit(row) {
      console.log(row)
      this.editVisible = true
      this.personalForm = Object.assign({}, row)
    },
    // 修改组件修改成功后返回
    refreshlist(val) {
      if (val === true) {
        this.getlist()
      }
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
          deleteadjustprice(ids, this.$store.getters.userId).then(res => {
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
        deleteadjustprice(row.id, this.$store.getters.userId).then(res => {
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
    // 新增数据
    handleAdd() {
      this.$router.push('/Product/Newadjustprice')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'ProductName', 'ProductShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
