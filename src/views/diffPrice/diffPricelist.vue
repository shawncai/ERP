<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <el-select v-model="getemplist.categoryId" :placeholder="$t('tongyo.dcfl')" :value="getemplist.categoryId" class="filter-item" clearable @keyup.enter.native="handleFilter">
        <el-option v-for="(item, index) in batterylistdata" :key="index" :label="item.categoryName" :value="item.id"/>
      </el-select>
      <el-select v-model="getemplist.useType" :placeholder="$t('tongyo.dcsylb')" :value="getemplist.useType" class="filter-item" clearable @keyup.enter.native="handleFilter">
        <el-option :label="$t('tongyo.jy')" value="1"/>
        <el-option :label="$t('tongyo.yy')" value="2"/>
      </el-select>
      <el-select v-model="getemplist.iseffective" :placeholder="$t('updates.qyzt')" :value="getemplist.iseffective" class="filter-item" clearable @keyup.enter.native="handleFilter">
        <el-option label="on duty" value="1"/>
        <el-option label="closed" value="2"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-top:10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['54-382-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 新建操作 -->
      <el-button v-permission="['54-382-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
      <el-dialog :visible.sync="categoryVisible" :title="$t('updates.xjflsx')" class="normal" width="600px" center>
        <el-form ref="addCategoryForm" :rules="addCategoryFormRules" :model="addCategoryForm" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
          <el-form-item :label="$t('tongyo.dcsylb')" label-width="120px" prop="useType">
            <el-select v-model="addCategoryForm.useType" style="width: 100%">
              <el-option :label="$t('tongyo.jy')" value="1"/>
              <el-option :label="$t('tongyo.yy')" value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tongyo.dcfl')" label-width="120px" prop="categoryId">
            <el-select v-model="addCategoryForm.categoryId" style="width: 100%">
              <el-option v-for="(item, index) in batterylistdata" :key="index" :label="item.categoryName" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tongyo.sydsy')" label-width="120px" prop="useMonth">
            <el-input v-model="addCategoryForm.useMonth" autocomplete="off" type="number"/>
          </el-form-item>
          <el-form-item :label="$t('tongyo.zdsj')" label-width="120px" prop="diffMoney">
            <el-input v-model="addCategoryForm.diffMoney" autocomplete="off" type="number"/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.iseffective')" label-width="120px" prop="iseffective">
            <el-select v-model="addCategoryForm.iseffective" style="width: 100%">
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
        <el-table-column :label="$t('NewEmployeeInformation.id')" :resizable="false" align="center" min-width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tongyo.dcsylb')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.useType | typeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tongyo.dcfl')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.categoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tongyo.sydsy')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.useMonth }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tongyo.zdsj')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.diffMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.iseffective')" :resizable="false" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.isEffective | iseffectiveFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <!-- <el-button v-permission="['54-83-3']" v-if="scope.row.isEffective === 1" type="danger" size="mini" @click="handleActive(scope.row)" >{{ $t('public.disable') }}</el-button>
            <el-button v-permission="['54-83-3']" v-else type="success" size="mini" @click="handleActive(scope.row)" >{{ $t('public.enable') }}</el-button> -->
            <el-button v-permission="['54-382-3']" type="primary" size="mini" @click="handleEdit(scope.row)" >{{ $t('public.edit') }}</el-button>
            <el-button v-permission="['54-382-2']" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-dialog :visible.sync="editcategoryVisible" :title="$t('updates.xgflsx')" class="normal" width="600px" center>
        <el-form ref="editCategoryForm" :rules="editCategoryFormRules" :model="editCategoryForm" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
          <el-form-item :label="$t('tongyo.dcsylb')" label-width="120px" prop="useType">
            <el-select v-model="editCategoryForm.useType" style="width: 100%">
              <el-option :label="$t('tongyo.jy')" value="1"/>
              <el-option :label="$t('tongyo.yy')" value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tongyo.dcfl')" label-width="120px" prop="categoryId">
            <el-select v-model="editCategoryForm.categoryId" style="width: 100%">
              <el-option v-for="(item, index) in batterylistdata" :key="index" :label="item.categoryName" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tongyo.sydsy')" label-width="120px" prop="useMonth">
            <el-input v-model="editCategoryForm.useMonth" autocomplete="off" type="number"/>
          </el-form-item>
          <el-form-item :label="$t('tongyo.zdsj')" label-width="120px" prop="diffMoney">
            <el-input v-model="editCategoryForm.diffMoney" autocomplete="off" type="number"/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.iseffective')" label-width="120px" prop="isEffective">
            <el-select v-model="editCategoryForm.isEffective" style="width: 100%">
              <el-option :label="$t('updates.qy')" value="1"/>
              <el-option :label="$t('updates.ty')" value="2"/>
            </el-select>
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
// import { searchSaleCategoryall, addSaleCategory, updateSaleCategory, delateSaleCategory } from '@/api/SaleCategory'
import { addDiffPrice, batteryList, searchDiffPrice, deleteDiffPrice, updateDiffPrice } from '@/api/DiffPrice'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数

