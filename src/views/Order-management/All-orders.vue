<template>
  <div class="order-container">
    <code>订单管理 </code>
    <panel-group/>
    <code>订单列表</code>
    <div class="filter-container">
      <el-input :placeholder="$t('order.coding')" v-model="order.keyword" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="order.stat" :placeholder="$t('order.stat')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in xiala" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
    </div>
    <div class="operating">
      <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    </div>
    <div class="order-list">
      <el-card v-for="item in orderList" :key="item.id" class="box-card" style="margin-top: 15px">
        <div slot="header" class="clearfix" style="display: flex;align-items: center" >
          <el-checkbox v-model="item.flag" @change="handleCheckItemChange"/>
          <div class="orederlist_address" style="margin-left: 3%">{{ item.cityName }}</div>
          <div class="orderlist_order" style="margin-left: 2%">
            订单编号：<span>{{ item.code }}</span>
          </div>
          <div class="orderlist_time" style="margin-left: 2%">
            下单时间：<span>{{ item.createTime }}</span>
          </div>
          <div class="orderlist_operating" style="margin-left: auto">
            <el-button plain>{{ item.stat | zhuang }}</el-button>
            <el-button plain @click="handleView(item.id)">查看详情</el-button>
          </div>
        </div>
        <div class="order-list-content">
          <el-row type="flex" class="row-bg" justify="center" align="middle">
            <el-col :span="18" style="border-right: 1px solid #f6f6f6">
              <el-row v-for="xitem in item.products" :key="xitem.id" type="flex" class="row-bg" style="border-bottom: 1px solid #f6f6f6;margin: 10px;padding: 10px" align="middle">
                <el-col :span="4" style="padding-left: 65px">
                  <div class="pics">
                    <img :src="'http://'+ xitem.picPath" width="121px">
                  </div>
                </el-col>
                <el-col :span="4" style="margin-left: 200px">
                  <div class="model" style="font-size: 14px;color: #666;">{{ xitem.productType }}</div>
                  <div class="Voltage" style="margin-top: 15px;font-size: 14px;color: #666;">电瓶电压：<span>{{ xitem.salesVolume }}</span></div>
                  <div class="color" style="margin-top: 15px;font-size: 14px;color: #666;">颜色分类：<span>{{ xitem.color }}</span></div>
                </el-col>
                <el-col :span="16" >
                  <div class="price" style="text-align: center">
                    ${{ xitem.salePrice }}
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="3">
              <div class="detali_price">
                <div class="all_price" style="text-align: center ">${{ item.totalMoney }}</div>
                <div class="Freight" style="margin-top: 10px;text-align: center">含运费：<span>${{ item.expressMoney }}</span></div>
                <div class="Offer" style="margin-top: 10px;text-align: center">优惠：<span>${{ item.expressMoney }}</span></div>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="message" style="text-align: center;">{{ item.comments }}</div>
            </el-col>
          </el-row>

        </div>
        <div class="bottom" style="display: flex;align-items: center" >
          <div class="orederlist_address" style="font-size: 14px;color: #666;">{{ item.fullAddress }}</div>
          <div class="orderlist_name" style="margin-left: 2%;font-size: 14px;color: #666;">
            {{ item.consigneeName }}
          </div>
          <div class="orderlist_phone" style="margin-left: 2%;font-size: 14px;color: #666;">
            {{ item.phoneNumber }}
          </div>
          <div class="orderlist_operating" style="margin-left: auto">
            <el-button plain>查看物流</el-button>
          </div>
        </div>
      </el-card>
      <pagination v-show="total>0" :total="total" :page.sync="order.pagenum" :limit.sync="order.pagesize" @pagination="getallorder" />
    </div>
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
                width="140">
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
                  <span>{{ scope.row.stat | huan }}</span>
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
  </div>
</template>

<script>
import { orderlist, searchorders, orderdetail } from '@/api/order'
import PanelGroup from './components/PanelGroup'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const xiala = [
  { key: '0', display_name: '全部' },
  { key: '1', display_name: '待付款' },
  { key: '2', display_name: '待发货' },
  { key: '3', display_name: '待收货' },
  { key: '4', display_name: '待评价' },
  { key: '5', display_name: '完成' },
  { key: '6', display_name: '订单取消' },
  { key: '7', display_name: '退换货申请' },
  { key: '8', display_name: '退换货处理完毕' }
]
export default {
  name: 'AllOrders',
  components: { PanelGroup, Pagination },
  directives: { waves },
  filters: {
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
    },
    huan: function(val) {
      if (val === 1) {
        return '待还款'
      } else if (val === 2) {
        return '已还款'
      } else if (val === 3) {
        return '逾期'
      } else if (val === 4) {
        return '已收缴'
      }
    }
  },
  data() {
    return {
      order: {
        pagenum: 1,
        pagesize: 10,
        keyword: '',
        stat: ''
      },
      total: 0,
      orderList: [],
      orderDetaillist: [],
      xiala,
      checkAll: false,
      optiaons: [],
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
      installment: [],
      isinstallment: false
    }
  },
  created() {
    this.getallorder()
  },
  methods: {
    getallorder() {
      orderlist(this.order).then(res => {
        this.total = res.data.data.content.totalCount
        this.orderList = res.data.data.content.list
      })
    },
    handleFilter() {
      console.log(111)
      searchorders(this.order).then(res => {
        this.total = res.data.data.content.totalCount
        this.orderList = res.data.data.content.list
      })
    },
    handleCheckAllChange(val) {
      this.orderList.map((item, i) => {
        item.flag = val
      })
    },
    handleCheckItemChange(val) {
      for (let i = 0, l = this.orderList.length; i < l; i++) {
        if (this.orderList[i].flag !== val) {
          this.checkAll = false
          return
        }
      }
      this.checkAll = val
    },
    handleView(val) {
      orderdetail(val).then(res => {
        console.log(res)
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
    }
  }
}
</script>

<style scoped>
  .order-container{
    margin: 30px;
  }
  .filter-container{
    margin-left: 20px;
  }
  .operating{
    margin-left: 40px;
  }
  .order-list{
    margin-left: 20px;
  }
</style>
