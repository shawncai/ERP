<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">
      <el-input v-model="repositoryId" :placeholder="$t('updates.repository')" size="small" class="filter-item" clearable @clear="restFilter" @keyup.enter.native="handleFilter" @focus="handlechooseRep"/>
      <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
      <el-input v-model="getemplist.productName" :placeholder="$t('Hmodule.wpmc')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.productCode" :placeholder="$t('Hmodule.wpbh')" size="small" class="filter-item" clearable @focus="handleproduct"/>
      <el-input v-model="getemplist.unChange" placeholder="没有发生改变的期限" size="small" class="filter-item" clearable/>
      <!-- <my-detail :control.sync="control" :personalform="personalForm" @product="productdetail"/> -->
      <my-materials :materialcontrol.sync="materialcontrol" @product4="productdetail4"/>

      <el-select v-model="getemplist.type" :value="getemplist.type" :placeholder="$t('updates.lx')" size="small" filterable class="filter-item" clearable>
        <el-option v-for="item in typeList" :key="item.id" :value="item.id" :label="item.typeName"/>
      </el-select>
      <el-select v-model="getemplist.typeId" :placeholder="$t('Hmodule.qxzggxh')" size="small" class="filter-item" clearable>
        <el-option
          v-for="(item, index) in types"
          :key="index"
          :label="item.categoryName"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="getemplist.categoryId" :placeholder="$t('Hmodule.wpfl')" size="small" class="filter-item" clearable>
        <el-option :label="$t('otherlanguage.zc')" value="1"/>
        <el-option :label="$t('otherlanguage.pj')" value="2"/>
        <el-option :label="$t('otherlanguage.jgj')" value="3"/>
        <el-option :label="$t('otherlanguage.xhp')" value="4"/>
        <el-option :label="$t('otherlanguage.dc')" value="5"/>
        <el-option :label="$t('otherlanguage.xss')" value="6"/>
        <el-option :label="$t('otherlanguage.pjj')" value="7"/>
        <el-option :label="$t('otherlanguage.hj')" value="8"/>
      </el-select>
      <!-- <el-input v-model="supplierId" :placeholder="$t('StockContract.supplierId')" size="small" class="filter-item" @focus="handlechoose" @clear="restFilter"/> -->
      <!-- <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/> -->
      <el-button v-waves size="small" class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
    </el-card>
    <el-card :body-style="	{ padding: '10px' }" class="box-card" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="mytable"
        ref="table"
        :height="tableHeight"
        :data="list"
        size="small"
        border
        style="width: 100%"
        @row-click="clickRow">
        <el-table-column
          :label="$t('updates.repository')"
          prop="repositoryName"
          width="200"
          align="center"/>
        <el-table-column
          :label="$t('stockDetailCount.productCode')"
          prop="productCode"
          min-width="200"
          align="center"/>
        <el-table-column
          :label="$t('stockDetailCount.productName')"
          prop="productName"
          min-width="200"
          align="center"/>
        <el-table-column
          :label="$t('stockDetailCount.productType')"
          prop="productType"
          min-width="200"
          align="center"/>
        <el-table-column
          :label="$t('stockDetailCount.unit')"
          prop="unit"
          min-width="200"
          align="center"/>
        <el-table-column
          :label="$t('stockTrackList.quantity')"
          prop="quantity"
          min-width="200"
          align="center"/>
      </el-table>
      <!-- 列表结束1 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
    </el-card>
  </div>
</template>

<script>
import { SluggishAnalysisTable } from '@/api/count'
import { searchEmpCategory2 } from '@/api/Product'
import MyRepository from './components/MyRepository'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyEmp from './components/MyEmp'
import DetailList from './components/DetailList'
import MyDialog from './components/MyDialog'
import MyCustomer from './components/MyCustomer'
import MyAgent from './components/MyAgent'
import MySupplier from './components/MySupplier'
import MyDetail from './components/MyDetail'
import MyMaterials from './components/MyMaterials'

