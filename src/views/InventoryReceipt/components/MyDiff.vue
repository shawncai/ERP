<template>
  <el-dialog :visible.sync="employeeVisible" :personaldata="personalForm" :close-on-press-escape="false" top="10px" title="选择差异单" append-to-body width="1100px" @close="$emit('update:diffcontrol', false)">
    <el-card class="box-card" style="margin-top: 15px;height: 60px;padding-left:0 " shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" style="margin-top: -9px">
          <el-input v-model="getemplist.title" :placeholder="$t('InventoryCount.title')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
          <!-- <el-input v-model="getemplist.sourceNumber" :placeholder="$t('InventoryCount.sourceNumber')" class="filter-item" clearable @keyup.enter.native="handleFilter"/> -->
          <el-input v-model="getemplist.reportNumber" placeholder="差异单编号" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

          <!-- <el-input v-model="handlePersonId" :placeholder="$t('InventoryCount.handlePersonId')" size="small" class="filter-item" clearable @clear="restFilter" @keyup.enter.native="handleFilter" @focus="handlechoose"/>
          <my-create :createcontrol.sync="createcontrol" @createname="createname"/> -->

          <!--更多搜索条件-->
          <el-popover
            v-model="visible2"
            placement="bottom"
            width="500"
            trigger="click">
            <!-- <el-input v-model="getemplist.productCode" :placeholder="$t('saleBillList.productCode')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechoosepro" @clear="restFilter3"/>
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
            <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/> -->
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
        <el-table-column :label="$t('Storagemovediff.id')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span >{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Storagemovediff.title')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('StockOut.code')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.outNumber }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('Storagemovediff.moveInRepository')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.inRepositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Storagemovediff.moveOutRepository')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.outRepositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Storagemovediff.requestArrivalDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ timestampToTime(scope.row.arrivalDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Storagemovediff.storageMoveDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ timestampToTime(scope.row.moveDate) }}</span>
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
import { searchstoragemovediff, deletestoragemovediff, editestoragemovediff2, returnInventory } from '@/api/Storagemovediff'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数

var _that
export default {
  directives: { waves },
  components: { Pagination },
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
    diffcontrol: {
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
      tableHeight: 200,
      // 接受数据
      //   querydata: this.personaldata,
      // 选择框控制
      employeeVisible: this.diffcontrol,
      returnLoading: false,
      // 审核传参
      reviewParms: {
        id: '',
        judgePersonId: '',
        judgeStat: ''
      },
      // 详情组件数据
      detailvisible: false,
      // 搜索数据----------------------
      // 更多搜索条件问题
      visible2: false,
      // 出库人回显
      outPersonId: '',
      // 出库人控制框
      createcontrol: false,
      // 开始时间到结束时间
      date: [],
      // 出库列表传参数据
      getemplist: {
        pageNum: 1,
        pageSize: 10,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds
      },
      // 搜索结束 ----------------------
      // 列表操作 -------------------------
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
      // 修改传给组件的数据
      personalForm: {},
      // 修改控制修改组件数据
      editVisible: false
    }
  },
  watch: {
    diffcontrol() {
      this.employeeVisible = this.diffcontrol
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
    timestampToTime(timestamp) {
      var date = new Date(timestamp)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      // var h = date.getHours() + ':'
      // var m = date.getMinutes() + ':'
      // var s = date.getSeconds()
      return Y + M + D
    },
    getlist() {
      // 出库列表数据
      this.listLoading = true
      console.log(this.getemplist)
      searchstoragemovediff(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          this.listLoading = false
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 清空搜索条件
    restFilter() {
      this.outPersonId = ''
      this.getemplist.outPersonId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      if (this.date === null || this.date === '') {
        this.getemplist.beginTime = null
        this.getemplist.endTime = null
      } else {
        this.getemplist.beginTime = this.date[0]
        this.getemplist.endTime = this.date[1]
      }
      searchstoragemovediff(this.getemplist).then(res => {
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
      this.$router.push('/Storagemovediff/AddStoragemovediff')
    },
    // 选择主生产计划数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    handleConfirm() {
      this.employeeVisible = false
      this.$emit('diffData', this.choosedata)
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
