<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">

      <el-input v-model="getemplist.title" :placeholder="$t('Transfer.title')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="getemplist.number" :placeholder="$t('updates.zzddh')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="handlePersonId" :placeholder="$t('Transfer.handlePersonId')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechooseStock" @clear="restFilter"/>

      <my-emp :control.sync="stockControl" @stockName="stockName"/>

      <el-select v-model="getemplist.searchRepositoryId" :placeholder="$t('Hmodule.xzmd')" size="small" clearable filterable class="filter-item">
        <el-option
          v-for="(item, index) in repositories"
          :key="index"
          :label="item.repositoryName"
          :value="item.id"/>
      </el-select>
      <el-cascader
        :options="suboptions"
        :props="props2"
        v-model="subjectdata"
        :show-all-levels="false"
        :placeholder="$t('updates.kmmc')"
        change-on-select
        filterable
        clearable
        @change="handlechangesubject"
      />
      <el-popover
        v-model="visible2"
        placement="bottom"
        width="500"
        size="small"
        trigger="click">
        <el-select v-model="getemplist.closeType" size="small" placeholder="结算方式" clearable style="width: 40%;float: left;margin-left: 20px">
          <el-option
            v-for="(item, index) in colseTypes"
            :value="item.id"
            :key="index"
            :label="item.categoryName"/>
        </el-select>
        <el-select v-model="getemplist.direction" :value="getemplist.direction" :placeholder="$t('collectAndPayDetail.fx')" size="small" clearable style="width: 40%;float: right;margin-right: 20px">
          <el-option value="1" label="branch"/>
          <el-option value="2" label="company"/>
        </el-select>
        <el-select v-model="getemplist.receiptStat" :value="getemplist.receiptStat" :placeholder="$t('updates.djzt')" size="small" clearable style="width: 40%;float: right;margin-right: 20px">
          <el-option :label="$t('updates.zd')" value="1"/>
          <el-option :label="$t('updates.zx')" value="2"/>
          <el-option :label="$t('updates.jd')" value="3"/>
        </el-select>
        <el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" :placeholder="$t('updates.spzt')" size="small" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
          <el-option :label="$t('updates.wsh')" value="0"/>
          <el-option :label="$t('updates.shz')" value="1"/>
          <el-option :label="$t('updates.shtg')" value="2"/>
          <el-option :label="$t('updates.shptg')" value="3"/>
        </el-select>
        <el-date-picker
          v-model="date"
          :default-time="['00:00:00', '23:59:59']"
          type="daterange"
          range-separator="-"
          unlink-panels
          value-format="yyyy-MM-dd"
          style="width: 60%;margin-top:10px"/>
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button v-waves size="small" class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" size="small" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card :body-style=" { padding: '6px'}" class="box-card" shadow="never">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" size="small" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['266-94-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['266-94-6']" v-waves :loading="downloadLoading" class="filter-item2" size="small" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['266-94-7']" v-waves class="filter-item2" size="small" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['266-94-1']" v-waves class="filter-item2" size="small" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </el-card>

    <el-card :body-style="	{ padding: '10px' }" class="box-card" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :height="tableHeight"
        :key="tableKey"
        :summary-method="getSummaries2"
        :data="list"
        show-summary
        size="small"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @row-click="clickRow"
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
        <el-table-column :label="$t('Transfer.title')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Transfer.transferTicket')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.transferTicket }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('update4.hzje')" :resizable="false" prop="resultmoney" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.resultmoney }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('Transfer.transferMoney')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.transferMoney }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('Transfer.currency')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.currency | currencyFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Transfer.handlePersonId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.handlePersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Transfer.transferDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.transferDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Transfer.transferInAccount')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.transferInAccount }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Transfer.transferInBank')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.transferInBank }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('recoveryCarDetail.repositoryName')" :resizable="false" prop="transferRepositoryName" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.transferRepositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.judgeStat')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.judgeStat | judgeStatFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.receiptStat')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.receiptStat | receiptStatFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button v-show="shwobuttons2(scope)&&scope.row.stat === 1 &&scope.row.judgeStat === 2 && isReview(scope.row)" title="确认" type="primary" size="mini" icon="el-icon-check" circle @click="handleReview1(scope.row)"/>
            <el-button v-show="shwobuttons2(scope)&&scope.row.stat === 2 &&scope.row.judgeStat === 2 && isReview(scope.row)" title="反确认" type="primary" size="mini" icon="el-icon-back" circle @click="handleReview2(scope.row)"/>
            <el-button v-permission2="['266-94-3', scope.row.createPersonId]" v-show="shwobuttons2(scope)&&scope.row.judgeStat === 0&&scope.row.receiptStat === 1" :key="scope.row.id + Math.random()" :title="$t('updates.xg')" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
            <el-button v-permission2="['266-94-2', scope.row.createPersonId]" v-show="shwobuttons2(scope)&&scope.row.judgeStat === 0&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" :key="scope.row.id + Math.random()" :title="$t('updates.sc')" scope-row-create-person-id- size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
            <el-button v-show="shwobuttons1(scope)&&isReview4(scope.row)" :title="$t('updates.fsp')" type="warning" size="mini" circle @click="handleReview4(scope.row)"><svg-icon icon-class="fanhui"/></el-button>
            <el-button v-permission="['266-373-1']" v-show="scope.row.judgeStat === 2&&scope.row.stat === 2" type="primary" style="width: 80px" @click="handleMyReceipt1(scope.row)"><span style="margin-left: -5px;">生成凭证</span></el-button>
            <!--            <el-button title="查看附件" type="primary" size="mini" icon="el-icon-document" circle @click="check(scope.row)"/>-->
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <my-dialog :editcontrol.sync="editVisible" :editdata.sync="personalForm" @rest="refreshlist"/>
      <!--修改结束=================================================-->
      <!--      <el-dialog :visible.sync="receiptVisible99" title="附件" class="normal" width="600px" center>-->
      <!--        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">-->
      <!--          <el-form-item label-width="100px;">-->
      <!--            <el-row>-->
      <!--              <el-col v-for="(item, index) in picPaths" :key="index">-->
      <!--                <el-card :body-style="{ padding: '0px' }">-->
      <!--                  <el-popover-->
      <!--                    placement="top"-->
      <!--                    trigger="hover">-->
      <!--                    <img :src="item " width="800px" height="800px">-->
      <!--                    <img slot="reference" :src="'http://192.168.1.26:9090/uploads/transfer/'+item" width="500px" class="image" style="width: 100%">-->
      <!--                  </el-popover>-->
      <!--                </el-card>-->
      <!--              </el-col>-->
      <!--            </el-row>-->
      <!--          </el-form-item>-->
      <!--        </el-form>-->
      <!--      </el-dialog>-->
    </el-card>
  </div>
