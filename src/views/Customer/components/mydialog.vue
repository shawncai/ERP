<template>
  <el-dialog :visible.sync="editVisible" :control="control" top="10px" title="修改客户">
    <!--零售客户-->
    <h2 ref="geren" class="form-name">基本信息</h2>
    <div class="container">
      <el-form ref="customerForm" :model="customerForm" :rules="customerFormrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
        <el-form-item :label="$t('Customer.firstname')" prop="firstname" style="width: 40%;margin-top:1%">
          <el-input v-model="customerForm.firstName" placeholder="请输入名" clearable/>
        </el-form-item>
        <el-form-item :label="$t('Customer.middlename')" prop="middlename" style="width: 40%;margin-top:1%">
          <el-input v-model="customerForm.middleName" placeholder="请输入中间名" clearable/>
        </el-form-item>
        <el-form-item :label="$t('Customer.lastname')" prop="lastname" style="width: 40%">
          <el-input v-model="customerForm.lastName" placeholder="请输入姓氏" clearable/>
        </el-form-item>
        <el-form-item :label="$t('Customer.phone')" style="width: 40%">
          <el-input v-model="customerForm.phoneNumber" placeholder="请输入客户电话" clearable/>
        </el-form-item>
        <el-form-item :label="$t('Customer.gender')" prop="gender" style="width: 40%">
          <el-radio-group v-model="customerForm.gender" style="width: 80%">
            <el-radio :label="1" style="width: 50%">{{ $t('public.male') }}</el-radio>
            <el-radio :label="2">{{ $t('public.female') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('Customer.customertype')" style="width: 40%;margin-top: 1%">
          <el-select v-model="customerForm.customerType" :value="customerForm.customerType" placeholder="请选择客户类型" style="width: 100%;">
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
          <el-select v-model="customerForm.newOrOld" :value="customerForm.newOrOld" placeholder="请选择" style="width: 100%;">
            <el-option label="老" value="1"/>
            <el-option label="新" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Customer.address')" prop="address" style="width: 40%;margin-top:1%">
          <el-input v-model="customerForm.address" placeholder="请输入地址" clearable/>
        </el-form-item>
        <el-form-item label="所属国家" style="width: 40%;margin-top:1%">
          <el-input v-model="customerForm.countryName" disabled/>
        </el-form-item>
        <el-form-item :label="$t('public.countyrId')" style="width: 40%;margin-top: 1%">
          <el-select v-model="countryid" placeholder="请选择国家" style="width: 100%;" @change ="handlechange">
            <el-option
              v-for="(item, index) in nations"
              :key="index"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="所属省" style="width: 40%;margin-top:1%">
          <el-input v-model="customerForm.provinceName" disabled/>
        </el-form-item>
        <el-form-item :label="$t('Customer.provinceid')" style="width: 40%;margin-top: 1%">
          <el-select v-model="provinceid" placeholder="请选择省" style="width: 100%;" @change="handlechange2">
            <el-option
              v-for="(item, index) in provinces"
              :key="index"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="所属城市" style="width: 40%;margin-top:1%">
          <el-input v-model="customerForm.cityName" disabled/>
        </el-form-item>
        <el-form-item :label="$t('Customer.cityid')" style="width: 40%;margin-top: 1%">
          <el-select v-model="cityid" placeholder="请选择市" style="width: 100%;">
            <el-option
              v-for="(item, index) in cities"
              :key="index"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Customer.repositoryid')" style="width: 40%;margin-top:1%">
          <el-input v-model="customerForm.repositoryName" disabled/>
        </el-form-item>
        <el-form-item label="修改门店" prop="repositoryid" style="width: 40%;margin-top:1%">
          <el-select v-model="repositoryid" placeholder="请选择门店" filterable style="width: 100%;">
            <el-option
              v-for="(item, index) in repositories"
              :key="index"
              :label="item.repositoryName"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Customer.birthday')" style="width: 40%;margin-top:1%">
          <el-date-picker
            v-model="customerForm.birthday"
            type="date"
            placeholder="选择生日"
            value-format="yyyy-MM-dd"
            style="width: 100%"/>
        </el-form-item>
      </el-form>
    </div>
    <!--操作-->
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">修改</el-button>
      <el-button type="danger" @click="handlecancel()">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getcountrylist, getprovincelist, getcitylist } from '@/api/public'
export default {
  name: 'Mydialog',
  props: {
    control: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 控制修改数据
      editVisible: this.control,
      // 修改弹窗中的数据开始=========================================================
      // 国家列表
      nations: [],
      // 省列表
      provinces: [],
      // 城市列表
      cities: [],
      // 客户信息数据
      countryid: '',
      provinceid: '',
      cityid: '',
      repositoryid: '',
      customerForm: {
        firstName: '',
        middleName: '',
        lastName: '',
        customerName: '',
        email: '',
        phoneNumber: '',
        gender: '',
        countryName: '',
        provinceName: '',
        cityName: '',
        level: '',
        address: '',
        repositoryName: '',
        birthday: '',
        source: '',
        newOrOld: '',
        customerType: ''
      },
      // 客户信息规则数据
      customerFormrules: {
        phone: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: '请输入姓氏', trigger: 'blur' }
        ],
        firstName: [
          { required: true, message: '请输入名', trigger: 'blur' }
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
      sourcestype: 3,
      // 门店数据
      repositories: []
      // 修改弹窗中的数据结束=========================================================
    }
  },
  watch: {
    editVisible(val) {
      this.$emit('input', val)
    }
  },
  mounted() {
    this.editVisible = this.control
  },
  methods: {
    // 修改操作开始 -------------------------------------------------
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
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>

</style>
