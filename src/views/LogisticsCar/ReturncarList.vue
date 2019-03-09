<template>
  <div class="ERP-container">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <el-input v-model="getemplist.licencenumber" :placeholder="$t('LogisticsCar.licencenumber')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.carnumber" :placeholder="$t('LogisticsCar.carnumber')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.outperson" :placeholder="$t('LogisticsCar.outpersonid')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.outnumber" :placeholder="$t('LogisticsCar.outnumber')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <!-- 更多搜索条件下拉栏 -->
      <el-popover
        placement="bottom"
        width="500"
        trigger="click">
        <el-date-picker
          v-model="getemplist.starttime"
          type="datetime"
          placeholder="选择出车时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          clearable
          style="width: 40%;float: left;margin-right: 20px"/>
        <el-date-picker
          v-model="getemplist.checkintime"
          type="datetime"
          placeholder="选择登记时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          clearable
          style="width: 40%;float: right;margin-right: 20px"/>
        <el-date-picker
          v-model="getemplist.returntime"
          type="datetime"
          placeholder="选择回车时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          clearable
          style="width: 40%;float: left;margin-right: 20px;margin-top: 20px"/>
        <div class="seachbutton" style="width: 100%;float: right;">
          <el-button v-waves class="filter-item" type="primary" style="float: right" @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>
      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
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
      <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;float: right" @click="handleAdd">{{ $t('public.add') }}</el-button>
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
          align="center"/>
        <el-table-column :label="$t('LogisticsCar.outnumber')" :resizable="false" prop="outNumber" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.outNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('LogisticsCar.carnumber')" :resizable="false" prop="carNumber" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.carNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('LogisticsCar.licencenumber')" :resizable="false" prop="licenceNumber" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.licenceNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('LogisticsCar.outpersonid')" :resizable="false" prop="outPersonName" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.outPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('LogisticsCar.starttime')" :resizable="false" prop="startTime" align="center" min-width="350">
          <template slot-scope="scope">
            <span>{{ scope.row.startTime }}</span>
          </template>t
        </el-table-column>
        <el-table-column :label="$t('LogisticsCar.returntime')" :resizable="false" prop="returnTime" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.returnTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('LogisticsCar.createTime')" :resizable="false" prop="createTime" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('LogisticsCar.createName')" :resizable="false" prop="createName" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" width="230">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">{{ $t('public.edit') }}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <my-editcar :control.sync="editVisible" :editdata.sync="personalForm" @rest="refreshlist"/>
      <!--修改结束=================================================-->
    </div>
  </div>
</template>

<script>
import { returncarlist, deletereturncar } from '@/api/LogisticsCar'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import MyEditcar from './components/MyEditcar'

export default {
  name: 'ReturncarList',
  directives: { waves },
  components: { Pagination, MyEditcar },
  filters: {
    carTypeFilter(status) {
      const statusMap = {
        1: '大货车',
        2: '小货车',
        3: '小轿车'
      }
      return statusMap[status]
    },
    statFilter(status) {
      const statusMap = {
        1: '正常',
        2: '停用'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
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
      // 车辆列表查询加展示参数
      getemplist: {
        pagenum: 1,
        pagesize: 10
      },
      // 传给组件的数据
      personalForm: {},
      // 控制组件数据
      editVisible: false
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    getlist() {
      // 派车单列表数据
      this.listLoading = true
      returncarlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 搜索
    handleFilter() {
      returncarlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    // 修改操作
    handleEdit(row) {
      console.log(row)
      this.editVisible = true
      this.personalForm = Object.assign({}, row)
      // this.personalForm.startTime = new Date(row)
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
          deletereturncar(ids).then(res => {
            if (res.data.ret === 200) {
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
        deletereturncar(row.id).then(res => {
          if (res.data.ret === 200) {
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
      this.$router.push('/LogisticsCar/Addreturncar')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'LogisticsCarName', 'LogisticsCarShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
