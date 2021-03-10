<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">

      <el-input v-model="getemplist.code" :placeholder="$t('Product.code')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.productname" :placeholder="$t('Product.productname')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="supplierid" :placeholder="$t('Product.supplierid')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechoose" @clear="clear"/>
      <el-input v-model="categoryid" placeholder="物品详细分类" size="small" class="filter-item" clearable @focus="treechoose"/>
      <my-tree :treecontrol.sync="treecontrol" @tree="tree"/>
      <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
      <el-popover
        v-model="visible2"
        placement="bottom"
        width="500"
        size="small"
        trigger="click">
        <el-select v-model="getemplist.typeid" :placeholder="$t('Hmodule.qxzggxh')" filterable size="small" clearable style="width: 40%;float: left;margin-left: 20px">
          <el-option
            v-for="(item, index) in types"
            :key="index"
            :label="item.categoryName"
            :value="item.id"
          />
        </el-select>
        <el-select v-model="getemplist.isactive" :placeholder="$t('Hmodule.qxzsxj')" size="small" clearable style="width: 40%;float: right;margin-right: 20px">
          <el-option :label="$t('Hmodule.s1')" value="1"/>
          <el-option :label="$t('Hmodule.x2')" value="2"/>
        </el-select>
        <el-select v-model="getemplist.categoryid" :placeholder="$t('Hmodule.wpfl')" size="small" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
          <el-option :label="$t('otherlanguage.zc')" value="1"/>
          <el-option :label="$t('otherlanguage.pj')" value="2"/>
          <el-option :label="$t('otherlanguage.jgj')" value="3"/>
          <el-option :label="$t('otherlanguage.xhp')" value="4"/>
          <el-option :label="$t('otherlanguage.dc')" value="5"/>
          <el-option :label="$t('otherlanguage.xss')" value="6"/>
          <el-option :label="$t('otherlanguage.pjj')" value="7"/>
          <el-option :label="$t('otherlanguage.hj')" value="8"/>
        </el-select>
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button v-waves class="filter-item" type="primary" size="small" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" type="primary" size="small" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>

      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" size="small" icon="el-icon-search" style="width: 86px; margin-top: 20px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card :body-style="	{ padding: '6px'}" class="box-card" shadow="never">

      <!-- 批量操作 -->
      <!-- <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['1-31-33-14']" style="text-align: left" command="up" ><svg-icon icon-class="上架" style="width: 40px"/>{{ $t('public.up') }}</el-dropdown-item>
          <el-dropdown-item v-permission="['1-31-33-15']" style="text-align: left" command="down"><svg-icon icon-class="下架" style="width: 40px"/>{{ $t('public.down') }}</el-dropdown-item> -->
      <!--          <el-dropdown-item v-permission="['1-31-33-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>-->
      <!-- </el-dropdown-menu>
      </el-dropdown> -->
      <!-- 表格导出操作 -->
      <el-button v-permission="['1-31-33-6']" v-waves :loading="downloadLoading" size="small" class="filter-item2" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>

      <el-dialog :visible.sync="categoryVisible" :title="$t('public.export')" class="normal" width="600px" center @close="closetag">
        <el-form ref="addCategoryForm" :model="exportparms" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
          <el-form-item :label="$t('Hmodule.ggxh')" label-width="100px" prop="type">
            <el-select v-model="exportparms.typeid" style="width: 100%">
              <el-option
                v-for="(item, index) in types"
                :key="index"
                :label="item.categoryName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Hmodule.wpfl')" label-width="100px" >
            <!-- <el-input v-model="categoryid2" :placeholder="$t('Hmodule.wpfl')" clearable @focus="treechoose2" @clear="clear4"/>
            <my-tree2 :treecontrol.sync="treecontrol2" @tree="tree2"/> -->
            <el-select v-model="exportparms.categoryid" :placeholder="$t('Hmodule.wpfl')" clearable style="width: 100%">
              <el-option :label="$t('otherlanguage.zc')" value="1"/>
              <el-option :label="$t('otherlanguage.pj')" value="2"/>
              <el-option :label="$t('otherlanguage.jgj')" value="3"/>
              <el-option :label="$t('otherlanguage.xhp')" value="4"/>
              <el-option :label="$t('otherlanguage.dc')" value="5"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Product.productname')" label-width="100px" >
            <el-input v-model="exportparms.productname" :placeholder="$t('Product.productname')" style="width:100%" clearable/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleexport()">{{ $t('Hmodule.sure') }}</el-button>
          <el-button type="danger" @click="closetag()">{{ $t('Hmodule.cancel') }}</el-button>
        </span>
      </el-dialog>

      <!-- 打印操作 -->
      <!-- <el-button v-permission="['1-31-33-7']" v-waves size="small" class="filter-item2" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button> -->
      <input v-show="false" ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
      <!-- 更新价格 -->
      <el-button v-permission="['1-31-33-7']" v-waves size="small" class="filter-item2" icon="el-icon-refresh" style="width: 86px" @click="handleUpload">{{ $t('public.plgx') }}</el-button>
      <el-select v-model="getemplist.sortId" :value="getemplist.sortId" :placeholder="$t('update4.sortId')" class="filter-item" @change="handleFilter">
        <el-option :label="$t('update4.bmpx')" value="1"/>
        <el-option :label="$t('update4.xhpx')" value="2"/>
      </el-select>
      <!-- 新建操作 -->
      <el-button v-permission="['1-31-33-1']" v-waves size="small" class="filter-item2" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </el-card>
    <el-card :body-style="	{ padding: '10px' }" class="box-card" shadow="never">

      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :height="tableHeight"
        :key="tableKey"
        :data="list"
        border
        fit
        size="small"
        highlight-current-row
        style="width: 100%;"
        @row-click="clickRow"
        @selection-change="handleSelectionChange">
        <el-table-column
          :reserve-selection="true"
          type="selection"
          width="55"
          fixed="left"
          align="center"/>
        <el-table-column :resizable="false" :label="$t('Hmodule.xh')" fixed="left" prop="code" align="center" width="100">
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
        <el-table-column :label="$t('Product.kpigrade')" :resizable="false" prop="kpiGrade" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.kpiGrade }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Product.point')" :resizable="false" prop="point" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.point }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.salePrice')" :resizable="false" prop="costPrice" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.salePrice }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Product.isactive')" :resizable="false" prop="active" align="center" min-width="200">
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
            <el-button v-permission="['1-31-33-3']" :title="$t('updates.xg')" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
            <!-- <el-button v-permission2="['1-31-33-2', scope.row.createPersonId]" :title="$t('updates.sc')" size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/> -->
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
import { productlist, deleteproduct, searchEmpCategory2, productDetail, editproduct, updatestat, updateProductPrice } from '@/api/Product'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyDialog from './components/MyDialog'
import MySupplier from '../DailyAdjust/components/MySupplier'
import MyTree from './components/MyTree'
import MyTree2 from './components/MyTree2'
import DetailList from './components/DetailList'
import XLSX from 'xlsx'

