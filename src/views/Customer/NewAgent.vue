<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--零售客户-->
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form ref="customerForm" :model="customerForm" :rules="customerFormrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('Customer.agentname')" prop="agentname" style="width: 40%;margin-top:1%">
            <el-input v-model="customerForm.agentname" placeholder="请输入供货商名" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Customer.customertype')" prop="type" style="width: 40%;margin-top: 1%">
            <el-select ref="clear" v-model="customerForm.type" :value="customerForm.type" placeholder="请选择经销商类型" style="width: 100%;" @focus="getCategory">
              <el-option v-show="false" label="" value=""/>
              <el-option
                v-for="(item, index) in customertypes"
                :key="index"
                :value="item.id"
                :label="item.categoryName"/>
              <template>
                <el-button v-if="isshow" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat">{{ $t('updates.create') }}</el-button>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Customer.level2')" style="width: 40%;margin-top: 1%">
            <el-select ref="clear2" v-model="customerForm.level" :value="customerForm.level" placeholder="请选择经销商优质级别" style="width: 100%;" @focus="getCategory">
              <el-option v-show="false" label="" value=""/>
              <el-option
                v-for="(item, index) in levels"
                :key="index"
                :value="item.id"
                :label="item.categoryName"/>
              <template>
                <el-button v-if="isshow" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat2">{{ $t('updates.create') }}</el-button>
              </template>
            </el-select>
          </el-form-item>
          <!--          <el-form-item :label="$t('Customer.pinyin')" style="width: 40%;margin-top: 1%">-->
          <!--            <el-input v-model="customerForm.pinyin" placeholder="请输入拼音缩写" clearable/>-->
          <!--          </el-form-item>-->
          <el-form-item :label="$t('Customer.source2')" style="width: 40%;margin-top: 1%">
            <el-select ref="clear3" v-model="customerForm.source" :value="customerForm.source" placeholder="请选择客户来源" style="width: 100%;" @focus="getCategory">
              <el-option v-show="false" label="" value=""/>
              <el-option
                v-for="(item, index) in sources"
                :key="index"
                :value="item.id"
                :label="item.categoryName"/>
              <template>
                <el-button v-if="isshow" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat3">{{ $t('updates.create') }}</el-button>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Customer.discount2')" prop="discount" style="width: 40%;margin-top: 1%">
            <el-input v-model="customerForm.discount" placeholder="请输入折扣" clearable @change="onlynumber"/>
          </el-form-item>
          <el-form-item :label="$t('Customer.introduce2')" style="width: 40%">
            <el-input v-model="customerForm.introduce" type="textarea" clearable/>
          </el-form-item>
          <!--// 基本信息结束-->
        </el-form>
      </div>
      <!--业务信息-->
      <h2 ref="yewu" class="form-name">{{ $t('updates.ywxx') }}</h2>
      <div class="container">
        <el-form ref="customerForm2" :model="customerForm" :rules="customerFormrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('Customer.contactname')" prop="contactname" style="width: 40%">
            <el-input v-model.number="customerForm.contactname" placeholder="请输入联系人" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Customer.phone2')" prop="phone" style="width: 40%">
            <el-input v-model.number="customerForm.phone" placeholder="请输入电话号码" clearable/>
          </el-form-item>
          <el-form-item :label="$t('public.countyrId')" prop="countryid" style="width: 40%;margin-top: 1%">
            <el-select v-model="customerForm.countryid" placeholder="请选择国家" style="width: 100%;" @change ="handlechange">
              <el-option
                v-for="(item, index) in nations"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Customer.provinceid')" style="width: 40%;margin-top: 1%">
            <el-select v-model="customerForm.provinceid" filterable placeholder="请选择省" style="width: 100%;" @change="handlechange2">
              <el-option
                v-for="(item, index) in provinces"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Customer.cityid')" style="width: 40%;margin-top: 1%">
            <el-select v-model="customerForm.cityid" filterable placeholder="请选择市" style="width: 100%;">
              <el-option
                v-for="(item, index) in cities"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Customer.traderid')" prop="address" style="width: 40%;margin-top:1%">
            <el-input v-model="trader" :placeholder="$t('updates.qxz')" clearable @focus="handlechoose"/>
          </el-form-item>
          <my-emp :control.sync="empcontrol" @personName="personName"/>
          <el-form-item :label="$t('Customer.transmode')" prop="address" style="width: 40%;margin-top:1%">
            <el-select ref="clear4" v-model="customerForm.transmode" :value="customerForm.transmode" :placeholder="$t('updates.qxz')" style="width: 100%;" @focus="getCategory" @change="test">
              <el-option v-show="false" label="" value="" />
              <el-option
                v-for="(item, index) in transmodes"
                :key="index"
                :value="item.id"
                :label="item.categoryName"/>
              <template>
                <el-button v-if="isshow2" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat4">{{ $t('updates.create') }}</el-button>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Customer.deliverymode')" prop="address" style="width: 40%;margin-top:1%">
            <el-select ref="clear5" v-model="customerForm.deliverymode" :value="customerForm.deliverymode" :placeholder="$t('updates.qxz')" style="width: 100%;" @focus="getCategory" @change="test">
              <el-option v-show="false" label="" value=""/>
              <el-option
                v-for="(item, index) in deliverymodes"
                :key="index"
                :value="item.id"
                :label="item.categoryName"/>
              <template>
                <el-button v-if="isshow2" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat5">{{ $t('updates.create') }}</el-button>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Customer.address2')" prop="address" style="width: 40%;margin-top:1%">
            <el-input v-model="customerForm.address" placeholder="请输入地址" clearable/>
          </el-form-item>
        </el-form>
      </div>
      <!-- 财务信息 -->
      <h2 ref="caiwu" class="form-name">{{ $t('updates.cwxx') }}</h2>
      <div class="container">
        <el-form ref="customerForm3" :model="customerForm" :rules="customerFormrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('Customer.accountsDays')" prop="accountsDays" style="width: 40%">
            <el-input v-model.number="customerForm.accountsDays" placeholder="请输入天数" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Customer.settleMode')" style="width: 40%">
            <el-select ref="clear6" v-model="customerForm.settleMode" placeholder="请选择结算方式" style="width: 100%;">
              <el-option v-show="false" label="" value=""/>
              <el-option
                v-for="(item, index) in settleMode"
                :key="index"
                :label="item.categoryName"
                :value="item.id"/>
              <template>
                <el-button v-if="isshow2" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat6">{{ $t('updates.create') }}</el-button>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Customer.currency')" style="width: 40%;margin-top: 1%">
            <el-select v-model="customerForm.currency" placeholder="请选择币种" style="width: 100%;">
              <el-option value="1" label="RMB" />
              <el-option value="2" label="USD" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Customer.invoiceType')" style="width: 40%;margin-top: 1%">
            <el-select ref="clear7" v-model="customerForm.invoiceType" placeholder="请选择发票类型" style="width: 100%;">
              <el-option v-show="false" label="" value=""/>
              <el-option
                v-for="(item, index) in invoiceTypes"
                :key="index"
                :label="item.categoryName"
                :value="item.id"/>
              <template>
                <el-button v-if="isshow3" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat7">{{ $t('updates.create') }}</el-button>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Customer.payMode')" style="width: 40%;margin-top: 1%">
            <el-select ref="clear8" v-model="customerForm.payMode" placeholder="请选择支付方式" style="width: 100%;">
              <el-option v-show="false" label="" value=""/>
              <el-option
                v-for="(item, index) in payMode"
                :key="index"
                :label="item.categoryName"
                :value="item.id"/>
              <template>
                <el-button v-if="isshow2" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat8">{{ $t('updates.create') }}</el-button>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Customer.openingbank')" style="width: 40%;margin-top:1%">
            <el-input v-model="customerForm.openingbank" placeholder="请输入开户行" clearable />
          </el-form-item>
          <my-emp :control.sync="empcontrol" @personName="personName"/>
          <el-form-item :label="$t('Customer.accountname')" style="width: 40%;margin-top:1%">
            <el-input v-model="customerForm.accountname" placeholder="请输入户名" clearable />
          </el-form-item>
          <el-form-item :label="$t('Customer.account')" style="width: 40%;margin-top:1%">
            <el-input v-model="customerForm.account" placeholder="请输入账号" clearable/>
          </el-form-item>
        </el-form>
      </div>
      <!-- 辅助信息 -->
      <h2 ref="fuzhu" class="form-name">{{ $t('updates.fzxx') }}</h2>
      <div class="container">
        <el-form ref="customerForm4" :model="customerForm" :rules="customerFormrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('Customer.establishmenttime')" style="width: 40%">
            <el-date-picker
              v-model="customerForm.establishmenttime"
              :picker-options="pickerOptions"
              :placeholder="$t('Hmodule.xzrq')"
              value-format="yyyy-MM-dd"
              type="date"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item :label="$t('Customer.totalnumber')" style="width: 40%">
            <el-input v-model.number="customerForm.totalnumber" placeholder="请输入员工总数" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Customer.corporaterepresentative')" style="width: 40%;margin-top: 1%">
            <el-input v-model="customerForm.corporaterepresentative" placeholder="请输入法人代表" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Customer.businesslicense')" style="width: 40%;margin-top:1%">
            <el-input v-model="customerForm.businesslicense" placeholder="请输入营业执照号" clearable/>
          </el-form-item>
        </el-form>
      </div>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click v-permission="['1-14-17-1']" type="primary" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button v-permission="['1-14-17-1']" type="success" @click="handleentry()">{{ $t('updates.jxlr') }}</el-button>
        <el-button v-permission="['1-14-17-1']" type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { searchSaleCategory } from '@/api/SaleCategory'
