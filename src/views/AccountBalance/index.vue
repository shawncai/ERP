<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px" shadow="never">

      <el-date-picker
        v-model="date2"
        :placeholder="$t('updates.xzy')"
        type="month"
        value-format="yyyy-MM"
        class="filter-item"/>

      <el-input v-model="repositoryId" :placeholder="$t('updates.repository')" class="filter-item" @clear="restFilter" @keyup.enter.native="handleFilter" @focus="handlechooseRep"/>
      <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
      <el-button v-permission="['266-372-79']" v-waves class="filter-item" type="primary" style="width: 120px;margin-top: 10px" round @click="handleFilter2">{{ $t('collectAndPayDetail.lrqcsj') }}</el-button>

    </el-card>

    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 列表开始 -->
      <el-table
        :data="list"
        border
        style="width: 100%">
        <el-table-column
          :label="$t('otherlanguage.kmdm')"
          prop="subjectCode"
          width="200"
          align="center"/>
        <el-table-column
          :label="$t('otherlanguage.kmmc')"
          prop="subjectName"
          width="200"
          align="center"/>
        <el-table-column
          :label="$t('otherlanguage.qcye')"
          width="200"
          align="center">
          <el-table-column
            :label="$t('otherlanguage.jf')"
            prop="beginDebitMoney"
            width="200"
            align="center"/>
          <el-table-column
            :label="$t('otherlanguage.df')"
            prop="beginCreditMoney"
            width="200"
            align="center"/>
        </el-table-column>
        <el-table-column
          :label="$t('otherlanguage.bqfse')"
          width="200"
          align="center">
          <el-table-column
            :label="$t('otherlanguage.jf')"
            prop="changeDebitMoney"
            width="200"
            align="center"/>
          <el-table-column
            :label="$t('otherlanguage.df')"
            prop="changeCreditMoney"
            width="200"
            align="center"/>
        </el-table-column>
        <el-table-column
          :label="$t('otherlanguage.bnljfse')"
          width="200"
          align="center">
          <el-table-column
            :label="$t('otherlanguage.jf')"
            prop="yearDebitMoney"
            width="200"
            align="center"/>
          <el-table-column
            :label="$t('otherlanguage.df')"
            prop="yearCreditMoney"
            width="200"
            align="center"/>
        </el-table-column>
        <el-table-column
          :label="$t('otherlanguage.qmye')"
          width="200"
          align="center">
          <el-table-column
            :label="$t('otherlanguage.jf')"
            prop="endDebitMoney"
            width="200"
            align="center"/>
          <el-table-column
            :label="$t('otherlanguage.df')"
            prop="endCreditMoney"
            width="200"
            align="center"/>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <!-- <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" /> -->
    </el-card>
    <el-dialog :visible.sync="categoryVisible2" :title="$t('collectAndPayDetail.lrqcsj')" append-to-body width="600px" class="normal" center>
      <el-editable
        v-loading="listLoading"
        ref="editable"
        :data.sync="list2"
        :edit-config="{ showIcon: true, showStatus: true}"
        class="click-table1"
        height="600px"
        stripe
        border
        size="medium"
        style="width: 100%">
        <el-editable-column :label="$t('Hmodule.xh')" fixed min-width="55" align="center" type="index"/>
        <el-editable-column :label="$t('updates.kmmc')" fixed prop="subjectName" align="center" min-width="150px"/>
        <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 2}, type: 'visible'}" label="期初余额借方" prop="beginDebitMoney" align="center" min-width="150px"/>
        <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 2}, type: 'visible'}" label="期初余额贷方" prop="beginCreditMoney" align="center" min-width="150px"/>
      </el-editable>
      <span slot="footer" class="dialog-footer">
        <el-button v-no-more-click type="primary" @click="handlesave2()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel2()">{{ $t('Hmodule.cancel') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { subjectBalanceList } from '@/api/voucher'
import { initBalance, getSubject } from '@/api/SubjectFinance'
import { productSendAndReceive } from '@/api/count'
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
import MyTree from './components/MyTree'
import MySupplier from './components/MySupplier'

var _that
export default {
  name: 'Index',
  directives: { waves, permission, permission2 },
  components: { MyDialog, DetailList, MyRepository, MySupplier, MyEmp, MyCustomer, MyTree, MyAgent, Pagination },
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
      list2: [],
      list: [],
      categoryId: '',
      first: '',
      step1: '',
      step2: '',
      step3: '',
      step4: '',
      step5: '',
      step6: '',
      step7: '',
      date2: [],
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
      addCategoryForm2: {
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
      // 表格数据条数
      total: 0,
      // 表格识别
      tableKey: 0,
      // 加载表格
      listLoading: false,
      // 采购申请查询加展示参数
      getemplist: {
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds
      },
      // 传给组件的数据
      personalForm: {},
      // 修改控制组件数据
      editVisible: false,
      // 开始时间到结束时间
      date: [],
      categoryVisible2: false
    }
  },

  mounted() {
    this.getdatatime()
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 深拷贝
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    handlesave2() {
      const EnterDetail = this.deepClone(this.$refs.editable.getRecords())
      const parms2 = JSON.stringify(EnterDetail)
      this.listLoading = true
      initBalance(parms2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '成功',
            message: '新建成功',
            type: 'success',
            offset: 100
          })
          this.getlist()
          this.categoryVisible2 = false
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    getdatatime() { // 默认显示今天
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month
      this.date2 = currentdate
      getSubject().then(res => {
        if (res.data.ret === 200) {
          const list = res.data.data.content
          for (let i = 0; i < list.length; i++) {
            const param = {}
            param.subjectName = list[i].subjectName
            param.subjectCode = list[i].subjectCode
            param.beginDebitMoney = 0.0
            param.beginCreditMoney = 0.0
            this.list2.push(list[i])
          }
          console.log('this.list2', this.list2)
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
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
      // 物料需求计划列表数据
      if (this.date2 === null || this.date2 === undefined || this.date2 === '' || this.date2.length === 0) {
        this.getemplist.receiptdate = '2019-10'
      } else {
        this.getemplist.receiptdate = this.date2
      }
      subjectBalanceList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
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
    handleFilter2() {
      this.categoryVisible2 = true
    },
    handlecancel2() {
      this.categoryVisible2 = false
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      console.log('this.date2', this.date2)
      if (this.date2 === null || this.date2 === undefined || this.date2 === '' || this.date2.length === 0) {
        this.getemplist.receiptdate = '2019-10'
      } else {
        this.getemplist.receiptdate = this.date2
      }
      subjectBalanceList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
        //   this.total = res.data.data.content2.totalCount
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
