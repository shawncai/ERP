<template>
  <div class="ERP-container">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <!-- <el-input v-model="productCategoryId" placeholder="请选择物品分类" class="filter-item" style="width: 150px" @focus="treechoose"/> -->
      <el-select v-model="getemplist.commissionType" placeholder="请选择提成类型" class="filter-item" clearable >
        <el-option value="1" label="提成比例" />
        <el-option value="2" label="固定金额" />
      </el-select>
      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['1-39-277-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['1-39-277-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['1-39-277-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['1-39-277-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;float: right" @click="handleAdd">{{ $t('public.add') }}</el-button>
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
          fixed="left"
          align="center"/>
        <el-table-column :label="$t('BasicSettings.id')" :resizable="false" fixed="left" prop="id" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.roleId')" :resizable="false" fixed="left" prop="ruleName" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.postName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Product.categoryid')" :resizable="false" prop="type" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.productCategoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.commissionCategory')" :resizable="false" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.commissionCategory | commissionCategoryFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.commissionType')" :resizable="false" prop="dateType" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.commissionType | commissionTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.commissionValue')" :resizable="false" prop="length" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.commissionValue }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.countyrId')" :resizable="false" prop="isEffective" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.countryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="180">
          <template slot-scope="scope">
            <el-button v-permission="['1-39-277-3']" type="primary" size="mini" @click="handleEdit(scope.row)">{{ $t('public.edit') }}</el-button>
            <el-button v-permission="['1-39-277-2']" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-dialog :visible.sync="editNumberingVisible" title="修改编号规则" append-to-body width="600px" class="normal">
        <el-form ref="editNumberingform" :model="editNumberingform" :rules="editNumberingformRule" label-width="120px" style="margin: 0 auto; width: 400px">
          <el-form-item :label="$t('BasicSettings.roleId')" prop="roleId" style="width: 40%;margin-top:1%">
            <el-select v-model="editNumberingform.roleId" style="width: 150px;">
              <el-option
                v-for="(item, index) in roleIds"
                :key="index"
                :label="item.roleName"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Product.categoryid')" prop="productCategoryId" style="width: 40%;">
            <el-select v-model="getemplist.productCategoryId" :placeholder="$t('Hmodule.wpfl')" style="width: 150px" clearable>
              <el-option :label="$t('otherlanguage.zc')" value="1"/>
              <el-option :label="$t('otherlanguage.pj')" value="2"/>
              <el-option :label="$t('otherlanguage.jgj')" value="3"/>
              <el-option :label="$t('otherlanguage.dc')" value="5"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.commissionCategory')" prop="commissionType" style="width: 100%;margin-top:1%">
            <el-radio-group v-model="editNumberingform.commissionCategory">
              <el-radio :label="1">{{ $t('updates.lrtc') }}</el-radio>
              <el-radio :label="2">{{ $t('updates.xssrtc') }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.commissionType')" prop="commissionType" style="width: 100%;margin-top:1%">
            <el-radio-group v-model="editNumberingform.commissionType">
              <el-radio :label="1">{{ $t('updates.tcbl') }}</el-radio>
              <el-radio :label="2">{{ $t('updates.gdje') }}</el-radio>
              <!-- <el-radio :label="3">绩效分</el-radio> -->
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.commissionValue')" prop="commissionValue" style="150px;margin-top:1%">
            <el-input v-model="editNumberingform.commissionValue" placeholder="请输入提成" clearable/>
          </el-form-item>
          <el-form-item :label="$t('public.countyrId')" prop="countryId" style="150px;margin-top: 1%">
            <el-select v-model="editNumberingform.countryId" placeholder="国家" style="width: 100%;">
              <el-option
                v-for="(item, index) in nations"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="editNumberingVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEditOk">{{ $t('public.edit') }}</el-button>
        </div>
      </el-dialog>
      <!--修改结束=================================================-->
    </div>
  </div>
</template>

<script>
import { repairList } from '@/api/Getauthority'
import { getcountrylist } from '@/api/public'
import { getCommissionlist, createRules, updateRules, deleteCommission, update } from '@/api/BasicSettings'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import MyTree from './components/MyTree'

var _that
export default {
  name: 'NumberingRules',
  directives: { waves, permission, permission2 },
  components: { Pagination, MyTree },
  filters: {
    commissionCategoryFilter(status) {
      const statusMap = {
        1: '利润提成',
        2: '销售收入提成'
      }
      return statusMap[status]
    },
    commissionTypeFilter(status) {
      const statusMap = {
        1: '提成比例',
        2: '固定金额'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // 单据类型
      categorys: [],
      // 修改数据集合
      editNumberingform: '',
      // 新建数据集合
      Numberingform: {
        ruleName: '',
        type: '',
        iseffective: '1',
        prefix: '',
        dateType: 1,
        length: '',
        createid: this.$store.getters.userId
      },
      // 修改窗口控制器
      editNumberingVisible: false,
      treecontrol: false,
      // 新建窗口控制器
      addNumberingVisible: false,
      // 控制组件数据
      editVisible: false,
      // 批量操作
      moreaction: '',
      productCategoryId: '',
      // 加载操作控制
      downloadLoading: false,
      roleIds: [],
      // 表格数据
      list: [],
      nations: [],
      // 表格数据条数
      total: 0,
      personalForm2: {},
      // 表格识别
      tableKey: 0,
      // 加载表格
      listLoading: true,
      // 编号列表查询加展示参数
      getemplist: {
        ruleName: '',
        type: '',
        iseffective: '',
        pagenum: 1,
        pagesize: 10
      },
      // 新增规则
      NumberingformRule: {
        type: [
          { required: true, message: '请选择规则', trigger: 'change' }
        ],
        ruleName: [
          { required: true, message: '请填写规则', trigger: 'change' }
        ],
        prefix: [
          { required: true, message: '请填写编号前缀', trigger: 'change' }
        ],
        length: [
          { required: true, message: '请填写流水长度', trigger: 'change' }
        ]
      },
      editNumberingformRule: {
        ruleName: [
          { required: true, message: '请填写规则', trigger: 'change' }
        ],
        prefix: [
          { required: true, message: '请填写编号前缀', trigger: 'change' }
        ],
        length: [
          { required: true, message: '请填写流水长度', trigger: 'change' }
        ]
      }
    }
  },
  activated() {
    this.getlist()
  },
  mounted() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    tree(val) {
      console.log(val)
      this.productCategoryId = val.categoryName
      this.editNumberingform.productCategoryId = val.id
    },
    treechoose() {
      console.log('this.treecontrol', this.treecontrol)
      this.treecontrol = true
      console.log('this.treecontrol', this.treecontrol)
    },
    // 启用停用操作
    open(row) {
      console.log('row', row)
      this.personalForm2.id = row.id
      this.personalForm2.isEffective = 1
      updateRules(this.personalForm2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: this.$t('prompt.czcg'),
            message: this.$t('prompt.czcg'),
            type: 'success',
            duration: 1000,
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
    },
    close(row) {
      console.log('row', row)
      this.personalForm2.id = row.id
      this.personalForm2.isEffective = 2
      updateRules(this.personalForm2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: this.$t('prompt.czcg'),
            message: this.$t('prompt.czcg'),
            type: 'success',
            duration: 1000,
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
    },
    checkPermission,
    getlist() {
      getcountrylist().then(res => {
        if (res.data.ret === 200) {
          this.nations = res.data.data.content
        }
      })
      const param = {}
      param.iseffective = 1
      param.iseffective = 1
      param.type = 2
      param.pagesize = 999
      repairList().then(res => {
        if (res.data.ret === 200) {
          this.roleIds = res.data.data.content
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
        }
      })
      // 单据编号列表数据
      this.listLoading = true
      getCommissionlist(this.getemplist).then(res => {
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
      getCommissionlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
      })
      this.productCategoryId = ''
      this.getemplist = {}
    },
    // 修改操作
    handleEdit(row) {
      console.log(row)
      this.editNumberingform = row
      this.productCategoryId = row.productCategoryName
      this.editNumberingVisible = true
    },
    // 确认修改
    handleEditOk() {
      console.log(this.editNumberingform)
      this.$refs.editNumberingform.validate((valid) => {
        if (valid) {
          update(this.editNumberingform).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: '修改成功',
                type: 'success',
                offset: 100
              })
              this.getlist()
              this.editNumberingVisible = false
            } else {
              this.$notify.error({
                title: 'wrong',
                message: res.data.msg,
                offset: 100
              })
            }
          })
          this.$refs.editNumberingform.clearValidate()
          this.$refs.editNumberingform.resetFields()
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
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 多条删除
    // 批量删除
    handleCommand(command) {
      const ids = this.moreaction.map(item => item.id).join()
      if (command === 'delete') {
        this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
          confirmButtonText: this.$t('prompt.qd'),
          cancelButtonText: this.$t('prompt.qx'),
          type: 'warning'
        }).then(() => {
          deleteCommission(ids, this.$store.getters.userId).then(res => {
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
      this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
        confirmButtonText: this.$t('prompt.qd'),
        cancelButtonText: this.$t('prompt.qx'),
        type: 'warning'
      }).then(() => {
        deleteCommission(row.id, this.$store.getters.userId).then(res => {
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
    // 清除数据
    restNumberingform() {
      this.Numberingform = {
        ruleName: '',
        type: '',
        iseffective: '1',
        prefix: '',
        dateType: '',
        length: ''
      }
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/BasicSettings/Commission')
    },
    // 确认新增
    handleOk() {
      console.log(this.Numberingform)
      this.$refs.Numberingform.validate((valid) => {
        if (valid) {
          createRules(this.Numberingform).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: '新增成功',
                type: 'success',
                offset: 100
              })
              this.getlist()
              this.restNumberingform()
              this.addNumberingVisible = false
            } else {
              this.$notify.error({
                title: 'wrong',
                message: res.data.msg,
                offset: 100
              })
            }
          })
          this.$refs.Numberingform.clearValidate()
          this.$refs.Numberingform.resetFields()
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

<style rel="stylesheet/css" scoped>
  .el-dialog--center >>> el-dialog__body{
    /*padding: 10px 20px 10px;*/
    padding: 0px 25px 30px;
  }
  .normal >>> .el-dialog__header {
    /*padding: 10px 20px 10px;*/
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
</style>
