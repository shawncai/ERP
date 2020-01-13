<template>
  <el-dialog :visible.sync="employeeVisible" :entercontrol="entercontrol" :supp="supp" :close-on-press-escape="false" top="10px" title="选择采购入库单" append-to-body width="1100px" @close="$emit('update:entercontrol', false)">
    <el-card class="box-card" style="margin-top: 15px;height: 60px;padding-left:0 " shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" style="margin-top: -9px">
          <el-col :span="4">
            <el-form-item>
              <el-input v-model="getemplist.title" :placeholder="$t('Stockenter.title')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 5px">
            <el-form-item>
              <el-input v-model="getemplist.enterNumber" :placeholder="$t('Stockenter.enterNumber')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 20px">
            <el-form-item>
              <el-input v-model="deliveryPersonId" :placeholder="$t('Stockenter.deliveryPersonId')" clearable @keyup.enter.native="handleFilter" @focus="handlechooseDelivery" @clear="restFilter2"/>
            </el-form-item>
            <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
          </el-col>
          <!--更多搜索条件-->
          <!--          <el-col :span="3" style="margin-left: 30px">-->
          <!--            <el-popover-->
          <!--              v-model="visible2"-->
          <!--              placement="bottom"-->
          <!--              width="500"-->
          <!--              trigger="click">-->
          <!--              <el-select v-model="getemplist.enterDeptId" placeholder="请选择入库部门" clearable style="width: 40%;float: left;margin-left: 20px">-->
          <!--                <el-option-->
          <!--                  v-for="(item, index) in depts"-->
          <!--                  :key="index"-->
          <!--                  :value="item.id"-->
          <!--                  :label="item.deptName"/>-->
          <!--              </el-select>-->
          <!--              <el-input v-model="enterRepositoryId" placeholder="请选择入库仓库" class="filter-item" clearable style="width: 40%;float: left;margin-left: 20px" @keyup.enter.native="handleFilter" @focus="handlechooseRep"/>-->
          <!--              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>-->
          <!--              <el-input v-model="acceptPersonId" :placeholder="$t('Stockenter.acceptPersonId')" class="filter-item" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px" @keyup.enter.native="handleFilter" @focus="handlechooseAccept"/>-->
          <!--              <el-date-picker-->
          <!--                v-model="date"-->
          <!--                type="daterange"-->
          <!--                range-separator="-"-->
          <!--                unlink-panels-->
          <!--                start-placeholder="Start"-->
          <!--                end-placeholder="End"-->
          <!--                value-format="yyyy-MM-dd"-->
          <!--                style="margin-top: 20px;margin-left: 20px"/>-->
          <!--              <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">-->
          <!--                <el-button v-waves class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>-->
          <!--              </div>-->
          <!--              <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>-->
          <!--            </el-popover>-->
          <!--          </el-col>-->
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
      <!-- 列表开始1.13 -->
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @current-change="handleCurrentChange"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" min-width="55" align="center" />
        <el-table-column :label="$t('Stockenter.id')" :resizable="false" fixed="left" prop="id" align="center" width="150">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.title')" :resizable="false" fixed="left" prop="title" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.enterNumber')" :resizable="false" prop="sourceNumber" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.enterNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.deliveryPersonId')" :resizable="false" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.deliveryPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.acceptPersonId')" :resizable="false" prop="acceptPersonName" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.acceptPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.enterDeptId')" :resizable="false" prop="deliveryPersonName" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.deliveryPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.endPersonName')" :resizable="false" prop="endPersonName" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.enterPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.endDate')" :resizable="false" prop="endDate" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.enterDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.summary')" :resizable="false" prop="stockEnterDetails" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.summary }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.judgeStat')" :resizable="false" prop="judgeStat" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.judgeStat | judgeStatFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.receiptStat')" :resizable="false" align="center" width="150">
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
import { stockenterlist } from '@/api/Stockenter'
import { getdeptlist } from '@/api/BasicSettings'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import MyRepository from './MyRepository'
import MySupplier from './MySupplier'
import MyEmp from './MyEmp'
import MyDelivery from './MyDelivery'
import MyDetail from './MyDetail'
import DetailList from './DetailList'
var _that
export default {
  directives: { waves },
  components: { DetailList, Pagination, MyRepository, MySupplier, MyEmp, MyDelivery, MyDetail },
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
    sourceTypeFilter(status) {
      const statusMap = {
        1: _that.$t('updates.cgsq'),
        2: _that.$t('updates.cgxq'),
        3: _that.$t('Hmodule.Nosource')
      }
      return statusMap[status]
    }
  },
  props: {
    entercontrol: {
      type: Boolean,
      default: false
    },
    supp: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      // 选择框控制
      employeeVisible: this.entercontrol,
      // 类别获取参数
      typeparms: {
        pagenum: 1,
        pagesize: 99999
      },
      // 入库仓库回显
      enterRepositoryId: '',
      // 仓库选择控制期
      repositorycontrol: false,
      // 验收人回显
      acceptPersonId: '',
      // 验收人控制框
      accetpcontrol: false,
      // 交货人回显
      deliveryPersonId: '',
      // 交货人控制框
      deliverycontrol: false,
      // 部门数据
      depts: [],
      // 采购员控制框
      stockControl: false,
      // 采购员回显
      stockPersonId: '',
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
        pagenum: 1,
        pagesize: 10,
        judgeStat: 2,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds,
        isActive: 1,
        supplierId: this.supp
      },
      visible2: {},
      // 传给组件的数据
      personalForm: {},
      personalForm2: {},
      // 修改控制组件数据
      editVisible: false,
      // 开始时间到结束时间
      date: []
    }
  },
  watch: {
    entercontrol() {
      this.employeeVisible = this.entercontrol
      this.getlist()
    },
    supp() {
      this.getemplist.supplierId = this.supp
      this.getlist()
      console.log(this.supp)
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val)
      this.moreaction = val
    },
    // 更新采购类型
    updatecountry() {
      this.getlist()
    },
    getlist() {
      // 采购入库单列表数据
      this.listLoading = true
      stockenterlist(this.getemplist).then(res => {
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
    },
    // 清空搜索条件
    restFilter() {
      this.enterRepositoryId = ''
      this.getemplist.enterRepositoryId = ''
    },
    restFilter2() {
      this.deliveryPersonId = ''
      this.getemplist.deliveryPersonId = ''
    },
    restFilter3() {
      this.acceptPersonId = ''
      this.getemplist.acceptPersonId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      stockenterlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
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
    // 部门列表focus刷新
    updatedept() {
      this.getlist()
    },
    // 交货人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.deliveryPersonId = val.personName
      this.getemplist.deliveryPersonId = val.id
    },
    // 验收人focus事件触发
    handlechooseAccept() {
      this.accetpcontrol = true
    },
    acceptName(val) {
      this.acceptPersonId = val.personName
      this.getemplist.acceptPersonId = val.id
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/Stockenter/addstockenter')
    },
    // 选择主生产计划数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    async handleConfirm() {
      this.employeeVisible = false
      console.log(this.choosedata)
      const enterdata = this.choosedata.stockEnterDetailVos
      const number = this.choosedata.enterNumber
      const enterDetail = enterdata.map(function(item) {
        return {
          productCode: item.productCode,
          productName: item.productName,
          productType: item.productType,
          typeName: item.productType,
          typeId: item.typeId,
          unit: item.unit,
          color: item.color,
          arrivalQuantity: item.arrivalQuantity,
          retreatQuantity: 0,
          retreatReason: '',
          sourceNumber: number,
          sourceSerialNumber: item.id,
          remark: item.remark,
          quantity: item.actualEnterQuantity,
          quantity2: item.actualEnterQuantity,
          price: item.enterPrice,
          includeTaxPrice: (item.enterPrice * (1 + item.taxRate)).toFixed(2),
          taxRate: item.taxRate,
          money: item.money,
          includeTaxMoney: item.includeTaxMoney,
          taxMoney: item.taxMoney,
          discountMoney: 0.0,
          discountRate: 0.0,
          orderNumber: item.orderNumber,
          actualEnterQuantity: item.actualEnterQuantity,
          invoiceQuantity: item.invoiceQuantity
        }
      })
      console.log(enterDetail)
      this.$emit('enter', enterDetail)
      this.$emit('enterinfo', this.choosedata)
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