import { getcountrylist, getprovincelist, getcitylist } from '@/api/public'
import { searchCusCategory, addagent } from '@/api/Customer'
import { searchCategory } from '@/api/Supplier'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyEmp from './components/MyEmp'
var _that
export default {
  name: 'NewAgent',
  directives: { permission, permission2 },
  components: { MyEmp },
  data() {
    var checkphone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      // 财务信息
      settleMode: [],
      invoiceType: [],
      payMode: [],
      // 开票类别数据
      invoiceTypes: [],
      // 开票类别获取参数
      invoicetypeparms: {
        type: 4,
        pagenum: 1,
        pagesize: 99999
      },
      // 是否显示添加
      isshow: false,
      isshow2: false,
      isshow3: false,
      // 分管业务员回显
      trader: '',
      // 分管业务员控制
      empcontrol: false,
      // 国家列表
      nations: [],
      // 省列表
      provinces: [],
      // 城市列表
      cities: [],
      // 门店列表
      repositories: [],
      // 客户信息数据
      customerForm: {
        agentname: '',
        phone: '',
        type: '',
        pinyin: '',
        level: '',
        source: '',
        discount: '',
        countryid: this.$store.getters.countryId,
        provinceid: '',
        cityid: '',
        introduce: '',
        address: '',
        contactname: '',
        traderid: '',
        transmode: '',
        deliverymode: '',
        createid: '',
        newold: ''
      },
      // 客户信息规则数据
      customerFormrules: {
        phone: [
          { required: true, validator: checkphone, trigger: 'change' }
        ],
        agentname: [
          { required: true, message: '请输入客户名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择客户类型', trigger: 'change' }
        ],
        countryid: [
          { required: true, message: '请选择国家', trigger: 'change' }
        ],
        contactname: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        accountsDays: [
          { required: true, message: '请输入天数', trigger: 'change' }
        ]
        // discount: [
        //   { validator: checkdiscount, trigger: 'change' }
        // ]
      },
      // 所有客户类型数据
      // 发送参数
      customertypes: [],
      customertyp: 4,
      // 优质级别类型所有数据
      // 发送参数
      levels: [],
      levelstype: 5,
      // 客户来源所有数据
      // 发送参数
      sources: [],
      sourcestype: 7,
      // 运送方式
      transmodes: [],
      transmodedata: 6,
      // 交货方式
      deliverymodes: [],
      deliverymodedata: 8
    }
  },
  created() {
    this.getnationlist()
    this.getCategory()
    this.jungleshow()
    this.getTypes()
    this.handlechange(this.$store.getters.countryId)
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 正则限制
    onlynumber() {
      console.log('123')
      // 得到第一个字符是否为负号
      var t = this.customerForm.discount.charAt(0)
      // 先把非数字的都替换掉，除了数字和.
      this.customerForm.discount = this.customerForm.discount.replace(/[^\d\.\%]/g, '')
      // 必须保证第一个为数字而不是.
      this.customerForm.discount = this.customerForm.discount.replace(/^\./g, '')
      // 保证只有出现一个.而没有多个.
      this.customerForm.discount = this.customerForm.discount.replace(/\.{2,}/g, '.')
      // 保证.只出现一次，而不能出现两次以上
      this.customerForm.discount = this.customerForm.discount.replace('.', '$#$').replace(/\./g, '').replace(
        '$#$', '.')
      // 如果第一位是负号，则允许添加
      if (t === '-') {
        this.customerForm.discount = '-' + this.customerForm.discount
      }
    },
    // 获取结算，支付方式
    getTypes() {
      searchSaleCategory(this.invoicetypeparms).then(res => {
        if (res.data.ret === 200) {
          this.invoiceTypes = res.data.data.content.list
        }
      })
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.payMode = res.data.data.content.list
        }
      })
      // 结算方式数据
      searchCategory(5).then(res => {
        if (res.data.ret === 200) {
          this.settleMode = res.data.data.content.list
        }
      })
    },
    test() {
      console.log('运送id', this.customerForm.transmode)
      console.log('交货方式', this.customerForm.deliverymode)
    },
    jungleshow() {
      const roles = this.$store.getters.roles
      this.isshow = roles.includes('1-14-21-1')
      this.isshow2 = roles.includes('1-22-28-1')
      this.isshow3 = roles.includes('54-83-1')
    },
    checkPermission,
    // 获取类型
    getCategory() {
      // 获取运送方式
      searchCategory(3).then(res => {
        if (res.data.ret === 200) {
          this.transmodes = res.data.data.content.list
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
      // 获取交货方式
      searchCategory(2).then(res => {
        if (res.data.ret === 200) {
          this.deliverymodes = res.data.data.content.list
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
      // 获取客户类型
      searchCusCategory(this.customertyp).then(res => {
        if (res.data.ret === 200) {
          this.customertypes = res.data.data.content.list
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
      // 获取经销商优质级别
      searchCusCategory(this.levelstype).then(res => {
        if (res.data.ret === 200) {
          this.levels = res.data.data.content.list
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
      // 获取经销商来源
      searchCusCategory(this.sourcestype).then(res => {
        if (res.data.ret === 200) {
          this.sources = res.data.data.content.list
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    // 国籍列表
    getnationlist() {
      getcountrylist().then(res => {
        if (res.data.ret === 200) {
          this.nations = res.data.data.content
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    // 根据国家选择省
    handlechange(val) {
      getprovincelist(val).then(res => {
        if (res.data.ret === 200) {
          this.provinces = res.data.data.content
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
      this.customerForm.provinceid = ''
      this.customerForm.cityid = ''
      this.cities = []
    },
    // 根据省选择市
    handlechange2(val) {
      getcitylist(val).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.cities = res.data.data.content
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
      this.customerForm.cityid = ''
    },
    // 员工输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 员工列表返回数据
    personName(val) {
      console.log(val)
      this.trader = val.personName
      this.customerForm.traderid = val.id
    },
    // 保存操作
    handlesave() {
      console.log('保存的数据', this.customerForm)
      this.$refs.customerForm.validate((valid) => {
        if (valid) {
          this.$refs.customerForm2.validate((valid) => {
            if (valid) {
              this.$refs.customerForm3.validate((valid) => {
                if (valid) {
                  this.$refs.customerForm4.validate((valid) => {
                    if (valid) {
                      addagent(this.customerForm).then(res => {
                        console.log(res)
                        if (res.data.ret === 200) {
                          this.$notify({
                            title: '成功',
                            message: '保存成功',
                            type: 'success',
                            offset: 100
                          })
                          this.restAllForm()
                          this.$refs.customerForm.clearValidate()
                          this.$refs.customerForm.resetFields()
                          this.$refs.customerForm2.clearValidate()
                          this.$refs.customerForm2.resetFields()
                          this.$refs.customerForm3.clearValidate()
                          this.$refs.customerForm3.resetFields()
                          this.$refs.customerForm4.clearValidate()
                          this.$refs.customerForm4.resetFields()
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
                } else {
                  this.$notify.error({
                    title: '错误',
                    message: '信息未填完整',
                    offset: 100
                  })
                  return false
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
    // 清空记录
    restAllForm() {
      this.customerForm = {
        agentname: '',
        phone: '',
        type: '',
        pinyin: '',
        level: '',
        source: '',
        discount: '',
        countryid: this.$store.getters.countryId,
        provinceid: '',
        cityid: '',
        introduce: '',
        address: '',
        contactname: '',
        traderid: '',
        transmode: '',
        deliverymode: '',
        createid: '',
        newold: ''
      }
      this.trader = ''
    },
    // 继续录入
    handleentry() {
      this.$refs.customerForm.validate((valid) => {
        if (valid) {
          this.$refs.customerForm2.validate((valid) => {
            if (valid) {
              this.$refs.customerForm3.validate((valid) => {
                if (valid) {
                  this.$refs.customerForm4.validate((valid) => {
                    if (valid) {
                      addagent(this.customerForm).then(res => {
                        console.log(res)
                        if (res.data.ret === 200) {
                          this.$notify({
                            title: '成功',
                            message: '保存成功',
                            type: 'success',
                            offset: 100
                          })
                          this.restAllForm()
                          this.$refs.customerForm.clearValidate()
                          this.$refs.customerForm.resetFields()
                          this.$refs.customerForm2.clearValidate()
                          this.$refs.customerForm2.resetFields()
                          this.$refs.customerForm3.clearValidate()
                          this.$refs.customerForm3.resetFields()
                          this.$refs.customerForm4.clearValidate()
                          this.$refs.customerForm4.resetFields()
                          const anchor = this.$refs.geren.offsetTop
                          console.log(anchor)
                          document.documentElement.scrollTop = anchor - 100
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
                      const anchor = this.$refs.fuzhu.offsetTop
                      console.log(anchor)
                      document.documentElement.scrollTop = anchor - 100
                      return false
                    }
                  })
                } else {
                  this.$notify.error({
                    title: '错误',
                    message: '信息未填完整',
                    offset: 100
                  })
                  const anchor = this.$refs.caiwu.offsetTop
                  console.log(anchor)
                  document.documentElement.scrollTop = anchor - 100
                  return false
                }
              })
            } else {
              this.$notify.error({
                title: '错误',
                message: '信息未填完整',
                offset: 100
              })
              const anchor = this.$refs.yewu.offsetTop
              console.log(anchor)
              document.documentElement.scrollTop = anchor - 100
              return false
            }
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '信息未填完整',
            offset: 100
          })
          const anchor = this.$refs.geren.offsetTop
          console.log(anchor)
          document.documentElement.scrollTop = anchor - 100
          return false
        }
      })
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Customer/NewAgent', name: 'NewAgent', fullPath: '/Customer/NewAgent', title: 'NewAgent' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    // 触发下拉框blur
    go_creat() {
      this.$router.push('/Customer/CustomerCategory')
      this.$refs.clear.blur()
    },
    go_creat2() {
      this.$router.push('/Customer/CustomerCategory')
      this.$refs.clear2.blur()
    },
    go_creat3() {
      this.$router.push('/Customer/CustomerCategory')
      this.$refs.clear3.blur()
    },
    go_creat4() {
      this.$router.push('/Supplier/SupplierCategory')
      this.$refs.clear4.blur()
    },
    go_creat5() {
      this.$router.push('/Supplier/SupplierCategory')
      this.$refs.clear5.blur()
    },
    go_creat6() {
      this.$router.push('/Supplier/SupplierCategory')
      this.$refs.clear6.blur()
    },
    go_creat7() {
      this.$router.push('/SaleCategory/SaleCategoryList')
      this.$refs.clear7.blur()
    },
    go_creat8() {
      this.$router.push('/Supplier/SupplierCategory')
      this.$refs.clear8.blur()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ERP-container{
    margin:0px 30px;
    .form-name{
      font-size: 18px;
      color: #373e4f;
      margin-bottom: -20px;
      margin-top: 30px;
    }
    .container{
      margin-top: 2%;
      border: 1px solid #eceff6;
    }
  }
</style>
