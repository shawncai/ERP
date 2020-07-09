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
                <el-form-item :label="$t('CustomerSurveyReport.title')" prop="title" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CustomerSurveyReport.sourceType')" prop="sourceType" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.sourceType" style="width: 200px" @change="chooseType">
                    <el-option :label="$t('prompt.fqsq')" value="2" />
                    <el-option :label="$t('prompt.xsht')" value="3"/>

                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CustomerSurveyReport.sourceNumber')" prop="sourceNumber" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.sourceNumber" style="width: 200px" @focus="chooseData"/>
                </el-form-item>
                <my-opportunity :opportunitycontrol.sync="opportunitycontrol" @opportunityDetail="opportunityDetail" @opportunity="opportunity"/>
                <my-installmentapply :installappleycontrol.sync = "installappleycontrol" @installappleyDetail="installappleyDetail" @installappley="installappley"/>
                <my-contract :contractcontrol.sync="contractcontrol" @salecontract="salecontract"/>

              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CustomerSurveyReport.customerName')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.customerName" style="width: 200px" disabled @focus="chooseCustomer"/>
                  <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
                  <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CustomerSurveyReport.surveyDate')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.surveyDate"
                    :picker-options="pickerOptions3"
                    :disabled="true"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('CustomerSurveyReport.surveyPersonId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="surveyPersonId" style="width: 200px" disabled clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleContract.uploadAttachments')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-upload
                    ref="upload"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :on-change="handleChange"
                    :file-list="fileList3"
                    :on-success="handlepicsuccess"
                    :data="picidsData"
                    :action="actionurl"
                    class="upload-demo"
                    style="margin-left: 18px"
                  >
                    <el-button size="small" type="primary" style="width: 200px">{{ $t('newupd.mmm') }}</el-button>
                    <div slot="tip" class="el-upload__tip">{{ $t('newupd.nnn') }}</div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">

        <div ref="geren" class="form-name">{{ $t('updates.khdcbgmx') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('CustomerSurveyReport.liveStatus')" prop="title" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-radio-group v-model="personalForm.liveStatus">
                    <el-radio label="1">{{ $t('prompt.zyzf') }}</el-radio>
                    <el-radio label="2">{{ $t('prompt.zf') }}</el-radio>
                    <el-radio label="3">{{ $t('prompt.hqqyqz') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('CustomerSurveyReport.liveType')" prop="title" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-radio-group v-model="personalForm.liveType">
                    <el-radio label="1"> {{ $t('prompt.jiude') }}</el-radio>
                    <el-radio label="2"> {{ $t('prompt.xjianz') }}</el-radio>
                    <el-radio label="3"> {{ $t('prompt.gdgy') }}</el-radio>
                    <el-radio label="4"> {{ $t('prompt.xgj') }}</el-radio>
                    <el-radio label="5"> {{ $t('prompt.ptgy') }}</el-radio>
                    <el-radio label="6"> {{ $t('prompt.scljz') }}</el-radio>
                    <el-radio label="7">{{ $t('prompt.dcbzf') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('CustomerSurveyReport.personalProperty')" prop="title" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-checkbox-group v-model="personalProperty">
                    <el-checkbox label="1"> {{ $t('prompt.ds') }}</el-checkbox>
                    <el-checkbox label="2"> {{ $t('prompt.jtyy') }}</el-checkbox>
                    <el-checkbox label="3">{{ $t('prompt.bx') }}</el-checkbox>
                    <el-checkbox label="4">{{ $t('prompt.xyj') }}</el-checkbox>
                    <el-checkbox label="5">{{ $t('prompt.kt') }}</el-checkbox>
                    <el-checkbox label="6">{{ $t('prompt.dn') }}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">

        <div ref="geren" class="form-name">{{ $t('updates.zhjg') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm3" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('CustomerSurveyReport.result')" prop="title" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.result" style="width: 200px">
                    <el-option :label="$t('updates.tg')" value="1" />
                    <el-option :label="$t('updates.btg')" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">

        <div ref="geren" class="form-name">{{ $t('updates.yyfx') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm4" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('CustomerSurveyReport.reason')" prop="title" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input
                    :autosize="{ minRows: 3}"
                    v-model="personalForm.reason"
                    type="textarea"
                    style="width:300px;"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
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
import { countlist } from '@/api/public'
import { addCustomerSurveyReport } from '@/api/CustomerSurveyReport'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchSaleCategory } from '@/api/SaleCategory'
import { searchCategory } from '@/api/Supplier'
import { ratelist } from '@/api/Installmentrate'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MySupplier from './components/MySupplier'
import MyApply from './components/MyApply'
import MyPlan from './components/MyPlan'
import MyDelivery from './components/MyDelivery'
import MyOpportunity from './components/MyOpportunity'
import MyInstallmentapply from './components/MyInstallmentapply'
import MyCustomer from '../SaleOpportunity/components/MyCustomer'
import MyAgent from '../SaleOpportunity/components/MyAgent'
import MyContract from './components/MyContract'

var _that
export default {
  name: 'AddCustomerSurveyReport',
  components: { MyAgent, MyContract, MyCustomer, MyInstallmentapply, MyOpportunity, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp },
  data() {
    const validatePass4 = (rule, value, callback) => {
      if (this.personalForm.sourceNumber === undefined || this.personalForm.sourceNumber === null || this.personalForm.sourceNumber === '') {
        callback(new Error('please select sourceNumber'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      console.log(this.supplierId)
      if (this.supplierId === undefined || this.supplierId === null || this.supplierId === '') {
        callback(new Error('please select supplier'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(this.inquiryPersonId)
      if (this.inquiryPersonId === undefined || this.inquiryPersonId === null || this.inquiryPersonId === '') {
        callback(new Error('please select inquiryPerson'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(this.inquiryPersonId)
      if (this.stockPersonId === undefined || this.stockPersonId === null || this.stockPersonId === '') {
        callback(new Error('please select stockPerson'))
      } else {
        callback()
      }
    }
    return {
      pickerOptions4: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.personalForm.signDate).getTime() - 8.64e7
        }
      },
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.personalForm.installmentEndtime !== null) {
            return time.getTime() < new Date().getTime() - 8.64e7
          } else if (this.personalForm.installmentEndtime === null) {
            return time.getTime() < new Date().getTime() - 8.64e7
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.personalForm.installmentBegintime).getTime() - 8.64e7
        }
      },
      pickerOptions3: {
        disabledDate: (time) => {
          return time.getTime() >= new Date().getTime() - 8.64e7
        }
      },
      contractcontrol: false,
      picidsData: {
        type: 25
      },
      actionurl: '',
      // 附件列表
      fileList3: [],
      personalProperty: [],
      // 分期数据
      installmentCounts: [],
      // 分期期数参数
      ratelistData: {
        stat: 1,
        pagenum: 1,
        pagesize: 9999
      },
      // 控制经销商
      agentcontrol: false,
      // 开票类别数据
      invoiceTypes: [],
      // 开票类别获取参数
      invoicetypeparms: {
        type: 4,
        pagenum: 1,
        pagesize: 99999
      },
      // 结算方式数据
      colseTypes: [],
      // 结算方式获取参数
      colseTypeparms: {
        type: 3,
        pagenum: 1,
        pagesize: 99999
      },
      // 是否可以编辑分期数据
      isinstallappley: false,
      // 回显客户
      customerId: '',
      // 控制客户弹窗
      customercontrol: false,
      // 合计数据
      allNumber: '',
      allMoney: '',
      allTaxMoney: '',
      allIncludeTaxMoney: '',
      allDiscountMoney: '',
      allMoneyMoveDiscount: '',
      surveyPersonId: '',
      // 分期申请
      installappleycontrol: false,
      // 交货方式
      giveIds: [],
      // 运送方式
      transportIds: [],
      // 结算方式
      paymentIds: [],
      // 我方签约人回显
      ourContractorId: '',
      // 控制我方签约人
      deliverycontrol: false,
      // 控制源单为销售机会时
      opportunitycontrol: false,
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
      // 部门数据
      depts: [],
      // 销售门店
      saleRepositoryId: this.$store.getters.repositoryName,
      // 业务员回显
      salePersonId: this.$store.getters.name,
      // 控制业务员
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
        personalProperty: [],
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        salePersonId: this.$store.getters.userId,
        isVat: 1,
        installmentEndtime: null,
        installmentBegintime: null,
        notaryDate: null,
        deptId: this.$store.getters.deptId,
        saleRepositoryId: this.$store.getters.repositoryId,
        customerType: '2',
        signDate: null,
        sourceType: '2',
        sourceNumber: '',
        customerName: '',
        surveyDate: '',
        picids: ''
      },
      needarr: [],
      // 采购申请单规则数据
      personalrules: {
        liveStatus: [
          { required: true, message: 'please select liveStatus', trigger: 'change' }
        ],
        liveType: [
          { required: true, message: 'please select liveType', trigger: 'change' }
        ],
        sourceNumber: [
          { required: true, validator: validatePass4, trigger: 'change' }
        ],
        customerType: [
          { required: true, message: 'please select customerType', trigger: 'change' }
        ],
        supplierId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        inquiryPersonId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        stockPersonId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        inquiryDate: [
          { required: true, message: 'please select inquiryDate', trigger: 'change' }
        ],
        deptId: [
          { required: true, message: 'please select dept', trigger: 'change' }
        ],
        sourceType: [
          { required: true, message: 'please select sourceType', trigger: 'change' }
        ],
        stockTypeId: [
          { required: true, message: 'please select stockType', trigger: 'change' }
        ]
      },
      // 采购申请单明细数据
      list2: [],
      // 采购申请单明细列表规则
      validRules: {
      },
      receiptVisible2: false,
      list111: [],
      // 批量操作
      moreaction: []
    }
  },
  created() {
    this.getTypes()
    this.getways()
    this.getratelist()
    this.getdatatime()
    this.getuploadurl()
  },
  activated() {
    this.getinformation()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handlepicsuccess(response) {
      console.log(response.data.content.picId)
      const arr = []
      arr.push(response.data.content.picId)
      this.needarr = arr.join(',')
    },
    getuploadurl() {
      if (this.$store.getters.useCountry === 1 || this.$store.getters.useCountry === '1') {
        this.actionurl = process.env.BASE_API + '/erp/upload/uploadpic'
      }
      if (this.$store.getters.useCountry === 2 || this.$store.getters.useCountry === '2') {
        this.actionurl = process.env.BASE_API + '/philippines/upload/uploadpic'
      }
      console.log(this.actionurl)
    },
    // 上传附件
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-1)
    },
    // 获取默认信息(分期列表)
    getinformation() {
      if (this.$store.getters.empcontract) {
        this.personalForm.sourceNumber = this.$store.getters.empcontract[0].applyNumber
        this.personalForm.customerName = this.$store.getters.empcontract[0].applyPersonName
        this.personalForm.surveyPersonId = this.$store.getters.empcontract[0].inquirePersonId
        this.surveyPersonId = this.$store.getters.empcontract[0].inquirePersonName
      }
      this.$store.dispatch('getempcontract', '')
    },
    checkStock(row) {
      console.log('this.moreaction.length', this.moreaction.length)
      if (this.moreaction.length > 1 || this.moreaction.length === 0) {
        this.$message.error('please select single product')
      } else {
        countlist(this.$store.getters.repositoryId, this.$store.getters.regionId, this.moreaction[0].productCode).then(res => {
          console.log(res)
          if (res.data.ret === 200) {
            console.log('res.data.data.content', res.data.data.content.list)
            this.list111 = res.data.data.content.list
            this.receiptVisible2 = true
          } else {
            this.$notify.error({
              title: 'wrong',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      }
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
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
      this.personalForm.signDate = currentdate
      this.personalForm.surveyDate = currentdate
    },
    change() {
      this.$forceUpdate()
    },
    // 获取分期期数
    getratelist() {
      ratelist(this.ratelistData).then(res => {
        if (res.data.ret === 200) {
          this.installmentCounts = res.data.data.content.list
        }
      })
    },
    // 选择客户类型时清理客户名称
    clearCustomer() {
      this.personalForm.customerId = ''
      this.customerId = ''
    },
    // 选择客户focus
    chooseCustomer() {
      this.$forceUpdate()
      if (this.personalForm.customerType === '1') {
        this.agentcontrol = true
        this.$forceUpdate()
      } else if (this.personalForm.customerType === '2') {
        this.customercontrol = true
        this.$forceUpdate()
      }
    },
    customerdata(val) {
      this.personalForm.customerId = val.id
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.phoneNumber
    },
    agentdata(val) {
      console.log(val)
      this.personalForm.customerId = val.id
      this.customerId = val.agentName
      this.personalForm.customerPhone = val.phone
    },
    clearfinal() {
      this.personalForm.installmentEndtime = null
    },
    chooseData() {
      if (this.personalForm.sourceType === '3') {
        this.contractcontrol = true
      } else if (this.personalForm.sourceType === '2') {
        this.installappleycontrol = true
      }
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
              return (prev + curr).toFixed(6)
            } else {
              return (prev).toFixed(6)
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
      sums[8] = ''
      sums[9] = ''
      sums[10] = ''
      sums[14] = ''
      sums[15] = ''
      sums[17] = ''
      sums[18] = ''
      sums[19] = ''
      this.allNumber = sums[7]
      this.allMoney = sums[11]
      this.allTaxMoney = sums[13]
      this.allIncludeTaxMoney = sums[12]
      this.allDiscountMoney = sums[16]
      this.allMoneyMoveDiscount = sums[12] - sums[16]
      return sums
    },
    getways() {
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
      // 结算方式
      searchCategory(5).then(res => {
        if (res.data.ret === 200) {
          this.paymentIds = res.data.data.content.list
        }
      })
    },
    // 计算成本金额
    getcostMoney(row) {
      row.costMoney = (row.costPrice * row.quantity).toFixed(6)
      return row.costMoney
    },
    // 计算含税金额
    getincludeTaxMoney(row) {
      row.includeTaxMoney = (row.taxprice * row.quantity).toFixed(6)
      row.discountMoney = (row.taxprice * row.quantity * (1 - row.discount / 100)).toFixed(6)
      return row.includeTaxMoney
    },
    // 通过税率计算含税价
    gettaxRate(row) {
      if (row.taxprice !== 0) {
        row.taxprice = (row.salePrice * (1 + row.taxRate / 100)).toFixed(6)
      }
    },
    // 计算税额
    getTaxMoney2(row) {
      row.taxMoney = (row.salePrice * row.taxRate / 100 * row.quantity).toFixed(6)
      return row.taxMoney
    },
    // 通过折扣计算折扣额
    getdiscountRate(row) {
      if (row.discount === 0) {
        row.discountMoney = row.taxprice * row.quantity
      } else {
        row.discountMoney = (row.taxprice * row.quantity * (1 - row.discount / 100)).toFixed(6)
      }
    },
    // 通过折扣额计算折扣
    getdiscountMoney(row) {
      console.log(row)
      if (row.taxprice !== 0 && row.quantity !== 0 && row.discountMoney !== 0) {
        row.discount = ((1 - row.discountMoney / row.taxprice / row.quantity) * 100).toFixed(6)
      }
    },
    // 计算金额
    getMoney(row) {
      row.money = (row.quantity * row.salePrice).toFixed(6)
      return row.money
    },
    // 含税价
    gettaxprice(row) {
      row.taxprice = (row.salePrice * (1 + row.taxRate / 100)).toFixed(6)
      return row.taxprice
    },
    getincludeTaxCostMoney(row) {
      row.includeTaxCostMoney = Number(row.salePrice * row.quantity) + Number(row.taxMoney)
      return row.includeTaxCostMoney
    },
    // 选择源单类型事件
    chooseType() {
      console.log(this.personalForm.sourceType)
      if (this.personalForm.sourceType === '1') {
        this.$refs.editable.clear()
        this.personalForm.sourceNumber = ''
        this.personalForm.installmentCount = ''
        this.personalForm.customerName = ''
        this.isinstallappley = true
      } else if (this.personalForm.sourceType === '2') {
        this.$refs.editable.clear()
        this.personalForm.sourceNumber = ''
        this.personalForm.installmentCount = ''
        this.personalForm.customerName = ''

        this.isinstallappley = false
      }
    },
    // 从源单中添加商品
    handleAddSouce() {
      if (this.personalForm.sourceType === '1') {
        this.applycontrol = true
      } else if (this.personalForm.sourceType === '2') {
        this.plancontrol = true
      } else if (this.personalForm.sourceType === '3') {
        this.inquirycontrol = true
      }
    },
    // 从销售机会过来的源单数据
    opportunityDetail(val) {
      console.log(val)
      this.$refs.editable.clear()
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
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
    opportunity(val) {
      this.personalForm.sourceNumber = val.opportunityNumber
      this.personalForm.salePersonId = val.handlePersonId
      this.salePersonId = val.handlePersonName
    },
    installappleyDetail(val) {
      console.log(val)
      this.$refs.editable.clear()
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
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
    salecontract(val) {
      console.log('val', val)
      this.personalForm.sourceNumber = val.number
      this.personalForm.customerName = val.customerName
      this.personalForm.surveyPersonId = val.inquirePersonId
      this.surveyPersonId = val.inquirePersonName
    },
    installappley(val) {
      console.log('val', val)
      this.personalForm.sourceNumber = val.applyNumber
      this.personalForm.customerName = val.applyPersonName
      this.personalForm.surveyPersonId = val.inquirePersonId
      this.surveyPersonId = val.inquirePersonName
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
      // 开票类型数据
      searchSaleCategory(this.invoicetypeparms).then(res => {
        if (res.data.ret === 200) {
          this.invoiceTypes = res.data.data.content.list
        }
      })
      // 结算方式数据
      searchSaleCategory(this.colseTypeparms).then(res => {
        if (res.data.ret === 200) {
          this.colseTypes = res.data.data.content.list
        }
      })
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
    // 业务员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 业务员回显
    stockName(val) {
      console.log(val)
      this.salePersonId = val.personName
      this.personalForm.salePersonId = val.id
      this.personalForm.deptId = val.deptId
      this.personalForm.saleRepositoryId = val.repositoryId
      this.saleRepositoryId = val.repositoryName
    },
    // 我方签约人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.ourContractorId = val.personName
      this.personalForm.ourContractorId = val.id
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
        salePersonId: this.$store.getters.userId,
        isVat: 1,
        installmentEndtime: null,
        installmentBegintime: null,
        notaryDate: null,
        surveyPersonId: null,
        deptId: this.$store.getters.deptId,
        customerType: '2',
        sourceNumber: null,
        customerId: null,
        saleRepositoryId: this.$store.getters.repositoryId,
        sourceType: '2'
      }
      this.needarr = []
      this.personalProperty = []
      this.supplierId = null
      this.surveyPersonId = null
      this.stockPersonId = null
      this.ourContractorId = null
      this.customerId = null
      this.isinstallappley = false
    },
    // 深拷贝
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    // 保存操作
    handlesave() {
      this.personalForm.personalProperty = this.personalProperty.join(',')
      // const b = abc.split(',')
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          // liveStatus
          if (this.personalForm.liveStatus === '' || this.personalForm.liveStatus === undefined || this.personalForm.liveStatus === null) {
            this.$notify.error({
              title: 'wrong',
              message: 'please select liveStatus',
              offset: 100
            })
            return false
          }
          if (this.personalForm.liveType === '' || this.personalForm.liveType === undefined || this.personalForm.liveType === null) {
            this.$notify.error({
              title: 'wrong',
              message: 'please select liveType',
              offset: 100
            })
            return false
          }
          const Data = this.personalForm
          for (const key in Data) {
            if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
              delete Data[key]
            }
            if (key === 'judgeStat') {
              delete Data[key]
            }
          }
          const parms = JSON.stringify(Data)
          addCustomerSurveyReport(parms, this.needarr).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: 'successful',
                message: 'save successful',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
              this.$refs.personalForm2.clearValidate()
              this.$refs.personalForm2.resetFields()
              this.$refs.upload.clearFiles()
            } else {
              this.$notify.error({
                title: 'wrong',
                message: res.data.msg,
                offset: 100
              })
            }
          })
        }
      })
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/CustomerSurveyReport/AddCustomerSurveyReport', name: 'AddCustomerSurveyReport', fullPath: '/CustomerSurveyReport/AddCustomerSurveyReport', title: 'AddCustomerSurveyReport' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    }
  }
}
</script>

<style rel="stylesheet/css" scoped>
  .ERP-container >>> .el-input-number.is-without-controls .el-input__inner{
    text-align: left;
  }
  .ERP-container{
    margin-right: 0;
  }
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

</style>
