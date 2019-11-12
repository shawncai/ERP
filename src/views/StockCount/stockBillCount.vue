<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px;height: 60px" shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" label-width="100px" style="margin-top: -9px">
          <el-col :span="4">
            <el-form-item :label="$t('stockOrderCount.type')">
              <el-select v-model="getemplist.type" :value="getemplist.type" style="width: 100px" @keyup.enter.native="handleFilter" @change="changeName">
                <el-option value="1" :label="$t('updates.cangk')"/>
                <el-option value="2" :label="$t('updates.gys')"/>
                <el-option value="3" label="类别"/>
                <el-option value="4" label="品牌"/>
                <el-option value="5" label="年"/>
                <el-option value="6" label="月"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left: 35px">
            <el-form-item :label="$t('updates.repository')">
              <el-input v-model="repositoryId" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechooseRep" @clear="restFilter"/>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left: 80px">
            <el-form-item :label="$t('stockOrderCount.date')">
              <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="-"
                unlink-panels
                value-format="yyyy-MM-dd"
                style="width: 250px"/>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left: 210px">
            <!-- 搜索按钮 -->
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-card>

    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 列表开始 -->
      <el-table
        :data="list"
        border
        style="width: 100%">
        <el-table-column
          :label="$t('stockOrderCount.id')"
          prop="id"
          width="200"
          align="center"/>
        <el-table-column
          :label="first"
          prop="name"
          width="300"
          align="center"/>
        <el-table-column :label="$t('stockBillCount.Stockenter')" align="center">
          <el-table-column
            :label="$t('stockOrderCount.orderQuantity')"
            prop="stockQuantity"
            width="200"
            align="center"/>
          <el-table-column
            :label="$t('stockOrderCount.totalMoney')"
            prop="stockMoney"
            width="200"
            align="center"/>
          <el-table-column
            :label="$t('stockOrderCount.taxMoney')"
            prop="stockTax"
            width="200"
            align="center"/>
          <el-table-column
            :label="$t('stockOrderCount.heji')"
            prop="stockTotalMoney"
            width="200"
            align="center"/>
        </el-table-column>
        <el-table-column :label="$t('stockBillCount.StockRetreat')" align="center">
          <el-table-column
            :label="$t('stockOrderCount.orderQuantity')"
            prop="retreatQuantity"
            width="200"
            align="center"/>
          <el-table-column
            :label="$t('stockOrderCount.totalMoney')"
            prop="retreatMoney"
            width="200"
            align="center"/>
          <el-table-column
            :label="$t('stockOrderCount.taxMoney')"
            prop="retreatTax"
            width="200"
            align="center"/>
          <el-table-column
            :label="$t('stockOrderCount.heji')"
            prop="retreatTotalMoney"
            width="200"
            align="center"/>
        </el-table-column>
        <el-table-column :label="$t('stockBillCount.actualEnterQuantity')" align="center">
          <el-table-column
            :label="$t('stockOrderCount.orderQuantity')"
            prop="enterQuantity"
            width="200"
            align="center"/>
          <el-table-column
            :label="$t('stockOrderCount.totalMoney')"
            prop="enterMoney"
            width="200"
            align="center"/>
          <el-table-column
            :label="$t('stockOrderCount.taxMoney')"
            prop="enterTax"
            width="200"
            align="center"/>
          <el-table-column
            :label="$t('stockOrderCount.heji')"
            prop="enterTotalMoney"
            width="200"
            align="center"/>
        </el-table-column>
        <!-- <el-table-column
          :label="$t('stockBillCount.retreatrate')"
          prop="arrivedQuantity"
          width="200"
          align="center"/> -->
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
    </el-card>
  </div>
</template>

<script>
import { stockBillCount } from '@/api/count'
import { searchStockCategory } from '@/api/StockCategory'
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
import MyRepository from './components/MyRepository'

export default {
  name: 'StockOrderCount',
  directives: { waves, permission, permission2 },
  components: { MyDialog, DetailList, MyRepository, MyEmp, MyCustomer, MyAgent, Pagination },
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
      first: '',
      step1: '',
      step2: '',
      step3: '',
      step4: '',
      step5: '',
      step6: '',
      step7: '',
      step8: '',
      repositoryId: '',
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
      repositorycontrol: false,
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
      // 采购申请查询加展示参数
      getemplist: {
        pageNum: 1,
        pageSize: 10,
        type: '1'
      },
      // 传给组件的数据
      personalForm: {},
      // 修改控制组件数据
      editVisible: false,
      // 开始时间到结束时间
      date: []
    }
  },
  mounted() {
    this.getlist()
    this.changeName()
  },
  methods: {
    changeName() {
      if (this.getemplist.type === '1') {
        this.first = '仓库名称'
      }
      if (this.getemplist.type === '2') {
        this.first = '供应商名称'
      }
      if (this.getemplist.type === '3') {
        this.first = '类别'
      }
      if (this.getemplist.type === '4') {
        this.first = '品牌'
      }
      if (this.getemplist.type === '5') {
        this.first = '年'
      }
      if (this.getemplist.type === '6') {
        this.first = '月'
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
      stockBillCount(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          for (let i = 0; i < this.list.length; i++) {
            this.list[i].heji = this.list[i].totalMoney + this.list[i].taxMoney
          }
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      // 采购类别数据
      searchStockCategory(this.typeparms).then(res => {
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
      this.getemplist.pageNum = 1
      if (this.date === null || this.date === undefined || this.date === '') {
        this.getemplist.beginTime = ''
        this.getemplist.endTime = ''
      } else {
        this.getemplist.beginTime = this.date[0]
        this.getemplist.endTime = this.date[1]
      }
      stockBillCount(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          for (let i = 0; i < this.list.length; i++) {
            this.list[i].heji = this.list[i].totalMoney + this.list[i].taxMoney
          }
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
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
    // 供应商列表返回数据
    supplierName(val) {
      console.log(val)
      this.supplierId = val.supplierName
      this.getemplist.supplierId = val.id
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
    margin: 0px 10px;
  }
  .filter-container{
    padding: 20px;
    padding-left: 0px;
  }
  .filter-item{
    width: 140px;
    margin-left: 0px;
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
