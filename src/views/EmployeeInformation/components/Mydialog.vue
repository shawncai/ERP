<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.id +'    修改'" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('NewEmployeeInformation.account')" prop="account" style="width: 100%;">
                <el-input v-model="personalForm.account" placeholder="请输入账号名" disabled style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('NewEmployeeInformation.password')" prop="password" style="width: 100%;">
                <el-input v-model="personalForm.password" placeholder="请输入密码" clearable style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('NewEmployeeInformation.lastname')" prop="firstName" style="width: 100%;">
                <el-input v-model="personalForm.firstName" placeholder="请输入姓氏" clearable style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('NewEmployeeInformation.middlename')" style="width: 100%;">
                <el-input v-model="personalForm.middleName" placeholder="请输入中间名" clearable style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('NewEmployeeInformation.firstname')" prop="lastName" style="width: 100%;">
                <el-input v-model="personalForm.lastName" placeholder="请输入名" clearable style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('NewEmployeeInformation.birthday')" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.birthday"
                  type="date"
                  placeholder="选择生日"
                  value-format="yyyy-MM-dd"
                  clearable
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('NewEmployeeInformation.email')" prop="email" style="width: 100%;">
                <el-input v-model="personalForm.email" placeholder="请输入邮箱地址" clearable style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('NewEmployeeInformation.gender')" prop="gender" style="width: 100%;">
                <el-radio-group v-model="personalForm.gender" style="margin-left: 18px;width: 200px">
                  <el-radio :label="1" style="width: 120px">{{ $t('NewEmployeeInformation.male') }}</el-radio>
                  <el-radio :label="2">{{ $t('NewEmployeeInformation.female') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('NewEmployeeInformation.certificatetype')" style="width: 100%;">
                <el-select v-model="personalForm.certificateType" placeholder="请选择证件类型" style="margin-left: 18px;width: 200px">
                  <el-option label="类型1" value="1"/>
                  <el-option label="类型2" value="2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('NewEmployeeInformation.certificatenumber')" style="width: 100%;">
                <el-input v-model="personalForm.certificateNumber" clearable style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('NewEmployeeInformation.country')" prop="countryId" style="width: 100%;">
                <el-select v-model="personalForm.countryId" placeholder="请选择国籍" style="margin-left: 18px;width: 200px" @change ="handlechange" @focus="getnationlist">
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
    <!--子件信息-->
    <el-card class="box-card" shadow="never" style="margin-top: 15px">
      <h2 ref="lianxi" class="form-name">联系信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="connectForm" :model="personalForm" :rules="connectrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('NewEmployeeInformation.address')" prop="address" style="width: 100%;">
                <el-input v-model="personalForm.address" placeholder="请输入地址" clearable style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('NewEmployeeInformation.phone')" prop="phone" style="width: 100%;">
                <el-input v-model.number="personalForm.phone" placeholder="请输入手机号" clearable style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('NewEmployeeInformation.provinceid')" prop="provinceId" style="width: 100%;">
                <el-select v-model="personalForm.provinceId" placeholder="请选择省" style="margin-left: 18px;width: 200px" @change="handlechange2">
                  <el-option
                    v-for="(item, index) in provinces"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('NewEmployeeInformation.cityid')" prop="cityId" style="width: 100%;">
                <el-select v-model="personalForm.cityId" placeholder="请选择市" style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in cities"
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
    <!--公司信息-->
    <el-card class="box-card" shadow="never" style="margin-top: 15px">
      <h2 class="form-name">公司信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="companyForm" :model="personalForm" :rules="companyrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('NewEmployeeInformation.jobnumber')" style="width: 100%;">
                <el-input v-model.number="personalForm.jobNumber" placeholder="请输入工号" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('NewEmployeeInformation.postid')" style="width: 100%;">
                <el-select v-model="personalForm.postId" :value="personalForm.postId" placeholder="请选择职位" style="margin-left: 18px;width: 200px" @focus="getnationlist">
                  <el-option
                    v-for="(item, index) in jobs"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('NewEmployeeInformation.deptid')" prop="deptId" style="width: 100%;">
                <el-select v-model="personalForm.deptId" placeholder="请选择部门" style="margin-left: 18px;width: 200px" @focus="getnationlist">
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :label="item.deptName"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('NewEmployeeInformation.regionid')" prop="regionId" style="width: 100%;">
                <el-cascader
                  :options="regions"
                  :props="props"
                  v-model="regionId"
                  :show-all-levels="false"
                  placeholder="请选择区域"
                  change-on-select
                  filterable
                  clearable
                  style="margin-left: 18px;width: 200px"
                  @change="handlechange4"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('NewEmployeeInformation.repositoryid')" style="width: 100%;">
                <el-select v-model="personalForm.repositoryId" placeholder="请选择门店" filterable style="margin-left: 18px;width: 200px">
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
    <el-card class="box-card" shadow="never" style="margin-top: 15px;margin-bottom: 40px">
      <h2 class="form-name">角色信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-row>
          <el-radio-group v-model="personalForm.roleId" style="width: 100%">
            <el-col v-for="(item, index) in roleNames" :key="index" :span="12" style="text-align: center">
              <el-radio :label="item.id" style="width: 100%">{{ item.name }}</el-radio>
            </el-col>
          </el-radio-group>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">取消</el-button>
        <el-button type="primary" @click="handleEditok()">保存</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { getcountrylist, getprovincelist, getcitylist, regionlist, searchRepository, getDetailById, getRegion, saveRegion } from '@/api/public'
import { getdeptlist, updateemp, searchEmpCategory } from '@/api/EmployeeInformation'
export default {
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
    const checkphone = (rule, value, callback) => {
      if (!this.personalForm.phone) {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
        if (!Number(this.personalForm.phone)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      // 选择的区域数据
      regionId: [],
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 角色数据
      roleNames: [],
      radio2: 3,
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
      // 个人信息规则数据
      personalrules: {
        passwd: [
          { required: true, message: '请正确输入密码长度', trigger: 'blur' },
          { min: 6, max: 100, message: '密码长度要大于6个字符', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入员工端登陆账号', trigger: 'blur' }
        ],
        firstName: [
          { required: true, message: '请输入姓氏', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: '请输入名', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        countryId: [
          { required: true, message: '请选择工作地区', trigger: 'change' }
        ],
        email: [
          { required: true, type: 'email', message: '请输入正确邮箱号', trigger: 'blur' },
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
        provinceId: [
          { required: true, message: '请选择省', trigger: 'change' }
        ],
        cityId: [
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
        deptId: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        regionId: [
          { required: true, message: '请选择区域', trigger: 'change' }
        ],
        repositoryId: [
          { required: true, message: '请选择门店', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.getnationlist()
      this.handlechange(this.personalForm.countryId)
      this.handlechange2(this.personalForm.provinceId)
      getRegion(this.personalForm.regionId).then(res => {
        if (res.data.ret === 200) {
          if (res.data.data.content.zcc !== null && res.data.data.content.zcc !== '' && res.data.data.content.zcc !== undefined) {
            const zhuz = res.data.data.content.zcc.split(',')
            this.regionId = zhuz.map(function(item) {
              return parseInt(item)
            })
          }
        }
      })
      this.handlechange4(this.personalForm.regionId)
    }
  },
  created() {
    this.getnationlist()
    this.getroleName()
  },
  methods: {
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
          if (res.data.ret === 200) {
            return res.data.data.content[0]
          }
        })
      }))
      const listRoleName = list.filter(function(ele) {
        return (ele.name.indexOf('-') !== -1)
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
    // 提交修改
    handleEditok() {
      this.personalForm.modifyPersonId = this.$store.getters.userId
      if (this.regionId !== '' && this.regionId !== null && this.regionId !== undefined) {
        this.personalForm.regionId = this.regionId[this.regionId.length - 1]
      }
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.connectForm.validate((valid) => {
            if (valid) {
              this.$refs.companyForm.validate((valid) => {
                if (valid) {
                  updateemp(this.personalForm).then(res => {
                    saveRegion(this.regionId, this.personalForm.regionId).then(res => {
                      if (res.dat.ret === 200) {
                        console.log(res)
                      }
                    })
                    if (res.data.ret === 200) {
                      this.$notify({
                        title: '修改成功',
                        message: '修改成功',
                        type: 'success',
                        duration: 1000,
                        offset: 100
                      })
                      this.$refs.personalForm.resetFields()
                      this.$refs.connectForm.resetFields()
                      this.$refs.companyForm.resetFields()
                      this.$refs.personalForm.clearValidate()
                      this.$refs.connectForm.clearValidate()
                      this.$refs.companyForm.clearValidate()
                      this.$emit('rest', true)
                      this.editVisible = false
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
    // 取消按钮
    handlecancel() {
      this.$refs.personalForm.resetFields()
      this.$refs.connectForm.resetFields()
      this.$refs.companyForm.resetFields()
      this.$refs.personalForm.clearValidate()
      this.$refs.connectForm.clearValidate()
      this.$refs.companyForm.clearValidate()
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
  }
  .el-col-12{
    width: 49%;
  }
</style>
