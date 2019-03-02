<template>
  <el-dialog :visible.sync="dialog" :dialog="dialog" top="10px" title="修改员工">
    <!--个人信息-->
    <h2 ref="geren" class="form-name">个人信息</h2>
    <div class="container">
      <el-form ref="editAllData" :model="editAllData" :rules="editAllDataRules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
        <el-form-item :label="$t('NewEmployeeInformation.account')" style="width: 40%;margin-top:1%">
          <el-input v-model="editAllData.account" :disabled="true" placeholder="请输入账号名"/>
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.password')" prop="password" style="width: 40%;margin-top:1%">
          <el-input v-model="editAllData.password" placeholder="请输入密码" autocomplete="new-password" clearable/>
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.lastname')" prop="firstName" style="width: 40%">
          <el-input v-model="editAllData.firstName" placeholder="请输入姓氏" clearable/>
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.middlename')" style="width: 40%">
          <el-input v-model="editAllData.middleName" placeholder="请输入中间名" clearable/>
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.firstname')" prop="lastName" style="width: 40%;">
          <el-input v-model="editAllData.lastName" placeholder="请输入名" clearable/>
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.birthday')" style="width: 40%">
          <el-date-picker
            v-model="editAllData.birthday"
            type="date"
            placeholder="选择生日"
            value-format="yyyy-MM-dd"
            clearable
            style="width: 100%"/>
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.email')" prop="email" style="width: 40%">
          <el-input v-model="editAllData.email" placeholder="请输入邮箱地址" clearable/>
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.gender')" prop="gender" style="width: 40%">
          <el-radio-group v-model="editAllData.gender" style="width: 80%">
            <el-radio :label="1" style="width: 50%">{{ $t('NewEmployeeInformation.male') }}</el-radio>
            <el-radio :label="2">{{ $t('NewEmployeeInformation.female') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.certificatetype')" style="width: 40%">
          <el-select v-model="editAllData.certificateType" placeholder="请选择证件类型" style="width: 100%;">
            <el-option label="类型1" value="1"/>
            <el-option label="类型2" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.certificatenumber')" style="width: 40%">
          <el-input v-model="editAllData.certificateNumber" clearable/>
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.country')" style="width: 40%">
          <el-input v-model="editAllData.countryName" :disabled="true" clearable/>
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.editcountry')" style="width: 40%">
          <el-select v-model="editAllData.countryid" placeholder="请选择国籍" style="width: 100%;" @change ="handlechange">
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
      <el-form ref="editAllData2" :model="editAllData" :rules="editAllDataRules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
        <el-form-item :label="$t('NewEmployeeInformation.address')" prop="address" style="width: 40%;margin-top:1%">
          <el-input v-model="editAllData.address" placeholder="请输入地址" clearable/>
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.phone')" prop="phone" style="width: 40%;margin-top:1%">
          <el-input v-model.number="editAllData.phone" placeholder="请输入手机号" clearable/>
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.provinceid')" style="width: 40%;margin-top: 1%">
          <el-input v-model="editAllData.provinceName" :disabled="true" clearable/>
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.editprovinceid')" style="width: 40%;margin-top: 1%">
          <el-select v-model="provinceid" placeholder="请选择省" style="width: 100%;" @change="handlechange2">
            <el-option
              v-for="(item, index) in provinces"
              :key="index"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.cityid')" style="width: 40%;margin-top: 1%">
          <el-input v-model="editAllData.cityName" :disabled="true" clearable/>
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.editcityid')" style="width: 40%;margin-top: 1%">
          <el-select v-model="cityid" placeholder="请选择市" style="width: 100%;">
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
      <el-form ref="editAllData3" :model="editAllData" :rules="editAllDataRules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
        <el-form-item :label="$t('NewEmployeeInformation.jobnumber')" style="width: 40%;margin-top:1%">
          <el-input v-model.number="editAllData.jobNumber" :disabled="true" placeholder="请输入工号"/>
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.postid')" style="width: 40%;margin-top: 1%">
          <el-select v-model="editAllData.postId" :value="editAllData.postId" placeholder="请选择职称" style="width: 100%;">
            <el-option label="xxx" value="1"/>
            <el-option label="xxx" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.deptid')" prop="deptId" style="width: 40%;margin-top: 1%">
          <el-select v-model="editAllData.deptId" placeholder="请选择部门" style="width: 100%;">
            <el-option
              v-for="(item, index) in depts2"
              :key="index"
              :label="item.deptName"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.regionid')" style="width: 40%;margin-top: 1%">
          <el-input v-model="editAllData.regionName" :disabled="true" clearable/>
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.editregionid')" style="width: 40%;margin-top: 1%">
          <el-cascader
            :options="regions2"
            :props="props2"
            v-model="regionId"
            :show-all-levels="false"
            change-on-select
            filterable
            clearable
            style="width: 100%;"
            @change="handlechange4"
          />
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.repositoryid')" style="width: 40%;margin-top: 1%">
          <el-input v-model="editAllData.repositoryName" :disabled="true" clearable/>
        </el-form-item>
        <el-form-item :label="$t('NewEmployeeInformation.editrepositoryid')" style="width: 40%;margin-top: 1%">
          <el-select v-model="repositoryid2" filterable style="width: 100%;">
            <el-option
              v-for="(item, index) in repositories2"
              :key="index"
              :label="item.repositoryName"
              :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">修改</el-button>
      <el-button type="danger" @click="handlecancel()">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { searchRepository, getprovincelist, getcitylist } from '@/api/public'
import { updateemp } from '@/api/EmployeeInformation'
export default {
  name: 'Mydialog',
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var checkphone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        callback()
      }
    }
    return {
      // 控制修改页面
      editVisible: false,
      // 修改数据
      // 国家列表
      nations: [],
      // 省列表
      provinces: [],
      // 城市列表
      cities: [],
      // 区域列表
      regions2: [],
      // 门店列表
      repositories2: [],
      // 部门列表
      depts2: [],
      // 区域列表字段更改
      props2: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      // 区域特殊字段
      FormRegionId: [],
      // 修改全部信息
      editAllData: {
        // 个人信息
        account: '',
        password: '',
        firstName: '',
        middleName: '',
        lastName: '',
        birthday: '',
        email: '',
        gender: '',
        certificateType: '',
        certificateNumber: '',
        countryid: '',
        // 联系信息
        address: '',
        phone: '',
        provinceId: '',
        cityid: '',
        provinceName: '',
        cityName: '',
        // 公司信息
        jobNumber: '',
        postId: '',
        deptId: '',
        regionName: '',
        repositoryName: ''
      },
      regionId: [],
      repositoryid2: '',
      provinceid: '',
      cityid: '',
      editAllDataRules: {
        // 个人信息规则数据
        password: [
          { message: '请正确输入密码长度', trigger: 'blur' },
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
          { type: 'email', message: '请输入正确邮箱号', trigger: 'blur' },
          { min: 1, message: '请输入正确邮箱号', trigger: 'blur' }
        ],
        // 联系信息规则数据
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        Provinces: [
          { required: true, message: '请选择省', trigger: 'change' }
        ],
        City: [
          { required: true, message: '请选择市', trigger: 'change' }
        ],
        phone: [
          { required: true, validator: checkphone, trigger: 'change' }
        ],
        // 公司信息规则数据
        deptId: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        regionId: [
          { required: true, message: '请选择区域', trigger: 'change' }
        ],
        Repository: [
          { required: true, message: '请选择门店', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 根据国家选择省
    handlechange(val) {
      console.log(val)
      val = this.editAllData.countryId
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
    // 根据区域选择门店
    handlechange4(val) {
      const finalid = val[val.length - 1]
      searchRepository(finalid).then(res => {
        if (res.data.ret === 200) {
          this.repositories = res.data.data.content.list
          this.repositories2 = res.data.data.content.list
        } else {
          this.$message.error('出错了')
        }
      })
    },
    // 提交修改
    handleEditok() {
      this.$refs.editAllData.validate((valid) => {
        if (valid) {
          this.$refs.editAllData2.validate((valid) => {
            if (valid) {
              this.$refs.editAllData3.validate((valid) => {
                if (valid) {
                  this.editAllData.regionId = this.regionId[this.regionId.length - 1]
                  console.log(this.repositoryid2)
                  if (this.repositoryid2 === '') {
                    console.log(123)
                    this.editAllData.repositoryid2 = 0
                    this.editAllData.provinceid = this.provinceid
                    this.editAllData.cityid = this.cityid
                    updateemp(this.editAllData).then(res => {
                      if (res.data.ret === 200) {
                        this.$notify({
                          title: '操作成功',
                          message: '操作成功',
                          type: 'success',
                          duration: 1000,
                          offset: 100
                        })
                        this.$refs.editAllData.clearValidate()
                        this.$refs.editAllData2.clearValidate()
                        this.$refs.editAllData3.clearValidate()
                        this.$refs.editAllData.resetFields()
                        this.$refs.editAllData2.resetFields()
                        this.$refs.editAllData3.resetFields()
                        this.getlist()
                        this.editVisible = false
                      } else {
                        this.$notify.error({
                          title: '错误',
                          message: '出错了',
                          offset: 100
                        })
                      }
                    })
                  } else {
                    this.editAllData.repositoryid2 = this.repositoryid2
                    this.editAllData.provinceid = this.provinceid
                    this.editAllData.cityid = this.cityid
                    updateemp(this.editAllData).then(res => {
                      if (res.data.ret === 200) {
                        this.$notify({
                          title: '操作成功',
                          message: '操作成功',
                          type: 'success',
                          duration: 1000,
                          offset: 100
                        })
                        this.$refs.editAllData.clearValidate()
                        this.$refs.editAllData2.clearValidate()
                        this.$refs.editAllData3.clearValidate()
                        this.$refs.editAllData.resetFields()
                        this.$refs.editAllData2.resetFields()
                        this.$refs.editAllData3.resetFields()
                        this.getlist()
                        this.editVisible = false
                      } else {
                        this.$notify.error({
                          title: '错误',
                          message: '出错了',
                          offset: 100
                        })
                      }
                    })
                  }
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
      this.$refs.editAllData.clearValidate()
      this.$refs.editAllData2.clearValidate()
      this.$refs.editAllData3.clearValidate()
      this.$refs.editAllData.resetFields()
      this.$refs.editAllData2.resetFields()
      this.$refs.editAllData3.resetFields()
      this.editVisible = false
    }
  }
}
</script>

<style scoped>

</style>
