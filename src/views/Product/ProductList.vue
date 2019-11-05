<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px;height: 60px" shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" label-width="100px" style="margin-top: -9px">
          <!-- 搜索条件栏目 -->
          <el-col :span="5">
            <el-form-item :label="$t('Product.code')" label-width="100px">
              <el-input v-model="getemplist.code" :placeholder="$t('Product.code')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left: 10px">
            <el-form-item :label="$t('Product.productname')">
              <el-input v-model="getemplist.productname" :placeholder="$t('Product.productname')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left: 10px">
            <el-form-item :label="$t('Product.supplierid')">
              <el-input v-model="supplierid" :placeholder="$t('Product.supplierid')" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechoose" @clear="clear"/>
            </el-form-item>
            <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
          </el-col>
          <!-- 更多搜索条件下拉栏 -->
          <el-col :span="3">
            <el-popover
              v-model="visible2"
              placement="bottom"
              width="500"
              trigger="click">
              <el-select v-model="getemplist.typeid" placeholder="请选择规格型号" clearable style="width: 40%;float: left;margin-left: 20px">
                <el-option
                  v-for="(item, index) in types"
                  :key="index"
                  :label="item.categoryName"
                  :value="item.id"
                />
              </el-select>
              <el-select v-model="getemplist.isactive" placeholder="请选择上下架" clearable style="width: 40%;float: right;margin-right: 20px">
                <el-option value="1" label="上1"/>
                <el-option value="2" label="下2"/>
              </el-select>
              <el-input v-model="categoryid" placeholder="物品分类" style="width: 40%;float: left;margin-left: 20px;margin-top: 20px" clearable @focus="treechoose" @clear="clear2"/>
              <my-tree :treecontrol.sync="treecontrol" @tree="tree"/>
              <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
                <el-button v-waves class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>
              </div>
              <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
            </el-popover>
          </el-col>
          <!-- 搜索按钮 -->
          <el-col :span="3" style="margin-left: 20px">
            <!-- 搜索按钮 -->
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['1-31-33-14']" style="text-align: left" command="up" ><svg-icon icon-class="上架" style="width: 40px"/>{{ $t('public.up') }}</el-dropdown-item>
          <el-dropdown-item v-permission="['1-31-33-15']" style="text-align: left" command="down"><svg-icon icon-class="下架" style="width: 40px"/>{{ $t('public.down') }}</el-dropdown-item>
          <el-dropdown-item v-permission="['1-31-33-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['1-31-33-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['1-31-33-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['1-31-33-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
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
          fixed="left"
          align="center"/>
        <el-table-column :resizable="false" label="序号" fixed="left" prop="code" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Product.code')" :resizable="false" fixed="left" prop="code" align="center" width="180">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.code }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="edtiForm" :detailid.sync="detailid"/>
        </el-table-column>
        <el-table-column :label="$t('Product.productname')" :resizable="false" fixed="left" prop="ProductName" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Product.categoryid')" :resizable="false" prop="category" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Product.typeid')" :resizable="false" align="center" min-width="100">
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
        <el-table-column :label="$t('Product.costprice')" :resizable="false" prop="costPrice" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.costPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Product.isactive')" :resizable="false" prop="active" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.isActive | activefilter }}</span>
          </template>
        </el-table-column>
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
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="200">
          <template slot-scope="scope">
            <el-button v-permission="['1-31-33-14']" v-show="scope.row.isActive === 2" title="上架" type="primary" size="mini" icon="el-icon-caret-top" circle @click="top(scope.row)"/>
            <el-button v-permission="['1-31-33-15']" v-show="scope.row.isActive === 1" title="下架" type="primary" size="mini" icon="el-icon-caret-bottom" circle @click="bottom(scope.row)"/>
            <el-button v-permission2="['1-31-33-3', scope.row.createPersonId]" title="修改" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
            <!-- <el-button v-permission2="['1-31-33-2', scope.row.createPersonId]" title="删除" size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <my-dialog :control.sync="editVisible" :editdata.sync="personalForm" @rest="refreshlist"/>
      <!--修改结束=================================================-->
    </el-card>
  </div>
</template>

<script>
import { productlist, deleteproduct, searchEmpCategory2, productDetail, editproduct, updatestat } from '@/api/Product'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyDialog from './components/MyDialog'
import MySupplier from '../DailyAdjust/components/MySupplier'
import MyTree from './components/MyTree'
import DetailList from './components/DetailList'

