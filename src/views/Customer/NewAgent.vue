<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--零售客户123-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">
        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="customerForm" :model="customerForm" :rules="customerFormrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.agentname')" prop="agentname" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerForm.agentname" placeholder="请输入供货商名" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.customertype')" prop="type" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select ref="clear" v-model="customerForm.type" :value="customerForm.type" placeholder="请选择经销商类型" style="width: 200px" @focus="getCategory">
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
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.level2')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select ref="clear2" v-model="customerForm.level" :value="customerForm.level" placeholder="请选择经销商优质级别" style="width: 200px" @focus="getCategory">
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
              </el-col>
              <el-col :span="6">
                <!--          <el-form-item :label="$t('Customer.pinyin')" style="margin-left: 18px;width: 100%;margin-bottom: 0">-->
                <!--            <el-input v-model="customerForm.pinyin" placeholder="请输入拼音缩写" clearable/>-->
                <!--          </el-form-item>-->
                <el-form-item :label="$t('Customer.source2')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select ref="clear3" v-model="customerForm.source" :value="customerForm.source" placeholder="请选择客户来源" style="width: 200px" @focus="getCategory">
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
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.discount2')" prop="discount" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerForm.discount" placeholder="请输入折扣" clearable style="width: 200px" @change="onlynumber"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.introduce2')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerForm.introduce" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          <!--// 基本信息结束-->
          </el-form>
        </div>
      </el-card>

      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">
        <!--业务信息-->
        <div ref="yewu" class="form-name">{{ $t('updates.ywxx') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="customerForm2" :model="customerForm" :rules="customerFormrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.contactname')" prop="contactname" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model.number="customerForm.contactname" placeholder="请输入联系人" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.phone2')" prop="phone" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model.number="customerForm.phone" placeholder="请输入电话号码" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('public.countyrId')" prop="countryid" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="customerForm.countryid" placeholder="请选择国家" style="width: 200px" @change ="handlechange">
                    <el-option
                      v-for="(item, index) in nations"
                      :key="index"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.provinceid')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="customerForm.provinceid" filterable placeholder="请选择省" style="width: 200px" @change="handlechange2">
                    <el-option
                      v-for="(item, index) in provinces"
                      :key="index"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.cityid')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="customerForm.cityid" filterable placeholder="请选择市" style="width: 200px">
                    <el-option
                      v-for="(item, index) in cities"
                      :key="index"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.traderid')" prop="address" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="trader" :placeholder="$t('updates.qxz')" clearable style="width: 200px" @focus="handlechoose"/>
                </el-form-item>
                <my-emp :control.sync="empcontrol" @personName="personName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.transmode')" prop="address" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select ref="clear4" v-model="customerForm.transmode" :value="customerForm.transmode" :placeholder="$t('updates.qxz')" style="width: 200px" @focus="getCategory" @change="test">
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
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.deliverymode')" prop="address" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select ref="clear5" v-model="customerForm.deliverymode" :value="customerForm.deliverymode" :placeholder="$t('updates.qxz')" style="width: 200px" @focus="getCategory" @change="test">
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
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.address2')" prop="address" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerForm.address" placeholder="请输入地址" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>

      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">
        <!-- 财务信息 -->
        <div ref="caiwu" class="form-name">{{ $t('updates.cwxx') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="customerForm3" :model="customerForm" :rules="customerFormrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.accountsDays')" prop="accountsDays" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model.number="customerForm.accountsDays" placeholder="请输入天数" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.settleMode')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select ref="clear6" v-model="customerForm.settleMode" placeholder="请选择结算方式" style="width: 200px">
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
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.currency')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="customerForm.currency" placeholder="请选择币种" style="width: 200px">
                    <el-option value="1" label="RMB" />
                    <el-option value="2" label="USD" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.invoiceType')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select ref="clear7" v-model="customerForm.invoiceType" placeholder="请选择发票类型" style="width: 200px">
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
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.payMode')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select ref="clear8" v-model="customerForm.payMode" placeholder="请选择支付方式" style="width: 200px">
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
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.openingbank')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerForm.openingbank" placeholder="请输入开户行" clearable style="width: 200px"/>
                </el-form-item>
                <my-emp :control.sync="empcontrol" @personName="personName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.accountname')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerForm.accountname" placeholder="请输入户名" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.account')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerForm.account" placeholder="请输入账号" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>

      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">
        <!-- 辅助信息 -->
        <div ref="fuzhu" class="form-name">{{ $t('updates.fzxx') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="customerForm4" :model="customerForm" :rules="customerFormrules" :inline="true" label-position="left" size="mini" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.establishmenttime')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="customerForm.establishmenttime"
                    :picker-options="pickerOptions"
                    :placeholder="$t('Hmodule.xzrq')"
                    value-format="yyyy-MM-dd"
                    type="date"
                    style="width: 200px"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.totalnumber')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model.number="customerForm.totalnumber" placeholder="请输入员工总数" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.corporaterepresentative')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerForm.corporaterepresentative" placeholder="请输入法人代表" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.businesslicense')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerForm.businesslicense" placeholder="请输入营业执照号" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>

      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;">
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
        return callback(new Error(_that.$t('prompt.sjhbnwk')))
      }
      setTimeout(() => {
        // console.log(String(value).length)
        if (String(value).length !== 11 && (this.$store.getters.useCountry === 1 || this.$store.getters.useCountry === 2)) {
          callback(new Error(_that.$t('prompt.qsrzqdsjh')))
        } else if (String(value).length !== 10 && (this.$store.getters.useCountry === 3 || this.$store.getters.useCountry === 4)) {
          callback(new Error(_that.$t('prompt.qsrzqdsjh')))
        } else if (String(value).length !== 9 && (this.$store.getters.useCountry === 5)) {
          callback(new Error(_that.$t('prompt.qsrzqdsjh')))
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
            title: 'wrong',
            message: 'wrong',
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
            title: 'wrong',
            message: 'wrong',
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
            title: 'wrong',
            message: 'wrong',
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
            title: 'wrong',
            message: 'wrong',
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
            title: 'wrong',
            message: 'wrong',
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
            title: 'wrong',
            message: 'wrong',
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
            title: 'wrong',
            message: 'wrong',
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
            title: 'wrong',
            message: 'wrong',
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
                            title: 'successful',
                            message: 'save successful',
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
                } else {
                  this.$notify.error({
                    title: 'wrong',
                    message: 'Information is incomplete',
                    offset: 100
                  })
                  return false
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
                            title: 'successful',
                            message: 'save successful',
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
                      const anchor = this.$refs.fuzhu.offsetTop
                      console.log(anchor)
                      document.documentElement.scrollTop = anchor - 100
                      return false
                    }
                  })
                } else {
                  this.$notify.error({
                    title: 'wrong',
                    message: 'Information is incomplete',
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
                title: 'wrong',
                message: 'Information is incomplete',
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
            title: 'wrong',
            message: 'Information is incomplete',
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
