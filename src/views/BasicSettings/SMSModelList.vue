<template>
  <div class="ERP-container">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <el-input v-model="getemplist.modelname" :placeholder="$t('BasicSettings.modelname')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="getemplist.iseffective" placeholder="请选择状态" class="filter-item" clearable >
        <el-option value="1" label="启用" />
        <el-option value="2" label="禁用" />
      </el-select>
      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['1-39-42-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['1-39-42-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['1-39-42-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['1-39-42-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;float: right" @click="handleAdd">{{ $t('public.add') }}</el-button>
      <!--新建列表开始-->
      <el-dialog :visible.sync="addNumberingVisible" title="新建短信模板" width="600px">
        <el-form ref="Numberingform" :model="Numberingform" :rules="Numberingformrules" label-position="left" label-width="120px" style="width: 500px; margin-left:50px;">
          <el-form-item :label="$t('BasicSettings.modelname')" prop="modelname" label-width="120px">
            <el-input v-model="Numberingform.modelname" placeholder="请输入短信模板名称" autocomplete="off" style="width: 300px"/>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.content')" prop="content" label-width="120px">
            <el-input v-model="Numberingform.content" :rows="4" type="textarea" placeholder="请输入短信内容" autocomplete="off" style="width: 300px"/>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.iseffective2')" prop="iseffective" label-width="120px">
            <el-radio-group v-model="Numberingform.iseffective">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="addNumberingVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleOk">确 定</el-button>
        </div>
      </el-dialog>
      <!--新建结束-->
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
        <el-table-column :label="$t('BasicSettings.id')" :resizable="false" prop="id" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.modelname')" :resizable="false" prop="modelName" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.modelName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.iseffective2')" :resizable="false" prop="isEffective" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.isEffective | genderFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.content')" :resizable="false" prop="content" align="center" min-width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.createTime')" :resizable="false" prop="createTime" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button v-permission="['1-39-42-3']" type="primary" size="mini" @click="handleEdit(scope.row)">{{ $t('public.edit') }}</el-button>
            <el-button v-permission="['1-39-42-2']" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-dialog :visible.sync="editNumberingVisible" title="修改编号规则" width="600px">
        <el-form ref="editNumberingform" :model="editNumberingform" :rules="editNumberingformrules" label-position="left" label-width="120px" style="width: 500px; margin-left:50px;">
          <el-form-item :label="$t('BasicSettings.modelname')" prop="modelName" label-width="120px">
            <el-input v-model="editNumberingform.modelName" placeholder="请输入短信模板名称" autocomplete="off" style="width: 300px"/>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.content')" prop="content" label-width="120px">
            <el-input v-model="editNumberingform.content" :rows="4" type="textarea" placeholder="请输入短信内容" autocomplete="off" style="width: 300px"/>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.iseffective2')" prop="isEffective" label-width="120px">
            <el-radio-group v-model="editNumberingform.isEffective">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="editNumberingVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEditOk">修改</el-button>
        </div>
      </el-dialog>
      <!--修改结束=================================================-->
    </div>
  </div>
</template>

<script>
import { modellist, deletemodel, addmodel, updatemodel } from '@/api/BasicSettings'
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'SMSModelList',
  directives: { waves, permission },
  components: { Pagination },
  filters: {
    genderFilter(status) {
      const statusMap = {
        1: '启用',
        2: '禁用'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // 短信模板修改数据集合
      editNumberingform: '',
      // 短信模板信息规则数据
      editNumberingformrules: {
        modelName: [
          { required: true, message: '请输入短信模板名称', trigger: 'blur' }
        ],
        isEffective: [
          { required: true, message: '请选择启用状态', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      },
      // 短信模板新建数据集合
      Numberingform: {
        iseffective: '',
        modelname: '',
        content: ''
      },
      // 短信模板信息规则数据
      Numberingformrules: {
        modelname: [
          { required: true, message: '请输入短信模板名称', trigger: 'blur' }
        ],
        iseffective: [
          { required: true, message: '请选择启用状态', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      },
      // 修改窗口控制器
      editNumberingVisible: false,
      // 新建窗口控制器
      addNumberingVisible: false,
      // 控制组件数据
      editVisible: false,
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
      // 短信模板列表查询加展示参数
      getemplist: {
        iseffective: '',
        modelname: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    checkPermission,
    getlist() {
      // 短信模板列表数据
      this.listLoading = true
      modellist(this.getemplist).then(res => {
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
      modellist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
      })
    },
    // 修改操作
    handleEdit(row) {
      console.log(row)
      this.editNumberingform = row
      this.editNumberingVisible = true
    },
    // 确认修改
    handleEditOk() {
      console.log(this.editNumberingform)
      this.$refs.editNumberingform.validate((valid) => {
        if (valid) {
          updatemodel(this.editNumberingform).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.getlist()
              this.$refs.editNumberingform.clearValidate()
              this.$refs.editNumberingform.resetFields()
              this.editNumberingVisible = false
            } else {
              this.$notify.error({
                title: '错误',
                message: res.data.msg,
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
          deletemodel(ids, this.$store.getters.userId).then(res => {
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
        deletemodel(row.id, this.$store.getters.userId).then(res => {
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
    // 清除数据
    restNumberingform() {
      this.Numberingform = {
        iseffective: '',
        modelname: '',
        content: ''
      }
    },
    // 新增数据
    handleAdd() {
      this.addNumberingVisible = true
    },
    // 确认新增
    handleOk() {
      this.$refs.Numberingform.validate((valid) => {
        if (valid) {
          addmodel(this.Numberingform).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.restNumberingform()
              this.getlist()
              this.$refs.Numberingform.clearValidate()
              this.$refs.Numberingform.resetFields()
              this.addNumberingVisible = false
            } else {
              this.$notify.error({
                title: '错误',
                message: res.data.msg,
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
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['序号', '编号规则名称', '单据类型', '编号前缀', '日期类型', '流水号长度', '状态', '创建日期']
          const filterVal = ['id', 'ruleName', 'type', 'prefix', 'dateType', 'length', 'isEffective', 'createTime']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '编号规则资料表'
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
