<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :close-on-press-escape="false" :title="personalForm.number +$t('updates.xg')" width="1010px" class="edit" top="-30px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" shadow="never">
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Receipt.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Receipt.customerType')" prop="customerType" style="width: 100%;">
                <el-select v-model="personalForm.customerType" style="margin-left: 18px;width: 200px" @change="clearCustomer">
                  <el-option :label="$t('updates.jxs')" value="1"/>
                  <el-option :label="$t('updates.kh')" value="2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Receipt.customerId')" prop="customerId" style="width: 100%;">
                <el-input v-model="customerId" style="margin-left: 18px;width: 200px" @focus="chooseCustomer"/>
              </el-form-item>
              <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
              <my-customer :customercontrol.sync="installmentcontrol" @InstallmentDetail="InstallmentDetail2" @Installment="Installment"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Receipt.moneyType')" style="width: 100%;">
                <el-select v-model="personalForm.moneyType" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="PHP"/>
                  <el-option value="2" label="USD"/>
                  <el-option value="3" label="RMB"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Receipt.receiptMoney')" prop="receiptMoney" style="width: 100%;">
                <el-input v-model="personalForm.receiptMoney" style="margin-left: 18px;width: 200px" clearable @change="changereceiptmoney"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('payment.payMode')" prop="payMode" style="width: 100%;">
                <el-select v-model="personalForm.payMode" style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in payModes"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Receipt.receiptAccount')" style="width: 100%;">
                <el-input v-model="personalForm.receiptAccount" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Receipt.receiptAccountNumber')" style="width: 100%;">
                <el-input v-model="personalForm.receiptAccountNumber" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col v-for="(item, index) in personalForm2.couponSupports" :key="index" :span="12">
              <el-form-item :label="$t('SaleOut.couponSupport') + (index + 1)" style="width: 100%;">
                <el-input v-model="item.couponSupport" style="margin-left: 18px;width: 130px" @blur="changeCoupon"/>
                <el-button v-show="index === personalForm2.couponSupports.length -1" icon="el-icon-plus" type="success" @click="addDomain" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('collectAndPay.couponSupport2')" style="width: 100%;">
                <el-input v-model="personalForm.couponSupport" disabled style="margin-left: 18px;width: 200px" type="number" @change="changemoney"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('collectAndPay.couponSupportOld')" style="width: 100%;">
                <el-input-number v-model="personalForm.couponSupportOld" :controls="false" :step="0.1" :min="0" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Receipt.receiptPersonId')" prop="receiptPersonId" style="width: 100%;">
                <el-input v-model="receiptPersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
              </el-form-item>
              <my-emp :control.sync="stockControl" @stockName="stockName"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Receipt.receiptRepositoryId')" prop="receiptRepositoryId" style="width: 100%;">
                <el-input v-model="receiptRepositoryId" style="margin-left: 18px;width: 200px" @focus="handlechooserepo"/>
              </el-form-item>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Receipt.receiptDate')" prop="payDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.receiptDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Receipt.totalLackMoney')" prop="totalLackMoney" style="width: 100%;">
                <el-input v-model="personalForm.totalLackMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Receipt.remark')" style="width: 100%;">
                <el-input v-model="personalForm.remark" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Receipt.penaltyMoney')" prop="penaltyMoney" style="width: 100%;">
                <el-input v-model="personalForm.penaltyMoney" type="number" style="margin-left: 18px;width: 200px" clearable/>
                <!-- <el-input-number v-model="personalForm.penaltyMoney" :controls="false" /> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockInvoice.invoiceNumber')" prop="invoiceNumber" style="width: 100%;">
                <el-input v-model="personalForm.invoiceNumber" style="margin-left: 18px;width: 200px" clearable/>
                <!-- <el-input-number v-model="personalForm.penaltyMoney" :controls="false" /> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Receipt.deductionMoney')" prop="deductionMoney" style="width: 100%;">
                <el-input v-model="personalForm.deductionMoney" style="margin-left: 18px;width: 200px" disabled @change="junglemoney"/>
              </el-form-item>
              <span style="color: red;margin-left: 52px;font-size: 14px">预收款：{{ yufu }}</span>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card v-if="personalForm.customerType === '2' || personalForm.customerType === 2" class="box-card" style="margin-top: 15px;margin-bottom: 30px" shadow="never">
      <h2 ref="fuzhu" class="form-name" >收款明细</h2>
      <el-button v-if="isshow" type="danger" @click="$refs.editable2.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
      <div class="container">
        <el-editable
          ref="editable2"
          :data.sync="list2"
          :edit-config="{ showIcon: true, showStatus: true}"
          :summary-method="getSummaries"
          class="click-table1"
          show-summary
          stripe
          border
          size="medium"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-editable-column type="selection" min-width="55" align="center"/>
          <el-editable-column :key="Math.random()" :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
          <el-editable-column :key="Math.random()" prop="presentCount" align="center" label="当前期数" min-width="150px"/>
          <el-editable-column :key="Math.random()" prop="returnMoney" align="center" label="本期还款金额" min-width="150px"/>
          <el-editable-column :key="Math.random()" prop="returnSource" align="center" label="本期还款本金" min-width="150px"/>
          <el-editable-column :key="Math.random()" prop="reward" align="center" label="奖励" min-width="150px"/>
          <el-editable-column :key="Math.random()" prop="penalty" align="center" label="滞纳金" min-width="150px"/>
          <el-editable-column :key="Math.random()" prop="returnInterest" align="center" label="本期还款利息" min-width="150px"/>
          <el-editable-column :key="Math.random()" prop="collectedMoney" align="center" label="已收金额" min-width="150px"/>
          <el-editable-column :key="Math.random()" prop="uncollectedMoney" align="center" label="未收金额" min-width="150px"/>
          <el-editable-column :key="Math.random()" :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="thisMoney" align="center" label="本次收款" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <el-card v-if="personalForm.customerType === '1' || personalForm.customerType === 1" class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" >收款明细</h2>
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
          size="medium"
          style="width: 100%"
          @selection-change="handleSelectionChange2">
          <el-editable-column :key="Math.random()" prop="sourceNumber" label="编号" min-width="200" align="center" />
          <el-editable-column :key="Math.random()" prop="shouldMoney" align="center" label="应收款金额" min-width="150px"/>
          <el-editable-column :key="Math.random()" :label="$t('updates.cke')" prop="discountMoney" align="center" min-width="150px"/>
          <el-editable-column :key="Math.random()" prop="retreatMoney" align="center" label="退货抵扣" min-width="150px"/>
          <el-editable-column :key="Math.random()" prop="collectedMoney" align="center" label="已收金额" min-width="150px"/>
          <el-editable-column :key="Math.random()" prop="uncollectedMoney" align="center" label="未收款金额" min-width="150px"/>
          <el-editable-column :key="Math.random()" :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="thisMoney" align="center" label="本次收款" min-width="150px"/>
          <el-editable-column :key="Math.random()" :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="deductionMoney" align="center" label="本次抵扣预收款" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        <el-button type="primary" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { returnMoney } from '@/api/Coupon'
