<template>
  <el-dialog :visible.sync="productVisible" :close-on-press-escape="false" top="10px" title="选择维修部位" append-to-body @close="$emit('update:packagecontrol', false)">
    <div class="filter-container">
    </div>
    <!-- 列表开始 -->
    <el-tree
    ref="tree"
  :props="props"
  :data="list"
  show-checkbox
  @check-change="handleCheckChange">
</el-tree>
    <!-- 列表结束 -->
    <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" style="padding: 0" @pagination="getlist" />
    <span slot="footer" class="dialog-footer">
      <el-button v-waves type="success" style="text-align: center;" @click="handleAddTo">{{ $t('Hmodule.sure') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { faultsearch} from '@/api/repair'
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
    }
  },
  data() {
    return {
        props: {
          label: 'name',
          children: 'children'
        },
      // 主商品数据
      query: this.productnumber,
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
    },
    productnumber() {
      this.query = this.productnumber
     
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
    // 递归函数
    recursion(val) {
      
      for(let i in val) {
          if (val[i].children) {
          if (val[i].children.length === 0) {
              val[i].disabled = false 
          } else if (val[i].children.length > 0) {
              val[i].disabled = true
              this.recursion(val[i].children)
          }  
          }         
      }
      return val
    },
    getlist() {
      faultsearch().then(res => {
        if (res.data.ret === 200) {
          this.list =this.recursion(res.data.data.content)
          console.log(this.list)
        //   this.total = res.data.data.content.totalCount
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
        console.log('this.$refs.tree.getCheckedNodes()',this.$refs.tree.getCheckedNodes())
        const neearr = this.$refs.tree.getCheckedNodes().filter(item => {
            return item.children.length === 0
        })
        console.log('neearr', neearr)
      this.productVisible = false
      this.$emit('faultdetail', neearr)
    //   this.$emit('salePrice', this.moreaction.salePrice)
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
