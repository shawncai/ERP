<template>
  <el-dialog :visible.sync="employeeVisible" :saleoutcontrol="saleoutcontrol" :personaldata="personalForm" :close-on-press-escape="false" top="10px" title="选择客户组" append-to-body width="1100px" @close="$emit('update:saleoutcontrol', false)">
    <el-card class="box-card" style="margin-top: 15px;height: 60px;padding-left:0 " shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" style="margin-top: -9px">
          <el-input v-model="getemplist.productCode" :placeholder="$t('Hmodule.wpbh')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
          <el-input v-model="getemplist.productName" :placeholder="$t('Hmodule.wpmc')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
          <el-input v-model="customerId" :placeholder="$t('update4.khm')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechooseRep" @clear="clearCustomer"/>
          <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
          <!--更多搜索条件-->
          <el-popover
            v-model="visible2"
            placement="bottom"
            width="500"
            trigger="click">
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="-"
              size="small"
              unlink-panels
              start-placeholder="销售日期"
              end-placeholder="销售日期"
              value-format="yyyy-MM-dd"
              style="margin-top: 20px;margin-left: 20px"/>
            <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
              <el-button v-waves class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>
            </div>
            <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
          </el-popover>

          <!-- 搜索按钮 -->
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

          <!-- <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button> -->

        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :height="tableHeight"
        :key="tableKey"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @row-click="clickRow"
        @current-change="handleCurrentChange">
        <el-table-column :label="$t('public.id')" :resizable="false" fixed="left" align="center" >
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('update4.groupName')" :resizable="false" fixed="left" align="center" >
          <template slot-scope="scope">
            <span>{{ scope.row.groupName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.level')" :resizable="false" align="center" >
          <template slot-scope="scope">
            <span>{{ scope.row.levelName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('update4.stat')" :resizable="false" prop="stat" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.stat | statFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('update4.summary')" :resizable="false" align="center" >
          <template slot-scope="scope">
            <span>{{ scope.row.summary }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-button v-waves class="filter-item" type="success" style="width: 100px;float: left;margin-bottom: 10px" @click="handleConfirm">{{ $t('Hmodule.sure') }}</el-button>
    </el-card>
  </el-dialog>
</template>

<script>
import { customerProductList, deleteCustomerProduct } from '@/api/Customer'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyCustomer from '../../SaleOrder/components/MyCustomer'

var _that
export default {
  directives: { waves },
  components: { Pagination, MyCustomer },
  filters: {
    statFilter(status) {
      const statusMap = {
        1: '启用',
        2: '停用'
      }
      return statusMap[status]
    }
  },
  props: {
    saleoutcontrol: {
      type: Boolean,
      default: false
    },
    personaldata: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      tableHeight: 200,

      // 接受数据
      querydata: this.personaldata,
      // 选择框控制
      employeeVisible: this.saleoutcontrol,
      customerId: '',
      repositoryId: '',
      repositorycontrol: false,
      repositories: [],
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
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds
      },
      // 传给组件的数据
      personalForm: {},
      // 修改控制组件数据
      editVisible: false,
      // 开始时间到结束时间
      date: []
    }
  },
  watch: {
    saleoutcontrol() {
      this.employeeVisible = this.saleoutcontrol
      this.getlist()
      console.log(this.querydata)

      setTimeout(() => {
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 180
      }, 100)
    },
    personaldata() {
      console.log(this.personaldata)
      this.querydata = this.personaldata
    }
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
              return (Number(prev) + Number(curr)).toFixed(6)
            } else {
              return (Number(prev)).toFixed(6)
            }
          }, 0))
          // console.log('sums[index]', sums[index])
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      return sums
    },
    // 反结单操作
    // handleReview3(row) {
    //   this.reviewParms = {}
    //   this.reviewParms.id = row.id
    //   // this.reviewParms.endPersonId = this.$store.getters.userId
    //   this.$confirm(this.$t('prompt.qfjd'), this.$t('prompt.fjd'), {
    //     distinguishCancelAndClose: true,
    //     confirmButtonText: this.$t('prompt.fjd'),
    //     type: 'warning'
    //   }).then(() => {
    //     this.reviewParms.receiptStat = 2
    //     const parms = JSON.stringify(this.reviewParms)
    //     updateprepReturn(parms).then(res => {
    //       if (res.data.ret === 200) {
    //         this.$message({
    //           type: 'success',
    //           message: this.$t('prompt.fjdcg')
    //         })
    //         this.getlist()
    //       }
    //     })
    //   })
    // },
    isReview3(row) {
      if (row.receiptStat === 3) {
        return true
      }
    },
    isReview4(row) {
      // 测试阶段临时
      if (row.judgeStat === 2) {
        return true
      }
      // 正式时放开
      // if (row.judgeStat === 2 && row.confirmPersonId === null) {
      //   return true
      // }
    },
    repositoryname(val) {
      console.log(val)
      this.repositoryId = val.repositoryName
      this.getemplist.repositoryId = val.id
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.customercontrol = true
    },
    clearrep() {
      this.getemplist.repositoryId = this.$store.getters.repositoryId
      this.repositoryId = ''
    },
    // 根据区域选择门店
    // getrepos() {
    //   console.log('this.$store.getters.repositoryId', this.$store.getters.repositoryId)
    //   if (this.$store.getters.repositoryId !== '' && this.$store.getters.repositoryId !== null && this.$store.getters.repositoryId !== undefined) {
    //     searchRepository(null, this.$store.getters.repositoryId, this.$store.getters.regionIds).then(res => {
    //       if (res.data.ret === 200) {
    //         this.repositories = res.data.data.content.list
    //       } else {
    //         this.$message.error('出错了')
    //       }
    //     })
    //   }
    // },
    clickRow(val) {
      if (val.judgeStat === 0) {
        this.$refs.table.toggleRowSelection(val)
      }
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
      this.customerId = ''
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
      this.customerId = val.customerName
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
      customerProductList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 清空搜索条件
    restFilter() {
      this.customerName = ''
      this.getemplist.customerId = ''
    },
    restFilter2() {
      this.stockPersonId = ''
      this.getemplist.stockPersonId = ''
    },
    // 搜索
    handleFilter() {
      console.log('this.date', this.date)
      if (this.date && this.date.length !== 0) {
        this.getemplist.beginTime = this.date[0] + ' 00:00:00'
        this.getemplist.endTime = this.date[1] + ' 23:59:59'
      } else {
        this.getemplist.beginTime = ''
        this.getemplist.endTime = ''
      }
      this.getemplist.pageNum = 1
      customerProductList(this.getemplist).then(res => {
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
      this.supplierId = val.supplierName
      this.getemplist.supplierId = val.id
    },
    // 修改组件修改成功后返回
    refreshlist(val) {
      if (val === true) {
        this.getlist()
      }
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/SaleOut/AddSaleOut')
    },
    // 选择主生产计划数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    handleConfirm() {
      this.employeeVisible = false
      this.$emit('groupData', this.choosedata)
    }
    // 仓库管理员选择结束
  }
}
</script>

<style scoped>
  .ERP-container {
    margin: 50px 30px;
  }
  .filter-item{
    width: 140px;
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
