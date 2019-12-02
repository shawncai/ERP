<template>
  <div class="ERP-container">
    <div class="filter-container">
      <div id="app">
        <p>{{ $t('route.WorkDesk') }}</p>
      </div>
      <el-row :gutter="20" style="margin-bottom: 20px" >
        <el-col :span="3">
          <div class="shipei" style="width: 100%; height: 150px;background: #2daeef;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" ><div style="width:52%;margin-left: 37%;margin-top: 22%; color:white">{{ deskdata.one }}</div>
          <div class="shipei4" style="width:50%; color:white">{{ $t('updates.zxsyj') }}</div></div>
        </el-col>
        <el-col :span="3">
          <div class="shipei" style="width: 100%; height: 150px;background: #f36e5d;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" > <div style="width:52%;margin-left: 37%;margin-top: 22%; color:white">{{ deskdata.two }}</div>
          <div class="shipei4" style="width:50%; color:white">{{ $t('updates.zhzye') }}</div></div>
        </el-col>
        <el-col :span="3">
          <div class="shipei" style="width: 100%; height: 150px;background: #a48df5;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" ><div style="width:52%;margin-left: 37%;margin-top: 22%; color:white"> {{ deskdata.three }}</div>
          <div class="shipei4" style="width:50%; color:white">{{ $t('updates.byszc') }}</div></div>
        </el-col>
        <el-col :span="3">
          <div class="shipei" style="width: 100%; height: 150px;background: #22d3b9;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" > <div style="width:52%;margin-left: 37%;margin-top: 22%; color:white">{{ deskdata.four }}</div>
          <div class="shipei5" style="width:50%; color:white">{{ $t('updates.byzc') }}</div></div>
        </el-col>
        <el-col :span="3">
          <div class="shipei" style="width: 100%; height: 150px;background: #6f8aff;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" > <div style="width:46%;margin-left: 37%;margin-top: 22%; color:white">{{ deskdata.five }}</div>
          <div class="shipei5" style="width:37%; color:white">{{ $t('updates.bylr') }}</div></div>
        </el-col>
        <el-col :span="3">
          <div class="shipei" style="width: 100%; height: 150px;background: white;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" ><div style="width:41%;margin-left: 37%;margin-top: 22%; color:black">{{ deskdata.six }} </div>
          <div class="shipei3" style="width:62%; color:black">{{ $t('updates.wfkdd') }}</div></div>
        </el-col>
        <el-col :span="3">
          <div class="shipei" style="width: 100%; height: 150px;background: white;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" > <div style="width:52%;margin-left: 37%;margin-top: 22%; color:black">{{ deskdata.seven }}</div>
          <div class="shipei22" style="margin-left: 30%;width:74%; color:black">{{ $t('updates.wfkje') }}</div></div>
        </el-col>
        <el-col :span="3">
          <div class="shipei" style="width: 100%; height: 150px;background: white;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" > <div style="width:52%;margin-left: 37%;margin-top: 22%; color:black">{{ deskdata.eight }}</div>
          <div class="shipei22" style="margin-left: 30%;width:78%; color:black">{{ $t('updates.jzbyyf') }}</div></div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="3">
          <div class="shipei" style="width: 100%; height: 150px;background: #2daeef;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" ><div class="shipei2" style="width:90%;margin-left: 10px;margin-top: 5px; color:white">{{ $t('updates.jrxl') }}</div><div style="width: 67%; color:white" >{{ deskdata.nine }} </div><div class="shipei2" style="width: 64%; color:white">{{ $t('updates.tbzr') }}</div><div style="color: white">{{ deskdata.rateOne }}</div></div>
        </el-col>
        <el-col :span="3">
          <div class="shipei" style="width: 100%; height: 150px;background: #f36e5d;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" > <div class="shipei2" style="width:80%;margin-left: 10px;margin-top: 5px; color:white">{{ $t('updates.jrxsje') }}</div><div style="width: 67%; color:white">{{ deskdata.ten }}</div><div class="shipei2" style="width: 64%; color:white">{{ $t('updates.tbzr') }}</div><div style="color: white">{{ deskdata.rateTwo }}</div></div>
        </el-col>
        <el-col :span="3">
          <div class="shipei" style="width: 100%; height: 150px;background: #a48df5;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" > <div class="shipei2" style="width:80%;margin-left: 10px;margin-top: 5px; color:white">{{ $t('updates.jrwxl') }}</div><div style="width: 67%; color:white">{{ deskdata.eleven }}</div><div class="shipei2" style="width: 64%; color:white">{{ $t('updates.tbzr') }}</div><div style="color: white">{{ deskdata.rateThree }}</div></div>
        </el-col>
        <el-col :span="3">
          <div class="shipei" style="width: 100%; height: 150px;background: #22d3b9;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" > <div class="shipei2" style="width:82%;margin-left: 10px;margin-top: 5px; color:white">{{ $t('updates.bycgl') }}</div><div style="width: 67%; color:white">{{ deskdata.twelve }}</div><div class="shipei2" style="width: 66%; color:white">{{ $t('updates.tbzr') }}</div><div style="color: white">{{ deskdata.rateFour }}</div></div>
        </el-col>
        <el-col :span="3">
          <div class="shipei" style="width: 100%; height: 150px;background: #6f8aff;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" ><div class="shipei2" style="width:80%;margin-left: 10px;margin-top: 5px; color:white">{{ $t('updates.jrpm') }}</div><div style="width: 67%; color:white">{{ deskdata.thirteen }} </div><div class="shipei2" style="width: 64%; color:white">{{ $t('updates.tbzr') }}</div><div style="color: white">{{ deskdata.rateFive }}</div></div>
        </el-col>
        <el-col :span="3">
          <div class="shipei" style="width: 100%; height: 150px;background: white;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" > <div style="width:52%;margin-left: 37%;margin-top: 22%; color:black">{{ deskdata.fourteen }}</div><div class="shipei3" style="width:63%; color:black">{{ $t('updates.wskdd') }}</div></div>
        </el-col>
        <el-col :span="3">
          <div class="shipei" style="width: 100%; height: 150px;background: white;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" > <div style="width:52%;margin-left: 37%;margin-top: 22%; color:black">{{ deskdata.fifteen }}</div><div class="shipei22" style="margin-left: 30%;width:71%; color:black">{{ $t('updates.wskje') }}</div></div>
        </el-col>
        <el-col :span="3">
          <div class="shipei" style="width: 100%; height: 150px;background: white;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" ><div style="width:52%;margin-left: 37%;margin-top: 22%; color:black">{{ deskdata.sixteen }} </div><div class="shipei22" style="margin-left: 30%;width:79%; color:black">{{ $t('updates.jzbyys') }}</div></div>
        </el-col>
      </el-row>

      <!--      第二大行开始-->
      <el-row :gutter="20" style="margin-top: 30px">
        <!--        常用报表-->
        <el-col :span="15">
          <div style="width: 100%; height: 400px;background: red;" >
            <div style="width: 100%; height: 30px;background: #d9e0e8;" >
              <div style="padding-top: 7px;margin-left: 20px">{{ $t('index.report') }}</div>
            </div>
            <div style="width: 100%; height: 395px;overflow: hidden;background: white;" >
              <el-row :gutter="2">
                <el-col :span="6"><div class="grid-content bg-purple">
                  <div style="margin-top: 10%;margin-left: 10%;width: 75%; height: 70px;background: #5bba56;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" >
                    <div style="width:69%;margin-left: 38%; color:white">{{ $t('updates.xq') }}</div>
                  </div>
                  <div style="height: 70px"/>
                  <div style="height: 70px"/>
                  <div style="height: 70px"/>
                  <div style="height: 70px"/>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                  <div style="margin-top: 10%;margin-left: 10%;width: 75%; height: 70px;background: #00a9f7;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" >
                  <div style="width:69%;margin-left: 38%; color:white">{{ $t('updates.cg') }}</div></div>
                  <div style="height: 70px"/>
                  <div style="height: 70px"/>
                  <div style="height: 70px"/>
                  <div style="height: 70px"/>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                  <div style="margin-top: 10%;margin-left: 10%;width: 75%; height: 70px;background: #f99a00;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" >
                  <div style="width:69%;margin-left: 38%; color:white">{{ $t('updates.kc') }}</div></div>
                  <div style="height: 70px"/>
                  <div style="height: 70px"/>
                  <div style="height: 70px"/>
                  <div style="height: 70px"/>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                  <div style="margin-top: 10%;margin-left: 10%;width: 75%; height: 70px;background: #f93f33;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" >
                  <div style="width:69%;margin-left: 38%; color:white">{{ $t('updates.cw') }}</div></div>
                  <div style="height: 70px"/>
                  <div style="height: 70px"/>
                  <div style="height: 70px"/>
                  <div style="height: 70px"/>
                </div></el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <!--        库存预警-->
        <el-col :span="9">
          <div style="width: 100%; height: 400px;background: red;" >
            <div style="width: 100%; height: 30px;background: #d9e0e8;" >
              <div style="padding-top: 7px;float: left;margin-left: 20px">{{ $t('index.alarm') }}</div>
              <div style="padding-top: 7px;float: right;color: grey;margin-right: 20px;cursor: pointer" @click="handleReceipt2()">{{ $t('index.more') }}</div>
            </div>
            <div style="width: 100%; height: 395px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span><router-link to="/StockAlarm/StockAlarmList"> {{ scope.row.name }}</router-link></span>
                  </template>
                </el-table-column>
                <el-table-column :resizable="false" align="right" min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>

      <!--      第三大行开始-->
      <el-row :gutter="20" style="margin-top: 60px">
        <!--        我的待办-->
        <el-col :span="15" style="height: 400px;">
          <div style="width: 100%; height: 400px;background: red;" >
            <div style="width: 100%; height: 30px;background: #d9e0e8;" >
              <div style="padding-top: 7px;float: left;margin-left: 20px">{{ $t('index.prepare') }}</div>
              <div style="padding-top: 7px;float: right;color: grey;margin-right: 20px;cursor: pointer" @click="handleEdit">{{ $t('index.more') }}</div>
            </div>
            <div style="width: 100%; height: 100%;background: white;" >
              <el-row :gutter="2">
                <el-col :span="24"><div class="grid-content bg-purple">
                  <div style="height: 70px;margin-left: 84px;margin-top: 49px;">{{ deskdata.ones }}</div>
                  <div style="height: 70px;margin-left: 84px">{{ deskdata.twos }}</div>
                  <div style="height: 70px;margin-left: 84px">{{ deskdata.threes }}</div>
                  <div style="height: 70px;margin-left: 84px">{{ deskdata.fours }}</div>
                  <div style="height: 70px;margin-left: 84px">{{ deskdata.fives }}</div>
                </div></el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <!--        我的申请-->
        <el-col :span="9">
          <div style="width: 100%; height: 400px;background: red;" >
            <div style="width: 100%; height: 30px;background: #d9e0e8;" >
              <div style="padding-top: 7px;float: left;margin-left: 20px">{{ $t('index.apply') }}</div>
              <div style="padding-top: 7px;float: right;color: grey;margin-right: 20px;cursor: pointer" @click="handleReceipt()">{{ $t('index.more') }}</div>
            </div>
            <div style="width: 100%; height: 395px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="applyList"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)">{{ scope.row }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
      <!--      <el- v-model="getemplist.id" :placeholder="$t('route.WorkDesk')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>-->
      <el-dialog :visible.sync="receiptVisible2" title="库存预警" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="    width: 550px;">
            <div style="width: 100%; height: 395px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list"
                :show-header="false"
                height="390"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span><router-link to="/StockAlarm/StockAlarmList"> {{ scope.row.name }}</router-link></span>
                  </template>
                </el-table-column>
                <el-table-column :resizable="false" align="right" min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="receiptVisible" title="我的申请" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="    width: 550px;">
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="applyList"
                :show-header="false"
                height="390"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)">{{ scope.row }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { searchsaleOrder, deletesaleOrder, updatesaleOrder2 } from '@/api/SaleOrder'
