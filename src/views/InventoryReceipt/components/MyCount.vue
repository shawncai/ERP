<template>
  <el-dialog :visible.sync="employeeVisible" :personaldata="personalForm" :close-on-press-escape="false" top="10px" title="选择盘点单" append-to-body width="1100px" @close="$emit('update:countcontrol', false)">
    <el-card class="box-card" style="margin-top: 15px;height: 60px;padding-left:0 " shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" style="margin-top: -9px">
          <el-input v-model="getemplist.title" :placeholder="$t('InventoryCount.title')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
          <!-- <el-input v-model="getemplist.sourceNumber" :placeholder="$t('InventoryCount.sourceNumber')" class="filter-item" clearable @keyup.enter.native="handleFilter"/> -->
          <el-input v-model="getemplist.countNumber" :placeholder="$t('InventoryCount.countNumber')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
          <el-input v-model="handlePersonId" :placeholder="$t('InventoryCount.handlePersonId')" size="small" class="filter-item" clearable @clear="restFilter" @keyup.enter.native="handleFilter" @focus="handlechoose"/>
          <my-create :createcontrol.sync="createcontrol" @createname="createname"/>

          <!--更多搜索条件-->
          <el-popover
            v-model="visible2"
            placement="bottom"
            width="500"
            trigger="click">
            <el-input v-model="getemplist.productCode" :placeholder="$t('saleBillList.productCode')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechoosepro" @clear="restFilter3"/>
            <my-detail :control.sync="control" @product="productdetail"/>
            <el-input v-model="getemplist.productName" :placeholder="$t('saleBillList.productName')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter" />

            <el-select v-model="getemplist.countDeptId" size="small" placeholder="请选择盘点部门" clearable class="filter-item">
              <el-option
                v-for="(item, index) in depts"
                :key="index"
                :value="item.id"
                :label="item.deptName"/>
            </el-select>
            <el-input v-model="countRepositoryId" size="small" placeholder="请选择盘点仓库" class="filter-item" clearable @clear="restFilter2" @keyup.enter.native="handleFilter" @focus="handlechooseRep"/>
            <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="-"
              unlink-panels
              start-placeholder="Start"
              end-placeholder="End"
              size="small"
              value-format="yyyy-MM-dd"
              style="margin-left: 10px"/>
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
        <el-table-column :label="$t('InventoryCount.id')" :resizable="false" fixed="left" prop="id" align="center" width="150">
          <template slot-scope="scope">
            <span >{{ scope.row.countNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('InventoryCount.title')" :resizable="false" fixed="left" prop="title" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('InventoryCount.handlePersonId')" :resizable="false" prop="handlePersonId" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.handlePersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('InventoryCount.countDeptId')" :resizable="false" prop="countDeptId" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.countDeptName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('InventoryCount.countRepositoryId')" :resizable="false" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.countRepositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('InventoryCount.beginTime')" :resizable="false" prop="beginTime" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.beginTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('InventoryCount.endTime')" :resizable="false" prop="endTime" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.endTime }}</span>
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
import { countlist, deletecount, updatecount2 } from '@/api/InventoryCount'
import { getdeptlist } from '@/api/BasicSettings'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyDetail from '../../InventoryCount/components/MyDetail2'
import MyCreate from '../../LogisticsCar/components/MyCreate'
import MyRepository from '../../Inventorydamaged/components/MyRepository'

var _that
export default {
  directives: { waves },
  components: { Pagination, MyRepository, MyDetail, MyCreate },
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
    countcontrol: {
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
      employeeVisible: this.countcontrol,
      tableHeight: 200,
      control: false,
      // 审核传参
      reviewParms: {
        id: '',
        judgePersonId: '',
        judgeStat: ''
      },
      // 详情组件数据
      detailvisible: false,
      // 盘点仓库回显
      countRepositoryId: '',
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 部门数据
      depts: [],
      // 控制经办人选择窗口
      createcontrol: false,
      // 经办人回显
      handlePersonId: '',
      // 更多搜索条件问题
      visible2: false,
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
      // 采购入库单列表查询加展示参数
      getemplist: {
        pagenum: 1,
        pagesize: 10,
        judgeStat: 2,
        regionIds: this.$store.getters.regionIds,
        repositoryId: this.$store.getters.repositoryId
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
    countcontrol() {
      this.employeeVisible = this.countcontrol
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
    restFilter3() {
      this.getemplist.productCode = ''
    },
    handlechoosepro() {
      this.control = true
    },
    productdetail(val) {
      console.log('val', val)
      this.getemplist.productCode = val
    },
    getlist() {
      // 盘点单列表数据
      this.listLoading = true
      countlist(this.getemplist).then(res => {
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
    // 清空搜索条件
    restFilter() {
      this.handlePersonId = ''
      this.getemplist.handlePersonId = ''
    },
    restFilter2() {
      this.countRepositoryId = ''
      this.getemplist.countRepositoryId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      if (this.date !== null && this.date !== '') {
        this.getemplist.beginTime = this.date[0]
        this.getemplist.endTime = this.date[1]
      }
      countlist(this.getemplist).then(res => {
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
    // 经办人输入框focus事件触发
    handlechoose() {
      this.createcontrol = true
    },
    // 员工列表返回经办人数据
    createname(val) {
      console.log(val)
      this.handlePersonId = val.personName
      this.getemplist.handlePersonId = val.id
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.countRepositoryId = val.repositoryName
      this.getemplist.countRepositoryId = val.id
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/InventoryCount/AddInventoryCount')
    },
    // 选择主生产计划数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    handleConfirm() {
      this.employeeVisible = false
      this.$emit('countData', this.choosedata)
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
