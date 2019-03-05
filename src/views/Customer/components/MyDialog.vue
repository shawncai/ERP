<template>
  <el-dialog :visible.sync="editVisible" :control="control" :editdata="editdata" :close-on-press-escape="false" top="10px" title="修改经销商" @close="$emit('update:control', false)">
    <!--零售客户-->
    <h2 ref="geren" class="form-name">基本信息</h2>
    <div class="container">
      <el-form ref="customerForm" :model="customerForm" :rules="customerFormrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
        <el-form-item :label="$t('Customer.agentname')" prop="agentName" style="width: 40%;margin-top:1%">
          <el-input v-model="customerForm.agentName" placeholder="请输入供货商名" clearable/>
        </el-form-item>
        <el-form-item :label="$t('Customer.customertype')" prop="type" style="width: 40%;margin-top: 1%">
          <el-select v-model="customerForm.type" :value="customerForm.type" placeholder="请选择客户类型" style="width: 100%;">
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
        <el-form-item :label="$t('Customer.pinyin')" style="width: 40%;margin-top: 1%">
          <el-input v-model="customerForm.pinyin" placeholder="请输入拼音缩写" clearable/>
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
        <el-form-item :label="$t('Customer.contactname')" prop="contactName" style="width: 40%">
          <el-input v-model.number="customerForm.contactName" placeholder="请输入联系人" clearable/>
        </el-form-item>
        <el-form-item :label="$t('Customer.phone2')" prop="phone" style="width: 40%">
          <el-input v-model.number="customerForm.phone" placeholder="请输入电话号码" clearable/>
        </el-form-item>
        <el-form-item :label="$t('public.countyrId')" style="width: 40%;margin-top: 1%">
          <el-input v-model.number="customerForm.countryName" disabled/>
        </el-form-item>
        <el-form-item :label="$t('public.countyrId')" style="width: 40%;margin-top: 1%">
          <el-select v-model="customerForm.countryid" placeholder="请选择国家" style="width: 100%;" @change ="handlechange">
            <el-option
              v-for="(item, index) in nations"
              :key="index"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Customer.provinceid')" style="width: 40%;margin-top: 1%">
          <el-input v-model.number="customerForm.provinceName" disabled/>
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
          <el-input v-model.number="customerForm.cityName" disabled/>
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
          <el-input v-model="trader" placeholder="请选择" @focus="handlechoose"/>
        </el-form-item>
        <my-emp :control.sync="empcontrol" @personName="personName"/>
        <el-form-item :label="$t('Customer.transmode')" prop="address" style="width: 40%;margin-top:1%">
          <el-select v-model="customerForm.transMode" :value="customerForm.transMode" placeholder="请选择" style="width: 100%;">
            <el-option label="x1" value="1"/>
            <el-option label="z2" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Customer.deliverymode')" prop="address" style="width: 40%;margin-top:1%">
          <el-select v-model="customerForm.deliveryMode" :value="customerForm.deliveryMode" placeholder="请选择" style="width: 100%;">
            <el-option label="p1" value="1"/>
            <el-option label="q2" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Customer.address2')" prop="address" style="width: 40%;margin-top:1%">
          <el-input v-model="customerForm.address" placeholder="请输入地址" clearable/>
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
import { getcountrylist, getprovincelist, getcitylist } from '@/api/public'
import { searchCusCategory, updateagent } from '@/api/Customer'
import MyEmp from './MyEmp'
export default {
  components: { MyEmp },
  props: {
    control: {
      type: Boolean,
      default: false
    },
    editdata: {
      type: Object,
      default: null
    }
  },
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
      editVisible: this.control,
      // 分管业务员回显
      trader: this.editdata.traderName,
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
      customerForm: this.editdata,
      // 客户信息规则数据
      customerFormrules: {
        phone: [
          { required: true, validator: checkphone, trigger: 'change' }
        ],
        agentName: [
          { required: true, message: '请输入客户名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择客户类型', trigger: 'change' }
        ],
        countryid: [
          { required: true, message: '请选择国家', trigger: 'change' }
        ],
        contactName: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
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
  watch: {
    control() {
      this.editVisible = this.control
    },
    editdata() {
      this.customerForm = this.editdata
      this.trader = this.editdata.traderName
      console.log(this.editdata)
    }
  },
  created() {
    this.getnationlist()
    this.getCategory()
  },
  methods: {
    // 修改操作开始 -------------------------------------------------
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
    handleEditok() {
      updateagent(this.customerForm).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.$emit('rest', true)
          this.$refs.customerForm.clearValidate()
          this.$refs.customerForm.resetFields()
          this.$refs.customerForm2.clearValidate()
          this.$refs.customerForm2.resetFields()
          this.editVisible = false
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    handlecancel() {
      this.$refs.customerForm.clearValidate()
      this.$refs.customerForm.resetFields()
      this.$refs.customerForm2.clearValidate()
      this.$refs.customerForm2.resetFields()
      this.editVisible = false
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>

</style>
