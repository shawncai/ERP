<template>
  <el-dialog :visible.sync="employeeVisible" :outsourcecontrol="outsourcecontrol" :close-on-press-escape="false" width="60%" top="10px" title="选择委外入库单" append-to-body @close="$emit('update:outsourcecontrol', false)">
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <el-input v-model="getemplist.title" :placeholder="$t('Stockenter.title')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.enterNumber" :placeholder="$t('Stockenter.enterNumber')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="getemplist.enterDeptId" :placeholder="$t('updates.rkbm')" size="small" class="filter-item" clearable >
        <el-option
          v-for="(item, index) in depts"
          :key="index"
          :value="item.id"
          :label="item.deptName"/>
      </el-select>
      <!-- <el-input v-model="getemplist.outFactoryName" :placeholder="$t('OutSource.outFactoryName')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/> -->

      <!-- 更多搜索条件下拉栏 -->
      <el-popover
        v-model="visible2"
        placement="bottom"
        width="500"
        size="small"
        trigger="click">
        <el-input v-model="enterPersonId" :placeholder="$t('Stockenter.enterPersonId')" size="small" class="filter-item" clearable style="width: 40%;float: left;margin-left: 20px" @keyup.enter.native="handleFilter" @focus="handlechooseAccept" @clear="restFilter2"/>
        <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
        <el-input v-model="enterRepositoryId" :placeholder="$t('Stockenter.enterRepositoryId')" size="small" class="filter-item" clearable style="width: 40%;float: right;margin-right: 20px" @keyup.enter.native="handleFilter" @focus="handlechooseRep" @clear="restFilter4"/>
        <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
        <!--        <el-input v-model="acceptPersonId" :placeholder="$t('Stockenter.acceptPersonId')" class="filter-item" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px" @keyup.enter.native="handleFilter" @focus="handlechoose" @clear="restFilter3"/>-->
        <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
        <!--        <el-input v-model="deliveryPersonId" :placeholder="$t('Stockenter.deliveryPersonId')" class="filter-item" clearable style="width: 40%;float: right;margin-right: 20px;margin-top: 20px" @keyup.enter.native="handleFilter" @focus="handlechooseDelivery" @clear="restFilter"/>-->
        <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="-"
          unlink-panels
          size="small"
          start-placeholder="Start"
          end-placeholder="End"
          value-format="yyyy-MM-dd"
          style="margin-top: 20px;margin-left: 20px;width: 434px"/>
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button v-waves class="filter-item" size="small" type="primary" style="float: right" @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" size="small" type="primary" class="filter-item" style="width: 140px" @click="visible2 = !visible2"><svg-icon icon-class="shaixuan" style="margin-right: 6px"/>{{ $t('public.filter') }}</el-button>
      </el-popover>

      <el-button v-waves class="filter-item" size="small" type="primary" icon="el-icon-search" style="width: 86px;margin-top:10px" @click="handleFilter">{{ $t('public.search') }}</el-button>

      <el-button v-waves icon="el-icon-plus" size="small" class="filter-item" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :key="tableKey"
        :data="list"
        :height="tableHeight"
        size="small"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @current-change="handleCurrentChange">
        <el-table-column :label="$t('Stockenter.id')" :resizable="false" fixed="left" align="center" min-width="80">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.enterNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.title')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('OutSource.outFactoryName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.outFactoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.deliveryPersonId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.deliveryPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.acceptPersonId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.acceptPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.enterDeptId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.enterDeptName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.endPersonName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.enterPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.endDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.endDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.summary')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.summary }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-button v-waves class="filter-item" type="success" style="width: 100px;float: left;margin-top: 10px" @click="handleConfirm">{{ $t('Hmodule.sure') }}</el-button>
      <!--修改结束=================================================-->
    </el-card>
  </el-dialog>
</template>

<script>
import { outsourceEnterlist } from '@/api/OutsourceEnter'
import MyOther from '../../OutSourceEnter/components/MyOther'
import MyRepository from '../../OutSourceEnter/components/MyRepository'
import MyAccept from '../../OutSourceEnter/components/MyAccept'
import MyCreate from '../../OutSourceEnter/components/MyCreate'
import MyDelivery from '../../OutSourceEnter/components/MyDelivery'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
var _that
export default {
  directives: { waves },
  components: { Pagination, MyOther, MyRepository, MyAccept, MyCreate, MyDelivery },
  props: {
    outsourcecontrol: {
      type: Boolean,
      default: false
    },
    factoryname: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      tableHeight: 200,

      // 选择框控制
      employeeVisible: this.factorycontrol,
      // 详情组件数据
      detailvisible: false,
      // 搜索数据----------------------
      // 更多搜索条件问题
      visible2: false,
      // 部门数据
      depts: [],
      // 交货人回显
      deliveryPersonId: '',
      // 验收人回显
      acceptPersonId: '',
      // 入库仓库回显
      enterRepositoryId: '',
      // 入库人回显
      enterPersonId: '',
      // 入库人控制框
      accetpcontrol: false,
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 交货人控制框
      deliverycontrol: false,
      // 控制验收人选择窗口
      createcontrol: false,
      // 开始时间到结束时间
      date: [],
      // 入库列表传参数据
      getemplist: {
        pageNum: 1,
        pageSize: 10,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds,
        outFactoryName: this.factoryname
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
    outsourcecontrol() {
      this.employeeVisible = this.outsourcecontrol
      this.getlist()

      setTimeout(() => {
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 180
      }, 100)
    },
    factoryname() {
      console.log('this.factoryname', this.factoryname)
      this.getemplist.outFactoryName = this.factoryname
      this.getlist()
    }
  },
  created() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getlist() {
      // 入库列表数据
      this.listLoading = true
      outsourceEnterlist(this.getemplist).then(res => {
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
      this.deliveryPersonId = ''
      this.getemplist.deliveryPersonId = ''
    },
    restFilter2() {
      this.enterPersonId = ''
      this.getemplist.enterPersonId = ''
    },
    restFilter3() {
      this.acceptPersonId = ''
      this.getemplist.acceptPersonId = ''
    },
    restFilter4() {
      this.enterRepositoryId = ''
      this.getemplist.enterRepositoryId = ''
    },
    // 交货人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.deliveryPersonId = val.personName
      this.getemplist.deliveryPersonId = val.id
    },
    // 验收人输入框focus事件触发
    handlechoose() {
      this.createcontrol = true
    },
    // 验收人返回数据
    createname(val) {
      console.log(val)
      this.acceptPersonId = val.personName
      this.getemplist.acceptPersonId = val.id
    },
    // 入库人focus事件触发
    handlechooseAccept() {
      this.accetpcontrol = true
    },
    // 入库人列表返回数据
    acceptName(val) {
      this.enterPersonId = val.personName
      this.getemplist.enterPersonId = val.id
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.enterRepositoryId = val.repositoryName
      this.getemplist.enterRepositoryId = val.id
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
      outsourceEnterlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
    },
    // 新增数据
    handleAdd() {
      this.employeeVisible = false
      this.$router.push('/OutFactory/AddOutFactory')
    },
    // 清空历史搜索数据
    restemplist() {
      this.getemplist = {
        pageNum: 1,
        pageSize: 10
      }
    },
    // 选择数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    handleConfirm() {
      this.employeeVisible = false
      this.$emit('outSource', this.choosedata)
    }
  }
}
</script>

<style scoped>
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
