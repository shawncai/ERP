<template>
  <el-dialog :visible.sync="productVisible" :control="control" :close-on-press-escape="false" :title="$t('Hmodule.xzsp')" top="10px" append-to-body @close="$emit('update:control', false)">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <el-input v-model="getemplist.code" :placeholder="$t('Product.code')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.productname" :placeholder="$t('Product.productname')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <!-- <el-input v-model="supplierid" :placeholder="$t('Product.supplierid')" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechoose"/> -->
      <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
      <el-select v-model="getemplist.categoryid" :placeholder="$t('Hmodule.wpfl')" class="filter-item" clearable>
        <el-option :label="$t('otherlanguage.zc')" value="1"/>
        <el-option :label="$t('otherlanguage.pj')" value="2"/>
        <el-option :label="$t('otherlanguage.jgj')" value="3"/>
        <el-option :label="$t('otherlanguage.xhp')" value="4"/>
        <el-option :label="$t('otherlanguage.dc')" value="5"/>
        <el-option :label="$t('otherlanguage.xss')" value="6"/>
        <el-option :label="$t('otherlanguage.pjj')" value="7"/>
        <el-option :label="$t('otherlanguage.hj')" value="8"/>
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
      <el-table-column :label="$t('updates.kcsl')" :resizable="false" prop="existStock" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.existStock }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('Product.point')" :resizable="false" prop="point" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.point }}</span>
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('StockAlarm.salePrice')" :resizable="false" prop="costPrice" align="center" width="100">
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
      <div style="padding-top: 10px; text-align: left;">{{ $t('update4.yxz') }}{{ tiaoshu }}{{ $t('update4.tiao') }} </div>
      <el-button v-waves type="success" style="text-align: center;" @click="handleAddTo">{{ $t('Hmodule.sure') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { chooseCustomerProduct, customerlist2, customerProductList } from '@/api/Customer'
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
    }
  },
  data() {
    return {
      tiaoshu: 0,
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
      // 根据id查物品详情11
      detailList: {
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  watch: {
    control() {
      this.productVisible = this.control
      // console.log(this.control)
      this.tableKey = 0
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
    async  getlist() {
      this.list = []
      // 商品列表数据
      this.listLoading = true
      console.log('this.query', this.query)
      this.getemplist.searchRepositoryId = this.query.saleRepositoryId
      this.getemplist.customerId = this.query.customerId
      console.log('this.$store.getters.countryId', this.$store.getters.countryId)
      const customerData = await new Promise((resolve, reject) => {
        customerlist2(this.getemplist.customerId).then(res => {
          resolve(res.data.data.content)
        })
      })
      console.log('customerData', customerData)
      this.getemplist.levelId = customerData ? customerData.level : ''

      if (this.$store.getters.countryId === 1 && this.getemplist.levelId) {
        const that = this

        const judgeIscustomerGroup = await new Promise((resolve, reject) => {
          customerProductList(this.getemplist).then(res => {
            resolve(res.data.data.content)
          })
        })

        console.log('judgeIscustomerGroup', judgeIscustomerGroup)
        if (judgeIscustomerGroup.list.length !== 0) {
          chooseCustomerProduct(this.getemplist).then(res => {
            if (res.data.ret === 200) {
              that.list = res.data.data.content.list
              that.total = res.data.data.content.totalCount
            }
            that.listLoading = false
          })
        } else {
          chooseProduct(that.getemplist).then(res => {
            if (res.data.ret === 200) {
              that.list = res.data.data.content.list
              that.total = res.data.data.content.totalCount
            }
            that.listLoading = false
          })
        }
      } else {
        const that = this
        chooseProduct(that.getemplist).then(res => {
          if (res.data.ret === 200) {
            that.list = res.data.data.content.list.filter(item => {
              return item.existStock > 0
            })
            that.total = res.data.data.content.totalCount
          }
          setTimeout(() => {
            that.listLoading = false
          }, 0.5 * 100)
        })
      }

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
    async  handleFilter() {
      this.getemplist.pagenum = 1
      this.getemplist.searchRepositoryId = this.query.saleRepositoryId
      this.getemplist.customerId = this.query.customerId
      const customerData = await new Promise((resolve, reject) => {
        customerlist2(this.getemplist.customerId).then(res => {
          resolve(res.data.data.content)
        })
      })
      console.log('customerData', customerData)
      this.getemplist.levelId = customerData.level
      if (this.$store.getters.countryId === 1 && this.getemplist.levelId) {
        const that = this

        const judgeIscustomerGroup = await new Promise((resolve, reject) => {
          customerProductList(this.getemplist).then(res => {
            resolve(res.data.data.content)
          })
        })

        console.log('judgeIscustomerGroup', judgeIscustomerGroup)
        if (judgeIscustomerGroup.list.length !== 0) {
          chooseCustomerProduct(this.getemplist).then(res => {
            console.log('eeee')
            if (res.data.ret === 200) {
              that.list = res.data.data.content.list
              that.total = res.data.data.content.totalCount
            }
            that.listLoading = false
          })
        } else {
          chooseProduct(that.getemplist).then(res => {
            if (res.data.ret === 200) {
              that.list = res.data.data.content.list
              that.total = res.data.data.content.totalCount
            }
            that.listLoading = false
          })
        }
      } else {
        const that = this
        chooseProduct(that.getemplist).then(res => {
          if (res.data.ret === 200) {
            that.list = res.data.data.content.list.filter(item => {
              return item.existStock > 0
            })
            that.total = res.data.data.content.totalCount
          }
          setTimeout(() => {
            that.listLoading = false
          }, 0.5 * 100)
        })
      }
    },
    // 批量操作
    handleSelectionChange(rows) {
      this.moreaction = rows
      this.tiaoshu = this.moreaction.length
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
      this.productVisible = false
      console.log(this.moreaction)
      for (const i in this.moreaction) {
        if (this.moreaction[i].isBatch === 2) {
          this.moreaction[i].batch = '不使用'
        }
      }
      const productDetail = this.moreaction.map(function(item) {
        return {
          productCode: item.code,
          productName: item.productName,
          category: item.categoryId,
          categoryName: item.category,
          type: item.typeId,
          typeId: item.productType,
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
      this.$refs.multipleTable.clearSelection()
      // console.log(productDetail)
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
