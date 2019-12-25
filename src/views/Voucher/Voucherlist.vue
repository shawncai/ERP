<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px;height: 60px" shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" label-width="100px" style="margin-top: -9px">
          <el-col :span="5">
            <el-form-item :label="$t('Voucher.pzh')" label-width="100px">
              <el-input v-model="getemplist.voucherNo" :placeholder="$t('Voucher.pzh')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left: 10px">
            <el-form-item :label="$t('updates.zcdbh')">
              <el-select v-model="getemplist.voucherStat" :value="getemplist.voucherStat" :placeholder="$t('Voucher.pzh')" clearable>
                <el-option :label="$t('Voucher.jz')" value="1"/>
                <el-option :label="$t('Voucher.gz')" value="2"/>
                <el-option :label="$t('Voucher.jiez')" value="3"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left: 10px">
            <el-form-item :label="$t('Voucher.rq')">
              <el-date-picker
                v-model="getemplist.receiptdate"
                :placeholder="$t('Voucher.rq')"
                type="date"
                value-format="yyyy-MM-dd"
                style="width:100%"/>
            </el-form-item>
          </el-col>
          <!--更多搜索条件-->
          <!-- <el-col :span="3">
            <el-popover
              v-model="visible2"
              placement="bottom"
              width="500"
              trigger="click">
              <el-select v-model="getemplist.payMode" placeholder="结算方式" clearable style="width: 40%;float: left;margin-left: 20px">
                <el-option
                  v-for="(item, index) in colseTypes"
                  :value="item.id"
                  :key="index"
                  :label="item.categoryName"/>
              </el-select>
              <el-select v-model="getemplist.receiptStat" :value="getemplist.receiptStat" :placeholder="$t('updates.djzt')" clearable style="width: 40%;float: right;margin-right: 20px">
                <el-option :label="$t('updates.zd')" value="1"/>
                <el-option :label="$t('updates.zx')" value="2"/>
                <el-option :label="$t('updates.jd')" value="3"/>
              </el-select>
              <el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" :placeholder="$t('updates.spzt')" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
                <el-option :label="$t('updates.wsh')" value="0"/>
                <el-option :label="$t('updates.shz')" value="1"/>
                <el-option :label="$t('updates.shtg')" value="2"/>
                <el-option :label="$t('updates.shptg')" value="3"/>
              </el-select>
              <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
                <el-button v-waves class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>
              </div>
              <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
            </el-popover>
          </el-col> -->
          <el-col :span="3" style="margin-left: 20px">
            <!-- 搜索按钮 -->
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['266-92-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['266-92-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['266-92-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 转化操作 -->
      <el-button v-waves class="filter-item" icon="el-icon-rank" type="success" style="width: 86px" @click="handleswitch">{{ $t('otherlanguage.zh') }}</el-button>
      <!-- 结转损益操作 -->
      <el-button v-waves class="filter-item" icon="el-icon-sort" type="primary" @click="handleswitchtojz">{{ $t('otherlanguage.jzsy') }}</el-button>
    </el-card>

    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        :span-method="arraySpanMethod"
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
        <el-table-column :label="$t('Voucher.rq')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createDate }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="personalForm"/>
        </el-table-column>
        <el-table-column :label="$t('Voucher.pzzh')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.voucherNo }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Voucher.zy')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.summary }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Voucher.kmdm')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.subjectCode }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Voucher.kjkm')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.subjectName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Voucher.bb')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.currency | currencyFilter }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('Voucher.hl')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.rate }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column :label="$t('Voucher.ybje')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.primevalMoney }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('Voucher.jfje')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.debitMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Voucher.dfje')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.creditMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Voucher.zdr')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Voucher.ywzt')" :resizable="false" prop="judgeStat" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.voucherStat | voucherStatFilter }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('public.receiptStat')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.receiptStat | receiptStatFilter }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button v-permission2="['266-92-3', scope.row.createPersonId]" v-show="scope.row.voucherStat === 1" :title="$t('updates.xg')" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
            <el-button v-show="isReview(scope.row)" :title="$t('updates.spi')" type="warning" size="mini" icon="el-icon-view" circle @click="handleReview(scope.row)"/>
            <el-button v-permission="['266-92-76']" v-show="isReview4(scope.row)" :title="$t('updates.fsp')" type="warning" size="mini" circle @click="handleReview4(scope.row)"><svg-icon icon-class="fanhui"/></el-button>
            <el-button v-permission2="['266-92-2', scope.row.createPersonId]" v-show="scope.row.voucherStat === 1" :title="$t('updates.sc')" size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
            <!-- <el-button v-permission2="['266-92-3', scope.row.createPersonId]" v-show="scope.row.voucherStat === 1" :title="$t('otherlanguage.jzsy')" type="primary" size="mini" icon="el-icon-edit" circle @click="handleswitchtojz(scope.row)"/> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <!-- <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" /> -->
      <!--修改开始=================================================-->
      <my-dialog :editcontrol.sync="editVisible" :editdata.sync="personalForm" @rest="refreshlist"/>
      <!--修改结束=================================================-->
      <el-dialog :visible.sync="receiptVisible9" title="附件" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;">
            <el-row>
              <el-col v-for="(item, index) in picPaths" :key="index">
                <el-card :body-style="{ padding: '0px' }">
                  <el-popover
                    placement="top"
                    trigger="hover">
                    <img :src="item " width="800px" height="800px">
                    <img slot="reference" :src="'http://192.168.1.26:9090/uploads/expenses/'+item" width="500px" class="image" style="width: 100%">
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
import { searchexpenses, updateexpenses2, deleteexpenses } from '@/api/Expenses'
import { voucherlist, updatevoucher, deletevoucher } from '@/api/voucher'
import { searchSaleCategory } from '@/api/SaleCategory'
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
  name: 'Voucherlist',
  directives: { waves, permission, permission2 },
  components: { MyDialog, DetailList, MyEmp, Pagination, MySupplier },
  filters: {
    voucherStatFilter(status) {
      const statusMap = {
        1: _that.$t('Voucher.jz'),
        2: _that.$t('Voucher.gz'),
        3: _that.$t('Voucher.jiez')
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
        3: 'RMB'
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
      switchparms: 1,
      receiptVisible99: false,
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
      moreaction: [],
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
      picPaths: [],
      spanArr: [],
      pos: ''
    }
  },
  beforeCreate() {
    _that = this
  },
  mounted() {
    this.getlist()
  },
  methods: {
    async handleswitchtojz() {
      console.log(this.moreaction)
      const arrowdata = this.moreaction
      if (this.moreaction.length === 0) {
        this.$message({
          type: 'error',
          message: '请先选择数据!'
        })
      } else {
        let dataz = []
        for (const i in arrowdata) {
          const parms = {}
          parms.id = arrowdata[i].voucherId
          parms.voucherStat = 3
          const sendparms = JSON.stringify(parms)
          dataz = await updatevoucher(sendparms)
            .then(res => {
              return res.data
            })
        }
        console.log(dataz)
        if (dataz.ret === 200) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.getlist()
        }
      }
    },
    handleswitch() {
      if (this.switchparms === 1) {
        this.getlist()
      } else if (this.switchparms === 2) {
        this.getlist()
      }
    },
    getSpanArr(data) {
      this.spanArr = []
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].voucherId === data[i - 1].voucherId) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      const _row = this.spanArr[rowIndex]
      const _col = _row > 0 ? 1 : 0
      if (columnIndex === 0) {
        return {
          rowspan: _row,
          colspan: _col
        }
      } else if (columnIndex === 1) {
        return {
          rowspan: _row,
          colspan: _col
        }
      } else if (columnIndex === 2) {
        return {
          rowspan: _row,
          colspan: _col
        }
      } else if (columnIndex === 9) {
        return {
          rowspan: _row,
          colspan: _col
        }
      } else if (columnIndex === 10) {
        return {
          rowspan: _row,
          colspan: _col
        }
      } else if (columnIndex === 11) {
        return {
          rowspan: _row,
          colspan: _col
        }
      } else if (columnIndex === 15) {
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    // 附件操作
    check(row) {
      this.receiptVisible9 = true
      this.picPaths = row.picPaths
    },
    // 判断反审批按钮
    isReview4(row) {
      if (row.voucherStat === 2) {
        return true
      }
    },
    // 反结单操作
    handleReview4(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.voucherId
      this.reviewParms.judgePersonId = this.$store.getters.userId
      this.$confirm('请反审批', '反审批', {
        distinguishCancelAndClose: true,
        confirmButtonText: '反审批',
        type: 'warning'
      }).then(() => {
        this.reviewParms.voucherStat = 1
        const parms = JSON.stringify(this.reviewParms)
        updatevoucher(parms).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.result === false) {
              this.$message({
                type: 'error',
                message: '反审批失败!'
              })
            } else {
              this.$message({
                type: 'success',
                message: '反审批成功!'
              })
            }
            this.getlist()
          }
        })
      })
    },
    // 判断反结单按钮
    isReview3(row) {
      console.log(row)
    },
    // 反结单操作
    handleReview3(row) {
    },
    // 判断结单按钮
    isReview2(row) {
      if (row.receiptStat !== 3 && (row.judgeStat === 2 || row.judgeStat === 3)) {
        return true
      }
    },
    // 结单操作
    handleReview2(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.voucherId
      this.reviewParms.endPersonId = this.$store.getters.userId
      this.$confirm('请结单', '结单', {
        distinguishCancelAndClose: true,
        confirmButtonText: '结单',
        type: 'warning'
      }).then(() => {
        this.reviewParms.receiptStat = 3
        const parms = JSON.stringify(this.reviewParms)
        updateexpenses2(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: '结单成功!'
            })
            this.getlist()
          }
        })
      })
    },
    checkPermission,
    // 不让勾选
    selectInit(row, index) {
      if (row.voucherStat !== 1) {
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
      // searchexpenses(this.getemplist).then(res => {
      //   if (res.data.ret === 200) {
      //     this.total = res.data.data.content.totalCount
      //   }
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 0.5 * 100)
      // })

      voucherlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          console.log(res)
          const resarr = res.data.data.content
          const arrlist = resarr.map(item => {
            return item.voucherDetails
          }).flat()
          const arrlist2 = [].concat.apply([], arrlist)

          for (const i in resarr) {
            for (const j in arrlist2) {
              if (resarr[i].id === arrlist2[j].voucherId) {
                arrlist2[j].approvalUseVos = resarr[i].approvalUseVos
                arrlist2[j].voucherStat = resarr[i].voucherStat
                arrlist2[j].voucherNo = resarr[i].voucherNo
                arrlist2[j].createDate = resarr[i].createDate
                arrlist2[j].createPersonName = resarr[i].createPersonName
              }
            }
          }
          this.list = arrlist2
          if (this.switchparms === 1) {
            this.list = arrlist2.filter(item => {
              return (item.total === 1 || item.total === 3)
            })
            this.switchparms = 2
            console.log('this.list', this.list)
          } else if (this.switchparms === 2) {
            this.list = arrlist2.filter(item => {
              return (item.total === 2 || item.total === 3)
            })
            this.switchparms = 1
            for (const i in this.list) {
              this.list[i].currency = 1
              if (this.list[i].creditMoney === null) {
                this.list[i].creditMoney = 0
              }
              if (this.list[i].debitMoney === null) {
                this.list[i].debitMoney = 0
              }
            }
            console.log('this.list', this.list)
          }
          this.getSpanArr(arrlist2)
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
    // 清空搜索条件
    restFilter() {
      this.handlePersonId = ''
      this.getemplist.handlePersonId = ''
    },
    restFilter2() {
      this.supplierId = ''
      this.getemplist.supplierId = ''
    },
    restFilter3() {
      this.inquiryPersonId = ''
      this.getemplist.inquiryPersonId = ''
    },
    // 搜索
    handleFilter() {
      voucherlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          console.log(res)
          const resarr = res.data.data.content
          const arrlist = resarr.map(item => {
            return item.voucherDetails
          }).flat()
          const arrlist2 = [].concat.apply([], arrlist)

          for (const i in resarr) {
            for (const j in arrlist2) {
              if (resarr[i].id === arrlist2[j].voucherId) {
                arrlist2[j].approvalUseVos = resarr[i].approvalUseVos
                arrlist2[j].voucherStat = resarr[i].voucherStat
                arrlist2[j].voucherNo = resarr[i].voucherNo
                arrlist2[j].createDate = resarr[i].createDate
                arrlist2[j].createPersonName = resarr[i].createPersonName
              }
            }
          }
          if (this.switchparms === 2) {
            this.list = arrlist2.filter(item => {
              return item.total === 1
            })
            this.switchparms = 2
            console.log('this.list', this.list)
          } else if (this.switchparms === 1) {
            this.list = arrlist2.filter(item => {
              return item.total === 2
            })
            this.switchparms = 1
            console.log('this.list', this.list)
          }
          this.getSpanArr(arrlist2)
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
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
    // 修改操作
    async handleEdit(row) {
      console.log(row)

      const detailsearch = {
        voucherId: row.voucherId,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds
      }
      const editdata = await voucherlist(detailsearch).then(res => {
        return res.data.data.content[0]
      })
      console.log('editdata', editdata)
      if (editdata) {
        this.editVisible = true
        this.personalForm = editdata
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
      const detailsearch = {
        voucherId: row.voucherId,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds
      }
      voucherlist(detailsearch).then(res => {
        if (res.data.ret === 200) {
          console.log(res)
          this.detailvisible = true
          this.personalForm = Object.assign({}, res.data.data.content[0])
        }
      })
    },
    // 判断审核按钮
    isReview(row) {
      if (row.approvalUseVos !== '' && row.approvalUseVos !== null && row.approvalUseVos !== undefined && row.approvalUseVos.length !== 0) {
        console.log(1222222)
        const approvalUse = row.approvalUseVos
        const index = approvalUse[approvalUse.length - 1].stepHandler.indexOf(',' + this.$store.getters.userId + ',')
        console.log('approvalUse[approvalUse.length - 1].stepHandler', approvalUse[approvalUse.length - 1].stepHandler)
        console.log(index)
        if (index > -1 && (row.voucherStat === 1)) {
          return true
        }
      }
    },
    // 审批操作
    handleReview(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.voucherId
      this.reviewParms.judgePersonId = this.$store.getters.userId
      this.$confirm('请审核', '审核', {
        distinguishCancelAndClose: true,
        confirmButtonText: '通过',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.reviewParms.voucherStat = 2
        const parms = JSON.stringify(this.reviewParms)
        updatevoucher(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: '审核成功!'
            })
            this.getlist()
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      })
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 多条删除
    // 批量删除
    handleCommand(command) {
      const ids = this.moreaction.map(item => item.voucherId).join()
      if (command === 'delete') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletevoucher(ids, this.$store.getters.userId).then(res => {
            if (res.data.ret === 200 || res.data.ret === 100) {
              this.$notify({
                title: '删除成功',
                type: 'success',
                offset: 100
              })
              this.getlist()
            } else {
              this.$notify.error({
                title: '错误',
                message: '出错了',
                offset: 100
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    // 单条删除
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletevoucher(row.voucherId, this.$store.getters.userId).then(res => {
          if (res.data.ret === 200 || res.data.ret === 100) {
            this.$notify({
              title: '删除成功',
              type: 'success',
              offset: 100
            })
            this.getlist()
          } else {
            this.$notify.error({
              title: '错误',
              message: '出错了',
              offset: 100
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/income/Addincome')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'incomeName', 'incomeShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
    width: 140px;
    margin-left: 30px;
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
