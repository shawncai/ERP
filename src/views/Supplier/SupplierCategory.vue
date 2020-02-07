<template>
  <div class="ERP-container">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <el-input v-model="getemplist.categoryname" :placeholder="$t('NewEmployeeInformation.categoryname')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="getemplist.type" :value="getemplist.type" :placeholder="$t('NewEmployeeInformation.type')" class="filter-item" clearable>
        <el-option label="供应商类别" value="1"/>
        <el-option label="交货方式" value="2"/>
        <el-option label="运送方式" value="3"/>
        <el-option label="优质级别" value="4"/>
        <el-option label="结算方式" value="5"/>
        <!--        <el-option label="推荐程度" value="6"/>-->
        <el-option label="支付方式" value="7"/>
      </el-select>
      <el-select v-model="getemplist.iseffective" :value="getemplist.iseffective" :placeholder="$t('NewEmployeeInformation.iseffective')" class="filter-item" clearable>
        <el-option label="on duty" value="1"/>
        <el-option label="closed" value="2"/>
      </el-select>
      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['1-22-28-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['1-22-28-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['1-22-28-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['1-22-28-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;float: right" @click="handleAdd">{{ $t('public.add') }}</el-button>
      <el-dialog :visible.sync="categoryVisible" :title="$t('updates.xjflsx')" class="normal" width="600px" center>
        <el-form ref="addCategoryForm" :rules="addCategoryFormRules" :model="addCategoryForm" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
          <el-form-item :label="$t('NewEmployeeInformation.type')" label-width="100px" prop="type">
            <el-select v-model="addCategoryForm.type" placeholder="请选择类别" style="width: 100%">
              <el-option label="供应商类别" value="1"/>
              <el-option label="交货方式" value="2"/>
              <el-option label="运送方式" value="3"/>
              <el-option label="优质级别" value="4"/>
              <el-option label="结算方式" value="5"/>
              <!--              <el-option label="推荐程度" value="6"/>-->
              <el-option label="支付方式" value="7"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.categoryname')" label-width="100px" prop="categoryname">
            <el-input v-model="addCategoryForm.categoryname" autocomplete="off"/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.iseffective')" label-width="100px" prop="iseffective">
            <el-select v-model="addCategoryForm.iseffective" placeholder="请选择状态" style="width: 100%">
              <el-option :label="$t('updates.qy')" value="1"/>
              <el-option :label="$t('updates.ty')" value="2"/>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
          <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        </span>
      </el-dialog>
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
          <el-table-column :label="$t('NewEmployeeInformation.id')" :resizable="false" prop="id" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('NewEmployeeInformation.type')" :resizable="false" prop="type" align="center" width="350">
            <template slot-scope="scope">
              <span>{{ scope.row.type | typeFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('NewEmployeeInformation.categoryname')" :resizable="false" prop="categoryName" align="center" width="350">
            <template slot-scope="scope">
              <span>{{ scope.row.categoryName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('NewEmployeeInformation.iseffective')" :resizable="false" prop="isEffective" align="center" width="350">
            <template slot-scope="scope">
              <span>{{ scope.row.isEffective | iseffectiveFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
            <template slot-scope="scope">
              <el-button v-permission="['1-22-28-8']" v-show="scope.row.isEffective === 2" title="启用" style="margin-left: 18px;" type="primary" size="mini" icon="el-icon-check" circle @click="open(scope.row)"/>
              <el-button v-permission="['1-22-28-9']" v-show="scope.row.isEffective === 1" title="停用" type="primary" size="mini" icon="el-icon-close" circle @click="close(scope.row)"/>
              <el-button v-permission="['1-22-28-3']" type="primary" size="mini" @click="handleEdit(scope.row)" >{{ $t('public.edit') }}</el-button>
              <el-button v-permission="['1-22-28-2']" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 列表结束 -->
        <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
        <el-dialog :visible.sync="editcategoryVisible" :title="$t('updates.xgflsx')" class="normal" width="600px" center>
          <el-form ref="editCategoryForm" :rules="editCategoryFormRules" :model="editCategoryForm" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
            <el-form-item :label="$t('NewEmployeeInformation.type')" label-width="100px">
              <el-select v-model="editCategoryForm.type" placeholder="请选择类别" style="width: 100%" disabled >
                <el-option label="供应商类别" value="1"/>
                <el-option label="交货方式" value="2"/>
                <el-option label="运送方式" value="3"/>
                <el-option label="优质级别" value="4"/>
                <el-option label="结算方式" value="5"/>
                <!--                <el-option label="推荐程度" value="6"/>-->
                <el-option label="支付方式" value="7"/>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.categoryname')" label-width="100px" prop="categoryName">
              <el-input v-model="editCategoryForm.categoryName" autocomplete="off"/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.iseffective')" label-width="100px" prop="isEffective">
              <el-select v-model="editCategoryForm.isEffective" placeholder="请选择状态" style="width: 100%">
                <el-option label="on duty" value="1"/>
                <el-option label="closed" value="2"/>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleOk()">{{ $t('public.edit') }}</el-button>
            <el-button type="danger" @click="handleNo()">{{ $t('Hmodule.cancel') }}</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { searchEmpCategory, addEmpCategory, updateEmpCategory, delateEmpCategory } from '@/api/Supplier'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数

var _that
export default {
  name: 'SupplierCategory',
  directives: { waves, permission, permission2 },
  components: { Pagination },
  filters: {
    typeFilter(status) {
      const statusMap = {
        1: '供应商类别',
        2: '交货方式',
        3: '运送方式',
        4: '优质级别',
        5: '结算方式',
        6: '推荐程度',
        7: '支付方式'
      }
      return statusMap[status]
    },
    iseffectiveFilter(status) {
      const statusMap = {
        1: '启用',
        2: '停用'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // 批量删除参数
      moreaction: [],
      // 新增窗口
      categoryVisible: false,
      // 新增数据
      addCategoryForm: {
        categoryname: '',
        type: '',
        iseffective: '1'
      },
      // 校验新增数据
      addCategoryFormRules: {
        category: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        categoryname: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        iseffective: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      // 修改窗口
      editcategoryVisible: false,
      // 修改数据
      editCategoryForm: {
        categoryName: '',
        type: '',
        isEffective: ''
      },
      // 校验修改数据
      editCategoryFormRules: {
        categoryName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        isEffective: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      // 加载操作控制
      downloadLoading: false,
      // 表格数据
      list: [],
      personalForm2: {},
      // 表格数据条数
      total: 0,
      // 表格识别
      tableKey: 0,
      // 加载表格
      listLoading: true,
      // 分类列表查询加展示参数
      getemplist: {
        categoryname: '',
        type: '',
        iseffective: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },

  mounted() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 启用停用操作
    open(row) {
      console.log('row', row)
      this.personalForm2.id = row.id
      this.personalForm2.isEffective = 1
      updateEmpCategory(this.personalForm2).then(res => {
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
          this.$notify.error({
            title: 'wrong',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    close(row) {
      console.log('row', row)
      this.personalForm2.id = row.id
      this.personalForm2.isEffective = 2
      updateEmpCategory(this.personalForm2).then(res => {
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
          this.$notify.error({
            title: 'wrong',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    checkPermission,
    getlist() {
      // 员工列表数据
      this.listLoading = true
      searchEmpCategory(this.getemplist).then(res => {
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
      searchEmpCategory(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
      })
    },
    // 多选数据
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 批量删除
    handleCommand(command) {
      const ids = this.moreaction.map(item => item.id).join()
      if (command === 'delete') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delateEmpCategory(ids, this.$store.getters.userId).then(res => {
            if (res.data.ret === 200 || res.data.ret === 100) {
              this.$notify({
                title: '删除成功',
                type: 'success',
                offset: 100
              })
              this.getlist()
            } else {
              this.$notify.error({
                title: 'wrong',
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
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delateEmpCategory(row.id, this.$store.getters.userId).then(res => {
          if (res.data.ret === 200 || res.data.ret === 100) {
            this.$notify({
              title: '删除成功',
              type: 'success',
              offset: 100
            })
            this.getlist()
          } else {
            this.$notify.error({
              title: 'wrong',
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
    // 修改数据
    handleEdit(row) {
      console.log(row)
      this.editcategoryVisible = true
      this.editCategoryForm = Object.assign({}, row)
      this.editCategoryForm.type = String(row.type)
      this.editCategoryForm.isEffective = String(row.isEffective)
    },
    // 取消修改
    handleNo() {
      this.editcategoryVisible = false
    },
    // 确认修改
    handleOk() {
      this.$refs.editCategoryForm.validate((valid) => {
        if (valid) {
          updateEmpCategory(this.editCategoryForm).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: 'successful',
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.getlist()
              this.$refs.editCategoryForm.clearValidate()
              this.$refs.editCategoryForm.resetFields()
              this.editcategoryVisible = false
            } else {
              this.$notify.error({
                title: 'wrong',
                message: '出错了',
                offset: 100
              })
            }
          })
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'Information is incomplete',
            offset: 100
          })
          return false
        }
      })
    },
    // 新增数据
    handleAdd() {
      this.categoryVisible = true
    },
    // 取消操作
    handlecancel() {
      this.categoryVisible = false
    },
    restAddCategoryForm() {
      this.addCategoryForm = {
        categoryname: '',
        type: '',
        iseffective: '1'
      }
    },
    // 保存操作
    handlesave() {
      console.log(this.addCategoryForm)
      this.$refs.addCategoryForm.validate((valid) => {
        if (valid) {
          addEmpCategory(this.addCategoryForm).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: 'successful',
                message: '新建成功',
                type: 'success',
                offset: 100
              })
              this.getlist()
              this.$refs.addCategoryForm.clearValidate()
              this.$refs.addCategoryForm.resetFields()
              this.restAddCategoryForm()
              this.categoryVisible = false
            } else {
              this.$notify.error({
                title: 'wrong',
                message: '出错了',
                offset: 100
              })
            }
          })
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'Information is incomplete',
            offset: 100
          })
          return false
        }
      })
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
    }
  }
}
</script>

<style rel="stylesheet/css" scoped>
  .normal >>> .el-dialog__header {
    padding: 20px 20px 10px;
    background: #fff;
    position: static;
    top: auto;
    z-index: auto;
    width: auto;
    border-bottom: none;
  }
  .normal >>> .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    height: auto;
  }
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
