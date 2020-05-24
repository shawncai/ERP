<template>
  <el-dialog :visible.sync="productVisible" :packagecontrol="packagecontrol" :close-on-press-escape="false" top="10px" title="选择赠品套餐" append-to-body @close="$emit('update:packagecontrol', false)">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <!-- <el-input v-model="getemplist.code" :placeholder="$t('Product.code')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.productname" :placeholder="$t('Product.productname')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="supplierid" :placeholder="$t('Product.supplierid')" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechoose" @clear="restFilter2"/>
      <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/> -->
      <!-- 更多搜索条件下拉栏 -->
      <!-- <el-popover
        v-model="visible2"
        placement="bottom"
        width="500"
        trigger="click">
        <el-select v-model="getemplist.typeid" :placeholder="$t('Hmodule.qxzggxh')" clearable style="width: 40%;float: left;margin-left: 20px">
          <el-option
            v-for="(item, index) in types"
            :key="index"
            :label="item.categoryName"
            :value="item.id"
          />
        </el-select>
        <el-select v-model="getemplist.isactive" :placeholder="$t('Hmodule.qxzsxj')" clearable style="width: 40%;float: right;margin-right: 20px">
          <el-option :label="$t('Hmodule.s1')" value="1"/>
          <el-option :label="$t('Hmodule.x2')" value="2"/>
        </el-select>
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button v-waves class="filter-item" type="primary" style="float: right" @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover> -->
      <!-- 搜索按钮 -->
      <!-- <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button> -->
      <!-- 新建操作 -->
      <!-- <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button> -->
    </div>
    <!-- 列表开始 -->
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @current-change="handleSelectionChange">
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
    <!-- <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" style="padding: 0" @pagination="getlist" /> -->
    <span slot="footer" class="dialog-footer">
      <el-button v-waves type="success" style="text-align: center;" @click="handleAddTo">{{ $t('Hmodule.sure') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getPackage, deletePackage } from '@/api/Package'
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
    },
    productnumber: {
      type: String,
      default: null
    },
    packagerepository: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      query: {
        productCode: this.productnumber,
        repositoryId: this.packagerepository
      },
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
      console.log('this.productnumber', this.productnumber)
      this.query.productCode = this.productnumber
      this.query.repositoryId = this.packagerepository
      this.getlist()
    },
    productnumber() {

    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getlist() {
      console.log('this.query', this.query)
      // 商品列表数据
      this.listLoading = true
      this.getemplist = this.query
      getPackage(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
          // this.total = res.data.data.content.totalCount
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
      getPackage(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
    },
    // 单选操作
    handleSelectionChange(val) {
      console.log('val12222', val)
      this.moreaction = val
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
      this.productVisible = false
      const productDetail = this.moreaction.packageSubVos.map(function(item) {
        return {
          productCode: item.productCode,
          productName: item.productName,
          categoryName: '',
          category: '',
          type: item.typeId,
          typeName: item.productType,
          color: '',
          unit: '',
          salePrice: '0.00',
          money: '0.00',
          quantity: 0
        }
      })
      this.$emit('packagedata', productDetail)
      this.$emit('salePrice', this.moreaction.salePrice)
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