var _that
export default {
  name: 'DiffPrice',
  directives: { waves, permission, permission2 },
  components: { Pagination },
  filters: {
    typeFilter(status) {
      const statusMap = {
        1: _that.$t('tongyo.jy'),
        2: _that.$t('tongyo.yy')
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
      batterylistdata: [],
      // 批量删除参数
      moreaction: [],
      // 新增窗口
      categoryVisible: false,
      // 新增数据
      addCategoryForm: {
        iseffective: '1',
        createId: this.$store.getters.userId
      },
      // 校验新增数据
      addCategoryFormRules: {
        useType: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        useMonth: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        diffMoney: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        categoryId: [
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
      },
      // 校验修改数据
      editCategoryFormRules: {
        useType: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        useMonth: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        diffMoney: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: '请选择', trigger: 'change' }
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
        pagenum: 1,
        pagesize: 10
      }
    }
  },

  mounted() {
    this.getlist()
    this.getbatterylist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getbatterylist() {
      batteryList().then(res => {
        if (res.data.ret === 200) {
          const bttery1 = res.data.data.content[0].productClassfyVos
          const bttery2 = res.data.data.content[1].productClassfyVos
          this.batterylistdata = [...bttery1, ...bttery2]
        }
      })
    },
    checkPermission,
    getlist() {
      // 员工列表数据
      this.listLoading = true
      searchDiffPrice(this.getemplist).then(res => {
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
      searchDiffPrice(this.getemplist).then(res => {
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
          deleteDiffPrice(ids, this.$store.getters.userId).then(res => {
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
        deleteDiffPrice(row.id, this.$store.getters.userId).then(res => {
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
      this.editCategoryForm.useType = String(row.useType)
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
          updateDiffPrice(this.editCategoryForm).then(res => {
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
    //   this.getbatterylist()
    },
    // 取消操作
    handlecancel() {
      this.$refs.addCategoryForm.clearValidate()
      this.$refs.addCategoryForm.resetFields()
      this.restAddCategoryForm()
      this.categoryVisible = false
    },
    restAddCategoryForm() {
      this.addCategoryForm = {
        iseffective: '1',
        createId: this.$store.getters.userId
      }
    },
    // 保存操作
    handlesave() {
      console.log(this.addCategoryForm)
      this.$refs.addCategoryForm.validate((valid) => {
        if (valid) {
          addDiffPrice(this.addCategoryForm).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: 'successful',
                message: 'successful',
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
    margin: 0px 30px;
  }
  .filter-container{
    padding: 20px;
    padding-left: 0px;
  }
  .filter-item{
    width: 180px;
    margin-left: 20px;
    padding: 10px 0;
  }
</style>
