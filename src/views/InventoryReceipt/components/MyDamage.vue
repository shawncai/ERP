<template>
  <el-dialog :visible.sync="employeeVisible" :saleoutcontrol="saleoutcontrol" :personaldata="personalForm" :close-on-press-escape="false" top="10px" title="选择报损单" append-to-body width="1100px" @close="$emit('update:saleoutcontrol', false)">
    <el-card class="box-card" style="margin-top: 15px;height: 60px;padding-left:0 " shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" style="margin-top: -9px">
          <el-input v-model="getemplist.title" :placeholder="$t('Inventorydamaged.title')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
          <el-input v-model="getemplist.damagedNumber" :placeholder="$t('Inventorydamaged.damagedNumber')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
          <el-select v-model="getemplist.damagedDeptId" :placeholder="$t('Inventorydamaged.damagedDeptId')" size="small" clearable class="filter-item">
            <el-option
              v-for="(item, index) in depts"
              :key="index"
              :value="item.id"
              :label="item.deptName"/>
          </el-select>
          <!--更多搜索条件-->
          <el-popover
            v-model="visible2"
            placement="bottom"
            width="500"
            trigger="click">
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="-"
              unlink-panels
              size="small"
              start-placeholder="Start"
              end-placeholder="End"
              value-format="yyyy-MM-dd"
              style="margin-top: 20px;margin-left: 20px"/>
            <el-input v-model="damagedRepositoryId" size="small" placeholder="请选择报损仓库" clearable class="filter-item" style="margin-top: 20px;margin-left: 20px" @clear="restFilter" @focus="handlechooseRep"/>
            <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
              <el-button v-waves class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>
            </div>
            <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
          </el-popover>

          <!-- 搜索按钮 -->
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

          <!-- <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button> -->

        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :height="tableHeight"
        :key="tableKey"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @current-change="handleCurrentChange">
        <el-table-column :label="$t('Inventorydamaged.id')" :resizable="false" fixed="left" prop="id" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.damagedNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Inventorydamaged.title')" :resizable="false" fixed="left" prop="title" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Inventorydamaged.handlePersonId')" :resizable="false" prop="handlePersonName" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.handlePersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Inventorydamaged.damagedDeptId')" :resizable="false" prop="damagedDeptName" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.damagedDeptName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Inventorydamaged.damagedRepositoryId')" :resizable="false" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.damagedRepositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Inventorydamaged.beginTime')" :resizable="false" prop="beginTime" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.beginTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Inventorydamaged.endTime')" :resizable="false" prop="endTime" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.endTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Inventorydamaged.damagedReason')" :resizable="false" prop="countType" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.damagedReason }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />

      <!--修改开始=================================================-->
      <el-button v-waves class="filter-item" type="success" style="width: 100px;float: left;margin-bottom: 10px" @click="handleConfirm">{{ $t('Hmodule.sure') }}</el-button>
    </el-card>
  </el-dialog>
</template>

<script>
import { deletedamaged, damagedlist, updatedamaged2 } from '@/api/Inventorydamaged'
import { getdeptlist } from '@/api/BasicSettings'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyRepository from '../../Inventorydamaged/components/MyRepository'

var _that
export default {
  directives: { waves },
  components: { Pagination, MyRepository },
  filters: {
    statFilter(status) {
      const statusMap = {
        1: '启用',
        2: '停用'
      }
      return statusMap[status]
    }
  },
  props: {
    saleoutcontrol: {
      type: Boolean,
      default: false
    }
    // personaldata: {
    //   type: Object,
    //   default: null
    // }
  },
  data() {
    return {
      // 接受数据
    //   querydata: this.personaldata,
      // 选择框控制
      employeeVisible: this.saleoutcontrol,
      tableHeight: 200,
      // 更多搜索条件问题
      visible2: false,
      // 审核传参
      reviewParms: {
        id: '',
        judgePersonId: '',
        judgeStat: ''
      },
      // 详情组件数据
      detailvisible: false,
      // 部门数据
      depts: [],
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 报损仓库
      damagedRepositoryId: '',
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
      // 仓库报损单列表查询加展示参数
      getemplist: {
        pageNum: 1,
        pageSize: 10,
        judgeStat: 2,
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
    saleoutcontrol() {
      this.employeeVisible = this.saleoutcontrol
      this.getlist()
      console.log(this.querydata)

      setTimeout(() => {
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 180
      }, 100)
    },
    personaldata() {
      console.log(this.personaldata)
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getlist() {
      // 报损单列表数据
      this.listLoading = true
      damagedlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.damagedRepositoryId = val.repositoryName
      this.getemplist.damagedRepositoryId = val.id
    },
    // 清空搜索条件
    restFilter() {
      this.damagedRepositoryId = ''
      this.getemplist.damagedRepositoryId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      if (this.date !== null && this.date !== '') {
        this.getemplist.beginTime = this.date[0]
        this.getemplist.endTime = this.date[1]
      }
      damagedlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
          // this.restFilter()
        }
      })
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/Inventorydamaged/AddInventorydamaged')
    },
    // 选择主生产计划数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    handleConfirm() {
      this.employeeVisible = false
      this.$emit('damageData', this.choosedata)
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
