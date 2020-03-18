<template>
  <el-dialog :visible.sync="employeeVisible" :control="control" :close-on-press-escape="false" :title="$t('Hmodule.xzggzx')" top="10px" append-to-body width="900px" @close="$emit('update:control', false)">
    <el-card class="box-card" style="margin-top: 15px;height: 60px">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" style="margin-top: -9px">
          <el-col :span="4">
            <el-form-item>
              <el-input v-model="getemplist.code" :placeholder="$t('ProcessFile.code')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left: 16px">
            <el-form-item>
              <el-input v-model="getemplist.workCenterName" :placeholder="$t('ProcessFile.workCenterName')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left: 16px">
            <el-form-item>
              <el-select v-model="personalForm.deptId" class="filter-item" clearable >
                <el-option
                  v-for="(item, index) in depts"
                  :key="index"
                  :value="item.id"
                  :label="item.deptName"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left: 16px">
            <!-- 搜索按钮 -->
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
          </el-col>
          <el-col :span="4" style="margin-left: 16px">
            <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @current-change="handleCurrentChange">
        <el-table-column :label="$t('ProcessFile.code')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProcessFile.workCenterName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.workCenterName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProcessFile.isKey')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.isKey | isKeyFliter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProcessFile.deptId')" :resizable="false" prop="ProcessFileDetails" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.deptName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProcessFile.stat')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.stat | statliter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProcessFile.createrName')" :resizable="false" prop="ProcessFileDetails" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createrName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProcessFile.createTime')" :resizable="false" prop="ProcessFileDetails" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <!--修改结束=================================================-->
      <el-button v-waves class="filter-item" type="success" style="width: 100px;float: left;margin-bottom: 10px" @click="handleConfirm">{{ $t('Hmodule.sure') }}</el-button>
    </el-card>
  </el-dialog>
</template>

<script>
import { searchworkCenter } from '@/api/ProcessFile'
import { getdeptlist } from '@/api/BasicSettings'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves'
var _that
export default {
  directives: { waves },
  components: { Pagination },
  filters: {
    isKeyFliter(status) {
      const statusMap = {
        1: _that.$t('updates.yes'),
        2: _that.$t('updates.no')
      }
      return statusMap[status]
    },
    statliter(status) {
      const statusMap = {
        1: '启用',
        2: '未启用'
      }
      return statusMap[status]
    }
  },
  props: {
    control: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 员工选择框控制
      employeeVisible: this.control,
      // 部门数据
      depts: [],
      // 转化数据
      choosedata: '',
      // / 弹窗选择
      // 单选表格样式
      currentRow: null,
      // 表格数据
      list: [],
      // 表格数据条数
      total: 0,
      // 表格识别
      tableKey: 0,
      // 加载表格
      listLoading: true,
      // 工作中心列表查询加展示参数
      getemplist: {
        pageNum: 1,
        pageSize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds
      },
      // 传给组件的数据
      personalForm: {},
      // 控制组件数据
      editVisible: false,
      // 开始时间到结束时间
      date: []
    }
  },
  watch: {
    control() {
      this.employeeVisible = this.control
      this.getlist()
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 工作中心列表数据
    getlist() {
      this.listLoading = true
      searchworkCenter(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      // 部门数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      searchworkCenter(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
      })
    },
    // 新增数据
    handleAdd() {
      this.employeeVisible = false
      this.$router.push('/ProcessFile/AddWorkCenter')
    },
    // 选择员工数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    handleConfirm() {
      this.employeeVisible = false
      this.$emit('center', this.choosedata)
    }
    // 仓库管理员选择结束
  }
}
</script>

<style scoped>
  .ERP-container {
    margin: 50px 30px;
  }
  .filter-item{
    width: 140px;
    margin-left: 20px;
  }
  .form-name{
    font-size: 18px;
    color: #373e4f;
    margin-bottom: -20px;
    margin-top: 30px;
  }
  .container{
    margin-top: 2%;
    border: 1px solid #eceff6;
  }
</style>
