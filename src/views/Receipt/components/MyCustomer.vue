<template>
  <el-dialog :visible.sync="employeeVisible" :customercontrol="customercontrol" :close-on-press-escape="false" top="10px" title="选择客户" append-to-body width="1100px" @close="$emit('update:customercontrol', false)">
    <el-card class="box-card" style="margin-top: 15px;height: 60px;padding-left:0 " shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" style="margin-top: -9px">
          <el-col :span="4">
            <el-form-item>
              <el-input v-model="getemplist.customername" :placeholder="$t('Customer.customername')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 5px">
            <el-form-item>
              <el-input v-model="getemplist.customerphone" :placeholder="$t('Customer.phone')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 20px">
            <el-form-item>
              <el-select v-model="getemplist.type" :value="getemplist.type" :placeholder="$t('Customer.customertype')" clearable>
                <el-option
                  v-for="(item, index) in customertypes"
                  :key="index"
                  :value="item.id"
                  :label="item.categoryName"/>
              </el-select>
            </el-form-item>
          </el-col>
          <!--更多搜索条件-->
          <el-col :span="3" style="margin-left: 30px">
            <el-popover
              v-model="visible2"
              placement="bottom"
              width="500"
              trigger="click">
              <el-select v-model="getemplist.source" :value="getemplist.source" :placeholder="$t('Customer.source')" clearable style="width: 40%;float: left;margin-left: 20px;">
                <el-option
                  v-for="(item, index) in sources"
                  :key="index"
                  :value="item.id"
                  :label="item.categoryName"/>
              </el-select>
              <el-select v-model="getemplist.repositoryid" :placeholder="$t('Hmodule.xzmd')" filterable clearable style="width: 40%;float: right;margin-right: 20px">
                <el-option
                  v-for="(item, index) in repositories"
                  :key="index"
                  :label="item.repositoryName"
                  :value="item.id"/>
              </el-select>
              <el-select v-model="getemplist.level" :placeholder="$t('Customer.level')" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
                <el-option
                  v-for="(item, index) in levels"
                  :key="index"
                  :value="item.id"
                  :label="item.categoryName"/>
              </el-select>
              <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
                <el-button v-waves class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>
              </div>
              <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
            </el-popover>
          </el-col>
          <el-col :span="3" style="margin-left: 20px">
            <!-- 搜索按钮 -->
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
          </el-col>
          <el-col :span="3">
            <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :key="tableKey"
        :data="list"
        :height="tableHeight"
        size="small"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @current-change="handleCurrentChange">
        <el-table-column :label="$t('public.id')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.customername')" :resizable="false" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.customerName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.customertype')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.customerTypeWZ }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.level')" :resizable="false" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.customerLevel }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.birthday')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.birthday }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.source')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.source }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.newold')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.newOrOld | filterno }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.phone')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.phoneNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.gender')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.gender | genderFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.address')" :resizable="true" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.point')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.point }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.createTime')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-button v-waves class="filter-item" type="success" style="width: 100px;float: left;margin-bottom: 10px" @click="handleConfirm">{{ $t('Hmodule.sure') }}</el-button>
    </el-card>
  </el-dialog>
</template>

<script>
import { searchRepository } from '@/api/public'
import { searchCusCategory, customerlist } from '@/api/Customer'
import { installmentlist } from '@/api/InstallmentList'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

