<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px;" shadow="never">

      <el-input v-model="getemplist.number" :placeholder="$t('public.id')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="getemplist.customerName" :placeholder="$t('Receipt.customerId')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="repositoryId" :placeholder="$t('StockAlarm.searchRepositoryId')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechooseRep" @clear="clearFilter"/>
      <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
      <!--更多搜索条件-->
      <!--<el-col :span="3">-->
      <!--<el-popover-->
      <!--v-model="visible2"-->
      <!--placement="bottom"-->
      <!--width="500"-->
      <!--trigger="click">-->
      <!--<el-select v-model="getemplist.receiptStat" :value="getemplist.receiptStat" :placeholder="$t('updates.djzt')" clearable style="width: 40%;float: left;margin-left: 20px">-->
      <!--<el-option value="1" :label="$t('updates.zd')"/>-->
      <!--<el-option value="2" :label="$t('updates.zx')"/>-->
      <!--<el-option value="3" :label="$t('updates.jd')"/>-->
      <!--</el-select>-->
      <!--<el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" :placeholder="$t('updates.spzt')" clearable style="width: 40%;float: right;margin-right: 20px">-->
      <!--<el-option value="0" :label="$t('updates.wsh')"/>-->
      <!--<el-option value="1" :label="$t('updates.shz')"/>-->
      <!--<el-option value="2" :label="$t('updates.shtg')"/>-->
      <!--<el-option value="3" :label="$t('updates.shptg')"/>-->
      <!--</el-select>-->
      <!--&lt;!&ndash;<el-date-picker&ndash;&gt;-->
      <!--&lt;!&ndash;v-model="date"&ndash;&gt;-->
      <!--&lt;!&ndash;type="daterange"&ndash;&gt;-->
      <!--&lt;!&ndash;range-separator="-"&ndash;&gt;-->
      <!--&lt;!&ndash;unlink-panels&ndash;&gt;-->
      <!--&lt;!&ndash;start-placeholder="销售日期"&ndash;&gt;-->
      <!--&lt;!&ndash;end-placeholder="销售日期"&ndash;&gt;-->
      <!--&lt;!&ndash;value-format="yyyy-MM-dd"&ndash;&gt;-->
      <!--&lt;!&ndash;style="margin-top: 20px;margin-left: 20px"/>&ndash;&gt;-->
      <!--<div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">-->
      <!--<el-button v-waves class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>-->
      <!--</div>-->
      <!--<el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>-->
      <!--</el-popover>-->

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['200-365-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['200-365-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['200-365-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>

      <el-button v-permission="['266-373-1']" v-waves :loading="downloadLoading2" icon="el-icon-tickets" class="filter-item" style="width: 86px" @click="handlevoucherparms">{{ $t('otherlanguage.newvoucher') }}</el-button>

      <el-dialog :visible.sync="categoryVisible" :title="$t('otherlanguage.newvoucher')" class="normal" width="600px" center>
        <el-form ref="addCategoryForm" :model="voucherparms" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
          <el-form-item :label="$t('otherlanguage.md')" label-width="100px" prop="type">
            <el-select v-model="voucherparms.repositoryId" :disabled="isvoucherrep" style="width: 100%" filterable clearable @change="choosevoucherrep">
              <el-option
                v-for="(item, index) in respositoryarr"
                :key="index"
                :label="item.repositoryName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <!--          <el-form-item :label="$t('otherlanguage.qy')" label-width="100px" prop="type">-->
          <!--            <el-cascader-->
          <!--              :disabled="isvoucherregion"-->
          <!--              :options="regions"-->
          <!--              :props="props"-->
          <!--              v-model="sendregionIds"-->
          <!--              :show-all-levels="false"-->
          <!--              :placeholder="$t('otherlanguage.qy')"-->
          <!--              change-on-select-->
          <!--              filterable-->
          <!--              clearable-->
          <!--              style="width: 100%"-->
          <!--              @change="handlechange4"-->
          <!--            />-->
          <!--          </el-form-item>-->
          <el-form-item :label="$t('otherlanguage.rq')" label-width="100px" prop="categoryname">
            <el-date-picker
              v-model="voucherparms.date"
              :picker-options="pickerOptions1"
              type="month"
              value-format="yyyy-MM"
              style="width: 100%"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handlevoucher()">{{ $t('Hmodule.sure') }}</el-button>
          <el-button type="danger" @click="closetag()">{{ $t('Hmodule.cancel') }}</el-button>
        </span>
      </el-dialog>

      <!-- 新建操作 -->
      <el-button v-permission="['200-365-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </el-card>

    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          :selectable="selectInit"
          type="selection"
          width="55"
          fixed="left"
          align="center"/>
        <el-table-column :label="$t('public.id')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.number }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="personalForm" @rest="refreshlist"/>
        </el-table-column>
        <el-table-column :label="$t('Receipt.customerId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.customerName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Verification.jbr')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.handlePersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Verification.hxrq')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.cancelDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.repositoryid2')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.repositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.judgeStat')" :resizable="false" prop="judgeStat" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.judgeStat | judgeStatFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.receiptStat')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.receiptStat | receiptStatFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.hxzt')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.stat | statFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button v-permission2="['200-365-3', scope.row.createPersonId]" v-show="scope.row.judgeStat === 0&&scope.row.receiptStat === 1" :key="scope.row.id + Math.random()" :title="$t('updates.xg')" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
            <el-button v-permission="['200-365-76']" v-show="isReview4(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :key="scope.row.id + Math.random()" :title="$t('updates.fsp')" type="warning" size="mini" circle @click="handleReview4(scope.row)"><svg-icon icon-class="fanhui"/></el-button>
            <el-button v-permission="['200-365-16']" v-show="isReview2(scope.row)&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :key="scope.row.id + Math.random()" :title="$t('updates.jd')" type="success" size="mini" icon="el-icon-check" circle @click="handleReview2(scope.row)"/>
            <el-button v-permission="['200-365-17']" v-show="(scope.row.receiptStat === 3)" :key="scope.row.id + Math.random()" :title="$t('updates.fjd')" type="success" size="mini" icon="el-icon-back" circle @click="handleReview3(scope.row)"/>
            <el-button v-permission2="['200-365-2', scope.row.createPersonId]" v-show="scope.row.judgeStat === 0&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :key="scope.row.id + Math.random()" :title="$t('updates.sc')" scope-row-create-person-id- size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <my-dialog :editcontrol.sync="editVisible" :editdata.sync="personalForm" @rest="refreshlist"/>
      <!--修改结束=================================================-->
      <el-dialog :visible.sync="receiptVisible99" title="附件" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;">
            <el-row>
              <el-col v-for="(item, index) in picPaths" :key="index">
                <el-card :body-style="{ padding: '0px' }">
                  <el-popover
                    placement="top"
                    trigger="hover">
                    <img :src="item " width="800px" height="800px">
                    <img slot="reference" :src="'http://192.168.1.26:9090/uploads/receipt/'+item" width="500px" class="image" style="width: 100%">
                  </el-popover>
                </el-card>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getRepositoryList, detailList } from '@/api/Expenses'
