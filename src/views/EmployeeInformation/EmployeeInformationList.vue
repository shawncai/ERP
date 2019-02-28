<template>
  <div class="ERP-container">
    <div class="filter-container">
      <el-input v-model="getemplist.employeename" :placeholder="$t('NewEmployeeInformation.employeename')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.jobnumber" :placeholder="$t('NewEmployeeInformation.jobnumber2')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-date-picker
        v-model="getemplist.time"
        type="date"
        class="filter-item"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"/>
      <el-select v-model="getemplist.stat" :value="getemplist.stat" :placeholder="$t('NewEmployeeInformation.status')" class="filter-item" clearable>
        <el-option label="在职" value="1"/>
        <el-option label="离职" value="2"/>
      </el-select>
      <el-popover
        placement="bottom"
        width="500"
        trigger="click">
        <el-cascader
          :options="regions"
          :props="props"
          v-model="getemplistregions"
          :show-all-levels="false"
          placeholder="请选择区域"
          change-on-select
          filterable
          clearable
          style="width: 40%;float: left;margin-left: 20px"
          @change="handlechange4"
        />
        <el-select v-model="getemplist.repositoryid" placeholder="请选择门店" clearable style="width: 40%;float: right;margin-right: 20px">
          <el-option
            v-for="(item, index) in repositories"
            :key="index"
            :label="item.repositoryName"
            :value="item.id"/>
        </el-select>
        <el-select v-model="getemplist.postid" :value="getemplist.postid" :placeholder="$t('NewEmployeeInformation.postid2')" class="filter-item" clearable style="width: 40%;float: left;margin-top: 10px;margin-left: 20px">
          <el-option label="xxx" value="1"/>
          <el-option label="xxx" value="2"/>
        </el-select>
        <el-select v-model="getemplist.deptid" :placeholder="$t('NewEmployeeInformation.deptid2')" class="filter-item" clearable style="width: 40%;float: right;margin-top: 10px;margin-right: 20px">
          <el-option
            v-for="(item, index) in depts"
            :key="index"
            :label="item.deptName"
            :value="item.id"/>
        </el-select>
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button v-waves class="filter-item" type="primary" style="float: right" @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item style="text-align: left" command="disable"><svg-icon icon-class="tingyong" style="width: 40px"/>{{ $t('public.disable') }}</el-dropdown-item>
          <el-dropdown-item style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button v-waves class="filter-item" type="primary" style="width: 100px" @click="handleContract">{{ $t('public.contract') }}</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <el-button v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;float: right" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </div>
    <div class="app-container">
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
        <el-table-column :label="$t('NewEmployeeInformation.id')" :resizable="false" prop="id" align="center" width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.jobNumber')" :resizable="false" prop="jobNumber" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.jobNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.account')" :resizable="false" prop="account" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.name')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.firstName }} {{ scope.row.middleName }} {{ scope.row.lastName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.gender')" :resizable="false" prop="gender" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.gender | genderFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.birthday')" :resizable="false" prop="birthday" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.birthday }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.email')" :resizable="false" prop="email" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.postName')" :resizable="false" prop="postName" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.postName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.deptName')" :resizable="false" prop="deptName" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.deptName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.regionName')" :resizable="false" prop="regionName" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.regionName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.repositoryName')" :resizable="false" prop="repositoryName" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.repositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.createTime')" :resizable="false" prop="createTime" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.dimissionTime')" :resizable="false" prop="dimissionTime" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.dimissionTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.stat')" :resizable="false" prop="stat" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.stat | statFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" >{{ $t('public.edit') }}</el-button>
            <el-button v-if="scope.row.stat === 1" size="mini" type="warning" @click="handleDisable(scope.row)">{{ $t('public.disable') }}</el-button>
            <el-button v-if="scope.row.stat === 2" size="mini" type="success" @click="handleEnable(scope.row)">{{ $t('public.enable') }}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
    </div>
  </div>
</template>

<script>
import { searchRepository, regionlist } from '@/api/public'
import { getdeptlist, getemplist, startorendemp, deleteemp } from '@/api/EmployeeInformation'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'EmployeeInformationList',
  directives: { waves },
  components: { Pagination },
  filters: {
    genderFilter(status) {
      const statusMap = {
        1: '男',
        2: '女'
      }
      return statusMap[status]
    },
    statFilter(status) {
      const statusMap = {
        1: '在职',
        2: '离职'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // 批量操作
      moreaction: [],
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
      // 员工列表查询加展示参数
      getemplist: {
        repositoryid: '',
        regionid: '',
        postid: '',
        deptid: '',
        employeename: '',
        pagenum: 1,
        pagesize: 10,
        stat: '',
        time: '',
        jobnumber: ''
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
      repositories: []
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    getlist() {
      // 员工列表数据
      this.listLoading = true
      getemplist(this.getemplist).then(res => {
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
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
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
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 批量停用和删除
    handleCommand(command) {
      const ids = this.moreaction.map(item => item.id).join()
      if (command === 'disable') {
        startorendemp(ids, 2).then(res => {
          if (res.data.ret === 200) {
            this.$notify({
              title: '操作成功',
              message: '操作成功',
              type: 'success',
              duration: 1000,
              offset: 100
            })
            this.getlist()
          } else {
            this.$message.error('出错了')
          }
        })
      } else if (command === 'delete') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteemp(ids).then(res => {
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
        deleteemp(row.id).then(res => {
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
    // 单条停用
    handleDisable(row) {
      startorendemp(row.id, 2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.getlist()
        } else {
          this.$message.error('出错了')
        }
      })
    },
    // 单条启用
    handleEnable(row) {
      startorendemp(row.id, 1).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
            duration: 1000,
            type: 'success',
            offset: 100
          })
          this.getlist()
        } else {
          this.$message.error('出错了')
        }
      })
    },
    // 搜索
    handleFilter() {
      this.getemplist.regionid = this.getemplistregions[this.getemplistregions.length - 1]
      console.log(this.getemplist)
      if (this.getemplist.deptid === '' && this.getemplist.employeename === '' && this.getemplist.jobnumber === '' && this.getemplist.postid === '' && this.getemplist.regionid === '' && this.getemplist.repositoryid === '' && this.getemplist.stat === '' && this.getemplist.time === '' || this.getemplist.time === null) {
        this.getlist()
      } else {
        getemplist(this.getemplist).then(res => {
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
      }
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/EmployeeInformation/NewEmployeeInformation')
    },
    // 生成合同
    handleContract() {
      console.log(123)
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['编号', '工号', '员工登陆账号', '姓名', '性别', '生日', '邮箱', '职位', '所属部门', '所属区域', '所属门店', '入职时间', '离职时间', '状态']
        const filterVal = ['id', 'jobNumber', 'account', 'firstName', 'gender', 'birthday', 'email', 'postName', 'deptName', 'regionName', 'repositoryName', 'createTime', 'dimissionTime', 'stat']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '员工资料表'
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
  margin: 80px 30px;
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