// eslint-disable-next-line no-unused-vars
var _that
export default {
  directives: { waves },
  components: { Pagination },
  filters: {
    genderFilter(status) {
      const statusMap = {
        1: '男',
        2: '女'
      }
      return statusMap[status]
    },
    filterno(status) {
      const statusMap = {
        1: '老客户',
        2: '新客户'
      }
      return statusMap[status]
    }
  },
  props: {
    customercontrol: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableHeight: 200,

      // 选择框控制
      employeeVisible: this.customercontrol,
      // 更多搜索条件问题
      visible2: false,
      // 所有客户类型数据
      // 发送参数
      customertypes: [],
      customertyp: 1,
      // 优质级别类型所有数据
      // 发送参数
      levels: [],
      levelstype: 2,
      // 客户来源所有数据
      // 发送参数
      sources: [],
      sourcestype: 3,
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
      // 客户列表查询加展示参数
      getemplist: {
        customername: '',
        customerphone: '',
        level: '',
        createtime: '',
        type: '',
        pagenum: 1,
        pagesize: 10,
        source: '',
        repositoryid: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds
      },
      // 部门列表
      depts: [],
      // 区域级联数据转化
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      // 区域数据
      regions: [],
      getemplistregions: [],
      // 门店数据
      repositories: []
    }
  },
  watch: {
    customercontrol() {
      this.employeeVisible = this.customercontrol
      this.getlist()
      this.getCategory()

      setTimeout(() => {
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 180
      }, 100)
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 获取类型
    getCategory() {
      // 获取客户类型
      searchCusCategory(this.customertyp).then(res => {
        if (res.data.ret === 200) {
          this.customertypes = res.data.data.content.list
        } else {
          console.log('客户类型出错')
        }
      })
      // 获取客户优质级别
      searchCusCategory(this.levelstype).then(res => {
        if (res.data.ret === 200) {
          this.levels = res.data.data.content.list
        } else {
          console.log('客户优质级别出错')
        }
      })
      // 获取客户来源
      searchCusCategory(this.sourcestype).then(res => {
        if (res.data.ret === 200) {
          this.sources = res.data.data.content.list
        } else {
          console.log('客户来源出错')
        }
      })
      // 获取所有门店
      searchRepository().then(res => {
        if (res.data.ret === 200) {
          this.repositories = res.data.data.content.list
        } else {
          console.log('门店出错')
        }
      })
    },
    getlist() {
      // 员工列表数据
      this.listLoading = true
      customerlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        } else {
          console.log('员工列表出错')
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      customerlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        } else {
          console.log('搜索出错')
        }
      })
    },
    // 转化数据方法
    tranKTree(arr) {
      if (!arr || !arr.length) return
      return arr.map(item => ({
        id: item.id,
        regionName: item.regionName,
        regionListVos: this.tranKTree(item.regionListVos)
      }))
    },
    // 根据区域选择门店
    handlechange4(val) {
      const finalid = val[val.length - 1]
      searchRepository(finalid).then(res => {
        if (res.data.ret === 200) {
          this.repositories = res.data.data.content
        } else {
          this.$message.error('出错了')
        }
      })
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/Customer/NewCustomer')
    },
    // 选择主生产计划数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    async handleConfirm() {
      console.log(this.choosedata)
      const date = new Date()
      const str = this.choosedata.customerName
      const getemplist = {
        pageNum: 1,
        pageSize: 10,
        repositoryId: 0,
        customerId: this.choosedata.id
      }
      let Installmentdata = []
      await installmentlist(getemplist).then(res => {
        console.log(res)
        Installmentdata = res.data.data.content.list
      })
      console.log('Installmentdata', Installmentdata)
      if (Installmentdata.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: '该客户没有分期信息',
          offset: 100
        })
        return false
      }
      const InstallmentDetail = Installmentdata[0].installmentOrderDetailVos.map(function(item) {
        return {
          installmentDetailId: item.id,
          presentCount: item.idx,
          returnMoney: item.shouldMoney,
          shouldMoney: item.shouldMoney,
          returnSource: item.capitalMoney,
          reward: item.reward,
          penalty: item.penalty,
          returnInterest: item.interestMoney,
          paidmoney: item.paidMoney,
          unpay: item.shouldMoney - item.paidMoney,
          installmentId: item.installmentId,
          stat: item.stat
        }
      })
      console.log('InstallmentDetail', InstallmentDetail)
      this.$emit('InstallmentDetail', InstallmentDetail)
      this.$emit('Installment', this.choosedata)
      this.employeeVisible = false
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
