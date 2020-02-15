<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px;height: 60px" shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" label-width="100px" style="margin-top: -9px">
          <el-col :span="5" style="margin-left: 10px">
            <el-form-item :label="$t('MemorandumList.per')" label-width="100px" prop="employeeId">
              <el-input v-model="employeeId2" clearable style="margin-left: 18px;width: 200px" @focus="handlechooseStock2"/>
              <my-emp2 :control.sync="stockControl2" @stockName2="stockName2"/>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left: 10px">
            <el-form-item :label="$t('MemorandumList.stat')">
              <el-select v-model="getemplist.stat" :value="getemplist.iseffective" clearable @keyup.enter.native="handleFilter">
                <el-option label="未提醒" value="1"/>
                <el-option label="已提醒" value="2"/>
              </el-select>
            </el-form-item>
          </el-col>
          <!--更多搜索条件-->
          <el-col :span="3" style="margin-left: 20px">
            <!-- 搜索按钮 -->
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['1-366-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 新建操作 -->
      <el-button v-permission="['1-366-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
      <el-dialog :visible.sync="categoryVisible" :title="$t('updates.create')" class="normal" width="600px" center>
        <el-form ref="addCategoryForm" :rules="addCategoryFormRules" :model="addCategoryForm" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
          <el-form-item :label="$t('MemorandumList.time')" label-width="100px" prop="actionTime">
            <el-date-picker
              v-model="addCategoryForm.actionTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              clearable
              style="width: 100%"/>
          </el-form-item>
          <el-form-item :label="$t('MemorandumList.content')" label-width="100px" prop="content">
            <el-input v-model="addCategoryForm.content" autocomplete="off"/>
          </el-form-item>
          <el-form-item :label="$t('MemorandumList.per')" label-width="100px" prop="employeeId">
            <el-input v-model="employeeId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
            <my-emp :control.sync="stockControl" @stockName="stockName"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
          <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        </span>
      </el-dialog>
    </el-card>

    <el-card class="box-card" style="margin-top: 10px" shadow="never">
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
        <el-table-column :label="$t('MemorandumList.time')" :resizable="false" align="center" min-width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.actionTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('MemorandumList.content')" :resizable="false" align="center" min-width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('MemorandumList.per')" :resizable="false" align="center" min-width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.employeeName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('MemorandumList.stat')" :resizable="false" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.stat | statFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('MemorandumList.createTime')" :resizable="false" align="center" min-width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="160">
          <template slot-scope="scope">
            <el-button v-permission="['1-366-3']" type="primary" size="mini" @click="handleEdit(scope.row)" >{{ $t('public.edit') }}</el-button>
            <el-button v-permission="['1-366-2']" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-dialog :visible.sync="editcategoryVisible" :title="$t('updates.xg')" class="normal" width="600px" center>
        <el-form ref="editCategoryForm" :rules="editCategoryFormRules" :model="editCategoryForm" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
          <el-form-item :label="$t('MemorandumList.time')" label-width="100px" prop="actionTime">
            <el-date-picker
              v-model="editCategoryForm.actionTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              clearable
              style="width: 100%"/>
          </el-form-item>
          <el-form-item :label="$t('MemorandumList.content')" label-width="100px" prop="content">
            <el-input v-model="editCategoryForm.content" autocomplete="off"/>
          </el-form-item>
          <el-form-item :label="$t('MemorandumList.per')" label-width="100px" prop="employeeId">
            <el-input v-model="employeeId" disabled style="margin-left: 18px;width: 200px"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button v-no-more-click type="primary" @click="handleOk()">{{ $t('public.edit') }}</el-button>
          <el-button type="danger" @click="handleNo()">{{ $t('Hmodule.cancel') }}</el-button>
        </span>
      </el-dialog>
      <!--修改结束=================================================-->
    </el-card>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { memoryList, addMemory, updateMemory, deleteMemory } from '@/api/Memorandum'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyEmp from './components/MyEmp'
import MyEmp2 from './components/MyEmp2'

var _that
export default {
  name: 'MemorandumList',
  directives: { waves, permission, permission2 },
  components: { MyEmp2, MyEmp, Pagination },
  filters: {
    typeFilter(status) {
      const statusMap = {
        1: '销售来源',
        2: '订单类型',
        3: '结算方式',
        4: '开票类型',
        5: '机会类型',
        6: '机会来源'
      }
      return statusMap[status]
    },
    statFilter(status) {
      const statusMap = {
        1: '未提醒',
        2: '已提醒'
      }
      return statusMap[status]
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(this.supplierId)
      if (this.employeeId === undefined || this.employeeId === null || this.employeeId === '') {
        callback(new Error('请选择提醒人员'))
      } else {
        callback()
      }
    }
    return {
      employeeId2: '',
      stockControl2: false,
      employeeId: '',
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
        employeeId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        actionTime: [
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
      stockControl: false,
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

  mounted() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 销售员回显
    stockName2(val) {
      console.log('stockName2', val)
      this.employeeId2 = val.personName
      this.getemplist.employeeId = val.id
    },
    // 销售员回显
    stockName(val) {
      console.log('stockName', val)
      this.employeeId = val.personName
      this.addCategoryForm.employeeId = val.id
    },
    // 销售人员focus事件
    handlechooseStock2() {
      this.stockControl2 = true
    },
    // 销售人员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 启用，停用
    handleActive(row) {
      let editEffective = 0
      console.log(row.id, row.isEffective)
      if (row.isEffective === 2) {
        editEffective = 1
        console.log('启用', editEffective)
      }
      if (row.isEffective === 1) {
        editEffective = 2
        console.log('停用', editEffective)
      }
      const params = {
        id: row.id,
        isEffective: editEffective,
        categoryName: row.categoryName
      }
      updateMemory(params).then(res => {
        if (res.data.ret === 200) {
          this.getlist()
        } else {
          console.log('改变出错')
        }
      })
    },
    checkPermission,
    getlist() {
      // 员工列表数据
      this.listLoading = true
      console.log('this.getemplist', this.getemplist)
      memoryList(this.getemplist).then(res => {
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
      memoryList(this.getemplist).then(res => {
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
          deleteMemory(ids, this.$store.getters.userId).then(res => {
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
        deleteMemory(row.id, this.$store.getters.userId).then(res => {
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
      this.editCategoryForm.memoryId = row.id
      this.editCategoryForm.employeeId = row.employeeId
      this.employeeId = row.employeeName
    },
    // 取消修改
    handleNo() {
      this.editcategoryVisible = false
    },
    // 确认修改
    handleOk() {
      this.$refs.editCategoryForm.validate((valid) => {
        if (valid) {
          console.log('this.editCategoryForm', this.editCategoryForm)
          updateMemory(this.editCategoryForm).then(res => {
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
      this.employeeId = ''
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
          addMemory(this.addCategoryForm).then(res => {
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
              this.employeeId = ''
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