export default {
  name: 'ProductList',
  directives: { waves, permission, permission2 },
  components: { DetailList, MyTree, MySupplier, Pagination, MyDialog },
  filters: {
    genderFilter(status) {
      const statusMap = {
        1: '男',
        2: '女'
      }
      return statusMap[status]
    },
    activefilter(status) {
      const statusMap = {
        1: '上架',
        2: '下架'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      select_order_number: [],
      // 获取row的key值
      getRowKeys(row) {
        return row.code
      },
      // 更多搜索条件问题
      visible2: false,
      // 规格型号数据
      types: [],
      // 物品分类控制
      treecontrol: false,
      // 物品分类回显
      categoryid: '',
      // 供应商回显
      supplierid: '',
      // 供货商控制
      empcontrol: false,
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
      // 传给组件的数据
      personalForm: {},
      personalForm2: {},
      // 详情id
      detailid: null,
      // 详情数据
      edtiForm: {},
      // 控制详情
      detailvisible: false,
      // 控制组件数据
      editVisible: false
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    // 上下架操作
    top(row) {
      console.log('row', row)
      this.personalForm2.productid = row.id
      this.personalForm2.isActive = 1
      editproduct(this.personalForm2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.getlist()
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    bottom(row) {
      console.log('row', row)
      this.personalForm2.productid = row.id
      this.personalForm2.isActive = 2
      editproduct(this.personalForm2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.getlist()
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    checkPermission,
    // 详情操作
    handleDetail(row) {
      this.detailid = row.id
      productDetail(row.id).then(res => {
        const emData = res.data.data.content
        this.detailvisible = true
        this.edtiForm = Object.assign({}, emData)
      })
    },
    getlist() {
      // 商品列表数据
      this.listLoading = true
      productlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
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
    clear() {
      this.supplierid = ''
      this.getemplist.supplierid = ''
    },
    clear2() {
      this.categoryid = ''
      this.getemplist.categoryid = ''
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
    // 修改操作
    handleEdit(row) {
      console.log(row)
      this.editVisible = true
      this.personalForm = Object.assign({}, row)
      if (this.personalForm.valuation !== null && this.personalForm.valuation !== undefined) {
        this.personalForm.valuation = String(row.valuation)
      }
      if (this.personalForm.source !== null) {
        this.personalForm.source = String(row.source)
      }
    },
    // 修改组件修改成功后返回
    refreshlist(val) {
      if (val === true) {
        this.getlist()
      }
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
    // 多条删除
    // 批量删除
    handleCommand(command) {
      const ids = this.moreaction.map(item => item.id).join()
      if (command === 'delete') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteproduct(ids, this.$store.getters.userId).then(res => {
            if (res.data.ret === 200 || res.data.ret === 100) {
              this.$notify({
                title: '删除成功',
                type: 'success',
                offset: 100
              })
              this.getlist()
            } else {
              this.$notify.error({
                title: '错误',
                message: '出错了',
                offset: 100
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else if (command === 'up') {
        console.log('success')
        updatestat(ids, 1).then(res => {
          if (res.data.ret === 200 || res.data.ret === 100) {
            this.$notify({
              title: '上架成功',
              type: 'success',
              offset: 100
            })
            this.getlist()
          } else {
            this.$notify.error({
              title: '错误',
              message: '出错了',
              offset: 100
            })
          }
        })
      } else if (command === 'down') {
        updatestat(ids, 2).then(res => {
          if (res.data.ret === 200 || res.data.ret === 100) {
            this.$notify({
              title: '下架成功',
              type: 'success',
              offset: 100
            })
            this.getlist()
          } else {
            this.$notify.error({
              title: '错误',
              message: '出错了',
              offset: 100
            })
          }
        })
      }
    },
    // 单条删除
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteproduct(row.id, this.$store.getters.userId).then(res => {
          if (res.data.ret === 200 || res.data.ret === 100) {
            this.$notify({
              title: '删除成功',
              type: 'success',
              offset: 100
            })
            this.getlist()
          } else {
            this.$notify.error({
              title: '错误',
              message: '出错了',
              offset: 100
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/Product/NewProduct')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['物料编码', '产品名称', '物品分类', '规格型号', '颜色', '绩效分', '商品积分', '成本价', '采购价', '创建者', '创建时间']
          const filterVal = ['code', 'productName', 'category', 'productType', 'color', 'kpiGrade', 'point', 'costPrice', 'purchasePrice', 'createId', 'createTime']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '物品资料表'
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    // 打印
    handlePrint() {
      console.log(456)
    }
  }
}
</script>

<style rel="stylesheet/css" scoped>
  .app-container >>> .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 24px;
    word-break: keep-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  .ERP-container {
    margin: 0px 30px;
  }
  .filter-container{
    padding: 20px;
    padding-left: 0px;
  }
  .filter-item{
    width: 140px;
    margin-left: 20px;
  }
</style>