</template>

<script>
import { searchtransfer, updatetransfer2, deletetransfer, addTransferVoucher, transferGetList } from '@/api/Transfer'
import { searchSaleCategory } from '@/api/SaleCategory'
import { subjectList } from '@/api/SubjectFinance'
import { getSubjectDetail } from '@/api/voucher'
import { regionlist, searchRepository } from '@/api/public'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyEmp from './components/MyEmp'
import DetailList from './components/DetailList'
import MyDialog from './components/MyDialog'
import MySupplier from './components/MySupplier'
var _that
export default {
  name: 'TransferList',
  directives: { waves, permission, permission2 },
  components: { MyDialog, DetailList, MyEmp, Pagination, MySupplier },
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
    currencyFilter(status) {
      const statusMap = {
        1: 'PHP',
        2: 'USD',
        3: 'RMB',
        4: 'LKR',
        5: 'THB'
      }
      return statusMap[status]
    },
    sourceTypeFilter(status) {
      const statusMap = {
        1: _that.$t('updates.cgsq'),
        2: _that.$t('updates.cgxq'),
        3: _that.$t('Hmodule.Nosource')
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      treedata: [],
      props2: {
        value: 'id',
        label: 'subjectName',
        children: 'subjectFinanceVos'
      },
      suboptions: [],
      subjectdata: [],
      repositories: [],
      tableHeight: 200,
      regions: [],
      // 结算方式数据
      colseTypes: [],
      // 结算方式获取参数
      colseTypeparms: {
        type: 3,
        pagenum: 1,
        pagesize: 99999
      },
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
      // 经办人回显
      handlePersonId: '',
      // 经办人控制框
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
      date: [],
      receiptVisible9: false,
      picPaths: []
    }
  },
  activated() {
    this.getlist()
    this.gettree2()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  mounted() {
    this.getlist()
    this.getreginons()
    this.handlechange4()
    this.gettree2()
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
    shwobuttons2(scope) {
      if (scope.row.direction === 1 && (this.$store.getters.roles.includes('266-94-200') || this.$store.getters.roles.includes('266-94-201') || this.$store.getters.roles.includes('266-94-202'))) {
        return true
      } else if (scope.row.direction === 2) {
        return true
      } else {
        return false
      }
    },
    // 公司反审核权限按钮
    shwobuttons1(scope) {
      // 公司往门店转钱 direction = 1
      if (scope.row.direction === 1 && this.$store.getters.roles.includes('266-94-201')) {
        return true
      } else if (scope.row.direction === 2 && this.$store.getters.roles.includes('266-94-76')) {
        return true
      } else {
        return false
      }
    },
    // 公司反结单按钮出现
    shwobuttons(scope) {
      // 公司往门店转钱 direction = 1
      if (scope.row.direction === 1 && this.$store.getters.roles.includes('266-94-200')) {
        return true
      } else if (scope.row.direction === 2) {
        return true
      } else {
        return false
      }
    },
    handlechangesubject(val) {
      console.log('val', val)
      if (val.length === 0) {
        this.getemplist.subjectCode = ''
      } else {
        const finid = val[val.length - 1]
        const needata = this.findtreedata(this.treedata, finid)
        console.log('needata', needata)
        this.getemplist.subjectCode = needata.subjectNumber
      }
    },
    findtreedata(val, val2) {
      let data;
      (val || []).map(i => {
        if (i.id === val2) {
          data = i
        } else {
          const child = this.findtreedata(i.subjectFinanceVos, val2)
          if (child) {
            data = child
          }
        }
      })
      return data
    },
    switchtreedata(val) {
      for (const i in val) {
        if (val[i].subjectNumber === '' || val[i].subjectNumber === null) {
          this.switchtreedata(val[i].subjectFinanceVos)
        } else {
          if (val[i].level > 3) {
            this.switchtreedata(val[i].subjectFinanceVos)
          }
          val[i].subjectName = val[i].subjectNumber + val[i].subjectName
        }
      }
    },
    processchildren(val) {
      for (const i in val) {
        if (val[i].subjectFinanceVos.length === 0) {
          delete val[i].subjectFinanceVos
        } else {
          this.processchildren(val[i].subjectFinanceVos)
        }
        // if (val[i].) {
        // }
      }
      return val
    },
    gettree2() {
      console.log(123)
      subjectList().then(res => {
        if (res.data.ret === 200) {
          const newarr = res.data.data.content
          console.log('newarr', newarr)
          const testarr = this.switchtreedata(newarr)
          this.suboptions = this.processchildren(newarr)
          this.treedata = res.data.data.content
        }
      })
      console.log(321)
    },
    // 根据区域选择门店
    handlechange4() {
      console.log('this.$store.getters.repositoryId', this.$store.getters.repositoryId)
      if (this.$store.getters.repositoryId !== '' && this.$store.getters.repositoryId !== null && this.$store.getters.repositoryId !== undefined) {
        searchRepository(null, this.$store.getters.repositoryId, this.$store.getters.regionIds).then(res => {
          if (res.data.ret === 200) {
            this.repositories = res.data.data.content.list
          } else {
            this.$message.error('出错了')
          }
        })
      }
    },
    clickRow(val) {
      if (val.judgeStat === 0) {
        this.$refs.table.toggleRowSelection(val)
      }
    },
    isReview4(row) {
      console.log(row)
      if (row.judgeStat === 2) {
        return true
      }
    },
    // 附件操作
    check(row) {
      console.log(row)
      this.receiptVisible9 = true
      this.picPaths = row.picPaths
    },
    handleMyReceipt1(row) {
      this.$confirm('请确认生成凭证', '确认', {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.qd'),
        type: 'warning'
      }).then(() => {
        addTransferVoucher(row.id).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: '生成凭证成功!'
            })
            this.getlist()
          }
        })
      })
    },
    // 确认
    handleReview1(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.stat = 2
      this.$confirm('confirm?', 'confirmed', {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.qd'),
        type: 'warning'
      }).then(() => {
        const parms = JSON.stringify(this.reviewParms)
        updatetransfer2(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: this.$t('prompt.qrcg')
            })
            this.getlist()
          }
        })
      })
    },
    // 确认
    handleReview2(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.stat = 1
      this.$confirm('请反确认', '反确认', {
        distinguishCancelAndClose: true,
        confirmButtonText: '反确认',
        type: 'warning'
      }).then(() => {
        const parms = JSON.stringify(this.reviewParms)
        updatetransfer2(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: '反确认成功!'
            })
            this.getlist()
          }
        })
      })
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
    // 更新采购类型
    updatecountry() {
      this.getlist()
    },
    getlist() {
      // 物料需求计划列表数据
      this.listLoading = true
      transferGetList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          // const detaildata = res.data.data.content.list.map(item => {
          //   return item.approvalUseVos
          // })
          // const listdata = res.data.data.content.list.map(item => {
          //   return item.transferDetailVos
          // })
          // const dataarr = [].concat.apply([], listdata)

          // const obj = this.trans(dataarr)
          // for (const i in this.list) {
          //   for (const j in obj) {
          //     if (this.list[i].id === obj[j].transferId) {
          //       this.list[i].resultmoney = (obj[j].money).toFixed(2)
          //     }
          //   }
          // }
          // console.log('this.list', this.list)
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      // 结算方式数据
      searchSaleCategory(this.colseTypeparms).then(res => {
        if (res.data.ret === 200) {
          this.colseTypes = res.data.data.content.list
        }
      })
    },
    trans(arr) {
      const obj = {}
      const result = []
      arr.forEach(({ transferId, money }) => {
        const cur = obj[transferId]
        if (cur) {
          const index = cur.index
          result[index].money += money
        } else {
          const index = result.length
          obj[transferId] = {
            transferId,
            index
          }
          result.push({ transferId, money })
        }
      })
      return result
    },
    // 清空搜索条件
    restFilter() {
      this.handlePersonId = ''
      this.getemplist.handlePersonId = ''
    },
    // 搜索
    handleFilter() {
      console.log(this.date)
      if (this.date === null) {
        this.getemplist.beginTime = ''
        this.getemplist.endTime = ''
      } else if (this.date.length === 0) {
        this.getemplist.beginTime = ''
        this.getemplist.endTime = ''
      } else {
        this.getemplist.beginTime = this.date[0] + ' 00:00:00'
        this.getemplist.endTime = this.date[1] + ' 23:59:59'
      }
      this.getemplist.pageNum = 1
      this.getlist()
      // searchtransfer(this.getemplist).then(res => {
      //   if (res.data.ret === 200) {
      //     this.list = res.data.data.content.list
      //     this.total = res.data.data.content.totalCount
      //     // this.restFilter()
      //   } else {
      //     // this.restFilter()
      //   }
      // })
    },
    // 经办人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 经办人回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.getemplist.handlePersonId = val.id
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
    getreginons() {
      // 区域列表数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
          // this.getarrs()
        } else {
          console.log('区域列表出错')
        }
      })
    },
    gettree(val) {
      subjectList().then(res => {
        if (res.data.ret === 200) {
          this.treedata = res.data.data.content
          this.setvoucherdata(val)
        }
      })
    },
    findPathByLeafId2(leafId, nodes, path) {
      if (path === undefined) {
        path = []
      }
      for (var i = 0; i < nodes.length; i++) {
        var tmpPath = path.concat()
        tmpPath.push(nodes[i].id)
        if (leafId === nodes[i].id) {
          return tmpPath
        }
        if (nodes[i].subjectFinanceVos) {
          var findResult = this.findPathByLeafId2(leafId, nodes[i].subjectFinanceVos, tmpPath)
          if (findResult) {
            return findResult
          }
        }
      }
    },
    findPathByLeafId(leafId, nodes, path) {
      if (path === undefined) {
        path = []
      }
      for (var i = 0; i < nodes.length; i++) {
        var tmpPath = path.concat()
        tmpPath.push(nodes[i].id)
        if (leafId === nodes[i].id) {
          return tmpPath
        }
        if (nodes[i].regionListVos) {
          var findResult = this.findPathByLeafId(leafId, nodes[i].regionListVos, tmpPath)
          if (findResult) {
            return findResult
          }
        }
      }
    },
    async setvoucherdata(val) {
      // console.log('this.editdata222222', this.editdata)
      const voucherdata = val
      this.selectid = val.transferDetailVos.map(item => {
        return {
          id: item.id
        }
      })
      if (voucherdata) {
        const voucherdetaildata = await Promise.all(voucherdata.transferDetailVos.map(item => {
          return getSubjectDetail(item.subjectCode).then(res => {
            return res.data.data.content
          })
        }))
        for (const i in voucherdetaildata) {
          const carstdata = this.findPathByLeafId2(voucherdetaildata[i].subjectId, this.treedata)
          voucherdetaildata[i].setcarst = carstdata
        }
        console.log('voucherdetaildata222222222', voucherdetaildata)
        console.log('this.regions', this.regions)
        const testarr = val.transferDetailVos
        for (const i in testarr) {
          for (const j in voucherdetaildata) {
            if (testarr[i].subjectCode === voucherdetaildata[j].itemCode) {
              testarr[i].setcarst = voucherdetaildata[j].setcarst
            }
          }
        }
        for (const i in val.transferDetailVos) {
          if (val.transferDetailVos[i].regionId) {
            val.transferDetailVos[i].regionIds = this.findPathByLeafId(val.transferDetailVos[i].regionId, this.regions)
          } else {
            val.transferDetailVos[i].regionIds = []
          }
        }
        this.editVisible = true
        this.personalForm = Object.assign({}, val)
        this.personalForm.sourceType = String(val.sourceType)
        this.personalForm.currency = String(val.currency)
        this.personalForm.transferType = String(val.transferType)
        // console.log('list222222222222', this.list2)
      }
    },
    // 修改操作
    handleEdit(row) {
      const parms = {
        id: row.id,
        repositoryId: 0,
        pageNum: 1,
        pageSize: 10
      }

      searchtransfer(parms).then(res => {
        if (res.data.ret === 200) {
          console.log(res.data.data.content.list[0])
          this.gettree(res.data.data.content.list[0])
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
        id: row.id,
        repositoryId: 0,
        pageNum: 1,
        pageSize: 10
      }

      searchtransfer(parms).then(res => {
        if (res.data.ret === 200) {
          console.log(res.data.data.content.list[0])
          this.detailvisible = true
          this.personalForm = Object.assign({}, res.data.data.content.list[0])
        }
      })
    },
    // 判断审核按钮
    isReview(row) {
      // console.log('row=====', row)
      // console.log('this.$store.getters.roles', this.$store.getters.roles)
      if (row.approvalUseVos !== '' && row.approvalUseVos !== null && row.approvalUseVos !== undefined && row.approvalUseVos.length !== 0) {
        const approvalUse = row.approvalUseVos
        const index = approvalUse[approvalUse.length - 1].stepHandler.indexOf(',' + this.$store.getters.userId + ',')
        // console.log(approvalUse[approvalUse.length - 1].stepHandler)
        // console.log(index)
        if (index > -1 && (row.judgeStat === 1 || row.judgeStat === 0)) {
          if (row.direction === 1 && this.$store.getters.roles.includes('266-94-202')) {
            return true
          } else if (row.direction === 2) {
            return true
          } else {
            return false
          }
        }
      }
    },
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
        updatetransfer2(parms).then(res => {
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
        updatetransfer2(parms).then(res => {
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
              updatetransfer2(parms).then(res => {
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
      if (this.moreaction === '' || this.moreaction === null || this.moreaction === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: 'please select data',
          offset: 100
        })
        return false
      }
      const ids = this.moreaction.map(item => item.id).join()
      if (command === 'delete') {
        this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
          confirmButtonText: this.$t('prompt.qd'),
          cancelButtonText: this.$t('prompt.qx'),
          type: 'warning'
        }).then(() => {
          deletetransfer(ids, this.$store.getters.userId).then(res => {
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
        deletetransfer(row.id, this.$store.getters.userId).then(res => {
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
      this.$router.push('/Transfer/AddTransfer')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'TransferName', 'TransferShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
