<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">
      <el-input v-model="getemplist.productCode" :placeholder="$t('saleBillList.productCode')" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechoosepro" @clear="restFilter3"/>
      <my-detail :control.sync="control" @product="productdetail"/>
      <el-input v-model="getemplist.productName" :placeholder="$t('saleBillList.productName')" class="filter-item" clearable @keyup.enter.native="handleFilter" />

      <el-input v-model="outRepositoryId" :placeholder="$t('updates.dcck')" size="small" class="filter-item" clearable @clear="restFilter" @keyup.enter.native="handleFilter" @focus="handlechooseRep"/>
      <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>

      <el-input v-model="enterRepositoryId" :placeholder="$t('updates.drck')" size="small" class="filter-item" clearable @clear="restFilter2" @keyup.enter.native="handleFilter" @focus="handlechooseRep2"/>
      <my-repository :repositorycontrol.sync="repositorycontrol2" @repositoryname="repositoryname2"/>

      <!-- <el-select v-model="getemplist.categoryId" :placeholder="$t('Hmodule.wpfl')" size="small" class="filter-item" clearable>
        <el-option :label="$t('otherlanguage.zc')" value="1"/>
        <el-option :label="$t('otherlanguage.pj')" value="2"/>
        <el-option :label="$t('otherlanguage.jgj')" value="3"/>
        <el-option :label="$t('otherlanguage.xhp')" value="4"/>
        <el-option :label="$t('otherlanguage.dc')" value="5"/>
        <el-option :label="$t('otherlanguage.xss')" value="6"/>
        <el-option :label="$t('otherlanguage.pjj')" value="7"/>
        <el-option :label="$t('otherlanguage.hj')" value="8"/>
      </el-select> -->

      <el-date-picker
        v-model="date"
        :default-time="['00:00:00', '23:59:59']"
        type="daterange"
        range-separator="-"
        unlink-panels
        value-format="yyyy-MM-dd"
        style="width: 250px"/>

      <el-button v-waves class="filter-item" size="small" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
      <el-button v-waves :loading="downloadLoading" size="small" class="filter-item2" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>

    </el-card>

    <el-card :body-style="	{ padding: '10px' }" class="box-card" shadow="never">
      <!-- 列表开始 -->
      <el-table
        ref="table"
        :height="tableHeight"
        :data="list"
        :summary-method="getSummaries2"
        size="small"
        show-summary
        border
        style="width: 100%"
        @row-click="clickRow">
        <el-table-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>

        <el-table-column
          :label="$t('inventoryCollect.productCode')"
          prop="productCode"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('inventoryCollect.productName')"
          prop="productName"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('inventoryCollect.productType')"
          prop="productType"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('inventoryCollect.unit')"
          prop="unit"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('moveDetailList.inQuantity')"
          prop="inQuantity"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('update4.moveInRepositoryName')"
          prop="moveInRepositoryName"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('moveDetailList.outQuantity')"
          prop="outQuantity"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('update4.moveOutRepositoryName')"
          prop="moveOutRepositoryName"
          sortable
          align="center"/>
      </el-table>
      <!-- 列表结束 -->
    </el-card>
  </div>
</template>

<script>
import { searchEmpCategory2 } from '@/api/Product'
import { moveCount } from '@/api/count'
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
import MyRepository2 from './components/MyRepository2'
import MyTree from './components/MyTree'
import MySupplier from './components/MySupplier'
import MyDetail from './components/MyDetail'

