<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px" shadow="never">

      <el-input v-model="supplierId" :placeholder="$t('StockContract.supplierId')" class="filter-item" @focus="handlechoose"/>
      <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>

      <el-date-picker
        ref="datesRef"
        v-model="data1"
        :editable = "false"
        :placeholder="$t('shouldPayCount.startMonth')"
        type="month"
        format="yyyy-MM"
        value-format="yyyy-MM"
        class="filter-item"
      />
      <el-date-picker
        ref="datesRef"
        v-model="data2"
        :editable = "false"
        :placeholder="$t('shouldPayCount.endMonth')"
        type="month"
        format="yyyy-MM"
        class="filter-item"
        value-format="yyyy-MM"/>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>

    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 列表开始 -->
      <el-table
        :data="list"
        border
        style="width: 100%">
        <el-table-column
          :label="$t('shouldPayDetail.financeDate')"
          prop="financeDate"
          width="250"
          align="center"/>
        <el-table-column
          :label="$t('shouldPayDetail.receiptType')"
          prop="receiptType"
          width="250"
          align="center"/>
        <el-table-column
          :label="$t('shouldPayDetail.receiptNumber')"
          prop="receiptNumber"
          width="250"
          align="center"/>
        <el-table-column
          :label="$t('shouldPayDetail.deptName')"
          prop="deptName"
          width="250"
          align="center"/>
        <el-table-column
          :label="$t('shouldPayDetail.handlePersonName')"
          prop="handlePersonName"
          width="250"
          align="center"/>
        <el-table-column
          :label="$t('shouldPayDetail.shouldPay')"
          prop="shouldPay"
          width="250"
          align="center"/>
        <el-table-column
          :label="$t('shouldPayDetail.paid')"
          prop="paid"
          width="250"
          align="center"/>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { shouldPayDetail } from '@/api/count'
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

var _that
export default {
  name: 'ShouldPayDetail',
  directives: { waves, permission, permission2 },
  components: { MyDialog, DetailList, MyEmp, MyCustomer, MySupplier, MyAgent, MyRepository, Pagination },
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
      data1: '',
      data2: '',
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
        repositoryId: '',
        regionIds: this.$store.getters.regionIds,
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
    // this.getlist()
    // this.changeName()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
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
      // this.listLoading = true
      // shouldPayCount(this.getemplist).then(res => {
      //   if (res.data.ret === 200) {
      //     this.list = res.data.data.content
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
      this.customerName = ''
      this.getemplist.customerId = ''
      this.stockPersonId = ''
      this.getemplist.stockPersonId = ''
    },
    // 搜索
    handleFilter() {
      if (this.data1 !== null && this.data2 !== null && this.supplierId !== '' && this.data1 !== '' && this.data2 !== '') {
        console.log(66666)
        var result = []
        var starts = this.data1.split('-')
        var ends = this.data2.split('-')
        var staYear = parseInt(starts[0])
        var staMon = parseInt(starts[1])
        var endYear = parseInt(ends[0])
        var endMon = parseInt(ends[1])
        while (staYear <= endYear) {
          if (staYear === endYear) {
            while (staMon < endMon) {
              staMon++
              let needdatas = ''
              console.log('staMon.length', staMon.length)
              console.log('staMon', staMon)
              if (staMon.toString().length === 1) {
                needdatas = staYear + '-0' + staMon
              } else {
                needdatas = staYear + '-' + staMon
              }
              console.log('needdatas', needdatas)
              result.push(needdatas)
            }
            staYear++
          } else {
            staMon++
            if (staMon > 12) {
              staMon = 1
              staYear++
            }
            let needdatas = ''
            if (staMon.toString().length === 1) {
              needdatas = staYear + '-0' + staMon
            } else {
              needdatas = staYear + '-' + staMon
            }
            console.log('needdatas', needdatas)
            result.push(needdatas)
          }
        }

        this.getemplist.dateList = result
        shouldPayDetail(this.getemplist).then(res => {
          if (res.data.ret === 200) {
            this.list = res.data.data.content
            console.log('this.list', this.list)
            // for (let i = 0; i < this.list.length; i++) {
            //   this.list[i].heji = this.list[i].totalMoney + this.list[i].taxMoney
            // }
            // this.total = res.data.data.content.totalCount
          }
        })
      } else {
        this.list = []
        this.$notify.error({
          title: 'wrong',
          message: '搜索条件不能为空',
          offset: 100
        })
      }
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
   width: 180px;
    margin-left: 20px;
    padding: 10px 0;
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
