<template>
  <el-dialog :visible.sync="employeeVisible" :advancecontrol="advancecontrol" :close-on-press-escape="false" top="10px" title="选择预售商品" append-to-body width="1100px" @close="$emit('update:advancecontrol', false)">
    <el-card class="box-card" style="margin-top: 15px;height: 60px;padding-left:0 " shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" style="margin-top: -9px">
          <el-col :span="4">
            <el-form-item>
              <el-input v-model="getemplist.productName" :placeholder="$t('Advancemanage.productName')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 5px">
            <el-form-item>
              <el-input v-model="getemplist.productCode" placeholder="物品编号" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 20px">
            <el-select v-model="getemplist.advanceMode" :value="getemplist.advanceMode" placeholder="预售模式" clearable>
              <el-option value="1" label="一口价"/>
              <el-option value="2" label="阶梯价"/>
            </el-select>
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
        @selection-change="handleCurrentChange">
        <el-table-column
          type="selection"
          width="55"
          align="center"/>
        <el-table-column :label="$t('public.id')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Advancemanage.productCode')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productCode }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Advancemanage.productName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Advancemanage.productType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productType }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Advancemanage.color')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.color }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Advancemanage.advanceMode')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.advanceMode | advanceModeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Advancemanage.depositBegintime')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.depositBegintime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Advancemanage.depositEndtime')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.depositEndtime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Advancemanage.finalBegintime')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.finalBegintime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Advancemanage.finalEndtime')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.finalEndtime }}</span>
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
import { advancelist } from '@/api/Advancemanage'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { productlist } from '@/api/public'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import MyEmp from './MyEmp'
import DetailList from './DetailList'
import MyDialog from './MyDialog'
import MySupplier from './MySupplier'
var _that
export default {
  directives: { waves },
  components: { MyDialog, DetailList, MyEmp, Pagination, MySupplier },
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
    advanceModeFilter(status) {
      const statusMap = {
        1: '一口价',
        2: '阶梯价'
      }
      return statusMap[status]
    }
  },
  props: {
    advancecontrol: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 选择框控制
      employeeVisible: this.advancecontrol,
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
      // 经办人回显
      handlePersonId: '',
      // 经办人控制框
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
    advancecontrol() {
      this.employeeVisible = this.advancecontrol
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
    // 更新采购类型
    updatecountry() {
      this.getlist()
    },
    getlist() {
      // 物料需求计划列表数据
      this.listLoading = true
      advancelist(this.getemplist).then(res => {
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
    },
    restFilter2() {
      this.handlePersonId = ''
      this.getemplist.handlePersonId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      advancelist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
    },
    // 经办人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 经办人回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.getemplist.handlePersonId = val.id
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
      this.$router.push('/Advancemanage/AddAdvanceProduct')
    },
    // 选择主生产计划数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    async handleConfirm() {
      console.log(this.choosedata)
      this.employeeVisible = false
      const list = await Promise.all(this.choosedata.map(function(item) {
        return productlist(item.productCode)
      }))
      const advanceDetail = this.choosedata.map(function(item) {
        return {
          productCode: item.productCode,
          productName: item.productName,
          productType: item.productType,
          typeId: item.typeId,
          unit: item.unit,
          color: item.color,
          costMoney: '0.00',
          includeTaxMoney: '0.00',
          taxRate: '0.00',
          taxMoney: '0.00',
          money: '0.00',
          includeTaxCostMoney: '0.00',
          carCode: '',
          batteryCode: '',
          motorCode: '',
          discount: 0,
          discountMoney: 0,
          quantity: '0.00',
          salePrice: '0.00',
          costPrice: '0.00'
        }
      })
      console.log(list)
      for (let i = 0; i < this.choosedata.length; i++) {
        for (let j = 0; j < list.length; j++) {
          if (advanceDetail[i].productCode === list[j].data.data.content.list[0].code) {
            advanceDetail[i].kpiGrade = list[j].data.data.content.list[0].kpiGrade
            advanceDetail[i].point = list[j].data.data.content.list[0].point
            advanceDetail[i].salePrice = list[j].data.data.content.list[0].salePrice
            advanceDetail[i].costPrice = list[j].data.data.content.list[0].costPrice
            advanceDetail[i].category = list[j].data.data.content.list[0].category
            advanceDetail[i].categoryId = list[j].data.data.content.list[0].categoryId
            advanceDetail[i].productCategory = list[j].data.data.content.list[0].category
          }
        }
      }
      console.log(advanceDetail)
      this.$emit('advance', advanceDetail)
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
