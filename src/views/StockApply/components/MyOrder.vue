<template>
  <el-dialog :visible.sync="employeeVisible" :ordercontrol="ordercontrol" :close-on-press-escape="false" top="10px" title="选择销售订单" append-to-body width="1100px" @close="$emit('update:ordercontrol', false)">
    <el-card class="box-card" style="margin-top: 15px;height: 60px;padding-left:0 " shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" style="margin-top: -9px">
          <el-col :span="4">
            <el-form-item>
              <el-input v-model="getemplist.title" :placeholder="$t('SaleOrder.title')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 5px">
            <el-form-item>
              <el-input v-model="getemplist.number" placeholder="订单单号" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 20px">
            <el-form-item>
              <el-select v-model="getemplist.sendType" :value="getemplist.sendType" clearable @keyup.enter.native="handleFilter">
                <el-option value="1" label="已发货"/>
                <el-option value="2" label="未发货"/>
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
              <el-select v-model="getemplist.customerType" :placeholder="$t('SaleOrder.customerType')" clearable style="width: 40%;float: left;margin-left: 20px">
                <el-option value="1" label="经销商"/>
                <el-option value="2" label="零售"/>
              </el-select>
              <el-input v-model="customerName" :placeholder="$t('SaleOrder.customerName')" style="width: 40%;float: right;margin-right: 20px;" clearable @focus="chooseCustomer" @clear="restFilter"/>
              <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
              <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
              <el-select v-model="getemplist.receiptStat" :value="getemplist.receiptStat" :placeholder="$t('updates.djzt')" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
                <el-option value="1" :label="$t('updates.zd')"/>
                <el-option value="2" :label="$t('updates.zx')"/>
                <el-option value="3" :label="$t('updates.jd')"/>
              </el-select>
              <el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" :placeholder="$t('updates.spzt')" clearable style="width: 40%;float: right;margin-right: 20px;margin-top: 20px">
                <el-option value="0" :label="$t('updates.wsh')"/>
                <el-option value="1" :label="$t('updates.shz')"/>
                <el-option value="2" :label="$t('updates.shtg')"/>
                <el-option value="3" :label="$t('updates.shptg')"/>
              </el-select>
              <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="-"
                unlink-panels
                start-placeholder="销售日期"
                end-placeholder="销售日期"
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
            <span>{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleOrder.title')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleOrder.customerName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.customerName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleOrder.transDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.transDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleOrder.heji6')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.allIncludeTaxDiscountMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleOrder.sendType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.sendType | sendTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('SaleOrder.backMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.backMoney }}</span>
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
      <el-button v-waves class="filter-item" type="success" style="width: 100px;float: left;margin-bottom: 10px" @click="handleConfirm">{{ $t('Hmodule.sure') }}</el-button>
    </el-card>
  </el-dialog>
</template>

<script>
import { searchUnitGroup } from '@/api/UnitGroup'
import { productlist } from '@/api/Product'
import { searchsaleOrder } from '@/api/SaleOrder'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import MyEmp from './MyEmp'
import DetailList from './DetailList'
import MyDialog from './MyDialog'
import MyCustomer from './MyCustomer'
import MyAgent from './MyAgent'
var _that
export default {
  directives: { waves },
  components: { MyDialog, DetailList, MyEmp, MyCustomer, MyAgent, Pagination },
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
    ordercontrol: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 选择框控制
      employeeVisible: this.ordercontrol,
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
        judgeStat: 2, receiptStat: 2,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds,
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
    ordercontrol() {
      this.employeeVisible = this.ordercontrol
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
      searchsaleOrder(this.getemplist).then(res => {
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
      searchsaleOrder(this.getemplist).then(res => {
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
      this.$router.push('/SaleOrder/AddSaleOrder')
    },
    // 选择主生产计划数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    async handleConfirm() {
      this.employeeVisible = false
      console.log(this.choosedata)
      const saleOrderdata = this.choosedata.saleOrderDetailVos
      const OrderNumber = this.choosedata.number
      // 通过Promise.all把所有循环中的异步接口数据加载过来，再通过async/await把数据加载完成
      const productDetail3 = await Promise.all(saleOrderdata.map(function(item) {
        const query = {}
        query.code = item.productCode
        return productlist(query)
      }))
      console.log('productDetail3', productDetail3)
      for (let i = 0; i < saleOrderdata.length; i++) {
        for (let j = 0; j < productDetail3.length; j++) {
          if (saleOrderdata[i].productCode === productDetail3[j].data.data.content.list[0].code) {
            // 获取采购单位
            saleOrderdata[i].unit = productDetail3[j].data.data.content.list[0].caigouMeasu
            // 根据单位比例换算数量
            if (productDetail3[j].data.data.content.list[0].unitGroupId !== null) {
              const query = {}
              query.groupId = productDetail3[j].data.data.content.list[0].unitGroupId
              await searchUnitGroup(query).then(res => {
                if (res.data.ret === 200) {
                  console.log('res', res.data.data.content.list[0].unitGroupDetailVos)
                  const unitGroupDetailVos = res.data.data.content.list[0].unitGroupDetailVos
                  let num1 = 1
                  let num2 = 1
                  for (let k = 0; k < unitGroupDetailVos.length; k++) {
                    if (unitGroupDetailVos[k].unitId === productDetail3[j].data.data.content.list[0].saleMeasurement) {
                      num1 = unitGroupDetailVos[k].proportion
                      console.log('num1', num1)
                    }
                    if (unitGroupDetailVos[k].unitId === productDetail3[j].data.data.content.list[0].caigouMeasurement) {
                      num2 = unitGroupDetailVos[k].proportion
                      console.log('num2', num2)
                    }
                  }
                  saleOrderdata[i].quantity = ((saleOrderdata[i].quantity) / num1 * num2).toFixed(2)
                  console.log(saleOrderdata[i].quantity)
                }
                setTimeout(() => {
                  this.listLoading = false
                }, 0.5 * 100)
              })
            }
          }
        }
      }
      console.log('saleOrderdata', saleOrderdata)
      const saleOrderDetail = saleOrderdata.map(function(item) {
        return {
          productCode: item.productCode,
          productName: item.productName,
          typeId: item.productType,
          requireQuantity: item.quantity,
          color: item.color,
          unit: item.unit,
          productType: item.productTypeName,
          planQuantity: item.quantity,
          sourceNumber: OrderNumber,
          sourceSerialNumber: item.id,
          applyQuantity: item.quantity
        }
      })
      const saleOrderDetail2 = saleOrderdata.map(function(item) {
        return {
          productCode: item.productCode,
          productName: item.productName,
          typeId: item.productType,
          requireQuantity: item.quantity,
          color: item.color,
          unit: item.unit,
          productType: item.productTypeName,
          planQuantity: '0.00',
          applyQuantity: item.quantity,
          sourceNumber: OrderNumber,
          sourceSerialNumber: item.id
        }
      })
      this.$emit('saleOrderDetail', saleOrderDetail)
      this.$emit('saleOrderDetail2', saleOrderDetail2)
      this.$emit('saleOrder', this.choosedata)
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
