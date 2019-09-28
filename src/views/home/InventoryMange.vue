<template>
  <div class="ERP-container">
    <div class="filter-container">
      <div id="app">
        <p>{{ $t('route.InventoryMange') }}</p>
      </div>
      <!--      第一大行开始-->
      <el-row :gutter="20" style="margin-top: 10px">
        <el-col :span="24">
          <div style="width: 100%; min-height: 300px;" >
            <el-row :gutter="20" style="margin-top: 26px">
              <el-col :span="24">
                <div style="width: 100%; min-height: 400px;" >
                  <div style="width: 100%; height: 52px;background: #d9e0e8;" >
                    <el-row>
                      <el-form ref="getemplist4" :model="getemplist4" label-width="100px">
                        <el-col :span="6">
                          <div style="padding-top: 16px;padding-left: 20px;">库存信息追踪</div>
                        </el-col>
                        <!--                    <div style="width: 75%;height: 100%;float: left;">-->
                        <el-col :span="6">
                          <el-form-item label="门店" style="margin-top: 2%;height: 20px">
                            <el-input v-model="adjustRepositoryId" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechooseRep"/>
                            <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="月份" style="margin-top: 2%;height: 20px">
                            <el-date-picker
                              v-model="date2"
                              type="month"
                              value-format="yyyy-MM"
                              placeholder="选择月"/>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6" style="height: 100%">
                          <!-- 搜索按钮 -->
                          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-left: 60%;margin-top: 2%;height: 34px" round @click="handleFilter2">{{ $t('public.search') }}</el-button>
                        </el-col>
                      </el-form>
                      <!--                    </div>-->
                    </el-row>
                  </div>
                  <el-table
                    :data="list"
                    :header-cell-style="tableHeaderColor3"
                    style="width: 100%">
                    <el-table-column
                      prop="repositoryName"
                      label="门店"
                      width="163"
                      align="center"/>
                    <el-table-column
                      prop="productName"
                      label="商品"
                      width="164"
                      align="center"/>
                    <el-table-column
                      prop="beginQuantity"
                      label="期初库存"
                      width="164"
                      align="center"/>
                    <el-table-column
                      prop="enterQuantity"
                      label="入库数量"
                      width="164"
                      align="center"/>
                    <el-table-column
                      prop="outQuantity"
                      label="出库数量"
                      width="164"
                      align="center"/>
                    <el-table-column
                      prop="endQuantity"
                      label="期末库存"
                      width="164"
                      align="center"/>
                    <el-table-column
                      prop="beginMoney"
                      label="期初成本"
                      width="164"
                      align="center"/>
                    <el-table-column
                      prop="enterMoney"
                      label="入库成本"
                      width="164"
                      align="center"/>
                    <el-table-column
                      prop="outMoney"
                      label="出库成本"
                      width="164"
                      align="center"/>
                    <el-table-column
                      prop="endMoney"
                      label="期末成本"
                      width="167"
                      align="center"/>
                  </el-table>
                  <div>
                    <el-button v-waves class="filter-item" type="primary" style="width: 86px;margin-left: 75%;margin-top: 1%;" round @click="handleFilter3">上一页</el-button>
                    <el-button v-waves class="filter-item" type="primary" style="width: 86px;margin-top: 1%;" round @click="handleFilter4">下一页</el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>

      <!--      第二大行开始-->
      <el-row :gutter="20" style="margin-top: 10px">
        <el-col :span="24">
          <div style="width: 100%; min-height: 300px;" >
            <el-row :gutter="20" style="margin-top: 26px">
              <el-col :span="24">
                <div style="width: 100%; min-height: 400px;" >
                  <div style="width: 100%; height: 52px;background: #d9e0e8;" >
                    <el-row>
                      <el-form ref="getemplist3" :model="getemplist3" label-width="100px">
                        <el-col :span="6">
                          <div style="padding-top: 16px;padding-left: 20px;">仓库操作导航</div>
                        </el-col>
                        <!--                    <div style="width: 75%;height: 100%;float: left;">-->
                        <el-col :span="6">
                          <el-form-item label="门店" style="margin-top: 2%;height: 20px">
                            <el-input v-model="adjustRepositoryId2" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechooseRep2"/>
                            <my-repository :repositorycontrol.sync="repositorycontrol2" @repositoryname="repositoryname2"/>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-date-picker
                            v-model="date"
                            type="daterange"
                            range-separator="-"
                            unlink-panels
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            style="margin-left: 14%;margin-top: 1.5%;"
                          />
                        </el-col>
                        <el-col :span="4" style="height: 100%">
                          <!-- 搜索按钮 -->
                          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-left: 41%;margin-top: 3.5%;height: 33px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
                        </el-col>
                      </el-form>
                      <!--                    </div>-->
                    </el-row>
                  </div>
                  <el-table
                    :data="list2"
                    :header-cell-style="tableHeaderColor2"
                    style="width: 100%">
                    <el-table-column
                      prop="repositoryName"
                      label="门店"
                      width="185"
                      align="center"/>
                    <el-table-column
                      prop="stockJudge"
                      label="采购审批"
                      width="182"
                      align="center"/>
                    <el-table-column
                      prop="stockArrival"
                      label="采购到货提醒"
                      width="182"
                      align="center"/>
                    <el-table-column
                      prop="enterJudge"
                      label="入库审批"
                      width="182"
                      align="center"/>
                    <el-table-column
                      prop="outJudge"
                      label="出库审批"
                      width="182"
                      align="center"/>
                    <el-table-column
                      prop="moveJudge"
                      label="调拨审批"
                      width="182"
                      align="center"/>
                    <el-table-column
                      prop="stockPlan"
                      label="预计采购"
                      width="182"
                      align="center"/>
                    <el-table-column
                      prop="orderSend"
                      label="待提交发货"
                      width="182"
                      align="center"/>
                    <el-table-column
                      prop="confirmSend"
                      label="待确认发货"
                      width="182"
                      align="center"/>
                  </el-table>
                  <pagination v-show="total>0" :total="total" :page.sync="getemplist3.pageNum" :limit.sync="getemplist3.pageSize" @pagination="getlist" />
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>

      <!--      第三大行开始-->
      <el-row :gutter="20" style="margin-top: 10px">
        <el-col :span="24">
          <div style="width: 100%; min-height: 300px;" >
            <el-row :gutter="20" style="margin-top: 26px">
              <el-col :span="24">
                <div style="width: 100%; min-height: 400px;" >
                  <div style="width: 100%; height: 52px;background: #d9e0e8;" >
                    <el-row>
                      <el-form ref="getemplist2" :model="getemplist2" label-width="100px">
                        <el-col :span="6">
                          <div style="padding-top: 16px;padding-left: 20px;">入库</div>
                        </el-col>
                        <!--                    <div style="width: 75%;height: 100%;float: left;">-->
                        <el-col :span="6">
                          <el-form-item label="门店" style="margin-top: 2%;height: 20px">
                            <el-input v-model="adjustRepositoryId3" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechooseRep3"/>
                            <my-repository :repositorycontrol.sync="repositorycontrol3" @repositoryname="repositoryname3"/>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-date-picker
                            v-model="date3"
                            type="daterange"
                            range-separator="-"
                            unlink-panels
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            style="margin-left: 14%;margin-top: 1.5%;"
                          />
                        </el-col>
                        <el-col :span="4" style="height: 100%">
                          <!-- 搜索按钮 -->
                          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-left: 41%;margin-top: 3.5%;height: 33px" round @click="handleFilter6">{{ $t('public.search') }}</el-button>
                        </el-col>
                      </el-form>
                      <!--                    </div>-->
                    </el-row>
                  </div>
                  <el-table
                    :data="list3"
                    :header-cell-style="tableHeaderColor"
                    style="width: 100%">
                    <el-table-column
                      prop="name"
                      label="项目"
                      width="150"
                      align="center"/>
                    <el-table-column
                      prop="stockEnterQuantity"
                      label="采购入库"
                      width="150"
                      align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.stockEnterQuantity }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="saleReturnQuantity"
                      label="客户退货"
                      width="150"
                      align="center"/>
                    <el-table-column
                      prop="moveQuantity"
                      label="调拨入库"
                      width="150"
                      align="center"/>
                    <el-table-column
                      prop="adjustQuantity"
                      label="盘盈"
                      width="150"
                      align="center"/>
                    <el-table-column
                      prop="initEnterQuantity"
                      label="期初入库"
                      width="150"
                      align="center"/>
                    <el-table-column
                      prop="produceEnterQuantity"
                      label="生产入库"
                      width="150"
                      align="center"/>
                    <el-table-column
                      prop="otherEnterQuantity"
                      label="其他入库"
                      width="150"
                      align="center"/>
                    <el-table-column
                      prop="retreatQuantity"
                      label="退料入库"
                      width="150"
                      align="center"/>
                    <el-table-column
                      prop="buildQuantity"
                      label="组拆装入库"
                      width="146"
                      align="center"/>
                    <el-table-column
                      prop="totalnum"
                      label="合计"
                      width="146"
                      align="center"/>
                  </el-table>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>

      <!--      第四大行开始-->
      <el-row :gutter="20" style="margin-top: 10px">
        <el-col :span="24">
          <div style="width: 100%; min-height: 300px;" >
            <el-row :gutter="20" style="margin-top: 26px">
              <el-col :span="24">
                <div style="width: 100%; min-height: 400px;" >
                  <div style="width: 100%; height: 52px;background: #d9e0e8;" >
                    <el-row>
                      <el-form ref="getemplist5" :model="getemplist5" label-width="100px">
                        <el-col :span="6">
                          <div style="padding-top: 16px;padding-left: 20px;">出库</div>
                        </el-col>
                        <!--                    <div style="width: 75%;height: 100%;float: left;">-->
                        <el-col :span="6">
                          <el-form-item label="门店" style="margin-top: 2%;height: 20px">
                            <el-input v-model="adjustRepositoryId4" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechooseRep4"/>
                            <my-repository :repositorycontrol.sync="repositorycontrol4" @repositoryname="repositoryname4"/>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-date-picker
                            v-model="date5"
                            type="daterange"
                            range-separator="-"
                            unlink-panels
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            style="margin-left: 14%;margin-top: 1.5%;"
                          />
                        </el-col>
                        <el-col :span="4" style="height: 100%">
                          <!-- 搜索按钮 -->
                          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-left: 41%;margin-top: 3.5%;height: 33px" round @click="handleFilter5">{{ $t('public.search') }}</el-button>
                        </el-col>
                      </el-form>
                      <!--                    </div>-->
                    </el-row>
                  </div>
                  <el-table
                    :data="list5"
                    :header-cell-style="tableHeaderColor"
                    style="width: 100%">
                    <el-table-column
                      prop="name"
                      label="项目"
                      width="150"
                      align="center"/>
                    <el-table-column
                      prop="saleOutQuantity"
                      label="销售出库"
                      width="150"
                      align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.stockEnterQuantity }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="accessQuantity"
                      label="领料出库"
                      width="150"
                      align="center"/>
                    <el-table-column
                      prop="serviceOutQuantity"
                      label="维修出库"
                      width="150"
                      align="center"/>
                    <el-table-column
                      prop="adjustQuantity"
                      label="盘亏"
                      width="150"
                      align="center"/>
                    <el-table-column
                      prop="damagedQuantity"
                      label="报损"
                      width="150"
                      align="center"/>
                    <el-table-column
                      prop="stockRetreatQuantity"
                      label="采购退货"
                      width="150"
                      align="center"/>
                    <el-table-column
                      prop="otherOutQuantity"
                      label="其他出库"
                      width="150"
                      align="center"/>
                    <el-table-column
                      prop="moveOutQuantity"
                      label="调拨出库"
                      width="150"
                      align="center"/>
                    <el-table-column
                      prop="buildOutQuantity"
                      label="组拆装入库"
                      width="146"
                      align="center"/>
                    <el-table-column
                      prop="totalnum"
                      label="合计"
                      width="146"
                      align="center"/>
                  </el-table>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <!--      <el- v-model="getemplist.id" :placeholder="$t('route.WorkDesk')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>-->
    </div>
  </div>
