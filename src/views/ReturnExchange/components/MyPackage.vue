<template>
  <el-dialog :visible.sync="productVisible" :packagecontrol="packagecontrol" :close-on-press-escape="false" width="1100px" top="10px" title="选择赠品套餐" append-to-body @close="$emit('update:packagecontrol', false)">
    <el-card class="box-card" style="margin-top: 15px;height: 60px;padding-left:0 " shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" style="margin-top: -9px">
          <el-col :span="5">
            <el-form-item>
              <el-input v-model="getemplist.productName" :placeholder="$t('Package.productName')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left: 10px">
            <el-form-item>
              <el-input v-model="getemplist.productCode" placeholder="主商品编号" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 20px">
            <!-- 搜索按钮 -->
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 新建操作 -->
      <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </el-card>
    <!-- 列表开始 -->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        :row-key="getRowKeys"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          :reserve-selection="true"
          type="selection"
          width="55"
          align="center"/>
        <el-table-column :label="$t('public.id')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Package.packageName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.packageName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Package.isEffective')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.isEffective | isEffectiveFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Package.createPersonName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Package.createDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createDate }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-button v-waves class="filter-item" type="success" style="width: 100px;float: left;margin-bottom: 10px" @click="handleAddTo">{{ $t('Hmodule.sure') }}</el-button>

      <!--修改结束=================================================-->
    </el-card>
  </el-dialog>
</template>

<script>
import { packageList, deletePackage } from '@/api/Package'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  directives: { waves },
  components: { Pagination },
  filters: {
    isEffectiveFilter(status) {
      const statusMap = {
        1: '应用',
        2: '禁用'
      }
      return statusMap[status]
    }
  },
  props: {
    packagecontrol: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      getRowKeys(row) {
        return row.id
      },
      select_orderId: [],
      select_order_number: [],
      // 主商品数据
      // query: this.productnumber,
      // 供应商回显
      supplierid: '',
      // 供货商控制
      empcontrol: false,
      // 规格型号数据
      types: [],
      // 物品分类控制
      treecontrol: false,
      // 物品分类回显
      categoryid: '',
      // 物品选择框控制
      productVisible: this.packagecontrol,
      // 更多搜索条件问题
      visible2: false,
      // 批量操作
      moreaction: '',
      // 表格数据
      list: [],
      // 表格数据条数
      total: 0,
      // 表格识别
      tableKey: 0,
      // 加载表格
      listLoading: true,
      // 物品列表查询加展示参数
      getemplist: {
        productCode: '',
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  watch: {
    packagecontrol() {
      this.productVisible = this.packagecontrol
      console.log(this.packagecontrol)
      this.getlist()
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getlist() {
      // 商品列表数据
      this.listLoading = true
      packageList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    restFilter() {
      this.categoryid = ''
      this.getemplist.categoryid = ''
    },
    restFilter2() {
      this.supplierid = ''
      this.getemplist.supplierid = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      packageList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
    },
    // 单选操作
    handleSelectionChange(rows) {
      this.moreaction = rows
      this.select_order_number = this.moreaction.length
      this.select_orderId = []
      if (rows) {
        rows.forEach(row => {
          if (row) {
            this.select_orderId.push(row.id)
          }
        })
      }
    },
    // 供应商输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 供应商列表返回数据
    supplierName(val) {
      console.log(val)
      this.supplierid = val.supplierName
      this.getemplist.supplierid = val.id
    },
    // 物品分类focus
    treechoose() {
      this.treecontrol = true
    },
    // 物品分类数据
    tree(val) {
      this.categoryid = val.categoryName
      this.getemplist.categoryid = val.id
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/Product/NewProduct')
      this.productVisible = false
    },
    // 物品选择添加
    handleAddTo() {
      console.log('this.moreaction', this.moreaction)
      const mainproducts = this.moreaction.map(item => {
        return {
          productCode: item.productCode,
          productName: item.productName,
          productType: item.productType,
          type: item.typeId,
          color: item.color,
          unit: item.unit,
          category: '',
          productCategoryName: '',
          kpiGrade: '',
          point: '',
          quantity: '1.00',
          salePrice: item.salePrice,
          taxPrice: item.salePrice,
          costPrice: '0.00',
          costMoney: '0.00',
          taxRate: '0.00',
          taxMoney: '0.00',
          money: '0.00',
          discount: '0.00',
          discountMoney: '0.00',
          includeTaxCostMoney: 0
        }
      })
      const switarr = this.moreaction.map(item => {
        return item.packageSubVos
      })

      const giftproducts = [].concat.apply([], switarr)
      console.log('giftproducts', giftproducts)
      const newgiftarr = giftproducts.map(item => {
        return {
          productCode: item.productCode,
          productName: item.productName,
          productType: item.productType,
          type: item.typeId,
          unit: '',
          color: '',
          category: '',
          productCategoryName: '',
          kpiGrade: '',
          point: '',
          quantity: '1.00',
          salePrice: '0.00',
          costPrice: '0.00',
          taxPrice: '0.00',
          costMoney: '0.00',
          taxRate: '0.00',
          taxMoney: '0.00',
          money: '0.00',
          discount: '0.00',
          discountMoney: '0.00',
          includeTaxCostMoney: 0
        }
      })
      const productDetail = [...mainproducts, ...newgiftarr]
      this.productVisible = false
      this.$emit('packagedata', productDetail)
    }
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