var _that
export default {
  name: 'ProductList',
  directives: { waves, permission, permission2 },
  components: { DetailList, MyTree, MySupplier, Pagination, MyDialog, MyTree2 },
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
        1: _that.$t('public.up'),
        2: _that.$t('public.down')
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableHeight: 200,
      loading: false,
      excelData: {
        header: null,
        results: null
      },

      treecontrol2: false,
      categoryid2: '',
      exportparms: {
        typeid: '',
        categoryid: ''
      },
      categoryVisible: false,
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
        sortId: '1',
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
  activated() {
    this.getlist()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  mounted() {
    this.getlist()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    clickRow(val) {
      if (val.judgeStat === 0) {
        this.$refs.table.toggleRowSelection(val)
      }
    },
    clearuplod() {
      this.exportparms = {
        typeid: '',
        categoryid: ''
      }
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    onSuccess({ results, header }) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const uploaddata = results.map(item => {
        return {
          id: item.序号,
          costPrice: item.出厂价,
          saleprice: item.零售价,
          purchasePrice: item.采购价
        }
      })
      console.log('uploaddata', uploaddata)
      const jsonupload = JSON.stringify(uploaddata)
      updateProductPrice(jsonupload).then(res => {
        if (res.data.ret === 200) {
          console.log(res)
          this.$notify({
            title: '更新成功',
            message: '更新成功',
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.getlist()
        } else {
          this.$notify.error({
            title: '更新错误',
            message: '更新错误',
            offset: 100
          })
        }
        loading.close()
      })
        .catch(e => {
          loading.close()
        })
      setTimeout(() => {
        loading.close()
      }, 180000)
    },
    generateData({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      this.onSuccess && this.onSuccess(this.excelData)
    },
    // 批量更新操作
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },
    handleClick(e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload(rawFile) {
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel

      if (!this.beforeUpload) {
        this.readerData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.readerData(rawFile)
      }
    },
    readerData(rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const fixedData = this.fixData(data)
          const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const header = this.getHeaderRow(worksheet)
          const results = XLSX.utils.sheet_to_json(worksheet)
          this.generateData({ header, results })
          this.loading = false
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    fixData(data) {
      let o = ''
      let l = 0
      const w = 10240
      for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    },
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    },
    // 上下架操作
    top(row) {
      console.log('row', row)
      this.personalForm2.productid = row.id
      this.personalForm2.isActive = 1
      editproduct(this.personalForm2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: this.$t('prompt.czcg'),
            message: this.$t('prompt.czcg'),
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.getlist()
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
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
            title: this.$t('prompt.czcg'),
            message: this.$t('prompt.czcg'),
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.getlist()
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
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
    clear4() {
      this.categoryid = ''
      this.exportparms.categoryid = ''
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
      this.getemplist.detailCategoryId = val.id
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
      // if (this.personalForm.typeId !== null) {
      //   this.personalForm.typeId = String(row.typeId)
      // }
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
        this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
          confirmButtonText: this.$t('prompt.qd'),
          cancelButtonText: this.$t('prompt.qx'),
          type: 'warning'
        }).then(() => {
          deleteproduct(ids, this.$store.getters.userId).then(res => {
            if (res.data.ret === 200 || res.data.ret === 100) {
              this.$notify({
                title: this.$t('prompt.sccg'),
                type: 'success',
                offset: 100
              })
              this.getlist()
            } else {
              this.$notify.error({
                title: 'wrong',
                message: 'wrong',
                offset: 100
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('prompt.yqxsc')
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
              title: 'wrong',
              message: 'wrong',
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
              title: 'wrong',
              message: 'wrong',
              offset: 100
            })
          }
        })
      }
    },
    // 单条删除
    handleDelete(row) {
      this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
        confirmButtonText: this.$t('prompt.qd'),
        cancelButtonText: this.$t('prompt.qx'),
        type: 'warning'
      }).then(() => {
        deleteproduct(row.id, this.$store.getters.userId).then(res => {
          if (res.data.ret === 200 || res.data.ret === 100) {
            this.$notify({
              title: this.$t('prompt.sccg'),
              type: 'success',
              offset: 100
            })
            this.getlist()
          } else {
            this.$notify.error({
              title: 'wrong',
              message: 'wrong',
              offset: 100
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('prompt.yqxsc')
        })
      })
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/Product/NewProduct')
    },

    handleexport() {
      this.downloadLoading = true
      this.exportparms.pagenum = 1
      this.exportparms.pagesize = 99999999
      productlist(this.exportparms).then(res => {
        if (res.data.ret === 200) {
          const list = res.data.data.content.list
          console.log('list', list)
          for (const i in list) {
            if (list[i].isActive === 1) {
              list[i].shagnjia = this.$t('public.up')
            } else if (list[i].isActive === 2) {
              list[i].shagnjia = this.$t('public.down')
            }
          }
          this.downloadLoading = false
          if (list.length === 0) {
            this.$notify({
              title: '没有数据',
              type: 'success',
              offset: 100
            })
            this.clearuplod()
            this.categoryVisible = false
          } else {
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = ['序号', '上下架', '物料编码', '产品名称', '物品分类', '规格型号', '颜色', '绩效分', '商品积分', '出厂价', '零售价', '采购价', '创建者', '创建时间']
            const filterVal = ['id', 'shagnjia', 'code', 'productName', 'category', 'productType', 'color', 'kpiGrade', 'point', 'costPrice', 'salePrice', 'purchasePrice', 'createId', 'createTime']
            const data = this.formatJson(filterVal, list)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: '物品资料表'
            })
            this.clearuplod()
            this.downloadLoading = false
            this.categoryVisible = false
          })
          }
        } else {
          // this.restFilter()
        }
      })
    },
    treechoose2() {
      this.treecontrol2 = true
    },
    tree2(val) {
      this.categoryid2 = val.categoryName
      this.exportparms.categoryid = val.id
    },
    closetag() {
      this.categoryVisible = false
    },
    // 导出
    handleExport() {
      this.categoryVisible = true
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
.normal >>> .el-dialog__header {
    padding: 20px 20px 10px;
    background: #fff;
    position: static;
    top: auto;
    z-index: auto;
    width: auto;
    border-bottom: none;
  }
  .normal >>> .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    height: auto;
  }
.app-container >>> .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 24px;
    word-break: keep-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  .ERP-container {
    margin-left:10px;
  }
  .filter-container{
    padding: 20px;
    padding-left: 0px;
  }
  .filter-item{
    width: 180px;
    margin-left: 10px;
    padding: 10px 0;
  }
  .filter-item2{
    width: 180px;
    margin-left: 5px;
    padding: 10px 0;
  }
  .box-card {
    /* border : 1px solid #f1f1ff !important; */
    border-bottom : 1px solid #f1f1ff00 !important
  }
</style>
