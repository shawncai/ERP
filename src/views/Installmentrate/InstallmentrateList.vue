<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">

      <el-input v-model="getemplist.count" :placeholder="$t('updates.fqqs')" size="small" clearable class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-select v-model="getemplist.stat" :value="getemplist.stat" :placeholder="$t('updates.stat')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter">
        <el-option :label="$t('updates.qy')" value="1"/>
        <el-option :label="$t('updates.ty')" value="2"/>
      </el-select>

      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" size="small" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card :body-style=" { padding: '6px'}" class="box-card" shadow="never">

      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" size="small" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['200-250-251-6']" v-waves :loading="downloadLoading" size="small" class="filter-item2" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <!-- <el-button v-permission="['200-250-251-7']" v-waves size="small" class="filter-item2" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button> -->
      <!-- 新建操作 -->
      <el-button v-permission="['200-250-251-1']" v-waves size="small" class="filter-item2" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
      <el-dialog :visible.sync="categoryVisible" title="新建分期利息规则设置" class="normal" width="600px" center>
        <el-form ref="addCategoryForm" :rules="addCategoryFormRules" :model="addCategoryForm" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
          <el-form-item :label="$t('InstallmentrateList.installmentCount')" label-width="100px" prop="installmentCount">
            <el-input v-model="addCategoryForm.installmentCount" autocomplete="off"/>
          </el-form-item>
          <el-form-item :label="$t('InstallmentrateList.rate') + '%'" label-width="100px" prop="rate">
            <el-input v-model="addCategoryForm.rate" autocomplete="off"/>
          </el-form-item>
          <el-form-item :label="$t('InstallmentrateList.isEffective')" label-width="100px" prop="isEffective">
            <el-select v-model="addCategoryForm.isEffective" placeholder="请选择状态" style="width: 100%">
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
    </el-card>

    <el-card :body-style="	{ padding: '10px' }" class="box-card" shadow="never">

      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :height="tableHeight"
        :key="tableKey"
        :data="list"
        size="small"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @row-click="clickRow"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          align="center"/>
        <el-table-column :label="$t('InstallmentrateList.id')" :resizable="false" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('InstallmentrateList.installmentCount')" :resizable="false" align="center" min-width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.installmentCount }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('InstallmentrateList.rate') + '%'" :resizable="false" align="center" min-width="350">
          <template slot-scope="scope">
            <span>{{ (scope.row.rate*100).toFixed(0) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('InstallmentrateList.isEffective')" :resizable="false" align="center" min-width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.isEffective | isEffectiveFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('InstallmentrateList.createPersonName')" :resizable="false" align="center" min-width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.createPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button v-permission="['200-250-251-3']" :title="$t('updates.xg')" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)" />
            <el-button v-permission="['200-250-251-2']" :title="$t('updates.sc')" size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-dialog :visible.sync="editcategoryVisible" :title="$t('updates.xgfqlx')" class="normal" width="600px" center>
        <el-form ref="editCategoryForm" :rules="editCategoryFormRules" :model="editCategoryForm" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
          <el-form-item :label="$t('InstallmentrateList.installmentCount')" label-width="100px" prop="installmentCount">
            <el-input v-model="editCategoryForm.installmentCount" autocomplete="off"/>
          </el-form-item>
          <el-form-item :label="$t('InstallmentrateList.rate') + '%'" label-width="100px" prop="rate">
            <el-input v-model="editCategoryForm.rate" autocomplete="off"/>
          </el-form-item>
          <el-form-item :label="$t('InstallmentrateList.isEffective')" label-width="100px" prop="isEffective">
            <el-select v-model="editCategoryForm.isEffective" placeholder="请选择状态" style="width: 100%">
              <el-option :label="$t('updates.qy')" value="1"/>
              <el-option :label="$t('updates.ty')" value="2"/>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleOk()">{{ $t('public.edit') }}</el-button>
          <el-button type="danger" @click="handleNo()">{{ $t('Hmodule.cancel') }}</el-button>
        </span>
      </el-dialog>
      <!--修改结束=================================================-->
    </el-card>
  </div>
</template>

<script>
import { ratelist, addinstallmentrate, updateinstallmentrate, deleterate } from '@/api/Installmentrate'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数

var _that
export default {
  name: 'InstallmentrateList',
  directives: { waves, permission, permission2 },
  components: { Pagination },
  filters: {
    isEffectiveFilter(status) {
      const statusMap = {
        1: '启用',
        2: '停用'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableHeight: 200,

      // 批量删除参数
      moreaction: [],
      // 新增窗口
      categoryVisible: false,
      // 新增数据
      addCategoryForm: {
        createPersonId: this.$store.getters.userId,
        countryId: 1
      },
      // 校验新增数据
      addCategoryFormRules: {
        installmentCount: [
          { required: true, message: '请输入分期期数', trigger: 'blur' }
        ],
        rate: [
          { required: true, message: '请输入客户利率', trigger: 'blur' }
        ],
        isEffective: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      },
      // 修改窗口
      editcategoryVisible: false,
      // 修改数据
      editCategoryForm: {
        createPersonId: this.$store.getters.userId,
        countryId: 1
      },
      // 校验修改数据
      editCategoryFormRules: {
        installmentCount: [
          { required: true, message: '请输入分期期数', trigger: 'blur' }
        ],
        rate: [
          { required: true, message: '请输入客户利率', trigger: 'blur' }
        ],
        isEffective: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      },
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
  activated() {
    this.getlist()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  mounted() {
    this.getlist()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    clickRow(val) {
      if (val.judgeStat === 0) {
        this.$refs.table.toggleRowSelection(val)
      }
    },
    checkPermission,
    getlist() {
      // 员工列表数据
      this.listLoading = true
      ratelist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        } else {
          console.log('列表出错')
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      ratelist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        } else {
          console.log('搜索出错')
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
        this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
          confirmButtonText: this.$t('prompt.qd'),
          cancelButtonText: this.$t('prompt.qx'),
          type: 'warning'
        }).then(() => {
          deleterate(ids, this.$store.getters.userId).then(res => {
            if (res.data.ret === 200 || res.data.ret === 100) {
              this.$notify({
                title: this.$t('prompt.sccg'),
                type: 'success',
                offset: 100
              })
              this.getlist()
            } else {
              this.$notify.error({
                title: 'wrong',
                message: 'wrong',
                offset: 100
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('prompt.yqxsc')
          })
        })
      }
    },
    // 单条删除
    handleDelete(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', this.$t('prompt.ts'), {
        confirmButtonText: this.$t('prompt.qd'),
        cancelButtonText: this.$t('prompt.qx'),
        type: 'warning'
      }).then(() => {
        deleterate(row.id, this.$store.getters.userId).then(res => {
          if (res.data.ret === 200 || res.data.ret === 100) {
            this.$notify({
              title: this.$t('prompt.sccg'),
              type: 'success',
              offset: 100
            })
            this.getlist()
          } else {
            this.$notify.error({
              title: 'wrong',
              message: 'wrong',
              offset: 100
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('prompt.yqxsc')
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
      this.editCategoryForm.rate = row.rate * 100
    },
    // 取消修改
    handleNo() {
      this.editcategoryVisible = false
    },
    // 确认修改
    handleOk() {
      this.$refs.editCategoryForm.validate((valid) => {
        if (valid) {
          if (this.editCategoryForm.rate !== null || this.editCategoryForm.rate !== '' || this.editCategoryForm.rate !== undefined) {
            this.editCategoryForm.rate = (this.editCategoryForm.rate / 100).toFixed(6)
          }
          const parms = JSON.stringify(this.editCategoryForm)
          updateinstallmentrate(parms).then(res => {
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
              console.log('列表出错')
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
        iseffective: ''
      }
    },
    // 保存操作
    handlesave() {
      console.log(this.addCategoryForm)
      this.$refs.addCategoryForm.validate((valid) => {
        if (valid) {
          if (this.addCategoryForm.rate !== null || this.addCategoryForm.rate !== '' || this.addCategoryForm.rate !== undefined) {
            this.addCategoryForm.rate = (this.addCategoryForm.rate / 100).toFixed(6)
          }
          const parms = JSON.stringify(this.addCategoryForm)
          addinstallmentrate(parms).then(res => {
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
                message: 'wrong',
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
    margin-left:10px;
  }
  .filter-container{
    padding: 20px;
    padding-left: 0px;
  }
  .filter-item{
    width: 180px;
    margin-left: 10px;
    padding: 10px 0;
  }
  .filter-item2{
    width: 180px;
    margin-left: 5px;
    padding: 10px 0;
  }
  .box-card {
    /* border : 1px solid #f1f1ff !important; */
    border-bottom : 1px solid #f1f1ff00 !important
  }
</style>
