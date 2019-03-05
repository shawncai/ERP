<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--零售客户-->
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form ref="customerForm" :model="customerForm" :rules="customerFormrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('Customer.firstname')" prop="firstname" style="width: 40%;margin-top:1%">
            <el-input v-model="customerForm.firstname" placeholder="请输入名" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Customer.middlename')" prop="middlename" style="width: 40%;margin-top:1%">
            <el-input v-model="customerForm.middlename" placeholder="请输入中间名" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Customer.lastname')" prop="lastname" style="width: 40%">
            <el-input v-model="customerForm.lastname" placeholder="请输入姓氏" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Customer.phone')" prop="phone" style="width: 40%">
            <el-input v-model.number="customerForm.phone" placeholder="请输入客户电话" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Customer.gender')" prop="gender" style="width: 40%">
            <el-radio-group v-model="customerForm.gender" style="width: 80%">
              <el-radio :label="1" style="width: 50%">{{ $t('public.male') }}</el-radio>
              <el-radio :label="2">{{ $t('public.female') }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('Customer.customertype')" style="width: 40%;margin-top: 1%">
            <el-select v-model="customerForm.customertype" :value="customerForm.customertype" placeholder="请选择客户类型" style="width: 100%;">
              <el-option
                v-for="(item, index) in customertypes"
                :key="index"
                :value="item.id"
                :label="item.categoryName"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Customer.level')" style="width: 40%;margin-top: 1%">
            <el-select v-model="customerForm.level" :value="customerForm.level" placeholder="请选择客户优质级别" style="width: 100%;">
              <el-option
                v-for="(item, index) in levels"
                :key="index"
                :value="item.id"
                :label="item.categoryName"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Customer.source')" style="width: 40%;margin-top: 1%">
            <el-select v-model="customerForm.source" :value="customerForm.source" placeholder="请选择客户来源" style="width: 100%;">
              <el-option
                v-for="(item, index) in sources"
                :key="index"
                :value="item.id"
                :label="item.categoryName"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Customer.newold')" style="width: 40%;margin-top: 1%">
            <el-select v-model="customerForm.newold" :value="customerForm.newold" placeholder="请选择" style="width: 100%;">
              <el-option label="老" value="1"/>
              <el-option label="新" value="2"/>
            </el-select>
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
          <el-form-item :label="$t('Customer.address')" prop="address" style="width: 40%;margin-top:1%">
            <el-input v-model="customerForm.address" placeholder="请输入地址" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Customer.birthday')" style="width: 40%;margin-top:1%">
            <el-date-picker
              v-model="customerForm.birthday"
              type="date"
              placeholder="选择生日"
              value-format="yyyy-MM-dd"
              clearable
              style="width: 100%"/>
          </el-form-item>
          <el-form-item :label="$t('Customer.repositoryid')" prop="repositoryid" style="width: 40%">
            <el-select v-model="customerForm.repositoryid" placeholder="请选择门店" filterable style="width: 100%;">
              <el-option
                v-for="(item, index) in repositories"
                :key="index"
                :label="item.repositoryName"
                :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button type="primary" @click="handlesave()">保存</el-button>
        <el-button type="success" @click="handleentry()">继续录入</el-button>
        <el-button type="danger" @click="handlecancel()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getcountrylist, getprovincelist, getcitylist, searchRepository } from '@/api/public'
import { searchCusCategory, addCustomer } from '@/api/Customer'
export default {
  name: 'NewCustomer',
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
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        phone: '',
        gender: '',
        countryid: '',
        provinceid: '',
        cityid: '',
        level: '',
        address: '',
        repositoryid: '',
        birthday: '',
        source: '',
        newold: '',
        customertype: ''
      },
      // 客户信息规则数据
      customerFormrules: {
        phone: [
          { required: true, validator: checkphone, trigger: 'change' }
        ],
        lastname: [
          { required: true, message: '请输入姓氏', trigger: 'blur' }
        ],
        firstname: [
          { required: true, message: '请输入名', trigger: 'blur' }
        ],
        countryid: [
          { required: true, message: '请选择国家', trigger: 'change' }
        ]
      },
      // 所有客户类型数据
      // 发送参数
      customertypes: [],
      customertyp: 1,
      // 优质级别类型所有数据
      // 发送参数
      levels: [],
      levelstype: 2,
      // 客户来源所有数据
      // 发送参数
      sources: [],
      sourcestype: 3
    }
  },
  created() {
    this.getnationlist()
    this.getCategory()
  },
  methods: {
    // 获取类型
    getCategory() {
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
      // 获取客户优质级别
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
      // 获取客户来源
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
      // 获取所有门店
      searchRepository().then(res => {
        if (res.data.ret === 200) {
          this.repositories = res.data.data.content.list
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
    // 保存操作
    handlesave() {
      this.$refs.customerForm.validate((valid) => {
        if (valid) {
          addCustomer(this.customerForm).then(res => {
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
            } else if (res.data.msg === 'account isExist') {
              this.$notify.error({
                title: '错误',
                message: '登陆账号已存在',
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
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        phone: '',
        gender: '',
        countryid: '',
        provinceid: '',
        cityid: '',
        level: '',
        address: '',
        repositoryid: '',
        birthday: '',
        source: '',
        newold: '',
        customertype: ''
      }
    },
    // 继续录入
    handleentry() {
      this.$refs.customerForm.validate((valid) => {
        if (valid) {
          addCustomer(this.customerForm).then(res => {
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
              const anchor = this.$refs.geren.offsetTop
              console.log(anchor)
              document.documentElement.scrollTop = anchor - 100
            } else if (res.data.msg === 'account isExist') {
              this.$notify.error({
                title: '错误',
                message: '登陆账号已存在',
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
      const view = { path: '/Customer/NewCustomer', name: 'Customer', fullPath: '/Customer/Customer', title: 'Customer' }
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
