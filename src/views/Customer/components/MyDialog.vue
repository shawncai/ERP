<template>
  <el-dialog :visible.sync="editVisible" :control="control" :editdata="editdata" :close-on-press-escape="false" :title="customerForm.id +'    修改'" width="1010px" class="edit" top="-10px" @close="$emit('update:control', false)">
    <!--零售客户-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="customerForm" :model="customerForm" :rules="customerFormrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.agentname')" prop="agentName" style="width: 100%;">
                <el-input v-model="customerForm.agentName" placeholder="请输入供货商名" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.customertype')" prop="type" style="width: 100%;">
                <el-select v-model="customerForm.type" :value="customerForm.type" placeholder="请选择经销商类型" style="margin-left: 18px;width: 200px" @focus="getCategory">
                  <el-option
                    v-for="(item, index) in customertypes"
                    :key="index"
                    :value="item.id"
                    :label="item.categoryName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.level')" style="width: 100%;">
                <el-select v-model="customerForm.level" :value="customerForm.level" placeholder="请选择经销商优质级别" style="margin-left: 18px;width: 200px" @focus="getCategory">
                  <el-option
                    v-for="(item, index) in levels"
                    :key="index"
                    :value="item.id"
                    :label="item.categoryName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.pinyin')" style="width: 100%;">
                <el-input v-model="customerForm.pinyin" placeholder="请输入拼音缩写" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.source2')" style="width: 100%;">
                <el-select v-model="customerForm.source" :value="customerForm.source" placeholder="请选择经销商来源" style="margin-left: 18px;width: 200px" @focus="getCategory">
                  <el-option
                    v-for="(item, index) in sources"
                    :key="index"
                    :value="item.id"
                    :label="item.categoryName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.discount2')" style="width: 100%;">
                <el-input v-model.number="customerForm.discount" placeholder="请输入折扣" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.introduce2')" style="width: 100%;">
                <el-input v-model="customerForm.introduce" type="textarea" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <!--// 基本信息结束-->
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--业务信息-->
    <el-card class="box-card" shadow="never" style="margin-top: 15px">
      <h2 class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">业务信息</h2>
      <div class="container">
        <el-form ref="customerForm2" :model="customerForm" :rules="customerFormrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.contactname')" prop="contactName" style="width: 100%;">
                <el-input v-model.number="customerForm.contactName" placeholder="请输入联系人" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.phone2')" prop="phone" style="width: 100%;">
                <el-input v-model.number="customerForm.phone" placeholder="请输入电话号码" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('public.countyrId')" style="width: 100%;">
                <el-select v-model="customerForm.countryId" placeholder="请选择国家" style="margin-left: 18px;width: 200px" @change ="handlechange">
                  <el-option
                    v-for="(item, index) in nations"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.provinceid')" style="width: 100%;">
                <el-select v-model="customerForm.provinceId" placeholder="请选择省" style="margin-left: 18px;width: 200px" @change="handlechange2">
                  <el-option
                    v-for="(item, index) in provinces"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.cityid')" style="width: 100%;">
                <el-select v-model="customerForm.cityId" placeholder="请选择市" style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in cities"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.traderid')" prop="address" style="width: 100%;">
                <el-input v-model="trader" placeholder="请选择" style="margin-left: 18px;width: 200px" @focus="handlechoose"/>
              </el-form-item>
            </el-col>
            <my-emp :control.sync="empcontrol" @personName="personName"/>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.transmode')" prop="address" style="width: 100%;">
                <el-select v-model="customerForm.transMode" :value="customerForm.transMode" placeholder="请选择" style="margin-left: 18px;width: 200px" @focus="getCategory">
                  <el-option
                    v-for="(item, index) in transmodes"
                    :key="index"
                    :value="item.id"
                    :label="item.categoryName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.deliverymode')" prop="address" style="width: 100%;">
                <el-select v-model="customerForm.deliveryMode" :value="customerForm.deliveryMode" placeholder="请选择" style="margin-left: 18px;width: 200px" @focus="getCategory">
                  <el-option
                    v-for="(item, index) in deliverymodes"
                    :key="index"
                    :value="item.id"
                    :label="item.categoryName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.address2')" prop="address" style="width: 100%;">
                <el-input v-model="customerForm.address" placeholder="请输入地址" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
      customertyp: 4,
      // 优质级别类型所有数据
      // 发送参数
      levels: [],
      levelstype: 5,
      // 客户来源所有数据
      // 发送参数
      sources: [],
      sourcestype: 7,
      // 运送方式
      transmodes: [],
      transmodedata: 6,
      // 交货方式
      deliverymodes: [],
      deliverymodedata: 8
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
      this.handlechange(this.customerForm.countryId)
      this.handlechange2(this.customerForm.provinceId)
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
      // 获取运送方式
      searchCusCategory(this.deliverymodedata).then(res => {
        if (res.data.ret === 200) {
          this.deliverymodes = res.data.data.content.list
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
      // 获取交货方式
      searchCusCategory(this.transmodedata).then(res => {
        if (res.data.ret === 200) {
          this.transmodes = res.data.data.content.list
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
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
      // 获取经销商优质级别
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
      // 获取经销商来源
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
        }
      })
    },
    // 根据国家选择省
    handlechange(val) {
      getprovincelist(val).then(res => {
        if (res.data.ret === 200) {
          this.provinces = res.data.data.content
        }
      })
    },
    // 根据省选择市
    handlechange2(val) {
      getcitylist(val).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.cities = res.data.data.content
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
    height: 950px;
  }
  .el-col-12{
    width: 49%;
  }
</style>
