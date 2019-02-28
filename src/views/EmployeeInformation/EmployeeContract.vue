<template>
  <div class="ERP-container">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <el-input v-model="getcontractlist.contractnumber" :placeholder="$t('NewEmployeeInformation.contractnumber')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getcontractlist.contractname" :placeholder="$t('NewEmployeeInformation.contractname')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getcontractlist.empnumber" :placeholder="$t('NewEmployeeInformation.empnumber')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getcontractlist.empname" :placeholder="$t('NewEmployeeInformation.empname')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
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
        ref="list"
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
        <el-table-column :label="$t('NewEmployeeInformation.contractnumber')" :resizable="false" prop="contractNumber" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.contractNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.contractname')" :resizable="false" prop="contractName" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.contractName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.jobnumber')" :resizable="false" prop="empNumber" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.empNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.empname')" :resizable="false" prop="empName" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.empName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.signtime')" :resizable="false" prop="signTime" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.signTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.effectivetime')" :resizable="false" prop="effectiveTime" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.effectiveTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.expiredtime')" :resizable="false" prop="expiredTime" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.expiredTime }}</span>
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
      <pagination v-show="total>0" :total="total" :page.sync="getcontractlist.pagenum" :limit.sync="getcontractlist.pagesize" @pagination="getlist" />
      <!--修改弹窗-->
      <el-dialog :visible.sync="editVisible" :title="'合同编号' + contractNumber">
        <el-form ref="contractForm" :model="contractForm" :rules="contractFormRules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('NewEmployeeInformation.employeeid')" prop="employeeId" style="width: 40%;margin-top:1%">
            <el-input v-model="employeeName" :disabled="true" placeholder="请选择员工" clearable/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.typeid')" prop="type" style="width: 40%;margin-top:1%">
            <el-select v-model="contractForm.type" placeholder="请选择合同类别" style="width: 100%;">
              <el-option label="类型1" value="1"/>
              <el-option label="类型2" value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.contractname')" prop="contractName" style="width: 40%">
            <el-input v-model="contractForm.contractName" placeholder="请输入合同名称" clearable/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.signtime')" style="width: 40%" prop="signTime">
            <el-date-picker
              v-model="contractForm.signTime"
              type="date"
              placeholder="选择签约时间"
              value-format="yyyy-MM-dd"
              style="width: 100%"/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.expiredtime')" style="width: 40%" prop="expiredTime">
            <el-date-picker
              v-model="contractForm.expiredTime"
              type="date"
              placeholder="选择到期时间"
              value-format="yyyy-MM-dd"
              style="width: 100%"/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.effectivetime')" style="width: 40%" prop="effectiveTime">
            <el-date-picker
              v-model="contractForm.effectiveTime"
              type="date"
              placeholder="选择生效时间"
              value-format="yyyy-MM-dd"
              style="width: 100%"/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.period')" style="width: 40%;margin-top:1%">
            <el-select v-model="contractForm.period" placeholder="请选择合同期限" style="width: 100%;">
              <el-option label="类型1" value="1"/>
              <el-option label="类型2" value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.attribute')" style="width: 40%;margin-top:1%">
            <el-select v-model="contractForm.contractAttribute" placeholder="请选择合同属性" style="width: 100%;">
              <el-option label="类型1" value="1"/>
              <el-option label="类型2" value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.iscorrection')" style="width: 40%;margin-top:1%">
            <el-select v-model="contractForm.isCorrection" placeholder="请选择转正标志" style="width: 100%;">
              <el-option label="是" value="1"/>
              <el-option label="否" value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.contractstat')" style="width: 40%;margin-top:1%">
            <el-select v-model="contractForm.stat" placeholder="请选择合同状态" style="width: 100%;">
              <el-option label="类型1" value="1"/>
              <el-option label="类型2" value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.trialsalary')" style="width: 40%">
            <el-input v-model="contractForm.trialSalary" placeholder="请输入试用工资" clearable/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.correctionsalary')" style="width: 40%">
            <el-input v-model="contractForm.correctionSalary" placeholder="请输入转正工资" clearable/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.remindpersonid')" style="width: 40%">
            <el-input v-model="contractForm.remindPerson" placeholder="请选择提醒人" clearable/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.advanceday')" style="width: 40%">
            <el-input v-model="contractForm.advanceDay" placeholder="请输入提前时间" clearable>
              <template slot="append">天</template>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="buttons" style="margin-top: 20px;margin-left: 30px">
          <el-button type="primary" @click="handleEditok()">修改</el-button>
          <el-button type="danger" @click="handlecancel()">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { contractlist, updatecontract, deleteempcontract } from '@/api/EmployeeInformation'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'EmployeeContract',
  directives: { waves },
  components: { Pagination },
  data() {
    return {
      // 批量删除
      moredelete: [],
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
      // 合同列表查询加展示参数
      getcontractlist: {
        contractname: '',
        contractnumber: '',
        empnumber: '',
        empname: '',
        pagenum: 1,
        pagesize: 10
      },
      // 修改弹窗控制
      editVisible: false,
      // 修改数据
      employeeName: '',
      contractNumber: '',
      contractForm: {
        employeeId: '',
        contractName: '',
        signTime: '',
        expiredTime: '',
        effectiveTime: '',
        type: '',
        contractAttribute: '',
        period: '',
        isCorrection: '',
        stat: '',
        advanceDay: '',
        trialSalary: '',
        correctionSalary: '',
        remindPerson: ''
      },
      // 基本信息规则数据
      contractFormRules: {
        employeeId: [
          { required: true, message: '请选择员工', trigger: 'focus' }
        ],
        type: [
          { required: true, message: '请选择合同类别', trigger: 'change' }
        ],
        contractName: [
          { required: true, message: '请输入合同名称', trigger: 'blur' }
        ],
        signTime: [
          { required: true, message: '请选择签约时间', trigger: 'blur' }
        ],
        expiredTime: [
          { required: true, message: '请选择签约时间', trigger: 'blur' }
        ],
        effectiveTime: [
          { required: true, message: '请选择签约时间', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    getlist() {
      // 员工列表数据
      this.listLoading = true
      contractlist(this.getcontractlist).then(res => {
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
    // 清空修改数据
    restcontractForm() {
      this.employeeName = ''
      this.contractNumber = ''
      this.contractForm = {
        employeeId: '',
        contractName: '',
        signTime: '',
        expiredTime: '',
        effectiveTime: '',
        type: '',
        contractAttribute: '',
        period: '',
        isCorrection: '',
        stat: '',
        advanceDay: '',
        trialSalary: '',
        correctionSalary: '',
        remindPerson: ''
      }
    },
    // 修改数据
    handleEdit(row) {
      console.log(row)
      this.editVisible = true
      this.employeeName = row.empName
      this.contractNumber = row.contractNumber
      this.contractForm = Object.assign({}, row)
      console.log(this.contractForm)
    },
    // 修改并上传
    handleEditok() {
      console.log(this.contractForm)
      this.$refs.contractForm.validate((valid) => {
        if (valid) {
          updatecontract(this.contractForm).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.$refs.contractForm.resetFields()
              this.editVisible = false
              this.getlist()
            } else {
              this.$notify.error({
                title: '错误',
                message: '出现错误',
                offset: 100
              })
            }
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '信息未填完整',
            offset: 100
          })
          return false
        }
      })
    },
    // 取消修改
    handlecancel() {
      this.$refs.contractForm.resetFields()
      this.editVisible = false
    },
    // 搜索
    handleFilter() {
      console.log(this.getcontractlist)
      contractlist(this.getcontractlist).then(res => {
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
    // 单条删除
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteempcontract(row.id).then(res => {
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
    // 批量删除
    handleSelectionChange(val) {
      console.log(val)
      this.moredelete = val
    },
    handleCommand(command) {
      if (command === 'delete') {
        const ids = this.moredelete.map(item => item.id).join()
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteempcontract(ids).then(res => {
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
        console.log(ids)
      }
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/EmployeeInformation/NewEmployeeContract')
    },
    // 生成合同
    handleContract() {
      console.log(123)
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['合同编号', '合同名称', '', '姓名', '性别', '生日', '邮箱', '职位', '所属部门', '所属区域', '所属门店', '入职时间', '离职时间', '状态']
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
