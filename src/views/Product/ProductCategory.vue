<template>
  <div class="ERP-container">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <el-input v-model="getemplist.categoryname" :placeholder="$t('NewEmployeeInformation.categoryname')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="getemplist.type" :value="getemplist.type" :placeholder="$t('NewEmployeeInformation.type')" class="filter-item" clearable>
        <el-option label="物品品牌" value="1"/>
        <el-option label="车辆型号" value="2"/>
        <el-option label="档次级别" value="3"/>
        <el-option label="物品颜色" value="4"/>
        <el-option label="物品配置" value="5"/>
        <el-option label="物品版本" value="6"/>
        <el-option label="直径规格" value="7"/>
        <el-option label="长度等级" value="8"/>
        <el-option label="表面处理" value="9"/>
        <el-option label="性能等级" value="10"/>
      </el-select>
      <el-select v-model="getemplist.iseffective" :value="getemplist.iseffective" :placeholder="$t('NewEmployeeInformation.iseffective')" class="filter-item" clearable>
        <el-option label="active " value="1"/>
        <el-option label="dead" value="2"/>
      </el-select>
      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['1-31-38-1']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['1-31-38-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['1-31-38-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['1-31-38-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;float: right" @click="handleAdd">{{ $t('public.add') }}</el-button>
      <el-dialog :visible.sync="categoryVisible" title="新建分类属性" class="normal" width="600px" center @close="closetag">
        <el-form ref="addCategoryForm" :rules="addCategoryFormRules" :model="addCategoryForm" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
          <el-form-item :label="$t('NewEmployeeInformation.type')" label-width="100px" prop="type">
            <el-select v-model="addCategoryForm.type" placeholder="请选择类别" style="width: 100%" @change="chooseType">
              <el-option label="物品品牌" value="1"/>
              <el-option label="车辆型号" value="2"/>
              <el-option label="档次级别" value="3"/>
              <el-option label="物品颜色" value="4"/>
              <el-option label="物品配置" value="5"/>
              <el-option label="物品版本" value="6"/>
              <el-option label="直径规格" value="7"/>
              <el-option label="长度等级" value="8"/>
              <el-option label="表面处理" value="9"/>
              <el-option label="性能等级" value="10"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.categoryname')" label-width="100px" prop="categoryname">
            <el-input v-model="addCategoryForm.categoryname" autocomplete="off"/>
          </el-form-item>
          <span v-if="tishi === true" style="float: right;color: red">请输入{{ weishu }}编码</span>
          <el-form-item
            v-if="tishi"
            :label="$t('NewEmployeeInformation.code2')"
            prop="code"
            label-width="100px">
            <el-input v-model="addCategoryForm.code" autocomplete="off" @blur="zhengze"/>
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
          <el-table-column :label="$t('NewEmployeeInformation.id')" :resizable="false" prop="id" align="center" min-width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('NewEmployeeInformation.type')" :resizable="false" prop="type" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.type | typeFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('NewEmployeeInformation.categoryname')" :resizable="false" prop="categoryName" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.categoryName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('NewEmployeeInformation.code')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('NewEmployeeInformation.iseffective')" :resizable="false" prop="isEffective" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.isEffective | iseffectiveFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="200">
            <template slot-scope="scope">
              <el-button v-permission="['1-31-38-8']" v-show="scope.row.isEffective === 2" title="启用" style="margin-left: 18px;" type="primary" size="mini" icon="el-icon-check" circle @click="open(scope.row)"/>
              <el-button v-permission="['1-31-38-9']" v-show="scope.row.isEffective === 1" title="停用" type="primary" size="mini" icon="el-icon-close" circle @click="close(scope.row)"/>
              <el-button v-permission="['1-31-38-3']" type="primary" size="mini" @click="handleEdit(scope.row)" >{{ $t('public.edit') }}</el-button>
              <el-button v-permission="['1-31-38-2']" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 列表结束 -->
        <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
        <el-dialog :visible.sync="editcategoryVisible" title="修改分类属性" class="normal" width="600px" center>
          <el-form ref="editCategoryForm" :rules="editCategoryFormRules" :model="editCategoryForm" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
            <el-form-item :label="$t('NewEmployeeInformation.type')" label-width="100px">
              <el-select v-model="editCategoryForm.type" placeholder="请选择类别" style="width: 100%" disabled >
                <el-option label="物品品牌" value="1"/>
                <el-option label="车辆型号" value="2"/>
                <el-option label="档次级别" value="3"/>
                <el-option label="物品颜色" value="4"/>
                <el-option label="物品配置" value="5"/>
                <el-option label="物品版本" value="6"/>
                <el-option label="直径规格" value="7"/>
                <el-option label="长度等级" value="8"/>
                <el-option label="表面处理" value="9"/>
                <el-option label="性能等级" value="10"/>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.categoryname')" label-width="100px" prop="categoryName">
              <el-input v-model="editCategoryForm.categoryName" autocomplete="off"/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.code2')" label-width="100px">
              <el-input v-model="editCategoryForm.code" disabled/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.iseffective')" label-width="100px" prop="isEffective">
              <el-select v-model="editCategoryForm.isEffective" placeholder="请选择状态" style="width: 100%">
                <el-option label="active " value="1"/>
                <el-option label="dead" value="2"/>
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
import { searchEmpCategory, addEmpCategory, updateEmpCategory, delateEmpCategory } from '@/api/Product'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

var _that
export default {
  name: 'ProductCategory',
  directives: { waves, permission, permission2 },
  components: { Pagination },
  filters: {
    typeFilter(status) {
      const statusMap = {
        1: '物品品牌',
        2: '车辆型号',
        3: '档次级别',
        4: '物品颜色',
        5: '物品配置',
        6: '物品版本',
        7: '直径规格',
        8: '长度等级',
        9: '表面处理',
        10: '性能等级'
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
      // 位数提示
      weishu: '',
      // 提示位数
      tishi: false,
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
      personalForm2: {},
      // 校验新增数据
      addCategoryFormRules: {
        categoryname: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择分类类别', trigger: 'change' }
        ],
        iseffective: [
          { required: true, message: '请选择启用状态', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入编码', trigger: 'blur' }
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
  beforeCreate() {
    _that = this
  },
  mounted() {
    this.getlist()
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
            title: '错误',
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
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    checkPermission,
    zhengze(val) {
      if (this.addCategoryForm.type === '2') {
        const reg = /^[A-Z0-9]{4}$/
        if (reg.test(this.addCategoryForm.code) === false) {
          this.addCategoryForm.code = ''
        }
      } else if (this.addCategoryForm.type === '4') {
        const reg = /^[A-Z0-9]{3}$/
        if (reg.test(this.addCategoryForm.code) === false) {
          this.addCategoryForm.code = ''
        }
      } else if (this.addCategoryForm.type === '5') {
        const reg = /^[A-Z0-9]{3}$/
        if (reg.test(this.addCategoryForm.code) === false) {
          this.addCategoryForm.code = ''
        }
      } else if (this.addCategoryForm.type === '6') {
        const reg = /^[A-Z0-9]{2}$/
        if (reg.test(this.addCategoryForm.code) === false) {
          this.addCategoryForm.code = ''
        }
      } else if (this.addCategoryForm.type === '7') {
        const reg = /^[A-Z0-9]{2}$/
        if (reg.test(this.addCategoryForm.code) === false) {
          this.addCategoryForm.code = ''
        }
      } else if (this.addCategoryForm.type === '8') {
        const reg = /^[A-Z0-9]{3}$/
        if (reg.test(this.addCategoryForm.code) === false) {
          this.addCategoryForm.code = ''
        }
      } else if (this.addCategoryForm.type === '9') {
        const reg = /^[A-Z0-9]{2}$/
        if (reg.test(this.addCategoryForm.code) === false) {
          this.addCategoryForm.code = ''
        }
      } else if (this.addCategoryForm.type === '10') {
        const reg = /^[A-Z0-9]{2}$/
        if (reg.test(this.addCategoryForm.code) === false) {
          this.addCategoryForm.code = ''
        }
      }
    },
    chooseType(val) {
      if (val === '1') {
        this.tishi = false
      } else if (val === '2') {
        this.weishu = '4位车型'
        this.tishi = true
      } else if (val === '3') {
        this.tishi = false
      } else if (val === '4') {
        this.weishu = '3位颜色'
        this.tishi = true
      } else if (val === '5') {
        this.weishu = '3位配置'
        this.tishi = true
      } else if (val === '6') {
        this.weishu = '2位版本'
        this.tishi = true
      } else if (val === '7') {
        this.weishu = '2位直径规格'
        this.tishi = true
      } else if (val === '8') {
        this.weishu = '3位长度等级'
        this.tishi = true
      } else if (val === '9') {
        this.weishu = '2位表面处理'
        this.tishi = true
      } else if (val === '10') {
        this.weishu = '2位性能等级'
        this.tishi = true
      }
    },
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
    closetag() {
      this.$refs.addCategoryForm.clearValidate()
      this.$refs.addCategoryForm.resetFields()
      this.restAddCategoryForm()
    },
    // 确认修改
    handleOk() {
      this.$refs.editCategoryForm.validate((valid) => {
        if (valid) {
          updateEmpCategory(this.editCategoryForm).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
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
                title: '错误',
                message: '出错了',
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
                title: '成功',
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
                title: '错误',
                message: '出错了',
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