var _that
export default {
  name: 'MoveCount',
  directives: { waves, permission, permission2 },
  components: { MyDialog, MyDetail, DetailList, MyRepository, MyRepository2, MySupplier, MyEmp, MyCustomer, MyTree, MyAgent, Pagination },
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
      tableHeight: 200,
      control: false,
      categoryId: '',
      outRepositoryId: '',
      enterRepositoryId: '',
      first: '',
      step1: '',
      step2: '',
      step3: '',
      step4: '',
      step5: '',
      step6: '',
      step7: '',
      step8: '',
      types: [],
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
      // 申请部门数据
      depts: [],
      // 审核传参
      reviewParms: {
        id: '',
        judgePersonId: '',
        judgeStat: ''
      },
      // 详情组件数据
      treecontrol: false,
      detailvisible: false,
      repositorycontrol: false,
      repositorycontrol2: false,
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
      date: null,
      spanArr: [],
      pos: ''
    }
  },
  activated() {
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  mounted() {
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    numFormat(num) {
      var res = num.toString().replace(/\d+/, function(n) { // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, function($1) {
          return $1 + ','
        })
      })
      return res
    },
    // 总计
    getSummaries2(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = this.numFormat(values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return (Number(prev) + Number(curr)).toFixed(2)
            } else {
              return (Number(prev)).toFixed(2)
            }
          }, 0))
          // console.log('sums[index]', sums[index])
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      sums[1] = ''
      sums[3] = ''
      return sums
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    // 导出
    handleExport() {
      console.log('this.list', this.list)
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['物品编码', '物品名称', '规格型号', '单位', '调入数量', '调入仓库', '调出数量', '调出仓库']
          const filterVal = ['productCode', 'productName', 'productType', 'unit', 'inQuantity', 'moveInRepositoryName', 'outQuantity', 'moveOutRepositoryName']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '调拨汇总表'
          })
          this.downloadLoading = false
        })
    },
    getSpanArr(data) {
      this.spanArr = []
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].productCode === data[i - 1].productCode) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
      // console.log('this.spanArr=================', this.spanArr)
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      const _row = this.spanArr[rowIndex]
      const _col = _row > 0 ? 1 : 0
      if (columnIndex !== 4 && columnIndex !== 5 && columnIndex !== 6 && columnIndex !== 7) {
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    // 搜索
    handleFilter() {
      if (this.date.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: '请选择日期开始搜索',
          offset: 100
        })
        return false
      }
      this.getemplist.beginTime = this.date[0] + ' 00:00:00'
      this.getemplist.endTime = this.date[1] + ' 23:59:59'
      this.listLoading = true
      moveCount(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
          const mainlist = res.data.data.content
          const firstlist = res.data.data.content.map(item => {
            return item.moveInCountVos
          })
          const secondlist = res.data.data.content.map(item => {
            return item.moveOutCountVos
          })
          const firstlist2 = [].concat.apply([], firstlist)
          const secondlist2 = [].concat.apply([], secondlist)
          console.log('firstlist2', firstlist2)
          console.log('secondlist2', secondlist2)
          var replist = []
          if (firstlist2.length > secondlist2.length) {
            for (let i = 0; i < firstlist2.length; i++) {
              replist.push(Object.assign(firstlist2[i], secondlist2[i]))
            }
          } else if (firstlist2.length < secondlist2.length) {
            for (let i = 0; i < secondlist2.length; i++) {
              replist.push(Object.assign(firstlist2[i], secondlist2[i]))
            }
          } else {
            for (let i = 0; i < firstlist2.length; i++) {
              replist.push(Object.assign(firstlist2[i], secondlist2[i]))
            }
          }

          console.log('replist', replist)
          for (const i in mainlist) {
            for (const j in replist) {
              if (mainlist[i].productCode === replist[j].productCode) {
                replist[j].productName = mainlist[i].productName
                replist[j].productType = mainlist[i].productType
                replist[j].unit = mainlist[i].unit
              }
            }
          }
          this.list = replist
          this.getSpanArr(this.list)
          console.log(this.list)
        }
        this.listLoading = false
      })
    },

    restFilter3() {
      this.getemplist.productCode = ''
    },
    handlechoosepro() {
      this.control = true
    },
    productdetail(val) {
      console.log('val', val)
      this.getemplist.productCode = val
    },
    clickRow(val) {
      if (val.judgeStat === 0) {
        this.$refs.table.toggleRowSelection(val)
      }
    },
    treechoose() {
      this.treecontrol = true
    },
    tree(val) {
      this.categoryId = val.categoryName
      this.getemplist.categoryId = val.id
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
      searchEmpCategory2(2).then(res => {
        if (res.data.ret === 200) {
          this.types = res.data.data.content.list
        }
      })
      // 物料需求计划列表数据
      this.listLoading = true
      // moveDetailList(this.getemplist).then(res => {
      //   if (res.data.ret === 200) {
      //     this.list = res.data.data.content.list
      //     for (let i = 0; i < this.list.length; i++) {
      //       this.list[i].heji = this.list[i].totalMoney + this.list[i].taxMoney
      //     }
      //     this.total = res.data.data.content.totalCount
      //   }
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 0.5 * 100)
      // })
    },
    // 清空搜索条件
    restFilter() {
      this.outRepositoryId = ''
      this.getemplist.outRepositoryId = ''
    },
    restFilter2() {
      this.enterRepositoryId = ''
      this.getemplist.enterRepositoryId = ''
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
    handlechooseRep2() {
      this.repositorycontrol2 = true
    },
    repositoryname(val) {
      console.log(val)
      this.outRepositoryId = val.repositoryName
      this.getemplist.outRepositoryId = val.id
    },
    repositoryname2(val) {
      console.log(val)
      this.enterRepositoryId = val.repositoryName
      this.getemplist.enterRepositoryId = val.id
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
