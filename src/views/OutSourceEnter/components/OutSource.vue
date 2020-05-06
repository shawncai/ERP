<template>
  <el-dialog :visible.sync="employeeVisible" :outsourcecontrol="outsourcecontrol" :close-on-press-escape="false" top="10px" title="选择外包单" append-to-body width="1100px" @close="$emit('update:outsourcecontrol', false)">
    <el-card class="box-card" style="margin-top: 15px;height: 80px;padding-left:0 " shadow="never">

      <el-input v-model="getemplist.title" :placeholder="$t('updates.wbdzt')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="getemplist.number" :placeholder="$t('updates.wbddh')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="outFactoryId" :placeholder="$t('updates.wbgc')" class="filter-item" clearable @keyup.enter.native="handleFilter" @clear="restFilter" @focus="chooseFactory"/>

      <my-factory :factorycontrol.sync="factorycontrol" @factoryName="factoryName"/>

      <el-popover
        v-model="visible2"
        placement="bottom"
        width="500"
        trigger="click">
        <el-select v-model="getemplist.paymentAgreementId" :value="getemplist.paymentAgreementId" placeholder="付款约定" clearable style="width: 40%;float: left;margin-left: 20px">
          <el-option value="1" label="付款1"/>
          <el-option value="2" label="付款2"/>
        </el-select>
        <el-select v-model="getemplist.billingTypeId" :value="getemplist.billingTypeId" placeholder="开票类型" clearable style="width: 40%;float: right;margin-right: 20px">
          <el-option value="1" label="普通发票"/>
          <el-option value="2" label="付款2"/>
        </el-select>
        <el-select v-model="getemplist.receiptStat" :value="getemplist.receiptStat" :placeholder="$t('updates.djzt')" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
          <el-option :label="$t('updates.zd')" value="1"/>
          <el-option :label="$t('updates.zx')" value="2"/>
          <el-option :label="$t('updates.jd')" value="3"/>
        </el-select>
        <el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" :placeholder="$t('updates.spzt')" clearable style="width: 40%;float: right;margin-right: 20px;margin-top: 20px">
          <el-option :label="$t('updates.wsh')" value="0"/>
          <el-option :label="$t('updates.shz')" value="1"/>
          <el-option :label="$t('updates.shtg')" value="2"/>
          <el-option :label="$t('updates.shptg')" value="3"/>
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
          <el-button v-waves class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-top:10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

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
        <el-table-column :label="$t('public.id')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('OutSourcing.title')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('OutSourcing.personId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.personName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('OutSourcing.outFactoryId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.outFactoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('OutSourcing.paiedMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.paiedMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('OutSourcing.notPayMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.notPayMoney }}</span>
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
import { searchoutsourcing, deleteoutsourcing, updateoutsourcing2 } from '@/api/OutSourcing'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyDialog from './MyDialog'
import DetailList from './DetailList'
import MyFactory from './MyFactory'
var _that
export default {
  directives: { waves },
  components: { MyFactory, Pagination, MyDialog, DetailList },
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
    outsourcecontrol: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 外包工厂回显
      outFactoryId: '',
      // 控制外包工厂
      factorycontrol: false,
      // 选择框控制
      employeeVisible: this.outsourcecontrol,
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
        isActive: 2,
        judgeStat: 2,
        receiptStat: 2,
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
    outsourcecontrol() {
      this.employeeVisible = this.outsourcecontrol
      this.getlist()
    }
  },
  beforeCreate() {
    _that = this
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
      searchoutsourcing(this.getemplist).then(res => {
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
      this.outFactoryId = ''
      this.getemplist.outFactoryId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      searchoutsourcing(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
    },
    // 外包工厂focus事件
    chooseFactory() {
      this.factorycontrol = true
    },
    // 外包工厂回显
    factoryName(val) {
      this.outFactoryId = val.factoryName
      this.getemplist.outFactoryId = val.id
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/OutSourcing/AddOutSourcing')
    },
    // 选择主生产计划数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
      console.log('tczjx', val)
    },
    // 确认添加数据
    handleConfirm() {
      this.employeeVisible = false
      console.log(this.choosedata)
      const outsourcingDetailVos = this.choosedata.outsourcingEnterDetailVos
      const OrderNumber = this.choosedata.number
      const outSourceDetail = outsourcingDetailVos.map(function(item) {
        return {
          reportCheckingQuantity: item.reportCheckingQuantity,
          actualEnterQuantity: item.quantity - item.enterQuantity,
          qualifyQuantity: item.qualifyQuantity,
          productCode: item.productCode,
          productName: item.productName,
          categoryName: item.productCategoryName,
          category: item.productCategory,
          unit: item.unit,
          typeId: item.type,
          type: item.type,
          typeName: item.typeName,
          productType: item.typeName,
          typeIdname: item.typeName,
          color: item.color,
          kpiGrade: '0.00',
          point: '0.00',
          allQuantity: item.quantity,
          taxRate: item.taxRate,
          taxMoney: item.taxMoney,
          discountRate: item.discountRate,
          discountMoney: item.discountMoney,
          carCode: 0,
          motorCode: 0,
          batteryCode: 0,
          sourceNumber: OrderNumber,
          sourceSerialNumber: item.id,
          quantity: item.quantity,
          enterPrice: 0,
          enterMoney: 0,
          alreadyOutQuantity: item.alreadyOutQuantity
        }
      })
      console.log(58520, outSourceDetail)
      this.$emit('outSourceDetail', outSourceDetail)
      this.$emit('outSource', this.choosedata)
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
