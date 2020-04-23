<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">
      <!-- 搜索条件栏目 -->
      <el-input v-model="getcontractlist.contractnumber" :placeholder="$t('NewEmployeeInformation.contractnumber')" class="filter-item" size="small" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getcontractlist.contractname" :placeholder="$t('NewEmployeeInformation.contractname')" class="filter-item" size="small" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getcontractlist.empnumber" :placeholder="$t('NewEmployeeInformation.empnumber')" class="filter-item" size="small" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getcontractlist.empname" :placeholder="$t('NewEmployeeInformation.empname')" class="filter-item" size="small" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="getcontractlist.isEnd" :placeholder="$t('updates.sfdq')" class="filter-item" size="small" clearable @keyup.enter.native="handleFilter">
        <el-option :label="$t('updates.yes')" value="1"/>
        <el-option :label="$t('updates.no')" value="2"/>
      </el-select>      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
    </el-card>
    <el-card :body-style="	{ padding: '6px'}" class="box-card" shadow="never">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves size="small" class="filter-item2" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['1-2-7-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['1-2-7-6']" v-waves :loading="downloadLoading" size="small" class="filter-item2" style="width: 60px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['1-2-7-7']" v-waves size="small" class="filter-item2" icon="el-icon-printer" style="width: 86p60pxx" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['1-2-7-1']" v-waves size="small" class="filter-item2" icon="el-icon-plus" type="success" style="width: 60px;" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </el-card>
    <el-card :body-style="	{ padding: '10px' }" class="box-card" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :height="tableHeight"
        :key="tableKey"
        :data="list"
        border
        fit
        size="small"
        highlight-current-row
        style="width: 100%;"
        @row-click="clickRow"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          fixed="left"
          align="center"/>
        <el-table-column :label="$t('NewEmployeeInformation.contractnumber')" :resizable="false" fixed="left" prop="contractNumber" align="center" width="180">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.contractNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.contractname')" :resizable="false" fixed="left" prop="contractName" align="center" width="200">
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
        <el-table-column :label="$t('NewEmployeeInformation.status')" :resizable="false" prop="expiredTime" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.stat | statFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.isEnd')" :resizable="false" prop="expiredTime" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.isEnd | isEndFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button v-permission="['1-2-7-3']" type="primary" size="mini" @click="handleEdit(scope.row)">{{ $t('public.edit') }}</el-button>
            <el-button v-permission="['1-2-7-2']" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getcontractlist.pagenum" :limit.sync="getcontractlist.pagesize" @pagination="getlist" />
      <!--修改弹窗-->
      <el-dialog :visible.sync="editVisible" :title="$t('updates.htbh') + contractNumber" width="1010px" class="edit" top="-10px">
        <el-card class="box-card" style="margin-top: 63px" shadow="never">
          <el-form ref="contractForm" :model="contractForm" :rules="contractFormRules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-form-item :label="$t('NewEmployeeInformation.employeeid')" prop="employeeId" style="width: 40%;">
              <el-input v-model="employeeName" :disabled="true" placeholder="请选择员工" clearable/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.typeid')" prop="type" style="width: 40%;">
              <el-select v-model="contractForm.type" placeholder="请选择合同类别" style="width: 100%;">
                <el-option
                  v-for="(item, index) in alltypes"
                  :key="index"
                  :label="item.categoryName"
                  :value="item.id"/>
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
              <el-radio-group v-model="contractForm.isCorrection" style="width: 80%">
                <el-radio :label="1" style="width: 50%">{{ $t('updates.yes') }}</el-radio>
                <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.contractstat')" style="width: 40%;margin-top:1%">
              <el-radio-group v-model="contractForm.stat" style="width: 80%">
                <el-radio :label="1" style="width: 50%">{{ $t('updates.sx') }}</el-radio>
                <el-radio :label="2">{{ $t('updates.wsx') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.trialsalary')" style="width: 40%">
              <el-input v-model="contractForm.trialSalary" clearable/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.correctionsalary')" style="width: 40%">
              <el-input v-model="contractForm.correctionSalary" clearable/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.remindpersonid')" style="width: 40%">
              <el-input v-model="remindpersonid" clearable @focus="controlremin"/>
              <div class="showtag">
                <el-tag
                  v-for="tag in remindpersonname"
                  :key="tag.id"
                  :disable-transitions="false"
                  closable
                  @close="handleClose(tag)">
                  {{ tag.personName }}
                </el-tag>
              </div>
            </el-form-item>
            <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
            <el-form-item :label="$t('NewEmployeeInformation.advanceday')" style="width: 40%">
              <el-input v-model="contractForm.advanceDay" clearable>
                <template slot="append">{{ $t('updates.day') }}</template>
              </el-input>
            </el-form-item>
          </el-form>
          <div class="buttons" style="margin-top: 20px;margin-left: 30px">
            <el-button type="primary" @click="handleEditok()">{{ $t('public.edit') }}</el-button>
            <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
          </div>
        </el-card>
      </el-dialog>
      <!--      详情-->
      <el-dialog :visible.sync="detailVisible" :title="$t('updates.htbh') + contractNumber" width="1010px" class="edit" top="-10px">
        <el-card class="box-card" style="margin-top: 63px" shadow="never">
          <el-form ref="contractForm" :model="contractForm" :rules="contractFormRules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-form-item :label="$t('NewEmployeeInformation.employeeid')" prop="employeeId" style="width: 40%;">
              {{ contractForm.empName }}
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.typeid')" prop="type" style="width: 40%;">
              {{ contractForm.contractType }}
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.contractname')" prop="contractName" style="width: 40%">
              {{ contractForm.contractName }}
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.signtime')" style="width: 40%" prop="signTime">
              {{ contractForm.signTime }}
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.expiredtime')" style="width: 40%" prop="expiredTime">
              {{ contractForm.expiredTime }}
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.effectivetime')" style="width: 40%" prop="effectiveTime">
              {{ contractForm.effectiveTime }}
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.period')" style="width: 40%;margin-top:1%">
              {{ contractForm.period | periodFilter }}
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.attribute')" style="width: 40%;margin-top:1%">
              {{ contractForm.contractAttribute | contractAttributeFilter }}
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.iscorrection')" style="width: 40%;margin-top:1%">
              {{ contractForm.isCorrection | isCorrectionFilter }}
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.contractstat')" style="width: 40%;margin-top:1%">
              {{ contractForm.stat | statFilter }}
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.trialsalary')" style="width: 40%">
              {{ contractForm.trialSalary }}
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.correctionsalary')" style="width: 40%">
              {{ contractForm.correctionSalary }}
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.remindpersonid')" style="width: 40%">
              {{ contractForm.remindPerson }}
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.advanceday')" style="width: 40%">
              {{ contractForm.advanceDay }}天
            </el-form-item>
          </el-form>
          <div class="buttons" style="margin-top: 20px;margin-left: 30px">
            <el-button type="primary" @click="handleEditok()">{{ $t('public.edit') }}</el-button>
            <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
          </div>
        </el-card>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { contractlist, updatecontract, deleteempcontract, searchEmpCategory } from '@/api/EmployeeInformation'
import waves from '@/directive/waves' // Waves directive
import MyCreate from './components/MyCreate'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数

var _that
export default {
  name: 'EmployeeContract',
  directives: { waves, permission, permission2 },
  components: { Pagination, MyCreate },
  filters: {
    isEndFilter(status) {
      const statusMap = {
        1: _that.$t('updates.yes'),
        2: _that.$t('updates.no')
      }
      return statusMap[status]
    },
    contractAttributeFilter(status) {
      const statusMap = {
        1: '类型1',
        2: '类型2'
      }
      return statusMap[status]
    },
    periodFilter(status) {
      const statusMap = {
        1: '类型1',
        2: '类型2'
      }
      return statusMap[status]
    },
    isCorrectionFilter(status) {
      const statusMap = {
        1: _that.$t('updates.yes'),
        2: _that.$t('updates.no')
      }
      return statusMap[status]
    },
    statFilter(status) {
      const statusMap = {
        1: '生效',
        2: '未生效'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableHeight: 200,
      // 多选小标签
      remindpersonname: [],
      // 提醒人回显
      remindpersonid: '',
      // 控制提醒人窗口
      createcontrol: false,
      // 所有合同类别数据
      alltypes: [],
      // 合同类别参数
      typeids: {
        type: 3,
        pagenum: 1,
        pagesize: 9999
      },
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
      detailVisible: false,
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
    // 详情操作
    handleDetail(row) {
      this.detailVisible = true
      this.contractForm = Object.assign({}, row)
    },
    checkPermission,
    getlist() {
      // 员工列表数据
      this.listLoading = true
      contractlist(this.getcontractlist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        } else {
          console.log('列表出错')
          this.listLoading = false
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      // 合同类别数据
      searchEmpCategory(this.typeids).then(res => {
        if (res.data.ret === 200) {
          this.alltypes = res.data.data.content.list
        } else {
          console.log('合同类别数据出错了')
        }
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
      this.remindpersonname = []
      console.log(row)
      if (row.remindPerson !== null) {
        // 接受提醒人名称
        let name = []
        // 接受提醒人id
        let id = []
        id = row.expiredRemindPersonId.split(',')
        name = row.remindPerson.split(',')
        for (let i = 0; i < name.length - 1; i++) {
          const temp = {}
          temp.personName = name[i]
          temp.id = id[i]
          this.remindpersonname.push(temp)
        }
      }
      console.log(this.remindpersonname)
      this.editVisible = true
      this.employeeName = row.empName
      this.contractNumber = row.contractNumber
      this.contractForm = Object.assign({}, row)
      // this.remindpersonid = this.contractForm.remindPerson
      this.contractForm.period = String(row.period)
      this.contractForm.contractAttribute = String(row.contractAttribute)
      console.log(this.contractForm)
    },
    // 修改并上传
    handleEditok() {
      console.log(this.contractForm)
      this.$refs.contractForm.validate((valid) => {
        if (valid) {
          const stringid = []
          for (const i in this.remindpersonname) {
            stringid.push(this.remindpersonname[i].personId)
          }
          console.log(stringid)
          this.contractForm.expiredRemindPersonId = stringid.join(',')
          console.log('上传', this.contractForm.remindpersonid)
          updatecontract(this.contractForm).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: 'successful',
                message: 'save successful',
                type: 'success',
                offset: 100
              })
              this.$refs.contractForm.resetFields()
              this.editVisible = false
              this.getlist()
            } else {
              this.$notify.error({
                title: 'wrong',
                message: '出现错误',
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
          console.log('列表出错')
        }
      })
    },
    // 单条删除
    handleDelete(row) {
      this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
        confirmButtonText: this.$t('prompt.qd'),
        cancelButtonText: this.$t('prompt.qx'),
        type: 'warning'
      }).then(() => {
        deleteempcontract(row.id, this.$store.getters.userId).then(res => {
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
    // 批量删除
    handleSelectionChange(val) {
      console.log(val)
      this.moredelete = val
    },
    handleCommand(command) {
      if (command === 'delete') {
        const ids = this.moredelete.map(item => item.id).join()
        this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
          confirmButtonText: this.$t('prompt.qd'),
          cancelButtonText: this.$t('prompt.qx'),
          type: 'warning'
        }).then(() => {
          deleteempcontract(ids, this.$store.getters.userId).then(res => {
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
    },
    // 控制合同到期提醒人选择窗口
    controlremin() {
      this.createcontrol = true
    },
    // 合同到期提醒人回显
    createname(val) {
      this.remindpersonname = []
      console.log('到期提醒', val)
      // const remindid = []
      for (const i in val) {
        const remindpersonname = {}
        remindpersonname.personName = val[i].personName
        remindpersonname.personId = val[i].id
        this.remindpersonname.push(remindpersonname)
      }
      // this.contractForm.remindpersonid = remindid.join(',')
      console.log('数据', this.remindpersonname, this.contractForm.remindpersonid)
      // this.remindpersonid = val.personName
      // this.contractForm.remindpersonid = val.id
    },
    handleClose(tag) {
      this.remindpersonname.splice(this.remindpersonname.indexOf(tag), 1)
      console.log('this.remindpersonname', this.remindpersonname)
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

<style scoped>
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
  .container >>> .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    margin-left: -10px;
  }
  .container >>> .el-form-item__label{
    text-align: left;
  }
  .container >>> .el-form-item__label{
    color: #60626696;
  }
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
  .el-col-12{
    width: 49%;
  }
</style>

