<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--基本信息-->
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('Supplier.supplierName')" prop="supplierName" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.supplierName" placeholder="请输入供应商名称" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Supplier.typeId')" prop="typeId" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.typeId" placeholder="请选择供应商类别" style="width: 100%;">
              <el-option
                v-for="(item, index) in typeIds"
                :key="index"
                :label="item.categoryName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Supplier.supplierShortName')" prop="supplierShortName" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.supplierShortName" placeholder="请输入供应商简称" clearable/>
          </el-form-item><br>
          <el-form-item :label="$t('Supplier.supplierIntroduction')" style="width: 80%;margin-top:1%">
            <el-input v-model="personalForm.supplierIntroduction" type="textarea" clearable/>
          </el-form-item>
        </el-form>
      </div>
      <!--联系信息-->
      <h2 ref="lianxi" class="form-name">业务信息</h2>
      <div class="container">
        <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('public.countyrId')" prop="countryId" style="width: 40%;margin-top: 1%">
            <el-select v-model="personalForm.countryId" placeholder="国家" style="width: 100%;" @change ="handlechange">
              <el-option
                v-for="(item, index) in nations"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('public.provinceId')" style="width: 40%;margin-top: 1%">
            <el-select v-model="personalForm.provinceId" placeholder="请选择省" style="width: 100%;" @change="handlechange2">
              <el-option
                v-for="(item, index) in provinces"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('public.cityId')" style="width: 40%;margin-top: 1%">
            <el-select v-model="personalForm.cityId" placeholder="请选择市" style="width: 100%;">
              <el-option
                v-for="(item, index) in cities"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('public.address')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.detailAddress" placeholder="请输入地址" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Supplier.groupId')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.groupId" placeholder="请选择供应商分组" style="width: 100%;">
              <el-option
                v-for="(item, index) in groupIds"
                :key="index"
                :label="item.groupName"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Supplier.zipCode')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.zipCode" placeholder="请输入邮编" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Supplier.contactPersonName')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.contactPersonName" placeholder="请输入联系人" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Supplier.contactPersonPhone')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.contactPersonPhone" placeholder="请输入电话" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Supplier.regionId')" prop="regionid" style="width: 40%;margin-top: 1%">
            <el-cascader
              :options="regions"
              :props="props"
              v-model="perregions"
              :show-all-levels="false"
              placeholder="请选择区域"
              change-on-select
              filterable
              clearable
              style="width: 100%;"
            />
          </el-form-item>
          <el-form-item :label="$t('Supplier.giveId')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.giveId" placeholder="请选择交货方式" style="width: 100%;">
              <el-option
                v-for="(item, index) in giveIds"
                :key="index"
                :label="item.categoryName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Supplier.transportId')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.transportId" placeholder="请选择运送方式" style="width: 100%;">
              <el-option
                v-for="(item, index) in transportIds"
                :key="index"
                :label="item.categoryName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Supplier.levelId')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.levelId" placeholder="请选择供应商优质级别" style="width: 100%;">
              <el-option
                v-for="(item, index) in levelIds"
                :key="index"
                :label="item.categoryName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Supplier.isHot')" prop="isHot" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.isHot" placeholder="请选择" style="width: 100%;">
              <el-option label="是" value="1"/>
              <el-option label="否" value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Supplier.isEffective')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.isEffective" placeholder="请选择启用状态" style="width: 100%;">
              <el-option label="启用" value="1"/>
              <el-option label="未启用" value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Supplier.buyerId')" style="width: 40%;margin-top:1%">
            <el-input v-model="buyerId" placeholder="请输入采购员" clearable @focus="handlechoose"/>
          </el-form-item> <br>
          <my-emp :control.sync="empcontrol" @personName="personName"/>
          <el-form-item :label="$t('Supplier.businessScopeIntroduction')" style="width: 80%;margin-top:1%">
            <el-input v-model="personalForm.businessScopeIntroduction" type="textarea" clearable/>
          </el-form-item>
        </el-form>
      </div>
      <!--财务信息-->
      <h2 class="form-name">财务信息</h2>
      <div class="container">
        <el-form ref="personalForm3" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('Supplier.paymentId')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.paymentId" placeholder="请选择结算方式" style="width: 100%;">
              <el-option
                v-for="(item, index) in paymentIds"
                :key="index"
                :label="item.categoryName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Supplier.moneyId')" style="width: 40%;margin-top: 1%">
            <el-select v-model="personalForm.moneyId" :value="personalForm.moneyId" placeholder="请选择币种" style="width: 100%;">
              <el-option label="RMB" value="1"/>
              <el-option label="USD" value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Supplier.bankName')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.bankName" placeholder="请输入开户行" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Supplier.accountName')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.accountName" placeholder="请输入户名" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Supplier.account')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.account" placeholder="请输入账号" clearable/>
          </el-form-item>
        </el-form>
      </div>
      <!--辅助信息-->
      <h2 ref="fuzhu" class="form-name">辅助信息</h2>
      <div class="container">
        <el-form ref="personalForm4" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('Supplier.establishDate')" style="width: 40%;margin-top:1%">
            <el-date-picker
              v-model="personalForm.establishDate"
              type="date"
              placeholder="选择成立时间"
              value-format="yyyy-MM-dd"
              clearable
              style="width: 100%"/>
          </el-form-item>
          <el-form-item :label="$t('Supplier.legalPerson')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.legalPerson" placeholder="请输入法人代表" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Supplier.taxNumber')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.taxNumber" placeholder="请输入税务登记号" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Supplier.businessLicense')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.businessLicense" placeholder="请输入营业执照号" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Supplier.companyTypeId')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.companyTypeId" placeholder="请选择单位性质" style="width: 100%;">
              <el-option label="类型1" value="1"/>
              <el-option label="类型2" value="2"/>
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
import { getcountrylist, getprovincelist, getcitylist, regionlist } from '@/api/public'
import { searchCategory, create, searchGroup } from '@/api/Supplier'
import MyEmp from './components/MyEmp'
export default {
  name: 'NewSupplier',
  components: { MyEmp },
  data() {
    return {
      // 供应商分组数据
      groupIds: [],
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
      // 转化区域id
      perregions: [],
      // 供应商信息数据
      personalForm: {
        // 建档人id
        createId: this.$store.getters.userId,
        supplierName: '',
        typeId: '',
        supplierShortName: '',
        supplierIntroduction: '',
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
        businessLicense: '',
        companyTypeId: ''
      },
      // 个人信息规则数据
      personalrules: {
        supplierName: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '请选择供应商类别', trigger: 'change' }
        ],
        groupId: [
          { required: true, message: '请选择供应商分组', trigger: 'change' }
        ],
        isHot: [
          { required: true, message: '请选择', trigger: 'change' }
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
      // 供应商类别
      searchCategory(1).then(res => {
        if (res.data.ret === 200) {
          this.typeIds = res.data.data.content.list
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
      // 交货方式
      searchCategory(2).then(res => {
        if (res.data.ret === 200) {
          this.giveIds = res.data.data.content.list
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
      // 运送方式
      searchCategory(3).then(res => {
        if (res.data.ret === 200) {
          this.transportIds = res.data.data.content.list
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
      // 优质级别
      searchCategory(4).then(res => {
        if (res.data.ret === 200) {
          this.levelIds = res.data.data.content.list
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
      // 结算方式
      searchCategory(5).then(res => {
        if (res.data.ret === 200) {
          this.paymentIds = res.data.data.content.list
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
      // 分组数据
      searchGroup().then(res => {
        if (res.data.ret === 200) {
          this.groupIds = res.data.data.content
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
    // 保存操作
    handlesave() {
      this.personalForm.regionId = this.perregions[this.perregions.length - 1]
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          create(this.personalForm).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
              this.$refs.personalForm2.clearValidate()
              this.$refs.personalForm2.resetFields()
              this.$refs.personalForm3.clearValidate()
              this.$refs.personalForm3.resetFields()
              this.$refs.personalForm4.clearValidate()
              this.$refs.personalForm4.resetFields()
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
      this.personalForm = {
        supplierName: '',
        typeId: '',
        supplierShortName: '',
        supplierIntroduction: '',
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
        businessLicense: '',
        companyTypeId: ''
      }
      this.perregions = []
      this.buyerId = ''
    },
    // 继续录入
    handleentry() {
      this.personalForm.regionId = this.perregions[this.perregions.length - 1]
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          create(this.personalForm).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
              this.$refs.personalForm2.clearValidate()
              this.$refs.personalForm2.resetFields()
              this.$refs.personalForm3.clearValidate()
              this.$refs.personalForm3.resetFields()
              this.$refs.personalForm4.clearValidate()
              this.$refs.personalForm4.resetFields()
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
          const anchor2 = this.$refs.geren.offsetTop
          console.log(anchor2)
          document.documentElement.scrollTop = anchor2 - 100
          return false
        }
      })
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Supplier/NewSupplier', name: 'NewSupplier', fullPath: '/Supplier/NewSupplier', title: 'NewSupplier' }
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
