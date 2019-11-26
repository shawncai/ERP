<template>
  <el-dialog :visible.sync="employeeVisible" :agentcollectcontrol="agentcollectcontrol" :close-on-press-escape="false" top="10px" title="选择经销商" append-to-body width="1100px" @close="$emit('update:agentcollectcontrol', false)">
    <el-card class="box-card" style="margin-top: 15px;height: 60px;padding-left:0 " shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" style="margin-top: -9px">
          <el-col :span="4">
            <el-form-item>
              <el-input v-model="getemplist.customerName" :placeholder="$t('AgentCollect.agentName')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 5px">
            <el-form-item>
              <el-input v-model="saleRepositoryId" placeholder="销售门店" @clear="restFilter" @focus="handlechooseRep"/>
            </el-form-item>
            <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
          </el-col>
          <!--更多搜索条件-->
          <!--<el-col :span="3" style="margin-left: 30px">-->
          <!--<el-popover-->
          <!--v-model="visible2"-->
          <!--placement="bottom"-->
          <!--width="500"-->
          <!--trigger="click">-->
          <!--<el-select v-model="getemplist.receiptStat" :value="getemplist.receiptStat" :placeholder="$t('updates.djzt')" clearable style="width: 40%;float: left;margin-left: 20px">-->
          <!--<el-option value="1" :label="$t('updates.zd')"/>-->
          <!--<el-option value="2" :label="$t('updates.zx')"/>-->
          <!--<el-option value="3" :label="$t('updates.jd')"/>-->
          <!--</el-select>-->
          <!--<el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" :placeholder="$t('updates.spzt')" clearable style="width: 40%;float: right;margin-right: 20px">-->
          <!--<el-option value="0" :label="$t('updates.wsh')"/>-->
          <!--<el-option value="1" :label="$t('updates.shz')"/>-->
          <!--<el-option value="2" :label="$t('updates.shtg')"/>-->
          <!--<el-option value="3" :label="$t('updates.shptg')"/>-->
          <!--</el-select>-->
          <!--&lt;!&ndash;<el-date-picker&ndash;&gt;-->
          <!--&lt;!&ndash;v-model="date"&ndash;&gt;-->
          <!--&lt;!&ndash;type="daterange"&ndash;&gt;-->
          <!--&lt;!&ndash;range-separator="-"&ndash;&gt;-->
          <!--&lt;!&ndash;unlink-panels&ndash;&gt;-->
          <!--&lt;!&ndash;start-placeholder="销售日期"&ndash;&gt;-->
          <!--&lt;!&ndash;end-placeholder="销售日期"&ndash;&gt;-->
          <!--&lt;!&ndash;value-format="yyyy-MM-dd"&ndash;&gt;-->
          <!--&lt;!&ndash;style="margin-top: 20px;margin-left: 20px"/>&ndash;&gt;-->
          <!--<div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">-->
          <!--<el-button v-waves class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>-->
          <!--</div>-->
          <!--<el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>-->
          <!--</el-popover>-->
          <!--</el-col>-->
          <el-col :span="3" style="margin-left: 20px">
            <!-- 搜索按钮 -->
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
          </el-col>
          <!--<el-col :span="3">-->
          <!--<el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>-->
          <!--</el-col>-->
        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
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
        <el-table-column :label="$t('public.id')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('AgentCollect.agentName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.agentName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('AgentCollect.shouldMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.shouldMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('AgentCollect.discountMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.discountMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('AgentCollect.returnMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.returnMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('AgentCollect.collectedMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.collectedMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('AgentCollect.uncollectedMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.uncollectedMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('AgentCollect.stat')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.stat }}</span>
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
import { agentCollectList } from '@/api/AgentCollect'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import MyEmp from './MyEmp'
import MyCustomer from './MyCustomer'
import MyAgent from './MyAgent'
import MyRepository from '../../StockRetreat/components/MyRepository'
var _that
export default {
  directives: { waves },
  components: { MyRepository, MyEmp, MyCustomer, MyAgent, Pagination },
  filters: {
    judgeStatFilter(status) {
      const statusMap = {
        0: _that.$t('updates.wsh'),
        1: _that.$t('updates.shz'),
        2: _that.$t('Hmodule.shtg'),
        3: _that.$t('updates.shbtg')
      }
      return statusMap[status]
    },
    receiptStatFilter(status) {
      const statusMap = {
        1: _that.$t('updates.zd'),
        2: _that.$t('updates.zx'),
        3: _that.$t('updates.jd')
      }
      return statusMap[status]
    },
    stockTypeFilter(status) {
      const statusMap = {
        1: '采购1'
      }
      return statusMap[status]
    },
    sendTypeFilter(status) {
      const statusMap = {
        1: '已发货',
        2: '未发货'
      }
      return statusMap[status]
    }
  },
  props: {
    agentcollectcontrol: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 选择框控制
      employeeVisible: this.agentcollectcontrol,
      // 销售员回显
      salePersonId: '',
      // 控制销售
      stockControl: false,
      // 回显客户
      customerName: '',
      // 控制客户
      customercontrol: false,
      agentcontrol: false,
      // 类别获取参数
      typeparms: {
        pagenum: 1,
        pagesize: 99999
      },
      // 采购类别数据
      types: [],
      // 申请部门数据
      depts: [],
      // 审核传参
      reviewParms: {
        id: '',
        judgePersonId: '',
        judgeStat: ''
      },
      // 回显销售门店
      saleRepositoryId: '',
      // 控制销售门店
      repositorycontrol: false,
      // 详情组件数据
      detailvisible: false,
      // 更多搜索条件问题
      visible2: false,
      // 供应商回显
      supplierId: '',
      // 供应商控制框
      empcontrol: false,
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
      // 采购申请查询加展示参数
      getemplist: {
        pageNum: 1,
        pageSize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds,
        time: null
      },
      // 传给组件的数据
      personalForm: {},
      // 修改控制组件数据
      editVisible: false,
      // 开始时间到结束时间
      date: []
    }
  },
  watch: {
    agentcollectcontrol() {
      this.employeeVisible = this.agentcollectcontrol
      this.getlist()
    }
  },
  methods: {
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      this.saleRepositoryId = val.repositoryName
      this.getemplist.saleRepositoryId = val.id
    },
    getamouthDate() {

    },
    // 销售人员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 销售员回显
    stockName(val) {
      this.salePersonId = val.personName
      this.personalForm.salePersonId = val.id
    },
    // 不让勾选
    selectInit(row, index) {
      if (row.judgeStat !== 0) {
        return false
      } else {
        return true
      }
    },
    // 选择客户类型时清理客户名称
    clearCustomer() {
      this.getemplist.customerId = ''
      this.customerName = ''
    },
    // 选择客户focus
    chooseCustomer() {
      if (this.getemplist.customerType === '1') {
        this.agentcontrol = true
      } else if (this.getemplist.customerType === '2') {
        this.customercontrol = true
      }
    },
    customerdata(val) {
      this.getemplist.customerId = val.id
      this.customerName = val.customerName
    },
    agentdata(val) {
      this.getemplist.customerId = val.id
      this.customerName = val.agentName
    },
    getlist() {
      // 物料需求计划列表数据
      this.listLoading = true
      agentCollectList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 清空搜索条件
    restFilter() {
      this.saleRepositoryId = ''
      this.getemplist.saleRepositoryId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      agentCollectList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
    },
    // 选择主生产计划数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    handleConfirm() {
      this.employeeVisible = false
      console.log(this.choosedata)
      const agentcollectdata = new Array(this.choosedata)
      const agentcollectDetail = agentcollectdata.map(function(item) {
        return {
          agentCollectId: item.id,
          shouldMoney: item.shouldMoney
        }
      })
      this.$emit('agentcollectDetail', agentcollectDetail)
      this.$emit('agentcollect', this.choosedata)
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