</template>

<script>
import { deletesaleOrder, updatesaleOrder2 } from '@/api/SaleOrder'
import MyRepository from './components/MyRepository'
import MyRepository2 from './components/MyRepository'
import { inventoryMange, inventoryMange2, inventoryMange3, inventoryMange5 } from '@/api/home'
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

export default {
  name: 'InventoryMange',
  directives: { waves, permission, permission2 },
  components: { MyDialog, DetailList, MyEmp, MyCustomer, MyAgent, Pagination, MyRepository, MyRepository2, inventoryMange3 },
  filters: {
    judgeStatFilter(status) {
      const statusMap = {
        0: '未审核',
        1: '审核中',
        2: '审核通过',
        3: '审核不通过'
      }
      return statusMap[status]
    },
    receiptStatFilter(status) {
      const statusMap = {
        1: '制单',
        2: '执行',
        3: '结单'
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
      deskdata: {
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
      // 开始时间到结束时间
      adjustRepositoryId: '',
      adjustRepositoryId2: '',
      adjustRepositoryId3: '',
      adjustRepositoryId4: '',
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
      // 仓库选择窗口
      repositorycontrol: false,
      // 仓库选择窗口
      repositorycontrol2: false,
      repositorycontrol3: false,
      repositorycontrol4: false,
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
      list2: [],
      list3: [
      ],
      list5: [
      ],
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
        pageSize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionId
      },
      getemplist2: {
        pageNum: 1,
        pageSize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionId,
        employeeId: this.$store.getters.userId
      },
      getemplist3: {
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionId,
        pageNum: 1,
        pageSize: 10
      },
      getemplist4: {
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionId,
        pageNum: 1,
        pageSize: 10
      },
      getemplist5: {
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionId,
        pageNum: 1,
        pageSize: 10
      },
      // 传给组件的数据
      personalForm: {},
      // 修改控制组件数据
      editVisible: false,
      // 开始时间到结束时间
      date: [],
      date2: [],
      date3: [],
      date4: [],
      date5: []
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    handlechooseRep() {
      this.repositorycontrol = true
    },
    handlechooseRep2() {
      this.repositorycontrol2 = true
    },
    handlechooseRep3() {
      this.repositorycontrol3 = true
    },
    handlechooseRep4() {
      this.repositorycontrol4 = true
    },
    repositoryname(val) {
      console.log('123', val)
      console.log('adjustRepositoryId', val)
      this.adjustRepositoryId = val.repositoryName
      this.getemplist4.searchRepositoryId = val.id
    },
    repositoryname2(val) {
      console.log('123', val)
      console.log('adjustRepositoryId2', val)
      this.adjustRepositoryId2 = val.repositoryName
      this.getemplist3.searchRepositoryId = val.id
    },
    repositoryname3(val) {
      console.log('123', val)
      console.log('adjustRepositoryId3', val)
      this.adjustRepositoryId3 = val.repositoryName
      this.getemplist2.searchRepositoryId = val.id
    },
    repositoryname4(val) {
      console.log('123', val)
      console.log('adjustRepositoryId4', val)
      this.adjustRepositoryId4 = val.repositoryName
      this.getemplist5.searchRepositoryId = val.id
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex === 0) {
        return 'background-color: #22d3b9;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 1) {
        return 'background-color: #22d3b9;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 2) {
        return 'background-color: #22d3b9;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 3) {
        return 'background-color: #22d3b9;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 4) {
        return 'background-color: #22d3b9;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 5) {
        return 'background-color: #22d3b9;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 6) {
        return 'background-color: #22d3b9;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 7) {
        return 'background-color: #22d3b9;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 8) {
        return 'background-color: #22d3b9;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 9) {
        return 'background-color: #22d3b9;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 10) {
        return 'background-color: #22d3b9;color: white;'
      }
    },
    tableHeaderColor3({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex === 0) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 1) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 2) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 3) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 4) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 5) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 6) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 7) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 8) {
        return 'background-color: #00a9f7;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 9) {
        return 'background-color: #00a9f7;color: white;'
      }
    },
    tableHeaderColor2({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex === 0) {
        return 'background-color: #5bba56;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 1) {
        return 'background-color: #5bba56;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 2) {
        return 'background-color: #5bba56;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 3) {
        return 'background-color: #5bba56;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 4) {
        return 'background-color: #5bba56;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 5) {
        return 'background-color: #5bba56;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 6) {
        return 'background-color: #5bba56;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 7) {
        return 'background-color: #5bba56;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 8) {
        return 'background-color: #5bba56;color: white;'
      }
      if (rowIndex === 0 && columnIndex === 9) {
        return 'background-color: #5bba56;color: white;'
      }
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
      inventoryMange(this.getemplist4).then(res => {
        if (res.data.ret === 200) {
          console.log('list', res.data)
          this.list = res.data.data.content.map(function(item) {
            if (item.endQuantity === null) {
              item.endQuantity = 0
            }
            if (item.endMoney === null) {
              item.endMoney = 0
            }
            return {
              repositoryName: item.repositoryName,
              productName: item.productName,
              beginQuantity: item.beginQuantity,
              enterQuantity: item.enterQuantity,
              outQuantity: item.outQuantity,
              endQuantity: item.endQuantity,
              beginMoney: item.beginMoney,
              enterMoney: item.enterMoney,
              outMoney: item.outMoney,
              endMoney: item.endMoney
            }
          })
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })

      inventoryMange2(this.getemplist3).then(res => {
        if (res.data.ret === 200) {
          this.total = res.data.data.content.totalCount
          console.log('list2', res.data)
          this.list2 = res.data.data.content.list.map(function(item) {
            return {
              repositoryName: item.repositoryName,
              stockJudge: item.stockJudge,
              stockArrival: item.stockArrival,
              enterJudge: item.enterJudge,
              outJudge: item.outJudge,
              moveJudge: item.moveJudge,
              stockPlan: item.stockPlan,
              orderSend: item.orderSend,
              confirmSend: item.confirmSend
            }
          })
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })

      inventoryMange3(this.getemplist2).then(res => {
        if (res.data.ret === 200) {
          console.log('list3', res.data)
          const arr1 = new Array(res.data.data.content)
          console.log(arr1)
          const arr2 = arr1.map(function(item) {
            return [
              {
                name: '金额',
                stockEnterQuantity: item.stockEnterMoney,
                saleReturnQuantity: item.saleReturnMoney,
                moveQuantity: item.moveMoney,
                adjustQuantity: item.adjustMOney,
                initEnterQuantity: item.initEnterMoney,
                produceEnterQuantity: item.produceEnterMoney,
                otherEnterQuantity: item.otherEnterMoney,
                retreatQuantity: item.retreatMoney,
                buildQuantity: item.buildMoney,
                totalnum: item.stockEnterMoney + item.saleReturnMoney + item.moveMoney + item.adjustMOney + item.initEnterMoney + item.produceEnterMoney + item.otherEnterMoney + item.retreatMoney + item.buildMoney
              },
              {
                name: '数量',
                stockEnterQuantity: item.stockEnterQuantity,
                saleReturnQuantity: item.saleReturnQuantity,
                moveQuantity: item.moveQuantity,
                adjustQuantity: item.adjustQuantity,
                initEnterQuantity: item.initEnterQuantity,
                produceEnterQuantity: item.produceEnterQuantity,
                otherEnterQuantity: item.otherEnterQuantity,
                retreatQuantity: item.retreatQuantity,
                buildQuantity: item.buildQuantity,
                totalnum: item.stockEnterQuantity + item.saleReturnQuantity + item.moveQuantity + item.adjustQuantity + item.initEnterQuantity + item.produceEnterQuantity + item.otherEnterQuantity + item.retreatQuantity + item.buildQuantity

              }
            ]
          })
          this.list3 = [].concat.apply([], arr2)
          console.log('this.list3', this.list3)
          console.log('arr1[0]', arr1[0])
          this.applyList.push(arr1[0])
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })

      inventoryMange5(this.getemplist5).then(res => {
        if (res.data.ret === 200) {
          console.log('list5', res.data)
          const arr1 = new Array(res.data.data.content)
          console.log(arr1)
          const arr2 = arr1.map(function(item) {
            return [
              {
                name: '金额',
                saleOutQuantity: item.saleOutMoney,
                accessQuantity: item.accessMoney,
                serviceOutQuantity: item.serviceOutMoney,
                adjustQuantity: item.adjustMoney,
                damagedQuantity: item.damagedMoney,
                stockRetreatQuantity: item.stockRetrearMoney,
                otherOutQuantity: item.otherOutMoney,
                moveOutQuantity: item.moveOutMoney,
                buildOutQuantity: item.buildOutMoney,
                totalnum: item.saleOutMoney + item.accessMoney + item.serviceOutMoney + item.adjustMoney + item.damagedMoney + item.stockRetrearMoney + item.otherOutMoney + item.moveOutMoney + item.buildOutMoney
              },
              {
                name: '数量',
                saleOutQuantity: item.saleOutQuantity,
                accessQuantity: item.accessQuantity,
                serviceOutQuantity: item.serviceOutQuantity,
                adjustQuantity: item.adjustQuantity,
                damagedQuantity: item.damagedQuantity,
                stockRetreatQuantity: item.stockRetreatQuantity,
                otherOutQuantity: item.otherOutQuantity,
                moveOutQuantity: item.moveOutQuantity,
                buildOutQuantity: item.buildOutQuantity,
                totalnum: item.saleOutQuantity + item.accessQuantity + item.serviceOutQuantity + item.adjustQuantity + item.adjustQuantity + item.damagedQuantity + item.otherOutQuantity + item.moveOutQuantity + item.buildOutQuantity
              }
            ]
          })
          this.list5 = [].concat.apply([], arr2)
          console.log('this.list5', this.list5)
          console.log('arr1[0]', arr1[0])
          this.applyList.push(arr1[0])
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
      this.stockPersonId = ''
      this.getemplist.stockPersonId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist3.pageNum = 1
      if (this.date === null || this.date === undefined || this.date === '') {
        this.getemplist3.beginTime = ''
        this.getemplist3.endTime = ''
      } else {
        this.getemplist3.beginTime = this.date[0]
        this.getemplist3.endTime = this.date[1]
      }
      inventoryMange2(this.getemplist3).then(res => {
        if (res.data.ret === 200) {
          this.total = res.data.data.content.totalCount
          console.log('list2', res.data)
          this.list2 = res.data.data.content.list.map(function(item) {
            return {
              repositoryName: item.repositoryName,
              stockJudge: item.stockJudge,
              stockArrival: item.stockArrival,
              enterJudge: item.enterJudge,
              outJudge: item.outJudge,
              moveJudge: item.moveJudge,
              stockPlan: item.stockPlan,
              orderSend: item.orderSend,
              confirmSend: item.confirmSend
            }
          })
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    handleFilter6() {
      this.getemplist2.pageNum = 1
      if (this.date3 === null || this.date3 === undefined || this.date3 === '') {
        this.getemplist2.beginTime = ''
        this.getemplist2.endTime = ''
      } else {
        this.getemplist2.beginTime = this.date3[0]
        this.getemplist2.endTime = this.date3[1]
      }
      inventoryMange3(this.getemplist2).then(res => {
        if (res.data.ret === 200) {
          console.log('list3', res.data)
          const arr1 = new Array(res.data.data.content)
          console.log(arr1)
          const arr2 = arr1.map(function(item) {
            return [
              {
                name: '金额',
                stockEnterQuantity: item.stockEnterMoney,
                saleReturnQuantity: item.saleReturnMoney,
                moveQuantity: item.moveMoney,
                adjustQuantity: item.adjustMOney,
                initEnterQuantity: item.initEnterMoney,
                produceEnterQuantity: item.produceEnterMoney,
                otherEnterQuantity: item.otherEnterMoney,
                retreatQuantity: item.retreatMoney,
                buildQuantity: item.buildMoney,
                totalnum: item.stockEnterMoney + item.saleReturnMoney + item.moveMoney + item.adjustMOney + item.initEnterMoney + item.produceEnterMoney + item.otherEnterMoney + item.retreatMoney + item.buildMoney
              },
              {
                name: '数量',
                stockEnterQuantity: item.stockEnterQuantity,
                saleReturnQuantity: item.saleReturnQuantity,
                moveQuantity: item.moveQuantity,
                adjustQuantity: item.adjustQuantity,
                initEnterQuantity: item.initEnterQuantity,
                produceEnterQuantity: item.produceEnterQuantity,
                otherEnterQuantity: item.otherEnterQuantity,
                retreatQuantity: item.retreatQuantity,
                buildQuantity: item.buildQuantity,
                totalnum: item.stockEnterQuantity + item.saleReturnQuantity + item.moveQuantity + item.adjustQuantity + item.initEnterQuantity + item.produceEnterQuantity + item.otherEnterQuantity + item.retreatQuantity + item.buildQuantity

              }
            ]
          })
          this.list3 = [].concat.apply([], arr2)
          console.log('this.list3', this.list3)
          console.log('arr1[0]', arr1[0])
          this.applyList.push(arr1[0])
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    handleFilter5() {
      this.getemplist5.pageNum = 1
      if (this.date5 === null || this.date5 === undefined || this.date5 === '') {
        this.getemplist5.beginTime = ''
        this.getemplist5.endTime = ''
      } else {
        this.getemplist5.beginTime = this.date5[0]
        this.getemplist5.endTime = this.date5[1]
      }
      inventoryMange5(this.getemplist5).then(res => {
        if (res.data.ret === 200) {
          console.log('list5', res.data)
          const arr1 = new Array(res.data.data.content)
          console.log(arr1)
          const arr2 = arr1.map(function(item) {
            return [
              {
                name: '金额',
                saleOutQuantity: item.saleOutQuantity,
                accessQuantity: item.accessQuantity,
                serviceOutQuantity: item.serviceOutQuantity,
                adjustQuantity: item.adjustQuantity,
                damagedQuantity: item.damagedQuantity,
                stockRetreatQuantity: item.stockRetreatQuantity,
                otherOutQuantity: item.otherOutQuantity,
                moveOutQuantity: item.moveOutQuantity,
                buildOutQuantity: item.buildOutQuantity,
                totalnum: item.saleOutQuantity + item.accessQuantity + item.serviceOutQuantity + item.adjustQuantity + item.adjustQuantity + item.damagedQuantity + item.otherOutQuantity + item.moveOutQuantity + item.buildOutQuantity
              },
              {
                name: '数量',
                saleOutQuantity: item.saleOutMoney,
                accessQuantity: item.accessMoney,
                serviceOutQuantity: item.serviceOutMoney,
                adjustQuantity: item.adjustMoney,
                damagedQuantity: item.damagedMoney,
                stockRetreatQuantity: item.stockRetrearMoney,
                otherOutQuantity: item.otherOutMoney,
                moveOutQuantity: item.moveOutMoney,
                buildOutQuantity: item.buildOutMoney,
                totalnum: item.saleOutMoney + item.accessMoney + item.serviceOutMoney + item.adjustMoney + item.damagedMoney + item.stockRetrearMoney + item.otherOutMoney + item.moveOutMoney + item.buildOutMoney
              }
            ]
          })
          this.list5 = [].concat.apply([], arr2)
          console.log('this.list5', this.list5)
          console.log('arr1[0]', arr1[0])
          this.applyList.push(arr1[0])
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 搜索
    handleFilter2() {
      console.log('date2', this.date2)
      if (this.date2 === null || this.date2 === undefined || this.date2 === '' || this.date2.length === 0) {
        // this.getemplist4.date = null
      } else {
        this.getemplist4.date = this.date2
      }
      inventoryMange(this.getemplist4).then(res => {
        if (res.data.ret === 200) {
          console.log('list', res.data)
          this.list = res.data.data.content.map(function(item) {
            if (item.endQuantity === null) {
              item.endQuantity = 0
            }
            if (item.endMoney === null) {
              item.endMoney = 0
            }
            return {
              repositoryName: item.repositoryName,
              productName: item.productName,
              beginQuantity: item.beginQuantity,
              enterQuantity: item.enterQuantity,
              outQuantity: item.outQuantity,
              endQuantity: item.endQuantity,
              beginMoney: item.beginMoney,
              enterMoney: item.enterMoney,
              outMoney: item.outMoney,
              endMoney: item.endMoney
            }
          })
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    handleFilter3() {
      if (this.getemplist4.pageNum !== 1) {
        this.getemplist4.pageNum = this.getemplist4.pageNum - 1
        if (this.date2 === null || this.date2 === undefined || this.date2 === '' || this.date2.length === 0) {
          // this.getemplist4.date = null
        } else {
          this.getemplist4.date = this.date2
        }
        inventoryMange(this.getemplist4).then(res => {
          if (res.data.ret === 200) {
            console.log('list', res.data)
            this.list = res.data.data.content.map(function(item) {
              if (item.endQuantity === null) {
                item.endQuantity = 0
              }
              if (item.endMoney === null) {
                item.endMoney = 0
              }
              return {
                repositoryName: item.repositoryName,
                productName: item.productName,
                beginQuantity: item.beginQuantity,
                enterQuantity: item.enterQuantity,
                outQuantity: item.outQuantity,
                endQuantity: item.endQuantity,
                beginMoney: item.beginMoney,
                enterMoney: item.enterMoney,
                outMoney: item.outMoney,
                endMoney: item.endMoney
              }
            })
          }
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 100)
        })
      }
    },
    handleFilter4() {
      console.log('this.getemplist4.pageNum1', this.getemplist4.pageNum)
      this.getemplist4.pageNum = this.getemplist4.pageNum + 1
      if (this.date2 === null || this.date2 === undefined || this.date2 === '' || this.date2.length === 0) {
        // this.getemplist4.date = null
      } else {
        this.getemplist4.date = this.date2
      }
      inventoryMange(this.getemplist4).then(res => {
        if (res.data.ret === 200) {
          console.log('list', res.data)
          if (res.data.data.content.length > 0) {
            this.list = res.data.data.content.map(function(item) {
              if (item.endQuantity === null) {
                item.endQuantity = 0
              }
              if (item.endMoney === null) {
                item.endMoney = 0
              }
              return {
                repositoryName: item.repositoryName,
                productName: item.productName,
                beginQuantity: item.beginQuantity,
                enterQuantity: item.enterQuantity,
                outQuantity: item.outQuantity,
                endQuantity: item.endQuantity,
                beginMoney: item.beginMoney,
                enterMoney: item.enterMoney,
                outMoney: item.outMoney,
                endMoney: item.endMoney
              }
            })
          } else {
            this.getemplist4.pageNum = this.getemplist4.pageNum - 1
            this.$notify.error({
              title: '错误',
              message: '已经最后一页',
              offset: 100
            })
          }
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
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
    // 修改操作
    handleEdit(row) {
      console.log(row)
      this.editVisible = true
      this.personalForm = Object.assign({}, row)
      this.personalForm.sourceType = String(row.sourceType)
      if (row.currency !== null) {
        this.personalForm.currency = String(row.currency)
      }
      if (row.customerType !== null) {
        this.personalForm.customerType = String(row.customerType)
      }
      if (row.payMode !== null) {
        this.personalForm.payMode = String(row.payMode)
      }
      if (row.saleType !== null) {
        this.personalForm.saleType = String(row.saleType)
      }
      if (row.payType !== null) {
        this.personalForm.payType = String(row.payType)
      }
      if (row.payType !== null) {
        this.personalForm.payType = String(row.payType)
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
  .pagination-container {
    margin-top: 0px;
  }
  @media screen and (max-width: 1400px) {
    .shipei {
      margin-left: 36% !important;
    }
  }
</style>
