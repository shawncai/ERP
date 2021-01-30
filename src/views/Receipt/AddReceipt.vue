<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">

        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.customerType')" prop="customerType" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.customerType" style="width: 200px" @change="clearCustomer">
                    <el-option :label="$t('updates.jxs')" value="1"/>
                    <el-option :label="$t('updates.kh')" value="2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.customerId')" prop="customerId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerId" style="width: 200px" @focus="chooseCustomer"/>
                </el-form-item>
                <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
                <!-- <my-installment :installmentcontrol.sync="installmentcontrol" @InstallmentDetail="InstallmentDetail" @Installment="Installment"/> -->
                <my-customer :customercontrol.sync="installmentcontrol" @InstallmentDetail="InstallmentDetail2" @Installment="Installment"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.moneyType')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.moneyType" style="width: 200px">
                    <el-option value="1" label="PHP"/>
                    <el-option value="2" label="USD"/>
                    <el-option value="3" label="RMB"/>
                    <el-option value="4" label="LKR"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.receiptMoney')" prop="receiptMoney" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.receiptMoney" style="width: 200px" clearable @change="changereceiptmoney"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('payment.payMode')" prop="payMode" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.payMode" style="width: 200px">
                    <el-option
                      v-for="(item, index) in payModes"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.receiptAccount')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.receiptAccount" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.receiptAccountNumber')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.receiptAccountNumber" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col v-for="(item, index) in personalForm.couponSupports" :key="index" :span="6">
                <el-form-item :label="$t('SaleOut.couponSupport') + (index + 1)" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="item.couponSupport" style="width: 200px" @blur="changeCoupon"/>
                  <el-button v-show="index === personalForm.couponSupports.length -1" icon="el-icon-plus" type="success" @click="addDomain" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('collectAndPay.couponSupport2')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.couponSupport" disabled style="width: 200px" type="number" @change="changemoney"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('collectAndPay.couponSupportOld')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input-number v-model="personalForm.couponSupportOld" :controls="false" :step="0.1" :min="0" style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.receiptPersonId')" prop="receiptPersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="receiptPersonId" style="width: 200px" @focus="handlechooseStock"/>
                </el-form-item>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.receiptRepositoryId')" prop="receiptRepositoryId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="receiptRepositoryId" style="width: 200px" @focus="handlechooserepo"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.receiptDate')" prop="receiptDate" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.receiptDate"
                    :picker-options="pickerOptions2"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.totalLackMoney')" prop="totalLackMoney" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.totalLackMoney" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.remark')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.remark" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.penaltyMoney')" prop="penaltyMoney" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.penaltyMoney" type="number" disabled style="width: 200px" clearable @change="changepenaltymoney"/>
                  <!-- <el-input-number v-model="personalForm.penaltyMoney" :controls="false" /> -->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockInvoice.invoiceNumber')" prop="invoiceNumber" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.invoiceNumber" style="width: 200px" clearable/>
                  <!-- <el-input-number v-model="personalForm.penaltyMoney" :controls="false" /> -->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Receipt.deductionMoney')" prop="deductionMoney" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.deductionMoney" style="width: 200px" disabled @change="junglemoney"/>
                </el-form-item>
                <span style="color: red;margin-left: 52px;font-size: 14px">advance payment：{{ yufu }}</span>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card v-if="personalForm.customerType === '2'" :body-style=" { padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 30px">

        <div ref="fuzhu" class="form-name" >collection list </div>
        <el-button type="danger" style="margin-top:25px" @click="$refs.editable2.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        <div class="container" >
          <el-editable
            ref="editable2"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            :summary-method="getSummaries"
            class="click-table1"
            show-summary
            stripe
            border
            size="small"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('update4.term')" prop="presentCount" align="center" min-width="150px"/>
            <el-editable-column :label="$t('update4.monthlypayment')" prop="returnMoney" align="center" min-width="150px"/>
            <el-editable-column :label="$t('update4.originalamout')" prop="returnSource" align="center" min-width="150px"/>
            <el-editable-column :label="$t('update4.rebate')" prop="reward" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('update4.penalty')" prop="penalty" align="center" min-width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="6"
                  :controls="false"
                  :min="0.00"
                  v-model="scope.row.penalty"
                  @change="changePenalty(scope.row)"
                />
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('update4.interest')" prop="returnInterest" align="center" min-width="150px"/>
            <el-editable-column :label="$t('update4.aleadypaid')" prop="paidmoney" align="center" min-width="150px"/>
            <el-editable-column :label="$t('update4.unpaid')" prop="unpay" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible', events: {change: 'getThisMoney'}}" :label="$t('update4.paid')" prop="thisMoney" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card v-if="personalForm.customerType === '1'" :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">

        <div ref="fuzhu" class="form-name" >收款明细</div>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            :summary-method="getSummaries2"
            class="click-table1"
            show-summary
            stripe
            border
            size="small"
            style="width: 100%"
            @selection-change="handleSelectionChange2">
            <el-editable-column prop="sourceNumber" label="编号" min-width="200" align="center" />
            <el-editable-column prop="shouldMoney" align="center" label="应收款金额" min-width="150px"/>
            <el-editable-column :label="$t('updates.cke')" prop="discountMoney" align="center" min-width="150px"/>
            <el-editable-column prop="retreatMoney" align="center" label="退货抵扣" min-width="150px"/>
            <el-editable-column prop="collectedMoney" align="center" label="已收金额" min-width="150px"/>
            <el-editable-column prop="uncollectedMoney" align="center" label="未收款金额" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="thisMoney" align="center" label="本次收款" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="deductionMoney" align="center" label="本次抵扣预收款" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">

        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { returnMoney } from '@/api/Coupon'
