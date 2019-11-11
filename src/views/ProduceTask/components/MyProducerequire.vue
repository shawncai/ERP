<template>
  <el-dialog :visible.sync="employeeVisible" :prorequirecontrol="prorequirecontrol" :close-on-press-escape="false" top="10px" title="选择生产需求" append-to-body width="1000px" @close="$emit('update:prorequirecontrol', false)">
    <el-card class="box-card" style="margin-top: 10px;height: 60px" shadow="never">
      <el-form ref="getemplist" :model="getemplist" style="margin-top: -9px">
        <el-row>
          <el-col :span="4">
            <el-form-item>
              <el-date-picker
                v-model="getemplist.beginTime"
                :picker-options="pickerOptions0"
                placeholder="开始时间"
                type="date"
                value-format="yyyy-MM-dd"
                style="width: 140px"
                @change="cleardeposit"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-date-picker
                v-model="getemplist.endTime"
                :picker-options="pickerOptions1"
                placeholder="结束时间"
                type="date"
                value-format="yyyy-MM-dd"
                style="width: 140px"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-input v-model="workCenterId" :placeholder="$t('ProduceRequire.workCenterId')" clearable @clear="restFilter2" @keyup.enter.native="handleFilter" @focus="workcenterchoose"/>
            </el-form-item>
            <my-center :control.sync="centercontrol" @center="center"/>
          </el-col>
          <!--更多搜索条件-->
          <!--<el-col :span="3">-->
          <!--<el-popover-->
          <!--v-model="visible2"-->
          <!--placement="bottom"-->
          <!--width="500"-->
          <!--trigger="click">-->
          <!--<el-input v-model="workCenterId" style="width: 40%;float: left;margin-left: 20px" placeholder="工作中心" clearable @focus="workcenterchoose"/>-->
          <!--<my-center :control.sync="centercontrol" @center="center"/>-->
          <!--<el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" placeholder="审批状态" clearable style="width: 40%;float: right;margin-right: 20px">-->
          <!--<el-option value="0" label="未审核"/>-->
          <!--<el-option value="1" label="审核中"/>-->
          <!--<el-option value="2" label="审核通过"/>-->
          <!--<el-option value="3" label="审核不通过"/>-->
          <!--</el-select>-->
          <!--<el-select v-model="getemplist.receiptStat" :value="getemplist.receiptStat" placeholder="单据状态" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">-->
          <!--<el-option value="1" label="制单"/>-->
          <!--<el-option value="2" label="执行"/>-->
          <!--<el-option value="3" label="结单"/>-->
          <!--</el-select>-->
          <!--<el-select v-model="getemplist.produceDeptId" placeholder="生产部门" clearable style="width: 40%;float: right;margin-right: 20px;margin-top: 20px">-->
          <!--<el-option-->
          <!--v-for="(item, index) in depts"-->
          <!--:key="index"-->
          <!--:value="item.id"-->
          <!--:label="item.deptName"/>-->
          <!--</el-select>-->
          <!--<el-select v-model="getemplist.processType" placeholder="加工类型" style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">-->
          <!--<el-option :label="$t('Hmodule.jiagong1')" value="1" />-->
          <!--</el-select>-->
          <!--<el-date-picker-->
          <!--v-model="date"-->
          <!--type="daterange"-->
          <!--range-separator="-"-->
          <!--unlink-panels-->
          <!--start-placeholder="Start"-->
          <!--end-placeholder="End"-->
          <!--value-format="yyyy-MM-dd"-->
          <!--style="margin-top: 20px;margin-left: 20px"/>-->
          <!--<div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">-->
          <!--<el-button v-waves class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>-->
          <!--</div>-->
          <!--<el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>-->
          <!--</el-popover>-->
          <!--</el-col>-->
          <el-col :span="3" style="margin-left: 17px">
            <!-- 搜索按钮 -->
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
          </el-col>
          <!--<el-col :span="2">-->
          <!--<el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>-->
          <!--</el-col>-->
        </el-row>
      </el-form>
    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
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
        <el-table-column :label="$t('ProduceRequire.sourceNumber')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.sourceNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProduceRequire.productCode')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productCode }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProduceRequire.productName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProduceRequire.requireRepositoryName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.requireRepositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProduceRequire.productType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productType }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProduceRequire.color')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.color }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProduceRequire.unit')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.unit }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProduceRequire.requireQuantity')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.requireQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProduceRequire.requireDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.requireDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProduceRequire.workCenterName')" :resizable="false" prop="judgeStat" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.workCenterName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProduceRequire.issueQuantity')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.issueQuantity }}</span>
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
import { producerequirelist } from '@/api/ProduceRequire'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import MyCenter from './MyCenter'
export default {
  directives: { waves },
  components: { MyCenter, Pagination },
  filters: {
    judgeStatFilter(status) {
      const statusMap = {
        0: '未审核',
        1: '审核中',
        2: '审核通过',
        3: '审核不通过'
      }
      return statusMap[status]
    },
    receiptStatFilter(status) {
      const statusMap = {
        1: '制单',
        2: '执行',
        3: '结单'
      }
      return statusMap[status]
    },
    stockTypeFilter(status) {
      const statusMap = {
        1: '采购1'
      }
      return statusMap[status]
    },
    sourceTypeFilter(status) {
      const statusMap = {
        1: '采购申请',
        2: '采购计划',
        3: '采购询价单',
        4: '采购合同',
        5: '无来源'
      }
      return statusMap[status]
    }
  },
  props: {
    prorequirecontrol: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 选择框控制
      employeeVisible: this.prorequirecontrol,
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.getemplist.endTime !== null) {
            return time.getTime() > new Date(this.getemplist.endTime).getTime() - 8.64e7
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.getemplist.beginTime).getTime() - 8.64e7
        }
      },
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
      // 详情组件数据
      detailvisible: false,
      // 更多搜索条件问题
      visible2: false,
      // 工作中心回显
      workCenterId: '',
      // 工作中心控制框
      centercontrol: false,
      // 采购人回显
      stockPersonId: '',
      // 采购人控制框
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
      // 采购申请查询加展示参数
      getemplist: {
        pageNum: 1,
        pageSize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds,
        beginTime: null,
        endTime: null,
        isActive: 1
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
    prorequirecontrol() {
      this.employeeVisible = this.prorequirecontrol
      this.getlist()
    }
  },
  methods: {
    // 工作中心focus事件
    workcenterchoose() {
      this.centercontrol = true
    },
    center(val) {
      console.log(val)
      this.workCenterId = val.workCenterName
      this.getemplist.workCenterId = val.id
    },
    // 清空结束时间
    cleardeposit() {
      this.getemplist.endTime = null
    },
    // 不让勾选
    selectInit(row, index) {
      if (row.judgeStat !== 0) {
        return false
      } else {
        return true
      }
    },
    // 更新采购类型
    updatecountry() {
      this.getlist()
    },
    getlist() {
      // 物料需求计划列表数据
      this.listLoading = true
      producerequirelist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
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
      // 采购类别数据
      searchStockCategory(this.typeparms).then(res => {
        if (res.data.ret === 200) {
          this.types = res.data.data.content.list
        }
      })
    },
    // 清空搜索条件
    restFilter() {
      this.workCenterId = ''
      this.getemplist.workCenterId = ''
    },
    restFilter2() {
      this.stockPersonId = ''
      this.getemplist.stockPersonId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      producerequirelist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
    },
    // 采购人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 采购人回显
    stockName(val) {
      this.stockPersonId = val.personName
      this.getemplist.stockPersonId = val.id
    },
    // 供应商输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 供应商列表返回数据
    supplierName(val) {
      console.log(val)
      this.supplierId = val.supplierName
      this.getemplist.supplierId = val.id
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/ProduceRequire/AddProduceRequire')
    },
    // 选择主生产计划数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    handleConfirm() {
      this.employeeVisible = false
      const prorequiredata = new Array(this.choosedata)
      console.log(this.choosedata)
      const num = this.choosedata.sourceNumber
      const prorequireDetail = prorequiredata.map(function(item) {
        return {
          productCode: item.productCode,
          productName: item.productName,
          productType: item.productType,
          typeId: item.typeId,
          unit: item.unit,
          sourceNumber: num,
          sourceSerialNumber: item.id,
          workCenterId: item.workCenterId,
          workCenterName: item.workCenterName,
          produceQuantity: item.requireQuantity,
          bomNumber: '',
          processName: '',
          alreadyProduceQuantity: 0,
          alreadyEnterQuantity: 0,
          reportedCheckQuantity: 0,
          actualCheckQuantity: 0,
          passQuantity: 0,
          failQuantity: 0
        }
      })
      this.$emit('prorequireDetail', prorequireDetail)
      this.$emit('moredata', num)
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
