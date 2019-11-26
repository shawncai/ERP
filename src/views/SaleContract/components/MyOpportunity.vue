<template>
  <el-dialog :visible.sync="employeeVisible" :opportunitycontrol="opportunitycontrol" :close-on-press-escape="false" top="10px" title="选择销售机会单" append-to-body width="1100px" @close="$emit('update:opportunitycontrol', false)">
    <el-card class="box-card" style="margin-top: 15px;height: 60px;padding-left:0 " shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" style="margin-top: -9px">
          <el-col :span="4">
            <el-form-item>
              <el-input v-model="getemplist.title" :placeholder="$t('SaleOpportunity.title')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 5px">
            <el-form-item>
              <el-input v-model="getemplist.opportunityNumber" placeholder="机会单号" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 20px">
            <el-form-item>
              <el-select v-model="getemplist.opportunityType" :value="getemplist.opportunityType" clearable @keyup.enter.native="handleFilter">
                <el-option value="1" label="机会1"/>
              </el-select>
            </el-form-item>
          </el-col>
          <!--更多搜索条件-->
          <el-col :span="3" style="margin-left: 30px">
            <el-popover
              v-model="visible2"
              placement="bottom"
              width="500"
              trigger="click">
              <el-select v-model="getemplist.customerType" :placeholder="$t('SaleOpportunity.customerType')" clearable style="width: 40%;float: left;margin-left: 20px">
                <el-option value="1" label="经销商"/>
                <el-option value="2" label="零售"/>
              </el-select>
              <el-input v-model="customerName" :placeholder="$t('SaleOpportunity.customerName')" style="width: 40%;float: right;margin-right: 20px;" clearable @clear="restFilter" @focus="chooseCustomer"/>
              <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
              <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
              <!--<el-select v-model="getemplist.receiptStat" :value="getemplist.receiptStat" :placeholder="$t('updates.djzt')" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">-->
              <!--<el-option value="1" :label="$t('updates.zd')"/>-->
              <!--<el-option value="2" :label="$t('updates.zx')"/>-->
              <!--<el-option value="3" :label="$t('updates.jd')"/>-->
              <!--</el-select>-->
              <!--<el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" :placeholder="$t('updates.spzt')" clearable style="width: 40%;float: right;margin-right: 20px;margin-top: 20px">-->
              <!--<el-option value="0" :label="$t('updates.wsh')"/>-->
              <!--<el-option value="1" :label="$t('updates.shz')"/>-->
              <!--<el-option value="2" :label="$t('updates.shtg')"/>-->
              <!--<el-option value="3" :label="$t('updates.shptg')"/>-->
              <!--</el-select>-->
              <!--<el-date-picker-->
              <!--v-model="date"-->
              <!--type="daterange"-->
              <!--range-separator="-"-->
              <!--unlink-panels-->
              <!--start-placeholder="销售日期"-->
              <!--end-placeholder="销售日期"-->
              <!--value-format="yyyy-MM-dd"-->
              <!--style="margin-top: 20px;margin-left: 20px"/>-->
              <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
                <el-button v-waves class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>
              </div>
              <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
            </el-popover>
          </el-col>
          <el-col :span="3" style="margin-left: 20px">
            <!-- 搜索按钮 -->
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
          </el-col>
          <el-col :span="3">
            <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
          </el-col>
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
            <span>{{ scope.row.opportunityNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleOpportunity.title')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleOpportunity.customerName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.customerName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleOpportunity.customerPhone')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.customerPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleOpportunity.opportunityType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.opportunityTypeName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleOpportunity.opportunitySource')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.opportunitySourceName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleOpportunity.handlePersonId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.handlePersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleOpportunity.isSale')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.isSale | isSaleFilter }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-button v-waves class="filter-item" type="success" style="width: 100px;float: left;margin-bottom: 10px" @click="handleConfirm">{{ $t('Hmodule.sure') }}</el-button>
    </el-card>
  </el-dialog>
</template>

<script>
import { saleopportunitylist } from '@/api/SaleOpportunity'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import MyEmp from './MyEmp'
import MyCustomer from './MyCustomer'
import MyAgent from './MyAgent'
var _that
export default {
  directives: { waves },
  components: { MyEmp, MyCustomer, MyAgent, Pagination },
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
    isSaleFilter(status) {
      const statusMap = {
        1: '跟进中',
        2: '销售成功'
      }
      return statusMap[status]
    }
  },
  props: {
    opportunitycontrol: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 选择框控制
      employeeVisible: this.opportunitycontrol,
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
      // 详情组件数据
      detailvisible: false,
      // 更多搜索条件问题
      visible2: false,
      // 供应商回显
      supplierId: '',
      // 供应商控制框
      empcontrol: false,
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
        regionIds: this.$store.getters.regionIds
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
    opportunitycontrol() {
      this.employeeVisible = this.opportunitycontrol
      this.getlist()
    }
  },
  methods: {
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
    // 更新采购类型
    updatecountry() {
      this.getlist()
    },
    getlist() {
      // 物料需求计划列表数据
      this.listLoading = true
      saleopportunitylist(this.getemplist).then(res => {
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
      this.customerName = ''
      this.getemplist.customerId = ''
    },
    restFilter2() {
      this.stockPersonId = ''
      this.getemplist.stockPersonId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      saleopportunitylist(this.getemplist).then(res => {
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
      this.$router.push('/SaleOpportunity/AddSaleOpportunity')
    },
    // 选择主生产计划数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    handleConfirm() {
      this.employeeVisible = false
      console.log(this.choosedata)
      const opportunitydata = this.choosedata.saleOpportunityDetailVos
      // const opportunityNumber = this.choosedata.opportunityNumber
      const opportunityDetail = opportunitydata.map(function(item) {
        return {
          productCode: item.productCode,
          productName: item.productName,
          categoryName: item.productCategory,
          productCategory: item.categoryId,
          unit: item.unit,
          typeName: item.productType,
          productType: item.typeId,
          color: item.color,
          performanceScore: item.kpiGrade,
          productScore: item.point,
          quantity: 0,
          salePrice: 0,
          costPrice: 0,
          taxprice: 0,
          costMoney: 0,
          includeTaxMoney: 0,
          taxRate: 0,
          taxMoney: 0,
          money: 0,
          includeTaxCostMoney: 0,
          discount: 0,
          discountMoney: 0,
          carCode: 0,
          motorCode: 0,
          batteryCode: 0
        }
      })
      this.$emit('opportunityDetail', opportunityDetail)
      this.$emit('opportunity', this.choosedata)
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