import { createreceipt } from '@/api/Receipt'
import { agentCollectList } from '@/api/public'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MyMater from './components/MyMater'
import MyInstallment from './components/MyInstallment'
import MyAgent from '../SaleOpportunity/components/MyAgent'
import MyCustomer from './components/MyCustomer'
import { searchCategory } from '@/api/Supplier'
import MyRepository from './components/MyRepository'
var _that
export default {
  name: 'AddReceipt',
  components: { MyAgent, MyInstallment, MyMater, MyDetail, MyEmp, MyCustomer, MyRepository },
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (this.personalForm.sourceNumber === undefined || this.personalForm.sourceNumber === null || this.personalForm.sourceNumber === '') {
        callback(new Error('please select sourceNumber'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (this.customerId === undefined || this.customerId === null || this.customerId === '') {
        callback(new Error('please select customer'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      if (this.receiptPersonId === undefined || this.receiptPersonId === null || this.receiptPersonId === '') {
        callback(new Error('please select receiptPerson'))
      } else {
        callback()
      }
    }
    const validatePass6 = (rule, value, callback) => {
      if (this.receiptRepositoryId === undefined || this.receiptRepositoryId === null || this.receiptRepositoryId === '') {
        callback(new Error('please select receipt branch'))
      } else {
        callback()
      }
    }
    const validatePass4 = (rule, value, callback) => {
      if (this.personalForm.receiptDate === undefined || this.personalForm.receiptDate === null || this.personalForm.receiptDate === '') {
        callback(new Error('please select receiptDate'))
      } else {
        callback()
      }
    }
    const validatePass5 = (rule, value, callback) => {
      if (this.personalForm.deductionMoney > this.yufu) {
        callback(new Error('prepaid offset amount can not over advance payment'))
      } else {
        callback()
      }
    }
    return {
      pickerOptions2: {
        disabledDate: (time) => {
          const _now = Date.now()
          const seven = 60 * 24 * 60 * 60 * 1000
          const sevenDays = _now - seven
          return time.getTime() > _now || time.getTime() < sevenDays
        }
      },
      repositorycontrol: false,
      // 收款门店
      receiptRepositoryId: '',
      allorderarr: [],
      switchmoney: 0,
      isshow: true,
      allmoney: '',
      // 批量操作
      moreaction: [],
      moreaction2: [],
      // 回显收款人
      receiptPersonId: '',
      // 控制收款人
      stockControl: false,
      // 预收款
      yufu: 0,
      // 回显客户姓名
      customerId: '',
      // 控制经销商窗口
      agentcontrol: false,
      // 控制表单是否可以编辑
      IscustomerName: false,
      IscustomerPhone: false,
      IstotalMoney: false,
      IsbeforeCount: false,
      IspaidCount: false,
      IspaidMoney: false,
      IspaidCapital: false,
      IsremainCapital: false,
      IssaleRepositoryId: false,
      // 回显销售门店
      saleRepositoryId: '',
      // 控制分期订单
      installmentcontrol: false,
      // 编辑表格数据
      list2: [],
      payModes: [],
      // 销售订单信息数据
      personalForm: {
        couponSupports: [
          {
            couponSupport: 0
          }
        ],
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        penaltyMoney: 0,
        receiptMoney: 0,
        deductionMoney: 0,
        totalLackMoney: 0,
        couponSupport: 0,
        couponMoney: 0,
        couponSupportOld: 0,
        customerType: '2',
        receiptDate: null
      },
      allpenalty: 0,
      // 商品信息
      productForm: {},
      // 销售订单规则数据
      personalrules: {
        invoiceNumber: [
          { required: true, message: 'please input invoicenumber', trigger: 'change' }
        ],
        sourceType: [
          { required: true, message: 'please select sourceType', trigger: 'change' }
        ],
        sourceNumber: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        afterCount: [
          { required: true, message: 'please input aftercount', trigger: 'blur' }
        ],
        customerId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        payMode: [
          { required: true, message: 'please select payMode', trigger: 'change' }
        ],
        receiptPersonId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        receiptRepositoryId: [
          { required: true, validator: validatePass6, trigger: 'change' }
        ],
        receiptDate: [
          { required: true, validator: validatePass4, trigger: 'change' }
        ],
        penaltyMoney: [
          { required: true, message: 'please input penaltyMoney', trigger: 'blur' }
        ],
        deductionMoney: [
          { validator: validatePass5, trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    switchmoney: {
      handler(oldval, newval) {
        console.log('switchmoney', this.switchmoney)
        let num = 0
        let num2 = 0
        for (const i in this.switchmoney) {
          if (this.switchmoney[i].thisMoney === null || this.switchmoney[i].thisMoney === undefined) {
            this.switchmoney[i].thisMoney = 0
          }
          // console.log(typeof (this.list3[i].taxprice))
          num += this.switchmoney[i].thisMoney
          num2 += this.switchmoney[i].penalty
        }
        console.log('num=====', num)
        this.personalForm.receiptMoney = (num).toFixed(6)
        this.allpenalty = num2
      },
      deep: true,
      immediate: true
    }
  },
  // watch: {
  //   personalForm: {
  //     handler() {
  //       this.personalForm.totalLackMoney = this.allmoney - this.personalForm.receiptMoney
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // },
  created() {
    this.getways()
    this.getdatatime()
  },

  mounted() {
    this.getinformation()
    this.getdatatime()
  },
  activated() {
    this.setinstallmentdata()
    this.setinformation()
    this.getinformation()
    this.getinformation2()
    this.getinformation3()
    this.getdatatime()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    changePenalty(row) {
      console.log('row', row)
      row.thisMoney = Number(row.shouldMoney) - Number(row.paidmoney) - Number(row.reward) + Number(row.penalty)
      // console.log('money', money)
    },
    changeCoupon() {
      console.log('this.personalForm.couponSupports', this.personalForm.couponSupports)
      const parms2 = JSON.stringify(this.personalForm.couponSupports)
      returnMoney(parms2).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          if (res.data.data.content > this.personalForm.receiptMoney) {
            this.personalForm.couponSupport = this.personalForm.receiptMoney
          } else {
            this.personalForm.couponSupport = res.data.data.content
          }
          console.log('res.data.data.content', res.data.data.content)
        } else {
          this.$notify.error({
            title: 'wrong',
            message: res.data.msg,
            offset: 100
          })
        }
      })
    },
    addDomain() {
      this.personalForm.couponSupports.push({
        couponSupport: 0
      })
    },
    handlechooserepo() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      this.receiptRepositoryId = val.repositoryName
      this.personalForm.receiptRepositoryId = val.id
    },
    changepenaltymoney(val) {
      if (Number(val) > Number(this.allpenalty)) {
        this.personalForm.penaltyMoney = this.allpenalty
      }
    },
    // 深拷贝
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    changereceiptmoney(money) {
      const val = Number(money) + Number(this.personalForm.couponSupport) - Number(this.personalForm.penaltyMoney)
      console.log(val)
      this.$refs.editable2.clear()
      const data = this.deepClone(this.allorderarr)
      // const EnterDetail = this.$refs.editable2.getRecords()
      let s = 0
      let z = val
      for (const i in data) {
        s += data[i].thisMoney
        const endmoney = val - s
        z -= data[i].thisMoney
        console.log('ssssss', s)
        console.log('zzzzzz', z)
        if (val < data[i].thisMoney) {
          console.log(i)
          data[i].thisMoney = val
          this.$refs.editable2.insertAt(data[i], -1)
          break
        }
        if (z > 0) {
          this.$refs.editable2.insertAt(data[i], -1)
        }
        if (z === 0) {
          this.$refs.editable2.insertAt(data[i], -1)
          break
        }
        if (z < 0) {
          console.log('iiiiii', i)
          data[i].thisMoney = data[i].thisMoney + z
          this.$refs.editable2.insertAt(data[i], -1)
          break
        }
      }
    },
    changemoney(money) {
      const val = Number(money) + Number(this.personalForm.receiptMoney) - Number(this.personalForm.penaltyMoney)
      console.log(val)
      this.$refs.editable2.clear()
      const data = this.deepClone(this.allorderarr)
      // const EnterDetail = this.$refs.editable2.getRecords()
      let s = 0
      let z = val
      for (const i in data) {
        s += data[i].thisMoney
        const endmoney = val - s
        z -= data[i].thisMoney
        console.log('ssssss', s)
        console.log('zzzzzz', z)
        if (val < data[i].thisMoney) {
          console.log(i)
          data[i].thisMoney = val
          this.$refs.editable2.insertAt(data[i], -1)
          break
        }
        if (z > 0) {
          this.$refs.editable2.insertAt(data[i], -1)
        }
        if (z === 0) {
          this.$refs.editable2.insertAt(data[i], -1)
          break
        }
        if (z < 0) {
          console.log('iiiiii', i)
          data[i].thisMoney = data[i].thisMoney + z
          this.$refs.editable2.insertAt(data[i], -1)
          break
        }
      }
    },
    setinstallmentdata() {
      if (this.$store.getters.newinstallpaydata) {
        console.log('this.$store.getters.newinstallpaydata', this.$store.getters.newinstallpaydata)
        this.isshow = true
        const val = this.$store.getters.newinstallpaydata
        this.personalForm.customerType = '2'
        this.personalForm.sourceNumber = val.orderNumber
        this.customerId = val.customerName
        this.personalForm.customerId = val.customerId
        const befroedetail = []
        for (const i in val.installmentOrderDetailVos) {
          if (val.installmentOrderDetailVos[i].stat !== 2) {
            befroedetail.push(val.installmentOrderDetailVos[i])
          }
        }
        console.log('befroedetailbefroedetail', befroedetail)
        const InstallmentDetail = befroedetail.map(function(item) {
          return {
            installmentDetailId: item.id,
            presentCount: item.idx,
            returnMoney: item.shouldMoney,
            shouldMoney: item.shouldMoney,
            returnSource: item.capitalMoney,
            reward: item.reward,
            penalty: item.penalty,
            returnInterest: item.interestMoney,
            paidmoney: item.paidMoney,
            unpay: item.shouldMoney - item.paidMoney,
            collectedMoney: item.paidMoney,
            uncollectedMoney: item.shouldMoney - item.paidMoney,
            thisMoney: item.shouldMoney - item.paidMoney - item.reward + Number(item.penalty),
            installmentId: item.installmentId
          }
        })
        console.log('InstallmentDetail', InstallmentDetail)
        // for (const i in InstallmentDetail) {
        //   this.$refs.editable2.insert(InstallmentDetail[i])
        // }
        this.list2 = InstallmentDetail
        this.allorderarr = InstallmentDetail
        this.$store.dispatch('getnewinstallpaydata', '')
      }
    },
    junglemoney() {
      console.log(123123123)
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
      this.personalForm.receiptMoney = 0
      const processdata = this.moreaction
      for (const i in processdata) {
        this.personalForm.receiptMoney += processdata[i].unpay
      }
      this.personalForm.totalLackMoney = this.allmoney - this.personalForm.receiptMoney
    },
    handleSelectionChange2(val) {
      this.moreaction2 = val
      this.personalForm.totalLackMoney = this.allmoney - this.personalForm.receiptMoney
    },
    setinformation() {
      if (this.$store.getters.newreceiptdata) {
        this.isshow = false
        const val = this.$store.getters.newreceiptdata
        this.personalForm.customerType = '2'
        this.customerId = this.$store.getters.newreceiptdata.customerName
        this.personalForm.customerId = this.$store.getters.newreceiptdata.customerId
        const valmap = []
        valmap.push(val)
        const InstallmentDetail = valmap.map(function(item) {
          return {
            installmentDetailId: item.id,
            presentCount: item.idx,
            returnMoney: item.shouldMoney,
            shouldMoney: item.shouldMoney,
            returnSource: item.capitalMoney,
            reward: item.reward,
            penalty: item.penalty,
            returnInterest: item.interestMoney,
            paidmoney: item.paidMoney,
            unpay: item.shouldMoney - item.paidMoney,
            collectedMoney: item.paidMoney,
            uncollectedMoney: item.shouldMoney - item.paidMoney,
            thisMoney: item.shouldMoney - item.paidMoney - item.reward + Number(item.penalty),
            installmentId: item.installmentId
          }
        })
        console.log('InstallmentDetail', InstallmentDetail)
        // for (const i in InstallmentDetail) {
        //   this.$refs.editable2.insert(InstallmentDetail[i])
        // }
        this.list2 = InstallmentDetail
        this.$store.dispatch('getnewreceiptdata', '')
      }
    },
    getinformation() {
      if (this.$store.getters.empcontract) {
        console.log('getempcontract', this.$store.getters.empcontract)
        this.personalForm.customerType = '2'
        this.personalForm.customerId = this.$store.getters.empcontract.customerId
        this.customerId = this.$store.getters.empcontract.customerName
        // if (val.advanceMoney !== null && val.advanceMoney !== undefined && val.advanceMoney !== '') {
        //   this.yufu = val.advanceMoney
        // }
        for (let i = 0; i < this.$store.getters.empcontract.installmentOrderDetailVos.length; i++) {
          this.$store.getters.empcontract.installmentOrderDetailVos[i].categoryName = this.$store.getters.empcontract.installmentOrderDetailVos[i].productCategory
        }
        console.log(this.$store.getters.empcontract.installmentOrderDetailVos)
        const val = this.$store.getters.empcontract.installmentOrderDetailVos
        setTimeout(() => {
          this.$refs.editable2.clear()
          const valmap = []
          for (const i in val) {
            valmap.push(val[i])
          }
          const InstallmentDetail = valmap.map(function(item) {
            return {
              installmentDetailId: item.id,
              presentCount: item.idx,
              returnMoney: item.shouldMoney,
              shouldMoney: item.shouldMoney,
              returnSource: item.capitalMoney,
              reward: item.reward,
              penalty: item.penalty,
              returnInterest: item.interestMoney,
              paidmoney: item.paidMoney,
              unpay: item.shouldMoney - item.paidMoney,
              collectedMoney: item.paidMoney,
              uncollectedMoney: item.shouldMoney - item.paidMoney,
              thisMoney: item.shouldMoney - item.paidMoney - item.reward + Number(item.penalty),
              installmentId: item.installmentId
            }
          })
          console.log('InstallmentDetail', InstallmentDetail)
          for (let i = 0; i < InstallmentDetail.length; i++) {
            this.$refs.editable2.insert(InstallmentDetail[i])
          }
          this.personalForm.totalLackMoney = Number(this.allmoney) - Number(this.personalForm.receiptMoney)
        }, 0)
        this.$store.dispatch('getempcontract', '')
      }
    },
    getinformation2() {
      if (this.$store.getters.empcontract2) {
        console.log('getempcontract2', this.$store.getters.empcontract2)
        this.personalForm.customerType = '2'
        this.personalForm.customerId = this.$store.getters.empcontract2.customerId
        this.customerId = this.$store.getters.empcontract2.customerName
        // for (let i = 0; i < this.$store.getters.empcontract2.installmentOrderDetailVos.length; i++) {
        //   this.$store.getters.empcontract2.installmentOrderDetailVos[i].categoryName = this.$store.getters.empcontract2.installmentOrderDetailVos[i].productCategory
        // }
        this.InstallmentDetail(this.$store.getters.empcontract2)
        this.$store.dispatch('getempcontract2', '')
      }
    },
    getinformation3() {
      if (this.$store.getters.empcontract3) {
        console.log('getempcontract3', this.$store.getters.empcontract3)
        this.personalForm.customerType = '1'
        this.personalForm.customerId = this.$store.getters.empcontract3[0].agentId
        this.customerId = this.$store.getters.empcontract3[0].agentName
        const agentcollectDetail = this.$store.getters.empcontract3.map(function(item) {
          return {
            sourceNumber: item.sourceNumber,
            agentCollectId: item.id,
            shouldMoney: item.shouldMoney,
            discountMoney: item.discountMoney,
            retreatMoney: item.returnMoney,
            collectedMoney: item.collectedMoney,
            uncollectedMoney: item.uncollectedMoney,
            thisMoney: '0.00'
          }
        })
        setTimeout(() => {
          for (let i = 0; i < agentcollectDetail.length; i++) {
            this.$refs.editable.insert(agentcollectDetail[i])
          }
        }, 0)
        this.$store.dispatch('getempcontract3', '')
      }
    },
    getways() {
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.payModes = res.data.data.content.list
        }
      })
    },
    // 默认显示今天
    getdatatime() { // 默认显示今天
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
      this.personalForm.receiptDate = currentdate
    },
    // 收款人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 收款人回显
    stockName(val) {
      console.log(val)
      this.receiptPersonId = val.personName
      this.personalForm.receiptPersonId = val.id
      this.personalForm.receiptRepositoryId = val.repositoryId
      this.receiptRepositoryId = val.repositoryName
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
              return (Number(prev) + Number(curr)).toFixed(6)
            } else {
              return (Number(prev).toFixed(6))
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      sums[2] = ''
      this.allmoney = sums[8]
      if (this.isshow === true) {
        this.personalForm.penaltyMoney = sums[6]
        this.personalForm.totalLackMoney = sums[9]
        const jiangli = Number(sums[5])
        const zhina = Number(sums[6])
        const zhuanghua = zhina - jiangli
        console.log('jiangli', jiangli)
        console.log('zhina', zhina)
        console.log('zhuanghua', zhuanghua)
        console.log('this.list2', this.list2)
        // this.personalForm.receiptMoney = Number(sums[10]) - Number(this.personalForm.couponSupport)
        // this.switchmoney = Number(sums[10]) - Number(this.personalForm.couponSupport)
        this.switchmoney = this.$refs.editable2.getRecords()
      } else {
        console.log(456)
        this.personalForm.penaltyMoney = sums[5]
        this.personalForm.totalLackMoney = sums[8]
        // this.personalForm.receiptMoney = sums[9] - Number(this.personalForm.couponSupport)
        this.switchmoney = this.$refs.editable2.getRecords()
      }

      return sums
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
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return (Number(prev) + Number(curr)).toFixed(6)
            } else {
              return Number(prev).toFixed(6)
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      sums[1] = ''
      this.allmoney = sums[5]
      // this.personalForm.receiptMoney = sums[6] - Number(this.personalForm.couponSupport)
      this.personalForm.deductionMoney = sums[7]
      this.personalForm.totalLackMoney = sums[5] - sums[6]
      return sums
    },
    // 选择客户类型时清理客户名称
    clearCustomer() {
      this.personalForm.customerId = ''
      this.customerId = ''
      this.list2 = []
    },
    // 选择客户focus
    chooseCustomer() {
      this.$forceUpdate()
      if (this.personalForm.customerType === '1') {
        this.agentcontrol = true
        this.$forceUpdate()
      } else if (this.personalForm.customerType === '2') {
        this.installmentcontrol = true
        this.$forceUpdate()
      }
    },
    agentdata(val) {
      setTimeout(() => {
        this.$refs.editable.clear()
        this.personalForm.customerId = val.id
        this.customerId = val.agentName
        agentCollectList(val).then(res => {
          if (res.data.ret === 200) {
          // console.log('供应商欠款', res.data.data.content.list)
            const agentcollectDetail = res.data.data.content.list.map(function(item) {
              return {
                sourceNumber: item.sourceNumber,
                agentCollectId: item.id,
                shouldMoney: item.shouldMoney,
                discountMoney: item.discountMoney,
                retreatMoney: item.returnMoney,
                collectedMoney: item.collectedMoney,
                uncollectedMoney: item.uncollectedMoney,
                thisMoney: '0.00',
                deductionMoney: '0.00'
              }
            })
            for (let i = 0; i < agentcollectDetail.length; i++) {
              console.log(agentcollectDetail[i])
              this.$refs.editable.insert(agentcollectDetail[i])
            }
          }
        })
      }, 0)
    },
    Installment(val) {
      console.log('val=====', val)
      this.personalForm.customerId = val.id
      this.customerId = val.customerName
      if (val.advanceMoney !== null && val.advanceMoney !== undefined && val.advanceMoney !== '') {
        this.yufu = val.advanceMoney
      }
      this.personalForm.totalLackMoney = Number(this.allmoney) - Number(this.personalForm.receiptMoney)
    },
    InstallmentDetail2(val) {
      console.log(val)
      this.$refs.editable2.clear()
      if (val.length) {
        console.log('sdsdsdsdsdsdsdsdsdsdsdsdsd', val)
        const needarr = val.filter(item => {
          return item.stat !== 2
        })
        const InstallmentDetail = needarr.map(function(item) {
          return {
            installmentDetailId: item.installmentDetailId,
            presentCount: item.presentCount,
            returnMoney: item.returnMoney,
            shouldMoney: item.shouldMoney,
            returnSource: item.returnSource,
            reward: item.reward,
            penalty: item.penalty,
            returnInterest: item.returnInterest,
            paidmoney: item.paidmoney,
            unpay: item.unpay,
            collectedMoney: item.paidMoney,
            uncollectedMoney: item.unpay,
            thisMoney: item.shouldMoney - item.paidmoney - item.reward + Number(item.penalty),
            installmentId: item.installmentId
          }
        })
        console.log('shushushushushsuhsuhsuhsuhsushu', InstallmentDetail)
        for (let i = 0; i < InstallmentDetail.length; i++) {
          this.$refs.editable2.insertAt(InstallmentDetail[i], -1)
        }
        // this.list2 = InstallmentDetail
        this.allorderarr = InstallmentDetail
        this.personalForm.totalLackMoney = Number(this.allmoney) - Number(this.personalForm.receiptMoney)
      }
      // else {
      //   this.$refs.editable2.clear()
      //   const valmap = []
      //   valmap.push(val)
      //   const InstallmentDetail = valmap.map(function(item) {
      //     return {
      //       installmentDetailId: item.id,
      //       presentCount: item.idx,
      //       returnMoney: item.shouldMoney,
      //       shouldMoney: item.shouldMoney,
      //       returnSource: item.capitalMoney,
      //       reward: item.reward,
      //       penalty: item.penalty,
      //       returnInterest: item.interestMoney,
      //       paidmoney: item.paidMoney,
      //       unpay: item.shouldMoney - item.paidMoney,
      //       thisMoney: item.shouldMoney - item.paidMoney,
      //       installmentId: item.installmentId
      //     }
      //   })
      //   console.log('shushushushushsuhsuhsuhsuhsushu', InstallmentDetail)
      //   for (let i = 0; i < InstallmentDetail.length; i++) {
      //     this.$refs.editable2.insert(InstallmentDetail[i])
      //   }
      //   this.personalForm.totalLackMoney = Number(this.allmoney) - Number(this.personalForm.receiptMoney)
      // }
    },
    InstallmentDetail(val) {
      // console.log(val)
      this.$refs.editable2.clear()
      if (val.length) {
        console.log('sdsdsdsdsdsdsdsdsdsdsdsdsd', val)
        const InstallmentDetail = val.map(function(item) {
          return {
            installmentDetailId: item.installmentDetailId,
            presentCount: item.presentCount,
            returnMoney: item.returnMoney,
            shouldMoney: item.shouldMoney,
            returnSource: item.returnSource,
            reward: item.reward,
            penalty: item.penalty,
            returnInterest: item.returnInterest,
            paidmoney: item.paidmoney,
            unpay: item.unpay,
            collectedMoney: item.paidMoney,
            uncollectedMoney: item.unpay,
            thisMoney: item.shouldMoney - item.paidMoney - item.reward + Number(item.penalty),
            installmentId: item.installmentId
          }
        })
        // console.log('shushushushushsuhsuhsuhsuhsushu', InstallmentDetail)
        for (let i = 0; i < InstallmentDetail.length; i++) {
          this.$refs.editable2.insert(InstallmentDetail[i])
        }
        // this.list2 = InstallmentDetail
        this.allorderarr = InstallmentDetail
        this.personalForm.totalLackMoney = Number(this.allmoney) - Number(this.personalForm.receiptMoney)
      }
      // else {
      //   this.$refs.editable2.clear()
      //   const valmap = []
      //   valmap.push(val)
      //   const InstallmentDetail = valmap.map(function(item) {
      //     return {
      //       installmentDetailId: item.id,
      //       presentCount: item.idx,
      //       returnMoney: item.shouldMoney,
      //       shouldMoney: item.shouldMoney,
      //       returnSource: item.capitalMoney,
      //       reward: item.reward,
      //       penalty: item.penalty,
      //       returnInterest: item.interestMoney,
      //       paidmoney: item.paidMoney,
      //       unpay: item.shouldMoney - item.paidMoney,
      //       thisMoney: item.shouldMoney - item.paidMoney,
      //       installmentId: item.installmentId
      //     }
      //   })
      //   console.log('shushushushushsuhsuhsuhsuhsushu', InstallmentDetail)
      //   for (let i = 0; i < InstallmentDetail.length; i++) {
      //     this.$refs.editable2.insert(InstallmentDetail[i])
      //   }
      //   this.personalForm.totalLackMoney = Number(this.allmoney) - Number(this.personalForm.receiptMoney)
      // }
    },
    // 源单控制
    handleAddsourceNum() {
      this.installmentcontrol = true
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        receiptMoney: 0,
        deductionMoney: 0,
        couponSupportOld: 0,
        customerType: '2',
        receiptDate: null
      }
      this.receiptPersonId = null
      this.customerId = null
    },
    // 保存操作
    handlesave() {
      if (this.personalForm.couponSupportOld === null || this.personalForm.couponSupportOld === '' || this.personalForm.couponSupportOld === undefined) {
        this.personalForm.couponSupportOld = 0
      }
      if (this.personalForm.customerType === '1') {
        const EnterDetail = this.$refs.editable.getRecords()
        if (EnterDetail.length === 0) {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.mxbbnwk'),
            offset: 100
          })
          return false
        }
        const parms2 = JSON.stringify(EnterDetail)
        const Data = this.personalForm
        for (const key in Data) {
          if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
            delete Data[key]
          }
        }
        const parms = JSON.stringify(Data)
        this.$refs.personalForm.validate((valid) => {
          if (valid) {
            createreceipt(parms, parms2, this.personalForm).then(res => {
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
                this.$store.dispatch('getnewreceiptdata', '')
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
      } else if (this.personalForm.customerType === '2') {
        const EnterDetail = this.$refs.editable2.getRecords()
        if (EnterDetail.length === 0) {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.mxbbnwk'),
            offset: 100
          })
          return false
        }
        console.log('EnterDetail', EnterDetail)
        const parms2 = JSON.stringify(EnterDetail)
        console.log('this.personalForm.couponSupports', this.personalForm.couponSupports)
        let couponNumbers = ''
        for (let i = 0; i < this.personalForm.couponSupports.length; i++) {
          if (this.personalForm.couponSupports[i].couponSupport !== 0 && this.personalForm.couponSupports[i].couponSupport !== '') {
            couponNumbers = couponNumbers + this.personalForm.couponSupports[i].couponSupport + ','
          }
        }
        console.log('couponNumbers', couponNumbers)
        couponNumbers = couponNumbers.substring(0, couponNumbers.length - 1)
        console.log('couponNumbers', couponNumbers)
        this.personalForm.couponNumbers = couponNumbers
        const Data = this.personalForm
        for (const key in Data) {
          if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
            delete Data[key]
          }
        }
        const parms = JSON.stringify(Data)
        this.$refs.personalForm.validate((valid) => {
          if (valid) {
            createreceipt(parms, parms2, this.personalForm).then(res => {
              if (res.data.ret === 200) {
                this.$notify({
                  title: 'successful',
                  message: 'save successful',
                  type: 'success',
                  offset: 100
                })
                this.restAllForm()
                this.$refs.editable2.clear()
                this.$refs.personalForm.clearValidate()
                this.$refs.personalForm.resetFields()
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
      }
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Receipt/AddReceipt', name: 'AddReceipt', fullPath: '/Receipt/AddReceipt', title: 'AddReceipt' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
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
