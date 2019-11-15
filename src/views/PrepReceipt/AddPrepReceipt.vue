<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('PrepReceipt.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('PrepReceipt.sourceType')" prop="sourceType" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="销售订单"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('PrepReceipt.sourceNumber')" style="width: 100%;">
                  <el-input v-model="personalForm.sourceNumber" style="margin-left: 18px;width: 200px" @focus="chooseOrder"/>
                </el-form-item>
                <my-order :ordercontrol.sync="ordercontrol" @order="order"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('PrepReceipt.receiptMoney')" prop="receiptMoney" style="width: 100%;">
                  <el-input v-model="personalForm.receiptMoney" style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('PrepReceipt.receiptDate')" prop="receiptDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.receiptDate"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('PrepReceipt.receiptPersonId')" prop="receiptPersonId" style="width: 100%;">
                  <el-input v-model="receiptPersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('PrepReceipt.receiptAccount')" prop="receiptAccount" style="width: 100%;">
                  <el-input v-model="personalForm.receiptAccount" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('PrepReceipt.accountType')" prop="accountType" style="width: 100%;">
                  <el-select v-model="personalForm.accountType" style="margin-left: 18px;width: 200px" >
                    <el-option value="1" label="类型1"/>
                    <el-option value="2" label="类型2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('PrepReceipt.customerName')" prop="customerName" style="width: 100%;">
                  <el-input v-model="personalForm.customerName" style="margin-left: 18px;width: 200px" @focus="chooseCustomer"/>
                </el-form-item>
                <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('PrepReceipt.closeType')" style="width: 100%;">
                  <el-select v-model="personalForm.payMode" :disabled="IscloseT" clearable style="margin-left: 18px;width: 200px">
                    <el-option
                      v-for="(item, index) in colseTypes"
                      :value="item.id"
                      :key="index"
                      :label="item.categoryName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('PrepReceipt.currency')" style="width: 100%;">
                  <el-select v-model="personalForm.currency" :disabled="Iscurrency" style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="RMB"/>
                    <el-option value="2" label="USD"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('PrepReceipt.remark')" style="width: 100%;">
                  <el-input v-model="personalForm.remark" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { createprepReceipt } from '@/api/PrepReceipt'
import { getlocation, locationlist } from '@/api/public'
import { searchCategory } from '@/api/Supplier'
import { getdeptlist } from '@/api/BasicSettings'
import MyEmp from './components/MyEmp'
import MyRepository from './components/MyRepository'
import MyMater from './components/MyMater'
import MyCustomer from './components/MyCustomer'
import MyAgent from './components/MyAgent'
import MyOrder from './components/MyOrder'
var _that
export default {
  name: 'AddPrepReceipt',
  components: { MyOrder, MyAgent, MyCustomer, MyMater, MyRepository, MyEmp },
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (this.receiptPersonId === undefined || this.receiptPersonId === null || this.receiptPersonId === '') {
        callback(new Error('请选择收款人'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      if (this.personalForm.customerName === undefined || this.personalForm.customerName === null || this.personalForm.customerName === '') {
        callback(new Error('请选择客户'))
      } else {
        callback()
      }
    }
    const validatePass30 = (rule, value, callback) => {
      if (this.personalForm.sourceType === undefined || this.personalForm.sourceType === null || this.personalForm.sourceType === '') {
        callback(new Error('请选择源单类型'))
      } else {
        callback()
      }
    }
    return {
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      // 控制币种
      Iscurrency: false,
      // 控制结算方式
      IscloseT: false,
      // 控制销售订单
      ordercontrol: false,
      // 回显证件类型
      certificateType: '',
      // 回显市
      cityId: '',
      // 回显省
      provinceId: '',
      // 回显性别
      sexId: '',
      // 回显客户
      customerId: '',
      // 控制客户
      agentcontrol: false,
      // 货位数据
      locationlist: [],
      // 回显规格
      productType: '',
      // 回显类别
      productCategory: '',
      // 控制回收物品
      matercontrol: false,
      // 结算方式数据
      colseTypes: [],
      // 结算方式获取参数
      colseTypeparms: {
        type: 5
      },
      // 门店回显
      PrepReceiptRepositoryId: '',
      // 控制门店
      repositorycontrol: false,
      // 选择的数据
      choosedata: [],
      // 部门数据
      depts: [],
      // 收款人回显
      receiptPersonId: '',
      // 控制收款人
      stockControl: false,
      // 收入单信息数据
      // 登陆者数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        currency: '1',
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        receiptDate: null
      },
      // 收入单规则数据
      personalrules: {
        receiptPersonId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        customerName: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        receiptDate: [
          { required: true, message: '请选择收款时间', trigger: 'change' }
        ],
        sourceType: [
          { required: true, validator: validatePass30, trigger: 'change' }
        ],
        receiptMoney: [
          { required: true, message: '请输入本次预收金额', trigger: 'blur' }
        ],
        receiptAccount: [
          { required: true, message: '请输入收款账户', trigger: 'blur' }
        ],
        accountType: [
          { required: true, message: '请选择账户类型', trigger: 'change' }
        ]
      },
      // 收入单明细数据
      list2: [],
      // 收入单明细列表规则
      validRules: {
      }
    }
  },
  created() {
    this.getdatatime()
    this.getTypes()
  },
  beforeCreate() {
    _that = this
  },
  mounted() {
    this.getinformation()
  },
  methods: {
    getinformation() {
      if (this.$store.getters.empcontract) {
        this.personalForm.sourceType = '1'
        this.personalForm.sourceNumber = this.$store.getters.empcontract.number
        console.log('getempcontract', this.$store.getters.empcontract)
        this.$store.dispatch('getempcontract', '')
      }
    },
    // 选择源单
    chooseOrder() {
      this.ordercontrol = true
    },
    order(val) {
      console.log(val)
      this.personalForm.sourceNumber = val.number
      if (val.currency !== null && val.currency !== '' || val.currency !== undefined) {
        this.personalForm.currency = String(val.currency)
        this.Iscurrency = true
      }
      if (val.payMode !== null && val.payMode !== '' && val.payMode !== undefined) {
        this.personalForm.payMode = val.payMode
        this.IscloseT = true
      }
    },
    // 选择客户focus
    chooseCustomer() {
      this.agentcontrol = true
    },
    agentdata(val) {
      console.log(val)
      this.personalForm.customerName = val.agentName
      this.personalForm.agentId = val.id
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.PrepReceiptRepositoryId = val.repositoryName
      this.personalForm.PrepReceiptRepositoryId = val.id
    },
    // 批次change事件
    changelocation(event) {
      console.log(event)
      if (event === true) {
        if (this.personalForm.PrepReceiptRepositoryId === null || this.personalForm.PrepReceiptRepositoryId === '' || this.personalForm.PrepReceiptRepositoryId === undefined) {
          this.$notify.error({
            title: '错误',
            message: '请先选择门店',
            offset: 100
          })
          return false
        }
        if (this.personalForm.productCode === null || this.personalForm.productCode === '' || this.personalForm.productCode === undefined) {
          this.$notify.error({
            title: '错误',
            message: '请先选择物品',
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.PrepReceiptRepositoryId, this.personalForm).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
            } else if (res.data.data.content.length === 0) {
              locationlist(this.personalForm.PrepReceiptRepositoryId).then(res => {
                if (res.data.ret === 200) {
                  this.locationlist = res.data.data.content.list
                }
              })
            }
          }
        })
      }
    },
    // 物品focus事件
    handlemater() {
      this.matercontrol = true
    },
    mater(val) {
      console.log(val)
      this.personalForm.productCode = val.code
      this.personalForm.productType = val.typeId
      this.productType = val.productType
      this.personalForm.productCategory = val.categoryId
      this.productCategory = val.category
      this.personalForm.color = val.color
    },
    // 新增收入明细
    insertEvent(index) {
      this.$refs.editable.insertAt({ productCode: null }, index)
    },
    getTypes() {
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
      // 结算方式数据
      searchCategory(5).then(res => {
        if (res.data.ret === 200) {
          this.colseTypes = res.data.data.content.list
        }
      })
    },
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
    // 重置一下下拉
    change() {
      this.$forceUpdate()
    },
    // 收款人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 收款人回显
    stockName(val) {
      console.log(val)
      this.PrepReceiptRepositoryId = val.repositoryName
      this.personalForm.PrepReceiptRepositoryId = val.repositoryId
      this.receiptPersonId = val.personName
      this.personalForm.receiptPersonId = val.id
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        currency: '1',
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        receiptDate: null
      }
      this.receiptPersonId = null
    },
    // 保存操作
    handlesave() {
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          createprepReceipt(parms, this.personalForm).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
              this.$refs.personalForm2.clearValidate()
              this.$refs.personalForm2.resetFields()
              this.getdatatime()
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
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/PrepReceipt/AddPrepReceipt', name: 'AddPrepReceipt', fullPath: '/PrepReceipt/AddPrepReceipt', title: 'AddPrepReceipt' }
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
      font-size: 18px;
      color: #373e4f;
      margin-bottom: -20px;
      margin-top: 20px;
    }
    .container{
      margin-top: 40px;
    }
    .el-button+.el-button{
      width: 98px;
    }
  }
</style>
