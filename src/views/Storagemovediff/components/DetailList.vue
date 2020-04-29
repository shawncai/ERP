<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.id +'    差异报告单详情'" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <button class="print" style="font-size: 13px;background: white;" @click="printdata">{{ $t('updates.print') }}</button>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('updates.dbdbh')" class="print2" style="width: 100%;display: none">
                  {{ personalForm.number }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Storagemovediff.title')" style="width: 100%;">
                  <span>{{ personalForm.title }}</span>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item :label="$t('Storagemovediff.applicationName')" prop="applyPersonId" style="width: 100%;">
                  <span>{{ personalForm.applicationName }}</span>
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item :label="$t('Storagemovediff.moveInRepository')" prop="moveOutRepository" style="width: 100%;">
                  <span>{{ personalForm.inRepositoryName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Storagemovediff.moveOutRepository')" prop="moveOutRepository" style="width: 100%;">
                  <span>{{ personalForm.outRepositoryName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Storagemovediff.requestArrivalDate')" label-width="110px" prop="requestArrivalDate" style="width: 100%;">
                  <span>{{ timestampToTime(personalForm.arrivalDate) }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Storagemovediff.storageMoveDate')" label-width="110px" prop="requestArrivalDate" style="width: 100%;">
                  <span>{{ timestampToTime(personalForm.moveDate) }}</span>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item :label="$t('Storagemovediff.storageMoveDate')" prop="businessStat" style="width: 100%;">
                  <span>{{ personalForm.businessStat }}</span>
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--调拨差异明细-->
      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">差异报告明细</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules"
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%">
            <el-editable-column label="编号" width="55" align="center" type="index"/>
            <!-- <el-editable-column prop="location" align="center" :label="$t('Hmodule.hw')" min-width="150">
              <template slot-scope="scope">
                <p>{{ getLocationData(scope.row) }}</p>
              </template>
            </el-editable-column> -->
            <!-- <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="batch" align="center" :label="$t('Hmodule.pc')" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-select v-if="scope.row.batch !== '不使用'" v-model="scope.row.batch" :value="scope.row.batch" :placeholder="$t('Hmodule.xcpc')" filterable clearable style="width: 100%;" @visible-change="updatebatch2($event,scope)">
                  <el-option
                    v-for="(item, index) in batchlist"
                    :key="index"
                    :value="item"
                    :label="item"/>
                </el-select>
                <span v-else>{{ scope.row.batch }}</span>
              </template>
            </el-editable-column> -->
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
            <!-- <el-editable-column prop="productType" align="center" :label="$t('Hmodule.gg')" width="150px"/> -->
            <!-- <el-editable-column prop="unit" align="center" :label="$t('Hmodule.dw')" width="150px"/> -->
            <el-editable-column :label="$t('updates.fhsl')" prop="sendQuantity" align="center" min-width="150"/>
            <el-editable-column prop="actualQuantity" align="center" label="收货数量" min-width="150"/>
            <el-editable-column :label="$t('updates.cysl')" prop="diffQuantity" align="center" min-width="150"/>
            <el-editable-column :label="$t('updates.cbj')" prop="costPrice" align="center" width="150px"/>
            <el-editable-column prop="diffMoney" align="center" label="差异金额" width="150px"/>
            <el-editable-column prop="result" align="center" label="处理结果" width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!--审核状态-->
      <el-card class="box-card" style="margin-top: 15px">
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
      <!-- <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">配送信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-table
            :data="deliverGoodsdata"
            border
            style="width: 100%">
            <el-table-column
              prop="deliverNumber"
              align="center"
              label="配送单号"
              min-width="150"/>
            <el-table-column
              prop="requireArriveDate"
              align="center"
              label="配送时间"
              min-width="150"/>
            <el-table-column
              prop="deliverPersonName"
              align="center"
              label="配送人"
              min-width="150"/>
            <el-table-column
              prop="arrivalDate"
              align="center"
              :label="$t('updates.clbh')"
              min-width="150"/>
            <el-table-column
              prop="acceptPersonName"
              align="center"
              :label="$t('updates.cangk')"
              min-width="150"/>
            <el-table-column
              prop="stat"
              align="center"
              label="配送单状态"
              min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | statFilter }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card> -->
      <!-- 备注信息 -->
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
                  {{ formatTime(personalForm.createDate,'Y-M-D') }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.judgePersonName')" prop="applyDate" style="width: 100%;">
                  {{ personalForm.judgePersonName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.judgeDate')" prop="applyDate" style="width: 100%;">
                  {{ formatTime(personalForm.judgeDate,'Y-M-D') }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.modifyPersonName')" prop="applyDate" style="width: 100%;">
                  {{ personalForm.modifyPersonName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.modifyDate')" prop="applyDate" style="width: 100%;">
                  {{ formatTime(personalForm.modifyDate,'Y-M-D') }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
    </div>
  </el-dialog>
</template>

<script>
import { getPrintCount, addPrint } from '@/api/public'
import { locationlist } from '@/api/WarehouseAdjust'
import { updateStoragemove } from '@/api/Storagemove'
import { getdeptlist } from '@/api/BasicSettings'
import { deliverGoodsList } from '@/api/DeliverGoods'
import { batchlist } from '@/api/public'
import printJS from 'print-js'
import MyRepository from './MyRepository'
import MyAccept from './MyAccept'
import MyDetail from './MyDetail'
import MyCreate from './MyCreate'
import MyDepot from './MyDepot'
var _that
export default {
  components: { MyRepository, MyCreate, MyAccept, MyDetail, MyDepot },
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
    businessStatFilter(status) {
      const statusMap = {
        1: '调拨申请',
        2: '调拨出库',
        3: '调拨入库',
        4: '调拨完成'
      }
      return statusMap[status]
    },
    statFilter(status) {
      const statusMap = {
        1: '未出库',
        2: '已出库'
      }
      return statusMap[status]
    },
    inFilter(status) {
      const statusMap = {
        1: '未入库',
        2: '已入库'
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
      // 配送信息数据
      deliverGoodsdata: [],
      deliverGoodsListdata: {
        pageNum: 1,
        pageSize: 9999,
        repositoryId: 0,
        sourceNumber: this.detaildata.moveNumber
      },
      // 申请人回显
      applyPersonId: '',
      // 审核步骤数据
      reviewList: [],
      // 批次列表
      batchlist: [],
      // 弹窗组件的控制
      editVisible: this.detailcontrol,
      // 修改row数据
      personalForm: this.detaildata,
      // 部门数据
      depts: [],
      // 调出仓库回显
      moveOutRepository: '',
      // 调入仓库回显
      moveInRepository: '',
      // 控制调出仓库选择窗口
      repositorycontrol: false,
      // 控制调入仓库选择窗口
      depotcontrol: false,
      // 控制商品列表窗口
      control: false,
      // 调拨单规则数据
      personalrules: {
        requestDeptId: [
          { required: true, message: '请选择要货部门', trigger: 'change' }
        ],
        moveInRepository: [
          { required: true, message: '请选择调入仓库', trigger: 'focus' }
        ],
        requestArrivalDate: [
          { required: true, message: '请选择要求到货日期', trigger: 'change' }
        ],
        departmentId: [
          { required: true, message: '请选择调货部门', trigger: 'change' }
        ],
        moveOutRepository: [
          { required: true, message: '请选择调出仓库', trigger: 'focus' }
        ],
        businessStat: [
          { required: true, message: '请选择业务状态', trigger: 'change' }
        ]
      },
      // 调拨申请细数据
      list2: [],
      // 调出明细数据
      list3: [],
      // 调入明细
      list4: [],
      // 调拨明细中货位发送参数
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 调拨明细中货位数据
      locationlist: [],
      // 调拨单明细列表规则
      validRules: {}
    }
  },
  watch: {
    detailcontrol() {
      this.editVisible = this.detailcontrol
    },
    detaildata() {
      this.personalForm = this.detaildata
      this.moveOutRepository = this.personalForm.moveOutRepositoryName
      this.moveInRepository = this.personalForm.moveInRepositoryName
      this.applyPersonId = this.personalForm.applicationName
      this.list2 = this.personalForm.moveDiffReportDetails
      this.reviewList = []
      const review = this.personalForm.approvalUseVos
      for (const i in review) {
        if (review[i].actualStepHandler !== null) {
          this.reviewList.push(review[i])
        }
      }
      // this.getlocation()
      // this.deliverGoodsListdata.sourceNumber = this.personalForm.moveNumber
      // this.getdeliverGoodsList()
    }
  },

  mounted() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 处理时间
    timestampToTime(timestamp) {
      var date = new Date(timestamp)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      // var h = date.getHours() + ':'
      // var m = date.getMinutes() + ':'
      // var s = date.getSeconds()
      return Y + M + D
    },
    // 格式化日期，如月、日、时、分、秒保证为2位数
    formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    },
    // 参数number为毫秒时间戳，format为需要转换成的日期格式
    formatTime(number, format) {
      if (!number) {
        return null
      }
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
    getdeliverGoodsList() {
      deliverGoodsList(this.deliverGoodsListdata).then(res => {
        if (res.data.ret === 200) {
          this.deliverGoodsdata = res.data.data.content.list
        }
      })
    },
    // 部门列表数据
    getlist() {
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    getlocation() {
      // 货位根据仓库id展现
      locationlist(this.personalForm.moveOutRepository).then(res => {
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
    // 调入仓库focus事件触发
    handlechooseDep() {
      this.depotcontrol = true
    },
    depotname(val) {
      this.moveInRepository = val.repositoryName
      this.personalForm.moveInRepository = val.id
    },
    // 调出仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.moveOutRepository = val.repositoryName
      this.personalForm.moveOutRepository = val.id
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
    updatebatch(event, scope) {
      if (event === true) {
        const parms2 = scope.row.locationId
        const parms3 = scope.row.productCode
        batchlist(this.personalForm.moveOutRepository, parms2, parms3).then(res => {
          this.batchlist = res.data.data.content
        })
      }
    },
    // 调拨单事件
    // 新增调拨单明细
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      console.log(val)
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
      }
    },
    // 调拨金额计算
    getSize(quan, pric) {
      return quan * pric
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
      if (rest.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
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
        if (elem.price === null || elem.price === '' || elem.price === undefined) {
          delete elem.price
        }
        if (elem.movePrice === null || elem.movePrice === '' || elem.movePrice === undefined) {
          delete elem.movePrice
        }
        if (elem.moveQuantity === null || elem.moveQuantity === '' || elem.moveQuantity === undefined) {
          delete elem.moveQuantity
        }
        if (elem.totalMoney === null || elem.totalMoney === '' || elem.totalMoney === undefined) {
          delete elem.totalMoney
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        return elem
      })
      const parm = JSON.stringify(this.personalForm)
      const parms2 = JSON.stringify(rest)
      updateStoragemove(parm, parms2).then(res => {
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
    },
    // 修改操作结束 -------------------------------------------------
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
      const handleperson = this.reviewList[this.reviewList.length - 1].stepHandlerName
      console.log(handleperson)
      // 先根据权限判断
      // 权限没有再判断次数是否可以打印
      const param = {}
      param.receiptId = this.personalForm.id
      param.receiptTypeId = 18
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
            { field: 'step', displayName: '编号', columnSize: `100px` },
            // { field: 'productCode', displayName: '物料代码', columnSize: `100px` },
            { field: 'productName', displayName: '物料名称', columnSize: `100px` },
            { field: 'color', displayName: '颜色', columnSize: `100px` },
            { field: 'costPrice', displayName: '出厂价', columnSize: `100px` },
            { field: 'sendQuantity', displayName: '发货数量', columnSize: `100px` },
            { field: 'actualQuantity', displayName: '实收数量', columnSize: `100px` },
            { field: 'diffQuantity', displayName: '差异数量', columnSize: `100px` },
            { field: 'diffMoney', displayName: '差异金额', columnSize: `100px` },
            { field: 'result', displayName: '处理结果', columnSize: `100px` }
          ],
          header: `<div class="pringtitle">
                    <div class="custom-p"> 江苏新世窗国际贸易有限公司 </div>
                      <br>
                      <div class="ordername">调拨差异报告单</div>
                        <br>
                        <div class="line1"></div>
                        <div class="line2"></div>
                        <div class="supplier">
                        <div class="item">
                        <div class="itemname">调出仓库：</div>
                        <div class="itemcontent">${this.personalForm.outRepositoryName}</div>
                        </div>
                        <div class="item">
                         <div class="itemname">调入仓库：</div>
                        <div class="itemcontent">${this.personalForm.inRepositoryName}</div>
                          </div>
                        <div class="item">
                         <div class="itemname">调拨单号：</div>
                        <div class="itemcontent">${this.personalForm.moveNumber}</div>
                          </div>
                          </div>
                          <div class="supplier">
                        <div class="item">
                        <div class="itemname">调拨日期：</div>
                        <div class="itemcontent">${this.timestampToTime(this.personalForm.moveDate)}</div>
                        </div>
                        <div class="item">
                         <div class="itemname">到货日期：</div>
                        <div class="itemcontent">${this.timestampToTime(this.personalForm.arrivalDate)}</div>
                          </div>
                        <div class="item">
                         <div class="itemname">报告单号：</div>
                        <div class="itemcontent">${this.personalForm.number}</div>
                          </div>
                          </div>
                        </div>`,
          bottom: `<div>
                  <div class="allmoney" style="display: flex;justify-content: space-around;width: 99%;height: 40px;align-items: center;border:1px solid;border-top: none;padding-right: 1%">
                  <div class="allmoneyname" style="margin-right: 10%">合计</div>
                  <div class="allmoneynum" style="width: 10%;border-left: 1px solid; border-right: 1px solid;height: 40px;display: flex;align-items: center;justify-content: center;"></div>
                  </div>
                  <div class="printbottom" style="display: flex;align-items: center;justify-content: center;width: 100%;margin-top: 20px">
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">审核：</div>
                        <div class="bottomname" >${handleperson}</div>
                    </div>
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">部门：</div>
                        <div class="bottomname">${this.personalForm.deptName}</div>
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
          '.item { width: 33%; justify-content: center; align-items: center; display: flex;font-size:12px}' +
          '.item2 { width: 50%; justify-content: center; align-items: center; display: flex}' +
          '.itemname2 { width: 20% }' +
          '.itemcontent2 {width: 80%}' +
          '.itemname { width: 40% }' +
          '.itemcontent {width: 80%}',
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
                { field: 'step', displayName: '编号', columnSize: `100px` },
                // { field: 'productCode', displayName: '物料代码', columnSize: `100px` },
                { field: 'productName', displayName: '物料名称', columnSize: `100px` },
                { field: 'color', displayName: '颜色', columnSize: `100px` },
                { field: 'costPrice', displayName: '出厂价', columnSize: `100px` },
                { field: 'sendQuantity', displayName: '发货数量', columnSize: `100px` },
                { field: 'actualQuantity', displayName: '实收数量', columnSize: `100px` },
                { field: 'diffQuantity', displayName: '差异数量', columnSize: `100px` },
                { field: 'diffMoney', displayName: '差异金额', columnSize: `100px` },
                { field: 'result', displayName: '处理结果', columnSize: `100px` }
              ],
              header: `<div class="pringtitle">
                    <div class="custom-p"> 江苏新世窗国际贸易有限公司 </div>
                      <br>
                      <div class="ordername">调拨差异报告单</div>
                        <br>
                        <div class="line1"></div>
                        <div class="line2"></div>
                        <div class="supplier">
                        <div class="item">
                        <div class="itemname">调出仓库：</div>
                        <div class="itemcontent">${this.personalForm.outRepositoryName}</div>
                        </div>
                        <div class="item">
                         <div class="itemname">调入仓库：</div>
                        <div class="itemcontent">${this.personalForm.inRepositoryName}</div>
                          </div>
                        <div class="item">
                         <div class="itemname">调拨单号：</div>
                        <div class="itemcontent">${this.personalForm.moveNumber}</div>
                          </div>
                          </div>
                          <div class="supplier">
                        <div class="item">
                        <div class="itemname">调拨日期：</div>
                        <div class="itemcontent">${this.timestampToTime(this.personalForm.moveDate)}</div>
                        </div>
                        <div class="item">
                         <div class="itemname">到货日期：</div>
                        <div class="itemcontent">${this.timestampToTime(this.personalForm.arrivalDate)}</div>
                          </div>
                        <div class="item">
                         <div class="itemname">报告单号：</div>
                        <div class="itemcontent">${this.personalForm.number}</div>
                          </div>
                          </div>
                        </div>`,
              bottom: `<div>
                  <div class="allmoney" style="display: flex;justify-content: space-around;width: 99%;height: 40px;align-items: center;border:1px solid;border-top: none;padding-right: 1%">
                  <div class="allmoneyname" style="margin-right: 10%">合计</div>
                  <div class="allmoneynum" style="width: 10%;border-left: 1px solid; border-right: 1px solid;height: 40px;display: flex;align-items: center;justify-content: center;"></div>
                  </div>
                  <div class="printbottom" style="display: flex;align-items: center;justify-content: center;width: 100%;margin-top: 20px">
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">审核：</div>
                        <div class="bottomname" >${handleperson}</div>
                    </div>
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">部门：</div>
                        <div class="bottomname">${this.personalForm.deptName}</div>
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
          '.item { width: 33%; justify-content: center; align-items: center; display: flex;font-size:12px}' +
          '.item2 { width: 50%; justify-content: center; align-items: center; display: flex}' +
          '.itemname2 { width: 20% }' +
          '.itemcontent2 {width: 80%}' +
          '.itemname { width: 40% }' +
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
