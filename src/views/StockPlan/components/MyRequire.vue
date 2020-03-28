<template>
  <el-dialog :visible.sync="employeeVisible" :requirecontrol="requirecontrol" :close-on-press-escape="false" top="10px" title="选择采购需求单" append-to-body width="1100px" @close="$emit('update:requirecontrol', false)">
    <el-card class="box-card" style="margin-top: 15px;height: 60px;padding-left:0 " shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" style="margin-top: -9px">
          <el-col :span="4">
            <el-form-item>
              <el-select v-model="getemplist.categoryId" :placeholder="$t('Hmodule.wpfl')" class="filter-item" clearable>
                <el-option :label="$t('otherlanguage.zc')" value="1"/>
                <el-option :label="$t('otherlanguage.pj')" value="2"/>
                <el-option :label="$t('otherlanguage.jgj')" value="3"/>
                <el-option :label="$t('otherlanguage.xhp')" value="4"/>
                <el-option :label="$t('otherlanguage.dc')" value="5"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 5px">
            <el-form-item>
              <el-input v-model="getemplist.productName" placeholder="物料名称" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handleAddproduct"/>
              <my-detail :control.sync="control" @productdata="productdata"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 20px">
            <el-form-item>
              <el-select v-model="getemplist.isPlan" :value="getemplist.isPlan" class="filter-item" placeholder="是否已生成采购计划" clearable>
                <el-option :label="$t('updates.yes')" value="1"/>
                <el-option :label="$t('updates.no')" value="2"/>
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
              <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="-"
                unlink-panels
                start-placeholder="需求日期开始"
                end-placeholder="需求日期结束"
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
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          align="center"/>
        <el-table-column :label="$t('public.id')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.materialsRequireNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.productName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.productCode')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productCode }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.categoryId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productCategory }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.productType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productType }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.color')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.color }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.unit')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.unit }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.requireQuantity')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.requireQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.inventoryQuantity')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.inventoryQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.shouldStockQuantity')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.shouldStockQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.stockAdvanceday')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.stockAdvanceday }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.requireDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.requireDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.isPlan')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.isPlaned | isPlanedFilter }}</span>
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
import { stockrequirelist } from '@/api/StockRequire'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import { getStockInfoByProduct } from '@/api/Supplier'
import MyTree from '../../Product/components/MyTree'
import MyDetail from '../../StockRequire/components/MyDetail'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  directives: { waves },
  components: { MyDetail, MyTree, Pagination },
  filters: {
    isPlanedFilter(status) {
      const statusMap = {
        1: _that.$t('updates.yes'),
        2: _that.$t('updates.no')
      }
      return statusMap[status]
    }
  },
  props: {
    requirecontrol: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 选择框控制
      employeeVisible: this.requirecontrol,
      // 选择数据
      choosedata: '',
      // 物料名称控制
      control: false,
      // 物品分类回显
      categoryId: '',
      // 控制物品分类
      treecontrol: false,
      // 详情组件数据
      detailvisible: false,
      // 更多搜索条件问题
      visible2: false,
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
      // 采购申请列表查询加展示参数
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
    requirecontrol() {
      this.employeeVisible = this.requirecontrol
      this.getlist()
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 物料名称focus
    handleAddproduct() {
      this.control = true
    },
    // 物品名称数据
    productdata(val) {
      this.getemplist.productName = val.productName
    },
    // 物品分类focus
    treechoose() {
      this.treecontrol = true
    },
    // 物品分类数据
    tree(val) {
      this.categoryId = val.categoryName
      this.getemplist.categoryId = val.id
    },
    getlist() {
      // 物料需求计划列表数据
      this.listLoading = true
      stockrequirelist(this.getemplist).then(res => {
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
      this.categoryId = ''
      this.getemplist.categoryId = ''
    },
    restFilter2() {
      this.workCenterId = ''
      this.getemplist.workCenterId = ''
    },
    restFilter3() {
      this.producePlanNumber = ''
      this.getemplist.producePlanNumber = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      if (this.date === null || this.date === '') {
        this.getemplist.beginTime = null
        this.getemplist.endTime = null
      } else {
        this.getemplist.beginTime = this.date[0]
        this.getemplist.endTime = this.date[1]
      }
      stockrequirelist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
    },
    // 批量操作
    handleSelectionChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    async handleConfirm() {
      this.employeeVisible = false
      console.log('123', this.choosedata)
      const requiredata = this.choosedata
      const requireDetail = requiredata.map(function(item) {
        return {
          productCode: item.productCode,
          productName: item.productName,
          productType: item.productType,
          typeId: item.typeId,
          unit: item.unit,
          color: item.color,
          basicQuantity: item.requireQuantity,
          planDeliveryDate: item.requireDate,
          applyReason: '',
          sourceNumber: item.materialsRequireNumber,
          supplierId: '',
          supplierName: '',
          basicPrice: 0,
          planMoney: '0.00',
          orderQuantity: '0.00',
          stockRequireId: item.id,
          requireDate: item.requireDate,
          sourceSerialNumber: item.id,
          requireQuantity: item.requireQuantity,
          planedQuantity: item.planedQuantity,
          planQuantity: item.requireQuantity - item.planedQuantity
        }
      })
      const list = await Promise.all(requireDetail.map(function(item) {
        return getStockInfoByProduct(item.productCode, item.planQuantity).then(res => {
          for (let i = 0; i < res.data.data.content.length; i++) {
            res.data.data.content[i].sourceNumber = item.sourceNumber
          }
          return res.data.data.content
        })
      }))
      const list2 = []
      for (let i = 0; i < list.length; i++) {
        for (let m = 0; m < list[i].length; m++) {
          list[i][m].basicPrice = list[i][m].price
          list[i][m].requireQuantity = list[i][m].quantity
          list[i][m].planQuantity = list[i][m].quantity
          list[i][m].basicQuantity = list[i][m].quantity
          list2.push(list[i][m])
        }
      }
      console.log('list', list)
      console.log('list2', list2)
      this.$emit('require', list2)
      this.$emit('require2', list2)
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
