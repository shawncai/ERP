<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px" shadow="never">

      <el-input v-model="getemplist.customerName" :placeholder="$t('CollectList.customerName')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="getemplist.carCode" :placeholder="$t('updates.cjbm')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="getemplist.motorCode" :placeholder="$t('CollectList.motorCode')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-popover
        v-model="visible2"
        placement="bottom"
        width="500"
        trigger="click">
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
        <el-input v-model="getemplist.batteryCode" :placeholder="$t('CollectList.batteryCode')" clearable style="width: 40%;float: left;margin-left: 20px" @keyup.enter.native="handleFilter"/>
        <el-input v-model="getemplist.count" :placeholder="$t('CollectList.count')" clearable style="width: 40%;float: right;margin-right: 20px" @keyup.enter.native="handleFilter"/>
        <el-date-picker
          v-model="getemplist.time"
          :placeholder="$t('Hmodule.xzrq')"
          type="date"
          value-format="yyyy-MM-dd"
          style="width: 40%;float: left;margin-left: 20px;margin-top: 20px"/>
        <!--<el-date-picker-->
        <!--v-model="date"-->
        <!--type="daterange"-->
        <!--range-separator="-"-->
        <!--unlink-panels-->
        <!--start-placeholder="销售日期"-->
        <!--end-placeholder="销售日期"-->
        <!--value-format="yyyy-MM-dd"-->
        <!--style="margin-top: 20px;margin-left: 20px"/>-->
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button v-waves class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 批量操作 -->
      <!--<el-dropdown @command="handleCommand">-->
      <!--<el-button v-waves class="filter-item" style="margin-left: 0" type="primary">-->
      <!--{{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon&#45;&#45;right"/>-->
      <!--</el-button>-->
      <!--<el-dropdown-menu slot="dropdown" style="width: 140px">-->
      <!--<el-dropdown-item style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>-->
      <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
      <!-- 表格导出操作 -->
      <el-button v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <!--<el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>-->
    </el-card>

    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        :row-class-name="tableRowClassName"
        border
        fit
        highlight-current-row
        style="width: 100%;">
        <el-table-column
          type="selection"
          width="55"
          fixed="left"
          align="center"/>
        <el-table-column :label="$t('public.id')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.orderNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CollectList.customerName')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.customerName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CollectList.count')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ `第${scope.row.idx}期` }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CollectList.shouldMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.shouldMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CollectList.interestMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.interestMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CollectList.capitalMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.capitalMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CollectList.actualDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.deadline }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CollectList.reward')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.reward }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CollectList.pay')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.paidMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CollectList.unpay')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.shouldMoney - scope.row.paidMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CollectList.stat')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.stat | payFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="200">
          <template slot-scope="scope">
            <el-button v-permission="['200-207-29']" v-show="scope.row.collectPersonId === null" size="mini" type="success" @click="handleDispatch(scope.row)">{{ $t('repair.Dispatch') }}</el-button>
            <el-button v-permission="['200-207-61']" v-show="scope.row.isPostphone === 1&&scope.row.stat === 1" type="primary" style="width: 70px" @click="handleMyReceipt2(scope.row)"><span style="margin-left: -15px;">推迟还款</span></el-button>
            <el-button v-permission="['200-207-74']" type="primary" style="width: 84px" @click="handleMyReceipt1(scope.row)"><span style="margin-left: -15px;">{{ $t('newupd.oijn') }}</span></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <my-dialog :editcontrol.sync="editVisible" :editdata.sync="personalForm" @rest="refreshlist"/>
      <!--修改结束=================================================-->
    </el-card>
    <el-dialog :visible.sync="isvisible" :title="$t('CollectList.Dispatch')" class="normal" width="40%" center lock-scroll>
      <el-form :model="dispatchform" style="width: 400px; margin:0 auto;">
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.Employee')">
          <el-select v-model="dispatchform.id" placeholder="please choose">
            <el-option
              v-for="(item, index) in options2"
              :key="index"
              :label="item.personName"
              :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isvisible = false">{{ $t('repair.cancel') }}</el-button>
        <el-button type="primary" @click="dispatch">{{ $t('repair.ok') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateEach, postphone } from '@/api/Collection'
import { getremplist2 } from '@/api/repair'
import { collectlist } from '@/api/CollectList'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import MyEmp from './components/MyEmp'
import DetailList from './components/DetailList'
import MyDialog from './components/MyDialog'
import MyCustomer from './components/MyCustomer'
import MyAgent from './components/MyAgent'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数

var _that
export default {
  name: 'Index',
  directives: { waves, permission, permission2 },
  components: { MyDialog, DetailList, MyEmp, MyCustomer, MyAgent, Pagination },
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
        1: '已发货',
        2: '未发货'
      }
      return statusMap[status]
    },
    payFilter(status) {
      const statusMap = {
        1: '未还',
        2: '已还',
        3: '逾期'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // 销售员回显
      salePersonId: '',
      // 控制销售
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
      options2: [],
      // 审核传参
      reviewParms: {
        id: '',
        judgePersonId: '',
        judgeStat: ''
      },
      isvisible: false,
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
        regionIds: this.$store.getters.regionIds,
        time: null
      },
      // 传给组件的数据
      personalForm: {},
      // 修改控制组件数据
      editVisible: false,
      formdata: [],
      dispatchform: {
        id: ''
      },
      // 开始时间到结束时间
      date: [],
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    checkPermission,
    // 提示逾期
    tableRowClassName({ row, rowIndex }) {
      console.log('状态判断', row)
      if (row.stat === 3) {
        console.log('row.id', row.id)
        return 'warning-row'
      }
      if (row.stat === 2) {
        return 'success-row'
      }
      return ''
    },
    handleMyReceipt2(row) {
      postphone(row.id).then(res => {
        if (res.data.ret === 200) {
          this.isvisible = false
          this.$notify({
            title: 'successful',
            message: 'successful',
            type: 'success',
            duration: 1000
          })
          this.getlist()
        }
      })
    },
    dispatch() {
      const tempData = Object.assign({}, this.formdata)
      this.reviewParms.id = tempData.id
      this.reviewParms.collectPersonId = this.dispatchform.id
      const parms = JSON.stringify(this.reviewParms)
      updateEach(parms).then(res => {
        if (res.data.ret === 200) {
          this.isvisible = false
          this.$notify({
            title: 'successful',
            message: 'successful',
            type: 'success',
            duration: 1000
          })
          this.getlist()
        }
      })
    },
    handleDispatch(row) {
      this.restdispatchform()
      this.formdata = Object.assign({}, row)
      this.isvisible = true
      console.log(row)
      this.form.taskType = 1
      this.form.taskname = '分期收款任务'
      this.form.repositoryId = row.saleRepositoryId
      this.form.customerName = row.customerName
      this.form.taskaddress = row.currentAddress
      this.form.taskcontent = `需向${this.customerName}客户收款${row.shouldMoney}钱`
      this.form.sourceNumber = row.orderNumber
      this.form.createId = row.createPersonId
      this.form.remark = ''
      getremplist2(this.$store.getters.repositoryId, this.$store.getters.regionId).then(res => {
        this.options2 = res.data.data.content.list
      })
    },
    restdispatchform() {
      this.dispatchform = {
        id: ''
      }
    },
    handleMyReceipt1(val) {
      console.log(val)
      this.$store.dispatch('getnewreceiptdata', val)
      this.$router.push('/Receipt/AddReceipt')
    },
    getamouthDate() {

    },
    // 销售人员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 销售员回显
    stockName(val) {
      this.salePersonId = val.personName
      this.personalForm.salePersonId = val.id
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
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
      this.getemplist.time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      // 物料需求计划列表数据
      this.listLoading = true
      collectlist(this.getemplist).then(res => {
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
      this.salePersonId = ''
      this.getemplist.salePersonId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      collectlist(this.getemplist).then(res => {
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
      console.log(row)
      this.editVisible = true
      this.personalForm = Object.assign({}, row)
      this.personalForm.sourceType = String(row.sourceType)
      if (row.certificateType !== null) {
        this.personalForm.certificateType = String(row.certificateType)
      }
      if (row.workStat !== null) {
        this.personalForm.workStat = String(row.workStat)
      }
      if (row.mateCertificateType !== null) {
        this.personalForm.mateCertificateType = String(row.mateCertificateType)
      }
      if (row.mateWorkStat !== null) {
        this.personalForm.mateWorkStat = String(row.mateWorkStat)
      }
      if (row.enterpriseNature !== null) {
        this.personalForm.enterpriseNature = String(row.enterpriseNature)
      }
      if (row.suretyCertificateType !== null) {
        this.personalForm.suretyCertificateType = String(row.suretyCertificateType)
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
    // // 审批操作
    // handleReview(row) {
    //   this.reviewParms.id = row.id
    //   this.reviewParms.judgePersonId = this.$store.getters.userId
    //   this.$confirm('请审核', '审核', {
    //     distinguishCancelAndClose: true,
    //     confirmButtonText: '通过',
    //     cancelButtonText: '不通过',
    //     type: 'warning'
    //   }).then(() => {
    //     this.reviewParms.judgeStat = 2
    //     const parms = JSON.stringify(this.reviewParms)
    //     updateapply2(parms).then(res => {
    //       if (res.data.ret === 200) {
    //         this.$message({
    //           type: 'success',
    //           message: '审核成功!'
    //         })
    //         this.getlist()
    //       }
    //     })
    //   }).catch(action => {
    //     if (action === 'cancel') {
    //       this.reviewParms.judgeStat = 3
    //       const parms = JSON.stringify(this.reviewParms)
    //       updateapply2(parms).then(res => {
    //         if (res.data.ret === 200) {
    //           this.$message({
    //             type: 'success',
    //             message: '审核成功!'
    //           })
    //           this.getlist()
    //         }
    //       })
    //     }
    //   })
    // },
    // // 批量操作
    // handleSelectionChange(val) {
    //   this.moreaction = val
    // },
    // // 多条删除
    // // 批量删除
    // handleCommand(command) {
    //   const ids = this.moreaction.map(item => item.id).join()
    //   if (command === 'delete') {
    //     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       deleteapply(ids).then(res => {
    //         if (res.data.ret === 200) {
    //           this.$notify({
    //             title: '删除成功',
    //             type: 'success',
    //             offset: 100
    //           })
    //           this.getlist()
    //         } else {
    //           this.$notify.error({
    //             title: '错误',
    //             message: '出错了',
    //             offset: 100
    //           })
    //         }
    //       })
    //     }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     })
    //   }
    // },
    // // 单条删除
    // handleDelete(row) {
    //   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     deleteapply(row.id).then(res => {
    //       if (res.data.ret === 200) {
    //         this.$notify({
    //           title: '删除成功',
    //           type: 'success',
    //           offset: 100
    //         })
    //         this.getlist()
    //       } else {
    //         this.$notify.error({
    //           title: '错误',
    //           message: '出错了',
    //           offset: 100
    //         })
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    // 新增数据
    handleAdd() {
      this.$router.push('/CollectList/AddCollectList')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'CollectListName', 'CollectListShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
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
    /*padding: 10px 20px 10px;*/
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
  .el-table >>> .warning-row {
    background: #F56C6C;
  }
  .el-table >>> .success-row {
    background: #409EFF;
  }
</style>
