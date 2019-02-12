<template>
  <div class="install-container">
    <div class="filter-container">
      <el-input v-model="install.code" :placeholder="$t('order.coding')" class="filter-item" style="width: 200px;" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="$t('order.applicant')" class="filter-item" style="width: 200px;" @keyup.enter.native="handleFilter"/>
      <el-select v-model="install.stat" :placeholder="$t('order.stat')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in xiala" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <div class="filter-item">
        <el-date-picker
          v-model="install.beginTime"
          type="daterange"
          range-separator="-"
          unlink-panels
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"/>
      </div>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
    </div>
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="全部分期" name="first">
          <el-table
            :key="tableKey"
            :data="list"
            height="547"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('order.coding')" prop="code" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.applicant')" prop="applicantName" min-width="150px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.applicantName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.phone')" align="center" prop="phone" width="110px">
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.Processing-time')" prop="judgeTime" width="160px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.judgeTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.approver')" prop="judgerName" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.judgerName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.stages')" prop="count" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.count }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.current-amount')" prop="amount" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.amount }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.Repayment-date')" prop="deadline" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.deadline }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.stat')" prop="stat" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuan }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.dispatched')" prop="handlerId" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.handlerId | fenpai }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.actions')" align="center" min-width="230" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleDetail(scope.row)">{{ $t('table2.view') }}</el-button>
                <el-button v-if="scope.row.handlerId == null" size="mini" type="success" @click="handleDispatch(scope.row)">{{ $t('order.dispatch') }}</el-button>
                <el-button v-if="scope.row.handlerId !== null" size="mini" plain >{{ $t('repair.Dispatched') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="installList.pagenum" :limit.sync="installList.pagesize" @pagination="getinstalllist" />
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label">逾期<el-badge :value="total2" class="item"/></span>
          <el-table
            :key="tableKey2"
            :data="list2"
            height="535"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('order.coding')" prop="code" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.applicant')" prop="applicantName" min-width="150px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.applicantName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.phone')" align="center" prop="phone" width="110px">
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.Processing-time')" prop="judgeTime" width="160px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.judgeTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.approver')" prop="judgerName" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.judgerName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.stages')" prop="count" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.count }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.current-amount')" prop="amount" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.amount }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.Repayment-date')" prop="deadline" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.deadline }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.stat')" prop="stat" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuan }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.dispatched')" prop="handlerId" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.handlerId | fenpai }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.actions')" align="center" min-width="230" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleDetail(scope.row)">{{ $t('table2.view') }}</el-button>
                <el-button v-if="scope.row.handlerId == null" size="mini" type="success" @click="handleDispatch(scope.row)">{{ $t('order.dispatch') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total2>0" :total="total2" :page.sync="installList2.pagenum" :limit.sync="installList2.pagesize" @pagination="getinstalllist" />
        </el-tab-pane>
      </el-tabs>
      <el-dialog
        :visible.sync="centerDialogVisible"
        :model="detail"
        title="订单详情"
        width="80%"
        center
        top="-10px"
      >
        <el-row>
          <el-card class="box-card">
            <div style="margin-bottom:10px;">
              <el-col :span="4" >
                <div class="text">订单编号：{{ detail.code }}</div>
              </el-col>
              <el-col :span="2" >
                <div class="text" style="color: #ff0000;">{{ detail.stat | zhuang }}</div>
              </el-col>
              <el-col :span="6" >
                <div class="text">付款方式：{{ detail.payMode | fukuan }}</div>
              </el-col>
            </div>
          </el-card>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>买家信息</span>
            </div>
            <div style="margin-bottom:10px;">
              <el-col :span="4" >
                <div class="text">姓名：{{ detail.consigneeName }}</div>
              </el-col>
              <el-col :span="4" >
                <div class="text">电话：{{ detail.phoneNumber }}</div>
              </el-col>
            </div>
          </el-card>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>商品信息</span>
            </div>
            <div style="margin-bottom:10px;">
              <el-table
                :data="orderDetaillist"
                height="250"
                border
                style="width: 100%">
                <el-table-column
                  prop="id"
                  label="序号"
                  width="50"
                  align="center" />
                <el-table-column
                  prop="picPath"
                  label="商品图片"
                  width="140"
                  align="center">
                  <template slot-scope="scope">
                    <img :src="'http://'+ scope.row.picPath" height="70" >
                  </template>
                </el-table-column>
                <el-table-column
                  prop="mainTitle"
                  label="商品信息"
                  min-width="140"
                  align="center" />
                <el-table-column
                  prop="code"
                  label="商品编码"
                  min-width="140"
                  align="center" />
                <el-table-column
                  prop="productType"
                  label="型号"
                  width="170"
                  align="center" />
                <el-table-column
                  prop="color"
                  label="颜色"
                  width="170"
                  align="center" />
                <el-table-column
                  prop="quantity"
                  label="数量"
                  width="170"
                  align="center" />
                <el-table-column
                  prop="salePrice"
                  label="单价"
                  width="170"
                  align="center" />
                <el-table-column
                  prop="salePrice"
                  label="小计"
                  width="170"
                  align="center" />
              </el-table>
            </div>
          </el-card>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>配送信息</span>
            </div>
            <div style="margin-bottom:10px;">
              <el-col :span="24" style="margin: 10px">
                <div class="text">快递公司：{{ detail.expressName }}</div>
              </el-col>
              <el-col :span="24" style="margin: 10px">
                <div class="text">发货地址：{{ detail.fullAddress }}</div>
              </el-col>
              <el-col :span="24" style="margin: 10px">
                <div class="text">订单备注：{{ detail.comments }}</div>
              </el-col>
            </div>
          </el-card>
        </el-row>
        <el-row v-if="isinstallment" style="margin-top: 15px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>分期信息</span>
            </div>
            <div style="margin-bottom:10px;">
              <el-table
                :data="installment"
                height="400"
                border
                style="width: 100%">
                <el-table-column
                  prop="id"
                  label="第几期"
                  width="80"
                  align="center" />
                <el-table-column
                  prop="applicantName"
                  label="申请人"
                  min-width="140"
                  align="center" />
                <el-table-column
                  prop="phone"
                  label="电话"
                  width="110"
                  align="center" />
                <el-table-column
                  prop="createTime"
                  label="申请时间"
                  min-width="160"
                  align="center" />
                <el-table-column
                  prop="judgeTime"
                  label="审批时间"
                  min-width="150"
                  align="center" />
                <el-table-column
                  prop="judgerName"
                  label="审批人"
                  width="90"
                  align="center" />
                <el-table-column
                  prop="count"
                  label="分期期数"
                  width="80"
                  align="center" />
                <el-table-column
                  prop="totalmoney"
                  label="分期金额"
                  min-width="160"
                  align="center" />
                <el-table-column
                  prop="amount"
                  label="本期金额"
                  min-width="140"
                  align="center" />
                <el-table-column
                  prop="deadline"
                  label="还款日期"
                  min-width="140"
                  align="center" />
                <el-table-column
                  prop="stat"
                  label="状态"
                  min-width="140"
                  align="center" >
                  <template slot-scope="scope">
                    <span>{{ scope.row.stat | zhuan }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="isvisible" title="分期分派" width="30%" center lock-scroll>
        <el-form :model="dispatchform" style="width: 400px; margin:0 auto;">
          <el-form-item :label-width="formLabelWidth" :label="$t('order.staff')">
            <el-select v-model="dispatchform.id" placeholder="请选择">
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.personName"
                :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isvisible = false">取 消</el-button>
          <el-button type="primary" @click="dispatch">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { installlist, installdetail, stafflist, dispatchorder, installsearch } from '@/api/order'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const xiala = [
  { key: '0', display_name: '全部' },
  { key: '1', display_name: '待还款' },
  { key: '2', display_name: '已还款' },
  { key: '3', display_name: '逾期' },
  { key: '4', display_name: '车已收缴' }
]
export default {
  name: 'InstallOrder',
  directives: { waves },
  components: { Pagination },
  filters: {
    fenpai: function(val) {
      if (val === null) {
        return '待分派'
      } else {
        return '已分派'
      }
    },
    zhuan: function(val) {
      if (val === 1) {
        return '待还款'
      } else if (val === 2) {
        return '已还款'
      } else if (val === 3) {
        return '逾期'
      } else if (val === 4) {
        return '已收缴'
      }
    },
    zhuang: function(value) {
      if (value === 1) {
        return '待付款'
      } else if (value === 2) {
        return '待发货'
      } else if (value === 3) {
        return '待收货'
      } else if (value === 4) {
        return '待评价'
      } else if (value === 5) {
        return '已完成'
      } else if (value === 6) {
        return '已取消'
      } else if (value === 7) {
        return '退换货申请中'
      } else if (value === 8) {
        return '退换货处理完毕'
      } else if (value === 9) {
        return '申请分期中'
      }
    },
    fukuan: function(value) {
      if (value === 1) {
        return '银行转账'
      } else if (value === 2) {
        return '信用卡支付'
      } else if (value === 3) {
        return '分期支付'
      } else if (value === 4) {
        return '到店支付'
      }
    }
  },
  data() {
    return {
      xiala,
      installList: {
        pagenum: 1,
        pagesize: 10
      },
      installList2: {
        pagenum: 1,
        pagesize: 10,
        stat: 3
      },
      install: {
        stat: '',
        pagenum: 1,
        pagesize: 10,
        applicantname: '',
        beginTime: '',
        endTime: '',
        code: ''
      },
      activeName: 'first',
      listLoading: true,
      list: null,
      list2: null,
      tableKey: 0,
      tableKey2: 0,
      centerDialogVisible: false,
      detail: {
        id: '',
        installmentOrderId: '',
        idx: '',
        stat: '',
        code: '',
        phone: '',
        payMode: '',
        consigneeName: '',
        phoneNumber: '',
        expressName: '',
        fullAddress: '',
        comments: ''
      },
      formdata: [],
      installment: [],
      isinstallment: false,
      orderDetaillist: [],
      total: 0,
      total2: 0,
      isvisible: false,
      dispatchform: {
        id: ''
      },
      options: [],
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getinstalllist()
  },
  methods: {
    getinstalllist() {
      installlist(this.installList).then(res => {
        this.list = res.data.data.content.list
        this.total = res.data.data.content.totalCount
      })
      installlist(this.installList2).then(res => {
        this.list2 = res.data.data.content.list
        this.total2 = res.data.data.content.totalCount
      })
    },
    handleFilter() {
      console.log(111)
      installsearch(this.install).then(res => {
        this.list = res.data.data.content.list
        this.total = res.data.data.content.totalCount
        this.list2 = res.data.data.content.list
        this.total2 = res.data.data.content.totalCount
      })
    },
    handleDetail(row) {
      console.log(row)
      installdetail(row.orderid).then(res => {
        this.detail = res.data.data.content
        this.orderDetaillist = res.data.data.content.products
        this.centerDialogVisible = true
        if (res.data.data.installment.length !== 0) {
          this.installment = res.data.data.installment
          this.isinstallment = true
        } else {
          this.isinstallment = false
        }
      })
    },
    handleDispatch(row) {
      this.formdata = Object.assign({}, row)
      this.isvisible = true
      stafflist().then(res => {
        this.options = res.data.data.content.list
      })
    },
    dispatch() {
      const tempData = Object.assign({}, this.formdata)
      console.log(tempData)
      const eachinstallmentid = tempData.id
      const handlerid = this.dispatchform.id
      dispatchorder(eachinstallmentid, handlerid).then(res => {
        if (res.data.ret === 200) {
          this.getinstalllist()
          this.isvisible = false
          this.$notify({
            title: '成功',
            message: '分派成功',
            type: 'success',
            duration: 1000
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.install-container{
  margin: 30px;
}
  .filter-container{
    margin-left: 20px;
  }
</style>
