<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--个人信息-->
      <h2 ref="geren" class="form-name">个人信息</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('NewEmployeeInformation.account')" prop="account" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.account" placeholder="请输入账号名" clearable/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.password')" prop="passwd" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.passwd" placeholder="请输入密码" autocomplete="new-password" clearable/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.lastname')" prop="firstname" style="width: 40%">
            <el-input v-model="personalForm.firstname" placeholder="请输入姓氏" clearable/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.middlename')" style="width: 40%">
            <el-input v-model="personalForm.middlename" placeholder="请输入中间名" clearable/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.firstname')" prop="lastname" style="width: 40%;">
            <el-input v-model="personalForm.lastname" placeholder="请输入名" clearable/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.birthday')" style="width: 40%">
            <el-date-picker
              v-model="personalForm.birthday"
              type="date"
              placeholder="选择生日"
              value-format="yyyy-MM-dd"
              clearable
              style="width: 100%"/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.email')" prop="email" style="width: 40%">
            <el-input v-model="personalForm.email" placeholder="请输入邮箱地址" clearable/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.gender')" prop="gender" style="width: 40%">
            <el-radio-group v-model="personalForm.gender" style="width: 80%">
              <el-radio :label="1" style="width: 50%">{{ $t('NewEmployeeInformation.male') }}</el-radio>
              <el-radio :label="2">{{ $t('NewEmployeeInformation.female') }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.certificatetype')" style="width: 40%">
            <el-select v-model="personalForm.certificatetype" placeholder="请选择证件类型" style="width: 100%;">
              <el-option label="类型1" value="1"/>
              <el-option label="类型2" value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.certificatenumber')" style="width: 40%">
            <el-input v-model="personalForm.certificatenumber" clearable/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.country')" prop="country" style="width: 40%">
            <el-select v-model="personalForm.country" placeholder="请选择国籍" style="width: 100%;" @change ="handlechange">
              <el-option
                v-for="(item, index) in nations"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <!--联系信息-->
      <h2 ref="lianxi" class="form-name">联系信息</h2>
      <div class="container">
        <el-form ref="connectForm" :model="connectForm" :rules="connectrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('NewEmployeeInformation.address')" prop="address" style="width: 40%;margin-top:1%">
            <el-input v-model="connectForm.address" placeholder="请输入地址" clearable/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.phone')" prop="phone" style="width: 40%;margin-top:1%">
            <el-input v-model.number="connectForm.phone" placeholder="请输入手机号" clearable/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.provinceid')" prop="provinceid" style="width: 40%;margin-top: 1%">
            <el-select v-model="connectForm.provinceid" placeholder="请选择省" style="width: 100%;" @change="handlechange2">
              <el-option
                v-for="(item, index) in provinces"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.cityid')" prop="cityid" style="width: 40%;margin-top: 1%">
            <el-select v-model="connectForm.cityid" placeholder="请选择市" style="width: 100%;">
              <el-option
                v-for="(item, index) in cities"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <!--公司信息-->
      <h2 class="form-name">公司信息</h2>
      <div class="container">
        <el-form ref="companyForm" :model="companyForm" :rules="companyrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('NewEmployeeInformation.jobnumber')" style="width: 40%;margin-top:1%">
            <el-input v-model.number="companyForm.jobnumber" placeholder="请输入工号" clearable/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.postid')" style="width: 40%;margin-top: 1%">
            <el-select v-model="companyForm.postid" :value="companyForm.postid" placeholder="请选择职称" style="width: 100%;">
              <el-option label="xxx" value="1"/>
              <el-option label="xxx" value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.deptid')" prop="deptid" style="width: 40%;margin-top: 1%">
            <el-select v-model="companyForm.deptid" placeholder="请选择部门" style="width: 100%;">
              <el-option
                v-for="(item, index) in depts"
                :key="index"
                :label="item.deptName"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.regionid')" prop="regionid" style="width: 40%;margin-top: 1%">
            <el-cascader
              :options="regions"
              :props="props"
              v-model="companyForm.regionid"
              :show-all-levels="false"
              placeholder="请选择区域"
              change-on-select
              filterable
              clearable
              style="width: 100%;"
              @change="handlechange4"
            />
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.repositoryid')" prop="repositoryid" style="width: 40%;margin-top: 1%">
            <el-select v-model="companyForm.repositoryid" placeholder="请选择门店" style="width: 100%;">
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
import { getcountrylist, getprovincelist, getcitylist, regionlist, searchRepository } from '@/api/public'
import { getdeptlist, register } from '@/api/EmployeeInformation'
export default {
  name: 'NewEmployeeContract',
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
      // 区域列表
      regions: [],
      // 门店列表
      repositories: [],
      // 部门列表
      depts: [],
      // 区域列表字段更改
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      // 个人信息数据
      personalForm: {
        account: '',
        passwd: '',
        firstname: '',
        middlename: '',
        lastname: '',
        birthday: '',
        email: '',
        gender: '',
        certificatetype: '',
        certificatenumber: '',
        country: ''
      },
      // 个人信息规则数据
      personalrules: {
        passwd: [
          { message: '请正确输入密码长度', trigger: 'blur' },
          { min: 6, max: 100, message: '密码长度要大于6个字符', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入员工端登陆账号', trigger: 'blur' }
        ],
        firstname: [
          { required: true, message: '请输入姓氏', trigger: 'blur' }
        ],
        lastname: [
          { required: true, message: '请输入名', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        country: [
          { required: true, message: '请选择工作地区', trigger: 'change' }
        ],
        email: [
          { type: 'email', message: '请输入正确邮箱号', trigger: 'blur' },
          { min: 1, message: '请输入正确邮箱号', trigger: 'blur' }
        ]
      },
      // 联系信息数据
      connectForm: {
        address: '',
        phone: '',
        provinceid: '',
        cityid: ''
      },
      // 联系信息规则数据
      connectrules: {
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        provinceid: [
          { required: true, message: '请选择省', trigger: 'change' }
        ],
        cityid: [
          { required: true, message: '请选择市', trigger: 'change' }
        ],
        phone: [
          { required: true, validator: checkphone, trigger: 'change' }
        ]
      },
      // 公司信息数据
      companyForm: {
        jobnumber: '',
        postid: '',
        deptid: '',
        regionid: [],
        repositoryid: ''
      },
      // 公司信息规则数据
      companyrules: {
        deptid: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        regionid: [
          { required: true, message: '请选择区域', trigger: 'change' }
        ],
        repositoryid: [
          { required: true, message: '请选择门店', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getnationlist()
  },
  methods: {
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
      // 区域列表数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
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
    // 转化数据方法
    tranKTree(arr) {
      if (!arr || !arr.length) return
      return arr.map(item => ({
        id: item.id,
        regionName: item.regionName,
        regionListVos: this.tranKTree(item.regionListVos)
      }))
    },
    // 根据区域选择门店
    handlechange4(val) {
      const finalid = val[val.length - 1]
      searchRepository(finalid).then(res => {
        console.log(res)
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
    // 拼接json
    extend(jsonbject1, jsonbject2) {
      var resultJsonObject = {}
      for (const attr in jsonbject1) {
        resultJsonObject[attr] = jsonbject1[attr]
      }
      for (const attr in jsonbject2) {
        resultJsonObject[attr] = jsonbject2[attr]
      }
      return resultJsonObject
    },
    // 保存操作
    handlesave() {
      const form2 = this.extend(this.companyForm, this.connectForm)
      const form3 = this.extend(form2, this.personalForm)
      const quyu = this.companyForm.regionid.length
      form3.roleid = 3
      form3.regionid1 = form3.regionid[quyu - 1]
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.connectForm.validate((valid) => {
            if (valid) {
              this.$refs.companyForm.validate((valid) => {
                if (valid) {
                  register(form3).then(res => {
                    console.log(res)
                    if (res.data.ret === 200) {
                      this.$notify({
                        title: '成功',
                        message: '保存成功',
                        type: 'success',
                        offset: 100
                      })
                      this.restAllForm()
                      this.$refs.personalForm.resetFields()
                      this.$refs.connectForm.resetFields()
                      this.$refs.companyForm.resetFields()
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
            } else {
              this.$notify.error({
                title: '错误',
                message: '信息未填完整',
                offset: 100
              })
              const anchor2 = this.$refs.lianxi.offsetTop
              document.documentElement.scrollTop = anchor2 - 100
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
    // 清空记录
    restAllForm() {
      this.personalForm = {
        account: '',
        passwd: '',
        firstname: '',
        middlename: '',
        lastname: '',
        birthday: '',
        email: '',
        gender: '',
        certificatetype: '',
        certificatenumber: '',
        country: ''
      }
      this.connectForm = {
        address: '',
        phone: '',
        provinceid: '',
        cityid: ''
      }
      this.companyForm = {
        jobnumber: '',
        postid: '',
        deptid: '',
        regionid: [],
        repositoryid: ''
      }
    },
    // 继续录入
    handleentry() {
      const form2 = this.extend(this.companyForm, this.connectForm)
      const form3 = this.extend(form2, this.personalForm)
      const quyu = this.companyForm.regionid.length
      form3.roleid = 3
      form3.regionid1 = form3.regionid[quyu - 1]
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.connectForm.validate((valid) => {
            if (valid) {
              this.$refs.companyForm.validate((valid) => {
                if (valid) {
                  register(form3).then(res => {
                    if (res.data.ret === 200) {
                      this.$notify({
                        title: '成功',
                        message: '保存成功',
                        type: 'success',
                        offset: 100
                      })
                      this.restAllForm()
                      this.$refs.personalForm.resetFields()
                      this.$refs.connectForm.resetFields()
                      this.$refs.companyForm.resetFields()
                      const anchor2 = this.$refs.geren.offsetTop
                      document.documentElement.scrollTop = anchor2 - 100
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
      const view = { path: '/EmployeeInformation/NewEmployeeInformation', name: 'NewEmployeeInformation', fullPath: '/EmployeeInformation/NewEmployeeInformation', title: 'NewEmployeeInformation' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ERP-container{
    margin:50px 30px;
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