var _that
export default {
  name: 'InventorySluggishAnalysisTable',
  directives: { waves, permission, permission2 },
  components: { MyDialog, DetailList, MyEmp, MyCustomer, MySupplier, MyAgent, MyRepository, Pagination, MyDetail, MyMaterials },
  filters: {
    judgeStatFilter(status) {
      const statusMap = {
        0: _that.$t('updates.wsh'),
        1: _that.$t('updates.shz'),
        2: _that.$t('Hmodule.shtg'),
        3: _that.$t('Hmodule.shbtg')
      }
      return statusMap[status]
    },
    receiptStatFilter(status) {
      const statusMap = {
        1: _that.$t('updates.zd'),
        2: _that.$t('updates.zx'),
        3: _that.$t('updates.jd')
      }
      return statusMap[status]
    },
    stockTypeFilter(status) {
      const statusMap = {
        1: '采购1'
      }
      return statusMap[status]
    },
    sendTypeFilter(status) {
      const statusMap = {
        1: '未发货',
        2: '发货中',
        3: '已发货'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      mytable: false,
      repositorycontrol: false,
      tableHeight: 200,
      // 控制商品列表窗口
      materialcontrol: false,
      first: '',
      step1: '',
      step2: '',
      step3: '',
      step4: '',
      step5: '',
      step6: '',
      step7: '',
      step8: '',
      receiptVisible: false,
      // 回显客户
      customerName: '',
      // 控制客户
      customercontrol: false,
      agentcontrol: false,
      // 类别获取参数
      typeparms: {
        pagenum: 1,
        pagesize: 99999
      },
      // 采购类别数据
      types: [],
      typeList: [
        { id: 1, typeName: '未进未出' },
        { id: 2, typeName: '只进未出' }
      ],
      // 申请部门数据
      depts: [],
      // 审核传参
      reviewParms: {
        id: '',
        judgePersonId: '',
        judgeStat: ''
      },
      // 详情组件数据
      detailvisible: false,
      // 更多搜索条件问题
      visible2: false,
      // 供应商回显
      supplierId: '',
      // 供应商控制框
      empcontrol: false,
      // 采购人回显
      stockPersonId: '',
      // 采购人控制框
      stockControl: false,
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
      // repositoryId: this.$store.getters.repositoryName,
      repositoryId: this.$store.getters.repositoryName,
      // 采购申请查询加展示参数
      getemplist: {
        repositoryId: this.$store.getters.repositoryId,
        type: 1
      },
      // 传给组件的数据
      personalForm: {},
      // 修改控制组件数据
      editVisible: false,
      // 开始时间到结束时间
      date: []
    }
  },
  activated() {
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  mounted() {
    this.changeName()
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
    productdetail(val) {
      this.getemplist.productCode = val
    },
    productdetail4(val) {
      this.getemplist.productCode = val
    },
    supplierName(val) {
      console.log(val)
      this.supplierId = val.supplierName
      this.getemplist.supplierId = val.id
    },
    changeName() {
      if (this.getemplist.type === '1') {
        this.first = '供应商名称'
      }
      if (this.getemplist.type === '2') {
        this.first = '经办人名称'
      }
      if (this.getemplist.type === '3') {
        this.first = '品牌名称'
      }
      if (this.getemplist.type === '4') {
        this.first = '种类名称'
      }
      this.getlist()
    },
    checkPermission,
    // 不让勾选
    selectInit(row, index) {
      if (row.judgeStat !== 0) {
        return false
      } else {
        return true
      }
    },
    // 选择客户类型时清理客户名称
    clearCustomer() {
      this.getemplist.customerId = ''
      this.customerName = ''
    },
    // 选择客户focus
    chooseCustomer() {
      if (this.getemplist.customerType === '1') {
        this.agentcontrol = true
      } else if (this.getemplist.customerType === '2') {
        this.customercontrol = true
      }
    },
    customerdata(val) {
      this.getemplist.customerId = val.id
      this.customerName = val.customerName
    },
    agentdata(val) {
      this.getemplist.customerId = val.id
      this.customerName = val.agentName
    },
    // 更新采购类型
    updatecountry() {
      this.getlist()
    },
    getlist() {
      // 物料需求计划列表数据
      this.listLoading = true
      SluggishAnalysisTable(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      // 采购类别数据
      searchEmpCategory2(2).then(res => {
        if (res.data.ret === 200) {
          this.types = res.data.data.content.list
        }
      })
    },
    // 清空搜索条件
    restFilter() {
      this.repositoryId = ''
      this.getemplist.repositoryId = ''
    },
    restFilter2() {
      this.stockPersonId = ''
      this.getemplist.stockPersonId = ''
    },
    // 搜索
    handleFilter() {
      this.mytable = true
      if (this.getemplist.unChange === '' || this.getemplist.unChange === undefined || this.getemplist.unChange === null) {
        this.$notify.error({
          title: 'wrong',
          message: '请输入未改变的年限',
          offset: 100
        })
        this.mytable = false
        return false
      }
      SluggishAnalysisTable(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
          this.mytable = false
          // this.restFilter()
        } else {
          this.mytable = false

          // this.restFilter()
        }
      })
    },
    // 采购人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 采购人回显
    stockName(val) {
      this.stockPersonId = val.personName
      this.getemplist.stockPersonId = val.id
    },
    // 供应商输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 选择物品
    handleproduct() {
      this.materialcontrol = true
    },
    // 修改操作
    handleEdit(row) {
      console.log(row)
      this.editVisible = true
      this.personalForm = Object.assign({}, row)
      this.personalForm.sourceType = String(row.sourceType)
      if (row.currency !== null) {
        this.personalForm.currency = String(row.currency)
      }
      if (row.customerType !== null) {
        this.personalForm.customerType = String(row.customerType)
      }
      if (row.saleType !== null) {
        this.personalForm.saleType = String(row.saleType)
      }
      if (row.payType !== null) {
        this.personalForm.payType = String(row.payType)
      }
    },
    // 修改组件修改成功后返回
    refreshlist(val) {
      if (val === true) {
        this.getlist()
      }
    },
    // 详情操作
    handleDetail(row) {
      console.log(row)
      this.detailvisible = true
      this.personalForm = Object.assign({}, row)
    },
    // 判断审核按钮
    isReview(row) {
      if (row.approvalUseVos !== '' && row.approvalUseVos !== null && row.approvalUseVos !== undefined && row.approvalUseVos.length !== 0) {
        const approvalUse = row.approvalUseVos
        const index = approvalUse[approvalUse.length - 1].stepHandler.indexOf(',' + this.$store.getters.userId + ',')
        console.log(approvalUse[approvalUse.length - 1].stepHandler)
        console.log(index)
        if (index > -1 && (row.judgeStat === 1 || row.judgeStat === 0)) {
          return true
        }
      }
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.repositoryId = val.repositoryName
      this.getemplist.repositoryId = val.id
    },
    // 部门列表focus刷新
    updatedept() {
      this.getlist()
    },
    // 交货人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.deliveryPersonId = val.personName
      this.getemplist.deliveryPersonId = val.id
    },
    // 验收人focus事件触发
    handlechooseAccept() {
      this.accetpcontrol = true
    },
    acceptName(val) {
      this.acceptPersonId = val.personName
      this.getemplist.acceptPersonId = val.id
    }
  }
}
</script>

<style rel="stylesheet/css" scoped>
  .ERP-container >>>  .el-form-item__label{
    color: #909399;
    text-align: left;
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
</style>
