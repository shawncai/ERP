<template>
  <el-dialog :visible.sync="productVisible" :control="control" :close-on-press-escape="false" :title="$t('Hmodule.xzsp')" top="10px" append-to-body @close="$emit('update:control', false)">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <el-input v-model="getemplist.code" :placeholder="$t('Product.code')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.productname" :placeholder="$t('Product.productname')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <!-- <el-input v-model="supplierid" :placeholder="$t('Product.supplierid')" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechoose"/> -->
      <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
      <el-select v-model="getemplist.categoryid" :placeholder="$t('Hmodule.wpfl')" class="filter-item" clearable>
        <!-- <el-option :label="$t('otherlanguage.zc')" value="1"/> -->
        <el-option :label="$t('otherlanguage.pj')" value="2"/>
        <el-option :label="$t('otherlanguage.jgj')" value="3"/>
        <el-option :label="$t('otherlanguage.xhp')" value="4"/>
        <el-option :label="$t('otherlanguage.dc')" value="5"/>
      </el-select>
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
      :height="tableHeight"
      :key="tableKey"
      :data="list"
      :row-key="getRowKeys"
      size="small"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="selectService">
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
    selected: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableHeight: 200,

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
      // 测试多选选中
      curPageSelected: [], // 存放当前页选中项
      formValidate: {},
      curPageSelectedName: [] // 存放当前页名字
    }
  },
  computed: {
    curPageAllIds() { // 存放当前页所有数据
      return this.list
    }
    // curPageAllNames() {
    //   return this.list.map((item) => item.productName)
    // }
  },
  watch: {
    control() {
      this.productVisible = this.control
      // console.log(this.control)
      this.formValidate.serviceIdList = []
      if (this.control) {
        this.formValidate.serviceIdList = this.selected
        console.log('this.formValidate.serviceIdList============2222', this.formValidate.serviceIdList)
      }
      this.getlist()
      setTimeout(() => {
        this.tableHeight = window.innerHeight - this.$refs.multipleTable.$el.offsetTop - 180
      }, 100)
    },
    personalform() {
      this.query = this.personalform
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getlist() {
      this.list = []
      // 商品列表数据
      this.listLoading = true
      this.getemplist.searchRepositoryId = this.query.saleRepositoryId
      chooseProduct(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = this.selectFromId(res.data.data.content.list, this.formValidate.serviceIdList)
          this.total = res.data.data.content.totalCount
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
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
    },
    // 批量操作
    handleSelectionChange(rows) {
      this.moreaction = rows
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
    // 物品选择添加123
    handleAddTo() {
      this.productVisible = false
      console.log('this.formValidate.serviceIdList=================', this.formValidate.serviceIdList)
      for (const i in this.formValidate.serviceIdList) {
        if (this.formValidate.serviceIdList[i].isBatch === 2) {
          this.formValidate.serviceIdList[i].batch = '不使用'
        }
      }
      const productDetail = this.formValidate.serviceIdList.map(function(item) {
        return {
          id: item.id,
          productCode: item.code || item.productCode,
          productName: item.productName || item.productName,
          category: item.categoryId || item.category,
          categoryName: item.category || item.categoryName,
          mytype: item.typeId,
          type: (item.typeId === null || item.typeId === undefined || item.typeId instanceof String) ? item.type : item.typeId,
          typeId: item.productType || item.typeId,
          color: item.color || item.color,
          unit: item.purMeasu || item.unit,
          performanceScore: item.kpiGrade || item.performanceScore,
          productScore: item.point || item.productScore,
          quantity: 0,
          salePrice: item.salePrice || item.salePrice,
          costPrice: item.costPrice || item.costPrice,
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
      this.$refs.multipleTable.clearSelection()
      // console.log(productDetail)
      this.$emit('product', productDetail)
    },
    // 去重
    deWeightTwo(arr2) {
      const temp = []
      arr2.forEach(function(a) {
        var check = temp.every(function(b) {
          return a.id !== b.id
        })
        check ? temp.push(a) : ''
      })
      return temp
    },
    // 保存分页选中
    selectService(selection) {
      this.curPageSelected = selection
      // otherPageIds其他页面选中项 为所有选中项减去当前页所有数据
      const otherPageIds = this._.without(this.formValidate.serviceIdList, ...this.curPageAllIds)
      // 最终选择项为
      this.formValidate.serviceIdList = this._.union(otherPageIds, this.curPageSelected)
      this.formValidate.serviceIdList = this.deWeightTwo(this.formValidate.serviceIdList)
      console.log('选中的项目', this.formValidate.serviceIdList)
    },
    // 根据id选中
    selectFromId(showList, selectList) {
      if (selectList) {
        for (const i in showList) {
          if (selectList.findIndex(item => item.id === showList[i].id) > -1) {
            this.$refs.multipleTable.toggleRowSelection(showList[i], true)
            // showList[i].checked = true
          }
        }
      }
      return showList
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
