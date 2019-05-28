<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--零售客户-->
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form ref="customerForm" :model="customerForm" :rules="customerFormrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('Customer.agentname')" prop="agentname" style="width: 40%;margin-top:1%">
            <el-input v-model="customerForm.agentname" placeholder="请输入供货商名" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Customer.customertype')" prop="type" style="width: 40%;margin-top: 1%">
            <el-select v-model="customerForm.type" :value="customerForm.type" placeholder="请选择经销商类型" style="width: 100%;" @focus="getCategory">
              <el-option
                v-for="(item, index) in customertypes"
                :key="index"
                :value="item.id"
                :label="item.categoryName"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Customer.level2')" style="width: 40%;margin-top: 1%">
            <el-select v-model="customerForm.level" :value="customerForm.level" placeholder="请选择经销商优质级别" style="width: 100%;" @focus="getCategory">
              <el-option
                v-for="(item, index) in levels"
                :key="index"
                :value="item.id"
                :label="item.categoryName"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Customer.pinyin')" style="width: 40%;margin-top: 1%">
            <el-input v-model="customerForm.pinyin" placeholder="请输入拼音缩写" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Customer.source2')" style="width: 40%;margin-top: 1%">
            <el-select v-model="customerForm.source" :value="customerForm.source" placeholder="请选择客户来源" style="width: 100%;" @focus="getCategory">
              <el-option
                v-for="(item, index) in sources"
                :key="index"
                :value="item.id"
                :label="item.categoryName"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Customer.discount')" style="width: 40%;margin-top: 1%">
            <el-input v-model.number="customerForm.discount" placeholder="请输入折扣" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Customer.introduce')" style="width: 40%">
            <el-input v-model="customerForm.introduce" type="textarea" clearable/>
          </el-form-item>
          <!--// 基本信息结束-->
        </el-form>
      </div>
      <!--业务信息-->
      <h2 class="form-name">业务信息</h2>
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
            <el-select v-model="customerForm.provinceid" placeholder="请选择省" style="width: 100%;" @change="handlechange2">
              <el-option
                v-for="(item, index) in provinces"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Customer.cityid')" style="width: 40%;margin-top: 1%">
            <el-select v-model="customerForm.cityid" placeholder="请选择市" style="width: 100%;">
              <el-option
                v-for="(item, index) in cities"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Customer.traderid')" prop="address" style="width: 40%;margin-top:1%">
            <el-input v-model="trader" placeholder="请选择" clearable @focus="handlechoose"/>
          </el-form-item>
          <my-emp :control.sync="empcontrol" @personName="personName"/>
          <el-form-item :label="$t('Customer.transmode')" prop="address" style="width: 40%;margin-top:1%">
            <el-select v-model="customerForm.transmode" :value="customerForm.transmode" placeholder="请选择" style="width: 100%;" @focus="getCategory">
              <el-option
                v-for="(item, index) in transmodes"
                :key="index"
                :value="item.id"
                :label="item.categoryName"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Customer.deliverymode')" prop="address" style="width: 40%;margin-top:1%">
            <el-select v-model="customerForm.deliverymode" :value="customerForm.deliverymode" placeholder="请选择" style="width: 100%;" @focus="getCategory">
              <el-option
                v-for="(item, index) in deliverymodes"
                :key="index"
                :value="item.id"
                :label="item.categoryName"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Customer.address2')" prop="address" style="width: 40%;margin-top:1%">
            <el-input v-model="customerForm.address" placeholder="请输入地址" clearable/>
          </el-form-item>
        </el-form>
      </div>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-permission="['1-14-17-1']" type="primary" @click="handlesave()">保存</el-button>
        <el-button v-permission="['1-14-17-1']" type="success" @click="handleentry()">继续录入</el-button>
        <el-button v-permission="['1-14-17-1']" type="danger" @click="handlecancel()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getcountrylist, getprovincelist, getcitylist } from '@/api/public'
import { searchCusCategory, addagent } from '@/api/Customer'
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyEmp from './components/MyEmp'
export default {
  name: 'NewAgent',
  directives: { permission },
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
        countryid: '',
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
        ]
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
  },
  methods: {
    checkPermission,
    // 获取类型
    getCategory() {
      // 获取运送方式
      searchCusCategory(this.deliverymodedata).then(res => {
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
      // 获取交货方式
      searchCusCategory(this.transmodedata).then(res => {
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
      this.$refs.customerForm.validate((valid) => {
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
        countryid: '',
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
