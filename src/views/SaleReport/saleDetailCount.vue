<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- <el-cascader
        :options="regions"
        :props="props"
        v-model="getemplist.region"
        :show-all-levels="false"
        :placeholder="$t('Hmodule.xzqy')"
        change-on-select
        filterable
        clearable
        class="filter-item"
        @change="handlechange4"
      /> -->

      <el-input v-model="saleRepositoryId" :placeholder="$t('updates.repository')" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechooseRep" @clear="restFilter2"/>
      <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>

      <el-select v-model="getemplist.saleType" :placeholder="$t('saleBillList.saleType')" :value="getemplist.saleType" clearable class="filter-item" @keyup.enter.native="handleFilter">
        <el-option value="1" label="现金销售"/>
        <el-option value="2" label="分期销售"/>
      </el-select>
      <el-select v-model="getemplist.productCategory" :placeholder="$t('updates.fle')" :value="getemplist.productCategory" clearable class="filter-item" @keyup.enter.native="handleFilter">
        <el-option :label="$t('otherlanguage.zc')" value="1"/>
        <el-option :label="$t('otherlanguage.pj')" value="2"/>
        <el-option :label="$t('otherlanguage.jgj')" value="3"/>
        <el-option :label="$t('otherlanguage.dc')" value="5"/>
      </el-select>

      <el-date-picker
        v-model="date"
        :default-time="['00:00:00', '23:59:59']"
        type="daterange"
        range-separator="-"
        unlink-panels
        value-format="yyyy-MM-dd"
        style="width: 250px"/>
      <el-popover
        v-model="visible2"
        placement="bottom"
        width="500"
        trigger="click">
        <el-select v-model="getemplist.judgeStat" :placeholder="$t('tongyo.judgeStat')" :value="getemplist.judgeStat" clearable class="filter-item" @keyup.enter.native="handleFilter">
          <el-option :label="$t('updates.wsh')" value="0"/>
          <el-option :label="$t('updates.shz')" value="1"/>
          <el-option :label="$t('updates.shtg')" value="2"/>
          <el-option :label="$t('updates.shptg')" value="3"/>
        </el-select>

        <el-select v-model="getemplist.receiptStat" :placeholder="$t('tongyo.receiptStat')" :value="getemplist.receiptStat" clearable class="filter-item" @keyup.enter.native="handleFilter">
          <el-option :label="$t('updates.zd')" value="1"/>
          <el-option :label="$t('updates.zx')" value="2"/>
          <el-option :label="$t('updates.jd')" value="3"/>
        </el-select>
        <el-input v-model="getemplist.outNumber" :placeholder="$t('tongyo.outNumber')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

        <el-input v-model="getemplist.customerName" :placeholder="$t('updates2.customerName')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

        <el-select v-model="getemplist.quantityType" :placeholder="$t('tongyo.quantityType')" :value="getemplist.quantityType" clearable class="filter-item">
          <el-option :label="$t('tongyo.dy')" value="1"/>
          <el-option :label="$t('tongyo.dengy')" value="3"/>
          <el-option :label="$t('tongyo.xiaoyu')" value="2"/>
        </el-select>
        <el-input v-model="getemplist.quantity" :placeholder="$t('tongyo.quantity')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

        <el-select v-model="getemplist.thisType" :placeholder="$t('tongyo.thisType')" :value="getemplist.thisType" clearable class="filter-item">
          <el-option :label="$t('tongyo.dy')" value="1"/>
          <el-option :label="$t('tongyo.dengy')" value="3"/>
          <el-option :label="$t('tongyo.xiaoyu')" value="2"/>
        </el-select>
        <el-input v-model="getemplist.thisMoney" :placeholder="$t('tongyo.thisMoney')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

        <el-select v-model="getemplist.firstType" :placeholder="$t('tongyo.firstType')" :value="getemplist.firstType" clearable class="filter-item">
          <el-option :label="$t('tongyo.dy')" value="1"/>
          <el-option :label="$t('tongyo.dengy')" value="3"/>
          <el-option :label="$t('tongyo.xiaoyu')" value="2"/>
        </el-select>
        <el-input v-model="getemplist.firstMoney" :placeholder="$t('tongyo.firstMoney')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

        <el-select v-model="getemplist.paidType" :placeholder="$t('tongyo.paidType')" :value="getemplist.paidType" clearable class="filter-item">
          <el-option :label="$t('tongyo.dy')" value="1"/>
          <el-option :label="$t('tongyo.dengy')" value="3"/>
          <el-option :label="$t('tongyo.xiaoyu')" value="2"/>
        </el-select>
        <el-input v-model="getemplist.paidMoney" :placeholder="$t('tongyo.paidMoney')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
        <el-select v-model="getemplist.unPaidType" :placeholder="$t('tongyo.unPaidType')" :value="getemplist.unPaidType" clearable class="filter-item">
          <el-option :label="$t('tongyo.dy')" value="1"/>
          <el-option :label="$t('tongyo.dengy')" value="2"/>
          <el-option :label="$t('tongyo.xiaoyu')" value="3"/>
        </el-select>
        <el-input v-model="getemplist.unPaidMoney" :placeholder="$t('tongyo.unPaidMoney')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

        <el-select v-model="getemplist.shouldType" :placeholder="$t('tongyo.shouldType')" :value="getemplist.shouldType" clearable class="filter-item">
          <el-option :label="$t('tongyo.dy')" value="1"/>
          <el-option :label="$t('tongyo.dengy')" value="3"/>
          <el-option :label="$t('tongyo.xiaoyu')" value="2"/>
        </el-select>
        <el-input v-model="getemplist.shouldMoney" :placeholder="$t('tongyo.shouldMoney')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

        <el-input v-model="createPersonId" :placeholder="$t('tongyo.createPersonId')" class="filter-item" clearable @clear="restFilter" @keyup.enter.native="handleFilter" @focus="handlechooseStock"/>
        <my-emp :control.sync="stockControl" @stockName="stockName"/>

        <el-input v-model="getemplist.invoiceNumber" :placeholder="$t('tongyo.invoiceNumber')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

        <el-select v-model="getemplist.invoiceType" :placeholder="$t('tongyo.invoiceType')" :value="getemplist.invoiceType" clearable class="filter-item" @keyup.enter.native="handleFilter">
          <el-option
            v-for="(item, index) in invoiceTypes"
            :value="item.id"
            :key="index"
            :label="item.categoryName"
          />
        </el-select>

        <el-input v-model="getemplist.summary" :placeholder="$t('tongyo.summary')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

        <el-input v-model="getemplist.carCode" :placeholder="$t('tongyo.carCode')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
        <el-input v-model="getemplist.motorCode" :placeholder="$t('tongyo.motorCode')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
        <el-input v-model="getemplist.batteryCode" :placeholder="$t('tongyo.batteryCode')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
        <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>

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
        <el-table-column
          :label="$t('tongyo.outNumber')"
          fixed="left"
          prop="outNumber"
          width="200"
          align="center">
          <template slot-scope="scope">
            <span class="link-type" @click="handleReceipt2(scope.row.outNumber)">{{ scope.row.outNumber }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="personalForm"/>
        </el-table-column>
        <el-table-column
          :label="$t('tongyo.customerName')"
          fixed="left"
          prop="customerName"
          width="200"
          align="center"/>
        <el-table-column
          :label="$t('tongyo.receiptDate')"

          prop="receiptDate"
          width="200"
          align="center"/>
        <el-table-column
          :label="$t('tongyo.quantity')"

          prop="quantity"
          width="200"
          align="center"/>
        <el-table-column
          :label="$t('tongyo.includeTaxMoney')"

          prop="includeTaxMoney"
          width="200"
          align="center"/>
        <el-table-column
          :label="$t('tongyo.thisMoney')"
          prop="thisMoney"
          width="200"
          align="center"/>
        <el-table-column
          :label="$t('tongyo.fistMoney')"
          prop="firstMoney"
          width="200"
          align="center"/>
        <el-table-column
          :label="$t('tongyo.shouldMoney')"
          prop="shouldMoney"
          width="200"
          align="center"/>
        <el-table-column
          :label="$t('tongyo.paidMoney')"
          prop="paidMoney"
          width="200"
          align="center"/>
        <el-table-column
          :label="$t('tongyo.unPaidMoney')"
          prop="unPaidMoney"
          width="200"
          align="center"/>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { searchsaleOut } from '@/api/SaleOut'
import { searchSaleCategory } from '@/api/SaleCategory'
import { searchEmpCategory2 } from '@/api/Product'
import { saleDetailCount2, saleBillListDetail } from '@/api/count'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import { regionlist } from '@/api/public'
import MyEmp from './components/MyEmp'
import DetailList from './components/DetailList2'
import MyDialog from './components/MyDialog'
import MyCustomer from './components/MyCustomer'
import MyAgent from './components/MyAgent'
import MyRepository from './components/MyRepository'
import MyTree from './components/MyTree'
import MySupplier from './components/MySupplier'

var _that
export default {
  name: 'SaleDetailCount',
  directives: { waves, permission, permission2 },
  components: { MyDialog, DetailList, MyRepository, MySupplier, MyEmp, MyCustomer, MyTree, MyAgent, Pagination },
  filters: {
    saleTypeFilter(sta) {
      const statusMap = {

        1: _that.$t('prompt.xj'),
        2: _that.$t('prompt.fq')

      }
      return statusMap[sta]
    },
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
      // 更多搜索条件问题
      visible2: false,
      // 开票类别获取参数
      invoicetypeparms: {
        type: 4,
        pagenum: 1,
        pagesize: 99999
      },
      invoiceTypes: [],
      saleRepositoryId: '',
      stockControl: false,
      createPersonId: '',
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
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
      regions: [],
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
      // 供应商回显
      supplierId: '',
      // 供应商控制框
      empcontrol: false,
      // 采购人回显
      stockPersonId: '',
      // 批量操作
      moreaction: '',
      // 加载操作控制
      downloadLoading: false,
      // 表格数据
      list: [],
      list2: [],
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
      receiptVisible2: false,
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
    // 清空搜索条件
    restFilter() {
      this.createPersonId = ''
      this.getemplist.createPersonId = ''
    },
    // 申请人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 申请人回显
    stockName(val) {
      this.createPersonId = val.personName
      this.getemplist.createPersonId = val.id
    },
    handleReceipt2(row) {
      const salenumber = {
        number: row,
        pageNum: 1,
        pageSize: 111,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds
      }
      searchsaleOut(salenumber).then(res => {
        console.log(res.data.data.content)
        if (res.data.ret === 200) {
          this.detailvisible = true
          this.personalForm = Object.assign({}, res.data.data.content.list[0])
        }
      })
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
    handlechange4(val) {
      console.log(val)
      const finalid = val[val.length - 1]
      console.log(finalid)
      this.getemplist.regionId = finalid
      // searchRepository(finalid).then(res => {
      //   console.log(res)
      //   if (res.data.ret === 200) {
      //     this.repositories = res.data.data.content.list
      //   } else {
      //     console.log('区域选择门店')
      //   }
      // })
    },
    // findPathByLeafId(leafId, nodes, path) {
    //   if (path === undefined) {
    //     path = []
    //   }
    //   for (var i = 0; i < nodes.length; i++) {
    //     var tmpPath = path.concat()
    //     tmpPath.push(nodes[i].id)
    //     if (leafId === nodes[i].id) {
    //       return tmpPath
    //     }
    //     if (nodes[i].regionListVos) {
    //       var findResult = this.findPathByLeafId(leafId, nodes[i].regionListVos, tmpPath)
    //       if (findResult) {
    //         return findResult
    //       }
    //     }
    //   }
    // },
    // getarrs() {
    //   console.log('222', 222)
    //   console.log('北京市朝阳区爱谁谁')
    //   console.log('this.personalForm', this.getemplist)
    //   console.log('this.regions', this.regions)
    //   const needata = this.findPathByLeafId(this.getemplist.region, this.regions)
    //   console.log('needata', needata)
    //   this.getemplist.regionId = needata
    //   const finalid = needata[needata.length - 1]
    //   console.log(finalid)
    //   this.region = finalid
    // },
    tranKTree(arr) {
      if (!arr || !arr.length) return
      return arr.map(item => ({
        id: item.id,
        regionName: item.regionName,
        regionListVos: this.tranKTree(item.regionListVos)
      }))
    },
    gettype() {
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
          // this.getarrs()
        } else {
          console.log('区域列表出错')
        }
      })
      searchEmpCategory2(2).then(res => {
        if (res.data.ret === 200) {
          this.types = res.data.data.content.list
        }
      })
      // 开票类型数据
      searchSaleCategory(this.invoicetypeparms).then(res => {
        if (res.data.ret === 200) {
          this.invoiceTypes = res.data.data.content.list
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
      saleDetailCount2(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    restFilter2() {
      this.saleRepositoryId = ''
      this.getemplist.saleRepositoryId = ''
    },
    restFilter3() {
      this.handlePersonId = ''
      this.getemplist.handlePersonId = ''
    },
    // 搜索
    handleFilter() {
      console.log(this.date)
      if (this.date.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: '请选择日期开始搜索',
          offset: 100
        })
        return false
      }
      console.log('this.getemplist.repositoryId', this.getemplist.repositoryId)
      console.log('this.getemplist.regionId', this.getemplist.regionId)
      if ((this.getemplist.saleRepositoryId === '' || this.getemplist.saleRepositoryId === null || this.getemplist.saleRepositoryId === undefined)) {
        this.$notify.error({
          title: 'wrong',
          message: '请选择区域或者门店开始搜索',
          offset: 100
        })
        return false
      }
      if ((this.getemplist.saleRepositoryId !== '' && this.getemplist.saleRepositoryId !== null && this.getemplist.saleRepositoryId !== undefined)) {
        this.$notify.error({
          title: 'wrong',
          message: '请选择门店',
          offset: 100
        })
        return false
      }
      this.getemplist.beginTime = this.date[0] + ' 00:00:00'
      this.getemplist.endTime = this.date[1] + ' 23:59:59'
      console.log(this.getemplist)
      this.listLoading = true
      saleDetailCount2(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
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
      this.saleRepositoryId = val.repositoryName
      this.getemplist.saleRepositoryId = val.id
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
