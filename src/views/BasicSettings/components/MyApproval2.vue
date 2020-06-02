<template>
  <el-dialog :visible.sync="repositoryVisible" :repositorycontrol="repositorycontrol" :close-on-press-escape="false" top="10px" title="选择单据" append-to-body @close="$emit('update:repositorycontrol', false)">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <el-input v-model="getemplist.process_name" :placeholder="$t('BasicSettings.process_name')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <!-- <el-select v-model="getemplist.is_effective" :value="getemplist.is_effective" placeholder="请选择状态" size="small" class="filter-item" clearable>
        <el-option label="active" value="1"/>
        <el-option label="dead" value="2"/>
      </el-select> -->
      <el-select v-model="getemplist.type" :value="getemplist.type" size="small" filterable placeholder="请选择单据类型" style="width: 150px" class="filter-item" clearable>
        <el-option v-for="(item, index) in categorys" :key="index" :value="item.id" :label="item.categoryName"/>
      </el-select>
      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['1-39-45-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;float: right" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </div>
    <!-- 列表开始 -->
    <el-table
      v-loading="listLoading"
      ref="table"
      :key="tableKey"
      :data="list"
      :height="tableHeight"
      :row-key="getRowKeys"
      size="small"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange">
      <el-table-column
        :reserve-selection="true"
        type="selection"
        width="55"/>
      <el-table-column :label="$t('BasicSettings.id2')" :resizable="false" fixed="left" prop="id" align="center" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('BasicSettings.process_name')" :resizable="false" fixed="left" prop="processName" align="center" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.processName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('BasicSettings.isEffective')" :resizable="false" prop="isEffective" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.isEffective | genderFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('BasicSettings.type3')" :resizable="false" align="center" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.typeName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('BasicSettings.isMessage')" :resizable="false" prop="isMessage" align="center" width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.isMessage | isMessageFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('UnitGroup.createPersonName')" :resizable="false" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.createPersonName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('UnitGroup.createDate')" :resizable="false" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 列表结束 -->
    <el-button v-waves class="filter-item" type="success" style="width: 100px;float: left;margin-top: 10px" @click="handleConfirm">{{ $t('Hmodule.sure') }}</el-button>
    <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
  </el-dialog>
</template>

<script>
import { searchProcess, deleteProcess, searchDetail, searchcategory, updateeapproval, updateEffective } from '@/api/BasicSettings'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
// eslint-disable-next-line no-unused-vars
var _that
export default {
  directives: { waves, permission, permission2 },
  components: { Pagination },
  filters: {
    genderFilter(status) {
      const statusMap = {
        1: '发布',
        2: '停用'
      }
      return statusMap[status]
    },
    isMessageFilter(status) {
      const statusMap = {
        1: _that.$t('updates.yes'),
        2: _that.$t('updates.no')
      }
      return statusMap[status]
    }
  },
  props: {
    repositorycontrol: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      categorys: [],
      tableHeight: 200,

      getRowKeys(row) {
        return row.id
      },
      select_orderId: [],
      select_order_number: [],
      // 批量操作
      moreaction: '',
      // 转化数据
      choosedata: '',
      // 仓库弹窗控制
      repositoryVisible: this.repositorycontrol,
      // 类型列表
      types: [],
      // 国家列表
      nations: [],
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
      // 仓库列表查询加展示参数
      getemplist: {
        is_effective: 1,
        pagenum: 1,
        pagesize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds
      },
      // 部门列表
      depts: [],
      // 区域级联数据转化
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      // 区域数据
      regions: [],
      getemplistregions: [],
      getemplistregions0: []
    }
  },
  watch: {
    repositorycontrol() {
      this.repositoryVisible = this.repositorycontrol
      this.getlist()
      setTimeout(() => {
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 180
      }, 100)
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 批量操作
    handleSelectionChange(rows) {
      this.moreaction = rows
      this.select_order_number = this.moreaction.length
      this.select_orderId = []
      if (rows) {
        rows.forEach(row => {
          if (row) {
            this.select_orderId.push(row.id)
          }
        })
      }
    },
    getlist() {
      // 审批流程列表数据
      this.listLoading = true
      searchProcess(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      // 单据编号类型数据
      searchcategory().then(res => {
        if (res.data.ret === 200) {
          this.categorys = res.data.data.content
        }
      })
    },
    // 搜索
    handleFilter() {
      searchProcess(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
      })
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/BasicSettings/NewApprovalProcess')
      this.repositoryVisible = false
    },
    // 转化数据方法
    tranKTree(arr) {
      if (!arr || !arr.length) return
      return arr.map(item => ({
        id: item.id,
        regionName: item.regionName,
        regionListVos: this.tranKTree(item.regionListVos)
      }))
    },
    // 确认添加数据
    handleConfirm() {
      this.$emit('repositoryname', this.moreaction)
      this.$refs.table.clearSelection()
      this.repositoryVisible = false
    },
    // 选择仓库数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    }
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
