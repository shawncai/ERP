<template>
  <el-dialog :visible.sync="employeeVisible" :ordercontrol="ordercontrol" :close-on-press-escape="false" top="10px" title="选择采购订货单" append-to-body width="1100px" @close="$emit('update:ordercontrol', false)">
    <el-card class="box-card" style="margin-top: 15px;height: 60px;padding-left:0 " shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" style="margin-top: -9px">
          <el-col :span="4">
            <el-form-item>
              <el-input v-model="getemplist.title" :placeholder="$t('StockOrder.title')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 5px">
            <el-form-item>
              <el-input v-model="getemplist.orderNumber" placeholder="采购单号" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 20px">
            <el-form-item>
              <el-input v-model="stockPersonId" :placeholder="$t('StockOrder.stockPersonId')" clearable @keyup.enter.native="handleFilter" @focus="handlechooseStock"/>
            </el-form-item>
            <my-emp :control.sync="stockControl" @stockName="stockName"/>
          </el-col>
          <!--更多搜索条件-->
          <el-col :span="3" style="margin-left: 30px">
            <el-popover
              v-model="visible2"
              placement="bottom"
              width="500"
              trigger="manual">
              <el-select v-model="getemplist.deptId" placeholder="部门" clearable style="width: 40%;float: left;margin-left: 20px">
                <el-option
                  v-for="(item, index) in depts"
                  :key="index"
                  :value="item.id"
                  :label="item.deptName"/>
              </el-select>
              <el-input v-model="supplierId" placeholder="供应商" style="width: 40%;float: right;margin-right: 20px;" clearable @focus="handlechoose"/>
              <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
              <el-select v-model="getemplist.receiptStat" :value="getemplist.receiptStat" placeholder="单据状态" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
                <el-option value="1" label="制单"/>
                <el-option value="2" label="执行"/>
                <el-option value="3" label="结单"/>
              </el-select>
              <el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" placeholder="审批状态" clearable style="width: 40%;float: right;margin-right: 20px;margin-top: 20px">
                <el-option value="0" label="未审核"/>
                <el-option value="1" label="审核中"/>
                <el-option value="2" label="审核通过"/>
                <el-option value="3" label="审核不通过"/>
              </el-select>
              <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="-"
                unlink-panels
                start-placeholder="询价日期"
                end-placeholder="询价日期"
                value-format="yyyy-MM-dd"
                style="margin-top: 20px;margin-left: 20px"/>
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
            <span>{{ scope.row.orderNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockOrder.title')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockOrder.stockType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.stockTypeId | stockTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockOrder.sourceType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.sourceType | sourceTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockOrder.stockPersonId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.stockPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockOrder.supplierId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.supplierName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockOrder.allMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.allMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockOrder.allTaxMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.allTaxMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockOrder.allIncludeTaxMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.allIncludeTaxMoney }}</span>
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
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-button v-waves class="filter-item" type="success" style="width: 100px;float: left;margin-bottom: 10px" @click="handleConfirm">确认添加</el-button>
    </el-card>
  </el-dialog>
</template>

<script>
import { stockorderlist } from '@/api/StockOrder'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import MyEmp from './MyEmp'
import DetailList from './DetailList'
import MyDialog from './MyDialog'
import MySupplier from './MySupplier'
export default {
  directives: { waves },
  components: { MyDialog, DetailList, MyEmp, Pagination, MySupplier },
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
        2: '采购需求',
        3: '无来源'
      }
      return statusMap[status]
    }
  },
  props: {
    ordercontrol: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 选择框控制
      employeeVisible: this.ordercontrol,
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
        repositoryId: 438,
        regionIds: 2,
        createPersonId: 3
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
    ordercontrol() {
      this.employeeVisible = this.ordercontrol
      this.getlist()
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    // 更新采购类型
    updatecountry() {
      this.getlist()
    },
    getlist() {
      // 物料需求计划列表数据
      this.listLoading = true
      stockorderlist(this.getemplist).then(res => {
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
      this.supplierId = ''
      this.getemplist.supplierId = ''
      this.stockPersonId = ''
      this.getemplist.stockPersonId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      stockorderlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          this.restFilter()
        } else {
          this.restFilter()
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
      this.$router.push('/StockOrder/AddStockOrder')
    },
    // 选择主生产计划数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    async handleConfirm() {
      this.employeeVisible = false
      console.log(this.choosedata)
      const orderdata = this.choosedata.stockOrderDetailVos
      const number = this.choosedata.orderNumber
      const orderDetail = orderdata.map(function(item) {
        return {
          productCode: item.productCode,
          productName: item.productName,
          productType: item.productType,
          typeName: item.productType,
          type: item.typeId,
          unit: item.unit,
          color: item.color,
          stockQuantity: item.stockQuantity,
          arrivalQuantity: 0,
          giveDate: item.deliveryDate,
          price: item.price,
          includeTaxPrice: item.includeTaxPrice,
          taxRate: item.taxRate * 100,
          money: item.money,
          includeTaxMoney: item.includeTaxMoney,
          taxMoney: item.tax,
          discountRate: item.discountRate * 100,
          discountMoney: item.discountMoney,
          remark: item.remarks,
          sourceNumber: number,
          sourceSerialNumber: item.id,
          hadStorageQuantity: 0,
          reportCheckingQuantity: 0,
          actualCheckingQuantity: 0,
          qualifyQuantity: 0,
          unqualifyQuantity: 0,
          returnQuantity: 0
        }
      })
      console.log(orderDetail)
      this.$emit('order', orderDetail)
      this.$emit('allOrderinfo', this.choosedata)
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
