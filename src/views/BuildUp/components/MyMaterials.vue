<template>
  <el-dialog :visible.sync="productVisible" :materialcontrol="materialcontrol" :close-on-press-escape="false" top="10px" title="选择商品" append-to-body @close="$emit('update:materialcontrol', false)">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <el-input v-model="getemplist.bomNumber" :placeholder="$t('MaterialsList.bomNumber')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="getemplist.bomTypeId" :value="getemplist.bomTypeId" class="filter-item" clearable>
        <el-option value="1" label="工艺BOM"/>
        <el-option value="2" label="设计BOM"/>
        <el-option value="3" label="制造BOM"/>
      </el-select>
      <!--      <el-input v-model="supplierid" :placeholder="$t('Product.supplierid')" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechoose"/>-->
      <!--      <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>-->
      <!--      <el-input v-model="categoryid" placeholder="物品分类" class="filter-item" clearable @focus="treechoose"/>-->
      <!--      <my-tree :treecontrol.sync="treecontrol" @tree="tree"/>-->
      <!-- 更多搜索条件下拉栏 -->
      <!--      <el-popover-->
      <!--        v-model="visible2"-->
      <!--        placement="bottom"-->
      <!--        width="500"-->
      <!--        trigger="click">-->
      <!--        <el-select v-model="getemplist.typeid" placeholder="请选择规格型号" clearable style="width: 40%;float: left;margin-left: 20px">-->
      <!--          <el-option-->
      <!--            v-for="(item, index) in types"-->
      <!--            :key="index"-->
      <!--            :label="item.categoryName"-->
      <!--            :value="item.id"-->
      <!--          />-->
      <!--        </el-select>-->
      <!--        <el-select v-model="getemplist.isactive" placeholder="请选择上下架" clearable style="width: 40%;float: right;margin-right: 20px">-->
      <!--          <el-option value="1" label="上1"/>-->
      <!--          <el-option value="2" label="下2"/>-->
      <!--        </el-select>-->
      <!--        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">-->
      <!--          <el-button v-waves class="filter-item" type="primary" style="float: right" @click="handleFilter">{{ $t('public.search') }}</el-button>-->
      <!--        </div>-->
      <!--        <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>-->
      <!--      </el-popover>-->
      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
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
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"
        align="center"/>
      <el-table-column :label="$t('MaterialsList.id')" :resizable="false" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MaterialsList.bomNumber')" :resizable="false" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.bomNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MaterialsList.productName')" :resizable="false" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.productName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MaterialsList.code')" :resizable="false" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.productCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MaterialsList.bomTypeId')" :resizable="false" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.bomTypeId | bomTypeIdFliter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MaterialsList.summary')" :resizable="false" prop="MaterialsListDetails" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.summary }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MaterialsList.judgeStat')" :resizable="false" prop="judgeStat" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.judgeStat | judgeStatFilter }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 列表结束 -->
    <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" style="padding: 0" @pagination="getlist" />
    <span slot="footer" class="dialog-footer">
      <el-button v-waves type="success" style="text-align: center;" @click="handleAddTo">确认添加</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { searchUnitGroup } from '@/api/UnitGroup'
import { productlist } from '@/api/Product'
import { materialslist } from '@/api/MaterialsList'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves' // Waves directive
export default {
  directives: { waves },
  components: { Pagination },
  filters: {
    judgeStatFilter(status) {
      const statusMap = {
        0: '未审核',
        1: '审核中',
        2: '审核通过',
        3: '审核不通过'
      }
      return statusMap[status]
    },
    receiptStatFilter(status) {
      const statusMap = {
        1: '制单',
        2: '执行',
        3: '结单'
      }
      return statusMap[status]
    },
    bomTypeIdFliter(status) {
      const statusMap = {
        1: '工艺BOM',
        2: '设计BOM',
        3: '制造BOM'
      }
      return statusMap[status]
    }
  },
  props: {
    materialcontrol: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
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
      productVisible: this.materialcontrol,
      // 审核传参
      reviewParms: {
        id: '',
        judgePersonId: '',
        judgeStat: ''
      },
      // 详情组件数据
      detailvisible: false,
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
      // 采购入库单列表查询加展示参数
      getemplist: {
        pageNum: 1,
        pageSize: 10,
        judgeStat: 2,
        receiptStat: 2,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds
      },
      // 传给组件的数据
      personalForm: {},
      // 控制组件数据
      editVisible: false,
      // 开始时间到结束时间
      date: []
    }
  },
  watch: {
    materialcontrol() {
      this.productVisible = this.materialcontrol
      console.log(this.control)
      this.getlist()
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    // 物料清单列表数据
    getlist() {
      this.listLoading = true
      materialslist(this.getemplist).then(res => {
        console.log('ret', res.data.data.content.list)
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
      this.enterRepositoryId = ''
      this.getemplist.enterRepositoryId = ''
      this.deliveryPersonId = ''
      this.getemplist.deliveryPersonId = ''
      this.acceptPersonId = ''
      this.getemplist.acceptPersonId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      materialslist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          this.restFilter()
        } else {
          this.restFilter()
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
      this.$router.push('/MaterialsList/AddMaterialsList')
      this.productVisible = false
    },
    // 物品选择添加
    async handleAddTo() {
      this.productVisible = false
      const productDetail = this.moreaction.map(function(item) {
        return {
          productCode: item.productCode,
          productName: item.productName,
          locationId: '',
          typeId: item.productTypeId,
          enterQuantity: 0,
          taxRate: 0,
          unit: item.unit,
          actualEnterQuantity: 0,
          quantity: 1,
          enterPrice: item.costPrice,
          productType: item.productType,
          totalMoney: 0,
          enterMoney: 0,
          price: item.price,
          typeIdname: item.productType,
          color: item.color
        }
      })
      // 通过Promise.all把所有循环中的异步接口数据加载过来，再通过async/await把数据加载完成
      const productDetail3 = await Promise.all(productDetail.map(function(item) {
        const query = {}
        query.code = item.productCode
        return productlist(query)
      }))
      for (let i = 0; i < productDetail.length; i++) {
        for (let j = 0; j < productDetail3.length; j++) {
          if (productDetail[i].productCode === productDetail3[j].data.data.content.list[0].code) {
            productDetail[i].unit = productDetail3[j].data.data.content.list[0].stockMeasu
            // 根据单位比例换算数量
            if (productDetail3[j].data.data.content.list[0].unitGroupId !== null) {
              const query = {}
              query.groupId = productDetail3[j].data.data.content.list[0].unitGroupId
              await searchUnitGroup(query).then(res => {
                if (res.data.ret === 200) {
                  console.log('res', res.data.data.content.list[0].unitGroupDetailVos)
                  const unitGroupDetailVos = res.data.data.content.list[0].unitGroupDetailVos
                  let num2 = 1
                  for (let k = 0; k < unitGroupDetailVos.length; k++) {
                    if (unitGroupDetailVos[k].unitId === productDetail3[j].data.data.content.list[0].produceMeasurement) {
                      num2 = unitGroupDetailVos[k].proportion
                      console.log('num2', num2)
                    }
                  }
                  productDetail[i].quantity = ((productDetail[i].quantity) * num2).toFixed(2)
                  console.log(productDetail[i].quantity)
                }
                setTimeout(() => {
                  this.listLoading = false
                }, 0.5 * 100)
              })
            }
          }
        }
      }
      console.log(productDetail)
      this.$emit('product4', productDetail)
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
