<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--基本信息-->
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" status-icon class="demo-ruleForm" label-position="left" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('BasicSettings.roleId')" prop="roleId" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.roleId" style="width: 100%;" @change ="handlechange">
              <el-option
                v-for="(item, index) in roleIds"
                :key="index"
                :label="item.roleName"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Product.categoryid')" prop="productCategoryId" style="width: 40%;">
            <el-select v-model="personalForm.productCategoryId" :placeholder="$t('Hmodule.wpfl')" style="width: 100%;" clearable>
              <el-option :label="$t('otherlanguage.zc')" value="1"/>
              <el-option :label="$t('otherlanguage.pj')" value="2"/>
              <el-option :label="$t('otherlanguage.jgj')" value="3"/>
              <el-option :label="$t('otherlanguage.dc')" value="5"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.commissionCategory')" prop="commissionType" style="width: 35%;margin-top:1%">
            <el-radio-group v-model="personalForm.commissionCategory">
              <el-radio :label="1">{{ $t('updates.lrtc') }}</el-radio>
              <el-radio :label="2">{{ $t('updates.xssrtc') }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.commissionType')" prop="commissionType" style="width: 35%;margin-top:1%">
            <el-radio-group v-model="personalForm.commissionType">
              <el-radio :label="1">{{ $t('updates.tcbl') }}</el-radio>
              <el-radio :label="2">{{ $t('updates.gdje') }}</el-radio>
              <!-- <el-radio :label="3">绩效分</el-radio> -->
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.commissionValue')" prop="commissionValue" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.commissionValue" placeholder="请输入提成" clearable/>
          </el-form-item>
          <el-form-item :label="$t('public.countyrId')" prop="countryId" style="width: 40%;margin-top: 1%">
            <el-select v-model="personalForm.countryId" placeholder="国家" style="width: 100%;" @change ="handlechange">
              <el-option
                v-for="(item, index) in nations"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-permission="['1-39-44-1']" type="primary" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button v-permission="['1-39-44-1']" type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { create } from '@/api/BasicSettings'
import { repairList } from '@/api/Getauthority'
import { getcountrylist, getprovincelist, getcitylist, regionlist } from '@/api/public'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyEmp from './components/MyEmp'
import MyTree from './components/MyTree'
var _that
export default {
  name: 'Commission',
  directives: { permission, permission2 },
  components: { MyEmp, MyTree },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(value)
      if (this.productCategoryId === null || this.productCategoryId === undefined || this.productCategoryId === '') {
        callback(new Error('请选择物品分类'))
      } else {
        callback()
      }
    }
    return {
      // 结算方式
      paymentIds: [],
      // 优质级别
      levelIds: [],
      // 运送方式
      transportIds: [],
      // 交货方式
      giveIds: [],
      // 供应商类别
      typeIds: [],
      // 采购员弹窗控制
      empcontrol: false,
      // 国家列表
      nations: [],
      // 省列表
      provinces: [],
      // 城市列表
      cities: [],
      // 区域列表
      regions: [],
      // 区域列表字段更改
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      // 采购员回显
      buyerId: '',
      roleIds: [],
      // 转化区域id
      perregions: [],
      // 控制物品分类
      treecontrol: false,
      productCategoryId: '',
      // 提成信息数据
      personalForm: {
        roleId: '',
        commissionCategory: 1,
        commissionType: 1,
        commissionValue: '',
        countryId: ''
      },
      // 个人信息规则数据
      personalrules: {
        roleId: [
          { required: true, message: '请选择职位', trigger: 'change' }
        ],
        productCategoryId: [
          { required: true, message: '请选择物品分类', trigger: 'change' }
        ],
        commissionType: [
          { required: true, message: '请选择供应商分组', trigger: 'change' }
        ],
        commissionValue: [
          { required: true, message: '请输入提成', trigger: 'blur' }
        ],
        countryId: [
          { required: true, message: '请选择国家', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getnationlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    checkPermission,
    tree(val) {
      console.log(val)
      this.productCategoryId = val.categoryName
      this.personalForm.productCategoryId = val.id
    },
    treechoose() {
      console.log('this.treecontrol', this.treecontrol)
      this.treecontrol = true
      console.log('this.treecontrol', this.treecontrol)
    },
    // 国籍列表
    getnationlist() {
      getcountrylist().then(res => {
        if (res.data.ret === 200) {
          this.nations = res.data.data.content
        }
      })
      // 区域列表数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
        }
      })
      // 供应商类别
      const param = {}
      param.iseffective = 1
      param.iseffective = 1
      param.type = 2
      param.pagesize = 999
      repairList().then(res => {
        if (res.data.ret === 200) {
          this.roleIds = res.data.data.content
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
        }
      })
      // 交货方式
      // searchCategory(2).then(res => {
      //   if (res.data.ret === 200) {
      //     this.giveIds = res.data.data.content.list
      //   } else {
      //     this.$notify.error({
      //       title: 'wrong',
      //       message: 'wrong',
      //       offset: 100
      //     })
      //   }
      // })
      // 运送方式
      // searchCategory(3).then(res => {
      //   if (res.data.ret === 200) {
      //     this.transportIds = res.data.data.content.list
      //   } else {
      //     this.$notify.error({
      //       title: 'wrong',
      //       message: 'wrong',
      //       offset: 100
      //     })
      //   }
      // })
      // 优质级别
      // searchCategory(4).then(res => {
      //   if (res.data.ret === 200) {
      //     this.levelIds = res.data.data.content.list
      //   } else {
      //     this.$notify.error({
      //       title: 'wrong',
      //       message: 'wrong',
      //       offset: 100
      //     })
      //   }
      // })
      // 结算方式
      // searchCategory(5).then(res => {
      //   if (res.data.ret === 200) {
      //     this.paymentIds = res.data.data.content.list
      //   } else {
      //     this.$notify.error({
      //       title: 'wrong',
      //       message: 'wrong',
      //       offset: 100
      //     })
      //   }
      // })
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
    // 保存操作
    handlesave() {
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          create(this.personalForm).then(res => {
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
      this.personalForm = {
        commissionType: 1,
        BasicSettingsName: '',
        typeId: '',
        BasicSettingsShortName: '',
        BasicSettingsIntroduction: '',
        // 业务信息
        countryId: '',
        provinceId: '',
        cityId: '',
        detailAddress: '',
        groupId: '',
        zipCode: '',
        contactPersonName: '',
        contactPersonPhone: '',
        regionId: '',
        giveId: '',
        transportId: '',
        levelId: '',
        isHot: '',
        isEffective: '',
        buyerId: '',
        // 财务信息
        businessScopeIntroduction: '',
        paymentId: '',
        moneyId: '',
        bankName: '',
        accountName: '',
        account: '',
        establishDate: '',
        legalPerson: '',
        taxNumber: '',
        commissionCategory: 1,
        companyTypeId: ''
      }
      this.productCategoryId = ''
      this.perregions = []
      this.buyerId = ''
    },
    // 继续录入
    handleentry() {
      this.personalForm.regionId = this.perregions[this.perregions.length - 1]
      // this.$refs.personalForm.validate((valid) => {
      //   if (valid) {
      //     create(this.personalForm).then(res => {
      //       console.log(res)
      //       if (res.data.ret === 200) {
      //         this.$notify({
      //           title: 'successful',
      //           message: 'save successful',
      //           type: 'success',
      //           offset: 100
      //         })
      //         this.restAllForm()
      //         this.$refs.personalForm.clearValidate()
      //         this.$refs.personalForm.resetFields()
      //         this.$refs.personalForm2.clearValidate()
      //         this.$refs.personalForm2.resetFields()
      //         this.$refs.personalForm3.clearValidate()
      //         this.$refs.personalForm3.resetFields()
      //         this.$refs.personalForm4.clearValidate()
      //         this.$refs.personalForm4.resetFields()
      //         const anchor = this.$refs.geren.offsetTop
      //         console.log(anchor)
      //         document.documentElement.scrollTop = anchor - 100
      //       } else {
      //         this.$notify.error({
      //           title: 'wrong',
      //           message: res.data.msg,
      //           offset: 100
      //         })
      //       }
      //     })
      //   } else {
      //     this.$notify.error({
      //       title: 'wrong',
      //       message: 'Information is incomplete',
      //       offset: 100
      //     })
      //     const anchor2 = this.$refs.geren.offsetTop
      //     console.log(anchor2)
      //     document.documentElement.scrollTop = anchor2 - 100
      //     return false
      //   }
      // })
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/BasicSettings/NewBasicSettings', name: 'NewBasicSettings', fullPath: '/BasicSettings/NewBasicSettings', title: 'NewBasicSettings' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    // 员工输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 员工列表返回数据
    personName(val) {
      console.log(val)
      this.buyerId = val.personName
      this.personalForm.buyerId = val.id
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