import { searchalarm } from '@/api/StockAlarm'
import { applyList } from '@/api/StockApply'
import { workDesk1, workDesk2, workDesk3 } from '@/api/home'
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

var _that
export default {
  name: 'WorkDest',
  directives: { waves, permission, permission2 },
  components: { MyDialog, DetailList, MyEmp, MyCustomer, MyAgent, Pagination },
  filters: {
    judgeStatFilter(status) {
      const statusMap = {
        0: _that.$t('updates.wsh'),
        1: _that.$t('updates.shz'),
        2: _that.$t('Hmodule.shtg'),
        3: _that.$t('updates.shbtg')
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
    }
  },
  data() {
    return {
      receiptVisible: false,
      receiptVisible2: false,
      editVisible: false,
      deskdata: {
        ones: ''
      },
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
      applyList: [],
      // 表格数据条数
      total: 0,
      // 表格识别
      tableKey: 0,
      // 加载表格
      listLoading: true,
      // 采购申请查询加展示参数
      getemplist: {
        pageNum: 1,
        pageSize: 9999,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds
      },
      getemplist2: {
        pageNum: 1,
        pageSize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds,
        employeeId: this.$store.getters.userId
      },
      // 传给组件的数据
      personalForm: {},
      // 开始时间到结束时间
      date: []
    }
  },

  mounted() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    handleReceipt2(row) {
      this.receiptVisible2 = true
      console.log('row', row)
    },
    handleReceipt(row) {
      this.receiptVisible = true
      console.log('row', row)
    },
    // 修改操作
    handleEdit() {
      this.$router.push('/home/MyPrepare')
    },
    getlink(row) {
      console.log(row)
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
      this.listLoading = true
      searchalarm(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          let type = ''
          this.list = res.data.data.content.list.map(function(item) {
            if (item.alarmType === 1) {
              type = '较低'
            } else {
              type = '较高'
            }
            return {
              name: item.productName + '商品库存' + type + '报警',
              createTime: item.createTime
            }
          })
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      applyList(this.getemplist2).then(res => {
        if (res.data.ret === 200) {
          console.log(res.data)
          console.log(res.data.data.checkApply)
          const arr = []
          // const stockApply = ''
          if (res.data.data.checkApply !== '' && res.data.data.checkApply !== null && res.data.data.checkApply !== undefined && res.data.data.checkApply.length > 0) {
            const length = res.data.data.checkApply.length
            console.log(length)
            for (const i in res.data.data.checkApply) {
              arr.push('您有单据编号为' + res.data.data.checkApply[i].checkNumber + '的质检申请待处理')
            }
          }
          if (res.data.data.stockApply !== '' && res.data.data.stockApply !== null && res.data.data.stockApply !== undefined && res.data.data.stockApply.length > 0) {
            // const length = res.data.data.stockApply.length
            for (const i in res.data.data.stockApply) {
              arr.push('您有单据编号为' + res.data.data.stockApply[i].applyNumber + '的采购申请待处理')
            }
          }
          this.applyList = arr
          console.log('applylist', this.applyList)
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      workDesk1(this.getemplist2).then(res => {
        if (res.data.ret === 200) {
          console.log('workDesk1', res.data)
          // this.deskdata.one = res
          this.deskdata.nine = (res.data.data.todayQuantity).toFixed(2)
          this.deskdata.ten = (res.data.data.todayMoney).toFixed(2)
          this.deskdata.eleven = (res.data.data.serviceFinishToday).toFixed(2)
          this.deskdata.twelve = (res.data.data.nowStockQuantity).toFixed(2)
          console.log('twelve', this.deskdata.twelve)
          this.deskdata.thirteen = '----'
          this.deskdata.rateFive = '----'
          if (res.data.data.ChangeRateService === 'NaN' || res.data.data.ChangeRateService === 'Infinity') {
            console.log('hahaha')
            this.deskdata.rateThree = '----'
            console.log(this.deskdata.rateThree)
          } else {
            this.deskdata.rateThree = (res.data.data.ChangeRateService).toFixed(2)
          }
          if (res.data.data.changRateStock === 'Infinity' || res.data.data.changRateStock === 'NaN') {
            this.deskdata.rateFour = '----'
          } else {
            this.deskdata.rateFour = (res.data.data.changRateStock).toFixed(2)
          }
          if (res.data.data.changRateMoney === 'NaN' || res.data.data.changRateMoney === 'Infinity') {
            this.deskdata.rateTwo = '----'
          } else {
            this.deskdata.rateTwo = (res.data.data.changRateMoney).toFixed(2)
          }
          if (res.data.data.changRateQuantity === 'NaN' || res.data.data.changRateQuantity === 'Infinity') {
            this.deskdata.rateOne = '----'
          } else {
            this.deskdata.rateOne = (res.data.data.changRateQuantity).toFixed(2)
          }
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })

      workDesk3(this.getemplist2).then(res => {
        if (res.data.ret === 200) {
          console.log('workDesk3', res.data)
          console.log('toDoTask', res.data.data.toDoTask)
          this.deskdata.ones = '您有' + res.data.data.toDoTask + '条待办的任务'
          console.log(this.deskdata.ones)
          this.deskdata.twos = '您有' + res.data.data.toDoEvent + '条待处理的事件'
          this.deskdata.threes = '您有' + res.data.data.toJudge + '条待审批的单据'
          this.deskdata.fours = '您有0条待分配的维修订单'
          this.deskdata.fives = '您有' + res.data.data.toPay + '条待付款记录'
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })

      workDesk2(this.getemplist2).then(res => {
        if (res.data.ret === 200) {
          console.log('workDesk2', res.data)
          this.deskdata.one = (res.data.data.saleQuantity).toFixed(2)
          this.deskdata.two = '----'
          this.deskdata.three = '----'
          this.deskdata.four = '----'
          this.deskdata.five = '----'
          this.deskdata.six = (res.data.data.orderNumber).toFixed(2)
          this.deskdata.seven = (res.data.data.shouldPay).toFixed(2)
          this.deskdata.eight = '----'
          this.deskdata.sixteen = '----'
          this.deskdata.fourteen = (res.data.data.orderNumber).toFixed(2)
          this.deskdata.fifteen = (res.data.data.shouldReceipt).toFixed(2)
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
    restFilter() {
      this.stockPersonId = ''
      this.getemplist.stockPersonId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      searchsaleOrder(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
    },
    // 采购人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 采购人回显
    stockName(val) {
      this.stockPersonId = val.personName
      this.getemplist.stockPersonId = val.id
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
    // 审批操作
    handleReview(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.judgePersonId = this.$store.getters.userId
      this.$confirm('请审核', '审核', {
        distinguishCancelAndClose: true,
        confirmButtonText: '通过',
        cancelButtonText: '不通过',
        type: 'warning'
      }).then(() => {
        this.reviewParms.judgeStat = 2
        const parms = JSON.stringify(this.reviewParms)
        updatesaleOrder2(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: '审核成功!'
            })
            this.getlist()
          }
        })
      }).catch(action => {
        if (action === 'cancel') {
          this.reviewParms.judgeStat = 3
          const parms = JSON.stringify(this.reviewParms)
          updatesaleOrder2(parms).then(res => {
            if (res.data.ret === 200) {
              this.$message({
                type: 'success',
                message: '审核成功!'
              })
              this.getlist()
            }
          })
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
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletesaleOrder(ids, this.$store.getters.userId).then(res => {
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
        deletesaleOrder(row.id, this.$store.getters.userId).then(res => {
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
      this.$router.push('/SaleOrder/AddSaleOrder')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'SaleOrderName', 'SaleOrderShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
  .app-container >>> .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 24px;
    word-break: keep-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  .ERP-container {
    margin: 0px 30px;
  }
  .filter-container{
    padding: 20px;
    padding-left: 0px;
  }
  .filter-item{
    width: 140px;
    margin-left: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: white;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 400px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
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
  @media screen and (max-width: 1400px) {
   .shipei {
      height: 100px !important;
    }
    .shipei2 {
      /*width: 63% !important;*/
      font-size: 14px !important;
    }
    .shipei3 {
      width: 100% !important;
      font-size: 14px !important;
    }
    .shipei22 {
      width: 100% !important;
      font-size: 14px !important;
      margin-left: 10% !important;
    }
    .shipei4 {
      width: 66% !important;
      font-size: 14px !important;
    }
    .shipei5 {
      width: 52% !important;
      font-size: 14px !important;
    }
  }
</style>
