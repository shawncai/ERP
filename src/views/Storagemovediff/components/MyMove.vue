<template>
  <el-dialog :visible.sync="employeeVisible" :movecontrol="movecontrol" :close-on-press-escape="false" top="10px" title="选择调拨单" append-to-body width="1100px" @close="$emit('update:movecontrol', false)">
    <el-card class="box-card" style="margin-top: 15px;height: 60px;padding-left:0 " shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" style="margin-top: -9px">
          <el-col :span="4">
            <el-form-item>
              <el-input v-model="getemplist.title" :placeholder="$t('Storagemove.title')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 5px">
            <el-form-item>
              <el-input v-model="getemplist.moveNumber" :placeholder="$t('Storagemove.moveNumber')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 20px">
            <el-form-item>
              <el-input v-model="moveInRepository" :placeholder="$t('Storagemove.moveInRepository')" clearable @clear="restFilter" @keyup.enter.native="handleFilter" @focus="handlechooseDep"/>
            </el-form-item>
            <my-depot :depotcontrol.sync="depotcontrol" @depotname="depotname"/>
          </el-col>
          <!--更多搜索条件-->
          <el-col :span="3" style="margin-left: 30px">
            <el-popover
              v-model="visible2"
              placement="bottom"
              width="500"
              trigger="click">
              <el-select v-model="getemplist.departmentId" placeholder="请选择调货部门" style="width: 40%;float: left;margin-left: 20px" clearable >
                <el-option
                  v-for="(item, index) in depts"
                  :key="index"
                  :value="item.id"
                  :label="item.deptName"/>
              </el-select>
              <el-input v-model="moveOutRepository" :placeholder="$t('Storagemove.moveOutRepository')" class="filter-item" clearable style="width: 40%;float: right;margin-right: 20px" @clear="restFilter2" @keyup.enter.native="handleFilter" @focus="handlechooseRep"/>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              <el-select v-model="getemplist.requestDeptId" placeholder="请选择要货部门" style="width: 40%;float: left;margin-left: 20px;margin-top: 20px" clearable >
                <el-option
                  v-for="(item, index) in depts"
                  :key="index"
                  :value="item.id"
                  :label="item.deptName"/>
              </el-select>
              <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="-"
                unlink-panels
                start-placeholder="要求到货开始日期"
                end-placeholder="要求到货结束日期"
                value-format="yyyy-MM-dd"
                style="margin-top: 20px;margin-left: 20px;width: 434px"/>
              <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
                <el-button v-waves class="filter-item" type="primary" style="float: right" @click="handleFilter">{{ $t('public.search') }}</el-button>
              </div>
              <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 140px" @click="visible2 = !visible2"><svg-icon icon-class="shaixuan" style="margin-right: 6px"/>{{ $t('public.filter') }}</el-button>
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
        <el-table-column :label="$t('public.id')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.moveNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Storagemove.title')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('Storagemove.moveNumber')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.moveNumber }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('Storagemove.applicationName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.applicationName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Storagemove.requestDeptId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.requestDeptName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Storagemove.moveInRepository')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.moveInRepositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Storagemove.requestArrivalDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.requestArrivalDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Storagemove.moveOutRepository')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.moveOutRepositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Storagemove.judgeStat')" :resizable="false" align="center" min-width="150">
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
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-button v-waves class="filter-item" type="success" style="width: 100px;float: left;margin-bottom: 10px" @click="handleConfirm">{{ $t('Hmodule.sure') }}</el-button>
    </el-card>
  </el-dialog>
</template>

<script>
import { searchstockArrival } from '@/api/StockArrival'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchlist } from '@/api/Storagemove'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import MyEmp from './MyEmp'
import MySupplier from './MySupplier'
import MyRepository from './MyRepository2'
import MyDepot from './MyDepot'
var _that
export default {
  directives: { waves },
  components: { MyEmp, Pagination, MySupplier, MyRepository, MyDepot },
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
        1: _that.$t('updates.cgdd'),
        2: _that.$t('Hmodule.Nosource')
      }
      return statusMap[status]
    }
  },
  props: {
    movecontrol: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      depotcontrol: false,
      // 调入仓库
      moveInRepository: '',
      // 调出仓库
      moveOutRepository: '',
      // 控制调出仓库选择窗口
      repositorycontrol: false,
      // 选择框控制
      employeeVisible: this.movecontrol,
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
        isActive: 1,
        businessStat: 4
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
    movecontrol() {
      this.employeeVisible = this.movecontrol
      this.getlist()
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 调入仓库focus事件触发
    handlechooseDep() {
      this.depotcontrol = true
    },
    depotname(val) {
      this.moveInRepository = val.repositoryName
      this.getemplist.moveInRepository = val.id
    },
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.moveOutRepository = val.repositoryName
      this.getemplist.moveOutRepository = val.id
    },
    // 更新采购类型
    updatecountry() {
      this.getlist()
    },
    getlist() {
      // 物料需求计划列表数据
      this.listLoading = true
      searchlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          // 判断数组中产品过检数量 - 已入库数量是否小于0
          // console.log('处理前', this.list)
          console.log('处理后', this.list)
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
      this.moveInRepository = ''
      this.getemplist.moveInRepository = ''
    },
    restFilter2() {
      this.moveOutRepository = ''
      this.getemplist.moveOutRepository = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      searchstockArrival(this.getemplist).then(res => {
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
      this.$router.push('/StockArrival/AddStockArrival')
    },
    // 选择主生产计划数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    async handleConfirm() {
      this.employeeVisible = false
      console.log('1231231', this.choosedata)
      const movedata = this.choosedata.storageMoveDetailConfirmVos
      // const number = this.choosedata.number
      const moveDetail = movedata.map(function(item) {
        return {
          productCode: item.productCode,
          productName: item.productName,
          productType: item.typeName,
          typeName: item.productType,
          type: item.type,
          typeId: item.type,
          // unit: item.unit,
          color: item.color,
          costPrice: item.movePrice,
          sendQuantity: item.moveQuantity,
          actualQuantity: item.actualQuantity,
          diffQuantity: Number(item.moveQuantity) - Number(item.actualQuantity),
          diffMoney: (Number(item.moveQuantity) - Number(item.actualQuantity)) * item.movePrice,
          isnew: 0
        }
      })
      console.log(moveDetail)
      this.$emit('move', moveDetail)
      this.$emit('allmoveinfo', this.choosedata)
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