import { regionlist } from '@/api/public'
import { verificationList, deleteVerification, updateVerification, verificationGetList } from '@/api/Verification'
import { getdeptlist } from '@/api/BasicSettings'
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

var _that
export default {
  name: 'VerificationList',
  directives: { waves, permission, permission2 },
  components: { MyDialog, DetailList, MyEmp, MyCustomer, MyAgent, Pagination, MyRepository },
  filters: {
    statFilter(sta) {
      const staMap = {
        1: 'normal',
        2: 'pull out',
        3: 'bad account'
      }
      return staMap[sta]
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
    sourceTypeFilter(status) {
      const statusMap = {
        1: _that.$t('updates.fqsqd')
      }
      return statusMap[status]
    },
    sendTypeFilter(status) {
      const statusMap = {
        1: '已发货',
        2: '未发货'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      repositorycontrol: false,
      repositoryId: '',
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() - 8.64e7
        }
      },
      downloadLoading2: false,
      categoryVisible: false,
      isvoucherrep: false,
      respositoryarr: [],
      isvoucherregion: false,
      sendregionIds: [],
      regions: [],
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      voucherparms: {
        repositoryId: '',
        regionId: '',
        date: '',
        type: 5
      },
      receiptVisible99: false,
      // 回显收款人
      receiptPersonId: '',
      // 控制收款人
      stockControl: false,
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
      date: [],
      receiptVisible9: false,
      picPaths: []
    }
  },
  activated() {
    this.getlist()
  },
  mounted() {
    this.getlist()
    this.getallrepositorys()
    this.getallregionlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    // 清空搜索仓库选择
    clearFilter() {
      this.getemplist.searchRepositoryId = ''
      this.repositoryId = ''
    },
    repositoryname(val) {
      console.log(val)
      this.repositoryId = val.repositoryName
      this.getemplist.searchRepositoryId = val.id
    },

    closetag() {
      this.categoryVisible = false
      this.restvoucherparms()
    },
    restvoucherparms() {
      this.voucherparms = {
        repositoryId: '',
        regionId: '',
        date: '',
        type: 5
      }
      this.respositoryarr = []
      this.isvoucherregion = false
      this.isvoucherrep = false
    },
    handlevoucher() {
      console.log(this.voucherparms)
      if (this.voucherparms.date === '' || this.voucherparms.date === null || this.voucherparms.date === undefined) {
        this.$notify.error({
          title: this.$t('prompt.qxxzrq'),
          message: this.$t('prompt.qxxzrq'),
          offset: 100
        })
        return false
      }
      if (this.voucherparms.repositoryId === '' && this.voucherparms.regionId === '') {
        this.$notify.error({
          title: this.$t('prompt.qxxzmdhqy'),
          message: this.$t('prompt.qxxzmdhqy'),
          offset: 100
        })
        return false
      }

      detailList(this.voucherparms).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          if (res.data.data.content.length === 0) {
            this.$notify.error({
              title: '该门店或区域暂无凭证',
              message: '该门店或区域暂无凭证',
              offset: 100
            })
            return false
          } else {
            const senddata = {}
            senddata.voucherlist = res.data.data.content
            senddata.date = this.voucherparms.date
            senddata.regionId = this.voucherparms.regionId
            senddata.repositoryId = this.voucherparms.repositoryId
            senddata.type = this.voucherparms.type
            senddata.sourceType = 5

            this.$store.dispatch('getvoucherdata', senddata)
            this.$router.push({ path: '/Voucher/Newvoucher' })
          }
        }
      })
    },
    // 获取所有门店
    getallrepositorys() {
      getRepositoryList().then(res => {
        if (res.data.ret === 200) {
          this.respositoryarr = res.data.data.content.list
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
    // 获取所有区域
    getallregionlist() {
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
        }
      })
    },
    handlevoucherparms() {
      this.categoryVisible = true
    },
    choosevoucherrep(val) {
      console.log('val', val)
      if (val === '') {
        this.isvoucherregion = false
      } else {
        this.isvoucherregion = true
      }
    },
    // 根据区域选择门店
    handlechange4(val) {
      console.log(val)
      if (val.length === 0) {
        this.isvoucherrep = false
      } else {
        this.isvoucherrep = true
        this.voucherparms.regionId = val[val.length - 1]
      }
    },
    // 判断反审批按钮
    isReview4(row) {
      console.log(row)
      if ((row.judgeStat === 2) && row.receiptStat !== 3) {
        return true
      }
    },
    // 反结单操作
    handleReview4(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.judgePersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qfsp'), this.$t('prompt.fsp'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.fsp'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.judgeStat = 0
        const parms = JSON.stringify(this.reviewParms)
        updateVerification(parms).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.result === false) {
              this.$message({
                type: 'error',
                message: this.$t('prompt.fspsb')
              })
            } else {
              this.$message({
                type: 'success',
                message: this.$t('prompt.fspcg')
              })
            }
            this.getlist()
          } else {
            this.$message({
              type: 'success',
              message: this.$t('prompt.fspcg')
            })
          }
        })
      })
    },
    // 判断反结单按钮
    isReview3(row) {
      console.log(row)
      if (row.receiptStat === 3) {
        return true
      }
    },
    // 反结单操作
    handleReview3(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.endPersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qfjd'), this.$t('prompt.fjd'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.fjd'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.receiptStat = 2
        const parms = JSON.stringify(this.reviewParms)
        updateVerification(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: this.$t('prompt.fjdcg')
            })
            this.getlist()
          }
        })
      })
    },
    // 判断结单按钮
    isReview2(row) {
      console.log(row)
      if (row.receiptStat !== 3 && (row.judgeStat === 2 || row.judgeStat === 3)) {
        return true
      }
    },
    // 结单操作
    handleReview2(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.endPersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qjd'), this.$t('prompt.jd'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.jd'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.receiptStat = 3
        const parms = JSON.stringify(this.reviewParms)
        updateVerification(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: this.$t('prompt.jdcg')
            })
            this.getlist()
          }
        })
      })
    },
    // 附件操作
    check(row) {
      console.log(row)
      this.receiptVisible9 = true
      this.picPaths = row.picPaths
    },
    checkPermission,
    // 收款人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 收款人回显
    stockName(val) {
      this.receiptPersonId = val.personName
      this.getemplist.receiptPersonId = val.id
    },
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
      verificationGetList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
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
      this.receiptPersonId = ''
      this.getemplist.receiptPersonId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      verificationGetList(this.getemplist).then(res => {
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
    // 修改操作
    handleEdit(row) {
      const parms = {
        verificationId: row.id,
        repositoryId: 0,
        pageNum: 1,
        pageSize: 10
      }

      verificationList(parms).then(res => {
        if (res.data.ret === 200) {
          console.log(res.data.data.content.list[0])
          this.editVisible = true
          this.personalForm = Object.assign({}, res.data.data.content.list[0])
          this.personalForm.sourceType = String(res.data.data.content.list[0].sourceType)
          if (res.data.data.content.list[0].certificateType !== null) {
            this.personalForm.certificateType = String(res.data.data.content.list[0].certificateType)
          }
        }
      })
    },
    // 修改组件修改成功后返回
    refreshlist(val) {
      if (val === true) {
        this.getlist()
      }
    },
    // 详情操作
    handleDetail(row) {
      const parms = {
        verificationId: row.id,
        repositoryId: 0,
        pageNum: 1,
        pageSize: 10
      }

      verificationList(parms).then(res => {
        if (res.data.ret === 200) {
          console.log(res.data.data.content.list[0])
          this.detailvisible = true
          this.personalForm = Object.assign({}, res.data.data.content.list[0])
        }
      })
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
    // 审批操作
    handleReview(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.judgePersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qsh'), this.$t('prompt.sh'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.tg'),
        cancelButtonText: this.$t('prompt.btg'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.judgeStat = 2
        const parms = JSON.stringify(this.reviewParms)
        updateVerification(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: this.$t('prompt.shcg')
            })
            this.getlist()
          }
        })
      }).catch(action => {
        if (action === 'cancel') {
          // 取消弹框
          this.$confirm('comfirm not approved?', 'Warning', {
            distinguishCancelAndClose: true,
            confirmButtonText: 'confirm',
            cancelButtonText: 'cancel'
          })
            .then(() => {
              this.reviewParms.judgeStat = 3
              const parms = JSON.stringify(this.reviewParms)
              updateVerification(parms).then(res => {
                if (res.data.ret === 200) {
                  this.$message({
                    type: 'success',
                    message: this.$t('prompt.shcg')
                  })
                  this.getlist()
                } else {
                  this.$notify.error({
                    title: 'wrong',
                    message: res.data.msg,
                    offset: 100
                  })
                }
              })
            })
            .catch(action => {
              this.$message({
                type: 'info',
                message: action === 'cancel'
                  ? 'confirm'
                  : 'stay this page'
              })
            })
          // ================取消弹框结束
        }
      })
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
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
          deleteVerification(ids, this.$store.getters.userId).then(res => {
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
      }
    },
    // 单条删除
    handleDelete(row) {
      this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
        confirmButtonText: this.$t('prompt.qd'),
        cancelButtonText: this.$t('prompt.qx'),
        type: 'warning'
      }).then(() => {
        deleteVerification(row.id, this.$store.getters.userId).then(res => {
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
      this.$router.push('/Verification/AddVerification')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'ReceiptName', 'ReceiptShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '经销商资料表'
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    // 打印
    handlePrint() {
      console.log(456)
    },
    // // 仓库列表focus事件触发
    // handlechooseRep() {
    //   this.repositorycontrol = true
    // },
    // repositoryname(val) {
    //   console.log(val)
    //   this.enterRepositoryId = val.repositoryName
    //   this.getemplist.enterRepositoryId = val.id
    // },
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
