<template>
  <el-dialog
    :visible.sync="editVisible"
    :detailcontrol="detailcontrol"
    :detaildata="detaildata"
    :detailid="detailid"
    :close-on-press-escape="false"
    :title="personalForm.content.account +$t('updates.ygxxxq')"
    append-to-body
    width="1010px"
    class="edit"
    top="-10px"
    @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">{{ $t('updates.print') }}</button>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.account')" prop="account" style="width: 100%;">
                  <span>{{ personalForm.content.account }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.password')" prop="password" style="width: 100%;">
                  <span>{{ personalForm.content.password }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.firstname')" prop="firstName" style="width: 100%;">
                  <span>{{ personalForm.content.firstName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.middlename')" style="width: 100%;">
                  <span>{{ personalForm.content.middleName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.lastname')" prop="lastName" style="width: 100%;">
                  <span>{{ personalForm.content.lastName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.birthday')" style="width: 100%;">
                  <span>{{ personalForm.content.birthday }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.email')" prop="email" style="width: 100%;">
                  <span>{{ personalForm.content.email }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.gender')" prop="gender" style="width: 100%;">
                  <span>{{ personalForm.content.gender | genderFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.certificatetype')" style="width: 100%;">
                  <span>{{ personalForm.content.gender | certificateTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.certificatenumber')" style="width: 100%;">
                  <span>{{ personalForm.content.certificateNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.country')" prop="countryId" style="width: 100%;">
                  <span>{{ personalForm.content.countryName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.roleName')" prop="countryId" style="width: 100%;">
                  <span>{{ personalForm.content.roleName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" shadow="never" style="margin-top: 15px">
        <h2 ref="lianxi" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.lxxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="connectForm" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.address')" prop="address" style="width: 100%;">
                  <span>{{ personalForm.content.address }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.phone')" prop="phone" style="width: 100%;">
                  <span>{{ personalForm.content.phone }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.provinceid')" prop="provinceId" style="width: 100%;">
                  <span>{{ personalForm.content.provinceName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.cityid')" prop="cityId" style="width: 100%;">
                  <span>{{ personalForm.content.cityName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top: 15px">
        <h2 class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.gsxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="companyForm" :model="personalForm" ::inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.jobnumber')" style="width: 100%;">
                  <span>{{ personalForm.content.jobNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.postid')" style="width: 100%;">
                  <span>{{ personalForm.content.postName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.deptid')" prop="deptId" style="width: 100%;">
                  <span>{{ personalForm.content.deptName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.regionid')" prop="regionId" style="width: 100%;">
                  <span>{{ personalForm.content.regionName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.repositoryid')" style="width: 100%;">
                  <span>{{ personalForm.content.repositoryName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.regionids')" style="width: 100%;">
                  <span>{{ personalForm.content.regionsName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top: 15px">
        <h2 class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.htxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="companyForm" :model="contracts" ::inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.contractname')" style="width: 100%;">
                  <span>{{ contracts.contractName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.contractnumber')" style="width: 100%;">
                  <span>{{ contracts.contractNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.typeid')" prop="deptId" style="width: 100%;">
                  <span>{{ contracts.contractType }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.createDate')" prop="regionId" style="width: 100%;">
                  <span>{{ contracts.createTime }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.effectivetime')" style="width: 100%;">
                  <span>{{ contracts.effectiveTime }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('NewEmployeeInformation.expiredtime')" style="width: 100%;">
                  <span>{{ contracts.expiredTime }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.bzxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('public.createPersonName')" style="width: 100%;">
                  {{ personalForm.content.createPersonName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.createDate')" style="width: 100%;">
                  {{ personalForm.content.createTime }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <div class="container" style="margin-top: 10px">
          <el-tabs type="card">
            <el-tab-pane :label="$t('updates.ssxx')">
              <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="$t('NewEmployeeInformation.saleQuantity')" style="width: 100%;">
                      {{ personalForm.empsale.saleQuantity }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('NewEmployeeInformation.saleMoney')" style="width: 100%;">
                      {{ personalForm.empsale.saleMoney }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('NewEmployeeInformation.repoRank')" style="width: 100%;">
                      {{ personalForm.empsale.repoRank }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('NewEmployeeInformation.regionRank')" style="width: 100%;">
                      {{ personalForm.empsale.regionRank }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('NewEmployeeInformation.costMoney')" style="width: 100%;">
                      {{ personalForm.empsale.costMoney }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('NewEmployeeInformation.profitMoney')" style="width: 100%;">
                      {{ personalForm.empsale.profitMoney }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane :label="$t('updates.cgxx')">
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  :label="$t('updates.cgrq')"
                  prop="stockDate"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.gys')"
                  prop="supplierName"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.cgsl')"
                  prop="stockQuantity"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.cgje')"
                  prop="stockMoney"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.dhsl')"
                  prop="arriveQuantity"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.rksl')"
                  prop="enterQuantity"
                  align="center"
                  min-width="150"/>
              </el-table>
              <pagination v-show="total>0" :total="total" :page.sync="getstocklist.pagenum" :limit.sync="getstocklist.pagesize" @pagination="getstoctlist" />
            </el-tab-pane>
            <el-tab-pane :label="$t('updates.skxx')">
              <el-table
                :data="tableData2"
                border
                style="width: 100%">
                <el-table-column
                  :label="$t('updates.kh')"
                  prop="customerName"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.skje')"
                  prop="money"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.skqs')"
                  prop="idx"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.skrq')"
                  prop="collectDate"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.skfs')"
                  prop="collectType"
                  align="center"
                  min-width="150"/>
              </el-table>
              <pagination v-show="total2>0" :total="total2" :page.sync="getCollectlist.pagenum" :limit.sync="getCollectlist.pagesize" @pagination="getCollect" />
            </el-tab-pane>
            <el-tab-pane :label="$t('updates.hfjl')">
              <el-row :gutter="20">
                <el-form ref="getVisitlistdata" :model="getVisitlistdata">
                  <el-col :span="5">
                    <el-form-item>
                      <el-input v-model="getVisitlistdata.customerName" :placeholder="$t('updates.khxm')" clearable/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-date-picker
                      v-model="date"
                      :start-placeholder="$t('updates.hfkssj')"
                      :end-placeholder="$t('updates.hfjssj')"
                      type="daterange"
                      range-separator="-"
                      unlink-panels
                      value-format="yyyy-MM-dd"/>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="primary" style="margin-left: 200px" @click="handleFilter">{{ $t('public.search') }}</el-button>
                  </el-col>
                </el-form>
              </el-row>
              <el-table
                :data="tableData3"
                border
                style="width: 100%">
                <el-table-column
                  :label="$t('updates.hfrq')"
                  prop="visitDate"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.kh')"
                  prop="customerName"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.hfnr')"
                  prop="content"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.hffs')"
                  prop="visitMode"
                  align="center"
                  min-width="150"/>
              </el-table>
              <pagination v-show="total3>0" :total="total3" :page.sync="getVisitlistdata.pagenum" :limit.sync="getVisitlistdata.pagesize" @pagination="getVisitlist" />
            </el-tab-pane>
            <el-tab-pane :label="$t('updates.wxxx')">
              <el-form :model="RepairInfo" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="$t('NewEmployeeInformation.Maintenancetimes')" style="width: 100%;">
                      {{ RepairInfo.serviceCount }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('NewEmployeeInformation.Delaytimes')" style="width: 100%;">
                      {{ 0 }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('NewEmployeeInformation.Regionalranking')" style="width: 100%;">
                      {{ RepairInfo.regionRank }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('NewEmployeeInformation.Customerevaluation')" style="width: 100%;">
                      <el-rate
                        v-model="RepairInfo.avgGrade"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('NewEmployeeInformation.Storeranking')" style="width: 100%;">
                      {{ RepairInfo.repositoryRank }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane :label="$t('updates.tsxx')">
              <el-table
                :data="tableData4"
                border
                style="width: 100%">
                <el-table-column
                  :label="$t('Hmodule.xh')"
                  prop="id"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.tsrq')"
                  prop="createTime"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.tsnr')"
                  prop="content"
                  align="center"
                  min-width="150"/>
              </el-table>
              <pagination v-show="total4>0" :total="total4" :page.sync="getComplaintdata.pagenum" :limit.sync="getComplaintdata.pagesize" @pagination="getComplaintList" />
            </el-tab-pane>
            <el-tab-pane :label="$t('updates.tcxx')">
              <el-table
                :data="tableData5"
                border
                style="width: 100%">
                <el-table-column
                  :label="$t('updates.rq')"
                  prop="customerName"
                  align="center"
                  min-width="150">
                  <template slot-scope="scope">
                    <span>{{ formatTime(scope.row.saleDate,'Y-M-D') }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('updates.sxje')"
                  prop="saleMoney"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.xscb')"
                  prop="saleCost"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.lr')"
                  prop="saleProfit"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.tc')"
                  prop="commissionMoney"
                  align="center"
                  min-width="150"/>
              </el-table>
              <pagination v-show="total5>0" :total="total5" :page.sync="getCommissiondata.pagenum" :limit.sync="getCommissiondata.pagesize" @pagination="getCommissionList" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </div>
  </el-dialog>
</template>

<script>
import { getEmpStockInfo, getEmpCollect, getEmpVisitInfo, getEmpRepairInfo, getComplaintInfo, getCommissionInfo } from '@/api/EmployeeInformation'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
var _that
export default {
  components: { Pagination },
  filters: {
    genderFilter(status) {
      const statusMap = {
        1: '男',
        2: '女'
      }
      return statusMap[status]
    },
    certificateTypeFilter(status) {
      const statusMap = {
        1: '类型1',
        2: '类型2'
      }
      return statusMap[status]
    },
    payModeFilter(status) {
      const statusMap = {
        1: '货到付款',
        2: '当场支付'
      }
      return statusMap[status]
    },
    sourceTypeFilter(status) {
      const statusMap = {
        1: _that.$t('updates.xsckd'),
        2: _that.$t('updates.dbd')
      }
      return statusMap[status]
    },
    statFilter(status) {
      const statusMap = {
        1: '配送申请',
        2: '配送出库',
        3: '配送完成',
        4: '回车'
      }
      return statusMap[status]
    },
    requireTypeFilter(status) {
      const statusMap = {
        1: '客户',
        2: '经销商',
        3: '门店'
      }
      return statusMap[status]
    },
    statfilter(status) {
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
    }
  },
  props: {
    detailcontrol: {
      type: Boolean,
      default: false
    },
    detaildata: {
      type: Object,
      default: null
    },
    detailid: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      // 维修信息
      RepairInfo: {},
      // 投诉信息
      tableData4: [],
      total4: 0,
      // 回访日期段
      date: [],
      // 回访信息分页和数据
      tableData3: [],
      total3: 0,
      // 收款信息分页和数据
      tableData2: [],
      total2: 0,
      // 采购信息分页和数据
      total: 0,
      tableData: [],
      // 维修信息
      repearData: {},
      // 合同信息
      contracts: {},
      // 合计数据
      heji1: '',
      heji2: '',
      // 审核数据
      reviewList: [],
      // 详细表数据
      list2: [],
      list3: [],
      // 弹窗组件的控制
      editVisible: this.detailcontrol,
      // 供应商信息数据
      personalForm: this.detaildata,
      getstocklist: {
        pagenum: 1,
        pagesize: 10,
        id: this.detailid
      },
      getCollectlist: {
        pagenum: 1,
        pagesize: 10,
        id: this.detailid
      },
      getVisitlistdata: {
        pagenum: 1,
        pagesize: 10,
        id: this.detailid
      },
      getRepairdata: {
        pagenum: 1,
        pagesize: 10,
        id: this.detailid
      },
      getComplaintdata: {
        pagenum: 1,
        pagesize: 10,
        id: this.detailid
      },
      getCommissiondata: {
        pagenum: 1,
        pagesize: 10,
        id: this.detailid
      }
    }
  },
  watch: {
    detailcontrol() {
      this.editVisible = this.detailcontrol
    },
    detaildata() {
      this.personalForm = this.detaildata
      console.log('this.personalForm', this.personalForm)
      this.personalForm.content.account = this.detaildata.content.account
      this.personalForm.content.regionsName = this.detaildata.content.regionsName
      if (this.personalForm.contract !== '' && this.personalForm.contract !== null && this.personalForm.contract !== undefined) {
        this.contracts = this.personalForm.contract
      }
    },
    detailid() {
      this.getstocklist.id = this.detailid
      this.getCollectlist.id = this.detailid
      this.getVisitlistdata.id = this.detailid
      this.getRepairdata.id = this.detailid
      this.getComplaintdata.id = this.detailid
      this.getCommissiondata.id = this.detailid
      this.getstoctlist()
      this.getCollect()
      this.getVisitlist()
      this.getRepairlist()
      this.getComplaintList()
      this.getCommissionList()
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 格式化日期，如月、日、时、分、秒保证为2位数
    formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    },
    // 参数number为毫秒时间戳，format为需要转换成的日期格式
    formatTime(number, format) {
      const time = new Date(number)
      const newArr = []
      const formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
      newArr.push(time.getFullYear())
      newArr.push(this.formatNumber(time.getMonth() + 1))
      newArr.push(this.formatNumber(time.getDate()))
      newArr.push(this.formatNumber(time.getHours()))
      newArr.push(this.formatNumber(time.getMinutes()))
      newArr.push(this.formatNumber(time.getSeconds()))

      for (const i in newArr) {
        format = format.replace(formatArr[i], newArr[i])
      }
      return format
    },
    // 回访搜索
    handleFilter() {
      this.getVisitlistdata.pagenum = 1
      console.log(this.date)
      if (this.date === '' || this.date === null || this.date === undefined) {
        this.getVisitlistdata.beginTime = ''
        this.getVisitlistdata.endTime = ''
      } else {
        this.getVisitlistdata.beginTime = this.date[0]
        this.getVisitlistdata.endTime = this.date[1]
      }
      getEmpVisitInfo(this.getVisitlistdata).then(res => {
        if (res.data.ret === 200) {
          this.tableData3 = res.data.data.content.list
          this.total3 = res.data.data.content.totalCount
        }
      })
    },
    // 回访分页
    getVisitlist() {
      getEmpVisitInfo(this.getVisitlistdata).then(res => {
        if (res.data.ret === 200) {
          this.tableData3 = res.data.data.content.list
          this.total3 = res.data.data.content.totalCount
          console.log('successful')
        }
      })
    },
    // 采购分页
    getstoctlist() {
      getEmpStockInfo(this.getstocklist).then(res => {
        if (res.data.ret === 200) {
          this.tableData = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
      })
    },
    // 收款分页
    getCollect() {
      getEmpCollect(this.getCollectlist).then(res => {
        if (res.data.ret === 200) {
          this.tableData2 = res.data.data.content.list
          this.total2 = res.data.data.content.totalCount
        }
      })
    },
    handlecancel() {
      this.editVisible = false
    },
    // 维修信息
    getRepairlist() {
      console.log('189189')
      getEmpRepairInfo(this.getRepairdata).then(res => {
        if (res.data.ret === 200) {
          console.log('维修信息', res.data)
          this.RepairInfo = res.data.data
        }
      })
    },
    // 投诉信息
    getComplaintList() {
      getComplaintInfo(this.getComplaintdata).then(res => {
        if (res.data.ret === 200) {
          this.tableData4 = res.data.data.content.list
          console.log('tabledata', this.tableData4)
          this.total4 = res.data.data.content.totalCount
        }
      })
    },
    // 提成信息
    getCommissionList() {
      getCommissionInfo(this.getCommissiondata).then(res => {
        if (res.data.ret === 200) {
          this.tableData5 = res.data.data.content.list
          console.log('tabledata', this.tableData5)
          this.total5 = res.data.data.content.totalCount
        }
      })
    }
  }
}
</script>

<style scoped>
  .edit >>> .el-tabs--card>.el-tabs__header{
    border: none;
  }
  .edit >>> .el-tabs--card>.el-tabs__header .el-tabs__item{
    border: 1px solid #e4e7ed;
  }
  .edit >>> .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border: none;
  }
  .edit >>> .el-tabs--card>.el-tabs__header .el-tabs__item:first-child{
    margin-right: 10px;
  }
  .edit>>> .el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(2){
    margin-right: 10px;
  }
  .edit>>> .el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(3){
    margin-right: 10px;
  }
  .edit>>> .el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(4){
    margin-right: 10px;
  }
  .edit>>> .el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(5){
    margin-right: 10px;
  }
  .edit>>> .el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(6){
    margin-right: 10px;
  }
  .edit >>> .el-dialog{
    -webkit-transform: none;
    transform: none;
    position: absolute;
    right: 0;
    left: auto;
    height: auto;
  }
  .edit >>> .el-dialog__header{
    background: #fff;
    position: fixed;
    top: 0;
    display: block;
    width: 1010px;
    z-index: 100;
    border-bottom: 1px solid #f1f1f1;
  }
  .edit >>> .el-dialog__body{
    padding-left: 0;
    padding-right: 0;
    padding-top: 10px;
  }
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
  .container >>> .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    margin-left: -10px;
  }
  .container >>> .el-form-item__label{
    text-align: left;
  }
  .container >>> .el-form-item__label{
    color: #60626696;
  }
  .el-col-12{
    width: 49%;
  }
  @media print {
    .print {
      display: none;
    }
    .print2 {
      display: block !important;
    }
  }
</style>
