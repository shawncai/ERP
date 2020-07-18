<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.enterNumber +$t('updates.xqing')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <button v-if="personalForm.judgeStat !== 0 || personalForm.judgeStat !== 3" class="print" style="font-size: 13px;background: white;" @click="printdata">{{ $t('updates.print') }}</button>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="采购入库单编号" style="width: 100%;">
                  {{ personalForm.enterNumber }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Stockenter.title')" style="width: 100%;">
                  <span>{{ personalForm.title }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Stockenter.sourceType')" prop="sourceType" style="width: 100%;">
                  <span>{{ personalForm.sourceType | sourceTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Stockenter.sourceNumber')" prop="sourceType" style="width: 100%;">
                  <span>{{ personalForm.sourceNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Hmodule.pc')" style="width: 100%;">
                  <span>{{ personalForm.batch }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="国家" style="width: 100%;">
                  <span>{{ personalForm.countryName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="制单人" style="width: 100%;">
                  <span>{{ personalForm.createPersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Stockenter.supplierId')" style="width: 100%">
                  <span>{{ personalForm.supplierName }}</span>
                </el-form-item>
                <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Stockenter.stockPersonId')" style="width: 100%">
                  <span>{{ personalForm.stockPersonName }}</span>
                </el-form-item>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Stockenter.stockDeptId')" style="width: 100%">
                  <span>{{ personalForm.stockDeptName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Stockenter.deliveryPersonId')" style="width: 100%">
                  <span>{{ personalForm.deliveryPersonName }}</span>
                </el-form-item>
                <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Stockenter.acceptPersonId')" style="width: 100%">
                  <span>{{ personalForm.acceptPersonName }}</span>
                </el-form-item>
                <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Stockenter.enterDeptId')" style="width: 100%">
                  <span>{{ personalForm.enterDeptName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Stockenter.enterRepositoryId')" prop="enterRepositoryId" style="width: 100%">
                  <span>{{ personalForm.enterRepositoryName }}</span>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('collectAndPayDetail.fjf')" prop="enterRepositoryId" style="width: 100%">
                  <span>{{ personalForm.extraMoney }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--入库单明细-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.rkdmx') }}</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            border
            size="small"
            style="width: 100%">
            <el-editable-column type="index" fixed align="center" label="编号" />
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" fixed align="center" />
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" fixed align="center" />
            <el-editable-column :label="$t('Hmodule.hw')" prop="locationCode" align="center" />
            <el-editable-column :label="$t('Hmodule.pc')" prop="batch" align="center" />
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" />
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" />
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" />
            <el-editable-column :label="$t('updates.jbel')" prop="basicQuantity" align="center" />
            <el-editable-column prop="actualEnterQuantity" align="center" label="实收数量" />
            <el-editable-column prop="invoiceQuantity" align="center" label="已开票数量" min-width="100px" />
            <el-editable-column v-if="jundgeprice()" prop="noinvoiceQuantity" align="center" label="未开票数量" min-width="100px" >
              <template slot-scope="scope">
                <p>{{ getSize2(scope.row.actualEnterQuantity, scope.row.invoiceQuantity) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column v-if="jundgeprice()" :label="$t('updates.rkdj')" prop="enterPrice" align="center" />
            <el-editable-column v-if="jundgeprice()" :label="$t('updates.rkje')" prop="enterMoney" align="center" >
              <template slot-scope="scope">
                <p>{{ getSize(scope.row.actualEnterQuantity, scope.row.enterPrice) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column v-if="jundgeprice()" :label="$t('updates.slv')" prop="taxRate" align="center" />
            <el-editable-column v-if="jundgeprice()" :label="$t('updates.hsj')" prop="includeTaxPrice" align="center" min-width="170px"/>
            <el-editable-column v-if="jundgeprice()" :label="$t('updates.sl')" prop="taxRate" align="center" min-width="170px"/>

            <el-editable-column v-if="jundgeprice()" :label="$t('updates.hsje')" prop="includeTaxMoney" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ scope.row.includeTaxMoney }}</p>
                <!-- <p>{{ getTaxMoney(scope.row) }}</p> -->
              </template>
            </el-editable-column>
            <el-editable-column v-if="jundgeprice()" :label="$t('updates.se')" prop="taxMoney" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ scope.row.taxMoney }}</p>
                <!-- <p>{{ getTaxMoney2(scope.row) }}</p> -->
              </template>
            </el-editable-column>
            <el-editable-column v-if="jundgeprice()" :label="$t('updates.ckl')" prop="discountRate" align="center" min-width="170px"/>
            <el-editable-column v-if="jundgeprice()" :label="$t('updates.cke')" prop="discountMoney" align="center" min-width="170px">
              <template slot-scope="scope">
                <p>{{ scope.row.discountMoney }}</p>
                <!-- <p>{{ getdiscountMoney(scope.row) }}</p> -->
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.dcbm')" prop="batteryCode" align="center" />
            <el-editable-column :label="$t('updates.bz')" prop="remarks" align="center" />
            <el-editable-column :label="$t('CarStatList.orderNumber')" prop="orderNumber" align="center" />
            <el-editable-column :label="$t('updates.ydxh')" prop="sourceSerialNumber" align="center" />
            <el-editable-column :label="$t('collectAndPayDetail.fjf')" prop="extraMoney" align="center" />
          </el-editable>
        </div>
      </el-card>
      <!-- 合计信息 -->
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.heji')" style="width: 100%;">
                  <el-input v-model="heji1" size="mini" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col v-if="jundgeprice()" :span="6">
                <el-form-item :label="$t('Stockenter.heji2')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="heji2" size="mini" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col v-if="jundgeprice()" :span="6">
                <el-form-item :label="$t('updates.sehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="allTaxMoney" size="mini" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col v-if="jundgeprice()" :span="6">
                <el-form-item :label="$t('updates.hsjehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="allIncludeTaxMoney" size="mini" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col v-if="jundgeprice()" :span="6">
                <el-form-item :label="$t('updates.zdzkjehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="allDiscountMoney" size="mini" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col v-if="jundgeprice()" :span="6">
                <el-form-item :label="$t('updates.zhhsjehj')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="allMoneyMoveDiscount" size="mini" style="margin-left: 18px;width:200px" disabled/>
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
                <el-form-item :label="$t('public.createPersonName2')" prop="stockType" style="width: 100%;">
                  {{ personalForm.createPersonName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.createDate2')" style="width: 100%;">
                  {{ personalForm.createDate }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.endPersonName')" prop="applyDate" style="width: 100%;">
                  {{ personalForm.endPersonName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.endDate')" prop="applyDate" style="width: 100%;">
                  {{ personalForm.endDate }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.modifyPersonName')" prop="applyDate" style="width: 100%;">
                  {{ personalForm.modifyPersonName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.modifyDate')" prop="applyDate" style="width: 100%;">
                  {{ personalForm.modifyDate }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--审核状态-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.spjl') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-table
            :data="reviewList"
            border
            style="width: 100%">
            <el-table-column
              :label="$t('updates.dqbz')"
              prop="step"
              align="center"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.dqspr')"
              prop="stepHandlerName"
              align="center"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.spsj')"
              prop="handleTime"
              align="center"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.spyj')"
              prop="stat"
              align="center"
              min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | statfilter }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <div class="buttons" style="margin-top: 20px;margin-left: 30px">
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import printJS from 'print-js'
import { locationlist } from '@/api/WarehouseAdjust'
import { getPrintCount, addPrint } from '@/api/public'
import { updatestockenter } from '@/api/Stockenter'
import { getdeptlist } from '@/api/BasicSettings'
import MyRepository from './MyRepository'
import MySupplier from './MySupplier'
import MyEmp from './MyEmp'
import MyDelivery from './MyDelivery'
import MyAccept from './MyAccept'
import MyDetail from './MyDetail'
var _that
export default {
  components: { MyRepository, MySupplier, MyEmp, MyDelivery, MyAccept, MyDetail },
  filters: {
    statfilter(status) {
      const statusMap = {
        0: _that.$t('updates.wsh'),
        1: _that.$t('updates.shz'),
        2: _that.$t('Hmodule.shtg'),
        3: _that.$t('Hmodule.shbtg')
      }
      return statusMap[status]
    },
    sourceTypeFilter(status) {
      const statusMap = {
        1: _that.$t('updates.cgdhd'),
        2: _that.$t('updates.cgdd')
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
    }
  },
  data() {
    return {
      // 合计信息
      heji1: '',
      heji2: '',
      allTaxMoney: '',
      allIncludeTaxMoney: '',
      allDiscountMoney: '',
      allMoneyMoveDiscount: '',
      // 审核步骤数据
      reviewList: [],
      // 弹窗组件的控制
      editVisible: this.detailcontrol,
      // 供应商信息数据
      personalForm: this.detaildata,
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 货位数据
      locationlist: [],
      // 明细表控制框
      control: false,
      // 验收人回显
      acceptPersonId: '',
      // 验收人控制框
      accetpcontrol: false,
      // 交货人回显
      deliveryPersonId: '',
      // 交货人控制框
      deliverycontrol: false,
      // 部门数据
      depts: [],
      // 采购员控制框
      stockControl: false,
      // 采购员回显
      stockPersonId: '',
      // 供货商回显
      supplierId: '',
      // 供货商控制
      empcontrol: false,
      // 入库仓库回显
      enterRepositoryId: '',
      // 仓库选择控制期
      repositorycontrol: false,
      // 入库单明细数据
      list2: [],
      // 入库单明细列表规则
      validRules: {
        step: [
          { required: true, message: '请输入流程步骤', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入流转条件', trigger: 'blue' }
        ],
        handlerName: [
          { required: true, message: '请选择步骤处理人', trigger: 'blue' }
        ]
      },
      // 个人信息规则数据
      personalrules: {
        title: [
          { required: true, message: '请输入入库单主题', trigger: 'blur' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        enterRepositoryId: [
          { required: true, message: '请选择入库仓库', trigger: 'blue' }
        ],
        isHot: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        countryId: [
          { required: true, message: '请选择国家', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    detailcontrol() {
      this.editVisible = this.detailcontrol
    },
    detaildata() {
      console.log('this.detaildata==', this.detaildata)
      this.personalForm = this._.cloneDeep(this.detaildata)
      for (const i in this.personalForm.stockEnterDetailVos) {
        console.log('this.personalForm==22222222222', this.personalForm.stockEnterDetailVos[i].stockEnterDetailVos)
        for (const key in this.personalForm.stockEnterDetailVos[i]) {
          if (key === 'stockEnterDetailVos') {
            delete this.personalForm.stockEnterDetailVos[i][key]
          }
        }
      }
      this.supplierId = this.personalForm.supplierName
      this.stockPersonId = this.personalForm.stockPersonName
      this.deliveryPersonId = this.personalForm.deliveryPersonName
      this.acceptPersonId = this.personalForm.acceptPersonName
      this.enterRepositoryId = this.personalForm.enterRepositoryName
      this.list2 = this.personalForm.stockEnterDetailVos
      console.log('list2', this.list2)
      let num = 0
      let num2 = 0
      let num3 = 0
      let num4 = 0
      let num5 = 0
      for (const i in this.list2) {
        console.log(this.list2[i].basicQuantity)
        num += this.list2[i].basicQuantity
        num2 += this.list2[i].enterMoney
        num3 += this.list2[i].includeTaxMoney
        num4 += this.list2[i].taxMoney
        num5 += this.list2[i].discountMoney
      }
      this.heji1 = num
      this.heji2 = num2
      this.allTaxMoney = num3
      this.allIncludeTaxMoney = num4
      this.allDiscountMoney = num5
      this.allMoneyMoveDiscount = num4 - num5
      this.reviewList = []
      const review = this.personalForm.approvalUseVos
      for (const i in review) {
        if (review[i].actualStepHandler !== null) {
          this.reviewList.push(review[i])
        }
      }
      this.getlocation()
    }
  },

  mounted() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    jundgeprice() {
      const value = ['1-22-24-115']
      const roles = this.$store.getters && this.$store.getters.roles
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      console.log('hasPermission=======', hasPermission)
      return hasPermission
    },
    getlist() {
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    getlocation() {
      // 货位根据仓库id展现
      locationlist(this.personalForm.enterRepositoryId).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list.map(function(item) {
            return {
              'value': item.id,
              'label': item.locationName
            }
          })
        }
      })
    },
    // 采购员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 采购员回显
    stockName(val) {
      this.stockPersonId = val.personName
      this.personalForm.stockPersonId = val.id
    },
    // 供应商输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 供应商列表返回数据
    supplierName(val) {
      console.log(val)
      this.supplierId = val.supplierName
      this.personalForm.supplierId = val.id
    },
    // 详细表事件
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.enterRepositoryId = val.repositoryName
      this.personalForm.enterRepositoryId = val.id
      this.locationlistparms.repositoryId = val.id
      locationlist(this.locationlistparms).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list.map(function(item) {
            return {
              'value': item.id,
              'label': item.locationName
            }
          })
        }
      })
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
      this.personalForm.deliveryPersonId = val.id
    },
    // 验收人focus事件触发
    handlechooseAccept() {
      this.accetpcontrol = true
    },
    acceptName(val) {
      this.acceptPersonId = val.personName
      this.personalForm.acceptPersonId = val.id
    },
    // 新增入库单明细
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      console.log(val)
      console.log(this.$refs.editable.getRecords())
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].productCode === nowlistdata[j].productCode) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('prompt.wpytj'),
              offset: 100
            })
            return false
          }
        }
        this.$refs.editable.insert(val[i])
        this.$nextTick(() => this.$refs.editable.setActiveRow())
      }
    },
    // 入库金额计算
    getSize(quan, pric) {
      return quan * pric
    },
    getSize2(quan, pric) {
      return (quan - pric).toFixed(6)
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      console.log(this.personalForm)
      const rest = this.$refs.editable.getRecords()
      console.log(rest)
      if (rest.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: '采购入库明细表不能为空',
          offset: 100
        })
        return false
      }
      rest.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          delete elem.locationId
        }
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.basicQuantity === null || elem.basicQuantity === '' || elem.basicQuantity === undefined) {
          delete elem.basicQuantity
        }
        if (elem.actualEnterQuantity === null || elem.actualEnterQuantity === '' || elem.actualEnterQuantity === undefined) {
          delete elem.actualEnterQuantity
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        if (elem.enterPrice === null || elem.enterPrice === '' || elem.enterPrice === undefined) {
          delete elem.enterPrice
        }
        if (elem.taxRate === null || elem.taxRate === '' || elem.taxRate === undefined) {
          delete elem.taxRate
        }
        if (elem.enterMoney === null || elem.enterMoney === '' || elem.enterMoney === undefined) {
          delete elem.enterMoney
        }
        if (elem.productType === null || elem.productType === '' || elem.productType === undefined) {
          delete elem.productType
        }
        return elem
      })
      const parms2 = JSON.stringify(rest)
      updatestockenter(this.personalForm, parms2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: this.$t('prompt.czcg'),
            message: this.$t('prompt.czcg'),
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.$emit('rest', true)
          this.$refs.editable.clear()
          this.$refs.personalForm.clearValidate()
          this.$refs.personalForm.resetFields()
          this.editVisible = false
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
        }
      })
    },
    handlecancel() {
      this.editVisible = false
      console.log('关闭的数据====================', this.personalForm)
    },
    cutnull(data) {
      for (const x in data) {
        if (data[x] === null) { // 如果是null 把直接内容转为 ''
          data[x] = ''
        } else {
          if (Array.isArray(data[x])) { // 是数组遍历数组 递归继续处理
            data[x] = data[x].map(z => {
              return this.cutnull(z)
            })
          }
          if (typeof (data[x]) === 'object') { // 是json 递归继续处理
            data[x] = this.cutnull(data[x])
          }
        }
      }
      return data
    },
    async printdata() {
      const arr = this.cutnull(this.list2)
      for (const i in arr) {
        arr[i].step = Number(i) + 1
      }
      const handleperson = this.reviewList.map(item => {
        if (item.actualStepHandler) {
          return item.stepHandlerName
        }
      }).join(',')
      console.log(handleperson)
      // 先根据权限判断
      // 权限没有再判断次数是否可以打印
      const param = {}
      param.receiptId = this.personalForm.id
      param.receiptTypeId = 45
      // 有权限跳过管理
      const value = ['1-386-82']
      const roles = this.$store.getters && this.$store.getters.roles
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      console.log('hasPermission=======', hasPermission)
      if (hasPermission) {
        printJS({
          printable: arr,
          type: 'json',
          properties: [
            { field: 'step', displayName: '行号', columnSize: `100px` },
            { field: 'productCode', displayName: '物料代码', columnSize: `100px` },
            { field: 'productName', displayName: '物料名称', columnSize: `100px` },
            { field: 'productType', displayName: '规格型号', columnSize: `100px` },
            { field: 'unit', displayName: '单位', columnSize: `100px` },
            { field: 'basicQuantity', displayName: '数量', columnSize: `100px` },
            { field: 'orderNumber', displayName: '订单编号', columnSize: `100px` },
            { field: 'sourceNumber', displayName: '源单编号', columnSize: `100px` },
            { field: 'remarks', displayName: '备注', columnSize: `100px` }
          ],
          header: `<div class="pringtitle">
                    <div class="custom-p"> 江苏嗯哇科技有限公司 </div>
                      <br>
                      <div class="ordername">采购入库单</div>
                        <br>
                        <div class="line1"></div>
                        <div class="line2"></div>
                        <div class="supplier">

                        <div class="lineitem">
                        <div class="item">
                        <div class="itemname">供应商：</div>
                        <div class="itemcontent">${this.personalForm.supplierName}</div>
                        </div>
                        <div class="item2">
                        <div class="itemname">日期：</div>
                        <div class="itemcontent">${this.personalForm.enterDate}</div>
                        </div>
                        </div>
                        <div class="lineitem">
                        <div class="item">
                        <div class="itemname">编号：</div>
                        <div class="itemcontent">${this.personalForm.enterNumber}</div>
                        </div>
                        <div class="item2">
                        <div class="itemname2">入库仓库：</div>
                        <div class="itemcontent">${this.personalForm.enterRepositoryName}</div>
                        </div>
                        </div>

                          </div>
                        </div>`,
          bottom: `<div>
                  <div class="allmoney" style="display: flex;justify-content: space-around;width: 100.8%;height: 40px;align-items: center;border:1px solid;border-top: none">
                  <div class="allmoneyname" style="width: 40%">合计</div>
                  <div class="allmoneynum" style="width: 33%;padding-left: 10px;border-left: 1px solid; height: 40px;display: flex;align-items: center;justify-content: flex-start;">${this.heji1}</div>
                  </div>
                  <div class="printbottom" style="display: flex;align-items: center;justify-content: center;width: 100%;margin-top: 20px">
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">审核：</div>
                        <div class="bottomname" >${handleperson}</div>
                    </div>
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">验收人：</div>
                        <div class="bottomname">${this.personalForm.acceptPersonName}</div>
                    </div>
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">制单：</div>
                        <div class="bottomname">${this.personalForm.createPersonName}</div>
                    </div>
                   </div>
                  </div>`,
          bottomStyle: '.printbottom: { display: flex;margin-top: 20px}',
          style: '.custom-p {font-size:20px;text-align: center; }' +
          ' .ordername {text-align: center; font-size:25px;letter-spacing:15px}' +
          '.pringtitle { line-height: 20px; margin-bottom: 10px }' +
          '.line1 { width: 200px; border: 1px solid #000; margin: 0 auto }' +
          '.line2 {width: 200px; border: 2px dashed #000; margin: 3px auto }' +
          '.supplier {display: flex;justify-content: space-between; align-items: center;margin-top: 10px;flex-wrap: wrap;width: 100% }' +
          '.lineitem {display: flex; justify-content: space-between; align-items: center; width: 100% }' +
          '.item { width: 90%; justify-content: center; align-items: center; display: flex}' +
          '.item2 { width: 40%; justify-content: center; align-items: center; display: flex}' +
          '.itemname2 { width: 60% }' +
          '.itemcontent2 {width: 80%}' +
          '.itemname { width: 30% }' +
          '.itemcontent {width: 100%}',
          gridHeaderStyle: 'font-size:12px; padding:3px; border:1px solid; color: #000; text-align:center;',
          gridStyle: 'font-size:12px; padding:3px; border:1px solid; text-align:center; text-overflow:ellipsis; white-space:nowrap;',
          repeatTableHeader: true
        })
      } else {
        const printres = await getPrintCount(param)
        if (printres.data.ret === 200) {
          const res2 = printres.data.data.content
          if (res2 !== null && res2.printCount > 0) {
            this.$message.error('打印次数已经消耗完')
            return false
          }
        }
        this.$confirm('该单据只能打印一次，是否确认打印？（此操作为不可逆操作）', 'Warning', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
          .then(() => {
            param.opreaterId = this.$store.getters.userId
            // 加await
            addPrint(param).then(res => {
              if (res.data.ret === 200) {
                const res = res.data.data.content
                console.log('res', res)
              }
            })
            printJS({
              printable: arr,
              type: 'json',
              properties: [
                { field: 'step', displayName: '行号', columnSize: `100px` },
                { field: 'productCode', displayName: '物料代码', columnSize: `100px` },
                { field: 'productName', displayName: '物料名称', columnSize: `100px` },
                { field: 'productType', displayName: '规格型号', columnSize: `100px` },
                { field: 'unit', displayName: '单位', columnSize: `100px` },
                { field: 'basicQuantity', displayName: '数量', columnSize: `100px` },
                { field: 'remarks', displayName: '备注', columnSize: `100px` }
              ],
              header: `<div class="pringtitle">
                    <div class="custom-p"> 江苏嗯哇科技有限公司 </div>
                      <br>
                      <div class="ordername">采购入库单</div>
                        <br>
                        <div class="line1"></div>
                        <div class="line2"></div>
                        <div class="supplier">
                        <div class="item">
                        <div class="itemname">供应商：</div>
                        <div class="itemcontent">${this.personalForm.supplierName}</div>
                        </div>
                        <div class="item">
                        <div class="itemname">日期：</div>
                        <div class="itemcontent">${this.personalForm.enterDate}</div>
                        </div>
                        <div class="item">
                        <div class="itemname">编号：</div>
                        <div class="itemcontent">${this.personalForm.enterNumber}</div>
                        </div>
                        <div class="item">
                        <div class="itemname">入库仓库：</div>
                        <div class="itemcontent">${this.personalForm.enterRepositoryName}</div>
                        </div>
                          </div>
                        </div>`,
              bottom: `<div>
                  <div class="allmoney" style="display: flex;justify-content: space-around;width: 99%;height: 40px;align-items: center;border:1px solid;border-top: none;padding-right: 1%">
                  </div>
                  <div class="printbottom" style="display: flex;align-items: center;justify-content: center;width: 100%;margin-top: 20px">
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">审核：</div>
                        <div class="bottomname" >${handleperson}</div>
                    </div>
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">部门：</div>
                        <div class="bottomname">${this.personalForm.stockDeptName || ''}</div>
                    </div>
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">业务员：</div>
                        <div class="bottomname">${this.personalForm.stockPersonName}</div>
                    </div>
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">制单：</div>
                        <div class="bottomname">${this.personalForm.createPersonName}</div>
                    </div>
                   </div>
                  </div>`,
              bottomStyle: '.printbottom: { display: flex;margin-top: 20px}',
              style: '.custom-p {font-size:20px;text-align: center; }' +
          ' .ordername {text-align: center; font-size:25px;letter-spacing:15px}' +
          '.pringtitle { line-height: 20px; margin-bottom: 10px }' +
          '.line1 { width: 200px; border: 1px solid #000; margin: 0 auto }' +
          '.line2 {width: 200px; border: 2px dashed #000; margin: 3px auto }' +
          '.supplier {display: flex;justify-content: center; align-items: center;margin-top: 10px}' +
          '.item { width: 50%; justify-content: center; align-items: center; display: flex}' +
          '.item2 { width: 50%; justify-content: center; align-items: center; display: flex}' +
          '.itemname2 { width: 50% }' +
          '.itemcontent2 {width: 80%}' +
          '.itemname { width: 15% }' +
          '.itemcontent {width: 80%}',
              gridHeaderStyle: 'font-size:12px; padding:3px; border:1px solid; color: #000; text-align:center;',
              gridStyle: 'font-size:12px; padding:3px; border:1px solid; text-align:center; text-overflow:ellipsis; white-space:nowrap;',
              repeatTableHeader: true
            })
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                ? '确认取消'
                : '停留在当前页面'
            })
          })
      }
      // 点击取消后执行的操作
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>
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
