<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--零售客户-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">
        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="customerForm" :model="customerForm" :rules="customerFormrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.firstname')" prop="firstname" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerForm.firstname" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.middlename')" prop="middlename" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerForm.middlename" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.lastname')" prop="lastname" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerForm.lastname" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.phone')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerForm.phone" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.phone12')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerForm.phone2" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.phone13')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerForm.phone3" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('updates2.landline')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerForm.landline" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('Customer.gender')" prop="gender" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-radio-group v-model="customerForm.gender" style="width: 200px">
                    <el-radio :label="1" style="width: 50%">{{ $t('public.male') }}</el-radio>
                    <el-radio :label="2">{{ $t('public.female') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <!--<el-form-item :label="$t('Customer.customertype2')" style="margin-left: 18px;width: 100%;margin-bottom: 0">-->
                <!--<el-select v-model="customerForm.customertype" :value="customerForm.customertype" placeholder="请选择客户类型" style="width: 100%;">-->
                <!--<el-option-->
                <!--v-for="(item, index) in customertypes"-->
                <!--:key="index"-->
                <!--:value="item.id"-->
                <!--:label="item.categoryName"/>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item :label="$t('Customer.level')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select ref="clear" v-model="customerForm.level" :value="customerForm.level" style="width: 200px">
                    <el-option v-show="false" label="" value=""/>
                    <el-option
                      v-for="(item, index) in levels"
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
                <!-- <el-form-item :label="$t('Customer.source')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
            <el-select ref="clear2" v-model="customerForm.source" :value="customerForm.source" placeholder="请选择客户来源" style="width: 100%;">
              <el-option v-show="false" label="" value=""/>
              <el-option
                v-for="(item, index) in sources"
                :key="index"
                :value="item.id"
                :label="item.categoryName"/>
              <template>
                <el-button v-if="isshow" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat2">{{ $t('updates.create') }}</el-button>
              </template>
            </el-select>
          </el-form-item> -->
                <el-form-item :label="$t('Customer.newold')" prop="newold" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="customerForm.newold" :value="customerForm.newold" :placeholder="$t('updates.qxz')" style="width: 200px">
                    <el-option :label="$t('update4.bdkh')" value="1"/>
                    <el-option :label="$t('update4.fbdkh')" value="2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('public.countyrId')" prop="countryid" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="customerForm.countryid" style="width: 200px" @change ="handlechange">
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
                  <el-select v-model="customerForm.provinceid" style="width: 200px" filterable @change="handlechange2">
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
                  <el-select v-model="customerForm.cityid" filterable style="width: 200px">
                    <el-option
                      v-for="(item, index) in cities"
                      :key="index"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.address')" prop="address" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerForm.address" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.birthday')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="customerForm.birthday"
                    :placeholder="$t('updates.xzsr')"
                    type="date"
                    value-format="yyyy-MM-dd"
                    clearable
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Customer.repositoryid')" prop="repositoryid" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="customerForm.repositoryid" :placeholder="$t('Hmodule.xzmd')" filterable style="width: 200px">
                    <el-option
                      v-for="(item, index) in repositories"
                      :key="index"
                      :label="item.repositoryName"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click v-permission="['1-14-15-1']" type="primary" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button v-permission="['1-14-15-1']" type="success" @click="handleentry()">{{ $t('updates.jxlr') }}</el-button>
        <el-button v-permission="['1-14-15-1']" type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { getcountrylist, getprovincelist, getcitylist, searchRepository } from '@/api/public'
import { searchCusCategory, addCustomer } from '@/api/Customer'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
var _that
export default {
  name: 'NewCustomer',
  directives: { permission, permission2 },
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
      // 判断增加按钮
      isshow: false,
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
        countryid: this.$store.getters.countryId,
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
        newold: [
          { required: true, message: 'please input IS our customers', trigger: 'change' }
        ],
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
    this.handlechange(this.$store.getters.countryId)
    this.jungleshow()
    if (this.$store.getters.repositoryId !== 0) {
      this.customerForm.repositoryid = this.$store.getters.repositoryId
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    jungleshow() {
      const roles = this.$store.getters.roles
      this.isshow = roles.includes('1-14-21-1')
      console.log(this.isshow)
    },
    checkPermission,
    // 获取类型
    getCategory() {
      // 获取客户类型
      searchCusCategory(this.customertyp).then(res => {
        if (res.data.ret === 200) {
          this.customertypes = res.data.data.content.list
        } else {
          console.log('客户类型错误')
        }
      })
      // 获取客户优质级别
      searchCusCategory(this.levelstype).then(res => {
        if (res.data.ret === 200) {
          this.levels = res.data.data.content.list
        } else {
          console.log('客户优质级别错误')
        }
      })
      // 获取客户来源
      searchCusCategory(this.sourcestype).then(res => {
        if (res.data.ret === 200) {
          this.sources = res.data.data.content.list
        } else {
          console.log('客户来源错误')
        }
      })
      // 获取所有门店
      searchRepository().then(res => {
        if (res.data.ret === 200) {
          this.repositories = res.data.data.content.list
        } else {
          console.log('门店错误')
        }
      })
    },
    // 国籍列表
    getnationlist() {
      getcountrylist().then(res => {
        if (res.data.ret === 200) {
          this.nations = res.data.data.content
        } else {
          console.log('国家列表错误')
        }
      })
    },
    // 根据国家选择省
    handlechange(val) {
      this.customerForm.provinceid = ''
      this.customerForm.cityid = ''
      getprovincelist(val).then(res => {
        if (res.data.ret === 200) {
          this.provinces = res.data.data.content
        } else {
          console.log('国家选择省错误')
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
          console.log('省选择市错误')
        }
      })
      this.customerForm.cityid = ''
    },
    // 保存操作
    handlesave() {
      this.$refs.customerForm.validate((valid) => {
        if (valid) {
          addCustomer(this.customerForm).then(res => {
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
              this.$router.go(-1)
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
        countryid: this.$store.getters.countryId,
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
                title: 'successful',
                message: 'save successful',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.customerForm.clearValidate()
              this.$refs.customerForm.resetFields()
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
    },
    // 触发下拉框brlu
    go_creat() {
      this.$router.push('/Customer/CustomerCategory')
      this.$refs.clear.blur()
    },
    go_creat2() {
      this.$router.push('/Customer/CustomerCategory')
      this.$refs.clear2.blur()
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
