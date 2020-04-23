<template>
  <el-dialog :visible.sync="employeeVisible" :procontrol="procontrol" :close-on-press-escape="false" top="10px" title="选择主生产计划" append-to-body width="1000px" @close="$emit('update:procontrol', false)">
    <el-card class="box-card" style="margin-top: 15px;height: 60px;padding-left:0 ">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" style="margin-top: -9px">
          <el-col :span="4">
            <el-form-item>
              <el-input v-model="getemplist.title" :placeholder="$t('ProducePlan.title')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left: 15px">
            <el-form-item>
              <el-input v-model="getemplist.planNumber" placeholder="生产编号" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <!--更多搜索条件-->
          <!-- <el-col :span="4">
            <el-popover
              v-model="visible2"
              placement="bottom"
              width="500"
              trigger="click">
              <el-input v-model="workCenterId" style="width: 40%;float: left;margin-left: 20px" placeholder="工作中心" clearable @clear="restFilter2" @focus="workcenterchoose"/>
              <my-center :control.sync="centercontrol" @center="center"/>
              <el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" :placeholder="$t('updates.spzt')" clearable style="width: 40%;float: right;margin-right: 20px">
                <el-option :label="$t('updates.wsh')" value="0"/>
                <el-option :label="$t('updates.shz')" value="1"/>
                <el-option :label="$t('updates.shtg')" value="2"/>
                <el-option :label="$t('updates.shptg')" value="3"/>
              </el-select>
              <el-select v-model="getemplist.receiptStat" :value="getemplist.receiptStat" :placeholder="$t('updates.djzt')" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
                <el-option :label="$t('updates.zd')" value="1"/>
                <el-option :label="$t('updates.zx')" value="2"/>
                <el-option :label="$t('updates.jd')" value="3"/>
              </el-select>
              <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="-"
                unlink-panels
                start-placeholder="Start"
                end-placeholder="End"
                value-format="yyyy-MM-dd"
                style="margin-top: 20px;margin-left: 20px"/>
              <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
                <el-button v-waves class="filter-item" type="primary" style="float: right" @click="handleFilter">{{ $t('public.search') }}</el-button>
              </div>
              <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
            </el-popover>
          </el-col> -->
          <el-col :span="4">
            <!-- 搜索按钮 -->
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
          </el-col>
          <el-col :span="3">
            <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px">
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
        <el-table-column :label="$t('ProducePlan.planNumber')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.planNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProducePlan.title')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProducePlan.handlePersonId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.handlePersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProducePlan.deptName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.workCenter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.judgeStat')" :resizable="false" prop="judgeStat" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.judgeStat | judgeStatFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.receiptStat')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.receiptStat | receiptStatFilter }}</span>
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
import { produceplanlist } from '@/api/ProducePlan'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves'
var _that
export default {
  directives: { waves },
  components: { Pagination },
  filters: {
    judgeStatFilter(status) {
      const statusMap = {
        0: _that.$t('updates.wsh'),
        1: _that.$t('updates.shz'),
        2: _that.$t('Hmodule.shtg'),
        3: _that.$t('Hmodule.shbtg')
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
    }
  },
  props: {
    procontrol: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableHeight: 200,

      // 选择框控制
      employeeVisible: this.procontrol,
      // 更多搜索条件问题
      visible2: false,
      // 工作中心回显
      workCenterId: '',
      // 工作中心控制器
      centercontrol: false,
      // 负责人回显
      handlePersonId: '',
      // 负责人控制框
      stockControl: false,
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
      // 主生产任务列表查询加展示参数
      getemplist: {
        pagenum: 1,
        pagesize: 10,
        judgeStat: 2,
        receiptStat: 2,
        isUse: 1,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds
      },
      // 开始时间到结束时间
      date: []
    }
  },
  watch: {
    procontrol() {
      this.employeeVisible = this.procontrol
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
    // 主生产计划列表数据
    getlist() {
      this.listLoading = true
      produceplanlist(this.getemplist).then(res => {
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
      this.handlePersonId = ''
      this.getemplist.handlePersonId = ''
    },
    restFilter2() {
      this.workCenterId = ''
      this.getemplist.workCenterId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      produceplanlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
    },
    // 工作中心focus事件
    workcenterchoose() {
      this.centercontrol = true
    },
    center(val) {
      console.log(val)
      this.workCenterId = val.workCenterName
      this.getemplist.workCenterId = val.id
    },
    // 负责人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 负责人回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.getemplist.handlePersonId = val.id
    },
    // 新增数据
    handleAdd() {
      this.employeeVisible = false
      this.$router.push('/ProducePlan/AddProducePlan')
    },
    // 选择主生产计划数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    handleConfirm() {
      this.employeeVisible = false
      const producedata = this.choosedata.producePlanDetailVos
      console.log('producedata', producedata)
      const productDetail = producedata.map(function(item) {
        return {
          productCode: item.productCode,
          productName: item.productName,
          locationId: '',
          color: item.color,
          typeId: item.typeId,
          enterQuantity: 0,
          taxRate: 0,
          unit: item.unit,
          actualEnterQuantity: 0,
          quantity: 1,
          enterPrice: 0,
          productType: item.typeId,
          totalMoney: 0,
          enterMoney: 0,
          price: 0,
          typeIdname: item.productType
        }
      })
      this.$emit('produce', productDetail)
      this.$emit('allinfo', this.choosedata)
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
