<template>
  <el-dialog :visible.sync="productVisible" :control="control" :close-on-press-escape="false" :title="$t('Hmodule.xzsp')" top="10px" append-to-body @close="$emit('update:control', false)">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
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
        <el-table-column :label="$t('Product.code')" :resizable="false" prop="code" align="center" >
          <template slot-scope="scope">
            <span>{{ scope.row.productCode }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Product.productname')" :resizable="false" prop="ProductName" align="center" >
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Product.typeid')" :resizable="false" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.productTypeName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Product.color')" :resizable="false" prop="color" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.color }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('updates.cgdyj')" :resizable="false" prop="price" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <!-- <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" style="padding: 0" @pagination="getlist" /> -->
      <span slot="footer" class="dialog-footer">
        <el-button v-waves type="success" style="text-align: center;" @click="handleAddTo">{{ $t('Hmodule.sure') }}</el-button>
      </span>
  </div></el-dialog>
</template>

<script>
import { productlist, searchEmpCategory2 } from '@/api/Product'
import { search } from '@/api/Supplier'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import MySupplier from '../../Product/components/MySupplier'
import MyTree from '../../Product/components/MyTree' // Secondary package based on el-pagination
// eslint-disable-next-line no-unused-vars
var _that
export default {
  directives: { waves },
  components: { MyTree, MySupplier, Pagination },
  filters: {
    genderFilter(status) {
      const statusMap = {
        1: '男',
        2: '女'
      }
      return statusMap[status]
    }
  },
  props: {
    control: {
      type: Boolean,
      default: false
    },
    datalist: {
      type: Number,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      // 供应商回显
      supplierId: '',
      // 供货商控制
      empcontrol: false,
      // 规格型号数据
      types: [],
      // 物品分类控制
      treecontrol: false,
      // 物品分类回显
      categoryid: '',
      // 物品选择框控制
      productVisible: this.control,
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
      listLoading: false,
      // 物品列表查询加展示参数
      getemplist: {
        id: this.datalist,
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  watch: {
    control() {
      this.productVisible = this.control
      console.log(this.control)
      this.getlist()
    },
    datalist() {
      this.getemplist.id = this.datalist
      this.getlist()
    }
  },
  created() {
    // this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getlist() {
      // 商品列表数据
      this.listLoading = true
      search(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          console.log('res.data', res.data)
          this.list = res.data.data.content.list[0].supplierDetailVos
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      // 规格型号数据
      searchEmpCategory2(2).then(res => {
        if (res.data.ret === 200) {
          this.types = res.data.data.content.list
        }
      })
    },
    restFilter() {
      this.categoryid = ''
      this.getemplist.categoryid = ''
    },
    restFilter2() {
      this.supplierId = ''
      this.getemplist.supplierId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      productlist(this.getemplist).then(res => {
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
      this.moreaction = val
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
      this.productVisible = false
      console.log(this.moreaction)
      const productDetail = this.moreaction
      console.log(productDetail)
      this.$emit('product', productDetail)
    }
  }
}
</script>

<style scoped>
  .ERP-container {
    margin: 50px 30px;
  }
  .filter-item{
    width: 150px;
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