import { updatereceipt2 } from '@/api/Receipt'
import { agentCollectList } from '@/api/public'
import { installmentlist } from '@/api/InstallmentList'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import MyMater from './MyMater'
import MyInstallment from './MyInstallment'
import MyAgent from '../../SaleOpportunity/components/MyAgent'
import { searchCategory } from '@/api/Supplier'
import MyRepository from './MyRepository'
import MyCustomer from './MyCustomer'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  components: { MyAgent, MyInstallment, MyMater, MyDetail, MyEmp, MyRepository, MyCustomer },
  props: {
    editcontrol: {
      type: Boolean,
      default: false
    },
    editdata: {
      type: Object,
      default: null
    }
  },
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (this.personalForm.sourceNumber === undefined || this.personalForm.sourceNumber === null || this.personalForm.sourceNumber === '') {
        callback(new Error('请选择源单编号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (this.customerId === undefined || this.customerId === null || this.customerId === '') {
        callback(new Error('请选择顾客'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      if (this.receiptPersonId === undefined || this.receiptPersonId === null || this.receiptPersonId === '') {
        callback(new Error('请选择收款人'))
      } else {
        callback()
      }
    }
    const validatePass4 = (rule, value, callback) => {
      if (this.personalForm.receiptDate === undefined || this.personalForm.receiptDate === null || this.personalForm.receiptDate === '') {
        callback(new Error('请选择收款日期'))
      } else {
        callback()
      }
    }
    const validatePass5 = (rule, value, callback) => {
      if (this.personalForm.deductionMoney > this.yufu) {
        callback(new Error('抵扣额不可大于预付款'))
      } else {
        callback()
      }
    }
    const validatePass6 = (rule, value, callback) => {
      if (this.receiptRepositoryId === undefined || this.receiptRepositoryId === null || this.receiptRepositoryId === '') {
        callback(new Error('请选择收款门店'))
      } else {
        callback()
      }
    }
    return {
      personalForm2: {
        couponSupports: [
          {
            couponSupport: 0
          }
        ]
      },
      repositorycontrol: false,
      // 收款门店
      receiptRepositoryId: '',
      allorderarr: [],
      switchmoney: 0,
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      isshow: false,
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
      // 商品信息
      productForm: {},
      // 销售订单规则数据
      personalrules: {
        invoiceNumber: [
          { required: true, message: '请输入发票号', trigger: 'change' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        sourceNumber: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        afterCount: [
          { required: true, message: '请输入修改之后期数', trigger: 'blur' }
        ],
        customerId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        payMode: [
          { required: true, message: '请选择支付方式', trigger: 'change' }
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
          { required: true, message: '请输入滞纳金金额', trigger: 'blur' }
        ],
        deductionMoney: [
          { validator: validatePass5, trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.getways()
      this.personalForm = this.editdata
      if (this.personalForm.couponNumbers === '' || this.personalForm.couponNumbers === null || this.personalForm.couponNumbers === undefined) {
        this.personalForm2.couponSupports = [
          {
            couponSupport: 0
          }
        ]
      } else {
        this.personalForm2.couponSupports = [
          {
            couponSupport: 0
          }
        ]
        const coupon = []
        var b = this.personalForm.couponNumbers.split(',')
        console.log('b', b)
        for (let i = 0; i < b.length; i++) {
          const param = {}
          param.couponSupport = b[i]
          coupon.push(param)
        }
        console.log('coupon', coupon)
        this.personalForm2.couponSupports = coupon
        console.log('this.personalForm.couponSupports2', this.personalForm2.couponSupports)
      }
      console.log('this.personalForm', this.personalForm)
      this.customerId = this.personalForm.customerName
      this.receiptPersonId = this.personalForm.receiptPersonName
      this.receiptRepositoryId = this.personalForm.receiptRepositoryName
      this.isshow = true
      this.list2 = this.personalForm.receiptDetails
      this.getdetailtabledata()
    },
    switchmoney: {
      handler(oldval, newval) {
        console.log('switchmoney', this.switchmoney)
        let num = 0
        for (const i in this.switchmoney) {
          // console.log(typeof (this.list3[i].taxprice))
          num += this.switchmoney[i].thisMoney
        }
        console.log('num=====', num)
        this.personalForm.receiptMoney = num
      },
      deep: true,
      immediate: true
    }
  },
  created() {
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    changeCoupon() {
      console.log('this.personalForm.couponSupports', this.personalForm2.couponSupports)
      const parms2 = JSON.stringify(this.personalForm2.couponSupports)
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
            title: '错误',
            message: res.data.msg,
            offset: 100
          })
        }
      })
    },
    addDomain() {
      this.personalForm2.couponSupports.push({
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
    getdetailtabledata() {
      const parms = {
        pageNum: 1,
        pageSize: 1,
        orderNumber: this.personalForm.sourceNumber,
        repositoryId: 0
      }
      installmentlist(parms).then(res => {
        if (res.data.ret === 200) {
          const needarrlist = res.data.data.content.list[0].installmentOrderDetailVos.filter(item => {
            return item.stat !== 2
          })
          this.allorderarr = needarrlist.map(function(item) {
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
              thisMoney: item.shouldMoney - item.paidMoney - item.reward,
              installmentId: item.installmentId
            }
          })
        }
      })
    },
    // 深拷贝
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    changereceiptmoney(money) {
      console.log()
      const val = Number(money) + Number(this.personalForm.couponSupport)
      console.log(val)
      this.$refs.editable2.clear()
      const data = this.deepClone(this.allorderarr)
      console.log('data', data)
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
      const val = Number(money) + Number(this.personalForm.receiptMoney)
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
        this.isshow = true
        const val = this.$store.getters.newinstallpaydata
        this.personalForm.customerType = '2'
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
            thisMoney: item.shouldMoney - item.paidMoney,
            installmentId: item.installmentId
          }
        })
        console.log('InstallmentDetail', InstallmentDetail)
        // for (const i in InstallmentDetail) {
        //   this.$refs.editable2.insert(InstallmentDetail[i])
        // }
        this.list2 = InstallmentDetail
        this.$store.dispatch('getnewinstallpaydata', '')
      }
    },
    junglemoney() {
      console.log(123123123)
    },
    // 批量操作
    handleSelectionChange(val) {
      // this.moreaction = val
      // this.personalForm.receiptMoney = 0
      // const processdata = this.moreaction
      // for (const i in processdata) {
      //   this.personalForm.receiptMoney += processdata[i].unpay
      // }
      // this.personalForm.totalLackMoney = this.allmoney - this.personalForm.receiptMoney
    },
    handleSelectionChange2(val) {
      // this.moreaction2 = val
      // this.personalForm.totalLackMoney = this.allmoney - this.personalForm.receiptMoney
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
            thisMoney: item.shouldMoney - item.paidMoney,
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
              thisMoney: item.shouldMoney - item.paidMoney,
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
              return (Number(prev) + Number(curr)).toFixed(2)
            } else {
              return (Number(prev).toFixed(2))
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      sums[2] = ''
      if (this.isshow === true) {
        this.personalForm.penaltyMoney = sums[6]
        this.personalForm.totalLackMoney = sums[10]
        const jiangli = Number(sums[5])
        const zhina = Number(sums[6])
        const zhuanghua = zhina - jiangli
        console.log('jiangli', jiangli)
        console.log('zhina', zhina)
        console.log('zhuanghua', zhuanghua)
        // this.personalForm.receiptMoney = Number(sums[10]) + zhuanghua - Number(this.personalForm.couponSupport)
        this.switchmoney = this.$refs.editable2.getRecords()
      } else {
        console.log(456)
        this.personalForm.penaltyMoney = sums[5]
        this.personalForm.totalLackMoney = sums[9]
        // this.personalForm.receiptMoney = sums[9] - sums[4] + sums[5] - Number(this.personalForm.couponSupport)
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
              return (Number(prev) + Number(curr)).toFixed(2)
            } else {
              return Number(prev).toFixed(2)
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      sums[1] = ''
      this.allmoney = sums[5]
      this.personalForm.receiptMoney = sums[6] - Number(this.personalForm.couponSupport)
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
      // console.log(val)
      this.personalForm.customerId = val.customerId
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
      setTimeout(() => {
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
              thisMoney: item.shouldMoney - item.paidmoney - item.reward + Number(item.penalty),
              installmentId: item.installmentId
            }
          })
          console.log('shushushushushsuhsuhsuhsuhsushu', InstallmentDetail)
          for (let i = 0; i < InstallmentDetail.length; i++) {
            this.$refs.editable2.insert(InstallmentDetail[i])
          }
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
      }, 0)
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
        deductionMoney: 0
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
            title: '错误',
            message: '明细表不能为空',
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
            updatereceipt2(parms, parms2).then(res => {
              if (res.data.ret === 200) {
                this.$notify({
                  title: '成功',
                  message: '保存成功',
                  type: 'success',
                  offset: 100
                })
                this.restAllForm()
                this.$refs.editable.clear()
                this.$refs.personalForm.clearValidate()
                this.$refs.personalForm.resetFields()
                this.editVisible = false
                this.$emit('rest', true)
              } else {
                this.$notify.error({
                  title: '错误',
                  message: res.data.msg,
                  offset: 100
                })
              }
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: '信息未填完整',
              offset: 100
            })
            return false
          }
        })
      } else if (this.personalForm.customerType === '2') {
        const EnterDetail = this.$refs.editable2.getRecords()
        if (EnterDetail.length === 0) {
          this.$notify.error({
            title: '错误',
            message: '明细表不能为空',
            offset: 100
          })
          return false
        }
        const parms2 = JSON.stringify(EnterDetail)
        console.log('this.personalForm.couponSupports', this.personalForm2.couponSupports)
        let couponNumbers = ''
        for (let i = 0; i < this.personalForm2.couponSupports.length; i++) {
          if (this.personalForm2.couponSupports[i].couponSupport !== 0 && this.personalForm2.couponSupports[i].couponSupport !== '') {
            couponNumbers = couponNumbers + this.personalForm2.couponSupports[i].couponSupport + ','
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
            updatereceipt2(parms, parms2).then(res => {
              if (res.data.ret === 200) {
                this.$notify({
                  title: '成功',
                  message: '保存成功',
                  type: 'success',
                  offset: 100
                })
                this.restAllForm()
                this.$refs.editable2.clear()
                this.$refs.personalForm.clearValidate()
                this.$refs.personalForm.resetFields()
                this.editVisible = false
                this.$emit('rest', true)
              } else {
                this.$notify.error({
                  title: '错误',
                  message: res.data.msg,
                  offset: 100
                })
              }
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: '信息未填完整',
              offset: 100
            })
            return false
          }
        })
      }
    },
    // 取消操作
    handlecancel() {
      this.editVisible = false
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>
  .container >>> .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    margin-left: -10px;
  }
  .container >>> .el-form-item__label{
    text-align: left;
  }
  .container >>> .el-form-item__label{
    color: #60626696;
  }
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
  .el-col-12{
    width: 49%;
  }
</style>
