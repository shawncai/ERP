<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px" shadow="never">

      <el-select v-model="getemplist.productCategory" :placeholder="$t('updates.fle')" :value="getemplist.productCategory" clearableclass="filter-item" @keyup.enter.native="handleFilter">
        <el-option :label="$t('otherlanguage.zc')" value="1"/>
        <el-option :label="$t('otherlanguage.pj')" value="2"/>
        <el-option :label="$t('otherlanguage.jgj')" value="3"/>
        <el-option :label="$t('otherlanguage.dc')" value="5"/>
      </el-select>

      <el-input v-model="repositoryId" :placeholder="$t('updates.repository')" class="filter-item" @keyup.enter.native="handleFilter" @focus="handlechooseRep" @clear="restFilter2"/>
      <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>

      <el-select v-model="getemplist.saleType" :placeholder="$t('saleBillList.saleType')" :value="getemplist.saleType" clearable class="filter-item" @keyup.enter.native="handleFilter">
        <el-option value="1" label="现金销售"/>
        <el-option value="2" label="分期销售"/>
      </el-select>
      <el-date-picker
        v-model="date"
        :default-time="['00:00:00', '23:59:59']"
        type="daterange"
        range-separator="-"
        unlink-panels
        value-format="yyyy-MM-dd"
        style="width: 250px"/>
      <el-select v-model="getemplist.productType" :placeholder="$t('Hmodule.qxzggxh')" class="filter-item" clearable>
        <el-option
          v-for="(item, index) in types"
          :key="index"
          :label="item.categoryName"
          :value="item.id"
        />
      </el-select>

      <!-- <el-col :span="4" style="margin-left: 56px">
            <el-form-item :label="$t('updates.cjh')">
              <el-input v-model="getemplist.carCode" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left: 46px">
            <el-form-item :label="$t('updates.djbha')">
              <el-input v-model="getemplist.motorCode" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left: 26px">
            <el-form-item :label="$t('updates.dcbm')">
              <el-input v-model="getemplist.batteryCode" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col> -->

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-top:10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>

    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        :data="list"
        :summary-method="getSummaries2"
        border
        show-summary
        style="width: 100%">
        <!--        <el-table-column-->
        <!--          :label="$t('saleBillList.repositoryName')"-->
        <!--          prop="repositoryName"-->
        <!--          width="200"-->
        <!--          align="center"/>-->
        <el-table-column
          :label="$t('saleBillList.productName')"
          fixed="left"
          prop="productName"
          width="200"
          align="center"/>
        <el-table-column
          :label="$t('saleBillList.productCode')"
          fixed="left"
          prop="productCode"
          width="200"
          align="center"/>
        <el-table-column
          :label="$t('saleBillList.color')"
          fixed="left"
          prop="color"
          width="200"
          align="center"/>
        <el-table-column :label="$t('saleBillList.saleout')" align="center">
          <el-table-column
            :label="$t('saleBillList.money')"
            prop="outActualMoney"
            width="200"
            align="center"/>
          <el-table-column
            :label="$t('saleBillList.quantity')"
            prop="outQuantity"
            width="200"
            align="center"/>
        </el-table-column>
        <el-table-column :label="$t('saleBillList.salereurn')" align="center">
          <el-table-column
            :label="$t('saleBillList.money')"
            prop="returnActualMoney"
            width="200"
            align="center"/>
          <el-table-column
            :label="$t('saleBillList.quantity')"
            prop="returnQuantity"
            width="200"
            align="center"/>
        </el-table-column>

        <el-table-column :label="$t('saleBillList.repair')" align="center">
          <el-table-column
            :label="$t('saleBillList.serviceMoney')"
            prop="serviceMoney"
            width="200"
            align="center"/>
          <el-table-column
            :label="$t('saleBillList.serviceQuantity')"
            prop="serviceQuantity"
            width="200"
            align="center"/>
          <el-table-column
            :label="$t('saleBillList.freeQuantity')"
            prop="serviceQuantity"
            width="200"
            align="center"/>
          <el-table-column
            :label="$t('saleBillList.freeMoney')"
            prop="serviceQuantity"
            width="200"
            align="center"/>
        </el-table-column>

        <el-table-column :label="$t('saleBillList.actualsale')" align="center">
          <el-table-column
            :label="$t('saleBillList.actualMoney')"
            prop="money"
            width="200"
            align="center"/>
          <el-table-column
            :label="$t('saleBillList.quantity')"
            prop="quantity"
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
      <!-- <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" /> -->
    </el-card>
  </div>
</template>

<script>
import { searchEmpCategory2 } from '@/api/Product'
import { saleBillList } from '@/api/count'
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
  name: 'SaleBillList',
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
      categoryId: '',
      first: '',
      second: false,
      third: '',
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
      handlePersonId: '',
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
        repositoryId: ''
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
    this.gettype()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 总计
    getSummaries2(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        if (index === 1) {
          sums[index] = ''
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return (Number(prev) + Number(curr)).toFixed(2)
            } else {
              return (Number(prev)).toFixed(2)
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      return sums
    },
    gettype() {
      searchEmpCategory2(2).then(res => {
        if (res.data.ret === 200) {
          this.types = res.data.data.content.list
        }
      })
    },
    checkPermission,
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
      saleBillList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 清空搜索条件
    restFilter() {
      this.productCategory = ''
      this.getemplist.productCategory = ''
    },
    restFilter2() {
      this.repositoryId = ''
      this.getemplist.repositoryId = ''
    },
    restFilter3() {
      this.handlePersonId = ''
      this.getemplist.handlePersonId = ''
    },
    // 搜索
    handleFilter() {
      console.log(this.date)
      if (this.getemplist.repositoryId === '' || this.getemplist.repositoryId === '' || this.date.length === 0) {
        this.$notify.error({
          title: '错误',
          message: '请选择门店和日期开始搜索',
          offset: 100
        })
        return false
      }

      this.getemplist.beginTime = this.date[0] + ' 00:00:00'
      this.getemplist.endTime = this.date[1] + ' 23:59:59'
      console.log(this.getemplist)
      this.listLoading = true
      saleBillList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
        } else {
          // this.restFilter()
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.repositoryId = val.repositoryName
      this.getemplist.repositoryId = val.id
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
