<template>
  <el-dialog :visible.sync="productVisible" :control="control" :close-on-press-escape="false" :title="$t('Hmodule.xzsp')" top="10px" append-to-body @close="$emit('update:control', false)">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <el-input v-model="getemplist.code" :placeholder="$t('Product.code')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.productname" :placeholder="$t('Product.productname')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <!-- <el-input v-model="supplierid" :placeholder="$t('Product.supplierid')" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechoose"/> -->
      <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
      <el-input v-model="categoryid" :placeholder="$t('Hmodule.wpfl')" class="filter-item" clearable @focus="treechoose" @clear="restFilter"/>
      <my-tree :treecontrol.sync="treecontrol" @tree="tree"/>
      <!-- 更多搜索条件下拉栏 -->
      <el-popover
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
      </el-popover>
      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </div>
    <!-- 列表开始 -->
    <el-table
      v-loading="listLoading"
      ref="multipleTable"
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
      <el-table-column :label="$t('Product.code')" :resizable="false" prop="code" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Product.productname')" :resizable="false" prop="ProductName" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.productName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Product.categoryid')" :resizable="false" prop="category" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.category }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Product.typeid')" :resizable="false" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.productType }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Product.color')" :resizable="false" prop="color" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.color }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Product.kpigrade')" :resizable="false" prop="kpiGrade" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.kpiGrade }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Product.point')" :resizable="false" prop="point" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.point }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Product.saleprice')" :resizable="false" prop="costPrice" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.salePrice }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('Product.purchaseprice')" :resizable="false" prop="purchasePrice" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.purchasePrice }}</span>
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('Product.createid')" :resizable="false" prop="createName" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.createName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Product.createTime')" :resizable="false" prop="createTime" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 列表结束 -->
    <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" style="padding: 0" @pagination="getlist" />
    <span slot="footer" class="dialog-footer">
      <el-button v-waves type="success" style="text-align: center;" @click="handleAddTo">{{ $t('Hmodule.sure') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { searchEmpCategory2, chooseProduct } from '@/api/Product'
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
    personalform: {
      type: Object,
      default: null
    },
    checklist: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      checklistprop: this.checklist,
      getRowKeys(row) {
        return row.code
      },
      select_orderId: [],
      select_order_number: [],
      // 仓库数据
      query: this.personalform,
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
      listLoading: true,
      // 物品列表查询加展示参数
      getemplist: {
        productid: '',
        code: '',
        productname: '',
        categoryid: '',
        typeid: '',
        isactive: '',
        Productid: '',
        pagenum: 1,
        pagesize: 10
      },
      // 根据仓库查询仓库存量
      queryemplist: {
        pagenum: 1,
        pagesize: 10,
        repositoryId: 0
      },
      // 根据id查物品详情
      detailList: {
        pagenum: 1,
        pagesize: 10
      },
      flagarr: [],
      myarr: []
    }
  },
  watch: {
    control() {
      this.productVisible = this.control
      // console.log(this.control)
      setTimeout(() => {
        this.$refs.multipleTable.clearSelection()
      }, 0)
      this.flagarr = []
      this.moreaction = []
      this.getlist()
    },
    personalform() {
      this.query = this.personalform
    },
    checklist() {
      this.checklistprop = this.checklist.map(item => {
        return item.productCode
      })
      console.log(this.checklistprop)
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 设置默认选中
    memoryChecked() {
      console.log('我执行啦')
      this.list.forEach((row, index) => {
        if (this.checklistprop.includes(row.code)) {
          this.$refs.multipleTable.toggleRowSelection(row, true)
          this.myarr.push(row.code)
          this.flagarr = Array.from(new Set(this.myarr))
          console.log('this.flagarr=====================>', this.flagarr)
        } else {
          this.$refs.multipleTable.toggleRowSelection(row, false)
        }
      })
    },
    getlist() {
      this.list = []
      // 商品列表数据
      this.listLoading = true
      this.getemplist.searchRepositoryId = this.query.adjustRepositoryId
      chooseProduct(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          this.memoryChecked()
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })

      // querycount(this.queryemplist).then(res => {
      //   if (res.data.ret === 200) {
      //     const result = res.data.data.content.list
      //     for (const i in result) {
      //       this.detailList.code = result[i].code
      //       productlist(this.detailList).then(res => {
      //         this.list.push(res.data.data.content.list[0])
      //         console.log(this.list)
      //       })
      //     }
      //     this.listLoading = false
      //   }
      // })
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
      this.supplierid = ''
      this.getemplist.supplierid = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      chooseProduct(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          console.log(res.data.data.content.list)
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          this.memoryChecked()
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
    },
    // 批量操作
    handleSelectionChange(rows) {
      const obj = {}
      const processaction = rows.reduce((cur, next) => {
        obj[next.id] ? '' : obj[next.id] = true && cur.push(next)
        return cur
      }, [])
      this.moreaction = processaction
      console.log('多选菜单', this.moreaction)

      this.select_order_number = this.moreaction.length
      this.select_orderId = []
      if (rows) {
        rows.forEach(row => {
          if (row) {
            this.select_orderId.push(row.code)
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
      console.log('this.checklistprop', this.checklistprop)
      console.log('this.moreaction', this.moreaction)
      console.log('this.select_orderId', this.select_orderId)
      this.productVisible = false
      console.log(this.moreaction)
      const obj = {}
      const processaction = this.moreaction.reduce((cur, next) => {
        obj[next.id] ? '' : obj[next.id] = true && cur.push(next)
        return cur
      }, [])
      for (const i in this.processaction) {
        if (this.processaction[i].isBatch === 2) {
          this.processaction[i].batch = '不使用'
        }
      }
      const productDetail = processaction.map(function(item) {
        return {
          productId: item.id,
          productType: item.productType,
          productCode: item.code,
          productName: item.productName,
          category: item.categoryId,
          categoryName: item.category,
          type: item.typeId,
          typeId: item.typeId,
          color: item.color,
          unit: item.purMeasu,
          performanceScore: item.kpiGrade,
          productScore: item.point,
          quantity: 0,
          salePrice: item.salePrice,
          costPrice: item.costPrice,
          costMoney: 0,
          includeTaxMoney: 0,
          taxRate: 0,
          taxMoney: 0,
          money: 0,
          includeTaxCostMoney: '0.00',
          discount: 0,
          discountMoney: 0,
          taxprice: '0.00',
          alreadyApplicationQuantity: 0,
          alreadyProduceQuantity: 0,
          allQuantity: 0,
          batch: item.batch,
          discountRate: 0
        }
      })
      const cancelid = []
      this.checklistprop.forEach(item => {
        if (this.flagarr.includes(item) && !this.moreaction.includes(item)) {
          cancelid.push(item)
        }
      })
      console.log('取消的id', cancelid)
      // console.log(productDetail)
      this.$store.dispatch('getmyflagApproval', cancelid)
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
