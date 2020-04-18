<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">
        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form
            ref="personalForm"
            :model="personalForm"
            :rules="personalrules"
            :inline="true"
            size="mini"
            status-icon
            class="demo-ruleForm"
            label-position="left"
            label-width="130px">
            >
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('payment.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input
                    v-model="personalForm.title"
                    style="width: 200px"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('payment.sourceType')" prop="sourceType" style="margin-left: 18px;width: 100%;margin-bottom: 0">-->
              <!--                  <el-select v-model="personalForm.sourceType" style="width: 200px">-->
              <!--                    <el-option value="1" label="采购订单" />-->
              <!--                    <el-option value="2" label="无来源" />-->
              <!--                  </el-select>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <el-col :span="6">
                <el-form-item
                  :label="$t('payment.supplierId')"
                  prop="supplierId"
                  style="margin-left: 18px;width: 100%;margin-bottom: 0"
                >
                  <el-input
                    v-model="supplierId"
                    style="width: 200px"
                    clearable
                    @focus="handlechoose"
                  />
                  <my-supplier :control.sync="empcontrol" @supplierName="supplierName" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  :label="$t('payment.handlePersonId')"
                  prop="handlePersonId"
                  style="margin-left: 18px;width: 100%;margin-bottom: 0"
                >
                  <el-input
                    v-model="handlePersonId"
                    style="width: 200px"
                    clearable
                    @focus="handlechooseStock"
                  />
                  <my-emp :control.sync="stockControl" @stockName="stockName" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('payment.payMode')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select
                    v-model="personalForm.payMode"
                    clearable
                    style="width: 200px"
                  >
                    <el-option
                      v-for="(item, index) in payModes"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('payment.applyDate')" prop="applyDate" style="margin-left: 18px;width: 100%;margin-bottom: 0">-->
              <!--                  <el-date-picker-->
              <!--                    v-model="personalForm.applyDate"-->
              <!--                    type="date"-->
              <!--                    value-format="yyyy-MM-dd"-->
              <!--                    style="width: 200px"/>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <el-col :span="6">
                <el-form-item :label="$t('payment.currency')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select
                    v-model="personalForm.currency"
                    clearable
                    style="width: 200px"
                  >
                    <el-option value="1" label="RMB" />
                    <el-option value="2" label="USD" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('payment.payAccount')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input
                    v-model="personalForm.payAccount"
                    style="width: 200px"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('payment.payAccountNumber')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input
                    v-model="personalForm.payAccountNumber"
                    style="width: 200px"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('payment.remarks')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input
                    v-model="personalForm.remarks"
                    style="width: 200px"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('payment.rate')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input
                    v-model="personalForm.rate"
                    style="width: 200px"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('payment.payDate')" prop="payDate" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.payDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 200px"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('payment.offsetAdvance')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input
                    v-model="personalForm.offsetAdvance"
                    style="width: 200px"
                    disabled
                  />
                </el-form-item>
                <span style="color: red;margin-left: 52px;font-size: 14px">预付款金额：{{ yufu }}</span>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('payment.moneyThis')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input
                    v-model="personalForm.moneyThis"
                    style="width: 200px"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('payment.picids')" style="width: 100%;margin-top: 1%">
                  <el-button
                    style="margin-bottom: 10px"
                    size="small"
                    type="success"
                    @click="submitUpload"
                  >{{ $t('public.uploadimage') }}</el-button>
                  <el-upload
                    ref="upload"
                    :on-preview="handlepicPreview"
                    :on-remove="handlepicRemove"
                    :on-success="handlepicsuccess"
                    :data="picidsData"
                    :auto-upload="false"
                    :action="path"
                    list-type="picture-card"
                  >
                    <i class="el-icon-plus" />
                  </el-upload>
                  <el-dialog :visible.sync="picidsVisible">
                    <img :src="picidsImageUrl" width="100%" alt >
                  </el-dialog>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--      <el-card class="box-card" shadow="never" style="margin-top: 10px">-->
      <!--        <h2 class="form-name">附件信息</h2>-->
      <!--        <div class="container">-->
      <!--          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">-->
      <!--            <el-form-item :label="$t('payment.picids')" style="width: 100%;margin-top: 1%">-->
      <!--              <el-button style="margin-bottom: 10px" size="small" type="success" @click="submitUpload">{{ $t('public.uploadimage') }}</el-button>-->
      <!--              <el-upload-->
      <!--                ref="upload"-->
      <!--                :on-preview="handlepicPreview"-->
      <!--                :on-remove="handlepicRemove"-->
      <!--                :on-success="handlepicsuccess"-->
      <!--                :data="picidsData"-->
      <!--                :auto-upload="false"-->
      <!--                action="http://192.168.1.45:8080/upload/uploadpic"-->
      <!--                list-type="picture-card">-->
      <!--                <i class="el-icon-plus"/>-->
      <!--              </el-upload>-->
      <!--              <el-dialog :visible.sync="picidsVisible">-->
      <!--                <img :src="picidsImageUrl" width="100%" alt="">-->
      <!--              </el-dialog>-->
      <!--            </el-form-item >-->
      <!--          </el-form>-->
      <!--        </div>-->
      <!--      </el-card>-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">
        <div ref="fuzhu" class="form-name">{{ $t('updates.fkmx') }}</div>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        </div>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true }"
            :edit-rules="validRules"
            :summary-method="getSummaries"
            class="click-table1"
            show-summary
            stripe
            border
            size="small"
            style="width: 100%"
          >
            <el-editable-column type="selection" min-width="55" align="center" />
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index" />
            <!--            <el-editable-column :edit-render="{name: 'ElDatePicker', attrs: {type: 'date', format: 'yyyy-MM-dd'}, type: 'visible'}" prop="payDate" align="center" label="付款日期" min-width="150px"/>-->
            <el-editable-column :label="$t('updates.yfje')" prop="shouldMoney" align="center" min-width="150px" />
            <el-editable-column :label="$t('updates.yfjei')" prop="paidMoney" align="center" min-width="150px" />
            <el-editable-column :label="$t('updates.wfje')" prop="payingMoney" align="center" min-width="150px" />
            <el-editable-column :label="$t('updates.hph')" prop="invoiceNumber" align="center" min-width="150px" />
            <el-editable-column :label="$t('updates.fplx')" prop="invoiceType" align="center" min-width="150px">
              <template slot-scope="scope">
                <span>{{ scope.row.invoiceType | invoiceTypeFilter }}</span>
              </template>
            </el-editable-column>
            <el-editable-column
              :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}"
              :label="$t('updates.bczfje')"
              prop="payThis"
              align="center"
              min-width="170px"
            >
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  v-model="scope.row.payThis"
                  @change="handlepaythis(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column
              :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}"
              :label="$t('updates.dkyfk')"
              prop="advanceMoney"
              align="center"
              min-width="170px"
            >  <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="2"
                v-model="scope.row.advanceMoney"
                @change="handlechange(scope.row)"/>
            </template>
            </el-editable-column>
          </el-editable>
        </div>
      </el-card>
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">
        <el-button
          v-no-more-click
          type="primary"
          style="background:#3696fd;border-color:#3696fd;width: 98px"
          @click="handlesave()"
        >{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { addpayment } from '@/api/payment'
import { shouldPayList } from '@/api/public'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchCategory } from '@/api/Supplier'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MySupplier from './components/MySupplier'
import MyApply from './components/MyApply'
import MyPlan from './components/MyPlan'
import MyDelivery from './components/MyDelivery'
import MyLnquiry from './components/MyLnquiry'
import MyOrder from './components/MyOrder'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  name: 'AddPayment',
  components: {
    MyOrder,
    MyLnquiry,
    MyDelivery,
    MyPlan,
    MyApply,
    MySupplier,
    MyDetail,
    MyEmp
  },
  filters: {
    invoiceTypeFilter(status) {
      const statusMap = {
        1: '采购发票',
        2: '费用发票'
      }
      return statusMap[status]
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(value)
      if (
        this.personalForm.supplierId === undefined ||
        this.personalForm.supplierId === null ||
        this.personalForm.supplierId === ''
      ) {
        callback(new Error('请选择'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(value)
      if (
        this.personalForm.handlePersonId === undefined ||
        this.personalForm.handlePersonId === null ||
        this.personalForm.handlePersonId === ''
      ) {
        callback(new Error('请选择'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(value)
      if (this.personalForm.offsetAdvance > this.yufu) {
        callback(new Error('抵扣预付款金额不能大于预付款金额'))
      } else {
        callback()
      }
    }
    const validatePass5 = (rule, value, callback) => {
      console.log('value', value)
      if (value === 0) {
        // this.$notify.error({
        //   title: 'wrong',
        //   message: '本次支付金额未填写',
        //   offset: 100
        // })
      } else {
        callback()
      }
    }
    return {
      path: '',

      pickerOptions1: {
        disabledDate: time => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      // 商品图片数据+++++++++++++++++++++++++开始
      // 商品图片控制器
      picidsVisible: false,
      // 商品图片地址
      picidsImageUrl: '',
      // 发送后端type
      picidsData: {
        type: 8
      },
      // 商品图片数据+++++++++++++++++++++++++结束
      invoiceTypes: [
        { value: 1, label: '采购发票' },
        { value: 2, label: '费用发票' }
      ],
      // 预付款金额
      yufu: '0.00',
      // 合计数据
      allNumber: '',
      allMoney: '',
      allTaxMoney: '',
      allIncludeTaxMoney: '',
      allDiscountMoney: '',
      allMoneyMoveDiscount: '',
      allOthermoney: '',
      // 交货方式
      giveIds: [],
      // 运送方式
      transportIds: [],
      // 结算方式
      paymentIds: [],
      // 点收人回显
      acceptPersonId: '',
      // 控制点收人
      deliverycontrol: false,
      // 控制源单为采购到货单
      ordercontrol: false,
      // 控制添加商品按钮
      addpro: true,
      // 控制从源单中选择按钮
      addsouce: true,
      // 供应商回显
      supplierId: '',
      // 控制供应商
      empcontrol: false,
      // 选择的数据
      choosedata: [],
      payModes: [],
      // 部门数据
      depts: [],
      // 执行人回显
      handlePersonId: '',
      // 控制执行人
      stockControl: false,
      // 类别数据
      types: [],
      // 类别获取参数
      typeparms: {
        pagenum: 1,
        pagesize: 99999
      },
      // 控制商品列表窗口
      control: false,
      // 采购申请单信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        isVat: 1,
        offsetAdvance: 0,
        moneyThis: 0,
        payDate: null,
        picids: []
      },
      // 采购申请单规则数据
      personalrules: {
        supplierId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        applyDate: [
          { required: true, message: '请选择申请日期', trigger: 'change' }
        ],
        moneyThis: [
          { required: true, message: '请输入本次付款金额', trigger: 'blur' }
        ],
        handlePersonId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        payDate: [
          { required: true, message: '请选择付款日期', trigger: 'change' }
        ]
      },
      // 采购申请单明细数据
      list2: [],
      // 采购申请单明细列表规则
      validRules: {
        payThis: [
          { required: true, validator: validatePass5, trigger: 'blur' }
        ],
        advanceMoney: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getTypes()
    this.getways()
    // this.getdatatime()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    handlepaythis(row) {
      console.log(row)
      const judgemoney = Number(row.payThis) + Number(row.advanceMoney)
      console.log(judgemoney)
      if (judgemoney > row.shouldMoney) {
        console.log(123)
        this.$notify.error({
          title: 'wrong',
          message: '本次支付金额超过最大范围',
          offset: 100
        })
        row.payThis = 0
      }
    },
    getdatatime() {
      // 默认显示今天
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
      this.personalForm.payDate = currentdate
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handlepicRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlepicPreview(file) {
      this.picidsImageUrl = file.url
      this.picidsVisible = true
    },
    handlepicsuccess(response) {
      this.personalForm.picids.push(response.data.content.picId)
      console.log(response.data.content.picId)
    },
    activeMethod({ row, rowIndex }) {
      if (row.invoiceNumber === '' || row.invoiceNumber === null) {
        return true
      }
      return false
    },
    // 总计
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev.toFixed(2)
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      sums[2] = ''
      sums[3] = ''
      sums[4] = ''
      sums[5] = ''
      sums[6] = ''
      sums[10] = ''
      sums[15] = ''
      sums[18] = ''
      console.log()
      this.personalForm.offsetAdvance = sums[8]
      this.personalForm.moneyThis = sums[7]
      return sums
    },
    getways() {
      if (this.$store.getters.useCountry === 1) {
        this.path = 'http://192.168.1.45:8080/erp/upload/uploadpic'
      }
      if (this.$store.getters.useCountry === 2) {
        this.path = 'http://192.168.1.45:8080/philippines/upload/uploadpic'
      }
      // 交货方式
      searchCategory(2).then(res => {
        if (res.data.ret === 200) {
          this.giveIds = res.data.data.content.list
        }
      })
      // 运送方式
      searchCategory(3).then(res => {
        if (res.data.ret === 200) {
          this.transportIds = res.data.data.content.list
        }
      })
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.payModes = res.data.data.content.list
        }
      })
      // 结算方式
      searchCategory(5).then(res => {
        if (res.data.ret === 200) {
          this.paymentIds = res.data.data.content.list
        }
      })
    },
    // 选择源单类型事件
    chooseType() {
      console.log(this.personalForm.sourceType)
      if (this.personalForm.sourceType === '1') {
        this.addsouce = false
        this.addpro = true
        this.$refs.editable.clear()
      } else if (this.personalForm.sourceType === '2') {
        this.addpro = false
        this.addsouce = true
        this.$refs.editable.clear()
      }
    },
    // 从源单中添加商品
    handleAddSouce() {
      this.ordercontrol = true
    },
    order(val) {
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    allOrderinfo(val) {
      this.personalForm.supplierId = val.supplierId
      this.supplierId = val.supplierName
    },
    // 更新类型
    updatecountry() {
      this.getTypes()
    },
    getTypes() {
      // 采购类别数据
      searchStockCategory(this.typeparms).then(res => {
        if (res.data.ret === 200) {
          this.types = res.data.data.content.list
        }
      })
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    handlechange(row) {
      row.payThis = row.shouldMoney - row.advanceMoney
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
      this.personalForm.currencyId = val.moneyId
      this.personalForm.payAccount = val.account
      this.personalForm.payAccountNumber = val.accountName
      this.yufu = val.advanceMoney
      shouldPayList(val.id).then(res => {
        if (res.data.ret === 200) {
          this.$refs.editable.clear()
          console.log('res', res.data.data.content)
          const detailList = res.data.data.content.list
          for (let i = 0; i < detailList.length; i++) {
            detailList[i].shouldPayId = detailList[i].id
            detailList[i].payThis = detailList[i].shouldMoney
            this.$refs.editable.insert(detailList[i])
          }
        }
      })
    },
    // 执行人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 执行人回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    // 点收人人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.acceptPersonId = val.personName
      this.personalForm.acceptPersonId = val.id
    },
    // 采购申请明细来源
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        console.log(val[i].price)
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
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        isVat: 1
      }
      this.getdatatime()
      this.supplierId = null
      this.handlePersonId = null
      this.stockPersonId = null
      this.ourContractorId = null
      this.acceptPersonId = null
    },
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (
          elem.shouldPayId === null ||
          elem.shouldPayId === '' ||
          elem.shouldPayId === undefined
        ) {
          delete elem.shouldPayId
        }
        if (
          elem.payDate === null ||
          elem.payDate === '' ||
          elem.payDate === undefined
        ) {
          delete elem.payDate
        }
        if (
          elem.shouldMoney === null ||
          elem.shouldMoney === '' ||
          elem.shouldMoney === undefined
        ) {
          delete elem.shouldMoney
        }
        if (
          elem.paidMoney === null ||
          elem.paidMoney === '' ||
          elem.paidMoney === undefined
        ) {
          delete elem.paidMoney
        }
        if (
          elem.payingMoney === null ||
          elem.payingMoney === '' ||
          elem.payingMoney === undefined
        ) {
          delete elem.payingMoney
        }
        if (
          elem.invoiceNumber === null ||
          elem.invoiceNumber === '' ||
          elem.invoiceNumber === undefined
        ) {
          delete elem.invoiceNumber
        }
        if (
          elem.invoiceType === null ||
          elem.invoiceType === '' ||
          elem.invoiceType === undefined
        ) {
          delete elem.invoiceType
        }
        if (
          elem.payThis === null ||
          elem.payThis === '' ||
          elem.payThis === undefined
        ) {
          delete elem.payThis
        }
        if (
          elem.advanceMoney === null ||
          elem.advanceMoney === '' ||
          elem.advanceMoney === undefined
        ) {
          delete elem.advanceMoney
        }
        if (
          elem.supplierId === null ||
          elem.supplierId === '' ||
          elem.supplierId === undefined
        ) {
          delete elem.supplierId
        }
        if (
          elem.paymentId === null ||
          elem.paymentId === '' ||
          elem.paymentId === undefined
        ) {
          delete elem.paymentId
        }
        return elem
      })
      const parms2 = JSON.stringify(EnterDetail)
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate(valid => {
        if (valid) {
          this.$refs.editable
            .validate()
            .then(valid => {
              if (valid) {
                console.log('zhixing')
                addpayment(parms, parms2, this.personalForm).then(res => {
                  console.log(res)
                  if (res.data.ret === 200) {
                    this.$notify({
                      title: 'successful',
                      message: 'save successful',
                      type: 'success',
                      offset: 100
                    })
                    this.restAllForm()
                    this.$refs.editable.clear()
                    this.$refs.personalForm.clearValidate()
                    this.$refs.personalForm.resetFields()
                    this.$refs.upload.clearFiles()
                  } else {
                    this.$notify.error({
                      title: 'wrong',
                      message: res.data.msg,
                      offset: 100
                    })
                  }
                })
              } else {
                this.$notify.error({
                  title: 'wrong',
                  message: 'Information is incomplete',
                  offset: 100
                })
                return false
              }
            })
            .catch(valid => {
              console.log('error submit!!')
            })
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'Information is incomplete',
            offset: 100
          })
          return false
        }
      })
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = {
        path: '/payment/Addpayment',
        name: 'Addpayment',
        fullPath: '/payment/Addpayment',
        title: 'Addpayment'
      }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 .ERP-container{
    margin-right: 0;
    .form-name{
      font-weight: bold;
      font-size: 18px;
      color: #373e4f;
      padding: 5px;
      margin-bottom: -20px;
    }
    .container{
      margin-top: 5px;
    }
    .el-button+.el-button{
      width: 98px;
    }
  }
</style>
