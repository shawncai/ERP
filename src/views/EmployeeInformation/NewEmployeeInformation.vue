<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--个人信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">
        <div ref="geren" class="form-name">{{ $t('updates.grxx') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('NewEmployeeInformation.account')" prop="account" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.account" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('NewEmployeeInformation.password')" prop="passwd" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.passwd" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('NewEmployeeInformation.firstname')" prop="firstname" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.firstname" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('NewEmployeeInformation.middlename')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.middlename" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('NewEmployeeInformation.lastname')" prop="lastname" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.lastname" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('NewEmployeeInformation.birthday')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.birthday"
                    :placeholder="$t('updates.xzsr')"
                    type="date"
                    value-format="yyyy-MM-dd"
                    clearable
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('NewEmployeeInformation.email')" prop="email" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.email" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="height: 75px">
                <el-form-item :label="$t('NewEmployeeInformation.gender')" prop="gender" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-radio-group v-model="personalForm.gender" style="width: 200px">
                    <el-radio :label="1" style="width: 100px">{{ $t('NewEmployeeInformation.male') }}</el-radio>
                    <el-radio :label="2">{{ $t('NewEmployeeInformation.female') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('NewEmployeeInformation.certificatetype')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.certificatetype" style="width: 200px">
                    <el-option :label="$t('prompt.lx1')" value="1"/>
                    <el-option :label="$t('prompt.lx2')" value="2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('NewEmployeeInformation.certificatenumber')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.certificatenumber" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('NewEmployeeInformation.country')" prop="country" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.country" style="width: 200px" @change ="handlechange" @focus="updatecountry">
                    <el-option
                      v-for="(item, index) in nations"
                      :key="index"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--联系信息111-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">
        <div ref="lianxi" class="form-name">{{ $t('updates.lxxx') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="connectForm" :model="connectForm" :rules="connectrules" :inline="true" label-position="left" size="mini" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('NewEmployeeInformation.phone')" prop="phone" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="connectForm.phone" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('NewEmployeeInformation.provinceid')" prop="provinceid" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="connectForm.provinceid" style="width: 200px" filterable @change="handlechange2">
                    <el-option
                      v-for="(item, index) in provinces"
                      :key="index"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('NewEmployeeInformation.cityid')" prop="cityid" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="connectForm.cityid" style="width: 200px" filterable>
                    <el-option
                      v-for="(item, index) in cities"
                      :key="index"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('NewEmployeeInformation.address')" prop="address" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="connectForm.address" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--公司信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">
        <div class="form-name">{{ $t('updates.gsxx') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="companyForm" :model="companyForm" :rules="companyrules" :inline="true" label-position="left" size="mini" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('NewEmployeeInformation.jobnumber')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model.number="companyForm.jobnumber" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('NewEmployeeInformation.postid')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select ref="clear" v-model="companyForm.postid" :value="companyForm.postid" style="width: 200px" @focus="updatepost">
                    <el-option v-show="false" label="" value=""/>
                    <el-option
                      v-for="(item, index) in jobs"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"/>
                    <template>
                      <el-button v-if="isshow" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat">{{ $t('updates.create') }}</el-button>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('NewEmployeeInformation.deptid')" prop="deptid" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="companyForm.deptid" style="width: 200px" @focus="updatedept">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :label="item.deptName"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('NewEmployeeInformation.regionid')" prop="regionid" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-cascader
                    :options="regions"
                    :props="props"
                    v-model="companyForm.regionid"
                    :show-all-levels="false"
                    :placeholder="$t('Hmodule.xzqy')"
                    change-on-select
                    filterable
                    clearable
                    style="width: 200px"
                    @change="handlechange4"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('NewEmployeeInformation.repositoryid')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="companyForm.repositoryid" :placeholder="$t('Hmodule.xzmd')" filterable style="width: 200px">
                    <el-option
                      v-for="(item, index) in repositories"
                      :key="index"
                      :label="item.repositoryName"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('NewEmployeeInformation.regionids')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="chargeRegions" style="width: 200px" @focus="treechoose"/>
                  <my-tree :treecontrol.sync="treecontrol" :supp.sync="supp" @ids2="ids2" @ids="ids" @names="names"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 50px">
        <div class="form-name">{{ $t('updates.jsxx') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-row>
            <el-radio-group v-model="personalForm.roleid" style="width: 100%">
              <el-col v-for="(item, index) in roleNames" :key="index" :span="6" style="text-align: left">
                <el-radio :label="item.id" style="width: 100%">{{ item.name }}</el-radio>
              </el-col>
            </el-radio-group>
          </el-row>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;">
        <el-button v-no-more-click v-permission="['1-2-3-1']" type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button v-permission="['1-2-3-1']" type="success" @click="handleentry()">{{ $t('updates.jxlr') }}</el-button>
        <el-button v-permission="['1-2-3-1']" type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { getRegion, getcountrylist, getprovincelist, getcitylist, regionlist, searchRepository, getDetailById, saveRegion } from '@/api/public'
import { getdeptlist, register, searchEmpCategory, Verifyaccount } from '@/api/EmployeeInformation'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyTree from './components/MyTree'
var _that
export default {
  name: 'NewEmployeeInformation',
  directives: { permission, permission2 },
  components: { MyTree },
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
    const chenckrepeat = (rule, value, callback) => {
      value = value.replace(/^\s+|\s+$/g, '')
      setTimeout(() => {
        Verifyaccount({
          account: value
        }).then(res => {
          if (res.data.ret === 200) {
            if (value === '' || value === undefined || value === null) {
              callback(new Error(_that.$t('prompt.qsrzh')))
            } else {
              callback()
            }
          } else {
            callback(new Error(_that.$t('prompt.zhycz')))
          }
        })
      }, 2000)
    }
    return {
      // 判断新增按钮是否显示
      isshow: false,
      // 角色数据
      roleNames: [],
      radio2: 3,
      supp: [],
      // 职位搜索时参数
      jobCat: {
        type: 2,
        pagenum: 1,
        pagesize: 9999
      },
      // 职位列表
      jobs: [],
      // 国家列表
      nations: [],
      // 省列表
      provinces: [],
      // 城市列表
      cities: [],
      treecontrol: false,
      // 区域列表
      regions: [],
      regionids: [],
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
      chargeRegions: '',
      // 个人信息数据
      personalForm: {
        account: '',
        passwd: '123456',
        firstname: '',
        middlename: '',
        lastname: '',
        birthday: '',
        email: '',
        gender: '',
        certificatetype: '',
        certificatenumber: '',
        country: this.$store.getters.countryId,
        createPersonId: this.$store.getters.userId
      },
      // 个人信息规则数据
      personalrules: {
        passwd: [
          { required: true, message: _that.$t('prompt.qzqshurmmchangdu'), trigger: 'blur' },
          { min: 6, max: 100, message: _that.$t('prompt.mmcdyadyli'), trigger: 'blur' }
        ],
        account: [
          { required: true, validator: chenckrepeat, trigger: 'change' }
        ],
        firstname: [
          { required: true, message: _that.$t('prompt.qsrxs'), trigger: 'blur' }
        ],
        lastname: [
          { required: true, message: _that.$t('prompt.qsrm'), trigger: 'blur' }
        ],
        gender: [
          { required: true, message: _that.$t('prompt.qxzxb'), trigger: 'change' }
        ],
        country: [
          { required: true, message: _that.$t('prompt.qxzgzqy'), trigger: 'change' }
        ],
        email: [
          { required: true, type: 'email', message: _that.$t('prompt.qsrzqyxh'), trigger: 'blur' },
          { min: 1, message: _that.$t('prompt.qsrzqyxh'), trigger: 'blur' }
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
          { required: true, message: _that.$t('prompt.qsrdz'), trigger: 'blur' }
        ],
        provinceid: [
          { required: true, message: _that.$t('prompt.qxzs'), trigger: 'change' }
        ],
        cityid: [
          { required: true, message: _that.$t('prompt.qxzs2'), trigger: 'change' }
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
          { required: true, message: _that.$t('prompt.qxzbm'), trigger: 'change' }
        ],
        regionid: [
          { required: true, message: _that.$t('prompt.qxzqy'), trigger: 'change' }
        ],
        repositoryid: [
          { required: true, message: _that.$t('prompt.qxzmd'), trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getnationlist()
    this.getroleName()
    this.getRegion()
    this.handlechange(this.$store.getters.countryId)
    this.jungleshow()
  },

  mounted() {
    this.handlechange(this.$store.getters.useCountry)
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    ids2(val) {
      this.supp = val
    },
    ids(val) {
      this.personalForm.chargeRegions = val
    },
    names(val) {
      this.chargeRegions = val
    },
    tree(val) {
      console.log(val)
    },
    treechoose() {
      this.treecontrol = true
    },
    jungleshow() {
      const roles = this.$store.getters.roles
      this.isshow = roles.includes('1-2-8-1')
    },
    getRegion() {
      getRegion(this.$store.getters.regionId).then(res => {
        if (res.data.ret === 200) {
          if (res.data.data.content.zcc !== null && res.data.data.content.zcc !== '' && res.data.data.content.zcc !== undefined) {
            const zhuz = res.data.data.content.zcc.split(',')
            this.companyForm.regionid = zhuz.map(function(item) {
              return parseInt(item)
            })
          }
        }
      })
    },
    checkPermission,
    async getroleName() {
      console.log(this.$store.getters)
      const rolesIds = this.$store.getters.roles
      const rolesfilter = rolesIds.filter(function(elem) {
        return (elem.indexOf('1-2-3') !== -1)
      })
      const needRolesId = rolesfilter.map(function(item) {
        return (item.replace('1-2-3-', ''))
      })
      const list = await Promise.all(needRolesId.map(function(item) {
        return getDetailById(item).then(res => {
          if (res.data.ret === 200 && res.data.data.content.length !== 0 && res.data.data.content[0] !== undefined) {
            return res.data.data.content[0]
          }
        })
      }))
      const listRoleName = list.filter(function(ele) {
        if (ele !== undefined) {
          return (ele.name.indexOf('-') !== -1)
        }
      })
      console.log(listRoleName)
      const sss2 = listRoleName.map(function(item) {
        return item.name
      })
      const sss3 = sss2.map(function(item) {
        return {
          id: item.split('-')[0],
          name: item.split('-')[1]
        }
      })
      this.roleNames = sss3
    },
    // 国籍列表
    getnationlist() {
      getcountrylist().then(res => {
        if (res.data.ret === 200) {
          this.nations = res.data.data.content
        } else {
          console.log('国家列表出错')
        }
      })
      // 区域列表数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
        } else {
          console.log('区域列表出错')
        }
      })
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        } else {
          console.log('部门列表出错')
        }
      })
      // 职位列表数据
      searchEmpCategory(this.jobCat).then(res => {
        if (res.data.ret === 200) {
          this.jobs = res.data.data.content.list
        } else {
          console.log('职位列表出错')
        }
      })
    },
    // 根据国家选择省
    handlechange(val) {
      getprovincelist(val).then(res => {
        if (res.data.ret === 200) {
          this.provinces = res.data.data.content
        } else {
          console.log('国家选择省出错')
        }
      })
      this.connectForm.provinceid = ''
      this.connectForm.cityid = ''
      this.cities = []
    },
    // 根据省选择市
    handlechange2(val) {
      getcitylist(val).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.cities = res.data.data.content
        } else {
          console.log('省选择市出错')
        }
      })
      this.connectForm.cityid = ''
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
          console.log('区域选择门店')
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
      console.log(form3)
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
                      saveRegion(this.companyForm.regionid, form3.regionid1).then(res => {
                        if (res.data.ret === 200) {
                          console.log(res)
                        } else {
                          this.$notify.error({
                            title: 'wrong',
                            message: res.data.msg,
                            offset: 100
                          })
                        }
                      })
                      this.$notify({
                        title: 'successful',
                        message: 'save successful',
                        type: 'success',
                        offset: 100
                      })
                      this.restAllForm()
                      this.$router.go(-1)
                      this.$refs.personalForm.resetFields()
                      this.$refs.connectForm.resetFields()
                      this.$refs.companyForm.resetFields()
                    } else if (res.data.msg === 'account isExist') {
                      this.$notify.error({
                        title: 'wrong',
                        message: this.$t('prompt.dlzhycz'),
                        offset: 100
                      })
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
              this.$refs.companyForm.validate()
              this.$notify.error({
                title: 'wrong',
                message: 'Information is incomplete',
                offset: 100
              })
              const anchor2 = this.$refs.lianxi.offsetTop
              document.documentElement.scrollTop = anchor2 - 100
              return false
            }
          })
        } else {
          this.$refs.connectForm.validate()
          this.$refs.companyForm.validate()
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
    // 清空记录
    restAllForm() {
      this.personalForm = {
        account: '',
        passwd: '123456',
        firstname: '',
        middlename: '',
        lastname: '',
        birthday: '',
        email: '',
        gender: '',
        certificatetype: '',
        certificatenumber: '',
        country: this.$store.getters.countryId,
        createPersonId: this.$store.getters.userId
      }
      this.chargeRegions = ''
      this.supp = []
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
      this.getRegion()
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
                        title: 'successful',
                        message: 'save successful',
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
                        title: 'wrong',
                        message: this.$t('prompt.dlzhycz'),
                        offset: 100
                      })
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
    },
    // 更新国家下拉
    updatecountry() {
      this.getnationlist()
    },
    // 更新职位下拉
    updatepost() {
      this.getnationlist()
    },
    // 更新部门下拉
    updatedept() {
      this.getnationlist()
    },
    go_creat() {
      this.$router.push('/EmployeeInformation/EmpCategory')
      this.$refs.clear.blur()
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
