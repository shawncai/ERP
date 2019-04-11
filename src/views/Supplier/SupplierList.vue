<template>
  <div class="ERP-container">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <el-input v-model="getemplist.id" :placeholder="$t('Supplier.id')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.supplierName" :placeholder="$t('Supplier.supplierName')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="getemplist.typeId" :value="getemplist.typeId" placeholder="请选择供应商" class="filter-item" clearable>
        <el-option
          v-for="(item, index) in typeIds"
          :key="index"
          :label="item.categoryName"
          :value="item.id"
        />
      </el-select>
      <!-- 更多搜索条件下拉栏 -->
      <el-popover
        placement="bottom"
        width="500"
        trigger="click">
        <el-cascader
          :options="regions"
          :props="props"
          v-model="getemplistregions"
          :show-all-levels="false"
          placeholder="所在区域"
          change-on-select
          filterable
          clearable
          style="width: 40%;float: left;margin-left: 20px"
          @change="handlechange4"
        />
        <el-select v-model="getemplist.levelId" placeholder="请选择优质级别" clearable style="width: 40%;float: right;margin-right: 20px">
          <el-option
            v-for="(item, index) in levelIds"
            :key="index"
            :label="item.categoryName"
            :value="item.id"
          />
        </el-select>
        <el-select v-model="getemplist.groupId" multiple placeholder="请选择供应商分组" style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
          <el-option
            v-for="(item, index) in groupIds"
            :key="index"
            :label="item.groupName"
            :value="item.id"/>
        </el-select>
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
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
      <!-- 新建分组 -->
      <el-button v-waves class="filter-item" type="primary" style="width: 100px" @click="handleGroup">{{ $t('Supplier.supplierGroup') }}</el-button>
      <el-dialog :visible.sync="GroupVisible" title="新建分组" width="35%">
        <el-input v-model="groupName" :placeholder="$t('Supplier.groupName')" class="filter-item" style="width: 40%;margin-left: -1px;float: left" clearable @keyup.enter.native="handleAddGroup"/>
        <el-button v-waves class="filter-item" type="success" style="width: 86px;float: left" @click="handleAddGroup">{{ $t('public.add') }}</el-button>
        <el-table :data="groupData" border>
          <el-table-column property="id" label="编号" align="center" width="150"/>
          <el-table-column property="groupName" label="组名称" align="center" min-width="300"/>
          <el-table-column :label="$t('public.actions')" :resizable="false" align="center" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDeleteGroup(scope.row)">{{ $t('public.delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
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
        <el-table-column :label="$t('Supplier.id')" :resizable="false" prop="id" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Supplier.supplierName')" :resizable="false" prop="supplierName" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.supplierName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Supplier.supplierShortName')" :resizable="false" prop="supplierShortName" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.supplierShortName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Supplier.typeId')" :resizable="false" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.typeName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Supplier.regionId')" :resizable="false" prop="regionName" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.regionName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Supplier.buyerId')" :resizable="false" prop="buyerName" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.buyerName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Supplier.levelId')" :resizable="false" prop="levelName" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.levelName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Supplier.createId')" :resizable="false" prop="createId" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Supplier.createTime')" :resizable="false" prop="createTime" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">{{ $t('public.edit') }}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <my-dialog :control.sync="editVisible" :editdata.sync="personalForm" @rest="refreshlist"/>
      <!--修改结束=================================================-->
    </div>
  </div>
</template>

<script>
import { searchRepository, regionlist } from '@/api/public'
import { searchCategory, search, delete2, searchGroup, createGroup, deleteGroup } from '@/api/Supplier'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import MyDialog from './components/MyDialog'

export default {
  name: 'SupplierList',
  directives: { waves },
  components: { Pagination, MyDialog },
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
      // 供应商选择框控制
      employeeVisible: this.control,
      // 搜索分组数据
      groupIds: [],
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
      // 供应商列表查询加展示参数
      getemplist: {
        id: '',
        supplierName: '',
        typeId: '',
        regionId: '',
        levelId: '',
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
  methods: {
    getlist() {
      // 供应商列表数据
      this.listLoading = true
      search(this.getemplist).then(res => {
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
        // 分组数据
        searchGroup().then(res => {
          if (res.data.ret === 200) {
            this.groupIds = res.data.data.content
          }
        })
      })
      // 供应商类别
      searchCategory(1).then(res => {
        if (res.data.ret === 200) {
          this.typeIds = res.data.data.content.list
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
      // 优质级别
      searchCategory(4).then(res => {
        if (res.data.ret === 200) {
          this.levelIds = res.data.data.content.list
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
      // 区域数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
        }
      })
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      this.getemplist.regionId = this.getemplistregions[this.getemplistregions.length - 1]
      console.log(this.getemplist)
      search(this.getemplist).then(res => {
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
      this.personalForm.isHot = String(row.isHot)
      this.personalForm.isEffective = String(row.isEffective)
      this.personalForm.moneyId = String(row.moneyId)
      this.personalForm.companyTypeId = String(row.companyTypeId)
      this.personalForm.groupId = row.groupId.split(',').map(function(item) {
        return Number(item)
      })
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
          delete2(ids).then(res => {
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
        delete2(row.id).then(res => {
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
    // 分组数据列表
    groupList() {
      // 分组数据
      searchGroup().then(res => {
        if (res.data.ret === 200) {
          this.groupData = res.data.data.content
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/Supplier/NewSupplier')
    },
    // 新建分组
    handleGroup() {
      this.groupList()
      this.GroupVisible = true
    },
    // 重置input
    restGroup() {
      this.groupName = ''
    },
    // 新增分组
    handleAddGroup() {
      createGroup(this.groupName).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '添加成功',
            type: 'success',
            offset: 100
          })
          this.restGroup()
          this.groupList()
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    // 删除分组
    handleDeleteGroup(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGroup(row.id).then(res => {
          if (res.data.ret === 200) {
            this.$notify({
              title: '删除成功',
              type: 'success',
              offset: 100
            })
            this.groupList()
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
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'supplierName', 'supplierShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
    },
    // 转化数据方法
    tranKTree(arr) {
      if (!arr || !arr.length) return
      return arr.map(item => ({
        id: item.id,
        regionName: item.regionName,
        regionListVos: this.tranKTree(item.regionListVos)
      }))
    },
    // 根据区域选择门店
    handlechange4(val) {
      const finalid = val[val.length - 1]
      searchRepository(finalid).then(res => {
        if (res.data.ret === 200) {
          this.repositories = res.data.data.content
        } else {
          this.$message.error('出错了')
        }
      })
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
